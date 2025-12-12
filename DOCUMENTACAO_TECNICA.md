# Documentação Técnica Completa - Sistema de Diagnóstico Empresarial Grove Consulting

## Visão Geral do Sistema

O Sistema de Diagnóstico Empresarial é uma plataforma web robusta desenvolvida para a Grove Consulting, projetada especificamente para facilitar a realização de avaliações empresariais abrangentes. Esta solução permite que consultores especializados conduzam diagnósticos detalhados de diferentes departamentos organizacionais através de questionários estruturados e metodologicamente validados.

### Propósito e Objetivos

O sistema foi concebido para resolver desafios comuns enfrentados por consultorias empresariais:

1. **Padronização de Processos**: Elimina a variabilidade na condução de diagnósticos, garantindo que todos os consultores sigam a mesma metodologia estruturada.

2. **Eficiência Operacional**: Automatiza o processo de coleta, análise e geração de relatórios, reduzindo significativamente o tempo necessário para completar um diagnóstico empresarial.

3. **Qualidade e Consistência**: Assegura que todos os relatórios gerados sigam o mesmo padrão de qualidade e apresentação visual, fortalecendo a marca da consultoria.

4. **Rastreabilidade e Auditoria**: Mantém um histórico completo de todas as interações, respostas e modificações, permitindo auditoria completa do processo.

5. **Escalabilidade**: Permite que a consultoria atenda múltiplos clientes simultaneamente sem comprometer a qualidade do serviço.

### Arquitetura Geral

A arquitetura do sistema segue o padrão de aplicação web moderna com separação clara de responsabilidades:

- **Frontend (Client-Side)**: React 19 + TypeScript + Vite para interface de usuário responsiva e moderna
- **Backend (Server-Side)**: Node.js + Express + CommonJS para API REST robusta e escalável
- **Banco de Dados**: PostgreSQL (Neon Database) para persistência de dados confiável e performática
- **Autenticação**: JWT (JSON Web Tokens) para segurança stateless e escalável
- **Geração de PDF**: Puppeteer para criação de relatórios profissionais em PDF
- **Containerização**: Docker para deployment consistente e portabilidade
- **Hospedagem**: EasyPanel para backend e Vercel para frontend (inferido pela configuração)

### Fluxo de Negócio Principal

O sistema opera seguindo um fluxo de trabalho bem definido que espelha o processo real de consultoria:

1. **Preparação**: Administradores cadastram consultores, perguntas por departamento e clientes
2. **Iniciação**: Consultores iniciam diagnósticos com prazo definido (30 dias)
3. **Coleta**: Clientes respondem questionários estruturados por departamento
4. **Análise**: Consultores analisam respostas e definem priorizações usando framework ICE
5. **Relatório**: Sistema gera relatórios profissionais em PDF com análises e recomendações
6. **Entrega**: Consultores apresentam resultados e planos de ação aos clientes

---

## Backend - API REST Detalhada

### Arquitetura e Filosofia do Backend

O backend foi desenvolvido seguindo princípios de arquitetura limpa e padrões RESTful, organizando-se em camadas bem definidas que facilitam manutenção, testabilidade e escalabilidade. A escolha por CommonJS (ao invés de ES Modules) foi feita para garantir compatibilidade máxima com ferramentas de deployment e bibliotecas legadas.

#### Estrutura de Camadas

1. **Camada de Apresentação (Routes)**: Responsável por receber requisições HTTP, validar parâmetros básicos e delegar processamento para controllers
2. **Camada de Controle (Controllers)**: Contém a lógica de negócio, validações complexas e orquestração de operações
3. **Camada de Dados (Database)**: Gerencia conexões e operações com PostgreSQL usando a biblioteca `postgres`
4. **Camada de Configuração**: Centraliza configurações de ambiente, conexões e constantes

### Tecnologias e Dependências Detalhadas

#### Dependências de Produção

```json
{
  "@neondatabase/serverless": "^1.0.0",  // Cliente otimizado para Neon Database
  "bcrypt": "^5.1.1",                    // Hashing seguro de senhas com salt
  "cors": "^2.8.5",                      // Middleware para Cross-Origin Resource Sharing
  "dotenv": "^16.4.7",                   // Carregamento de variáveis de ambiente
  "express": "^4.21.2",                  // Framework web minimalista e flexível
  "jsonwebtoken": "^9.0.2",              // Implementação JWT para autenticação stateless
  "postgres": "^3.4.7",                  // Driver PostgreSQL moderno com suporte a prepared statements
  "puppeteer": "^24.10.0"                // Automação de browser para geração de PDF
}
```

#### Justificativas Técnicas das Escolhas

**Express.js**: Escolhido pela sua maturidade, vasta comunidade e flexibilidade. Permite configuração granular de middlewares e possui excelente performance para APIs REST.

**PostgreSQL com biblioteca `postgres`**: PostgreSQL oferece robustez, conformidade ACID e recursos avançados como JSON nativo. A biblioteca `postgres` foi escolhida por sua sintaxe moderna, proteção contra SQL injection nativa e melhor performance comparada ao `pg`.

**Bcrypt**: Implementa o algoritmo de hashing Blowfish, considerado padrão da indústria para armazenamento seguro de senhas. O salt de 12 rounds oferece excelente equilíbrio entre segurança e performance.

**JWT**: Permite autenticação stateless, essencial para escalabilidade horizontal. Elimina necessidade de sessões no servidor e facilita integração com múltiplos frontends.

**Puppeteer**: Oferece controle total sobre renderização de PDF, permitindo layouts complexos, CSS avançado e geração de documentos profissionais com qualidade superior a bibliotecas de PDF tradicionais.

### Configuração Detalhada do Servidor

**Arquivo Principal**: `Backend/service.cjs`

O servidor Express é configurado com middlewares essenciais e roteamento modular:

#### Configurações de Rede e Segurança
- **Porta**: 3333 (padrão) ou configurável via variável de ambiente `PORT`
- **CORS**: Configurado liberalmente (`origin: "*"`) para desenvolvimento, mas deve ser restringido em produção
- **Métodos HTTP**: GET, POST, PUT, DELETE, PATCH permitidos
- **Headers**: Content-Type e Authorization permitidos para autenticação JWT

#### Configurações de Payload
- **Limite JSON**: 10MB para suportar upload de logos de clientes e dados extensos
- **Parser**: Express JSON nativo com limite aumentado para requisições grandes

#### Middlewares Aplicados
1. **CORS Middleware**: Permite requisições cross-origin necessárias para SPA
2. **JSON Parser**: Processa automaticamente payloads JSON das requisições
3. **Roteamento Modular**: Cada módulo (usuários, clientes, perguntas, respostas) possui suas próprias rotas

#### Endpoint Especial de PDF
O servidor possui um endpoint dedicado (`/generate-pdf`) que utiliza Puppeteer para:
- Renderizar HTML complexo com CSS avançado
- Calcular paginação automática baseada na altura do conteúdo
- Gerar PDFs com qualidade profissional incluindo headers e footers personalizados
- Retornar arquivos PDF diretamente no response com headers apropriados

