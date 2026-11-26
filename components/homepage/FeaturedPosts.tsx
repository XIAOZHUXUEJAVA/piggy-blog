import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import styles from './PaperSurface.module.css';

const FeaturedPosts = ({ posts }: { posts: CoreContent<Blog>[] }) => {
  const locale = useLocale();
  const t = useTranslations('Homepage');
  const dateFormatter = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Shanghai',
  });

  return (
    <section className={styles.selectedCollection} aria-labelledby="featured-posts-title">
      <header className={styles.selectedHeading}>
        <div>
          <p className={styles.eyebrow} lang="en">
            Selected Writing
          </p>
          <h2 id="featured-posts-title" className={styles.title}>
            {t('featuredPosts')}
          </h2>
        </div>
        <p className={styles.collectionNote}>{t('collectionNote')}</p>
      </header>

      <ol className={styles.featuredList} role="list">
        {posts.map(({ slug, title, date }, index) => (
          <li key={slug} className={styles.featuredItem}>
            <span className={styles.sheetPaper} aria-hidden="true" />
            <Link href={`/blog/${slug}`} className={styles.featuredLink}>
              <div className={styles.featuredTopline} aria-hidden="true">
                <span className={styles.featuredNumber}>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className={styles.featuredTitle}>{title}</h3>
              <time dateTime={date} className={styles.featuredDate}>
                {dateFormatter.format(new Date(date))}
              </time>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default FeaturedPosts;
