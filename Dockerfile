FROM node:16
WORKDIR /app/api/ticket-plus/
COPY package*.json ./
RUN npm i --force
COPY . .
CMD ["npm", "start"]
EXPOSE 3030