'use client';

import { useArticleReading } from '@/components/blog/ArticleReadingProvider';

export default function ReadingProgress() {
  const { progress } = useArticleReading();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-50 w-full transition-opacity duration-300 ${progress > 0 ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="h-1 w-full bg-paper-line">
        <div style={{ transform: `scaleX(${progress})` }} className="h-full origin-left bg-paper-accent" />
      </div>
      <div className="paper-popover absolute -bottom-6 right-4 rounded-full px-2 py-1 text-xs font-medium text-paper-muted">
        {Math.round(progress * 100)}%
      </div>
    </div>
  );
}
