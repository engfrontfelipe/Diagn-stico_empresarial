import { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Pie,
  PieChart,
  LabelList,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Toaster } from "sonner";
import { useParams } from "react-router-dom";

const apiUrl =
  "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host/";

const COLORS = [
  "#FF5733",
  "#FF8D1A",
  "#FFC300",
  "#33B5FF",
  "#9C27B0",
  "#8BC34A",
  "#FF4081",
];

function Results({
  onUpdateAnswers,
}: {
  onUpdateAnswers: (answers: any[]) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartDataPie, setChartDataPie] = useState<any[]>([]);
  const [questions, setQuestions] = useState<
    { id_pergunta: number; texto_pergunta: string; departamento: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const [labelColor, setLabelColor] = useState(getInitialThemeColor());

  function getInitialThemeColor() {
    const theme = localStorage.getItem("theme");
    return theme === "dark" ? "white" : "black";
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const theme = localStorage.getItem("theme");
      const newColor = theme === "dark" ? "white" : "black";
      setLabelColor((prev) => (prev !== newColor ? newColor : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { id } = useParams();
  const id_cliente = parseInt(id || "0");

  const answersRef = useRef(answers);

  useEffect(() => {
    if (!id_cliente) return;

    async function fetchData() {
      try {
        const [resAnswers, resQuestions] = await Promise.all([
          fetch(`${apiUrl}/answers/${id_cliente}`),
          fetch(`${apiUrl}/questions/list`),
        ]);

        if (!resAnswers.ok || !resQuestions.ok) {
          throw new Error("Erro ao buscar os dados");
        }

        const answersData = await resAnswers.json();
        const questionsData = await resQuestions.json();

        const booleanAnswers: Record<string, boolean> = {};
        answersData.forEach(
          (item: { id_pergunta: number; resposta: number }) => {
            booleanAnswers[item.id_pergunta.toString()] = item.resposta === 1;
          },
        );

        setAnswers(booleanAnswers);
        answersRef.current = booleanAnswers;
        setQuestions(questionsData);

        const respostasValidas = Object.entries(booleanAnswers).map(
          ([id_pergunta, resposta]) => ({
            id_pergunta: Number(id_pergunta),
            resposta: resposta ? 1 : 2,
          }),
        );
        onUpdateAnswers(respostasValidas);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id_cliente]);

  const tabsData = questions.reduce((acc: any[], question) => {
    const tab = acc.find(
      (t: { label: string }) => t.label === question.departamento,
    );
    const field = { id: question.id_pergunta, label: question.texto_pergunta };

    if (tab) {
      tab.fields.push(field);
    } else {
      acc.push({
        value: question.departamento.toLowerCase().replace(/\s/g, "-"),
        label: question.departamento,
        fields: [field],
      });
    }

    return acc;
  }, []);

  useEffect(() => {
    const updatedChartData = tabsData.map((tab) => {
      let ativos = 0;
      let inativos = 0;
      tab.fields.forEach((field: any) => {
        const isChecked = answersRef.current.hasOwnProperty(field.id)
          ? answersRef.current[field.id]
          : null;
        isChecked ? ativos++ : inativos++;
      });
      return {
        nome: tab.label,
        Ativos: ativos,
        Inativos: inativos,
      };
    });
    setChartData(updatedChartData);
  }, [answers, questions]);

  useEffect(() => {
    const totalSim = tabsData.reduce((total, tab) => {
      return (
        total +
        tab.fields.reduce((acc: any, field: any) => {
          return acc + (answersRef.current[field.id] ? 1 : 0);
        }, 0)
      );
    }, 0);

    const updatedChartData = tabsData.map((tab) => {
      const ativos = tab.fields.reduce((acc: any, field: any) => {
        return acc + (answersRef.current[field.id] ? 1 : 0);
      }, 0);

      const porcentagem = totalSim > 0 ? (ativos / totalSim) * 100 : 0;

      return {
        name: tab.label,
        value: parseFloat(porcentagem.toFixed(2)),
      };
    });

    setChartDataPie(updatedChartData);
  }, [answers, questions]);

  return (
    <div className="w-full pl-10 pr-10">
      {isLoading ? (
        <div className="flex justify-center items-center h-[400px] w-full">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        Object.keys(answersRef.current).length === questions.length && (
          <Card className="hidden md:flex w-full h-[350px] flex-row p-6 pt-10 mt-5">
            <div className="flex flex-col items-center">
              <h3 className="text-md font-semibold mb-4 -mt-4">
                % de maturidade por departamento
              </h3>
              <PieChart width={390} height={250}>
                <Pie
                  data={chartDataPie}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  fill="#8884d8"
                  label={({ name }) => name}
                  className="text-md font-medium"
                >
                  {chartDataPie.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value.toFixed(1)}%`}
                />
              </PieChart>
            </div>

            <div className="flex flex-col items-center w-full">
              <h3 className="text-md font-semibold  -mt-4">
                Respostas Sim X Respostas Não
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart margin={{ top: 20 }} data={chartData}>
                  <XAxis dataKey="nome" tick={{ fontSize: 14 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      fontSize: "0.875rem",
                      borderRadius: "0.5rem",
                    }}
                    cursor={false}
                  />
                  <Legend iconType="star" />
                  <Bar dataKey="Ativos" fill="#28a745" radius={4}>
                    <LabelList
                      dataKey="Ativos"
                      position="top"
                      fontSize={14}
                      fill={labelColor}
                    />
                  </Bar>
                  <Bar dataKey="Inativos" fill="#ff0000" radius={4}>
                    <LabelList
                      dataKey="Inativos"
                      position="top"
                      fontSize={14}
                      fill={labelColor}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )
      )}

      <Toaster
        richColors
        position="bottom-center"
        closeButton
        duration={1000}
      />
    </div>
  );
}

export default Results;
