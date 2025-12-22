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
  // 정적 파일 먼저 서빙 (JS, CSS, 이미지 등)
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // API가 아니고 파일 확장자가 없는 요청만 index.html로 (SPA 라우팅)
  app.get("*", (req, res) => {
    // API 요청은 제외
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }
    // 파일 확장자가 있으면 정적 파일로 간주 (이미 위에서 처리됨)
    if (req.path.includes(".")) {
      return res.status(404).send("File not found");
    }
    // 나머지만 index.html로 (SPA 라우팅)
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
