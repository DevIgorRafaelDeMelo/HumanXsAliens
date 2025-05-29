// routes/getVideos.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT * FROM videos ORDER BY created_at DESC"
    );

    const videos = results.map((video) => {
      let categories = [];
      try {
        categories = video.categories ? JSON.parse(video.categories) : [];
      } catch (e) {
        console.warn("Erro ao converter categories:", e.message);
      }

      return {
        ...video,
        url: video.url.replace(/\\/g, "/"),
        rating: parseFloat(video.rating),
        categories,
      };
    });
    res.json(videos);
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    res.status(500).json({ error: "Erro ao buscar vídeos" });
  }
});

module.exports = router;
