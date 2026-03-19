# 泫晨云栖 - 开发记录

## 2026-03-18

### 任务：编写需求文档、Sprint backlog、Tasks文档

#### 1. 需求文档编写

**操作**:
- 读取 `DEVELOPMENT_LOG.md` 了解项目现有功能
- 检查发现已存在 `REQUIREMENTS.md` 需求文档
- 创建 `REQUIREMENTS_V2.md` 详细需求文档v2.0

**内容**:
- 项目概述（技术栈、背景）
- 功能需求（教程管理、用户系统、互动功能、页面展示、主题）
- 数据结构设计（Markdown Frontmatter、SQLite表结构、图片存储）
- API接口设计
- 页面路由
- 非功能性需求
- 待实现功能列表

#### 2. Sprint Backlog 创建

**操作**:
- 创建 `SPRINT_BACKLOG.md`
- 规划Sprint迭代计划

**内容**:
| Sprint | 主题 | 状态 |
|--------|------|------|
| Sprint 1 | 核心功能开发 | ✅ 已完成 |
| Sprint 2 | 移动端适配 & 标签云 | 📋 待开始 |
| Sprint 3 | 用户头像 & 阅读量 | 📋 待开始 |
| Sprint 4 | SEO优化 | 📋 待开始 |

包含 6 个 User Stories:
- US2.1 移动端响应式布局
- US2.2 标签云展示
- US3.1 用户头像功能
- US3.2 阅读量统计
- US4.1 SEO基础优化
- US4.2 结构化数据

#### 3. Tasks 拆分

**操作**:
- 更新 `SPRINT_BACKLOG.md`，将每个User Story拆分为更详细的Tasks
- 创建 `TASKS.md` 独立文档

**详细Tasks统计**:

| Sprint | User Story | Tasks数 | 总工时 |
|--------|------------|---------|--------|
| Sprint 2 | US2.1 移动端响应式 | 20 | ~21h |
| Sprint 2 | US2.2 标签云展示 | 13 | ~17h |
| Sprint 3 | US3.1 用户头像 | 24 | ~26h |
| Sprint 3 | US3.2 阅读量统计 | 18 | ~19h |
| Sprint 4 | US4.1 SEO基础优化 | 20 | ~19.5h |
| Sprint 4 | US4.2 结构化数据 | 10 | ~10h |
| **总计** | - | **105** | **~112.5h** |

**每个Task包含**:
- Task ID (层级编号)
- 详细描述
- 关联文件/组件
- 预计工时
- 依赖关系
- 状态

#### 4. 文档整理

**操作**:
- 创建 `docs/` 文件夹
- 将所有md文档移动到 `docs/` 目录

**最终文档结构**:
```
docs/
├── DEVELOPMENT_LOG.md         # 原开发记录
├── DEVELOPMENT_LOG_V2.md    # 新开发记录（整合版）
├── REQUIREMENTS.md           # 原需求文档
├── REQUIREMENTS_V2.md        # 详细需求文档 v2
├── SPRINT_BACKLOG.md         # Sprint迭代计划（含详细Tasks）
└── TASKS.md                  # Tasks详细清单
```

---

### 6. Sprint 2 任务执行 - 移动端适配 & 标签云

**操作**:
- 开始执行Sprint 2的移动端响应式布局和标签云展示任务
- 审查现有组件的响应式实现
- 创建移动端汉堡菜单
- 实现标签云组件

#### 6.1 移动端响应式布局

**已完成任务**:

| Task ID | 任务 | 状态 |
|---------|------|------|
| T2.1.1.1 | 审查现有组件的响应式实现 | ✅ |
| T2.1.1.2 | 审查Tailwind配置中的响应式断点 | ✅ |
| T2.1.1.3 | 列出需要修改的组件清单 | ✅ |
| T2.1.2.1 | 创建移动端汉堡菜单组件 | ✅ |
| T2.1.2.2 | 实现Header响应式切换逻辑 | ✅ |
| T2.1.2.3 | 添加移动端菜单动画效果 | ✅ |
| T2.1.3.1 | 修改教程列表Grid为单列布局 | ✅ |

