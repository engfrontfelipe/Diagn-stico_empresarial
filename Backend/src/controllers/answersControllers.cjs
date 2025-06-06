const sql = require("../config/db.cjs");

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
        p.departamento,
        r.data_resposta,
        r.id_usuario,
        p.plano_acao,
        r.priorizacao,
        p.texto_afirmativa
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
          p.departamento,
          p.texto_afirmativa_positiva,
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

const atualizaEstados = async (req, res) => {
  const { id_resposta } = req.params;
  const { importancia, urgencia, facilidade_implementacao, priorizacao } =
    req.body;

  try {
    const [respostaAtualizada] = await sql`
      UPDATE respostas
      SET
        importancia = ${importancia},
        urgencia = ${urgencia},
        facilidade_implementacao = ${facilidade_implementacao},
        priorizacao = ${priorizacao}
      WHERE id_resposta = ${id_resposta}
      RETURNING *;
    `;

    if (!respostaAtualizada) {
      return res.status(404).json({ error: "Resposta não encontrada." });
    }

    return res.status(200).json({
      message: "Resposta atualizada com sucesso.",
      resposta: respostaAtualizada,
    });
  } catch (err) {
    console.error("Erro ao atualizar resposta:", err);
    return res.status(500).json({ error: "Erro ao atualizar resposta." });
  }
};

const recuperaEstados = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql`
      SELECT importancia, urgencia, facilidade_implementacao
      FROM respostas
      WHERE id_resposta = ${id};
    `;

    const resposta = result?.[0];

    if (!resposta) {
      return res.status(404).json({ error: "Resposta não encontrada." });
    }

    return res.status(200).json({ resposta });
  } catch (err) {
    console.error("Erro ao recuperar resposta:", err);
    return res.status(500).json({ error: "Erro ao recuperar resposta." });
  }
};

module.exports = {
  salvarRespostas,
  getRespostasNegativasPorCliente,
  getRespostasPositivasPorCliente,
  obterRespostasPorCliente,
  atualizaEstados,
  recuperaEstados,
};
