const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const usuariosRoutes = require("./src/routes/usersRoute.cjs");
const clientsRoutes = require("./src/routes/clientsRoute.cjs");
const questionsRoutes = require("./src/routes/questionsRoute.cjs");
const answersRoute = require("./src/routes/answersRoute.cjs");

app.use(cors());
app.use(express.json());
app.use(usuariosRoutes);
app.use(clientsRoutes);
app.use(questionsRoutes);
app.use(answersRoute);

app.listen(3333, () => {
  console.log(`Servidor rodando na porta http://localhost:3333`);
});
