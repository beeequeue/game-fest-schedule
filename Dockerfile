# deps cache
FROM node:22.11.0-alpine AS install

ENV PNPM_HOME=/pnpm
ENV CI=1

RUN corepack enable

# dev
RUN mkdir -p /tmp/dev

COPY package.json .npmrc pnpm-lock.yaml /tmp/dev/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store cd /tmp/dev && pnpm install --frozen-lockfile

FROM node:22.11.0-alpine AS build

ENV PNPM_HOME=/pnpm
ENV CI=1

WORKDIR /app
RUN corepack enable

# cached deps
COPY --from=install /tmp/dev/node_modules /app/node_modules

# App stuff
COPY package.json .npmrc pnpm-lock.yaml vite.config.ts unocss.config.ts tsconfig.json index.html /app/
COPY adapters /app/adapters
COPY src /app/src

# Run with...
ENV PNPM_HOME=/pnpm
ENV NODE_ENV=production

RUN pnpm build

FROM node:22.11.0-alpine

ENV PNPM_HOME=/pnpm
ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

# App stuff
COPY --from=build /app/server /app/server
COPY --from=build /app/dist /app/dist

# run the app
CMD ["node", "server/entry.node-server.js"]
