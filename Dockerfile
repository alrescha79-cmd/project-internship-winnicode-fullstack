# Step 1: Build the React app
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the built app with Nginx
FROM nginx:stable-alpine

# Copy the build output from the previous stage to the Nginx HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 to the outside world for Cloud Run
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
