const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { initDB } = require("./database");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const uploadRouter = require("./routes/upload");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 정적 파일 서빙 (업로드된 이미지)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// 프로덕션 환경에서는 빌드된 React 앱 제공
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

// 서버 시작
const startServer = () => {
  try {
    // 데이터베이스 초기화
    initDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 API endpoint: http://localhost:${PORT}/api`);
      console.log(`💾 Database: SQLite (database.sqlite)`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
