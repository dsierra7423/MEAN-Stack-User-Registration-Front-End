
FROM node:latest as builder

WORKDIR /app
COPY . .   
RUN npm install && npm run build

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf