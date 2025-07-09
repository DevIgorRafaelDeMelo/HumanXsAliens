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
const Battle = require("./routes/Battle");
const StartBattle = require("./routes/StartBattle");
const Buy = require("./routes/Buy");
const Equip = require("./routes/Equip");
const Vender = require("./routes/Vender");
const Better = require("./routes/Better");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/characters", charactersRoutes);
app.use("/registerCharater", registerCharacter);
app.use("/andares", thower);
app.use("/aliens", aliens);
app.use("/start-battle", StartBattle);
app.use("/battle", Battle);
app.use("/buy", Buy);
app.use("/equipar", Equip);
app.use("/vender", Vender);
app.use("/Better", Better);

app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Bem-vindo, usuário ${req.user.id}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
