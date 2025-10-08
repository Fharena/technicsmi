const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const path = require("path");

// POST - 이미지 업로드
router.post("/image", upload.single("image"), (req, res) => {
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

// DELETE - 이미지 삭제
router.delete("/image/:filename", (req, res) => {
  try {
    const fs = require("fs");
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

module.exports = router;
