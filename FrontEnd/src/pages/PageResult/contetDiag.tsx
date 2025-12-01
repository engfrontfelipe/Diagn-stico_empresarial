// ContentDiag.tsx — VERSÃO FINAL CORRIGIDA (Estratégias e Operações agora aparecem!)
import { useEffect, useState } from "react";
import {
  introducoes,
  consideracoesFinais,
  introducoesEstrategia,
  introducoesVendas,
  introducoesMarketing,
  introducoesRH,
  introducoesOperacoes,
  introducoesTecnologia,
  introducoesFinanceiro,
  conclusoesEstrategia,
  conclusoesVendas,
  conclusoesMarketing,
  conclusoesRH,
  conclusoesOperacoes,
  conclusoesTecnologia,
  conclusoesFinanceiro,
  MaturidadeNivel,
} from "../Client/StaticDictionary";

const apiUrl = "https://backend-backend-diagnostico.yjayid.easypanel.host";

// ======================== FUNÇÃO DE NORMALIZAÇÃO (REMOVE ACENTOS E Ç) ========================
const normalizar = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]/g, ""); // opcional: remove qualquer coisa que não seja letra/número
};

// ======================== FUNÇÕES DE NÍVEL E TEXTOS ========================
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

const introducoesPorDepartamento: Record<string, Record<MaturidadeNivel, string[]>> = {
  estrategias: introducoesEstrategia,
  vendas: introducoesVendas,
  marketing: introducoesMarketing,
  rh: introducoesRH,
  operacoes: introducoesOperacoes,
  tecnologia: introducoesTecnologia,
  financeiro: introducoesFinanceiro,
};

const conclusoesPorDepartamento: Record<string, Record<MaturidadeNivel, string[]>> = {
  estrategias: conclusoesEstrategia,
  vendas: conclusoesVendas,
  marketing: conclusoesMarketing,
  rh: conclusoesRH,
  operacoes: conclusoesOperacoes,
  tecnologia: conclusoesTecnologia,
  financeiro: conclusoesFinanceiro,
};

export function selecionarTextoPorDepartamento(departamento: string, pontuacao: number): string {
  if (pontuacao === 0) return "";
  const nivel = obterNivelMaturidade(pontuacao);
  const intros = introducoesPorDepartamento[departamento.toLowerCase()] || introducoes;
  const opcoes = intros[nivel];
  if (!opcoes || opcoes.length === 0) return "";

  const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
  const texto = opcoes[indiceAleatorio];

  return `
    <section id="introducao-${departamento}-${nivel}">
      <p>${texto.trim().replace(/\n/g, "<br>")}</p>
    </section>
  `;
}

export function selecionarConclusaoPorDepartamento(departamento: string, pontuacao: number): string {
  if (pontuacao === 0) return "";
  const nivel = obterNivelMaturidade(pontuacao);
  const conclusoes = conclusoesPorDepartamento[departamento.toLowerCase()];
  if (!conclusoes) return "";

  const opcoes = conclusoes[nivel];
  if (!opcoes || opcoes.length === 0) return "";

  const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
  const texto = opcoes[indiceAleatorio];

  return `
    <section id="conclusao-${departamento}-${nivel}">
      <p>${texto.trim().replace(/\n/g, "<br>")}</p>
    </section>
  `;
}

// ======================== TIPOS ========================
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
  plano_acao: any;
  oportunidade: string;
  priorizacao: number;
  texto_afirmativa: string;
  texto_afirmativa_positiva: string;
};

export function obterNivelTexto(porcentagem: number): string {
  if (porcentagem <= 37) return "Básico";
  if (porcentagem <= 70) return "Intermediário";
  return "Avançado";
}

// ======================== RENDERIZAÇÃO DE LISTAS ========================
function renderizarListaDeAreas(areas: AreaMaturidade[]) {
  if (!Array.isArray(areas) || areas.length === 0) return null;

  const areasValidas = areas.filter((area) => area.percentual > 0);
  if (areasValidas.length === 0) {
    return <p className="text-muted-foreground">Nenhuma área avaliada.</p>;
  }

  return (
    <ul className="list-disc pl-6 space-y-2">
      {areasValidas.map((area, index) => (
        <li key={index}>
          <span className="font-medium">{area.nome}</span> — {area.percentual}% ({obterNivelTexto(area.percentual)})
        </li>
      ))}
    </ul>
  );
}

function renderizarPontosFortes(departamento: string, respostas: RespostaNegativa[]) {
  const pontos = respostas.filter((r) => normalizar(r.departamento) === departamento);

  if (pontos.length === 0) return null;

  return (
    <ul className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
      {pontos.map((resposta) => (
        <li className="text-sm list-disc" key={resposta.id}>
          {resposta.texto_afirmativa_positiva}
        </li>
      ))}
    </ul>
  );
}