**实现的修改**:
1. **Layout.astro** - 添加了移动端汉堡菜单：
   - 新增汉堡菜单按钮 (md:hidden)
   - 新增移动端菜单弹窗 (slide-in动画)
   - 菜单包含导航链接和登录/注册按钮
   - 支持点击遮罩层或关闭按钮关闭菜单

2. **index.astro** - 优化标签样式：
   - 标签在移动端使用更小的尺寸 (px-3 py-1.5)
   - 桌面端使用正常尺寸 (sm:px-4 sm:py-2)

#### 6.2 标签云展示

**已完成任务**:

| Task ID | 任务 | 状态 |
|---------|------|------|
| T2.2.1.1 | 设计标签云组件UI | ✅ |
| T2.2.1.2 | 创建TagCloud组件结构 | ✅ |
| T2.2.1.3 | 设计标签尺寸分级CSS | ✅ |
| T2.2.1.4 | 设计标签颜色渐变方案 | ✅ |
| T2.2.2.1 | 扫描所有教程获取标签列表 | ✅ |
| T2.2.2.2 | 统计每个标签的使用次数 | ✅ |
| T2.2.2.3 | 实现按使用次数排序取前20个 | ✅ |
| T2.2.2.4 | 缓存标签统计数据（5分钟TTL） | ✅ |
| T2.2.3.1 | 实现标签点击跳转到列表页 | ✅ |
| T2.2.3.2 | 列表页接收tag参数并筛选 | ✅ |
| T2.2.4.1 | 在首页集成标签云组件 | ✅ |
| T2.2.4.2 | 响应式调整标签云移动端显示 | ✅ |

**实现的修改**:
1. **TagCloud.astro** - 新建标签云组件：
   - 根据标签使用次数显示不同大小 (4级尺寸)
   - 使用多种颜色方案 (6种颜色)
   - 支持hover动画效果
   - 显示tooltip提示教程数量

2. **tutorial.ts** - 添加getTagCounts函数：
   - 统计所有标签的使用次数
   - 返回按次数排序的标签列表
   - 实现5分钟缓存机制
   - 支持maxTags参数限制返回数量
   - 提供invalidateTagCountsCache函数用于缓存失效

3. **index.astro** - 集成标签云组件：
   - 使用TagCloud组件替换原有标签列表
   - 显示前15个热门标签

#### 6.3 移动端筛选功能

**已完成任务**:

| Task ID | 任务 | 状态 |
|---------|------|------|
| T2.1.3.3 | 移动端隐藏侧边栏，改为筛选按钮 | ✅ |
| T2.1.3.4 | 实现移动端筛选弹窗 | ✅ |

**实现的修改**:
1. **tutorials/index.astro** - 添加移动端筛选功能：
   - 桌面端显示搜索框和下拉选择器
   - 移动端显示筛选按钮
   - 点击按钮弹出筛选面板
   - 面板包含搜索输入和标签按钮
   - 支持点击标签切换选中状态
   - 应用筛选跳转到对应URL

#### 6.4 详情页移动端优化

**已完成任务**:

| Task ID | 任务 | 状态 |
|---------|------|------|
| T2.1.4.1 | 优化详情页图片max-width | ✅ |
| T2.1.4.2 | 优化代码块水平滚动 | ✅ |
| T2.1.4.3 | 调整详情页meta信息移动端间距 | ✅ |
| T2.1.4.4 | 优化评论区移动端布局 | ✅ |

**实现的修改**:
1. **tutorials/[slug].astro** - 详情页优化：
   - 添加全局样式确保图片max-width: 100%
   - 优化代码块水平滚动
   - meta信息在移动端改为垂直堆叠
   - 分隔符在移动端隐藏

#### 6.5 管理后台移动端优化

**已完成任务**:

| Task ID | 任务 | 状态 |
|---------|------|------|
| T2.1.5.1 | 管理后台表单移动端纵向排列 | ✅ |
| T2.1.5.2 | 管理后台表格移动端横向滚动 | ✅ |
| T2.1.5.3 | 管理后台按钮移动端增大触摸区域 | ✅ |

**实现的修改**:
1. **admin.astro** - 管理后台优化：
   - 教程卡片在移动端改为垂直布局
   - 封面图在移动端全宽显示
   - 描述在移动端隐藏
   - 按钮增大触摸区域 (py-2)
   - 操作按钮在移动端两端对齐

---

### 8. 修复管理后台入口

