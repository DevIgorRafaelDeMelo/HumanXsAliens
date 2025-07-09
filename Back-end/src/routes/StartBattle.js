const express = require("express");
const router = express.Router();
const { getEnemiesByIds, getCharacterById, pool } = require("../config/DBs");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
 
  try {
    const { characterId, enemyIds } = req.body;

 
    const character = await getCharacterById(characterId);

    const enemies = await getEnemiesByIds(enemyIds);
    if (!character || enemies.length === 0) {
      return res
        .status(404)
        .json({ message: "Personagem ou inimigos não encontrados!" });
    }

 
    const { turns, playerHP } = simulateBattle(character, enemies);

    return res.status(200).json({
      playerHP,
      enemies: enemies.map((e) => ({ id: e.id, nome: e.nome, vida: e.vida })),
      turns,
    });
  } catch (error) { 
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
});

module.exports = router;

 
const simulateBattle = (character, enemies) => {
  let playerHP = character.health_points;
  const turns = [];

  for (const enemy of enemies) {
    let enemyHP = enemy.vida;

    while (playerHP > 0 && enemyHP > 0) {
     
      let danoJogador = Math.max(character.attack_points - enemy.defesa, 0);
      enemyHP -= danoJogador;
      turns.push({ source: "player", dano: danoJogador });

      if (enemyHP <= 0) break;

     
      let danoInimigo = Math.max(enemy.ataque - character.defense_points, 0);
      playerHP -= danoInimigo;
      turns.push({ source: "enemy", dano: danoInimigo });

      if (playerHP <= 0) break;
    }

    if (playerHP <= 0) break; 
  }

  return {
    turns,
    playerHP: Math.max(playerHP, 0),
  };
};
