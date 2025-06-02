const express = require("express");
const cors = require("cors");
require("dotenv").config();
const puppeteer = require("puppeteer");

const app = express();

const usuariosRoutes = require("./src/routes/usersRoute.cjs");
const clientsRoutes = require("./src/routes/clientsRoute.cjs");
const questionsRoutes = require("./src/routes/questionsRoute.cjs");
const answersRoute = require("./src/routes/answersRoute.cjs");

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(usuariosRoutes);
app.use(clientsRoutes);
app.use(questionsRoutes);
app.use(answersRoute);

app.post('/generate-pdf', async (req, res) => {
  const { title, content,  } = req.body;

  const htmlContent = `
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Relatório de Diagnóstico Empresarial</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
      line-height: 1.6;
      font-size: 14px;
      color: #333;
    }

    h1, h2, h3 {
      color: #1a1a1a;
    }

    .section {
      margin-bottom: 40px;
      page-break-after: always;
    }

    .section:last-child {
      page-break-after: auto;
    }

    .plan-item, .opportunity-item {
      margin-bottom: 10px;
    }

    .title {
      font-weight: bold;
      margin-bottom: 5px;
    }

    ul {
      padding-left: 20px;
    }

    hr {
      border: none;
      border-top: 1px solid #ccc;
      margin: 20px 0;
    }
  </style>
</head>
<body>

  <h1>Relatório de Diagnóstico Empresarial</h1>

  <div class="section">
    <h2>Introdução Geral</h2>
    <p><!-- Inserir conteúdo de introdução geral aqui --></p>
  </div>

  <!-- Introduções por área -->
  <div class="section">
    <h2>Introdução por Área</h2>

    <h3>Estratégias</h3>
    <p><!-- ${textoEstrategias} --></p>

    <h3>Financeiro</h3>
    <p><!-- ${textoFinanceiro} --></p>

    <h3>Vendas</h3>
    <p><!-- ${textoVendas} --></p>

    <h3>Marketing</h3>
    <p><!-- ${textoMarketing} --></p>

    <h3>Gestão de Pessoas</h3>
    <p><!-- ${textoPessoas} --></p>

    <h3>Gestão Empresarial</h3>
    <p><!-- ${textoGestao} --></p>
  </div>

  <!-- Oportunidades -->
  <div class="section">
    <h2>Oportunidades de Melhoria</h2>

    <h3>Estratégias</h3>
    <ul>
      <!-- ${oportunidadesEstrategias.map(o => `<li class="opportunity-item">${o}</li>`).join('')} -->
    </ul>

    <h3>Financeiro</h3>
    <ul>
      <!-- ${oportunidadesFinanceiro.map(o => `<li class="opportunity-item">${o}</li>`).join('')} -->
    </ul>

    <h3>Vendas</h3>
    <ul>
      <!-- ${oportunidadesVendas.map(o => `<li class="opportunity-item">${o}</li>`).join('')} -->
    </ul>

    <h3>Marketing</h3>
    <ul>
      <!-- ${oportunidadesMarketing.map(o => `<li class="opportunity-item">${o}</li>`).join('')} -->
    </ul>

    <h3>Pessoas</h3>
    <ul>
      <!-- ${oportunidadesPessoas.map(o => `<li class="opportunity-item">${o}</li>`).join('')} -->
    </ul>

    <h3>Gestão</h3>
    <ul>
      <!-- ${oportunidadesGestao.map(o => `<li class="opportunity-item">${o}</li>`).join('')} -->
    </ul>
  </div>

  <!-- Planos de Ação -->
  <div class="section">
    <h2>Plano de Ação</h2>

    <h3>Estratégias</h3>
    <ul>
      <!-- ${planosEstrategias.map(p => `<li class="plan-item">${p}</li>`).join('')} -->
    </ul>

    <h3>Financeiro</h3>
    <ul>
      <!-- ${planosFinanceiro.map(p => `<li class="plan-item">${p}</li>`).join('')} -->
    </ul>

    <h3>Vendas</h3>
    <ul>
      <!-- ${planosVendas.map(p => `<li class="plan-item">${p}</li>`).join('')} -->
    </ul>

    <h3>Marketing</h3>
    <ul>
      <!-- ${planosMarketing.map(p => `<li class="plan-item">${p}</li>`).join('')} -->
    </ul>

    <h3>Pessoas</h3>
    <ul>
      <!-- ${planosPessoas.map(p => `<li class="plan-item">${p}</li>`).join('')} -->
    </ul>

    <h3>Gestão</h3>
    <ul>
      <!-- ${planosGestao.map(p => `<li class="plan-item">${p}</li>`).join('')} -->
    </ul>
  </div>

  <!-- Conclusão -->
  <div class="section">
    <h2>Conclusão por Área</h2>

    <h3>Estratégias</h3>
    <p><!-- ${conclusaoEstrategias} --></p>

    <h3>Financeiro</h3>
    <p><!-- ${conclusaoFinanceiro} --></p>

    <h3>Vendas</h3>
    <p><!-- ${conclusaoVendas} --></p>

    <h3>Marketing</h3>
    <p><!-- ${conclusaoMarketing} --></p>

    <h3>Gestão de Pessoas</h3>
    <p><!-- ${conclusaoPessoas} --></p>

    <h3>Gestão Empresarial</h3>
    <p><!-- ${conclusaoGestao} --></p>
  </div>

  <div class="section">
    <h2>Considerações Finais</h2>
    <p><!-- ${consideracoesFinaisPorNivel[percentualGeral]} --></p>
  </div>

</body>
</html>

  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=relatorio.pdf',
    'Content-Length': pdfBuffer.length,
  });

  res.end(pdfBuffer);
});

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
