const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserById,
  getItenByIds,
  getItemMedKitById,
} = require("../config/DBs");

router.post("/", authMiddleware, async (req, res) => {
  const gunId = req.body.item;
  const userId = req.user.id;
  const medKit = req.body.medKit;
  const Qtd = req.body.quantidade;

  if (medKit) {
    const character = await getUserById(userId);
    const item = await getItemMedKitById(gunId);

    const valorTotalItems = item[0].VALOR_ITEM * Qtd;

    if (valorTotalItems < character.money) {
      const valorAtual = character.money - valorTotalItems;

      await db.query("UPDATE characters SET money = ? WHERE user_id = ?", [
        valorAtual,
        userId,
      ]);

      switch (gunId) {
        case 1:
          await db.query(
            "UPDATE characters SET DEP_MEDKIT_UM = DEP_MEDKIT_UM + ? WHERE user_id = ?",
            [Qtd, userId]
          );
          break;
        case 2:
          await db.query(
            "UPDATE characters SET DEP_MEDKIT_DOIS = DEP_MEDKIT_DOIS + ? WHERE user_id = ?",
            [Qtd, userId]
          );
          break;
        case 3:
          await db.query(
            "UPDATE characters SET DEP_MEDKIT_TREIS = DEP_MEDKIT_TREIS + ? WHERE user_id = ?",
            [Qtd, userId]
          );
          break;
        case 4:
          await db.query(
            "UPDATE characters SET DEP_MEDKIT_QUATRO = DEP_MEDKIT_QUATRO + ? WHERE user_id = ?",
            [Qtd, userId]
          );
          break;
        case 5:
          await db.query(
            "UPDATE characters SET DEP_MEDKIT_CINCO = DEP_MEDKIT_CINCO + ? WHERE user_id = ?",
            [Qtd, userId]
          );
          break;
        case 6:
          await db.query(
            "UPDATE characters SET DEP_MEDKIT_SEIS = DEP_MEDKIT_SEIS + ? WHERE user_id = ?",
            [Qtd, userId]
          );
          break;
        default:
          console.log("Item desconhecido");
          break;
      }
      return res.json({
        message: "Arma adicionada ao depósito com sucesso.",
      });
    } else {
      if (character.money < valorTotalItems) {
        return res.status(400).json({ message: "Dinheiro insuficiente." });
      }
    }
  }

  if (!medKit) {
    try {
      const character = await getUserById(userId);
      const iten = await getItenByIds(gunId);

      const [rows] = await db.query(
        "SELECT DEPOSITO, money FROM characters WHERE user_id = ?",
        [userId]
      );
      const [rowsS] = await db.execute(
        `SELECT NV_ITEM FROM ItemUser WHERE ID_USER = ? AND ID_ITEM = ?`,
        [userId, gunId]
      );

      if (character.money < iten.valor) {
        return res.status(400).json({ message: "Dinheiro insuficiente." });
      }

      if (rowsS.length === 0) {
        const vel = parseFloat(iten.CRITICO).toFixed(2);

        const vel1 = parseFloat(iten.MULTIPLO_CRITICO).toFixed(2);

        await db.query(
          `INSERT INTO ItemUser (
        ID_USER, ID_ITEM, NV_ITEM, USER_ITEM_VIDA, DEFESA, USER_ITEM_CRITICO, USER_ITEM_MULTIPLI_CRITICO, DANO
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            NV_ITEM = NV_ITEM + 1,
            USER_ITEM_VIDA = VALUES(USER_ITEM_VIDA),
            DEFESA = VALUES(DEFESA),
            USER_ITEM_CRITICO = VALUES(USER_ITEM_CRITICO),
            USER_ITEM_MULTIPLI_CRITICO = VALUES(USER_ITEM_MULTIPLI_CRITICO),
            DANO = VALUES(DANO)`,
          [
            userId,
            iten.ID,
            iten.NIVEL,
            iten.VIDA,
            iten.DEFESSA,
            vel,
            vel1,
            iten.DANO,
          ]
        );
        const characters = rows[0];
        const depositoAtual = characters.DEPOSITO
          ? JSON.parse(characters.DEPOSITO)
          : [];

        depositoAtual.push(gunId);

        const novoSaldo = characters.money - iten.PRECO;

        await db.query(
          "UPDATE characters SET DEPOSITO = ?, money = ? WHERE user_id = ?",
          [JSON.stringify(depositoAtual), novoSaldo, userId]
        );

        return res.json({
          message: "Arma adicionada ao depósito com sucesso.",
        });
      }

      if (rowsS.length >= 1) {
        const characters = rows[0];
        const depositoAtual = characters.DEPOSITO
          ? JSON.parse(characters.DEPOSITO)
          : [];
        depositoAtual.push(gunId);

        const novoSaldo = characters.money - iten.PRECO;

        await db.query(
          "UPDATE characters SET DEPOSITO = ?, money = ? WHERE user_id = ?",
          [JSON.stringify(depositoAtual), novoSaldo, userId]
        );

        return res.json({
          message: "Arma adicionada ao depósito com sucesso.",
        });
      }
    } catch (err) {
      return res.status(500).json({ message: "Erro ao selecionar arma." });
    }
  }
});

module.exports = router;
