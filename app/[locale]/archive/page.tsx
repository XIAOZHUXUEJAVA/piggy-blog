import ModernListLayout from '@/layouts/ModernListLayout';
import WritingArchive from '@/components/blog/WritingArchive';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { genPageMetadata } from 'app/seo';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Blog' });
  return genPageMetadata({ title: t('title'), description: t('description') });
}

export default function ArchivePage() {
  const posts = allCoreContent(sortPosts(allBlogs.filter((post) => post.draft !== true)));

  return (
    <ModernListLayout posts={posts} fileTree sidebar={posts.length > 0 && <WritingArchive posts={posts} />} />
  );
}
