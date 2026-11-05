import type readingTime from 'reading-time';

export type ReadingTime = ReturnType<typeof readingTime>;

export interface BlogMetaProps {
  date: string;
  readingTime: ReadingTime;
}
