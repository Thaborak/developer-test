# Use an official lightweight Node image to build the React app
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Use Nginx to serve the React app
FROM nginx:alpine

# Copy the build folder from React to the root of nginx (www)
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000 to the outer world
EXPOSE 3000

# Launch nginx
CMD ["nginx", "-g", "daemon off;"]
