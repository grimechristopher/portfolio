#!/bin/bash

# Pre-deployment setup script
echo "🔧 Setting up environment for deployment..."

# Get the current user
CURRENT_USER=$(whoami)

# Create necessary directories
echo "📁 Creating required directories..."
mkdir -p ./public/uploads
mkdir -p ./api/public/uploads

# Set proper ownership and permissions
echo "🔐 Setting permissions..."
sudo chown -R $CURRENT_USER:$CURRENT_USER ./public/uploads
sudo chown -R $CURRENT_USER:$CURRENT_USER ./api/public/uploads
chmod -R 755 ./public/uploads
chmod -R 755 ./api/public/uploads

# Create uploads directories inside containers if they don't exist
echo "📁 Ensuring container directories exist..."
if [ "$(docker ps -q -f name=strapi-prod)" ]; then
    docker exec strapi-prod mkdir -p /opt/app/public/uploads || true
    docker exec strapi-prod chown -R node:node /opt/app/public/uploads || true
fi

if [ "$(docker ps -q -f name=portfolio-prod)" ]; then
    docker exec portfolio-prod mkdir -p /opt/app/.output/public/uploads || true
    docker exec portfolio-prod chown -R nuxt:nodejs /opt/app/.output/public/uploads || true
fi

echo "✅ Pre-deployment setup complete!"
