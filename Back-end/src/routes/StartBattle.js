const express = require("express");
const router = express.Router();
const { getEnemiesByIds, getCharacterById, pool } = require("../config/DBs"); // Supondo que você tenha uma conexão com o banco
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { characterId, enemyIds } = req.body;

    // 🔍 Buscar jogador e inimigos no banco de dados
    const character = await getCharacterById(characterId);
    const enemies = await getEnemiesByIds(enemyIds);
    if (!character || enemies.length === 0) {
      return res
        .status(404)
        .json({ message: "Personagem ou inimigos não encontrados!" });
    }

    // 🔥 Simulação da batalha (aqui pode colocar regras de combate)
    const battleResult = simulateBattle(character, enemies);

    return res.status(200).json({ message: "Batalha iniciada!", battleResult });
  } catch (error) {
    console.error("Erro ao processar batalha:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
});

module.exports = router;

const simulateBattle = (character, enemies) => {
  let playerHP = character.health_points;
  let battleLog = [];

  for (const enemy of enemies) {
    let enemyHP = enemy.vida;

    while (playerHP > 0 && enemyHP > 0) {
      // 🔥 Turno do personagem
      let damageToEnemy = Math.max(character.attack_points - enemy.defesa, 0);
      enemyHP -= damageToEnemy;
      battleLog.push(damageToEnemy, enemyHP);

      if (enemyHP <= 0) {
        continue;
      }

      // 🔥 Turno do inimigo
      let damageToPlayer = Math.max(enemy.ataque - character.defense_points, 0);
      playerHP -= damageToPlayer;
      battleLog.push(damageToPlayer, playerHP);

      if (playerHP <= 0) {
        break;
      }
    }
  }
  return {
    vencedor: playerHP > 0 ? character.name : "Inimigos",
    battleLog,
  };
};
