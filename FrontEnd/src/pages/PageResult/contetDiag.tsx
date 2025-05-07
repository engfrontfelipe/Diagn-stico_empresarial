function ContentDiag() {
  const dados = {
    introducao: "Este relatório apresenta dados sobre a empra OneNature",
    gestaoEstrategica: {
      texto: "A empresa possui missão e visão formalizadas...",
      pontosFortes: ["Direcionamento estratégico", "Liderança sólida"],
      fragilidades: ["Falta de KPIs", "Baixo envolvimento da equipe"],
      oportunidades: ["Balanced Scorecard", "Treinamento estratégico"],
    },
    financas: {
      texto: "A área financeira é organizada...",
      pontosFortes: ["Fluxo de caixa estável"],
      fragilidades: ["Ausência de orçamento anual"],
      oportunidades: ["Sistema financeiro integrado"],
    },
    ambienteExterno: "O mercado apresenta crescimento moderado...",
    swot: {
      forcas: ["Boa reputação", "Equipe experiente"],
      fraquezas: ["Processos manuais", "Baixa automação"],
      oportunidades: ["Digitalização", "Parcerias"],
      ameacas: ["Concorrência", "Instabilidade econômica"],
    },
    planoAcao: [
      {
        area: "Financeiro",
        acao: "Implementar orçamento anual",
        prazo: "2 meses",
        responsavel: "Controller",
      },
      {
        area: "RH",
        acao: "Criar plano de carreira",
        prazo: "3 meses",
        responsavel: "RH",
      },
    ],
    conclusao: "Este diagnóstico empresarial revelou importantes insights...",
  };

  const diagnosticoHTML = (dados: any) => `
    <div class="">
        <h1 class="text-2xl font-bold mb-6 ">Relatório de Diagnóstico Empresarial</h1>

        <section class="mb-6">
          <h2 class="text-[20px] font-semibold  mb-2">1. Introdução</h2>
          <p class="">${dados.introducao}</p>
        </section>

        <section class="mb-6">
          <h2 class="text-[20px] font-semibold  mb-2">2. Análise do Ambiente Interno</h2>
          <div class="mb-4">
            <h3 class="text-xl font-semibold  mb-1">2.1 Gestão Estratégica</h3>
            <p class="">${dados.gestaoEstrategica.texto}</p>
            <ul class="list-disc ml-6 ">
              <li><strong>Pontos Fortes:</strong> ${dados.gestaoEstrategica.pontosFortes.join(", ")}</li>
              <li><strong>Fragilidades:</strong> ${dados.gestaoEstrategica.fragilidades.join(", ")}</li>
              <li><strong>Oportunidades:</strong> ${dados.gestaoEstrategica.oportunidades.join(", ")}</li>
            </ul>
          </div>

          <div class="mb-4">
            <h3 class="text-xl font-semibold  mb-1">2.2 Finanças</h3>
            <p class="">${dados.financas.texto}</p>
            <ul class="list-disc ml-6 ">
              <li><strong>Pontos Fortes:</strong> ${dados.financas.pontosFortes.join(", ")}</li>
              <li><strong>Fragilidades:</strong> ${dados.financas.fragilidades.join(", ")}</li>
              <li><strong>Oportunidades:</strong> ${dados.financas.oportunidades.join(", ")}</li>
            </ul>
          </div>
        </section>

        <section class="mb-6">
          <h2 class="text-[20px] font-semibold  mb-2">3. Análise do Ambiente Externo</h2>
          <p class="">${dados.ambienteExterno}</p>
        </section>

        <section class="mb-6">
          <h2 class="text-[20px] font-semibold  mb-2">4. Diagnóstico SWOT</h2>
          <div class="grid grid-cols-2 gap-4 ">
            <div>
              <h4 class="font-bold  mb-1">Forças (F)</h4>
              <ul class="list-disc ml-6">${dados.swot.forcas.map((f: any) => `<li>${f}</li>`).join("")}</ul>
            </div>
            <div>
              <h4 class="font-bold  mb-1">Fraquezas (F)</h4>
              <ul class="list-disc ml-6">${dados.swot.fraquezas.map((f: any) => `<li>${f}</li>`).join("")}</ul>
            </div>
            <div>
              <h4 class="font-bold  mb-1">Oportunidades (O)</h4>
              <ul class="list-disc ml-6">${dados.swot.oportunidades.map((f: any) => `<li>${f}</li>`).join("")}</ul>
            </div>
            <div>
              <h4 class="font-bold  mb-1">Ameaças (A)</h4>
              <ul class="list-disc ml-6">${dados.swot.ameacas.map((f: any) => `<li>${f}</li>`).join("")}</ul>
            </div>
          </div>
        </section>

       

        <section>
          <h2 class="text-[20px] font-semibold  mb-2">6. Considerações Finais</h2>
          <p class="">${dados.conclusao}</p>
        </section>
      </div>
    </div>
  `;

  return <div dangerouslySetInnerHTML={{ __html: diagnosticoHTML(dados) }} />;
}

export default ContentDiag;
