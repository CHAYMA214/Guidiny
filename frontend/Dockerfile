FROM node:20 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /usr/src/app
RUN npm install -g serve
COPY --from=builder /usr/src/app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
