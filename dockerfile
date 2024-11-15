# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy necessary files to the working directory
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY src ./src
COPY profiles ./profiles

# Install dependencies
RUN npm install

# Install ts-node globally for running TypeScript files
RUN npm install -g ts-node

# Expose the port your application runs on (replace 3000 if needed)
EXPOSE 3000

# Set the command to run the server using ts-node
CMD ["npx", "ts-node", "src/main.ts"]
