import Script from 'next/script.js';

interface UmamiAnalyticsProps {
  websiteId?: string;
  src?: string;
}

// export function UmamiAnalytics({ websiteId, src = '/stats/script.js' }: UmamiAnalyticsProps) {
export function UmamiAnalytics({
  websiteId,
  src = 'https://umami-88h8yr28f-xiaozhuxuejavas-projects.vercel.app/script.js',
}: UmamiAnalyticsProps) {
  if (websiteId) {
    return <Script defer data-website-id={websiteId} src={src} />;
  }

  return null;
}
