# Use the official Node.js 16 image
FROM node:16.15.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files into the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application source code
COPY . .

# Define a default command that keeps the container running
#CMD ["tail", "-f", "/dev/null"]
