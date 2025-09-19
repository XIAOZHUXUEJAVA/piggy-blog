'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Image from '@/components/ui/Image';

const Avatar = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [style, setStyle] = useState<React.CSSProperties>({});

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current || window.innerWidth < 1280) return;

    const { clientX, clientY } = e;
    const { width, height, x, y } = ref.current.getBoundingClientRect();
    const mouseX = Math.abs(clientX - x);
    const mouseY = Math.abs(clientY - y);
    const rotateMin = -15;
    const rotateMax = 15;
    const rotateRange = rotateMax - rotateMin;

    const rotate = {
      x: rotateMax - (mouseY / height) * rotateRange,
      y: rotateMin + (mouseX / width) * rotateRange,
    };

    setStyle({
      transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setStyle({ transform: 'rotateX(0deg) rotateY(0deg)' });
  }, []);

  useEffect(() => {
    const { current } = ref;

    if (!current) return;

    current.addEventListener('mousemove', onMouseMove);
    current.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (!current) return;

      current.removeEventListener('mousemove', onMouseMove);
      current.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [onMouseLeave, onMouseMove]);

  return (
    <div
      className="z-5 group relative scale-100 transition-all duration-300 ease-out hover:z-50 hover:scale-[1.02]"
      style={{ perspective: '800px' }}
      ref={ref}
    >
      {/* 外层装饰环 */}
      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 opacity-20 blur-lg transition-all duration-300 group-hover:opacity-40 group-hover:blur-xl dark:from-blue-800 dark:via-purple-800 dark:to-pink-800" />

      {/* 头像容器 */}
      <div
        style={style}
        className="group-hover:shadow-3xl relative max-h-[430px] overflow-hidden rounded-2xl border-4 border-white/50 shadow-2xl backdrop-blur-sm transition-all duration-300 ease-out group-hover:border-white/70 dark:border-gray-700/50 dark:group-hover:border-gray-600/70"
      >
        <Image
          src={'/static/images/avatar.jpg'}
          alt="avatar"
          width={430}
          height={430}
          className="transition-all duration-300 group-hover:scale-105"
        />

        {/* 悬停时的渐变覆盖层 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* 底部装饰光晕 */}
      <div className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-300/30 via-purple-300/30 to-pink-300/30 blur-xl transition-all duration-300 group-hover:h-12 group-hover:w-full dark:from-blue-800/30 dark:via-purple-800/30 dark:to-pink-800/30" />
    </div>
  );
};

export default Avatar;
