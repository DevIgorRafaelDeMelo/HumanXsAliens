const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {
  const { videoId, action } = req.body;

  if (!videoId || !action) {
    return res.status(400).json({ message: "Dados inválidos!" });
  }

  let query = "";
  if (action === "like") {
    query = "UPDATE videos SET likes = likes + 1 WHERE id = ?";
  } else if (action === "dislike") {
    query = "UPDATE videos SET dislikes = dislikes + 1 WHERE id = ?";
  } else {
    return res.status(400).json({ message: "Ação inválida!" });
  }

  db.query(query, [videoId], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar curtida/descurtida:", err);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
    res.status(200).json({ message: "Atualização realizada com sucesso!" });
  });
});

module.exports = router;
