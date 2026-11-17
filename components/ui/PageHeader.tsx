'use client';

import { ReactNode } from 'react';
import { RoughNotation } from 'react-rough-notation';
import styles from './PageHeader.module.css';

interface Props {
  path: string;
  title?: string;
  className?: string;
  children?: ReactNode;
}

export default function PageHeader({ path, title, className, children }: Props) {
  return (
    <header className={className ? `${styles.header} ${className}` : styles.header}>
      {title ? <h1 className="sr-only">{title}</h1> : null}
      <div className={styles.row}>
        <p className={styles.eyebrow} aria-hidden="true">
          <RoughNotation
            type="underline"
            show
            color="var(--paper-accent)"
            strokeWidth={2}
            padding={[0, 0, 4, 0]}
            animationDuration={600}
          >
            {path}
          </RoughNotation>
        </p>
        {children ? <div className={styles.aside}>{children}</div> : null}
      </div>
    </header>
  );
}
