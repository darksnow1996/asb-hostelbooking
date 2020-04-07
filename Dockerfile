# Install nodejs

FROM node:13.1.0
WORKDIR /app/src
COPY package.json .
RUN npm install --quiet
COPY . . 
EXPOSE 3000
CMD ["npm", "run","dev"]


