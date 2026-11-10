'use client';

import Image from 'next/image';
import { Github, Mail, Rss, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Authors } from 'contentlayer/generated';
import { Link } from '@/i18n/navigation';
import siteMetadata from '@/data/siteMetadata';
import styles from './PaperSurface.module.css';

export default function HomeIntro({
  author,
  postCount,
  topicCount,
}: {
  author?: CoreContent<Authors>;
  postCount: number;
  topicCount: number;
}) {
  const t = useTranslations('Homepage');
  const github = author?.github || siteMetadata.github;

  return (
    <section className={styles.intro} aria-labelledby="home-intro-title">
      <Link href="/about" className={styles.introAvatarLink} aria-label={t('introAbout')}>
        <Image
          src={author?.avatar || '/static/images/my-avatar.jpg'}
          alt={t('introAvatarAlt', { name: siteMetadata.author })}
          width={96}
          height={96}
          sizes="96px"
          className={styles.introAvatar}
          priority
        />
      </Link>

      <h1 id="home-intro-title" className={styles.introGreeting}>
        {t.rich('introGreeting', {
          name: () => <span className={styles.introName}>{siteMetadata.author}</span>,
        })}
        <span className={styles.introWave} aria-hidden="true">
          👋
        </span>
      </h1>

      <p className={styles.introStatement}>{t('introDescription')}</p>

      <div className={styles.introFooter}>
        <p className={styles.introMotto}>{t('introMotto')}</p>
        <div className={styles.introStats}>
          <Link href="/blog">{t('articlesCount', { count: postCount })}</Link>
          <span aria-hidden="true">·</span>
          <span>{t('topicsCount', { count: topicCount })}</span>
        </div>

        <nav className={styles.introSocials} aria-label={t('introSocials')}>
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
            <Github size={18} strokeWidth={1.6} aria-hidden="true" />
          </a>
          {author?.twitter && (
            <a href={author.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" title="X">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.9-9L.8 2h6.5l5.7 6.8L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" />
              </svg>
            </a>
          )}
          {author?.email && (
            <a href={`mailto:${author.email}`} aria-label={t('introEmail')} title={t('introEmail')}>
              <Mail size={18} strokeWidth={1.6} aria-hidden="true" />
            </a>
          )}
          <a href={`${process.env.BASE_PATH || ''}/feed.xml`} aria-label={t('introRss')} title={t('introRss')}>
            <Rss size={17} strokeWidth={1.6} aria-hidden="true" />
          </a>
          <Link href="/about" aria-label={t('introAbout')} title={t('introAbout')}>
            <UserRound size={18} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </section>
  );
}
