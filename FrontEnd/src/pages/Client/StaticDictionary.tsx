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
    `A estrutura organizacional encontra-se em estágio embrionário, com ausência quase total de práticas formais de gestão. Processos são inexistentes ou improvisados, decisões seguem uma lógica reativa e não há definição clara de papéis, metas ou rotinas.
O ambiente é marcado por informalidade, fluxos operacionais inconsistentes e comunicação interna desarticulada. A inexistência de registros ou indicadores impossibilita qualquer análise crítica de desempenho.
Neste cenário, a prioridade é estabelecer os fundamentos da gestão: delimitação de responsabilidades, criação de organogramas funcionais, implantação de rotinas mínimas e adoção de ferramentas básicas de controle. Essa fundação será essencial para garantir segurança e viabilidade nos próximos ciclos de crescimento.`,
  ],
  "20": [
    `Neste estágio, a empresa inicia movimentos pontuais de organização, mas ainda opera com forte informalidade. Processos são incipientes, pouco padronizados e dependem diretamente de indivíduos-chave, o que limita escalabilidade e continuidade.
A ausência de diretrizes estratégicas impede o alinhamento entre as ações do dia a dia e os objetivos maiores da organização. Além disso, faltam mecanismos que permitam a análise de gargalos e a identificação de oportunidades.
A orientação, nesse momento, é construir a base mínima da gestão: mapear fluxos essenciais, documentar rotinas críticas, iniciar práticas simples de análise de dados e promover capacitações operacionais. Essa estrutura inicial permitirá previsibilidade e direcionamento estratégico.`,
  ],
  "30": [
    `A organização já manifesta intenção de estruturação, com áreas pontuais operando sob fluxos rudimentares. No entanto, prevalecem a baixa padronização, a dependência do conhecimento tácito e a inexistência de indicadores confiáveis.
A ausência de rituais gerenciais, metas claras e acompanhamento sistemático compromete a previsibilidade dos resultados, especialmente nas frentes comercial e de marketing.
A recomendação é investir na formalização de rotinas, integração entre áreas e implantação de um modelo inicial de gestão por resultados. A digitalização de processos-chave e o uso de ferramentas simples de controle serão decisivos para consolidar a operação e elevar a eficiência.`,
  ],
  "40": [
    `A empresa demonstra avanços na estruturação organizacional, com algumas práticas já implantadas e maior consciência sobre a necessidade de organização. Ainda assim, os processos apresentam variações significativas entre áreas, e o alinhamento estratégico é parcial.
As ações de marketing e vendas não seguem uma cadência clara, e os indicadores de desempenho ainda não são explorados de forma consistente.
O momento exige reforço na integração entre áreas, implementação de ferramentas de CRM e planejamento, além da institucionalização de metas e mecanismos de acompanhamento. Consolidar rituais gerenciais e padronizar práticas são passos fundamentais para reduzir a variabilidade e sustentar o crescimento.`,
  ],
  "50": [
    `A empresa apresenta avanços consistentes em sua jornada de estruturação, com áreas operando em diferentes níveis de maturidade. Algumas práticas de gestão já estão implementadas, indicando movimentos iniciais em direção à organização e ao planejamento estruturado, embora ainda existam limitações.
As iniciativas comerciais e de marketing evidenciam uma transição para uma abordagem mais estratégica, mas ainda carecem de alinhamento sistêmico, uso efetivo de indicadores e processos baseados em dados consistentes.
O cenário atual aponta para uma organização com condições favoráveis à evolução para um novo estágio de maturidade, com foco na profissionalização da gestão, digitalização de processos e consolidação de uma cultura orientada à análise crítica e tomada de decisão baseada em evidências.
Para viabilizar um crescimento sustentável e escalável, será fundamental avançar na criação de indicadores estratégicos, no estabelecimento de rotinas de acompanhamento e no investimento em tecnologias de suporte à gestão.`,
  ],
  "60": [
    `Neste nível, a empresa opera com maior previsibilidade e gestão consciente, contando com processos estabelecidos e algum nível de padronização. Há planejamento em diferentes frentes, e decisões começam a se apoiar em dados e indicadores.
Apesar dos avanços, ainda existem lacunas em governança, integração entre áreas e uniformidade na execução das metodologias.
O foco deve estar na institucionalização das práticas, fortalecimento dos rituais de liderança, expansão do uso de ferramentas estratégicas (como BI e OKRs) e profissionalização do time. O momento é oportuno para solidificar a inteligência operacional e avançar rumo à alta performance.`,
  ],
  "70": [
    `A empresa se posiciona em um estágio robusto de gestão, com processos consolidados, indicadores monitorados e cultura de melhoria contínua em desenvolvimento. As decisões são cada vez mais orientadas por dados, e a visão estratégica já está disseminada nas lideranças.
Ainda assim, persistem oportunidades em áreas como automação, antecipação de tendências e integração tecnológica.
A evolução natural neste estágio passa pela capacitação das lideranças intermediárias, fortalecimento da cultura orientada a resultados e implementação de mecanismos preditivos para suportar a tomada de decisão em contextos complexos.`,
  ],
  "80": [
    `A maturidade organizacional é elevada. A empresa atua com processos integrados, forte orientação a dados e liderança proativa. Há clareza estratégica, disciplina de execução e capacidade de adaptação rápida às mudanças do ambiente.
Neste estágio, o desafio passa a ser a inovação contínua, a construção de um ecossistema de dados e o aprimoramento da experiência do cliente.
O plano de ação deve priorizar a governança, os investimentos em tecnologia avançada e o fortalecimento das lideranças estratégicas. A organização encontra-se preparada para se tornar referência de excelência e inovação no mercado.`,
  ],
  "90": [
    `A análise revela uma organização altamente madura, com cultura sólida, processos bem integrados e uso avançado de tecnologia para suportar decisões em tempo real. A liderança atua de forma estratégica e o foco em melhoria contínua está disseminado.
O desafio atual é escalar práticas de excelência, promover inovação disruptiva e fortalecer a cultura de valor compartilhado com stakeholders e comunidades.
Neste estágio, a empresa assume papel de liderança no seu setor e está em posição privilegiada para impulsionar o crescimento sustentável com impacto ampliado no ecossistema.`,
  ],
  "100": [
    `A organização atinge o mais alto grau de excelência, com performance operacional exemplar, cultura estratégica consolidada e protagonismo na geração de valor. Todas as áreas operam em sinergia, com inovação, inteligência de mercado e visão global como pilares.
A tecnologia está plenamente integrada ao dia a dia, e as decisões são guiadas por dados e cenários estratégicos.
Neste nível, o foco está na ampliação da presença institucional, parcerias globais, legado organizacional e transformação setorial. A empresa está preparada para inspirar o mercado e influenciar positivamente seu ecossistema com liderança e responsabilidade.`,
  ],
};
export const consideracoesFinais: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A organização encontra-se em um ponto crítico de desenvolvimento, com estruturas inexistentes ou altamente fragilizadas. Falta clareza nos papéis, processos e objetivos, e o modelo atual está centrado em decisões reativas e improvisadas.
Para iniciar sua jornada de crescimento, será essencial estabelecer os fundamentos mínimos da gestão: definição de responsabilidades, construção de fluxos operacionais básicos, criação de mecanismos de controle e início da cultura de acompanhamento.
A recomendação prioritária é a elaboração de um plano de ação de curto prazo, com foco na estruturação organizacional e na capacitação das lideranças. Esta etapa é estratégica, pois define a base sobre a qual todo o avanço futuro dependerá.`,
  ],
  "20": [
    `A empresa demonstra disposição para sair da informalidade, mas ainda enfrenta um cenário marcado por baixa padronização, ausência de governança e forte dependência de pessoas-chave.
