import { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
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
import { toast, Toaster } from "sonner";
import { useAuth } from "@/lib/auth";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const COLORS = [
  "#FF5733", // Vermelho
  "#FF8D1A", // Laranja
  "#FFC300", // Amarelo
  "#33B5FF", // Azul
  "#9C27B0", // Roxo
  "#8BC34A", // Verde
  "#FF4081", // Rosa
];

function TableQuestions({
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

  const [currentPageByTab, setCurrentPageByTab] = useState<
    Record<string, number>
  >({});
  const QUESTIONS_PER_PAGE = 5;

  const { user } = useAuth();
  const { id } = useParams();
  const id_cliente = parseInt(id || "0");
  const id_usuario = user?.id;

  const answersRef = useRef(answers);

  useEffect(() => {
    if (!id_cliente) return;

    fetch(`http://localhost:3333/answers/${id_cliente}`)
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
    fetch("http://localhost:3333/questions/list")
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

  const salvarRespostaIndividual = async (
    idPergunta: string,
    valor: boolean,
  ) => {
    const respostaNumerica = valor ? 1 : 2;
    const data_resposta = new Date().toISOString().split("T")[0];

    const resposta = {
      id_cliente,
      id_pergunta: parseInt(idPergunta),
      resposta: respostaNumerica,
      data_resposta,
      id_usuario,
    };

    try {
      const response = await fetch("http://localhost:3333/answers/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([resposta]),
      });

      const resultado = await response.json();

      if (!response.ok) {
        toast.error(resultado?.error || "Erro ao salvar resposta.");
        return;
      }

      const mensagem = resultado.message?.toLowerCase();

      if (mensagem?.includes("atualizada")) {
        toast.info("Resposta atualizada com sucesso.");
      } else if (mensagem?.includes("salva")) {
        toast.success("Nova resposta salva com sucesso.");
      } else {
        toast.info("Resposta atualizada com sucesso.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar, contate o suporte.");
    }
  };

  const handleSwitchChange = (idPergunta: string, value: boolean) => {
    const updatedAnswers = {
      ...answersRef.current,
      [idPergunta]: value,
    };

    setAnswers(updatedAnswers);
    answersRef.current = updatedAnswers;

    salvarRespostaIndividual(idPergunta, value);

    const respostasValidas = Object.entries(updatedAnswers)
      .filter(([_, v]) => v !== null)
      .map(([id_pergunta, resposta]) => ({
        id_pergunta: Number(id_pergunta),
        resposta: resposta ? 1 : 2,
      }));

    onUpdateAnswers(respostasValidas);
  };

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
    <div className="w-full max-w-8xl mx-auto space-y-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-4 py-2 bg-primary  rounded-md w-full cursor-pointer -mb-3">
            Responder Perguntas
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[80vw] !max-w-none max-h-[88vh] mb-6">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-bold">
              Tabela de Respostas <br />
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="estratégias">
            <TabsList className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 w-full overflow-x-auto">
              {tabsData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-xs sm:text-sm cursor-pointer"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabsData.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="bg-card rounded-xl mt-3 grid grid-cols-1 gap-3 p-6"
              >
                {(() => {
                  const currentPage = currentPageByTab[tab.value] || 1;
                  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
                  const endIndex = startIndex + QUESTIONS_PER_PAGE;
                  const paginatedFields = tab.fields.slice(
                    startIndex,
                    endIndex,
                  );

                  return paginatedFields.map((field: any) => {
                    const isChecked = answersRef.current.hasOwnProperty(
                      field.id,
                    )
                      ? answersRef.current[field.id]
                      : null;

                    return (
                      <div
                        key={field.id}
                        className=" flex items-center justify-between gap-4 border-b pb-3"
                      >
                        <Label
                          htmlFor={field.id}
                          className="text-sm leading-snug max-w-[80%]"
                        >
                          {field.label}
                        </Label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className={`cursor-pointer px-3 py-1 rounded-lg transition-all duration-200 text-white ${
                              isChecked === true
                                ? "bg-emerald-600"
                                : "bg-gray-600"
                            }`}
                            onClick={() => handleSwitchChange(field.id, true)}
                          >
                            Sim
                          </button>
                          <button
                            type="button"
                            className={`cursor-pointer px-3 py-1 rounded-lg transition-all duration-200 text-white ${
                              isChecked === false ? "bg-red-600" : "bg-gray-600"
                            }`}
                            onClick={() => handleSwitchChange(field.id, false)}
                          >
                            Não
                          </button>
                          {isChecked === null && (
                            <span className="text-sm text-gray-500 font-medium">
                              Não respondida.
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}

                <div className="flex justify-center gap-x-6 mt-4">
                  <Button
                    size="sm"
                    disabled={(currentPageByTab[tab.value] || 1) === 1}
                    onClick={() =>
                      setCurrentPageByTab((prev) => ({
                        ...prev,
                        [tab.value]: (prev[tab.value] || 1) - 1,
                      }))
                    }
                  >
                    Anterior
                  </Button>
                  <span className="text-sm self-center">
                    Página {currentPageByTab[tab.value] || 1} de{" "}
                    {Math.ceil(tab.fields.length / QUESTIONS_PER_PAGE)}
                  </span>
                  <Button
                    size="sm"
                    disabled={
                      (currentPageByTab[tab.value] || 1) >=
                      Math.ceil(tab.fields.length / QUESTIONS_PER_PAGE)
                    }
                    onClick={() =>
                      setCurrentPageByTab((prev) => ({
                        ...prev,
                        [tab.value]: (prev[tab.value] || 1) + 1,
                      }))
                    }
                  >
                    Próxima
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>

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

      <Toaster richColors position="top-right" closeButton duration={1000} />
    </div>
  );
}

export default TableQuestions;
