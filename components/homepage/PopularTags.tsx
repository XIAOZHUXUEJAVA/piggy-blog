import { map } from 'lodash';

import popularTags from '@/data/popularTags';

import Link from '@/components/ui/Link';
import BrandIcon from '@/components/ui/BrandIcon';
import Twemoji from '../ui/Twemoji';
import { RoughNotation } from 'react-rough-notation';

const PopularTags = () => {
  return (
    <div className="relative">
      {/* 背景装饰 */}
      <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-green-50/30 via-teal-50/20 to-blue-50/30 blur-xl dark:from-green-900/10 dark:via-teal-900/10 dark:to-blue-900/10" />

      <div className="relative z-10 space-y-6 py-8">
        {/* 标题区域 - 左右布局 */}
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-end">
          {/* 左侧：标题和描述 */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-5xl">
              <RoughNotation
                type="highlight"
                show={true}
                color="#10b981"
                animationDelay={800}
                animationDuration={1200}
                padding={[8, 16]}
              >
                <span className="text-gray-800 dark:text-gray-200">Popular Tags</span>
              </RoughNotation>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 lg:max-w-none">
              Discover the most popular technologies and topics in my blog posts
            </p>
          </div>

          {/* 右侧：查看更多按钮和装饰 */}
          <div className="flex flex-col items-center gap-4 lg:items-end">
            <Link
              href="/tags"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-100 to-teal-100 px-6 py-3 text-sm font-medium text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:from-green-900/30 dark:to-teal-900/30 dark:text-gray-300"
            >
              <Twemoji emoji="backhand-index-pointing-right" />
              <span>Explore All Tags</span>
              {/* <div className="transition-transform duration-200 group-hover:translate-x-1">→</div> */}
            </Link>

            {/* 装饰性统计信息 */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <span>{popularTags.length} Topics</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                <span>Updated Daily</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 标签网格 - 彩色渐变布局 */}
      <div className="py-6">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
          {map(popularTags, (popularTag, index) => {
            const { slug, iconType, href, title } = popularTag;

            // 为不同标签定义不同的颜色主题
            const colorThemes = [
              // JavaScript - 黄色主题
              {
                bg: 'from-yellow-50/80 to-amber-50/60',
                icon: 'from-yellow-100 to-amber-100',
                hover: 'from-yellow-100/80 to-amber-100/60',
                indicator: 'from-yellow-400 to-amber-400',
                dark: 'dark:from-yellow-900/30 dark:to-amber-900/20',
              },
              // React - 蓝色主题
              {
                bg: 'from-blue-50/80 to-cyan-50/60',
                icon: 'from-blue-100 to-cyan-100',
                hover: 'from-blue-100/80 to-cyan-100/60',
                indicator: 'from-blue-400 to-cyan-400',
                dark: 'dark:from-blue-900/30 dark:to-cyan-900/20',
              },
              // Node.js - 绿色主题
              {
                bg: 'from-green-50/80 to-emerald-50/60',
                icon: 'from-green-100 to-emerald-100',
                hover: 'from-green-100/80 to-emerald-100/60',
                indicator: 'from-green-400 to-emerald-400',
                dark: 'dark:from-green-900/30 dark:to-emerald-900/20',
              },
              // TypeScript - 紫色主题
              {
                bg: 'from-purple-50/80 to-violet-50/60',
                icon: 'from-purple-100 to-violet-100',
                hover: 'from-purple-100/80 to-violet-100/60',
                indicator: 'from-purple-400 to-violet-400',
                dark: 'dark:from-purple-900/30 dark:to-violet-900/20',
              },
              // Docker - 蓝绿主题
              {
                bg: 'from-teal-50/80 to-cyan-50/60',
                icon: 'from-teal-100 to-cyan-100',
                hover: 'from-teal-100/80 to-cyan-100/60',
                indicator: 'from-teal-400 to-cyan-400',
                dark: 'dark:from-teal-900/30 dark:to-cyan-900/20',
              },
              // Git - 橙色主题
              {
                bg: 'from-orange-50/80 to-red-50/60',
                icon: 'from-orange-100 to-red-100',
                hover: 'from-orange-100/80 to-red-100/60',
                indicator: 'from-orange-400 to-red-400',
                dark: 'dark:from-orange-900/30 dark:to-red-900/20',
              },
              // Java - 红色主题
              {
                bg: 'from-red-50/80 to-pink-50/60',
                icon: 'from-red-100 to-pink-100',
                hover: 'from-red-100/80 to-pink-100/60',
                indicator: 'from-red-400 to-pink-400',
                dark: 'dark:from-red-900/30 dark:to-pink-900/20',
              },
              // Linux - 灰蓝主题
              {
                bg: 'from-slate-50/80 to-blue-50/60',
                icon: 'from-slate-100 to-blue-100',
                hover: 'from-slate-100/80 to-blue-100/60',
                indicator: 'from-slate-400 to-blue-400',
                dark: 'dark:from-slate-900/30 dark:to-blue-900/20',
              },
              // 其他标签的循环主题
              {
                bg: 'from-indigo-50/80 to-purple-50/60',
                icon: 'from-indigo-100 to-purple-100',
                hover: 'from-indigo-100/80 to-purple-100/60',
                indicator: 'from-indigo-400 to-purple-400',
                dark: 'dark:from-indigo-900/30 dark:to-purple-900/20',
              },
              {
                bg: 'from-pink-50/80 to-rose-50/60',
                icon: 'from-pink-100 to-rose-100',
                hover: 'from-pink-100/80 to-rose-100/60',
                indicator: 'from-pink-400 to-rose-400',
                dark: 'dark:from-pink-900/30 dark:to-rose-900/20',
              },
              {
                bg: 'from-emerald-50/80 to-teal-50/60',
                icon: 'from-emerald-100 to-teal-100',
                hover: 'from-emerald-100/80 to-teal-100/60',
                indicator: 'from-emerald-400 to-teal-400',
                dark: 'dark:from-emerald-900/30 dark:to-teal-900/20',
              },
              {
                bg: 'from-lime-50/80 to-green-50/60',
                icon: 'from-lime-100 to-green-100',
                hover: 'from-lime-100/80 to-green-100/60',
                indicator: 'from-lime-400 to-green-400',
                dark: 'dark:from-lime-900/30 dark:to-green-900/20',
              },
            ];

            const theme = colorThemes[index % colorThemes.length];

            return (
              <Link
                key={slug}
                href={href}
                className={`${slug} group relative overflow-hidden rounded-lg bg-gradient-to-br ${theme.bg} ${theme.dark} p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-md`}
              >
                {/* 悬停时的背景增强 */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${theme.hover} ${theme.dark} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                {/* 内容容器 */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  {/* 图标容器 */}
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br ${theme.icon} shadow-sm transition-all duration-300 group-hover:scale-110`}
                  >
                    <BrandIcon
                      type={iconType}
                      className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* 标题 */}
                  <div className="text-center">
                    <h3 className="text-xs font-medium text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-white">
                      {title}
                    </h3>
                  </div>

                  {/* 悬停指示器 */}
                  <div
                    className={`absolute -bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r ${theme.indicator} transition-all duration-300 group-hover:w-2/3`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularTags;
