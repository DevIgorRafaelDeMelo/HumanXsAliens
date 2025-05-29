const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const pool = require("../config/db");

// Configuração multer para armazenar arquivos localmente em 'uploads/'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // cria nome único para o arquivo
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

async function salvarVideoNoBanco({
  title,
  description,
  rating,
  categories,
  videoPath,
  imagePath, // novo parâmetro para imagem
}) {
  const categoriesJSON = JSON.stringify(categories);

  const sql = `
    INSERT INTO videos (title, description, url, url_img, rating, categories)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.execute(sql, [
      title,
      description,
      videoPath,
      imagePath, // passa aqui o caminho da imagem
      rating || 0,
      categoriesJSON,
    ]);
    return result.insertId;
  } catch (error) {
    console.error("Erro na query de insert:", error);
    throw error;
  }
}

// Rota que recebe dois arquivos: 'url' (vídeo) e 'image_url' (imagem)
router.post(
  "/",
  upload.fields([
    { name: "url", maxCount: 1 },
    { name: "image_url", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, description, rating, categories } = req.body;
      const videoFile = req.files.url ? req.files.url[0] : null;
      const imageFile = req.files.image_url ? req.files.image_url[0] : null;

      const videoId = await salvarVideoNoBanco({
        title,
        description,
        rating,
        categories,
        videoPath: videoFile ? videoFile.path : null,
        imagePath: imageFile ? imageFile.path : null, // passa caminho da imagem aqui
      });

      res.status(201).json({
        message: "Vídeo cadastrado com sucesso",
        videoId,
      });
    } catch (err) {
      console.error("Erro ao cadastrar vídeo:", err);
      res.status(500).json({ error: "Erro ao cadastrar vídeo" });
    }
  }
);

module.exports = router;
