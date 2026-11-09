'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { attachCareerMotion } from '@/utils/careerMotion';

export default function CareerMotion({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (root.current) return attachCareerMotion(root.current);
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
