FROM node:18-alpine
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy app source
COPY . .

RUN mkdir -p public

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
