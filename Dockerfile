FROM node:23-alpine

# Set working directory inside the container
WORKDIR /var/www/simple-be

# Copy package.json and package-lock.json (if it exists) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]