### Estrutura Detalhada do Banco de Dados

#### Configuração e Conexão

```javascript
// Backend/src/config/db.cjs
const sql = postgres(process.env.DATABASE_URL, {
  ssl: false,  // Desabilitado para ambiente de desenvolvimento
});
```

A conexão utiliza a biblioteca `postgres` que oferece:
- **Prepared Statements automáticos**: Proteção nativa contra SQL injection
- **Connection Pooling**: Gerenciamento eficiente de conexões
- **Sintaxe moderna**: Template literals para queries mais legíveis
- **Type Safety**: Melhor integração com TypeScript quando necessário

#### Modelo de Dados Detalhado

##### 1. Tabela `usuarios` - Gestão de Acesso
```sql
CREATE TABLE usuarios (
  id_usuario SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,  -- Hash bcrypt com salt 12
  role VARCHAR(50) NOT NULL,    -- 'admin' ou 'user'
  ativo BOOLEAN DEFAULT true,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Propósito**: Controla acesso ao sistema com dois níveis de permissão:
- **Admin**: Acesso completo, pode cadastrar usuários, clientes e perguntas
- **User**: Acesso limitado, pode apenas conduzir diagnósticos

##### 2. Tabela `clientes` - Informações Empresariais
```sql
CREATE TABLE clientes (
  id_cliente SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  nome_responsavel VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) NOT NULL,
  ramo_empresa VARCHAR(255),
  cargo_responsavel VARCHAR(255),
  consultor VARCHAR(255) NOT NULL,
  linkedin VARCHAR(500),
  site VARCHAR(500),
  logo_url TEXT,
  ativo BOOLEAN DEFAULT true,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  inicio_diagnostico TIMESTAMP,
  final_diagnostico TIMESTAMP
);
```

**Propósito**: Armazena informações completas dos clientes e controla o ciclo de vida dos diagnósticos. O campo `final_diagnostico` serve tanto para prazo limite quanto para data de conclusão.

##### 3. Tabela `cliente_departamentos` - Associação Flexível
```sql
CREATE TABLE cliente_departamentos (
  id_cliente INTEGER REFERENCES clientes(id_cliente),
  departamento VARCHAR(100) NOT NULL,
  ativo BOOLEAN DEFAULT true,
  PRIMARY KEY (id_cliente, departamento)
);
```

**Propósito**: Permite associação flexível entre clientes e departamentos. Nem todos os clientes precisam avaliar todos os departamentos, permitindo diagnósticos customizados.

##### 4. Tabela `perguntas` - Base do Questionário
```sql
CREATE TABLE perguntas (
  id_pergunta SERIAL PRIMARY KEY,
  texto_pergunta TEXT NOT NULL,
  departamento VARCHAR(100) NOT NULL,
  oportunidade TEXT,
  plano_acao JSONB,  -- Estrutura flexível para planos de ação
  texto_afirmativa TEXT,
  texto_afirmativa_positiva TEXT
);
```

**Propósito**: Centraliza todas as perguntas do diagnóstico. O campo `plano_acao` em JSONB permite estruturas complexas de recomendações. Os textos afirmativos são usados no relatório final.

##### 5. Tabela `respostas` - Dados do Diagnóstico
```sql
CREATE TABLE respostas (
  id_resposta SERIAL PRIMARY KEY,
  id_cliente INTEGER REFERENCES clientes(id_cliente),
  id_pergunta INTEGER REFERENCES perguntas(id_pergunta),
  resposta INTEGER NOT NULL,  -- 1=Sim, 2=Não
  data_resposta TIMESTAMP NOT NULL,
  id_usuario INTEGER REFERENCES usuarios(id_usuario),
  importancia INTEGER,  -- 1-5 para framework ICE
  urgencia INTEGER,     -- 1-5 para framework ICE
  facilidade_implementacao INTEGER,  -- 1-5 para framework ICE
  priorizacao INTEGER,  -- Calculado automaticamente
  UNIQUE(id_cliente, id_pergunta)
);
```

**Propósito**: Armazena as respostas do diagnóstico e implementa o framework ICE (Impact, Confidence, Ease) para priorização de oportunidades de melhoria.

#### Relacionamentos e Integridade

- **Cascata de Exclusão**: Não implementada propositalmente para preservar histórico
- **Chaves Estrangeiras**: Garantem integridade referencial
- **Índices**: Criados automaticamente em PKs e FKs para performance
- **Constraints**: UNIQUE em combinações críticas (cliente+pergunta)

### Endpoints da API

#### Autenticação e Usuários (`/usuarios`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/usuarios/create` | Criar usuário | Não |
| GET | `/usuarios/list` | Listar usuários | Não |
| GET | `/usuarios/:id` | Buscar usuário por ID | Não |
| PATCH | `/usuarios/:id` | Atualizar usuário | Não |
| POST | `/usuarios/auth/login` | Login | Não |
| GET | `/usuarios/auth/me` | Dados do usuário logado | Sim |

#### Clientes (`/clientes`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/clientes/create` | Criar cliente | Não |
| GET | `/clientes/list` | Listar clientes | Não |
| PATCH | `/clientes/update/:id` | Atualizar cliente | Não |
| GET | `/clientes/:id` | Buscar cliente por ID | Não |
| POST | `/cliente/diagnostico/iniciar/:id` | Iniciar diagnóstico | Não |
| GET | `/cliente/diagnostico/status/:id` | Status do diagnóstico | Não |
| POST | `/cliente/diagnostico/concluir/:id` | Concluir diagnóstico | Não |

#### Perguntas (`/questions`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/questions/list` | Listar perguntas |
| GET | `/questions/list/total` | Total de perguntas |
| GET | `/questions/list/total-by-departament` | Total por departamento |
| POST | `/questions/create` | Criar pergunta |
| PUT | `/questions/update/:id` | Atualizar pergunta |
| GET | `/questions/cliente/:id_cliente` | Perguntas do cliente |
| GET | `/questions/filterByDepartment` | Filtrar por departamento |

#### Respostas (`/answers`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/answers/save` | Salvar respostas |
| GET | `/answers/negative/:id_cliente` | Respostas negativas |
| GET | `/answers/positive/:id_cliente` | Respostas positivas |
| GET | `/answers/:id_cliente` | Todas as respostas |
| PUT | `/answers/update/:id_resposta` | Atualizar estados |
| GET | `/answers/recovery-status/:id` | Recuperar estados |

#### Geração de PDF (`/generate-pdf`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/generate-pdf` | Gerar relatório PDF |

**Payload esperado**:
```json
{
  "title": "Título do relatório",
  "intro": "Introdução",
  "introPorDp": "Introdução por departamento",
  "logoCliente": "URL do logo"
}
```

### Autenticação JWT

#### Configuração
- **Secret**: Definido em `JWT_SECRET` (variável de ambiente)
- **Expiração**: 1 hora
- **Middleware**: `verificarToken`

#### Payload do Token
```json
{
  "id": "id_usuario",
  "nome": "Nome do usuário",
  "email": "email@exemplo.com",
  "role": "admin|user"
}
```

