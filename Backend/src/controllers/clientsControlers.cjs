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
    ramo_empresa,
    cargo_responsavel,
    consultor,
    linkedin,
    site,
    logo_url,
    departamentos = [], // array de strings: ["RH", "TI", ...]
  } = req.body;

  // Validação básica
  if (!nome || !nome_responsavel || !cnpj || !consultor || departamentos.length === 0) {
    return res.status(400).json({ error: "Preencha todos os campos obrigatórios e selecione ao menos um departamento." });
  }

  try {
    // Usa transação corretamente com sql.begin
    const resultado = await sql.begin(async (sql) => {
      // 1. Insere o cliente
      const [cliente] = await sql`
        INSERT INTO clientes (
          nome, nome_responsavel, cnpj, ramo_empresa,
          cargo_responsavel, consultor, linkedin, site, logo_url
        ) VALUES (
          ${nome}, ${nome_responsavel}, ${cnpj.replace(/\D/g, '')},
          ${ramo_empresa}, ${cargo_responsavel}, ${consultor},
          ${linkedin}, ${site}, ${logo_url || null}
        )
        RETURNING id_cliente
      `;

      const id_cliente = cliente.id_cliente;

      // 2. Insere os departamentos do cliente
      const departamentosPayload = departamentos.map(dept => ({
        id_cliente,
        departamento: dept.trim(),
        ativo: true
      }));

      if (departamentosPayload.length > 0) {
        await sql`
          INSERT INTO cliente_departamentos ${sql(departamentosPayload)}
        `;
      }

      return { id_cliente, nome, departamentos: departamentosPayload.length };
    });

    res.status(201).json({
      message: "Cliente criado com sucesso!",
      cliente: resultado
    });
  } catch (error) {
    console.error("Erro ao criar cliente com departamentos:", error);
    res.status(500).json({ error: "Erro interno ao criar cliente", detalhes: error.message });
  }
};

// src/controllers/clientsControlers.cjs ou onde estiver
const listarClientes = async (req, res) => {
  try {
    const clientes = await sql`
      SELECT 
        id_cliente, 
        nome, 
        nome_responsavel, 
        cnpj, 
        ativo, 
        data_cadastro,
        final_diagnostico  -- <<< ESSA LINHA É O QUE TAVA FALTANDO, SEU FILHO DA PUTA
      FROM clientes 
      ORDER BY nome
    `;
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar clientes" });
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

  if (!id) {
    return res.status(400).json({ erro: "ID do cliente é obrigatório" });
  }

  try {
    const agora = new Date();
    const dataConclusao = agora.toISOString();

    // ATENÇÃO: Use apenas as colunas que REALMENTE existem na sua tabela clientes
    const result = await sql`
      UPDATE clientes 
      SET 
        final_diagnostico = ${dataConclusao}
        -- Se você tiver outra coluna tipo "concluido", "diagnostico_concluido", etc, coloque aqui:
        -- , diagnostico_concluido = true
      WHERE id_cliente = ${id}
      RETURNING id_cliente, nome, final_diagnostico
    `;

    if (result.count === 0) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    console.log(`Diagnóstico CONCLUÍDO para ${result[0].nome} | ID: ${id} | ${dataConclusao}`);

    return res.status(200).json({
      mensagem: "Diagnóstico concluído com sucesso!",
      cliente: result[0],
      concluido_em: dataConclusao,
    });
  } catch (error) {
    console.error("Erro ao concluir diagnóstico:", error);
    return res.status(500).json({
      erro: "Falha ao concluir o diagnóstico",
      detalhes: error.message,
    });
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
