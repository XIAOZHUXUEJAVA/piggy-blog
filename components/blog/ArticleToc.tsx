'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ListTree } from 'lucide-react';
import styles from './ArticleToc.module.css';

export interface ArticleHeading {
  value: string;
  url: string;
  depth: number;
}

interface Props {
  headings: ArticleHeading[];
  variant?: 'sidebar' | 'mobile';
}

export default function ArticleToc({ headings, variant = 'sidebar' }: Props) {
  const t = useTranslations('Post');
  const [activeUrl, setActiveUrl] = useState('#article-start');
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const targets = headings.flatMap((heading) => {
      const element = document.getElementById(decodeURIComponent(heading.url.slice(1)));
      return element ? [{ url: heading.url, element }] : [];
    });
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = '#article-start';
      for (const target of targets) {
        if (target.element.getBoundingClientRect().top > 145) break;
        current = target.url;
      }
      // Short final sections cannot always reach the reading line before the page ends.
      if (
        targets.length &&
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      ) {
        current = targets[targets.length - 1].url;
      }
      setActiveUrl(current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    const observer = new ResizeObserver(schedule);
    const article = document.querySelector('[data-post-content]');
    if (article) observer.observe(article);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
      observer.disconnect();
    };
  }, [headings]);

  useEffect(() => {
    if (variant !== 'sidebar') return;
    const list = listRef.current;
    const active = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !active || list.clientHeight === 0) return;
    const bounds = list.getBoundingClientRect();
    const item = active.getBoundingClientRect();
    if (item.top < bounds.top) list.scrollTop -= bounds.top - item.top;
    else if (item.bottom > bounds.bottom) list.scrollTop += item.bottom - bounds.bottom;
  }, [activeUrl, variant]);

  const minimumDepth = Math.min(...headings.map((heading) => heading.depth));
  const entries = [{ value: t('introduction'), url: '#article-start', depth: minimumDepth }, ...headings];
  const list = (
    <nav aria-label={t('tableOfContents')}>
      <ol ref={listRef} className={styles.list}>
        {entries.map((heading) => (
          <li key={heading.url}>
            <a
              href={heading.url}
              className={styles.link}
              style={{ paddingInlineStart: 14 + (heading.depth - minimumDepth) * 14 }}
              aria-current={activeUrl === heading.url ? 'location' : undefined}
              onClick={(event) => {
                event.currentTarget.closest('details')?.removeAttribute('open');
              }}
            >
              {heading.value}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );

  if (variant === 'mobile') {
    return (
      <details className={styles.mobile}>
        <summary className={styles.summary}>
          <span>
            <ListTree size={16} aria-hidden="true" />
            {t('tableOfContents')}
          </span>
          <ChevronDown size={15} className={styles.chevron} aria-hidden="true" />
        </summary>
        {list}
      </details>
    );
  }

  return (
    <div className={styles.desktop}>
      <p className={styles.eyebrow}>ON THIS PAGE</p>
      {list}
    </div>
  );
}