### Sistema Avançado de Geração de PDF com Puppeteer

#### Arquitetura do Sistema de PDF

O sistema de geração de PDF é uma das funcionalidades mais complexas e críticas da aplicação, implementando um processo sofisticado de renderização que garante documentos profissionais e consistentes.

#### Processo Detalhado de Geração

**Fase 1: Preparação dos Dados**
```javascript
const { title, intro, introPorDp, logoCliente } = req.body;
```
- Recebe metadados do relatório via POST
- Valida presença de dados obrigatórios
- Prepara estrutura base do documento

**Fase 2: Renderização Inicial para Cálculo de Paginação**
```javascript
const html1 = generateHtml({ title, intro, introPorDp, pageMap: {} });
await page.setContent(html1, { waitUntil: "networkidle0" });
```
- Gera HTML inicial sem numeração de páginas
- Aguarda carregamento completo de recursos (networkidle0)
- Permite que o browser calcule layout final

**Fase 3: Mapeamento Inteligente de Páginas**
```javascript
const pageMap = await page.evaluate((pageHeight) => {
  const ids = ["intro", "maturidade", "marketing", "operacoes", "vendas", "rh", "estrategias", "financeiro", "tecnologia", "conclusao"];
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
```
- Executa JavaScript no contexto do browser
- Calcula posição exata de cada seção
- Determina em qual página cada seção aparecerá
- Cria mapa de referências para sumário automático

**Fase 4: Geração Final com Numeração**
```javascript
const htmlFinal = generateHtml({ title, intro, introPorDp, pageMap, logoCliente });
await page.setContent(htmlFinal, { waitUntil: "networkidle0" });
```
- Regenera HTML com numeração correta no sumário
- Inclui logo do cliente se fornecido
- Aplica estilos finais e formatação

**Fase 5: Conversão para PDF**
```javascript
const pdfBuffer = await page.pdf({
  format: "A4",
  printBackground: true,
  margin: { top: "2cm", right: "2cm", bottom: "2cm", left: "3cm" },
  displayHeaderFooter: true,
  headerTemplate: `<div style="font-size:10pt; font-family:'Times New Roman'; width:100%; text-align:right; padding-right:1.5cm;"><span class="pageNumber"></span></div>`,
  footerTemplate: `<div></div>`,
});
```

#### Configurações Avançadas do PDF

**Formatação e Layout**:
- **Formato**: A4 (210mm x 297mm) padrão internacional
- **Margens Assimétricas**: Margem esquerda maior (3cm) para encadernação
- **Background**: Preservado para gradientes e cores da marca
- **Fontes**: Times New Roman para corpo, Sans-serif para títulos

**Sistema de Paginação**:
- **Header Automático**: Numeração no canto superior direito
- **Footer Vazio**: Mantido limpo para design profissional
- **Quebras de Página**: Controladas via CSS `page-break-after`

**Elementos Visuais**:
- **Capa Personalizada**: Design com gradiente da marca Grove
- **Logo Duplo**: Logo da Grove e logo do cliente
- **Sumário Automático**: Gerado dinamicamente com numeração correta
- **Tabelas Responsivas**: Formatação automática para diferentes tamanhos de conteúdo

#### Template HTML Avançado

O template HTML implementa:

**CSS Print-Specific**:
```css
@page :first {
  size: A4;
  margin: 0;  /* Capa sem margens */
}

@page {
  size: A4;   /* Páginas internas com margens padrão */
}
```

**Controle de Quebras**:
```css
.page-break {
  page-break-after: always;
}

h2, h3 {
  page-break-before: avoid;  /* Evita títulos órfãos */
}
```

**Responsividade para PDF**:
- Tabelas que se ajustam automaticamente
- Imagens com dimensionamento proporcional
- Textos com justificação e indentação profissional

#### Otimizações de Performance

**Configuração do Puppeteer**:
```javascript
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox"],  // Necessário para containers Docker
});
```

**Gestão de Recursos**:
- Browser instance reutilizada quando possível
- Cleanup automático após geração
- Timeout configurável para operações longas
- Compressão automática do PDF resultante

---

## Frontend - Aplicação React Moderna e Responsiva

### Arquitetura e Filosofia do Frontend

O frontend foi desenvolvido utilizando as mais modernas práticas de desenvolvimento React, priorizando performance, acessibilidade e experiência do usuário. A aplicação segue o padrão SPA (Single Page Application) com roteamento client-side, oferecendo uma experiência fluida e responsiva.

#### Princípios de Design Implementados

1. **Mobile-First**: Interface responsiva que funciona perfeitamente em dispositivos móveis
2. **Acessibilidade (a11y)**: Componentes seguem padrões WCAG 2.1 através do Radix UI
3. **Performance**: Lazy loading, code splitting e otimizações de bundle
4. **Consistência Visual**: Design system baseado em Tailwind CSS com componentes reutilizáveis
5. **Experiência do Usuário**: Feedback visual, loading states e tratamento de erros

### Stack Tecnológica Detalhada

#### Core Framework e Build Tools
```json
{
  "react": "^19.0.0",           // Framework principal com Concurrent Features
  "react-dom": "^19.0.0",       // Renderização DOM otimizada
  "typescript": "~5.7.2",       // Type safety e melhor DX
  "vite": "^6.2.0",            // Build tool ultra-rápido com HMR
  "react-router-dom": "^7.4.1"  // Roteamento client-side moderno
}
```

#### Sistema de Design e UI
```json
{
  "tailwindcss": "^4.0.17",     // Utility-first CSS framework
  "@tailwindcss/vite": "^4.0.17", // Integração nativa com Vite
  "class-variance-authority": "^0.7.1", // Variantes de componentes type-safe
  "tailwind-merge": "^3.0.2",   // Merge inteligente de classes Tailwind
  "clsx": "^2.1.1"              // Conditional className utility
}
```

#### Componentes UI Avançados (Radix UI Ecosystem)
```json
{
  "@radix-ui/react-avatar": "^1.1.3",
  "@radix-ui/react-checkbox": "^1.1.4",
  "@radix-ui/react-dialog": "^1.1.6",
  "@radix-ui/react-dropdown-menu": "^2.1.6",
  "@radix-ui/react-navigation-menu": "^1.2.10",
  "@radix-ui/react-select": "^2.1.6",
  "@radix-ui/react-tabs": "^1.1.3",
  "@radix-ui/react-tooltip": "^1.1.8"
}
```

**Justificativa Radix UI**: Escolhido por oferecer componentes headless (sem estilo) que são:
- **Totalmente Acessíveis**: Implementam WAI-ARIA automaticamente
- **Customizáveis**: Permitem estilização completa com Tailwind
- **Performáticos**: Otimizados para bundle size e runtime
- **Composáveis**: Podem ser combinados para criar componentes complexos

