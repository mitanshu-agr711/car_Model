FROM node:22-alpine AS base

WORKDIR /app

# Install dependencies needed for building native modules
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache --virtual .gyp python3 make g++

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies - leveraging Docker cache
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production image, copy built artifacts and remove dev dependencies
FROM node:22-alpine AS production

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Command to run the application
CMD ["npm", "start"]