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
import Link from 'next/link';
import { slug } from 'github-slugger';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-medium uppercase text-gray-700 transition-colors duration-300 hover:bg-primary-500 hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-sky-400 dark:hover:text-white"
    >
      {text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