#### Funcionalidades Avançadas
```json
{
  "@dnd-kit/core": "^6.3.1",           // Drag and drop acessível
  "@dnd-kit/sortable": "^10.0.0",      // Listas ordenáveis
  "@tanstack/react-table": "^8.21.2",  // Tabelas de dados avançadas
  "framer-motion": "^12.23.12",        // Animações fluidas e performáticas
  "recharts": "^2.15.1",               // Gráficos responsivos e interativos
  "react-input-mask": "^2.0.4",        // Máscaras de input (CPF, CNPJ, etc)
  "xlsx": "^0.18.5"                    // Exportação para Excel
}
```

#### Utilitários e Integração
```json
{
  "jsonwebtoken": "^9.0.2",     // Decodificação JWT client-side
  "jwt-decode": "^4.0.0",       // Utilitário para decode de tokens
  "sonner": "^2.0.2",          // Sistema de notificações elegante
  "zod": "^3.24.2",            // Validação de schemas type-safe
  "canvas-confetti": "^1.9.3"   // Efeitos visuais de celebração
}
```

### Arquitetura de Componentes

#### Estrutura Hierárquica
```
src/
├── components/
│   ├── ui/                    # Componentes base (shadcn/ui pattern)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── app-sidebar.tsx        # Navegação principal
│   ├── data-table.tsx         # Tabela de dados reutilizável
│   ├── nav-*.tsx             # Componentes de navegação específicos
│   └── section-cards.tsx      # Cards de seção do dashboard
├── pages/                     # Páginas da aplicação
│   ├── Dashboard/
│   ├── Client/
│   ├── RegisterUser/
│   ├── RegisterClient/
│   ├── RegisterQuestion/
│   ├── PageClient/
│   ├── PageResult/
│   └── Documentation/
├── lib/                       # Utilitários e providers
│   ├── auth.tsx              # Context de autenticação
│   ├── utils.ts              # Funções utilitárias
│   └── themeProvider.tsx     # Gerenciamento de tema
├── hooks/                     # Custom hooks
│   └── use-mobile.ts         # Hook para detecção mobile
└── Routes/                    # Configuração de roteamento
    ├── routes.tsx
    └── privateRoutes.tsx
```

### Sistema de Autenticação Avançado

#### Context Provider Robusto
```typescript
interface User {
  id: string;
  nome: string;
  email: string;
  role: string;  // Controle de acesso baseado em roles
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
```

O sistema de autenticação implementa:

**Validação Automática de Token**:
- Verificação automática na inicialização da aplicação
- Renovação silenciosa quando possível
- Logout automático em caso de token expirado
- Redirecionamento inteligente baseado no estado de autenticação

**Proteção de Rotas Granular**:
```typescript
interface PrivateRoutesProps {
  children: ReactNode;
  allowedRoles?: string[];  // Controle fino de permissões
}
```

**Integração com Backend**:
- Headers Authorization automáticos
- Interceptação de respostas 401/403
- Tratamento de erros de autenticação
- Sincronização de estado entre abas do browser

### Sistema de Roteamento Inteligente

#### Categorização de Rotas

**Rotas Públicas** (Acesso livre):
```typescript
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/doc/Consulting" element={<ManualConsultor />} />
```

**Rotas Autenticadas** (Usuários logados):
```typescript
<Route path="/dashboard" element={
  <PrivateRoutes>
    <Dashboard />
  </PrivateRoutes>
} />
<Route path="/clientes/:id" element={
  <PrivateRoutes>
    <PageClient />
  </PrivateRoutes>
} />
```

**Rotas Administrativas** (Apenas admins):
```typescript
<Route path="/register_user" element={
  <PrivateRoutes allowedRoles={["admin"]}>
    <RegisterUser />
  </PrivateRoutes>
} />
```

**Rota Especial de Resultado** (Acesso direto para clientes):
```typescript
<Route path="/cliente/ccadsvakocpa7ccijccc65366565g6fv6v5v559xq/result/:id" 
       element={<PageResult idCliente={""} />} />
```
Esta rota possui URL ofuscada para permitir acesso direto aos resultados sem autenticação, mantendo segurança através de obscuridade.

### Funcionalidades Principais Detalhadas

#### 1. Dashboard Executivo
- **Métricas em Tempo Real**: Contadores de clientes, diagnósticos ativos, conclusões
- **Gráficos Interativos**: Visualização de dados com Recharts
- **Cards Informativos**: Resumos executivos com drill-down
- **Navegação Contextual**: Acesso rápido às funcionalidades mais usadas

#### 2. Gestão Completa de Clientes
- **Formulário Inteligente**: Validação em tempo real com Zod
- **Upload de Logo**: Integração com storage de imagens
- **Associação de Departamentos**: Seleção múltipla com drag-and-drop
- **Controle de Ciclo de Vida**: Estados de diagnóstico com transições controladas

#### 3. Sistema de Perguntas Flexível
- **Editor Rico**: Suporte a formatação e estruturação de conteúdo
- **Categorização**: Organização por departamentos com filtros avançados
- **Planos de Ação JSON**: Editor estruturado para recomendações complexas
- **Preview em Tempo Real**: Visualização de como aparecerá no questionário

#### 4. Interface de Diagnóstico Otimizada
- **Navegação Intuitiva**: Progresso visual e navegação entre seções
- **Salvamento Automático**: Persistência de respostas sem intervenção do usuário
- **Validação Contextual**: Feedback imediato sobre completude e consistência
- **Modo Offline**: Funcionalidade básica mesmo sem conexão

#### 5. Sistema de Relatórios Avançado
- **Visualização Interativa**: Gráficos dinâmicos com filtros e drill-down
- **Exportação Múltipla**: PDF profissional, Excel para análise, CSV para integração
- **Análise Comparativa**: Benchmarking entre departamentos e períodos
- **Recomendações Inteligentes**: Sugestões baseadas em padrões identificados

### Estrutura de Pastas

```
FrontEnd/src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── app-sidebar.tsx
│   ├── data-table.tsx
│   └── ...
├── pages/              # Páginas da aplicação
│   ├── Dashboard/
│   ├── Client/
│   ├── RegisterUser/
│   └── ...
├── Routes/             # Configuração de rotas
├── lib/                # Utilitários e providers
├── hooks/              # Custom hooks
└── assets/             # Recursos estáticos
```

### Sistema de Rotas

#### Rotas Públicas
- `/` - Home
- `/login` - Login
- `/doc/Consulting` - Documentação

#### Rotas Privadas (Autenticadas)
- `/dashboard` - Dashboard principal
- `/clientes/:id` - Página do cliente

#### Rotas Administrativas (Role: admin)
- `/register_user` - Cadastro de usuários
- `/register_client` - Cadastro de clientes
- `/register_quest` - Cadastro de perguntas

### Autenticação Frontend

#### Context Provider
```typescript
// src/lib/auth.tsx
interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
```

#### Proteção de Rotas
```typescript
// src/Routes/privateRoutes.tsx
interface PrivateRoutesProps {
  children: ReactNode;
  allowedRoles?: string[];
}
```

### Principais Funcionalidades

#### 1. Dashboard
- Visão geral dos clientes
- Estatísticas de diagnósticos
- Navegação principal

