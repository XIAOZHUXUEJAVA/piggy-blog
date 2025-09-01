import { genPageMetadata } from 'app/seo';
import { Authors, allAuthors } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';
import { AboutHero, AboutProfile, AboutSkills, ModernCareerTimeline } from '@/components/about';

export const metadata = genPageMetadata({ title: 'About' });

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors;
  const mainContent = coreContent(author);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AboutHero />

      {/* Main Content */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-900/10"></div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-3 lg:gap-20">
            {/* Left Column - Profile */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <AboutProfile author={mainContent} />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-16 lg:col-span-2">
              {/* Skills Section */}
              <AboutSkills />

              {/* Career Timeline */}
              <ModernCareerTimeline />

              {/* Bio Content */}
              {/* <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-blue-600 dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-a:text-blue-400">
                <div className="rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
                  <h2 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                    关于我
                  </h2>
                  <MDXLayoutRenderer code={author.body.code} />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
