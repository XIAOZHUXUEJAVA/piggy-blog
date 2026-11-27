'use client';

import { Fragment } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import { Link } from '@/i18n/navigation';
import { useArchiveFilter } from './ArchiveFilterContext';
import RandomArchivePost from './RandomArchivePost';
import styles from './WritingArchive.module.css';

const months = Array.from({ length: 12 }, (_, index) => index);

export default function WritingArchive({ posts }: { posts: CoreContent<Blog>[] }) {
  const t = useTranslations('WritingArchive');
  const format = useFormatter();
  const { activeMonth, toggleMonth } = useArchiveFilter();
  if (!posts.length) return null;

  // The archive supplies all published posts in descending publication order.
  const firstYear = new Date(posts[posts.length - 1].date).getUTCFullYear();
  const lastYear = new Date(posts[0].date).getUTCFullYear();
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => ({
    year: lastYear - i,
    counts: months.map(() => 0),
    total: 0,
  }));
  let totalWords = 0;
  let longest = posts[0];
  let peak = 0;

  for (const post of posts) {
    const date = new Date(post.date);
    const row = years[lastYear - date.getUTCFullYear()];
    const count = ++row.counts[date.getUTCMonth()];
    row.total++;
    peak = Math.max(peak, count);
    totalWords += post.readingTime.words;
    if (post.readingTime.words > longest.readingTime.words) longest = post;
  }
  const peakMonths = years.flatMap(({ year, counts }) =>
    counts.flatMap((count, month) => {
      if (count !== peak) return [];

      const padded = String(month + 1).padStart(2, '0');
      return [{ key: `${year}-${padded}`, year, month, display: `${year}.${padded}` }];
    })
  );

  return (
    <aside className={styles.panel} aria-labelledby="writing-archive-title">
      <header className={styles.heading}>
        <h2 id="writing-archive-title">{t('title')}</h2>
        <span>{t('since', { year: String(firstYear) })}</span>
      </header>
      <table className={styles.heatmap}>
        <caption>
          <span className="sr-only">{t('activity')}</span>
          <code className={styles.command} aria-hidden="true">
            <span>$ </span>
            {`git log --since=${firstYear} | cal --head`}
          </code>
        </caption>
        <thead>
          <tr>
            <th scope="col">
              <span className="sr-only">{t('year')}</span>
            </th>
            {months.map((month) => (
              <th key={month} scope="col">
                {month + 1}
              </th>
            ))}
            <th scope="col">{t('sum')}</th>
          </tr>
        </thead>
        <tbody>
          {years.map(({ year, counts, total }) => (
            <tr key={year}>
              <th scope="row">{year}</th>
              {counts.map((count, month) => {
                const key = `${year}-${String(month + 1).padStart(2, '0')}`;
                const monthLabel = format.dateTime(new Date(Date.UTC(year, month, 1)), {
                  year: 'numeric',
                  month: 'long',
                  timeZone: 'UTC',
                });
                const active = activeMonth === key;

                return (
                  <td key={month} title={t('monthCount', { month: monthLabel, count })}>
                    {count ? (
                      <button
                        type="button"
                        className={styles.cellButton}
                        aria-pressed={active}
                        aria-label={t('filterByMonth', { month: monthLabel, count })}
                        onClick={() => toggleMonth(key)}
                      >
                        <span className={styles.cell} data-level={Math.min(count, 3)} data-active={active}>
                          {count}
                        </span>
                      </button>
                    ) : (
                      <span className={styles.cell} data-level={0}>
                        <span className="sr-only">0</span>
                      </span>
                    )}
                  </td>
                );
              })}
              <td className={styles.yearTotal}>{total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <code className={styles.command}>
        <span>$ </span>wc -w ~/blog/*.md
      </code>
      <dl className={styles.totals}>
        <div>
          <dt>{t('articles')}</dt>
          <dd>{format.number(posts.length)}</dd>
        </div>
        <div>
          <dt>{t('words')}</dt>
          <dd>≈{format.number(totalWords)}</dd>
        </div>
        <div>
          <dt>{t('average')}</dt>
          <dd>≈{format.number(Math.round(totalWords / posts.length))}</dd>
        </div>
      </dl>
      <dl className={styles.records}>
        <div>
          <dt>{t('peak')}</dt>
          <dd>
            {peakMonths.map(({ key, year, month, display }, index) => {
              const active = activeMonth === key;
              const monthLabel = format.dateTime(new Date(Date.UTC(year, month, 1)), {
                year: 'numeric',
                month: 'long',
                timeZone: 'UTC',
              });

              return (
                <Fragment key={key}>
                  {index > 0 && ' · '}
                  <button
                    type="button"
                    className={styles.monthLink}
                    aria-pressed={active}
                    aria-label={t('filterByMonth', { month: monthLabel, count: peak })}
                    onClick={() => toggleMonth(key)}
                  >
                    {display}
                  </button>
                </Fragment>
              );
            })}
            <small>{t('perMonth', { count: peak })}</small>
          </dd>
        </div>
        <div>
          <dt>{t('longest')}</dt>
          <dd>
            <Link href={`/blog/${longest.slug}`}>{longest.title}</Link>
            <small>{t('approxWords', { count: longest.readingTime.words })}</small>
          </dd>
        </div>
      </dl>
      <RandomArchivePost posts={posts.map(({ slug, title, date }) => ({ slug, title, date }))} />
    </aside>
  );
}
