'use client';

import dynamic from 'next/dynamic';
import PaperBackground from './PaperBackground';

const FallingLeaves = dynamic(() => import('./FallingLeaves'), { ssr: false });

export default function PageEffects() {
  return (
    <>
      <PaperBackground />
      <FallingLeaves />
    </>
  );
}
