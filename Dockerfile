FROM node:13

WORKDIR /src

# Install app dependencies
COPY . .
RUN yarn install

EXPOSE 3000
CMD ["yarn", "run", "start"]
