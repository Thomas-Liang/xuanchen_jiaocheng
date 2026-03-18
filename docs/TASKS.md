# Tasks 详细清单 - 泫晨云栖

## 目录
- [Sprint 2: 移动端适配 & 标签云](#sprint-2-移动端适配--标签云)
- [Sprint 3: 用户头像 & 阅读量](#sprint-3-用户头像--阅读量)
- [Sprint 4: SEO优化](#sprint-4-seo优化)

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
| T2.2.3.1 | 实现标签点击跳转到列表页 | components/TagCloud.tsx | 1h | - | ⬜ |
| T2.2.3.2 | 列表页接收tag参数并筛选 | pages/tutorials/index.astro | 2h | T2.2.3.1 | ⬜ |
| T2.2.3.3 | URL参数与现有筛选逻辑兼容 | - | 1h | T2.2.3.2 | ⬜ |
| T2.2.4.1 | 在首页Sidebar集成标签云组件 | pages/index.astro | 1h | - | ✅ |
| T2.2.4.2 | 响应式调整标签云在移动端显示 | components/TagCloud.tsx | 1h | T2.2.4.1 | ✅ |
| T2.2.4.3 | 测试标签云交互效果 | - | 1h | T2.2.4.2 | ⬜ |

---

## Sprint 3: 用户头像 & 阅读量

### US3.1: 用户头像功能

| Task ID | 详细描述 | 关联文件/组件 | 预计工时 | 依赖 | 状态 |
|---------|----------|---------------|----------|------|------|
| T3.1.1.1 | 设计头像存储路径结构（avatars/{username}） | - | 1h | - | ⬜ |
| T3.1.1.2 | 扩展users表添加avatar字段 | data/auth.db | 1h | - | ⬜ |
| T3.1.1.3 | 设计头像文件命名规则（avatar-{timestamp}.jpg） | - | 1h | T3.1.1.1 | ⬜ |
| T3.1.2.1 | 创建头像上传API接口 | api/upload-avatar.ts | 2h | - | ⬜ |
| T3.1.2.2 | 实现图片类型验证（jpg/png/gif/webp） | api/upload-avatar.ts | 1h | T3.1.2.1 | ⬜ |
| T3.1.2.3 | 实现图片大小限制（最大2MB） | api/upload-avatar.ts | 1h | T3.1.2.2 | ⬜ |
| T3.1.2.4 | 实现上传到GitHub图床avatars目录 | api/upload-avatar.ts | 2h | T3.1.2.3 | ⬜ |
| T3.1.2.5 | 保存头像URL到用户数据库 | api/upload-avatar.ts | 1h | T3.1.2.4 | ⬜ |
| T3.1.3.1 | 集成图片裁剪库（react-easy-crop） | package.json | 1h | - | ⬜ |
| T3.1.3.2 | 创建头像裁剪弹窗组件 | components/AvatarCropper.tsx | 3h | T3.1.3.1 | ⬜ |
| T3.1.3.3 | 实现裁剪后图片压缩为500x500 | components/AvatarCropper.tsx | 2h | T3.1.3.2 | ⬜ |
| T3.1.3.4 | 前端预览裁剪效果 | components/AvatarCropper.tsx | 1h | T3.1.3.3 | ⬜ |
| T3.1.4.1 | 创建用户个人资料页面 | pages/profile.astro | 2h | - | ⬜ |
| T3.1.4.2 | 集成头像上传和裁剪功能 | pages/profile.astro | 2h | T3.1.4.1 | ⬜ |
| T3.1.4.3 | 显示当前头像预览 | pages/profile.astro | 1h | T3.1.4.2 | ⬜ |
| T3.1.4.4 | 实现删除头像功能（恢复默认） | pages/profile.astro | 1h | T3.1.4.3 | ⬜ |
| T3.1.5.1 | 修改评论列表显示用户头像 | components/CommentList.tsx | 1h | - | ⬜ |
| T3.1.5.2 | 修改评论输入框显示当前用户头像 | components/CommentForm.tsx | 1h | T3.1.5.1 | ⬜ |
| T3.1.5.3 | 修改教程详情页作者头像显示 | pages/tutorials/[slug].astro | 1h | - | ⬜ |
| T3.1.6.1 | 设计默认头像SVG/图片资源 | assets/default-avatar.svg | 1h | - | ⬜ |
| T3.1.6.2 | 实现默认头像fallback逻辑 | utils/avatar.ts | 1h | T3.1.6.1 | ⬜ |
| T3.1.6.3 | 测试头像不存在时的显示效果 | - | 1h | T3.1.6.2 | ⬜ |

### US3.2: 阅读量统计

| Task ID | 详细描述 | 关联文件/组件 | 预计工时 | 依赖 | 状态 |
|---------|----------|---------------|----------|------|------|
| T3.2.1.1 | 设计pageviews表结构 | data/auth.db | 1h | - | ⬜ |
| T3.2.1.2 | 创建pageviews表（slug, count, last_updated） | migration | 1h | T3.2.1.1 | ⬜ |
| T3.2.1.3 | 设计唯一索引防止重复计数（可选） | - | 1h | T3.2.1.2 | ⬜ |
| T3.2.2.1 | 创建阅读量查询API | api/pageviews/get.ts | 1h | - | ⬜ |
| T3.2.2.2 | 创建阅读量批量查询API（管理员用） | api/pageviews/list.ts | 2h | T3.2.2.1 | ⬜ |
| T3.2.2.3 | 创建阅读量重置API（仅管理员） | api/pageviews/reset.ts | 1h | T3.2.2.2 | ⬜ |
| T3.2.3.1 | 实现页面访问+1逻辑 | middleware/pageview.ts | 2h | - | ⬜ |
| T3.2.3.2 | 实现IP去重逻辑（24小时内不重复计） | middleware/pageview.ts | 2h | T3.2.3.1 | ⬜ |
| T3.2.3.3 | 排除爬虫和机器人访问 | middleware/pageview.ts | 1h | T3.2.3.2 | ⬜ |
| T3.2.3.4 | 异步处理计数请求（不阻塞页面） | middleware/pageview.ts | 1h | T3.2.3.3 | ⬜ |
| T3.2.4.1 | 在教程详情页添加阅读量显示 | pages/tutorials/[slug].astro | 1h | - | ⬜ |
| T3.2.4.2 | 设计阅读量徽标样式 | styles | 1h | T3.2.4.1 | ⬜ |
| T3.2.4.3 | 阅读量为0时显示"暂无阅读" | - | 0.5h | T3.2.4.2 | ⬜ |
| T3.2.5.1 | 在管理后台教程列表添加阅读量列 | pages/admin/tutorials.astro | 2h | - | ⬜ |
| T3.2.5.2 | 实现管理后台按阅读量排序 | pages/admin/tutorials.astro | 1h | T3.2.5.1 | ⬜ |
| T3.2.5.3 | 添加阅读量统计图表（可选） | pages/admin/dashboard.astro | 3h | T3.2.5.2 | ⬜ |
| T3.2.6.1 | 在管理后台添加重置按钮 | components/ResetButton.tsx | 1h | - | ⬜ |
| T3.2.6.2 | 二次确认弹窗防止误操作 | components/ConfirmDialog.tsx | 1h | T3.2.6.1 | ⬜ |
| T3.2.6.3 | 记录重置操作日志 | - | 1h | T3.2.6.2 | ⬜ |

---

## Sprint 4: SEO优化

### US4.1: SEO基础优化

| Task ID | 详细描述 | 关联文件/组件 | 预计工时 | 依赖 | 状态 |
|---------|----------|---------------|----------|------|------|
| T4.1.1.1 | 审计所有页面的当前title和description | pages/*.astro | 2h | - | ⬜ |
| T4.1.1.2 | 列出需要优化的页面清单 | - | 1h | T4.1.1.1 | ⬜ |
| T4.1.2.1 | 为首页设置title: "泫晨云栖 - 技术教程分享平台" | pages/index.astro | 0.5h | - | ⬜ |
| T4.1.2.2 | 为首页设置description: "泫晨云栖是一个技术教程分享网站..." | pages/index.astro | 0.5h | T4.1.2.1 | ⬜ |
| T4.1.2.3 | 为教程列表页设置动态title（含页码） | pages/tutorials/index.astro | 1h | - | ⬜ |
| T4.1.2.4 | 为教程详情页设置动态title（教程名+站点名） | pages/tutorials/[slug].astro | 1h | - | ⬜ |
| T4.1.2.5 | 为登录/注册页设置对应title | pages/login.astro, pages/register.astro | 0.5h | - | ⬜ |
| T4.1.2.6 | 为管理后台各页面设置title | pages/admin/*.astro | 1h | - | ⬜ |
| T4.1.2.7 | 为项目页和工作流页设置title | pages/projects.astro, pages/workflows.astro | 1h | - | ⬜ |
| T4.1.3.1 | 安装astro-seo或创建自定义SEO组件 | package.json | 1h | - | ⬜ |
| T4.1.3.2 | 创建sitemap生成逻辑 | utils/sitemap.ts | 2h | T4.1.3.1 | ⬜ |
| T4.1.3.3 | 遍历所有教程生成URL条目 | utils/sitemap.ts | 1h | T4.1.3.2 | ⬜ |
| T4.1.3.4 | 添加lastmod为教程最后修改时间 | utils/sitemap.ts | 1h | T4.1.3.3 | ⬜ |
| T4.1.3.5 | 暴露sitemap.xml路由 | pages/sitemap.xml.ts | 1h | T4.1.3.4 | ⬜ |
| T4.1.3.6 | 提交sitemap到Google Search Console | - | 1h | T4.1.3.5 | ⬜ |
| T4.1.4.1 | 扫描所有Markdown教程添加alt文本 | content/tutorials/*.md | 2h | - | ⬜ |
| T4.1.4.2 | 检查组件中的img标签添加alt | components/*.tsx | 1h | - | ⬜ |
| T4.1.4.3 | 为封面图动态生成alt（教程标题） | components/TutorialCard.tsx | 1h | - | ⬜ |
| T4.1.5.1 | 配置astro移除尾部斜杠 | astro.config.mjs | 1h | - | ⬜ |
| T4.1.5.2 | 重定向旧URL（带斜杠）到新URL | middleware/redirect.ts | 2h | T4.1.5.1 | ⬜ |
| T4.1.5.3 | 更新内部链接确保一致性 | pages/*.astro | 2h | T4.1.5.2 | ⬜ |

### US4.2: 结构化数据

| Task ID | 详细描述 | 关联文件/组件 | 预计工时 | 依赖 | 状态 |
|---------|----------|---------------|----------|------|------|
| T4.2.1.1 | 创建SEOHead组件支持JSON-LD | components/SEOHead.astro | 2h | - | ⬜ |
| T4.2.1.2 | 为首页实现Organization JSON-LD | pages/index.astro | 2h | T4.2.1.1 | ⬜ |
| T4.2.1.3 | 配置Organization信息（名称、logo、联系方式） | - | 1h | T4.2.1.2 | ⬜ |
| T4.2.2.1 | 为教程详情页实现Article JSON-LD | pages/tutorials/[slug].astro | 2h | - | ⬜ |
| T4.2.2.2 | 配置Article字段（headline, author, datePublished, image） | - | 1h | T4.2.2.1 | ⬜ |
| T4.2.2.3 | 添加amphtml链接（可选） | - | 1h | T4.2.2.2 | ⬜ |
| T4.2.3.1 | 为所有页面实现Breadcrumb JSON-LD | components/SEOHead.astro | 2h | - | ⬜ |
| T4.2.3.2 | 配置breadcrumb路径映射规则 | - | 1h | T4.2.3.1 | ⬜ |
| T4.2.4.1 | 使用Google结构化数据测试工具验证 | - | 2h | Sprint 4完成 | ⬜ |
| T4.2.4.2 | 修复验证错误（如有） | - | 2h | T4.2.4.1 | ⬜ |

---

## 工时汇总

| Sprint | User Story | Tasks数 | 总工时 |
|--------|------------|---------|--------|
| Sprint 2 | US2.1 移动端响应式 | 20 | ~21h |
| Sprint 2 | US2.2 标签云展示 | 13 | ~17h |
| Sprint 3 | US3.1 用户头像 | 24 | ~26h |
| Sprint 3 | US3.2 阅读量统计 | 18 | ~19h |
| Sprint 4 | US4.1 SEO基础优化 | 20 | ~19.5h |
| Sprint 4 | US4.2 结构化数据 | 10 | ~10h |
| **总计** | - | **105** | **~112.5h** |

---

## 状态说明
- ⬜ 待开始
- 🔄 进行中
- ✅ 已完成