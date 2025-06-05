const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { getCharacterById, getItenByIds } = require("../config/DBs");

router.post("/", authMiddleware, async (req, res) => {
  const gunId = req.body.gunId;
  const userId = req.user.id; // pego do token

  try {
    const character = await getCharacterById(userId);
    const iten = await getItenByIds(gunId);

    if (!character || !iten) {
      return res
        .status(404)
        .json({ message: "Personagem ou item não encontrado." });
    }

    if (character.money < iten.valor) {
      return res.status(400).json({ message: "Dinheiro insuficiente." });
    }

    // Se for a primeira vez, certifique-se que `deposito` seja um array
    const [rows] = await db.query(
      "SELECT deposito, money FROM characters WHERE id = ?",
      [userId]
    );

    const characters = rows[0];
    const depositoAtual = JSON.parse(characters.deposito || "[]"); // se for null, vira array vazio

    // Adiciona o novo item (arma)
    depositoAtual.push(gunId);

    const novoSaldo = character.money - iten.valor;

    // Atualiza no banco de dados
    await db.query(
      "UPDATE characters SET DEPOSITO = ?, money = ? WHERE id = ?",
      [JSON.stringify(depositoAtual), novoSaldo, userId]
    );

    return res.json({ message: "Arma adicionada ao depósito com sucesso." });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao selecionar arma." });
  }
});

module.exports = router;
