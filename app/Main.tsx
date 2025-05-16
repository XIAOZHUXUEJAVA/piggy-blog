'use client';

import Snowfall from 'react-snowfall';
import { formatDate } from 'pliny/utils/formatDate';
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
import { newCanvas } from '../utils/newCanvas'; // Ensure correct import path
import { useEffect, useState } from 'react';
import { RoughNotation } from 'react-rough-notation';

const MAX_DISPLAY = 5;

export default function Home({ posts }) {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // Initialize canvas animation
    newCanvas('canvas');

    // Handle scroll events to show or hide the button
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true); // Show the button when scrolled down
      } else {
        setShowScrollButton(false); // Hide the button when at the top
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* 背景装饰元素 - 保留网格背景 */}
      <div className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden">
        {/* 装饰性网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <canvas id="canvas" className="fixed inset-0 z-[0] h-screen w-screen"></canvas>

      <Snowfall
        snowflakeCount={60}
        style={{
          zIndex: -2,
          width: '100vw',
          height: '100vh',
          position: 'fixed',
        }}
      />

      {/* 恢复原有的内容结构 */}
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
          </div>
        </div>
      </div>

      {/* 标签云部分 */}
      <div className="relative my-12">
        <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-yellow-100/10 via-blue-100/10 to-rose-100/10 blur-2xl dark:from-yellow-900/10 dark:via-blue-900/10 dark:to-rose-900/10" />
        <PopularTags />
      </div>

      {/* 博客列表部分 */}
      <div className="relative">
        <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-100/10 via-rose-100/10 to-yellow-100/10 blur-2xl dark:from-blue-900/10 dark:via-rose-900/10 dark:to-yellow-900/10" />
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 py-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-800 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              <RoughNotation
                type="bracket"
                brackets={['left', 'right']}
                show={true}
                color="#f6ad55"
                animationDelay={1000}
                animationDuration={1000}
                strokeWidth={5}
              >
                <span className="inline-block text-gray-600" style={{ padding: '0.2em', display: 'inline-block' }}>
                  Recent Posts
                </span>
              </RoughNotation>
            </h1>

            <p className="!mt-2 flex text-lg leading-7 text-gray-500 dark:text-gray-400">
              {siteMetadata.description}
              <Link href="/blog" className="z-[1] ml-auto">
                <Twemoji emoji="backhand-index-pointing-right" />
                <RoughNotation
                  type="underline"
                  show={true}
                  color="#FFb900"
                  animationDelay={1400}
                  animationDuration={1200}
                >
                  <span data-umami-event="home-link-blog" className="z-[1] ml-1.5">
                    See more blogs
                  </span>
                </RoughNotation>
              </Link>
            </p>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post;
              return (
                <li
                  key={slug}
                  className="group relative transform overflow-hidden rounded-xl py-6 transition-all duration-300 ease-out
                             hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-2xl 
                             dark:hover:from-gray-800/50 dark:hover:to-gray-900/50"
                >
                  {/* 背景动画效果 */}
                  <div
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-100/0 via-yellow-100/5 to-yellow-100/0 
                                opacity-0 transition-opacity duration-500 group-hover:opacity-100
                                dark:from-yellow-400/0 dark:via-yellow-400/5 dark:to-yellow-400/0"
                  />

                  <article className="px-4 transition-transform duration-300 ease-out group-hover:scale-[0.99]">
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd
                          className="inline-block rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 
                                     px-3 py-1.5 text-sm font-medium leading-6 shadow-sm
                                     dark:from-gray-800 dark:to-gray-700"
                        >
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
                                className="group/title relative text-gray-900 transition-colors duration-300
                                         dark:text-gray-100"
                              >
                                {title}
                                <span
                                  className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 
                                               rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 
                                               transition-transform duration-300 group-hover/title:scale-x-100"
                                />
                              </Link>
                            </h2>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div
                            className="prose line-clamp-2 max-w-none text-gray-500 
                                        dark:text-gray-400"
                          >
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="group/read inline-flex items-center gap-1.5 text-yellow-600 
                                     transition-colors duration-200 hover:text-yellow-700
                                     dark:text-yellow-400 dark:hover:text-yellow-300"
                            aria-label={`Read "${title}"`}
                          >
                            Read more
                            <span className="transition-transform duration-200 group-hover/read:translate-x-0.5">
                              →
                            </span>
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
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary z-[1] hover:text-sky-600 dark:hover:text-sky-400"
            aria-label="All posts"
          >
            <Twemoji emoji="backhand-index-pointing-right" />
            <RoughNotation type="underline" show={true} color="#FFb900" animationDelay={1400} animationDuration={1200}>
              <span data-umami-event="home-link-blog" className="z-[1] ml-1.5">
                All Posts
              </span>
            </RoughNotation>
          </Link>
        </div>
      )}

      {/* 优化后的回到顶部按钮 */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 transform rounded-full bg-gradient-to-r 
                     from-yellow-400 to-rose-400 p-4 text-white shadow-lg transition-all 
                     duration-300 hover:scale-110 hover:shadow-xl dark:from-yellow-500 
                     dark:to-rose-500"
          aria-label="Back to Top"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}
