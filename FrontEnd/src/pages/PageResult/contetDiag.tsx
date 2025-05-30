import { introducoes, MaturidadeNivel } from "../Client/StaticDictionary";

function obterNivelMaturidade(pontuacao: number): MaturidadeNivel {
  if (pontuacao < 40) return 'baixo';
  if (pontuacao < 70) return 'médio';
  return 'alto';
}

export function selecionarIntroducao(pontuacao: number): string {
  const nivel = obterNivelMaturidade(pontuacao);
  const opcoes = introducoes[nivel];
  const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
  const texto = opcoes[indiceAleatorio];

  return `
    <section id="introducao-${nivel}">
      <p>${texto.trim().replace(/\n/g, '<br>')}</p>
    </section>
  `;
}

type ContentDiagProps = {
  htmlIntroducao: string;
};

export function ContentDiag({ htmlIntroducao }: ContentDiagProps) {
  return (
    <div>
      <h1 className="text-center font-medium text-2xl mb-5">Relatório de Diagnóstico empresarial</h1>
      <h2 className="font-medium mb-3">Introdução</h2>
      <div dangerouslySetInnerHTML={{ __html: htmlIntroducao }} />
    </div>
  );
}
