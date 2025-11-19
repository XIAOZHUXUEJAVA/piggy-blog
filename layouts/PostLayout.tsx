import { ReactNode } from 'react';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog, Authors } from 'contentlayer/generated';

import siteMetadata from '@/data/siteMetadata';
import { Comments, Link, PageTitle, SectionContainer, Image, Tag, ScrollTopAndComment } from '@/components/ui';
import ReadingProgress from '@/components/ReadingProgress';

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`;
// const discussUrl = (path) =>
//   `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`;

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface LayoutProps {
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  children: ReactNode;
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content;
  const basePath = path.split('/')[0];

  return (
    <SectionContainer>
      <ReadingProgress />
      <ScrollTopAndComment />
      <article className="relative">
        <div className="xl:divide-y xl:divide-amber-100/50 xl:dark:divide-amber-800/30">
          <header className="pt-8 xl:pb-8">
            <div className="space-y-6 text-center">
              <dl className="space-y-4">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="inline-flex items-center rounded-full border border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 text-sm font-medium text-amber-700 dark:border-amber-700/30 dark:from-amber-900/20 dark:to-orange-900/20 dark:text-amber-300">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div className="relative">
                <PageTitle>{title}</PageTitle>
                <div className="absolute -bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-emerald-300 via-amber-300 to-orange-300 opacity-60"></div>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-emerald-100/50 pb-8 dark:divide-emerald-800/30 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:divide-y-0">
            <dl className="pb-10 pt-8 xl:border-b xl:border-emerald-100/50 xl:pt-12 xl:dark:border-emerald-800/30">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-6 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-6">
                  {authorDetails.map((author) => (
                    <li
                      className="group flex items-center space-x-3 rounded-xl p-3 transition-all duration-200 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-amber-50/50 dark:hover:from-emerald-900/10 dark:hover:to-amber-900/10"
                      key={author.name}
                    >
                      {author.avatar && (
                        <div className="relative">
                          <Image
                            src={author.avatar}
                            width={42}
                            height={42}
                            alt="avatar"
                            className="h-11 w-11 rounded-full ring-2 ring-emerald-200/50 transition-all duration-200 group-hover:ring-amber-300/60 dark:ring-emerald-700/30 dark:group-hover:ring-amber-600/40"
                          />
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-br from-emerald-400 to-amber-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
                        </div>
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-800 transition-colors duration-200 group-hover:text-emerald-700 dark:text-gray-200 dark:group-hover:text-emerald-300">
                          {author.name}
                        </dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-xs text-amber-600 transition-colors duration-200 hover:text-orange-500 dark:text-amber-400 dark:hover:text-orange-300"
                            >
                              {author.twitter.replace('https://twitter.com/', '@').replace('https://x.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose-tbody:text-gray-700 dark:prose-tbody:text-gray-200 prose prose-gray max-w-none pb-10 pt-12 dark:prose-invert prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:text-amber-600 prose-blockquote:border-l-emerald-300 prose-blockquote:text-gray-600 prose-strong:text-gray-800 prose-code:rounded prose-code:border prose-code:border-orange-200/50 prose-code:bg-gradient-to-r prose-code:from-orange-50 prose-code:to-amber-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:text-orange-600 prose-code:shadow-sm prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:rounded-xl prose-pre:border prose-pre:border-emerald-200/30 prose-pre:bg-gradient-to-br prose-pre:from-emerald-50/80 prose-pre:via-amber-50/60 prose-pre:to-orange-50/80 prose-pre:shadow-xl prose-pre:ring-1 prose-pre:ring-emerald-200/20 prose-li:text-gray-700 prose-table:text-gray-700 prose-thead:text-gray-800 dark:prose-headings:text-gray-100 dark:prose-p:text-gray-300 dark:prose-a:text-emerald-400 dark:hover:prose-a:text-amber-400 dark:prose-blockquote:border-l-emerald-600 dark:prose-blockquote:text-gray-400 dark:prose-strong:text-white dark:prose-code:border-orange-700/30 dark:prose-code:from-orange-900/30 dark:prose-code:to-amber-900/30 dark:prose-code:text-orange-400 dark:prose-pre:border-emerald-700/30 dark:prose-pre:from-emerald-950/40 dark:prose-pre:via-amber-950/30 dark:prose-pre:to-orange-950/40 dark:prose-pre:ring-emerald-700/10 dark:prose-li:text-gray-300 dark:prose-table:text-gray-200 dark:prose-thead:text-gray-100">
                {children}
              </div>
              <div className="border-t border-emerald-100/50 py-8 dark:border-emerald-800/30">
                <div className="flex flex-col items-center justify-center gap-6">
                  <Link
                    href={editUrl(filePath)}
                    className="inline-flex items-center rounded-lg border border-emerald-200/50 bg-gradient-to-r from-emerald-50 to-amber-50 px-4 py-2 text-sm font-medium text-emerald-700 transition-all duration-200 hover:from-emerald-100 hover:to-amber-100 hover:shadow-sm dark:border-emerald-700/30 dark:from-emerald-900/20 dark:to-amber-900/20 dark:text-emerald-300 dark:hover:from-emerald-800/30 dark:hover:to-amber-800/30"
                  >
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View on GitHub
                  </Link>
                  {siteMetadata.comments && (
                    <div className="w-full text-center" id="comment">
                      <div className="mx-auto max-w-4xl">
                        <Comments slug={slug} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <footer>
              <div className="divide-emerald-100/50 text-sm font-medium leading-5 dark:divide-emerald-800/30 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-6 xl:py-8">
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-6 xl:block xl:space-y-6 xl:py-8">
                    {prev && prev.path && (
                      <div className="group rounded-xl p-4 transition-all duration-200 hover:bg-gradient-to-r hover:from-emerald-50/30 hover:to-amber-50/30 dark:hover:from-emerald-900/10 dark:hover:to-amber-900/10">
                        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                          Previous Article
                        </h2>
                        <div className="text-emerald-600 transition-colors duration-200 hover:text-orange-500 dark:text-emerald-400 dark:hover:text-orange-300">
                          <Link href={`/${prev.path}`} className="font-medium">
                            {prev.title}
                          </Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div className="group rounded-xl p-4 transition-all duration-200 hover:bg-gradient-to-r hover:from-emerald-50/30 hover:to-amber-50/30 dark:hover:from-emerald-900/10 dark:hover:to-amber-900/10">
                        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                          Next Article
                        </h2>
                        <div className="text-emerald-600 transition-colors duration-200 hover:text-orange-500 dark:text-emerald-400 dark:hover:text-orange-300">
                          <Link href={`/${next.path}`} className="font-medium">
                            {next.title}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-6 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-emerald-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-amber-50/50 hover:text-orange-500 dark:text-emerald-400 dark:hover:from-emerald-900/20 dark:hover:to-amber-900/20 dark:hover:text-orange-300"
                  aria-label="Back to the blog"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
