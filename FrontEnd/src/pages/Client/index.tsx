const apiUrl = "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host/";

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

import {
  conclusoesEstrategia,
  conclusoesVendas,
  conclusoesMarketing,
  conclusoesRH,
  conclusoesOperacoes,
  conclusoesTecnologia,
  conclusoesFinanceiro,
} from "../Client/StaticDictionary";

import {
  obterNivelMaturidade,
  obterNivelTexto,
} from "../PageResult/contetDiag";

import { consideracoesFinais } from "../Client/StaticDictionary";
import { useState } from "react";
import confetti from "canvas-confetti";
import { FileDown, Loader2 } from "lucide-react";

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

type AreaMaturidade = {
  nome: string;
  percentual: number;
};

const introducoesPorDepartamento: Record<
  string,
  Record<MaturidadeNivel, string[]>
> = {
  estratégias: introducoesEstrategia,
  vendas: introducoesVendas,
  marketing: introducoesMarketing,
  rh: introducoesRH,
  operações: introducoesOperacoes,
  tecnologia: introducoesTecnologia,
  financeiro: introducoesFinanceiro,
};

const conclusoesPorDepartamento: Record<
  string,
  Record<MaturidadeNivel, string[]>
> = {
  estratégias: conclusoesEstrategia,
  vendas: conclusoesVendas,
  marketing: conclusoesMarketing,
  rh: conclusoesRH,
  operações: conclusoesOperacoes,
  tecnologia: conclusoesTecnologia,
  financeiro: conclusoesFinanceiro,
};

const capitalizeWords = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function renderizarListaDeAreasHtml(areas: AreaMaturidade[]): string {
  if (!Array.isArray(areas)) return "";

  const itens = areas
    .map(
      (area) =>
        `<li><strong>${area.nome}</strong> — ${area.percentual}% (${obterNivelTexto(area.percentual)})</li>`,
    )
    .join("");

  return `
    <section id="lista-de-areas">
      <h3>Resumo das Áreas Avaliadas</h3>
      <p>A empresa foi avaliada em diferentes aspectos e apresenta o seguinte nível de maturidade por área:</p>
      <ul>
        ${itens}
      </ul>
    </section>
  `;
}

function gerarTabelaOportunidadesHtml(
  respostasNegativas: RespostaNegativa[],
): string {
  if (!Array.isArray(respostasNegativas) || respostasNegativas.length === 0) {
    return `
      <section id="mapa-oportunidade">
        <p>Nenhuma oportunidade encontrada.</p>
      </section>
    `;
  }

  const linhas = respostasNegativas
    .sort((a, b) => (b.priorizacao ?? 0) - (a.priorizacao ?? 0))
    .map((resposta) => {
      return `
      <tr>
        <td>${capitalizeWords(resposta.departamento)}</td>
        <td>${resposta.priorizacao ?? "-"}</td>
        <td>${resposta.oportunidade ?? "-"}</td>
        <td>${resposta.texto_pergunta}</td>
      </tr>
    `;
    })
    .join("");

  return `
    <section id="mapa-oportunidade">
      <table>
        <thead>
          <tr>
            <th>Departamento</th>
            <th>Prioridade</th>
            <th>Oportunidade</th>
            <th>Questão Identificada</th>
          </tr>
        </thead>
        <tbody>
          ${linhas}
        </tbody>
      </table>
    </section>
  `;
}

function selecionarTextoPorDepartamento(
  departamento: string,
  pontuacao: number,
): string {
  const nivel = obterNivelMaturidade(pontuacao);
  const chaveDepto = departamento.toLowerCase();
  const intros = introducoesPorDepartamento[chaveDepto];

  const opcoes = intros?.[nivel];
  if (!opcoes || opcoes.length === 0) {
    return `
      <section>
        <p>Introdução não disponível para o nível ${nivel} da área ${departamento}.</p>
      </section>
    `;
  }

  const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
  const texto = opcoes[indiceAleatorio];

  return `
    <section id="introducao-${chaveDepto}">
      <h3>${capitalizeWords(chaveDepto)}</h3>
      <h4>Introdução</h4>
      <p>${texto.trim().replace(/\n/g, "<br>")}</p>
    </section>
  `;
}

