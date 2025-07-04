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
    const [rowss] = await db.query(
      "SELECT EQUIPADOS FROM characters WHERE user_id = ?",
      [userId]
    );

    const character = rows[0];
    const equipado = rowss[0];

    if (!character || !character.DEPOSITO) {
      return res.status(404).json({ message: "Depósito não encontrado." });
    }
    let depositoAtual;
    try {
      depositoAtual = JSON.parse(character.DEPOSITO.trim());
    } catch (error) {
      console.error("Erro ao fazer parse do DEPOSITO:", error.message);
      return res.status(500).json({
        message: "Formato inválido do depósito. Não foi possível processar.",
      });
    }

    let equipados = [];

    try {
      if (typeof equipado.EQUIPADOS === "string") {
        equipados = JSON.parse(equipado.EQUIPADOS.trim());
      } else if (Array.isArray(equipado.EQUIPADOS)) {
        equipados = equipado.EQUIPADOS;
      } else {
        console.warn("Formato inesperado em EQUIPADOS:", equipado.EQUIPADOS);
      }
    } catch (error) {
      console.error("Erro ao fazer parse de EQUIPADOS:", error.message);
      return res
        .status(500)
        .json({ message: "Itens equipados em formato inválido." });
    }

    const contagemDeposito = {};
    depositoAtual.forEach((id) => {
      contagemDeposito[id] = (contagemDeposito[id] || 0) + 1;
    });
    for (const itemIds of Object.keys(contagemDeposito)) {
      const quantidade = contagemDeposito[itemIds];
      const idNumerico = parseInt(itemIds);

      const estaEquipado = equipados.includes(idNumerico);
      console.log(
        "equipados:",
        equipado,
        "deposito:",
        depositoAtual,
        "id :",
        itemIds,
        "quantidade",
        quantidade,
        "Está equipado :",
        estaEquipado
      );
      if (quantidade === 1 && estaEquipado) {
        console.log(
          `⚠️ O item ${itemIds} está equipado e só há uma unidade no depósito.`
        );

        return res.status(400).json({
          message: `O item ${itemId} está equipado e não há outra unidade disponível. Ação bloqueada.`,
        });
      }
      const index = depositoAtual.indexOf(itemId);

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
    }
  } catch (err) {
    console.error("Erro ao remover item:", err);
    return res.status(500).json({ message: "Erro interno ao remover item." });
  }
});

module.exports = router;
