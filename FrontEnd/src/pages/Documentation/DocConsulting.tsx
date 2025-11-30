import { Card } from "@/components/ui/card";
import FaqCollapsible from "./FaqQuestions";

function ManualConsultor() {
  return (
    <div className="bg-gray-200">
      <header className="w-full flex justify-between items-center fixed top-0 left-0 bg-gradient-to-r from-gray-500 via-gray-800 to-gray-900 shadow-lg p-8 text-center text-white font-semibold text-2xl tracking-wide z-50">
        <img
          className="w-[150px]"
          src="https://assinaturas.grovehost.com.br/StaticDicionary/logConsulting.png"
          alt=""
        />
        Manual do Consultor - Sistema de Diagnóstico Empresarial
      </header>

      <div className="pt-38 pb-16 mx-auto px-6 space-y-10">
        <Card className="p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-center font-semibold text-2xl mb-6 text-gray-900 d">
            Introdução
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-justify">
            Este manual foi elaborado especialmente para os consultores que irão
            utilizar o Sistema de Diagnóstico Empresarial como uma ferramenta
            para apoiar empresas na avaliação de sua maturidade organizacional.
            Por meio deste sistema, você será capaz de conduzir uma análise
            profunda e estruturada dos processos internos, identificar pontos
            fortes, bem como mapear oportunidades de melhoria que possam
            impulsionar a competitividade e o crescimento sustentável das
            organizações atendidas.
            <br />
            <br />
            Ao longo deste documento, você encontrará orientações claras e
            detalhadas sobre o funcionamento do sistema, desde a inserção e
            gestão dos dados até a interpretação dos resultados apresentados.
            Além disso, o manual contempla as melhores práticas para a condução
            das entrevistas e aplicação das avaliações, assegurando que as
            informações coletadas sejam precisas e relevantes.
            <br />
            <br />
            Com o uso correto do Sistema de Diagnóstico Empresarial, o consultor
            estará apto a gerar diagnósticos completos e personalizados, que
            servirão como base para o desenvolvimento de planos de ação
            estratégicos, alinhados às necessidades específicas de cada empresa.
            O objetivo final é fornecer um suporte efetivo para a tomada de
            decisões, promovendo a melhoria contínua, a inovação e a excelência
            operacional.
            <br />
            <br />
            Este material também enfatiza a importância do papel do consultor
            como agente facilitador, orientador e parceiro do cliente durante
            todo o processo, garantindo uma experiência colaborativa e
            resultados impactantes.
          </p>
        </Card>

        <Card className="p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-center font-semibold text-2xl mb-5 text-gray-900">
            Preparação e Acesso ao Sistema
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              Acesse o sistema utilizando o login e senha fornecidos pela
              empresa responsável.
            </li>
            <li>
              Certifique-se de que tem permissão para visualizar e responder às
              perguntas dos clientes que irá atender.
            </li>
            <li>
              Familiarize-se com a interface, que está organizada por áreas da
              empresa, permitindo uma avaliação segmentada e detalhada.
            </li>
          </ul>
        </Card>

        <Card className="p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-center font-semibold text-2xl mb-5 text-gray-900 ">
            Conduzindo a Consultoria com o Sistema
          </h2>
          <h3 className="mt-4 text-gray-700  font-medium leading-relaxed text-justify">
            Esta etapa é fundamental para garantir que o diagnóstico empresarial
            seja realizado de forma eficaz, precisa e alinhada às necessidades
            reais do cliente. O consultor deve atuar como facilitador,
            orientando o cliente durante todo o processo para que as informações
            coletadas reflitam fielmente a situação atual da empresa.
          </h3>

          <ul className="list-disc list-inside space-y-6 mt-6 text-gray-700 dark:text-gray-300">
            <li>
              <h4 className="font-semibold textgray-800  mb-2">
                Apresentação para o Cliente:
              </h4>
              <p>
                Antes de iniciar a coleta dos dados, é essencial que o consultor
                faça uma apresentação clara e objetiva do sistema ao cliente.
                Explique o propósito principal da ferramenta, que é apoiar a
                avaliação da maturidade empresarial em diferentes áreas,
                identificando pontos fortes, riscos e oportunidades de melhoria.
                Ressalte que este diagnóstico é uma base estratégica para o
                crescimento sustentável e a tomada de decisões mais assertivas.
              </p>
              <p className="mt-3">
                Mostre ao cliente a interface do sistema, destacando a
                organização das perguntas em módulos ou departamentos, o que
                facilita a navegação e compreensão. Demonstre como as perguntas
                são formuladas de maneira simples e direta, geralmente com
                respostas “Sim” ou “Não”, para tornar o processo mais ágil e
                reduzir possíveis ambiguidades. A familiarização do cliente com
                a ferramenta traz maior confiança e engajamento durante a
                consultoria.
              </p>
            </li>

            <li>
              <h4 className="font-semibold textgray-800  mb-2">
                Coleta das Respostas:
              </h4>
              <p>
                Durante a etapa de coleta, o consultor deverá conduzir a
                navegação pelas abas ou seções do sistema, que representam os
                diferentes departamentos ou áreas da empresa (como Finanças,
                Recursos Humanos, Marketing, Produção, entre outros). Explique a
                importância de analisar cada setor individualmente para que
                diagnóstico reflita uma visão completa e integrada da
                organização.
              </p>
              <p className="mt-3">
                Oriente o cliente a responder às perguntas com sinceridade,
                selecionando “Sim” quando a prática ou condição descrita estiver
                implementada ou vigente, e “Não” quando não estiver. Caso o
                cliente tenha dúvidas sobre o significado de alguma pergunta ou
                sobre como responder, o consultor deve esclarecer,
                contextualizando com exemplos práticos e adaptando a linguagem,
                se necessário.
              </p>
              <p className="mt-3">
                É importante enfatizar que respostas verdadeiras e transparentes
                são essenciais para garantir a qualidade do diagnóstico.
                Respostas imprecisas ou tendenciosas podem comprometer a análise
                e as recomendações posteriores, impactando negativamente os
                resultados da consultoria.
              </p>
            </li>

            <li>
              <h4 className="font-semibold textgray-800  mb-2">
                Salvando e Atualizando Respostas:
              </h4>
              <p>
                Após cada resposta, o sistema automaticamente registra a
                informação, garantindo que nada seja perdido ao longo do
                processo. O consultor deve confirmar que as respostas estão
                sendo salvas corretamente, realizando testes rápidos para
                validar a persistência dos dados.
              </p>
              <p className="mt-3">
                Reforce que o sistema permite que as respostas sejam revisadas e
                atualizadas a qualquer momento, especialmente se novas
                informações forem obtidas durante a consultoria ou se o cliente
                identificar a necessidade de corrigir algum dado previamente
                inserido. Essa flexibilidade contribui para manter o diagnóstico
                sempre atual e relevante.
              </p>
            </li>
          </ul>
        </Card>

        <Card className="p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-center font-semibold text-2xl mb-5 text-gray-900 ">
            Análise e Interpretação dos Resultados
          </h2>
          <h3 className="mt-4 text-gray-700 dark:text-indigo-300 font-medium leading-relaxed text-justify">
            Após a coleta das respostas, o sistema vai liberar um link de livre
            acesso, tanto do consultor quanto do cliente. A próxima etapa
            consiste em analisar cuidadosamente os dados obtidos para extrair
            insights relevantes sobre a maturidade da empresa e suas áreas de
            negócio. Essa análise é essencial para transformar informações
            brutas em um diagnóstico claro, que servirá de base para a
            elaboração de estratégias e planos de ação eficazes.
          </h3>

          <ul className="list-disc list-inside space-y-6 mt-6 text-gray-700 dark:text-gray-300">
            <li>
              <h4 className="font-semibold textgray-800  mb-2">
                Utilização dos Gráficos e Indicadores:
              </h4>
              <p>
                O sistema apresenta os resultados por meio de gráficos visuais,
                como gráficos de barras, pizza e indicadores percentuais, que
                facilitam a compreensão rápida do desempenho de cada área
                avaliada. Utilize esses recursos visuais para obter uma visão
                geral do nível de maturidade de cada departamento, identificando
                quais setores apresentam maior desenvolvimento e quais demandam
                atenção.
              </p>
              <p className="mt-3">
                Estes gráficos sintetizam as respostas de forma visual e
                intuitiva, permitindo comparar o desempenho entre diferentes
                áreas e observar tendências ou padrões que podem não ser
                evidentes apenas pela análise numérica das respostas.
              </p>
            </li>

            <li>
              <h4 className="font-semibold textgray-800  mb-2">
                Interpretação das Porcentagens e Distribuições:
              </h4>
              <p>
                As porcentagens indicam a proporção de respostas positivas
                (“Sim”) em relação ao total de perguntas de cada setor ou
                categoria. Analise essas métricas para identificar o grau de
                conformidade com boas práticas e processos estabelecidos na
                empresa.
              </p>
              <p className="mt-3">
                É importante destacar os pontos fortes, ou seja, as áreas que
                apresentam alta maturidade, pois representam ativos estratégicos
                que podem ser potencializados para alcançar resultados ainda
                melhores. Ao mesmo tempo, identifique as fragilidades — setores
                com baixos índices de respostas positivas — que podem estar
                comprometendo a performance global da organização.
              </p>
              <p className="mt-3">
                A distribuição dos resultados deve ser interpretada com atenção,
                buscando compreender as causas das respostas negativas e as
                possíveis inter-relações entre as áreas. Por exemplo,
                deficiências em processos internos podem impactar diretamente a
                área financeira ou comercial.
              </p>
            </li>

            <li>
              <h4 className="font-semibold textgray-800  mb-2">
                Identificação de Oportunidades de Melhoria:
              </h4>
              <p>
                Foque especialmente nas respostas negativas (“Não”), pois elas
                representam lacunas ou problemas que necessitam ser tratados
                para elevar a maturidade da empresa. Essas respostas indicam
                diretamente onde há oportunidades para implementar melhorias,
                ajustar processos ou investir em capacitação e tecnologia.
              </p>
              <p className="mt-3">
                Ao identificar essas oportunidades, o consultor pode preparar um
                plano de ação estruturado, priorizando as iniciativas com maior
                impacto e viabilidade para a empresa. Esse plano será
                fundamental para guiar as próximas etapas da consultoria,
                oferecendo um caminho claro para o desenvolvimento sustentável e
                a redução de riscos.
              </p>
            </li>
          </ul>
        </Card>

        <Card className="p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <FaqCollapsible />
        </Card>

        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-500 text-white py-10 rounded-xl shadow-lg mt-12">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-semibold mb-5 tracking-wide">
              Suporte e Contato
            </h3>
            <p className="mb-3 text-indigo-200">
              Para dúvidas técnicas ou problemas operacionais, contate:
            </p>
            <div className="flex flex-col items-center gap-4 text-indigo-100 text-lg">
              <a
                href="mailto:felipe.souza@groveagency.com.br"
                className="flex items-center gap-3 hover:text-indigo-300 transition-colors"
                aria-label="Enviar email para felipe.souza@groveagency.com.br"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M4 4h16v16H4z" stroke="none" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                felipe.souza@groveagency.com.br
              </a>

              <p className="flex items-center gap-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 13.1 13.1 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 13.1 13.1 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                (22) 99212-2757
              </p>

              <p className="flex items-center gap-3 text-gray-300 font-semibold">
                <svg
                  className="w-6 h-6 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Atendimento 24/7
              </p>
            </div>

            <p className="mt-10 text-white text-sm select-none">
              &copy; {new Date().getFullYear()} Grove Agency. Todos os direitos
              reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ManualConsultor;
