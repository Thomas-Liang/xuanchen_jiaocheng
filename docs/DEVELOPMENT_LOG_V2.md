# 泫晨云栖 - 教程网站开发记录 v2.0

## 项目概述
- 框架：Astro 5 + React 19 + TailwindCSS
- 数据库：SQLite (用户数据) + 文件系统 (教程内容)
- 图片存储：GitHub 图床 (Thomas-Liang/xuanchen_image_bed)
- 运行模式：SSR (server-side rendering)

---

## Sprint 计划

### Sprint 1: 核心功能开发 ✅ 已完成
- 教程管理：列表、详情、创建、编辑、删除、封面图上传
- 用户系统：注册、登录、Session管理、测试账号
- 互动功能：评论、收藏、相关文章推荐
- 页面展示：首页、列表页、详情页、暗色模式、项目页、工作流页、管理后台
- 排序：按最后修改时间排序

### Sprint 2: 移动端适配 & 标签云 ✅ 已完成
- 移动端响应式布局
- 标签云展示

### Sprint 3: 用户头像 & 阅读量 🔄 进行中
- 用户头像功能 (US3.1 进行中)
- 阅读量统计 (US3.2 待开始)

### Sprint 4: SEO优化 📋 待开始
- SEO基础优化
- 结构化数据

---

## 功能需求

### 1. 教程管理 (核心功能)
- [x] 教程列表展示 - 支持分页、搜索、标签筛选
- [x] 教程详情页 - 显示标题、描述、作者、日期、封面图、内容
- [x] 教程创建 - 表单填写标题、描述、作者、标签、封面图、内容
- [x] 教程编辑 - 保留原始发布时间，更新最后修改时间
- [x] 教程删除 - 确认后删除
- [x] 封面图上传 - 上传到 GitHub 图床，返回 URL

### 2. 用户系统
- [x] 用户注册 - 用户名、密码
- [x] 用户登录 - 账号密码验证
- [x] Session 管理 - 使用 sessionStorage 存储登录状态
- [x] 测试账号 - admin / admin123

### 3. 互动功能
- [x] 评论功能 - 登录用户可以发表评论
- [x] 收藏功能 - 登录用户可以收藏/取消收藏教程
- [x] 相关文章推荐 - 详情页显示相同标签的文章

### 4. 页面展示
- [x] 首页 - 展示最新6篇教程
- [x] 教程列表 - 分页展示，支持搜索和标签筛选
- [x] 教程详情 - 完整内容展示
- [x] 暗色模式 - 支持系统偏好和手动切换
- [x] 开源项目页面
- [x] 工作流页面
- [x] 管理后台 - 教程管理

### 5. 排序
- [x] 按最后修改时间排序 - 最新的显示在最前面

### 6. 已实现功能
- [x] 移动端响应式优化
- [x] 标签云展示
- [x] 用户头像 (基础功能)

### 6. 待实现功能
- [ ] 头像裁剪功能
- [ ] 教程阅读量统计
- [ ] SEO 优化

---

## API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| /api/auth/login | POST | 用户登录 |
| /api/auth/register | POST | 用户注册 |
| /api/tutorials/create | POST | 创建教程 |
| /api/tutorials/edit | POST | 编辑教程 |
| /api/tutorials/delete | DELETE | 删除教程 |
| /api/upload | POST | 图片上传到 GitHub |
| /api/comments | POST/GET | 评论发表/获取 |
| /api/favorites | POST/GET | 收藏操作/获取 |
| /api/avatar/upload | POST/DELETE | 头像上传/删除 |
| /api/user/avatar | GET | 获取用户头像 |

---

## 访问地址 (开发模式)
- 首页: http://localhost:4321/xuanchen_content/
- 登录: http://localhost:4321/xuanchen_content/login
- 注册: http://localhost:4321/xuanchen_content/register
- 教程列表: http://localhost:4321/xuanchen_content/tutorials/
- 管理后台: http://localhost:4321/xuanchen_content/admin/
- 新建教程: http://localhost:4321/xuanchen_content/tutorials/new/
- 个人资料: http://localhost:4321/xuanchen_content/profile/

