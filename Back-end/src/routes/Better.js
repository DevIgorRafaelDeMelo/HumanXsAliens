const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { getUserById, getItenByIds, getItenUserById } = require("../config/DBs");
const { Types } = require("mysql2");

router.post("/", authMiddleware, async (req, res) => {
  const itemId = req.body.id;
  const userId = req.user.id;

  try {
    const item = await getItenByIds(itemId);
    const user = await getUserById(userId);

    const [rows] = await db.execute(
      `SELECT NV_ITEM FROM ItemUser WHERE ID_USER = ? AND ID_ITEM = ?`,
      [userId, itemId]
    );

    const nivelItem = rows.length > 0 ? rows[0].NV_ITEM : item.NIVEL;

    const updateTotalScrap = 895 * nivelItem;
    const updateTotalMoney = 1230 * nivelItem;

    const userMoney = user.money;
    const userScrap = user.SCRAP;

    if (userMoney >= updateTotalMoney && userScrap >= updateTotalScrap) {
      await db.execute(
        `UPDATE characters
            SET money = money - ?, SCRAP = SCRAP - ?
            WHERE user_id = ?`,
        [updateTotalMoney, updateTotalScrap, userId]
      );
      const vel = (
        parseFloat(item.CRITICO) +
        parseFloat(item.CRITICO) * nivelItem
      ).toFixed(2);

      const vel1 = (
        parseFloat(item.MULTIPLO_CRITICO) +
        parseFloat(item.MULTIPLO_CRITICO) * nivelItem
      ).toFixed(2);
      await db.query(
        `INSERT INTO ItemUser (
        ID_USER, ID_ITEM, NV_ITEM, VIDA, DEFESA, USER_ITEM_CRITICO, USER_ITEM_MULTIPLI_CRITICO, DANO
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            NV_ITEM = NV_ITEM + 1,
            VIDA = VALUES(VIDA),
            DEFESA = VALUES(DEFESA),
            USER_ITEM_CRITICO = VALUES(USER_ITEM_CRITICO),
            USER_ITEM_MULTIPLI_CRITICO = VALUES(USER_ITEM_MULTIPLI_CRITICO),
            DANO = VALUES(DANO)`,
        [
          userId,
          itemId,
          item.NIVEL + 1 || 1,
          item.VIDA + item.VIDA * nivelItem,
          item.DEFESSA + item.DEFESSA * nivelItem,
          vel,
          vel1,
          item.DANO + item.DANO * nivelItem,
        ]
      );

      const newItem = await getItenUserById(userId, itemId);
      const objetoFinal = {
        ...item,
        ...newItem["0"],
      };

      let queryUpdate = "";
      let valuesUpdate = [];
      let querySpell = "";
      let valuesSpell = [];
      const dadosAtualizados = [
        item.VIDA + item.VIDA * nivelItem,
        item.DANO + item.DANO * nivelItem,
        item.DEFESSA + item.DEFESSA * nivelItem,
        vel,
        vel1,
      ];

      switch (item.TYPE) {
        case "Arma":
          queryUpdate = "UPDATE characters SET GUN = ? WHERE user_id = ?";
          valuesUpdate = [item.ID, userId];
          querySpell = ` UPDATE characters  SET  GUN_SPELL = JSON_ARRAY(?, ?, ?, ?, ?), EQUIPADOS = JSON_SET(EQUIPADOS, '$[0]', ?) WHERE user_id = ?; `;
          valuesSpell = [...dadosAtualizados, item.ID, userId];

          break;

        case "Capa":
          queryUpdate = "UPDATE characters SET CAPA = ? WHERE user_id = ?";
          valuesUpdate = [item.ID, userId];
          querySpell = ` UPDATE characters  SET  CAPA_SPELL = JSON_ARRAY(?, ?, ?, ?, ?), EQUIPADOS = JSON_SET(EQUIPADOS, '$[1]', ?) WHERE user_id = ?; `;
          valuesSpell = [...dadosAtualizados, item.ID, userId];
          break;

        case "Armadura":
          queryUpdate = "UPDATE characters SET TORSO = ? WHERE user_id = ?";
          valuesUpdate = [item.ID, userId];
          querySpell = ` UPDATE characters  SET  TORSO_SPELL = JSON_ARRAY(?, ?, ?, ?, ?), EQUIPADOS = JSON_SET(EQUIPADOS, '$[2]', ?) WHERE user_id = ?; `;
          valuesSpell = [...dadosAtualizados, item.ID, userId];
          break;

        case "Buts":
          queryUpdate = "UPDATE characters SET BOOT = ? WHERE user_id = ?";
          valuesUpdate = [item.ID, userId];
          querySpell = ` UPDATE characters  SET  BOOT_SPELL = JSON_ARRAY(?, ?, ?, ?, ?), EQUIPADOS = JSON_SET(EQUIPADOS, '$[3]', ?) WHERE user_id = ?; `;
          valuesSpell = [...dadosAtualizados, item.ID, userId];
          break;

        default:
          return res.status(400).json({ error: "Categoria inválida." });
      }

      await db.query(queryUpdate, valuesUpdate);

      if (querySpell) {
        await db.query(querySpell, valuesSpell);
      } 
      return res.json({
        characters: user,
        items: objetoFinal,
      });
    } else {
      return res.json({ message: "Recursos insuficiente" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Erro ao selecionar arma." });
  }
});

module.exports = router;
