const sql = require("../config/db.cjs");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const criarCliente = async (req, res) => {
  const {
    nome,
    nome_responsavel,
    cnpj,
    cargo_responsavel,
    ramo_empresa,
    consultor,
    linkedin,
    site,
    logo_url,
  } = req.body;

  if (
    !nome ||
    !nome_responsavel ||
    !cnpj ||
    !cargo_responsavel ||
    !ramo_empresa ||
    !consultor ||
    !linkedin ||
    !site
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
      INSERT INTO clientes (nome, nome_responsavel, cnpj, ativo, cargo_responsavel, ramo_empresa, consultor, linkedin, site, logo_url) 
      VALUES (${nome}, ${nome_responsavel}, ${cnpj}, true, ${cargo_responsavel}, ${ramo_empresa}, ${consultor}, ${linkedin}, ${site}, ${logo_url}) 
      RETURNING id_cliente, nome, nome_responsavel, cnpj, ativo, cargo_responsavel, ramo_empresa, consultor, linkedin, site, logo_url;
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
      SELECT id_cliente, nome, nome_responsavel, cnpj, ativo, cargo_responsavel, ramo_empresa, consultor, linkedin, site, logo_url
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

  let {
    nome,
    nome_responsavel,
    cnpj,
    ativo,
    ramo_empresa,
    cargo_responsavel,
    consultor,
    linkedin,
    site,
    logo_url,
  } = req.body;

  if (
    nome === undefined &&
    nome_responsavel === undefined &&
    cnpj === undefined &&
    ativo === undefined &&
    ramo_empresa === undefined &&
    cargo_responsavel === undefined &&
    consultor === undefined &&
    linkedin === undefined &&
    site === undefined &&
    logo_url === undefined
  ) {
    return res
      .status(400)
      .json({ error: "Nenhum campo fornecido para atualização" });
  }

  // ✅ Evita undefined (a lib postgres não aceita)
  nome = nome ?? null;
  nome_responsavel = nome_responsavel ?? null;
  cnpj = cnpj ?? null;
  ativo = ativo ?? null;
  ramo_empresa = ramo_empresa ?? null;
  cargo_responsavel = cargo_responsavel ?? null;
  consultor = consultor ?? null;
  linkedin = linkedin ?? null;
  site = site ?? null;
  logo_url = logo_url ?? null;

  try {
    const result = await sql`
      UPDATE clientes 
      SET 
        nome = COALESCE(${nome}, nome),
        nome_responsavel = COALESCE(${nome_responsavel}, nome_responsavel),
        cnpj = COALESCE(${cnpj}, cnpj),
        ativo = COALESCE(${ativo}, ativo),
        ramo_empresa = COALESCE(${ramo_empresa}, ramo_empresa),
        cargo_responsavel = COALESCE(${cargo_responsavel}, cargo_responsavel),
        consultor = COALESCE(${consultor}, consultor),
        linkedin = COALESCE(${linkedin}, linkedin),
        site = COALESCE(${site}, site),
        logo_url = COALESCE(${logo_url}, logo_url)
      WHERE id_cliente = ${id}
      RETURNING id_cliente, nome, nome_responsavel, cnpj, ativo, cargo_responsavel, ramo_empresa, consultor, linkedin, site, logo_url;
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
      SELECT id_cliente, nome, nome_responsavel, cnpj, ativo, cargo_responsavel, ramo_empresa, consultor, linkedin, site, final_diagnostico, logo_url
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

const iniciarDiagnostico = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await sql`
      SELECT inicio_diagnostico FROM clientes WHERE id_cliente = ${id};
    `;

    if (cliente.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    if (cliente[0].inicio_diagnostico) {
      return res.status(400).json({ error: "Diagnóstico já iniciado" });
    }

    const agora = new Date();
    const fim = new Date(agora.getTime() + 30 * 24 * 60 * 60 * 1000);

    const result = await sql`
      UPDATE clientes 
      SET inicio_diagnostico = ${agora}, final_diagnostico = ${fim}
      WHERE id_cliente = ${id}
      RETURNING inicio_diagnostico, final_diagnostico;
    `;

    res.status(200).json({
      message: "Diagnóstico iniciado com sucesso",
      inicio_diagnostico: result[0].inicio_diagnostico,
      final_diagnostico: result[0].final_diagnostico,
    });
  } catch (error) {
    console.error("Erro ao iniciar diagnóstico:", error);
    res.status(500).json({ error: "Erro ao iniciar diagnóstico" });
  }
};

const verificarDiagnostico = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql`
      SELECT inicio_diagnostico, final_diagnostico FROM clientes WHERE id_cliente = ${id};
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    const inicio = result[0].inicio_diagnostico;
    const fim = result[0].final_diagnostico;

    if (!inicio) {
      return res.status(200).json({ iniciado: false });
    }

    const agora = new Date();
    const tempoRestante = new Date(fim) - agora;

    const expirado = agora > fim;
    if (expirado) {
      return res.status(208).json({ iniciado: true, expirado: true });
    }

    res.status(200).json({
      iniciado: true,
      inicio_diagnostico: inicio,
      final_diagnostico: fim,
      tempoRestante: tempoRestante,
    });
  } catch (error) {
    console.error("Erro ao verificar diagnóstico:", error);
    res.status(500).json({ error: "Erro ao verificar diagnóstico" });
  }
};

const concluirDiagnostico = async (req, res) => {
  const { id } = req.params;
  const { data_conclusao } = req.body;

  try {
    await sql`
      UPDATE clientes SET final_diagnostico = ${data_conclusao} WHERE id_cliente = ${id};
    `;

    res
      .status(200)
      .json({ mensagem: "Data de conclusão registrada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar data de conclusão:", error);
    res
      .status(500)
      .json({ erro: "Erro ao registrar conclusão do diagnóstico" });
  }
};

module.exports = {
  criarCliente,
  listarClientes,
  atualizarCliente,
  buscarClientePorId,
  iniciarDiagnostico,
  verificarDiagnostico,
  concluirDiagnostico,
};