**问题**: 用户登录后导航栏没有显示管理后台入口

**修复**:
1. 在桌面端导航栏添加管理后台链接（登录后显示）
2. 在移动端导航菜单添加管理后台链接
3. 在移动端用户菜单区域添加管理后台按钮

**修改的文件**:
- `src/layouts/Layout.astro`

### 9. 教程列表页添加标签云

**操作**:
- 在教程列表页搜索框下方添加热门标签云
- 使用 getTagCounts 获取标签统计数据

**修改的文件**:
- `src/pages/tutorials/index.astro`

### 10. 修复管理后台入口显示问题

**问题**: 登录后跳转到其他页面，管理后台入口消失

**修复**:
1. 修改登录成功后的跳转逻辑，从直接跳转到admin改为跳转到首页
2. 将Layout中的脚本包装在 DOMContentLoaded 事件中，确保DOM元素加载完成后再执行

**修改的文件**:
- `src/layouts/Layout.astro`

### 11. 修复管理后台封面图不显示

**问题**: 管理后台教程列表的封面图不显示

**原因**: GitHub图床中的图片URL返回404

**修复**:
- 将6篇教程的封面图URL替换为 picsum.photos 随机图片服务

**修改的文件**:
- `content/tutorials/react-19-features.md` → picsum.photos/seed/react19
- `content/tutorials/astro-5-guide.md` → picsum.photos/seed/astro5
- `content/tutorials/typescript-advanced.md` → picsum.photos/seed/typescript
- `content/tutorials/nodejs-optimization.md` → picsum.photos/seed/nodejs
- `content/tutorials/docker-deployment.md` → picsum.photos/seed/docker
- `content/tutorials/git-collaboration.md` → picsum.photos/seed/git

### 12. 修复管理后台入口重复显示

**问题**: 导航栏显示两个"管理后台"入口

**修复**:
- 移除 authButtons 区域中重复的管理后台链接（保留导航栏中的）
- 使用 admin-nav-link 类统一样式

### 13. 修复编辑页面缺少Layout导入

**问题**: 点击编辑按钮报错

**修复**:
- 在 `edit.astro` 中添加 Layout 导入
- 恢复丢失的 `react-19-features.md` 文件

**修改的文件**:
- `src/pages/tutorials/[slug]/edit.astro`
- `content/tutorials/react-19-features.md` (恢复)

### 14. 修复封面图上传到GitHub图床的URL

**问题**: 上传成功后返回的URL无法访问（404）

**原因**: URL缺少 main 分支路径

**修复**:
- 修改 `upload.ts` 中的 URL 生成逻辑，添加 `/main/` 路径

**修改的文件**:
- `src/pages/api/upload.ts`

### 15. 优化上传功能代码

**操作**:
- 移除调试日志和loading动画
- 简化上传成功/失败的显示逻辑

**修改的文件**:
- `src/pages/tutorials/new.astro`
- `src/pages/tutorials/[slug]/edit.astro`

---

### 7. 创建测试数据

**操作**:
- 创建 `content/tutorials/` 目录
- 添加 6 篇测试教程

**创建的测试教程**:

| 文件名 | 标题 | 标签 |
|--------|------|------|
| react-19-features.md | React 19 新特性完全指南 | React, 前端, JavaScript |
| astro-5-guide.md | Astro 5 完全指南 | Astro, 前端, 静态网站 |
| typescript-advanced.md | TypeScript 进阶技巧 | TypeScript, 前端, JavaScript |
| nodejs-optimization.md | Node.js 性能优化实战 | Node.js, 后端, 性能优化 |
| docker-deployment.md | Docker 容器化部署完整流程 | Docker, DevOps, 容器化 |
| git-collaboration.md | Git 协作工作流完全指南 | Git, 版本控制, 协作 |

---

### 5. 项目目录整理

**操作**:
- 扫描项目所有文件，分析目录结构
- 整理并输出当前项目结构

