# Stage 1: Build the Angular app
FROM node:18 AS build
WORKDIR /app

# Copy package files first
COPY package*.json ./
RUN npm install

# Now copy the rest of the app files
COPY . .  
RUN npm run build --prod

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

# Optional health check for Nginx
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
