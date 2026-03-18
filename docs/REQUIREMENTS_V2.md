# 泫晨云栖 - 教程网站 详细需求文档 v2.0

## 1. 项目概述

### 1.1 项目背景
泫晨云栖是一个技术教程分享网站，旨在为开发者提供优质的技术教程资源。网站支持用户注册登录、发布教程、评论互动、收藏等功能。

### 1.2 项目信息
| 项目 | 内容 |
|------|------|
| 项目名称 | 泫晨云栖 |
| 类型 | 技术教程分享平台 |
| 目标用户 | 开发者、技术爱好者 |
| 运行模式 | SSR (Server-Side Rendering) |

### 1.3 技术栈

| 层级 | 技术选型 | 版本 |
|------|---------|------|
| 前端框架 | Astro | 5.x |
| UI框架 | React | 19.x |
| 样式方案 | TailwindCSS | - |
| 后端运行环境 | Node.js | - |
| 用户数据库 | SQLite | - |
| 内容存储 | 文件系统 | Markdown格式 |
| 图片存储 | GitHub图床 | Thomas-Liang/xuanchen_image_bed |

---

## 2. 功能需求

### 2.1 教程管理模块

#### 2.1.1 教程列表页
**页面路径**: `/xuanchen_content/tutorials/`

**功能描述**: 展示所有教程列表，支持分页、搜索、标签筛选

**详细需求**:
| 需求项 | 描述 |
|--------|------|
| 分页功能 | 每页展示9篇教程，支持分页导航 |
| 搜索功能 | 支持按标题、描述、标签进行模糊搜索 |
| 标签筛选 | 侧边栏展示所有标签，支持点击筛选 |
| 排序规则 | 按最后修改时间倒序排列 |
| 卡片展示 | 展示封面图、标题、描述、作者、日期、标签 |

#### 2.1.2 教程详情页
**页面路径**: `/xuanchen_content/tutorials/{slug}/`

**功能描述**: 展示单篇教程的完整内容

**详细需求**:
| 需求项 | 描述 |
|--------|------|
| 头部信息 | 标题、描述、作者、发布日期、最后修改时间 |
| 封面图 | 顶部展示教程封面图 |
| 正文内容 | Markdown渲染的完整正文 |
| 标签展示 | 底部展示教程标签 |
| 互动区域 | 收藏按钮、评论区域 |
| 相关文章 | 侧边栏推荐相同标签的其他教程 |
| 阅读量显示 | 显示教程阅读次数 |

#### 2.1.3 教程创建
**页面路径**: `/xuanchen_content/tutorials/new/`

**功能描述**: 创建新的教程文章

**详细需求**:
| 需求项 | 描述 |
|--------|------|
| 标题输入 | 必填，最长100字符 |
| 描述输入 | 必填，用于列表页展示 |
| 作者输入 | 必填，默认填充当前登录用户名 |
| 标签选择 | 可选，支持多选 |
| 封面图上传 | 可选，上传至GitHub图床，返回URL |
| 正文编辑 | Markdown编辑器，支持预览 |
| 视频URL | 可选，支持嵌入视频 |
| 草稿功能 | 支持保存为草稿 |

**API接口**: `POST /api/tutorials/create`

#### 2.1.4 教程编辑
**页面路径**: `/xuanchen_content/tutorials/{slug}/edit/`

**功能描述**: 编辑已存在的教程

**详细需求**:
| 需求项 | 描述 |
|--------|------|
| 预填表单 | 加载现有教程内容到表单 |
| 发布时间 | 保留原始发布时间不变 |
| 修改时间 | 自动更新为编辑时间 |
| 封面图 | 支持更换封面图 |

**API接口**: `POST /api/tutorials/edit`

#### 2.1.5 教程删除
**功能描述**: 删除教程文章

**详细需求**:
| 需求项 | 描述 |
|--------|------|
| 删除确认 | 删除前弹出确认对话框 |
| 物理删除 | 从文件系统删除Markdown文件 |
| 级联清理 | 同时删除关联的评论和收藏记录 |

