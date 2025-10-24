# --- Single stage build/run ---
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Railway sẽ inject NEXT_PUBLIC_API_URL vào runtime ENV
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build tại runtime (Railway có env)
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
