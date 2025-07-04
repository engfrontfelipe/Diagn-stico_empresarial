export type MaturidadeNivel =
  | "10"
  | "20"
  | "30"
  | "40"
  | "50"
  | "60"
  | "70"
  | "80"
  | "90"
  | "100";

export const introducoes: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A empresa encontra-se em um estágio extremamente inicial de desenvolvimento organizacional. O cenário atual é caracterizado por uma ausência quase total de processos estruturados, práticas gerenciais inexistentes e decisões predominantemente baseadas em urgência e improviso.
     Não há definição clara de papéis, metas ou rotinas, e os fluxos operacionais são informais e inconsistentes. 
     A comunicação interna é fragmentada, e a ausência de registros e indicadores impossibilita a análise crítica do desempenho. 
     Diante disso, torna-se urgente estabelecer os alicerces básicos da gestão, como a criação de organogramas funcionais, definição de responsabilidades, introdução de rotinas operacionais e adoção de ferramentas simples para controle e registro. Este é o momento de fundar uma base sólida sobre a qual a empresa poderá evoluir com consistência e segurança.`,
  ],
  "20": [
    `Neste estágio, a empresa começa a dar os primeiros passos rumo à formalização, porém ainda enfrenta sérias limitações estruturais. Algumas tentativas pontuais de organização podem ser observadas, mas não há um alinhamento estratégico que oriente as ações do dia a dia.
     Os processos, quando existentes, são informais, pouco documentados e dependentes de pessoas específicas, o que compromete a continuidade e escalabilidade. 
     Há também uma carência de visão analítica, dificultando a identificação de gargalos e oportunidades. O plano de evolução neste estágio deve priorizar a modelagem dos processos essenciais, a formalização mínima de fluxos de trabalho e o início da cultura de análise de dados. Estabelecer rotinas de feedback, promover capacitação básica e garantir uma comunicação mais clara são passos decisivos para construir uma gestão mais previsível.`,
  ],
  "30": [
    `A organização apresenta sinais iniciais de estrutura, com algumas áreas operando sob processos rudimentares. No entanto, ainda existe uma forte dependência de conhecimentos informais e baixa padronização nas atividades diárias.
     O ambiente é marcado por esforços operacionais descoordenados, ausência de rituais gerenciais e falta de métricas que possibilitem avaliação objetiva. As áreas comerciais e de marketing costumam atuar de forma reativa, sem metas claras ou acompanhamento sistemático. 
     Para evoluir, é essencial promover a integração entre os setores, implantar um modelo de gestão por resultados e iniciar a cultura de planejamento. A introdução de ferramentas digitais básicas, associada ao mapeamento dos principais fluxos de trabalho, será crucial para a estabilização da operação e ganho de eficiência.`,
  ],
  "40": [
    `A análise revela uma empresa em construção, que já percebe a importância da organização interna e tenta aplicar algumas boas práticas, ainda que de forma inconsistente. 
    Algumas áreas possuem rotinas mais definidas, porém o todo ainda carece de alinhamento estratégico. Falta clareza na definição de prioridades, os fluxos entre áreas são frágeis e a análise de desempenho é pouco explorada. 
    As ações de marketing e comercialização tendem a ocorrer sem uma cadência definida, dificultando previsibilidade de resultados. A recomendação, neste momento, é promover maior integração entre os departamentos, adotar ferramentas de CRM e planejamento, além de iniciar um processo estruturado de coleta e análise de indicadores-chave. A organização deve estabelecer metas claras, padronizar rotinas e criar mecanismos de acompanhamento para reduzir a variabilidade nas entregas e decisões.`,
  ],
  "50": [
    `A empresa apresenta avanços consistentes em sua jornada de estruturação, com áreas operando em diferentes níveis de maturidade. Algumas práticas de gestão já estão implementadas, indicando movimentos iniciais em direção à organização e ao planejamento estruturado, embora ainda existam limitações.
