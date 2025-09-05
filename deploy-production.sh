#!/bin/bash
# Production Deployment Script
set -e

echo "🚀 Starting production deployment..."

# Create persistent directories (outside temp workspace)
echo "📁 Creating persistent directories..."
mkdir -p /mnt/homeserver/portfolio/uploads
mkdir -p /mnt/homeserver/portfolio/strapi-uploads

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.production.yml down

# Build and start production containers
echo "🔨 Building and starting production containers..."
docker-compose -f docker-compose.production.yml up --build -d

# Show status
echo "📊 Container status:"
docker-compose -f docker-compose.production.yml ps

echo "✅ Production deployment complete!"
echo "🌐 Portfolio: https://chrisgrime.com"
echo "🔧 Strapi Admin: https://strapi.chrisgrime.com/admin"