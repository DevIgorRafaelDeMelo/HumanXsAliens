const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Correção: pegando ID corretamente

    const [characters] = await db.query(
      "SELECT * FROM characters WHERE user_id = ?",
      [userId]
    );

    if (characters.length === 0) {
      return res.status(404).json({ message: "Nenhum personagem encontrado." });
    }

    res.json({ characters });
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
    res.status(500).json({ message: "Erro interno ao buscar personagens." });
  }
});

module.exports = router;
