'use client';

import { Link } from '@/i18n/navigation';
import { slug } from 'github-slugger';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${slug(text)}`} className="paper-tag" onClick={(e) => e.stopPropagation()}>
      {text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
