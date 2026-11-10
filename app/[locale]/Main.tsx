'use client';

import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Authors, Blog } from 'contentlayer/generated';
import { slug as slugify } from 'github-slugger';
import { Link } from '@/i18n/navigation';
import { FeaturedPosts } from '@/components/homepage';
import featuredPostSlugs from '@/data/featuredPosts';
import HomeIntro from '@/components/homepage/HomeIntro';
import styles from '@/components/homepage/PaperSurface.module.css';
import { useEffect, useState } from 'react';
// import { IconCloud } from '@/components/ui/icon-cloud';
import { useLocale, useTranslations } from 'next-intl';

const MAX_DISPLAY = 5;
/* 首页图标球暂时隐藏，保留配置方便恢复。
const slugs = [
  'typescript',
  'javascript',
  'dart',
  'java',
  'react',
  'flutter',
  'android',
  'html5',
  'css3',
  'nodedotjs',
  'express',
  'nextdotjs',
  'prisma',
  'amazonaws',
  'postgresql',
  'firebase',
  'nginx',
  'vercel',
  'testinglibrary',
  'jest',
  'cypress',
  'docker',
  'git',
  'jira',
  'github',
  'gitlab',
  'visualstudiocode',
  'androidstudio',
  'sonarqube',
  'figma',
];
const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);
*/

export default function Home({ posts, author }: { posts: CoreContent<Blog>[]; author?: CoreContent<Authors> }) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const locale = useLocale();
  const t = useTranslations('Homepage');
  const featuredPosts = featuredPostSlugs.flatMap((slug) => posts.filter((post) => post.slug === slug));
  const topicCount = new Set(posts.flatMap((post) => post.tags.map((tag) => slugify(tag)))).size;
  const dateFormatter = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Shanghai',
  });

  useEffect(() => {
    const handleScroll = () => setShowScrollButton(window.scrollY > 100);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.paper}>
      {/* <section className="flex justify-center py-4" aria-label="Skills">
        <div className="aspect-square w-full max-w-[400px]">
          <IconCloud images={images} className="h-full w-full rounded-lg" />
        </div>
      </section> */}

      <HomeIntro author={author} postCount={posts.length} topicCount={topicCount} />

      <div className={styles.editorial}>
        <section className={styles.recentPosts} aria-labelledby="recent-posts-title">
          <header className={styles.sectionHeading}>
            <p className={styles.eyebrow} lang="en">
              Recent Writing
            </p>
            <h2 id="recent-posts-title" className={styles.title}>
              {t('recentPosts')}
            </h2>
          </header>

          {!posts.length ? (
            <p className={styles.emptyState}>{t('noPostsFound')}</p>
          ) : (
            <ol className={styles.postList} role="list">
              {posts.slice(0, MAX_DISPLAY).map(({ slug, date, title, tags }, index) => (
                <li key={slug} className={styles.postItem}>
                  <span className={styles.postNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <article>
                    <Link href={`/blog/${slug}`} className={styles.postLink}>
                      <h3 className={styles.postTitle}>{title}</h3>
                      <time dateTime={date} className={styles.postDate}>
                        {dateFormatter.format(new Date(date))}
                      </time>
                      <p className={styles.postMeta}>
                        {tags.length ? tags.slice(0, 2).join(' · ') : t('articleLabel')}
                      </p>
                    </Link>
                  </article>
                </li>
              ))}
            </ol>
          )}

          <Link href="/blog" className={styles.archiveLink}>
            <span>{t('discoverAllPosts')}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </section>

        <aside className={styles.sidebar} aria-labelledby="featured-posts-title">
          <FeaturedPosts posts={featuredPosts} />
        </aside>
      </div>

      {showScrollButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`${styles.button} ${styles.backToTop} fixed bottom-6 right-4 z-50 sm:bottom-8 sm:right-8`}
          aria-label={t('backToTop')}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}
