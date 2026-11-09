import type { CareerEntry } from '@/data/careerData';

export function monthIndex(value: string): number {
  const [year, month] = value.split('-').map(Number);
  return year * 12 + month - 1;
}

export function currentMonthIndex(now: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'numeric',
  }).formatToParts(now);
  const year = Number(parts.find((part) => part.type === 'year')?.value);
  const month = Number(parts.find((part) => part.type === 'month')?.value);
  return year * 12 + month - 1;
}

export function elapsedMonths(entry: CareerEntry, now: Date): number {
  return Math.max(0, (entry.end ? monthIndex(entry.end) : currentMonthIndex(now)) - monthIndex(entry.start) + 1);
}

export function formatDuration(months: number, locale: string): string {
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  if (locale === 'zh')
    return [years ? `${years} 年` : '', remaining || !years ? `${remaining} 个月` : ''].filter(Boolean).join(' ');
  return [years ? `${years}y` : '', remaining || !years ? `${remaining}m` : ''].filter(Boolean).join(' ');
}

// Count overlapping jobs once, and exclude education and personal projects.
export function workingMonths(entries: CareerEntry[], now: Date): number {
  const months = new Set<number>();
  const current = currentMonthIndex(now);
  for (const entry of entries.filter((item) => item.kind === 'work')) {
    const end = Math.min(entry.end ? monthIndex(entry.end) : current, current);
    for (let month = monthIndex(entry.start); month <= end; month++) months.add(month);
  }
  return months.size;
}

export function formatMonth(value: string, locale: string): string {
  const [year, month] = value.split('-').map(Number);
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function stackChanges(entries: CareerEntry[]): Map<string, { name: string; added: boolean }[]> {
  const changes = new Map<string, { name: string; added: boolean }[]>();
  const seen = new Set<string>();
  const sorted = [...entries].sort((a, b) => monthIndex(a.start) - monthIndex(b.start) || a.id.localeCompare(b.id));
  for (const entry of sorted) {
    changes.set(
      entry.id,
      entry.stack.map((name) => {
        const added = !seen.has(name);
        seen.add(name);
        return { name, added };
      })
    );
  }
  return changes;
}

export interface CareerBar {
  entry: CareerEntry;
  track: number;
  left: number;
  width: number;
}

export function careerRuler(entries: CareerEntry[], now: Date) {
  const current = currentMonthIndex(now);
  const sorted = [...entries]
    .filter((entry) => monthIndex(entry.start) <= current)
    .sort((a, b) => monthIndex(a.start) - monthIndex(b.start));
  if (!sorted.length) return { years: [], bars: [] as CareerBar[], tracks: 0, nowLeft: 0 };

  const firstYear = Math.floor(monthIndex(sorted[0].start) / 12);
  const lastYear = Math.floor(current / 12);
  const from = firstYear * 12;
  const span = (lastYear - firstYear + 1) * 12;
  const tracks: number[] = [];
  const bars = sorted.map((entry) => {
    const start = monthIndex(entry.start);
    const end = Math.min(entry.end ? monthIndex(entry.end) + 1 : current + 1, current + 1);
    let track = tracks.findIndex((trackEnd) => trackEnd <= start);
    if (track < 0) track = tracks.length;
    tracks[track] = end;
    return { entry, track, left: ((start - from) / span) * 100, width: ((end - start) / span) * 100 };
  });
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, index) => firstYear + index);
  return { years, bars, tracks: tracks.length, nowLeft: ((current + 1 - from) / span) * 100 };
}

export interface GraphRow {
  entry: CareerEntry;
  type: 'commit' | 'merge';
  month: number;
  lane: 0 | 1;
  lanes: { up: boolean; down: boolean }[];
}

// Career data is shown as a Git metaphor; these IDs are decorative, not repository commits.
export function careerHash(id: string): string {
  let value = 0;
  for (const character of id) value = (Math.imul(value, 31) + character.charCodeAt(0)) | 0;
  return (value >>> 0).toString(16).padStart(8, '0').slice(-7);
}

export function careerGraph(entries: CareerEntry[]): GraphRow[] {
  const events: Omit<GraphRow, 'lanes'>[] = [];
  for (const entry of entries) {
    events.push({ entry, type: 'commit', month: monthIndex(entry.start), lane: entry.kind === 'education' ? 1 : 0 });
    if (entry.kind === 'education' && entry.end) {
      events.push({ entry, type: 'merge', month: monthIndex(entry.end), lane: 0 });
    }
  }
  events.sort(
    (a, b) =>
      b.month - a.month || (a.type === b.type ? a.entry.id.localeCompare(b.entry.id) : a.type === 'merge' ? -1 : 1)
  );

  const mainEvents = events.flatMap((event, index) => (event.lane === 0 ? [index] : []));
  const firstMain = mainEvents[0] ?? -1;
  const lastMain = mainEvents.at(-1) ?? -1;
  const branches = entries
    .filter((entry) => entry.kind === 'education')
    .map((entry) => ({
      start: events.findIndex((event) => event.entry.id === entry.id && event.type === 'commit'),
      merge: events.findIndex((event) => event.entry.id === entry.id && event.type === 'merge'),
    }));

  return events.map((event, index) => {
    return {
      ...event,
      lanes: [
        { up: index > firstMain && index <= lastMain, down: index >= firstMain && index < lastMain },
        {
          up: branches.some((branch) => index > branch.merge && index <= branch.start),
          down: branches.some((branch) => index >= branch.merge && index < branch.start),
        },
      ],
    };
  });
}
