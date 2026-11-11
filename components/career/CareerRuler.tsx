import type { CSSProperties } from 'react';
import { ArrowDownRight, BriefcaseBusiness, Code2, GraduationCap } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { CareerEntry, CareerLocale } from '@/data/careerData';
import { careerRuler, formatMonth } from '@/utils/career';
import styles from './CareerPage.module.css';

interface Props {
  entries: CareerEntry[];
  now: Date;
  locale: CareerLocale;
}

export default async function CareerRuler({ entries, now, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'Career' });
  const { years, bars, nowLeft } = careerRuler(entries, now);
  const lanes = [
    { kind: 'education', Icon: GraduationCap, className: styles.learningLaneLabel },
    { kind: 'work', Icon: BriefcaseBusiness, className: styles.workLaneLabel },
    { kind: 'project', Icon: Code2, className: styles.projectLaneLabel },
  ] as const;

  return (
    <figure className={styles.ruler} data-career-reveal>
      <figcaption className={styles.rulerCaption}>
        <div className={styles.rulerHeading}>
          <span className={styles.rulerEyebrow}>THE JOURNEY</span>
          <span className={styles.rulerTitle}>{t('overview')}</span>
        </div>
        <span className={styles.rulerRange}>
          {years[0]}
          <span aria-hidden="true">—</span>
          {years[years.length - 1]}
        </span>
      </figcaption>
      <div
        className={styles.rulerScroll}
        data-career-ruler-scroll
        tabIndex={0}
        role="region"
        aria-label={t('overviewScrollLabel')}
      >
        <div className={styles.rulerCanvas}>
          <div className={styles.rulerLaneLabels} aria-hidden="true">
            {lanes.map(({ kind, Icon, className }) => (
              <span key={kind} className={`${styles.rulerLaneLabel} ${className}`}>
                <Icon size={15} strokeWidth={1.5} />
                <span>{t(`lane.${kind}`)}</span>
              </span>
            ))}
          </div>
          <div className={styles.rulerPlot}>
            <div className={styles.rulerTracks} style={{ '--tracks': lanes.length } as CSSProperties}>
              {years.map((year, index) => (
                <span
                  className={styles.yearGrid}
                  key={year}
                  style={{ left: `${(index / years.length) * 100}%` }}
                  aria-hidden="true"
                />
              ))}
              <span className={styles.nowMarker} style={{ left: `${nowLeft}%` }} aria-hidden="true">
                <span>{t('now')}</span>
              </span>
              {bars.map(({ entry, left, width }) => {
                const range = `${formatMonth(entry.start, locale)} – ${entry.end ? formatMonth(entry.end, locale) : t('present')}`;
                const track = lanes.findIndex((lane) => lane.kind === entry.kind);
                return (
                  <a
                    key={entry.id}
                    data-career-bar
                    className={`${styles.rulerBar} ${lanes[track].className} ${width < 12 ? styles.shortBar : ''} ${!entry.end ? styles.ongoingBar : ''} ${entry.kind === 'project' ? styles.lastLaneBar : ''}`}
                    href={`#${entry.id}`}
                    style={{ left: `${left}%`, width: `${width}%`, top: `calc(${track} * var(--lane-height))` }}
                    title={`${entry.organization[locale]} · ${range}`}
                    aria-label={`${entry.organization[locale]} · ${range}`}
                  >
                    <span className={styles.barFace}>
                      <span className={styles.barLabel}>{(entry.shortName || entry.organization)[locale]}</span>
                    </span>
                    <span className={styles.barTooltip} aria-hidden="true">
                      <strong>{entry.organization[locale]}</strong>
                      <span>{range}</span>
                    </span>
                  </a>
                );
              })}
            </div>
            <div className={styles.rulerYears} aria-hidden="true">
              {years.map((year, index) => (
                <span key={year} style={{ left: `${(index / years.length) * 100}%` }}>
                  {year}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rulerFooter}>
        <span className={styles.rulerHint}>
          <ArrowDownRight size={13} strokeWidth={1.5} aria-hidden="true" />
          {t('overviewHint')}
        </span>
        <span className={styles.rulerStatus}>
          <i aria-hidden="true" />
          {t('ongoing')}
        </span>
      </div>
    </figure>
  );
}
