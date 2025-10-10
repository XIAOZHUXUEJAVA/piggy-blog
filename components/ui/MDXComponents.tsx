import TOCInline from 'pliny/ui/TOCInline';
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm';
import type { MDXComponents } from 'mdx/types';

import { Link, TableWrapper } from '@/components/ui';
import Pre from '@/components/ui/Pre';
import Image from '@/components/ui/Image';

const components: MDXComponents = {
  Image,
  TOCInline,
  a: Link,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
};

export default components;
