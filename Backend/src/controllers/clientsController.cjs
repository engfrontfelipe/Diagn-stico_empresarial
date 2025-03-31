const sql = require('../config/db.cjs');
const bcrypt = require('bcryptjs');

// Criar um novo usuário
const criarUsuario = async (req, res) => {
  
  const { nome, email, senha, confirmSenha } = req.body;

  if (!nome || !email || !senha || !confirmSenha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  if(senha !== confirmSenha) {
    return res.status(400).json({ error: 'Senhas não conferem' });
  }

  const senhaHash = bcrypt.hashSync(senha, 12);

  try {
    const result = await sql`
      INSERT INTO usuarios (nome, email, senha) 
      VALUES (${nome}, ${email}, ${senhaHash}) 
      RETURNING *;
    `;
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário', detalhes: error.message });
  }
};

// Listar todos os usuários
const listarUsuarios = async (req, res) => {
  try {
    const result = await sql`SELECT id, nome, email FROM usuarios `;
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários', detalhes: error.message });
  }
};

// Buscar usuário por ID
const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql`SELECT * FROM usuarios WHERE id = ${id}`;
    if (result.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário', detalhes: error.message });
  }
};

// Atualizar usuário por ID
const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, confirmSenha } = req.body;

  if(confirmSenha !== senha) {
    return res.status(400).json({ error: 'Senhas não conferem' });
  };
  
  try {
    const senhaHash = bcrypt.hashSync(senha, 12);

    const result = await sql`
      UPDATE usuarios 
      SET nome = ${nome}, email = ${email}, senha = ${senhaHash} 
      WHERE id = ${id} 
      RETURNING *;
    `

    if (result.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json({msg: 'Usuário atualizado com sucesso'});
  } 
  
  catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário', detalhes: error.message });
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
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário', detalhes: error.message });
  }
};

const acessarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await sql`SELECT * FROM usuarios WHERE email = ${email}`;
    if (result.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const usuario = result[0];
    const senhaValida = bcrypt.compareSync(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ error: 'Senha inválida' });
    }

    res.json(usuario);
  
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário', detalhes: error.message });
  }
};

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
  acessarUsuario
};
