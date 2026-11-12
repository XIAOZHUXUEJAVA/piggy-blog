'use client';

import { Link } from '@/i18n/navigation';
import { slug } from 'github-slugger';

interface Props {
  text: string;
}

const SimpleTag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="relative z-20 inline-block rounded-xl bg-gradient-to-r from-green-50 to-yellow-50 px-4 py-2 text-sm font-semibold text-green-700 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:from-green-100 hover:to-orange-100 hover:text-green-800 hover:shadow-lg"
    >
      {text.split(' ').join('-')}
    </Link>
  );
};

export default SimpleTag;