function renderizarPlanoAcaoHtml(
  departamento: string,
  respostas: RespostaNegativa[],
): string {
  const planosDoDepartamento = respostas.filter(
    (resposta) =>
      typeof resposta.departamento === "string" &&
      resposta.departamento.toLowerCase() === departamento.toLowerCase(),
  );

  if (planosDoDepartamento.length === 0) {
    return `
      <p>Nenhum plano de ação registrado para esta área.</p>
    `;
  }

  const listaItens = planosDoDepartamento
    .map((resposta) => {
      const planos = resposta.plano_acao
        ? Object.entries(resposta.plano_acao)
            .map(
              ([chave, valor]) => `
            <p><strong>${chave}:</strong> ${valor}</p>
          `,
            )
            .join("")
        : `<p>Sem plano de ação definido.</p>`;

      return `
      <div class="">
        <p><strong>${resposta.texto_afirmativa}</strong></p>
        ${planos}
      </div>
    `;
    })
    .join("");

  return `
    <div>
      <h4>Planos de Ação</h4>
      ${listaItens}
    </div>
  `;
}

function renderizarPontosHtml(
  departamento: string,
  respostas: RespostaNegativa[],
): string {
  const planosDoDepartamento = respostas.filter(
    (resposta) =>
      typeof resposta.departamento === "string" &&
      resposta.departamento.toLowerCase() === departamento.toLowerCase(),
  );

  if (planosDoDepartamento.length === 0) {
    return `<p>Nenhum plano de ação registrado para esta área.</p>`;
  }

  const listaPontos = planosDoDepartamento
    .map((resposta) => {
      const ponto = resposta.texto_afirmativa_positiva;

      return `
        <ul>
          <li>${ponto || "Sem ponto forte definido."}</li>
        </ul>
      `;
    })
    .join("");

  return `
    <div>
      <h4>Pontos fortes Identificados</h4>
      ${listaPontos}
    </div>
  `;
}

export function selecionarConclusaoPorDepartamento(
  departamento: string,
  pontuacao: number,
): string {
  const nivel = obterNivelMaturidade(pontuacao);
  const conclusoes = conclusoesPorDepartamento[departamento.toLowerCase()];
  if (!conclusoes) {
    return `
      <section>
        <p>Conclusão não disponível para a área ${departamento}.</p>
      </section>
    `;
  }

  const opcoes = conclusoes[nivel];
  if (!opcoes || opcoes.length === 0) {
    return `
      <section>
        <p>Conclusão não disponível para o nível ${nivel} da área ${departamento}.</p>
      </section>
    `;
  }

  const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
  const texto = opcoes[indiceAleatorio];

  return `
    <section id="conclusao-${departamento}-${nivel}">
      <h4>Conclusão do Departamento</h4>
      <p>${texto.trim().replace(/\n/g, "<br>")}</p>
    </section>
  `;
}

export function selecionarTextoConclusao(pontuacao: number): string {
  const nivel = obterNivelMaturidade(pontuacao);
  const texto = consideracoesFinais[nivel];

  if (!texto) {
    return `
      <section>
        <p>Conclusão não disponível para o nível ${nivel}.</p>
      </section>
    `;
  }

  return `
    <div class="page">
      <section id="conclusao-geral" class="page-content">
        <h2>Conclusão Geral</h2>
        <p>${texto.trim().replace(/\n/g, "<br>")}</p>
        <p>A pontuação final da empresa foi <strong>${pontuacao}</strong>, o que indica um nível de maturidade de <strong>${obterNivelTexto(pontuacao)}</strong>.</p>
        <p>Recomendamos que a empresa priorize as áreas com maior percentual de maturidade para alcançar um desempenho mais equilibrado e eficiente.</p>
        <p><strong>"O segredo da mudança é focar toda a sua energia não em lutar contra o velho, mas em construir o novo." - Sócrates</strong></p>
      </section>
    </div>
  `;
}

