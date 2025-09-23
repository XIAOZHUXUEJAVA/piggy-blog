import { genPageMetadata } from 'app/seo';

import projectsData from '@/data/projectsData';
import { fetchRepoData } from '@/servers/github.server';
import ProjectCard from '@/components/project/ProjectCard';

export const metadata = genPageMetadata({ title: 'Projects' });

export default async function Projects() {
  await Promise.all(
    projectsData.map(async (p) => {
      if (p.repo && typeof p.repo === 'string') {
        p.repo = await fetchRepoData(p.repo as string);
      }
    })
  );

  const description = 'My personal side projects';

  // const workProjects = projectsData.filter(({ type }) => type === 'work');
  const sideProjects = projectsData.filter(({ type }) => type === 'self');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-green-200/30 to-yellow-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-yellow-200/30 to-orange-200/30 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-block">
            <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white md:text-7xl">Projects</h1>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-green-500 to-yellow-500 shadow-lg"></div>
          </div>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">{description}</p>
        </div>

        {/* <div className="container py-12">
          <h3 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Work
          </h3>
          <div className="-m-4 flex flex-wrap">
            {workProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div> */}

        <div className="py-12">
          {/* <h3 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-gray-200">Side projects</h3> */}
          <div className="-m-4 flex flex-wrap">
            {sideProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
