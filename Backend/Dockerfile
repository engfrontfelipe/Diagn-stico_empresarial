# Imagem base oficial com Node.js e suporte ao Puppeteer
FROM node:20-slim

# Instala dependências essenciais para o Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \                        
    libxshmfence1 \                  
    libgl1 \                     
    xdg-utils \
    --no-install-recommends \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

# Instala dependências do projeto Node.js
RUN npm install

# Expõe a porta usada pela aplicação
EXPOSE 3333

# Comando padrão para iniciar o servidor
CMD ["npm", "start"]
