const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { getUserById, getItenByIds } = require("../config/DBs");

router.post("/", authMiddleware, async (req, res) => {
  const { itemId } = req.body;
  const userId = req.user.id;

  try {
    const [rows] = await db.query(
      "SELECT DEPOSITO FROM characters WHERE user_id = ?",
      [userId]
    );

    const character = rows[0];

    if (!character || !character.DEPOSITO) {
      return res.status(404).json({ message: "Depósito não encontrado." });
    }

    let depositoAtual = JSON.parse(character.DEPOSITO);

    const index = depositoAtual.indexOf(itemId);
    if (index === -1) {
      return res
        .status(400)
        .json({ message: "Item não encontrado no depósito." });
    }

    depositoAtual.splice(index, 1);

    const scrapGanho = Math.floor(Math.random() * 401) + 100;

    const novoScrap = (character.scrap || 0) + scrapGanho;

    await db.query(
      "UPDATE characters SET DEPOSITO = ?, SCRAP = SCRAP + ? WHERE user_id = ?",
      [JSON.stringify(depositoAtual), novoScrap, userId]
    );

    return res.json({ 
      scrapGanho,
      scrapTotal: novoScrap,
    });
  } catch (err) {
    console.error("Erro ao remover item:", err);
    return res.status(500).json({ message: "Erro interno ao remover item." });
  }
});

module.exports = router;
