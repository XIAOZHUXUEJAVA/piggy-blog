import { ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog, Authors } from 'contentlayer/generated';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Code2 } from 'lucide-react';

import siteMetadata from '@/data/siteMetadata';
import { Comments, Link, SectionContainer, Image, Tag, ScrollTopAndComment } from '@/components/ui';
import JourneyBackLink from '@/components/about/JourneyBackLink';
import ReadingProgress from '@/components/ReadingProgress';

interface LayoutProps {
  content: CoreContent<Blog>;
  authorDetails?: CoreContent<Authors>[];
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  children: ReactNode;
}

export default function PostLayout({ content, authorDetails = [], next, prev, children }: LayoutProps) {
  const locale = useLocale();
  const t = useTranslations('Post');
  const { filePath, slug, date, title, summary, tags, readingTime } = content;

  return (
    <SectionContainer size="reading">
      <ReadingProgress />
      <ScrollTopAndComment />
      {slug.startsWith('journey/') ? (
        <JourneyBackLink />
      ) : (
        <nav aria-label={t('backToBlog')} className="mb-6 pt-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-paper-muted transition-colors hover:text-paper-accent"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            {t('backToBlog')}
          </Link>
        </nav>
      )}

      <article className="paper-reading post-article">
        <header className="border-b border-paper-line pb-7 sm:pb-8">
          {tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2" aria-label={t('tags')}>
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          )}
          <h1 className="post-title">{title}</h1>
          {summary && <p className="mt-4 text-sm leading-7 text-paper-muted sm:text-base">{summary}</p>}
          <dl className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs leading-6 text-paper-muted sm:text-sm">
            {authorDetails.length > 0 && (
              <div>
                <dt className="sr-only">{t('authors')}</dt>
                <dd className="flex flex-wrap items-center gap-3">
                  {authorDetails.map((author) => (
                    <span key={author.name} className="inline-flex items-center gap-2">
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={24}
                          height={24}
                          alt={t('avatarAlt', { name: author.name })}
                          className="h-6 w-6 rounded-full ring-1 ring-paper-line"
                        />
                      )}
                      {author.twitter ? (
                        <Link href={author.twitter} className="hover:text-paper-accent">
                          {author.name}
                        </Link>
                      ) : (
                        author.name
                      )}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            <div>
              <dt className="sr-only">{t('publishedOn')}</dt>
              <dd className="flex items-center gap-2">
                <CalendarDays size={14} aria-hidden="true" />
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'UTC',
                  })}
                </time>
              </dd>
            </div>
            <div>
              <dt className="sr-only">{t('readingDuration')}</dt>
              <dd className="flex items-center gap-2">
                <Clock3 size={14} aria-hidden="true" />
                {t('readingTime', { minutes: Math.ceil(readingTime.minutes) })}
              </dd>
            </div>
          </dl>
        </header>

        <div className="post-prose prose max-w-none py-8 sm:py-10">{children}</div>

        <footer className="border-t border-paper-line">
          {(prev?.path || next?.path) && (
            <nav className="grid gap-3 py-6 sm:grid-cols-2" aria-label={t('articleNavigation')}>
              {prev?.path && (
                <Link
                  href={`/${prev.path}`}
                  aria-label={t('previousPost', { title: prev.title })}
                  className="post-adjacent group"
                >
                  <span className="inline-flex items-center gap-2 text-xs text-paper-muted">
                    <ArrowLeft size={14} aria-hidden="true" />
                    {t('previousArticle')}
                  </span>
                  <span className="text-sm font-medium leading-6 group-hover:text-paper-accent">{prev.title}</span>
                </Link>
              )}
              {next?.path && (
                <Link
                  href={`/${next.path}`}
                  aria-label={t('nextPost', { title: next.title })}
                  className="post-adjacent group sm:col-start-2 sm:items-end sm:text-right"
                >
                  <span className="inline-flex items-center gap-2 text-xs text-paper-muted">
                    {t('nextArticle')}
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium leading-6 group-hover:text-paper-accent">{next.title}</span>
                </Link>
              )}
            </nav>
          )}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper-line py-5 text-xs text-paper-muted">
            <Link href="/blog" className="inline-flex items-center gap-2 hover:text-paper-accent">
              <ArrowLeft size={14} aria-hidden="true" />
              {t('backToBlog')}
            </Link>
            <Link
              href={`${siteMetadata.siteRepo}/blob/main/data/${filePath}`}
              className="inline-flex items-center gap-2 hover:text-paper-accent"
            >
              <Code2 size={14} aria-hidden="true" />
              {t('viewOnGithub')}
            </Link>
          </div>
          {siteMetadata.comments?.provider && (
            <div id="comment" className="scroll-mt-28 border-t border-paper-line pt-6">
              <Comments slug={slug} />
            </div>
          )}
        </footer>
      </article>
    </SectionContainer>
  );
}
