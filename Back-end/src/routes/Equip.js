const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { getItenByIds, getUserById } = require("../config/DBs");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;

    if (!id || !userId) {
      return res
        .status(400)
        .json({ error: "ID do item ou ID do usuário ausente." });
    }

    const itemUpdate = await getItenByIds(id);
    const user = await getUserById(userId);

    if (!itemUpdate) {
      return res.status(404).json({ error: "Item não encontrado." });
    }

    let queryUpdate = "";
    let valuesUpdate = [];
    let querySpell = "";
    let valuesSpell = [];
    const dadosAtualizados = [
      itemUpdate.VIDA,
      itemUpdate.DANO,
      itemUpdate.DEFESSA,
      itemUpdate.CRITICO,
      itemUpdate.MULTIPLO_CRITICO,
    ];

    switch (itemUpdate.TYPE) {
      case "Arma":
        queryUpdate = "UPDATE characters SET GUN = ? WHERE user_id = ?";
        valuesUpdate = [itemUpdate.ID, userId];
        querySpell = ` UPDATE characters SET GUN_SPELL = JSON_ARRAY(?, ?, ?, ?, ?) WHERE user_id = ?`;
        valuesSpell = [...dadosAtualizados, userId];

        break;

      case "Capa":
        queryUpdate = "UPDATE characters SET CAPA = ? WHERE user_id = ?";
        valuesUpdate = [itemUpdate.ID, userId];
        querySpell = "UPDATE characters SET CAPA_SPELL = JSON_ARRAY(?, ?, ?, ?, ?) WHERE user_id = ?";
        valuesSpell = [...dadosAtualizados, userId];
        break;

      case "Armadura":
        queryUpdate = "UPDATE characters SET TORSO = ? WHERE user_id = ?";
        valuesUpdate = [itemUpdate.ID, userId];
        querySpell = "UPDATE characters SET TORSO_SPELL = JSON_ARRAY(?, ?, ?, ?, ?) WHERE user_id = ?";
        valuesSpell = [...dadosAtualizados, userId];
        break;

      case "Buts":
        queryUpdate = "UPDATE characters SET BOOT = ? WHERE user_id = ?";
        valuesUpdate = [itemUpdate.ID, userId];
        querySpell = "UPDATE characters SET BOOT_SPELL = JSON_ARRAY(?, ?, ?, ?, ?) WHERE user_id = ?";
        valuesSpell = [...dadosAtualizados, userId];
        break;

      default:
        return res.status(400).json({ error: "Categoria inválida." });
    }

    await db.query(queryUpdate, valuesUpdate);

    if (querySpell) {
      await db.query(querySpell, valuesSpell);
    }

    res.json({
      message: `Item ${itemUpdate.ID} equipado com sucesso!`,
      characters: user,
    });
  } catch (error) {
    console.error("Erro na consulta:", error);
    res.status(500).json({ error: "Erro ao equipar item." });
  }
});

module.exports = router;
