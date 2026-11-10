'use client';

import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import siteMetadata from '@/data/siteMetadata';
import PaperBackground from '@/components/ui/PaperBackground';

const FallingLeaves = dynamic(() => import('@/components/ui/FallingLeaves'), { ssr: false });

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      <PaperBackground />
      <FallingLeaves />
      {children}
    </ThemeProvider>
  );
}
