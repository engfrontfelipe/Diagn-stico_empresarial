function generateHtml({ title, intro, introPorDp }) {
  const today = new Date().toLocaleDateString('pt-BR');

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <title>${title}</title>
      <style>
        * {
          box-sizing: border-box;
        }

        body {
          font-family: "Arial", sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          color: #333;
        }

        .page {
          width: 210mm;
          min-height: 297mm;
          margin: auto;
          background: white;
        }

        .cover {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #1f2d3d;
          color: white;
          text-align: center;
        }

        .cover h1 {
          font-size: 2.8rem;
          margin-bottom: 1rem;
        }

        .cover p {
          font-size: 1.3rem;
        }

        .toc h2 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .toc ul {
          list-style-type: none;
          padding: 0;
          font-size: 1.1rem;
        }

        .toc li {
          margin: 12px 0;
        }

        .toc a {
          text-decoration: none;
          color: #000;
          font-size: 1.2rem;
          }

        h2 {
          font-size: 1.8rem;
          color: #2c3e50;
          border-bottom: 1px solid #ccc;
          padding-bottom: 8px;
        }

        h3 {
          font-size: 1.5rem;
          margin-top: 1rem;
          color: #34495e;
        }

        p {
          font-size: 1.2rem;
          line-height: 1.7;
          text-align: justify;
        }

        section {
          margin-bottom: 2rem;
        }

        .page-break {
          page-break-before: always;
        }

        footer {
          position: absolute;
          bottom: 20mm;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: 0.8rem;
          color: #aaa;
        }
      </style>
    </head>
    <body>
      <!-- Capa -->
      <div class="cover page">
        <h1>${title}</h1>
        <p>Relatório Gerado em: ${today}</p>
      </div>

      <!-- Sumário -->
      <div class="page page-break">
        <div class="toc">
          <h2>Sumário</h2>
          <ul>
            <li><a href="#intro-geral">1. Introdução Geral</a></li>
            <li><a href="#intro-por-dp">2. Grau de Maturidade das Áreas</a></li>
            <li><a href="#mapa-oportunidade">3. Mapa de Oportunidades | Tabela IceFrameWork</a></li>
            <li><a href="#conclusao-geral">4. Conclusão Geral</a></li>

          </ul>
        </div>
      </div>

      <!-- Introdução Geral -->
      <div class="page page-break">
        <section id="intro-geral">
          <h2>1. Introdução Geral</h2>
          ${intro}
        </section>
      </div>

      <!-- Introdução por Departamento -->
      <div class="page page-break">
        <section id="intro-por-dp">
          <h2>2. Grau de Maturidade das Áreas</h2>
            <p>${introPorDp}</p>
        </section>
      </div>
    </body>
    </html>
  `;
}

module.exports = { generateHtml };
