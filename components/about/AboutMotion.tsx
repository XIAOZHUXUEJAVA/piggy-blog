'use client';

import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { attachAboutMotion, scrollToAboutExplore } from '@/utils/aboutMotion';

export const AboutExploreContext = createContext<(() => void) | null>(null);

export default function AboutMotion({
  children,
  showcase,
  className,
}: {
  children: ReactNode;
  showcase: ReactNode;
  className: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const explore = useRef<HTMLDivElement>(null);
  const [exploreRequest, setExploreRequest] = useState(0);
  const revealExplore = useCallback(() => setExploreRequest((request) => request + 1), []);

  useEffect(() => {
    if (root.current) return attachAboutMotion(root.current);
  }, []);

  useEffect(() => {
    if (!exploreRequest) return;
    const section = explore.current?.querySelector<HTMLElement>('#about-explore');
    if (section) return scrollToAboutExplore(section);
  }, [exploreRequest]);

  return (
    <AboutExploreContext.Provider value={revealExplore}>
      <div ref={root} className={className}>
        {children}
        <div ref={explore} hidden={!exploreRequest}>
          {showcase}
        </div>
      </div>
    </AboutExploreContext.Provider>
  );
}
