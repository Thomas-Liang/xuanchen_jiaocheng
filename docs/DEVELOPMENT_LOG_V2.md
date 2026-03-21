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

### Sprint 3: 用户头像 & 阅读量 ✅ 已完成
- 用户头像功能 (US3.1)
- 阅读量统计 (US3.2)

### Sprint 3.5: 开源项目和工作流后台管理 ✅ 已完成
- 开源项目管理 (US3.3)
- 工作流管理 (US3.4)

### Sprint 4: SEO优化 ✅ 基本完成
- SEO基础优化 ✅
- 结构化数据 ✅
- sitemap.xml 生成 ✅
- robots.txt ✅

### 精选产品板块 ✅
- 产品展示页面 ✅
- 产品详情页 ✅
- 后台 CRUD 管理 ✅
- 数据库 products 表 ✅
- API 接口 ✅
- 产品图片上传 ✅ (上传到 GitHub 图床)

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
- [x] 评论编辑/删除 - 评论作者可以编辑或删除自己的评论
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
- [x] 教程阅读量统计
- [x] 开源项目管理 (CRUD)
- [x] 工作流管理 (CRUD + 链接)
- [x] 用户评论删除/编辑功能

### 7. 待实现功能
- [ ] Running Hub 集成 (工作流 API/WebApp)
- [x] 用户体验优化 ✅
- [x] 用户关注功能 ✅
- [x] 邮件通知（评论提醒）✅
- [x] 头像裁剪功能 ✅
- [x] 教程置顶功能 ✅
- [x] 社交分享功能 ✅
- [x] 站点统计后台 ✅
- [x] 用户评论删除/编辑功能 ✅
- [x] SEO 优化 ✅

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
| /api/comments | POST/GET/DELETE | 评论发表/获取/删除 |
| /api/comments/edit | POST | 评论编辑 |
| /api/favorites | POST/GET | 收藏操作/获取 |
| /api/avatar/upload | POST/DELETE | 头像上传/删除 |
| /api/user/avatar | GET | 获取用户头像 |
| /api/pageviews | GET/POST | 阅读量查询/重置 |
| /api/projects | GET/POST | 项目列表/增删改 |
| /api/workflows | GET/POST | 工作流列表/增删改 |
| /api/products | GET/POST | 产品列表/增删改 |
| /api/product-image/upload | POST | 产品图片上传到 GitHub |
| /api/tutorials/pin | POST | 教程置顶/取消置顶 |
| /api/stats | GET | 站点统计数据 |
| /api/follow | GET/POST | 关注操作/获取列表 |
| /api/config | GET/POST | 站点配置 |

---

## 访问地址 (开发模式)
- 首页: http://localhost:4321/xuanchen_content/
- 登录: http://localhost:4321/xuanchen_content/login
- 注册: http://localhost:4321/xuanchen_content/register
- 教程列表: http://localhost:4321/xuanchen_content/tutorials/
- 开源项目: http://localhost:4321/xuanchen_content/projects/
- 工作流: http://localhost:4321/xuanchen_content/workflows/
- 精选产品: http://localhost:4321/xuanchen_content/products/
- 用户列表: http://localhost:4321/xuanchen_content/users/
- 管理后台: http://localhost:4321/xuanchen_content/admin/
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
- pageviews: id, slug, count, last_updated
- projects: id, name, description, url, icon, order_index, created_at
- workflows: id, name, description, icon, tags, url, order_index, created_at
- products: id, name, description, url, icon, image, order_index, created_at

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
- 头像支持裁剪功能 ✅

**Tasks**:
- 设计用户头像存储方案
- 创建头像上传API接口
- 实现头像裁剪功能 ✅
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
- [ ] Running Hub 集成（工作流 API/WebApp）
- [ ] 用户体验优化（加载动画、页面过渡等）
- [x] 用户关注功能 ✅
- [x] 邮件通知（评论提醒）✅
- [x] 用户评论删除/编辑功能 ✅
- [x] 教程置顶功能 ✅
- [x] 社交分享功能 ✅
- [x] 站点统计后台 ✅
- [x] 头像裁剪功能 ✅

---

## 开发记录 (2026-03-20)

### Sprint 3.2: 阅读量统计 ✅
- [x] 添加 pageviews 表到数据库
- [x] 创建阅读量 API（GET/POST）
- [x] 教程详情页显示阅读量（访问自动+1）
- [x] 管理后台显示阅读量和重置按钮
- [x] Toast 提示消息

