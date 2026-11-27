import { ChevronRight, FileText, Folder, FolderOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import { Link } from '@/i18n/navigation';
import styles from './ArchiveFileTree.module.css';

interface Props {
  path: string;
  groups: { year: number; posts: CoreContent<Blog>[] }[];
}

export default function ArchiveFileTree({ path, groups }: Props) {
  const t = useTranslations('Blog');

  return (
    <div className={styles.tree}>
      <p className={styles.root}>{path}</p>
      <ul className={styles.years}>
        {groups.map(({ year, posts }) => (
          <li key={year} className={styles.year}>
            <details open>
              <summary className={styles.folder}>
                <Folder size={18} className={styles.closedIcon} aria-hidden="true" />
                <FolderOpen size={18} className={styles.openIcon} aria-hidden="true" />
                <strong>{year}/</strong>
                <span className={styles.count}>{t('articleCount', { count: posts.length })}</span>
                <ChevronRight size={13} className={styles.chevron} aria-hidden="true" />
              </summary>
              <ul className={styles.files}>
                {posts.map((post) => (
                  <li key={post.slug} className={styles.file}>
                    <Link href={`/blog/${post.slug}`} className={styles.link}>
                      <FileText size={15} className={styles.fileIcon} aria-hidden="true" />
                      <span className={styles.title}>{post.title}</span>
                      <time dateTime={post.date}>{new Date(post.date).toISOString().slice(0, 10)}</time>
                      {post.tags.length > 0 && (
                        <span className={styles.tags}>{post.tags.map((tag) => `#${tag}`).join(' ')}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
