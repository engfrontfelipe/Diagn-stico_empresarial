import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableQuestions from "./tableQuestions";
import TableAnswers from "./tableAnswers";
import DashboardGenerator from "./DashboardGenerator";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Sector, Cell, Label } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Cliente {
  nome: string;
  nome_responsavel: string;
  cnpj: string;
  ativo: boolean;
  id: string;
  data_cadastro: string;
  consultor: string;
}

const chartConfig = {} satisfies ChartConfig;

export default function PageClient() {
  const { id } = useParams<{ id: string }>();
  const [reloadAnswers, setReloadAnswers] = useState(false);
  const [chartDataPie, setChartDataPie] = useState([
    { question: "Respondidas", val: 0, fill: "#33bb45" },
    { question: "Não Respondidas", val: 0, fill: "#df2c2c" },
  ]);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [questions, setQuestions] = useState<
    | { id_pergunta: number; texto_pergunta: string; departamento: string }[]
    | null
  >(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [diagnosticoIniciado, setDiagnosticoIniciado] = useState(false);
  const [tempoRestante, setTempoRestante] = useState<number | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [expirado, setExpirado] = useState(false);

  useEffect(() => {
    const verificarDiagnostico = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/cliente/diagnostico/status/${id}`,
        );
        if (!response.ok)
          throw new Error("Erro ao buscar status do diagnóstico");
        const data = await response.json();

        setDiagnosticoIniciado(data.iniciado);

        setExpirado(data.expirado);

        setTempoRestante(
          data.tempoRestante ? Math.floor(data.tempoRestante / 1000) : null,
        );
      } catch (err) {
        console.error("Erro ao verificar status do diagnóstico", err);
        toast.error("Erro ao carregar status do diagnóstico.");
      }
    };

    if (id) {
      verificarDiagnostico();
    }
  }, [id]);

  useEffect(() => {
    if (!diagnosticoIniciado || tempoRestante === null) return;

    const interval = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(interval);
          setDiagnosticoIniciado(false);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [diagnosticoIniciado, tempoRestante]);

  async function activeTime() {
    setIsStarting(true);
    try {
      const response = await fetch(
        `http://localhost:3333/cliente/diagnostico/iniciar/${id}`,
        {
          method: "POST",
        },
      );
      if (!response.ok) throw new Error("Erro ao iniciar diagnóstico");

      const data = await response.json();

      // Re-fetch status to ensure consistency
      const statusResponse = await fetch(
        `http://localhost:3333/cliente/diagnostico/status/${id}`,
      );
      if (!statusResponse.ok)
        throw new Error("Erro ao verificar status após iniciar");
      const statusData = await statusResponse.json();

      setDiagnosticoIniciado(statusData.iniciado);
      const tempoInicial = statusData.tempoRestante
        ? Math.floor(statusData.tempoRestante / 1000)
        : null;
      setTempoRestante(tempoInicial);

      toast.success("Diagnóstico iniciado com sucesso!");
    } catch (error) {
      console.error("Erro ao iniciar diagnóstico:", error);
      toast.error("Não foi possível iniciar o diagnóstico.");
    } finally {
      setIsStarting(false);
    }
  }

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(`http://localhost:3333/clientes/${id}`);
        const data = await response.json();
        setCliente(data);
      } catch (err) {
        console.error("Erro ao buscar cliente", err);
      }
    };

    if (id) {
      fetchCliente();
    }
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:3333/questions/list")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar as perguntas");
        return res.json();
      })
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Erro ao buscar as perguntas:", error));
  }, []);

  useEffect(() => {
    const respondidas = answers.length;
    const totalPerguntas = questions?.length || 0;
    const naoRespondidas = Math.max(totalPerguntas - respondidas, 0);

    setChartDataPie([
      { question: "Respondidas", val: respondidas, fill: "#33bb45" },
      { question: "Não Respondidas", val: naoRespondidas, fill: "#df2c2c" },
    ]);
  }, [answers, questions]);

  const porcentagem = questions?.length
    ? Math.round((answers.length / questions.length) * 100)
    : 0;

  const renderLoading = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-primary"></div>
    </div>
  );

  if (!cliente || !questions) {
    return renderLoading();
  }

  const tempoTotalSegundos = 30 * 24 * 60 * 60;
  const progresso =
    tempoRestante !== null
      ? Math.round(
          ((tempoTotalSegundos - tempoRestante) / tempoTotalSegundos) * 100,
        )
      : 0;

  function progressoBarra() {
    if (expirado === true) {
      return 100;
    }
    if (porcentagem === 100) {
      return 100;
    }

    return progresso;
  }

  function renderDiagnosticoUI({
    tempoRestante,
    isStarting,
    diagnosticoIniciado,
    activeTime,
  }: {
    tempoRestante: number | null;
    isStarting: boolean;
    diagnosticoIniciado: boolean;
    activeTime: () => void;
  }) {
    if (expirado == true && porcentagem == 100)
      return <Button disabled>Diagnóstico Concluído</Button>;

    if (expirado === true && porcentagem !== 100) {
      return (
        <Button disabled>Tempo expirado e Diagnóstico não concluído!</Button>
      );
    }

    if (porcentagem === 100) {
      return <Button disabled>Diagnóstico Concluído</Button>;
    }

    if (!diagnosticoIniciado) {
      return (
        <Button
          className="cursor-pointer"
          onClick={activeTime}
          disabled={isStarting}
        >
          {isStarting ? "Iniciando..." : "Iniciar Diagnóstico"}
        </Button>
      );
    }

    if (tempoRestante !== null) {
      const dias = Math.floor(tempoRestante / 86400);
      const horas = Math.floor((tempoRestante % 86400) / 3600);
      const minutos = Math.floor((tempoRestante % 3600) / 60);
      const segundos = tempoRestante % 60;

      return (
        <Button disabled>
          Tempo restante: {dias}d {horas}h {minutos}m {segundos}s
        </Button>
      );
    }

    return null;
  }

  function alteraBarraProgresso(
    porcentagem: number,
    tempoRestante: number | null,
    diagnosticoIniciado: boolean,
  ) {
    const mesCompleto = 2592000;
    const tempoPorDP = 345600;

    const limites = [
      { limite: 23, fator: 1 },
      { limite: 36, fator: 2 },
      { limite: 50, fator: 3 },
      { limite: 65, fator: 4 },
      { limite: 80, fator: 5 },
      { limite: 81, fator: 6 },
      { limite: 100, fator: 7 },
    ];

    const diagnosticoAtrasado = limites.some(
      ({ limite, fator }) =>
        porcentagem < limite &&
        tempoRestante !== null &&
        tempoRestante <= mesCompleto - tempoPorDP * fator,
    );

    const tempoDecorrido =
      tempoRestante !== null ? mesCompleto - tempoRestante : 0;

    const progressoIdeal = limites.reduce((ideal, { limite, fator }) => {
      const tempoEsperado = tempoPorDP * fator;
      return tempoDecorrido >= tempoEsperado ? limite : ideal;
    }, 0);

    if (!diagnosticoIniciado) {
      return (
        <Button className="-mt-6 w-auto" disabled>
          Diagnóstico não iniciado
        </Button>
      );
    }

    if (tempoRestante == null && porcentagem < 100) {
      return (
        <Button className="-mt-6 bg-red-500" disabled>
          Não concluído.
        </Button>
      );
    }

    if (porcentagem === 100) {
      return (
        <Button className="-mt-6 bg-green-500" disabled>
          Concluído.
        </Button>
      );
    }

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={`cursor-pointer h-auto -mt-6 flex flex-col justify-between ${
              diagnosticoAtrasado
                ? "bg-red-500 hover:bg-red-300"
                : "bg-green-500 hover:bg-green-300"
            }`}
          >
            <span className="-mb-2">
              {diagnosticoAtrasado
                ? "Diagnóstico atrasado!"
                : "Diagnóstico em dia!"}
            </span>
            <span className="text-sm">
              {diagnosticoAtrasado ? "(Saiba mais)" : "(Saiba mais)"}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {diagnosticoAtrasado ? "Atenção!" : "Parabéns!"}
            </DialogTitle>
            <DialogDescription>
              {diagnosticoAtrasado
                ? "O diagnóstico está atrasado. Acelere o processo para evitar problemas."
                : "O diagnóstico está em dia. Continue assim com o bom trabalho!"}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm mb-1">
                Progresso atual ({porcentagem.toFixed(0)}%)
              </p>
              <Progress value={porcentagem} />
            </div>
            <div>
              <p className="text-sm mb-1">
                Progresso esperado ({progressoIdeal.toFixed(0)}%)
              </p>
              <Progress value={progressoIdeal} className="bg-muted" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset id="top">
        <SiteHeader title={cliente ? cliente.nome : "Carregando..."} />
        <div className="flex flex-2 flex-col overflow-x-clip">
          <div className="@container/main flex flex-2 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 px-4 lg:px-6">
                {/* Primeiro Card - Maior */}
                <Card className="h-46 w-full lg:w-full">
                  {" "}
                  {/* Largura ajustada para ser maior */}
                  <CardHeader>
                    <CardTitle className="text-2xl mb-2 flex justify-between">
                      {cliente ? cliente.nome : "Carregando..."}
                      {renderDiagnosticoUI({
                        tempoRestante,
                        isStarting,
                        diagnosticoIniciado,
                        activeTime,
                      })}
                    </CardTitle>
                    <CardDescription className="grid gap-1">
                      <span>
                        Focal point:{" "}
                        <span className="font-bold text-foreground">
                          {cliente ? cliente.nome_responsavel : "Carregando..."}
                          .
                        </span>
                      </span>
                      <span className="flex align-middle justify-between text-muted-foreground">
                        <div>
                          Consultor Responsável:{" "}
                          <span className="font-bold text-foreground">
                            {cliente ? cliente.consultor : "Carregando..."}.
                          </span>
                        </div>
                        <span>
                          {alteraBarraProgresso(
                            porcentagem,
                            tempoRestante,
                            diagnosticoIniciado,
                          )}
                        </span>
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="-mt-10">
                    <p className="text-muted-foreground text-sm mt-2">
                      Tempo Restante:
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col-reverse">
                    <Progress
                      className="-mt-3 w-full h-3.5"
                      value={progressoBarra()}
                    />
                  </CardFooter>
                </Card>

                {/* Segundo Card - Menor */}
                <Card className="lg:w-[80%] w-full flex flex-row justify-between">
                  {" "}
                  {/* Largura ajustada para ser menor */}
                  <div className="w-auto">
                    <CardHeader>
                      <CardDescription>Total de Perguntas:</CardDescription>
                      <CardTitle className="text-2xl font-semibold tabular-nums">
                        {questions.length} perguntas
                      </CardTitle>
                    </CardHeader>
                    <CardContent></CardContent>
                    <CardFooter>
                      <div className="text-muted-foreground mt-6">
                        Total de perguntas respondidas: {answers.length}
                      </div>
                    </CardFooter>
                  </div>
                  <div>
                    <ChartContainer
                      config={chartConfig}
                      className="h-[135px] w-[130px] overflow-hidden mr-4"
                    >
                      <PieChart>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={chartDataPie}
                          dataKey="val"
                          nameKey="question"
                          innerRadius={45}
                          outerRadius={60}
                          activeIndex={0}
                          activeShape={(props: PieSectorDataItem) => (
                            <Sector
                              {...props}
                              outerRadius={(props.outerRadius ?? 0) + 5}
                            />
                          )}
                          isAnimationActive={true}
                          animationDuration={800}
                        >
                          {chartDataPie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                          <Label
                            value={`${porcentagem}%`}
                            position="center"
                            className="fill-muted-foreground text-base"
                          />
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </div>
                </Card>
              </div>

              <div className="px-4 lg:px-6 flex align-center justify-center">
                <TableQuestions
                  onUpdateAnswers={(updatedAnswers: any[]) => {
                    setReloadAnswers((prev) => !prev);
                    setAnswers(updatedAnswers);
                  }}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
                <DashboardGenerator />
                <TableAnswers clienteId={id!} reloadTrigger={reloadAnswers} />
              </div>

              <a
                href="#top"
                className="flex justify-center pt-2.5 fixed bottom-4 cursor-pointer end-4 rounded-[100%] w-13 h-13"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-arrow-up-icon lucide-arrow-up bg-muted p-1 h-auto w-10 rounded-full"
                >
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
