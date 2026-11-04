import { allBlogs } from 'contentlayer/generated';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import journeyData from '@/data/journeyData';
import styles from './JourneyTimeline.module.css';

export default async function JourneyTimeline() {
  const t = await getTranslations('AboutJourney');
  const locale = await getLocale();
  const dateFormat = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const entries = [...journeyData].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section id="journey" aria-labelledby="journey-title" className={styles.journey}>
      <header className={styles.header}>
        <h2 id="journey-title" className={styles.heading}>
          {t('title')}
        </h2>
        <p className={styles.description}>{t('description')}</p>
      </header>

      <ol className={styles.timeline}>
        {entries.map((entry) => {
          const post = allBlogs.find((blog) => blog.slug === entry.slug);
          if (!post || post.draft) return null;

          return (
            <li key={entry.slug} className={styles.item}>
              <Link
                href={`/blog/${entry.slug}`}
                className={`${styles.entry} ${styles[entry.variant]}`}
                aria-labelledby={`journey-${entry.slug.split('/').pop()}`}
              >
                <span className={styles.marker} aria-hidden="true" />
                <div className={styles.entryHeader}>
                  <h3 id={`journey-${entry.slug.split('/').pop()}`} className={styles.title}>
                    {post.title}
                  </h3>
                  <time dateTime={entry.date} className={styles.date}>
                    {dateFormat.format(new Date(`${entry.date}T00:00:00Z`))}
                  </time>
                </div>
                <p className={styles.summary}>{post.summary}</p>
              </Link>
            </li>
          );
        })}
      </ol>

      <p className={styles.note}>{t('sampleNote')}</p>
    </section>
  );
}
