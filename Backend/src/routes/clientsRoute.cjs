const express = require("express");
const router = express.Router();
const clientsControlers = require("../controllers/clientsControlers.cjs")

router.post("/clientes/create", clientsControlers.criarCliente); //criar clientes
router.get("/clientes/list", clientsControlers.listarClientes); //criar clientes
router.patch("/clientes/:id", clientsControlers.atualizarCliente); // Atualizar cliente por ID




module.exports = router