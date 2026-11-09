'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
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
