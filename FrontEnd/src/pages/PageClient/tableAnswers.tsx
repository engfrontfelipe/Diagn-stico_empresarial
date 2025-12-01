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

const apiUrl = "https://backend-backend-diagnostico.yjayid.easypanel.host";

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
      return valor || "Não definido";
  }
};

const nivelParaNumero = (nivel: string): number => {
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
      return "font-extrabold text-green-700";
    case "Alta":
    case "Fácil":
      return "font-bold text-green-600";
    case "Média":
      return "font-medium text-amber-600";
    case "Baixa":
    case "Difícil":
      return "font-medium text-orange-600";
    case "Extremamente Baixa":
    case "Muito Difícil":
      return "font-light text-red-600";
    default:
      return "font-medium text-muted-foreground";
  }
};

const calcularPriorizacao = (i: string, u: string, f: string): number => {
  return Math.round(
    nivelParaNumero(i) * nivelParaNumero(u) * nivelParaNumero(f),
  );
};

type Question = {
  id_pergunta: number;
  id_resposta: number;
  texto_pergunta: string;
  departamento: string;
  oportunidade: string;
  importancia: string;
  urgencia: string;
  facilidade_implementacao: string;
  priorizacao: number;
};

// REMOVIDO reloadTrigger → usamos key no componente pai
type TableAnswersProps = {
  clienteId: string;
};

export default function TableAnswers({ clienteId }: TableAnswersProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [departamentoSelecionado, setDepartamentoSelecionado] =
    useState("Todos");
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

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
    const carregarOportunidades = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/answers/negative/${clienteId}`);
        if (!res.ok) throw new Error();
        const negativas = await res.json();

        const oportunidades = await Promise.all(
          negativas.map(async (item: any) => {
            try {
              const r = await fetch(
                `${apiUrl}/answers/recovery-status/${item.id_resposta}`,
              );

              let importancia = "";
              let urgencia = "";
              let facilidade = "";

              if (r.ok) {
                const data = await r.json();
                const resp = data.resposta || {};
                importancia = resp.importancia || "";
                urgencia = resp.urgencia || "";
                facilidade = converterFacilidade(
                  resp.facilidade_implementacao || "",
                );
              }

              return {
                id_pergunta: item.id_pergunta,
                id_resposta: item.id_resposta,
                texto_pergunta: item.texto_pergunta,
                departamento: item.departamento,
                oportunidade: item.oportunidade || item.texto_pergunta,
                importancia,
                urgencia,
                facilidade_implementacao: facilidade,
                priorizacao: calcularPriorizacao(
                  importancia,
                  urgencia,
                  facilidade,
                ),
              };
            } catch {
              return {
                id_pergunta: item.id_pergunta,
                id_resposta: item.id_resposta,
                texto_pergunta: item.texto_pergunta,
                departamento: item.departamento,
                oportunidade: item.oportunidade || item.texto_pergunta,
                importancia: "",
                urgencia: "",
                facilidade_implementacao: "",
                priorizacao: 0,
              };
            }
          }),
        );

        oportunidades.sort((a, b) => b.priorizacao - a.priorizacao);
        setQuestions(oportunidades);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    carregarOportunidades();
  }, [clienteId]); // ← SÓ DEPENDE DO clienteId

  const atualizarCampo = async (
    id_resposta: number,
    campo: "importancia" | "urgencia" | "facilidade_implementacao",
    valor: string,
  ) => {
    const updated = questions.map((q) => {
      if (q.id_resposta === id_resposta) {
        const novo = { ...q, [campo]: valor };
        novo.priorizacao = calcularPriorizacao(
          campo === "importancia" ? valor : q.importancia,
          campo === "urgencia" ? valor : q.urgencia,
          campo === "facilidade_implementacao"
            ? valor
            : q.facilidade_implementacao,
        );
        return novo;
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
      console.error("Erro ao salvar ICE:", e);
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
  const paginadas = filtradas.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" className="w-full">
          Ver Oportunidades no ICE Framework ({questions.length})
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              ICE Framework – Priorização de Oportunidades
            </h2>
            <p className="text-muted-foreground mt-2">
              {questions.length} oportunidades identificadas • Ordenadas por
              impacto
            </p>
          </div>

          <div className="flex justify-end">
            <select
              value={departamentoSelecionado}
              onChange={(e) => {
                setDepartamentoSelecionado(e.target.value);
                setPaginaAtual(1);
              }}
              className="px-4 py-2 border rounded-lg bg-background"
            >
              {departamentos.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : questions.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">
              Nenhuma oportunidade identificada ainda.
            </p>
          ) : (
            <>
              <Table className="text-sm">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Oportunidade</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead className="text-center">Importância</TableHead>
                    <TableHead className="text-center">Urgência</TableHead>
                    <TableHead className="text-center">Facilidade</TableHead>
                    <TableHead className="text-center">Score ICE</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginadas.map((q) => (
                    <TableRow key={q.id_resposta}>
                      <TableCell className="font-medium">
                        {q.oportunidade}
                      </TableCell>
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
                            className={`px-3 py-1 rounded border bg-transparent ${corNivel(String(q[campo as keyof Question]))}`}
                          >
                            {(campo === "facilidade_implementacao"
                              ? opcoesFacilidade
                              : opcoesNivel
                            ).map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </TableCell>
                      ))}
                      <TableCell className="text-center text-sm font-bold">
                        <span
                          className={
                            q.priorizacao >= 80
                              ? "text-green-600"
                              : q.priorizacao >= 50
                                ? "text-amber-600"
                                : "text-red-600"
                          }
                        >
                          {q.priorizacao}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {totalPaginas > 1 && (
                <div className="flex justify-center gap-2">
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                    (p) => (
                      <Button
                        key={p}
                        variant={paginaAtual === p ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPaginaAtual(p)}
                      >
                        {p}
                      </Button>
                    ),
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
