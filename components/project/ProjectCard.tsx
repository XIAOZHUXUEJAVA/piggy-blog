import type { GithubRepository, ProjectCardProps } from '@/types/index';

import { Link, Image } from '@/components/ui';
import { GithubRepo } from '@/components/project';

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, imgSrc, url, repo, builtWith } = project;

  const repository = repo as GithubRepository | undefined;

  const href = repository?.url || url;

  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <div
        className={`${
          imgSrc && 'h-full'
        } group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        }}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-500/10 via-yellow-500/10 to-orange-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <div className="absolute inset-0 rounded-xl ring-1 ring-gray-200 transition-all duration-300 group-hover:ring-2 group-hover:ring-green-400/50 dark:ring-gray-700 dark:group-hover:ring-green-500/50"></div>

        <div className="relative overflow-hidden">
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110 md:h-36 lg:h-60"
            width={1088}
            height={612}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
        <div className="relative z-10 flex flex-1 flex-col p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-400">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
            {repository?.description || description}
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {builtWith?.map((tool, index) => {
              return (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 transition-colors duration-300 group-hover:bg-green-100 group-hover:text-green-700 dark:bg-gray-700 dark:text-gray-300 dark:group-hover:bg-green-900/30 dark:group-hover:text-green-300"
                  style={{
                    background:
                      index % 3 === 0
                        ? 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(255,255,255,0.8) 100%)'
                        : index % 3 === 1
                          ? 'linear-gradient(135deg, rgba(234,179,8,0.1) 0%, rgba(255,255,255,0.8) 100%)'
                          : 'linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(255,255,255,0.8) 100%)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
                  }}
                >
                  {tool}
                </span>
              );
            })}
          </div>
          <div className="mt-auto">
            {repository ? (
              <GithubRepo repo={repository} />
            ) : (
              href && (
                <Link
                  href={href}
                  className="inline-flex items-center text-base font-medium leading-6 text-green-600 transition-all duration-300 hover:text-green-700 group-hover:translate-x-1 dark:text-green-400 dark:hover:text-green-300"
                  aria-label={`Link to ${title}`}
                >
                  Learn more
                  <svg
                    className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