As iniciativas comerciais e de marketing evidenciam uma transição para uma abordagem mais estratégica, mas ainda carecem de alinhamento sistêmico, uso efetivo de indicadores e processos baseados em dados consistentes.
O cenário atual aponta para uma organização com condições favoráveis à evolução para um novo estágio de maturidade, com foco na profissionalização da gestão, digitalização de processos e consolidação de uma cultura orientada à análise crítica e tomada de decisão baseada em evidências.
Para viabilizar um crescimento sustentável e escalável, será fundamental avançar na criação de indicadores estratégicos, no estabelecimento de rotinas de acompanhamento e no investimento em tecnologias de suporte à gestão.
`,
  ],
  "60": [
    `A empresa se posiciona em um estágio intermediário de maturidade, com diversas rotinas estruturadas e algum nível de previsibilidade operacional. Existe planejamento em diferentes áreas, e a gestão começa a se apoiar em dados para tomada de decisão. No entanto, persistem gargalos em termos de consistência, governança e integração entre setores.
     A equipe demonstra bom engajamento, mas carece de rituais gerenciais fortes e clareza sobre indicadores de sucesso. As oportunidades estão na profissionalização do time, padronização completa dos processos e no uso mais estratégico de ferramentas como CRM, BI e gestão por OKRs. A empresa deve fortalecer seus mecanismos de monitoramento e expandir a inteligência operacional para avançar rumo à alta performance.`,
  ],
  "70": [
    `O diagnóstico evidencia uma organização com boa maturidade em gestão, com processos bem definidos em diversas áreas e capacidade crescente de monitoramento e tomada de decisão baseada em dados. 
    A cultura de melhoria contínua começa a se consolidar, e a empresa já colhe os frutos de práticas estruturadas. Ainda assim, há espaço para evolução em áreas como automação, inovação e integração de sistemas.
     A recomendação é avançar na transformação digital, capacitar lideranças intermediárias e criar modelos de inteligência preditiva para antecipação de cenários e tendências. A consolidação de uma cultura orientada a resultados e a formalização de planos estratégicos robustos são os próximos passos naturais.`,
  ],
  "80": [
    `A empresa opera com alto grau de organização e profissionalismo. Os processos são consistentes, as rotinas estão formalizadas e os times demonstram maturidade na execução das suas responsabilidades.
     O uso de ferramentas de gestão está bem disseminado, e os indicadores são monitorados com regularidade. Neste estágio, o desafio está na inovação contínua, na melhoria da experiência do cliente e na construção de um ecossistema de dados que permita decisões ainda mais ágeis e assertivas. 
     O foco do plano de ação está na governança, no investimento em tecnologia e no fortalecimento das lideranças estratégicas. A empresa está pronta para se tornar referência em eficiência e inovação no seu mercado.`,
  ],
  "90": [
    `O diagnóstico revela uma empresa com gestão altamente madura, sólida cultura de resultados e processos bem integrados. As práticas de governança, controle e análise estão disseminadas em todos os níveis da organização. 
    A estrutura tecnológica é bem aproveitada, permitindo análises em tempo real e decisões orientadas por dados. A atuação dos líderes é estratégica, e os processos de melhoria são constantes. Os próximos passos envolvem escalar boas práticas para novas unidades ou produtos, explorar com mais profundidade tecnologias emergentes como IA e automação avançada e reforçar a cultura de inovação.
     A organização está em excelente posição para crescer de forma exponencial e sustentável.`,
  ],
  "100": [
    `A empresa apresenta excelência operacional e estratégica. Todas as áreas operam em alto desempenho, com processos otimizados, lideranças capacitadas e forte orientação para inovação.
     A cultura é centrada em dados, aprendizado contínuo e protagonismo dos times. Ferramentas tecnológicas de ponta estão integradas ao cotidiano, e decisões são tomadas com base em inteligência de mercado e projeções estratégicas.
    Neste estágio, o foco está na diferenciação competitiva, internacionalização, parcerias estratégicas e legado institucional. A organização tem potencial não apenas para liderar seu setor, mas para influenciar positivamente o ecossistema ao seu redor.`,
  ],
};

export const introducoesEstrategia: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A empresa encontra-se em um estágio embrionário de construção estratégica. Ainda não há um direcionamento claro para o crescimento, e as decisões são tomadas de maneira reativa, com pouca ou nenhuma base analítica. Não existem metas estratégicas definidas, nem planos de médio ou longo prazo. 
     Neste cenário, é essencial iniciar a construção de uma base estratégica mínima: compreender o propósito do negócio, mapear os principais objetivos organizacionais e iniciar a definição de metas simples. Também é importante promover encontros periódicos com os responsáveis para começar a alinhar a direção da empresa e desenvolver uma visão conjunta de futuro.`,
  ],
  "20": [
    `A organização começa a reconhecer a necessidade de orientação estratégica, mas ainda carece de estrutura e consistência na aplicação de conceitos. Algumas metas podem existir, mas não há alinhamento entre os níveis tático e operacional, dificultando a execução coordenada. 
     A ausência de um plano estratégico formal limita a visão de longo prazo e contribui para decisões inconsistentes. Para avançar, recomenda-se a elaboração de um plano estratégico básico com definição de missão, visão, valores e objetivos de curto prazo, além de introduzir reuniões de alinhamento com foco em prioridades estratégicas.`,
  ],
  "30": [
    `Há sinais iniciais de estruturação estratégica, com alguns esforços voltados para o planejamento e direcionamento do negócio. Entretanto, ainda há grande dispersão nas ações e falta de integração entre setores. Os objetivos estratégicos são pouco conhecidos pela equipe e não há mecanismos formais de acompanhamento de resultados.
     O plano de ação deve priorizar a definição clara dos objetivos estratégicos, a disseminação da visão da empresa entre os colaboradores e a criação de mecanismos simples para monitorar o progresso, como painéis de metas trimestrais.`,
  ],
  "40": [
    `A análise aponta uma empresa que começa a implementar práticas estratégicas mais estruturadas, mas ainda enfrenta dificuldades para garantir alinhamento e execução. Existem objetivos definidos e algumas ações planejadas, porém sem integração com a rotina operacional ou acompanhamento sistemático.
     Neste estágio, é crucial promover maior clareza estratégica, conectando os objetivos globais com metas departamentais. A criação de planos de ação detalhados, com responsáveis e prazos, e a institucionalização de rituais de acompanhamento (como reuniões mensais de performance) ajudarão a consolidar a disciplina estratégica.`,
  ],
  "50": [
    `A empresa demonstra um nível satisfatório de consciência estratégica, com objetivos corporativos definidos e iniciativas em andamento. Contudo, foram identificadas fragilidades na gestão das prioridades, na comunicação eficaz da estratégia entre os diferentes níveis organizacionais e na mensuração sistemática dos resultados obtidos. 
    A recomendação é fortalecer a governança estratégica por meio da definição e acompanhamento de indicadores-chave de desempenho (KPIs), promovendo o alinhamento entre as metas organizacionais e os planos táticos das áreas. É essencial ampliar o engajamento das lideranças no processo de desdobramento das metas e institucionalizar uma cultura de monitoramento contínuo, revisão periódica e aprendizado estratégico.
`,
  ],
  "60": [
    `A estrutura estratégica da empresa está consolidada em diversos aspectos. Os objetivos organizacionais são claros, existe um plano estratégico documentado e boa parte das áreas conhece suas metas. No entanto, ainda há oportunidades para fortalecer a execução e integrar mais profundamente os níveis tático e operacional.
     Para evoluir, recomenda-se a criação de dashboards integrados para acompanhamento em tempo real, adoção de metodologias ágeis na execução dos projetos estratégicos e capacitação contínua das lideranças para gerir indicadores, riscos e resultados.`,
  ],
  "70": [
    `O cenário revela uma empresa com maturidade estratégica sólida, planos bem definidos e rotinas de acompanhamento estabelecidas. As áreas já atuam com base em metas estratégicas e há indicadores sendo monitorados. No entanto, existe espaço para evoluir em previsibilidade e inovação.
     A recomendação é avançar no uso de inteligência de mercado, realizar análises preditivas e fomentar a cultura de aprendizado estratégico contínuo. Investir em planejamento estratégico participativo e desenvolver a governança de portfólio de projetos também pode ampliar a eficácia da execução.`,
  ],
  "80": [
    `A organização demonstra excelência em gestão estratégica, com clareza de propósito, metas desdobradas por áreas, e forte integração entre planejamento e execução. Os ciclos de revisão estratégica já ocorrem regularmente e os dados são amplamente utilizados para embasar decisões.
     Neste nível, os desafios envolvem ampliar a capacidade de adaptação diante de mudanças rápidas no mercado, incorporar inovação como vetor estratégico e garantir que toda a organização esteja envolvida no processo de construção de valor. Estratégias baseadas em diferenciação e posicionamento competitivo devem ser continuamente revisitadas.`,
  ],
  "90": [
    `A empresa opera com um modelo estratégico de alto desempenho, com governança bem definida, líderes capacitados e foco em inovação e escalabilidade. A integração entre planejamento, execução e monitoramento é contínua e eficiente. Os indicadores são acompanhados com profundidade e utilizados para ajustes ágeis na rota estratégica.
     A organização está pronta para implementar práticas de gestão exponencial, explorar novos modelos de negócio e potencializar sua atuação por meio de alianças estratégicas e internacionalização. A análise estratégica deve estar focada em antecipar tendências e influenciar o mercado.`,
  ],
  "100": [
    `A análise aponta uma organização com excelência estratégica plena. Todas as decisões são orientadas por um modelo sistêmico, com altíssimo alinhamento entre liderança, cultura e objetivos. A estratégia está fortemente conectada à inovação, sustentabilidade e impacto social.
     A empresa atua como referência no seu setor, influenciando cadeias inteiras e ecossistemas de negócio. Os próximos desafios estão relacionados à construção de legado, institucionalização da inteligência estratégica e manutenção de um ambiente de alta performance com resiliência e capacidade de reinvenção constante.`,
  ],
};
export const conclusoesEstrategia: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A Vertical Group encontra-se em um estágio muito inicial da base estratégica, com pouca estruturação formal do planejamento. É fundamental estabelecer os fundamentos básicos como missão, visão e objetivos iniciais, para iniciar uma trajetória consistente rumo ao crescimento sustentável.`,
  ],
  "20": [
    `A empresa apresenta os primeiros esforços para organizar sua base estratégica, embora ainda enfrente dificuldades na definição de metas claras e indicadores de desempenho. O foco deve ser a construção de um direcionamento coerente e a implantação de controles simples que possibilitem o acompanhamento dos resultados.`,
  ],
  "30": [
    `Neste estágio, já existe um planejamento estratégico básico, porém a execução é desarticulada e ainda falta integração entre as áreas. É essencial aprimorar a definição de metas departamentais e implementar indicadores que possibilitem maior controle e responsabilidade.`,
  ],
  "40": [
    `A base estratégica está mais consolidada, com direcionamentos para o futuro, porém a execução de curto prazo ainda demanda fortalecimento. A empresa deve investir no uso estruturado de indicadores e na comunicação entre equipes para transformar o planejamento em ações efetivas.`,
  ],
  "50": [
    `A empresa demonstra avanços significativos na definição de metas e indicadores, com maior disciplina na execução e no acompanhamento. No entanto, a análise sistemática dos resultados e a capacidade de adaptação com base em dados ainda precisam ser fortalecidas, de modo a consolidar o crescimento e sustentar a estratégia em um ambiente de constante transformação.
