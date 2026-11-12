'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { attachSceneMotion } from '@/utils/sceneMotion';

export default function SceneMotion({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (root.current) return attachSceneMotion(root.current);
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
