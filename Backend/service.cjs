const express = require("express");
const cors = require("cors");
require("dotenv").config();
const puppeteer = require("puppeteer");
const { generateHtml } = require('./src/routes/pdfGenerate.cjs');

const app = express();

// ⚠️ Aqui definimos os domínios permitidos
const allowedOrigins = [
  'https://diagn-stico-empresarial.vercel.app',
  'http://localhost:5173'
];

// ✅ Configuração CORS correta
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // permite scripts internos sem Origin
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


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

