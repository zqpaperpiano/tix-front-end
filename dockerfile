FROM node:18-alpine
COPY . /app/front-end/
WORKDIR /app/front-end
RUN npm install
CMD ["npm","start"]