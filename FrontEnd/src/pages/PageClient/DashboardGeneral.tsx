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
  Tecnologia: { label: "Tecnologia", color: "#ffe600" },
  Estratégia: { label: "Estratégias", color: "#2563eb" },
  Vendas: { label: "Vendas", color: "#db2777" },
  Marketing: { label: "Marketing", color: "#f59e0b" },
  RH: { label: "RH", color: "#10b981" },
  Operações: { label: "Operações", color: "#8b5cf6" },
} satisfies ChartConfig;

const getNivelMaturidade = (porcentagem: number): string => {
  if (porcentagem < 40) return "Básico";
  if (porcentagem < 70) return "Intermediário";
  return "Avançado";
};

const getNivelBgColor = (nivel: string) => {
  switch (nivel.toLowerCase()) {
    case "básico":
      return "bg-red-500 text-white";
    case "intermediário":
      return "bg-yellow-400 text-white";
    case "avançado":
      return "bg-green-600 text-white";
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

  const { id } = useParams();
  const idCliente = id;
  const totalPerguntas = 30;

  useEffect(() => {
    const fetchRespostasNao = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/questions/negative/${idCliente}`,
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
            fill: "#33bb45",
          },
          {
            question: "Não",
            val: calcPorcentagem(qtdNao),
            fill: "#df2c2c",
          },
        ]);
      } catch (error) {
        console.error("Erro ao buscar respostas negativas:", error);
      }
    };

    fetchRespostasNao();
  }, [idCliente]);

  useEffect(() => {
    const fetchRespostasSim = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/questions/positive/${idCliente}`,
        );
        const data: Resposta[] = await response.json();

        const agrupado = agruparPorDepartamento(data);

        const totalPorDepartamento: Record<string, number> = {
          Estratégias: 5,
          Vendas: 5,
          Marketing: 5,
          RH: 5,
          Operações: 5,
          Tecnologia: 5,
        };

        const coresDepartamentos: Record<string, string> = {
          Estratégias: "#2563eb",
          Vendas: "#db2777",
          Marketing: "#f59e0b",
          RH: "#10b981",
          Operações: "#8b5cf6",
          Tecnologia: "#ffe600",
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
        console.error("Erro ao buscar respostas positivas:", error);
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
    <div className="w-full max-w-[1600px] mx-auto hidden lg:grid">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Diagnóstico Geral */}
        <div className="flex flex-col justify-center p-6 h-[250px] max-w-60">
          <div className="flex items-start mb-10">
            <span
              className="text-xs font-semibold px-1 mr-2 flex items-center justify-center"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              Avaliação
            </span>
            <HoverCard openDelay={1} closeDelay={1}>
              <HoverCardTrigger className="cursor-pointer text-3xl text-center font-bold text-blue-600 border-2 w-auto h-20 pt-5 aspect-video">
                {chartDataPie[0]?.val.toFixed(0)}%
              </HoverCardTrigger>
              <HoverCardContent>Diagnóstico Geral</HoverCardContent>
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
              <HoverCardTrigger className="cursor-pointer text-2xl text-center font-bold text-blue-600 border-2 w-auto h-20 p-2 pt-5 aspect-video">
                <h3 className="">{getNivelMaturidade(chartDataPie[0]?.val)}</h3>
              </HoverCardTrigger>
              <HoverCardContent>Diagnóstico Geral</HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Gráfico de Barras */}
        <ChartContainer
          className="p-4 h-[250px] w-[400px] -ml-20 max-w-[auto]"
          config={chartConfig}
        >
          <BarChart
            data={chartData}
            layout="vertical"
            className="w-auto h-full"
            margin={{ left: 13 }}
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
        <ChartContainer
          className=" p-4 h-[300px] max-w-[330px] -mt-5"
          config={chartConfig}
        >
          <PieChart width={250} height={250}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartDataPie}
              dataKey="val"
              nameKey="question"
              innerRadius={80}
              outerRadius={100}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 5} />
              )}
              isAnimationActive={true}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-4">
        {chartData.map((card, index) => {
          const nivel = getNivelMaturidade(card.Departamento);
          const nota = `${card.Departamento.toFixed(0)}%`;

          return (
            <div key={index} className="text-center w-32">
              <h3 className="font-bold mb-2">{card.departamento}</h3>
              <HoverCard openDelay={1} closeDelay={1}>
                <div className="flex mb-2">
                  <span
                    className="text-xs font-semibold px-1 mr-2 flex items-center justify-center"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Nota
                  </span>
                  <HoverCardTrigger className="cursor-pointer border-2 w-29 h-14 text-center flex items-center justify-center bg-muted">
                    <h4 className="text-muted-foreground font-bold text-2xl">
                      {nota}
                    </h4>
                  </HoverCardTrigger>
                </div>
                <HoverCardContent className="text-center">
                  Nota de {card.departamento}
                </HoverCardContent>
              </HoverCard>

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
                    className={`cursor-pointer border-2 w-28 h-14 text-center flex items-center justify-center ${getNivelBgColor(nivel)}`}
                  >
                    <h4 className="font-bold">{nivel}</h4>
                  </HoverCardTrigger>
                </div>
                <HoverCardContent className="text-center">
                  Nível de {card.departamento}
                </HoverCardContent>
              </HoverCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