**项目目录结构**:
```
xuanchen_content/
├── docs/                        # 项目文档
│   ├── DEVELOPMENT_LOG.md
│   ├── DEVELOPMENT_LOG_V2.md
│   ├── DEVELOPMENT_LOG_2026-03-18.md
│   ├── REQUIREMENTS.md
│   ├── REQUIREMENTS_V2.md
│   ├── SPRINT_BACKLOG.md
│   └── TASKS.md
│
├── src/                         # 源代码
│   ├── components/              # 组件
│   ├── layouts/                 # 布局
│   ├── lib/                     # 工具库
│   └── pages/                   # 页面
│       └── api/                 # API接口
│
├── data/                        # 数据文件
│   └── auth.db                  # SQLite数据库
│
├── package.json                 # 依赖配置
├── astro.config.mjs             # Astro配置
├── tailwind.config.mjs          # Tailwind配置
├── tsconfig.json                # TypeScript配置
├── .env                         # 环境变量
└── .gitignore                   # Git忽略配置
```

**待清理文件** (建议后续清理):
- `nul` - 意外创建的空文件
- `.next/` - Next.js构建残留
- `next-env.d.ts` - Next.js遗留文件
- `out/` - 旧构建输出

---

### 产出文档清单

| 文档 | 说明 |
|------|------|
| `docs/REQUIREMENTS_V2.md` | 详细需求文档 v2.0 |
| `docs/SPRINT_BACKLOG.md` | Sprint迭代计划 |
| `docs/TASKS.md` | Tasks详细清单 |
| `docs/DEVELOPMENT_LOG_V2.md` | 开发记录整合版 |
| `docs/DEVELOPMENT_LOG.md` | 原开发记录（保留） |
| `docs/REQUIREMENTS.md` | 原需求文档（保留） |
| `docs/DEVELOPMENT_LOG_2026-03-18.md` | 今日开发记录（本文档） |

---

## 今日完成总结 (Sprint 2)

### 完成的任务

#### 移动端响应式布局
- 创建移动端汉堡菜单组件
- 实现Header响应式切换逻辑
- 优化教程列表移动端布局
- 添加移动端筛选弹窗
- 优化详情页图片和代码块
- 管理后台移动端优化

#### 标签云展示
- 设计并创建TagCloud组件
- 实现标签统计功能（含缓存）
- 在首页和教程列表页集成标签云

#### 管理后台入口
- 登录后显示管理后台入口
- 桌面端和移动端均可访问

