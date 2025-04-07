import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CheckCircle, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const tabsData = [
  {
    value: "Estrategia",
    label: "Estratégia",
    fields: [
      { id: "estrategia1", label: "A empresa possui um objetivo estratégico claro e mensurável para os próximos 12 meses?" },
      { id: "estrategia2", label: "Existem KPIs definidos para acompanhar os resultados estratégicos?" },
      { id: "estrategia3", label: "Há um prazo bem definido para a execução da estratégia traçada?" },
    ],
  },
  {
    value: "Vendas",
    label: "Vendas",
    fields: [
      { id: "vendas1", label: "Existe uma meta mensal de vendas formalizada e comunicada à equipe?" },
      { id: "vendas2", label: "Os canais de vendas utilizados são monitorados quanto à performance?" },
      { id: "vendas3", label: "A equipe de vendas está dimensionada adequadamente para a demanda?" },
    ],
  },
  {
    value: "Marketing",
    label: "Marketing",
    fields: [
      { id: "marketing1", label: "O orçamento de marketing está definido com base em metas e canais estratégicos?" },
      { id: "marketing2", label: "A empresa atua com uma estratégia clara de presença digital (redes sociais, SEO, etc.)?" },
      { id: "marketing3", label: "Existem campanhas de marketing planejadas para os próximos meses?" },
    ],
  },
  {
    value: "RH",
    label: "Recursos Humanos",
    fields: [
      { id: "rh1", label: "Há um plano ativo de contratação para atender às demandas atuais e futuras?" },
      { id: "rh2", label: "São oferecidos treinamentos regulares para desenvolvimento da equipe?" },
      { id: "rh3", label: "A empresa revisa e atualiza frequentemente seus benefícios?" },
    ],
  },
  {
    value: "Operacoes",
    label: "Operações",
    fields: [
      { id: "operacoes1", label: "Os principais processos operacionais estão documentados e otimizados?" },
      { id: "operacoes2", label: "Existe uma boa relação com os fornecedores principais, baseada em SLA?" },
      { id: "operacoes3", label: "A logística de distribuição é eficiente e bem planejada?" },
    ],
  },
  {
    value: "Tecnologia",
    label: "Tecnologia",
    fields: [
      { id: "tech1", label: "A infraestrutura tecnológica atende bem às demandas da empresa?" },
      { id: "tech2", label: "A empresa investe continuamente em inovação tecnológica?" },
      { id: "tech3", label: "Existem medidas robustas de segurança da informação implementadas?" },
    ],
  },
];

function TableQuestions() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [chartData, setChartData] = useState<any[]>([]);

  const handleSwitchChange = (id: string, value: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    const updatedChartData = tabsData.map((tab) => {
      let ativos = 0;
      let inativos = 0;
      tab.fields.forEach((field) => {
        const isChecked = answers[field.id] || false;
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

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <Tabs defaultValue="Estrategia">
        <TabsList className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full overflow-x-auto">
          {tabsData.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-xs sm:text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsData.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="bg-card rounded-xl mt-3 grid grid-cols-1 gap-6 p-6"
          >
            {tab.fields.map((field) => (
              <div key={field.id} className="flex items-center justify-between gap-4 border-b pb-3">
                <Label htmlFor={field.id} className="text-sm leading-snug max-w-[80%]">
                  {field.label}
                </Label>
                <div className="flex items-center gap-2">
                  <XCircle className={`w-5 h-5 transition-all duration-200 ${answers[field.id] ? "opacity-30" : "text-destructive"}`} />
                  <Switch
                    id={field.id}
                    checked={answers[field.id] || false}
                    onCheckedChange={(value) => handleSwitchChange(field.id, value)}
                  />
                  <CheckCircle className={`w-5 h-5 transition-all duration-200 ${answers[field.id] ? "text-emerald-600" : "opacity-30"}`} />
                </div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 30, bottom: 5 }}>
            <XAxis dataKey="nome" tick={{ fontSize: 14 }} />
            <YAxis allowDecimals={false} />
            <Tooltip
              contentStyle={{
                fontSize: "0.875rem",
                borderRadius: "0.5rem",
                height: "auto",
                margin: "0.5rem",
              }}

            />
            <Legend iconType="circle" />
            <Bar  dataKey="Ativos"  fill="#1c58da" radius={4}  />
            <Bar dataKey="Inativos" fill="#011481"  radius={4}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TableQuestions;