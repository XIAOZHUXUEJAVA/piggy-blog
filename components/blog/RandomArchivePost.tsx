'use client';

import { useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { Shuffle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import styles from './WritingArchive.module.css';

interface Props {
  posts: { slug: string; title: string; date: string }[];
  initialIndex: number;
}

export default function RandomArchivePost({ posts, initialIndex }: Props) {
  const t = useTranslations('WritingArchive');
  const format = useFormatter();
  const [index, setIndex] = useState(initialIndex);
  const post = posts[index];

  function draw() {
    const offset = 1 + Math.floor(Math.random() * (posts.length - 1));
    setIndex((current) => (current + offset) % posts.length);
  }

  return (
    <div className={styles.pick}>
      <div className={styles.pickHeading}>
        <h3>
          <span className="sr-only">{t('random')}</span>
          <code className={styles.command} aria-hidden="true">
            <span>$ </span>shuf -n 1 ~/blog
          </code>
        </h3>
        {posts.length > 1 && (
          <button type="button" onClick={draw}>
            <Shuffle size={13} aria-hidden="true" />
            {t('shuffle')}
          </button>
        )}
      </div>
      <div aria-live="polite" aria-atomic="true">
        <Link href={`/blog/${post.slug}`} className={styles.pickedTitle}>
          {post.title}
        </Link>
        <time dateTime={post.date}>
          {format.dateTime(new Date(post.date), { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })}
        </time>
      </div>
    </div>
  );
}
