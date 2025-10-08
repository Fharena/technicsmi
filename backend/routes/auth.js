const express = require("express");
const router = express.Router();
require("dotenv").config();

// POST - 관리자 인증
router.post("/admin-login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true, message: "Authentication successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid password" });
  }
});

module.exports = router;