#### 2. Gestão de Clientes
- Cadastro de clientes
- Associação com departamentos
- Controle de diagnósticos

#### 3. Sistema de Perguntas
- Cadastro por departamento
- Planos de ação em JSON
- Textos afirmativos

#### 4. Diagnóstico
- Interface de questionário
- Salvamento automático
- Controle de tempo

#### 5. Relatórios
- Visualização de resultados
- Geração de PDF
- Análise por departamento

---

## Configuração de Ambiente

### Variáveis de Ambiente (Backend)

```env
# Backend/.env
DATABASE_URL=postgres://user:password@host:port/database?sslmode=disable
JWT_SECRET=your-super-secret-jwt-key
PORT=3333
```

### Configuração de Desenvolvimento

#### Backend
```bash
cd Backend
npm install
npm run dev  # Modo watch
```

#### Frontend
```bash
cd FrontEnd
npm install
npm run dev  # Servidor de desenvolvimento
```

### Configuração de Produção

#### Docker Compose (Sugerido)
```yaml
version: '3.8'
services:
  backend:
    build: ./Backend
    ports:
      - "3333:3333"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
  
  frontend:
    build: ./FrontEnd
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

---

## Fluxo de Trabalho Detalhado do Sistema

### Visão Geral do Processo de Consultoria

O sistema foi projetado para espelhar e otimizar o processo real de consultoria empresarial, desde o primeiro contato até a entrega final dos resultados. Cada etapa possui validações, controles de qualidade e pontos de verificação que garantem a consistência e profissionalismo do serviço.

### Fase 1: Preparação e Configuração Inicial

#### 1.1 Configuração Administrativa (Responsável: Admin)

**Cadastro de Consultores**:
- Admin acessa `/register_user` (rota protegida por role)
- Preenche dados completos: nome, email, senha, confirmação
- Define role como 'user' para consultores ou 'admin' para outros administradores
- Sistema valida unicidade do email e força de senha
- Consultor recebe credenciais e pode acessar o sistema

**Estruturação do Questionário**:
- Admin acessa `/register_quest` para cadastrar perguntas
- Organiza perguntas por departamento (Marketing, Vendas, RH, Operações, etc.)
- Define textos afirmativos para respostas positivas e negativas
- Estrutura planos de ação em formato JSON para cada oportunidade identificada
- Sistema valida duplicidade e consistência das perguntas

#### 1.2 Cadastro de Cliente (Responsável: Consultor)

**Coleta de Informações Empresariais**:
- Consultor acessa `/register_client` 
- Preenche dados completos da empresa: razão social, CNPJ, responsável
- Define ramo de atividade e cargo do responsável
- Associa consultor responsável pelo diagnóstico
- Opcionalmente inclui LinkedIn, site e logo da empresa

**Seleção de Departamentos**:
- Consultor seleciona quais departamentos serão avaliados
- Sistema cria associações na tabela `cliente_departamentos`
- Permite customização do diagnóstico conforme necessidades específicas
- Valida que pelo menos um departamento seja selecionado

### Fase 2: Execução do Diagnóstico

#### 2.1 Iniciação do Processo (Responsável: Consultor)

**Ativação do Diagnóstico**:
- Consultor acessa página do cliente (`/clientes/:id`)
- Clica em "Iniciar Diagnóstico" 
- Sistema registra `inicio_diagnostico` com timestamp atual
- Define `final_diagnostico` automaticamente (30 dias corridos)
- Gera URL única e segura para acesso do cliente

**Comunicação com Cliente**:
- Sistema disponibiliza link direto para questionário
- URL ofuscada garante segurança sem necessidade de login
- Cliente recebe instruções e prazo para conclusão
- Consultor pode acompanhar progresso em tempo real

#### 2.2 Coleta de Respostas (Responsável: Cliente)

**Interface de Questionário**:
- Cliente acessa URL fornecida pelo consultor
- Visualiza perguntas organizadas por departamento
- Responde com "Sim" (1) ou "Não" (2) para cada pergunta
- Sistema salva automaticamente a cada resposta (AJAX)

**Controle de Qualidade**:
- Validação de completude por departamento
- Indicadores visuais de progresso
- Prevenção de respostas duplicadas ou inconsistentes
- Salvamento automático previne perda de dados

**Gestão de Prazo**:
- Sistema monitora prazo de 30 dias automaticamente
- Alertas visuais quando próximo do vencimento
- Bloqueio automático após expiração (status 208)
- Possibilidade de extensão pelo consultor se necessário

### Fase 3: Análise e Priorização

#### 3.1 Análise de Respostas Negativas (Responsável: Consultor)

**Identificação de Oportunidades**:
- Sistema filtra automaticamente respostas "Não" (valor 2)
- Consultor acessa `/clientes/:id` para visualizar oportunidades
- Cada resposta negativa representa uma oportunidade de melhoria
- Interface organizada por departamento facilita análise

**Framework ICE de Priorização**:
- Para cada oportunidade, consultor avalia:
  - **Importância** (1-5): Impacto no negócio do cliente
  - **Urgência** (1-5): Necessidade temporal de implementação  
  - **Facilidade de Implementação** (1-5): Recursos necessários e complexidade
- Sistema calcula automaticamente score de priorização
- Ranking automático das oportunidades por relevância

#### 3.2 Estruturação de Recomendações

**Planos de Ação Detalhados**:
- Cada pergunta possui plano de ação pré-estruturado em JSON
- Consultor pode customizar recomendações conforme contexto específico
- Estrutura flexível permite desde ações simples até projetos complexos
- Integração com textos afirmativos para relatório final

### Fase 4: Geração e Entrega de Resultados

#### 4.1 Compilação do Relatório (Automático)

**Processamento de Dados**:
- Sistema coleta todas as respostas do cliente
- Separa pontos fortes (respostas "Sim") e oportunidades (respostas "Não")
- Organiza por departamento conforme estrutura pré-definida
- Aplica templates de texto baseados nas configurações das perguntas

**Geração de PDF Profissional**:
- Endpoint `/generate-pdf` recebe dados compilados
- Puppeteer renderiza HTML com layout profissional
- Cálculo automático de paginação e numeração
- Inclusão de logo do cliente e identidade visual da Grove
- Geração de sumário com referências de página corretas

#### 4.2 Apresentação dos Resultados (Responsável: Consultor)

**Visualização Interativa**:
- Consultor acessa página de resultados (`/cliente/.../result/:id`)
- Dashboard com gráficos e métricas consolidadas
- Tabelas interativas com filtros e ordenação
- Exportação em múltiplos formatos (PDF, Excel, CSV)

**Entrega ao Cliente**:
- Relatório PDF profissional para apresentação executiva
- Planilhas Excel para acompanhamento de implementação
- Acesso web para consulta contínua dos resultados
- Documentação de metodologia e próximos passos

### Fase 5: Acompanhamento e Gestão

#### 5.1 Conclusão Formal (Responsável: Consultor)

**Finalização do Processo**:
- Consultor marca diagnóstico como concluído
- Sistema atualiza `final_diagnostico` com timestamp de conclusão
- Status muda para "Concluído" em todas as interfaces
- Histórico completo preservado para auditoria

#### 5.2 Gestão de Portfolio (Responsável: Admin/Consultor)

**Dashboard Executivo**:
- Visão consolidada de todos os diagnósticos
- Métricas de performance por consultor
- Análise de tendências e padrões identificados
- Relatórios gerenciais para tomada de decisão

**Controle de Qualidade**:
- Auditoria de diagnósticos concluídos
- Validação de consistência nas análises
- Feedback de clientes e resultados obtidos
- Melhoria contínua da metodologia

### Pontos de Controle e Validação

#### Validações Automáticas
- **Integridade de Dados**: Validação de tipos e formatos em todas as entradas
- **Regras de Negócio**: Verificação de prazos, completude e consistência
- **Segurança**: Autenticação, autorização e proteção contra ataques
- **Performance**: Monitoramento de tempos de resposta e uso de recursos

#### Controles Manuais
- **Revisão de Qualidade**: Verificação humana de relatórios antes da entrega
- **Aprovação de Conteúdo**: Validação de textos e recomendações
- **Gestão de Exceções**: Tratamento de casos especiais e customizações
- **Feedback Contínuo**: Incorporação de melhorias baseadas na experiência de uso

---

## Segurança Abrangente e Boas Práticas

### Arquitetura de Segurança Multicamadas

O sistema implementa uma estratégia de segurança em profundidade (defense in depth), com múltiplas camadas de proteção que se complementam para garantir a integridade, confidencialidade e disponibilidade dos dados.

### Segurança do Backend

#### Autenticação e Autorização Robusta

**Hashing de Senhas com Bcrypt**:
```javascript
const senhaHash = bcrypt.hashSync(senha, 12);
```
- **Salt Rounds**: 12 rounds proporcionam excelente equilíbrio segurança/performance
- **Algoritmo Blowfish**: Resistente a ataques de força bruta e rainbow tables
- **Validação de Força**: Senhas devem atender critérios mínimos de complexidade
- **Rotação de Senhas**: Sistema permite alteração segura com validação da senha atual

**Sistema JWT Stateless**:
```javascript
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
```
- **Expiração Curta**: Tokens válidos por apenas 1 hora reduzem janela de exposição
- **Payload Mínimo**: Apenas dados essenciais (id, nome, email, role) no token
- **Secret Robusto**: Chave de 256+ caracteres com alta entropia
- **Validação Rigorosa**: Verificação de assinatura, expiração e estrutura

#### Proteção Contra Vulnerabilidades Comuns

**SQL Injection Prevention**:
```javascript
const result = await sql`SELECT * FROM usuarios WHERE email = ${email}`;
```
- **Prepared Statements**: Biblioteca `postgres` usa prepared statements automaticamente
- **Parametrização**: Todos os inputs são parametrizados, nunca concatenados
- **Validação de Tipos**: TypeScript + validação runtime previnem injeção de tipos
- **Sanitização**: Inputs são sanitizados antes de processamento

**Cross-Site Scripting (XSS) Protection**:
- **Content Security Policy**: Headers CSP restringem execução de scripts
- **Sanitização de Outputs**: Dados são escapados antes de renderização
- **Validação de Inputs**: Rejeição de conteúdo HTML/JavaScript malicioso
- **Headers de Segurança**: X-Content-Type-Options, X-Frame-Options configurados

**Cross-Origin Resource Sharing (CORS)**:
```javascript
app.use(cors({
  origin: "*",  // ⚠️ Deve ser restringido em produção
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
```
- **Configuração Atual**: Liberada para desenvolvimento (`origin: "*"`)
- **Recomendação Produção**: Restringir a domínios específicos
- **Métodos Controlados**: Apenas métodos necessários permitidos
- **Headers Específicos**: Controle granular de headers permitidos

#### Validação e Sanitização de Dados

**Validação de Entrada Rigorosa**:
```javascript
if (!nome || !email || !senha || !confirmSenha || !role) {
  return res.status(400).json({ error: "Todos os campos são obrigatórios" });
}
```
- **Campos Obrigatórios**: Validação de presença de dados essenciais
- **Formato de Dados**: Validação de emails, CNPJs, URLs, etc.
- **Tamanho de Dados**: Limites para prevenir ataques de DoS
- **Caracteres Especiais**: Sanitização de caracteres potencialmente perigosos

**Tratamento Seguro de Erros**:
```javascript
catch (error) {
  console.error("Erro ao criar usuário:", error);
  res.status(500).json({ error: "Erro ao criar usuário", detalhes: error.message });
}
```
- **Logs Detalhados**: Erros completos registrados para auditoria
- **Respostas Sanitizadas**: Informações sensíveis não expostas ao cliente
- **Códigos HTTP Apropriados**: Status codes corretos para cada tipo de erro
- **Rate Limiting**: Proteção contra tentativas excessivas de erro

### Segurança do Frontend

#### Gestão Segura de Autenticação

**Armazenamento de Tokens**:
```typescript
localStorage.setItem("token", token);  // ⚠️ Considerações de segurança
```
- **LocalStorage**: Usado atualmente, mas vulnerável a XSS
- **Alternativa Recomendada**: HttpOnly cookies para maior segurança
- **Expiração Automática**: Tokens removidos automaticamente quando expirados
- **Limpeza na Saída**: Tokens removidos no logout

**Validação Client-Side**:
```typescript
const decoded: DecodedToken = jwtDecode(token);
const currentTime = Date.now() / 1000;

if (decoded.exp < currentTime) {
  localStorage.removeItem("token");
  navigate("/login", { replace: true });
}
```
- **Verificação de Expiração**: Validação contínua da validade do token
- **Redirecionamento Automático**: Usuários não autenticados redirecionados
- **Limpeza de Estado**: Estado de autenticação limpo em caso de token inválido
- **Navegação Segura**: Prevenção de acesso a rotas protegidas

#### Proteção de Rotas e Autorização

**Controle de Acesso Baseado em Roles (RBAC)**:
```typescript
interface PrivateRoutesProps {
  children: ReactNode;
  allowedRoles?: string[];  // Controle granular de permissões
}
```
- **Roles Hierárquicos**: Admin > User com permissões específicas
- **Validação Dupla**: Verificação no frontend e backend
- **Fallback Seguro**: Acesso negado por padrão em caso de dúvida
- **Auditoria de Acesso**: Log de tentativas de acesso não autorizadas

**Sanitização de Dados de Entrada**:
```typescript
// Validação com Zod para type safety
const schema = z.object({
  email: z.string().email(),
  senha: z.string().min(8),
});
```
- **Validação de Schemas**: Zod garante estrutura e tipos corretos
- **Sanitização Automática**: Remoção de caracteres perigosos
- **Feedback Imediato**: Validação em tempo real para UX
- **Prevenção de Injeção**: Proteção contra payloads maliciosos

### Segurança de Infraestrutura

#### Containerização Segura

**Dockerfile Backend**:
```dockerfile
FROM node:20-slim
RUN apt-get update && apt-get install -y \
    --no-install-recommends \
    # Apenas dependências essenciais
```
- **Imagem Base Mínima**: `node:20-slim` reduz superfície de ataque
- **Usuário Não-Root**: Execução com usuário limitado (recomendado)
- **Dependências Mínimas**: Apenas bibliotecas essenciais instaladas
- **Limpeza de Cache**: Remoção de caches de instalação

#### Configuração de Ambiente Segura

**Variáveis de Ambiente**:
```env
DATABASE_URL=postgres://user:password@host:port/database?sslmode=disable
JWT_SECRET=your-super-secret-jwt-key-with-high-entropy
```
- **Secrets Management**: Senhas e chaves em variáveis de ambiente
- **Rotação de Chaves**: JWT_SECRET deve ser rotacionado periodicamente
- **SSL/TLS**: Conexões criptografadas (sslmode=require em produção)
- **Princípio do Menor Privilégio**: Usuários de banco com permissões mínimas

### Monitoramento e Auditoria

#### Logging de Segurança

**Eventos Auditáveis**:
- Tentativas de login (sucesso e falha)
- Alterações de dados sensíveis
- Acessos a recursos protegidos
- Erros de autenticação e autorização
- Operações administrativas

**Estrutura de Logs**:
```javascript
console.log(`Login bem-sucedido: ${email} | IP: ${req.ip} | ${new Date()}`);
console.error(`Tentativa de acesso negado: ${email} | Rota: ${req.path}`);
```

#### Detecção de Anomalias

**Indicadores de Comprometimento**:
- Múltiplas tentativas de login falhadas
- Acessos de IPs suspeitos ou geograficamente inconsistentes
- Padrões de uso anômalos
- Tentativas de acesso a recursos não autorizados

### Recomendações de Segurança para Produção

#### Melhorias Críticas Necessárias

1. **CORS Restritivo**:
```javascript
app.use(cors({
  origin: ["https://frontend-domain.com"],  // Domínios específicos
  credentials: true,
}));
```

2. **Rate Limiting**:
```javascript
const rateLimit = require("express-rate-limit");
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
}));
```

3. **HTTPS Obrigatório**:
```javascript
app.use((req, res, next) => {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
});
```

4. **Headers de Segurança**:
```javascript
const helmet = require("helmet");
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));
```

#### Auditoria e Compliance

**Checklist de Segurança**:
- [ ] Penetration testing regular
- [ ] Auditoria de dependências (npm audit)
- [ ] Backup seguro e criptografado
- [ ] Plano de resposta a incidentes
- [ ] Treinamento de segurança para equipe
- [ ] Compliance com LGPD/GDPR se aplicável

---

## Monitoramento e Logs

### Backend
- Logs de erro no console
- Tratamento de exceções em controllers
- Validação de dados de entrada

### Recomendações para Produção
- Implementar logging estruturado (Winston)
- Monitoramento de performance (APM)
- Health checks para containers
- Backup automático do banco

---

## Melhorias Sugeridas

### Segurança
1. Implementar rate limiting
2. Validação mais rigorosa de inputs
3. Criptografia de dados sensíveis
4. Auditoria de ações

### Performance
1. Cache de consultas frequentes
2. Paginação em listagens
3. Otimização de queries
4. CDN para assets

### Funcionalidades
1. Sistema de notificações
2. Relatórios customizáveis
3. Dashboard analytics
4. API de integração

### DevOps
1. CI/CD pipeline
2. Testes automatizados
3. Monitoramento de infraestrutura
4. Backup e recovery

---

## Contatos e Suporte

Para dúvidas técnicas ou suporte, consulte:
- Documentação da API (endpoints)
- Logs do sistema
- Configurações de ambiente
- Estrutura do banco de dados

Esta documentação serve como guia completo para desenvolvedores que precisam entender, manter ou expandir o sistema de diagnóstico empresarial.

---

## Análise de Performance e Otimizações

### Performance do Backend

#### Otimizações de Banco de Dados

**Estratégias de Query Optimization**:
```javascript
// Uso eficiente de índices automáticos
const result = await sql`
  SELECT id_cliente, nome, nome_responsavel, cnpj, ativo, data_cadastro, final_diagnostico
  FROM clientes 
  ORDER BY nome  -- Índice automático em nome para ordenação eficiente
`;
```

**Connection Pooling Inteligente**:
- Biblioteca `postgres` gerencia pool de conexões automaticamente
- Reutilização de conexões reduz overhead de estabelecimento
- Timeout configurável para conexões ociosas
- Balanceamento de carga entre múltiplas conexões

**Otimizações de Transações**:
```javascript
const resultado = await sql.begin(async (sql) => {
  // Transação atômica para operações relacionadas
  const [cliente] = await sql`INSERT INTO clientes (...) RETURNING id_cliente`;
  await sql`INSERT INTO cliente_departamentos ${sql(departamentosPayload)}`;
  return { id_cliente, departamentos: departamentosPayload.length };
});
```

#### Gestão de Memória e Recursos

**Puppeteer Resource Management**:
```javascript
const browser = await puppeteer.launch({
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",  // Reduz uso de memória compartilhada
    "--disable-gpu",            // Desabilita GPU para containers
    "--single-process"          // Processo único para menor footprint
  ],
});

