import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Bar,
  BarChart,
  XAxis,
  YAxis,
} from "recharts";
import { useParams } from "react-router-dom";
import { HeaderPageResult } from "./HeaderPageResult";
import { Card } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const apiUrl = "https://diagnostivo-v1-backend.xjjkzc.easypanel.host/";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import TableIceFrameWork from "./tableIceFrameWork";
import Results from "./Results";
import { ContentDiag, selecionarTexto } from "./contetDiag";
import { GeradorRelatorioPDF } from "../Client";

interface Props {
  idCliente: string;
}

interface Resposta {
  id: number;
  departamento: string;
  resposta: string;
  texto_pergunta: string;
  plano_acao: JSON;
  oportunidade: string;
  priorizacao: number;
  texto_afirmativa?: string;
}

const COLORS = ["#12d300", "#fc1a1a"];

const getNivelBgColor = (nivel: string) => {
  switch (nivel.toLowerCase()) {
    case "básico":
      return "bg-red-600";
    case "intermediário":
      return "bg-yellow-500";
    case "avançado":
      return "bg-green-600";
    default:
      return "bg-gray-300 text-black";
  }
};

const chartConfig = {
  Tecnologia: { label: "Tecnologia" },
  Estratégia: { label: "Estratégias" },
  Vendas: { label: "Vendas" },
  Marketing: { label: "Marketing" },
  RH: { label: "RH" },
  Operações: { label: "Operações" },
  Financeiro: { label: "Financeiro " },
} satisfies ChartConfig;

