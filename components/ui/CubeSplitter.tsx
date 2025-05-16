'use client';

import { useEffect, useRef, useState } from 'react';

const CubeSplitter = () => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / (windowHeight * 0.5), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const CUBE_SIZE = 80;
  const SPACING = 100;

  // 调整边框颜色透明度
  const cubes = [
    {
      initialPosition: { x: -SPACING, y: -SPACING, z: -SPACING },
      borderColor: 'border-yellow-400/40', // 添加 /40 使颜色更透明
      rotation: 0,
    },
    {
      initialPosition: { x: SPACING, y: -SPACING, z: -SPACING },
      borderColor: 'border-rose-400/40',
      rotation: 90,
    },
    {
      initialPosition: { x: -SPACING, y: -SPACING, z: SPACING },
      borderColor: 'border-blue-400/40',
      rotation: 270,
    },
    {
      initialPosition: { x: SPACING, y: -SPACING, z: SPACING },
      borderColor: 'border-purple-400/40',
      rotation: 180,
    },
  ];

  return (
    <div className="fixed right-[10%] top-[30%] z-[-1] hidden xl:block">
      <div
        ref={cubeRef}
        className="transform-style-3d relative h-[400px] w-[400px] transition-transform duration-300"
        style={{
          transform: `rotateX(${60}deg) rotateZ(${45}deg)`,
        }}
      >
        {cubes.map((cube, index) => (
          <div
            key={index}
            className="transform-style-3d absolute left-1/2 top-1/2 transition-transform duration-700"
            style={{
              width: `${CUBE_SIZE}px`,
              height: `${CUBE_SIZE}px`,
              transform: `
                translate3d(
                  ${cube.initialPosition.x * (1 - scrollProgress)}px,
                  ${cube.initialPosition.y * (1 - scrollProgress) + index * CUBE_SIZE * scrollProgress}px,
                  ${cube.initialPosition.z * (1 - scrollProgress)}px
                )
                translate(-50%, -50%)
                rotateY(${cube.rotation * (1 - scrollProgress)}deg)
              `,
            }}
          >
            {/* 前面 */}
            <div
              className={`absolute h-full w-full transform border ${cube.borderColor} backdrop-blur-[1px]`}
              style={{ transform: `translateZ(${CUBE_SIZE / 2}px)` }}
            />
            {/* 后面 */}
            <div
              className={`absolute h-full w-full transform border ${cube.borderColor} backdrop-blur-[1px]`}
              style={{ transform: `translateZ(-${CUBE_SIZE / 2}px)` }}
            />
            {/* 左面 */}
            <div
              className={`absolute h-full w-[${CUBE_SIZE}px] transform border ${cube.borderColor} backdrop-blur-[1px]`}
              style={{ transform: `translateX(-${CUBE_SIZE / 2}px) rotateY(90deg)` }}
            />
            {/* 右面 */}
            <div
              className={`absolute h-full w-[${CUBE_SIZE}px] transform border ${cube.borderColor} backdrop-blur-[1px]`}
              style={{ transform: `translateX(${CUBE_SIZE / 2}px) rotateY(90deg)` }}
            />
            {/* 上面 */}
            <div
              className={`absolute h-[${CUBE_SIZE}px] w-full transform border ${cube.borderColor} backdrop-blur-[1px]`}
              style={{ transform: `translateY(-${CUBE_SIZE / 2}px) rotateX(90deg)` }}
            />
            {/* 下面 */}
            <div
              className={`absolute h-[${CUBE_SIZE}px] w-full transform border ${cube.borderColor} backdrop-blur-[1px]`}
              style={{ transform: `translateY(${CUBE_SIZE / 2}px) rotateX(90deg)` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CubeSplitter;
