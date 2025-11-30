// src/controllers/questionsController.js  (ou onde estiver seu arquivo)

const sql = require("../config/db.cjs");

// ======================== LISTAGEM ========================
const listQuest = async (_req, res) => {
  try {
    const result = await sql`
      SELECT 
        id_pergunta,
        texto_pergunta,
        departamento,
        oportunidade,
        plano_acao::text AS plano_acao,                    -- FORÇA STRING JSON
        texto_afirmativa,
        texto_afirmativa_positiva
      FROM perguntas
      ORDER BY id_pergunta
    `;
    res.json(result);
  } catch (error) {
    console.error("Erro em listQuest:", error);
    res.status(500).json({ error: "Erro ao buscar perguntas", detalhes: error.message });
  }
};

// ======================== TOTAL GERAL ========================
const totalPerguntas = async (_req, res) => {
  try {
    const result = await sql`SELECT COUNT(*) AS total FROM perguntas`;
    res.json({ total: Number(result[0].total) });
  } catch (error) {
    console.error("Erro em totalPerguntas:", error);
    res.status(500).json({ error: "Erro ao contar perguntas" });
  }
};

// ======================== TOTAL POR DEPARTAMENTO ========================
const totalPorDepartamentoGeral = async (_req, res) => {
  try {
    const result = await sql`
      SELECT departamento, COUNT(*) AS total
      FROM perguntas
      GROUP BY departamento
      ORDER BY departamento
    `;

    const formatted = result.map(row => ({
      departamento: row.departamento,
      total: Number(row.total),
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Erro em totalPorDepartamentoGeral:", error);
    res.status(500).json({ error: "Erro ao buscar total por departamento" });
  }
};

// ======================== FILTRAR POR DEPARTAMENTO ========================
const filterByDepartment = async (req, res) => {
  const { departamento } = req.query;

  try {
    const result = await sql`
      SELECT 
        id_pergunta,
        texto_pergunta,
        departamento,
        oportunidade,
        plano_acao::text AS plano_acao,                    -- FORÇA STRING JSON
        texto_afirmativa,
        texto_afirmativa_positiva
      FROM perguntas
      WHERE ${departamento ? sql`departamento = ${departamento}` : true}
      ORDER BY id_pergunta
    `;

    res.json(result);
  } catch (error) {
    console.error("Erro em filterByDepartment:", error);
    res.status(500).json({ error: "Erro ao filtrar perguntas" });
  }
};

// ======================== PERGUNTAS DO CLIENTE ========================
const perguntasDoCliente = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const result = await sql`
      SELECT DISTINCT 
        p.id_pergunta, 
        p.texto_pergunta, 
        p.departamento, 
        p.oportunidade,
        p.plano_acao::text AS plano_acao,                  -- FORÇA STRING JSON
        p.texto_afirmativa,
        p.texto_afirmativa_positiva
      FROM perguntas p
      INNER JOIN cliente_departamentos cd 
        ON p.departamento = cd.departamento
      WHERE cd.id_cliente = ${id_cliente} 
        AND cd.ativo = true
      ORDER BY p.departamento, p.id_pergunta
    `;

    res.json(result);
  } catch (error) {
    console.error("Erro em perguntasDoCliente:", error);
    res.status(500).json({ error: "Erro ao buscar perguntas do cliente" });
  }
};

// ======================== CADASTRAR PERGUNTA ========================
const cadastrarPerguntas = async (req, res) => {
  const {
    texto_pergunta,
    departamento,
    oportunidade,
    plano_acao,                    // ← pode vir como string JSON
    texto_afirmativa,
    texto_afirmativa_positiva
  } = req.body;

  if (!texto_pergunta?.trim() || !departamento || !oportunidade?.trim()) {
    return res.status(400).json({ message: "Campos obrigatórios faltando." });
  }

  try {
    // Verifica duplicidade
    const existente = await sql`
      SELECT id_pergunta FROM perguntas 
      WHERE LOWER(texto_pergunta) = ${texto_pergunta.trim().toLowerCase()}
    `;

    if (existente.length > 0) {
      return res.status(409).json({ message: "Já existe uma pergunta com esse texto." });
    }

    // plano_acao pode vir como string JSON → PostgreSQL aceita direto
    const novaPergunta = await sql`
      INSERT INTO perguntas (
        texto_pergunta,
        departamento,
        oportunidade,
        plano_acao,
        texto_afirmativa,
        texto_afirmativa_positiva
      ) VALUES (
        ${texto_pergunta.trim()},
        ${departamento},
        ${oportunidade.trim()},
        ${plano_acao ? plano_acao : null},
        ${texto_afirmativa?.trim() || null},
        ${texto_afirmativa_positiva?.trim() || null}
      ) RETURNING 
        id_pergunta,
        texto_pergunta,
        departamento,
        oportunidade,
        plano_acao::text AS plano_acao,
        texto_afirmativa,
        texto_afirmativa_positiva
    `;

    res.status(201).json(novaPergunta[0]);
  } catch (error) {
    console.error("Erro ao cadastrar pergunta:", error);
    res.status(500).json({ message: "Erro interno ao cadastrar pergunta." });
  }
};

// ======================== ATUALIZAR PERGUNTA ========================
const atualizaPergunta = async (req, res) => {
  const { id } = req.params;
  const {
    texto_pergunta,
    departamento,
    oportunidade,
    plano_acao,                    // ← string JSON ou null
    texto_afirmativa,
    texto_afirmativa_positiva
  } = req.body;

  if (!texto_pergunta?.trim() || !departamento) {
    return res.status(400).json({ message: "Campos obrigatórios faltando." });
  }

  try {
    const resultado = await sql`
      UPDATE perguntas SET
        texto_pergunta = ${texto_pergunta.trim()},
        departamento = ${departamento},
        oportunidade = ${oportunidade?.trim() || null},
        plano_acao = ${plano_acao ? plano_acao : null},
        texto_afirmativa = ${texto_afirmativa?.trim() || null},
        texto_afirmativa_positiva = ${texto_afirmativa_positiva?.trim() || null}
      WHERE id_pergunta = ${id}
      RETURNING 
        id_pergunta,
        texto_pergunta,
        departamento,
        oportunidade,
        plano_acao::text AS plano_acao,
        texto_afirmativa,
        texto_afirmativa_positiva
    `;

    if (resultado.length === 0) {
      return res.status(404).json({ message: "Pergunta não encontrada." });
    }

    res.json({
      message: "Pergunta atualizada com sucesso!",
      pergunta: resultado[0]
    });
  } catch (error) {
    console.error("Erro ao atualizar pergunta:", error);
    res.status(500).json({ message: "Erro ao atualizar pergunta." });
  }
};

module.exports = {
  listQuest,
  totalPerguntas,
  totalPorDepartamentoGeral,
  filterByDepartment,
  perguntasDoCliente,
  cadastrarPerguntas,
  atualizaPergunta
};