// tableQuestions.tsx
import { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

const apiUrl = "https://backend-backend-diagnostico.yjayid.easypanel.host";

interface Pergunta {
  id_pergunta: number;
  texto_pergunta: string;
  departamento: string;
}

interface TableQuestionsProps {
  onUpdateAnswers: (answers: any[]) => void;
  clienteId: string;
}

// Função para decodificar JWT sem biblioteca
const decodeJWT = (token: string | null): any => {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export default function TableQuestions({
  onUpdateAnswers,
  clienteId,
}: TableQuestionsProps) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [questions, setQuestions] = useState<Pergunta[]>([]);
  const [loading, setLoading] = useState(true);
  const answersRef = useRef(answers);
  const [currentPageByTab, setCurrentPageByTab] = useState<
    Record<string, number>
  >({});

  const QUESTIONS_PER_PAGE = 7;

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // Carrega respostas salvas (só uma vez)
  useEffect(() => {
    const carregarRespostas = async () => {
      try {
        const res = await fetch(`${apiUrl}/answers/${clienteId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();

        const map: Record<string, boolean> = {};
        data.forEach((a: any) => {
          map[a.id_pergunta] = a.resposta === 1;
        });

        setAnswers(map);
        answersRef.current = map;

        // Atualiza o pai apenas uma vez no carregamento
        onUpdateAnswers(
          Object.entries(map).map(([id, r]) => ({
            id_pergunta: +id,
            resposta: r ? 1 : 2,
          })),
        );
      } catch (err) {
        console.error("Erro ao carregar respostas:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarRespostas();
  }, [clienteId]); // SEM onUpdateAnswers aqui = sem loop!

  // Carrega perguntas do cliente
  useEffect(() => {
    fetch(`${apiUrl}/questions/cliente/${clienteId}`)
      .then((r) => r.json())
      .then(setQuestions)
      .catch(() => toast.error("Erro ao carregar perguntas"));
  }, [clienteId]);

  const salvarRespostaIndividual = async (
    idPergunta: string,
    valor: boolean,
  ) => {
    const respostaNumerica = valor ? 1 : 2;
    const data_resposta = new Date().toISOString().split("T")[0];

    // PEGA O TOKEN DO LOCALSTORAGE E DECODIFICA
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("userToken");
    const payloadJWT = decodeJWT(token);
    const id_usuario = payloadJWT?.id || 1; // fallback pro admin

    const payload = [
      {
        id_cliente: Number(clienteId),
        id_pergunta: Number(idPergunta),
        resposta: respostaNumerica,
        data_resposta,
        id_usuario, // AGORA VAI O USUÁRIO LOGADO!
      },
    ];

    try {
      const res = await fetch(`${apiUrl}/answers/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      });

      const resultado = await res.json();

      if (!res.ok) {
        toast.error(resultado?.error || "Erro ao salvar resposta");
        return;
      }

      toast.success(
        valor ? "Resposta 'Sim' salva!" : "Oportunidade identificada!",
      );
    } catch (err) {
      console.error("Erro ao salvar:", err);
      toast.error("Erro de conexão com o servidor");
    }
  };

  const handleSwitchChange = (idPergunta: string, value: boolean) => {
    const updated = { ...answersRef.current, [idPergunta]: value };
    setAnswers(updated);
    answersRef.current = updated;

    salvarRespostaIndividual(idPergunta, value);

    // Atualiza o pai com as respostas válidas
    const validas = Object.entries(updated)
      .filter(([_, v]) => v !== undefined)
      .map(([id, resp]) => ({
        id_pergunta: Number(id),
        resposta: resp ? 1 : 2,
      }));

    onUpdateAnswers(validas);
  };

  // Agrupa perguntas por departamento
  const tabsData = questions.reduce((acc: any[], q) => {
    const existing = acc.find((t) => t.label === q.departamento);
    const field = { id: q.id_pergunta, label: q.texto_pergunta };

    if (existing) {
      existing.fields.push(field);
    } else {
      acc.push({
        value: q.departamento.toLowerCase().replace(/\s+/g, "-"),
        label: q.departamento,
        fields: [field],
      });
    }
    return acc;
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Nenhuma pergunta disponível para este cliente.</p>
        <p className="text-sm mt-2">Verifique os departamentos no cadastro.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue={tabsData[0]?.value}>
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 w-full overflow-x-auto h-auto">
          {tabsData.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-xs sm:text-sm"
            >
              {tab.label} ({tab.fields.length})
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsData.map((tab) => {
          const page = currentPageByTab[tab.value] || 1;
          const start = (page - 1) * QUESTIONS_PER_PAGE;
          const end = start + QUESTIONS_PER_PAGE;
          const pageItems = tab.fields.slice(start, end);

          return (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              <div className="space-y-6 bg-card rounded-xl p-6 border">
                {pageItems.map((field: any) => {
                  const checked = answersRef.current[field.id] ?? null;

                  return (
                    <div
                      key={field.id}
                      className="flex items-start justify-between gap-4 pb-5 border-b last:border-0"
                    >
                      <Label
                        htmlFor={`q-${field.id}`}
                        className="text-sm leading-relaxed max-w-2xl"
                      >
                        {field.label}
                      </Label>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleSwitchChange(field.id.toString(), true)
                          }
                          className={`px-5 py-2 rounded-lg font-medium transition-all ${
                            checked === true
                              ? "bg-emerald-600 text-white shadow-md"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          Sim
                        </button>
                        <button
                          onClick={() =>
                            handleSwitchChange(field.id.toString(), false)
                          }
                          className={`px-5 py-2 rounded-lg font-medium transition-all ${
                            checked === false
                              ? "bg-red-600 text-white shadow-md"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          Não
                        </button>
                        {checked === null && (
                          <span className="text-xs text-muted-foreground">
                            Pendente
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Paginação */}
                {tab.fields.length > QUESTIONS_PER_PAGE && (
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={page === 1}
                      onClick={() =>
                        setCurrentPageByTab((prev) => ({
                          ...prev,
                          [tab.value]: page - 1,
                        }))
                      }
                    >
                      Anterior
                    </Button>
                    <span className="text-sm">
                      Página {page} de{" "}
                      {Math.ceil(tab.fields.length / QUESTIONS_PER_PAGE)}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={end >= tab.fields.length}
                      onClick={() =>
                        setCurrentPageByTab((prev) => ({
                          ...prev,
                          [tab.value]: page + 1,
                        }))
                      }
                    >
                      Próxima
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      <Toaster position="bottom-center" richColors closeButton />
    </div>
  );
}
