FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx tsc --noEmit false

FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY src/config/sql ./src/config/sql
COPY festival_add_personnel.sql festival_full_data.sql ./

RUN mkdir -p uploads

EXPOSE 3000

CMD ["npm", "start"]
