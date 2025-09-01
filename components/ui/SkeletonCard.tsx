import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="rounded-2xl bg-gray-200 p-6 dark:bg-gray-700">
        <div className="space-y-4">
          {/* 日期骨架 */}
          <div className="h-6 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>

          {/* 标题骨架 */}
          <div className="space-y-2">
            <div className="h-8 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-8 w-1/2 rounded bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* 标签骨架 */}
          <div className="flex space-x-2">
            <div className="h-6 w-16 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-6 w-20 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-6 w-14 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* 摘要骨架 */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* 阅读更多骨架 */}
          <div className="h-5 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
