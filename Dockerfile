FROM node:22-alpine AS base

WORKDIR /app

# Install dependencies needed for building
RUN apk add --no-cache libc6-compat

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

FROM base AS builder

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/next-i18next.config.js ./

# Install only production dependencies
RUN npm install --omit=dev

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]