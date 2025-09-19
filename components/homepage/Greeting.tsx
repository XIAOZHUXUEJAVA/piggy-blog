'use client';

import { useEffect, useState } from 'react';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';

const Greeting = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setIsVisible(true);

    // 获取当前时间并设置问候语
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      let greeting = '';

      if (hour < 6) greeting = '🌙 Good night';
      else if (hour < 12) greeting = '🌅 Good morning';
      else if (hour < 18) greeting = '☀️ Good afternoon';
      else greeting = '🌆 Good evening';

      setCurrentTime(greeting);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // 每分钟更新一次

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* 背景装饰层 */}
      <div className="absolute inset-0 -z-10">
        {/* 动态渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-60 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20" />

        {/* 浮动装饰元素 */}
        <div className="absolute -left-4 -top-4 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-3xl dark:from-blue-800/30 dark:to-purple-800/30" />
        <div className="absolute -right-8 top-8 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-pink-200/30 to-yellow-200/30 blur-2xl [animation-delay:1s] dark:from-pink-800/30 dark:to-yellow-800/30" />
        <div className="absolute bottom-0 left-1/2 h-20 w-20 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-br from-green-200/30 to-teal-200/30 blur-2xl [animation-delay:2s] dark:from-green-800/30 dark:to-teal-800/30" />
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 py-12 text-center md:py-16">
        {/* 时间问候语 */}
        <div
          className={`mb-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 shadow-lg backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            {currentTime}
          </div>
        </div>

        {/* 主标题 */}
        <div
          className={`transform transition-all delay-300 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            <RoughNotationGroup show={isVisible}>
              {/* Hello 部分 */}
              <div className="mb-2">
                <RoughNotation
                  type="highlight"
                  color="#3b82f6"
                  animationDelay={800}
                  animationDuration={1200}
                  padding={[8, 16]}
                >
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                    Hello
                  </span>
                </RoughNotation>
                <span className="ml-3 text-gray-800 dark:text-gray-200">everyone!</span>
              </div>

              {/* 副标题 */}
              <div className="text-2xl font-medium text-gray-600 dark:text-gray-400 md:text-3xl lg:text-4xl">
                <span>I'm here to share my </span>
                <RoughNotation
                  type="underline"
                  color="#f59e0b"
                  animationDelay={1500}
                  animationDuration={1000}
                  strokeWidth={3}
                >
                  <span className="text-gray-800 dark:text-gray-200">learning journey</span>
                </RoughNotation>
                <span> and </span>
                <RoughNotation
                  type="circle"
                  color="#10b981"
                  animationDelay={2200}
                  animationDuration={1000}
                  padding={[4, 8]}
                >
                  <span className="text-gray-800 dark:text-gray-200">insights</span>
                </RoughNotation>
              </div>
            </RoughNotationGroup>
          </h1>
        </div>

        {/* 装饰性分割线 */}
        {/* <div
          className={`mx-auto mt-8 transform transition-all delay-700 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
        </div> */}

        {/* 欢迎描述 */}
        <div
          className={`mt-8 transform transition-all delay-1000 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 md:text-xl">
            Welcome to my digital space where I document my coding adventures, share technical insights, and connect
            with fellow developers.
          </p>
        </div>

        {/* 互动元素 */}
        <div
          className={`delay-1200 mt-10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {/* 技能标签 */}
            {['Java', 'Go', 'TypeScript', 'Linux'].map((skill, index) => (
              <div
                key={skill}
                className="group relative overflow-hidden rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-gray-800/60 dark:text-gray-300"
                style={{ animationDelay: `${1400 + index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/0 via-blue-100/50 to-blue-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-400/0 dark:via-blue-400/20 dark:to-blue-400/0" />
                <span className="relative z-10">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部波浪装饰 */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 opacity-30 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800" />
    </div>
  );
};

export default Greeting;
