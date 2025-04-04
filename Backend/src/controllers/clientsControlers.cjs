const sql = require("../config/db.cjs");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const criarCliente = async (req, res) => {
  const { nome, nome_responsavel, cnpj } = req.body;

  if (!nome || !nome_responsavel || !cnpj) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const clienteExistente = await sql`
      SELECT * FROM clientes WHERE cnpj = ${cnpj};
    `;
    
    if (clienteExistente.length > 0) {
      return res.status(400).json({ error: "CNPJ já cadastrado" });
    }

    const result = await sql`
      INSERT INTO clientes (nome, nome_responsavel, cnpj) 
      VALUES (${nome}, ${nome_responsavel}, ${cnpj}) 
      RETURNING *;
    `;
    
    res.status(201).json({ message: "Cliente Cadastrado", cliente: result[0] });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar cliente", detalhes: error.message });
  }
};

const listarClientes = async (_req, res) => {
  try {
    const result = await sql`SELECT id, nome, nome_responsavel, cnpj, ativo FROM clientes`;
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar clientes", detalhes: err.message });
  }
};

const atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, nome_responsavel, cnpj, ativo } = req.body;

  try {
    const result = await sql`
      UPDATE clientes 
      SET 
        nome = COALESCE(${nome}, nome),
        nome_responsavel = COALESCE(${nome_responsavel}, nome_responsavel),
        cnpj = COALESCE(${cnpj}, cnpj),
        ativo = COALESCE(${ativo}, ativo)
      WHERE id = ${id} 
      RETURNING *;
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    res.json({ msg: "Cliente atualizado com sucesso", cliente: result[0] });
  } catch (err) {
    console.error("Erro ao atualizar Cliente:", err);
    res.status(500).json({ error: "Erro ao atualizar Cliente", detalhes: err.message });
  }
};

module.exports = {
  criarCliente,
  listarClientes,
  atualizarCliente,
};
