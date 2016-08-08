FROM node:4.4-slim

ENV NODE_ENV production
EXPOSE 80

# Run 'npm run build' first

RUN mkdir /app
RUN mkdir /app/build
ADD build /app/build
ADD package.json /app
WORKDIR /app

RUN npm install --production

CMD npm start
