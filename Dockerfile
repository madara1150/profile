# ==========================================
# Build Stage 1: Next.js Frontend
# ==========================================
FROM node:18-alpine AS frontend-builder
WORKDIR /app

# Install dependencies first for better caching
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the Next.js app and build
COPY . .
# Temporarily disable next lint/typecheck during docker build if preferred, 
# but here we build normally.
RUN yarn build

# ==========================================
# Build Stage 2: Go Backend
# ==========================================
FROM golang:1.21-alpine AS backend-builder
WORKDIR /app/backend

# Install necessary build tools for CGO if needed (sqlite pure go driver shouldn't need it, but good practice)
RUN apk add --no-cache build-base

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ ./
# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/backend/server main.go

# ==========================================
# Final Stage: Production Runner
# ==========================================
FROM alpine:latest AS runner
WORKDIR /app

# Install Node.js in the final Alpine image to run the standalone Next.js server
RUN apk add --no-cache nodejs

# --- Copy Go Backend ---
WORKDIR /app/backend
COPY --from=backend-builder /app/backend/server .
# Ensure the uploads directory exists for the backend
RUN mkdir -p /app/backend/uploads/images /app/backend/uploads/files

# --- Copy Next.js Frontend ---
WORKDIR /app/frontend
COPY --from=frontend-builder /app/public ./public
# Automatically leverage output traces to reduce image size
COPY --from=frontend-builder /app/.next/standalone ./
COPY --from=frontend-builder /app/.next/static ./.next/static

# Expose ports (Next.js runs on 3000, Go backend on 8080)
EXPOSE 3000
EXPOSE 8080

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy start script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Run both servers
WORKDIR /app
CMD ["./start.sh"]
