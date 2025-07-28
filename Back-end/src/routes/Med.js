const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserById,
  getItemMedKitById,
  getFullLive,
} = require("../config/DBs");

router.post("/", authMiddleware, async (req, res) => {
  const qtdItemMed = req.body.qtd;
  const idMed = req.body.idMed;
  const userId = req.user.id;

  const user = await getUserById(userId);
  const totalLive = await getFullLive(userId);

  const lifeNow = user.CHAR_VIDA_ATUAL;

  switch (idMed) {
    case 1:
      if (lifeNow < totalLive) {
        let incremento = 1000;
        const vidaFinal = Math.min(lifeNow + incremento, totalLive);
        const vidaGanha = vidaFinal - lifeNow;

        await db.query(
          "UPDATE characters SET DEP_MEDKIT_UM = DEP_MEDKIT_UM - ?, CHAR_VIDA_ATUAL = CHAR_VIDA_ATUAL + ? WHERE user_id = ?",
          [qtdItemMed, vidaGanha, userId]
        );
      } else {
        console.log("Personagem já está com vida cheia!");
      }
      break;

    case 2:
      if (lifeNow < totalLive) {
        let incremento = 2000;
        const vidaFinal = Math.min(lifeNow + incremento, totalLive);
        const vidaGanha = vidaFinal - lifeNow;

        await db.query(
          "UPDATE characters SET DEP_MEDKIT_UM = DEP_MEDKIT_UM - ?, CHAR_VIDA_ATUAL = CHAR_VIDA_ATUAL + ? WHERE user_id = ?",
          [qtdItemMed, vidaGanha, userId]
        );
      } else {
        console.log("Personagem já está com vida cheia!");
      }
      break;
    case 3:
      if (lifeNow < totalLive) {
        let incremento = 3000;
        const vidaFinal = Math.min(lifeNow + incremento, totalLive);
        const vidaGanha = vidaFinal - lifeNow;

        await db.query(
          "UPDATE characters SET DEP_MEDKIT_UM = DEP_MEDKIT_UM - ?, CHAR_VIDA_ATUAL = CHAR_VIDA_ATUAL + ? WHERE user_id = ?",
          [qtdItemMed, vidaGanha, userId]
        );
      } else {
        console.log("Personagem já está com vida cheia!");
      }
      break;
    case 4:
      if (lifeNow < totalLive) {
        let incremento = 4000;
        const vidaFinal = Math.min(lifeNow + incremento, totalLive);
        const vidaGanha = vidaFinal - lifeNow;

        await db.query(
          "UPDATE characters SET DEP_MEDKIT_UM = DEP_MEDKIT_UM - ?, CHAR_VIDA_ATUAL = CHAR_VIDA_ATUAL + ? WHERE user_id = ?",
          [qtdItemMed, vidaGanha, userId]
        );
      } else {
        console.log("Personagem já está com vida cheia!");
      }
      break;
    case 5:
      if (lifeNow < totalLive) {
        let incremento = 5000;
        const vidaFinal = Math.min(lifeNow + incremento, totalLive);
        const vidaGanha = vidaFinal - lifeNow;

        await db.query(
          "UPDATE characters SET DEP_MEDKIT_UM = DEP_MEDKIT_UM - ?, CHAR_VIDA_ATUAL = CHAR_VIDA_ATUAL + ? WHERE user_id = ?",
          [qtdItemMed, vidaGanha, userId]
        );
      } else {
        console.log("Personagem já está com vida cheia!");
      }
      break;
    case 6:
      if (lifeNow < totalLive) {
        let incremento = 6000;
        const vidaFinal = Math.min(lifeNow + incremento, totalLive);
        const vidaGanha = vidaFinal - lifeNow;

        await db.query(
          "UPDATE characters SET DEP_MEDKIT_UM = DEP_MEDKIT_UM - ?, CHAR_VIDA_ATUAL = CHAR_VIDA_ATUAL + ? WHERE user_id = ?",
          [qtdItemMed, vidaGanha, userId]
        );
      } else {
        console.log("Personagem já está com vida cheia!");
      }
      break;
    default:
      console.log("Item desconhecido");
      break;
  }

  try {
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar andar." });
  }
});

module.exports = router;
