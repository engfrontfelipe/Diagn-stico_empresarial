"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Bar,
  BarChart,
  Cell,
  Label,
  Pie,
  PieChart,
  Sector,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../../components/ui/hover-card";

interface Resposta {
  id_resposta: number;
  id_cliente: number;
  texto_pergunta: string;
  departamento: string;
}

const chartConfig = {
  Tecnologia: { label: "Tecnologia" },
  Estratégia: { label: "Estratégias" },
  Vendas: { label: "Vendas" },
  Marketing: { label: "Marketing" },
  RH: { label: "RH" },
  Operações: { label: "Operações" },
  Financeiro: { label: "Financeiro " },
} satisfies ChartConfig;

const descricaoDepartamentos: Record<string, string> = {
  Estratégias: "Direcionamento e posicionamento competitivo da empresa.",
  Vendas: "Capacidade de gerar receita por meio de ofertas eficazes.",
  Marketing:
    "Atração e retenção de clientes através de comunicação estratégica.",
  RH: "Gestão de pessoas, talentos e clima organizacional.",
  Operações: "Eficiência na entrega de produtos e serviços.",
  Tecnologia: "Uso de ferramentas digitais para otimizar processos.",
  Financeiro: "Gestão de recursos, investimentos e saúde econômica.",
};

const getNivelMaturidade = (porcentagem: number): string => {
  if (porcentagem < 40) return "Básico";
  if (porcentagem < 70) return "Intermediário";
  return "Avançado";
};

const getNivelBgColor = (nivel: string) => {
  switch (nivel.toLowerCase()) {
    case "básico":
      return "bg-red-600 ";
    case "intermediário":
      return "bg-yellow-400 ";
    case "avançado":
      return "bg-green-600 ";
    default:
      return "bg-gray-300 text-black";
  }
};

