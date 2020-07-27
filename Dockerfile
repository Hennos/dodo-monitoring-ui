FROM node:10.13-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . .
RUN npm run build
RUN npm install -g serve

EXPOSE 15033
CMD ["serve", "-s", "build", "-l" ,"15033"]