const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usersControllers.cjs");
const sql = require("../config/db.cjs");

router.post("/usuarios/create", usuariosController.criarUsuario); // Criar usuário
router.get("/usuarios/list", usuariosController.listarUsuarios); // Listar todos os usuários
router.get("/usuarios/:id", usuariosController.buscarUsuarioPorId); // Buscar usuário por ID
router.patch("/usuarios/:id", usuariosController.atualizarUsuario); // Atualizar usuário por ID
router.post("/usuarios/auth/login", usuariosController.acessarUsuario); // Login
router.get(
  "/usuarios/auth/me",
  usuariosController.verificarToken,
  async (req, res) => {
    try {
      const email = req.user?.email;
      if (!email) {
        return res.status(400).json({ error: "Email não encontrado no token" });
      }

      const result = await sql`
      SELECT id_usuario AS id, nome, email 
      FROM usuarios 
      WHERE email = ${email}
    `;

      if (result.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.json(result[0]);
    } catch (error) {
      console.error("❌ Erro em /usuarios/me:", error);
      res.status(500).json({ error: "Erro interno", detalhes: error.message });
    }
  },
);

module.exports = router;
