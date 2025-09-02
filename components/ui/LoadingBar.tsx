'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const LoadingBar = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="h-full animate-pulse bg-gradient-to-r from-blue-600 to-purple-600" />
    </div>
  );
};

export default LoadingBar;
