'use client';

import { useEffect, useState } from 'react';

const ReadingProgress = () => {
  const [completion, setCompletion] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      setIsVisible(currentProgress > 50);

      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollCompletion);

    return () => {
      window.removeEventListener('scroll', updateScrollCompletion);
    };
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 z-50 w-full transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="h-1 w-full bg-paper-line">
        <div
          style={{ width: `${completion}%` }}
          className="h-full bg-paper-accent transition-[width] duration-150 ease-out"
        />
      </div>
      <div className="paper-popover absolute -bottom-6 right-4 rounded-full px-2 py-1 text-xs font-medium text-paper-muted">
        {Math.round(completion)}%
      </div>
    </div>
  );
};

export default ReadingProgress;

// Add this to your global CSS file (e.g. app/globals.css)
// @keyframes shimmer {
//   0% {
//     transform: translateX(-100%) rotate(15deg);
//   }
//   100% {
//     transform: translateX(100%) rotate(15deg);
//   }
// }
