import { BookOpen, Bot, ExternalLink, Github, Layers3, Terminal } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { Project, ProjectLocale } from '@/data/projectsData';
import styles from './ProjectsPage.module.css';

const icons = { notebook: BookOpen, layers: Layers3, bot: Bot, terminal: Terminal };

export function ProjectIcon({ icon }: { icon: Project['icon'] }) {
  const Icon = icons[icon];
  return <Icon className={styles.projectIcon} size={23} strokeWidth={1.6} aria-hidden="true" />;
}

export default async function ProjectMeta({ project, locale }: { project: Project; locale: ProjectLocale }) {
  const t = await getTranslations({ locale, namespace: 'Projects' });

  return (
    <footer className={styles.cardFooter}>
      <div className={styles.meta}>
        <time dateTime={project.date}>{project.date.slice(0, 7).replace('-', '.')}</time>
        <span className={styles.status} data-status={project.status}>
          <span aria-hidden="true" />
          {t(`status.${project.status}`)}
        </span>
        {project.links.map((link) => {
          const Icon = link.type === 'github' ? Github : ExternalLink;
          return (
            <a
              key={`${link.type}-${link.url}`}
              href={link.url}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title[locale]} · ${t(`link.${link.type}`)}`}
            >
              <Icon size={13} aria-hidden="true" />
              {t(`link.${link.type}`)}
            </a>
          );
        })}
      </div>
      <ul className={styles.tags} aria-label={t('tagsLabel')}>
        {project.tags.map((tag) => (
          <li key={tag} className={styles.tag}>
            {tag}
          </li>
        ))}
      </ul>
    </footer>
  );
}
