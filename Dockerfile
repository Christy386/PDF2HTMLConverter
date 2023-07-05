# Use a Debian-based Node.js image as the base
FROM debian:latest

# Set the working directory inside the container
WORKDIR /srv/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN apt update && apt install -y npm && npm install

# Copy the remaining application files to the container
COPY . .

# Expose a port (change if your Node.js app uses a different port)
EXPOSE 3300

# Start the Node.js application
CMD ["node", "index"]
