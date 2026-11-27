import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import { FeaturedPosts, RecentPosts } from '@/components/homepage';
import featuredPostSlugs from '@/data/featuredPosts';
import siteMetadata from '@/data/siteMetadata';
import styles from '@/components/homepage/PaperSurface.module.css';

export default function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  const featuredPosts = featuredPostSlugs.flatMap((slug) => posts.filter((post) => post.slug === slug));

  return (
    <div className={styles.paper}>
      <RecentPosts posts={posts.slice(0, 5)} />
      <FeaturedPosts posts={featuredPosts} />
      <footer className={styles.homeFooter}>
        <p>© {siteMetadata.author} · PiggyBlog</p>
      </footer>
    </div>
  );
}
