import 'css/tailwind.css';
import 'css/chinese-fonts.css';
import 'css/paper-theme.css';
import 'css/paper-palettes.css';
import 'remark-github-blockquote-alert/alert.css';

import { Metadata } from 'next';
import localFont from 'next/font/local';

import siteMetadata from '@/data/siteMetadata';

import PageEffects from '@/components/ui/PageEffects';
import { defaultPalette, paletteInitScript } from '@/utils/palettes';
import { backgroundInitScript } from '@/utils/paperBackground';

const FONT_MAPLE_MONO = localFont({
  src: [
    { path: './fonts/maple-mono/maple-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/maple-mono/maple-mono-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/maple-mono/maple-mono-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/maple-mono/maple-mono-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  preload: false,
  fallback: [],
  adjustFontFallback: false,
  variable: '--font-maple-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || '';

  return (
    <html
      lang="zh-CN"
      className={`${FONT_MAPLE_MONO.variable} scroll-smooth`}
      data-palette={defaultPalette}
      data-paper-background="on"
      suppressHydrationWarning
    >
      <head>
        <link rel="apple-touch-icon" sizes="76x76" href={`${basePath}/static/favicons/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/tennis-racquet.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/tennis-racquet.png" />
        <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
        <link rel="mask-icon" href={`${basePath}/static/favicons/safari-pinned-tab.svg`} color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#fdfdf9" />
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
        <script dangerouslySetInnerHTML={{ __html: paletteInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: backgroundInitScript }} />
      </head>
      <body className="isolate pl-[calc(100vw-100%)] antialiased">
        <PageEffects />
        {children}
      </body>
    </html>
  );
}
