const express = require("express");
const router = express.Router();
const questionsControllers = require("../controllers/questionsControllers.cjs");

router.get("/questions/list", questionsControllers.listQuest);

router.get("/questions/list/total", questionsControllers.totalPerguntas);

router.get(
  "/questions/list/total-by-departament",
  questionsControllers.totalPorDepartamentoGeral,
);

router.post("/questions/create", questionsControllers.cadastrarPerguntas);

router.put("/questions/update/:id", questionsControllers.atualizaPergunta);

router.get(
  "/questions/filterByDepartment",
  questionsControllers.filterByDepartment,
);
module.exports = router;
