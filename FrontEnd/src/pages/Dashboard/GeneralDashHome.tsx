import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Building2, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const apiUrl = "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host";

interface Cliente {
  id_cliente: string;
  nome: string;
  final_diagnostico?: string | null;
}

export default function GeneralDashHome() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [statusMap, setStatusMap] = useState<
    Record<string, "concluido" | "em_andamento" | "nao_iniciado">
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const clientesRes = await fetch(`${apiUrl}/clientes/list`);
        if (!clientesRes.ok) return;
        const clientesData: Cliente[] = await clientesRes.json();

        let totalPerguntas = 100;
        try {
          const q = await fetch(`${apiUrl}/questions/list`);
          if (q.ok) totalPerguntas = (await q.json()).length;
        } catch {}

        const promises = clientesData.map(async (cliente) => {
          try {
            const [statusRes, answersRes] = await Promise.all([
              fetch(
                `${apiUrl}/cliente/diagnostico/status/${cliente.id_cliente}`,
              ),
              fetch(`${apiUrl}/answers/${cliente.id_cliente}`),
            ]);

            const statusJson = statusRes.ok
              ? await statusRes.json()
              : { iniciado: false };
            const answers = answersRes.ok ? await answersRes.json() : [];
            const respondidas = Array.isArray(answers) ? answers.length : 0;
            const progresso100 = respondidas >= totalPerguntas;

            // AQUI É O QUE IMPORTA, DEMÔNIO:
            const temDataConclusaoValida =
              cliente.final_diagnostico &&
              cliente.final_diagnostico.trim() !== "" &&
              new Date(cliente.final_diagnostico) <= new Date();

            // PRIORIDADE MÁXIMA: SE TEM DATA DE CONCLUSÃO → CONCLUÍDO E FODA-SE O RESTO
            if (temDataConclusaoValida || progresso100) {
              return { id: cliente.id_cliente, status: "concluido" as const };
            }

            // SÓ cai aqui se NÃO tiver data de conclusão e NÃO tiver 100%
            if (statusJson.iniciado === true) {
              return {
                id: cliente.id_cliente,
                status: "em_andamento" as const,
              };
            }

            return { id: cliente.id_cliente, status: "nao_iniciado" as const };
          } catch (err) {
            return { id: cliente.id_cliente, status: "nao_iniciado" as const };
          }
        });

        const resultados = await Promise.all(promises);
        const map: Record<string, any> = {};
        resultados.forEach((r) => (map[r.id] = r.status));

        setStatusMap(map);
        setClientes(clientesData);
      } catch (err) {
        console.error("Erro no dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, []);

  const BadgeStatus = ({ status }: { status: string }) => {
    if (status === "concluido")
      return (
        <Badge className="bg-emerald-600  font-bold text-sm ">
          <CheckCircle2 className="w-6 h-6 mr-2" />
          Concluído
        </Badge>
      );
    if (status === "em_andamento")
      return (
        <Badge className="bg-blue-600  font-bold text-sm ">
          <Clock className="w-6 h-6 mr-2" />
          Em Andamento
        </Badge>
      );
    return (
      <Badge variant="secondary" className="font-bold text-lg ">
        <AlertCircle className="w-6 h-6 mr-2" />
        Não Iniciado
      </Badge>
    );
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="">
      <Table className="">
        <TableHeader>
          <TableRow className="">
            <TableHead className="text-left pl-10 font-bold text-sm">
              Empresa
            </TableHead>
            <TableHead className="text-center font-bold text-sm">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map((cliente) => {
            const status = statusMap[cliente.id_cliente] || "nao_iniciado";
            return (
              <TableRow
                key={cliente.id_cliente}
                className="h-16 hover:bg-muted/30"
              >
                <TableCell className="pl-4">
                  <Link
                    to={`/clientes/${cliente.id_cliente}`}
                    className="text-sm font-medium text-primary hover:underline flex items-center gap-3 group"
                  >
                    <Building2 className="w-5 h-5 opacity-0 group-hover:opacity-100 transition" />
                    {cliente.nome}
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <BadgeStatus status={status} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
