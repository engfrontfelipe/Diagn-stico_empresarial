import { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

import { toast, Toaster } from "sonner";
import { useAuth } from "@/lib/auth";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const apiUrl = "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host/";

function TableQuestions({
  onUpdateAnswers,
}: {
  onUpdateAnswers: (answers: any[]) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [questions, setQuestions] = useState<
    { id_pergunta: number; texto_pergunta: string; departamento: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const [currentPageByTab, setCurrentPageByTab] = useState<
    Record<string, number>
  >({});
  const QUESTIONS_PER_PAGE = 7;

  const { user } = useAuth();
  const { id } = useParams();
  const id_cliente = parseInt(id || "0");
  const id_usuario = user?.id;

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
      })
      .finally(() => setLoading(false)); // <-- aqui
  }, [id_cliente]);

  useEffect(() => {
    fetch(`${apiUrl}/questions/list`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar as perguntas");
        return res.json();
      })
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Erro ao buscar as perguntas:", error))
      .finally(() => setLoading(false)); // <-- aqui também
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
      const response = await fetch(`${apiUrl}/answers/save`, {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px] w-full">
        <div className="w-16 h-16 border-4 border-t-transparent border-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-8xl mx-auto space-y-2">
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
              const paginatedFields = tab.fields.slice(startIndex, endIndex);

              return paginatedFields.map((field: any) => {
                const isChecked = answersRef.current.hasOwnProperty(field.id)
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
                          isChecked === true ? "bg-emerald-600" : "bg-gray-600"
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

      <Toaster
        richColors
        position="bottom-center"
        closeButton
        duration={1000}
      />
    </div>
  );
}

export default TableQuestions;
