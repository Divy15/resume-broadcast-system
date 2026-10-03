# Use Node.js 24 Alpine image
FROM node:24-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first for cached layer installation
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application source code and config folder
COPY . .

# Expose port 3000
EXPOSE 3000

# Default command
CMD ["npm", "start"]