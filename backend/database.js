const Database = require("better-sqlite3");
const path = require("path");
require("dotenv").config();

// SQLite 데이터베이스 파일 경로
const dbPath = path.join(__dirname, "database.sqlite");
const db = new Database(dbPath);

// WAL 모드 활성화 (성능 향상)
db.pragma("journal_mode = WAL");

// 데이터베이스 테이블 초기화
const initDB = () => {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lineup TEXT NOT NULL,
        product_code TEXT NOT NULL,
        color TEXT NOT NULL,
        image TEXT,
        stock INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Database tables initialized");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    throw error;
  }
};

module.exports = { db, initDB };
