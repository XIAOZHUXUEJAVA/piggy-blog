import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function JourneyBackLink() {
  const t = await getTranslations('Career');

  return (
    <nav aria-label={t('backToCareer')} className="mb-8">
      <Link
        href="/career"
        className="inline-flex items-center gap-2 text-sm text-gray-600 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <span aria-hidden="true">←</span>
        {t('backToCareer')}
      </Link>
    </nav>
  );
}
