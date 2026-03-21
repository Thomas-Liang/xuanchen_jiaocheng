# Tasks 详细清单 - 泫晨云栖

## 目录
- [Sprint 2: 移动端适配 & 标签云](#sprint-2-移动端适配--标签云)
- [Sprint 3: 用户头像 & 阅读量](#sprint-3-用户头像--阅读量)
- [Sprint 3.5: 项目和工作流后台管理](#sprint-35-项目和工作流后台管理)
- [Sprint 4: SEO优化](#sprint-4-seo优化)

---

## 文件清单

### 新增文件
```
src/lib/content.ts                    - 项目和工作流数据访问函数
src/pages/api/projects.ts             - 项目 CRUD API
src/pages/api/workflows.ts            - 工作流 CRUD API
src/pages/api/pageviews.ts           - 阅读量 API
```

### 修改文件
```
src/lib/auth.ts                      - 添加 projects、workflows、pageviews 表初始化
src/pages/admin.astro                - 添加项目/工作流管理 Tab、阅读量显示
src/pages/projects.astro             - 改为从数据库读取
src/pages/workflows.astro            - 改为从数据库读取
src/pages/tutorials/[slug].astro     - 添加阅读量显示和计数
```

---

## Sprint 2: 移动端适配 & 标签云

### US2.1: 移动端响应式布局

| Task ID | 详细描述 | 关联文件/组件 | 预计工时 | 依赖 | 状态 |
|---------|----------|---------------|----------|------|------|
| T2.1.1.1 | 审查现有组件的响应式实现（Header、Footer、Card） | 全局组件 | 2h | - | ✅ |
| T2.1.1.2 | 审查Tailwind配置中的响应式断点 | tailwind.config.mjs | 1h | - | ✅ |
| T2.1.1.3 | 列出需要修改的组件清单 | - | 1h | T2.1.1.1 | ✅ |
| T2.1.2.1 | 创建移动端汉堡菜单组件 | components/MobileMenu.tsx | 2h | - | ✅ |
| T2.1.2.2 | 实现Header响应式切换逻辑 | components/Header.tsx | 2h | T2.1.2.1 | ✅ |
| T2.1.2.3 | 添加移动端菜单动画效果 | components/MobileMenu.tsx | 1h | T2.1.2.2 | ✅ |
| T2.1.2.4 | 测试汉堡菜单在iOS/Android上的兼容性 | - | 2h | T2.1.2.3 | ⬜ |
| T2.1.3.1 | 修改教程列表Grid为单列布局 | pages/tutorials/index.astro | 1h | - | ✅ |
| T2.1.3.2 | 优化教程卡片移动端内边距和字体 | components/TutorialCard.tsx | 1h | T2.1.3.1 | ✅ |
| T2.1.3.3 | 移动端隐藏侧边栏，改为筛选按钮 | pages/tutorials/index.astro | 2h | - | ✅ |
| T2.1.3.4 | 实现移动端筛选弹窗 | components/MobileFilter.tsx | 3h | T2.1.3.3 | ✅ |
| T2.1.4.1 | 优化详情页图片max-width: 100% | components/TutorialContent.astro | 1h | - | ✅ |
| T2.1.4.2 | 优化代码块水平滚动而非换行 | 样式全局 | 1h | - | ✅ |
| T2.1.4.3 | 调整详情页meta信息移动端间距 | pages/tutorials/[slug].astro | 1h | - | ✅ |
| T2.1.4.4 | 优化评论区移动端布局 | components/CommentSection.tsx | 1h | - | ✅ |
| T2.1.5.1 | 管理后台表单移动端纵向排列 | pages/admin/*.astro | 2h | - | ✅ |
| T2.1.5.2 | 管理后台表格移动端横向滚动 | components/AdminTable.tsx | 1h | - | ✅ |
| T2.1.5.3 | 管理后台按钮移动端增大触摸区域 | 按钮组件 | 1h | - | ✅ |
| T2.1.6.1 | 在Chrome DevTools模拟各设备测试 | - | 2h | Sprint 2完成 | ⬜ |
| T2.1.6.2 | 在真实iOS设备测试 | - | 1h | T2.1.6.1 | ⬜ |
| T2.1.6.3 | 在真实Android设备测试 | - | 1h | T2.1.6.1 | ⬜ |

### US2.2: 标签云展示

| Task ID | 详细描述 | 关联文件/组件 | 预计工时 | 依赖 | 状态 |
|---------|----------|---------------|----------|------|------|
| T2.2.1.1 | 设计标签云组件UI（尺寸分级、颜色方案） | - | 2h | - | ✅ |
| T2.2.1.2 | 创建TagCloud组件结构 | components/TagCloud.tsx | 1h | T2.2.1.1 | ✅ |
| T2.2.1.3 | 设计标签尺寸分级CSS（sm/md/lg/xl） | components/TagCloud.tsx | 2h | T2.2.1.2 | ✅ |
| T2.2.1.4 | 设计标签颜色渐变方案 | styles | 1h | T2.2.1.3 | ✅ |
| T2.2.2.1 | 扫描所有教程获取标签列表 | utils/tutorials.ts | 1h | - | ✅ |
| T2.2.2.2 | 统计每个标签的使用次数 | utils/tutorials.ts | 2h | T2.2.2.1 | ✅ |
| T2.2.2.3 | 实现按使用次数排序取前20个 | utils/tutorials.ts | 1h | T2.2.2.2 | ✅ |
| T2.2.2.4 | 缓存标签统计数据（5分钟TTL） | utils/cache.ts | 2h | T2.2.2.3 | ✅ |
| T2.2.3.1 | 实现标签点击跳转到列表页 | components/TagCloud.tsx | 1h | - | ✅ |
| T2.2.3.2 | 列表页接收tag参数并筛选 | pages/tutorials/index.astro | 2h | T2.2.3.1 | ✅ |
| T2.2.3.3 | URL参数与现有筛选逻辑兼容 | - | 1h | T2.2.3.2 | ✅ |
| T2.2.4.1 | 在首页Sidebar集成标签云组件 | pages/index.astro | 1h | - | ✅ |
| T2.2.4.2 | 响应式调整标签云在移动端显示 | components/TagCloud.tsx | 1h | T2.2.4.1 | ✅ |
| T2.2.4.3 | 测试标签云交互效果 | - | 1h | T2.2.4.2 | ✅ |

---

## Sprint 3: 用户头像 & 阅读量

### US3.1: 用户头像功能

| Task ID | 详细描述 | 关联文件/组件 | 预计工时 | 依赖 | 状态 |
|---------|----------|---------------|----------|------|------|
| T3.1.1.1 | 设计头像存储路径结构（avatars/{username}） | - | 1h | - | ✅ |
| T3.1.1.2 | 扩展users表添加avatar字段 | data/auth.db | 1h | - | ✅ |
| T3.1.1.3 | 设计头像文件命名规则（avatar-{timestamp}.jpg） | - | 1h | T3.1.1.1 | ✅ |
| T3.1.2.1 | 创建头像上传API接口 | api/avatar/upload.ts | 2h | - | ✅ |
| T3.1.2.2 | 实现图片类型验证（jpg/png/gif/webp） | api/avatar/upload.ts | 1h | T3.1.2.1 | ✅ |
| T3.1.2.3 | 实现图片大小限制（最大2MB） | api/avatar/upload.ts | 1h | T3.1.2.2 | ✅ |
| T3.1.2.4 | 实现上传到avatars目录 | api/avatar/upload.ts | 2h | T3.1.2.3 | ✅ |
| T3.1.2.5 | 保存头像URL到用户数据库 | api/avatar/upload.ts | 1h | T3.1.2.4 | ✅ |
| T3.1.3.1 | 集成图片裁剪库（react-easy-crop） | package.json | 1h | - | ⬜ |
| T3.1.3.2 | 创建头像裁剪弹窗组件 | components/AvatarCropper.tsx | 3h | T3.1.3.1 | ⬜ |
| T3.1.3.3 | 实现裁剪后图片压缩为500x500 | components/AvatarCropper.tsx | 2h | T3.1.3.2 | ⬜ |
| T3.1.3.4 | 前端预览裁剪效果 | components/AvatarCropper.tsx | 1h | T3.1.3.3 | ⬜ |
| T3.1.4.1 | 创建用户个人资料页面 | pages/profile.astro | 2h | - | ✅ |
| T3.1.4.2 | 集成头像上传和裁剪功能 | pages/profile.astro | 2h | T3.1.4.1 | ✅ |
| T3.1.4.3 | 显示当前头像预览 | pages/profile.astro | 1h | T3.1.4.2 | ✅ |
| T3.1.4.4 | 实现删除头像功能（恢复默认） | pages/profile.astro | 1h | T3.1.4.3 | ✅ |
| T3.1.5.1 | 修改评论列表显示用户头像 | pages/tutorials/[slug].astro | 1h | - | ✅ |
| T3.1.5.2 | 修改评论输入框显示当前用户头像 | pages/tutorials/[slug].astro | 1h | T3.1.5.1 | ✅ |
| T3.1.5.3 | 修改教程详情页作者头像显示 | pages/tutorials/[slug].astro | 1h | - | ✅ |
| T3.1.6.1 | 设计默认头像SVG/图片资源 | assets/default-avatar.svg | 1h | - | ✅ |
| T3.1.6.2 | 实现默认头像fallback逻辑 | utils/avatar.ts | 1h | T3.1.6.1 | ✅ |
| T3.1.6.3 | 测试头像不存在时的显示效果 | - | 1h | T3.1.6.2 | ✅ |

### US3.2: 阅读量统计

| Task ID | 详细描述 | 关联文件/组件 | 预计工时 | 依赖 | 状态 |
|---------|----------|---------------|----------|------|------|
| T3.2.1.1 | 设计pageviews表结构 | data/auth.db | 1h | - | ✅ |
| T3.2.1.2 | 创建pageviews表（slug, count, last_updated） | src/lib/auth.ts | 1h | T3.2.1.1 | ✅ |
| T3.2.2.1 | 创建阅读量查询API | src/pages/api/pageviews.ts | 1h | - | ✅ |
| T3.2.4.1 | 在教程详情页添加阅读量显示 | pages/tutorials/[slug].astro | 1h | - | ✅ |
| T3.2.5.1 | 在管理后台教程列表添加阅读量列 | pages/admin.astro | 2h | - | ✅ |
| T3.2.6.1 | 在管理后台添加重置按钮 | pages/admin.astro | 1h | - | ✅ |

---

## Sprint 3.5: 项目和工作流后台管理

### US3.3: 开源项目管理

| Task ID | 详细描述 | 关联文件/组件 | 预计工时 | 依赖 | 状态 |
|---------|----------|---------------|----------|------|------|
| T3.3.1.1 | 设计projects表结构（name, description, url, icon, order_index） | data/auth.db | 1h | - | ⬜ |
| T3.3.1.2 | 添加 projects 表到数据库 | src/lib/auth.ts | 1h | T3.3.1.1 | ✅ |
| T3.3.2.1 | 创建项目列表查询函数 | src/lib/auth.ts | 1h | - | ✅ |
| T3.3.2.2 | 创建项目 CRUD API（GET/POST/PUT/DELETE） | src/pages/api/projects.ts | 3h | T3.3.2.1 | ✅ |
| T3.3.3.1 | 在后台添加项目管理 Tab | src/pages/admin.astro | 2h | T3.3.2.2 | ✅ |
| T3.3.3.2 | 实现项目列表展示 | src/pages/admin.astro | 1h | T3.3.3.1 | ✅ |
| T3.3.3.3 | 实现项目新建/编辑弹窗 | src/pages/admin.astro | 2h | T3.3.3.2 | ✅ |
| T3.3.3.4 | 实现项目删除功能 | src/pages/admin.astro | 1h | T3.3.3.3 | ✅ |
| T3.3.4.1 | 修改项目页从数据库读取 | src/pages/projects.astro | 2h | T3.3.2.1 | ✅ |
| T3.3.4.2 | 添加 GitHub API 获取真实 stars/forks | src/pages/projects.astro | 2h | T3.3.4.1 | ⬜ |

### US3.4: 工作流管理

| Task ID | 详细描述 | 关联文件/组件 | 预计工时 | 依赖 | 状态 |
|---------|----------|---------------|----------|------|------|
| T3.4.1.1 | 设计workflows表结构（name, description, icon, tags, order_index） | data/auth.db | 1h | - | ✅ |
| T3.4.1.2 | 添加 workflows 表到数据库 | src/lib/auth.ts | 1h | T3.4.1.1 | ✅ |
| T3.4.2.1 | 创建工作流列表查询函数 | src/lib/auth.ts | 1h | - | ✅ |
| T3.4.2.2 | 创建工作流 CRUD API（GET/POST/PUT/DELETE） | src/pages/api/workflows.ts | 3h | T3.4.2.1 | ✅ |
| T3.4.3.1 | 在后台添加工作流管理 Tab | src/pages/admin.astro | 2h | T3.4.2.2 | ✅ |
| T3.4.3.2 | 实现工作流列表展示 | src/pages/admin.astro | 1h | T3.4.3.1 | ✅ |
| T3.4.3.3 | 实现工作流新建/编辑弹窗 | src/pages/admin.astro | 2h | T3.4.3.2 | ✅ |
| T3.4.3.4 | 实现工作流删除功能 | src/pages/admin.astro | 1h | T3.4.3.3 | ✅ |
| T3.4.4.1 | 修改工作流页从数据库读取 | src/pages/workflows.astro | 2h | T3.4.2.1 | ✅ |

---

## Sprint 4: SEO优化

### US4.1: SEO基础优化

| Task ID | 详细描述 | 关联文件/组件 | 预计工时 | 依赖 | 状态 |
|---------|----------|---------------|----------|------|------|
| T4.1.1.1 | 审计所有页面的当前title和description | pages/*.astro | 2h | - | ✅ |
| T4.1.1.2 | 列出需要优化的页面清单 | - | 1h | T4.1.1.1 | ✅ |
| T4.1.2.1 | 为首页设置title | pages/index.astro | 0.5h | - | ✅ |
| T4.1.2.2 | 为首页设置description | pages/index.astro | 0.5h | T4.1.2.1 | ✅ |
| T4.1.2.3 | 为教程列表页设置动态title | pages/tutorials/index.astro | 1h | - | ✅ |
| T4.1.2.4 | 为教程详情页设置动态title | pages/tutorials/[slug].astro | 1h | - | ✅ |
| T4.1.2.7 | 为项目页和工作流页设置title | pages/projects.astro, pages/workflows.astro | 1h | - | ✅ |
| T4.1.3.1 | 创建自定义SEO组件 | components/SEO.astro | 1h | - | ✅ |
| T4.1.3.2 | 创建sitemap生成逻辑 | src/pages/sitemap.xml.ts | 2h | T4.1.3.1 | ✅ |
| T4.1.3.3 | 遍历所有教程生成URL条目 | src/pages/sitemap.xml.ts | 1h | T4.1.3.2 | ✅ |
| T4.1.3.4 | 添加lastmod为教程最后修改时间 | src/pages/sitemap.xml.ts | 1h | T4.1.3.3 | ✅ |
| T4.1.3.5 | 暴露sitemap.xml路由 | src/pages/sitemap.xml.ts | 1h | T4.1.3.4 | ✅ |
| T4.1.4.1 | 扫描所有Markdown教程添加alt文本 | content/tutorials/*.md | 2h | - | ⬜ |
| T4.1.4.3 | 为封面图动态生成alt（教程标题） | components/TutorialCard.astro | 1h | - | ✅ |
| T4.1.5.1 | 添加 robots.txt | public/robots.txt | 0.5h | - | ✅ |

### US4.2: 结构化数据

| Task ID | 详细描述 | 关联文件/组件 | 预计工时 | 依赖 | 状态 |
|---------|----------|---------------|----------|------|------|
| T4.2.1.1 | 创建SEO组件支持JSON-LD | components/SEO.astro | 2h | - | ✅ |
| T4.2.1.2 | 为首页实现Organization JSON-LD | pages/index.astro | 2h | T4.2.1.1 | ✅ |
| T4.2.2.1 | 为教程详情页实现Article JSON-LD | pages/tutorials/[slug].astro | 2h | - | ✅ |
| T4.2.2.2 | 配置Article字段 | - | 1h | T4.2.2.1 | ✅ |

---

## 工时汇总

| Sprint | User Story | Tasks数 | 总工时 |
|--------|------------|---------|--------|
| Sprint 2 | US2.1 移动端响应式 | 20 | ~21h |
| Sprint 2 | US2.2 标签云展示 | 13 | ~17h |
| Sprint 3 | US3.1 用户头像 | 24 | ~26h |
| Sprint 3 | US3.2 阅读量统计 | 18 | ~19h |
| Sprint 3.5 | US3.3 开源项目管理 | 9 | ~13h |
| Sprint 3.5 | US3.4 工作流管理 | 9 | ~13h |
| Sprint 4 | US4.1 SEO基础优化 | 20 | ~19.5h |
| Sprint 4 | US4.2 结构化数据 | 10 | ~10h |
| **总计** | - | **123** | **~138.5h** |

---

## 状态说明
- ⬜ 待开始
- 🔄 进行中
- ✅ 已完成