FROM node:4.4-slim

EXPOSE 80

# Run 'npm run build' first

RUN mkdir /app
ADD build /app
ADD package.json /app
WORKDIR /app

RUN npm install

CMD npm start
