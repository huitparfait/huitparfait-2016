FROM node:6.2.0

RUN mkdir /app
WORKDIR /app

# Copy sources and config
COPY ./config /app/config
COPY ./src /app/src
COPY ./.babelrc /app
COPY ./package.json /app

# Build application
RUN npm install
RUN npm run build

# Clean build dependencies
RUN npm prune --production
RUN rm /app/.babelrc

ENTRYPOINT ["npm", "run", "start"]