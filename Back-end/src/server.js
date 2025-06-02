const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");
const charactersRoutes = require("./routes/characters");
const registerCharacter = require("./routes/registerCharaters");
const thower = require("./routes/thower");
const aliens = require("./routes/aliens");
const startBattle = require("./routes/startBattle");

dotenv.config(); // carrega variáveis do .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Você pode usar isso em vez de bodyParser
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve arquivos estáticos

// Rotas públicas
app.use("/auth", authRoutes);
app.use("/characters", charactersRoutes);
app.use("/registerCharater", registerCharacter);
app.use("/andares", thower);
app.use("/aliens", aliens);
app.use("/start-battle", startBattle);
// Rota protegida para teste
app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Bem-vindo, usuário ${req.user.id}` });
});

// Início do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
