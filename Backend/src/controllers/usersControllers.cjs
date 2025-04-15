const sql = require("../config/db.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const JWT_SECRET = "JEISOQFJMCEOIOCMCECIOEFCEMCJ";
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const criarUsuario = async (req, res) => {
  const { nome, email, senha, confirmSenha } = req.body;

  if (!nome || !email || !senha || !confirmSenha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const usuarioExistente = await sql`
  SELECT * FROM usuarios WHERE email = ${email};
  `;
  if (usuarioExistente.length > 0) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  if (senha !== confirmSenha) {
    return res.status(400).json({ error: "Senhas não conferem" });
  }

  const senhaHash = bcrypt.hashSync(senha, 12);

  try {
    const result = await sql`
      INSERT INTO usuarios (nome, email, senha) 
      VALUES (${nome}, ${email}, ${senhaHash}) 
      RETURNING *;
    `;
    res.status(201).json({ message: "Usuário Cadastrado" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao criar usuário", detalhes: error.message });
  }
};

const listarUsuarios = async (_req, res) => {
  try {
    const result =
      await sql`SELECT id_usuario, nome, email, ativo FROM usuarios`;
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar usuários", detalhes: error.message });
  }
};

const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql`SELECT * FROM usuarios WHERE id_usuario = ${id}`;
    if (result.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar usuário", detalhes: error.message });
  }
};

const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, confirmSenha, ativo } = req.body;

  if (senha && confirmSenha && confirmSenha !== senha) {
    return res.status(400).json({ error: "Senhas não conferem" });
  }

  try {
    let senhaHash;
    if (senha) {
      senhaHash = bcrypt.hashSync(senha, 12);
    }

    const result = await sql`
      UPDATE usuarios 
      SET 
        nome = COALESCE(${nome}, nome),
        email = COALESCE(${email}, email),
        senha = COALESCE(${senhaHash}, senha),
        ativo = COALESCE(${ativo}, ativo)
      WHERE id_usuario = ${id} 
      RETURNING *;
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ msg: "Usuário atualizado com sucesso", usuario: result[0] });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res
      .status(500)
      .json({ error: "Erro ao atualizar usuário", detalhes: error.message });
  }
};

function generateToken(usuario) {
  const payload = {
    id: usuario.id_usuario,
    nome: usuario.nome,
    email: usuario.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

const acessarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await sql`SELECT * FROM usuarios WHERE email = ${email}`;

    if (result.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const usuario = result[0];

    if (!usuario.ativo) {
      return res
        .status(403)
        .json({ error: "Usuário inativo. Entre em contato com o suporte." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    const token = generateToken(usuario);

    return res.status(200).json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar usuário", detalhes: error.message });
  }
};

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  acessarUsuario,
  verificarToken,
};
