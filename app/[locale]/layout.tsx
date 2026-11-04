import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { SearchProvider, SearchConfig } from 'pliny/search';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { SectionContainer } from '@/components/ui';
import siteMetadata from '@/data/siteMetadata';
import { routing } from '@/i18n/routing';
import LocaleDocumentLanguage from '@/components/LocaleDocumentLanguage';

const LoadingBar = dynamic(() => import('@/components/ui/LoadingBar'), { ssr: false });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, params.locale)) notFound();
  setRequestLocale(params.locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider key={params.locale} locale={params.locale} messages={messages}>
      <LocaleDocumentLanguage />
      <LoadingBar />
      <SectionContainer>
        <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
          <Header />
          <main className="mb-auto mt-20">{children}</main>
          <Footer />
        </SearchProvider>
      </SectionContainer>
    </NextIntlClientProvider>
  );
}
