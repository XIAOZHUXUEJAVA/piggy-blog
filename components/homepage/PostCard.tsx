import Image from 'next/image';
import { useFormatter } from 'next-intl';
import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import siteMetadata from '@/data/siteMetadata';
import { Link } from '@/i18n/navigation';
import styles from './PaperSurface.module.css';

const covers: Record<string, string> = {
  gemini: 'nebula',
  think_AI: 'notebook',
  fastdfs: 'server',
  hospital: 'hospital',
  idea_git: 'workspace',
  ssh_server_upgrade: 'server',
  ssh_server_upgrade_2: 'network',
};

const imageSizes = {
  lead: '(min-width: 64rem) 42rem, 100vw',
  side: '(min-width: 64rem) 18rem, 50vw',
  compact: '76px',
};

export default function PostCard({ post, variant }: { post: CoreContent<Blog>; variant: keyof typeof imageSizes }) {
  const format = useFormatter();
  const cover = Array.isArray(post.images) ? post.images[0] : post.images;
  const src =
    typeof cover === 'string' && cover ? cover : `/static/images/home/${covers[post.slug] ?? 'notebook'}.webp`;
  const local = src.startsWith('/') && !src.startsWith('//');
  const Heading = variant === 'compact' ? 'h3' : 'h2';

  return (
    <Link href={`/blog/${post.slug}`} className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.cover}>
        <Image
          src={local ? `${process.env.BASE_PATH || ''}${src}` : src}
          alt=""
          fill
          sizes={imageSizes[variant]}
          priority={variant === 'lead'}
          unoptimized={!local}
        />
      </div>
      <div className={styles.caption}>
        {variant === 'compact' && post.tags[0] && <span className={styles.topic}>{post.tags.join(' · ')}</span>}
        <Heading className={styles.postTitle}>{post.title}</Heading>
        <div className={styles.meta}>
          <time dateTime={post.date}>
            {format.dateTime(new Date(post.date), {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'Asia/Shanghai',
            })}
          </time>
          {variant !== 'compact' && (
            <span className={styles.byline}>
              <span aria-hidden="true">· </span>
              {siteMetadata.author}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
