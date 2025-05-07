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
}

export default function GeneralDashHome() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, StatusDiagnostico>>(
    {},
  );

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("http://localhost:3333/clientes/list");
        const data: Cliente[] = await res.json();
        setClientes(data);

        const statusPromises = data
          .filter((cliente) => !!cliente.id_cliente)
          .map(async (cliente) => {
            const res = await fetch(
              `http://localhost:3333/cliente/diagnostico/status/${cliente.id_cliente}`,
            );
            const status = await res.json();
            return {
              id: cliente.id_cliente,
              status: {
                iniciado: status.iniciado,
                expirado: status.expirado,
                tempoRestante: status.tempoRestante
                  ? Math.max(0, Math.floor(status.tempoRestante / 1000))
                  : null,
              },
            };
          });

        const statuses = await Promise.all(statusPromises);
        const statusObj: Record<string, StatusDiagnostico> = {};
        statuses.forEach(({ id, status }) => {
          statusObj[id] = status;
        });

        setStatusMap(statusObj);
      } catch (err) {
        toast.error("Erro ao buscar clientes ou status.");
        console.error(err);
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
      <div>
        <h1 className="text-center text-[25px] font-medium">Gestão Geral</h1>
      </div>

      <div>
        <Table className="w-[90%] m-auto mt-4">
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
                Tempo (%)
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

              return (
                <TableRow key={cliente.id_cliente}>
                  <TableCell className="text-center font-medium">
                    <Link to={`/clientes/${cliente.id_cliente}`}>
                      <a className="text-muted-foreground hover:text-accent">
                        {cliente.nome}
                      </a>
                    </Link>
                  </TableCell>

                  <TableCell className="text-center">
                    {progresso === 100 ? (
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
                    {progresso === 100 ? (
                      <span className="text-green-600 font-semibold">
                        Finalizado
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
                    <Progress
                      value={progresso}
                      className={`w-[80%] m-auto h-3 ${progresso === 100 ? "bg-green-600" : ""}`}
                    />
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
