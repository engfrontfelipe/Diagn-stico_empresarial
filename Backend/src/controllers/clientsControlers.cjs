const sql = require("../config/db.cjs");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const criarCliente = async (req, res) => {
  const { nome, nome_responsavel, cnpj, cargo_responsavel, ramo_empresa } =
    req.body;

  if (
    !nome ||
    !nome_responsavel ||
    !cnpj ||
    !cargo_responsavel ||
    !ramo_empresa
  ) {
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
      INSERT INTO clientes (nome, nome_responsavel, cnpj, ativo, cargo_responsavel, ramo_empresa) 
      VALUES (${nome}, ${nome_responsavel}, ${cnpj}, true, ${cargo_responsavel}, ${ramo_empresa}) 
      RETURNING id_cliente, nome, nome_responsavel, cnpj, ativo, cargo_responsavel, ramo_empresa;
    `;

    res.status(201).json({ message: "Cliente cadastrado", cliente: result[0] });
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    res
      .status(500)
      .json({ error: "Erro ao criar cliente", detalhes: error.message });
  }
};

const listarClientes = async (_req, res) => {
  try {
    const result = await sql`
      SELECT id_cliente, nome, nome_responsavel, cnpj, ativo, cargo_responsavel, ramo_empresa
      FROM clientes 
      ORDER BY nome ASC;
    `;
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    res
      .status(500)
      .json({ error: "Erro ao buscar clientes", detalhes: error.message });
  }
};

const atualizarCliente = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  const {
    nome,
    nome_responsavel,
    cnpj,
    ativo,
    ramo_empresa,
    cargo_responsavel,
  } = req.body;

  if (!nome && !nome_responsavel && !cnpj && ativo === undefined) {
    return res
      .status(400)
      .json({ error: "Nenhum campo fornecido para atualização" });
  }

  try {
    const result = await sql`
      UPDATE clientes 
      SET 
        nome = COALESCE(${nome}, nome),
        nome_responsavel = COALESCE(${nome_responsavel}, nome_responsavel),
        cnpj = COALESCE(${cnpj}, cnpj),
        ativo = COALESCE(${ativo}, ativo),
        ramo_empresa = COALESCE(${ramo_empresa}, ramo_empresa),
        cargo_responsavel = COALESCE(${cargo_responsavel}, cargo_responsavel)

      WHERE id_cliente = ${id}
      RETURNING id_cliente, nome, nome_responsavel, cnpj, ativo, cargo_responsavel, ramo_empresa
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    res.json({ message: "Cliente atualizado com sucesso", cliente: result[0] });
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    res
      .status(500)
      .json({ error: "Erro ao atualizar cliente", detalhes: error.message });
  }
};

const buscarClientePorId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql`
      SELECT id_cliente, nome, nome_responsavel, cnpj, ativo 
      FROM clientes 
      WHERE id_cliente = ${id};
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    res
      .status(500)
      .json({ error: "Erro ao buscar cliente", detalhes: error.message });
  }
};

module.exports = {
  criarCliente,
  listarClientes,
  atualizarCliente,
  buscarClientePorId,
};
