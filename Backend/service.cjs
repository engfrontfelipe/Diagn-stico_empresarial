const express = require("express");
const cors = require("cors");
require("dotenv").config();
const puppeteer = require("puppeteer");
const { generateHtml } = require('./src/routes/pdfGenerate.cjs');
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
  const { title, intro, introPorDp } = req.body;

  const htmlContent = generateHtml({ title, intro, introPorDp });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '20mm',
      right: '20mm',
    }
  });

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

