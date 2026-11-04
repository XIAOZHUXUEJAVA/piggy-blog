'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Navigation');
  const nextLocale = locale === 'zh' ? 'en' : 'zh';

  return (
    <button
      type="button"
      aria-label={locale === 'zh' ? t('switchToEnglish') : t('switchToChinese')}
      title={locale === 'zh' ? t('switchToEnglish') : t('switchToChinese')}
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className="rounded-md px-2 py-1 text-sm font-semibold text-gray-700 transition-colors hover:text-yellow-600 dark:text-gray-200 dark:hover:text-yellow-400"
    >
      {locale === 'zh' ? 'EN' : '中文'}
    </button>
  );
}
