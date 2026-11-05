/* eslint-disable jsx-a11y/anchor-has-content */
import { Link as NextLink } from '@/i18n/navigation';
import type { LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

const Link = ({
  href,
  ...rest
}: Omit<LinkProps, 'href' | 'locale'> & AnchorHTMLAttributes<HTMLAnchorElement> & { locale?: string }) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (href && isInternalLink) {
    return <NextLink className="break-words" href={href} {...rest} />;
  }

  if (isAnchorLink) {
    return <a className="break-words" href={href} {...rest} />;
  }

  return <a className="break-words" target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};

export default Link;