`,
  ],
  "60": [
    `Com processos mais estruturados, a empresa já utiliza indicadores estratégicos para monitorar o desempenho e ajustar suas ações. O próximo passo é intensificar a integração entre planejamento e execução para aumentar a agilidade e eficácia dos resultados.`,
  ],
  "70": [
    `A maturidade estratégica permite que a Vertical Group transforme o planejamento em resultados consistentes. O uso avançado de indicadores e a análise crítica facilitam decisões ágeis, alinhadas com os objetivos de longo prazo, impulsionando a competitividade.`,
  ],
  "80": [
    `A empresa apresenta forte maturidade estratégica, com execução eficiente e metas integradas. A análise sistemática dos indicadores permite antecipar desafios e oportunidades, promovendo ajustes proativos e inovação.`,
  ],
  "90": [
    `A Vertical Group é referência em execução estratégica, com um ciclo contínuo de planejamento, monitoramento e ajuste. A cultura orientada a resultados e o uso inteligente de dados garantem a manutenção da competitividade e a busca por excelência.`,
  ],
  "100": [
    `A empresa alcançou excelência na maturidade estratégica, com processos integrados, metas claras e indicadores que geram insights profundos para a tomada de decisão. Está preparada para liderar seu mercado, inovar com segurança e garantir crescimento sustentável e duradouro.`,
  ],
};

export const introducoesVendas: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área comercial encontra-se em um estágio inicial de maturidade, com ausência de processos definidos e forte dependência de esforços individuais. Não há clareza nas metas de vendas, tampouco uso estruturado de ferramentas de CRM ou gestão de funil.
     Para avançar, é necessário iniciar a documentação dos processos comerciais, definir uma estrutura básica de prospecção e estabelecer metas claras e mensuráveis. O primeiro passo é estruturar um funil de vendas simples e capacitar o time em rotinas básicas de abordagem, qualificação e follow-up.`,
  ],
  "20": [
    `A equipe comercial começa a dar os primeiros passos rumo à estruturação, porém ainda atua de forma desorganizada e reativa. As metas podem existir, mas não são comunicadas de forma clara e sistemática. Há carência de processos padronizados e baixa previsibilidade dos resultados.
     O foco deve estar em mapear a jornada de vendas, estruturar um processo padrão com etapas bem definidas e integrar ferramentas simples como planilhas de controle ou um CRM básico. A consistência nas abordagens e na cadência de contato com clientes precisa ser fortalecida.`,
  ],
  "30": [
    `Existe um esforço visível em organizar a operação de vendas, com início da utilização de ferramentas e definição de metas, ainda que com baixa padronização. A gestão do funil é inconsistente e a previsibilidade de fechamento ainda é muito baixa.
     É recomendado o fortalecimento da estrutura comercial por meio de treinamentos, padronização do processo de vendas e maior rigor na gestão do pipeline. O acompanhamento semanal de indicadores como taxa de conversão e ciclo de vendas ajudará a ganhar mais previsibilidade.`,
  ],
  "40": [
    `A área comercial apresenta uma estrutura operacional em estágio inicial, com metas estabelecidas e utilização parcial de ferramentas de suporte. Apesar da execução ativa, o processo comercial enfrenta desafios relevantes, como cadência inconsistente, baixa taxa de conversão e falhas na qualificação dos leads. Observa-se, ainda, ausência de uma rotina estruturada de análise de desempenho.
Para elevar a performance da área, recomenda-se a revisão completa do funil de vendas, com a definição clara de etapas. A implantação de rituais de acompanhamento sistemático, como reuniões semanais, é essencial para garantir previsibilidade e correção ágil de desvios. Além disso, o aprofundamento da integração com a área de marketing permitirá elevar a qualidade da base prospectada, promovendo maior eficiência na conversão e no aproveitamento das oportunidades geradas.
`,
  ],
  "50": [
    `A estrutura comercial está em desenvolvimento com processos definidos, uso consistente de ferramentas e equipe orientada por metas. Porém, a previsibilidade de resultados ainda é instável e a gestão de indicadores não é plenamente explorada.
     A maturidade comercial pode avançar com a adoção de metodologias de qualificação (como BANT ou SPIN Selling), automações de follow-up e melhor segmentação do funil por perfil de cliente. A análise dos dados históricos pode aprimorar a previsibilidade.`,
  ],
  "60": [
    `A área comercial demonstra estrutura consolidada, com funil padronizado, uso ativo de CRM e metas bem comunicadas à equipe. Já há previsibilidade parcial nos resultados, e indicadores como conversão por etapa e ciclo de vendas são acompanhados.
     Para evoluir, é importante realizar diagnósticos periódicos de performance, investir em playbooks de vendas e elevar o nível de capacitação do time com foco em negociação, objeções e fechamento. Estratégias de vendas consultivas podem ser incorporadas.`,
  ],
  "70": [
    `A operação comercial está bem estruturada, com equipe treinada, processos maduros e uso eficiente de ferramentas. Há previsibilidade razoável nos resultados e uso de métricas para tomada de decisão. As abordagens são personalizadas e orientadas por dados.
     Os próximos passos envolvem escalabilidade do processo, testes de canais alternativos de aquisição, e desenvolvimento de estratégias para redução do ciclo de vendas. O uso de inteligência de dados e segmentação avançada pode trazer ganho significativo.`,
  ],
  "80": [
    `A maturidade comercial é alta, com processos sofisticados, cadência bem definida, metas inteligentes (SMART), previsibilidade precisa e acompanhamento contínuo de métricas. O time atua de forma consultiva e personalizada, com grande domínio do processo.
     Neste nível, é recomendável adotar mecanismos de feedback contínuo entre vendas e marketing, aprofundar o uso de automações e inteligência artificial e fomentar um ambiente de melhoria contínua com base em benchmarking e indicadores de performance.`,
  ],
  "90": [
    `A equipe comercial opera em altíssimo nível, com processos otimizados, forte uso de tecnologia e previsibilidade muito alta. Há alinhamento pleno entre metas, indicadores e ações estratégicas, além de uma cultura de melhoria contínua e excelência em atendimento.
     O foco agora deve estar na inovação de abordagens, expansão de canais de aquisição e exploração de mercados internacionais. Estratégias de account-based selling, vendas por comunidade e fortalecimento da marca pessoal dos vendedores podem ser diferenciais.`,
  ],
  "100": [
    `A organização possui um time de vendas de elite, altamente estratégico, analítico e inovador. A previsibilidade é absoluta, com domínio total do funil de vendas, integração profunda com o marketing e automações inteligentes em toda a jornada.
     Neste estágio, a área comercial se torna referência no setor, influenciando tendências e desenvolvendo soluções customizadas para diferentes segmentos de mercado. A busca por excelência está centrada em gerar valor para o cliente em todos os pontos de contato.`,
  ],
};
export const conclusoesVendas: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área de vendas está em estágio inicial, com pouca estruturação e processos básicos. A ausência de definição clara do perfil ideal de cliente (ICP) e ferramentas adequadas limita a capacidade de escalar as operações comerciais. É imprescindível iniciar o estabelecimento de rotinas básicas e definir o público-alvo para promover ganhos rápidos.`,
  ],
  "20": [
    `O setor comercial apresenta primeiros sinais de organização, porém ainda carece de cadência e previsibilidade nas vendas. A liderança está presente, mas as práticas comerciais permanecem reativas. A implementação de processos estruturados e o uso de ferramentas simples são essenciais para avançar na construção de uma operação sólida.`,
  ],
  "30": [
    `Há esforços claros para estruturar a área de vendas, com equipe engajada e início de definição do ICP. Ainda assim, falta integração entre planejamento e execução, além de processos que permitam monitorar indicadores de desempenho de forma eficaz.`,
  ],
  "40": [
    `A equipe de vendas conta com uma base estruturada, com cadência definida e ferramentas de apoio parcialmente implementadas. A previsibilidade de resultados começa a se consolidar, mas ainda é necessário fortalecer a disciplina na definição de metas, no acompanhamento de indicadores e na análise de performance para garantir escalabilidade e maior assertividade nas decisões comerciais.
