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
      "INSERT INTO characters (name, tipo_id, user_id) VALUES (?, ?, ?)",
      [name, tipo_id, user_id] // certifique-se de ter o user.id via token
    );

    res.status(201).json({ message: "Personagem cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor." });
  }
});

module.exports = router;