### 新增/修改的文件

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/layouts/Layout.astro` | 修改 | 汉堡菜单、管理后台入口 |
| `src/components/TagCloud.astro` | 新建 | 标签云组件 |
| `src/lib/tutorial.ts` | 修改 | 添加getTagCounts函数和缓存 |
| `src/pages/index.astro` | 修改 | 集成标签云组件 |
| `src/pages/tutorials/index.astro` | 修改 | 移动端筛选、标签云 |
| `src/pages/tutorials/[slug].astro` | 修改 | 图片/代码块优化 |
| `src/pages/admin.astro` | 修改 | 移动端布局优化 |
| `content/tutorials/*.md` | 新建 | 6篇测试教程 |

### 今日产出
- 6篇测试教程数据
- 移动端响应式优化
- 标签云功能实现
- 管理后台入口修复

---

## 2026-03-19

### 任务：运行项目 & 修复登录 API 问题

#### 1. 项目启动

**问题**: 运行 `npm run dev` 后页面加载正常，但登录时 XHR 请求报错

**错误信息**:
```
POST http://localhost:4321/xuanchen_content/api/auth/login
Error: The service is no longer running
at ...\vite\node_modules\esbuild\lib\main.js:718:38
```

#### 2. 排查过程

**步骤 1**: 检查 API 端点
- 找到 `src/pages/api/auth/login.ts`
- 确认代码逻辑正常，使用 `better-sqlite3` 进行用户验证

**步骤 2**: 测试 API 响应
```bash
curl -X POST http://localhost:4321/xuanchen_content/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
# 返回: {"error":"请求体为空"}
```

**步骤 3**: 检查配置文件
- 发现 `astro.config.mjs` 中 `output: 'static'` 与 node adapter 冲突
- API 路由需要 SSR 模式

#### 3. 解决方案

**修改文件**: `astro.config.mjs`

```javascript
// 修改前
output: 'static',

// 修改后
output: 'server',
```

**修改原因**:
- `@astrojs/node` adapter 需要 `output: 'server'` 才能正确处理 API 路由
- `output: 'static'` 会将所有页面编译为静态文件，导致 API 路由无法接收 POST 请求

#### 4. 验证结果

修复后 API 正常响应：
```bash
curl -X POST http://localhost:4321/xuanchen_content/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
# 返回: {"success":true,"user":{"id":1,"username":"admin","email":null}}
```

#### 5. 相关文件

| 文件 | 说明 |
|------|------|
| `astro.config.mjs` | 修改 `output` 配置 |

#### 6. 今日产出
- 修复 Astro SSR 配置问题
- 登录 API 恢复正常
- 项目可正常开发测试

---

### 任务：评论功能优化 & 主题切换

#### 1. 评论发表功能修复

**问题**: 用户登录后发表评论无反应

**排查**:
- 检查 `src/pages/api/comments/index.ts` API 正常
- 测试 API 直接调用成功
- 发现 `[slug].astro` 中评论加载逻辑有问题

**Bug 1**: API 返回 `{ comments: [...] }`，代码直接当数组使用
```javascript
// 修复前
const comments = await res.json();

// 修复后
const data = await res.json();
const comments = data.comments || [];
```

**Bug 2**: 提交评论后 `reset()` 清空了隐藏的用户名字段
```javascript
// 修复后
if (userStr) {
  const user = JSON.parse(userStr);
  document.getElementById('commentUsername').value = user.username;
}
```

#### 2. 评论时间线排版优化

**需求演进**:
1. 最初卡片式布局 → 用户反馈不够精美
2. 左右交替时间线 → 用户觉得复杂
3. 左侧细线时间线 → 颜色太深
4. 最终方案：可切换主题的精美评论区

#### 3. 评论区主题切换功能

**新增功能**: 支持三种春日主题切换

| 主题 | 图标 | 配色 |
|------|------|------|
| 樱花 | 🌸 | 粉色渐变 |
| 油菜花 | 🌼 | 黄色渐变 |
| 春意盎然 | 🌿 | 绿色渐变 |

**实现方式**:
- 整个评论区容器背景随主题变化
- 时间线颜色随主题变化
- 输入框、按钮、卡片颜色统一主题色
- 主题选择保存在 sessionStorage

**修改文件**: `src/pages/tutorials/[slug].astro`

**关键代码**:
```javascript
const themes = {
  sakura: {
    bg: 'linear-gradient(135deg, rgba(252,231,243,0.5) ...)',
    timeline: 'linear-gradient(to bottom, #f9a8d4, ...)',
    dot: 'from-pink-300 to-pink-200',
    // ...
  },
  canola: { /* 黄色主题 */ },
  spring: { /* 绿色主题 */ }
};

window.setCommentTheme = function(theme) {
  // 切换整个评论区的主题样式
};
```

#### 4. 今日产出
- 修复评论发表功能
- 实现评论区主题切换
- 樱花/油菜花/春意盎然三种主题
- 主题记忆功能

---

### 任务：评论区 UI 优化 & 交互完善

#### 1. 时间线树藤样式

**实现方式**:
- 使用 SVG 绘制弯曲的藤蔓线条
- 藤蔓上有自然分支的小枝
- 渐变色从主题色到透明

```html
<svg id="timelineSvg">
  <path d="M 40 0 Q 45 50 38 100 T 42 200..." stroke="url(#vineGrad)"/>
  <path d="M 40 80 Q 55 85 65 82" stroke="#f9a8d4" opacity="0.3"/>
