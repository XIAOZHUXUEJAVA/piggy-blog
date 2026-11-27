import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import PostCard from './PostCard';
import styles from './PaperSurface.module.css';

export default function RecentPosts({ posts }: { posts: CoreContent<Blog>[] }) {
  const t = useTranslations('Homepage');

  return (
    <section aria-labelledby="recent-posts-title">
      <header className={styles.sectionHeading}>
        <h1 id="recent-posts-title">{t('recentPosts')}</h1>
        <Link href="/archive" className={styles.archiveLink}>
          {t('discoverAllPosts')} <span aria-hidden="true">→</span>
        </Link>
      </header>
      {posts.length ? (
        <ol className={styles.recentGrid} data-full={posts.length === 5} role="list">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <PostCard post={post} variant={index === 0 ? 'lead' : 'side'} />
            </li>
          ))}
        </ol>
      ) : (
        <p className={styles.emptyState}>{t('noPostsFound')}</p>
      )}
    </section>
  );
}
