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
      className="rounded-md px-2 py-1 text-sm font-semibold text-paper-ink transition-colors hover:text-paper-accent"
    >
      {locale === 'zh' ? 'EN' : '中文'}
    </button>
  );
}
