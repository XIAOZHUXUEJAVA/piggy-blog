# Piggy's Blog

一个基于 Next.js 14 构建的现代化博客系统，支持 MDX 文章、深色模式、搜索功能和评论系统。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **内容管理**: Contentlayer2 + MDX

- **部署**: Vercel / Netlify
- **评论系统**: Giscus
- **搜索**: Kbar
- **分析**: Umami Analytics

## 功能特性

- 📝 支持 MDX 格式的博客文章
- 🌙 深色/浅色主题切换
- 🔍 全站搜索功能
- 💬 基于 GitHub Discussions 的评论系统

- 🏷️ 标签分类系统
- 📱 响应式设计
- ⚡ 性能优化和 SEO 友好

## 快速开始

### 环境要求

- Node.js 18+
- Yarn 包管理器

### 安装依赖

```bash
yarn install
```

### 环境配置

创建 `.env.local` 文件并配置以下环境变量：

```bash
# Giscus 评论系统配置
NEXT_PUBLIC_GISCUS_REPO="your-username/your-repo"
NEXT_PUBLIC_GISCUS_REPOSITORY_ID="your-repository-id"
NEXT_PUBLIC_GISCUS_CATEGORY="General"
NEXT_PUBLIC_GISCUS_CATEGORY_ID="your-category-id"

```

### 启动开发服务器

```bash
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看博客。

## 内容管理

### 添加文章

1. 在 `data/blog/` 目录下创建 `.mdx` 文件
2. 文件头部添加 frontmatter：

```yaml
---
title: '文章标题'
date: '2024-01-01'
tags: ['tag1', 'tag2']
draft: false
summary: '文章摘要'
---
```

3. 使用 Markdown 或 MDX 语法编写内容

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署完成

### Netlify 部署

1. 将代码推送到 GitHub
2. 在 Netlify 中连接仓库
3. 配置环境变量

### Docker 部署

```bash
# 构建镜像
docker build -t piggy-blog .

# 运行容器
docker run -p 3000:3000 --env-file .env.local piggy-blog
```

## 开发指南

### 项目结构

```
├── app/                 # Next.js App Router 页面
├── components/          # React 组件
├── data/               # 博客文章和配置
├── public/             # 静态资源
├── styles/             # 样式文件
├── utils/              # 工具函数
```

### 可用脚本

```bash
yarn dev          # 启动开发服务器
yarn build        # 构建生产版本
yarn start        # 启动生产服务器
yarn lint         # 代码检查
```

### 自定义主题

编辑 `tailwind.config.js` 文件来自定义颜色、字体等样式配置。

## 常见问题

### 构建失败

检查所有环境变量是否正确配置。

### 评论系统不显示

确保 Giscus 相关的环境变量已正确配置，并且 GitHub 仓库已启用 Discussions 功能。

### Spotify

确保自己的 Spotify 环境变量配置正确，否则无法播放音乐。