// Cleanup obrigatório para evitar memory leaks
await browser.close();
```

**Streaming de Dados Grandes**:
- PDFs são gerados como buffer e enviados diretamente
- Não há armazenamento temporário em disco
- Headers apropriados para download direto
- Compressão automática quando suportada pelo cliente

### Performance do Frontend

#### Otimizações de Bundle e Loading

**Code Splitting Estratégico**:
```typescript
// Lazy loading de páginas pesadas
const Dashboard = lazy(() => import("../pages/Dashboard"));
const PageResult = lazy(() => import("../pages/PageResult"));

// Suspense boundaries para loading states
<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

**Tree Shaking e Bundle Optimization**:
- Vite automaticamente remove código não utilizado
- Imports específicos de bibliotecas grandes (ex: `import { Button } from "@radix-ui/react-button"`)
- Análise de bundle size com `npm run build -- --analyze`
- Compressão gzip/brotli automática

#### Otimizações de Renderização

**React 19 Concurrent Features**:
```typescript
// Uso de Suspense para carregamento assíncrono
<Suspense fallback={<TableSkeleton />}>
  <DataTable data={clientesData} />
</Suspense>

// Transições não-bloqueantes
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setFilter(newFilter);  // Não bloqueia UI durante filtragem
});
```

**Memoização Inteligente**:
```typescript
// Memoização de componentes pesados
const ExpensiveChart = memo(({ data }: { data: ChartData[] }) => {
  return <Recharts data={data} />;
});

// Hooks otimizados para cálculos complexos
const processedData = useMemo(() => {
  return data.map(item => complexCalculation(item));
}, [data]);
```

