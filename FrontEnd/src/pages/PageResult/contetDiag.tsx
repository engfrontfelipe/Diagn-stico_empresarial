import { useEffect, useState } from "react";
import { introducoes, consideracoesFinais } from "../Client/StaticDictionary";

const apiUrl = "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host/";
export function obterNivelMaturidade(pontuacao: number): MaturidadeNivel {
  const nivel = Math.min(Math.ceil(pontuacao / 10) * 10, 100);
  return nivel.toString() as MaturidadeNivel;
}

export function selecionarTextoConclusao(pontuacao: number): string {
  const nivel = obterNivelMaturidade(pontuacao);
  const texto = consideracoesFinais[nivel];

  if (!texto) {
    return `<section><p>Conclusão não disponível para o nível ${nivel}.</p></section>`;
  }

  return `
    <section id="conclusao-${nivel}">
      <p>${texto}</p>
    </section>
  `;
}
// Seleciona texto aleatório da introdução com base na pontuação
export function selecionarTexto(pontuacao: number): string {
  const nivel = obterNivelMaturidade(pontuacao);
  const opcoes = introducoes[nivel];

  if (!opcoes || opcoes.length === 0) {
    return `<section><p>Introdução não disponível para o nível ${nivel}.</p></section>`;
  }

  const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
  const texto = opcoes[indiceAleatorio];

  return `
    <section id="introducao-${nivel}">
      <p>${texto.trim().replace(/\n/g, "<br>")}</p>
    </section>
  `;
}

// Importar intros específicas por área e o tipo MaturidadeNivel
import {
  introducoesEstrategia,
  introducoesVendas,
  introducoesMarketing,
  introducoesRH,
  introducoesOperacoes,
  introducoesTecnologia,
  introducoesFinanceiro,
  MaturidadeNivel,
} from "../Client/StaticDictionary";

// Mapeamento das áreas para seus respectivos textos de introdução
const introducoesPorDepartamento: Record<
  string,
  Record<MaturidadeNivel, string[]>
> = {
  estrategias: introducoesEstrategia,
  vendas: introducoesVendas,
  marketing: introducoesMarketing,
  rh: introducoesRH,
  operacoes: introducoesOperacoes,
  tecnologia: introducoesTecnologia,
  financeiro: introducoesFinanceiro,
};

// Função que recebe o departamento e a pontuação e retorna o texto correspondente
export function selecionarTextoPorDepartamento(
  departamento: string,
  pontuacao: number,
): string {
  const nivel = obterNivelMaturidade(pontuacao);

  // Pega o objeto de intros da área ou usa introducoes padrão como fallback
  const intros =
    introducoesPorDepartamento[departamento.toLowerCase()] || introducoes;

  const opcoes = intros[nivel];
  if (!opcoes || opcoes.length === 0) {
    return `<section><p>Introdução não disponível para o nível ${nivel} da área ${departamento}.</p></section>`;
  }

  const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
  const texto = opcoes[indiceAleatorio];

  return `
    <section id="introducao-${departamento}-${nivel}">
      <p>${texto.trim().replace(/\n/g, "<br>")}</p>
    </section>
  `;
}

import {
  // ... suas outras importações,
  conclusoesEstrategia,
  conclusoesVendas,
  conclusoesMarketing,
  conclusoesRH,
  conclusoesOperacoes,
  conclusoesTecnologia,
  conclusoesFinanceiro,
} from "../Client/StaticDictionary";

const conclusoesPorDepartamento: Record<
  string,
  Record<MaturidadeNivel, string[]>
> = {
  estrategias: conclusoesEstrategia,
  vendas: conclusoesVendas,
  marketing: conclusoesMarketing,
  rh: conclusoesRH,
  operacoes: conclusoesOperacoes,
  tecnologia: conclusoesTecnologia,
  financeiro: conclusoesFinanceiro,
};

