const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const { getItemMedKit } = require("../config/DBs");

router.post("/", authMiddleware, async (req, res) => {
  const medKits = await getItemMedKit();

  console.log(medKits);
});

module.exports = router;
