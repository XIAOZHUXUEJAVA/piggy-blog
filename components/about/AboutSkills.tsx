'use client';

import { motion } from 'framer-motion';

export default function AboutSkills() {
  const skillCategories = [
    {
      title: '前端开发',
      icon: '🎨',
      skills: [
        { name: 'React', level: 90, color: 'bg-blue-500' },
        { name: 'Next.js', level: 85, color: 'bg-gray-800' },
        { name: 'TypeScript', level: 88, color: 'bg-blue-600' },
        { name: 'Tailwind CSS', level: 92, color: 'bg-cyan-500' },
        { name: 'Vue.js', level: 75, color: 'bg-green-500' },
      ],
    },
    {
      title: '后端开发',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 85, color: 'bg-green-600' },
        { name: 'Python', level: 80, color: 'bg-yellow-500' },
        { name: 'PostgreSQL', level: 78, color: 'bg-blue-700' },
        { name: 'MongoDB', level: 75, color: 'bg-green-700' },
        { name: 'Redis', level: 70, color: 'bg-red-500' },
      ],
    },
    {
      title: '工具 & 其他',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 90, color: 'bg-orange-500' },
        { name: 'Docker', level: 75, color: 'bg-blue-600' },
        { name: 'AWS', level: 70, color: 'bg-yellow-600' },
        { name: 'Figma', level: 85, color: 'bg-purple-500' },
        { name: 'Linux', level: 80, color: 'bg-gray-700' },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80"
    >
      <h2 className="mb-8 flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
        <span className="text-2xl">💻</span>
        技能专长
      </h2>

      <div className="space-y-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <span>{category.icon}</span>
              {category.title}
            </h3>

            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '100%' }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.3 }}
                      className={`h-full ${skill.color} relative rounded-full`}
                    >
                      <div className="absolute inset-0 animate-pulse bg-white/20"></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fun Fact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-8 rounded-xl border border-blue-200/50 bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:border-blue-700/50 dark:from-blue-900/20 dark:to-purple-900/20"
      >
        <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="text-lg">💡</span>
          <span>
            <strong>有趣的事实：</strong> 我每天至少要喝3杯咖啡才能正常工作，最喜欢在深夜写代码！
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}