### Sprint 3.5: 开源项目和工作流后台管理 ✅
- [x] 添加 projects、workflows 表到数据库
- [x] 创建 projects API（CRUD）
- [x] 创建 workflows API（CRUD）
- [x] 后台管理界面 Tab 切换
- [x] 项目/工作流列表展示
- [x] 项目/工作流新建/编辑/删除弹窗
- [x] 页面从数据库读取数据
- [x] 工作流添加 url 字段（预留 Running Hub 集成）

### 个人资料页面优化 ✅
- [x] 精美 UI 设计（渐变背景、粉色主题）
- [x] 数据统计可折叠区块
- [x] 账户设置可折叠区块
- [x] Tab 切换（用户名/邮箱/密码）
- [x] Toast 通知提示
- [x] 加载状态显示
- [x] 表单验证（邮箱格式、密码长度）
- [x] 头像同步更新
- [x] 回车键快捷提交

### 教程详情页优化 ✅
- [x] 作者卡片显示真实头像
- [x] 自动加载作者头像

### Sprint 4: SEO 优化 ✅ 基本完成
- [x] 创建 SEO 组件 (components/SEO.astro)
- [x] 添加 Meta 标签 (title, description, keywords)
- [x] 添加 Open Graph / Twitter Card
- [x] 创建 sitemap.xml 生成器
- [x] 实现 Organization JSON-LD
- [x] 实现 Article JSON-LD (教程详情页)
- [x] 更新首页 SEO meta
- [x] 更新教程列表页 SEO meta
- [x] 更新教程详情页 SEO meta
- [x] 更新项目页 SEO meta
- [x] 更新工作流页 SEO meta
- [x] 更新产品页 SEO meta
- [x] 添加 robots.txt

### 精选产品详情页 ✅
- [x] 添加 products 表 slug 字段
- [x] 创建产品详情页 (products/[slug].astro)
- [x] 产品页显示详细信息和功能特点
- [x] 相关产品推荐
- [x] 快速信息侧边栏
- [x] 链接指向详情页而非直接跳转官网

### 排版和样式优化 ✅
- [x] 增强全局 CSS (global.css)
- [x] 自定义滚动条样式
- [x] 导航链接下划线动画
- [x] 增强页脚设计（品牌、链接、版权）
- [x] 导航品牌 Logo 悬停动画
- [x] 注册按钮悬停缩放效果
- [x] prose-custom 排版组件

### 编辑页面样式统一 ✅
- [x] 项目编辑页 (projects/[id]/edit.astro)
- [x] 工作流编辑页 (workflows/[id]/edit.astro)
- [x] 产品编辑页 (products/[id]/edit.astro)
- [x] 与教程编辑页一致的精致样式
- [x] 渐变顶栏 + 返回按钮
- [x] Emoji 选择面板（网格选择）
- [x] Toast 提示消息
- [x] 保存后跳转到对应管理 Tab

### URL 参数处理 ✅
- [x] 管理后台支持 ?tab= 参数
- [x] 编辑保存后跳转到对应 Tab
- [x] 修复资源路径（favicon、avatars）
- [x] 修复管理后台Tab结构缩进问题
- [x] 删除重复的产品列表代码（导致全屏显示）

### 用户评论删除/编辑功能 ✅
- [x] 添加 editComment 数据库函数 (auth.ts)
- [x] 添加 deleteComment 数据库函数 (auth.ts)
- [x] 创建评论编辑 API (api/comments/edit.ts)
- [x] 评论删除 API 已存在 (api/comments/index.ts DELETE 方法)
- [x] 前端编辑对话框 UI
- [x] 评论卡片显示编辑/删除按钮（仅评论作者可见）
- [x] editComment() 函数处理编辑弹窗
- [x] deleteComment() 函数处理删除确认
- [x] 评论内容实时更新
- [x] 修复函数作用域问题：editComment/deleteComment 需挂载到 window 对象才能被 onclick 调用

### 头像裁剪功能 ✅
- [x] 添加裁剪对话框 UI (profile.astro)
- [x] 使用 img 元素显示图片预览
- [x] 圆形裁剪框居中显示
- [x] 可拖动裁剪框移动
- [x] 滑块调整裁剪大小（粉色渐变样式）
- [x] 裁剪后生成 200x200 WebP 格式
- [x] 上传裁剪后的图片
- [x] 头像同步更新到页面所有位置
- [x] 修复坐标计算，确保裁剪区域正确

