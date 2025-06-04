function generateHtml({ title, intro, introPorDp }) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <title>${title}</title>
      <style>
        @page :first{
          size: A4;
          margin: 0;
          z-index: 9999;
        
        }
        @page {
          size: A4;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: "Times New Roman", Times, serif;
          font-size: 12pt;
          line-height: 1.5;
          color: #000;
        }

        .page-break {
          page-break-after: always;
        }

        /* CAPA */
        .cover {
          background-color: #DFDFDF;
          height: 297mm;
          width: 210mm;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: sans-serif;

        }

        .cover-wrapper {
          background: linear-gradient(135deg, #002341, #0C80D3);
          padding: 6px;
          border-radius: 12px;
          width: 85%;
          max-width: 900px;
          box-sizing: border-box;
        }

        .cover-inner {
          background-color: #DFDFDF;
          padding: 12px;
          border-radius: 8px;
        }

        .cover-content {
          background-color: #fff;
          border-radius: 6px;
          padding: 1cm 1cm;
          height: 1000px;
          box-sizing: border-box;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .cover .title {
          font-size: 24pt;
          font-weight: bold;
          text-transform: uppercase;
          margin-top: 50%;
        }

        .cover .subtitle {
          font-size: 18pt;
          margin-top: 10px;
        }

        .footer {
            font-size: 8pt;
            display: flex;
            justify-content: space-between;
            margin-top: 64%;
          }

          .footer-left,
          .footer-right {
            width: auto;
            text-align: left;
            font-size: 13pt;
            padding-bottom: 0.5rem;

          }

        .footer-right {
          text-align: bottom;
          margin-top: 1rem;
          padding-top: 1rem;
          font-size: 10pt;
        }

       /* RESTO DAS PÁGINAS */
        .page {
          background-color: #fff;
          box-sizing: border-box;
          font-family: "Times New Roman", Times, serif;
          font-size: 12pt;
          line-height: 1.5;
          color: #000;
          page-break-after: always;

        }

        .page-content {
          box-sizing: border-box;
        }

        /* TÍTULOS PRINCIPAIS */
        h2 {
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 14pt;
          margin-top: 0;
          margin-bottom: 1.5rem;
          page-break-before: avoid;
        }

        /* TÍTULOS SECUNDÁRIOS */
        h3 {
          font-size: 12pt;
          text-transform: uppercase;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
          page-break-before: avoid;
        }

        /* PARÁGRAFOS */
        p {
          text-align: justify;
          text-indent: 1.25cm;
          margin-bottom: 1rem;
        }

        /* SUMÁRIO */
        .toc {
          padding: 0 2cm;
        }

        .toc ul {
          list-style: none;
          padding-left: 0;
          font-size: 12pt;
        }

        .toc li {
          text-align: left;
        }

        .subSum {
          margin-left: 0.5cm;
          font-size: 12pt;
        }

        /* TABELAS */
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
          font-size: 12pt;
        }

        th {
          font-weight: bold;
          text-align: center;
        }


      </style>
    </head>
    <body>
      <div class="cover page-break">
        <div class="cover-wrapper">
          <div class="cover-inner">
            <div class="cover-content">
              <div>
                <img src="https://assinaturas.grovehost.com.br/imagesClientes/azul.png" alt="Logo Grove" style="max-height: 60px;" />
                <div class="title">DIAGNÓSTICO EMPRESARIAL</div>
                <div class="subtitle">ANO 2025 / VERSÃO 001</div>
                <img src="https://assinaturas.grovehost.com.br/imagesClientes/hidropartesImg/Logo.png" alt="Logo Cliente" style="max-height: 80px; margin-top: 3rem;" />
              </div>
            <div class="footer">
              <div class="footer-left">
                Relatório desenvolvido por Grove Academy | Consulting<br>
                Vander Guimarães / Gabriel Januário
              </div>
              <div class="footer-right">
                Versão 001-2025
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CONTINUAÇÃO FORA DA CAPA -->
      <div class="page page-break toc content">
        <h2>SUMÁRIO</h2>
        <ul>
          <li>1. Introdução Geral</li>
          <li>2. Grau de Maturidade das Áreas</li>
          <li class="subSum">2.1 Marketing</li>
          <li class="subSum">2.2 Operações</li>
          <li class="subSum">2.3 Vendas</li>
          <li class="subSum">2.4 RH</li>
          <li class="subSum">2.5 Estratégias</li>
          <li class="subSum">2.6 Financeiro</li>
          <li class="subSum">2.7 Tecnologia</li>
          <li>3. Mapa de Oportunidade | Tabela de Ice FrameWork</li>
          <li>4. Conclusão Geral</li>
        </ul>
      </div>
      <div>
        ${introPorDp}
      </div>
    </body>
    </html>
  `;
}

module.exports = { generateHtml };
