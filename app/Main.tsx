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
  SmartMusicWidget,
} from '@/components/homepage';
import { newCanvas } from '../utils/newCanvas'; // Ensure correct import path
import { useEffect, useState } from 'react';
import { RoughNotation } from 'react-rough-notation';
import CubeSplitter from '@/components/ui/CubeSplitter';

const MAX_DISPLAY = 5;

export default function Home({ posts }) {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // useEffect(() => {
  //   // Initialize canvas animation
  //   newCanvas('canvas');

  //   // Handle scroll events to show or hide the button
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       setShowScrollButton(true); // Show the button when scrolled down
  //     } else {
  //       setShowScrollButton(false); // Hide the button when at the top
  //     }
  //   };

  //   // Attach the scroll event listener
  //   window.addEventListener('scroll', handleScroll);

  //   // Clean up the event listener when the component is unmounted
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

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

      {/* <canvas id="canvas" className="fixed inset-0 z-[0] h-screen w-screen"></canvas> */}

      <Snowfall
        snowflakeCount={60}
        style={{
          zIndex: -2,
          width: '100vw',
          height: '100vh',
          position: 'fixed',
        }}
      />

      {/* 现代化的英雄区域 */}
      <div className="relative mt-8 md:mt-12">
        {/* 背景装饰 */}
        <div className="absolute -inset-x-4 -inset-y-8 rounded-3xl bg-gradient-to-br from-blue-50/50 via-white/30 to-purple-50/50 blur-3xl dark:from-blue-900/20 dark:via-gray-900/30 dark:to-purple-900/20" />

        {/* 主要内容容器 */}
        <div className="relative">
          {/* 问候语部分 - 全新现代化设计 */}
          <div className="relative mb-16 md:mb-20">
            {/* 背景装饰容器 */}
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 blur-2xl dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10" />

            {/* Greeting 组件容器 */}
            <div className="relative z-10 overflow-hidden rounded-3xl bg-white/40 backdrop-blur-sm dark:bg-gray-900/40">
              <Greeting />
            </div>

            {/* 底部装饰光效 */}
            <div className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-300/20 via-purple-300/20 to-pink-300/20 blur-xl dark:from-blue-800/20 dark:via-purple-800/20 dark:to-pink-800/20" />
          </div>

          {/* 主要内容区域 - 响应式网格布局 */}
          <div className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:gap-12">
            {/* 头像区域 */}
            <div className="lg:col-span-4">
              <div className="sticky top-8">
                {/* 头像卡片 */}
                <div className="group relative overflow-hidden rounded-2xl bg-white/70 p-4 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:bg-gray-800/70 md:p-6">
                  {/* 卡片装饰背景 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-blue-900/20 dark:to-purple-900/20" />

                  {/* 头像容器 */}
                  <div className="relative z-10 flex justify-center">
                    <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-none">
                      <Avatar />
                    </div>
                  </div>

                  {/* 装饰元素 */}
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-2xl transition-all duration-500 group-hover:scale-110 dark:from-blue-800/30 dark:to-purple-800/30 md:h-24 md:w-24" />
                  <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-2xl transition-all duration-500 group-hover:scale-110 dark:from-purple-800/20 dark:to-pink-800/20 md:h-32 md:w-32" />
                </div>
              </div>
            </div>

            {/* 信息区域 */}
            <div className="lg:col-span-8">
              <div className="space-y-6 md:space-y-8">
                {/* 个人信息卡片 */}
                <div className="group relative overflow-hidden rounded-2xl bg-white/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:bg-gray-800/70 md:p-8">
                  {/* 卡片装饰背景 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-blue-100/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-green-900/20 dark:to-blue-900/20" />

                  <div className="relative z-10 space-y-4 md:space-y-6">
                    {/* 标题区域 */}
                    <div className="border-b border-gray-200/50 pb-4 dark:border-gray-700/50 md:pb-6">
                      <Heading />
                    </div>

                    {/* 动态介绍 */}
                    <div className="rounded-xl bg-gray-50/50 p-3 dark:bg-gray-900/50 md:p-4">
                      <TypedBios />
                    </div>

                    {/* 简短描述 */}
                    <div className="text-gray-600 dark:text-gray-300">
                      <ShortDescription />
                    </div>
                  </div>

                  {/* 装饰元素 */}
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-green-200/30 to-blue-200/30 blur-xl transition-all duration-500 group-hover:scale-110 dark:from-green-800/30 dark:to-blue-800/30 md:-right-6 md:-top-6 md:h-20 md:w-20" />
                </div>

                {/* 链接和音乐卡片 */}
                <div className="space-y-4 md:space-y-6">
                  {/* 博客链接卡片 */}
                  <div className="group relative overflow-hidden rounded-2xl bg-white/70 p-4 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:bg-gray-800/70 md:p-6">
                    {/* 卡片装饰背景 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-transparent to-orange-100/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-yellow-900/20 dark:to-orange-900/20" />

                    <div className="relative z-10">
                      <div className="mb-3 flex items-center gap-2 md:mb-4">
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400" />
                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 md:text-lg">
                          Quick Links
                        </h3>
                      </div>
                      <BlogLinks />
                    </div>

                    {/* 装饰元素 */}
                    <div className="absolute -bottom-3 -right-3 h-12 w-12 rounded-full bg-gradient-to-br from-yellow-200/30 to-orange-200/30 blur-xl transition-all duration-500 group-hover:scale-110 dark:from-yellow-800/30 dark:to-orange-800/30 md:-bottom-4 md:-right-4 md:h-16 md:w-16" />
                  </div>

                  {/* 音乐播放器卡片 */}
                  <div className="group relative overflow-hidden rounded-2xl bg-white/70 p-4 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:bg-gray-800/70 md:p-6">
                    {/* 卡片装饰背景 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-teal-100/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-green-900/20 dark:to-teal-900/20" />

                    <div className="relative z-10">
                      <div className="mb-3 flex items-center gap-2 md:mb-4">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-green-400 to-teal-400" />
                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 md:text-lg">
                          Now Playing
                        </h3>
                      </div>
                      <SmartMusicWidget />
                    </div>

                    {/* 装饰元素 */}
                    <div className="absolute -left-3 -top-3 h-12 w-12 rounded-full bg-gradient-to-br from-green-200/30 to-teal-200/30 blur-xl transition-all duration-500 group-hover:scale-110 dark:from-green-800/30 dark:to-teal-800/30 md:-left-4 md:-top-4 md:h-16 md:w-16" />
                  </div>
                </div>
              </div>
            </div>
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
              {/* <RoughNotation
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
              </RoughNotation> */}
              <RoughNotation
                type="highlight"
                show={true}
                color="#f6ad55" // 你也可以用 #f6ad5533 来加透明度
                animationDelay={1000}
                animationDuration={1000}
              >
                <span className="inline-block text-gray-600" style={{ padding: '0.2em' }}>
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

      <CubeSplitter />
    </div>
  );
}
