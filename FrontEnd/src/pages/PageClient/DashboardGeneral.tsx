import { useEffect, useState } from "react";
("use client");

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
  departament: string;
}

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#2563eb" },
  { browser: "safari", visitors: 200, fill: "#db2777" },
  { browser: "firefox", visitors: 187, fill: "#f59e0b" },
  { browser: "edge", visitors: 173, fill: "#10b981" },
  { browser: "other", visitors: 90, fill: "#8b5cf6" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Estratégia",
    color: "#2563eb",
  },
  safari: {
    label: "Vendas",
    color: "#db2777",
  },
  firefox: {
    label: "Marketing",
    color: "#f59e0b",
  },
  edge: {
    label: "RH",
    color: "#10b981",
  },
  other: {
    label: "Operações",
    color: "#8b5cf6",
  },
} satisfies ChartConfig;

const cardsData = [
  {
    titulo: "Estratégia",
    nota: "48%",
    nivel: "Intermediário",
    hoverText: "Testando Hover",
  },
  {
    titulo: "Vendas",
    nota: "62%",
    nivel: "Avançado",
    hoverText: "Detalhes da Vendas",
  },
  {
    titulo: "Marketing",
    nota: "33%",
    nivel: "Básico",
    hoverText: "Análise de Marketing",
  },
  {
    titulo: "RH",
    nota: "85%",
    nivel: "Avançado",
    hoverText: "Uso de RH",
  },
  {
    titulo: "Operações",
    nota: "58%",
    nivel: "Intermediário",
    hoverText: "Nível de Operações",
  },
];
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

  const idCliente = 2; //REQ PARAMS
  const totalPerguntas: number = 30;

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
          totalPerguntas === 0 ? 0 : (valor / totalPerguntas) * 100;

        setChartDataPie([
          { question: "Sim", val: calcPorcentagem(qtdSim), fill: "#33bb45" },
          { question: "Não", val: calcPorcentagem(qtdNao), fill: "#df2c2c" },
        ]);
      } catch (error) {
        console.error("Erro ao buscar respostas negativas:", error);
      }
    };

    fetchRespostasNao();
  }, [idCliente, totalPerguntas]);

  return (
    <div className="p-10 w-full max-w-[1600px] mx-auto hidden lg:block">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="flex flex-col mt-3">
          <div className="flex">
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
              <HoverCardTrigger className="cursor-pointer text-4xl text-center font-bold text-blue-600 border-2 w-32 h-15 p-2 aspect-video">
                28%
              </HoverCardTrigger>
              <HoverCardContent>Diagnóstico Geral</HoverCardContent>
            </HoverCard>
          </div>

          <div className="flex mt-5">
            <span
              className="text-xs font-semibold px-1 mr-2 flex items-center justify-center"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              Nível de Maturidade
            </span>
            <HoverCard openDelay={1} closeDelay={1}>
              <HoverCardTrigger className="cursor-pointer text-4xl text-center font-bold text-blue-600 border-2 w-32 h-30 p-2 aspect-video">
                <h3 className="pt-7">Básico</h3>
              </HoverCardTrigger>
              <HoverCardContent>Diagnóstico Geral</HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <ChartContainer
          className="h-[250px]  max-w-[500px] -ml-35 "
          config={chartConfig}
        >
          <BarChart data={chartData} layout="vertical">
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>

        <ChartContainer config={chartConfig} className="h-[250px] w-[300px]">
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
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 5} />
              )}
              isAnimationActive={true}
            >
              {chartDataPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                value="Visitors"
                position="center"
                className="fill-muted-foreground text-base"
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-5 mt-10">
        {cardsData.map((card, index) => (
          <div key={index} className="text-center w-32">
            <h3 className="font-bold mb-2">{card.titulo}</h3>

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
                    {card.nota}
                  </h4>
                </HoverCardTrigger>
              </div>
              <HoverCardContent className="text-center ">
                {card.hoverText}
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
                  className={`cursor-pointer border-2 w-28 h-14 text-center flex items-center justify-center ${getNivelBgColor(
                    card.nivel,
                  )}`}
                >
                  <h4 className="font-bold">{card.nivel}</h4>
                </HoverCardTrigger>
              </div>
              <HoverCardContent className="text-center">
                {card.hoverText}
              </HoverCardContent>
            </HoverCard>
          </div>
        ))}
      </div>
    </div>
  );
}
