'use client';

import { useState } from 'react';
import { Comments as CommentsComponent } from 'pliny/comments';

import siteMetadata from '@/data/siteMetadata';

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false);

  if (!siteMetadata.comments?.provider) {
    return null;
  }
  return (
    <>
      {loadComments ? (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      ) : (
        <button
          onClick={() => setLoadComments(true)}
          className="inline-flex items-center rounded-lg border border-orange-200/50 bg-gradient-to-r from-orange-50 to-yellow-50 px-4 py-2 text-sm font-medium text-orange-700 transition-all duration-200 hover:from-orange-100 hover:to-yellow-100 hover:shadow-sm dark:border-orange-700/30 dark:from-orange-900/20 dark:to-yellow-900/20 dark:text-orange-300 dark:hover:from-orange-800/30 dark:hover:to-yellow-800/30"
        >
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
          Load Comments
        </button>
      )}
    </>
  );
}
