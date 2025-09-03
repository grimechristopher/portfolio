# Use Node.js 20 LTS (Alpine for smaller image size)
FROM node:20-alpine

# Set working directory
WORKDIR /opt/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Create uploads directory with proper permissions
RUN mkdir -p public/uploads && chown -R node:node public/uploads

# Build the Strapi application
RUN npm run build

# Use non-root user
USER node

# Expose port
EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD node -e "const http=require('http'); const req=http.request({host:'localhost',port:1337,path:'/admin',timeout:2000},()=>process.exit(0)); req.on('error',()=>process.exit(1)); req.end();"

# Start the application
CMD ["npm", "start"]
