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
      <div className="h-1 w-full bg-gray-200 dark:bg-gray-700">
        <div
          style={{ width: `${completion}%` }}
          className="after:animate-shimmer h-full bg-gradient-to-r from-yellow-400 via-yellow-500 
            to-yellow-600 shadow-lg transition-all duration-150 
            ease-out after:absolute after:right-0 after:top-0 after:h-full 
            after:w-24 after:translate-x-12 after:bg-gradient-to-r 
            after:from-transparent after:to-white/20"
        />
      </div>
      <div
        className="absolute -bottom-6 right-4 rounded-full bg-white px-2 py-1 
        text-xs font-medium text-gray-500 opacity-70 shadow-sm 
        transition-opacity duration-200 hover:opacity-100 
        dark:bg-gray-800 dark:text-gray-400"
      >
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
