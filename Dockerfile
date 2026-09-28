FROM node:22-alpine

RUN npm install --prefix /opt/microgate-server express@5.2.1 --omit=dev --no-audit --no-fund

COPY docker/server.js /opt/microgate-server/server.js

ENV NODE_PATH=/opt/microgate-server/node_modules
ENV PORT=8089
ENV SITE_ROOT=/site

EXPOSE 8089

CMD ["node", "/opt/microgate-server/server.js"]