**技术实现**：
- 使用 `object-contain` 让图片完整显示在容器内
- 获取 `img.offsetWidth/offsetHeight` 作为显示尺寸
- 裁剪时用 `naturalWidth / displayWidth` 比例映射到原图坐标
- 所有头像添加独立 ID，方便精准更新

### 教程置顶功能 ✅
- [x] 添加 pinned_tutorials 表到数据库 (auth.ts)
- [x] 添加 getPinnedTutorials() 函数
- [x] 添加 pinTutorial()/unpinTutorial() 函数
- [x] 创建置顶 API (api/tutorials/pin.ts)
- [x] 管理后台添加置顶/取消置顶按钮
- [x] 教程列表按置顶状态排序（置顶优先）
- [x] TutorialCard 显示置顶标识

### 社交分享功能 ✅
- [x] 教程详情页添加分享按钮和面板
- [x] 支持微博、Twitter、QQ、复制链接
- [x] 分享面板点击外部关闭

### 站点统计后台 ✅
- [x] 创建统计数据 API (api/stats/index.ts)
- [x] 管理后台添加统计 Tab
- [x] 显示总访问量、页面数、平均访问
- [x] 访问排行列表，带进度条可视化

### 邮件通知（评论提醒）✅
- [x] 创建邮件服务 (lib/email.ts)
- [x] 使用 nodemailer 发送邮件
- [x] 评论时自动发送通知邮件给管理员
- [x] 精美的 HTML 邮件模板
- [x] 管理后台 SMTP 设置界面
- [x] 配置文件存储 (data/site-config.json)
- [x] 发送测试邮件功能

**SMTP 配置**（在管理后台设置）：
- SMTP 服务器、端口
- 邮箱账号、密码/应用专用密码
- 发件人名称
- 站点 URL

---

## 新增/修改文件

### 新增文件
```
src/components/SEO.astro              - SEO 组件
src/lib/email.ts                      - 邮件通知服务
src/pages/api/projects.ts             - 项目 CRUD API
src/pages/api/workflows.ts            - 工作流 CRUD API
src/pages/api/pageviews.ts            - 阅读量 API
src/pages/api/comments/edit.ts       - 评论编辑 API
src/pages/api/tutorials/pin.ts       - 教程置顶 API
src/pages/api/stats/index.ts          - 站点统计 API
src/pages/api/config/index.ts         - 站点配置 API
src/pages/api/config/send-test.ts     - 测试邮件 API
src/pages/api/follow/index.ts         - 关注 API
src/pages/users/index.astro           - 用户列表页
src/pages/user/[username]/index.astro - 用户资料页
src/pages/loading.astro               - 加载页面
```

---

## 开发记录 (2026-03-21)

### 头像裁剪功能 ✅
- [x] 使用 img 元素显示图片预览
- [x] 圆形裁剪框居中显示
- [x] 可拖动裁剪框移动
- [x] 滑块调整裁剪大小（粉色渐变样式）
- [x] 裁剪后生成 200x200 WebP 格式
- [x] 头像同步更新到页面所有位置

### 邮件通知（评论提醒）✅
- [x] 创建邮件服务 (lib/email.ts)
- [x] 使用 nodemailer 发送邮件
- [x] 评论时自动发送通知邮件给管理员
- [x] 精美的 HTML 邮件模板
- [x] 管理后台 SMTP 设置界面 (📧 邮件设置 Tab)
- [x] 配置文件存储 (data/site-config.json)
- [x] 发送测试邮件功能

### 用户关注功能 ✅
- [x] 添加 follows 表到数据库 (auth.ts)
- [x] followUser() / unfollowUser() 函数
- [x] isFollowing() 检查关注状态
- [x] getFollowerCount() / getFollowingCount() 统计
- [x] getFollowers() / getFollowing() 获取列表
- [x] 创建关注 API (api/follow/index.ts)
- [x] 创建用户列表页面 (users/index.astro)
- [x] 创建用户资料页 (user/[username]/index.astro)
- [x] 导航栏添加"用户"链接
- [x] 关注/取消关注按钮
- [x] 登录页面显示测试账号
- [x] 用户卡片样式优化（渐变背景、序号标记、悬停效果）
- [x] 用户资料页（头像、粉丝/关注统计、Tab 切换）
- [x] 登录页显示 testuser 测试账号

**访问地址**：
- 用户列表：`/xuanchen_content/users/`
- 用户资料：`/xuanchen_content/user/[username]/`

