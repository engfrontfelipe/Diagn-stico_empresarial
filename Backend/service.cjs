const express = require("express");
const cors = require("cors");
require("dotenv").config();
const puppeteer = require("puppeteer");
const app = express();

const { generateHtml } = require("./src/routes/pdfGenerate.cjs");
const usuariosRoutes = require("./src/routes/usersRoute.cjs");
const clientsRoutes = require("./src/routes/clientsRoute.cjs");
const questionsRoutes = require("./src/routes/questionsRoute.cjs");
const answersRoute = require("./src/routes/answersRoute.cjs");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(usuariosRoutes);
app.use(clientsRoutes);
app.use(questionsRoutes);
app.use(answersRoute);

app.post("/generate-pdf", async (req, res) => {
  const { title, intro, introPorDp, logoCliente } = req.body;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  const pageHeight = 1122 - 100 - 76;

  const html1 = generateHtml({ title, intro, introPorDp, pageMap: {} });
  await page.setContent(html1, { waitUntil: "networkidle0" });

  const pageMap = await page.evaluate((pageHeight) => {
    const ids = [
      "intro",
      "maturidade",
      "marketing",
      "operacoes",
      "vendas",
      "rh",
      "estrategias",
      "financeiro",
      "tecnologia",
      "conclusao",
    ];
    const map = {};

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const y = rect.top + window.scrollY;
        map[id] = Math.floor(y / pageHeight) + 1;
      }
    });

    return map;
  }, pageHeight);

  const htmlFinal = generateHtml({
    title,
    intro,
    introPorDp,
    pageMap,
    logoCliente,
  });
  await page.setContent(htmlFinal, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "2cm", right: "2cm", bottom: "2cm", left: "3cm" },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size:10pt; font-family:'Times New Roman'; width:100%; text-align:right; padding-right:1.5cm; ">
        <span class="pageNumber"></span>
      </div>
    `,
    footerTemplate: `<div></div>`,
  });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=relatorio.pdf",
    "Content-Length": pdfBuffer.length,
  });

  res.end(pdfBuffer);
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
