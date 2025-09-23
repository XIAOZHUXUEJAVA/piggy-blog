'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const timelineData = [
  {
    year: '2023',
    title: '高级前端工程师',
    company: 'Secret',
    description:
      '负责大型Web应用的架构设计和开发，使用React、TypeScript等技术栈。主导团队技术选型，优化应用性能，提升用户体验。',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
    type: 'work' as const,
    achievements: ['性能优化提升40%', '团队代码质量提升', '用户满意度95%+'],
    icon: 'mdi:briefcase',
  },
  {
    year: '2022',
    title: '前端工程师',
    company: 'Secret',
    description: '参与多个创新项目的前端开发，积累了丰富的用户体验设计经验。从零到一构建多个产品原型。',
    technologies: ['Vue.js', 'JavaScript', 'SCSS', 'Webpack', 'Element UI'],
    type: 'work' as const,
    achievements: ['独立完成3个项目', '用户增长200%', '获得最佳员工奖'],
    icon: 'mdi:code-tags',
  },
  {
    year: '2021',
    title: '计算机科学学士',
    company: '某不知名大学',
    description: '主修计算机科学与技术，专注于软件工程和算法设计。参与多个开源项目，获得优秀毕业生称号。',
    technologies: ['Java', 'Python', 'C++', 'MySQL', 'Linux'],
    type: 'education' as const,
    achievements: ['GPA xxx/4.0', '优秀毕业生', '某竞赛省二等奖'],
    icon: 'mdi:school',
  },
  {
    year: '2020',
    title: '实习前端开发',
    company: 'Internet Company',
    description: '第一次接触前端开发，学习现代Web开发技术栈，参与公司内部工具开发。',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap'],
    type: 'work' as const,
    achievements: ['快速上手前端技术', '完成实习项目', '获得转正offer'],
    icon: 'mdi:laptop',
  },
];

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  type: 'work' | 'education';
  achievements?: string[];
  index: number;
  icon: string;
}

function ModernTimelineItem({
  year,
  title,
  company,
  description,
  technologies,
  type,
  achievements = [],
  index,
  icon,
}: TimelineItemProps) {
  const isWork = type === 'work';
  const colors = {
    work: {
      dot: 'bg-green-500',
      badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      accent: 'from-green-500 to-yellow-500',
    },
    education: {
      dot: 'bg-orange-500',
      badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      accent: 'from-yellow-500 to-orange-500',
    },
  };

  const currentColors = colors[type];

  return (
    <div className="relative flex items-start space-x-6">
      {/* Timeline dot */}
      <div className="relative mt-2 flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-4 border-white shadow-lg dark:border-gray-800 ${currentColors.dot}`}
        >
          <Icon icon={icon} className="h-6 w-6 text-white" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-current opacity-20"
          ></motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          className="rounded-xl border border-gray-200/50 bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/90"
        >
          {/* Header */}
          <div className="mb-3 flex items-center justify-between">
            <span
              className={`rounded-full bg-gradient-to-r px-3 py-1 text-sm font-bold text-white shadow-md ${currentColors.accent}`}
            >
              {year}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${currentColors.badge}`}>
              {isWork ? '💼 工作经历' : '🎓 教育背景'}
            </span>
          </div>

          {/* Title and Company */}
          <h3 className="mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-xl font-bold text-transparent dark:from-white dark:to-gray-300">
            {title}
          </h3>

          <p className="mb-3 flex items-center gap-2 text-base font-semibold text-green-600 dark:text-green-400">
            <span>{isWork ? '🏢' : '🏫'}</span>
            {company}
          </p>

          {/* Description */}
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{description}</p>

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-white">
                <span>🏆</span>
                主要成就
              </h4>
              <ul className="space-y-1">
                {achievements.map((achievement, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-green-500">✓</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h4 className="mb-2 flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-white">
              <span>🛠️</span>
              技术栈
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                  className="rounded-full border border-gray-300/50 bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 text-xs font-medium text-gray-700 transition-shadow duration-200 hover:shadow-md dark:border-gray-600/50 dark:from-gray-700 dark:to-gray-600 dark:text-gray-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ModernCareerTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80"
    >
      <h2 className="mb-8 flex items-center gap-3 bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-2xl font-bold text-transparent">
        <span className="text-2xl">🚀</span>
        职业历程
      </h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-6 top-0 w-0.5 bg-gradient-to-b from-green-500 via-yellow-500 to-orange-500 opacity-30"></div>

        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ModernTimelineItem {...item} index={index} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-8 rounded-xl border border-green-200/50 bg-gradient-to-r from-green-50 to-yellow-50 p-4 dark:border-green-700/50 dark:from-green-900/20 dark:to-yellow-900/20"
      >
        <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="text-lg">📈</span>
          <span>从实习生到高级工程师，我在前端开发领域不断成长，积累了丰富的项目经验和技术能力。</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
