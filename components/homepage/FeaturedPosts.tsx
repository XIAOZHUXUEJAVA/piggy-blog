import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import { useTranslations } from 'next-intl';
import PostCard from './PostCard';
import styles from './PaperSurface.module.css';

export default function FeaturedPosts({ posts }: { posts: CoreContent<Blog>[] }) {
  const t = useTranslations('Homepage');
  if (!posts.length) return null;

  return (
    <section className={styles.featured} aria-labelledby="featured-posts-title">
      <h2 id="featured-posts-title">{t('featuredPosts')}</h2>
      <ol className={styles.featuredList} role="list">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} variant="compact" />
          </li>
        ))}
      </ol>
    </section>
  );
}
