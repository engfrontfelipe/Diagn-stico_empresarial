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

function TableAnswers({ clienteId, reloadTrigger }: TableAnswersProps) {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3333/questions/negative/${clienteId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar as perguntas");
        return res.json();
      })
      .then((data) => {
        const sortedData = data.sort(
          (a: Question, b: Question) => b.priorizacao - a.priorizacao,
        );
        setQuestions(sortedData);
      })
      .catch((error) => console.error("Erro ao buscar as perguntas:", error));
  }, [clienteId, reloadTrigger]);

  return (
    <div className="w-full max-w-8xl space-y-4 -mt-5">
      <Card className="p-8 ">
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
            {questions.map((q) => (
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
                <TableCell
                  className={`text-center border border-b-accent ${
                    q.importancia === "Alta"
                      ? "text-red-500 font-semibold"
                      : q.importancia === "Média"
                        ? "text-yellow-400 font-medium"
                        : q.importancia === "Baixa"
                          ? "text-green-400 font-medium"
                          : "text-gray-500"
                  }`}
                >
                  {q.importancia}
                </TableCell>
                <TableCell
                  className={`text-center border border-b-accent ${
                    q.urgencia === "Alta"
                      ? "text-red-500 font-semibold"
                      : q.urgencia === "Média"
                        ? "text-yellow-400 font-medium"
                        : q.urgencia === "Baixa"
                          ? "text-green-400 font-medium"
                          : "text-gray-500"
                  }`}
                >
                  {q.urgencia}
                </TableCell>
                <TableCell
                  className={`text-center border border-b-accent ${
                    q.facilidade_implementacao === "Alta"
                      ? "text-green-400 font-semibold"
                      : q.facilidade_implementacao === "Média"
                        ? "text-yellow-400 font-medium"
                        : q.facilidade_implementacao === "Baixa"
                          ? "text-red-500 font-medium"
                          : "text-gray-500"
                  }`}
                >
                  {q.facilidade_implementacao}
                </TableCell>
                <TableCell
                  className={`text-center border border-b-accent ${
                    q.priorizacao >= 71
                      ? "text-red-500 font-semibold"
                      : q.priorizacao >= 41
                        ? "text-yellow-400 font-medium"
                        : "text-green-400 font-medium"
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
