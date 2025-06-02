const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_super_seguro";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1]; // Extrai o token do cabeçalho

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({ message: "Token inválido." });
    }

    req.user = decoded; // Define req.user corretamente para uso nas rotas
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
};

module.exports = authMiddleware;
