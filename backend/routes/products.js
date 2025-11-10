const express = require("express");
const router = express.Router();
const path = require("path");
const { db } = require("../database");

// GET - 모든 제품 조회 (라인업 필터링 지원)
router.get("/", (req, res) => {
  try {
    const { lineup } = req.query;

    let query = "SELECT * FROM products";
    let params = [];

    if (lineup && lineup !== "전체") {
      query += " WHERE lineup = ?";
      params.push(lineup);
    }

    query += " ORDER BY created_at DESC";

    const stmt = db.prepare(query);
    const rows = params.length > 0 ? stmt.all(...params) : stmt.all();

    // 프론트엔드 형식에 맞게 변환
    const products = rows.map((row) => ({
      id: row.id.toString(),
      lineup: row.lineup,
      productCode: row.product_code,
      color: row.color,
      image: row.image,
      stock: row.stock,
      restockMessage: row.restock_message,
      remarks: row.remarks,
    }));

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST - 제품 추가
router.post("/", (req, res) => {
  const { lineup, productCode, color, image, stock, restockMessage, remarks } =
    req.body;

  if (!lineup || !productCode || !color) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO products (lineup, product_code, color, image, stock, restock_message, remarks) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    const info = stmt.run(
      lineup,
      productCode,
      color,
      image || "",
      stock || 0,
      restockMessage || "",
      remarks || ""
    );

    const newProduct = {
      id: info.lastInsertRowid.toString(),
      lineup,
      productCode,
      color,
      image: image || "",
      stock: stock || 0,
      restockMessage: restockMessage || "",
      remarks: remarks || "",
    };

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// PUT - 제품 수정
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { lineup, productCode, color, image, stock, restockMessage, remarks } =
    req.body;

  console.log("PUT /products/:id", { id, body: req.body });

  // 기본값 설정 (더 안전한 방법)
  const safeLineup = lineup && lineup.trim() !== "" ? lineup : "UNKNOWN";
  const safeProductCode =
    productCode && productCode.trim() !== "" ? productCode : "UNKNOWN";
  const safeColor = color && color.trim() !== "" ? color : "UNKNOWN";

  // 검증 로직 임시 제거 (디버깅용)
  console.log("Received data:", {
    lineup,
    productCode,
    color,
    image,
    stock,
    restockMessage,
    remarks,
  });

  try {
    const stmt = db.prepare(
      `UPDATE products 
       SET lineup = ?, product_code = ?, color = ?, image = ?, stock = ?, restock_message = ?, remarks = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    );
    const info = stmt.run(
      safeLineup,
      safeProductCode,
      safeColor,
      image,
      stock,
      restockMessage || "",
      remarks || "",
      id
    );

    console.log("Update result:", { changes: info.changes });

    if (info.changes === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = {
      id,
      lineup: safeLineup,
      productCode: safeProductCode,
      color: safeColor,
      image,
      stock,
      restockMessage: restockMessage || "",
      remarks: remarks || "",
    };

    console.log("Updated product:", updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE - 제품 삭제
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  try {
    // 먼저 제품 정보 조회 (이미지 파일명 확인용)
    const selectStmt = db.prepare("SELECT image FROM products WHERE id = ?");
    const product = selectStmt.get(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // 제품 삭제
    const deleteStmt = db.prepare("DELETE FROM products WHERE id = ?");
    const info = deleteStmt.run(id);

    if (info.changes === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // 이미지 파일이 업로드된 파일이면 삭제
    if (product.image && product.image.startsWith("/uploads/")) {
      const fs = require("fs");
      const filename = product.image.replace("/uploads/", "");
      const filePath = path.join(__dirname, "../uploads", filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted image file: ${filename}`);
      }
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
