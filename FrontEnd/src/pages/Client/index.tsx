const apiUrl = import.meta.env.VITE_API_URL;

import {
  introducoesEstrategia,
  introducoesVendas,
  introducoesMarketing,
  introducoesRH,
  introducoesOperacoes,
  introducoesTecnologia,
  introducoesFinanceiro,
  MaturidadeNivel
} from "../Client/StaticDictionary";

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

import { obterNivelMaturidade, obterNivelTexto} from "../PageResult/contetDiag";

import { consideracoesFinais } from "../Client/StaticDictionary";

type RespostaNegativa = {
  id: string;
  texto_pergunta: string;
  departamento: string;
  plano_acao: JSON
  oportunidade: string;
  priorizacao: number
  texto_afirmativa: string;
};
type AreaMaturidade = {
  nome: string;
  percentual: number;
};

const introducoesPorDepartamento: Record<string, Record<MaturidadeNivel, string[]>> = {
  estratégias: introducoesEstrategia,
  vendas: introducoesVendas,
  marketing: introducoesMarketing,
  rh: introducoesRH,
  operações: introducoesOperacoes,
  tecnologia: introducoesTecnologia,
  financeiro: introducoesFinanceiro
};

const conclusoesPorDepartamento: Record<string, Record<MaturidadeNivel, string[]>> = {
  estrategias: conclusoesEstrategia,
  vendas: conclusoesVendas,
  marketing: conclusoesMarketing,
  rh: conclusoesRH,
  operacoes: conclusoesOperacoes,
  tecnologia: conclusoesTecnologia,
  financeiro: conclusoesFinanceiro
};



const capitalizeWords = (str: string) => {
  return str
    .toLowerCase() // Converte tudo para minúsculo para padronizar
    .split(' ') // Divide a string em palavras
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza a primeira letra de cada palavra
    .join(' '); // Junta as palavras novamente
};

function renderizarListaDeAreasHtml(areas: AreaMaturidade[]): string {
  if (!Array.isArray(areas)) return '';

  const itens = areas.map(
    area =>
      `<li><strong>${area.nome}</strong> — ${area.percentual}% (${obterNivelTexto(area.percentual)})</li>`
  ).join('');

  return `
    <section id="lista-de-areas">
      <h3>Resumo das Áreas Avaliadas</h3>
      <p>A empresa foi avaliada em diferentes aspectos e apresenta o seguinte nível de maturidade por área:</p>
      <ul style="padding-left: 20px; list-style: disc; line-height: 1.6;">
        ${itens}
      </ul>
    </section>
  `;
}


function gerarTabelaOportunidadesHtml(respostasNegativas: RespostaNegativa[]): string {
  if (!Array.isArray(respostasNegativas) || respostasNegativas.length === 0) {
    return `<section id="mapa-oportunidade"><h3>Mapa de Oportunidade | Tabela de Ice FrameWork</h3>
    <p>Nenhuma oportunidade encontrada.</p></section>`;
  }

  const linhas = respostasNegativas
  .sort((a, b) => (b.priorizacao ?? 0) - (a.priorizacao ?? 0))
  .map(resposta => {
    return `
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px;">${capitalizeWords(resposta.departamento)}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${resposta.priorizacao ?? '-'}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${resposta.oportunidade ?? '-'}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${resposta.texto_pergunta}</td>
      </tr>
    `;
  }).join('');

  return `
    <section id="mapa-oportunidade" style="margin-top: 30px;">
      <h3>Mapa de Oportunidade | Tabela de Ice FrameWork</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background-color: #f3f3f3;">
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Departamento</th>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Prioridade</th>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Oportunidade</th>
            <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Questão Identificada</th>
          </tr>
        </thead>
        <tbody>
          ${linhas}
        </tbody>
      </table>
    </section>
    <div class="page-break"/>
  `;
}

