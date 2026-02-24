# ==========================================
# Build Stage 1: Next.js Frontend
# ==========================================
FROM node:22-alpine AS frontend-builder
# Next.js SWC compiler and Prisma require libc6-compat and openssl
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install dependencies first for better caching
COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci || yarn install

# Copy the rest of the Next.js app 
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js app
RUN npm run build || yarn build

# ==========================================
# Build Stage 2: Go Backend
# ==========================================
FROM golang:1.25-alpine AS backend-builder
WORKDIR /app/backend

# Install necessary build tools
RUN apk add --no-cache build-base

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ ./
# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/backend/server main.go

# ==========================================
# Final Stage: Production Runner
# ==========================================
FROM node:22-alpine AS runner
WORKDIR /app

# Required for Prisma
RUN apk add --no-cache openssl

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
# Copy Prisma Client generated folder and schema
COPY --from=frontend-builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=frontend-builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=frontend-builder /app/prisma ./prisma

# Expose ports (Next.js runs on 3000, Go backend on 8080)
EXPOSE 3000
EXPOSE 8080

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
# Ensure Prisma points to the mounted backend volume
ENV DATABASE_URL="file:../backend/project.db"

# Copy start script
WORKDIR /app
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Run both servers
CMD ["./start.sh"]
