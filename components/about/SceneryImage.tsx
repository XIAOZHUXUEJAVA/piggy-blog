'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import styles from './AboutPage.module.css';

export default function SceneryImage({ src, alt }: { src: string; alt: string }) {
  const t = useTranslations('AboutStudio');

  return (
    <Zoom
      a11yNameButtonZoom={t('zoomImage', { name: alt })}
      a11yNameButtonUnzoom={t('closeImage')}
      classDialog={styles.photoZoom}
      zoomImg={{ src, alt, srcSet: '', sizes: '' }}
      zoomMargin={24}
    >
      <Image src={src} alt={alt} width={1086} height={1448} unoptimized />
    </Zoom>
  );
}
