import Script from 'next/script';

interface UmamiAnalyticsProps {
  websiteId?: string;
  src?: string;
}

export function UmamiAnalytics({
  websiteId,
  src = '/script.js', // 指向 public/script.js
}: UmamiAnalyticsProps) {
  if (websiteId) {
    return <Script defer data-website-id={websiteId} src={src} strategy="afterInteractive" />;
  }

  return null;
}
