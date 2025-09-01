import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const cardVariants = cva('rounded-2xl transition-all duration-300 ease-out', {
  variants: {
    variant: {
      default: 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl',
      glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl',
      gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl',
      elevated: 'bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2',
    },
    size: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    interactive: {
      true: 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    interactive: false,
  },
});

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

const EnhancedCard: React.FC<CardProps> = ({ className, variant, size, interactive, children, ...props }) => {
  return (
    <div className={cn(cardVariants({ variant, size, interactive, className }))} {...props}>
      {children}
    </div>
  );
};

export default EnhancedCard;
