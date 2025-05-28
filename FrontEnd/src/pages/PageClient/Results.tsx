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
// import { useAuth } from "@/lib/auth";
import { useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const COLORS = [
  "#FF5733", // Vermelho
  "#FF8D1A", // Laranja
  "#FFC300", // Amarelo
  "#33B5FF", // Azul
  "#9C27B0", // Roxo
  "#8BC34A", // Verde
  "#FF4081", // Rosa
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

  //   const { user } = useAuth();
  const { id } = useParams();
  const id_cliente = parseInt(id || "0");

  const answersRef = useRef(answers);

  useEffect(() => {
    if (!id_cliente) return;

    fetch(`${apiUrl}/answers/${id_cliente}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar respostas salvas");
        return res.json();
      })
      .then((data) => {
        const booleanAnswers: Record<string, boolean> = {};

        data.forEach((item: { id_pergunta: number; resposta: number }) => {
          booleanAnswers[item.id_pergunta.toString()] = item.resposta === 1;
        });

        setAnswers(booleanAnswers);
        answersRef.current = booleanAnswers;

        const respostasValidas = Object.entries(booleanAnswers).map(
          ([id_pergunta, resposta]) => ({
            id_pergunta: Number(id_pergunta),
            resposta: resposta ? 1 : 2,
          }),
        );
        onUpdateAnswers(respostasValidas);
      })
      .catch((error) => {
        console.error("Erro ao carregar respostas salvas:", error);
      });
  }, [id_cliente]);

  useEffect(() => {
    fetch(`${apiUrl}/questions/list`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar as perguntas");
        return res.json();
      })
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Erro ao buscar as perguntas:", error));
  }, []);

  const tabsData = questions.reduce((acc: any[], question) => {
    const tab = acc.find(
      (t: { label: string }) => t.label === question.departamento,
    );
    const field = {
      id: question.id_pergunta,
      label: question.texto_pergunta,
    };

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
  }, [answers]);

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
  }, [answers]);

  function getCurrentTheme() {
    const theme = localStorage.getItem("theme");

    if (theme == "dark") {
      return "white";
    } else {
      return "black";
    }
  }

  return (
    <div className="w-full pl-6 pr-6">
      {Object.keys(answersRef.current).length === questions.length && (
        <Card className="hidden md:flex w-full h-[320px] flex-row p-6 pt-10 mt-5">
          <div className="flex flex-col items-center">
            <h3 className="text-md font-semibold mb-4 -mt-4">
              % de maturidade pro departamento
            </h3>
            <PieChart width={365} height={230}>
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
              <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
            </PieChart>
          </div>

          <div className="flex flex-col items-center w-full">
            <h3 className="text-md font-semibold  -mt-4">
              Respostas Sim X Respostas Não
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart margin={{ top: 10 }} data={chartData}>
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
                    fill={getCurrentTheme()}
                  />
                </Bar>
                <Bar dataKey="Inativos" fill="#ff0000" radius={4}>
                  <LabelList
                    dataKey="Inativos"
                    position="top"
                    fontSize={14}
                    fill={getCurrentTheme()}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      <Toaster richColors position="bottom-center" closeButton duration={1000} />
    </div>
  );
}

export default Results;
