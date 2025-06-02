const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Certifique-se de que db usa mysql2/promise
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM andares WHERE finish = 0 ORDER BY id ASC LIMIT 1"
    );
    res.json(result[0]); // Retorna apenas o primeiro resultado
  } catch (err) {
    console.error("Erro ao buscar andar não finalizado:", err);
    res.status(500).json({ error: "Erro ao buscar andar." });
  }
});

module.exports = router;
