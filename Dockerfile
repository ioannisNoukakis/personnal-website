# Build environment
FROM node:14.17.3-alpine as builder

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --network-timeout 100000

COPY . .

RUN	yarn build

# Runtime environment
FROM nginx:1.19.3-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY nginx-conf /etc/nginx

RUN mkdir -p /var/www/frontend
COPY --from=builder /app/build/. /var/www/frontend/

# Start Nginx server
CMD ["/bin/sh", "-c", "nginx -g \"daemon off;\""]


