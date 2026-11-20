'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowUp } from 'lucide-react';
import styles from './BackToTop.module.css';

export default function BackToTop() {
  const t = useTranslations('Common');
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let shown = false;
    let threshold = Math.max(160, window.innerHeight / 2);
    setVisible(false);

    const update = () => {
      const next = window.scrollY > threshold;
      // Scrolling only updates React when the button crosses its visibility threshold.
      if (next !== shown) {
        shown = next;
        setVisible(next);
      }
    };
    const resize = () => {
      threshold = Math.max(160, window.innerHeight / 2);
      update();
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('pageshow', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pageshow', update);
    };
  }, [pathname]);

  const scrollToTop = () => {
    document.getElementById('main-content')?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={styles.button}
      data-visible={visible}
      onClick={scrollToTop}
      aria-label={t('backToTop')}
      aria-hidden={!visible}
      disabled={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={20} strokeWidth={1.6} aria-hidden="true" />
      <span className={styles.label} aria-hidden="true">
        {t('backToTop')}
      </span>
    </button>
  );
}
