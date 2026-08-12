FROM node:20-alpine AS builder
WORKDIR /app
COPY lilon/package.json lilon/package-lock.json ./
RUN npm install --legacy-peer-deps
COPY lilon/ ./
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