---

## 开发记录 (2026-03-21 下午)

### 用户列表样式优化 ✅
- [x] 渐变色顶栏设计
- [x] 用户序号徽章
- [x] 悬停效果优化
- [x] 关注按钮状态切换

### 管理后台优化
- [x] 修复 Tab 切换功能
- [x] 修复站点统计加载
- [x] 修复 SMTP 设置加载
- [x] 移除 TypeScript 类型注解（兼容浏览器 JS）

### 用户体验优化 ✅
- [x] 返回顶部按钮（滚动超过 300px 显示）
- [x] 页面加载动画（点击链接时显示加载动画）
- [x] Toast 通知组件（showToast 函数）
- [x] 平滑滚动效果
- [x] 链接悬停效果优化
src/pages/sitemap.xml.ts             - Sitemap 生成器
src/pages/products/[slug].astro       - 产品详情页
src/pages/projects/[id]/edit.astro    - 项目编辑页
src/pages/workflows/[id]/edit.astro  - 工作流编辑页
src/pages/products/[id]/edit.astro    - 产品编辑页
public/robots.txt                    - robots.txt
```

### 修改文件
```
src/lib/auth.ts                      - 添加 pinned_tutorials 表、置顶函数、products slug 字段、迁移逻辑、editComment/deleteComment 函数
src/lib/types.ts                     - Tutorial 接口添加 isPinned 字段
src/lib/tutorial.ts                  - getPublishedTutorials 按置顶排序
src/layouts/Layout.astro             - 集成 SEO 组件、资源路径修复
src/styles/global.css                - 增强排版样式
src/pages/admin.astro                - Tab 结构修复、添加置顶按钮、统计 Tab
src/pages/profile.astro             - 添加头像裁剪功能
src/pages/projects.astro              - SEO meta、数据库读取
src/pages/workflows.astro            - SEO meta、数据库读取
src/pages/products.astro             - 链接指向详情页
src/pages/products/[slug].astro       - 产品详情页设计
src/pages/tutorials/[slug].astro      - SEO meta、阅读量、作者头像、评论编辑/删除 UI、社交分享面板
src/pages/tutorials/[slug]/edit.astro - 保存后跳转修复
src/pages/tutorials/index.astro       - SEO meta
src/pages/index.astro                - SEO meta
src/pages/api/workflows.ts           - 添加调试日志
src/pages/api/comments/index.ts       - 添加 DELETE 方法支持评论删除
src/pages/projects/[id]/edit.astro   - 跳转参数修复
src/pages/workflows/[id]/edit.astro  - 跳转参数修复
src/pages/products/[id]/edit.astro    - 跳转参数修复
src/components/TutorialCard.astro     - 添加置顶标识显示
```

---

## 开发记录 (2026-03-21 傍晚)

### 产品图片上传功能 ✅
- [x] 创建产品图片上传 API (api/product-image/upload.ts)
- [x] 支持 JPG、PNG、GIF、WebP 格式
- [x] 最大 5MB 限制
- [x] 上传到 GitHub 图床 (xuanchen_image_bed/product/{产品ID}/)
- [x] 产品编辑页添加上传按钮和预览区域
- [x] 支持 URL 输入和上传两种方式
- [x] 图片预览功能
- [x] 删除图片按钮

**新增文件**：
```
src/pages/api/product-image/upload.ts  - 产品图片上传 API
```

**修改文件**：
```
src/pages/products/[id]/edit.astro    - 添加图片上传 UI
```

**上传路径**：
```
xuanchen_image_bed/product/{产品ID}/{时间戳}.{扩展名}
```

**访问地址**：
- 产品编辑：`/xuanchen_content/products/{id}/edit`

### Astro CSRF 保护说明
- Astro 5 默认启用 CSRF 保护
- 开发服务器正常工作
- 生产构建需要配置 `security.checkOrigin: false`

### Vercel 部署说明
- 当前适配器：`@astrojs/node`（SSR 模式）
- Vercel 部署需要：
  - 安装 `@astrojs/vercel` 适配器
  - 将 SQLite 改为 Vercel Postgres 或 Turso
  - 将文件上传改为 Vercel Blob
- 推荐方案：使用 Docker 部署到自己的服务器

---

## 文档索引
- 详细需求文档：`REQUIREMENTS_V2.md`
- Sprint Backlog：`SPRINT_BACKLOG.md`
- 开发记录：`DEVELOPMENT_LOG_V2.md` (本文件)