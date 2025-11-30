import { useEffect, useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SiteHeader } from "../../components/site-header.tsx";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import GeneralDashHome from "./GeneralDashHome.tsx";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building2, CheckCircle2, Clock, Sparkles } from "lucide-react";

const apiUrl = "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host";

export default function Page() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [clientesRes, questionsRes] = await Promise.all([
        fetch(`${apiUrl}/clientes/list`),
        fetch(`${apiUrl}/questions/list`),
      ]);

      const clientesData = clientesRes.ok ? await clientesRes.json() : [];
      const totalPerguntas = questionsRes.ok
        ? (await questionsRes.json()).length
        : 100;

      // Busca respostas de todos os clientes de uma vez
      const clientesComStatus = await Promise.all(
        clientesData.map(async (cliente: any) => {
          try {
            const [statusRes, answersRes] = await Promise.all([
              fetch(
                `${apiUrl}/cliente/diagnostico/status/${cliente.id_cliente}`,
              ),
              fetch(`${apiUrl}/answers/${cliente.id_cliente}`),
            ]);

            const statusData = statusRes.ok
              ? await statusRes.json()
              : { iniciado: false };
            const answers = answersRes.ok ? await answersRes.json() : [];
            const respondidas = Array.isArray(answers) ? answers.length : 0;

            const temDataConclusao =
              cliente.final_diagnostico &&
              cliente.final_diagnostico.trim() !== "" &&
              new Date(cliente.final_diagnostico) <= new Date();

            const concluidoPorRespostas = respondidas >= totalPerguntas;

            let status: "concluido" | "em_andamento" | "nao_iniciado";

            if (temDataConclusao || concluidoPorRespostas) {
              status = "concluido";
            } else if (statusData.iniciado === true) {
              status = "em_andamento";
            } else {
              status = "nao_iniciado";
            }

            return { ...cliente, statusCalculado: status };
          } catch {
            return { ...cliente, statusCalculado: "nao_iniciado" };
          }
        }),
      );

      setClientes(clientesComStatus);
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, []);

  // CONTAGEM 100% IGUAL À TABELA
  const concluidos = clientes.filter(
    (c) => c.statusCalculado === "concluido",
  ).length;
  const emAndamento = clientes.filter(
    (c) => c.statusCalculado === "em_andamento",
  ).length;
  const totalClientes = clientes.length;
  const clientesAtivos = clientes.filter((c) => c.ativo).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-lg font-medium text-primary">
            Carregando dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Dashboard Geral" icon={false} />

        <div className="min-h-screen bg-gradient-to-br">
          <div className="p-6 lg:p-10 w-full mx-auto space-y-10">
            {/* Hero */}
            <div className="text-center space-y-4">
              <Sparkles className="w-12 h-12 text-primary animate-pulse mx-auto" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Bem-vindo ao Diagnóstico Empresarial V2
              </h1>
            </div>

            {/* CARDS 100% CORRETOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* CARD 1 - TOTAL CLIENTES */}
              <div className="relative p-[3px] rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 animate-border-spin">
                <Card className="h-full bg-white dark:bg-gray-950 rounded-2xl border-0 shadow-xl">
                  <CardContent className="p-6 flex flex-col justify-center h-36 lg:h-40">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-xs font-medium">
                          Total de Clientes
                        </p>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white mt-1">
                          {totalClientes}
                        </p>
                        <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> {clientesAtivos}{" "}
                          ativos
                        </p>
                      </div>
                      <Building2 className="w-12 h-12 text-blue-600 opacity-70" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CARD 2 - EM PROGRESSO */}
              <div className="relative p-[3px] rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 animate-border-spin">
                <Card className="h-full bg-white dark:bg-gray-950 rounded-2xl border-0 shadow-xl">
                  <CardContent className="p-6 flex flex-col justify-center h-36 lg:h-40">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-xs font-medium">
                          Em Progresso
                        </p>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white mt-1">
                          {emAndamento}
                        </p>
                        <p className="text-xs text-orange-600 mt-2">
                          Diagnósticos ativos
                        </p>
                      </div>
                      <Clock className="w-12 h-12 text-orange-600 opacity-70" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CARD 3 - CONCLUÍDOS */}
              <div className="relative p-[3px] rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 animate-border-spin">
                <Card className="h-full bg-white dark:bg-gray-950 rounded-2xl border-0 shadow-xl">
                  <CardContent className="p-6 flex flex-col justify-center h-36 lg:h-40">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-xs font-medium">
                          Concluídos
                        </p>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white mt-1">
                          {concluidos}
                        </p>
                        <p className="text-xs text-emerald-600 mt-2">
                          Prontos para relatório
                        </p>
                      </div>
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 opacity-70" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CARD 4 - EQUIPE */}
              <div className="relative p-[3px] rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-600 animate-border-spin">
                <Card className="h-full bg-white dark:bg-gray-950 rounded-2xl border-0 shadow-xl">
                  <CardContent className="p-6 flex flex-col justify-center h-36 lg:h-40">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-xs font-medium">
                          Equipe
                        </p>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white mt-1">
                          3
                        </p>
                        <p className="text-xs text-purple-600 mt-2">
                          Usuários ativos
                        </p>
                      </div>
                      <Users className="w-12 h-12 text-purple-600 opacity-70" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tabela */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <GeneralDashHome />
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