**API接口**: `DELETE /api/tutorials/delete`

### 2.2 用户系统模块

#### 2.2.1 用户注册
**页面路径**: `/xuanchen_content/register`

**功能描述**: 新用户注册账号

**详细需求**:
| 需求项 | 描述 |
|--------|------|
| 用户名 | 必填，3-20字符，唯一性检查 |
| 密码 | 必填，最少6字符 |
| 重复密码 | 必填，需与密码一致 |
| 重复检查 | 用户名存在时提示错误 |
| 成功跳转 | 注册成功后跳转至登录页 |

**API接口**: `POST /api/auth/register`

#### 2.2.2 用户登录
**页面路径**: `/xuanchen_content/login`

**功能描述**: 用户登录系统

**详细需求**:
| 需求项 | 描述 |
|--------|------|
| 用户名 | 必填 |
| 密码 | 必填 |
| 记住登录 | 可选，使用sessionStorage存储 |
| 错误提示 | 用户名或密码错误时提示 |
| 成功跳转 | 登录成功后跳转至首页 |

**API接口**: `POST /api/auth/login`

**测试账号**:
| 用户名 | 密码 |
|--------|------|
| admin | admin123 |

#### 2.2.3 Session管理
**功能描述**: 管理用户登录状态

**详细需求**:
| 需求项 | 描述 |
|--------|------|
| 存储方式 | sessionStorage |
| 状态检查 | 页面加载时检查登录状态 |
| 登出功能 | 清除session，跳转至首页 |

### 2.3 互动功能模块

#### 2.3.1 评论功能
**功能描述**: 用户对教程发表评论

**详细需求**:
| 需求项 | 描述 |
|--------|------|
| 发表评论 | 登录用户可发表评论 |
| 评论输入 | 文本框，最少1字符 |
| 时间显示 | 显示评论发布时间 |
| 评论列表 | 展示所有评论，按时间倒序 |
| 权限控制 | 未登录用户只能查看，不能发表 |

**API接口**:
- `POST /api/comments` - 发表评论
- `GET /api/comments?tutorial_slug={slug}` - 获取评论列表

#### 2.3.2 收藏功能
**功能描述**: 用户收藏感兴趣的教程

**详细需求**:
| 需求项 | 描述 |
|--------|------|
| 收藏操作 | 登录用户可收藏教程 |
| 取消收藏 | 已收藏的可取消收藏 |
| 状态显示 | 详情页显示当前用户的收藏状态 |
| 收藏列表 | 用户个人中心展示已收藏教程 |

**API接口**:
- `POST /api/favorites` - 添加/取消收藏
- `GET /api/favorites?username={name}` - 获取用户收藏列表

### 2.4 页面展示模块

#### 2.4.1 首页
**页面路径**: `/xuanchen_content/`

**功能描述**: 展示网站概览和最新教程

**详细需求**:
| 需求项 | 描述 |
|--------|------|
| 最新教程 | 展示最新6篇教程 |
| 热门标签 | 侧边栏展示热门标签 |
| 导航菜单 | 顶部导航含首页、教程、项目、工作流等 |

#### 2.4.2 开源项目页面
**页面路径**: `/xuanchen_content/projects/`

**功能描述**: 展示开源项目列表

#### 2.4.3 工作流页面
**页面路径**: `/xuanchen_content/workflows/`

**功能描述**: 展示工作流模板

#### 2.4.4 管理后台
**页面路径**: `/xuanchen_content/admin/`

**功能描述**: 后台管理界面

**详细需求**:
| 需求项 | 描述 |
|--------|------|
| 权限控制 | 仅管理员可访问 |
| 教程管理 | 列表、编辑、删除教程 |
| 快捷入口 | 快速新建教程 |

### 2.5 主题模块

#### 2.5.1 暗色模式
**功能描述**: 支持深色/浅色主题切换

**详细需求**:
| 需求项 | 描述 |
|--------|------|
| 系统检测 | 页面加载时检测系统主题偏好 |
| 手动切换 | 页面提供切换按钮 |
| 状态持久化 | 使用localStorage保存用户选择 |