Embora haja sinais de organização, a falta de diretrizes estratégicas, indicadores e rituais de gestão limita a continuidade das iniciativas.
Neste contexto, o foco deve estar na formalização de processos críticos, definição de metas, criação de fóruns de alinhamento e institucionalização de práticas gerenciais. A transição de uma lógica operacional reativa para uma gestão estruturada deve ser conduzida com disciplina e intenção estratégica.`,
  ],
  "30": [
    `A maturidade começa a emergir com maior clareza, ainda que de forma irregular. Há iniciativas esporádicas de melhoria e uma visão mais consciente da importância da gestão, mas a execução carece de padronização e persistência.
A governança ainda é incipiente, e os processos decisórios são pouco orientados por dados.
É recomendável concentrar esforços na capacitação das lideranças, estruturação dos principais fluxos e na sistematização dos controles e indicadores. A clareza sobre a direção estratégica, aliada à disciplina de execução, poderá acelerar o amadurecimento organizacional de forma consistente.`,
  ],
  "40": [
    `O cenário revela avanços relevantes, mas ainda marcados por instabilidade e falta de uniformidade. A empresa já dispõe de uma base de gestão mínima e demonstra intenção de evoluir, embora enfrente dificuldades na sustentação de boas práticas.
O desdobramento do planejamento estratégico ainda é frágil, e há riscos de estagnação caso a governança não seja reforçada.
A recomendação é consolidar as estruturas existentes, ampliar a cultura orientada a dados e fortalecer o papel das lideranças na condução das equipes. Este é um ponto de inflexão: a empresa pode se manter em um patamar intermediário ou avançar de forma estruturada rumo à excelência.`,
  ],
  "50": [
    `A organização encontra-se em estágio intermediário de maturidade, apresentando avanços relevantes em estrutura, governança e controle. 
Contudo, essa maturidade ainda não é homogênea entre todas as áreas. Observa-se uma base operacional consolidada, mas com lacunas importantes na padronização, no acompanhamento sistemático de indicadores e na integração entre departamentos. Embora exista clareza sobre os objetivos estratégicos, há desafios significativos na manutenção da cadência de execução e na consolidação de uma cultura de melhoria contínua.
O foco para os próximos ciclos deve estar em institucionalizar as boas práticas já existentes, convertendo-as em políticas organizacionais formais. O desenvolvimento das lideranças será determinante, não apenas para garantir a operação, mas também para promover alinhamento estratégico, engajamento e excelência na entrega. Investimentos em tecnologia, inovação e cultura organizacional são recomendados como pilares estruturantes para o próximo estágio de maturidade.`,
  ],
  "60": [
    `A empresa alcançou um nível relevante de maturidade, com processos definidos, estrutura de gestão estabelecida e ambiente propício à geração de resultados. No entanto, nem todas as áreas internalizaram plenamente as boas práticas, o que limita o desempenho potencial.
É necessário consolidar os avanços por meio da padronização, reforço na comunicação institucional e criação de uma cultura voltada à excelência.
A organização já se projeta de forma mais estratégica no mercado e deve, agora, reforçar sua governança, investir em inovação e ampliar o uso de inteligência organizacional para manter sua trajetória de crescimento sustentável.`,
  ],
  "70": [
    `A organização opera com alto nível de maturidade, demonstrando consistência na execução, clareza estratégica e forte alinhamento entre as equipes.
Contudo, os desafios passam a envolver a velocidade na tomada de decisão, gestão da mudança e atualização constante em um ambiente competitivo e dinâmico.
Neste momento, a empresa deve transformar sua maturidade em diferencial competitivo. A recomendação é aprofundar a cultura de inovação, fortalecer o desenvolvimento de lideranças e investir no encantamento do cliente. A busca pela excelência torna-se permanente, exigindo protagonismo em todas as frentes.`,
  ],
  "80": [
    `A maturidade da organização está consolidada. A empresa opera com governança estruturada, alto desempenho das equipes e cultura fortemente orientada a resultados. Há fluidez entre o estratégico e o operacional, e os mecanismos de controle funcionam com eficiência.
Neste estágio, o foco deve estar na inovação contínua, ampliação do impacto institucional e no desenvolvimento de sucessores capazes de manter a consistência dos resultados.
Investimentos em ESG, inteligência de mercado e diferenciação competitiva são recomendados para garantir longevidade e relevância no setor. A excelência operacional, aqui, é ponto de partida para objetivos mais ambiciosos.`,
  ],
  "90": [
    `A organização atua com excelência comprovada, processos maduros, cultura de aprendizado contínuo e uma liderança inspiradora. A estrutura é resiliente, integrada e orientada por dados em todos os níveis.
O desafio está em ampliar seu impacto: escalar práticas de excelência, assumir liderança setorial e promover transformação sistêmica.
A governança deve evoluir para modelos de valor compartilhado, engajando comunidades, parceiros e o meio ambiente em um ecossistema de desenvolvimento sustentável. A empresa está pronta para influenciar seu mercado de forma estratégica e duradoura.`,
  ],
  "100": [
    `A empresa alcançou o mais alto grau de maturidade empresarial, sendo referência em excelência, inovação e impacto positivo. As práticas de gestão são sofisticadas, as lideranças são protagonistas e a cultura é ancorada em valores sólidos.
