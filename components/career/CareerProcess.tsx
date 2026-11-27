import type { CSSProperties } from 'react';
import { BriefcaseBusiness, Check, Code2, GitBranch, GitMerge, GraduationCap, Search } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { CareerEntry, CareerLocale } from '@/data/careerData';
import { careerGraph, formatMonth } from '@/utils/career';
import styles from './CareerProcess.module.css';

const icons = { work: BriefcaseBusiness, education: GraduationCap, project: Code2, merge: GitMerge };
const activity = [22, 38, 16, 52, 30, 65, 42, 26, 58, 35, 72, 48, 32, 60, 44, 80, 56, 40, 68, 48, 86, 62, 42, 72];

export default async function CareerProcess({ entries, locale }: { entries: CareerEntry[]; locale: CareerLocale }) {
  const t = await getTranslations({ locale, namespace: 'CareerProcess' });
  const history = await getTranslations({ locale, namespace: 'Career' });
  const rows = careerGraph(entries);

  return (
    <nav className={styles.traceWindow} aria-label={t('scene.trace')}>
      <div className={styles.toolbar}>
        <span>
          <GitBranch size={13} aria-hidden="true" /> main
        </span>
        <label className={styles.search} data-career-search-control hidden>
          <Search size={13} aria-hidden="true" />
          <input type="search" data-career-search aria-label={t('search')} placeholder={t('search')} />
        </label>
      </div>
      <div className={styles.activityGraph} aria-hidden="true">
        {activity.map((height, index) => (
          <i key={index} style={{ '--bar': `${height}%` } as CSSProperties} />
        ))}
      </div>
      <div className={styles.viewport}>
        {rows.map(({ id, entry, type }, index) => {
          const merge = type === 'merge';
          const Icon = icons[merge ? 'merge' : entry.kind];
          const label = merge ? t('mergeEntry', { name: entry.organization[locale] }) : entry.organization[locale];
          const message = merge
            ? history('mergeMessage', { branch: entry.branch || 'learning' })
            : entry.message[locale];
          const date = formatMonth(merge ? entry.end! : entry.start, locale);
          return (
            <a
              key={id}
              id={`trace-${id}`}
              href={`#${id}`}
              data-career-trace
              className={styles.step}
              title={`${label} · ${date} · ${message}`}
            >
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.icon}>
                <Icon size={14} aria-hidden="true" />
              </span>
              <span className={styles.summary}>
                <strong>{label}</strong>
                <small>
                  {date} · {message}
                </small>
              </span>
              <Check size={14} className={styles.check} aria-hidden="true" />
            </a>
          );
        })}
        <p className={styles.empty} data-career-empty role="status" hidden>
          {t('empty')}
        </p>
      </div>
      <div className={styles.footer}>
        <span>
          <i aria-hidden="true" />
          {t('scene.iterating')}
        </span>
        <span>{t('entryCount', { count: rows.length })}</span>
      </div>
    </nav>
  );
}
