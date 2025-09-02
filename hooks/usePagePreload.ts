'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const usePagePreload = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const preloadPage = useCallback(
    (href: string) => {
      if (mounted && typeof window !== 'undefined') {
        router.prefetch(href);
      }
    },
    [router, mounted]
  );

  // 预加载主要页面
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const mainPages = ['/', '/blog', '/about', '/projects', '/tags'];
    mainPages.forEach((page) => {
      router.prefetch(page);
    });
  }, [router, mounted]);

  return { preloadPage };
};
