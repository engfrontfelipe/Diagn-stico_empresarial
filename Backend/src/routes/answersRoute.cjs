const express = require("express");
const router = express.Router();
const answersControllers = require("../controllers/answersControllers.cjs");

router.post("/answers/save", answersControllers.salvarRespostas);

router.get(
  "/answers/negative/:id_cliente",
  answersControllers.getRespostasNegativasPorCliente,
);

router.get(
  "/answers/positive/:id_cliente",
  answersControllers.getRespostasPositivasPorCliente,
);

router.get("/answers/:id_cliente", answersControllers.obterRespostasPorCliente);

router.put("/answers/update/:id_resposta", answersControllers.atualizaEstados);

router.get("/answers/recovery-status/:id", answersControllers.recuperaEstados);

module.exports = router;
