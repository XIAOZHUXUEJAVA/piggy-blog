import { getTranslations } from 'next-intl/server';
import { genPageMetadata } from 'app/seo';
import PageHeader from '@/components/ui/PageHeader';
import careerData from '@/data/careerData';
import CareerHistory from '@/components/career/CareerHistory';
import CareerMotion from '@/components/career/CareerMotion';
import CareerProcess from '@/components/career/CareerProcess';
import styles from '@/components/career/CareerPage.module.css';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Career' });
  return genPageMetadata({ title: t('title'), description: t('description') });
}

// Refresh ongoing experience durations without turning a mostly static page into a client component.
export const revalidate = 86400;

export default async function CareerPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'en' ? 'en' : 'zh';
  const t = await getTranslations({ locale, namespace: 'Career' });

  return (
    <CareerMotion className={styles.page}>
      <PageHeader path="~/career" title={t('title')} />
      <CareerProcess entries={careerData} locale={locale} />
      <CareerHistory entries={careerData} now={new Date()} locale={locale} />
    </CareerMotion>
  );
}
