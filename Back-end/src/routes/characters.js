const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { getEnemiesByIds, getItenUserByIds } = require("../config/DBs");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [characters] = await db.query(
      "SELECT * FROM characters WHERE user_id = ?",
      [userId]
    );
    const [guns] = await db.query("SELECT * FROM armas ");

    const itensUser = await getItenUserByIds(userId);

    const itensMap = {};
    itensUser.forEach((item) => {
      itensMap[item.ID_ITEM] = item;
    });

    const gunsMescladas = guns.map((gun) => {
      const itemUser = itensMap[gun.ID];

      if (itemUser) {
        return {
          ...gun,
          NIVEL: itemUser.NV_ITEM,
          DANO: itemUser.DANO,
          VIDA: itemUser.VIDA,
          DEFESA: itemUser.DEFESA,
          CRITICO: itemUser.CRITICO.toString(),
          MULTIPLO_CRITICO: itemUser.MULTIPLI_CRITICO.toString(),
        };
      }

      return gun;
    });

    if (characters.length === 0) {
      return res.status(404).json({ message: "Nenhum personagem encontrado." });
    } 
    const alienIds =
      characters.length > 0 ? characters.map((char) => char.alien_id) : [];
    let enemies = await getEnemiesByIds(alienIds[0]);
    res.json({ characters, enemies, guns, gunsMescladas });
  } catch (error) {
    res.status(500).json({ message: "Erro interno ao buscar personagens." });
  }
});

module.exports = router;
