export type CareerLocale = 'zh' | 'en';
export type CareerText = Record<CareerLocale, string>;

export interface CareerHighlight {
  title: CareerText;
  description: CareerText;
  projectId?: string;
}

export interface CareerEntry {
  id: string;
  kind: 'work' | 'education' | 'project';
  tone: 'amber' | 'green' | 'clay' | 'teal';
  mark: string;
  organization: CareerText;
  shortName?: CareerText;
  role: CareerText;
  message: CareerText;
  branch?: string;
  start: string;
  // Month dates use YYYY-MM; null means the experience is ongoing.
  end: string | null;
  stack: string[];
  highlights: CareerHighlight[];
}

// Fictional placeholders. Replace these entries with real experiences when ready.
const careerData: CareerEntry[] = [
  {
    id: 'independent',
    kind: 'project',
    tone: 'amber',
    mark: 'PG',
    organization: { zh: '独立项目与开源实践', en: 'Independent projects & open source' },
    shortName: { zh: '独立项目', en: 'Indie' },
    role: { zh: '开发者 / 持续折腾中', en: 'Developer / Always tinkering' },
    message: { zh: 'feat: 把想法变成可以使用的小产品', en: 'feat: turn ideas into useful little products' },
    start: '2026-04',
    end: null,
    stack: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'MDX', 'AI SDK'],
    highlights: [
      {
        projectId: 'digital-garden',
        title: { zh: '数字花园', en: 'Digital garden' },
        description: {
          zh: '搭建自己的博客，从文章归档到中英文切换，再到终端风格的个人介绍。把日常积累整理成可以反复翻阅的记录。',
          en: 'Building a personal blog with an article archive, bilingual pages and a terminal-inspired profile. Turning everyday notes into a place worth coming back to.',
        },
      },
      {
        title: { zh: '让工具服务于想法', en: 'Tools that make room for ideas' },
        description: {
          zh: '尝试将 AI 融入阅读代码、整理笔记和制作原型的过程，关注实际体验，也记录每一次尝试的得失。',
          en: 'Exploring AI for reading code, organizing notes and making prototypes, with an eye on the experience and lessons from each experiment.',
        },
      },
    ],
  },
  {
    id: 'perch-tech',
    kind: 'work',
    tone: 'green',
    mark: 'QT',
    organization: { zh: '栖木科技', en: 'Perch Technology' },
    shortName: { zh: '栖木科技', en: 'Perch' },
    role: { zh: '软件开发工程师', en: 'Software Engineer' },
    message: { zh: 'feat: 加入栖木科技，探索完整的产品开发', en: 'feat: join Perch Technology as Software Engineer' },
    start: '2025-01',
    end: null,
    stack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Docker', 'TypeScript', 'React'],
    highlights: [
      {
        projectId: 'workspace',
        title: { zh: '团队协作平台', en: 'Team workspace' },
        description: {
          zh: '参与从需求梳理到功能交付的完整流程，负责权限、任务流转与通知模块，逐步把后端经验延伸到前端交互。',
          en: 'Working from requirements through delivery on permissions, task workflows and notifications, bringing backend experience into frontend interactions.',
        },
      },
      {
        projectId: 'service-kit',
        title: { zh: '服务基础组件', en: 'Service toolkit' },
        description: {
          zh: '整理日志、缓存与异常处理等公共能力，完善容器化部署流程，让日常开发少一些重复，多一些专注。',
          en: 'Extracting shared logging, caching and error-handling tools, and improving container deployments to spend less time on repetitive setup.',
        },
      },
    ],
  },
  {
    id: 'web-learning',
    kind: 'education',
    tone: 'teal',
    mark: '</>',
    organization: { zh: 'Web 开发探索', en: 'Exploring web development' },
    shortName: { zh: 'Web', en: 'Web' },
    role: { zh: '个人学习计划', en: 'Independent learning' },
    message: { zh: 'learn: 从接口走向界面', en: 'learn: go beyond APIs and build interfaces' },
    branch: 'learning/web',
    start: '2024-03',
    end: '2024-10',
    stack: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Git'],
    highlights: [
      {
        title: { zh: '从零搭建前端应用', en: 'Building a frontend from scratch' },
        description: {
          zh: '从页面布局和浏览器基础开始，学习组件、状态管理与类型系统。通过小项目理解一个想法如何变成屏幕上的真实交互。',
          en: 'Starting with layouts and browser fundamentals, then exploring components, state and types through small projects that turn ideas into real interactions.',
        },
      },
    ],
  },
  {
    id: 'starlight',
    kind: 'work',
    tone: 'clay',
    mark: 'SH',
    organization: { zh: '星河工作室', en: 'Starlight Studio' },
    shortName: { zh: '星河工作室', en: 'Starlight' },
    role: { zh: 'Java 后端开发工程师', en: 'Java Backend Developer' },
    message: { zh: 'feat: 开始第一份开发工作', en: 'feat: start the first chapter as a backend developer' },
    start: '2023-07',
    end: '2024-12',
    stack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Git', 'Linux'],
    highlights: [
      {
        projectId: 'content-platform',
        title: { zh: '内容管理系统', en: 'Content platform' },
        description: {
          zh: '开发文章、分类与用户管理接口，参与数据库设计与接口联调，在真实需求中熟悉代码评审和团队协作。',
          en: 'Developing article, category and user APIs, working on database design and integration, and learning code review through everyday team delivery.',
        },
      },
      {
        projectId: 'operations-console',
        title: { zh: '内部运营工具', en: 'Operations console' },
        description: {
          zh: '为重复的运营流程编写数据导入与定时任务，排查慢查询和缓存问题，逐渐建立对稳定性与可维护性的理解。',
          en: 'Building imports and scheduled jobs for recurring operations, investigating slow queries and cache issues, and learning what makes a service maintainable.',
        },
      },
    ],
  },
  {
    id: 'computer-science',
    kind: 'education',
    tone: 'amber',
    mark: 'CS',
    organization: { zh: '某某大学', en: 'Somewhere University' },
    shortName: { zh: '计算机科学', en: 'Computer Science' },
    role: { zh: '计算机科学与技术 · 本科', en: 'BSc in Computer Science' },
    message: { zh: 'init: 从第一行 Hello World 开始', en: 'init: begin with a first Hello World' },
    branch: 'education/cs',
    start: '2019-09',
    end: '2023-06',
    stack: ['C', 'Java', 'MySQL', 'Git'],
    highlights: [
      {
        title: { zh: '建立基础，找到兴趣', en: 'Learning the foundations, finding a direction' },
        description: {
          zh: '学习数据结构、计算机网络、操作系统与数据库。比起只完成课程，更享受亲手做出小工具的过程，也由此选择了软件开发。',
          en: 'Studying data structures, networks, operating systems and databases. Finding the most joy in making small tools, and choosing software development along the way.',
        },
      },
    ],
  },
];

export default careerData;
