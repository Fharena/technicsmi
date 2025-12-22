const express = require("express");
const router = express.Router();
const { imageUpload, glbUpload } = require("../middleware/upload");
const path = require("path");
const fs = require("fs");

// POST - 이미지 업로드
router.post("/image", imageUpload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "이미지 파일이 필요합니다." });
    }

    // 업로드된 파일의 URL 반환
    const imageUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      imageUrl: imageUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ error: "이미지 업로드에 실패했습니다." });
  }
});

// POST - GLB 파일 업로드
router.post("/glb", glbUpload.single("glb"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "GLB 파일이 필요합니다." });
    }

    // 업로드된 파일의 URL 반환
    const glbUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      glbUrl: glbUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("GLB upload error:", error);
    res.status(500).json({ error: "GLB 업로드에 실패했습니다." });
  }
});

// DELETE - 이미지 삭제
router.delete("/image/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../uploads", filename);

    // 파일 존재 확인 후 삭제
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: "이미지가 삭제되었습니다." });
    } else {
      res.status(404).json({ error: "파일을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error("Image delete error:", error);
    res.status(500).json({ error: "이미지 삭제에 실패했습니다." });
  }
});

// DELETE - GLB 파일 삭제
router.delete("/glb/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../uploads", filename);

    // 파일 존재 확인 후 삭제
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: "GLB 파일이 삭제되었습니다." });
    } else {
      res.status(404).json({ error: "파일을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error("GLB delete error:", error);
    res.status(500).json({ error: "GLB 삭제에 실패했습니다." });
  }
});

module.exports = router;
