# Multi-stage build for production
# Build stage
FROM node:20-alpine as builder

# Accept build arguments
ARG SUPABASE_URL
ARG SUPABASE_KEY
ARG NUXT_PUBLIC_BASE_URL
ARG NUXT_PUBLIC_STRAPI_URL
ARG NODE_ENV

# Set working directory
WORKDIR /opt/app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for building)
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Set build-time environment variables
ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_KEY=${SUPABASE_KEY}
ENV NUXT_PUBLIC_BASE_URL=${NUXT_PUBLIC_BASE_URL}
ENV NUXT_PUBLIC_STRAPI_URL=${NUXT_PUBLIC_STRAPI_URL}
ENV NODE_ENV=${NODE_ENV}

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