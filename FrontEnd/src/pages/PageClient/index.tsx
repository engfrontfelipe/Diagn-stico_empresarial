import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
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
interface Cliente {
  nome: string;
  nome_responsavel: string;
  cnpj: string;
  ativo: boolean;
  id: string;
  data_cadastro: string;
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
    { id_pergunta: number; texto_pergunta: string; departamento: string }[]
  >([]);
  const [answers, setAnswers] = useState<any[]>([]);

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
    const totalPerguntas = questions.length;
    const naoRespondidas = Math.max(totalPerguntas - respondidas, 0);

    setChartDataPie([
      { question: "Respondidas", val: respondidas, fill: "#33bb45" },
      { question: "Não Respondidas", val: naoRespondidas, fill: "#df2c2c" },
    ]);
  }, [answers, questions]);

  const porcentagem = questions.length
    ? Math.round((answers.length / questions.length) * 100)
    : 0;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset id="top">
        <SiteHeader title={cliente ? cliente.nome : "Carregando..."} />
        <div className="flex flex-2 flex-col overflow-x-clip">
          <div className="@container/main flex flex-2 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
              <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
                <SectionCards
                  description="Empresa:"
                  title={cliente ? cliente.nome : "Carregando..."}
                  footer={`Responsável: ${
                    cliente ? cliente.nome_responsavel : "Carregando..."
                  }`}
                />
                <div>
                  <Card className="@container/card lg:grid grid-cols-2  hidden container-type h-46">
                    <div className="w-150">
                      <CardHeader>
                        <CardDescription>Total de Perguntas:</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
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
                    <div className="flex justify-center items-center">
                      <ChartContainer
                        config={chartConfig}
                        className="h-[135px] w-[130px] ml-18  overflow-hidden"
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
                            activeShape={({
                              outerRadius = 0,
                              ...props
                            }: PieSectorDataItem) => (
                              <Sector
                                {...props}
                                outerRadius={outerRadius + 5}
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
              </div>

              <div className="px-4 lg:px-6 flex align-center justify-center">
                <TableQuestions
                  onUpdateAnswers={(updatedAnswers: any[]) => {
                    setReloadAnswers((prev) => !prev);
                    setAnswers(updatedAnswers);
                  }}
                />
              </div>

              <div className="px-4 lg:px-6 flex align-center justify-center">
                <TableAnswers clienteId={id!} reloadTrigger={reloadAnswers} />
              </div>

              <div className="px-4 lg:px-6 flex align-center justify-center">
                <DashboardGenerator />
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
                  className="lucide lucide-arrow-up-icon lucide-arrow-up bg-muted  p-1 h-auto w-10 rounded-full"
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
