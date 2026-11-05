import ModernListLayout from '@/layouts/ModernListLayout';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { genPageMetadata } from 'app/seo';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Blog' });
  return genPageMetadata({ title: t('title'), description: t('description') });
}

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs));

  return <ModernListLayout posts={posts} />;
}
