'use client';

import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDown, Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Navigation');
  const tLanguages = useTranslations('Languages');

  const handleChange = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Listbox as="div" className="relative" value={locale} onChange={handleChange}>
      <Listbox.Button
        className="flex h-9 items-center gap-1 rounded-md px-2 text-paper-accent transition-colors hover:bg-paper-inset"
        aria-label={t('switchLanguage')}
        title={t('switchLanguage')}
      >
        {({ open }) => (
          <>
            <Languages className="h-[18px] w-[18px]" aria-hidden="true" />
            <ChevronDown
              className={clsx('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')}
              aria-hidden="true"
            />
          </>
        )}
      </Listbox.Button>
      <Listbox.Options className="paper-popover absolute right-0 z-50 mt-3 w-32 rounded-xl p-2 focus:outline-none">
        {routing.locales.map((value) => (
          <Listbox.Option key={value} value={value}>
            {({ active, selected }) => (
              <span
                className={clsx(
                  'flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-colors',
                  active && 'bg-paper-inset',
                  selected ? 'text-paper-accent' : 'text-paper-ink'
                )}
              >
                {tLanguages(value)}
              </span>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
