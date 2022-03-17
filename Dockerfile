FROM node:16

WORKDIR /app

COPY . .
COPY .env.prod .env

RUN npm install -g npm@8.5.4
RUN npm install -g serve
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["serve", "-p", "3000", "-s", "build/"]




