// import Link from 'next/link';
// import { slug } from 'github-slugger';
// interface Props {
//   text: string;
// }

// const Tag = ({ text }: Props) => {
//   return (
//     <Link
//       href={`/tags/${slug(text)}`}
//       className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
//     >
//       {text.split(' ').join('-')}
//     </Link>
//   );
// };

// export default Tag;
'use client';

import Link from 'next/link';
import { slug } from 'github-slugger';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="relative inline-block rounded-xl bg-gradient-to-r from-green-50 to-yellow-50 px-4 py-2 text-sm font-semibold text-green-700 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:from-green-100 hover:to-orange-100 hover:text-green-800 hover:shadow-lg dark:from-green-900/20 dark:to-yellow-900/20 dark:text-green-300 dark:hover:from-green-800/40 dark:hover:to-orange-800/40 dark:hover:text-green-200"
      onClick={(e) => e.stopPropagation()}
    >
      {text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
