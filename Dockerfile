FROM node

WORKDIR /app

COPY package.json .

RUN npm i --legacy-peer-deps

COPY . . 

RUN npx prisma generate

USER root 

ENTRYPOINT /bin/bash -c "NODE_ENV=production npm run dev"