
FROM node:8-alpine as builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:1.15.8-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf