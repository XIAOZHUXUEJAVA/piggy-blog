import { Pause, Play } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { CareerEntry, CareerLocale } from '@/data/careerData';
import { careerGraph, careerHash, formatMonth } from '@/utils/career';
import SceneMotion from '@/components/ui/SceneMotion';
import WorkflowScene from './WorkflowScene';
import styles from './CareerProcess.module.css';

export default async function CareerProcess({ entries, locale }: { entries: CareerEntry[]; locale: CareerLocale }) {
  const t = await getTranslations({ locale, namespace: 'CareerProcess' });
  const history = await getTranslations({ locale, namespace: 'Career' });
  const commits = careerGraph(entries).map(({ entry, type }) => {
    const date = type === 'merge' ? entry.end! : entry.start;
    return {
      id: `${entry.id}-${type}`,
      kind: type === 'merge' ? ('merge' as const) : entry.kind,
      label: type === 'merge' ? t('mergeEntry', { name: entry.organization[locale] }) : entry.organization[locale],
      message:
        type === 'merge' ? history('mergeMessage', { branch: entry.branch || 'learning' }) : entry.message[locale],
      date: formatMonth(date, locale),
      branch: type === 'merge' ? 'main' : entry.branch || 'main',
      hash: careerHash(`${entry.id}-${type}`),
      stack: entry.stack,
    };
  });

  return (
    <SceneMotion className={styles.process}>
      <section className={styles.processCard} aria-labelledby="career-process-title" data-about-scene data-about-reveal>
        <span className={styles.cardPaper} aria-hidden="true" />
        <header className={styles.processHeading}>
          <p className={styles.processEyebrow}>THE PROCESS</p>
          <h2 id="career-process-title">{t('title')}</h2>
          <p>{t('description')}</p>
        </header>
        <p className="sr-only">{t('summary', { entries: commits.map((commit) => commit.label).join(' → ') })}</p>
        <button
          className={styles.sceneControl}
          type="button"
          data-scene-toggle
          aria-label={t('pauseDemo', { name: t('title') })}
          aria-pressed="false"
        >
          <Pause size={12} className={styles.pauseIcon} aria-hidden="true" />
          <Play size={12} className={styles.playIcon} aria-hidden="true" />
        </button>
        <WorkflowScene
          commits={commits}
          copy={t.raw('scene') as Record<string, string>}
          footer={t('entryCount', { count: commits.length })}
        />
      </section>
    </SceneMotion>
  );
}
