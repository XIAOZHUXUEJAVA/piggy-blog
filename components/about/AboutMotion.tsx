'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { attachAboutMotion } from '@/utils/aboutMotion';

export default function AboutMotion({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (root.current) return attachAboutMotion(root.current);
  }, []);
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
