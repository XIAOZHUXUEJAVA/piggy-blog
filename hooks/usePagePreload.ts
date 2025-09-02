'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export const usePagePreload = () => {
  const router = useRouter();

  const preloadPage = useCallback(
    (href: string) => {
      router.prefetch(href);
    },
    [router]
  );

  // 预加载主要页面
  useEffect(() => {
    const mainPages = ['/', '/blog', '/about', '/projects', '/tags'];
    mainPages.forEach((page) => {
      router.prefetch(page);
    });
  }, [router]);

  return { preloadPage };
};
