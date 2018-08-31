FROM node:8-alpine AS buildDep
WORKDIR /opt/app-root/src
COPY package*.json ./
RUN npm i

FROM node:8-alpine AS buildApp
ARG COMPANY_API
ARG EMPLOYEE_API
WORKDIR /opt/app-root/src
COPY package.json package.json
COPY --from=buildDep /opt/app-root/src/node_modules ./node_modules
COPY public ./public
COPY src ./src
RUN printf "REACT_APP_COMPANY_API=$COMPANY_API\nREACT_APP_EMPLOYEE_API=$EMPLOYEE_API" >> .env
RUN npm run build

FROM node:8-alpine
WORKDIR /opt/app-root/src
COPY --from=buildApp /opt/app-root/src/build ./build
COPY --from=buildDep /opt/app-root/src/node_modules ./node_modules
COPY package.json package.json
COPY server.js server.js
CMD [ "npm", "run", "start-prod" ]