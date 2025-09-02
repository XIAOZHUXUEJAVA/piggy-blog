'use client';

import { useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { formatDate } from 'pliny/utils/formatDate';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';

import { Link } from '@/components/ui';
import SimpleTag from '@/components/ui/SimpleTag';
import siteMetadata from '@/data/siteMetadata';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

interface ModernListLayoutProps {
  posts: CoreContent<Blog>[];
  title: string;
  initialDisplayPosts?: CoreContent<Blog>[];
  pagination?: PaginationProps;
}

// Interactive Card Component with mouse follow effect
const InteractiveCard = ({ post, index }: { post: CoreContent<Blog>; index: number }) => {
  const { path, date, title, summary, tags } = post;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const rotate = {
    x: isHovered ? (mousePosition.y - 200) / 15 : 0,
    y: isHovered ? (mousePosition.x - 200) / 15 : 0,
  };

  return (
    <article
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/80"
      style={{
        animationDelay: `${index * 100}ms`,
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-500/20"></div>
        <div className="absolute -bottom-2 -left-2 h-12 w-12 rounded-full bg-purple-500/20"></div>
      </div>

      {/* Background Link for entire card */}
      <Link href={`/${path}`} className="absolute inset-0 z-0" aria-label={`Read article: ${title}`} />

      {/* Mouse follow shine effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 p-6">
        {/* Date Badge */}
        <div className="mb-4">
          <time
            dateTime={date}
            className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 text-sm font-medium text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300"
          >
            {formatDate(date, siteMetadata.locale)}
          </time>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-xl font-bold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          <span className="relative z-10">{title}</span>
        </h2>

        {/* Summary */}
        <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">{summary}</p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="relative z-20 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <SimpleTag key={tag} text={tag} />
            ))}
            {tags.length > 3 && (
              <span className="text-sm text-gray-500 dark:text-gray-400">+{tags.length - 3} more</span>
            )}
          </div>
        )}

        {/* Read More Arrow */}
        <div className="pointer-events-none absolute bottom-4 right-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
          <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
    </article>
  );
};

function ModernPagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const basePath = pathname.split('/')[1];
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="flex items-center justify-center space-x-4 py-12">
      <div className="flex items-center space-x-2">
        {prevPage ? (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="group flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <svg
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </Link>
        ) : (
          <button
            disabled
            className="flex items-center space-x-2 rounded-xl bg-gray-200 px-6 py-3 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>
        )}

        <div className="flex items-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={page === 1 ? `/${basePath}/` : `/${basePath}/page/${page}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${
                page === currentPage
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {page}
            </Link>
          ))}
        </div>

        {nextPage ? (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="group flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span>Next</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <button
            disabled
            className="flex items-center space-x-2 rounded-xl bg-gray-200 px-6 py-3 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
          >
            <span>Next</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default function ModernListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ModernListLayoutProps) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const displayPosts = initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-block">
            <h1 className="mb-4 text-5xl font-bold text-blue-600 dark:text-blue-400 md:text-7xl">{title}</h1>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Discover insights, tutorials, and thoughts on technology and development
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-2xl border-2 border-gray-200 bg-white/80 px-6 py-4 pl-12 text-gray-900 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:focus:border-blue-400"
            />
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mx-auto max-w-6xl">
          {!filteredBlogPosts.length ? (
            <div className="py-16 text-center">
              <div className="mb-4 text-6xl">📝</div>
              <p className="text-xl text-gray-500 dark:text-gray-400">No posts found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayPosts.map((post, index) => (
                <InteractiveCard key={post.path} post={post} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && !searchValue && (
          <ModernPagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-8 rounded-2xl border border-gray-200/50 bg-white/80 px-8 py-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{posts.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Posts</div>
            </div>
            <div className="h-12 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {Array.from(new Set(posts.flatMap((post) => post.tags || []))).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Topics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
