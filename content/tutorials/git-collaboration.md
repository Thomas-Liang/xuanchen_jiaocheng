---
title: "Git 协作工作流完全指南"
description: "掌握 Git 高级技巧，建立规范的团队协作流程"
author: "泫晨云栖"
publishDate: "2026-02-25"
lastModified: "2026-03-12"
coverImage: "https://picsum.photos/seed/git/800/450"
tags: ["Git", "版本控制", "协作"]
isDraft: false
---

Git 是现代软件开发不可或缺的工具，本文将介绍高级使用技巧。

## 分支管理策略

### Git Flow

```
main ─────●─────●─────●─────
          ↑
develop ──●─────●─────●───●
               ↑    ↑    ↑
          feature feature hotfix
```

### GitHub Flow

```bash
# 创建功能分支
git checkout -b feature/new-feature

# 开发完成后提交 PR
git push origin feature/new-feature
```

## 高级命令

### 交互式 rebase

```bash
git rebase -i HEAD~5
```

### Cherry-pick

```bash
git cherry-pick <commit-hash>
```

### 子模块

```bash
# 添加子模块
git submodule add https://github.com/org/repo.git path/to/repo

# 初始化子模块
git submodule update --init
```

## 常用别名

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.last 'log -1 HEAD'
```

## 协作最佳实践

1. 保持提交信息清晰
2. 使用 feature branch
3. 定期 rebase main 分支
4. 善用 PR 进行代码审查