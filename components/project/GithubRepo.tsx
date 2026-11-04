import find from 'lodash/find';
import { ExternalLink, GitFork, Github, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { GithubRepository } from '@/types/server';

export default function GithubRepo({ repo }: { repo: GithubRepository }) {
  const t = useTranslations('Projects');
  const mainLanguage = find(repo.languages, (language) => language.name !== 'CSS');

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1.5">
          <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: mainLanguage.color }} />
          <span>{mainLanguage.name}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Star size={20} strokeWidth={1} />
          <span>{repo.stargazerCount}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <GitFork size={20} strokeWidth={1} />
          <span>{repo.forkCount}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {repo.homepageUrl && (
          <>
            <a
              href={repo.homepageUrl}
              aria-label={t('viewDemo')}
              title={t('viewDemo')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
            >
              <ExternalLink size={20} strokeWidth={1} />
            </a>
            <span className="text-gray-400 dark:text-gray-500">|</span>
          </>
        )}
        <a
          href={repo.url}
          aria-label={t('viewRepository')}
          title={t('viewRepository')}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-1"
        >
          <Github size={20} strokeWidth={1} />
        </a>
      </div>
    </div>
  );
}
