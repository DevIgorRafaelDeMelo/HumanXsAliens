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

    const [rowsS] = await db.execute(
      `SELECT NV_ITEM FROM ItemUser WHERE ID_USER = ? AND ID_ITEM = ?`,
      [userId, gunId]
    );
    const nivelItem = rowsS.length > 0 ? rows[0].NV_ITEM : iten.NIVEL;

    if (rowsS.length === 0) {
      const vel = parseFloat(iten.CRITICO).toFixed(2);

      const vel1 = parseFloat(iten.MULTIPLO_CRITICO).toFixed(2);

      await db.query(
        `INSERT INTO ItemUser (
        ID_USER, ID_ITEM, NV_ITEM, VIDA, DEFESA, CRITICO, MULTIPLI_CRITICO, DANO
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            NV_ITEM = NV_ITEM + 1,
            VIDA = VALUES(VIDA),
            DEFESA = VALUES(DEFESA),
            CRITICO = VALUES(CRITICO),
            MULTIPLI_CRITICO = VALUES(MULTIPLI_CRITICO),
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

      return res.json({ message: "Arma adicionada ao depósito com sucesso." });
    }
    const vel = (parseFloat(iten.CRITICO) * nivelItem || iten.NIVEL).toFixed(2);

    const vel1 = (
      parseFloat(iten.MULTIPLO_CRITICO) * nivelItem || iten.NIVEL
    ).toFixed(2);

    await db.query(
      `INSERT INTO ItemUser (
        ID_USER, ID_ITEM, NV_ITEM, VIDA, DEFESA, CRITICO, MULTIPLI_CRITICO, DANO
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            NV_ITEM = NV_ITEM + 1,
            VIDA = VALUES(VIDA),
            DEFESA = VALUES(DEFESA),
            CRITICO = VALUES(CRITICO),
            MULTIPLI_CRITICO = VALUES(MULTIPLI_CRITICO),
            DANO = VALUES(DANO)`,
      [
        userId,
        iten.ID,
        iten.NIVEL,
        iten.VIDA * nivelItem || iten.NIVEL,
        iten.DEFESSA * nivelItem || iten.NIVEL,
        vel,
        vel1,
        iten.DANO * nivelItem || iten.NIVEL,
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

    return res.json({ message: "Arma adicionada ao depósito com sucesso." });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao selecionar arma." });
  }
});

module.exports = router;
