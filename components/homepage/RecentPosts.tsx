import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/utils/cn';
import styles from './PaperSurface.module.css';

export default function RecentPosts({ posts }: { posts: CoreContent<Blog>[] }) {
  const locale = useLocale();
  const t = useTranslations('Homepage');
  const dateFormatter = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Shanghai',
  });

  return (
    <section className={styles.recentPosts} aria-labelledby="recent-posts-title">
      <header className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow} lang="en">
            Recent Writing
          </p>
          <h2 id="recent-posts-title" className={styles.title}>
            {t('recentPosts')}
          </h2>
        </div>
        {posts.length > 0 && (
          <p className={styles.sectionCount} lang="en" aria-hidden="true">
            <span>Loose leaves</span>
            <span>01 — {String(posts.length).padStart(2, '0')}</span>
          </p>
        )}
      </header>

      {!posts.length ? (
        <p className={styles.emptyState}>{t('noPostsFound')}</p>
      ) : (
        <ol className={styles.manuscripts} role="list">
          {posts.map(({ slug, title, date, tags, summary }, index) => (
            <li
              key={slug}
              className={cn(styles.manuscript, {
                [styles.leadSheet]: index === 0,
                [styles.indexNote]: index === 2,
                [styles.excerptNote]: index === 3,
              })}
            >
              {(index < 2 || index === 4) && <span className={styles.sheetPaper} aria-hidden="true" />}
              <article>
                <Link href={`/blog/${slug}`} className={styles.manuscriptLink}>
                  <div className={styles.sheetTopline}>
                    <span className={styles.sheetNumber} aria-hidden="true">
                      [{String(index + 1).padStart(2, '0')}]
                    </span>
                    {index === 0 && <span className={styles.latestMark}>{t('latest')}</span>}
                  </div>
                  <h3 className={styles.manuscriptTitle}>{title}</h3>
                  {summary && (index < 2 || index === 3) && <p className={styles.sheetSummary}>{summary}</p>}
                  <div className={styles.sheetMeta}>
                    <time dateTime={date}>{dateFormatter.format(new Date(date))}</time>
                    <span>{tags.length ? tags.slice(0, 2).join(' · ') : t('articleLabel')}</span>
                  </div>
                  {index === 0 && (
                    <span className={styles.sheetReadMore}>
                      {t('readMore')} <span aria-hidden="true">↗</span>
                    </span>
                  )}
                </Link>
              </article>
            </li>
          ))}
        </ol>
      )}

      <div className={styles.collectionFooter}>
        <span className={styles.collectionSignoff} lang="en" aria-hidden="true">
          Notes, gently gathered.
        </span>
        <Link href="/blog" className={styles.archiveLink}>
          <span>{t('discoverAllPosts')}</span>
          <span aria-hidden="true" className={styles.archiveArrow}>
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
