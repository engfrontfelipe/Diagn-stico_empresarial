import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

type Question = {
  id_pergunta: number;
  id_resposta: number;
  texto_pergunta: string;
  departamento: string;
  importancia: string;
  urgencia: string;
  facilidade_implementacao: string;
  priorizacao: number;
  oportunidade: string;
};

type TableAnswersProps = {
  clienteId: string;
  reloadTrigger: boolean;
};

const nivelParaNumero = (nivel: string) => {
  switch (nivel) {
    case "Muito Alta":
      return 5;
    case "Alta":
      return 4;
    case "Média":
      return 3;
    case "Baixa":
      return 2;
    case "Extremamente Baixa":
      return 1;
    default:
      return 0;
  }
};

const corNivel = (nivel: string) => {
  switch (nivel) {
    case "Muito Alta":
      return "text-red-600 font-bold";
    case "Alta":
      return "text-red-400 font-semibold";
    case "Média":
      return "text-yellow-400 font-medium";
    case "Baixa":
      return "text-green-400 font-medium";
    case "Extremamente Baixa":
      return "text-green-600 font-bold";
    default:
      return "text-gray-400 font-medium";
  }
};

const calcularPriorizacao = (
  importancia: string,
  urgencia: string,
  facilidade: string,
) => {
  const importanciaNum = nivelParaNumero(importancia);
  const urgenciaNum = nivelParaNumero(urgencia);
  const facilidadeNum = nivelParaNumero(facilidade);

  const prioridade = importanciaNum * urgenciaNum * facilidadeNum;
  return Math.round(prioridade);
};

function TableAnswers({ clienteId, reloadTrigger }: TableAnswersProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const opcoesNivel = [
    "Muito Alta",
    "Alta",
    "Média",
    "Baixa",
    "Extremamente Baixa",
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:3333/answers/negative/${clienteId}`,
        );
        if (!res.ok) throw new Error("Erro ao buscar as perguntas");

        const data: Question[] = await res.json();

        const perguntasComEstados = await Promise.all(
          data.map(async (pergunta) => {
            try {
              const estadoRes = await fetch(
                `http://localhost:3333/answers/recovery-status/${pergunta.id_resposta}`,
              );
              if (!estadoRes.ok) throw new Error("Erro ao buscar estados");

              const { resposta } = await estadoRes.json();

              const importancia = resposta.importancia || "";
              const urgencia = resposta.urgencia || "";
              const facilidade = resposta.facilidade_implementacao || "";

              return {
                ...pergunta,
                importancia,
                urgencia,
                facilidade_implementacao: facilidade,
                priorizacao: calcularPriorizacao(
                  importancia,
                  urgencia,
                  facilidade,
                ),
              };
            } catch (e) {
              console.error(
                `Erro ao buscar estado da resposta ${pergunta.id_resposta}:`,
                e,
              );
              return {
                ...pergunta,
                importancia: "",
                urgencia: "",
                facilidade_implementacao: "",
                priorizacao: 0,
              };
            }
          }),
        );

        const sorted = perguntasComEstados.sort(
          (a, b) => b.priorizacao - a.priorizacao,
        );
        setQuestions(sorted);
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
      }
    };

    fetchQuestions();
  }, [clienteId, reloadTrigger]);

  const atualizarCampo = async (
    index: number,
    campo: "importancia" | "urgencia" | "facilidade_implementacao",
    valor: string,
  ) => {
    const updated = [...questions];
    const pergunta = updated[index];

    pergunta[campo] = valor;

    // Recalcula a priorização
    pergunta.priorizacao = calcularPriorizacao(
      pergunta.importancia,
      pergunta.urgencia,
      pergunta.facilidade_implementacao,
    );

    setQuestions(updated);

    try {
      await fetch(
        `http://localhost:3333/answers/update/${pergunta.id_resposta}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            importancia: pergunta.importancia,
            urgencia: pergunta.urgencia,
            facilidade_implementacao: pergunta.facilidade_implementacao,
            priorizacao: pergunta.priorizacao,
          }),
        },
      );
    } catch (error) {
      console.error("Erro ao atualizar resposta:", error);
    }
  };

  return (
    <div className="w-full max-w-8xl space-y-4 -mt-5">
      <Card className="p-8">
        <h1 className="text-center font-medium text-3xl">
          Tabela de oportunidades
        </h1>
        <Table className="border-collapse border border-b-accent">
          <TableHeader>
            <TableRow>
              <TableHead className="border border-b-accent">
                Oportunidades
              </TableHead>
              <TableHead className="border border-b-accent">
                Departamento
              </TableHead>
              <TableHead className="border border-b-accent">
                Importância
              </TableHead>
              <TableHead className="border border-b-accent">Urgência</TableHead>
              <TableHead className="border border-b-accent">
                Facilidade
              </TableHead>
              <TableHead className="border border-b-accent">
                Priorização
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((q, index) => (
              <TableRow
                key={q.id_pergunta}
                className="border-t border-b-accent"
              >
                <TableCell className="font-medium border border-b-accent">
                  {q.oportunidade}
                </TableCell>
                <TableCell className="text-center border border-b-accent">
                  {q.departamento}
                </TableCell>

                {/* IMPORTÂNCIA */}
                <TableCell className="text-center border border-b-accent">
                  <select
                    value={q.importancia}
                    onChange={(e) =>
                      atualizarCampo(index, "importancia", e.target.value)
                    }
                    className={`bg-transparent cursor-pointer w-full text-center outline-none ${corNivel(q.importancia)}`}
                  >
                    {opcoesNivel.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                        className="text-accent-foreground bg-primary-foreground"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                </TableCell>

                {/* URGÊNCIA */}
                <TableCell className="text-center border border-b-accent">
                  <select
                    value={q.urgencia}
                    onChange={(e) =>
                      atualizarCampo(index, "urgencia", e.target.value)
                    }
                    className={`bg-transparent cursor-pointer w-full text-center outline-none ${corNivel(q.urgencia)}`}
                  >
                    {opcoesNivel.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                        className="text-accent-foreground bg-primary-foreground"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                </TableCell>

                {/* FACILIDADE */}
                <TableCell className="text-center border border-b-accent">
                  <select
                    value={q.facilidade_implementacao}
                    onChange={(e) =>
                      atualizarCampo(
                        index,
                        "facilidade_implementacao",
                        e.target.value,
                      )
                    }
                    className={`bg-transparent cursor-pointer w-full text-center outline-none ${corNivel(q.facilidade_implementacao)}`}
                  >
                    {opcoesNivel.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                        className="text-accent-foreground bg-primary-foreground"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                </TableCell>

                {/* PRIORIZAÇÃO */}
                <TableCell
                  className={`text-center border border-b-accent ${
                    q.priorizacao >= 91
                      ? "text-red-700 font-bold" // Muito alta
                      : q.priorizacao >= 71
                        ? "text-red-500 font-semibold" // Alta
                        : q.priorizacao >= 51
                          ? "text-yellow-500 font-medium" // Média alta
                          : q.priorizacao >= 31
                            ? "text-yellow-300 font-medium" // Média baixa
                            : q.priorizacao >= 11
                              ? "text-green-400 font-medium" // Baixa
                              : "text-green-700 font-bold" // Extremamente baixa
                  }`}
                >
                  {q.priorizacao}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default TableAnswers;
