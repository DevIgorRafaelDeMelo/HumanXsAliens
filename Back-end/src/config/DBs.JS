const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const getCharacterById = async (characterId) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM characters WHERE id = ?",
      [characterId]
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Erro ao buscar personagem:", error);
    return null;
  } finally {
    if (connection) await connection.release();
  }
};

const getUserById = async (characterId) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM characters WHERE user_id = ?",
      [characterId]
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Erro ao buscar personagem:", error);
    return null;
  } finally {
    if (connection) await connection.release();
  }
};

const getEnemiesByIds = async (enemyIds) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM aliens WHERE id = ?",
      [enemyIds]
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Erro ao buscar personagem:", error);
    return null;
  } finally {
    if (connection) await connection.release();
  }
};

const getItenByIds = async (itenIds) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM itens WHERE id = ?",
      [itenIds]
    );
    return rows[0];
  } catch (error) {
    console.error("Erro ao buscar item:", error);
    return null;
  } finally {
    if (connection) await connection.release();
  }
};

module.exports = {
  pool,
  getCharacterById,
  getEnemiesByIds,
  getItenByIds,
  getUserById,
};
