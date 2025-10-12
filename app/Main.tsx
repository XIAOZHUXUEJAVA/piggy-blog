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
import { IconCloud } from '@/components/ui/icon-cloud';
import { RoughNotation } from 'react-rough-notation';
import CubeSplitter from '@/components/ui/CubeSplitter';

const MAX_DISPLAY = 5;
const slugs = [
  'typescript',
  'javascript',
  'dart',
  'java',
  'react',
  'flutter',
  'android',
  'html5',
  'css3',
  'nodedotjs',
  'express',
  'nextdotjs',
  'prisma',
  'amazonaws',
  'postgresql',
  'firebase',
  'nginx',
  'vercel',
  'testinglibrary',
  'jest',
  'cypress',
  'docker',
  'git',
  'jira',
  'github',
  'gitlab',
  'visualstudiocode',
  'androidstudio',
  'sonarqube',
  'figma',
];
export default function Home({ posts }) {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);
  useEffect(() => {
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
        <div className="absolute -inset-x-4 -inset-y-8 rounded-3xl bg-gradient-to-br from-green-50/50 via-white/30 to-yellow-50/50 blur-3xl dark:from-green-900/20 dark:via-gray-900/30 dark:to-yellow-900/20" />

        {/* 主要内容容器 */}
        <div className="relative">
          {/* 问候语部分 - 全新现代化设计 */}
          <div className="relative mb-16 md:mb-20">
            {/* 背景装饰容器 */}
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-green-50/30 via-yellow-50/20 to-orange-50/30 blur-2xl dark:from-green-900/10 dark:via-yellow-900/10 dark:to-orange-900/10" />

            {/* Greeting 组件容器 */}
            <div className="relative z-10 overflow-hidden rounded-3xl bg-white/40 backdrop-blur-sm dark:bg-gray-900/40">
              <Greeting />
            </div>

            {/* 底部装饰光效 */}
            <div className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-r from-green-300/20 via-yellow-300/20 to-orange-300/20 blur-xl dark:from-green-800/20 dark:via-yellow-800/20 dark:to-orange-800/20" />
          </div>

          {/* 主要内容区域 - 优化响应式布局 */}
          <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
              {/* 头像区域 */}
              <aside className="lg:col-span-5" aria-label="个人信息">
                <div className="space-y-8 lg:sticky lg:top-8 lg:pr-4">
                  {/* 头像卡片 */}
                  <article className="group relative overflow-hidden rounded-2xl bg-white/80 p-2 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800/80 sm:p-3 md:p-3">
                    {/* 卡片装饰背景 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-yellow-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-green-900/30 dark:to-yellow-900/30" />

                    {/* 头像容器 */}
                    <div className="relative z-10 flex justify-center">
                      <div className="w-full">
                        <Avatar />
                      </div>
                    </div>

                    {/* 简化装饰元素 */}
                    <div className="absolute -right-3 -top-3 h-12 w-12 rounded-full bg-gradient-to-br from-green-200/40 to-yellow-200/40 blur-xl transition-transform duration-300 group-hover:scale-110 dark:from-green-700/40 dark:to-yellow-700/40 lg:h-16 lg:w-16" />
                    <div className="absolute -bottom-3 -left-3 h-16 w-16 rounded-full bg-gradient-to-tr from-yellow-200/30 to-orange-200/30 blur-xl transition-transform duration-300 group-hover:scale-110 dark:from-yellow-700/30 dark:to-orange-700/30 lg:h-20 lg:w-20" />
                  </article>

                  {/* 技能云图 */}
                  <div className="rounded-2xl p-6">
                    <div className="flex h-[300px] w-full items-center justify-center sm:h-[350px] lg:h-[400px]">
                      <IconCloud images={images} />
                    </div>
                  </div>
                </div>
              </aside>

              {/* 信息区域 */}
              <div className="order-2 lg:order-2 lg:col-span-7">
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  {/* 个人信息卡片 */}
                  <div className="group relative overflow-hidden rounded-xl bg-white/70 p-4 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70 sm:rounded-2xl sm:p-5 md:p-6 md:shadow-xl md:hover:shadow-2xl lg:p-8">
                    {/* 卡片装饰背景 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-yellow-100/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-green-900/20 dark:to-yellow-900/20" />

                    <div className="relative z-10 space-y-3 sm:space-y-4 md:space-y-6">
                      {/* 标题区域 */}
                      <div className="border-b border-gray-200/50 pb-3 dark:border-gray-700/50 sm:pb-4 md:pb-6">
                        <Heading />
                      </div>

                      {/* 动态介绍 */}
                      <div className="rounded-lg bg-gray-50/50 p-2.5 dark:bg-gray-900/50 sm:rounded-xl sm:p-3 md:p-4">
                        <TypedBios />
                      </div>

                      {/* 简短描述 */}
                      <div className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                        <ShortDescription />
                      </div>
                    </div>

                    {/* 装饰元素 - 移动端更小 */}
                    <div className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-gradient-to-br from-green-200/30 to-yellow-200/30 blur-lg transition-all duration-500 group-hover:scale-110 dark:from-green-800/30 dark:to-yellow-800/30 sm:-right-3 sm:-top-3 sm:h-12 sm:w-12 md:-right-4 md:-top-4 md:h-16 md:w-16 md:blur-xl lg:-right-6 lg:-top-6 lg:h-20 lg:w-20" />
                  </div>

                  {/* 链接和音乐卡片 */}
                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    {/* 博客链接卡片 */}
                    <div className="group relative overflow-hidden rounded-xl bg-white/70 p-3 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70 sm:rounded-2xl sm:p-4 md:p-6 md:shadow-xl md:hover:shadow-2xl">
                      {/* 卡片装饰背景 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-transparent to-orange-100/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-yellow-900/20 dark:to-orange-900/20" />

                      <div className="relative z-10">
                        <div className="mb-2 flex items-center gap-2 sm:mb-3 md:mb-4">
                          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 sm:h-2 sm:w-2" />
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 sm:text-base md:text-lg">
                            Quick Links
                          </h3>
                        </div>
                        <BlogLinks />
                      </div>

                      {/* 装饰元素 - 移动端更小 */}
                      <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-br from-yellow-200/30 to-orange-200/30 blur-lg transition-all duration-500 group-hover:scale-110 dark:from-yellow-800/30 dark:to-orange-800/30 sm:-bottom-3 sm:-right-3 sm:h-8 sm:w-8 md:-bottom-4 md:-right-4 md:h-12 md:w-12 md:blur-xl lg:h-16 lg:w-16" />
                    </div>

                    {/* 音乐播放器卡片 */}
                    <div className="group relative overflow-hidden rounded-xl bg-white/70 p-3 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70 sm:rounded-2xl sm:p-4 md:p-6 md:shadow-xl md:hover:shadow-2xl">
                      {/* 卡片装饰背景 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-teal-100/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-green-900/20 dark:to-teal-900/20" />

                      <div className="relative z-10">
                        <div className="mb-2 flex items-center gap-2 sm:mb-3 md:mb-4">
                          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-r from-green-400 to-teal-400 sm:h-2 sm:w-2" />
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 sm:text-base md:text-lg">
                            Now Playing
                          </h3>
                        </div>
                        <SmartMusicWidget />
                      </div>

                      {/* 装饰元素 - 移动端更小 */}
                      <div className="absolute -left-2 -top-2 h-6 w-6 rounded-full bg-gradient-to-br from-green-200/30 to-teal-200/30 blur-lg transition-all duration-500 group-hover:scale-110 dark:from-green-800/30 dark:to-teal-800/30 sm:-left-3 sm:-top-3 sm:h-8 sm:w-8 md:-left-4 md:-top-4 md:h-12 md:w-12 md:blur-xl lg:h-16 lg:w-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 标签云部分 */}
      <div className="relative my-12">
        <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-green-100/10 via-yellow-100/10 to-orange-100/10 blur-2xl dark:from-green-900/10 dark:via-yellow-900/10 dark:to-orange-900/10" />
        <PopularTags />
      </div>

      {/* 博客列表部分 */}
      <div className="relative">
        {/* 背景装饰 */}
        <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-green-50/30 via-yellow-50/20 to-orange-50/30 blur-xl dark:from-green-900/10 dark:via-yellow-900/10 dark:to-orange-900/10" />

        <div className="relative z-10">
          {/* 标题区域 - 左右布局 */}
          <div className="flex flex-col items-center justify-between gap-8 py-8 lg:flex-row lg:items-end">
            {/* 左侧标题内容 */}
            <div className="flex-1 text-center lg:text-left">
              {/* <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 shadow-lg backdrop-blur-sm dark:bg-gray-800/60">
                <div className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Latest Articles</span>
              </div> */}

              <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
                <RoughNotation
                  type="highlight"
                  show={true}
                  color="#f59e0b"
                  animationDelay={800}
                  animationDuration={1200}
                  padding={[8, 16]}
                >
                  <span className="text-gray-800 dark:text-gray-200">Recent Posts</span>
                </RoughNotation>
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 lg:max-w-none">
                {siteMetadata.description}
              </p>
            </div>

            {/* 右侧查看更多按钮和装饰 */}
            <div className="flex flex-col items-center gap-4 lg:items-end">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-100 to-yellow-100 px-6 py-3 text-sm font-medium text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:from-green-900/30 dark:to-yellow-900/30 dark:text-gray-300"
              >
                <Twemoji emoji="backhand-index-pointing-right" />
                <span>Discover All Posts</span>
                {/* <div className="transition-transform duration-200 group-hover:translate-x-1">→</div> */}
              </Link>

              {/* 装饰性统计信息 */}
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span>{posts.length} Articles</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                  <span>Fresh Content</span>
                </div>
              </div>
            </div>
          </div>

          {/* 博客列表容器 - 网格布局 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {!posts.length && (
              <div className="col-span-full py-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
              </div>
            )}
            {posts.slice(0, MAX_DISPLAY).map((post, index) => {
              const { slug, date, title, summary, tags } = post;
              const isFirstPost = index === 0;

              return (
                <article
                  key={slug}
                  className={`group relative overflow-hidden rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl dark:bg-gray-800/70 ${
                    isFirstPost ? 'md:col-span-2 lg:col-span-1 xl:col-span-2' : ''
                  }`}
                >
                  {/* 背景装饰 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-yellow-50/30 to-orange-50/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-green-900/20 dark:via-yellow-900/20 dark:to-orange-900/20" />

                  <div className="relative z-10">
                    {/* 日期标签 */}
                    <div className="mb-4 flex items-center justify-between">
                      <time
                        dateTime={date}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-100 to-yellow-100 px-3 py-1 text-xs font-medium text-gray-700 dark:from-green-900/50 dark:to-yellow-900/50 dark:text-gray-300"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        {formatDate(date, siteMetadata.locale)}
                      </time>

                      {isFirstPost && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 px-2 py-1 text-xs font-medium text-yellow-700 dark:from-yellow-900/50 dark:to-orange-900/50 dark:text-yellow-300">
                          <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                          Latest
                        </span>
                      )}
                    </div>

                    {/* 标题 */}
                    <h2
                      className={`mb-3 font-bold leading-tight tracking-tight ${isFirstPost ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}
                    >
                      <Link
                        href={`/blog/${slug}`}
                        className="group/title relative text-gray-900 transition-colors duration-300 dark:text-gray-100"
                      >
                        {title}
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 transition-transform duration-300 group-hover/title:scale-x-100" />
                      </Link>
                    </h2>

                    {/* 标签 */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {tags.slice(0, isFirstPost ? 4 : 3).map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                      {tags.length > (isFirstPost ? 4 : 3) && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{tags.length - (isFirstPost ? 4 : 3)} more
                        </span>
                      )}
                    </div>

                    {/* 摘要 */}
                    <p
                      className={`mb-4 text-gray-600 dark:text-gray-400 ${isFirstPost ? 'line-clamp-3' : 'line-clamp-2'}`}
                    >
                      {summary}
                    </p>

                    {/* 阅读更多 */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/blog/${slug}`}
                        className="group/read inline-flex items-center gap-2 text-sm font-medium text-green-600 transition-colors duration-200 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                        aria-label={`Read "${title}"`}
                      >
                        Read more
                        <span className="transition-transform duration-200 group-hover/read:translate-x-1">→</span>
                      </Link>

                      {/* 装饰性元素 */}
                      <div className="flex items-center gap-1">
                        <div className="h-1 w-1 rounded-full bg-green-300 opacity-60" />
                        <div className="h-1 w-1 rounded-full bg-yellow-300 opacity-60" />
                        <div className="h-1 w-1 rounded-full bg-orange-300 opacity-60" />
                      </div>
                    </div>
                  </div>

                  {/* 装饰性光效 */}
                  <div className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-gradient-to-br from-green-200/30 to-yellow-200/30 opacity-0 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100 dark:from-green-800/30 dark:to-yellow-800/30" />
                  <div className="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-gradient-to-br from-yellow-200/30 to-orange-200/30 opacity-0 blur-lg transition-all duration-500 group-hover:scale-150 group-hover:opacity-100 dark:from-yellow-800/30 dark:to-orange-800/30" />
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* {posts.length > MAX_DISPLAY && (
        <div className="mt-4 flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 px-6 py-3 text-sm font-medium text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:from-orange-900/30 dark:to-yellow-900/30 dark:text-gray-300"
            aria-label="All posts"
          >
            <Twemoji emoji="backhand-index-pointing-right" />
            <span data-umami-event="home-link-blog">All Posts</span>
            <div className="transition-transform duration-200 group-hover:translate-x-1">→</div>
          </Link>
        </div>
      )} */}

      {/* 优化后的回到顶部按钮 */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 transform rounded-full bg-gradient-to-r 
                     from-green-400 to-yellow-400 p-4 text-white shadow-lg transition-all 
                     duration-300 hover:scale-110 hover:shadow-xl dark:from-green-500 
                     dark:to-yellow-500"
          aria-label="Back to Top"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* <CubeSplitter /> */}
    </div>
  );
}
