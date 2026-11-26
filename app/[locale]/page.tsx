import { sortPosts, allCoreContent, coreContent } from 'pliny/utils/contentlayer';
import { allBlogs, allAuthors } from 'contentlayer/generated';
import { setRequestLocale } from 'next-intl/server';

import Main from './Main';

export default function Page({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const sortedPosts = sortPosts(allBlogs.filter((post) => post.draft !== true));
  const posts = allCoreContent(sortedPosts);
  const author = allAuthors.find((author) => author.slug === 'default');

  return <Main posts={posts} author={author ? coreContent(author) : undefined} />;
}
