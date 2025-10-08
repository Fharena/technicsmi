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
    }));

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST - 제품 추가
router.post("/", (req, res) => {
  const { lineup, productCode, color, image, stock } = req.body;

  if (!lineup || !productCode || !color) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO products (lineup, product_code, color, image, stock) VALUES (?, ?, ?, ?, ?)"
    );
    const info = stmt.run(lineup, productCode, color, image || "", stock || 0);

    const newProduct = {
      id: info.lastInsertRowid.toString(),
      lineup,
      productCode,
      color,
      image: image || "",
      stock: stock || 0,
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
  const { lineup, productCode, color, image, stock } = req.body;

  try {
    const stmt = db.prepare(
      `UPDATE products 
       SET lineup = ?, product_code = ?, color = ?, image = ?, stock = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    );
    const info = stmt.run(lineup, productCode, color, image, stock, id);

    if (info.changes === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = {
      id,
      lineup,
      productCode,
      color,
      image,
      stock,
    };

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