`,
  ],
  "50": [
    `A maturidade da área comercial reflete um avanço na gestão das operações, com uso mais eficiente de ferramentas e definição clara do ICP. A liderança exerce papel estratégico, porém a escalabilidade ainda depende da otimização contínua dos processos e do alinhamento com a estratégia geral da empresa.`,
  ],
  "60": [
    `Com processos mais sólidos e cadência estabelecida, a área de vendas monitora indicadores estratégicos e realiza análises regulares para ajustar suas ações. O desafio é aprofundar o uso de dados e automatizar controles para ampliar a eficiência e previsibilidade.`,
  ],
  "70": [
    `A área de vendas apresenta boa previsibilidade e operação orientada a resultados, com equipe alinhada e uso avançado de ferramentas. A integração com marketing e outras áreas fortalece a geração de oportunidades e a conversão de clientes.`,
  ],
  "80": [
    `A operação comercial é altamente estruturada, com processos automatizados, definição precisa de ICP e forte capacidade analítica. As decisões são baseadas em dados em tempo real, promovendo escalabilidade e sustentabilidade no crescimento.`,
  ],
  "90": [
    `A área de vendas é referência em gestão comercial, com práticas de excelência, indicadores estratégicos e inovação constante. A liderança é consultiva e a equipe opera com alta performance, contribuindo diretamente para os resultados do negócio.`,
  ],
  "100": [
    `A empresa alcançou a maturidade máxima na área comercial, com operação totalmente integrada, processos automatizados e foco contínuo em inovação. A escalabilidade é natural e sustentada por uma cultura orientada a resultados e excelência no atendimento ao cliente.`,
  ],
};

export const introducoesMarketing: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área de marketing encontra-se em estágio inicial, sem planejamento estratégico, estrutura de campanhas ou mensuração de resultados. As ações realizadas são pontuais e desconectadas de objetivos claros, muitas vezes limitando-se à manutenção de redes sociais de forma reativa.
     Para avançar, é essencial começar com um diagnóstico da presença digital atual, construir um planejamento básico de conteúdo, identificar o público-alvo e iniciar a coleta de dados simples como engajamento e alcance.`,
  ],
  "20": [
    `Há uma presença digital inicial com alguma produção de conteúdo, mas sem consistência, calendário editorial ou direcionamento estratégico. As ações de marketing ainda não estão conectadas a metas de negócio e há ausência de ferramentas que sustentem o crescimento da área.
     O foco deve estar na criação de um plano editorial, definição de personas e escolha de canais prioritários. Também é recomendável implantar ferramentas simples de automação e iniciar a captura de leads com formulários ou landing pages.`,
  ],
  "30": [
    `O marketing começa a apresentar estrutura básica, com presença ativa em redes sociais, uso de identidade visual e produção de conteúdo periódica. No entanto, falta clareza nas metas, conexão com vendas e indicadores que comprovem resultados reais.
     É fundamental alinhar os objetivos do marketing com os da área comercial, iniciar campanhas de geração de leads e incorporar ferramentas de CRM ou automação que permitam acompanhar a jornada do cliente.`,
  ],
  "40": [
    `A área de marketing apresenta rotinas operacionais consolidadas e identidade visual definida, o que demonstra um nível inicial de estruturação. No entanto, ainda opera com baixa integração ao planejamento estratégico da empresa, o que compromete a previsibilidade de resultados e dificulta a geração de demanda de forma contínua e escalável.
A performance dos canais não é monitorada de maneira aprofundada, e há ausência de metas claras relacionadas a indicadores-chave, como CAC (Custo de Aquisição de Cliente), CPL (Custo por Lead) e taxa de conversão por etapa do funil.
`,
  ],
  "50": [
    `O marketing está em amadurecimento, com estratégias de conteúdo bem executadas, captação ativa de leads e início de integração com o time de vendas. Ainda existem desafios em medir o ROI das ações e em sustentar a cadência de campanhas.
     A área pode evoluir com automações mais robustas, uso de funis de nutrição, segmentações mais refinadas e adoção de ferramentas de análise como Google Analytics, RD Station ou Hubspot. A comunicação entre marketing e vendas precisa ser contínua.`,
  ],
  "60": [
    `A área apresenta estratégias consistentes de inbound marketing, uso ativo de ferramentas, campanhas recorrentes e dados confiáveis para análise. A captação de leads está estruturada, com integração parcial com vendas e indicadores monitorados.
     Para avançar, é importante intensificar a mensuração de resultados com dashboards estratégicos, realizar testes A/B em conteúdos e canais e construir jornadas personalizadas com base no comportamento dos leads.`,
  ],
  "70": [
    `O marketing atua de forma estratégica, com campanhas bem planejadas, dados integrados à área comercial e clareza nos indicadores de performance. A marca é fortalecida continuamente e os leads gerados têm boa qualidade.
     Os próximos passos incluem ampliar o uso de inteligência de mercado, utilizar ferramentas de automação avançada, investir em SEO técnico e reforçar a atuação omnichannel com consistência de marca em todos os pontos de contato.`,
  ],
  "80": [
    `A maturidade da área de marketing é elevada, com forte alinhamento com o time de vendas, campanhas orientadas por dados, análise profunda de comportamento do consumidor e foco em geração de valor.
     Neste estágio, é recomendável explorar estratégias de ABM (Account-Based Marketing), marketing de influência e marketing de performance em escala. A atuação passa a ser cada vez mais preditiva e direcionada por inteligência competitiva.`,
  ],
  "90": [
    `A operação de marketing é altamente estratégica, com domínio das métricas, integração total com CRM e vendas, uso de automações inteligentes e campanhas personalizadas por perfil. A marca tem posicionamento forte no mercado.
     O foco agora deve ser inovação contínua, exploração de novos formatos como vídeo interativo, inteligência artificial na jornada do cliente e participação ativa em eventos e comunidades para fortalecimento institucional.`,
  ],
  "100": [
    `A área de marketing opera em altíssimo nível, com atuação centrada em dados, experimentação contínua e geração de demanda previsível e escalável. O time domina toda a jornada do consumidor e atua como braço estratégico da liderança da empresa.
     A marca se consolida como referência no setor, e o marketing influencia diretamente o crescimento do negócio. A excelência é sustentada por cultura analítica, alinhamento total com vendas e foco constante em inovação.`,
  ],
};
export const conclusoesMarketing: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área de marketing está em estágio inicial, sem processos estruturados ou ferramentas eficazes. Falta direcionamento estratégico, o que limita a geração de resultados concretos. É fundamental iniciar a construção de bases sólidas, definindo objetivos claros e implementando práticas básicas de marketing.`,
  ],
  "20": [
    `O setor de marketing apresenta primeiros passos em organização, mas ainda carece de planejamento estratégico e ferramentas adequadas. As ações são reativas e pouco coordenadas, dificultando a geração consistente de demanda. É necessário estabelecer processos e métricas básicas para medir resultados.`,
  ],
  "30": [
    `Há esforços para estruturar a área, com algumas campanhas e ações pontuais, porém sem integração entre canais ou alinhamento com os objetivos da empresa. O uso limitado de ferramentas e a ausência de análise de dados restringem o potencial de crescimento.`,
  ],
  "40": [
    `A área de marketing apresenta processos mais definidos e a utilização inicial de ferramentas básicas para a gestão de campanhas. A geração de demanda está em desenvolvimento, contudo, persiste a necessidade de aprimorar a segmentação, a mensuração de resultados e o planejamento integrado para maior efetividade.`,
  ],
  "50": [
    `O marketing alcança maturidade intermediária, com campanhas mais estruturadas, definição inicial de personas e uso de métricas para acompanhamento. A operação começa a se alinhar com as metas da empresa, mas a escalabilidade e previsibilidade ainda podem ser aprimoradas.`,
  ],
  "60": [
    `Com processos consolidados e uso consistente de ferramentas, o setor monitora indicadores-chave e ajusta suas estratégias com base em dados. A área de marketing apoia o crescimento sustentável, mas deve avançar na automação e integração com vendas.`,
  ],
  "70": [
    `A área apresenta forte coordenação entre canais, uso avançado de ferramentas e análise estratégica das campanhas. Há alinhamento claro com a estratégia corporativa, gerando demanda qualificada e contribuindo para o crescimento previsto da empresa.`,
  ],
  "80": [
    `O marketing é altamente estruturado, com sistemas automatizados, segmentação precisa e análise em tempo real dos resultados. As estratégias são proativas e focadas na otimização contínua, garantindo escalabilidade e eficiência.`,
  ],
  "90": [
    `A área de marketing é referência, com práticas avançadas de planejamento, execução e mensuração. A equipe atua de forma consultiva, antecipando tendências e impulsionando a inovação. A geração de demanda é previsível e alinhada aos objetivos estratégicos.`,
  ],
  "100": [
    `A empresa possui um marketing maduro, totalmente integrado, orientado por dados e inovador. As campanhas são automatizadas e personalizadas, gerando crescimento sustentável e vantagem competitiva sólida no mercado. A área é um motor estratégico essencial para o sucesso contínuo do negócio.`,
  ],
};

export const introducoesRH: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área de Recursos Humanos está em estágio embrionário, com ausência de processos formais de recrutamento, integração, desenvolvimento e avaliação de desempenho. As contratações são feitas de forma reativa e sem critérios definidos.
     O primeiro passo é estruturar minimamente o processo de contratação, estabelecer descrições de cargos, criar um plano de ambientação para novos colaboradores e iniciar práticas simples de escuta como reuniões 1:1 e enquetes de clima.`,
  ],
  "20": [
    `Existem algumas iniciativas isoladas em RH, como contratações recorrentes e ações pontuais de integração ou desenvolvimento. No entanto, não há um planejamento claro nem políticas definidas, o que compromete a consistência das ações.
     Para evoluir, é necessário criar processos básicos de recrutamento e seleção, padronizar boas práticas de onboarding e implementar políticas claras de jornada de trabalho, benefícios e cultura organizacional.`,
  ],
  "30": [
    `O RH começa a ganhar forma, com processos básicos de contratação e ambientação, além de ações iniciais de comunicação interna. Apesar disso, ainda falta visão estratégica, métricas de clima organizacional e iniciativas contínuas de capacitação.
     É recomendado criar uma agenda de desenvolvimento (como trilhas de capacitação), instituir rituais de feedback e iniciar medições de clima e engajamento para acompanhar a evolução da cultura e da satisfação dos colaboradores.`,
  ],
  "40": [
    `A área de Recursos Humanos apresenta uma estrutura funcional consolidada, com políticas bem definidas nos processos de recrutamento, integração e gestão de benefícios. A comunicação interna demonstra sinais de evolução, embora ainda careça de mecanismos mais robustos de suporte à tomada de decisão e de acompanhamento sistemático de indicadores de performance e clima organizacional.
Para avançar em maturidade, recomenda-se a implementação de programas estruturados de desenvolvimento contínuo, além da criação de trilhas de carreira alinhadas aos objetivos estratégicos da empresa. A gestão de desempenho deve ser aprimorada por meio de ferramentas específicas e ciclos regulares de avaliação. Por fim, o fortalecimento da cultura organizacional exige ações recorrentes de reconhecimento, reforço dos valores institucionais e alinhamento entre lideranças e equipes.
`,
  ],
  "50": [
    `O RH já atua de forma integrada com a liderança, com rotinas bem estabelecidas e percepção positiva dos colaboradores. Existem iniciativas de treinamento, acompanhamento de clima e comunicação estruturada, mas a atuação ainda é mais operacional do que estratégica.
     O próximo passo é ampliar o uso de dados para tomada de decisão, investir em sistemas de gestão de pessoas (como ERPs ou plataformas de RH), reforçar o papel da liderança no desenvolvimento do time e estruturar políticas de retenção e sucessão.`,
  ],
  "60": [
    `A área de RH apresenta práticas consistentes, com foco em atração, desenvolvimento e retenção de talentos. Já existem dados para apoiar decisões, e a cultura organizacional está sendo consolidada por meio de rituais, comunicação e lideranças engajadas.
     Para evoluir, é importante automatizar processos operacionais, fortalecer programas de desenvolvimento de liderança, mapear competências críticas e alinhar constantemente a estratégia de pessoas aos objetivos de negócio.`,
  ],
  "70": [
    `O RH atua com protagonismo, contribuindo diretamente para o engajamento, a produtividade e a performance da equipe. Os processos de onboarding, avaliação e desenvolvimento estão bem estruturados, e há indicadores claros de clima e desempenho.
     O foco agora deve estar na criação de uma cultura de alta performance, programas estruturados de reconhecimento e incentivo, trilhas de desenvolvimento individualizadas e maior integração com outras áreas estratégicas da empresa.`,
  ],
  "80": [
    `A maturidade da área de RH é alta, com forte alinhamento entre cultura, estratégia e práticas de gestão de pessoas. A empresa atua com clareza em employer branding, liderança de alta performance, clima organizacional saudável e inovação em gestão de talentos.
     Para seguir evoluindo, o RH pode implementar People Analytics, programas de diversidade e inclusão, planos de sucessão formalizados e atuar de forma consultiva junto às demais lideranças, tornando-se uma referência interna em cultura e gestão.`,
  ],
  "90": [
    `A área de RH é estratégica, orientada por dados e impacta diretamente nos resultados do negócio. Há políticas robustas de desenvolvimento, programas de reconhecimento, cultura bem difundida e um ambiente de trabalho que favorece o alto desempenho.
     O próximo estágio envolve a consolidação de práticas de inovação em gestão de pessoas, uso avançado de tecnologia (como inteligência artificial em recrutamento), e uma abordagem preditiva para antecipar necessidades de capital humano.`,
  ],
  "100": [
    `O RH opera no mais alto nível de excelência, com forte influência estratégica na empresa, cultura organizacional enraizada e reconhecida, liderança inspiradora e práticas inovadoras em todas as dimensões da gestão de pessoas.
     A área contribui ativamente para o crescimento sustentável do negócio, com foco contínuo em inovação, desenvolvimento humano e fortalecimento da cultura. O RH é visto como um diferencial competitivo e uma referência no setor.`,
  ],
};
export const conclusoesRH: Record<MaturidadeNivel, string[]> = {
  "10": [
    `O RH atua principalmente em tarefas operacionais básicas, como recrutamento e cumprimento das obrigações legais, sem foco estratégico. A ausência de processos estruturados e indicadores dificulta a contribuição para o crescimento do negócio. É essencial iniciar a formalização de rotinas e estabelecer um ambiente organizacional básico.`,
  ],
  "20": [
    `A área de RH começa a organizar processos, mas ainda falta alinhamento com a estratégia da empresa e uso de dados para tomada de decisão. A comunicação interna é informal e os programas de desenvolvimento são inexistentes ou pontuais.`,
  ],
  "30": [
    `Há esforços para implementar práticas estruturadas de recrutamento e treinamento, mas a gestão por indicadores ainda é incipiente. A cultura organizacional começa a ser trabalhada, porém sem engajamento consistente dos colaboradores.`,
  ],
  "40": [
    `O RH apresenta processos estruturados, com destaque para a realização de avaliações de desempenho e ações voltadas à comunicação interna. No entanto, ainda há oportunidades de avanço na integração dessas iniciativas com os objetivos estratégicos da empresa.`,
  ],
  "50": [
    `A maturidade intermediária do RH permite que a área contribua para a retenção de talentos e desenvolvimento dos colaboradores. Indicadores básicos de performance são monitorados, e há esforços para fortalecer a cultura organizacional.`,
  ],
  "60": [
    `O RH demonstra maior maturidade, com práticas consolidadas de desenvolvimento, comunicação e gestão por indicadores. As decisões começam a ser orientadas por dados, e a área atua como parceira estratégica da liderança.`,
  ],
  "70": [
    `A área de RH possui forte alinhamento com a estratégia do negócio, utilizando análises avançadas para gestão de talentos e engajamento. A cultura organizacional é bem definida e comunicada, contribuindo para o crescimento sustentável da empresa.`,
  ],
  "80": [
    `O RH está altamente estruturado, com processos automatizados e gestão baseada em dados em tempo real. Programas de desenvolvimento são contínuos e alinhados com os objetivos estratégicos, fortalecendo o clima organizacional e a performance.`,
  ],
  "90": [
    `A gestão de pessoas é referência, com práticas avançadas e inovação constante. O RH atua de forma consultiva, antecipando necessidades e garantindo um ambiente propício para retenção e desenvolvimento de talentos.`,
  ],
  "100": [
    `O RH é estratégico e integrado a todas as áreas da empresa, utilizando inteligência de dados para maximizar o potencial humano. A cultura organizacional é um diferencial competitivo, e a área impulsiona a sustentabilidade e o crescimento contínuo do negócio.`,
  ],
};

