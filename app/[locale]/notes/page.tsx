import { getTranslations } from 'next-intl/server';
import { genPageMetadata } from 'app/seo';
import NotesScrapbook from '@/components/notes/NotesScrapbook';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Notes' });
  return genPageMetadata({ title: t('title'), description: t('description') });
}

export default function NotesPage({ params }: { params: { locale: string } }) {
  return <NotesScrapbook locale={params.locale === 'en' ? 'en' : 'zh'} />;
}
