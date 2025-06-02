const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

// 🔥 Rota para buscar todos os aliens
router.get("/", authMiddleware, async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM aliens ORDER BY id ASC");
    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar aliens:", err);
    res.status(500).json({ error: "Erro ao buscar aliens." });
  }
});

module.exports = router;
