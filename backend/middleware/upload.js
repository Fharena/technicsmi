const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// 파일 저장 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // 고유한 파일명 생성: uuid + 원본확장자
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// 파일 필터링 (이미지만 허용)
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("이미지 파일만 업로드 가능합니다."), false);
  }
};

// GLB 파일 필터링
const glbFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (
    ext === ".glb" ||
    ext === ".gltf" ||
    file.mimetype === "model/gltf-binary"
  ) {
    cb(null, true);
  } else {
    cb(new Error("GLB/GLTF 파일만 업로드 가능합니다."), false);
  }
};

// 이미지 업로드용 multer 설정
const imageUpload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB 제한
  },
});

// GLB 업로드용 multer 설정
const glbUpload = multer({
  storage: storage,
  fileFilter: glbFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB 제한 (3D 모델은 크기가 클 수 있음)
  },
});

module.exports = { imageUpload, glbUpload };
