const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { getUserById, getItenByIds } = require("../config/DBs");

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
      await db.query(
        `INSERT INTO ItemUser (ID_USER, ID_ITEM, NV_ITEM, VIDA)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            NV_ITEM = NV_ITEM + 1,
            VIDA = VALUES(VIDA)`,
        [userId, itemId, item.NIVEL + 1 || 1, item.VIDA + item.VIDA * nivelItem]
      );

      console.log("Upou");
      return res.json({ message: "Arma aupdate" });
    } else {
      console.log("SEm saldo ");
      return res.json({ message: "Recursos insuficiente" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Erro ao selecionar arma." });
  }
});

module.exports = router;
