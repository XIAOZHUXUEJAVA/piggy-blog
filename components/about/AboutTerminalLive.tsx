'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Clock3 } from 'lucide-react';
import { lifeClock } from '@/utils/lifeClock';
import styles from './AboutPage.module.css';

const clockFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Shanghai',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const interval = window.setInterval(update, 15_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className={styles.localTime}>
      <span className={styles.liveDot} aria-hidden="true" />
      <time dateTime={now?.toISOString()}>{now ? clockFormat.format(now) : '--:--'}</time>
      <span className={styles.timezone}>UTC+8</span>
    </span>
  );
}

export function LifeClock() {
  const t = useTranslations('AboutStudio.scene');
  const root = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const scene = root.current?.closest('[data-about-scene]');
    if (!scene) return;

    let interval: number | undefined;
    const update = () => setNow(new Date());
    const sync = () => {
      if (!scene.hasAttribute('data-scene-running')) {
        window.clearInterval(interval);
        interval = undefined;
      } else if (interval === undefined) {
        update();
        interval = window.setInterval(update, 1000);
      }
    };
    const observer = new MutationObserver(sync);
    observer.observe(scene, { attributes: true, attributeFilter: ['data-scene-running'] });
    update();
    sync();
    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, []);

  const clock = now ? lifeClock(now) : null;
  const time = clock?.time ?? '--:--:--';

  return (
    <div ref={root} className={styles.focusWidget}>
      <div className={styles.clockHeading}>
        <span>
          <Clock3 size={12} /> {t('focus')}
        </span>
        <span className={styles.clockTimezone}>UTC+8</span>
      </div>
      <strong className={styles.liveClock}>
        <time dateTime={now?.toISOString()}>
          {time.slice(0, 5)}
          <span className={styles.clockSeconds}>:{time.slice(6)}</span>
        </time>
      </strong>
      <div className={styles.clockFooter}>
        <small>
          <i /> {clock ? t(clock.isWeekend ? 'resting' : 'working') : '…'}
        </small>
        <span className={styles.clockTicks} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}

export function TerminalTheme() {
  const { resolvedTheme } = useTheme();
  const t = useTranslations('AboutProfile');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <span>
      Piggy{' '}
      <span className={styles.themeVariant}>/ {mounted ? t(resolvedTheme === 'dark' ? 'dark' : 'light') : '…'}</span>
    </span>
  );
}
