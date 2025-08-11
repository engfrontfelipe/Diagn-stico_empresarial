import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const apiUrl =
  "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host/";

const converterFacilidade = (valor: string): string => {
  switch (valor) {
    case "Muito Alta":
      return "Muito Fácil";
    case "Alta":
      return "Fácil";
    case "Média":
      return "Média";
    case "Baixa":
      return "Difícil";
    case "Extremamente Baixa":
      return "Muito Difícil";
    default:
      return valor;
  }
};

const nivelParaNumero = (nivel: string) => {
  switch (nivel) {
    case "Muito Alta":
    case "Muito Fácil":
      return 5;
    case "Alta":
    case "Fácil":
      return 4;
    case "Média":
      return 3;
    case "Baixa":
    case "Difícil":
      return 2;
    case "Extremamente Baixa":
    case "Muito Difícil":
      return 1;
    default:
      return 0;
  }
};

const corNivel = (nivel: string) => {
  switch (nivel) {
    case "Muito Alta":
    case "Muito Fácil":
      return " font-extrabold";
    case "Alta":
    case "Fácil":
      return " font-bold";
    case "Média":
      return " font-medium";
    case "Baixa":
    case "Difícil":
    case "Extremamente Baixa":
    case "Muito Difícil":
      return " font-light";
    default:
      return " font-medium";
  }
};

const calcularPriorizacao = (
  importancia: string,
  urgencia: string,
  facilidade: string,
) => {
  const i = nivelParaNumero(importancia);
  const u = nivelParaNumero(urgencia);
  const f = nivelParaNumero(facilidade);
  return Math.round(i * u * f);
};

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

export default function TableAnswers({
  clienteId,
  reloadTrigger,
}: TableAnswersProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [departamentoSelecionado, setDepartamentoSelecionado] =
    useState("Todos");
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 8;

  const opcoesNivel = [
    "Muito Alta",
    "Alta",
    "Média",
    "Baixa",
    "Extremamente Baixa",
  ];

  const opcoesFacilidade = [
    "Muito Fácil",
    "Fácil",
    "Média",
    "Difícil",
    "Muito Difícil",
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/answers/negative/${clienteId}`);
        if (!res.ok) throw new Error("Erro ao buscar as perguntas");
        const data: Question[] = await res.json();

        const perguntasComEstados = await Promise.all(
          data.map(async (q) => {
            try {
              const r = await fetch(
                `${apiUrl}/answers/recovery-status/${q.id_resposta}`,
              );
              if (!r.ok) throw new Error("Erro ao buscar estados");
              const { resposta } = await r.json();
              const i = resposta.importancia || "";
              const u = resposta.urgencia || "";
              const f = converterFacilidade(
                resposta.facilidade_implementacao || "",
              );
              return {
                ...q,
                importancia: i,
                urgencia: u,
                facilidade_implementacao: f,
                priorizacao: calcularPriorizacao(i, u, f),
              };
            } catch {
              return {
                ...q,
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
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [clienteId, reloadTrigger]);

  const atualizarCampo = async (
    id_resposta: number,
    campo: "importancia" | "urgencia" | "facilidade_implementacao",
    valor: string,
  ) => {
    const updated = questions.map((q) => {
      if (q.id_resposta === id_resposta) {
        const atualizado = { ...q, [campo]: valor };
        atualizado.priorizacao = calcularPriorizacao(
          campo === "importancia" ? valor : q.importancia,
          campo === "urgencia" ? valor : q.urgencia,
          campo === "facilidade_implementacao"
            ? valor
            : q.facilidade_implementacao,
        );
        return atualizado;
      }
      return q;
    });

    setQuestions(updated);

    try {
      const body = updated.find((q) => q.id_resposta === id_resposta);
      await fetch(`${apiUrl}/answers/update/${id_resposta}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          importancia: body?.importancia,
          urgencia: body?.urgencia,
          facilidade_implementacao: body?.facilidade_implementacao,
          priorizacao: body?.priorizacao,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const departamentos = [
    "Todos",
    ...Array.from(new Set(questions.map((q) => q.departamento))),
  ];
  const filtradas =
    departamentoSelecionado === "Todos"
      ? questions
      : questions.filter((q) => q.departamento === departamentoSelecionado);

  const totalPaginas = Math.ceil(filtradas.length / itensPorPagina);
  const perguntasPaginadas = filtradas.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 bg-primary rounded-md w-full cursor-pointer">
          Tabela de Ice FrameWork
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80vw] !max-w-none max-h-[85vh] overflow-y-auto mb-6">
        <div className="w-full space-y-4">
          <h1 className="text-center font-bold text-3xl">
            Tabela de Ice FrameWork
          </h1>
          <p className="text-center text-muted-foreground">
            Foram encontradas {questions.length} oportunidades para sua empresa.
            <br />
            <p className="font-medium">
              (Recomendado diminuir o zoom da tela em monitores menores para
              melhor visualização.)
            </p>
          </p>

          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-primary"></div>
            </div>
          ) : (
            <>
              <Table className="border-collapse border border-b-accent">
                <TableHeader>
                  <TableRow>
                    <TableHead>Oportunidades</TableHead>
                    <TableHead>
                      Departamento:
                      <select
                        value={departamentoSelecionado}
                        onChange={(e) => {
                          setDepartamentoSelecionado(e.target.value);
                          setPaginaAtual(1);
                        }}
                        className="ml-2 p-1 rounded-md text-muted-foreground bg-card"
                      >
                        {departamentos.map((dep) => (
                          <option key={dep} value={dep}>
                            {dep}
                          </option>
                        ))}
                      </select>
                    </TableHead>
                    <TableHead>Importância</TableHead>
                    <TableHead>Urgência</TableHead>
                    <TableHead>Facilidade</TableHead>
                    <TableHead>Priorização</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {perguntasPaginadas.map((q) => (
                    <TableRow key={q.id_pergunta}>
                      <TableCell>{q.oportunidade}</TableCell>
                      <TableCell>{q.departamento}</TableCell>
                      {[
                        "importancia",
                        "urgencia",
                        "facilidade_implementacao",
                      ].map((campo) => (
                        <TableCell key={campo} className="text-center">
                          <select
                            value={q[campo as keyof Question]}
                            onChange={(e) =>
                              atualizarCampo(
                                q.id_resposta,
                                campo as any,
                                e.target.value,
                              )
                            }
                            className={`w-full text-center outline-none bg-transparent ${corNivel(
                              String(q[campo as keyof Question]),
                            )}`}
                          >
                            {(campo === "facilidade_implementacao"
                              ? opcoesFacilidade
                              : opcoesNivel
                            ).map((opt) => (
                              <option key={opt} value={opt} className="">
                                {opt}
                              </option>
                            ))}
                          </select>
                        </TableCell>
                      ))}
                      <TableCell
                        className={`text-center ${
                          q.priorizacao >= 91
                            ? " font-bold"
                            : q.priorizacao >= 71
                              ? " font-semibold"
                              : q.priorizacao >= 51
                                ? " font-medium"
                                : q.priorizacao >= 31
                                  ? " font-medium"
                                  : " font-light"
                        }`}
                      >
                        {q.priorizacao}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      onClick={() => setPaginaAtual(num)}
                      className={`px-4 py-1 rounded-md border cursor-pointer ${
                        paginaAtual === num
                          ? "bg-primary text-muted"
                          : "bg-card text-primary"
                      }`}
                    >
                      {num}
                    </button>
                  ),
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