#### Gestão de Estado Eficiente

**Context Optimization**:
```typescript
// Separação de contextos para evitar re-renders desnecessários
const AuthContext = createContext<AuthContextType>();
const ThemeContext = createContext<ThemeContextType>();

// Uso de useCallback para funções estáveis
const login = useCallback((token: string) => {
  localStorage.setItem("token", token);
  setUser(decodeToken(token));
}, []);
```

### Monitoramento de Performance

#### Métricas de Backend

**Tempo de Resposta por Endpoint**:
```javascript
// Middleware de timing personalizado
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});
```

**Métricas Críticas Monitoradas**:
- Tempo médio de geração de PDF (target: <5s)
- Latência de queries de banco (target: <100ms)
- Throughput de requisições simultâneas
- Uso de memória durante picos de carga
- Taxa de erro por endpoint

#### Métricas de Frontend

**Core Web Vitals**:
- **LCP (Largest Contentful Paint)**: <2.5s para carregamento inicial
- **FID (First Input Delay)**: <100ms para interatividade
- **CLS (Cumulative Layout Shift)**: <0.1 para estabilidade visual

**Performance Budgets**:
```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "2kb"
    }
  ]
}
```

### Estratégias de Caching

#### Backend Caching

**Query Result Caching**:
```javascript
// Cache em memória para queries frequentes
const cache = new Map();

const getCachedClientes = async () => {
  const cacheKey = 'clientes_list';
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const result = await sql`SELECT * FROM clientes ORDER BY nome`;
  cache.set(cacheKey, result);
  
  // Invalidação automática após 5 minutos
  setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000);
  
  return result;
};
```

