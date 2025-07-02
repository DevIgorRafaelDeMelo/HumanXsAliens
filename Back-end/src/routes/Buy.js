const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { getUserById, getItenByIds } = require("../config/DBs");

router.post("/", authMiddleware, async (req, res) => {
  const gunId = req.body.gunId;
  const userId = req.user.id;  

  try {
    const character = await getUserById(userId);
    const iten = await getItenByIds(gunId);
     
    if (character.money < iten.valor) {
      return res.status(400).json({ message: "Dinheiro insuficiente." });
    }
 
    const [rows] = await db.query(
      "SELECT DEPOSITO, money FROM characters WHERE user_id = ?",
      [userId]
    );

    const characters = rows[0];
    console.log(characters)
    const depositoAtual = characters.DEPOSITO
      ? JSON.parse(characters.DEPOSITO)
      : [];
 
    depositoAtual.push(gunId);

    const novoSaldo = characters.money - iten.PRECO;
  
    await db.query(
      "UPDATE characters SET DEPOSITO = ?, money = ? WHERE user_id = ?",
      [JSON.stringify(depositoAtual), novoSaldo, userId]
    );

    return res.json({ message: "Arma adicionada ao depósito com sucesso." });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao selecionar arma." });
  }
});

module.exports = router;
