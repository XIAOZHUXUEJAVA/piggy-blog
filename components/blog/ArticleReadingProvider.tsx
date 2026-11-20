'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

export interface ArticleHeading {
  value: string;
  url: string;
  depth: number;
}

interface ReadingState {
  activeUrl: string;
  progress: number;
  position: number;
}

interface ReadingContext extends ReadingState {
  navigate: (url: string) => void;
}

const ArticleReadingContext = createContext<ReadingContext | null>(null);
const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function ArticleReadingProvider({
  headings,
  children,
  className,
}: {
  headings: ArticleHeading[];
  children: ReactNode;
  className: string;
}) {
  const [reading, setReading] = useState<ReadingState>({ activeUrl: '#article-start', progress: 0, position: 0 });
  const navigation = useRef<{ url: string; top: number; expires: number } | null>(null);
  const refresh = useRef(() => {});

  useEffect(() => {
    const article = document.querySelector<HTMLElement>('[data-post-content]');
    if (!article) return;
    const targets = [
      { url: '#article-start', element: article },
      ...headings.flatMap((heading) => {
        const element = document.getElementById(decodeURIComponent(heading.url.slice(1)));
        return element ? [{ url: heading.url, element }] : [];
      }),
    ];
    let frame = 0;
    let readingOffset = 128;
    let start = 0;
    let end = 1;
    let offsets: number[] = [];

    const update = () => {
      frame = 0;
      const progress = clamp((window.scrollY - start) / (end - start));
      const readingLine = window.scrollY + readingOffset;
      let activeIndex = 0;
      offsets.forEach((offset, index) => {
        if (offset <= readingLine + 1) activeIndex = index;
      });
      if (progress >= 1) activeIndex = targets.length - 1;
      const sectionStart = offsets[activeIndex];
      const sectionEnd = offsets[activeIndex + 1] ?? end + readingOffset;
      const sectionProgress = clamp((readingLine - sectionStart) / Math.max(1, sectionEnd - sectionStart));
      const position = progress >= 1 ? 1 : (activeIndex + sectionProgress) / targets.length;
      const pending = navigation.current;
      if (pending && (Math.abs(window.scrollY - pending.top) < 2 || performance.now() > pending.expires)) {
        navigation.current = null;
      }
      const activeUrl = navigation.current?.url ?? targets[activeIndex].url;
      setReading((current) =>
        current.activeUrl === activeUrl && current.progress === progress && current.position === position
          ? current
          : { activeUrl, progress, position }
      );
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const measure = () => {
      readingOffset = parseFloat(getComputedStyle(article).scrollMarginTop) || 128;
      const bounds = article.getBoundingClientRect();
      start = bounds.top + window.scrollY - readingOffset;
      end = Math.max(
        start + 1,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          bounds.bottom + window.scrollY - readingOffset
        )
      );
      offsets = targets.map(({ element }) => element.getBoundingClientRect().top + window.scrollY);
      schedule();
    };
    const interrupt = () => {
      navigation.current = null;
      schedule();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) interrupt();
    };
    refresh.current = schedule;
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('hashchange', interrupt);
    window.addEventListener('scrollend', interrupt);
    window.addEventListener('wheel', interrupt, { passive: true });
    window.addEventListener('touchstart', interrupt, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    const observer = new ResizeObserver(measure);
    observer.observe(article);
    observer.observe(document.body);
    return () => {
      refresh.current = () => {};
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      window.removeEventListener('hashchange', interrupt);
      window.removeEventListener('scrollend', interrupt);
      window.removeEventListener('wheel', interrupt);
      window.removeEventListener('touchstart', interrupt);
      window.removeEventListener('keydown', onKeyDown);
      observer.disconnect();
    };
  }, [headings]);

  const navigate = useCallback((url: string) => {
    const target = document.getElementById(decodeURIComponent(url.slice(1)));
    if (!target) return;
    const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 128;
    const top = Math.max(
      0,
      Math.min(
        target.getBoundingClientRect().top + window.scrollY - offset,
        document.documentElement.scrollHeight - window.innerHeight
      )
    );
    navigation.current = { url, top, expires: performance.now() + 2500 };
    setReading((current) => ({ ...current, activeUrl: url }));
    if (window.location.hash !== url) window.history.pushState(window.history.state, '', url);
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    target.focus({ preventScroll: true });
    window.scrollTo({
      top,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
    refresh.current();
  }, []);

  const value = useMemo(() => ({ ...reading, navigate }), [reading, navigate]);
  return (
    <ArticleReadingContext.Provider value={value}>
      <div className={className} data-post-layout>
        {children}
      </div>
    </ArticleReadingContext.Provider>
  );
}

export function useArticleReading() {
  const context = useContext(ArticleReadingContext);
  if (!context) throw new Error('Article reading components need ArticleReadingProvider');
  return context;
}
