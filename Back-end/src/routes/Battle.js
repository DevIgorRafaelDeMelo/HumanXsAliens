const authMiddleware = require("../middleware/authMiddleware"); // Confirme o caminho certo
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { getEnemiesByIds, getCharacterById, pool } = require("../config/DBs");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { characterId, enemyIds } = req.body;

    if (!characterId || !enemyIds) {
      return res
        .status(400)
        .json({ error: "Character ID ou Enemy IDs estão indefinidos!" });
    }

    // Buscar jogador e inimigos
    const character = await getCharacterById(characterId);
    const enemies = await getEnemiesByIds(enemyIds);

    const battleResult = await simulateBattle(character, enemies);
    const { turns, winner } = battleResult;

    // Simulação da batalha no novo formato
    return res.status(200).json({
      enemies,
      turns,
      winner,
    });
  } catch (error) { 
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
});

const simulateBattle = async (character, enemy) => {
  const initialPlayerHP = character.health_points;
  const initialEnemyHP = enemy.vida; 

  let playerHP = initialPlayerHP;
  let enemyHP = initialEnemyHP;
  const turns = [];

  while (playerHP > 0 && enemyHP > 0) {
    // Gera variação de -10% a +10%
    const variationFactor = Math.random() * 0.2 - 0.1;

    // **Turno do personagem** (Chance de crítico)
    let danoJogador = Math.max(character.attack_points - enemy.defesa, 0);
    danoJogador = Math.round(danoJogador * (1 + variationFactor));

    if (Math.random() < character.crit_chance) {
      danoJogador = Math.round(danoJogador * character.crit_multiplier); // Multiplica o dano crítico em 50%
    }

    enemyHP -= danoJogador;
    turns.push({ source: "player", dano: danoJogador });

    if (enemyHP <= 0) break;

    // **Turno do inimigo** (25% de aumento em golpes críticos)
    let danoInimigo = Math.max(enemy.ataque - character.defense_points, 0);
    danoInimigo = Math.round(danoInimigo * (1 + variationFactor));

    if (Math.random() < 0.25) {
      danoInimigo = Math.round(danoInimigo * 1.5);
    }

    playerHP -= danoInimigo;
    turns.push({ source: "enemy", dano: danoInimigo });

    if (playerHP <= 0) break;
  }

  // **Determinar o vencedor**
  let winner;
  if (playerHP > 0) {
       await db.execute("UPDATE characters SET alien_id = alien_id + 1 WHERE id = ?", [character.id]);
    winner = "player";
  } else if (enemyHP > 0) {
    winner = "Enemy";
  } else {
    winner = "Empate!";
  }

  return {
    turns,
    winner,
  };
};

 

module.exports = router;
