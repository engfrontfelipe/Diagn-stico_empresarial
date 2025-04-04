const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usersController.cjs");


router.post("/usuarios/create", usuariosController.criarUsuario); // Criar usuário
router.get("/usuarios/list", usuariosController.listarUsuarios); // Listar todos os usuários
router.get("/usuarios/:id", usuariosController.buscarUsuarioPorId); // Buscar usuário por ID
router.patch("/usuarios/:id", usuariosController.atualizarUsuario); // Atualizar usuário por ID
router.delete("/usuarios/:id", usuariosController.deletarUsuario); // Deletar usuário por ID
router.post("/usuarios/auth/login", usuariosController.acessarUsuario); // Login

module.exports = router;
