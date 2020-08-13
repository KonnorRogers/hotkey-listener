FROM node:12-slim

RUN mkdir -p /myapp
WORKDIR /myapp

COPY package.json yarn.lock ./
RUN yarn install
COPY . .

CMD ["yarn", "jest"]