export function selecionarConclusaoPorDepartamento(
  departamento: string,
  pontuacao: number,
): string {
  const nivel = obterNivelMaturidade(pontuacao);

  const conclusoes = conclusoesPorDepartamento[departamento.toLowerCase()];
  if (!conclusoes) {
    return `<section><p>Conclusão não disponível para a área ${departamento}.</p></section>`;
  }

  const opcoes = conclusoes[nivel];
  if (!opcoes || opcoes.length === 0) {
    return `<section><p>Conclusão não disponível para o nível ${nivel} da área ${departamento}.</p></section>`;
  }

  const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
  const texto = opcoes[indiceAleatorio];

  return `
    <section id="conclusao-${departamento}-${nivel}">
      <p>${texto.trim().replace(/\n/g, "<br>")}</p>
    </section>
  `;
}

type AreaMaturidade = {
  nome: string;
  percentual: number;
};

type ContentDiagProps = {
  htmlIntroducao: string;
  areas: AreaMaturidade[];
  percentualGeral: any;
  clienteId: any;
};

type RespostaNegativa = {
  id: string;
  texto_pergunta: string;
  departamento: string;
  plano_acao: JSON;
  oportunidade: string;
  priorizacao: number;
  texto_afirmativa: string;
  texto_afirmativa_positiva: string;
};
// Função utilitária para obter o texto do nível com base no percentual
export function obterNivelTexto(porcentagem: number): string {
  if (porcentagem <= 37) return "Básico";
  if (porcentagem <= 70) return "Intermediário";
  return "Avançado";
}

// Renderiza lista de áreas com seus percentuais
function renderizarListaDeAreas(areas: AreaMaturidade[]) {
  if (!Array.isArray(areas)) return null;

  return (
    <ul className="list-disc pl-6 space-y-2">
      {areas.map((area, index) => (
        <li key={index}>
          <span className="font-medium">{area.nome}</span> — {area.percentual}%
          ({obterNivelTexto(area.percentual)})
        </li>
      ))}
    </ul>
  );
}

