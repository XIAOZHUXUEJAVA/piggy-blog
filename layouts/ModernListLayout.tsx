'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';

import { Link } from '@/i18n/navigation';

interface ModernListLayoutProps {
  posts: CoreContent<Blog>[];
  title?: string;
}

interface YearGroup {
  year: number;
  posts: CoreContent<Blog>[];
}

function getDateParts(date: string, locale: string) {
  const value = new Date(date);
  const month = String(value.getUTCMonth() + 1).padStart(2, '0');
  const day = String(value.getUTCDate()).padStart(2, '0');
  const year = value.getUTCFullYear();

  return {
    day: `${month}-${day}`,
    year,
    full: new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(value),
  };
}

function getTagCounts(posts: CoreContent<Blog>[]) {
  const counts = new Map<string, number>();

  posts.forEach((post) => {
    (post.tags ?? []).forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
  });

  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export default function ModernListLayout({ posts, title }: ModernListLayoutProps) {
  const locale = useLocale();
  const t = useTranslations('Blog');
  const [searchValue, setSearchValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);

  const tagCounts = useMemo(() => getTagCounts(posts), [posts]);
  const visibleTagCounts = useMemo(() => {
    if (showAllTags) return tagCounts;

    const commonTags = tagCounts.slice(0, 8);
    const selectedTagsNotInCommon = tagCounts.filter(
      ([tag]) => selectedTags.includes(tag) && !commonTags.some(([commonTag]) => commonTag === tag)
    );

    return [...commonTags, ...selectedTagsNotInCommon];
  }, [selectedTags, showAllTags, tagCounts]);

  const filteredPosts = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return posts.filter((post) => {
      const content = [post.title, post.summary ?? '', ...(post.tags ?? [])].join(' ').toLowerCase();
      const matchesSearch = !query || content.includes(query);
      const matchesTags = selectedTags.every((tag) => post.tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [posts, searchValue, selectedTags]);

  const yearGroups = useMemo(() => {
    const groups = new Map<number, CoreContent<Blog>[]>();

    filteredPosts.forEach((post) => {
      const { year } = getDateParts(post.date, locale);
      const group = groups.get(year) ?? [];
      group.push(post);
      groups.set(year, group);
    });

    return [...groups.entries()]
      .sort(([first], [second]) => second - first)
      .map(([year, groupedPosts]) => ({ year, posts: groupedPosts }) satisfies YearGroup);
  }, [filteredPosts, locale]);

  const toggleTag = (tag: string) => {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  };

  const clearFilters = () => {
    setSearchValue('');
    setSelectedTags([]);
  };

  const hasFilters = searchValue.trim().length > 0 || selectedTags.length > 0;

  return (
    <div className="archive-page">
      <div className="archive-shell paper-surface p-4 sm:p-7 lg:p-9">
        <header className="border-b border-gray-200 pb-6 dark:border-gray-700">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                {title || t('title')}
              </h1>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t('archiveDescription')}</p>
            </div>

            <label className="relative block w-full sm:max-w-xs">
              <span className="sr-only">{t('searchLabel')}</span>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
              <input
                aria-label={t('searchLabel')}
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder={t('searchPlaceholder')}
                className="h-10 w-full rounded-lg border border-paper-line bg-paper-solid pl-9 pr-3 text-sm text-paper-ink transition placeholder:text-paper-muted focus:border-paper-accent"
              />
            </label>
          </div>
        </header>

        <section className="border-b border-gray-200 py-5 dark:border-gray-700" aria-labelledby="archive-tags-heading">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 id="archive-tags-heading" className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {t('filterTags')}
              </h2>
              <span className="text-xs text-gray-400">{tagCounts.length}</span>
            </div>
            <div className="flex shrink-0 items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>{t('articleCount', { count: filteredPosts.length })}</span>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 text-gray-700 underline decoration-gray-300 underline-offset-4 transition hover:text-gray-950 dark:text-gray-200 dark:hover:text-white"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('clearFilters')}
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {visibleTagCounts.map(([tag, count]) => {
              const active = selectedTags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleTag(tag)}
                  className="paper-tag min-h-8"
                >
                  <span>{tag}</span>
                  <span className="text-xs opacity-70">{count}</span>
                </button>
              );
            })}
            {tagCounts.length > 8 && (
              <button
                type="button"
                aria-expanded={showAllTags}
                onClick={() => setShowAllTags((current) => !current)}
                className="inline-flex min-h-8 items-center gap-1 rounded-md px-2 text-sm font-medium text-paper-accent transition-colors hover:bg-paper-inset"
              >
                {showAllTags ? t('showFewerTags') : t('showMoreTags', { count: tagCounts.length - 8 })}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showAllTags ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        </section>

        <main className="pt-7" aria-label={t('archiveLabel')}>
          {yearGroups.length === 0 ? (
            <div className="border-y border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">{t('noPostsFound')}</p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-3 text-sm font-medium text-paper-accent underline underline-offset-4 hover:text-paper-accent-hover"
                >
                  {t('clearFilters')}
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-10">
              {yearGroups.map((group) => (
                <section key={group.year} aria-labelledby={`year-${group.year}`}>
                  <div className="grid grid-cols-[3.5rem_1.5rem_minmax(0,1fr)] md:grid-cols-[4.5rem_1.5rem_minmax(0,1fr)_8rem]">
                    <h2
                      id={`year-${group.year}`}
                      className="text-2xl font-bold leading-10 text-gray-900 dark:text-gray-100 md:text-3xl"
                    >
                      {group.year}
                    </h2>
                    <div className="flex items-center justify-center">
                      <span className="h-3 w-3 rounded-full border-2 border-paper-accent bg-paper-solid" />
                    </div>
                    <p className="flex items-center pl-4 text-sm text-gray-500 dark:text-gray-400 md:pl-5">
                      {t('articleCount', { count: group.posts.length })}
                    </p>
                  </div>

                  <div className="relative before:absolute before:bottom-0 before:left-[4.25rem] before:top-0 before:border-l before:border-dashed before:border-gray-300 dark:before:border-gray-700 md:before:left-[5.25rem]">
                    {group.posts.map((post) => {
                      const date = getDateParts(post.date, locale);

                      return (
                        <article
                          key={post.slug}
                          className="group relative grid min-h-11 grid-cols-[3.5rem_1.5rem_minmax(0,1fr)] md:grid-cols-[4.5rem_1.5rem_minmax(0,1fr)_8rem]"
                        >
                          <time
                            dateTime={post.date}
                            title={date.full}
                            className="flex items-center justify-end pr-3 text-xs tabular-nums text-gray-500 dark:text-gray-400 md:text-sm"
                          >
                            {date.day}
                          </time>
                          <div className="relative z-10 flex items-center justify-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-paper-muted outline outline-4 outline-paper-solid transition-colors group-hover:bg-paper-accent" />
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            aria-label={t('readArticle', { title: post.title })}
                            className="flex min-w-0 items-center py-2 pl-4 pr-2 text-sm font-semibold text-paper-ink transition-colors hover:text-paper-accent focus-visible:z-20 focus-visible:rounded md:pl-5 md:text-base"
                          >
                            <span className="truncate">{post.title}</span>
                          </Link>
                          <div className="hidden min-w-0 items-center justify-end truncate pl-2 text-right text-xs text-gray-400 dark:text-gray-500 md:flex">
                            {post.tags?.length ? post.tags.map((tag) => `#${tag}`).join(' ') : null}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
