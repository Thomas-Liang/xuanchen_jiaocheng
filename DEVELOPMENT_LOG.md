# 泫晨云栖 - 教程网站开发记录

## 项目概述
- 框架：Astro + React + TailwindCSS
- 数据库：SQLite (用户数据) + 文件系统 (教程内容)
- 图片存储：GitHub 图床 (Thomas-Liang/xuanchen_image_bed)

## 功能列表

### 已完成
- [x] 教程列表展示（分页、搜索、标签筛选）
- [x] 教程详情页
- [x] 教程创建/编辑/删除
- [x] 封面图上传到 GitHub
- [x] 暗色模式切换
- [x] 用户登录/注册
- [x] 管理后台
- [x] 首页展示最新教程
- [x] 按最后修改时间排序
- [x] 评论功能
- [x] 收藏功能
- [x] 相关文章推荐
- [x] 开源项目页面完善
- [x] 工作流页面完善

### 待实现
- [ ] 开源项目页面完善
- [ ] 工作流页面完善
- [ ] 标签云展示
- [ ] 相关文章推荐
- [ ] 评论功能
- [ ] 收藏功能
- [ ] 移动端优化

## 访问地址
- 首页: http://localhost:9005/xuanchen_content/
- 登录: http://localhost:9005/xuanchen_content/login
- 注册: http://localhost:9005/xuanchen_content/register
- 教程列表: http://localhost:9005/xuanchen_content/tutorials/
- 管理后台: http://localhost:9005/xuanchen_content/admin/
- 新建教程: http://localhost:9005/xuanchen_content/tutorials/new/

## 技术细节
- 教程存储：content/tutorials/*.md
- 用户数据：data/auth.db (SQLite)
- 图片上传 API: /api/upload
- 教程 CRUD: /api/tutorials/create, /api/tutorials/edit, /api/tutorials/delete

## GitHub 配置
- 图片仓库: Thomas-Liang/xuanchen_image_bed
- Token: 环境变量 GITHUB_TOKEN
