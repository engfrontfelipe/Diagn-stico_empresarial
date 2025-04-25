const sql = require("../config/db.cjs");

// Listar perguntas
const listQuest = async (_req, res) => {
  try {
    const result = await sql`
      SELECT id_pergunta, texto_pergunta, departamento, oportunidade, importancia, urgencia, facilidade_implementacao, priorizacao
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

    const formatted = result.map(row => ({
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


const salvarRespostas = async (req, res) => {
  const respostas = req.body;

  if (!Array.isArray(respostas) || respostas.length === 0) {
    return res.status(400).json({ error: "Nenhuma resposta enviada." });
  }

  try {
    let inseridas = 0;
    let atualizadas = 0;

    for (const resposta of respostas) {
      const {
        id_cliente,
        id_pergunta,
        resposta: valor,
        data_resposta,
        id_usuario,
      } = resposta;

      if (
        !id_cliente ||
        !id_pergunta ||
        valor === undefined ||
        !data_resposta ||
        !id_usuario
      ) {
        return res.status(400).json({
          error: "Campos obrigatórios ausentes em uma das respostas.",
        });
      }

      const respostaExistente = await sql`
        SELECT resposta
        FROM respostas
        WHERE id_cliente = ${id_cliente} AND id_pergunta = ${id_pergunta}
        LIMIT 1
      `;

      if (respostaExistente.length > 0) {
        const respostaAtual = respostaExistente[0].resposta;

        if (respostaAtual !== valor) {
          await sql`
            UPDATE respostas
            SET resposta = ${valor},
                data_resposta = ${data_resposta},
                id_usuario = ${id_usuario}
            WHERE id_cliente = ${id_cliente} AND id_pergunta = ${id_pergunta}
          `;
          atualizadas++;
        }
      } else {
        await sql`
          INSERT INTO respostas (
            id_cliente,
            id_pergunta,
            resposta,
            data_resposta,
            id_usuario
          )
          VALUES (
            ${id_cliente},
            ${id_pergunta},
            ${valor},
            ${data_resposta},
            ${id_usuario}
          )
        `;
        inseridas++;
      }
    }
    let mensagem = "";
    if (inseridas > 0 && atualizadas > 0) {
      mensagem = `${inseridas} resposta(s) salva(s), ${atualizadas} atualizada(s).`;
    } else if (inseridas > 0) {
      mensagem = `${inseridas} nova(s) resposta(s) salva(s) com sucesso!`;
    } else if (atualizadas > 0) {
      mensagem = `${atualizadas} resposta(s) atualizada(s) com sucesso!`;
    } else {
      mensagem = `Nenhuma alteração necessária.`;
    }

    res.status(200).json({ message: mensagem });
  } catch (error) {
    console.error("Erro ao salvar respostas:", error);
    res.status(500).json({ error: "Erro ao salvar respostas." });
  }
};

const obterRespostasPorCliente = async (req, res) => {
  const { id_cliente } = req.params;

  if (!id_cliente) {
    return res.status(400).json({ error: "ID do cliente é obrigatório." });
  }

  try {
    const respostas = await sql`
      SELECT 
        id_pergunta,
        resposta,
        data_resposta,
        id_usuario
      FROM respostas
      WHERE id_cliente = ${id_cliente}
    `;

    res.status(200).json(respostas);
  } catch (error) {
    console.error("Erro ao buscar respostas:", error);
    res.status(500).json({ error: "Erro ao buscar respostas do cliente." });
  }
};

const getRespostasNegativasPorCliente = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const rows = await sql`
      SELECT 
        r.id_resposta,
        r.id_cliente,
        p.texto_pergunta,
        p.oportunidade,
        p.importancia,
        p.priorizacao,
        p.urgencia,
        p.facilidade_implementacao,
        p.departamento,
        r.data_resposta,
        r.id_usuario
      FROM respostas r
      JOIN perguntas p ON r.id_pergunta = p.id_pergunta
      WHERE r.resposta = 2 AND r.id_cliente = ${id_cliente}
      ORDER BY r.data_resposta DESC;
    `;

    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar respostas negativas:", error);
    res
      .status(500)
      .json({ message: "Erro interno ao buscar respostas negativas." });
  }
};

const getRespostasPositivasPorCliente = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const rows = await sql`
      SELECT 
        r.id_resposta,
        r.id_cliente,
        p.texto_pergunta,
        p.oportunidade,
        p.importancia,
        p.priorizacao,
        p.urgencia,
        p.facilidade_implementacao,
        p.departamento,
        r.data_resposta,
        r.id_usuario
      FROM respostas r
      JOIN perguntas p ON r.id_pergunta = p.id_pergunta
      WHERE r.resposta = 1 AND r.id_cliente = ${id_cliente}
      ORDER BY r.data_resposta DESC;
    `;

    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar respostas negativas:", error);
    res
      .status(500)
      .json({ message: "Erro interno ao buscar respostas negativas." });
  }
};

const cadastrarPerguntas = async (req, res) => {
  const {
    texto_pergunta,
    departamento,
    oportunidade,
    importancia,
    urgencia,
    facilidade_implementacao,
    priorizacao,
  } = req.body;

  if (
    !texto_pergunta || !departamento || !oportunidade ||
    !importancia || !urgencia ||
    !facilidade_implementacao || !priorizacao
  ) {
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
        oportunidade,
        importancia,
        urgencia,
        facilidade_implementacao,
        priorizacao
      ) VALUES (
        ${texto_pergunta},
        ${departamento},
        ${oportunidade},
        ${importancia},
        ${urgencia},
        ${facilidade_implementacao},
        ${priorizacao}
      )
      RETURNING *
    `;

    res.status(201).json(novaPergunta[0]);
  } catch (error) {
    console.error("Erro ao cadastrar pergunta:", error);
    res.status(500).json({ message: "Erro ao cadastrar pergunta." });
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

    res
      .status(200)
      .json({
        message: "Pergunta atualizada com sucesso!",
        pergunta: resultado[0],
      });
  } catch (error) {
    console.error("Erro ao atualizar pergunta:", error);
    res.status(500).json({ message: "Erro ao atualizar pergunta." });
  }
};

module.exports = {
  listQuest,
  salvarRespostas,
  obterRespostasPorCliente,
  getRespostasNegativasPorCliente,
  getRespostasPositivasPorCliente,
  cadastrarPerguntas,
  atualizaPergunta,
  totalPorDepartamentoGeral,
  totalPerguntas
};
