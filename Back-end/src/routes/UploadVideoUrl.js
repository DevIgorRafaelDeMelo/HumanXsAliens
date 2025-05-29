const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");

// Configuração do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image_url"), (req, res) => {
  const { title, url, categories } = req.body;

  const image_url = req.file ? `uploads\\${req.file.filename}` : null;

  const query = `
    INSERT INTO videos (title, url, url_img, categories)
    VALUES (?, ?, ?, ?)
  `;

  let parsedCategories;

  try {
    parsedCategories =
      typeof categories === "string" ? JSON.parse(categories) : categories;
  } catch (err) {
    console.error("Erro ao fazer parse das categorias:", err);
    return res.status(400).json({ error: "Categorias inválidas" });
  }

  db.query(
    query,
    [title, url, image_url, JSON.stringify(parsedCategories)],
    (err, result) => {
      if (err) {
        console.error("Erro ao cadastrar vídeo:", err);
        return res.status(500).json({ error: "Erro ao cadastrar vídeo" });
      }

      res.json({
        status: "ok",
        message: "Vídeo cadastrado com sucesso!",
        videoId: result.insertId,
      });
    }
  );
});

module.exports = router;