export const introducoesOperacoes: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área operacional encontra-se em estágio inicial, com forte dependência da atuação direta da liderança e ausência de processos estruturados. Não há padronização nas rotinas, nem definição de indicadores de produtividade, controle de qualidade ou critérios para fornecedores.
     O primeiro passo é mapear os principais processos operacionais, padronizar tarefas recorrentes, definir fluxos básicos e estabelecer um controle mínimo de produtividade e qualidade.`,
  ],
  "20": [
    `As rotinas operacionais estão sendo executadas, mas de maneira informal e com pouca previsibilidade. A dependência de pessoas-chave é alta, o que compromete a escalabilidade e gera riscos operacionais.
     Para evoluir, é necessário implementar processos formais, documentar os fluxos operacionais, iniciar a definição de metas operacionais e estabelecer critérios básicos de avaliação de fornecedores e desempenho.`,
  ],
  "30": [
    `Há esforços para estruturar processos e organizar a operação, com a introdução de controles básicos e início da implementação de sistemas ou planilhas de apoio. Contudo, a gestão ainda é reativa, com poucos indicadores e falhas recorrentes.
     É indicado fortalecer a governança operacional, estabelecer KPIs para acompanhar produtividade e qualidade, e implementar controles mais consistentes para mitigar riscos operacionais e melhorar a execução.`,
  ],
  "40": [
    `A operação começa a apresentar mais organização, com fluxos definidos, início de monitoramento de produtividade e processos de compra e relacionamento com fornecedores mais estruturados.
     O foco agora deve ser consolidar uma cultura de melhoria contínua, revisar processos ineficientes, aprimorar o controle de qualidade e fortalecer a comunicação entre equipes operacionais e áreas estratégicas.`,
  ],
  "50": [
    `A área de Operações funciona de forma estável, com rotinas bem definidas e utilização de sistemas para controle de tarefas. Já existem critérios para fornecedores e uma gestão operacional baseada em dados começa a ganhar força.
     Para seguir avançando, é importante reforçar os indicadores de performance, criar metas claras por time/setor, padronizar processos críticos e implementar um sistema de governança com foco em eficiência e escalabilidade.`,
  ],
  "60": [
    `A gestão operacional é sólida, com processos bem estruturados, indicadores de desempenho sendo acompanhados e decisões baseadas em dados. Há uma boa integração entre as áreas e sinergia com fornecedores.
     A recomendação é investir em automações operacionais, ferramentas de BI para análise preditiva, rotinas de melhoria contínua e mecanismos de mitigação de riscos para tornar a operação mais resiliente e responsiva.`,
  ],
  "70": [
    `A área de Operações apresenta alto grau de eficiência na execução, com controles bem definidos de produtividade, qualidade e gestão da cadeia de fornecedores. A estrutura atual é adequada para sustentar o crescimento da empresa, e os processos de melhoria contínua demonstram maturidade e aplicação consistente.
