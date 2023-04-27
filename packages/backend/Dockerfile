# Base image
FROM node:latest AS production

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Generate Prisma Client
RUN yarn prisma generate

# Creates a "dist" folder with the production build
RUN yarn build

# Set NODE_ENV to "production"
ENV NODE_ENV=production

# Start the server using the production build
CMD [ "node", "dist/main.js" ]