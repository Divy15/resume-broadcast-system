# ==========================================
# STAGE 1: Build the React 19 App
# ==========================================
FROM node:24-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Clean install dependencies
RUN npm ci

# Copy remaining source code
COPY . .

# Build the production bundle (Outputs to /app/dist for Vite or /app/build for CRA)
RUN npm run build


# ==========================================
# STAGE 2: Serve with Nginx
# ==========================================
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static files from Stage 1
# Note: Change '/app/dist' to '/app/build' if using Create-React-App instead of Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]