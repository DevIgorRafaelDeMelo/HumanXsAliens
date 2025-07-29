const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { getUserById, getFullLive } = require("../config/DBs");

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
        const valorMedKit = 1000;
        const incremento = valorMedKit * qtdItemMed;

        const vidaFinal = Math.min(lifeNow + incremento, totalLive);
        const vidaGanha = vidaFinal - lifeNow;

        const qtdRealUsada = Math.ceil(vidaGanha / valorMedKit);

        await db.query(
          "UPDATE characters SET DEP_MEDKIT_UM = DEP_MEDKIT_UM - ?, CHAR_VIDA_ATUAL = CHAR_VIDA_ATUAL + ? WHERE user_id = ?",
          [qtdRealUsada, vidaGanha, userId]
        );
      } else {
        console.log("Personagem já está com vida cheia!");
        return res.json({ Status: false });
      }
      break;

    case 2:
      if (lifeNow < totalLive) {
        const valorMedKit = 2000;
        const incremento = valorMedKit * qtdItemMed;

        const vidaFinal = Math.min(lifeNow + incremento, totalLive);
        const vidaGanha = vidaFinal - lifeNow;

        const qtdRealUsada = Math.ceil(vidaGanha / valorMedKit);

        await db.query(
          "UPDATE characters SET DEP_MEDKIT_UM = DEP_MEDKIT_UM - ?, CHAR_VIDA_ATUAL = CHAR_VIDA_ATUAL + ? WHERE user_id = ?",
          [qtdRealUsada, vidaGanha, userId]
        );
      } else {
        console.log("Personagem já está com vida cheia!");
        return res.json({ Status: false });
      }
      break;
    case 3:
      if (lifeNow < totalLive) {
        const valorMedKit = 3000;
        const incremento = valorMedKit * qtdItemMed;

        const vidaFinal = Math.min(lifeNow + incremento, totalLive);
        const vidaGanha = vidaFinal - lifeNow;

        const qtdRealUsada = Math.ceil(vidaGanha / valorMedKit);

        await db.query(
          "UPDATE characters SET DEP_MEDKIT_UM = DEP_MEDKIT_UM - ?, CHAR_VIDA_ATUAL = CHAR_VIDA_ATUAL + ? WHERE user_id = ?",
          [qtdRealUsada, vidaGanha, userId]
        );
      } else {
        console.log("Personagem já está com vida cheia!");
        return res.json({ Status: false });
      }
      break;
    case 4:
      if (lifeNow < totalLive) {
        const valorMedKit = 4000;
        const incremento = valorMedKit * qtdItemMed;

        const vidaFinal = Math.min(lifeNow + incremento, totalLive);
        const vidaGanha = vidaFinal - lifeNow;

        const qtdRealUsada = Math.ceil(vidaGanha / valorMedKit);

        await db.query(
          "UPDATE characters SET DEP_MEDKIT_UM = DEP_MEDKIT_UM - ?, CHAR_VIDA_ATUAL = CHAR_VIDA_ATUAL + ? WHERE user_id = ?",
          [qtdRealUsada, vidaGanha, userId]
        );
      } else {
        console.log("Personagem já está com vida cheia!");
        return res.json({ Status: false });
      }
      break;
    case 5:
      if (lifeNow < totalLive) {
        const valorMedKit = 5000;
        const incremento = valorMedKit * qtdItemMed;

        const vidaFinal = Math.min(lifeNow + incremento, totalLive);
        const vidaGanha = vidaFinal - lifeNow;

        const qtdRealUsada = Math.ceil(vidaGanha / valorMedKit);

        await db.query(
          "UPDATE characters SET DEP_MEDKIT_UM = DEP_MEDKIT_UM - ?, CHAR_VIDA_ATUAL = CHAR_VIDA_ATUAL + ? WHERE user_id = ?",
          [qtdRealUsada, vidaGanha, userId]
        );
      } else {
        console.log("Personagem já está com vida cheia!");
        return res.json({ Status: false });
      }
      break;
    case 6:
      if (lifeNow < totalLive) {
        const valorMedKit = 6000;
        const incremento = valorMedKit * qtdItemMed;

        const vidaFinal = Math.min(lifeNow + incremento, totalLive);
        const vidaGanha = vidaFinal - lifeNow;

        const qtdRealUsada = Math.ceil(vidaGanha / valorMedKit);

        await db.query(
          "UPDATE characters SET DEP_MEDKIT_UM = DEP_MEDKIT_UM - ?, CHAR_VIDA_ATUAL = CHAR_VIDA_ATUAL + ? WHERE user_id = ?",
          [qtdRealUsada, vidaGanha, userId]
        );
      } else {
        console.log("Personagem já está com vida cheia!");
        return res.json({ Status: false });
      }
      break;
    default:
      console.log("Item desconhecido");
      break;
  }

  return res.json({ Status: true });
});

module.exports = router;
