const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getEnemiesByIds,
  getItenUserByIds,
  getItemMedKit,
} = require("../config/DBs");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const medKits = await getItemMedKit();

    const [characters] = await db.query(
      "SELECT * FROM characters WHERE user_id = ?",
      [userId]
    );
    const [guns] = await db.query("SELECT * FROM armas ");

    const itensUser = await getItenUserByIds(userId);

    const listaMedKits = [
      { ID: 1, QTD_ITEM: characters[0].DEP_MEDKIT_UM, LIFE_TOTAL: 1000 },
      { ID: 2, QTD_ITEM: characters[0].DEP_MEDKIT_DOIS, LIFE_TOTAL: 2000 },
      { ID: 3, QTD_ITEM: characters[0].DEP_MEDKIT_TREIS, LIFE_TOTAL: 3000 },
      { ID: 4, QTD_ITEM: characters[0].DEP_MEDKIT_QUATRO, LIFE_TOTAL: 4000 },
      { ID: 5, QTD_ITEM: characters[0].DEP_MEDKIT_CINCO, LIFE_TOTAL: 5000 },
      { ID: 6, QTD_ITEM: characters[0].DEP_MEDKIT_SEIS, LIFE_TOTAL: 6000 },
    ];
    const medKitsCompletos = listaMedKits.map((lista) => {
      const dadosExtra = medKits.find((m) => m.ID === lista.ID);
      return {
        ...lista,
        ...dadosExtra,
      };
    });

    const itensMap = {};
    itensUser.forEach((item) => {
      itensMap[item.ID_ITEM] = item;
    });
    const VIDA_TOTAL =
      characters[0].health_points +
      characters[0].BOOT_SPELL[0] +
      characters[0].GUN_SPELL[0] +
      characters[0].TORSO_SPELL[0] +
      characters[0].CAPA_SPELL[0];
    const DANO_TOTAL =
      characters[0].attack_points +
      characters[0].BOOT_SPELL[1] +
      characters[0].GUN_SPELL[1] +
      characters[0].TORSO_SPELL[1] +
      characters[0].CAPA_SPELL[1];
    const DEFESA_TOTAL =
      characters[0].defense_points +
      characters[0].BOOT_SPELL[2] +
      characters[0].GUN_SPELL[2] +
      characters[0].TORSO_SPELL[2] +
      characters[0].CAPA_SPELL[2];
    const CRITICO_TOTAL =
      +characters[0].crit_chance +
      +characters[0].BOOT_SPELL[3] +
      +characters[0].GUN_SPELL[3] +
      +characters[0].TORSO_SPELL[3] +
      +characters[0].CAPA_SPELL[3];
    const MULT_CRITICO_TOTAL =
      +characters[0].crit_multiplier +
      +characters[0].BOOT_SPELL[4] +
      +characters[0].GUN_SPELL[4] +
      +characters[0].TORSO_SPELL[4] +
      +characters[0].CAPA_SPELL[4];

    characters[0].VIDA_TOTAL = VIDA_TOTAL;
    characters[0].DANO_TOTAL = DANO_TOTAL;
    characters[0].DEFESA_TOTAL = DEFESA_TOTAL;
    characters[0].CRITICO_TOTAL = CRITICO_TOTAL;
    characters[0].MULT_CRITICO_TOTAL = MULT_CRITICO_TOTAL;

    const porcentagemVida = Math.max(
      0,
      Math.min((characters[0].CHAR_VIDA_ATUAL / VIDA_TOTAL) * 100, 100)
    );

    characters[0].PORC_VIDA = porcentagemVida;

    const gunsMescladas = guns.map((gun) => {
      const itemUser = itensMap[gun.ID];

      if (itemUser) {
        return {
          ...gun,
          NIVEL: itemUser.NV_ITEM,
          DANO: itemUser.DANO,
          VIDA: itemUser.USER_ITEM_VIDA,
          DEFESA: itemUser.DEFESA,
          CRITICO: itemUser.USER_ITEM_CRITICO.toString(),
          MULTIPLO_CRITICO: itemUser.USER_ITEM_MULTIPLI_CRITICO.toString(),
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

    res.json({
      characters,
      enemies,
      guns,
      gunsMescladas,
      medKits,
      listaMedKits,
      medKitsCompletos,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro interno ao buscar personagens." });
  }
});

module.exports = router;
