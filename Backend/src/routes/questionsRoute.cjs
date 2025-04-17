const express = require("express");
const router = express.Router();
const questionsControllers = require("../controllers/questionsControllers.cjs");

router.get("/questions/list", questionsControllers.listQuest);
router.get(
  "/questions/answers/:id_cliente",
  questionsControllers.obterRespostasPorCliente,
);
router.post("/questions/save", questionsControllers.salvarRespostas);
router.get(
  "/questions/negative/:id_cliente",
  questionsControllers.getRespostasNegativasPorCliente,
);
router.get(
  "/questions/positive/:id_cliente",
  questionsControllers.getRespostasPositivasPorCliente,
);

module.exports = router;
