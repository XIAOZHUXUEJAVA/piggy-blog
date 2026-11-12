'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Comments as CommentsComponent } from 'pliny/comments';

import siteMetadata from '@/data/siteMetadata';

export default function Comments({ slug }: { slug: string }) {
  const locale = useLocale();
  const t = useTranslations('Post');
  const [loadComments, setLoadComments] = useState(false);

  if (!siteMetadata.comments?.provider) {
    return null;
  }
  const commentsConfig =
    siteMetadata.comments.provider === 'giscus'
      ? {
          ...siteMetadata.comments,
          giscusConfig: { ...siteMetadata.comments.giscusConfig, lang: locale === 'zh' ? 'zh-CN' : 'en' },
        }
      : siteMetadata.comments;
  return (
    <>
      {loadComments ? (
        <CommentsComponent key={locale} commentsConfig={commentsConfig} slug={slug} />
      ) : (
        <button onClick={() => setLoadComments(true)} className="paper-button">
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
          {t('loadComments')}
        </button>
      )}
    </>
  );
}