export default function DashboardGeneral() {
  const [chartDataPie, setChartDataPie] = useState([
    { question: "Sim", val: 0, fill: "#33bb45" },
    { question: "Não", val: 0, fill: "#df2c2c" },
  ]);
  const [chartData, setChartData] = useState<
    { departamento: string; Departamento: number; fill: string }[]
  >([]);

  const [totalPerguntas, setTotalPerguntas] = useState(Number);

  const { id } = useParams();
  const idCliente = id;

  useEffect(() => {
    const fetchTotalPerguntas = async () => {
      try {
        const response = await fetch(
          "http://localhost:3333/questions/list/total",
        );
        const data = await response.json();
        setTotalPerguntas(data.total);
      } catch (error) {
        console.error("Erro ao buscar total de perguntas:", error);
      }
    };

    fetchTotalPerguntas();
  }, []);

  useEffect(() => {
    const fetchRespostasNao = async () => {
      if (!totalPerguntas || totalPerguntas === 0) return;

      try {
        const response = await fetch(
          `http://localhost:3333/answers/negative/${idCliente}`,
        );
        const data: Resposta[] = await response.json();

        const qtdNao = data.length;
        const qtdSim = totalPerguntas - qtdNao;

        const calcPorcentagem = (valor: number) =>
          (valor / totalPerguntas) * 100;

        setChartDataPie([
          {
            question: "Sim",
            val: calcPorcentagem(qtdSim),
            fill: "#11c700",
          },
          {
            question: "Não",
            val: calcPorcentagem(qtdNao),
            fill: "#ff0404",
          },
        ]);
      } catch (error) {
        console.error("Erro ao buscar respostas negativas:", error);
      }
    };

    fetchRespostasNao();
  }, [idCliente, totalPerguntas]);

  useEffect(() => {
    const fetchRespostasSim = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/answers/positive/${idCliente}`,
        );
        const data: Resposta[] = await response.json();

        const agrupado = agruparPorDepartamento(data);

        const responseTotais = await fetch(
          `http://localhost:3333/questions/list/total-by-departament`,
        );
        const totaisData: { departamento: string; total: number }[] =
          await responseTotais.json();

        const totalPorDepartamento: Record<string, number> = {};
        totaisData.forEach(({ departamento, total }) => {
          totalPorDepartamento[departamento] = total;
        });

        const coresDepartamentos: Record<string, string> = {
          Estratégias: "#2563eb",
          Vendas: "#db2777",
          Marketing: "#f59e0b",
          RH: "#10b981",
          Operações: "#8b5cf6",
          Tecnologia: "#ffe600",
          Financeiro: "#ff0000",
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
              fill: coresDepartamentos[departamento] || "#999999",
            };
          },
        );

        setChartData(novoChartData);
      } catch (error) {
        console.error("Erro ao buscar respostas positivas ou totais:", error);
      }
    };

    fetchRespostasSim();
  }, [idCliente]);

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

  return (
    <div className=" w-full hidden lg:flex flex-col">
      <div className="flex gap-4 align-middle justify-center p-2 h-70">
        {/* Diagnóstico Geral */}
        <div className=" mt-6 w-auto">
          <div className="flex items-start mb-10 ">
            <span
              className="text-xs font-semibold px-1 mr-2"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              Avaliação
            </span>

            <HoverCard openDelay={1} closeDelay={1}>
              <HoverCardTrigger
                className="cursor-pointer text-3xl text-center font-bold border-2 w-auto h-20 pt-5 aspect-video"
                style={{
                  backgroundColor:
                    chartDataPie[0]?.val < 30
                      ? "#dc2626" // vermelho
                      : chartDataPie[0]?.val < 70
                        ? "#ffe600" // amarelo
                        : "#16a34a", // verde
                }}
              >
                {chartDataPie[0]?.val.toFixed(0)}%
              </HoverCardTrigger>

              <HoverCardContent>
                {(() => {
                  const val = chartDataPie[0]?.val ?? 0;
                  if (val < 30) {
                    return "Maturidade baixa. Requer atenção e melhorias.";
                  } else if (val < 70) {
                    return "Maturidade intermediária. Há espaço para evoluir.";
                  } else {
                    return "Maturidade avançada. Ótimo desempenho!";
                  }
                })()}
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex items-start">
            <span
              className="text-xs font-semibold px-1 mr-2 flex items-center justify-center"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              Maturidade
            </span>
            <HoverCard openDelay={1} closeDelay={1}>
              <HoverCardTrigger
                className={`cursor-pointer text-2xl text-center font-bold border-2 w-full h-20 p-2 pt-5 aspect-video ${getNivelBgColor(getNivelMaturidade(chartDataPie[0]?.val))}`}
              >
                <h3 className="">{getNivelMaturidade(chartDataPie[0]?.val)}</h3>
              </HoverCardTrigger>
              <HoverCardContent>
                Nível de desenvolvimento da empresa em processos, gestão e
                capacidade de adaptação ao mercado.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Gráfico de Barras */}
        <ChartContainer className=" h-[auto] w-120" config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 13, top: 20 }}
          >
            <XAxis type="number" dataKey="Departamento" domain={[0, 100]} />
            <YAxis
              type="category"
              dataKey="departamento"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig?.[value as keyof typeof chartConfig]?.label || value
              }
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="Departamento" radius={5}>
              {chartData.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>

        {/* Gráfico de Pizza */}
        <ChartContainer className=" h-[full] w-70" config={chartConfig}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartDataPie}
              dataKey="val"
              nameKey="question"
              innerRadius={80}
              outerRadius={110}
              activeIndex={0}
              activeShape={(props: PieSectorDataItem) => (
                <Sector {...props} outerRadius={(props.outerRadius ?? 0) + 5} />
              )}
              isAnimationActive={true}
            >
              {chartDataPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                value="Sim ou não"
                position="center"
                className="fill-muted-foreground text-base"
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      {/* Cartões Dinâmicos */}
      <div className="flex justify-center gap-3">
        {chartData.map((card, index) => {
          const nivel = getNivelMaturidade(card.Departamento);
          const nota = `${card.Departamento.toFixed(0)}%`;

          return (
            <div key={index} className="text-center w-32 ">
              <h3 className="font-bold mb-2">{card.departamento}</h3>

              {/* Cartão com a Nota */}
              <HoverCard openDelay={1} closeDelay={1}>
                <div className="flex mb-2">
                  <span
                    className="text-xs font-semibold px-1 mr-2"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Nota
                  </span>
                  <HoverCardTrigger
                    className={`cursor-pointer border-2 w-28 h-14 text-center flex items-center justify-center ${getNivelBgColor(
                      nivel,
                    )}`}
                  >
                    <h4 className="text-muted-foreground font-bold text-2xl">
                      {nota}
                    </h4>
                  </HoverCardTrigger>
                </div>
                <HoverCardContent className="text-center text-sm">
                  {descricaoDepartamentos[card.departamento] ??
                    `Nível ${card.departamento}`}
                </HoverCardContent>
              </HoverCard>

              {/* Cartão com o Nível */}
              <HoverCard>
                <div className="flex">
                  <span
                    className="text-xs font-semibold px-1 mr-2 flex items-center justify-center"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Nível
                  </span>
                  <HoverCardTrigger
                    className={`cursor-pointer border-2 w-28 h-14 text-center flex items-center justify-center ${getNivelBgColor(
                      nivel,
                    )}`}
                  >
                    <h4 className="font-bold">{nivel}</h4>
                  </HoverCardTrigger>
                </div>
                <HoverCardContent className="text-center text-sm">
                  {descricaoDepartamentos[card.departamento] ??
                    `Nível ${card.departamento}`}
                </HoverCardContent>
              </HoverCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
