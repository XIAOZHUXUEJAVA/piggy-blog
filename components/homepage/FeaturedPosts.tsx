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
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'Asia/Shanghai',
  });

  return (
    <section aria-labelledby="featured-posts-title">
      <header className={styles.sectionHeading}>
        <p className={styles.eyebrow} lang="en">
          Selected Writing
        </p>
        <h2 id="featured-posts-title" className={styles.title}>
          {t('featuredPosts')}
        </h2>
      </header>

      <ul className={styles.featuredList} role="list">
        {posts.map(({ slug, title, date }) => (
          <li key={slug}>
            <article>
              <Link href={`/blog/${slug}`} className={styles.featuredLink}>
                <h3 className={styles.featuredTitle}>{title}</h3>
                <time dateTime={date} className={styles.featuredDate}>
                  {dateFormatter.format(new Date(date))}
                </time>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeaturedPosts;
