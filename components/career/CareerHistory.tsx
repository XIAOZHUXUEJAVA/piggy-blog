import { GitMerge } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { CareerEntry, CareerLocale } from '@/data/careerData';
import {
  careerGraph,
  careerHash,
  elapsedMonths,
  formatDuration,
  formatMonth,
  monthIndex,
  stackChanges,
} from '@/utils/career';
import styles from './CareerPage.module.css';
import CareerTechIcon from './CareerTechIcon';

interface Props {
  entries: CareerEntry[];
  now: Date;
  locale: CareerLocale;
}

export default async function CareerHistory({ entries, now, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'Career' });
  const rows = careerGraph(entries);
  const diffs = stackChanges(entries);
  const latest = [...entries]
    .filter((entry) => entry.kind !== 'education')
    .sort((a, b) => monthIndex(b.start) - monthIndex(a.start))[0];

  return (
    <section aria-labelledby="career-history-title" className={styles.history}>
      <div className={styles.historyHeader} data-career-reveal>
        <div>
          <p className={styles.command}>
            <span>$</span> git log --graph
          </p>
          <h1 id="career-history-title">{t('history')}</h1>
        </div>
        <span className={styles.historyHint}>{t('historyHint')}</span>
      </div>

      <ol className={styles.graph}>
        {rows.map((row) => {
          const { entry, type, lanes } = row;
          const merge = type === 'merge';
          const range = `${formatMonth(entry.start, locale)} – ${entry.end ? formatMonth(entry.end, locale) : t('present')}`;
          return (
            <li
              className={`${styles.graphRow} ${styles[entry.tone]} ${merge ? styles.mergeRow : ''}`}
              key={`${entry.id}-${type}`}
              id={merge ? `${entry.id}-completed` : entry.id}
              data-career-row
              data-career-entry={merge ? undefined : entry.id}
              tabIndex={-1}
            >
              <div className={styles.graphGutter} aria-hidden="true">
                {lanes.map((lane, index) => (
                  <div className={index === 0 ? styles.mainLane : styles.learningLane} key={index}>
                    {lane.up && <span className={styles.lineUp} />}
                    {lane.down && <span className={styles.lineDown} />}
                  </div>
                ))}
                {merge ? (
                  <svg className={styles.mergeCurve} viewBox="0 0 44 36" fill="none">
                    <path d="M11 12 C11 28 33 20 33 36" />
                  </svg>
                ) : null}
                <span
                  className={`${styles.graphDot} ${row.lane === 1 ? styles.learningDot : ''} ${merge ? styles.mergeDot : ''}`}
                />
              </div>

              <div className={styles.graphBody}>
                <div className={styles.commitMeta} data-career-reveal>
                  <span className={styles.commitHash} aria-hidden="true">
                    {careerHash(`${entry.id}-${type}`)}
                  </span>
                  {!merge && entry.id === latest?.id && <span className={styles.branchRef}>(HEAD → main)</span>}
                  {!merge && entry.branch && <span className={styles.branchRef}>({entry.branch})</span>}
                  {merge && (
                    <span className={styles.mergeLabel}>
                      <GitMerge size={13} aria-hidden="true" /> merge
                    </span>
                  )}
                  <span className={styles.commitMessage}>
                    {merge ? t('mergeMessage', { branch: entry.branch || 'learning' }) : entry.message[locale]}
                  </span>
                  <time dateTime={`${merge ? entry.end : entry.start}-01`} className={styles.commitDate}>
                    {formatMonth(merge ? entry.end! : entry.start, locale)}
                  </time>
                </div>

                {merge ? (
                  <p className={styles.mergeDescription} data-career-reveal>
                    {t('completed', { name: entry.organization[locale] })}
                  </p>
                ) : (
                  <article
                    className={styles.chapter}
                    aria-labelledby={`${entry.id}-title`}
                    data-career-reveal
                    data-career-delay="100"
                  >
                    <header className={styles.chapterHeader}>
                      <div className={styles.roleHeading}>
                        <span className={styles.kind}>{t(`kind.${entry.kind}`)}</span>
                        <h2 id={`${entry.id}-title`}>{entry.organization[locale]}</h2>
                        <p>{entry.role[locale]}</p>
                      </div>
                      <div className={styles.tenure}>
                        <span className={styles.dateRange}>{range}</span>
                        <span aria-hidden="true">·</span>
                        <span>{formatDuration(elapsedMonths(entry, now), locale)}</span>
                      </div>
                    </header>

                    <ul className={styles.highlights}>
                      {entry.highlights.map((highlight) => (
                        <li key={highlight.title.en}>
                          <h3>{highlight.title[locale]}</h3>
                          <p>{highlight.description[locale]}</p>
                        </li>
                      ))}
                    </ul>

                    <div className={styles.stack}>
                      <div className={styles.stackHeading}>
                        <p>stack diff</p>
                        <span>{t('stackHint')}</span>
                      </div>
                      <ul className={styles.tools}>
                        {(diffs.get(entry.id) || []).map((tool) => (
                          <li
                            className={tool.added ? styles.toolAdded : styles.toolKept}
                            key={tool.name}
                            title={t(tool.added ? 'newTool' : 'keptTool')}
                          >
                            <span aria-hidden="true">{tool.added ? '+' : '·'}</span>
                            <CareerTechIcon name={tool.name} className={styles.techIcon} />
                            {tool.name}
                            <span className="sr-only"> ({t(tool.added ? 'newTool' : 'keptTool')})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <p className={styles.logEnd}>
        <span aria-hidden="true">∎</span> {t('logEnd')}
      </p>
    </section>
  );
}
