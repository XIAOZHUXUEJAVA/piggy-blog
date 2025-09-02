'use client';

import { useRef, useState } from 'react';
import { formatDate } from 'pliny/utils/formatDate';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';

import { Link } from '@/components/ui';
import SimpleTag from '@/components/ui/SimpleTag';

interface Props {
  post: CoreContent<Blog>;
  index: number;
}

const InteractiveArticleCard = ({ post, index }: Props) => {
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
    x: isHovered ? (mousePosition.y - 200) / 10 : 0,
    y: isHovered ? (mousePosition.x - 200) / 10 : 0,
  };

  return (
    <div
      ref={cardRef}
      className="group relative h-full overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:bg-gray-900/80"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: 'preserve-3d',
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Link */}
      <Link href={`/blog/${slug}`} className="absolute inset-0 z-0" aria-label={`Read article: ${title}`} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-900/20 dark:to-purple-900/20" />

      {/* Shine Effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-6">
        {/* Date Badge */}
        <div className="mb-4 flex items-center justify-between">
          <time
            dateTime={date}
            className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 text-xs font-medium text-blue-800 dark:from-blue-900/50 dark:to-purple-900/50 dark:text-blue-200"
          >
            {formatDate(date)}
          </time>
          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>

        {/* Title */}
        <h2 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {title}
        </h2>

        {/* Summary */}
        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{summary}</p>

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
        <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100 dark:text-blue-400">
          Read more
          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default InteractiveArticleCard;
