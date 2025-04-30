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
  const [statusMap, setStatusMap] = useState<Record<string, StatusDiagnostico>>({});

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
              `http://localhost:3333/cliente/diagnostico/status/${cliente.id_cliente}`
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

  // Função para calcular o valor do progresso com base nos dias restantes
  const calcularProgresso = (tempoRestante: number | null) => {
    if (tempoRestante === null) return 0;
    const diasRestantes = Math.floor(tempoRestante / 86400); 
    const maxDias = 30; 
    const progresso = (diasRestantes / maxDias) * 100; 
    return Math.min(progresso, 100); 
  };

  return (
    <>
      <div>
        <h1 className="text-center text-2xl font-medium">Gestão Geral</h1>
      </div>

      <div>
        <Table className="w-[90%] m-auto mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Empresa</TableHead>
              <TableHead className="text-center">Tempo Restante</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Progresso</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clientes.map((cliente) => {
              const status = statusMap[cliente.id_cliente];
              return (
                <TableRow key={cliente.id_cliente}>
                  <TableCell className="text-center">{cliente.nome}</TableCell>
                  <TableCell className="text-center">
                    {status?.expirado
                      ? "Expirado"
                      : status?.tempoRestante === null
                      ? "Diagnóstico não iniciado"
                      : formatDiasRestantes(status?.tempoRestante ?? null)}
                  </TableCell>
                  <TableCell className="text-center">
                    {status?.expirado
                      ? "Expirado"
                      : status?.iniciado
                      ? "Em andamento"
                      : "Não iniciado"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Progress
                      value={calcularProgresso(status?.tempoRestante ?? null)}
                      className="w-[80%] m-auto h-3"
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
