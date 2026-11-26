'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import {
  applyBackground,
  backgroundChangeEvent,
  backgroundStorageKey,
  isBackgroundEnabled,
} from '@/utils/paperBackground';
import styles from './BackgroundToggle.module.css';

export default function BackgroundToggle() {
  const t = useTranslations('Background');
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const sync = () => setEnabled(isBackgroundEnabled());
    const syncStorage = (event: StorageEvent) => {
      if (event.key === backgroundStorageKey || event.key === null) {
        applyBackground(event.newValue !== 'off', false);
      }
    };

    sync();
    window.addEventListener(backgroundChangeEvent, sync);
    window.addEventListener('storage', syncStorage);
    return () => {
      window.removeEventListener(backgroundChangeEvent, sync);
      window.removeEventListener('storage', syncStorage);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={t('title')}
      aria-pressed={enabled}
      title={t(enabled ? 'hide' : 'show')}
      onClick={() => applyBackground(!isBackgroundEnabled())}
      className={styles.button}
    >
      <svg className={styles.threads} viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          className={styles.thread}
          pathLength={1}
          d="M4 20C7 21 19 9 17 5C15 1 8 10 10 17C12 24 23 19 24 12"
          stroke="currentColor"
        />
        <path
          className={styles.fiber}
          pathLength={1}
          d="M3 10C8 5 21 23 24 20C27 17 20 10 17 12C14 14 18 24 22 25"
          stroke="#ba8d87"
        />
        <path className={styles.fiber} pathLength={1} d="M5 25C3 18 7 8 13 7M20 3C24 5 25 9 23 13" stroke="#b9a269" />
        <path className={styles.fiber} pathLength={1} d="M3 15L5 14M21 23L24 24" stroke="currentColor" opacity=".45" />
      </svg>
    </button>
  );
}
