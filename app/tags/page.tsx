import { slug } from 'github-slugger';

import tagData from 'app/tag-data.json';
import { genPageMetadata } from 'app/seo';

import { Link, Tag } from '@/components/ui';

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' });

export default async function Page() {
  const tagCounts = tagData as Record<string, number>;

  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-block">
            <h1 className="mb-4 text-5xl font-bold text-blue-600 dark:text-blue-400 md:text-7xl">Tags</h1>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Explore all article tags and discover topics of interest
          </p>
        </div>

        {/* Tags Grid */}
        <div className="mx-auto max-w-6xl">
          {tagKeys.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-4 text-6xl">🏷️</div>
              <p className="text-xl text-gray-500 dark:text-gray-400">No tags found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedTags.map((tag, index) => {
                const count = tagCounts[tag];
                const isPopular = count >= 5;
                const isMedium = count >= 3 && count < 5;

                return (
                  <div
                    key={tag}
                    className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                      isPopular
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
                        : isMedium
                          ? 'bg-gradient-to-br from-indigo-100 to-purple-100 shadow-md dark:from-indigo-900/30 dark:to-purple-900/30'
                          : 'border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/20"></div>
                      <div className="absolute -bottom-2 -left-2 h-8 w-8 rounded-full bg-white/10"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-3 flex items-center justify-between">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            isPopular ? 'bg-white/80' : isMedium ? 'bg-indigo-500' : 'bg-gray-400 dark:bg-gray-500'
                          }`}
                        ></div>
                        <span
                          className={`rounded-full px-2 py-1 text-sm font-bold ${
                            isPopular
                              ? 'bg-white/20 text-white'
                              : isMedium
                                ? 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {count}
                        </span>
                      </div>

                      <div className="mb-4">
                        <Tag text={tag} />
                      </div>

                      <Link
                        href={`/tags/${slug(tag)}`}
                        className={`inline-flex items-center text-sm font-medium transition-colors duration-200 ${
                          isPopular
                            ? 'text-white/80 hover:text-white'
                            : isMedium
                              ? 'text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300'
                              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                        aria-label={`View posts tagged ${tag}`}
                      >
                        {count === 1 ? '1 post' : `${count} posts`}
                        <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-8 rounded-2xl border border-gray-200/50 bg-white/80 px-8 py-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{tagKeys.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Tags</div>
            </div>
            <div className="h-12 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {Object.values(tagCounts).reduce((sum, count) => sum + count, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Posts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
