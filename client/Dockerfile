# ---------- Этап 1: Сборка приложения ----------
FROM node:20-alpine AS builder

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости (без dev-зависимостей)
RUN npm ci

# Копируем исходники проекта
COPY . .

COPY .env.docker .env

# Сборка продакшн версии
RUN npm run build

# ---------- Этап 2: Запуск на Nginx ----------
FROM nginx:1.27-alpine AS production

# Копируем сборку из предыдущего этапа
COPY --from=builder /app/dist /usr/share/nginx/html

# (опционально) Копируем свой конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Создаём непривилегированного пользователя
RUN adduser -D appuser && \
    mkdir -p /var/cache/nginx /var/run /run && \
    chown -R appuser:appuser /usr/share/nginx/html /var/cache/nginx /var/run /run /etc/nginx/conf.d

USER appuser

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx в foreground
CMD ["nginx", "-g", "daemon off;"]
