FROM node:12.18.4
#ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app
COPY . .

RUN npm install yarn
RUN make init

COPY . .