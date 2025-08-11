import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const apiUrl =
  "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host/";

interface Cliente {
  id_cliente: string;
  nome: string;
  nome_responsavel: string;
  cnpj: string;
  ativo: boolean;
  data_cadastro: string;
  consultor: string;
}

interface StatusDiagnostico {
  iniciado: boolean;
  expirado: boolean;
  tempoRestante: number | null;
  progressoAtual: number;
  progressoEsperado: number;
  atrasado: boolean;
}

export default function GeneralDashHome() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, StatusDiagnostico>>(
    {},
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        // Fetch lista de clientes
        const clientesRes = await fetch(`${apiUrl}clientes/list`);
        if (!clientesRes.ok) {
          throw new Error(
            `Erro ao buscar clientes: ${clientesRes.status} ${clientesRes.statusText}`,
          );
        }
        const contentType = clientesRes.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await clientesRes.text();
          throw new Error(
            `Resposta de /clientes/list não é JSON: ${text.slice(0, 50)}...`,
          );
        }
        const data: Cliente[] = await clientesRes.json();
        setClientes(data);

        // Fetch perguntas (compartilhado pra todos os clientes)
        let questions: any[] = [];
        try {
          const questionsRes = await fetch(`${apiUrl}questions/list`);
          if (!questionsRes.ok) {
            console.warn(
              `Erro ao buscar perguntas: ${questionsRes.status} ${questionsRes.statusText}`,
            );
            toast.error("Erro ao carregar perguntas, usando fallback.");
          } else {
            const questionsContentType =
              questionsRes.headers.get("content-type");
            if (
              !questionsContentType ||
              !questionsContentType.includes("application/json")
            ) {
              const text = await questionsRes.text();
              throw new Error(
                `Resposta de /questions/list não é JSON: ${text.slice(0, 50)}...`,
              );
            }
            questions = await questionsRes.json();
          }
        } catch (err) {
          console.error("Erro ao buscar perguntas:", err);
          toast.error("Erro ao carregar perguntas, usando fallback.");
        }

        const statusPromises = data
          .filter((cliente) => !!cliente.id_cliente)
          .map(async (cliente) => {
            try {
              const statusRes = await fetch(
                `${apiUrl}cliente/diagnostico/status/${cliente.id_cliente}`,
              );
              if (!statusRes.ok) {
                throw new Error(
                  `Erro ao buscar status para cliente ${cliente.id_cliente}: ${statusRes.status} ${statusRes.statusText}`,
                );
              }
              const statusContentType = statusRes.headers.get("content-type");
              if (
                !statusContentType ||
                !statusContentType.includes("application/json")
              ) {
                const text = await statusRes.text();
                throw new Error(
                  `Resposta de /cliente/diagnostico/status/${cliente.id_cliente} não é JSON: ${text.slice(0, 50)}...`,
                );
              }
              const status = await statusRes.json();

              let answers: any[] = [];
              try {
                const answersRes = await fetch(
                  `${apiUrl}/answers/${cliente.id_cliente}`,
                );
                if (answersRes.ok) {
                  const answersContentType =
                    answersRes.headers.get("content-type");
                  if (
                    !answersContentType ||
                    !answersContentType.includes("application/json")
                  ) {
                    const text = await answersRes.text();
                    throw new Error(
                      `Resposta de /answers/${cliente.id_cliente} não é JSON: ${text.slice(0, 50)}...`,
                    );
                  }
                  answers = await answersRes.json();
                } else {
                  console.warn(
                    `Erro ao buscar respostas para cliente ${cliente.id_cliente}: ${answersRes.status} ${answersRes.statusText}`,
                  );
                  toast.error(
                    `Erro ao carregar respostas para ${cliente.nome}. Usando fallback.`,
                  );
                }
              } catch (err) {
                console.error(
                  `Erro ao buscar respostas para cliente ${cliente.id_cliente}:`,
                  err,
                );
                toast.error(
                  `Erro ao carregar respostas para ${cliente.nome}. Usando fallback.`,
                );
              }

              const totalPerguntas = questions.length || 1;
              const respondidas = answers.length || 0;
              const progressoAtual = Math.round(
                (respondidas / totalPerguntas) * 100,
              );

              const mesCompleto = 2592000;
              const tempoPorDP = 345600;
              const limites = [
                { limite: 14, fator: 1 },
                { limite: 29, fator: 2 },
                { limite: 43, fator: 3 },
                { limite: 57, fator: 4 },
                { limite: 71, fator: 5 },
                { limite: 86, fator: 6 },
                { limite: 100, fator: 7 },
              ];

              const tempoRestante = status.tempoRestante
                ? Math.max(0, Math.floor(status.tempoRestante / 1000))
                : null;

              const tempoDecorrido =
                tempoRestante !== null ? mesCompleto - tempoRestante : 0;

              const progressoEsperado = limites.reduce(
                (ideal, { limite, fator }) => {
                  const tempoEsperado = tempoPorDP * fator;
                  return tempoDecorrido >= tempoEsperado ? limite : ideal;
                },
                0,
              );

              const diagnosticoAtrasado = limites.some(
                ({ limite, fator }) =>
                  progressoAtual < limite &&
                  tempoRestante !== null &&
                  tempoRestante <= mesCompleto - tempoPorDP * fator,
              );

              return {
                id: cliente.id_cliente,
                status: {
                  iniciado: status.iniciado || false,
                  expirado: status.expirado || false,
                  tempoRestante,
                  progressoAtual,
                  progressoEsperado,
                  atrasado: diagnosticoAtrasado,
                },
              };
            } catch (err) {
              console.error(
                `Erro ao processar cliente ${cliente.id_cliente}:`,
                err,
              );
              toast.error(`Erro ao carregar dados para ${cliente.nome}.`);
              return {
                id: cliente.id_cliente,
                status: {
                  iniciado: false,
                  expirado: false,
                  tempoRestante: null,
                  progressoAtual: 0,
                  progressoEsperado: 0,
                  atrasado: false,
                },
              };
            }
          });

        const statuses = await Promise.all(statusPromises);
        const statusObj: Record<string, StatusDiagnostico> = {};
        statuses.forEach(({ id, status }) => {
          statusObj[id] = status;
        });

        setStatusMap(statusObj);
      } catch (err) {
        console.error("Erro geral ao buscar clientes:", err);
        setError("Não foi possível carregar os dados dos clientes.");
        toast.error("Erro ao carregar dados dos clientes.");
      }
    };

    fetchClientes();
  }, []);

  const formatDiasRestantes = (tempo: number | null) =>
    tempo !== null ? `${Math.floor(tempo / 86400)} dias` : "N/A";

  const calcularProgresso = (
    tempoRestante: number | null,
    expirado: boolean,
  ) => {
    if (expirado) return 100;
    if (tempoRestante === null) return 0;
    const diasRestantes = Math.floor(tempoRestante / 86400);
    const maxDias = 30;
    const diasPassados = maxDias - diasRestantes;
    const progresso = (diasPassados / maxDias) * 100;
    return Math.min(Math.max(progresso, 0), 100);
  };

  const getTempoRestanteClass = (tempo: number | null) => {
    if (tempo === null) return "text-gray-500";
    const dias = Math.floor(tempo / 86400);
    if (dias > 20) return "text-green-600";
    if (dias > 10) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <>
      {error && (
        <div className="text-center text-red-600 font-medium p-4">{error}</div>
      )}
      <div>
        <h1 className="text-center text-[25px] font-medium">Gestão Geral</h1>
      </div>

      <div>
        <Table className="w-[90%] m-auto ">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-medium text-[15px]">
                Empresa
              </TableHead>
              <TableHead className="text-center font-medium text-[15px]">
                Tempo Restante
              </TableHead>
              <TableHead className="text-center font-medium text-[15px]">
                Status
              </TableHead>
              <TableHead className="text-center font-medium text-[15px]">
                Progresso
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clientes.map((cliente) => {
              const status = statusMap[cliente.id_cliente];

              if (!status) {
                return (
                  <TableRow key={cliente.id_cliente}>
                    <TableCell className="text-center font-bold ">
                      <span>Carregando...</span>
                    </TableCell>
                    <TableCell className="text-center text-gray-500 font-medium">
                      Carregando...
                    </TableCell>
                    <TableCell className="text-center text-gray-500 font-semibold">
                      ...
                    </TableCell>
                    <TableCell className="text-center">
                      <Progress
                        value={0}
                        className="w-[80%] m-auto h-3 bg-gray-200"
                      />
                    </TableCell>
                  </TableRow>
                );
              }

              const progresso = calcularProgresso(
                status.tempoRestante,
                status.expirado,
              );

              console.log(progresso);

              return (
                <TableRow key={cliente.id_cliente}>
                  <TableCell className="text-center font-medium">
                    <Link to={`/clientes/${cliente.id_cliente}`}>
                      <a className="hover:underline">{cliente.nome}</a>
                    </Link>
                  </TableCell>

                  <TableCell className="text-center">
                    {status.progressoAtual === 100 ? (
                      <span className="text-green-600 font-medium">
                        Diagnóstico finalizado
                      </span>
                    ) : status.tempoRestante === null ? (
                      <span className="text-red-600 font-medium">
                        Diagnóstico não iniciado
                      </span>
                    ) : (
                      <span
                        className={`${getTempoRestanteClass(status.tempoRestante)} font-medium`}
                      >
                        {formatDiasRestantes(status.tempoRestante)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {status.progressoAtual === 100 ? (
                      <span className="text-green-600 font-semibold">
                        Concluído
                      </span>
                    ) : status.iniciado ? (
                      <span className="text-yellow-600 font-semibold">
                        Em andamento
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Não iniciado
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className={`w-[80%] m-auto h-8 rounded-md text-white cursor-pointer text-sm ${
                            status.atrasado
                              ? "bg-red-500 hover:bg-red-300"
                              : status.progressoAtual === 100
                                ? "bg-green-500 hover:bg-green-400"
                                : "bg-green-500 hover:bg-green-400"
                          }`}
                        >
                          {status.progressoAtual === 100
                            ? `Concluído (${status.progressoAtual}%)`
                            : status.atrasado
                              ? `Atrasado (${status.progressoAtual}%)`
                              : `Em dia (${status.progressoAtual}%)`}
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {status.atrasado ? "Atenção!" : "Parabéns!"}
                          </DialogTitle>
                          <DialogDescription>
                            {status.atrasado
                              ? "O diagnóstico está atrasado. Acelere o processo para evitar problemas."
                              : "O diagnóstico está em dia. Continue assim com o bom trabalho!"}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 space-y-4">
                          <div>
                            <p className="text-sm mb-1">
                              Progresso atual (
                              {status.progressoAtual.toFixed(0)}%)
                            </p>
                            <Progress value={status.progressoAtual} />
                          </div>
                          <div>
                            <p className="text-sm mb-1">
                              Progresso esperado (
                              {status.progressoEsperado.toFixed(0)}%)
                            </p>
                            <Progress
                              value={status.progressoEsperado}
                              className="bg-muted"
                            />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
