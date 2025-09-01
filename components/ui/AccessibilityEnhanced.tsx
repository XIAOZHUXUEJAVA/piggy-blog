// 可访问性增强组件示例
import React from 'react';

// 跳转到主内容的链接
export const SkipToContent: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only z-50 rounded-md bg-yellow-500 px-4 
               py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4
               focus:outline-none focus:ring-2 focus:ring-yellow-600"
  >
    跳转到主内容
  </a>
);

// 增强的按钮组件
interface AccessibleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  variant?: 'primary' | 'secondary';
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  onClick,
  ariaLabel,
  variant = 'primary',
}) => {
  const baseClasses =
    'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
};
