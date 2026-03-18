# 泫晨云栖 - 教程网站需求文档

## 1. 项目概述

### 1.1 项目背景
泫晨云栖是一个技术教程分享网站，旨在为开发者提供优质的技术教程资源。

### 1.2 技术栈
| 技术 | 说明 |
|------|------|
| 前端框架 | Astro 5 |
| UI框架 | React 19 + TailwindCSS |
| 后端 | Node.js (SSR模式) |
| 数据库 | SQLite (用户数据) |
| 文件存储 | 文件系统 (教程内容Markdown) |
| 图片存储 | GitHub图床 (Thomas-Liang/xuanchen_image_bed) |

---

## 2. 功能需求

### 2.1 教程管理

#### 2.1.1 教程列表
- [x] 分页展示 (每页9篇)
- [x] 搜索功能 (标题、描述、标签)
- [x] 标签筛选
- [x] 按最后修改时间排序

#### 2.1.2 教程详情
- [x] 标题、描述、作者、日期
- [x] 封面图展示
- [x] 正文内容渲染
- [x] 标签展示
- [x] 阅读量显示
- [x] 相关文章推荐

#### 2.1.3 教程创建/编辑
- [x] 表单填写 (标题、描述、作者、标签)
- [x] 封面图上传 (GitHub图床)
- [x] 正文内容编辑
- [x] 保留原始发布时间
- [x] 自动更新最后修改时间

#### 2.1.4 教程删除
- [x] 确认删除
- [x] 删除Markdown文件

### 2.2 用户系统

#### 2.2.1 注册
- [x] 用户名注册
- [x] 密码设置
- [x] 用户名重复检查

#### 2.2.2 登录
- [x] 账号密码验证
- [x] Session管理 (sessionStorage)
- [x] 测试账号: admin / admin123

### 2.3 互动功能

#### 2.3.1 评论
- [x] 登录用户发表评论
- [x] 显示评论列表
- [x] 评论时间显示

#### 2.3.2 收藏
- [x] 登录用户收藏教程
- [x] 取消收藏
- [x] 收藏状态显示

### 2.4 页面展示

| 页面 | 功能 |
|------|------|
| 首页 | 展示最新6篇教程，热门标签 |
| 教程列表 | 分页、搜索、标签筛选 |
| 教程详情 | 完整内容、评论、收藏、相关文章 |
| 开源项目 | 项目展示列表 |
| 工作流 | 工作流模板展示 |
| 管理后台 | 教程管理 (新建、编辑、删除) |
| 登录/注册 | 用户认证 |

### 2.5 主题

- [x] 暗色模式
- [x] 支持系统偏好检测
- [x] 手动切换
- [x] localStorage持久化

---

## 3. API接口设计

| 接口 | 方法 | 说明 | 请求格式 |
|------|------|------|----------|
| /api/auth/login | POST | 用户登录 | JSON |
| /api/auth/register | POST | 用户注册 | JSON |
| /api/tutorials/create | POST | 创建教程 | FormData |
| /api/tutorials/edit | POST | 编辑教程 | FormData |
| /api/tutorials/delete | DELETE | 删除教程 | Query参数 |
| /api/upload | POST | 图片上传 | FormData |
| /api/comments | POST/GET | 评论发表/获取 | JSON/Query |
| /api/favorites | POST/GET | 收藏操作/获取 | JSON/Query |

---

## 4. 数据结构

### 4.1 教程 (Markdown Frontmatter)
```yaml
title: 标题
description: 描述
author: 作者
publishDate: 2026-03-18
lastModified: 2026-03-18
coverImage: https://...
tags: [标签1, 标签2]
videoUrl: https://...
isDraft: false
```

### 4.2 用户表 (SQLite)
```sql
users: id, username, password, email, created_at
comments: id, tutorial_slug, username, content, created_at
favorites: id, tutorial_slug, username, created_at
```

---

## 5. 访问地址

| 页面 | 地址 |
|------|------|
| 首页 | /xuanchen_content/ |
| 登录 | /xuanchen_content/login |
| 注册 | /xuanchen_content/register |
| 教程列表 | /xuanchen_content/tutorials/ |
| 教程详情 | /xuanchen_content/tutorials/{slug}/ |
| 管理后台 | /xuanchen_content/admin/ |
| 新建教程 | /xuanchen_content/tutorials/new/ |
| 编辑教程 | /xuanchen_content/tutorials/{slug}/edit/ |
| 开源项目 | /xuanchen_content/projects/ |
| 工作流 | /xuanchen_content/workflows/ |

---

## 6. 待实现功能

- [ ] 移动端响应式优化
- [ ] 标签云展示
- [ ] 用户头像
- [ ] 教程阅读量统计
- [ ] SEO 优化

---

## 7. GitHub配置

- 图片仓库: Thomas-Liang/xuanchen_image_bed
- Token: 环境变量 GITHUB_TOKEN
- 存储路径: year/month/day/filename