export default function PageResult({ idCliente }: Props) {
  const [respostasPositivas, setRespostasPositivas] = useState<Resposta[]>([]);
  const [respostasNegativas, setRespostasNegativas] = useState<Resposta[]>([]);
  const [barChartData, setBarChartData] = useState<
    { departamento: string; Departamento: number; fill: string }[]
  >([]);
  const [pieChartData, setPieChartData] = useState<
    { name: string; value: number }[]
  >([]);

  const introHTML = selecionarTexto(pieChartData[0]?.value);

  const [_totalPerguntas, setTotalPerguntas] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  idCliente = id || "";
  const [logoCliente, setLogoCLiente] = useState("");
  const [logoUrl, setLogoUrl] = useState<string>("");

  useEffect(() => {
    const fetchLogoCliente = async () => {
      try {
        const response = await fetch(`${apiUrl}/clientes/${idCliente}`);
        if (!response.ok) throw new Error("Erro ao buscar a logo do cliente");

        const data = await response.json();
        if (data.logo_url) {
          setLogoCLiente(data.logo_url);
        }
      } catch (error) {
        console.error("Erro ao buscar logo do cliente:", error);
      }
    };

    fetchLogoCliente();
  }, [idCliente]);

  const verificarTemaEAtualizarLogo = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setLogoUrl(
        "https://assinaturas.grovehost.com.br/imagesClientes/consultingWhite.png",
      );
    } else {
      setLogoUrl(
        "https://assinaturas.grovehost.com.br/imagesClientes/consultingDark.png",
      );
    }
  };

  useEffect(() => {
    verificarTemaEAtualizarLogo();
    const interval = setInterval(() => {
      verificarTemaEAtualizarLogo();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function agruparPorDepartamento(respostas: Resposta[]) {
    return respostas.reduce(
      (acc, item) => {
        const departamento = item.departamento;
        if (!acc[departamento]) {
          acc[departamento] = [];
        }
        acc[departamento].push(item);
        return acc;
      },
      {} as Record<string, Resposta[]>,
    );
  }

  useEffect(() => {
    const fetchRespostasSim = async () => {
      try {
        const response = await fetch(`${apiUrl}/answers/positive/${idCliente}`);
        const data: Resposta[] = await response.json();

        const agrupado = agruparPorDepartamento(data);

        const responseTotais = await fetch(
          `${apiUrl}/questions/list/total-by-departament`,
        );
        const totaisData: { departamento: string; total: number }[] =
          await responseTotais.json();

        const totalPorDepartamento: Record<string, number> = {};
        totaisData.forEach(({ departamento, total }) => {
          totalPorDepartamento[departamento] = total;
        });

        const getCorPorMaturidade = (valor: number) => {
          if (valor < 37) return "#dc2626"; // Vermelho (baixo)
          if (valor < 70) return "#f59e0b"; // Amarelo (médio)
          return "#16a34a"; // Verde (alto)
        };

        const novoChartData = Object.entries(totalPorDepartamento).map(
          ([departamento, totalPerguntas]) => {
            const respostas = agrupado[departamento] || [];
            const respostasSim = respostas.length;

            const porcentagemSim =
              totalPerguntas > 0 ? (respostasSim / totalPerguntas) * 100 : 0;

            return {
              departamento,
              Departamento: porcentagemSim,
              fill: getCorPorMaturidade(porcentagemSim),
            };
          },
        );

        setBarChartData(novoChartData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar respostas positivas ou totais:", error);
      }
    };

    fetchRespostasSim();
  }, [idCliente]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [resPos, resNeg] = await Promise.all([
          fetch(`${apiUrl}/answers/positive/${idCliente}`),
          fetch(`${apiUrl}/answers/negative/${idCliente}`),
        ]);

        const dataPos: Resposta[] = await resPos.json();
        const dataNeg: Resposta[] = await resNeg.json();

        const total = dataPos.length + dataNeg.length;

        const percentualSim = total > 0 ? (dataPos.length / total) * 100 : 0;
        const percentualNao = total > 0 ? (dataNeg.length / total) * 100 : 0;

        setRespostasPositivas(dataPos);
        setRespostasNegativas(dataNeg);
        setPieChartData([
          { name: "Sim", value: percentualSim },
          { name: "Não", value: percentualNao },
        ]);
        setTotalPerguntas(total);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [idCliente]);

  const departamentoes = [
    "Estratégias",
    "Vendas",
    "Operações",
    "Tecnologia",
    "Marketing",
    "Financeiro",
    "RH",
  ];

  const getPercentualSetor = (departamento: string): number => {
    const departamentoNormalizado = departamento.trim().toLowerCase();

    const respostasSetorPositivas = respostasPositivas.filter(
      (r) => r.departamento?.trim().toLowerCase() === departamentoNormalizado,
    );

    const respostasSetorNegativas = respostasNegativas.filter(
      (r) => r.departamento?.trim().toLowerCase() === departamentoNormalizado,
    );

    const totalPorSetor =
      respostasSetorPositivas.length + respostasSetorNegativas.length;

    return totalPorSetor > 0
      ? Math.round((respostasSetorPositivas.length / totalPorSetor) * 100)
      : 0;
  };

  const getNivelMaturidade = (porcentagem: number): string => {
    if (porcentagem < 37) return "Básico";
    if (porcentagem < 70) return "Intermediário";
    return "Avançado";
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 mt-70 border-4 border-t-4 border-accent border-solid rounded-full animate-spin border-t-primary"></div>
        </div>
      </div>
    );
  }

  const getMaturidadeColor = (val: any) => {
    if (val < 37) return "#ff0000";
    if (val < 70) return "#f59e0b";
    return "#00ff00";
  };

  const departamentosUnicos = Array.from(
    new Set([
      ...respostasPositivas.map((r) => r.departamento?.trim()),
      ...respostasNegativas.map((r) => r.departamento?.trim()),
    ]),
  ).filter(Boolean);
  const areas =
    departamentosUnicos.length > 0
      ? departamentosUnicos.map((nome) => ({
          nome,
          percentual: getPercentualSetor(nome),
        }))
      : [];

  const percentualGeral = () => {
    return pieChartData[0]?.value.toFixed(2);
  };

  const respNegativas = respostasNegativas;
  const respPositivas = respostasPositivas;

  return (
    <div className=" w-full h-full mt-25 ">
      <HeaderPageResult />
      <div className="h-5" id="dashGeneral"></div>
      <div className="">
        <div className=" lg:flex gap-5 w-full pl-10 pr-10 m-auto">
          <Card className="w-full lg:max-w-[300px]">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Resultado Geral de Maturidade
            </h3>
            <div className="m-auto w-auto">
              <div className="flex items-center mb-10">
                <span
                  className="text-xs font-semibold  mr-2 "
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  Avaliação
                </span>

                <HoverCard openDelay={1} closeDelay={1}>
                  <HoverCardTrigger
                    className="text-white text-3xl text-center font-bold border-2 w-auto h-20 pt-5 aspect-video"
                    style={{
                      backgroundColor: getMaturidadeColor(
                        pieChartData[0]?.value,
                      ),
                    }}
                  >
                    {pieChartData[0]?.value.toFixed(0)}%
                  </HoverCardTrigger>
                </HoverCard>
              </div>

              <div className="flex mr-10 items-center">
                <span
                  className="text-xs font-semibold m-auto px-1 mr-2 flex items-center justify-center"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  Maturidade
                </span>
                <HoverCard openDelay={1} closeDelay={1}>
                  <HoverCardTrigger
                    className={`text-white text-2xl text-center font-bold border-2 w-auto h-20 p-2 pt-5 aspect-video ${getNivelBgColor(getNivelMaturidade(pieChartData[0]?.value))}`}
                  >
                    <h3>{getNivelMaturidade(pieChartData[0]?.value)}</h3>
                  </HoverCardTrigger>
                </HoverCard>
              </div>
            </div>
          </Card>

          <Card className=" lg:flex mt-5 lg:mt-0 flex-col justify-center items-center w-full h-[360px]">
            <h1 className="text-[18px] -mb-5 font-semibold">
              Em barras por Departamento
            </h1>
            <ResponsiveContainer width="95%" height="90%">
              <ChartContainer className="w-full h-full" config={chartConfig}>
                <BarChart
                  data={barChartData}
                  layout="vertical"
                  margin={{ left: 20, top: 20 }}
                >
                  <XAxis
                    type="number"
                    dataKey="Departamento"
                    domain={[0, 100]}
                  />
                  <YAxis
                    type="category"
                    dataKey="departamento"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value: keyof typeof chartConfig) =>
                      chartConfig?.[value]?.label || value
                    }
                  />

                  <Bar dataKey="Departamento" radius={5}>
                    {barChartData.map((entry, index) => (
                      <Cell key={`bar-${index} `} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 h-90 hidden lg:flex  lg:mt-0 w-auto">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Distribuição de Respostas (%)
            </h3>
            <div className="h-[300px] w-65">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={120}
                  >
                    {pieChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <foreignObject x="24%" y="39%" width="200" height="200">
                    <img src={logoUrl} alt="Central" width="140" height="80" />
                  </foreignObject>

                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value.toFixed(2)}%`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        <div className=" hidden  lg:block w-full m-auto pl-10 pr-10 ">
          <Card className="w-full  mt-5 p-4">
            <div className="flex justify-center gap-3">
              {barChartData.map((card, index) => {
                const nivel = getNivelMaturidade(card.Departamento);
                const nota = `${card.Departamento.toFixed(0)}%`;

                return (
                  <div key={index} className="text-center w-full">
                    <h3 className="font-bold mb-2">{card.departamento}</h3>

                    {/* Cartão com a Nota */}
                    <HoverCard openDelay={1} closeDelay={1}>
                      <div className="flex justify-center mb-2">
                        <span
                          className="text-xs  font-semibold px-1 mr-2"
                          style={{
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                          }}
                        >
                          Nota
                        </span>
                        <HoverCardTrigger
                          className={`border-2  w-full max-w-30 h-14 flex items-center justify-center ${getNivelBgColor(nivel)}`}
                        >
                          <h4 className="text-white font-bold text-xl">
                            {nota}
                          </h4>
                        </HoverCardTrigger>
                      </div>
                    </HoverCard>

                    <HoverCard openDelay={1} closeDelay={1}>
                      <div className="flex justify-center">
                        <span
                          className="text-xs  font-semibold px-1 mr-2 flex items-center justify-center"
                          style={{
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                          }}
                        >
                          Nível
                        </span>
                        <HoverCardTrigger
                          className={`border-2 w-full max-w-30 h-14 flex items-center justify-center ${getNivelBgColor(nivel)}`}
                        >
                          <h4 className="font-bold text-white ">{nivel}</h4>
                        </HoverCardTrigger>
                      </div>
                    </HoverCard>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        <Results
          onUpdateAnswers={function (_answers: any[]): void {
            throw new Error("Function not implemented.");
          }}
        />

        <div className="pl-10 pr-10 mt-5">
          <Card id="diagResult">
            <GeradorRelatorioPDF
              introGeral={introHTML}
              dadosPorDepartamento={areas}
              respostasNegativas={respNegativas}
              pontuacaoFinal={percentualGeral()}
              respostasPositivas={respPositivas}
              logoCliente={logoCliente}
            />
            <ContentDiag
              htmlIntroducao={introHTML}
              areas={areas}
              percentualGeral={percentualGeral()}
              clienteId={idCliente}
            />
          </Card>
        </div>

        <Card
          className="hidden lg:block w-full max-w-[94%] m-auto mt-5"
          id="iceTable"
        >
          <TableIceFrameWork
            clienteId={idCliente.toString()}
            reloadTrigger={false}
          />
        </Card>

        <div className="pl-10 pr-10">
          <Card className="w-full m-auto p-6  mt-5" id="desempenho_area">
            <h2 className="text-xl font-semibold">Desempenho por Área</h2>
            {departamentoes.map((departamento) => (
              <div key={departamento} className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{departamento}</span>
                  <span className="text-sm">
                    {getPercentualSetor(departamento)}%
                  </span>
                </div>
                <Progress
                  value={getPercentualSetor(departamento)}
                  className="h-[13px]"
                />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