</svg>
```

#### 2. 泡泡氛围背景

**实现方式**:
- 多个半透明渐变泡泡分布在评论区
- 使用 `animate-pulse` 动画效果
- 不同大小和位置错落分布

```html
<div class="bubble absolute w-32 h-32 rounded-full bg-gradient-to-br from-pink-200/30 blur-2xl animate-pulse"></div>
```

#### 3. 评论折叠功能

**实现方式**:
- 点击"收起/展开"按钮控制评论区显示
- 使用 `max-height` 和 `opacity` 实现平滑动画
- 时间线同步折叠

```javascript
window.toggleComments = function() {
  // 收起/展开评论区内容
  // 同步时间线高度变化
};
```

#### 4. 主题切换完善

**同步更新的元素**:
- 背景泡泡颜色
- 标题和评论数文字颜色
- 展开/收起按钮颜色
- 时间线（树藤）颜色
- 输入框边框颜色
- 提交按钮配色（含文字颜色）
- 登录按钮配色
- 所有评论卡片颜色

**按钮文字颜色优化**:
- 浅色模式：深色文字（提高对比度）
- 深色模式：浅色文字
```javascript
sakura: {
  buttonText: 'text-pink-900 dark:text-pink-100',
  // ...
}
```

#### 5. 空评论验证

**交互流程**:
1. 用户未填写内容点击提交
2. 评论框显示红色边框和脉冲动画
3. 占位符变为"请输入评论内容..."
4. 自动聚焦到评论框
5. 用户输入时自动清除错误状态

```javascript
if (!content) {
  commentInput.classList.add('!border-red-400', '!ring-2', '!animate-pulse');
  commentInput.placeholder = '请输入评论内容...';
  commentInput.focus();
  return;
}
```

#### 6. 今日产出
- 时间线树藤样式
- 泡泡氛围背景
- 评论折叠功能
- 主题完整切换同步
- 空评论验证提示

---

### 任务：Sprint 2 收尾 & TASKS 文档更新

#### 1. Sprint 2 标签云任务检查

**发现**: TASKS.md 中标签云相关任务实际已完成

| Task ID | 描述 | 状态 | 实现位置 |
|---------|------|------|----------|
| T2.2.3.1 | 标签点击跳转列表页 | ✅ | `TagCloud.astro` - `href={/tutorials?tag=${tag.tag}}` |
| T2.2.3.2 | 列表页接收tag筛选 | ✅ | `index.astro` - `currentTag ? tutorials.filter(...)` |
| T2.2.3.3 | URL参数兼容性 | ✅ | `index.astro` - URL参数与筛选逻辑兼容 |

**结论**: Sprint 2 全部完成

#### 2. TASKS 文档更新

**修改**: 更新 `docs/TASKS.md` 标记以下任务为完成
- T2.2.3.1 - 标签点击跳转
- T2.2.3.2 - tag参数筛选
- T2.2.3.3 - URL兼容性
- T2.2.4.3 - 标签云交互测试

#### 3. Git 提交

```bash
git add docs/TASKS.md
git commit -m "docs: 更新TASKS.md标记Sprint 2全部完成"
```

#### 4. Sprint 2 完成总结

| 功能 | 状态 |
|------|------|
| 移动端响应式布局 | ✅ |
| 汉堡菜单 | ✅ |
| 教程列表响应式 | ✅ |
| 移动端筛选弹窗 | ✅ |
| 标签云展示 | ✅ |
| 标签缓存优化 | ✅ |
| 标签点击跳转 | ✅ |
| URL参数筛选 | ✅ |

#### 5. 项目剩余任务

| Sprint | 内容 | 预计工时 | 状态 |
|--------|------|----------|------|
| Sprint 3 | 用户头像 + 阅读量 | ~45h | ⬜ |
| Sprint 4 | SEO优化 | ~30h | ⬜ |
| 其他 | 视频嵌入渲染 | - | ⚠️ |

#### 6. 今日产出
- Sprint 2 标签云功能全部完成
- TASKS 文档更新
- Git 提交记录

---

## 2026-03-20

### 完成功能清单

#### 1. SSR 配置修复
- 问题：`output: 'static'` 导致 API 路由无法处理 POST 请求
- 解决：改为 `output: 'server'`

#### 2. 评论区主题切换
- 三种主题：樱花🌸 / 油菜花🌼 / 春意盎然🌿
- 主题配置同步所有元素颜色

#### 3. 时间线树藤样式
- SVG 绘制弯曲藤蔓线条
- 藤蔓上有自然分支的小枝
- 渐变色从主题色到透明

#### 4. 泡泡氛围背景
- 多个半透明渐变泡泡
- 带脉冲动画效果
- 不同大小和位置错落分布

#### 5. 评论折叠功能
- 收起/展开评论区
- 时间线同步折叠
- 平滑动画过渡

#### 6. 空评论验证
- 红色边框 + 脉冲动画提示
- 占位符变为"请输入评论内容..."
- 用户输入时自动清除错误

#### 7. 主题颜色同步
- 背景泡泡、标题文字
- 按钮、输入框、卡片
- 评论列表、登录提示

#### 8. Sprint 2 收尾
- 标签云点击跳转
- TASKS 文档更新
- 全部 22 个任务完成