'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown, ListTree } from 'lucide-react';
import { useArticleReading, type ArticleHeading } from './ArticleReadingProvider';
import styles from './ArticleToc.module.css';

export type { ArticleHeading } from './ArticleReadingProvider';

interface Props {
  headings: ArticleHeading[];
  variant?: 'sidebar' | 'mobile';
}

function wavePoint(position: number, height: number) {
  const center = 12 + position * 376;
  const distance = height - center;
  const bulge = 14 * Math.sin(Math.PI * position) * Math.exp(-(distance * distance) / (2 * 26 * 26));
  return { horizontal: 12 + bulge, slope: (-distance * bulge) / (26 * 26) };
}

function wavePath(position: number) {
  let path = `M${wavePoint(position, 12).horizontal} 12`;
  for (let index = 0; index < 24; index++) {
    const from = 12 + (index * 376) / 24;
    const to = 12 + ((index + 1) * 376) / 24;
    const first = wavePoint(position, from);
    const last = wavePoint(position, to);
    const step = (to - from) / 3;
    path += ` C${first.horizontal + first.slope * step} ${from + step},${last.horizontal - last.slope * step} ${to - step},${last.horizontal} ${to}`;
  }
  return path;
}

function ChapterNode({ position, stop, active }: { position: MotionValue<number>; stop: number; active: boolean }) {
  const height = 12 + stop * 376;
  const horizontal = useTransform(position, (value) => wavePoint(value, height).horizontal);
  return (
    <motion.circle
      cx={horizontal}
      cy={height}
      r={active ? 2.5 : 1.75}
      className={active ? styles.activeNode : styles.node}
    />
  );
}

function ReadingTrail({ entries }: { entries: ArticleHeading[] }) {
  const { activeUrl, progress, position } = useArticleReading();
  const reducedMotion = useReducedMotion();
  const smoothPosition = useSpring(position, { stiffness: 180, damping: 32, mass: 0.5 });
  useEffect(() => {
    if (reducedMotion) smoothPosition.jump(position);
    else smoothPosition.set(position);
  }, [position, reducedMotion, smoothPosition]);
  const path = useTransform(smoothPosition, wavePath);
  const horizontal = useTransform(smoothPosition, (value) => wavePoint(value, 12 + value * 376).horizontal);
  const vertical = useTransform(smoothPosition, (value) => 12 + value * 376);
  const captionTop = useTransform(smoothPosition, (value) => `${6 + value * 88}%`);
  const dashOffset = useTransform(smoothPosition, (value) => -Math.max(0, value - 0.06));
  const active = entries.find((entry) => entry.url === activeUrl) ?? entries[0];

  return (
    <span className={styles.trail} aria-hidden="true">
      <svg viewBox="0 0 232 400" preserveAspectRatio="none" className={styles.trailSvg}>
        <motion.path d={path} className={styles.trailLine} />
        <motion.path
          d={path}
          className={styles.trailAccent}
          pathLength={1}
          strokeDasharray="0.12 1"
          strokeDashoffset={dashOffset}
        />
        {entries.map((entry, index) => (
          <ChapterNode
            key={entry.url}
            position={smoothPosition}
            stop={index / entries.length}
            active={entry.url === activeUrl}
          />
        ))}
        <motion.circle cx={horizontal} cy={vertical} r={3} className={styles.trailDot} />
      </svg>
      <motion.span className={styles.trailCaption} style={{ top: captionTop }}>
        <span className={styles.trailTitle}>{active.value}</span>
        <span className={styles.trailPercent}>{Math.round(progress * 100)}%</span>
      </motion.span>
    </span>
  );
}

export default function ArticleToc({ headings, variant = 'sidebar' }: Props) {
  const t = useTranslations('Post');
  const { activeUrl, progress, navigate } = useArticleReading();
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const expanded = progress === 0 || hovered || focused;
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });
  const minimumDepth = headings.length ? Math.min(...headings.map((heading) => heading.depth)) : 2;
  const entries = [{ value: t('introduction'), url: '#article-start', depth: minimumDepth }, ...headings];

  const measureIndicator = useCallback(() => {
    const list = listRef.current;
    const active = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !active) return;
    const bounds = active.getBoundingClientRect();
    const top = bounds.top - list.getBoundingClientRect().top;
    setIndicator((current) =>
      current.top === top && current.height === bounds.height ? current : { top, height: bounds.height }
    );
  }, []);

  useLayoutEffect(() => {
    if (variant !== 'sidebar') return;
    measureIndicator();
    const viewport = viewportRef.current;
    const active = listRef.current?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!expanded || !viewport || !active) return;
    const item = active.getBoundingClientRect();
    const bounds = viewport.getBoundingClientRect();
    if (item.top < bounds.top + 8 || item.bottom > bounds.bottom - 8) {
      viewport.scrollTo({
        top: viewport.scrollTop + item.top - bounds.top - (viewport.clientHeight - item.height) / 2,
        behavior: reducedMotion ? 'instant' : 'smooth',
      });
    }
  }, [activeUrl, expanded, measureIndicator, reducedMotion, variant]);

  useEffect(() => {
    if (variant !== 'sidebar' || !listRef.current) return;
    const observer = new ResizeObserver(measureIndicator);
    observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [measureIndicator, variant]);

  const links = entries.map((heading) => (
    <li key={heading.url}>
      <a
        href={heading.url}
        className={styles.link}
        style={{ paddingInlineStart: 16 + (heading.depth - minimumDepth) * 14 }}
        tabIndex={variant === 'sidebar' && !expanded ? -1 : undefined}
        aria-current={activeUrl === heading.url ? 'location' : undefined}
        onClick={(event) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          event.currentTarget.closest('details')?.removeAttribute('open');
          navigate(heading.url);
        }}
      >
        {heading.value}
      </a>
    </li>
  ));

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
        <nav aria-label={t('tableOfContents')}>
          <ol className={styles.list}>{links}</ol>
        </nav>
      </details>
    );
  }

  return (
    <div
      className={styles.desktop}
      data-expanded={expanded}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <p className={styles.eyebrow}>ON THIS PAGE</p>
      <div className={styles.stage}>
        <button
          className={styles.trailButton}
          type="button"
          aria-label={t('tableOfContents')}
          aria-expanded={expanded}
          tabIndex={expanded ? -1 : 0}
          onClick={() => listRef.current?.querySelector<HTMLAnchorElement>('a[aria-current]')?.focus()}
        >
          <ReadingTrail entries={entries} />
        </button>
        <nav className={styles.navigation} aria-label={t('tableOfContents')} aria-hidden={!expanded}>
          <div className={styles.listViewport} ref={viewportRef}>
            <div className={styles.listTrack}>
              <motion.span
                className={styles.indicator}
                initial={false}
                animate={{ y: indicator.top, height: indicator.height }}
                transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 34 }}
                aria-hidden="true"
              />
              <ol ref={listRef} className={styles.list}>
                {links}
              </ol>
            </div>
          </div>
        </nav>
      </div>
      <div
        className={styles.progress}
        aria-hidden={!expanded}
        aria-label={t('readingProgress', { percent: Math.round(progress * 100) })}
      >
        <svg className={styles.divider} viewBox="0 0 150 12" fill="none" aria-hidden="true">
          <path d="M2 7 C22 1 35 11 54 6 S80 3 97 7 S124 3 148 6" />
        </svg>
        <span className={styles.progressValue} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="6" className={styles.progressRing} />
            <circle
              cx="8"
              cy="8"
              r="6"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - progress}
              className={styles.progressFill}
            />
          </svg>
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}