Para avançar em direção a um modelo operacional mais robusto e escalável, recomenda-se a ampliação da digitalização dos processos, visando maior rastreabilidade, agilidade e integração entre áreas. A busca por certificações de qualidade, a adoção de metodologias ágeis para ciclos de melhoria e a consolidação do alinhamento entre indicadores operacionais e metas estratégicas contribuirão diretamente para elevar o nível de governança, controle e resiliência da operação.
`,
  ],
  "80": [
    `A maturidade operacional é elevada, com sistemas integrados, gestão por indicadores, automações implementadas e processos altamente padronizados. A empresa consegue garantir qualidade, previsibilidade e escala, mantendo um bom relacionamento com fornecedores e clientes.
     O foco agora pode ser em inovação operacional, uso de inteligência artificial ou machine learning para previsão de gargalos e aumento da capacidade adaptativa frente a mudanças do mercado.`,
  ],
  "90": [
    `A operação é estratégica, altamente eficiente e adaptável. A empresa atua com excelência em governança, qualidade e produtividade, utilizando tecnologia para antecipar demandas, gerenciar riscos e apoiar decisões.
     O próximo nível envolve fortalecer a resiliência operacional com modelos preditivos, estabelecer comitês de governança operacional, e tornar a operação uma vantagem competitiva sustentável.`,
  ],
  "100": [
    `A operação atinge o mais alto nível de excelência, sendo reconhecida como uma referência de eficiência, inovação e governança. Todos os processos estão digitalizados, integrados e continuamente aprimorados com base em dados e feedbacks.
     A área atua como um diferencial estratégico, capaz de suportar o crescimento escalável da empresa com alto padrão de qualidade, produtividade e adaptação ao mercado.`,
  ],
};
export const conclusoesOperacoes: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área operacional apresenta estruturas básicas, mas ainda carece de processos definidos e sistemas que suportem a operação. A ausência de indicadores e controles limita a capacidade de entrega e cria riscos para a continuidade do negócio. É fundamental iniciar a formalização dos processos e controles básicos.`,
  ],
  "20": [
    `Há algum nível de organização operacional, com fornecedores cadastrados e sistemas rudimentares, mas sem métricas claras para monitoramento de desempenho. A operação ainda é reativa e pouco previsível, comprometendo a escalabilidade.`,
  ],
  "30": [
    `Processos operacionais começam a ser padronizados, e existe um esforço inicial para documentar rotinas. Contudo, o controle de qualidade e os indicadores ainda são incipientes, o que dificulta a identificação de melhorias.`,
  ],
  "40": [
    `A operação conta com sistemas integrados e liderança ativa, além de alguma estruturação na gestão de fornecedores. Ainda assim, faltam dashboards e ferramentas para acompanhar produtividade e qualidade em tempo real.`,
  ],
  "50": [
    `O nível intermediário permite um controle melhor dos processos e fornecedores, com indicadores básicos sendo monitorados. A operação começa a ser orientada por dados, mas ainda há oportunidades de otimização e automação.`,
  ],
  "60": [
    `A área operacional apresenta maior maturidade, com processos documentados, controle de qualidade implementado e monitoramento consistente por meio de indicadores. A gestão é proativa e busca a melhoria contínua.`,
  ],
  "70": [
    `A operação demonstra alinhamento consistente com a estratégia da empresa, utilizando dashboards em tempo real e análises avançadas para monitorar produtividade, qualidade e desempenho. A estrutura atual oferece suporte sólido para o crescimento sustentável e escalável do negócio.`,
  ],
  "80": [
    `A operação é altamente eficiente, com processos automatizados, indicadores estratégicos e controle rigoroso de qualidade. A gestão de fornecedores é integrada e contribui para a competitividade da empresa.`,
  ],
  "90": [
    `A área operacional é referência em melhores práticas, inovação e uso de tecnologia. A operação é ágil, flexível e orientada a resultados, apoiando a expansão e adaptação rápida às mudanças do mercado.`,
  ],
  "100": [
    `A operação é um diferencial competitivo, com excelência em todos os processos, sistemas avançados e inteligência operacional. A área impulsiona o crescimento sustentável, a inovação contínua e a liderança no setor.`,
  ],
};

export const introducoesTecnologia: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A maturidade tecnológica da empresa está em estágio inicial, com infraestrutura básica e pouca ou nenhuma automação dos processos. Os sistemas são isolados, há dependência de soluções manuais e o uso de dados para tomada de decisão é quase inexistente.
     É urgente investir em digitalização dos processos, implementar ferramentas básicas de comunicação e criar uma cultura inicial de inovação tecnológica para suportar o crescimento futuro.`,
  ],
  "20": [
    `A empresa começa a adotar algumas ferramentas digitais e conta com infraestrutura mínima para suportar operações, mas ainda falta integração entre sistemas e automação consistente.
     Os processos ainda são dependentes de intervenções manuais, e o uso estratégico de dados é limitado. A recomendação é avançar na integração dos sistemas, promover treinamentos para adoção tecnológica e iniciar projetos piloto de automação.`,
  ],
  "30": [
    `Há avanços na adoção de tecnologias para comunicação e gestão, com algumas áreas utilizando ferramentas digitais e sistemas isolados funcionando razoavelmente.
     Porém, a falta de integração plena e a baixa automação ainda limitam a eficiência operacional e a capacidade analítica. É necessário planejar a digitalização de processos críticos e ampliar o uso de dados para decisões.`,
  ],
  "40": [
    `A infraestrutura tecnológica está mais consolidada, com ferramentas de colaboração implantadas e início de integração entre sistemas principais.
     A empresa já reconhece a importância da automação e do uso de dados, mas ainda enfrenta desafios na implementação completa e na uniformização dos processos tecnológicos.
     Recomenda-se fortalecer projetos de integração, investir em capacitação técnica e desenvolver indicadores para monitorar o desempenho tecnológico.`,
  ],
  "50": [
    `A empresa apresenta uma maturidade tecnológica em estágio intermediário, com infraestrutura adequada, sistemas integrados em áreas estratégicas e processos parcialmente automatizados. Há indícios consistentes de uma cultura voltada à inovação, bem como o início do uso de dados para análise e apoio à tomada de decisão, embora essa prática ainda não esteja plenamente difundida entre as áreas.
A evolução do pilar tecnológico deve focar na ampliação da automação de processos, na consolidação de uma governança de TI estruturada e na adoção de ferramentas avançadas voltadas à análise preditiva e à segurança da informação. Esses avanços permitirão maior eficiência operacional, escalabilidade e mitigação de riscos cibernéticos.`,
  ],
  "60": [
    `A empresa possui infraestrutura robusta, sistemas integrados e processos automatizados em diversas áreas, suportando uma operação eficiente e colaborativa.
     O uso de dados para tomada de decisão está consolidado em vários níveis, e há iniciativas em andamento para inovação tecnológica.
     Para avançar, recomenda-se investir em inteligência artificial, automação avançada e fortalecer a governança de dados e cibersegurança.`,
  ],
  "70": [
    `A maturidade tecnológica é alta, com integração plena de sistemas, automação avançada e cultura digital fortemente enraizada.
     A empresa utiliza dados de forma estratégica para otimização de processos e inovação, além de manter uma infraestrutura segura e escalável.
     O foco agora deve ser a implementação de tecnologias emergentes, como machine learning e análise preditiva, para manter a competitividade e agilidade.`,
  ],
  "80": [
    `A tecnologia é um dos pilares da empresa, com operação digitalizada, processos automatizados e inovação contínua.
     A empresa atua de forma proativa na adoção de novas tecnologias, utiliza inteligência artificial e big data para suporte às decisões estratégicas e mantém alta segurança da informação.
     O desafio é continuar a evolução tecnológica, explorando parcerias, novas ferramentas e promovendo a transformação digital em toda a cadeia de valor.`,
  ],
  "90": [
    `A maturidade tecnológica da empresa é exemplar, com sistemas integrados em tempo real, automação avançada e uso extensivo de análise preditiva e inteligência artificial.
     A governança de TI é rigorosa, e a cultura de inovação é disseminada em todos os níveis da organização.
     O próximo passo é liderar iniciativas de tecnologia disruptiva, influenciando o mercado e ampliando o ecossistema digital da empresa.`,
  ],
  "100": [
    `A empresa atinge a excelência tecnológica, sendo referência em inovação, automação e governança digital.
     Todos os processos estão digitalizados e integrados, com uso avançado de inteligência artificial, machine learning e análise de dados para tomada de decisão em tempo real.
     A tecnologia é um diferencial competitivo estratégico, sustentando o crescimento sustentável e a transformação contínua do negócio.`,
  ],
};
export const conclusoesTecnologia: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área de tecnologia está em estágio inicial, com infraestrutura básica e pouca formalização de processos. A comunicação interna é limitada e não há uso de ferramentas que tragam ganho de eficiência. É essencial investir em fundamentos tecnológicos e padronização.`,
  ],
  "20": [
    `Há alguns avanços na infraestrutura e comunicação, mas a automação de processos é praticamente inexistente. Os sistemas são isolados e a cultura de inovação ainda é incipiente.`,
  ],
  "30": [
    `A empresa começa a implementar soluções para melhorar a integração dos sistemas e a comunicação interna, embora ainda faltem ferramentas para monitoramento e automação.`,
  ],
  "40": [
    `A área de tecnologia conta com infraestrutura mais robusta e iniciativas iniciais de automação. A cultura de inovação está em desenvolvimento, mas a falta de dashboards e análises limita a tomada de decisões proativas.`,
  ],
  "50": [
    `O nível intermediário reflete uma área de tecnologia mais estruturada, com integração básica entre sistemas e utilização moderada de automações. Apesar dos avanços, ainda existem oportunidades relevantes para ampliar o uso de inteligência artificial, fortalecer a análise de dados e consolidar uma governança digital que contribua de forma mais estratégica para a escalabilidade do negócio.`,
  ],
  "60": [
    `Tecnologia está bem organizada, com processos definidos, automações implementadas e monitoramento regular via dashboards. A cultura de inovação começa a influenciar outras áreas do negócio.`,
  ],
  "70": [
    `A área é reconhecida pelo uso estratégico da tecnologia, com integração avançada de sistemas, dashboards em tempo real e iniciativas de inovação que suportam a estratégia da empresa.`,
  ],
  "80": [
    `A tecnologia é um motor de crescimento, com automações avançadas, uso de inteligência artificial e sistemas altamente integrados que promovem eficiência operacional e agilidade.`,
  ],
  "90": [
    `A área de tecnologia é referência no mercado, com inovação contínua, uso estratégico de dados e IA para antecipar tendências e suportar decisões estratégicas.`,
  ],
  "100": [
    `Tecnologia é um pilar fundamental da empresa, com infraestrutura de ponta, automações inteligentes e integração total entre sistemas. A área lidera a transformação digital, impulsionando a escalabilidade e a competitividade sustentável.`,
  ],
};

