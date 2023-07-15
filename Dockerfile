FROM node:14
WORKDIR /xana-web-next
COPY package.json .
RUN npm install
COPY . .
RUN npm run stage:build
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "stage:start" ]