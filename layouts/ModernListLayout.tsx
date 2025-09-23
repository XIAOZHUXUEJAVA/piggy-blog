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
  const { slug, date, title, summary, tags } = post;
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
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-green-500/20"></div>
        <div className="absolute -bottom-2 -left-2 h-12 w-12 rounded-full bg-orange-500/20"></div>
      </div>

      {/* Mouse follow shine effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, transparent 50%)`,
        }}
      />

      {/* Background Link for entire card */}
      <Link href={`/blog/${slug}`} className="absolute inset-0 z-10" aria-label={`Read article: ${title}`} />

      <div className="pointer-events-none relative z-20 p-6">
        {/* Date Badge */}
        <div className="mb-4">
          <time
            dateTime={date}
            className="inline-block rounded-full bg-gradient-to-r from-green-100 to-yellow-100 px-3 py-1 text-sm font-medium text-green-700 shadow-sm backdrop-blur-sm dark:from-green-900/30 dark:to-yellow-900/30 dark:text-green-300"
            style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(234,179,8,0.1) 100%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
            }}
          >
            {formatDate(date, siteMetadata.locale)}
          </time>
        </div>

        {/* Title */}
        <h2 className="relative z-10 mb-3 text-xl font-bold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-green-600 dark:text-gray-100 dark:group-hover:text-green-400">
          {title}
        </h2>

        {/* Summary */}
        <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">{summary}</p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="pointer-events-auto relative z-30 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <SimpleTag key={tag} text={tag} />
            ))}
            {tags.length > 3 && (
              <span className="text-sm text-gray-500 dark:text-gray-400">+{tags.length - 3} more</span>
            )}
          </div>
        )}

        {/* Read More Arrow */}
        <div className="pointer-events-none absolute bottom-4 right-4 z-30 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
          <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

  // Generate visible page numbers for mobile
  const getVisiblePages = () => {
    const delta = 1;
    const result: (number | string)[] = [];

    // Always show first page
    result.push(1);

    // Add dots if needed
    if (currentPage - delta > 2) {
      result.push('...');
    }

    // Add pages around current page
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      if (i !== 1 && i !== totalPages) {
        result.push(i);
      }
    }

    // Add dots if needed
    if (currentPage + delta < totalPages - 1) {
      result.push('...');
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      result.push(totalPages);
    }

    // Remove duplicates
    return result.filter((item, index) => result.indexOf(item) === index);
  };

  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="flex items-center space-x-1 sm:space-x-2">
        {prevPage ? (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="group flex items-center space-x-1 rounded-lg bg-gradient-to-r from-green-500 to-yellow-500 px-3 py-2 text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-lg sm:px-4 sm:py-2 sm:text-base"
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #eab308 100%)',
              boxShadow: '0 4px 16px rgba(34,197,94,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            <svg
              className="h-3 w-3 transition-transform group-hover:-translate-x-1 sm:h-4 sm:w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Link>
        ) : (
          <button
            disabled
            className="flex items-center space-x-1 rounded-lg bg-gray-200 px-3 py-2 text-sm text-gray-400 dark:bg-gray-700 dark:text-gray-500 sm:px-4 sm:py-2 sm:text-base"
          >
            <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </button>
        )}

        <div className="flex items-center space-x-1">
          {/* Desktop: Show all pages */}
          <div className="hidden sm:flex sm:items-center sm:space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={page === 1 ? `/${basePath}/` : `/${basePath}/page/${page}`}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-200 sm:h-10 sm:w-10 ${
                  page === currentPage
                    ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                style={
                  page === currentPage
                    ? {
                        background: 'linear-gradient(135deg, #22c55e 0%, #eab308 100%)',
                        boxShadow: '0 4px 12px rgba(34,197,94,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                      }
                    : {}
                }
              >
                {page}
              </Link>
            ))}
          </div>

          {/* Mobile: Show limited pages with dots */}
          <div className="flex items-center space-x-1 sm:hidden">
            {getVisiblePages().map((page, index) =>
              page === '...' ? (
                <span key={index} className="px-2 text-gray-400">
                  ...
                </span>
              ) : (
                <Link
                  key={page}
                  href={page === 1 ? `/${basePath}/` : `/${basePath}/page/${page}`}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-200 ${
                    page === currentPage
                      ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                  style={
                    page === currentPage
                      ? {
                          background: 'linear-gradient(135deg, #22c55e 0%, #eab308 100%)',
                          boxShadow: '0 4px 12px rgba(34,197,94,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                        }
                      : {}
                  }
                >
                  {page}
                </Link>
              )
            )}
          </div>
        </div>

        {nextPage ? (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="group flex items-center space-x-1 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-2 text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-lg sm:px-4 sm:py-2 sm:text-base"
            style={{
              background: 'linear-gradient(135deg, #eab308 0%, #f97316 100%)',
              boxShadow: '0 4px 16px rgba(234,179,8,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <svg
              className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
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
            className="flex items-center space-x-1 rounded-lg bg-gray-200 px-3 py-2 text-sm text-gray-400 dark:bg-gray-700 dark:text-gray-500 sm:px-4 sm:py-2 sm:text-base"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-block">
            <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white md:text-7xl">{title}</h1>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-green-500 to-yellow-500 shadow-lg"></div>
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
              className="w-full rounded-2xl border-2 border-gray-200 bg-white/80 px-6 py-4 pl-12 text-gray-900 backdrop-blur-sm transition-all duration-300 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:focus:border-green-400"
              style={{
                boxShadow: '0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
              }}
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
                <InteractiveCard key={post.slug} post={post} index={index} />
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
          <div
            className="inline-flex items-center rounded-2xl border border-gray-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
            }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-60"></div>

            {/* Total Posts */}
            <div className="relative z-10 px-8 py-6 text-center">
              <div className="bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-3xl font-bold text-transparent">
                {posts.length}
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">Total Posts</div>
            </div>

            {/* Divider */}
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

            {/* Topics */}
            <div className="relative z-10 px-8 py-6 text-center">
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-3xl font-bold text-transparent">
                {Array.from(new Set(posts.flatMap((post) => post.tags || []))).length}
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">Topics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
