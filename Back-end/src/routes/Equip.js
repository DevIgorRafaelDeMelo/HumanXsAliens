const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { getItenByIds, getCharacterById } = require("../config/DBs");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;

    // Verificar se o ID está presente
    if (!id || !userId) {
      return res
        .status(400)
        .json({ error: "ID do item ou ID do usuário ausente." });
    }

    const itemUpdate = await getItenByIds(id);
    const user = await getCharacterById(userId);

    if (!itemUpdate) {
      return res.status(404).json({ error: "Item não encontrado." });
    }

    let query = "";
    let values = [];

    // Atualizar a coluna correta
    switch (itemUpdate.categoria) {
      case "Arma":
        query = "UPDATE characters SET GUN = ? WHERE user_id = ?";
        values = [itemUpdate.id, userId];
        break;
      case "Capa":
        query = "UPDATE characters SET CAPA = ? WHERE user_id = ?";
        values = [itemUpdate.id, userId];
        break;
      case "Armadura":
        query = "UPDATE characters SET TORSO = ? WHERE user_id = ?";
        values = [itemUpdate.id, userId];
        break;
      case "Buts":
        query = "UPDATE characters SET BOOT = ? WHERE user_id = ?";
        values = [itemUpdate.id, userId];
        break;
      default:
        return res.status(400).json({ error: "Categoria inválida." });
    }

    await db.query(query, values);

    res.json({ message: `Item ${itemUpdate.id} equipado com sucesso!`, user });
  } catch (error) {
    console.error("Erro na consulta:", error);
    res.status(500).json({ error: "Erro ao equipar item." });
  }
});

module.exports = router;
