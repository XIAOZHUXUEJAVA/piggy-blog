import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import NotFoundContent from './[locale]/not-found';

export default async function NotFound() {
  const locale = await getLocale();

  return (
    <NextIntlClientProvider locale={locale} messages={{}}>
      <main id="main-content" tabIndex={-1} className="site-container py-20 focus:outline-none">
        <NotFoundContent />
      </main>
    </NextIntlClientProvider>
  );
}
