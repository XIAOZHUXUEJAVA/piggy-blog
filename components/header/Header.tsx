'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';

import Link from '@/components/ui/Link';
import { useRouter } from 'next/navigation';
import { memo, useCallback } from 'react';

import Logo from 'public/static/images/logo.svg';

import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
// import SearchButton from './SearchButton';
import AnalyticsLink from './AnalyticsLink';

const Header = memo(() => {
  const pathname = usePathname();
  const router = useRouter();

  // 预加载页面函数
  const handleMouseEnter = useCallback(
    (href: string) => {
      if (typeof window !== 'undefined') {
        router.prefetch(href);
      }
    },
    [router]
  );

  let headerClass =
    'supports-backdrop-blur fixed left-0 right-0 top-0 z-40 bg-white/75 py-4 backdrop-blur dark:bg-dark/75';

  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50';
  }

  return (
    <header className={headerClass}>
      <div className="mx-auto flex max-w-4xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
        <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
          <div className="animate-wave">
            <Logo className="fill-dark dark:fill-white" />
          </div>
          <div className="group ml-2 text-xl font-bold transition duration-300">
            PiggyBlog
            <span className="block h-0.5 max-w-0 bg-black transition-all duration-500 group-hover:max-w-[85%] dark:bg-white"></span>
          </div>
        </Link>
        <div className="flex items-center gap-3 text-base leading-5">
          <div className="hidden sm:block">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                data-umami-event={`nav-${link.href.replace('/', '')}`}
                onMouseEnter={() => handleMouseEnter(link.href)}
                className={clsx(
                  'group relative mx-2 rounded-lg px-3 py-2 font-medium transition-all duration-200',
                  'hover:text-yellow-600 dark:hover:text-yellow-400',
                  pathname === link.href ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-900 dark:text-gray-100'
                )}
              >
                <span className="relative z-10">{link.title}</span>
                {/* 背景动画效果 */}
                <span
                  className={clsx(
                    'absolute inset-0 -z-10 rounded-lg transition-all duration-200',
                    'bg-gradient-to-r from-yellow-100/0 via-yellow-100/25 to-yellow-100/0',
                    'dark:from-yellow-900/0 dark:via-yellow-900/25 dark:to-yellow-900/0',
                    'opacity-0 group-hover:opacity-100'
                  )}
                />
                {/* 底部下划线动画 */}
                <span
                  className={clsx(
                    'absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transform',
                    'bg-gradient-to-r from-yellow-400 to-yellow-600',
                    'transition-transform duration-300 ease-out',
                    'group-hover:scale-x-100',
                    pathname === link.href ? 'scale-x-100' : ''
                  )}
                />
              </Link>
            ))}
          </div>
          <div
            role="separator"
            data-orientation="vertical"
            className="hidden h-4 w-px shrink-0 bg-gray-200 dark:bg-gray-600 md:block"
          />
          <div className="flex items-center">
            <AnalyticsLink />
            <ThemeSwitch />
            {/* <SearchButton /> */}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
