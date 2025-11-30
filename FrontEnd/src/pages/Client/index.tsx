import { useState } from "react";
import confetti from "canvas-confetti";
import { FileDown, Loader2 } from "lucide-react";
import {
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
  consideracoesFinais,
} from "../Client/StaticDictionary";

import {
  obterNivelMaturidade,
  obterNivelTexto,
} from "../PageResult/contetDiag";

const apiUrl = "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host";

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

const capitalizeWords = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function renderizarListaDeAreasHtml(areas: AreaMaturidade[]): string {
  const areasValidas = areas.filter((a) => a.percentual > 0);
  if (areasValidas.length === 0) return "<p>Nenhuma área avaliada.</p>";

  const itens = areasValidas
    .map(
      (area) =>
        `<li><strong>${area.nome}</strong> — ${area.percentual}% (${obterNivelTexto(area.percentual)})</li>`,
    )
    .join("");

  return `
    <section id="lista-de-areas">
      <h3>Resumo das Áreas Avaliadas</h3>
      <p>A empresa foi avaliada em diferentes aspectos e apresenta o seguinte nível de maturidade por área:</p>
      <ul>${itens}</ul>
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
  if (pontuacao === 0) return "";

  const nivel = obterNivelMaturidade(pontuacao);
  const chaveDepto = departamento.toLowerCase();
  const intros = introducoesPorDepartamento[chaveDepto];

  const opcoes = intros?.[nivel];
  if (!opcoes || opcoes.length === 0) return "";

  const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
  const textoSelecionado = opcoes[indiceAleatorio];

  return `
    <section id="introducao-${chaveDepto}">
      <h3>${capitalizeWords(chaveDepto)}</h3>
      <h4>Introdução</h4>
      <p>${textoSelecionado.trim().replace(/\n/g, "<br>")}</p>
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

  if (planosDoDepartamento.length === 0) return "";

  const listaItens = planosDoDepartamento
    .map((resposta) => {
      const planos = resposta.plano_acao
        ? Object.entries(resposta.plano_acao)
            .map(
              ([chave, valor]) => `<p><strong>${chave}:</strong> ${valor}</p>`,
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
  const pontosDoDepartamento = respostas.filter(
    (resposta) =>
      typeof resposta.departamento === "string" &&
      resposta.departamento.toLowerCase() === departamento.toLowerCase(),
  );

  if (pontosDoDepartamento.length === 0) return "";

  const listaPontos = pontosDoDepartamento
    .map(
      (resposta) =>
        `<li>${resposta.texto_afirmativa_positiva || "Sem ponto forte definido."}</li>`,
    )
    .join("");

  return `
    <div>
      <h4>Pontos fortes Identificados</h4>
      <ul>${listaPontos}</ul>
    </div>
  `;
}

export function selecionarConclusaoPorDepartamento(
  departamento: string,
  pontuacao: number,
): string {
  if (pontuacao === 0) return "";

  const nivel = obterNivelMaturidade(pontuacao);
  const conclusoes = conclusoesPorDepartamento[departamento.toLowerCase()];
  if (!conclusoes) return "";

  const opcoes = conclusoes[nivel];
  if (!opcoes || opcoes.length === 0) return "";

  const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
  const textoSelecionado = opcoes[indiceAleatorio];

  return `
    <section id="conclusao-${departamento}-${nivel}">
      <h4>Conclusão do Departamento</h4>
      <p>${textoSelecionado.trim().replace(/\n/g, "<br>")}</p>
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
        <p>${texto}</p>
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

  const getDepartamentoHtml = (_nome: string, id: string) => {
    const area = dadosPorDepartamento.find((a) => a.nome.toLowerCase() === id);
    const pontuacao = area ? area.percentual : 0;
    if (pontuacao === 0) return ""; // IGNORA TOTALMENTE

    const introducao = selecionarTextoPorDepartamento(id, pontuacao);
    const planosHtml = renderizarPlanoAcaoHtml(id, respostasNegativas);
    const pontosHtml = renderizarPontosHtml(id, respostasPositivas);
    const conclusaoHtml = selecionarConclusaoPorDepartamento(id, pontuacao);

    return `
      <div class="page">
        <section class="page-content" id="${id}">
          ${introducao}${planosHtml}${pontosHtml}${conclusaoHtml}
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

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
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
