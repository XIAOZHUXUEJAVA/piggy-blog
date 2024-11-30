'use client';

import Snowfall from 'react-snowfall';
import { formatDate } from 'pliny/utils/formatDate';
// import NewsletterForm from 'pliny/ui/NewsletterForm';

import siteMetadata from '@/data/siteMetadata';
import { Tag, Link, Twemoji } from '@/components/ui';
import {
  Avatar,
  Heading,
  Greeting,
  TypedBios,
  BlogLinks,
  PopularTags,
  ShortDescription,
  SpotifyNowPlaying,
} from '@/components/homepage';

const MAX_DISPLAY = 5;

export default function Home({ posts }) {
  return (
    <div className="relative">
      <Snowfall
        snowflakeCount={60}
        style={{
          zIndex: -1,
          width: '100vw',
          height: '100vh',
          position: 'fixed',
        }}
      />

      {/* Introduce myself */}
      <div className="mt-8 dark:divide-gray-700 md:mt-8">
        <Greeting />
        <div className="flex flex-col justify-between md:my-4 md:pb-8 xl:flex-row">
          <Avatar />
          <div className="my-auto flex flex-col text-lg leading-8 text-gray-600 dark:text-gray-400">
            <Heading />
            <TypedBios />
            <ShortDescription />
            <BlogLinks />
            <SpotifyNowPlaying />
            <p className="flex">
              <span className="mr-2">May you find joy in your reading!!!!</span>
              <Twemoji emoji="clinking-beer-mugs" />
            </p>
          </div>
        </div>
      </div>

      <PopularTags />

      {/* List all post */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 py-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Recent Posts
          </h1>
          <p className="!mt-2 flex text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
            <Link href="/blog" className="ml-auto hover:underline">
              <Twemoji emoji="backhand-index-pointing-right" />
              <span data-umami-event="home-link-blog" className="ml-1.5">
                See more blogs
              </span>
            </Link>
          </p>
        </div>

        {/* <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post;
            return (
              <li key={slug} className="py-6">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary hover:text-sky-600 dark:hover:text-sky-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul> */}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post;
            return (
              <li
                key={slug}
                className="transform rounded-lg py-6 transition-all duration-300 ease-in-out hover:rotate-1 hover:scale-105 hover:bg-gray-50 hover:shadow-xl hover:shadow-gray-400 dark:hover:bg-gray-800"
              >
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium leading-6 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        <time dateTime={date} className="text-gray-700 dark:text-gray-300">
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="hover:text-primary text-gray-900 dark:text-gray-100 dark:hover:text-sky-400"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap space-x-2">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary hover:text-sky-600 dark:hover:text-sky-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link href="/blog" className="text-primary hover:text-sky-600 dark:hover:text-sky-400" aria-label="All posts">
            All Posts &rarr;
          </Link>
        </div>
      )}

      {/* {siteMetadata.newsletter.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </div>
  );
}
