FROM node:20.12.2

#RUN apt-get update && apt-get install -yq make

WORKDIR /app

#COPY package.json .
#COPY package-lock.json .

#RUN npm ci

#COPY . .

#CMD ["bash", "-c", "npm run migrate && npx fastify start -a 0.0.0.0 -l info -P app.js"]
