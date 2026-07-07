FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build step if needed, but we'll use tsx for simplicity in this demo environment
# If you prefer a production build, uncomment the next line and change CMD
# RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
