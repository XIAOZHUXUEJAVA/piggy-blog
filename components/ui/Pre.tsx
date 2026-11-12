'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface PreProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export default function Pre({ children, className, ...props }: PreProps) {
  const t = useTranslations('Post');
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
    <div className="code-block">
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="code-copy"
        aria-label={copied ? t('copied') : t('copyCode')}
        title={copied ? t('copied') : t('copyCode')}
      >
        {copied ? (
          <svg
            className="h-4 w-4 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
