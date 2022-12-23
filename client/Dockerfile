FROM node:14.0-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install redux
RUN npm install redux-thunk
RUN npm install redux-devtools-extension
COPY . .
ENV PORT 3000
EXPOSE $PORT
VOLUME ["/app/data"]
RUN npm run build
CMD ["npm", "start"]
# run-prod: docker run -d -p 80:3000 -v data:/app/data --name timer-app client-timer
# run-dev: docker run -d -p 80:3000 -v "/home/user/Projects/time-organizer-v2/client:/app" -v /app/node_modules -v data:/app/data --name timer-app client-timer