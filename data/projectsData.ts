export type ProjectLocale = 'zh' | 'en';
export type ProjectText = Record<ProjectLocale, string>;

export interface ProjectLink {
  type: 'github' | 'demo' | 'docs';
  url: string;
}

export interface Project {
  id: string;
  slug: string;
  date: string;
  status: 'released' | 'wip' | 'experiment';
  icon: 'notebook' | 'layers' | 'bot' | 'terminal';
  title: ProjectText;
  summary: ProjectText;
  description: ProjectText;
  tags: string[];
  links: ProjectLink[];
  goal: ProjectText;
  features: ProjectText[];
  next: ProjectText;
}

// Fictional examples. Replace these records and add real links when publishing your own work.
const projectsData: Project[] = [
  {
    id: 'piggy-notes',
    slug: 'piggy-notes',
    date: '2026-10-12',
    status: 'released',
    icon: 'notebook',
    title: { zh: 'Piggy Notes', en: 'Piggy Notes' },
    summary: { zh: '给零散的灵感，一个安静的归处。', en: 'A quiet home for scattered ideas.' },
    description: {
      zh: '一个轻量的个人知识库，把开发笔记、阅读摘录和一闪而过的想法放在一起。用 Markdown 写作，通过标签与双向链接，慢慢织起自己的知识网络。',
      en: 'A small personal knowledge base for development notes, reading highlights and passing thoughts. Markdown, tags and backlinks turn loose pages into a connected collection.',
    },
    tags: ['Next.js', 'TypeScript', 'MDX'],
    links: [],
    goal: {
      zh: '笔记往往散落在不同的应用里，记录容易，重新找到却很难。这个项目从一个简单的想法出发：让写下的东西，在需要时还能被轻松找到。',
      en: 'Notes tend to end up in different apps. Writing them is easy; finding them again is harder. This project starts with one idea: make what you write easy to rediscover.',
    },
    features: [
      {
        zh: '使用本地 Markdown 文件管理内容，支持代码块与阅读目录。',
        en: 'Local Markdown files with code blocks and a reading outline.',
      },
      {
        zh: '通过标签、全文搜索和双向链接连接相关笔记。',
        en: 'Tags, full-text search and backlinks connect related notes.',
      },
      {
        zh: '提供中英文界面，让写作与阅读保持简单。',
        en: 'A bilingual interface that keeps writing and reading simple.',
      },
    ],
    next: {
      zh: '接下来想试试阅读回顾：定期捞起很久没打开的笔记，看看旧想法能不能碰撞出新东西。',
      en: 'Next up: a reading review that resurfaces older notes and invites a fresh look at forgotten ideas.',
    },
  },
  {
    id: 'spring-boot-starter',
    slug: 'spring-boot-starter',
    date: '2026-08-24',
    status: 'released',
    icon: 'layers',
    title: { zh: 'Spring Boot 起步套件', en: 'Spring Boot Starter' },
    summary: { zh: '少一点重复搭建，多一点专注业务。', en: 'Less setup. More room for the actual idea.' },
    description: {
      zh: '一套开箱即用的后端服务模板，整合认证、异常处理、日志和缓存。从一个清晰的项目骨架开始，把时间留给真正想实现的功能。',
      en: 'A backend starter with authentication, error handling, logging and caching. A clear project structure leaves more time for the features you actually want to build.',
    },
    tags: ['Java', 'Spring Boot', 'Docker'],
    links: [],
    goal: {
      zh: '每次新建后端项目，总会重复配置认证、日志、数据库和部署脚本。想把这些通用部分整理成一个容易理解、也方便删减的起点。',
      en: 'New backend projects often repeat the same authentication, logging, database and deployment setup. The aim is a starting point that is easy to understand and trim down.',
    },
    features: [
      {
        zh: 'JWT 认证与统一异常响应，约定清晰的接口格式。',
        en: 'JWT authentication and consistent API error responses.',
      },
      { zh: 'MySQL 数据持久化与 Redis 缓存示例。', en: 'Examples for MySQL persistence and Redis caching.' },
      {
        zh: 'Docker Compose 本地环境与基础健康检查。',
        en: 'A local Docker Compose environment with basic health checks.',
      },
    ],
    next: {
      zh: '补充接口集成测试与数据库迁移示例，让从本地运行到部署的过程更顺手。',
      en: 'Add API integration tests and database migration examples to smooth the path from local development to deployment.',
    },
  },
  {
    id: 'ai-code-assistant',
    slug: 'ai-code-assistant',
    date: '2026-07-09',
    status: 'wip',
    icon: 'bot',
    title: { zh: 'Code Companion', en: 'Code Companion' },
    summary: { zh: '一起读代码的小搭档。', en: 'A little company for reading code.' },
    description: {
      zh: '一个面向日常开发的 AI 代码助手实验。试着让代码解释、重构建议和提交信息生成融入现有工作流，帮助理解陌生代码，也保留自己的判断。',
      en: 'An AI coding experiment for everyday development. Code explanations, refactoring suggestions and commit drafts fit into a familiar workflow while leaving decisions to you.',
    },
    tags: ['React', 'TypeScript', 'AI SDK'],
    links: [],
    goal: {
      zh: '接手陌生代码时，最费时间的常常是理解上下文。希望有一个小工具，能从选中的代码出发，解释意图、梳理依赖，并给出可供比较的修改建议。',
      en: 'Understanding context takes time when exploring an unfamiliar codebase. This tool starts from selected code to explain intent, trace dependencies and suggest changes worth comparing.',
    },
    features: [
      {
        zh: '针对选中片段解释代码逻辑，并保留相关上下文。',
        en: 'Explain selected code while preserving relevant context.',
      },
      {
        zh: '用差异视图展示重构建议，确认后再应用。',
        en: 'Show refactoring suggestions as a diff for review before applying.',
      },
      { zh: '根据暂存的改动生成提交信息草稿。', en: 'Draft commit messages from staged changes.' },
    ],
    next: {
      zh: '继续打磨上下文选择与响应体验，先把「读懂一个函数」这件小事做好。',
      en: 'Refine context selection and response handling, starting with the small task of understanding one function well.',
    },
  },
  {
    id: 'tiny-task-cli',
    slug: 'tiny-task-cli',
    date: '2026-05-18',
    status: 'experiment',
    icon: 'terminal',
    title: { zh: 'TinyTask CLI', en: 'TinyTask CLI' },
    summary: { zh: '待办很轻，留在终端就好。', en: 'Small tasks, right in the terminal.' },
    description: {
      zh: '一个不用离开终端的待办小工具。随手记下任务，标记优先级，完成后打个勾。数据留在本地，用几个简单命令管理每天的小事。',
      en: 'A tiny todo tool that lives in your terminal. Capture tasks, set priorities and check them off. Local storage and a handful of commands keep everyday planning light.',
    },
    tags: ['Node.js', 'TypeScript', 'CLI'],
    links: [],
    goal: {
      zh: '写代码时冒出一个待办，切换应用就容易分心。这个实验想验证：只靠几个简短命令，能不能把任务记录做得足够顺手。',
      en: 'Switching apps to capture a task can break your focus. This experiment asks whether a few short commands can make task tracking feel natural.',
    },
    features: [
      {
        zh: '快速添加、列出、完成任务，支持优先级与项目分组。',
        en: 'Add, list and complete tasks with priorities and project groups.',
      },
      { zh: '以本地 JSON 文件存储数据，支持导出备份。', en: 'Store data in a local JSON file with backup export.' },
      { zh: '简洁的终端输出，适配浅色与深色终端。', en: 'Readable output for light and dark terminals.' },
    ],
    next: {
      zh: '尝试交互式列表和 shell 补全，同时保持命令数量与使用成本足够低。',
      en: 'Explore an interactive list and shell completion while keeping the command set small.',
    },
  },
];

export default projectsData;
