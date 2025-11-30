import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TableQuestions from "./tableQuestions";
import TableAnswers from "./tableAnswers";
import { PieChart, Pie, Cell, Label } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast, Toaster } from "sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { CheckCircle2, Trophy } from "lucide-react";

const apiUrl = "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host";

export default function PageClient() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [diagnosticoIniciado, setDiagnosticoIniciado] = useState(false);
  const [diagnosticoConcluido, setDiagnosticoConcluido] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isConcluding, setIsConcluding] = useState(false);

  useEffect(() => {
    if (!id) return;

    const carregarDados = async () => {
      try {
        const [resCliente, resQuestions, resStatus, resAnswers] =
          await Promise.all([
            fetch(`${apiUrl}/clientes/${id}`),
            fetch(`${apiUrl}/questions/cliente/${id}`),
            fetch(`${apiUrl}/cliente/diagnostico/status/${id}`),
            fetch(`${apiUrl}/answers/${id}`),
          ]);

        const [clienteData, questionsData, statusData, answersData] =
          await Promise.all([
            resCliente.json(),
            resQuestions.json(),
            resStatus.json(),
            resAnswers.json(),
          ]);

        setCliente(clienteData);
        setQuestions(questionsData);
        setAnswers(answersData);
        setDiagnosticoIniciado(!!statusData.iniciado);
        setDiagnosticoConcluido(
          statusData.concluido || answersData.length === questionsData.length,
        );
      } catch (err) {
        toast.error("Erro ao carregar dados do cliente");
      }
    };

    carregarDados();
  }, [id]);

  // NOVO: Função para concluir o diagnóstico no backend
  const concluirDiagnosticoNoBackend = async () => {
    if (!id || isConcluding || diagnosticoConcluido) return;

    setIsConcluding(true);
    try {
      const res = await fetch(`${apiUrl}/cliente/diagnostico/concluir/${id}`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Erro ao concluir diagnóstico");

      setDiagnosticoConcluido(true);
      toast.success("Diagnóstico concluído com sucesso!", {
        description: "O relatório final já está disponível.",
        icon: <Trophy className="w-5 h-5" />,
      });
    } catch (err) {
      console.error("Erro ao concluir diagnóstico:", err);
      toast.error("Erro ao finalizar diagnóstico. Tente novamente.");
    } finally {
      setIsConcluding(false);
    }
  };

  const iniciarDiagnostico = async () => {
    if (!id) return;
    setIsStarting(true);
    try {
      const res = await fetch(`${apiUrl}/cliente/diagnostico/iniciar/${id}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error();
      setDiagnosticoIniciado(true);
      toast.success("Diagnóstico iniciado com sucesso!");
    } catch {
      toast.error("Erro ao iniciar diagnóstico");
    } finally {
      setIsStarting(false);
    }
  };

  const total = questions.length;
  const respondidas = answers.length;
  const porcentagem = total > 0 ? Math.round((respondidas / total) * 100) : 0;

  // Verifica se acabou de atingir 100% e ainda não concluiu
  useEffect(() => {
    if (porcentagem === 100 && !diagnosticoConcluido && diagnosticoIniciado) {
      concluirDiagnosticoNoBackend();
    }
  }, [porcentagem, diagnosticoConcluido, diagnosticoIniciado]);

  const chartData = [
    { name: "Respondidas", value: respondidas, fill: "#22c55e" },
    { name: "Pendentes", value: total - respondidas, fill: "#ef4444" },
  ];

  const irParaResultado = () => {
    navigate(`/cliente/ccadsvakocpa7ccijccc65366565g6fv6v5v559xq/result/${id}`);
  };

  if (!cliente || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader title="Diagnóstico do Cliente" icon={false} />
          <div className="p-4 lg:p-6">
            <Card className="max-w-7xl mx-auto">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-3xl font-bold">
                    {cliente.nome}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">
                    Responsável: <strong>{cliente.nome_responsavel}</strong> •
                    Consultor: <strong>{cliente.consultor}</strong>
                  </p>
                </div>

                {/* BOTÃO INTELIGENTE FINAL */}
                <div className="w-full sm:w-auto">
                  {!diagnosticoIniciado ? (
                    <Button
                      onClick={iniciarDiagnostico}
                      disabled={isStarting}
                      size="lg"
                      className="w-full"
                    >
                      {isStarting ? "Iniciando..." : "Iniciar Diagnóstico"}
                    </Button>
                  ) : diagnosticoConcluido || porcentagem === 100 ? (
                    <Button
                      onClick={irParaResultado}
                      size="lg"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg"
                    >
                      <Trophy className="mr-2 h-5 w-5" />
                      Visualizar Relatório Final
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      disabled
                      size="lg"
                      className="w-full"
                    >
                      Em Andamento ({porcentagem}%)
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-10">
                {/* Progresso + Gráfico */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div>
                      <p className="text-lg font-medium">
                        Progresso do Diagnóstico
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {respondidas} de {total} perguntas respondidas
                      </p>
                    </div>
                    <Progress value={porcentagem} className="h-6" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 font-bold text-xl">
                        {porcentagem}% concluído
                      </span>
                      {(diagnosticoConcluido || porcentagem === 100) && (
                        <span className="flex items-center gap-2 text-emerald-600 font-bold text-lg animate-pulse">
                          <CheckCircle2 className="h-6 w-6" />
                          100% Concluído!
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ChartContainer config={{}} className="w-60 h-60">
                      <PieChart>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          innerRadius={80}
                          outerRadius={110}
                          paddingAngle={5}
                          cornerRadius={15}
                          stroke="none"
                        >
                          {chartData.map((entry, i) => (
                            <Cell key={i} fill={entry.fill} />
                          ))}
                          <Label
                            value={`${porcentagem}%`}
                            position="center"
                            className="text-5xl font-extrabold fill-foreground"
                          />
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </div>
                </div>

                {/* Só mostra as tabelas se iniciado */}
                {diagnosticoIniciado && (
                  <>
                    <div className="border-t pt-10">
                      <h2 className="text-2xl font-semibold mb-6 text-primary">
                        Responda às perguntas por departamento
                      </h2>
                      <TableQuestions
                        onUpdateAnswers={setAnswers}
                        clienteId={id!}
                      />
                    </div>

                    <div className="border-t pt-10">
                      <h2 className="text-2xl font-semibold mb-6 text-primary">
                        Oportunidades Identificadas (ICE Framework)
                      </h2>
                      <TableAnswers clienteId={id!} />
                    </div>

                    {/* MENSAGEM FINAL ÉPICA */}
                    {(diagnosticoConcluido || porcentagem === 100) && (
                      <div className="mt-16 p-10 bg-gradient-to-r from-emerald-50 to-green-50 border-4 border-emerald-300 rounded-3xl text-center shadow-2xl">
                        <Trophy className="w-20 h-20 text-emerald-600 mx-auto mb-4 animate-bounce" />
                        <h3 className="text-4xl font-bold text-emerald-900 mb-4">
                          Parabéns, {cliente.nome_responsavel.split(" ")[0]}!
                        </h3>
                        <p className="text-xl text-emerald-800 max-w-3xl mx-auto">
                          Você concluiu com sucesso o diagnóstico empresarial.
                          Todas as {total} perguntas foram respondidas.
                        </p>
                        <p className="text-2xl font-bold text-emerald-700 mt-6">
                          O relatório final está pronto para análise
                          estratégica!
                        </p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>

      <Toaster position="bottom-center" richColors closeButton />
    </>
  );
}
