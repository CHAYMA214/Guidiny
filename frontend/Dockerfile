FROM node:20
WORKDIR /usr/src/app
ENV node_ENV production 
COPY package*.json ./
RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm ci --only=production
RUN npm ci --only=production 
USER node 
COPY --chown=node:node . .
EXPOSE 3000
CMD ["node", "app.js"]