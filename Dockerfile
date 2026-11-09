# 安装依赖
FROM node:20-alpine AS deps
LABEL author="xiaozhu <xiaozhuzhulzq@163.com>"

WORKDIR /app

# sharp 在 alpine 上需要 libc6-compat
RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases /app/.yarn/releases

RUN yarn install --frozen-lockfile

# 构建
FROM node:20-alpine AS builder
LABEL author="xiaozhu <xiaozhuzhulzq@163.com>"

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# 生产运行
FROM node:20-alpine AS runner
LABEL author="xiaozhu <xiaozhuzhulzq@163.com>"

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
