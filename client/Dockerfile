FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

COPY .env.docker .env

RUN npm run build

# 2 стадия
FROM nginx:1.27-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN adduser -D appuser && \
    mkdir -p /var/cache/nginx /var/run /run && \
    chown -R appuser:appuser /usr/share/nginx/html /var/cache/nginx /var/run /run /etc/nginx/conf.d

USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
