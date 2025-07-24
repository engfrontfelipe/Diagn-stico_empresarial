import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { FileSpreadsheet } from "lucide-react";

const apiUrl = "https://diagnostivo-v1-backend.xjjkzc.easypanel.host/";
import { useEffect, useState } from "react";

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
      return "text-primary font-extrabold";
    case "Alta":
    case "Fácil":
      return "text-primary font-bold";
    case "Média":
      return "text-primary font-medium";
    case "Baixa":
    case "Difícil":
    case "Extremamente Baixa":
    case "Muito Difícil":
      return "text-primary font-light";
    default:
      return "text-primary font-medium";
  }
};

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

export default function TableIceFrameWork({ clienteId }: TableAnswersProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [departamentoSelecionado, setDepartamentoSelecionado] =
    useState("Todos");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    const fetchQuestions = async () => {
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

        const ordenadas = perguntasComEstados.sort(
          (a, b) => b.priorizacao - a.priorizacao,
        );
        setQuestions(ordenadas);
      } catch (e) {
        console.error(e);
      }
    };

    fetchQuestions();
  }, [clienteId]);

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

  const exportarParaCSV = () => {
    const headers = [
      "Oportunidade",
      "Departamento",
      "Importância",
      "Urgência",
      "Facilidade",
      "Priorização",
    ];

    const linhas = filtradas.map((q) => [
      `"${q.oportunidade}"`,
      `"${q.departamento}"`,
      `"${q.importancia}"`,
      `"${q.urgencia}"`,
      `"${q.facilidade_implementacao}"`,
      q.priorizacao,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...linhas].map((linha) => linha.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tabela_ice_framework.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-4 pl-6 pr-6">
      <h1 className="text-center font-bold text-3xl">
        Tabela de Ice FrameWork
      </h1>
      <p className="text-center text-muted-foreground">
        Foram encontradas {questions.length} oportunidades para sua empresa.{" "}
        <br />
        (Recomendado diminuir o zoom da tela em monitores menores para melhor
        visualização.)
      </p>

      <div className="flex justify-between items-center">
        <div>
          <label className="mr-2 font-semibold">Departamento:</label>
          <select
            value={departamentoSelecionado}
            onChange={(e) => {
              setDepartamentoSelecionado(e.target.value);
              setPaginaAtual(1);
            }}
            className="p-1 rounded-md text-muted-foreground bg-card border"
          >
            {departamentos.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={exportarParaCSV}>
          Exportar CSV <FileSpreadsheet />
        </Button>
      </div>

      <Table className="border-collapse border border-b-accent">
        <TableHeader>
          <TableRow>
            <TableHead>Oportunidades</TableHead>
            <TableHead>Departamento</TableHead>
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
              {["importancia", "urgencia", "facilidade_implementacao"].map(
                (campo) => (
                  <TableCell key={campo} className="text-center">
                    <div
                      className={`w-full text-center ${corNivel(
                        String(q[campo as keyof Question]),
                      )}`}
                    >
                      {q[campo as keyof Question]}
                    </div>
                  </TableCell>
                ),
              )}
              <TableCell
                className={`text-center ${
                  q.priorizacao >= 91
                    ? "text-primary font-bold"
                    : q.priorizacao >= 71
                      ? "text-primary font-semibold"
                      : q.priorizacao >= 51
                        ? "text-primary font-medium"
                        : q.priorizacao >= 31
                          ? "text-primary font-medium"
                          : q.priorizacao >= 11
                            ? "text-primary font-light"
                            : "text-primary font-light"
                }`}
              >
                {q.priorizacao}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
          <Button
            key={num}
            onClick={() => setPaginaAtual(num)}
            className={`px-4 py-1 rounded-md border cursor-pointer ${
              paginaAtual === num
                ? "bg-primary text-muted"
                : "bg-card text-primary"
            }`}
          >
            {num}
          </Button>
        ))}
      </div>
    </div>
  );
}
