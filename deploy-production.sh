#!/bin/bash

# Production Deployment Script
set -e

echo "🚀 Starting production deployment..."

# Check if production environment files exist
if [ ! -f ".env.production" ]; then
    echo "❌ .env.production file not found!"
    exit 1
fi

if [ ! -f "nuxt-client/.env.production" ]; then
    echo "❌ nuxt-client/.env.production file not found!"
    exit 1
fi

if [ ! -f "api/.env.production" ]; then
    echo "❌ api/.env.production file not found!"
    exit 1
fi

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
