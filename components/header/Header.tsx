'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/navigation';

import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';

import { memo, useCallback } from 'react';

import Logo from 'public/static/images/logo.svg';

import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import LanguageSwitcher from './LanguageSwitcher';

const Header = memo(() => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Navigation');

  // 预加载页面函数
  const handleMouseEnter = useCallback(
    (href: string) => {
      if (typeof window !== 'undefined') {
        router.prefetch(href);
      }
    },
    [router]
  );

  let headerClass = 'paper-header supports-backdrop-blur fixed left-0 right-0 top-0 z-40 py-4 backdrop-blur';

  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50';
  }

  return (
    <header className={headerClass}>
      <div className="site-container flex items-center justify-between">
        <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
          <div className="animate-wave">
            <Logo className="fill-paper-ink" />
          </div>
          <div className="group ml-2 text-xl font-bold transition duration-300">
            PiggyBlog
            <span className="block h-0.5 max-w-0 bg-paper-accent transition-all duration-500 group-hover:max-w-[85%]"></span>
          </div>
        </Link>
        <div className="flex items-center gap-3 text-base leading-5">
          <div className="hidden lg:block">
            {headerNavLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                onMouseEnter={() => handleMouseEnter(link.href)}
                className="paper-nav-link group relative mx-2 rounded-lg px-3 py-2 font-medium transition-colors duration-200"
              >
                <span className="relative z-10">{t(link.key)}</span>
                {/* 背景动画效果 */}
                <span className="paper-nav-hover absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                {/* 底部下划线动画 */}
                <span
                  className={clsx(
                    'paper-nav-underline absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transform',
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
            className="hidden h-4 w-px shrink-0 bg-paper-line md:block"
          />
          <div className="flex items-center">
            <LanguageSwitcher />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
