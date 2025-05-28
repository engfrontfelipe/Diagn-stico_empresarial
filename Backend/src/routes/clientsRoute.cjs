const express = require("express");
const router = express.Router();
const clientsControlers = require("../controllers/clientsControlers.cjs");

router.post("/clientes/create", clientsControlers.criarCliente);
router.get("/clientes/list", clientsControlers.listarClientes);
router.patch("/clientes/update/:id", clientsControlers.atualizarCliente);
router.get("/clientes/:id", clientsControlers.buscarClientePorId);
router.post(
  "/cliente/diagnostico/iniciar/:id",
  clientsControlers.iniciarDiagnostico,
);
router.get(
  "/cliente/diagnostico/status/:id",
  clientsControlers.verificarDiagnostico,
);
router.post(
  "/cliente/diagnostico/concluir/:id",
  clientsControlers.concluirDiagnostico,
);

module.exports = router;
