'use client';

import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Authors, Blog } from 'contentlayer/generated';
import { slug as slugify } from 'github-slugger';
import { FeaturedPosts, RecentPosts } from '@/components/homepage';
import featuredPostSlugs from '@/data/featuredPosts';
import HomeIntro from '@/components/homepage/HomeIntro';
import styles from '@/components/homepage/PaperSurface.module.css';
import { useEffect, useState } from 'react';
// import { IconCloud } from '@/components/ui/icon-cloud';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('Homepage');
  const featuredPosts = featuredPostSlugs.flatMap((slug) => posts.filter((post) => post.slug === slug));
  const topicCount = new Set(posts.flatMap((post) => post.tags.map((tag) => slugify(tag)))).size;

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
        <RecentPosts posts={posts.slice(0, MAX_DISPLAY)} />
        <FeaturedPosts posts={featuredPosts} />
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
