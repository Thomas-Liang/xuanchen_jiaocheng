---
title: "Docker 容器化部署完整流程"
description: "从 Dockerfile 到 CI/CD，手把手教你容器化部署应用"
author: "泫晨云栖"
publishDate: "2026-03-01"
lastModified: "2026-03-14"
coverImage: "https://picsum.photos/seed/docker/800/450"
tags: ["Docker", "DevOps", "容器化"]
isDraft: false
---

Docker 是现代应用部署的核心技术，本文将详细介绍容器化流程。

## 什么是 Docker？

Docker 是一个开源的容器化平台，可以打包和运行应用程序。

## 编写 Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

## Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

## 构建和运行

```bash
# 构建镜像
docker build -t myapp .

# 运行容器
docker run -p 3000:3000 myapp

# 使用 docker-compose
docker-compose up -d
```

## 生产环境最佳实践

1. 使用多阶段构建减小镜像体积
2. 不要在镜像中存储敏感信息
3. 使用健康检查
4. 设置资源限制