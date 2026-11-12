# Piggy's Blog

基于 Next.js 14 的个人博客系统，使用 MDX 编写文章，支持搜索、评论和多语言。

体验地址：https://piggyblog.xyz/

## 技术栈

- **框架**：Next.js 14 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **内容**：Contentlayer2 + MDX
- **国际化**：next-intl
- **组件库**：pliny

## 快速开始

### 环境要求

- Node.js 18+
- Yarn

### 安装依赖

```bash
yarn install
```

### 环境变量

创建 `.env.local` 文件：

```bash
# Giscus 评论配置
NEXT_PUBLIC_GISCUS_REPO="your-username/your-repo"
NEXT_PUBLIC_GISCUS_REPOSITORY_ID="your-repository-id"
NEXT_PUBLIC_GISCUS_CATEGORY="General"
NEXT_PUBLIC_GISCUS_CATEGORY_ID="your-category-id"
```

### 启动开发服务器

```bash
yarn dev
```

访问 http://localhost:3000。

## 内容管理

在 `data/blog/` 目录下创建 `.mdx` 文件，frontmatter 示例：

```yaml
---
title: '文章标题'
date: '2024-01-01'
tags: ['tag1', 'tag2']
draft: false
summary: '文章摘要'
---
```

## 项目结构

```
├── app/                    # Next.js App Router
│   ├── [locale]/           # 国际化路由
│   │   ├── about/
│   │   ├── blog/
│   │   ├── career/
│   │   ├── projects/
│   │   └── tags/
│   └── api/                # API 路由
├── components/             # React 组件
├── contentlayer.config.ts  # Contentlayer 配置
├── css/                    # 全局样式
├── data/                   # 内容和数据
│   ├── authors/
│   └── blog/
├── hooks/                  # 自定义 Hooks
├── i18n/                   # 国际化配置
├── layouts/                # 页面布局
├── messages/               # 多语言文案
├── public/                 # 静态资源
├── scripts/                # 构建脚本
├── servers/                # 服务端代码
├── types/                  # TypeScript 类型
└── utils/                  # 工具函数
```

## 常用脚本

```bash
yarn dev      # 启动开发服务器
yarn build    # 构建生产版本
yarn serve    # 启动生产服务器
yarn lint     # 代码检查
```

## 部署

### Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 完成部署

### Docker

```bash
docker build -t piggy-blog .
docker run -p 3000:3000 --env-file .env.local piggy-blog
```

## 许可证

[MIT License](./LICENSE)

Copyright (c) 2025 xiaozhu <https://github.com/XIAOZHUXUEJAVA>
