const authMiddleware = require("../middleware/authMiddleware"); // Confirme o caminho certo
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { getEnemiesByIds, getCharacterById, pool } = require("../config/DBs");

router.post("/", authMiddleware, async (req, res) => {
  let exp = 100;
  let money = 1000;
  try {
    const { characterId, enemyIds } = req.body;
    
    if (!characterId || !enemyIds) {
      return res
        .status(400)
        .json({ error: "Character ID ou Enemy IDs estão indefinidos!" });
    }

    const character = await getCharacterById(characterId);
    let enemies = await getEnemiesByIds(enemyIds);

    const battleResult = await simulateBattle(character, enemies, exp, money);
    const { turns, winner } = battleResult;
    if (winner === "player") {
      enemies = await getEnemiesByIds(enemyIds + 1);
      return res.status(200).json({
        exp,
        money,
        enemies,
        turns,
        winner,
      });
    }
    return res.status(200).json({
      enemies,
      turns,
      winner,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
});

const simulateBattle = async (character, enemy, exp, money) => {
  const initialEnemyHP = enemy.vida;
  const lifeTotal =
    character.health_points +
    character.BOOT_SPELL[4] +
    character.CAPA_SPELL[4] +
    character.TORSO_SPELL[4] +
    character.GUN_SPELL[4];
  const danoTotal =
    character.attack_points +
    character.BOOT_SPELL[0] +
    character.CAPA_SPELL[0] +
    character.TORSO_SPELL[0] +
    character.GUN_SPELL[0];
  const danoCrit =
    parseFloat(character.crit_chance) +
    parseFloat(character.BOOT_SPELL[2]) +
    parseFloat(character.CAPA_SPELL[2]) +
    parseFloat(character.TORSO_SPELL[2]) +
    parseFloat(character.GUN_SPELL[2]);

  const danoCritMultiplo =
    parseFloat(character.crit_multiplier) +
    parseFloat(character.BOOT_SPELL[3]) +
    parseFloat(character.CAPA_SPELL[3]) +
    parseFloat(character.TORSO_SPELL[3]) +
    parseFloat(character.GUN_SPELL[3]);
  const defessa =
    character.defense_points +
    character.BOOT_SPELL[1] +
    character.CAPA_SPELL[1] +
    character.TORSO_SPELL[1] +
    character.GUN_SPELL[1];

  let playerHP = lifeTotal;
  let enemyHP = initialEnemyHP;
  const turns = [];

  while (playerHP > 0 && enemyHP > 0) {
    const variationFactor = Math.random() * 0.2 - 0.1;

    let danoJogador = Math.max(danoTotal - enemy.defesa, 0);
    danoJogador = Math.round(danoJogador * (1 + variationFactor));

    if (Math.random() < danoCrit) {
      danoJogador = Math.round(danoJogador * danoCritMultiplo);
    }

    enemyHP -= danoJogador;
    turns.push({ source: "player", dano: danoJogador });

    if (enemyHP <= 0) break;

    let danoInimigo = Math.max(enemy.ataque - defessa, 0);
    danoInimigo = Math.round(danoInimigo * (1 + variationFactor));

    if (Math.random() < 0.25) {
      danoInimigo = Math.round(danoInimigo * 1.5);
    }

    playerHP -= danoInimigo;
    turns.push({ source: "enemy", dano: danoInimigo });

    if (playerHP <= 0) break;
  }

  let winner;
  if (playerHP > 0) {
    winner = "player"; 
    await db.execute(
      "UPDATE characters SET alien_id = alien_id + 1 WHERE user_id = ?",
      [character.user_id]
    );
    await db.execute(
      "UPDATE characters SET exp_points = exp_points + ?, money = money + ? WHERE user_id = ?",
      [exp, money, character.user_id]
    );
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
