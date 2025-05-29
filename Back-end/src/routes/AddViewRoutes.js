const express = require("express");
const router = express.Router();
const db = require("../config/db");

// POST /api/videos/view
router.post("/", (req, res) => {
  const { video } = req.body;

  if (!video) {
    return res.status(400).json({ error: "ID do vídeo é obrigatório" });
  }

  const query = "UPDATE videos SET views = views + 1 WHERE id = ?";
  db.query(query, [video], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar views:", err);
      return res.status(500).json({ error: "Erro interno ao atualizar views" });
    }

    res.status(200).json({ message: "View registrada com sucesso" });
  });
});

module.exports = router;
