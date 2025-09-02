'use client';

import Link from 'next/link';
import { slug } from 'github-slugger';

interface Props {
  text: string;
}

const SimpleTag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="relative z-20 inline-block rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:from-blue-100 hover:to-purple-100 hover:text-blue-800 hover:shadow-lg dark:from-gray-700 dark:to-gray-600 dark:text-gray-200 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 dark:hover:text-blue-200"
    >
      {text.split(' ').join('-')}
    </Link>
  );
};

export default SimpleTag;
