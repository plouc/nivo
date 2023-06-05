FROM node:latest
#ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app
COPY . .

RUN npm install pnpm
RUN make init

COPY . .