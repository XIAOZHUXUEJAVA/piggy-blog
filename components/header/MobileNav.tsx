'use client';

import { Dialog, Transition } from '@headlessui/react';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Fragment, useState, useEffect, useRef, memo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname as useLocalizedPathname, useRouter as useLocalizedRouter } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import headerNavLinks from '@/data/headerNavLinks';
import clsx from 'clsx';
import { isActivePath } from '@/utils/isActivePath';

const MobileNav = memo(() => {
  const [navShow, setNavShow] = useState(false);
  const navRef = useRef(null);
  const router = useLocalizedRouter();
  const pathname = useLocalizedPathname();
  const t = useTranslations('Navigation');

  const onToggleNav = useCallback(() => {
    setNavShow((status) => {
      if (status) {
        enableBodyScroll(navRef.current);
      } else {
        // Prevent scrolling
        disableBodyScroll(navRef.current);
      }
      return !status;
    });
  }, []);

  // 预加载页面函数
  const handleMouseEnter = useCallback(
    (href: string) => {
      if (typeof window !== 'undefined') {
        router.prefetch(href);
      }
    },
    [router]
  );

  useEffect(() => {
    return clearAllBodyScrollLocks;
  });

  return (
    <>
      {/* 现代化汉堡菜单按钮 */}
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="group relative rounded-lg p-2 transition-colors duration-200 hover:bg-paper-inset lg:hidden"
      >
        <div className="flex h-6 w-6 flex-col items-center justify-center">
          <span
            className={clsx(
              'block h-0.5 w-6 bg-gray-900 transition-all duration-300 ease-out',
              navShow ? 'translate-y-1.5 rotate-45' : '-translate-y-1'
            )}
          />
          <span
            className={clsx(
              'block h-0.5 w-6 bg-gray-900 transition-all duration-300 ease-out',
              navShow ? 'opacity-0' : 'opacity-100'
            )}
          />
          <span
            className={clsx(
              'block h-0.5 w-6 bg-gray-900 transition-all duration-300 ease-out',
              navShow ? '-translate-y-1.5 -rotate-45' : 'translate-y-1'
            )}
          />
        </div>
      </button>
      {/* 现代化侧边栏菜单 */}
      <Transition appear show={navShow} as={Fragment} unmount={false}>
        <Dialog as="div" onClose={onToggleNav} unmount={false}>
          {/* 背景遮罩 */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            unmount={false}
          >
            <div className="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          {/* 侧边栏面板 */}
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
            unmount={false}
          >
            <Dialog.Panel className="paper-popover fixed right-0 top-0 z-70 h-full w-80 max-w-[85vw] border-l">
              {/* 关闭按钮 */}
              <div className="flex justify-end p-4">
                <button
                  className="group relative rounded-full p-3 transition-colors duration-200 hover:bg-paper-inset"
                  aria-label="Close Menu"
                  onClick={onToggleNav}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-600 transition-colors duration-200 group-hover:text-gray-900"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 导航菜单 */}
              <nav ref={navRef} className="flex flex-col space-y-2 overflow-y-auto px-6 pb-6">
                {headerNavLinks.map((link, index) => (
                  <Transition.Child
                    key={link.key}
                    as={Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="opacity-0 translate-x-4"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-4"
                    unmount={false}
                  >
                    <div style={{ transitionDelay: `${index * 50}ms` }}>
                      <Link
                        href={link.href}
                        aria-current={isActivePath(pathname, link.href) ? 'page' : undefined}
                        className={clsx(
                          'group relative flex items-center rounded-xl px-4 py-4 text-lg font-medium transition-all duration-200',
                          'hover:bg-paper-inset hover:text-paper-accent',
                          isActivePath(pathname, link.href) ? 'bg-paper-inset text-paper-accent' : 'text-paper-ink'
                        )}
                        onClick={onToggleNav}
                        onMouseEnter={() => handleMouseEnter(link.href)}
                      >
                        {/* 活跃状态指示器 */}
                        {isActivePath(pathname, link.href) && (
                          <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-paper-accent" />
                        )}

                        <span className="relative z-10 ml-2">{t(link.key)}</span>

                        {/* 悬停箭头 */}
                        <svg
                          className="ml-auto h-5 w-5 translate-x-0 transform opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </Transition.Child>
                ))}
              </nav>

              <div className="px-8 py-3">
                <LanguageSwitcher />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
});

MobileNav.displayName = 'MobileNav';

export default MobileNav;
