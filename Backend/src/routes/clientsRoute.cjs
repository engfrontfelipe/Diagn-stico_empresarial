const express = require("express");
const router = express.Router();
const clientsControlers = require("../controllers/clientsControlers.cjs");

router.post("/clientes/create", clientsControlers.criarCliente); //criar clientes
router.get("/clientes/list", clientsControlers.listarClientes); //listar clientes
router.patch("/clientes/:id", clientsControlers.atualizarCliente); // Atualizar cliente por ID
router.get("/clientes/:id", clientsControlers.buscarClientePorId); // Buscar usuário por ID
router.post("/cliente/diagnostico/iniciar/:id", clientsControlers.iniciarDiagnostico); //iniciar diagnostico
router.get("/cliente/diagnostico/status/:id", clientsControlers.verificarDiagnostico); //verificar diagnostico


module.exports = router;