// Componente principal
export function ContentDiag({
  htmlIntroducao,
  areas,
  percentualGeral,
  clienteId,
}: ContentDiagProps) {
  const [respostasNegativas, setRespostasNegativas] = useState<
    RespostaNegativa[]
  >([]);

  const [respostasPositivas, setRespostasPositivas] = useState<
    RespostaNegativa[]
  >([]);

  useEffect(() => {
    async function buscarRespostasNegativas() {
      try {
        const response = await fetch(`${apiUrl}/answers/negative/${clienteId}`);
        if (!response.ok) throw new Error("Erro ao buscar respostas negativas");

        const data = await response.json();
        setRespostasNegativas(data);
      } catch (error) {
        console.error("Erro ao carregar respostas negativas:", error);
      }
    }

    if (clienteId) {
      buscarRespostasNegativas();
    }
  }, [clienteId]);

  useEffect(() => {
    async function buscarRespostasPositivas() {
      try {
        const response = await fetch(`${apiUrl}/answers/positive/${clienteId}`);
        if (!response.ok) throw new Error("Erro ao buscar respostas negativas");

        const data = await response.json();
        setRespostasPositivas(data);
      } catch (error) {
        console.error("Erro ao carregar respostas negativas:", error);
      }
    }

    if (clienteId) {
      buscarRespostasPositivas();
    }
  }, [clienteId]);

  function renderizarPontosFortes(
    departamento: string,
    respostas: RespostaNegativa[],
  ) {
    const pontosDoDepartamento = respostas.filter(
      (resposta) =>
        resposta.departamento.toLowerCase() === departamento.toLowerCase(),
    );

    if (pontosDoDepartamento.length === 0) {
      return (
        <p className="italic  mt-2">
          Nenhum ponto forte registrado para esta área.
        </p>
      );
    }

    return (
      <>
        <ul className=" p-5 grid grid-cols-2 gap-5">
          {pontosDoDepartamento.map((resposta) => (
            <li className="text-sm list-disc" key={resposta.id}>
              {resposta.texto_afirmativa_positiva}
            </li>
          ))}
        </ul>
      </>
    );
  }

  function renderizarPlanoAcao(
    departamento: string,
    respostas: RespostaNegativa[],
  ) {
    const planosDoDepartamento = respostas.filter(
      (resposta) =>
        resposta.departamento.toLowerCase() === departamento.toLowerCase(),
    );

    if (planosDoDepartamento.length === 0) {
      return (
        <p className="italic  mt-2">
          Nenhum plano de ação registrado para esta área.
        </p>
      );
    }

    return (
      <ul className="mt-4  grid grid-cols-2 gap-5">
        {planosDoDepartamento.map((resposta) => (
          <li key={resposta.id}>
            <strong className="text-[15px]">{resposta.texto_afirmativa}</strong>
            <div className="text-sm mt-2">
              {resposta.plano_acao
                ? Object.entries(resposta.plano_acao).map(([chave, valor]) => (
                    <p key={chave} className="mb-1">
                      <strong>{chave}:</strong> {valor as string}
                    </p>
                  ))
                : "Sem plano de ação definido."}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  const nivelGeral = obterNivelTexto(percentualGeral);

  // Busca o percentual da área "estrategias"
  const percentualEstrategias =
    areas.find((area) => area.nome.toLowerCase() === "estratégias")
      ?.percentual ?? 0;
  const textoEstrategias = selecionarTextoPorDepartamento(
    "estrategias",
    percentualEstrategias,
  );

  // Busca o percentual da área "Vendas"
  const percentualVendas =
    areas.find((area) => area.nome.toLowerCase() === "vendas")?.percentual ?? 0;
  const textoVendas = selecionarTextoPorDepartamento(
    "vendas",
    percentualVendas,
  );

  // Busca o percentual da área "Marketing"
  const percentualMarketing =
    areas.find((area) => area.nome.toLowerCase() === "marketing")?.percentual ??
    0;
  const textoMarketing = selecionarTextoPorDepartamento(
    "marketing",
    percentualMarketing,
  );

  // Busca o percentual da área "RH"
  const percentualRH =
    areas.find((area) => area.nome.toLowerCase() === "rh")?.percentual ?? 0;
  const textoRH = selecionarTextoPorDepartamento("RH", percentualRH);

  // Busca o percentual da área "Operações"
  const percentualOperacoes =
    areas.find((area) => area.nome.toLowerCase() === "operações")?.percentual ??
    0;
  const textoOperacoes = selecionarTextoPorDepartamento(
    "operações",
    percentualOperacoes,
  );

  // Busca o percentual da área "Tecnologia"
  const percentualTecnologia =
    areas.find((area) => area.nome.toLowerCase() === "tecnologia")
      ?.percentual ?? 0;
  const textoTecnologia = selecionarTextoPorDepartamento(
    "Tecnologia",
    percentualTecnologia,
  );

  // Busca o percentual da área "Finaceiro"
  const percentualFinanceiro =
    areas.find((area) => area.nome.toLowerCase() === "financeiro")
      ?.percentual ?? 0;
  const textoFinanceiro = selecionarTextoPorDepartamento(
    "Financeiro",
    percentualFinanceiro,
  );

  const conclusaoEstrategias = selecionarConclusaoPorDepartamento(
    "estrategias",
    percentualEstrategias,
  );
  const conclusaoVendas = selecionarConclusaoPorDepartamento(
    "vendas",
    percentualVendas,
  );
  const conclusaoMarketing = selecionarConclusaoPorDepartamento(
    "marketing",
    percentualMarketing,
  );
  const conclusaoRH = selecionarConclusaoPorDepartamento("rh", percentualRH);
  const conclusaoOperacoes = selecionarConclusaoPorDepartamento(
    "operacoes",
    percentualOperacoes,
  );
  const conclusaoTecnologia = selecionarConclusaoPorDepartamento(
    "tecnologia",
    percentualTecnologia,
  );
  const conclusaoFinanceiro = selecionarConclusaoPorDepartamento(
    "financeiro",
    percentualFinanceiro,
  );

  function ComponenteConclusao({ pontuacao }: { pontuacao: any }) {
    const conclusaoHtml = selecionarTextoConclusao(pontuacao);
    return <div dangerouslySetInnerHTML={{ __html: conclusaoHtml }} />;
  }

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-center font-bold text-3xl mb-8">
        Relatório de Diagnóstico Empresarial
      </h1>

      <section className="mb-10" id="intro">
        <h2 className="font-semibold text-2xl mb-4">Introdução</h2>
        <div
          className="text-justify leading-relaxed"
          dangerouslySetInnerHTML={{ __html: htmlIntroducao }}
        />
      </section>

      <section id="grau-por-area">
        <h2 className="font-semibold text-2xl mb-4">
          Grau de Maturidade das Áreas
        </h2>
        <p className="mb-4 ">
          A empresa foi avaliada em diferentes aspectos e apresenta o seguinte
          nível de maturidade por área:
        </p>

        {renderizarListaDeAreas(areas)}

        <p className="mt-6 ">
          A avaliação geral indica um nível <strong>{nivelGeral}</strong> de
          maturidade empresarial, com oportunidades significativas de melhoria.
          Atingindo um nível médio de maturidade de{" "}
          <strong>{percentualGeral}%</strong>.
        </p>

        <div id="estrategias">
          <h3 className="text-[17px] font-medium mt-5">Estratégias</h3>
          <h4 className="font-medium mt-5">Introdução:</h4>
          <div
            className="mt-2 "
            dangerouslySetInnerHTML={{ __html: textoEstrategias }}
          />
          <h4 className="mt-3 font-medium italic">Planos de ação:</h4>
          {renderizarPlanoAcao("estratégias", respostasNegativas)}
          <h4 className="mt-3 font-medium italic">Pontos fortes:</h4>
          {renderizarPontosFortes("estratégias", respostasPositivas)}
          <h4 className="font-medium mt-4 mb-2">Conclusão</h4>
          <div
            className="border-b pb-5 "
            dangerouslySetInnerHTML={{ __html: conclusaoEstrategias }}
          />
        </div>

        <div id="vendas">
          <h3 className="text-[17px] font-medium mt-5">Vendas</h3>
          <h4 className="font-medium mt-5">Introdução:</h4>
          <div
            className=" mt-2 "
            dangerouslySetInnerHTML={{ __html: textoVendas }}
          />
          <h4 className="mt-3 font-medium italic">Planos de ação:</h4>
          {renderizarPlanoAcao("vendas", respostasNegativas)}
          <h4 className="mt-3 font-medium italic">Pontos fortes:</h4>
          {renderizarPontosFortes("vendas", respostasPositivas)}
          <h4 className="font-medium mt-4 mb-2">Conclusão</h4>
          <div
            className="border-b pb-5 "
            dangerouslySetInnerHTML={{ __html: conclusaoVendas }}
          />
        </div>

        <div id="marketing">
          <h3 className="text-[17px] font-medium mt-5">Marketing</h3>
          <h4 className="font-medium mt-5">Introdução:</h4>
          <div
            className=" mt-2 "
            dangerouslySetInnerHTML={{ __html: textoMarketing }}
          />
          <h4 className="mt-3 font-medium italic">Planos de ação:</h4>
          {renderizarPlanoAcao("marketing", respostasNegativas)}
          <h4 className="mt-3 font-medium italic">Pontos fortes:</h4>
          {renderizarPontosFortes("marketing", respostasPositivas)}
          <h4 className="font-medium mt-4 mb-2">Conclusão</h4>
          <div
            className="border-b pb-5 "
            dangerouslySetInnerHTML={{ __html: conclusaoMarketing }}
          />
        </div>

        <div id="rh">
          <h3 className="text-[17px] font-medium mt-5">RH</h3>
          <h4 className="font-medium mt-5">Introdução:</h4>
          <div
            className=" mt-2 "
            dangerouslySetInnerHTML={{ __html: textoRH }}
          />
          <h4 className="mt-3 font-medium italic">Planos de ação:</h4>
          {renderizarPlanoAcao("rh", respostasNegativas)}
          <h4 className="mt-3 font-medium italic">Pontos fortes:</h4>
          {renderizarPontosFortes("rh", respostasPositivas)}
          <h4 className="font-medium mt-4 mb-2">Conclusão</h4>
          <div
            className="border-b pb-5 "
            dangerouslySetInnerHTML={{ __html: conclusaoRH }}
          />
        </div>

        <div id="operacoes">
          <h3 className="text-[17px] font-medium mt-5">Operações</h3>
          <h4 className="font-medium mt-5">Introdução:</h4>
          <div
            className=" mt-2 "
            dangerouslySetInnerHTML={{ __html: textoOperacoes }}
          />
          <h4 className="mt-3 font-medium italic">Planos de ação:</h4>
          {renderizarPlanoAcao("operações", respostasNegativas)}
          <h4 className="mt-3 font-medium italic">Pontos fortes:</h4>
          {renderizarPontosFortes("operações", respostasPositivas)}
          <h4 className="font-medium mt-4 mb-2">Conclusão</h4>
          <div
            className="border-b pb-5 "
            dangerouslySetInnerHTML={{ __html: conclusaoOperacoes }}
          />
        </div>

        <div id="tecnologia">
          <h3 className="text-[17px] font-medium mt-5">Tecnologia</h3>
          <h4 className="font-medium mt-5">Introdução:</h4>
          <div
            className=" mt-2 "
            dangerouslySetInnerHTML={{ __html: textoTecnologia }}
          />
          <h4 className="mt-3 font-medium italic">Planos de ação:</h4>
          {renderizarPlanoAcao("tecnologia", respostasNegativas)}
          <h4 className="mt-3 font-medium italic">Pontos fortes:</h4>
          {renderizarPontosFortes("tecnologia", respostasPositivas)}
          <h4 className="font-medium mt-4 mb-2">Conclusão</h4>
          <div
            className="border-b pb-5 "
            dangerouslySetInnerHTML={{ __html: conclusaoTecnologia }}
          />
        </div>

        <div id="financeiro">
          <h3 className="text-[17px] font-medium mt-5">Financeiro</h3>
          <h4 className="font-medium mt-5">Introdução:</h4>
          <div
            className=" mt-2 "
            dangerouslySetInnerHTML={{ __html: textoFinanceiro }}
          />
          <h4 className="mt-3 font-medium italic">Planos de ação:</h4>
          {renderizarPlanoAcao("financeiro", respostasNegativas)}
          <h4 className="mt-3 font-medium italic">Pontos fortes:</h4>
          {renderizarPontosFortes("financeiro", respostasPositivas)}
          <h4 className="font-medium mt-4 mb-2">Conclusão</h4>
          <div
            className="border-b pb-5 "
            dangerouslySetInnerHTML={{ __html: conclusaoFinanceiro }}
          />
        </div>
      </section>
      {/* <section>
        <h2 className="font-semibold text-2xl mb-4 mt-5">Mapa de Oportunidade | Tabela de Ice FrameWork</h2>
        <table className="min-w-full table-auto border border-accent">
          <thead>
            <tr className="bg-accent">
              <th className="border border-accent px-4 py-2 text-left">Departamento</th>
              <th className="border border-accent px-4 py-2 text-left">Oportunidade</th>
              <th className="border border-accent px-4 py-2 text-left">Priorização</th>
            </tr>
          </thead>
          <tbody>
            {[
              "estratégias",
              "vendas",
              "marketing",
              "rh",
              "operações",
              "tecnologia",
              "financeiro"
            ].flatMap((departamento) => {
              const oportunidades = respostasNegativas
                .filter(resposta => resposta.departamento.toLowerCase() === departamento.toLowerCase())
                .filter(resposta => resposta.oportunidade && typeof resposta.priorizacao === "number")
                .sort((a, b) => b.priorizacao - a.priorizacao);

              if (oportunidades.length === 0) {
                return (
                  <tr key={departamento}>
                    <td className="border border-accent px-4 py-2 capitalize">
                      {departamento.charAt(0).toUpperCase() + departamento.slice(1)}
                    </td>
                    <td className="border border-accent px-4 py-2 italic text-gray-500" colSpan={2}>
                      Nenhuma oportunidade encontrada.
                    </td>
                  </tr>
                );
              }

              return oportunidades.map((resposta, index) => (
                <tr key={`${departamento}-${index}`}>
                  <td className="border border-accent px-4 py-2 capitalize">
                    {departamento.charAt(0).toUpperCase() + departamento.slice(1)}
                  </td>
                  <td className="border border-accent px-4 py-2">{resposta.oportunidade}</td>
                  <td className="border border-accent px-4 py-2">{resposta.priorizacao}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </section> */}

      <section>
        <h2 className="font-semibold text-2xl mt-10 mb-2">
          Considerações Finais
        </h2>
        <ComponenteConclusao pontuacao={percentualGeral} />
      </section>

      <h3 className="font-medium mt-10">
        "O segredo da mudança é focar toda a sua energia não em lutar contra o
        velho, mas em construir o novo." - Sócrates
      </h3>
    </div>
  );
}
