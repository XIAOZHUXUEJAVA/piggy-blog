import { BrandIconType } from '@/components/ui/BrandIcon';

type PopularTag = {
  href: string;
  iconType: BrandIconType;
  slug: string;
  title: string;
};

const popularTags: PopularTag[] = [
  {
    href: '/tags/linux',
    iconType: 'Bash',
    slug: 'database',
    title: 'Linux',
  },
  {
    href: '/tags/ai',
    iconType: 'AI',
    slug: 'devops',
    title: 'AI',
  },
  {
    href: '/tags/docker',
    iconType: 'Docker',
    slug: 'devops',
    title: 'Docker',
  },

  {
    href: '/tags/java',
    iconType: 'Java',
    slug: 'javascript',
    title: 'Java',
  },
];

export default popularTags;