A performance é consistente, estratégica e mensurável, com plena integração entre inteligência de mercado, operação e visão de futuro.
Neste estágio, o papel da organização é institucional e transformador: gerar valor para o setor, sociedade e meio ambiente, consolidar sua presença global e formar novos líderes. O legado se torna o motor de crescimento, e o futuro é construído com responsabilidade e protagonismo.`,
  ],
};

export const introducoesEstrategia: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A organização encontra-se num estágio embrionário de desenvolvimento estratégico, caracterizado pela ausência de um direcionamento claro para o crescimento e por uma abordagem reativa na tomada de decisões, desprovida de fundamentação analítica. Não foram ainda estabelecidas metas estratégicas formais, nem planos de médio ou longo prazo que guiem a atuação da empresa. Neste contexto, torna-se imperativo iniciar a edificação de uma base estratégica mínima, que contemple a clarificação do propósito do negócio, o mapeamento dos objetivos organizacionais primários e a formulação de metas iniciais e mensuráveis. Adicionalmente, a promoção de encontros periódicos com as lideranças é crucial para fomentar o alinhamento direcional e a construção de uma visão conjunta para o futuro da organização.`,
  ],
  "20": [
    `A organização demonstra reconhecimento incipiente da necessidade de orientação estratégica, porém, evidencia fragilidades estruturais e inconsistência na aplicação de conceitos estratégicos. Embora algumas metas possam ter sido estabelecidas, verifica-se uma desconexão entre os níveis tático e operacional, o que dificulta a execução coordenada das iniciativas. A ausência de um plano estratégico formal restringe a visão de longo prazo e propicia a tomada de decisões inconsistentes. Para promover o avanço, recomenda-se a elaboração de um plano estratégico fundamental, que inclua a definição de missão, visão, valores e objetivos de curto prazo, bem como a institucionalização de reuniões de alinhamento focadas em prioridades estratégicas.`,
  ],
  "30": [
    `Observam-se sinais iniciais de estruturação estratégica, com esforços direcionados ao planejamento e à definição do rumo do negócio. No entanto, persiste uma significativa dispersão nas ações e uma lacuna na integração entre os diversos setores. Os objetivos estratégicos carecem de ampla comunicação junto à equipa e não existem mecanismos formais para o acompanhamento sistemático dos resultados. O plano de ação prioritário deverá focar-se na definição explícita dos objetivos estratégicos, na disseminação da visão corporativa entre os colaboradores e na criação de mecanismos simplificados para monitorizar o progresso, tais como painéis de metas trimestrais.`,
  ],
  "40": [
    `A análise revela uma empresa que inicia a implementação de práticas estratégicas mais estruturadas, contudo, ainda enfrenta desafios na garantia do alinhamento e da execução efetiva. Embora existam objetivos definidos e algumas ações planeadas, estas carecem de integração com a rotina operacional e de um acompanhamento sistemático. Neste estágio, é crucial promover uma maior claridade estratégica, vinculando os objetivos globais às metas departamentais. A criação de planos de ação detalhados, com a designação de responsáveis e prazos definidos, e a institucionalização de rituais de acompanhamento, como reuniões mensais de desempenho, contribuirão para a consolidação da disciplina estratégica.`,
  ],
  "50": [
    `A empresa demonstra um nível satisfatório de consciência estratégica, com objetivos corporativos definidos e iniciativas em curso. Contudo, foram identificadas fragilidades na gestão de prioridades, na comunicação eficaz da estratégia entre os diversos níveis organizacionais e na mensuração sistemática dos resultados alcançados. A recomendação central consiste em fortalecer a governança estratégica através da definição e monitorização de Indicadores-Chave de Desempenho (KPIs), promovendo o alinhamento entre as metas organizacionais e os planos táticos das áreas. É essencial ampliar o engajamento das lideranças no processo de desdobramento de metas e institucionalizar uma cultura de monitorização contínua, revisão periódica e aprendizado estratégico.`,
  ],
  "60": [
    `A estrutura estratégica da empresa encontra-se consolidada em diversos aspetos. Os objetivos organizacionais são claros, existe um plano estratégico devidamente documentado e uma parcela considerável das áreas tem conhecimento das suas metas. No entanto, persistem oportunidades para fortalecer a execução e promover uma integração mais profunda entre os níveis tático e operacional. Para evoluir, recomenda-se a criação de dashboards integrados para acompanhamento em tempo real, a adoção de metodologias ágeis na execução de projetos estratégicos e a capacitação contínua das lideranças para a gestão de indicadores, riscos e resultados.`,
  ],
  "70": [
    `O cenário atual revela uma empresa com maturidade estratégica sólida, planos bem definidos e rotinas de acompanhamento estabelecidas. As áreas operam com base em metas estratégicas e indicadores são monitorizados. No entanto, ainda existe potencial para evoluir em previsibilidade e inovação. A recomendação primária consiste em avançar no uso de inteligência de mercado, realizar análises preditivas e fomentar uma cultura de aprendizado estratégico contínuo. O investimento em planeamento estratégico participativo e o desenvolvimento da governança de portfólio de projetos podem, adicionalmente, ampliar a eficácia da execução.`,
  ],
  "80": [
    `A organização demonstra excelência em gestão estratégica, caracterizada pela clareza de propósito, desdobramento de metas por área e forte integração entre planejamento e execução. Os ciclos de revisão estratégica ocorrem regularmente e os dados são amplamente utilizados para fundamentar decisões. Neste patamar, os desafios englobam a ampliação da capacidade de adaptação face a mudanças rápidas no mercado, a incorporação da inovação como vetor estratégico e a garantia de que toda a organização esteja envolvida no processo de construção de valor. Estratégias baseadas em diferenciação e posicionamento competitivo devem ser continuamente revisitadas.`,
  ],
  "90": [
    `A empresa opera com um modelo estratégico de alto desempenho, com governança bem definida, lideranças capacitadas e um foco acentuado em inovação e escalabilidade. A integração entre planejamento, execução e monitorização é contínua e eficiente. Os indicadores são acompanhados com profundidade e utilizados para ajustes ágeis na rota estratégica. A organização encontra-se preparada para implementar práticas de gestão exponencial, explorar novos modelos de negócio e potencializar a sua atuação através de alianças estratégicas e internacionalização. A análise estratégica deve estar direcionada para a antecipação de tendências e a influência no mercado.`,
  ],
  "100": [
    `A análise aponta para uma organização com excelência estratégica plena. Todas as decisões são orientadas por um modelo sistémico, com um altíssimo alinhamento entre liderança, cultura e objetivos. A estratégia está fortemente conectada à inovação, sustentabilidade e impacto social. A empresa atua como referência no seu setor, influenciando cadeias inteiras e ecossistemas de negócio. Os desafios futuros estão relacionados com a construção de legado, a institucionalização da inteligência estratégica e a manutenção de um ambiente de alta performance com resiliência e capacidade de reinvenção constante.`,
  ],
};
export const conclusoesEstrategia: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A empresa encontra-se em um estágio muito inicial da sua base estratégica, com pouca estruturação formal do planejamento. É fundamental estabelecer os fundamentos básicos, como missão, visão e objetivos iniciais, para iniciar uma trajetória consistente rumo ao crescimento sustentável.`,
  ],
  "20": [
    `A empresa demonstra os primeiros esforços para organizar a sua base estratégica, embora ainda enfrente dificuldades na definição de metas claras e indicadores de desempenho. O foco primordial deve ser a construção de um direcionamento coerente e a implementação de controles simplificados que possibilitem o acompanhamento dos resultados.`,
  ],
  "30": [
    `Neste estágio, já existe um planejamento estratégico básico, porém a execução é desarticulada e ainda há carência de integração entre as áreas. É essencial aprimorar a definição de metas departamentais e implementar indicadores que permitam um maior controle e responsabilização.`,
  ],
  "40": [
    `A base estratégica encontra-se mais consolidada, com direcionamentos para o futuro, todavia, a execução de curto prazo ainda demanda fortalecimento. A empresa deve investir na utilização estruturada de indicadores e na comunicação entre equipes para converter o planejamento em ações efetivas.`,
  ],
  "50": [
    `A empresa demonstra avanços significativos na definição de metas e indicadores, com maior disciplina na execução e no acompanhamento. No entanto, a análise sistemática dos resultados e a capacidade de adaptação com base em dados ainda necessitam de fortalecimento, de modo a consolidar o crescimento e sustentar a estratégia num ambiente de constante transformação.`,
  ],
  "60": [
    `Com processos mais estruturados, a empresa já utiliza indicadores estratégicos para monitorizar o desempenho e ajustar as suas ações. O próximo passo consiste em intensificar a integração entre planejamento e execução para aumentar a agilidade e eficácia dos resultados.`,
  ],
  "70": [
    `A maturidade estratégica permite que a empresa converta o planejamento em resultados consistentes. O uso avançado de indicadores e a análise crítica facilitam decisões ágeis, alinhadas com os objetivos de longo prazo, impulsionando a competitividade.`,
  ],
  "80": [
    `A empresa apresenta forte maturidade estratégica, com execução eficiente e metas integradas. A análise sistemática dos indicadores permite antecipar desafios e oportunidades, promovendo ajustes proativos e inovação.`,
  ],
  "90": [
    `A empresa é referência em execução estratégica, com um ciclo contínuo de planeamento, monitorização e ajuste. A cultura orientada a resultados e o uso inteligente de dados garantem a manutenção da competitividade e a busca por excelência.`,
  ],
  "100": [
    `A empresa alcançou a excelência na maturidade estratégica, com processos integrados, metas claras e indicadores que geram insights profundos para a tomada de decisão. Está preparada para liderar o seu mercado, inovar com segurança e garantir crescimento sustentável e duradouro.`,
  ],
};

export const introducoesVendas: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área comercial encontra-se em um estágio inicial de maturidade, caracterizado pela ausência de processos definidos e uma forte dependência de esforços individuais. Não existe clareza nas metas de vendas, tampouco a utilização estruturada de ferramentas de CRM ou de gestão de funil. Para avançar, é imperativo iniciar a documentação dos processos comerciais, definir uma estrutura básica de prospecção e estabelecer metas claras e mensuráveis. O passo inicial consiste em estruturar um funil de vendas simplificado e capacitar a equipe em rotinas básicas de abordagem, qualificação e follow-up.`,
  ],
  "20": [
    `A equipe comercial inicia os primeiros passos em direção à estruturação, contudo, ainda opera de forma desorganizada e reativa. As metas podem existir, mas não são comunicadas de maneira clara e sistemática. Há uma carência de processos padronizados e uma baixa previsibilidade dos resultados. O foco primordial deve estar no mapeamento da jornada de vendas, na estruturação de um processo padrão com etapas bem definidas e na integração de ferramentas simples, como folhas de cálculo de controle ou um CRM básico. A consistência nas abordagens e na cadência de contacto com clientes precisa ser fortalecida.`,
  ],
  "30": [
    `Existe um esforço visível na organização da operação de vendas, com o início da utilização de ferramentas e a definição de metas, ainda que com baixa padronização. A gestão do funil é inconsistente e a previsibilidade ainda muito baixa. É recomendado o fortalecimento da estrutura comercial através de treinamentos, padronização do processo de vendas e maior rigor na gestão do pipeline. O acompanhamento semanal de indicadores, como taxa de conversão e ciclo de vendas, contribuirá para melhorar a previsibilidade.`,
  ],
  "40": [
    `A área comercial apresenta uma estrutura operacional em estágio inicial, com metas estabelecidas e utilização parcial de ferramentas de suporte. Apesar da execução ativa, o processo comercial enfrenta desafios relevantes, como cadência inconsistente, baixa taxa de conversão e falhas na qualificação dos leads. Observa-se, ainda, a ausência de uma rotina estruturada de análise de desempenho. Para elevar a performance da área, recomenda-se a revisão completa do funil de vendas, com a definição clara de etapas. A implementação de rituais de acompanhamento sistemático, como reuniões semanais, é essencial para garantir previsibilidade e correção ágil de desvios. Além disso, o aprofundamento da integração com a área de marketing permitirá elevar a qualidade da base prospectada, promovendo maior eficiência na conversão e no aproveitamento das oportunidades geradas.`,
  ],
  "50": [
    `A estrutura comercial encontra-se em desenvolvimento, com processos definidos, uso consistente de ferramentas e equipe orientada por metas. Contudo, a previsibilidade de resultados ainda é instável e a gestão de indicadores não é plenamente explorada. A maturidade comercial pode ser avançada com a adoção de metodologias de qualificação (como BANT ou SPIN Selling), automações de follow-up e uma melhor segmentação do funil por perfil de cliente. A análise dos dados históricos pode aprimorar a previsibilidade.`,
  ],
  "60": [
    `A área comercial demonstra uma estrutura consolidada, com funil padronizado, uso ativo de CRM e metas bem comunicadas à equipe. Já existe previsibilidade parcial nos resultados, e indicadores como conversão por etapa e ciclo de vendas são acompanhados. Para evoluir, é importante realizar diagnósticos periódicos de performance, investir em playbooks de vendas e elevar o nível de capacitação da equipe com foco em negociação e objeções. Estratégias de vendas consultivas podem ser incorporadas.`,
  ],
  "70": [
    `A operação comercial está bem estruturada, com equipe treinada, processos maduros e uso eficiente de ferramentas. Existe previsibilidade razoável nos resultados e utilização de métricas para tomada de decisão. As abordagens são personalizadas e orientadas por dados. Os próximos passos envolvem a escalabilidade do processo, testes de canais alternativos de aquisição e o desenvolvimento de estratégias para redução do ciclo de vendas. O uso de inteligência de dados e segmentação avançada pode gerar um ganho significativo.`,
  ],
  "80": [
    `A maturidade comercial é elevada, com processos sofisticados, cadência bem definida, metas inteligentes (SMART), previsibilidade precisa e acompanhamento contínuo de métricas. A equipe atua de forma consultiva e personalizada, com grande domínio do processo. Neste nível, é recomendável adotar mecanismos de feedback contínuo entre vendas e marketing, aprofundar o uso de automações e inteligência artificial e fomentar um ambiente de melhoria contínua com base em benchmarking e indicadores de performance.`,
  ],
  "90": [
    `A equipe comercial opera em altíssimo nível, com processos otimizados, forte uso de tecnologia e previsibilidade muito alta. Existe um alinhamento pleno entre metas, indicadores e ações estratégicas, além de uma cultura de melhoria contínua e excelência no atendimento. O foco agora deve estar na inovação de abordagens, expansão de canais de aquisição e exploração de mercados internacionais. Estratégias de account-based selling, vendas por comunidade e fortalecimento da marca pessoal dos vendedores podem ser diferenciais.`,
  ],
  "100": [
    `A organização possui um time de vendas de elite, altamente estratégico, analítico e inovador. A previsibilidade é absoluta, com domínio total do funil de vendas, integração profunda com o marketing e automações inteligentes em toda a jornada. Neste estágio, a área comercial torna-se referência no setor, influenciando tendências e desenvolvendo soluções customizadas para diferentes segmentos de mercado. A busca por excelência está centrada em gerar valor para o cliente em todos os pontos de contato.`,
  ],
};
export const conclusoesVendas: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área de vendas encontra-se em estágio inicial, com pouca estruturação e processos básicos. A ausência de definição clara do perfil ideal de cliente (ICP) e de ferramentas adequadas limita a capacidade de escalar as operações comerciais. É imprescindível iniciar o estabelecimento de rotinas básicas e definir o público-alvo para promover ganhos rápidos.`,
  ],
  "20": [
    `O setor comercial apresenta os primeiros sinais de organização, porém ainda carece de cadência e previsibilidade nas vendas. A liderança está presente, mas as práticas comerciais permanecem reativas. A implementação de processos estruturados e o uso de ferramentas simples são essenciais para avançar na construção de uma operação sólida.`,
  ],
  "30": [
    `Existem esforços claros para estruturar a área de vendas, com equipe engajada e início da definição do ICP. No entanto, persiste a falta de integração entre planejamento e execução, além de processos que permitam monitorar indicadores de desempenho de forma eficaz.`,
  ],
  "40": [
    `A equipe de vendas dispõe de uma base estruturada, com cadência definida e ferramentas de apoio parcialmente implementadas. A previsibilidade de resultados começa a consolidar-se, mas ainda é necessário fortalecer a disciplina na definição de metas, no acompanhamento de indicadores e na análise de performance para garantir escalabilidade e maior assertividade nas decisões comerciais.`,
  ],
  "50": [
    `A maturidade da área comercial reflete um avanço na gestão das operações, com uso mais eficiente de ferramentas e definição clara do ICP. A liderança exerce um papel estratégico, porém a escalabilidade ainda depende da otimização contínua dos processos e do alinhamento com a estratégia geral da empresa.`,
  ],
  "60": [
    `Com processos mais sólidos e cadência estabelecida, a área de vendas monitoriza indicadores estratégicos e realiza análises regulares para ajustar as suas ações. O desafio reside em aprofundar o uso de dados e automatizar controles para ampliar a eficiência e previsibilidade.`,
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
    `A área de marketing encontra-se em estágio inicial, desprovida de planejamento estratégico, estrutura de campanhas ou mensuração de resultados. As ações realizadas são pontuais e desconectadas de objetivos claros, muitas vezes limitando-se à manutenção reativa de redes sociais. Para avançar, é essencial iniciar com um diagnóstico da presença digital atual, construir um planejamento básico de conteúdo, identificar o público-alvo e iniciar a coleta de dados simplificados, como engajamento e alcance.`,
  ],
  "20": [
    `Existe uma presença digital inicial com alguma produção de conteúdo, mas sem consistência, calendário editorial ou direcionamento estratégico. As ações de marketing ainda não estão conectadas a metas de negócio e há ausência de ferramentas que sustentem o crescimento da área. O foco deve estar na criação de um plano editorial, definição de personas e escolha de canais prioritários. Também é recomendável implementar ferramentas simples de automação e iniciar a captura de leads com formulários ou landing pages.`,
  ],
  "30": [
    `O marketing começa a apresentar uma estrutura básica, com presença ativa em redes sociais, uso de identidade visual e produção de conteúdo periódica. No entanto, persiste a falta de clareza nas metas, de conexão com vendas e de indicadores que comprovem resultados reais. É fundamental alinhar os objetivos do marketing com os da área comercial, iniciar campanhas de geração de leads e incorporar ferramentas de CRM ou automação que permitam acompanhar a jornada do cliente.`,
  ],
  "40": [
    `A área de marketing apresenta rotinas operacionais consolidadas e identidade visual definida, o que demonstra um nível inicial de estruturação. Contudo, ainda opera com baixa integração ao planejamento estratégico da empresa, o que compromete a previsibilidade de resultados e dificulta a geração de demanda de forma contínua e escalável. A performance dos canais não é monitorizada de maneira aprofundada, e há ausência de metas claras relacionadas a indicadores-chave, como CAC (Custo de Aquisição de Cliente), CPL (Custo por *Lead*) e taxa de conversão por etapa do funil.`,
  ],
  "50": [
    `O marketing encontra-se em amadurecimento, com estratégias de conteúdo bem executadas, captação ativa de leads e início de integração com a equipe de vendas. Ainda existem desafios na mensuração do ROI das ações e na manutenção da cadência de campanhas. A área pode evoluir com automações mais robustas, uso de funis de nutrição, segmentações mais refinadas e adoção de ferramentas de análise, como Google Analytics, RD Station ou Hubspot. A comunicação entre marketing e vendas precisa ser contínua.`,
  ],
  "60": [
    `A área apresenta estratégias consistentes de inbound marketing, uso ativo de ferramentas, campanhas recorrentes e dados confiáveis para análise. A captação de leads está estruturada, com integração parcial com vendas e indicadores monitorizados. Para avançar, é importante intensificar a mensuração de resultados com dashboards estratégicos, realizar testes A/B em conteúdos e canais e construir jornadas personalizadas com base no comportamento dos leads.`,
  ],
  "70": [
    `O marketing atua de forma estratégica, com campanhas bem planejadas, dados integrados à área comercial e clareza nos indicadores de performance. A marca é fortalecida continuamente e os leads gerados têm boa qualidade. Os próximos passos incluem ampliar o uso de inteligência de mercado, utilizar ferramentas de automação avançada, investir em SEO técnico e reforçar a atuação omnichannel com consistência de marca em todos os pontos de contacto.`,
  ],
  "80": [
    `A maturidade da área de marketing é elevada, com forte alinhamento com a equipe de vendas, campanhas orientadas por dados, análise profunda de comportamento do consumidor e foco em geração de valor. Neste estágio, é recomendável explorar estratégias de ABM (Account-Based Marketing), marketing de influência e marketing de performance em escala. A atuação passa a ser cada vez mais preditiva e direcionada por inteligência competitiva.`,
  ],
  "90": [
    `A operação de marketing é altamente estratégica, com domínio das métricas, integração total com CRM e vendas, uso de automações inteligentes e campanhas personalizadas por perfil. A marca possui um posicionamento forte no mercado. O foco agora deve ser a inovação contínua, exploração de novos formatos como vídeo interativo, inteligência artificial na jornada do cliente e participação ativa em eventos e comunidades para fortalecimento institucional.`,
  ],
  "100": [
    `A área de marketing opera em altíssimo nível, com atuação centrada em dados, experimentação contínua e geração de demanda previsível e escalável. A equipe domina toda a jornada do consumidor e atua como um braço estratégico da liderança da empresa. A marca consolida-se como referência no setor, e o marketing influencia diretamente o crescimento do negócio. A excelência é sustentada por uma cultura analítica, alinhamento total com vendas e foco constante em inovação.`,
  ],
};
export const conclusoesMarketing: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área de marketing encontra-se em estágio inicial, desprovida de processos estruturados ou ferramentas eficazes. A ausência de direcionamento estratégico limita a geração de resultados concretos. É fundamental iniciar a construção de bases sólidas, definindo objetivos claros e implementando práticas básicas de marketing.`,
  ],
  "20": [
    `O setor de marketing apresenta os primeiros passos em organização, mas ainda carece de planejamento estratégico e ferramentas adequadas. As ações são reativas e pouco coordenadas, dificultando a geração consistente de demanda. É necessário estabelecer processos e métricas básicas para medir resultados.`,
  ],
  "30": [
    `Existem esforços para estruturar a área, com algumas campanhas e ações pontuais, porém sem integração entre canais ou alinhamento com os objetivos da empresa. O uso limitado de ferramentas e a ausência de análise de dados restringem o potencial de crescimento.`,
  ],
  "40": [
    `A área de marketing apresenta processos mais definidos e a utilização inicial de ferramentas básicas para a gestão de campanhas. A geração de demanda está em desenvolvimento, contudo, persiste a necessidade de aprimorar a segmentação, a mensuração de resultados e o planejamento integrado para maior efetividade.`,
  ],
  "50": [
    `O marketing alcança maturidade intermediária, com campanhas mais estruturadas, definição inicial de personas e uso de métricas para acompanhamento. A operação começa a alinhar-se com as metas da empresa, mas a escalabilidade e previsibilidade ainda podem ser aprimoradas.`,
  ],
  "60": [
    `Com processos consolidados e uso consistente de ferramentas, o setor monitoriza indicadores-chave e ajusta as suas estratégias com base em dados. A área de marketing apoia o crescimento sustentável, mas deve avançar na automação e integração com vendas.`,
  ],
  "70": [
    `A área apresenta forte coordenação entre canais, uso avançado de ferramentas e análise estratégica das campanhas. Existe um alinhamento claro com a estratégia corporativa, gerando demanda qualificada e contribuindo para o crescimento previsto da empresa.`,
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
    `A área de Recursos Humanos encontra-se em estágio embrionário, caracterizada pela ausência de processos formais de recrutamento, integração, desenvolvimento e avaliação de desempenho. As contratações são realizadas de forma reativa e sem critérios definidos. O primeiro passo é estruturar minimamente o processo de contratação, estabelecer descrições de cargos, criar um plano de ambientação para novos colaboradores e iniciar práticas simples de escuta, como reuniões 1:1 e inquéritos de clima.`,
  ],
  "20": [
    `Existem algumas iniciativas isoladas em RH, como contratações recorrentes e ações pontuais de integração ou desenvolvimento. No entanto, não há um planejamento claro nem políticas definidas, o que compromete a consistência das ações. Para evoluir, é necessário criar processos básicos de recrutamento e seleção, padronizar boas práticas de onboarding e implementar políticas claras de jornada de trabalho, benefícios e cultura organizacional.`,
  ],
  "30": [
    `O RH começa a ganhar forma, com processos básicos de contratação e ambientação, além de ações iniciais de comunicação interna. Apesar disso, ainda falta visão estratégica, métricas de clima organizacional e iniciativas contínuas de capacitação. É recomendado criar uma agenda de desenvolvimento (como trilhas de capacitação), instituir rituais de feedback e iniciar medições de clima e engajamento para acompanhar a evolução da cultura e da satisfação dos colaboradores.`,
  ],
  "40": [
    `A área de Recursos Humanos apresenta uma estrutura funcional consolidada, com políticas bem definidas nos processos de recrutamento, integração e gestão de benefícios. A comunicação interna demonstra sinais de evolução, embora ainda carente de mecanismos mais robustos de suporte à tomada de decisão e de acompanhamento sistemático de indicadores de performance e clima organizacional. Para avançar em maturidade, recomenda-se a implementação de programas estruturados de desenvolvimento contínuo, além da criação de trilhas de carreira alinhadas aos objetivos estratégicos da empresa. A gestão de desempenho deve ser aprimorada por meio de ferramentas específicas e ciclos regulares de avaliação. Por fim, o fortalecimento da cultura organizacional exige ações recorrentes de reconhecimento, reforço dos valores institucionais e alinhamento entre lideranças e equipes.`,
  ],
  "50": [
    `O RH já atua de forma integrada com a liderança, com rotinas bem estabelecidas e percepção positiva dos colaboradores. Existem iniciativas de treinamento, acompanhamento de clima e comunicação estruturada, mas a atuação ainda é mais operacional do que estratégica. O próximo passo é ampliar o uso de dados para tomada de decisão, investir em sistemas de gestão de pessoas (como ERPs ou plataformas de RH), reforçar o papel da liderança no desenvolvimento da equipe e estruturar políticas de retenção e sucessão.`,
  ],
  "60": [
    `A área de RH apresenta práticas consistentes, com foco em atração, desenvolvimento e retenção de talentos. Já existem dados para apoiar decisões, e a cultura organizacional está a ser consolidada por meio de rituais, comunicação e lideranças engajadas. Para evoluir, é importante automatizar processos operacionais, fortalecer programas de desenvolvimento de liderança, mapear competências críticas e alinhar constantemente a estratégia de pessoas aos objetivos de negócio.`,
  ],
  "70": [
    `O RH atua com protagonismo, contribuindo diretamente para o engajamento, a produtividade e a performance da equipe. Os processos de onboarding, avaliação e desenvolvimento estão bem estruturados, e existem indicadores claros de clima e desempenho. O foco agora deve estar na criação de uma cultura de alta performance, programas estruturados de reconhecimento e incentivo, trilhas de desenvolvimento individualizadas e maior integração com outras áreas estratégicas da empresa.`,
  ],
  "80": [
    `A maturidade da área de RH é alta, com forte alinhamento entre cultura, estratégia e práticas de gestão de pessoas. A empresa atua com clareza em employer branding, liderança de alta performance, clima organizacional saudável e inovação em gestão de talentos. Para seguir evoluindo, o RH pode implementar People Analytics, programas de diversidade e inclusão, planos de sucessão formalizados e atuar de forma consultiva junto às demais lideranças, tornando-se uma referência interna em cultura e gestão.`,
  ],
  "90": [
    `A área de RH é estratégica, orientada por dados e impacta diretamente nos resultados do negócio. Há políticas robustas de desenvolvimento, programas de reconhecimento, cultura bem difundida e um ambiente de trabalho que favorece o alto desempenho. O próximo estágio envolve a consolidação de práticas de inovação em gestão de pessoas, uso avançado de tecnologia (como inteligência artificial em recrutamento) e uma abordagem preditiva para antecipar necessidades de capital humano.`,
  ],
  "100": [
    `O RH opera no mais alto nível de excelência, com forte influência estratégica na empresa, cultura organizacional enraizada e reconhecida, liderança inspiradora e práticas inovadoras em todas as dimensões da gestão de pessoas. A área contribui ativamente para o crescimento sustentável do negócio, com foco contínuo em inovação, desenvolvimento humano e fortalecimento da cultura. O RH é visto como um diferencial competitivo e uma referência no setor.`,
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
    `Existem esforços para implementar práticas estruturadas de recrutamento e treinamento, mas a gestão por indicadores ainda é incipiente. A cultura organizacional começa a ser trabalhada, porém sem engajamento consistente dos colaboradores.`,
  ],
  "40": [
    `O RH apresenta processos estruturados, com destaque para a realização de avaliações de desempenho e ações voltadas à comunicação interna. No entanto, ainda há oportunidades de avanço na integração dessas iniciativas com os objetivos estratégicos da empresa.`,
  ],
  "50": [
    `A maturidade intermediária do RH permite que a área contribua para a retenção de talentos e desenvolvimento dos colaboradores. Indicadores básicos de performance são monitorizados, e existem esforços para fortalecer a cultura organizacional.`,
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
    `A área operacional encontra-se em estágio inicial, com forte dependência da atuação direta da liderança e ausência de processos estruturados. Não existe padronização nas rotinas, nem definição de indicadores de produtividade, controle de qualidade ou critérios para fornecedores. O primeiro passo é mapear os principais processos operacionais, padronizar tarefas recorrentes, definir fluxos básicos e estabelecer um controle mínimo de produtividade e qualidade.`,
  ],
  "20": [
    `As rotinas operacionais estão sendo executadas, mas de maneira informal e com pouca previsibilidade. A dependência de pessoas-chave é alta, o que compromete a escalabilidade e gera riscos operacionais. Para evoluir, é necessário implementar processos formais, documentar os fluxos operacionais, iniciar a definição de metas operacionais e estabelecer critérios básicos de avaliação de fornecedores e desempenho.`,
  ],
  "30": [
    `Existem esforços para estruturar processos e organizar a operação, com a introdução de controles básicos e o início da implementação de sistemas ou folhas de cálculo de apoio. Contudo, a gestão ainda é reativa, com poucos indicadores e falhas recorrentes. É indicado fortalecer a governança operacional, estabelecer KPIs para acompanhar produtividade e qualidade, e implementar controles mais consistentes para mitigar riscos operacionais e melhorar a execução.`,
  ],
  "40": [
    `A operação começa a apresentar maior organização, com fluxos definidos, início de monitorização de produtividade e processos de compra e relacionamento com fornecedores mais estruturados. O foco agora deve ser consolidar uma cultura de melhoria contínua, rever processos ineficientes, aprimorar o controle de qualidade e fortalecer a comunicação entre equipes operacionais e áreas estratégicas.`,
  ],
  "50": [
    `A área de operações funciona de forma estável, com rotinas bem definidas e utilização de sistemas para controle de tarefas. Já existem critérios para fornecedores e uma gestão operacional baseada em dados começa a ganhar força. Para seguir avançando, é importante reforçar os indicadores de performance, criar metas claras por equipe/setor, padronizar processos críticos e implementar um sistema de governança com foco em eficiência e escalabilidade.`,
  ],
  "60": [
    `A gestão operacional é sólida, com processos bem estruturados, indicadores de desempenho a serem acompanhados e decisões baseadas em dados. Existe uma boa integração entre as áreas e sinergia com fornecedores. A recomendação é investir em automações operacionais, ferramentas de BI para análise preditiva, rotinas de melhoria contínua e mecanismos de mitigação de riscos para tornar a operação mais resiliente e responsiva.`,
  ],
  "70": [
    `A área de Operações apresenta alto grau de eficiência na execução, com controles bem definidos de produtividade, qualidade e gestão da cadeia de fornecedores. A estrutura atual é adequada para sustentar o crescimento da empresa, e os processos de melhoria contínua demonstram maturidade e aplicação consistente. Para avançar em direção a um modelo operacional mais robusto e escalável, recomenda-se a ampliação da digitalização dos processos, visando maior rastreabilidade, agilidade e integração entre áreas. A busca por certificações de qualidade, a adoção de metodologias ágeis para ciclos de melhoria e a consolidação do alinhamento entre indicadores operacionais e metas estratégicas contribuirão diretamente para elevar o nível de governança, controle e resiliência da operação.`,
  ],
  "80": [
    `A maturidade operacional é elevada, com sistemas integrados, gestão por indicadores, automações implementadas e processos altamente padronizados. A empresa consegue garantir qualidade, previsibilidade e escala, mantendo um bom relacionamento com fornecedores e clientes. O foco agora pode ser em inovação operacional, uso de inteligência artificial ou machine learning para previsão de gargalos e aumento da capacidade adaptativa frente a mudanças do mercado.`,
  ],
  "90": [
    `A operação é estratégica, altamente eficiente e adaptável. A empresa atua com excelência em governança, qualidade e produtividade, utilizando tecnologia para antecipar demandas, gerenciar riscos e apoiar decisões. O próximo nível envolve fortalecer a resiliência operacional com modelos preditivos, estabelecer comités de governança operacional e tornar a operação uma vantagem competitiva sustentável.`,
  ],
  "100": [
    `A operação atinge o mais alto nível de excelência, sendo reconhecida como uma referência de eficiência, inovação e governança. Todos os processos estão digitalizados, integrados e continuamente aprimorados com base em dados e feedbacks. A área atua como um diferencial estratégico, capaz de suportar o crescimento escalável da empresa com alto padrão de qualidade, produtividade e adaptação ao mercado.`,
  ],
};
export const conclusoesOperacoes: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área operacional apresenta estruturas básicas, mas ainda carece de processos definidos e sistemas que suportem a operação. A ausência de indicadores e controles limita a capacidade de entrega e cria riscos para a continuidade do negócio. É fundamental iniciar a formalização dos processos e controles básicos.`,
  ],
  "20": [
    `Existe algum nível de organização operacional, com fornecedores cadastrados e sistemas rudimentares, mas sem métricas claras para monitorização de desempenho. A operação ainda é reativa e pouco previsível, comprometendo a escalabilidade.`,
  ],
  "30": [
    `Processos operacionais começam a ser padronizados, e existe um esforço inicial para documentar rotinas. Contudo, o controle de qualidade e os indicadores ainda são incipientes, o que dificulta a identificação de melhorias.`,
  ],
  "40": [
    `A operação conta com sistemas integrados e liderança ativa, além de alguma estruturação na gestão de fornecedores. Ainda assim, faltam dashboards e ferramentas para acompanhar produtividade e qualidade em tempo real.`,
  ],
  "50": [
    `O nível intermediário permite um controle melhor dos processos e fornecedores, com indicadores básicos a serem monitorizados. A operação começa a ser orientada por dados, mas ainda há oportunidades de otimização e automação.`,
  ],
  "60": [
    `A área operacional apresenta maior maturidade, com processos documentados, controle de qualidade implementado e monitorização consistente por meio de indicadores. A gestão é proativa e busca a melhoria contínua.`,
  ],
  "70": [
    `A operação demonstra alinhamento consistente com a estratégia da empresa, utilizando dashboards em tempo real e análises avançadas para monitorizar produtividade, qualidade e desempenho. A estrutura atual oferece suporte sólido para o crescimento sustentável e escalável do negócio.`,
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
    `A maturidade tecnológica da empresa encontra-se em estágio inicial, com infraestrutura básica e pouca ou nenhuma automação dos processos. Os sistemas são isolados, há dependência de soluções manuais e o uso de dados para tomada de decisão é quase inexistente. É urgente investir em digitalização dos processos, implementar ferramentas básicas de comunicação e criar uma cultura inicial de inovação tecnológica para suportar o crescimento futuro.`,
  ],
  "20": [
    `A empresa começa a adotar algumas ferramentas digitais e dispõe de infraestrutura mínima para suportar operações, mas ainda falta integração entre sistemas e automação consistente. Os processos ainda são dependentes de intervenções manuais, e o uso estratégico de dados é limitado. A recomendação é avançar na integração dos sistemas, promover treinamentos para adoção tecnológica e iniciar projetos piloto de automação.`,
  ],
  "30": [
    `Existem avanços na adoção de tecnologias para comunicação e gestão, com algumas áreas utilizando ferramentas digitais e sistemas isolados a funcionar razoavelmente. Porém, a falta de integração plena e a baixa automação ainda limitam a eficiência operacional e a capacidade analítica. É necessário planejar a digitalização de processos críticos e ampliar o uso de dados para decisões.`,
  ],
  "40": [
    `A infraestrutura tecnológica encontra-se mais consolidada, com ferramentas de colaboração implementadas e início de integração entre sistemas principais. A empresa já reconhece a importância da automação e do uso de dados, mas ainda enfrenta desafios na implementação completa e na uniformização dos processos tecnológicos. Recomenda-se fortalecer projetos de integração, investir em capacitação técnica e desenvolver indicadores para monitorar o desempenho tecnológico.`,
  ],
  "50": [
    `A empresa apresenta uma maturidade tecnológica em estágio intermediário, com infraestrutura adequada, sistemas integrados em áreas estratégicas e processos parcialmente automatizados. Existem indícios consistentes de uma cultura voltada à inovação, bem como o início do uso de dados para análise e apoio à tomada de decisão, embora essa prática ainda não esteja plenamente difundida entre as áreas. A evolução do pilar tecnológico deve focar na ampliação da automação de processos, na consolidação de uma governança de TI estruturada e na adoção de ferramentas avançadas voltadas à análise preditiva e à segurança da informação. Esses avanços permitirão maior eficiência operacional, escalabilidade e mitigação de riscos cibernéticos.`,
  ],
  "60": [
    `A empresa possui infraestrutura robusta, sistemas integrados e processos automatizados em diversas áreas, suportando uma operação eficiente e colaborativa. O uso de dados para tomada de decisão está consolidado em vários níveis, e existem iniciativas em curso para inovação tecnológica. Para avançar, recomenda-se investir em inteligência artificial, automação avançada e fortalecer a governança de dados e cibersegurança.`,
  ],
  "70": [
    `A maturidade tecnológica é alta, com integração plena de sistemas, automação avançada e cultura digital fortemente enraizada. A empresa utiliza dados de forma estratégica para otimização de processos e inovação, além de manter uma infraestrutura segura e escalável. O foco agora deve ser a implementação de tecnologias emergentes, como machine learning e análise preditiva, para manter a competitividade e agilidade.`,
  ],
  "80": [
    `A tecnologia é um dos pilares da empresa, com operação digitalizada, processos automatizados e inovação contínua. A empresa atua de forma proativa na adoção de novas tecnologias, utiliza inteligência artificial e big data para suporte às decisões estratégicas e mantém alta segurança da informação. O desafio é continuar a evolução tecnológica, explorando parcerias, novas ferramentas e promovendo a transformação digital em toda a cadeia de valor.`,
  ],
  "90": [
    `A maturidade tecnológica da empresa é exemplar, com sistemas integrados em tempo real, automação avançada e uso extensivo de análise preditiva e inteligência artificial. A governança de TI é rigorosa, e a cultura de inovação é disseminada em todos os níveis da organização. O próximo passo é liderar iniciativas de tecnologia disruptiva, influenciando o mercado e ampliando o ecossistema digital da empresa.`,
  ],
  "100": [
    `A empresa atinge a excelência tecnológica, sendo referência em inovação, automação e governança digital. Todos os processos estão digitalizados e integrados, com uso avançado de inteligência artificial, machine learning e análise de dados para tomada de decisão em tempo real. A tecnologia é um diferencial competitivo estratégico, sustentando o crescimento sustentável e a transformação contínua do negócio.`,
  ],
};
export const conclusoesTecnologia: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área de tecnologia encontra-se em estágio inicial, com infraestrutura básica e pouca formalização de processos. A comunicação interna é limitada e não existe uso de ferramentas que tragam ganho de eficiência. É essencial investir em fundamentos tecnológicos e padronização.`,
  ],
  "20": [
    `Existem alguns avanços na infraestrutura e comunicação, mas a automação de processos é praticamente inexistente. Os sistemas são isolados e a cultura de inovação ainda é incipiente.`,
  ],
  "30": [
    `A empresa começa a implementar soluções para melhorar a integração dos sistemas e a comunicação interna, embora ainda faltem ferramentas para monitorização e automação.`,
  ],
  "40": [
    `A área de tecnologia conta com infraestrutura mais robusta e iniciativas iniciais de automação. A cultura de inovação está em desenvolvimento, mas a falta de dashboards e análises limita a tomada de decisões proativas.`,
  ],
  "50": [
    `O nível intermediário reflete uma área de tecnologia mais estruturada, com integração básica entre sistemas e utilização moderada de automações. Apesar dos avanços, ainda existem oportunidades relevantes para ampliar o uso de inteligência artificial, fortalecer a análise de dados e consolidar uma governança digital que contribua de forma mais estratégica para a escalabilidade do negócio.`,
  ],
  "60": [
    `A tecnologia está bem organizada, com processos definidos, automações implementadas e monitorização regular via dashboards. A cultura de inovação começa a influenciar outras áreas do negócio.`,
  ],
  "70": [
    `A área é reconhecida pelo uso estratégico da tecnologia, com integração avançada de sistemas, dashboards em tempo real e iniciativas de inovação que suportam a estratégia da empresa.`,
  ],
  "80": [
    `A tecnologia é um motor de crescimento, with automações avançadas, uso de inteligência artificial e sistemas altamente integrados que promovem eficiência operacional e agilidade.`,
  ],
  "90": [
    `A área de tecnologia é referência no mercado, com inovação contínua, uso estratégico de dados e IA para antecipar tendências e suportar decisões estratégicas.`,
  ],
  "100": [
    `A tecnologia é um pilar fundamental da empresa, com infraestrutura de ponta, automações inteligentes e integração total entre sistemas. A área lidera a transformação digital, impulsionando a escalabilidade e a competitividade sustentável.`,
  ],
};

