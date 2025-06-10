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
      "INSERT INTO characters (name, tipo_id, user_id, alien_id, DEPOSITO, GUN_SPELL, TORSO_SPELL, CAPA_SPELL, BOOT_SPELL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        tipo_id,
        user_id,
        1,
        JSON.stringify([]),
        JSON.stringify([0, 0, 0, 0, 0]),
        JSON.stringify([0, 0, 0, 0, 0]),
        JSON.stringify([0, 0, 0, 0, 0]),
        JSON.stringify([0, 0, 0, 0, 0]),
      ]
    );

    return res.status(200).json({
      user_id,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor." });
  }
});

module.exports = router;