---

## 技术细节
- 教程存储：content/tutorials/*.md (Frontmatter 格式)
- 用户数据：data/auth.db (SQLite)
- 图片上传：调用 GitHub API 上传到 xuanchen_image_bed 仓库
- Token：环境变量 GITHUB_TOKEN

---

## 数据结构

### 教程 (Markdown Frontmatter)
```yaml
---
title: 标题
description: 描述
author: 作者
publishDate: 2026-03-18
lastModified: 2026-03-18
coverImage: https://...
tags: [标签1, 标签2]
videoUrl: https://...
isDraft: false
---
```

### SQLite 表
- users: id, username, password, email, avatar, created_at
- comments: id, tutorial_slug, username, content, created_at
- favorites: id, tutorial_slug, username, created_at

---

## User Stories (Sprint 2-4)

### Sprint 2: 移动端适配 & 标签云

#### US2.1: 移动端响应式布局
**验收标准**:
- 导航栏在移动端自动折叠为汉堡菜单
- 教程列表在移动端单列显示
- 教程卡片在移动端自适应宽度
- 详情页图片和代码块自适应屏幕宽度
- 管理后台表单在移动端可正常操作

**Tasks**:
- 评估现有组件的响应式实现
- 实现导航栏响应式折叠
- 优化教程列表移动端布局
- 优化教程详情页移动端展示
- 优化管理后台移动端体验
- 测试各页面移动端效果

#### US2.2: 标签云展示
**验收标准**:
- 首页侧边栏展示标签云
- 标签按使用频率显示不同大小/颜色
- 点击标签可跳转至对应教程列表
- 标签数量控制在15-20个

**Tasks**:
- 设计标签云UI组件
- 实现标签统计逻辑
- 实现标签点击跳转功能
- 集成到首页侧边栏

### Sprint 3: 用户头像 & 阅读量

#### US3.1: 用户头像功能
**验收标准**:
- 用户个人资料页可上传头像
- 头像上传至GitHub图床
- 评论和文章中显示用户头像
- 未上传头像使用默认头像
- 头像支持裁剪功能

**Tasks**:
- 设计用户头像存储方案
- 创建头像上传API接口
- 实现头像裁剪功能
- 更新用户资料页UI
- 更新评论区的头像显示
- 实现默认头像逻辑

#### US3.2: 阅读量统计
**验收标准**:
- 教程详情页显示阅读次数
- 管理员后台显示所有教程阅读量
- 阅读量实时更新
- 阅读量支持后台重置

**Tasks**:
- 设计阅读量存储方案（SQLite表）
- 创建阅读量统计API
- 实现页面访问自动+1逻辑
- 在详情页展示阅读量
- 在管理后台展示阅读量列表
- 添加阅读量重置功能

### Sprint 4: SEO优化

#### US4.1: SEO基础优化
**验收标准**:
- 每个页面有唯一的title和meta description
- 生成sitemap.xml
- 提交sitemap给搜索引擎
- 图片添加alt属性
- 规范URL结构

**Tasks**:
- 审计现有页面的meta信息
- 为每个页面设置唯一title和description
- 实现sitemap.xml自动生成
- 为所有图片添加alt属性
- 规范化URL（移除尾部斜杠）

#### US4.2: 结构化数据
**验收标准**:
- 首页添加Organization结构化数据
- 教程详情页添加Article结构化数据
- Breadcrumb结构化数据

**Tasks**:
- 实现首页Organization JSON-LD
- 实现教程详情页Article JSON-LD
- 实现Breadcrumb JSON-LD
- 使用Google结构化数据测试工具验证

---

## 后续可能的需求
- 用户评论删除/编辑功能
- 教程置顶功能
- 邮件通知（评论提醒、新回复）
- 社交分享功能
- 用户关注功能
- 站点统计后台（访客分析）

---

## 文档索引
- 详细需求文档：`REQUIREMENTS_V2.md`
- Sprint Backlog：`SPRINT_BACKLOG.md`
- 开发记录：`DEVELOPMENT_LOG_V2.md` (本文件)