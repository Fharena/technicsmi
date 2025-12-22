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
        restock_message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // restock_message 컬럼 추가 (마이그레이션)
    try {
      db.exec(`ALTER TABLE products ADD COLUMN restock_message TEXT`);
      console.log("✅ Added restock_message column to products table");
    } catch (e) {
      // 컬럼이 이미 존재하면 무시
    }

    // remarks 컬럼 추가 (마이그레이션)
    try {
      db.exec(`ALTER TABLE products ADD COLUMN remarks TEXT`);
      console.log("✅ Added remarks column to products table");
    } catch (e) {
      // 컬럼이 이미 존재하면 무시
    }

    // glb_file 컬럼 추가 (마이그레이션)
    try {
      db.exec(`ALTER TABLE products ADD COLUMN glb_file TEXT`);
      console.log("✅ Added glb_file column to products table");
    } catch (e) {
      // 컬럼이 이미 존재하면 무시
    }

    console.log("✅ Database tables initialized");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    throw error;
  }
};

module.exports = { db, initDB };
