import { genPageMetadata } from 'app/seo';
import { Authors, allAuthors, allBlogs } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';
import AboutProfile from '@/components/about/AboutProfile';
import styles from '@/components/about/AboutPage.module.css';

export const metadata = genPageMetadata({ title: 'About' });

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors;
  const mainContent = coreContent(author);
  const postCount = allBlogs.filter((post) => !post.draft).length;

  return (
    <div className={styles.page}>
      <AboutProfile author={mainContent} postCount={postCount} />
    </div>
  );
}
