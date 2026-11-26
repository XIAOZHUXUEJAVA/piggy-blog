'use client';

import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Authors, Blog } from 'contentlayer/generated';
import { slug as slugify } from 'github-slugger';
import { FeaturedPosts, RecentPosts } from '@/components/homepage';
import featuredPostSlugs from '@/data/featuredPosts';
import HomeIntro from '@/components/homepage/HomeIntro';
import siteMetadata from '@/data/siteMetadata';
import styles from '@/components/homepage/PaperSurface.module.css';
// import { IconCloud } from '@/components/ui/icon-cloud';

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
  const featuredPosts = featuredPostSlugs.flatMap((slug) => posts.filter((post) => post.slug === slug));
  const topicCount = new Set(posts.flatMap((post) => post.tags.map((tag) => slugify(tag)))).size;

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
      <footer className={styles.homeFooter}>
        <p>© {siteMetadata.author} · PiggyBlog</p>
      </footer>
    </div>
  );
}
