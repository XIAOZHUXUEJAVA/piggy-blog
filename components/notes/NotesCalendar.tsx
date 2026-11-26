'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import notesData from '@/data/notesData';
import styles from './NotesScrapbook.module.css';

const monthFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timeZone: 'Asia/Shanghai',
});

export default function NotesCalendar({ onSelectNote }: { onSelectNote: (id: string) => void }) {
  const t = useTranslations('Notes');
  // Resolve the current month after hydration so cached HTML never fixes the calendar's date.
  const [currentMonth, setCurrentMonth] = useState<{ year: number; month: number; day: number } | null>(null);

  useEffect(() => {
    const update = () => {
      const parts = monthFormat.formatToParts(new Date());
      const year = Number(parts.find((part) => part.type === 'year')!.value);
      const month = Number(parts.find((part) => part.type === 'month')!.value);
      const day = Number(parts.find((part) => part.type === 'day')!.value);
      setCurrentMonth((previous) =>
        previous?.year === year && previous.month === month && previous.day === day ? previous : { year, month, day }
      );
    };

    update();
    const interval = window.setInterval(update, 60_000);
    window.addEventListener('focus', update);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', update);
    };
  }, []);

  const { year, month } = currentMonth ?? { year: 0, month: 0 };
  const monthStart = currentMonth ? (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7 : 0;
  const daysInMonth = currentMonth ? new Date(Date.UTC(year, month, 0)).getUTCDate() : 0;
  const entryDays = new Map(
    notesData
      .filter((note) => note.date.startsWith(`${year}-${String(month).padStart(2, '0')}-`))
      .map((note) => [Number(note.date.slice(-2)), note] as const)
  );

  return (
    <section className={styles.calendar} aria-label={currentMonth ? t('calendarLabel', { year, month }) : undefined}>
      <p className={styles.calendarMonth}>
        {year || '----'}
        <span> / </span>
        {month ? String(month).padStart(2, '0') : '--'}
      </p>
      <table aria-label={currentMonth ? t('calendarLabel', { year, month }) : undefined}>
        <thead>
          <tr>
            {t('weekdays')
              .split(' ')
              .map((day, index) => (
                <th key={index} scope="col">
                  {day}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil((monthStart + daysInMonth) / 7) }, (_, week) => (
            <tr key={week}>
              {Array.from({ length: 7 }, (_, weekday) => {
                const day = week * 7 + weekday - monthStart + 1;
                const note = entryDays.get(day);
                const isToday = day === currentMonth?.day;
                const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                return (
                  <td key={weekday}>
                    {day > 0 && day <= daysInMonth ? (
                      note ? (
                        <button
                          type="button"
                          className={`${styles.calendarDay} ${styles.recordedDay}`}
                          data-today={isToday}
                          aria-current={isToday ? 'date' : undefined}
                          aria-label={date}
                          aria-controls={`note-${note.id}`}
                          title={`${date} · ${t('calendarJump')}`}
                          onClick={() => onSelectNote(note.id)}
                        >
                          {day}
                        </button>
                      ) : (
                        <span className={styles.calendarDay} data-today={isToday} aria-current={isToday ? 'date' : undefined}>
                          {day}
                        </span>
                      )
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
