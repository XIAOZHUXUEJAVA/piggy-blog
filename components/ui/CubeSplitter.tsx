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

  // 统一立方体的尺寸和初始位置
  const CUBE_SIZE = 80; // 单个立方体的大小
  const SPACING = 100; // 初始间距

  const cubes = [
    {
      initialPosition: { x: -SPACING, y: -SPACING, z: -SPACING },
      color: 'yellow',
      rotation: 0,
    },
    {
      initialPosition: { x: SPACING, y: -SPACING, z: -SPACING },
      color: 'rose',
      rotation: 90,
    },
    {
      initialPosition: { x: -SPACING, y: -SPACING, z: SPACING },
      color: 'blue',
      rotation: 270,
    },
    {
      initialPosition: { x: SPACING, y: -SPACING, z: SPACING },
      color: 'purple',
      rotation: 180,
    },
  ];

  return (
    <div className="fixed right-[10%] top-[30%] z-[-1] hidden xl:block">
      {' '}
      {/* 调整垂直位置 */}
      <div
        ref={cubeRef}
        className="transform-style-3d relative h-[400px] w-[400px] transition-transform duration-300"
        style={{
          transform: `rotateX(${60}deg) rotateZ(${45}deg)`, // 调整整体旋转角度
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
              className={`absolute h-full w-full transform border border-${cube.color}-400/30 bg-gradient-to-br from-${cube.color}-400/20 to-transparent backdrop-blur-sm`}
              style={{ transform: `translateZ(${CUBE_SIZE / 2}px)` }}
            />
            {/* 后面 */}
            <div
              className={`absolute h-full w-full transform border border-${cube.color}-400/30 bg-gradient-to-br from-${cube.color}-400/20 to-transparent backdrop-blur-sm`}
              style={{ transform: `translateZ(-${CUBE_SIZE / 2}px)` }}
            />
            {/* 左面 */}
            <div
              className={`absolute h-full w-[${CUBE_SIZE}px] transform border border-${cube.color}-400/30 bg-gradient-to-br from-${cube.color}-400/20 to-transparent backdrop-blur-sm`}
              style={{ transform: `translateX(-${CUBE_SIZE / 2}px) rotateY(90deg)` }}
            />
            {/* 右面 */}
            <div
              className={`absolute h-full w-[${CUBE_SIZE}px] transform border border-${cube.color}-400/30 bg-gradient-to-br from-${cube.color}-400/20 to-transparent backdrop-blur-sm`}
              style={{ transform: `translateX(${CUBE_SIZE / 2}px) rotateY(90deg)` }}
            />
            {/* 上面 */}
            <div
              className={`absolute h-[${CUBE_SIZE}px] w-full transform border border-${cube.color}-400/30 bg-gradient-to-br from-${cube.color}-400/20 to-transparent backdrop-blur-sm`}
              style={{ transform: `translateY(-${CUBE_SIZE / 2}px) rotateX(90deg)` }}
            />
            {/* 下面 */}
            <div
              className={`absolute h-[${CUBE_SIZE}px] w-full transform border border-${cube.color}-400/30 bg-gradient-to-br from-${cube.color}-400/20 to-transparent backdrop-blur-sm`}
              style={{ transform: `translateY(${CUBE_SIZE / 2}px) rotateX(90deg)` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CubeSplitter;
