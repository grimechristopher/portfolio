#!/bin/bash

# Production Deployment Script
set -e

echo "🚀 Starting production deployment..."

# Check if we're running in GitHub Actions or have environment variables set
if [ -z "$DATABASE_CLIENT" ] && [ ! -f ".env.deploy" ]; then
    echo "❌ No environment variables found! Please set them in GitHub secrets or create .env.deploy file"
    exit 1
fi

# Load environment variables if .env.deploy exists (for GitHub Actions)
if [ -f ".env.deploy" ]; then
    echo "📄 Loading environment variables from .env.deploy..."
    export $(cat .env.deploy | xargs)
fi

# Create necessary directories with proper permissions
echo "📁 Creating directories with proper permissions..."
mkdir -p ./public/uploads
mkdir -p ./api/public/uploads

# Fix file permissions before deployment
echo "🔧 Fixing file permissions..."
sudo chown -R $USER:$USER ./public/uploads || chown -R $USER:$USER ./public/uploads
sudo chown -R $USER:$USER ./api/public/uploads || chown -R $USER:$USER ./api/public/uploads
sudo chmod -R 755 ./public/uploads || chmod -R 755 ./public/uploads
sudo chmod -R 755 ./api/public/uploads || chmod -R 755 ./api/public/uploads

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.production.yml down

# Remove old volumes to prevent conflicts
echo "🧹 Cleaning up old volumes..."
docker volume prune -f

# Build and start production containers
echo "🔨 Building and starting production containers..."
docker-compose -f docker-compose.production.yml up --build -d

# Wait for containers to be ready
echo "⏳ Waiting for containers to start..."
sleep 10

# Fix container permissions if needed
echo "🔧 Ensuring proper container permissions..."
docker-compose -f docker-compose.production.yml exec -T strapi chown -R node:node /opt/app/public/uploads || true
docker-compose -f docker-compose.production.yml exec -T portfolio chown -R nuxt:nodejs /opt/app/.output/public/uploads || true

# Show status
echo "📊 Container status:"
docker-compose -f docker-compose.production.yml ps

echo "✅ Production deployment complete!"
echo "🌐 Portfolio: https://chrisgrime.com"
echo "🔧 Strapi Admin: https://strapi.chrisgrime.com/admin"
