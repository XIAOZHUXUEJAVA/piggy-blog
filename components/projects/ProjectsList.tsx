import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Project, ProjectLocale } from '@/data/projectsData';
import ProjectMeta, { ProjectIcon } from './ProjectMeta';
import styles from './ProjectsPage.module.css';

interface ProjectsListProps {
  projects: Project[];
  locale: ProjectLocale;
}

export default async function ProjectsList({ projects, locale }: ProjectsListProps) {
  const t = await getTranslations({ locale, namespace: 'Projects' });

  return (
    <section className={styles.projectList} aria-label={t('listLabel')}>
      {projects.map((project) => (
        <article key={project.id} className={styles.projectCard}>
          <div className={styles.cardHeading}>
            <ProjectIcon icon={project.icon} />
            <h2 className={styles.title}>
              <Link href={`/projects/${project.slug}`}>
                {project.title[locale]}
                <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </h2>
          </div>
          <p className={styles.summary}>{project.summary[locale]}</p>
          <p className={styles.description}>{project.description[locale]}</p>
          <ProjectMeta project={project} locale={locale} />
        </article>
      ))}
    </section>
  );
}
