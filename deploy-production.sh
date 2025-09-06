#!/bin/bash
# Production Deployment Script
set -e

echo "🚀 Starting production deployment..."

# Create persistent directories (outside temp workspace)
echo "📁 Creating persistent directories..."
mkdir -p /mnt/homeserver/portfolio/uploads
mkdir -p /mnt/homeserver/portfolio/strapi-uploads

# Create .env file for Docker Compose from environment variables
echo "📝 Creating .env file from environment variables..."
cat > .env << EOF
# Frontend Variables
NUXT_PUBLIC_BASE_URL=${NUXT_PUBLIC_BASE_URL}
NUXT_PUBLIC_STRAPI_URL=${NUXT_PUBLIC_STRAPI_URL}
SUPABASE_URL=${SUPABASE_URL}
SUPABASE_KEY=${SUPABASE_KEY}

# Environment
NODE_ENV=${NODE_ENV}

# Database Configuration
DATABASE_CLIENT=${DATABASE_CLIENT}
DATABASE_HOST=${DATABASE_HOST}
DATABASE_PORT=${DATABASE_PORT}
DATABASE_NAME=${DATABASE_NAME}
DATABASE_USERNAME=${DATABASE_USERNAME}
DATABASE_PASSWORD=${DATABASE_PASSWORD}
DATABASE_SCHEMA=${DATABASE_SCHEMA}
DATABASE_SSL=${DATABASE_SSL}

# Strapi Configuration
JWT_SECRET=${JWT_SECRET}
ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET}
APP_KEYS=${APP_KEYS}
API_TOKEN_SALT=${API_TOKEN_SALT}
TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN_SALT}
ENCRYPTION_KEY=${ENCRYPTION_KEY}
EOF

echo "✅ Environment file created"

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.production.yml down

# Build and start production containers
echo "🔨 Building and starting production containers..."
docker-compose -f docker-compose.production.yml up --build -d

# Clean up env file
echo "🧹 Cleaning up environment file..."
rm -f .env

# Show status
echo "📊 Container status:"
docker-compose -f docker-compose.production.yml ps

echo "✅ Production deployment complete!"
echo "🌐 Portfolio: https://chrisgrime.com"
echo "🔧 Strapi Admin: https://strapi.chrisgrime.com/admin"