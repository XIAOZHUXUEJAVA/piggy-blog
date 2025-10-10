'use client';

import { useState, useRef } from 'react';

interface PreProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export default function Pre({ children, className, ...props }: PreProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (preRef.current) {
      const code = preRef.current.textContent || '';
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  return (
    <div className="group relative">
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 rounded-lg border border-emerald-200/50 bg-gradient-to-r from-emerald-50/95 to-amber-50/95 p-2.5 opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:from-emerald-100 hover:to-amber-100 hover:shadow-lg group-hover:opacity-100 dark:border-emerald-700/30 dark:from-emerald-900/90 dark:to-amber-900/90 dark:hover:from-emerald-800/95 dark:hover:to-amber-800/95"
        aria-label="Copy code"
        title={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <svg
            className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="h-4 w-4 text-gray-700 transition-colors group-hover:text-emerald-600 dark:text-gray-300 dark:group-hover:text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
