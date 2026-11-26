import { getTranslations } from 'next-intl/server';
import { genPageMetadata } from 'app/seo';
import PageHeader from '@/components/ui/PageHeader';
import projectsData from '@/data/projectsData';
import ProjectsList from '@/components/projects/ProjectsList';
import styles from '@/components/projects/ProjectsPage.module.css';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Projects' });
  return genPageMetadata({ title: t('title'), description: t('description') });
}

export default async function ProjectsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'en' ? 'en' : 'zh';
  const t = await getTranslations({ locale, namespace: 'Projects' });

  return (
    <div className={styles.page}>
      <PageHeader path="~/projects" title={t('title')} />
      <div className={styles.shelfMeta}>
        <span>{t('count', { count: projectsData.length })}</span>
        <span className={styles.sampleNote}>{t('sampleNote')}</span>
      </div>
      <ProjectsList projects={projectsData} locale={locale} />
    </div>
  );
}
