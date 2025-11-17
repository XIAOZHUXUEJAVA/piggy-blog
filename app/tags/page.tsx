import { slug } from 'github-slugger';

import tagData from 'app/tag-data.json';
import { genPageMetadata } from 'app/seo';

import { Link } from '@/components/ui';

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' });

export default async function Page() {
  const tagCounts = tagData as Record<string, number>;

  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-green-200/30 to-yellow-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-orange-200/30 to-yellow-200/30 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-block">
            <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white md:text-7xl">Tags</h1>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-green-500 to-yellow-500 shadow-lg"></div>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-lg font-medium text-gray-600 dark:text-gray-300">
            Explore all article tags and discover topics of interest
          </p>
        </div>

        {/* Tags Grid */}
        <div className="mx-auto max-w-7xl">
          {tagKeys.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-4 text-6xl">🏷️</div>
              <p className="text-xl text-gray-500 dark:text-gray-400">No tags found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {sortedTags.map((tag, index) => {
                const count = tagCounts[tag];
                const isPopular = count >= 5;
                const isMedium = count >= 3 && count < 5;

                return (
                  <Link
                    key={tag}
                    href={`/tags/${slug(tag)}`}
                    className="group block"
                    aria-label={`View articles tagged with ${tag}`}
                  >
                    <div
                      className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-600/30 dark:bg-gray-800/80 dark:shadow-gray-900/20"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      {/* 内部光泽效果 */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60 dark:from-gray-600/30"></div>

                      {/* 悬浮时的光效 */}
                      <div className="absolute inset-0 -translate-x-full transform rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity transition-transform duration-1000 duration-500 group-hover:translate-x-full group-hover:opacity-100 dark:via-gray-400/20"></div>

                      {/* 装饰性元素 */}
                      <div className="absolute right-4 top-4 opacity-20 dark:opacity-40">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            isPopular ? 'bg-green-500' : isMedium ? 'bg-yellow-500' : 'bg-gray-400 dark:bg-gray-500'
                          }`}
                        ></div>
                      </div>

                      {/* 内容 */}
                      <div className="relative z-10">
                        {/* 标签名称 */}
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-white">
                            {tag}
                          </h3>
                        </div>

                        {/* 文章数量 */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {count === 1 ? '1 article' : `${count} articles`}
                          </span>

                          {/* 数量徽章 */}
                          <div
                            className={`inline-flex h-7 min-w-[28px] items-center justify-center rounded-full px-2 text-xs font-bold transition-all duration-300 ${
                              isPopular
                                ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-white shadow-lg'
                                : isMedium
                                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md'
                                  : 'bg-gray-200 text-gray-700 shadow-sm dark:bg-gray-600 dark:text-gray-200'
                            }`}
                          >
                            {count}
                          </div>
                        </div>

                        {/* 热门标识 */}
                        {isPopular && (
                          <div className="absolute -right-2 -top-2 rotate-12 transform rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 px-2 py-1 text-xs font-bold text-white shadow-lg">
                            Popular
                          </div>
                        )}
                      </div>

                      {/* 底部装饰线 */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl ${
                          isPopular
                            ? 'bg-gradient-to-r from-green-500 to-yellow-500'
                            : isMedium
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                              : 'bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500'
                        } opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
                      ></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* 统计信息卡片 */}
        <div className="mt-20 text-center">
          <div className="relative inline-flex items-center rounded-2xl bg-white/90 shadow-2xl backdrop-blur-xl dark:bg-gray-800/90">
            {/* 简化的边框效果 */}
            <div className="absolute inset-0 rounded-2xl border border-white/20 dark:border-gray-600/30"></div>

            <div className="relative z-10 px-8 py-6 text-center">
              <div className="bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-3xl font-bold text-transparent">
                {tagKeys.length}
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">Total Tags</div>
            </div>

            <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>

            <div className="relative z-10 px-8 py-6 text-center">
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-3xl font-bold text-transparent">
                {Object.values(tagCounts).reduce((sum, count) => sum + count, 0)}
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">Total Articles</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
