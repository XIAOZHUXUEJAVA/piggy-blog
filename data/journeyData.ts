export interface JourneyEntry {
  slug: string;
  // The experience date is independent of the article's publication date.
  date: string;
  variant: 'plain' | 'card' | 'featured';
}

const journeyData: JourneyEntry[] = [
  { slug: 'journey/digital-garden', date: '2026-10-13', variant: 'card' },
  { slug: 'journey/independent-product', date: '2026-04-16', variant: 'featured' },
  { slug: 'journey/backend-foundations', date: '2025-09-19', variant: 'plain' },
  { slug: 'journey/ai-workflow', date: '2025-03-03', variant: 'card' },
  { slug: 'journey/first-refactor', date: '2024-06-24', variant: 'featured' },
  { slug: 'journey/first-job', date: '2023-07-03', variant: 'plain' },
];

export default journeyData;