function renderizarPlanoAcao(departamento: string, respostas: RespostaNegativa[]) {
  const planos = respostas.filter((r) => normalizar(r.departamento) === departamento);

  if (planos.length === 0) return null;

  return (
    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
      {planos.map((resposta) => (
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

function ComponenteConclusao({ pontuacao }: { pontuacao: any }) {
  const conclusaoHtml = selecionarTextoConclusao(pontuacao);
  return <div dangerouslySetInnerHTML={{ __html: conclusaoHtml }} />;
}

// ======================== COMPONENTE PRINCIPAL ========================
export function ContentDiag({
  htmlIntroducao,
  areas,
  percentualGeral,
  clienteId,
}: ContentDiagProps) {
  const [respostasNegativas, setRespostasNegativas] = useState<RespostaNegativa[]>([]);
  const [respostasPositivas, setRespostasPositivas] = useState<RespostaNegativa[]>([]);

  useEffect(() => {
    const buscarRespostas = async () => {
      if (!clienteId) return;

      try {
        const [resNeg, resPos] = await Promise.all([
          fetch(`${apiUrl}/answers/negative/${clienteId}`),
          fetch(`${apiUrl}/answers/positive/${clienteId}`),
        ]);

        const negativas = await resNeg.json();
        const positivas = await resPos.json();

        setRespostasNegativas(negativas);
        setRespostasPositivas(positivas);
      } catch (err) {
        console.error("Erro ao carregar respostas:", err);
      }
    };

    buscarRespostas();
  }, [clienteId]);

  const nivelGeral = obterNivelTexto(percentualGeral);

  // FUNÇÃO QUE RENDEIZA CADA ÁREA (AGORA COM NORMALIZAÇÃO DE ACENTOS)
  const renderizarArea = (nomeNormalizado: string, nomeExibicao: string) => {
    const area = areas.find((a) => normalizar(a.nome) === nomeNormalizado);
    if (!area || area.percentual === 0) return null;

    const textoIntro = selecionarTextoPorDepartamento(nomeNormalizado, area.percentual);
    const textoConclusao = selecionarConclusaoPorDepartamento(nomeNormalizado, area.percentual);

    return (
      <div id={nomeNormalizado} className="mt-8 border-b pb-8 last:border-0">
        <h3 className="text-xl font-semibold text-primary">{nomeExibicao}</h3>

        {textoIntro && (
          <>
            <h4 className="font-medium mt-5">Análise</h4>
            <div className="mt-2 text-justify" dangerouslySetInnerHTML={{ __html: textoIntro }} />
          </>
        )}

        <h4 className="mt-5 font-medium italic">Oportunidades de Melhoria</h4>
        {renderizarPlanoAcao(nomeNormalizado, respostasNegativas) || (
          <p className="text-sm text-muted-foreground italic">Nenhuma oportunidade identificada.</p>
        )}

        <h4 className="mt-5 font-medium italic">Pontos Fortes</h4>
        {renderizarPontosFortes(nomeNormalizado, respostasPositivas) || (
          <p className="text-sm text-muted-foreground italic">Nenhum ponto forte identificado.</p>
        )}

        {textoConclusao && (
          <>
            <h4 className="font-medium mt-6 mb-2">Conclusão</h4>
            <div dangerouslySetInnerHTML={{ __html: textoConclusao }} />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 mx-auto w-full">
      <h1 className="text-center font-bold text-4xl mb-10 text-primary">
        Relatório de Diagnóstico Empresarial
      </h1>

      <section className="mb-12" id="intro">
        <h2 className="font-bold text-2xl mb-6">Introdução</h2>
        <div
          className="text-justify leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: htmlIntroducao }}
        />
      </section>

      <section id="grau-por-area" className="mb-12">
        <h2 className="font-bold text-2xl mb-6">Grau de Maturidade das Áreas Avaliadas</h2>
        <p className="mb-6 text-lg">
          A empresa foi avaliada nas seguintes áreas com base nas respostas fornecidas:
        </p>

        {renderizarListaDeAreas(areas)}

        <p className="mt-8 text-lg">
          A avaliação geral indica um nível <strong className="text-primary">{nivelGeral}</strong> de
          maturidade empresarial, com uma pontuação média de{" "}
          <strong className="text-primary">{percentualGeral}%</strong>.
        </p>
      </section>

      {/* ÁREAS DINÂMICAS — AGORA FUNCIONA COM ACENTOS! */}
      {renderizarArea("estrategias", "Estratégias")}
      {renderizarArea("vendas", "Vendas")}
      {renderizarArea("marketing", "Marketing")}
      {renderizarArea("rh", "Recursos Humanos")}
      {renderizarArea("operacoes", "Operações")}
      {renderizarArea("tecnologia", "Tecnologia")}
      {renderizarArea("financeiro", "Financeiro")}

      <section className="mt-16">
        <h2 className="font-bold text-2xl mb-6">Considerações Finais</h2>
        <div className="text-lg leading-relaxed">
          <ComponenteConclusao pontuacao={percentualGeral} />
        </div>
      </section>

      <div className="mt-16 text-center italic text-lg text-muted-foreground">
        <p>
          "O segredo da mudança é focar toda a sua energia não em lutar contra o velho, mas em
          construir o novo." — Sócrates
        </p>
      </div>
    </div>
  );
}