export const handleGeneratePDF = async (
  introGeral: string,
  dadosPorDepartamento: { nome: string; percentual: number }[],
  respostasNegativas: any,
  pontuacaoFinal: any,
  respostasPositivas: any,
  logoCliente2: string,
) => {
  const listaAreasHtml = renderizarListaDeAreasHtml(dadosPorDepartamento);
  const tabelaOportunidadesHtml =
    gerarTabelaOportunidadesHtml(respostasNegativas);
  const conclusaoGeralHtml = selecionarTextoConclusao(pontuacaoFinal);
  const logoCliente = logoCliente2;

  const getDepartamentoHtml = (nome: string, id: string) => {
    const area = dadosPorDepartamento.find((a) => a.nome.toLowerCase() === id);
    const pontuacao = area ? area.percentual : 0;
    const introducao = selecionarTextoPorDepartamento(id, pontuacao);
    const planosHtml = renderizarPlanoAcaoHtml(id, respostasNegativas);
    const pontosHtml = renderizarPontosHtml(id, respostasPositivas);
    const conclusaoHtml = selecionarConclusaoPorDepartamento(id, pontuacao);

    return introducao || planosHtml || conclusaoHtml || logoCliente
      ? `
        <div class="page">
          <section class="page-content" id="${id}">
            ${introducao}${planosHtml}${pontosHtml}${conclusaoHtml}
          </section>
        </div>
      `
      : `
        <div class="page">
          <section class="page-content" id="${id}">
            <p>Conteúdo não disponível para ${nome}.</p>
          </section>
        </div>
      `;
  };

  const htmlFinal = `
    <div>
      <section id="intro" class="page">
        <div class="page-content">
          <h2>1. Introdução Geral</h2>
          <p>${introGeral}</p>
        </div>
      </section>
      <section class="page" id="maturidade">
        <div class="page-content">
          <h2>2. Grau de Maturidade das Áreas</h2>
          ${listaAreasHtml}
        </div>
      </section>
      ${getDepartamentoHtml("Marketing", "marketing")}
      ${getDepartamentoHtml("Operações", "operações")}
      ${getDepartamentoHtml("Vendas", "vendas")}
      ${getDepartamentoHtml("RH", "rh")}
      ${getDepartamentoHtml("Estratégias", "estratégias")}
      ${getDepartamentoHtml("Financeiro", "financeiro")}
      ${getDepartamentoHtml("Tecnologia", "tecnologia")}
      <section class="page" id="mapa-oportunidade">
        <div class="page-content">
          <h2>3. Mapa de Oportunidade | Tabela de Ice FrameWork</h2>
          ${tabelaOportunidadesHtml}
        </div>
      </section>
      <section class="page" id="conclusao">
        <div class="page-content">
          ${conclusaoGeralHtml}
        </div>
      </section>
    </div>
  `;

  const response = await fetch(`${apiUrl}/generate-pdf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Relatório De Diagnóstico Empresarial",
      intro: introGeral,
      introPorDp: htmlFinal,
      logoCliente: logoCliente,
    }),
  });

  if (!response.ok) throw new Error("Erro ao gerar o PDF");

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "relatorio.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

type Props = {
  introGeral: string;
  dadosPorDepartamento: { nome: string; percentual: number }[];
  respostasNegativas: any;
  pontuacaoFinal: any;
  respostasPositivas: any;
  logoCliente: any;
};

export const GeradorRelatorioPDF: React.FC<Props> = ({
  introGeral,
  dadosPorDepartamento,
  respostasNegativas,
  pontuacaoFinal,
  respostasPositivas,
  logoCliente,
}) => {
  const [loading, setLoading] = useState(false);

  const gerarPDF = async () => {
    setLoading(true);
    try {
      await handleGeneratePDF(
        introGeral,
        dadosPorDepartamento,
        respostasNegativas,
        pontuacaoFinal,
        respostasPositivas,
        logoCliente,
      );

      const confettiInstance = confetti.create(undefined, {
        useWorker: true,
        resize: true,
      });

      const duration = 3000;
      const interval = 250;
      const end = Date.now() + duration;

      const confettiInterval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(confettiInterval);
          return;
        }

        confettiInstance({
          particleCount: 100,
          spread: 100,
          startVelocity: 30,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.6,
          },
        });
      }, interval);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 flex justify-end mr-5 relative group">
      <button
        onClick={gerarPDF}
        disabled={loading}
        className="cursor-pointer bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 hover:scale-102 transition disabled:opacity-50"
        title="Baixar relatório"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={20} />
            Gerando PDF...
          </span>
        ) : (
          <p className="flex gap-2 items-center animate-pulse">
            Gerar Relatório <FileDown size={20} />
          </p>
        )}
      </button>
    </div>
  );
};
