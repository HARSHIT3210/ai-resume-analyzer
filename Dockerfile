# Use Node.js official image as base
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the app code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start the Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
