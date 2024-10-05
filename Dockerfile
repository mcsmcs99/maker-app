FROM node:lts-iron as base

WORKDIR /usr/src/app

# Instala Quasar CLI e IconGenie
RUN npm install -g @quasar/cli @quasar/icongenie

# Copia arquivos de configuração e instala as dependências
COPY package*.json ./
COPY yarn.lock ./
COPY quasar.config.js ./
COPY postcss.config.cjs ./
COPY jsconfig.json ./
RUN yarn

# Gerar ícones
# TODO - Determinar ícones a serem gerados
# icongenie generate -i /path/to/icon.png
# icongenie g -i /path/to/icon.png

FROM base as dev

CMD ["quasar", "dev"]
