const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));



 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
