import { formatDate } from 'pliny/utils/formatDate';
import { useLocale, useTranslations } from 'next-intl';

import type { BlogMetaProps } from '@/types/index';

import Twemoji from '@/components/ui/Twemoji';

const BlogMeta = ({ date, readingTime }: BlogMetaProps) => {
  const locale = useLocale();
  const t = useTranslations('Post');
  return (
    <dd className="flex-column flex gap-1 font-semibold text-gray-500 dark:text-gray-400">
      <time dateTime={date} className="flex items-center">
        <Twemoji emoji="calendar" />
        <span className="ml-1 md:ml-2">{formatDate(date, locale === 'zh' ? 'zh-CN' : 'en-US')}</span>
      </time>

      <span className="mx-2">{` • `}</span>

      <div className="flex items-center">
        <Twemoji emoji="hourglass-not-done" />
        <span className="ml-1.5 md:ml-2">{t('readingTime', { minutes: Math.ceil(readingTime.minutes) })}</span>
      </div>
    </dd>
  );
};

export default BlogMeta;
