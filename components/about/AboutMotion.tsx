'use client';

import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { attachAboutMotion, scrollToAboutExplore } from '@/utils/aboutMotion';

interface ExploreControls {
  reveal: () => void;
  hide: () => void;
}

export const AboutExploreContext = createContext<ExploreControls | null>(null);

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
  const exploreStage = useRef<HTMLDivElement>(null);
  const exploreAnimation = useRef<Animation | null>(null);
  const [exploreRequest, setExploreRequest] = useState(0);
  const revealExplore = useCallback(() => setExploreRequest((request) => request + 1), []);
  const hideExplore = useCallback(() => setExploreRequest(0), []);

  useEffect(() => {
    if (root.current) return attachAboutMotion(root.current);
  }, []);

  useEffect(() => {
    const stage = exploreStage.current;
    if (!stage) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    exploreAnimation.current?.cancel();

    if (preference.matches) {
      stage.hidden = !exploreRequest;
      return;
    }

    if (exploreRequest) {
      stage.hidden = false;
      exploreAnimation.current = stage.animate(
        [
          { opacity: 0, transform: 'translateY(28px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        {
          duration: 520,
          easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          fill: 'both',
        }
      );
    } else {
      exploreAnimation.current = stage.animate(
        [
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(-20px)' },
        ],
        {
          duration: 420,
          easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          fill: 'both',
        }
      );
      exploreAnimation.current.onfinish = () => {
        stage.hidden = true;
        stage.querySelectorAll('[data-about-revealed]').forEach((element) => {
          element.removeAttribute('data-about-revealed');
        });
      };
    }

    return () => {
      exploreAnimation.current?.cancel();
    };
  }, [exploreRequest]);

  useEffect(() => {
    if (!exploreRequest) return;
    const section = explore.current?.querySelector<HTMLElement>('#about-explore');
    if (section) return scrollToAboutExplore(section);
  }, [exploreRequest]);

  return (
    <AboutExploreContext.Provider value={{ reveal: revealExplore, hide: hideExplore }}>
      <div ref={root} className={className}>
        {children}
        <div ref={explore}>
          <div ref={exploreStage} hidden={!exploreRequest}>
            {showcase}
          </div>
        </div>
      </div>
    </AboutExploreContext.Provider>
  );
}
