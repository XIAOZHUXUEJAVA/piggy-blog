import { genPageMetadata } from 'app/seo';
import { getTranslations } from 'next-intl/server';
import { Authors, allAuthors, allBlogs } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';
import AboutProfile from '@/components/about/AboutProfile';
import PageHeader from '@/components/ui/PageHeader';
import styles from '@/components/about/AboutPage.module.css';

export const metadata = genPageMetadata({ title: 'About' });

export default async function Page() {
  const t = await getTranslations('About');
  const author = allAuthors.find((p) => p.slug === 'default') as Authors;
  const mainContent = coreContent(author);
  const postCount = allBlogs.filter((post) => !post.draft).length;

  return (
    <div className={styles.page}>
      <PageHeader className="mb-12 pl-7 max-md:pl-0" path="~/about" title={t('title')} />
      <AboutProfile author={mainContent} postCount={postCount} />
    </div>
  );
}
