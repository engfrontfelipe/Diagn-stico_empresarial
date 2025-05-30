const sql = require("../config/db.cjs");

const listQuest = async (_req, res) => {
  try {
    const result = await sql`
      SELECT id_pergunta, texto_pergunta, departamento, oportunidade, plano_acao
      FROM perguntas
    `;
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar perguntas",
      detalhes: error.message,
    });
  }
};

const totalPerguntas = async (_req, res) => {
  try {
    const result = await sql`
      SELECT COUNT(*) AS total FROM perguntas
    `;
    const total = Number(result[0].total);

    res.json({ total });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao contar perguntas",
      detalhes: error.message,
    });
  }
};

const totalPorDepartamentoGeral = async (_req, res) => {
  try {
    const result = await sql`
      SELECT departamento, COUNT(*) AS total
      FROM perguntas
      GROUP BY departamento
      ORDER BY departamento
    `;

    const formatted = result.map((row) => ({
      departamento: row.departamento,
      total: Number(row.total),
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar total de perguntas por departamento",
      detalhes: error.message,
    });
  }
};

const cadastrarPerguntas = async (req, res) => {
  const { texto_pergunta, departamento, oportunidade } = req.body;

  if (!texto_pergunta || !departamento || !oportunidade) {
    return res
      .status(400)
      .json({ message: "Campos obrigatórios estão faltando." });
  }

  try {
    const perguntaExistente = await sql`
      SELECT * FROM perguntas WHERE texto_pergunta = ${texto_pergunta}
    `;

    if (perguntaExistente.length > 0) {
      return res
        .status(409)
        .json({ message: "Já existe uma pergunta com esse texto." });
    }

    const novaPergunta = await sql`
      INSERT INTO perguntas (
        texto_pergunta,
        departamento,
        oportunidade
      ) VALUES (
        ${texto_pergunta},
        ${departamento},
        ${oportunidade}
      ) RETURNING *
    `;

    res.status(201).json(novaPergunta[0]);
  } catch (error) {
    console.error("Erro ao cadastrar pergunta:", error.message);
    res.status(500).json({
      message: "Erro ao cadastrar pergunta. Tente novamente mais tarde.",
    });
  }
};

const atualizaPergunta = async (req, res) => {
  const { id } = req.params;
  const {
    texto_pergunta,
    departamento,
    oportunidade,
    importancia,
    urgencia,
    facilidade_implementacao,
    priorizacao,
  } = req.body;

  if (!texto_pergunta || !departamento) {
    return res
      .status(400)
      .json({ message: "Campos obrigatórios estão faltando." });
  }

  try {
    const resultado = await sql`
      UPDATE perguntas
      SET 
        texto_pergunta = ${texto_pergunta},
        departamento = ${departamento},
        oportunidade = ${oportunidade},
        importancia = ${importancia},
        urgencia = ${urgencia},
        facilidade_implementacao = ${facilidade_implementacao},
        priorizacao = ${priorizacao}
      WHERE id_pergunta = ${id}
      RETURNING *;
    `;

    if (resultado.length === 0) {
      return res.status(404).json({ message: "Pergunta não encontrada." });
    }

    res.status(200).json({
      message: "Pergunta atualizada com sucesso!",
      pergunta: resultado[0],
    });
  } catch (error) {
    console.error("Erro ao atualizar pergunta:", error);
    res.status(500).json({ message: "Erro ao atualizar pergunta." });
  }
};

// Filtrar perguntas por departamento
const filterByDepartment = async (req, res) => {
  const { departamento } = req.query;

  try {
    let result;

    if (departamento) {
      result = await sql`
        SELECT id_pergunta, texto_pergunta, departamento, oportunidade
        FROM perguntas
        WHERE departamento = ${departamento}
      `;
    } else {
      result = await sql`
        SELECT id_pergunta, texto_pergunta, departamento, oportunidade
        FROM perguntas
      `;
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Nenhuma pergunta encontrada." });
    }

    res.json(result);
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    res.status(500).json({
      error: "Erro ao buscar perguntas",
      detalhes: error.message,
    });
  }
};

module.exports = {
  listQuest,
  cadastrarPerguntas,
  atualizaPergunta,
  totalPorDepartamentoGeral,
  totalPerguntas,
  filterByDepartment,
};