function selecionarTextoPorDepartamento(departamento: string, pontuacao: number): string {
  const nivel = obterNivelMaturidade(pontuacao);
  const chaveDepto = departamento.toLowerCase();
  const intros = introducoesPorDepartamento[chaveDepto];

  

  const opcoes = intros?.[nivel];
  if (!opcoes || opcoes.length === 0) {
    return `<section><p>Introdução não disponível para o nível ${nivel} da área ${departamento}.</p></section>`;
  }

  const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
  const texto = opcoes[indiceAleatorio];

  return `
<section id="introducao-${chaveDepto}-${nivel}">
  <h3>${capitalizeWords(chaveDepto)}</h3>
  <h4 style="font-size: 1.3rem; color: #053668;">Introdução</h4>
  <p style="font-weight: 400;">${texto.trim().replace(/\n/g, '<br>')}</p>

</section>

  `;
}
 function renderizarPlanoAcaoHtml(departamento: string, respostas: RespostaNegativa[]): string {
  const planosDoDepartamento = respostas.filter(
  resposta =>
    typeof resposta.departamento === 'string' &&
    resposta.departamento.toLowerCase() === departamento.toLowerCase()
);


  if (planosDoDepartamento.length === 0) {
    return `<p style="font-style: italic; margin-top: 10px;">Nenhum plano de ação registrado para esta área.</p>`;
  }

  const listaItens = planosDoDepartamento.map(resposta => {
    const planos = resposta.plano_acao
      ? Object.entries(resposta.plano_acao).map(
          ([chave, valor]) => `<p style="font-size: 1.2rem; line-height: 1.7 margin: 4px 0;"><strong>${chave}:</strong> ${valor}</p>`
        ).join('')
      : '<p>Sem plano de ação definido.</p>';

    return `
      <li style="margin-bottom: 12px;">
        <strong style="font-size: 1.2rem;">${resposta.texto_afirmativa}</strong>
        <div style="margin-top: 6px;">
          ${planos}
        </div>
      </li>
    `;
  }).join('');

  return `
    <div style="margin-top: 20px;">
      <h4 style="font-size: 1.3rem; color: #053668;">Planos de Ação</h4>
      <ul style="padding-left: 20px; list-style: disc;">
        ${listaItens}
      </ul>
    </div>
  `;
}

export function selecionarConclusaoPorDepartamento(departamento: string, pontuacao: number): string {
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
      <h4 style="font-size: 1.3rem; color: #053668;">Conclusão do Departamento</h4>
      <p>${texto.trim().replace(/\n/g, '<br>')}</p>
      <div class="page-break"/>
    </section>
  `;
}

export function selecionarTextoConclusao(pontuacao: number): string {
  const nivel = obterNivelMaturidade(pontuacao);
  const texto = consideracoesFinais[nivel];

  if (!texto) {
    return `<section><p>Conclusão não disponível para o nível ${nivel}.</p></section>`;
  }

  return `
    <section id="conclusao-geral">
      <h4 style="font-size: 1.3rem; color: #053668;">Conclusão Geral</h4>
      <p>${texto.trim().replace(/\n/g, '<br>')}</p>
      <p>A pontuação final da empresa foi <strong>${pontuacao}</strong>, o que indica um nível de maturidade de <strong>${obterNivelTexto(pontuacao)}</strong>.</p>
      <p>Recomendamos que a empresa priorize as áreas com maior percentual de maturidade para alcançar um desempenho mais equilibrado e eficiente.</p>

      <p style="font-weight: bold;">"O segredo da mudança é focar toda a sua energia não em lutar contra o velho, mas em construir o novo." - Sócrates</p>
      </section>
  `;
}


export function selectArea(
  areas: { nome: string; percentual: number }[],
  respostasNegativas: RespostaNegativa[]
): Record<string, string> {
  return areas.reduce((acc, area) => {
    const chaveDepto = area.nome.toLowerCase();
    const introducao = selecionarTextoPorDepartamento(chaveDepto, area.percentual);
    const planosHtml = renderizarPlanoAcaoHtml(chaveDepto, respostasNegativas);
    const conclusaoHtml = selecionarConclusaoPorDepartamento(chaveDepto, area.percentual);

    acc[chaveDepto] = `${introducao}${planosHtml}${conclusaoHtml}`;
    return acc;
  }, {} as Record<string, string>);
}


export const handleGeneratePDF = async (
  introGeral: string,
  dadosPorDepartamento: { nome: string; percentual: number }[],
  respostasNegativas: any,
  pontuacaoFinal: any // <--- adicione este parâmetro
) => {
  try {
    const textosPorDepartamento = selectArea(dadosPorDepartamento, respostasNegativas);
    const listaAreasHtml = renderizarListaDeAreasHtml(dadosPorDepartamento);
    const tabelaOportunidadesHtml = gerarTabelaOportunidadesHtml(respostasNegativas);
    const conclusaoGeralHtml = selecionarTextoConclusao(pontuacaoFinal); // <--- aplica lógica do componente

    const htmlFinal = `
      ${listaAreasHtml}
      ${Object.values(textosPorDepartamento).join('\n')}
      ${tabelaOportunidadesHtml}
      ${conclusaoGeralHtml} <!-- <- texto da conclusão geral aplicado aqui -->
    `;

    const response = await fetch(`${apiUrl}/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Relatório De Diagnóstico Empresarial',
        intro: introGeral,
        introPorDp: htmlFinal,
      }),
    });

    if (!response.ok) throw new Error('Erro ao gerar o PDF');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
};


