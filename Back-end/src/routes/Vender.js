const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { getUserById, getItenByIds } = require("../config/DBs");

router.post("/", authMiddleware, async (req, res) => {
  const { itemId } = req.body;
  const userId = req.user.id;

  try {
    const [[depositoRows], [equipadosRows], [scrapRows]] = await Promise.all([
      db.query("SELECT DEPOSITO FROM characters WHERE user_id = ?", [userId]),
      db.query("SELECT EQUIPADOS FROM characters WHERE user_id = ?", [userId]),
      db.query("SELECT scrap FROM characters WHERE user_id = ?", [userId]),
    ]);

    const DEPOSITO = depositoRows[0]?.DEPOSITO;
    const EQUIPADOS = equipadosRows[0]?.EQUIPADOS;
    const scrap = scrapRows[0]?.scrap ?? 0;

    const itemIdNumber = Number(itemId);

    let depositoAtual = [];
    let equipados = [];

    try {
      depositoAtual =
        typeof DEPOSITO === "string" ? JSON.parse(DEPOSITO.trim()) : [];

      if (Array.isArray(EQUIPADOS)) {
        equipados = EQUIPADOS;
      } else if (
        typeof EQUIPADOS === "string" &&
        EQUIPADOS !== "null" &&
        EQUIPADOS.trim().startsWith("[")
      ) {
        equipados = JSON.parse(EQUIPADOS.trim());
      }
    } catch (err) {
      return res.status(500).json({
        message: "Erro ao processar inventário do personagem.",
      });
    }
    const quantidadeNoDeposito = depositoAtual.filter(
      (id) => id === itemIdNumber
    ).length;

    const estaEquipado = equipados.includes(itemIdNumber);

    if (quantidadeNoDeposito === 1 && estaEquipado) {
      return res.status(400).json({
        STATUS: false,
      });
    }

    const indexToRemove = depositoAtual.indexOf(itemIdNumber);

    const scrapGanho = Math.floor(Math.random() * 401) + 100;
    depositoAtual.splice(indexToRemove, 1);

    await db.query(
      "UPDATE characters SET DEPOSITO = ?, SCRAP = SCRAP + ? WHERE user_id = ?",
      [JSON.stringify(depositoAtual), scrapGanho, userId]
    );

    return res.json({
      STATUS: true,
      scrapGanho: scrapGanho,
    });
  } catch (err) {
    console.error("Erro ao processar venda:", err);
    return res.status(500).json({ message: "Erro interno ao vender item." });
  }
});

module.exports = router;
