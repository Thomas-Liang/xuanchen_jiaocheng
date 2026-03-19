# 泫晨云栖 - 技术教程分享平台

一个基于 Astro + React + TailwindCSS 构建的技术教程分享网站。

## 技术栈

| 技术 | 用途 |
|------|------|
| Astro 5.x | 前端框架 (SSR) |
| React 19 | UI组件库 |
| TailwindCSS | 样式方案 |
| Node.js | 后端运行环境 |
| SQLite | 用户数据存储 |
| GitHub图床 | 图片存储 |

## 功能特性

### 核心功能
- ✅ 教程列表 - 支持分页、搜索、标签筛选
- ✅ 教程详情 - Markdown渲染、封面图、视频嵌入
- ✅ 教程创建/编辑/删除
- ✅ 用户注册/登录
- ✅ 评论功能
- ✅ 收藏功能
- ✅ 相关文章推荐
- ✅ 暗色模式

### 移动端适配
- ✅ 移动端汉堡菜单
- ✅ 响应式布局
- ✅ 移动端筛选弹窗

### 标签云
- ✅ 首页热门标签云
- ✅ 教程列表页标签云
- ✅ 按使用次数排序
- ✅ 标签缓存优化

### 管理后台
- ✅ 教程管理
- ✅ 新建教程
- ✅ 编辑/删除教程

### 评论区
- ✅ 三种主题切换（樱花/油菜花/春意盎然）
- ✅ SVG树藤时间线
- ✅ 泡泡氛围背景
- ✅ 评论折叠/展开
- ✅ 空评论验证
- ✅ 深色模式支持

## 项目结构

```
xuanchen_content/
├── content/
│   └── tutorials/          # 教程内容 (Markdown)
├── src/
│   ├── components/         # 组件
│   ├── layouts/           # 布局
│   ├── lib/               # 工具库
│   └── pages/             # 页面 & API
├── data/                  # SQLite数据库
├── docs/                  # 开发文档
└── public/                # 静态资源
```

## 开发命令

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

## 访问地址

开发环境: http://localhost:4321/xuanchen_content/

测试账号: admin / admin123

## 开发记录

详见 [docs/DEVELOPMENT_LOG_2026-03-18.md](docs/DEVELOPMENT_LOG_2026-03-18.md)