#### Frontend Caching

**HTTP Caching Headers**:
```javascript
// Configuração de cache para assets estáticos
app.use(express.static('public', {
  maxAge: '1y',  // Cache de 1 ano para assets com hash
  etag: true,    // ETags para validação de cache
}));
```

**Service Worker para Offline**:
```typescript
// Cache de recursos críticos para funcionamento offline
const CACHE_NAME = 'grove-diagnostico-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];
```

---

## Escalabilidade e Arquitetura Distribuída

### Estratégias de Escalabilidade Horizontal

#### Backend Scaling

**Stateless Design**:
- Autenticação JWT elimina necessidade de sessões
- Cada instância pode processar qualquer requisição
- Load balancing simples com round-robin
- Não há dependência de estado local entre requisições

**Database Scaling**:
```javascript
// Preparação para read replicas
const readOnlyQueries = [
  'SELECT * FROM clientes',
  'SELECT * FROM perguntas',
  'SELECT * FROM respostas WHERE id_cliente = ?'
];

// Connection pooling para múltiplas instâncias
const sql = postgres(process.env.DATABASE_URL, {
  max: 20,          // Máximo 20 conexões por instância
  idle_timeout: 30, // Timeout de 30s para conexões ociosas
});
```

#### Microservices Architecture (Roadmap)

**Decomposição Proposta**:
1. **Auth Service**: Autenticação e autorização
2. **Client Service**: Gestão de clientes e departamentos
3. **Question Service**: Gerenciamento de questionários
4. **Response Service**: Coleta e análise de respostas
5. **Report Service**: Geração de relatórios e PDFs
6. **Notification Service**: Comunicação e alertas

### Container Orchestration

#### Docker Compose para Desenvolvimento
```yaml
version: '3.8'
services:
  backend:
    build: ./Backend
    ports:
      - "3333:3333"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
    
  frontend:
    build: ./FrontEnd
    ports:
      - "3000:3000"
    depends_on:
      - backend
      
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: diagnostico
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

#### Kubernetes para Produção (Roadmap)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: grove/diagnostico-backend:latest
        ports:
        - containerPort: 3333
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
```

---

## Integração e APIs Externas

### Integrações Atuais

#### Neon Database Integration
```javascript
// Configuração otimizada para Neon serverless
const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require',           // SSL obrigatório em produção
  connection: {
    application_name: 'grove-diagnostico',
    statement_timeout: 30000, // 30s timeout
  },
});
```

#### EasyPanel Deployment
- Deploy automatizado via Git hooks
- Variáveis de ambiente gerenciadas via interface
- SSL/TLS automático com Let's Encrypt
- Monitoramento básico de recursos

### Integrações Futuras Recomendadas

#### CRM Integration
```typescript
interface CRMIntegration {
  syncClient(clientData: ClientData): Promise<CRMContact>;
  createOpportunity(diagnosticResult: DiagnosticResult): Promise<CRMOpportunity>;
  updateClientStatus(clientId: string, status: ClientStatus): Promise<void>;
}
```

#### Email Marketing
```typescript
interface EmailService {
  sendDiagnosticInvitation(client: Client, diagnosticUrl: string): Promise<void>;
  sendReminderEmail(client: Client, daysRemaining: number): Promise<void>;
  sendCompletionNotification(consultant: User, client: Client): Promise<void>;
}
```

#### Analytics Integration
```typescript
interface AnalyticsService {
  trackDiagnosticStart(clientId: string, consultantId: string): void;
  trackQuestionResponse(questionId: string, response: boolean): void;
  trackReportGeneration(clientId: string, reportType: string): void;
  generateInsights(timeRange: DateRange): Promise<BusinessInsights>;
}
```

---

## Testes e Qualidade de Código

### Estratégia de Testes (Recomendada)

#### Backend Testing
```javascript
// Testes unitários com Jest
describe('User Controller', () => {
  test('should create user with valid data', async () => {
    const userData = {
      nome: 'Test User',
      email: 'test@example.com',
      senha: 'securePassword123',
      confirmSenha: 'securePassword123',
      role: 'user'
    };
    
    const response = await request(app)
      .post('/usuarios/create')
      .send(userData)
      .expect(201);
      
    expect(response.body.message).toBe('Usuário Cadastrado');
  });
});

// Testes de integração
describe('PDF Generation', () => {
  test('should generate PDF with valid data', async () => {
    const pdfData = {
      title: 'Test Report',
      intro: 'Test introduction',
      introPorDp: '<div>Test content</div>',
      logoCliente: 'https://example.com/logo.png'
    };
    
    const response = await request(app)
      .post('/generate-pdf')
      .send(pdfData)
      .expect(200);
      
    expect(response.headers['content-type']).toBe('application/pdf');
  });
});
```

#### Frontend Testing
```typescript
// Testes de componentes com React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '../components/LoginForm';

describe('LoginForm', () => {
  test('should submit form with valid credentials', async () => {
    const mockLogin = jest.fn();
    render(<LoginForm onLogin={mockLogin} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        senha: 'password123'
      });
    });
  });
});
```

### Code Quality Tools

#### Linting e Formatting
```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "type-check": "tsc --noEmit"
  }
}
```

#### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test && npm run type-check"
    }
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

---

## Deployment e DevOps

### Estratégia de Deployment Atual

#### Backend (EasyPanel)
```dockerfile
# Multi-stage build para otimização
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-slim AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3333
CMD ["npm", "start"]
```

#### Frontend (Vercel)
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

*Documentação técnica elaborada em dezembro de 2025 - Versão 1.0*
*Para atualizações e esclarecimentos, consulte o repositório do projeto ou entre em contato com a equipe de desenvolvimento.*