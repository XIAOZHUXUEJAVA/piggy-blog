import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { genPageMetadata } from 'app/seo';
import { Link } from '@/i18n/navigation';
import projectsData from '@/data/projectsData';
import ProjectMeta, { ProjectIcon } from '@/components/projects/ProjectMeta';
import styles from '@/components/projects/ProjectsPage.module.css';

interface ProjectPageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return projectsData.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = projectsData.find(({ slug }) => slug === params.slug);
  if (!project) notFound();
  const locale = params.locale === 'en' ? 'en' : 'zh';
  return genPageMetadata({ title: project.title[locale], description: project.description[locale] });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = projectsData.find(({ slug }) => slug === params.slug);
  if (!project) notFound();
  const locale = params.locale === 'en' ? 'en' : 'zh';
  const t = await getTranslations({ locale, namespace: 'Projects' });

  return (
    <article className={`${styles.page} ${styles.detail}`}>
      <Link href="/projects" className={styles.backLink}>
        <ArrowLeft size={16} aria-hidden="true" />
        {t('backToProjects')}
      </Link>
      <header className={styles.detailHeader}>
        <p className={styles.eyebrow}>{t('projectNote')}</p>
        <div className={styles.cardHeading}>
          <ProjectIcon icon={project.icon} />
          <h1 className={styles.pageTitle}>{project.title[locale]}</h1>
        </div>
        <p className={styles.summary}>{project.summary[locale]}</p>
        <ProjectMeta project={project} locale={locale} />
      </header>
      <div className={styles.detailBody}>
        <p className={styles.sampleNote}>{t('sampleNote')}</p>
        <p>{project.description[locale]}</p>
        <h2>{t('goal')}</h2>
        <p>{project.goal[locale]}</p>
        <h2>{t('features')}</h2>
        <ul>
          {project.features.map((feature) => (
            <li key={feature.en}>{feature[locale]}</li>
          ))}
        </ul>
        <h2>{t('next')}</h2>
        <p>{project.next[locale]}</p>
      </div>
    </article>
  );
}
