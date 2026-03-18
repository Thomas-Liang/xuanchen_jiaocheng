---
title: "Astro 5 完全指南：构建下一代静态网站"
description: "深入学习 Astro 5 框架，掌握内容优先的网站构建方法"
author: "泫晨云栖"
publishDate: "2026-03-10"
lastModified: "2026-03-17"
coverImage: "https://picsum.photos/seed/astro5/800/450"
tags: ["Astro", "前端", "静态网站"]
isDraft: false
---

Astro 5 是一个专注于内容的网站框架，它将改变你构建网站的方式。

## 什么是 Astro？

Astro 是一个全栈 Web 框架，专门为内容驱动型网站设计。

## 主要特性

### 1. 零 JavaScript 默认

Astro 默认不发送任何 JavaScript 到客户端，只在需要时使用 Islands 架构。

### 2. 内容集合

```typescript
// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    published: z.date(),
  }),
});
```

### 3. View Transitions

Astro 内置了 View Transitions API 支持，可以创建类似 SPA 的体验。

## 为什么选择 Astro？

1. **性能优先** - 极快的加载速度
2. **灵活的数据源** - 支持 Markdown、MDX、Content Collections
3. **完善的生态** - 丰富的集成和主题