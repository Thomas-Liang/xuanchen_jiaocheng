# 泫晨云栖 - 教程网站开发记录

## 项目概述
- 框架：Astro 5 + React 19 + TailwindCSS
- 数据库：SQLite (用户数据) + 文件系统 (教程内容)
- 图片存储：GitHub 图床 (Thomas-Liang/xuanchen_image_bed)
- 运行模式：SSR (server-side rendering)

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

## 访问地址 (开发模式)
- 首页: http://localhost:9011/xuanchen_content/
- 登录: http://localhost:9011/xuanchen_content/login
- 注册: http://localhost:9011/xuanchen_content/register
- 教程列表: http://localhost:9011/xuanchen_content/tutorials/
- 管理后台: http://localhost:9011/xuanchen_content/admin/
- 新建教程: http://localhost:9011/xuanchen_content/tutorials/new/

## 技术细节
- 教程存储：content/tutorials/*.md (Frontmatter 格式)
- 用户数据：data/auth.db (SQLite)
- 图片上传：调用 GitHub API 上传到 xuanchen_image_bed 仓库
- Token：环境变量 GITHUB_TOKEN

## 待优化
- [ ] 移动端响应式优化
- [ ] 标签云展示
- [ ] 用户头像
- [ ] 教程阅读量统计
- [ ] SEO 优化
