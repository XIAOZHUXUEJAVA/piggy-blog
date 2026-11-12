import { ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
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
  const locale = useLocale();
  const t = useTranslations('Post');
  const { filePath, path, slug, date, title, tags } = content;
  const basePath = path.split('/')[0];

  return (
    <SectionContainer size="article">
      <ReadingProgress />
      <ScrollTopAndComment />
      <article className="paper-reading relative">
        <div className="xl:divide-y xl:divide-paper-line">
          <header className="pt-8 xl:pb-8">
            <div className="space-y-6 text-center">
              <dl className="space-y-4">
                <div>
                  <dt className="sr-only">{t('publishedOn')}</dt>
                  <dd className="paper-tag">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div className="relative">
                <PageTitle>{title}</PageTitle>
                <div className="absolute -bottom-3 left-1/2 h-px w-12 -translate-x-1/2 bg-paper-line-hover"></div>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-paper-line pb-8 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:divide-y-0">
            <dl className="pb-10 pt-8 xl:border-b xl:border-paper-line xl:pt-12">
              <dt className="sr-only">{t('authors')}</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-6 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-6">
                  {authorDetails.map((author) => (
                    <li
                      className="group flex items-center space-x-3 rounded-xl p-3 transition-colors duration-200 hover:bg-paper-inset"
                      key={author.name}
                    >
                      {author.avatar && (
                        <div className="relative">
                          <Image
                            src={author.avatar}
                            width={42}
                            height={42}
                            alt={t('avatarAlt', { name: author.name })}
                            className="h-11 w-11 rounded-full ring-1 ring-paper-line"
                          />
                        </div>
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">{t('authorName')}</dt>
                        <dd className="text-paper-ink">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-xs text-paper-accent hover:text-paper-accent-hover"
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
            <div className="mx-auto w-full min-w-0 max-w-3xl xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-10 pt-12">{children}</div>
              <div className="border-t border-paper-line py-8">
                <div className="flex flex-col items-center justify-center gap-6">
                  <Link href={editUrl(filePath)} className="paper-button">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t('viewOnGithub')}
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
              <div className="divide-paper-line text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-6 xl:py-8">
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-paper-muted">{t('tags')}</h2>
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
                      <div className="group rounded-xl p-4 transition-colors duration-200 hover:bg-paper-inset">
                        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-paper-muted">
                          {t('previousArticle')}
                        </h2>
                        <div className="text-paper-accent hover:text-paper-accent-hover">
                          <Link href={`/${prev.path}`} className="font-medium">
                            {prev.title}
                          </Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div className="group rounded-xl p-4 transition-colors duration-200 hover:bg-paper-inset">
                        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-paper-muted">
                          {t('nextArticle')}
                        </h2>
                        <div className="text-paper-accent hover:text-paper-accent-hover">
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
                <Link href={`/${basePath}`} className="paper-button" aria-label={t('backToBlog')}>
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  {t('backToBlog')}
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