export const introducoesFinanceiro: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área financeira encontra-se em estágio inicial de desenvolvimento, com ausência de controles estruturados e processos padronizados. Não há planejamento orçamentário definido, tampouco mecanismos de acompanhamento sistemático das entradas e saídas de recursos. Essa falta de organização representa um alto risco para a sustentabilidade financeira do negócio, comprometendo decisões estratégicas e operacionais. É fundamental iniciar a estruturação de um fluxo de caixa, adotar controles básicos e implementar rotinas financeiras essenciais.`,
  ],
  "20": [
    `O setor financeiro apresenta sinais iniciais de organização, com registros básicos de despesas e receitas. No entanto, ainda é perceptível a ausência de indicadores financeiros claros, controle de inadimplência e projeções de caixa. A tomada de decisão continua sendo baseada em dados fragmentados e pouco confiáveis. Para avançar, é necessário investir em ferramentas simples de controle, definir um orçamento anual e monitorar periodicamente o desempenho financeiro.`,
  ],
  "30": [
    `A empresa demonstra um esforço consistente em organizar a área financeira. Já existem planilhas ou sistemas rudimentares que possibilitam algum controle sobre as finanças, embora de forma limitada. Ainda há pouca integração entre setores e baixa previsibilidade dos recursos. O próximo passo é consolidar a estrutura de planejamento financeiro, acompanhar o orçamento com mais rigor e começar a desenvolver análises mensais para guiar decisões estratégicas.`,
  ],
  "40": [
    `Neste estágio, a área financeira possui rotinas estabelecidas, com controle de contas a pagar e a receber, além de um orçamento que começa a ser utilizado como ferramenta de gestão. Ainda assim, a análise de rentabilidade e a projeção de cenários permanecem superficiais. A evolução passa pela padronização de processos, maior detalhamento dos custos e ampliação da capacidade analítica para fundamentar decisões mais assertivas.`,
  ],
  "50": [
    `A maturidade financeira atinge um nível intermediário, com uma gestão mais disciplinada do fluxo de caixa, controle de custos e algum acompanhamento de indicadores-chave. Apesar disso, ainda faltam estratégias mais robustas de planejamento e ações preditivas. O fortalecimento desta área passa pela implementação de controles automatizados, revisão constante de metas financeiras e maior integração com os objetivos estratégicos da empresa.`,
  ],
  "60": [
    `A gestão financeira mostra-se estruturada, com processos claros e monitoramento regular de indicadores como lucratividade, margem de contribuição e ponto de equilíbrio. O planejamento orçamentário já é praticado com consistência. No entanto, o uso de dados históricos para modelagem de cenários ainda pode ser aprimorado. É recomendável aprofundar as análises financeiras e desenvolver mecanismos para avaliar riscos e oportunidades com mais precisão.`,
  ],
  "70": [
    `O setor financeiro apresenta um nível consistente de maturidade, com controles bem estruturados, indicadores estratégicos definidos e análises periódicas que subsidiam a tomada de decisão da alta gestão. Observa-se um ambiente de transparência nos dados financeiros e uma atuação orientada à sustentabilidade econômica do negócio.
Para avançar, recomenda-se o aprimoramento dos sistemas de controle e a adoção de práticas de inteligência financeira. A integração do financeiro será fundamental para sustentar o crescimento e garantir maior assertividade nas decisões corporativas.
`,
  ],
  "80": [
    `A área financeira é altamente organizada, utilizando sistemas de gestão para controle orçamentário, fluxo de caixa, análise de resultados e projeção de cenários. As decisões são baseadas em dados confiáveis e em tempo real. Existe um alinhamento entre os objetivos financeiros e as metas estratégicas. O desafio agora é evoluir para uma abordagem preditiva, com foco na otimização de recursos e maximização de resultados.`,
  ],
  "90": [
    `A gestão financeira da empresa é referência, com práticas avançadas de planejamento, controle e análise. Indicadores são utilizados de forma inteligente para avaliar o desempenho e direcionar os investimentos. A área atua de forma consultiva, contribuindo diretamente para a estratégia empresarial. O ambiente financeiro é robusto, mas a busca contínua pela inovação e eficiência ainda pode render ganhos expressivos.`,
  ],
  "100": [
    `O setor financeiro opera com excelência, sendo altamente estratégico, analítico e orientado a resultados. Todos os processos são integrados, automatizados e baseados em dados preditivos. A empresa domina a arte da gestão financeira, com total clareza sobre sua saúde econômica, viabilidade de projetos e capacidade de expansão. Trata-se de uma estrutura madura, que garante segurança, competitividade e inteligência para o negócio prosperar no longo prazo.`,
  ],
};
export const conclusoesFinanceiro: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área financeira encontra-se em estágio inicial, com ausência de controles estruturados e processos padronizados. A falta de planejamento e monitoramento sistemático dos recursos compromete a sustentabilidade do negócio. É crucial iniciar a organização financeira com controles básicos e rotinas essenciais.`,
  ],
  "20": [
    `Há sinais iniciais de organização financeira, com registros básicos de receitas e despesas, mas ainda faltam indicadores claros e projeções confiáveis. A tomada de decisão depende de dados fragmentados. É necessário implementar ferramentas simples de controle e um orçamento anual.`,
  ],
  "30": [
    `A empresa está consolidando a estrutura financeira, com uso de planilhas ou sistemas rudimentares para controle. Contudo, ainda há baixa integração entre áreas e pouca previsibilidade. O próximo passo é rigor no acompanhamento orçamentário e análises mensais para suportar decisões estratégicas.`,
  ],
  "40": [
    `A área financeira possui rotinas estabelecidas, controle de contas a pagar e a receber, e orçamento utilizado como ferramenta gerencial. Entretanto, análises de rentabilidade e projeção de cenários ainda são superficiais. É preciso padronizar processos e ampliar a capacidade analítica.`,
  ],
  "50": [
    `A maturidade financeira é intermediária, com gestão disciplinada do fluxo de caixa e controle de custos. Falta, porém, maior sofisticação em planejamento e ações preditivas. O fortalecimento passa pela automação de controles e maior alinhamento com metas estratégicas.`,
  ],
  "60": [
    `A gestão financeira está estruturada, com monitoramento regular de indicadores-chave e planejamento consistente. O uso de dados históricos para modelagem de cenários pode ser aprofundado para melhorar a avaliação de riscos e oportunidades.`,
  ],
  "70": [
    `O setor financeiro atua com base em indicadores estratégicos e análises periódicas, contribuindo de forma consistente para a tomada de decisão da alta gestão, com foco na transparência e na sustentabilidade do negócio. Para avançar, é necessário aprimorar os sistemas de controle e fortalecer a integração da inteligência financeira com as demais áreas, ampliando a visão integrada e o suporte ao crescimento planejado.`,
  ],
  "80": [
    `A área financeira é altamente organizada, com sistemas para controle orçamentário, fluxo de caixa e projeção de cenários. Decisões são baseadas em dados confiáveis e alinhadas às metas estratégicas. O foco agora é evoluir para uma abordagem preditiva e otimização de recursos.`,
  ],
  "90": [
    `A gestão financeira é referência, utilizando práticas avançadas para análise e planejamento. A área atua de forma consultiva, contribuindo diretamente para a estratégia empresarial e buscando inovação contínua para ganhos expressivos.`,
  ],
  "100": [
    `O setor financeiro opera com excelência, sendo altamente estratégico, analítico e orientado a resultados. Processos são integrados e automatizados, baseados em dados preditivos que garantem segurança, competitividade e inteligência para o crescimento sustentável.`,
  ],
};

