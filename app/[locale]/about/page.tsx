import { genPageMetadata } from 'app/seo';
import { Authors, allAuthors } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';
import AboutProfile from '@/components/about/AboutProfile';

export const metadata = genPageMetadata({ title: 'About' });

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors;
  const mainContent = coreContent(author);

  return (
    <div className="mx-auto min-h-[50vh] max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <AboutProfile author={mainContent} />
    </div>
  );
}
