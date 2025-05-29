// BACKEND (Node.js + Express + MySQL)

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../config/db");

const JWT_SECRET = "seu_segredo_super_seguro";

// REGISTRO
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const [userExists] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (userExists.length > 0) {
      return res.status(400).json({ message: "Email já está em uso." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    const user = {
      id: result.insertId,
      name,
      email,
    };

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({ user, token });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({ message: "Erro no servidor." });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Erro ao logar:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

module.exports = router;
