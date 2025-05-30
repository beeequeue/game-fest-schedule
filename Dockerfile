#base
FROM node:24-alpine AS base

ENV PNPM_HOME=/pnpm
ENV NODE_OPTIONS="--enable-source-maps --disable-warning=ExperimentalWarning"
ENV NODE_ENV=production

RUN corepack enable

RUN mkdir /app
WORKDIR /app

# deps cache
FROM base AS install

ENV CI=1

# dev
RUN mkdir -p /tmp/dev
WORKDIR /tmp/dev

RUN \
    --mount=type=cache,id=pnpm,target=/pnpm/store  \
    --mount=type=bind,source=package.json,target=/tmp/dev/package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=/tmp/dev/pnpm-lock.yaml \
    --mount=type=bind,source=pnpm-workspace.yaml,target=/tmp/dev/pnpm-workspace.yaml \
    pnpm install --frozen-lockfile --ignore-scripts

FROM base AS build

ENV CI=1

# cached deps
COPY --from=install /tmp/dev/node_modules /app/node_modules

# App stuff
COPY package.json pnpm-workspace.yaml vite.config.ts unocss.config.ts tsconfig.json index.html /app/
COPY adapters /app/adapters
COPY src /app/src

RUN node --run build

FROM base

# App stuff
COPY --from=build /app/server /app/server
COPY --from=build /app/dist /app/dist

# run the app
CMD ["node", "server/entry.node-server.js"]
