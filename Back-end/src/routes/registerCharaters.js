const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  const { name, tipo_id, user_id } = req.body;

  if (!name || !tipo_id) {
    return res
      .status(400)
      .json({ message: "Nome e tipo_id são obrigatórios." });
  }

  try {
    await db.query(
      "INSERT INTO characters (name, tipo_id, user_id, alien_id, DEPOSITO) VALUES (?, ?, ?, ?, ?)",
      [name, tipo_id, user_id, 1, JSON.stringify([])] // Corrigido: '1' agora está corretamente inserido
    );

    return res.status(200).json({
      user_id,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor." });
  }
});

module.exports = router;