export const consideracoesFinais = {
  "10": `Neste momento, a organização encontra-se em um estágio inicial de maturidade empresarial, com diversos aspectos fundamentais ainda por serem estruturados. A ausência de políticas, processos, controles e práticas consolidadas revela a necessidade urgente de uma ação coordenada e estratégica.
   O cenário atual exige um reposicionamento institucional que priorize a criação de uma cultura organizacional baseada na clareza de papéis, objetivos bem definidos, governança estruturada e comprometimento das lideranças.
A recomendação imediata é a implementação de um plano de ação de curto prazo, focado na formalização mínima de processos, capacitação das lideranças e definição de indicadores-chave de desempenho. Ao mesmo tempo, é essencial a contratação ou capacitação de talentos que possam conduzir esse processo de estruturação com competência. Esta fase é sensível, porém estratégica, pois define a base sobre a qual a empresa poderá sustentar seu crescimento futuro.`,

  "20": `A empresa demonstra estar saindo da zona de total informalidade, com pequenas iniciativas voltadas à organização e melhoria de suas operações. No entanto, ainda prevalece uma gestão reativa, com ações pontuais que carecem de alinhamento estratégico e continuidade.
   A cultura organizacional, quando existente, ainda é frágil e altamente dependente de pessoas-chave, o que representa um risco relevante para a sustentabilidade do negócio.
Neste contexto, é fundamental adotar uma postura mais estruturada, com o desenvolvimento de políticas organizacionais, o mapeamento e padronização dos processos críticos e o início da definição de metas e responsabilidades. Além disso, recomenda-se a criação de rituais de gestão e fóruns de alinhamento entre as áreas. Esta etapa marca a transição entre o “apagar incêndios” e o início da construção de um modelo de gestão intencional.`,

  "30": `Percebe-se que a organização já reconhece a importância de estabelecer processos e indicadores, embora ainda enfrente dificuldades significativas na sua execução e padronização.
   A maturidade está em fase embrionária, mas há sinais de intenção estratégica e iniciativas esporádicas de melhoria. Ainda assim, a governança é incipiente e a comunicação interna carece de fluidez, o que prejudica o engajamento das equipes e a sinergia entre os setores.
Para avançar, é imperativo institucionalizar práticas de gestão, treinar lideranças para a condução de equipes de forma mais orientada a resultados e investir na sistematização de controles e rotinas. A organização encontra-se num ponto em que decisões assertivas podem acelerar exponencialmente sua evolução. É recomendável priorizar o desenvolvimento de uma visão de longo prazo, bem como ferramentas de acompanhamento da execução estratégica.`,

  "40": `A empresa já apresenta uma base mínima de gestão, com processos estruturados em algumas áreas e um esforço visível de padronização. Contudo, essa base ainda é frágil e desuniforme entre os setores. O planejamento estratégico pode até existir, mas carece de desdobramento e acompanhamento efetivo.
   É comum a existência de bons projetos que não se sustentam pela falta de governança e disciplina gerencial.
Neste estágio, a recomendação é fortalecer os mecanismos de monitoramento de desempenho, ampliar a cultura de dados e aprimorar a liderança em todos os níveis. A empresa precisa consolidar o que já foi construído e promover uma cultura de melhoria contínua. É um momento crítico de inflexão, em que a organização deve optar entre se acomodar em um nível básico de eficiência ou avançar rumo a uma performance sólida e sustentável.`,

  "50": `A organização encontra-se em estágio intermediário de maturidade, apresentando avanços relevantes em estrutura, governança e controle. 
Contudo, essa maturidade ainda não é homogênea entre todas as áreas. Observa-se uma base operacional consolidada, mas com lacunas importantes na padronização, no acompanhamento sistemático de indicadores e na integração entre departamentos. Embora exista clareza sobre os objetivos estratégicos, há desafios significativos na manutenção da cadência de execução e na consolidação de uma cultura de melhoria contínua.
O foco para os próximos ciclos deve estar em institucionalizar as boas práticas já existentes, convertendo-as em políticas organizacionais formais. O desenvolvimento das lideranças será determinante, não apenas para garantir a operação, mas também para promover alinhamento estratégico, engajamento e excelência na entrega. Investimentos em tecnologia, inovação e cultura organizacional são recomendados como pilares estruturantes para o próximo estágio de maturidade.
`,

  "60": `A empresa atingiu um estágio de amadurecimento importante, caracterizado por uma gestão consciente, processos bem definidos e a existência de uma cultura voltada para resultados. Entretanto, os avanços ainda não foram plenamente internalizados. Existem boas ferramentas e metodologias, mas sua aplicação nem sempre é uniforme ou bem compreendida pelas equipes.
Neste cenário, é essencial consolidar os avanços por meio da padronização de práticas, do fortalecimento da comunicação institucional e da criação de uma mentalidade orientada à excelência.
 A maturidade já permite que a organização se projete de maneira mais assertiva no mercado, mas requer vigilância contínua para que não haja regressão. O próximo passo envolve promover uma governança robusta, baseada em meritocracia, inovação e inteligência organizacional.

`,

  "70": `A maturidade empresarial aqui identificada demonstra que a organização está em rota de excelência, com processos integrados, equipes bem alinhadas e um modelo de gestão consolidado em diversos aspectos. Existe uma clareza estratégica e uma cultura de responsabilidade que sustenta as operações. Contudo, ainda há desafios relacionados à agilidade na tomada de decisão e à gestão de mudanças em um ambiente dinâmico.
É hora de transformar essa maturidade em diferencial competitivo. A recomendação é focar na geração de valor, promovendo inovação contínua, atualização tecnológica e estratégias de encantamento do cliente. A organização já não está mais aprendendo a gerir: agora deve se reinventar constantemente. 
Consolidar um modelo de excelência requer atenção constante à cultura organizacional, à formação de lideranças e à busca pela alta performance.`,

  "80": `A empresa demonstra elevada maturidade gerencial, com padrões sólidos de governança, indicadores consistentes e uma cultura orientada a resultados. A estratégia está bem definida e as lideranças atuam de forma proativa. Há fluidez entre planejamento e execução, o que permite uma visão sistêmica do negócio e capacidade de adaptação em tempo real.
A recomendação neste estágio é aprofundar a cultura de inovação, reforçar a excelência operacional e preparar sucessores para manter a sustentabilidade dos resultados. O momento é propício para investir em inteligência de mercado, ESG (ambiental, social e governança) e políticas de desenvolvimento humano. 
É uma fase de refino, em que o foco se volta à diferenciação competitiva e à longevidade institucional.`,

  "90": `A organização atua em um patamar elevado de excelência, com processos maduros, cultura de aprendizado contínuo e uma liderança que não apenas executa, mas inspira. Os pilares de sustentabilidade, inovação e desempenho estão bem estabelecidos, e a gestão é orientada por dados, com base em métricas claras e objetivos compartilhados.
Neste nível, recomenda-se intensificar a atuação em cenários complexos, liderando transformações no setor e influenciando o ecossistema em que está inserida. A governança deve evoluir para um modelo de gestão de valor compartilhado, integrando stakeholders, comunidades e meio ambiente. 
O desafio passa a ser manter a relevância, promovendo inovação disruptiva e excelência em todos os aspectos do negócio.`,

  "100": `A empresa atingiu um grau de maturidade exemplar, digna de benchmarking em seu setor. A gestão é estratégica, os processos são continuamente otimizados, e a cultura organizacional está profundamente enraizada em princípios de excelência, ética, inovação e colaboração. 
   A alta performance é constante e mensurável, refletindo uma visão clara de propósito e impacto.
Neste patamar, o papel da organização transcende a eficiência interna: trata-se de liderar transformações no mercado, gerar valor social e ambiental, e formar novos líderes que perpetuem a filosofia de excelência. A recomendação é fortalecer os laços institucionais, ampliar a presença global e tornar-se um agente catalisador de desenvolvimento em sua cadeia de valor. O futuro, aqui, é construído com protagonismo e responsabilidade.`,
};
