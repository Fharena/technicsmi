// Base64 이미지를 파일로 마이그레이션하는 스크립트
const { db } = require("../database");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const migrateImages = async () => {
  try {
    console.log("🔄 이미지 마이그레이션 시작...");

    // Base64 이미지가 있는 제품들 조회
    const stmt = db.prepare(
      "SELECT id, image FROM products WHERE image LIKE 'data:image/%'"
    );
    const products = stmt.all();

    console.log(`📊 ${products.length}개의 제품에서 Base64 이미지 발견`);

    for (const product of products) {
      try {
        // Base64 데이터 파싱
        const base64Data = product.image;
        const matches = base64Data.match(
          /^data:image\/([a-zA-Z]+);base64,(.+)$/
        );

        if (!matches) {
          console.log(`❌ 제품 ${product.id}: 유효하지 않은 Base64 형식`);
          continue;
        }

        const imageType = matches[1];
        const imageData = matches[2];

        // 파일명 생성
        const filename = `${uuidv4()}.${imageType}`;
        const filePath = path.join(__dirname, "../uploads", filename);

        // 디렉토리 확인
        const uploadsDir = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // 파일 저장
        fs.writeFileSync(filePath, imageData, "base64");

        // DB 업데이트
        const newImageUrl = `/uploads/${filename}`;
        const updateStmt = db.prepare(
          "UPDATE products SET image = ? WHERE id = ?"
        );
        updateStmt.run(newImageUrl, product.id);

        console.log(`✅ 제품 ${product.id}: ${filename} 저장 완료`);
      } catch (error) {
        console.error(
          `❌ 제품 ${product.id} 마이그레이션 실패:`,
          error.message
        );
      }
    }

    console.log("🎉 이미지 마이그레이션 완료!");
  } catch (error) {
    console.error("❌ 마이그레이션 중 오류:", error);
  }
};

// 스크립트 실행
if (require.main === module) {
  migrateImages();
}

module.exports = migrateImages;
