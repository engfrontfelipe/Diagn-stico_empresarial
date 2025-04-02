const sql = require("../config/db.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const JWT_SECRET = "JEISOQFJMCEOIOCMCECIOEFCEMCJ";
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

// Criar um novo usuário
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

// Listar todos os usuários
const listarUsuarios = async (req, res) => {
  try {
    const result = await sql`SELECT id, nome, email, ativo FROM usuarios`;
    res.json(result);    
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar usuários", detalhes: error.message });
  }
};

// Buscar usuário por ID
const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql`SELECT * FROM usuarios WHERE id = ${id}`;
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

// Atualizar usuário por ID
const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, confirmSenha, ativo } = req.body;

  console.log("Dados recebidos:", { id, nome, email, senha, ativo });

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
      WHERE id = ${id} 
      RETURNING *;
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ msg: "Usuário atualizado com sucesso", usuario: result[0] });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário", detalhes: error.message });
  }
};

// Deletar usuário por ID
const deletarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql`
      DELETE FROM usuarios WHERE id = ${id} RETURNING *;
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao deletar usuário", detalhes: error.message });
  }
};
// Função para gerar token
const generateToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
};

// Middleware para validar o token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];

//   if (!authHeader) {
//     return res.status(403).json({ message: "Token não fornecido" });
//   }

//   const token = authHeader.startsWith("Bearer ")
//     ? authHeader.slice(7)
//     : authHeader;

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Token inválido" });
//     }
//     req.user = decoded;
//     next();
//   });
// };


const acessarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await sql`SELECT * FROM usuarios WHERE email = ${email}`;

    if (result.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const usuario = result[0];

    // Verifica se o usuário está ativo
    if (!usuario.ativo) {
      return res.status(403).json({ error: "Usuário inativo. Entre em contato com o suporte." });
    }

    // Usa bcrypt.compare de forma assíncrona
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    // Gera o token JWT
    const token = generateToken(email);

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário", detalhes: error.message });
  }
};


module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
  acessarUsuario,
  // authenticateToken,
};
