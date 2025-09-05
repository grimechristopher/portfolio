# Multi-stage build for production
# Build stage
FROM node:20-alpine as builder
# Set working directory
WORKDIR /opt/app
# Copy package files
COPY package*.json ./
# Install dependencies (including dev dependencies for building)
RUN npm ci && npm cache clean --force
# Copy source code
COPY . .
# Set build-time environment variables for Supabase
ENV SUPABASE_URL=https://supabase.chrisgrime.com
ENV SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcSI6InN1cGFiYXNlIiwiaWF0IjoxNzU2MTkxNjAwLCJleHAiOjE5MTM5NTgwMDB9.m6ZSBvlHqBJpNPSeIfnXm35vcxfYThFSQj3K4qw0tTM
# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

# Set working directory
WORKDIR /opt/app

# Copy built application from builder stage
COPY --from=builder /opt/app/.output /opt/app/.output

# Copy package files for runtime dependencies
COPY --from=builder /opt/app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nuxt -u 1001

# Create uploads directory with proper permissions
RUN mkdir -p .output/public/uploads && chown -R nuxt:nodejs .output/public/uploads

# Use non-root user
USER nuxt

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD node -e "const http=require('http'); const req=http.request({host:'localhost',port:3000,path:'/',timeout:2000},()=>process.exit(0)); req.on('error',()=>process.exit(1)); req.end();"

# Start the application
CMD ["node", ".output/server/index.mjs"]
