'use client';

import { Dialog, Transition } from '@headlessui/react';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Fragment, useState, useEffect, useRef, memo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from '../ui/Link';
import headerNavLinks from '@/data/headerNavLinks';
import clsx from 'clsx';

const MobileNav = memo(() => {
  const [navShow, setNavShow] = useState(false);
  const navRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

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
        className="group relative rounded-lg p-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 sm:hidden"
      >
        <div className="flex h-6 w-6 flex-col items-center justify-center">
          <span
            className={clsx(
              'block h-0.5 w-6 bg-gray-900 transition-all duration-300 ease-out dark:bg-gray-100',
              navShow ? 'translate-y-1.5 rotate-45' : '-translate-y-1'
            )}
          />
          <span
            className={clsx(
              'block h-0.5 w-6 bg-gray-900 transition-all duration-300 ease-out dark:bg-gray-100',
              navShow ? 'opacity-0' : 'opacity-100'
            )}
          />
          <span
            className={clsx(
              'block h-0.5 w-6 bg-gray-900 transition-all duration-300 ease-out dark:bg-gray-100',
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
            <Dialog.Panel className="fixed right-0 top-0 z-70 h-full w-80 max-w-[85vw] border-l border-gray-200/50 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/95">
              {/* 关闭按钮 */}
              <div className="flex justify-end p-4">
                <button
                  className="group relative rounded-full p-3 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Close Menu"
                  onClick={onToggleNav}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-600 transition-colors duration-200 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 导航菜单 */}
              <nav ref={navRef} className="flex flex-col space-y-2 overflow-y-auto px-6 pb-6">
                {headerNavLinks.map((link, index) => (
                  <Transition.Child
                    key={link.title}
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
                        className={clsx(
                          'group relative flex items-center rounded-xl px-4 py-4 text-lg font-medium transition-all duration-200',
                          'hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 dark:hover:from-yellow-900/20 dark:hover:to-orange-900/20',
                          'hover:scale-[1.02] hover:shadow-sm active:scale-[0.98]',
                          pathname === link.href
                            ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 shadow-sm dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-300'
                            : 'text-gray-700 hover:text-yellow-600 dark:text-gray-200 dark:hover:text-yellow-400'
                        )}
                        onClick={onToggleNav}
                        onMouseEnter={() => handleMouseEnter(link.href)}
                      >
                        {/* 活跃状态指示器 */}
                        {pathname === link.href && (
                          <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-yellow-400 to-orange-500" />
                        )}

                        <span className="relative z-10 ml-2">{link.title}</span>

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

              {/* 底部装饰 */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/50 to-transparent dark:from-gray-900/50" />
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
});

MobileNav.displayName = 'MobileNav';

export default MobileNav;