---

## 3. 数据结构设计

### 3.1 教程内容 (Markdown Frontmatter)

```yaml
---
title: "教程标题"
description: "教程简述"
author: "作者名"
publishDate: "2026-03-18"
lastModified: "2026-03-18"
coverImage: "https://xxx.jpg"
tags: ["tag1", "tag2"]
videoUrl: "https://youtube.com/xxx"
isDraft: false
---
```

**存储路径**: `content/tutorials/{slug}.md`

### 3.2 数据库表 (SQLite)

**users 表**:
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**comments 表**:
```sql
CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tutorial_slug TEXT NOT NULL,
  username TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**favorites 表**:
```sql
CREATE TABLE favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tutorial_slug TEXT NOT NULL,
  username TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tutorial_slug, username)
);
```

### 3.3 图片存储

- **图床仓库**: Thomas-Liang/xuanchen_image_bed
- **存储路径**: `year/month/day/filename`
- **Token**: 环境变量 `GITHUB_TOKEN`

---

## 4. API接口设计

### 4.1 认证接口

| 接口 | 方法 | 说明 | 请求体 |
|------|------|------|--------|
| `/api/auth/login` | POST | 用户登录 | `{"username": "", "password": ""}` |
| `/api/auth/register` | POST | 用户注册 | `{"username": "", "password": ""}` |

### 4.2 教程接口

| 接口 | 方法 | 说明 | 请求体 |
|------|------|------|--------|
| `/api/tutorials/create` | POST | 创建教程 | FormData (含Markdown文件) |
| `/api/tutorials/edit` | POST | 编辑教程 | FormData |
| `/api/tutorials/delete` | DELETE | 删除教程 | Query: `?slug={slug}` |

### 4.3 互动接口

| 接口 | 方法 | 说明 | 请求体/参数 |
|------|------|------|-------------|
| `/api/comments` | POST | 发表评论 | `{"tutorial_slug": "", "content": ""}` |
| `/api/comments` | GET | 获取评论 | `?tutorial_slug={slug}` |
| `/api/favorites` | POST | 收藏操作 | `{"tutorial_slug": "", "action": "add/remove"}` |
| `/api/favorites` | GET | 获取收藏 | `?username={name}` |

### 4.4 工具接口

| 接口 | 方法 | 说明 | 请求体 |
|------|------|------|--------|
| `/api/upload` | POST | 图片上传 | FormData (图片文件) |

---

## 5. 页面路由

| 页面 | 路径 |
|------|------|
| 首页 | `/xuanchen_content/` |
| 登录 | `/xuanchen_content/login` |
| 注册 | `/xuanchen_content/register` |
| 教程列表 | `/xuanchen_content/tutorials/` |
| 教程详情 | `/xuanchen_content/tutorials/{slug}/` |
| 新建教程 | `/xuanchen_content/tutorials/new/` |
| 编辑教程 | `/xuanchen_content/tutorials/{slug}/edit/` |
| 管理后台 | `/xuanchen_content/admin/` |
| 开源项目 | `/xuanchen_content/projects/` |
| 工作流 | `/xuanchen_content/workflows/` |

---

## 6. 非功能性需求

### 6.1 性能需求
- 页面首次加载时间 < 3秒
- API响应时间 < 1秒

### 6.2 兼容性
- Chrome, Firefox, Safari, Edge 最新版本
- 移动端响应式适配

### 6.3 安全
- 密码使用哈希存储
- 敏感操作需登录验证

---

## 7. 待实现功能 (下一阶段)

| 优先级 | 功能 | 描述 |
|--------|------|------|
| P1 | 移动端响应式优化 | 适配手机和平板设备 |
| P1 | 标签云展示 | 首页侧边栏展示标签云 |
| P2 | 用户头像 | 用户上传头像或使用默认头像 |
| P2 | 阅读量统计 | 记录并展示教程阅读次数 |
| P3 | SEO优化 | Meta标签、结构化数据、sitemap |