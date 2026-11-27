import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { setRequestLocale } from 'next-intl/server';

import Main from './Main';

export default function Page({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const sortedPosts = sortPosts(allBlogs.filter((post) => post.draft !== true));

  return <Main posts={allCoreContent(sortedPosts)} />;
}
