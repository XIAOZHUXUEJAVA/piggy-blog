import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  size?: 'site' | 'article' | 'reading';
}

const containerClasses = {
  site: 'site-container',
  article: 'mx-auto w-full max-w-5xl',
  reading: 'mx-auto w-full max-w-3xl',
};

export default function SectionContainer({ children, size = 'site' }: Props) {
  return <section className={containerClasses[size]}>{children}</section>;
}
