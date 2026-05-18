FROM node:20-alpine

WORKDIR /app

# Зависимости отдельным слоем для кеша
COPY package*.json ./
RUN npm ci

# Код смонтируется volume'ом из docker-compose, но кладём для cold-start
COPY . .

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]