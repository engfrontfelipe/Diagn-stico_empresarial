require("dotenv").config();
const postgres = require("postgres");

const sql = postgres(process.env.DATABASE_URL, {
  ssl: false, // ou false, dependendo da configuração do EasyPanel
});

module.exports = sql;
