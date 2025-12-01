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
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const apiUrl = "https://backend-backend-diagnostico.yjayid.easypanel.host";

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

  const exportarParaExcel = () => {
    const headers = [
      "Oportunidade",
      "Departamento",
      "Importância",
      "Urgência",
      "Facilidade",
      "Priorização",
    ];

    const dados = filtradas.map((q) => ({
      Oportunidade: q.oportunidade,
      Departamento: q.departamento,
      Importância: q.importancia,
      Urgência: q.urgencia,
      Facilidade: q.facilidade_implementacao,
      Priorização: q.priorizacao,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dados, { header: headers });

    // Define filtros no cabeçalho
    worksheet["!autofilter"] = { ref: `A1:F${dados.length + 1}` };

    // Ajusta largura das colunas automaticamente
    worksheet["!cols"] = headers.map((h) => ({
      wch:
        Math.max(
          h.length,
          ...dados.map((d) => String(d[h as keyof typeof d] || "").length),
        ) + 4,
    }));

    // Aplica estilo: bordas, cabeçalho com fundo azul claro, texto em negrito
    const range = XLSX.utils.decode_range(worksheet["!ref"]!);

    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = worksheet[cellAddress];
        if (!cell) continue;

        const isHeader = R === 0;

        cell.s = {
          font: {
            bold: isHeader,
            color: { rgb: "000000" },
          },
          fill: isHeader
            ? {
                fgColor: { rgb: "D9E1F2" }, // fundo azul claro
              }
            : undefined,
          alignment: {
            vertical: "center",
            horizontal: "left",
          },
          border: {
            top: { style: "thin", color: { rgb: "CCCCCC" } },
            bottom: { style: "thin", color: { rgb: "CCCCCC" } },
            left: { style: "thin", color: { rgb: "CCCCCC" } },
            right: { style: "thin", color: { rgb: "CCCCCC" } },
          },
        };
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ICE Framework");

    XLSX.writeFile(workbook, "tabela_ice_framework.xlsx", {
      bookType: "xlsx",
      compression: true,
      cellStyles: true,
    });
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
        visualização)
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

        <Button onClick={exportarParaExcel}>
          Exportar Excel <FileSpreadsheet />
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
