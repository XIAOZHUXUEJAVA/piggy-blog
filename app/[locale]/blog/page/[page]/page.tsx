import ModernListLayout from '@/layouts/ModernListLayout';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { genPageMetadata } from 'app/seo';
import { getTranslations } from 'next-intl/server';

const LEGACY_POSTS_PER_PAGE = 6;

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Blog' });
  return genPageMetadata({ title: t('title'), description: t('description') });
}

export const generateStaticParams = async () => {
  const totalLegacyPages = Math.ceil(allBlogs.filter((post) => post.draft !== true).length / LEGACY_POSTS_PER_PAGE);
  return Array.from({ length: totalLegacyPages }, (_, index) => ({ page: String(index + 1) }));
};

export default function Page() {
  const posts = allCoreContent(sortPosts(allBlogs.filter((post) => post.draft !== true)));

  return <ModernListLayout posts={posts} />;
}
