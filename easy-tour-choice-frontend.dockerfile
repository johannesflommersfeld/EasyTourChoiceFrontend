# Build stage
FROM node:24-alpine AS builder
RUN apk add --no-cache git
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build --configuration=production -y

# Production stage
FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
VOLUME ["/app/dist"]
CMD ["echo", "Angular build complete"]