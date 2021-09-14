FROM node:16.3-alpine AS build
WORKDIR /app
COPY . /app
RUN yarn && yarn build

FROM node:16.3-alpine
WORKDIR /app
COPY package.json /app
COPY --from=build /app/backend/package.json /app/backend/package.json
COPY --from=build /app/backend/dist /app/backend/dist
COPY --from=build /app/frontend/.env /app/frontend/.env
COPY --from=build /app/frontend/public /app/frontend/public
COPY --from=build /app/frontend/.next /app/frontend/.next
COPY --from=build /app/frontend/package.json /app/frontend/package.json
COPY --from=build /app/frontend/next.config.js /app/frontend/next.config.js
RUN yarn --prod
CMD [ "yarn", "start:prod" ]
EXPOSE 3000