export const introducoesFinanceiro: Record<MaturidadeNivel, string[]> = {
  "10": [
    `A área financeira encontra-se em estágio inicial de desenvolvimento, com ausência de controles estruturados e processos padronizados. Não existe planejamento orçamentário definido, tampouco mecanismos de acompanhamento sistemático das entradas e saídas de recursos. Essa falta de organização representa um alto risco para a sustentabilidade financeira do negócio, comprometendo decisões estratégicas e operacionais. É fundamental iniciar a estruturação de um fluxo de caixa, adotar controles básicos e implementar rotinas financeiras essenciais.`,
  ],
  "20": [
    `O setor financeiro apresenta sinais iniciais de organização, com registros básicos de despesas e receitas. No entanto, ainda é perceptível a ausência de indicadores financeiros claros, controle de inadimplência e projeções de caixa. A tomada de decisão continua a ser baseada em dados fragmentados e pouco confiáveis. Para avançar, é necessário investir em ferramentas simples de controle, definir um orçamento anual e monitorar periodicamente o desempenho financeiro.`,
  ],
  "30": [
    `A empresa demonstra um esforço consistente na organização da área financeira. Já existem folhas de cálculo ou sistemas rudimentares que possibilitam algum controle sobre as finanças, embora de forma limitada. Ainda há pouca integração entre setores e baixa previsibilidade dos recursos. O próximo passo é consolidar a estrutura de planejamento financeiro, acompanhar o orçamento com mais rigor e começar a desenvolver análises mensais para guiar decisões estratégicas.`,
  ],
  "40": [
    `Neste estágio, a área financeira possui rotinas estabelecidas, com controle de contas a pagar e a receber, além de um orçamento que começa a ser utilizado como ferramenta de gestão. Ainda assim, a análise de rentabilidade e a projeção de cenários permanecem superficiais. A evolução passa pela padronização de processos, maior detalhamento dos custos e ampliação da capacidade analítica para fundamentar decisões mais assertivas.`,
  ],
  "50": [
    `A maturidade financeira atinge um nível intermediário, com uma gestão mais disciplinada do fluxo de caixa, controle de custos e algum acompanhamento de indicadores-chave. Apesar disso, ainda faltam estratégias mais robustas de planejamento e ações preditivas. O fortalecimento desta área passa pela implementação de controles automatizados, revisão constante de metas financeiras e maior integração com os objetivos estratégicos da empresa.`,
  ],
  "60": [
    `A gestão financeira mostra-se estruturada, com processos claros e monitorização regular de indicadores como lucratividade, margem de contribuição e ponto de equilíbrio. O planejamento orçamentário já é praticado com consistência. No entanto, o uso de dados históricos para modelagem de cenários ainda pode ser aprimorado. É recomendável aprofundar as análises financeiras e desenvolver mecanismos para avaliar riscos e oportunidades com mais precisão.`,
  ],
  "70": [
    `O setor financeiro apresenta um nível consistente de maturidade, com controles bem estruturados, indicadores estratégicos definidos e análises periódicas que subsidiam a tomada de decisão da alta gestão. Observa-se um ambiente de transparência nos dados financeiros e uma atuação orientada à sustentabilidade econômica do negócio. Para avançar, recomenda-se o aprimoramento dos sistemas de controle e a adoção de práticas de inteligência financeira. A integração do financeiro será fundamental para sustentar o crescimento e garantir maior assertividade nas decisões corporativas.`,
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
    `A área financeira encontra-se em estágio inicial, com ausência de controles estruturados e processos padronizados. A falta de planeamento e monitorização sistemática dos recursos compromete a sustentabilidade do negócio. É crucial iniciar a organização financeira com controles básicos e rotinas essenciais.`,
  ],
  "20": [
    `Existem sinais iniciais de organização financeira, com registros básicos de receitas e despesas, mas ainda faltam indicadores claros e projeções confiáveis. A tomada de decisão depende de dados fragmentados. É necessário implementar ferramentas simples de controle e um orçamento anual.`,
  ],
  "30": [
    `A empresa está consolidando a estrutura financeira, com uso de folhas de cálculo ou sistemas rudimentares para controle. Contudo, ainda há baixa integração entre áreas e pouca previsibilidade. O próximo passo é o rigor no acompanhamento orçamentário e análises mensais para suportar decisões estratégicas.`,
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