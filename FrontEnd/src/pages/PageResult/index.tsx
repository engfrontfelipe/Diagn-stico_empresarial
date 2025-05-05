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
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@radix-ui/react-hover-card";

interface Props {
  idCliente: number;
}

interface Resposta {
  id: number;
  departamento: string;
  resposta: string; // "sim" ou "não"
}

const COLORS = ["#1274f5", "#2932a8"];
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

const getNivelBgColor = (nivel: string) => {
  switch (nivel.toLowerCase()) {
    case "básico":
      return "bg-blue-800"; // Azul escuro
    case "intermediário":
      return "bg-blue-600"; // Azul médio
    case "avançado":
      return "bg-blue-400"; // Azul claro
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
  const [pieChartData, setPieChartData] = useState<{ name: string; value: number }[]>([]);
  const [barChartData, setBarChartData] = useState<
    { departamento: string; Departamento: number; fill: string }[]
  >([]);
  const [totalPerguntas, setTotalPerguntas] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  idCliente = Number(id);

  function agruparPorDepartamento(respostas: Resposta[]) {
    return respostas.reduce((acc, item) => {
      const departamento = item.departamento;
      if (!acc[departamento]) {
        acc[departamento] = [];
      }
      acc[departamento].push(item);
      return acc;
    }, {} as Record<string, Resposta[]>);
  }

  useEffect(() => {
    const fetchRespostasSim = async () => {
      try {
        const response = await fetch(`http://localhost:3333/answers/positive/${idCliente}`);
        const data: Resposta[] = await response.json();

        const agrupado = agruparPorDepartamento(data);

        const responseTotais = await fetch(
          `http://localhost:3333/questions/list/total-by-departament`
        );
        const totaisData: { departamento: string; total: number }[] =
          await responseTotais.json();

        const totalPorDepartamento: Record<string, number> = {};
        totaisData.forEach(({ departamento, total }) => {
          totalPorDepartamento[departamento] = total;
        });
        const getCorPorMaturidade = (valor: number) => {
          if (valor < 30) return "#1e3a8a"; // Azul escuro
          if (valor < 70) return "#3b82f6"; // Azul médio
          return "#60a5fa"; // Azul claro
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
          }
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
          fetch(`http://localhost:3333/answers/positive/${idCliente}`),
          fetch(`http://localhost:3333/answers/negative/${idCliente}`),
        ]);

        const dataPos: Resposta[] = await resPos.json();
        const dataNeg: Resposta[] = await resNeg.json();

        setRespostasPositivas(dataPos);
        setRespostasNegativas(dataNeg);
        setPieChartData([
          { name: "Sim", value: dataPos.length },
          { name: "Não", value: dataNeg.length },
        ]);
        setTotalPerguntas(dataPos.length + dataNeg.length);
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
      (r) => r.departamento?.trim().toLowerCase() === departamentoNormalizado
    );

    const respostasSetorNegativas = respostasNegativas.filter(
      (r) => r.departamento?.trim().toLowerCase() === departamentoNormalizado
    );

    const totalPorSetor =
      respostasSetorPositivas.length + respostasSetorNegativas.length;

    return totalPorSetor > 0
      ? Math.round((respostasSetorPositivas.length / totalPorSetor) * 100)
      : 0;
  };

  const getNivelMaturidade = (porcentagem: number): string => {
    if (porcentagem < 40) return "Básico";
    if (porcentagem < 70) return "Intermediário";
    return "Avançado";
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 mt-70 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <HeaderPageResult />
      <div className="container mx-auto px-4 mt-10">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 h-90">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Distribuição de Respostas (%)
            </h3>
            <div className="h-[300px]">
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
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="flex justify-center items-center h-90">
            <h1 className="text-[18px] -mb-5 font-semibold">Em barras por Departamento</h1>
          
          <ChartContainer className="h-70 w-140" config={chartConfig}>
            <BarChart
              data={barChartData}
              layout="vertical"
              margin={{ left: 20, top: 20 }}
            >
              <XAxis type="number" dataKey="Departamento" domain={[0, 100]} />
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
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="Departamento" radius={5}>
                {barChartData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
          </Card>
      
        </div>
        <Card className="mt-5 h-52">

        <div className="flex justify-center gap-3">
        {barChartData.map((card, index) => {
          const nivel = getNivelMaturidade(card.Departamento);
          const nota = `${card.Departamento.toFixed(0)}%`;

          return (
            <div key={index} className="text-center w-32">
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
                    className={`cursor-pointer border-2 w-28 h-14 text-center flex items-center justify-center ${getNivelBgColor(nivel)}`}
                  >
                    <h4 className="text-muted-foreground font-bold w-40 text-2xl">
                      {nota}
                    </h4>
                  </HoverCardTrigger>
                </div>
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
                    className={`cursor-pointer border-2 w-28 h-14 text-center flex items-center justify-center ${getNivelBgColor(nivel)}`}
                  >
                    <h4 className="font-bold w-40">{nivel}</h4>
                  </HoverCardTrigger>
                </div>

              </HoverCard>
            </div>
          );
        })}
      </div>               
        </Card>

        <Card className="w-full p-6 mt-10">
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
  );
}
