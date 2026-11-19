'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUp, Flower2, Heart, Leaf, Pencil, Sparkles } from 'lucide-react';
import notesData, { type NoteLocale } from '@/data/notesData';
import styles from './NotesScrapbook.module.css';

const categories = ['all', 'daily', 'thoughts', 'joys'] as const;
type NoteFilter = (typeof categories)[number];
const categoryIcons = { daily: Leaf, thoughts: Pencil, joys: Heart };

function Postcard({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 240 168" role="img" aria-label={label} className={styles.landscape}>
      <rect width="240" height="168" fill="#edeede" />
      <path d="M0 113Q48 68 107 106T240 92V168H0Z" fill="#c6d3b7" />
      <circle cx="177" cy="48" r="21" fill="#e7b68c" />
      <path d="M0 144Q63 88 132 131T240 116V168H0Z" fill="#98ad92" />
      <path d="M98 168Q107 145 140 133T173 119" stroke="#f4edda" strokeWidth="9" fill="none" />
      <g fill="#657f69" stroke="#657f69" strokeLinecap="round" strokeLinejoin="round">
        <path d="M44 129V69M25 103 44 68 63 103ZM28 115 44 87 61 115Z" strokeWidth="3" />
        <path d="M70 138V89M56 116 70 88 85 116ZM57 127 70 105 84 127Z" strokeWidth="2" />
      </g>
      <path d="m27 36 5-3 5 3m9 6 5-3 5 3" fill="none" stroke="#899381" strokeWidth="1.5" />
      <path d="m206 135 2-5m9 11 2-6m-188 12 2-6" stroke="#f1ecd5" strokeWidth="2" />
    </svg>
  );
}

function PigDoodle() {
  return (
    <svg viewBox="0 0 108 100" className={styles.pig} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m29 35-4-21q17 0 23 13m22 1q8-15 18-13l-4 22" fill="var(--notes-rose)" />
        <path d="M23 49q-1-24 32-25 33-1 34 27 1 29-33 29T23 49Z" fill="var(--paper-solid)" />
        <ellipse cx="56" cy="58" rx="16" ry="11" fill="var(--notes-rose)" />
        <path d="M51 57v3m10-3v3m-26-15h1m39-1h1M40 80l-6 8m36-8 7 7" />
        <path d="m8 41 5 2m79-8 6-4m-6 37 6 2" />
      </g>
      <path d="m13 17 2-7 3 7 7 2-7 3-2 7-3-7-7-2Z" fill="var(--paper-accent)" opacity=".55" />
      <ellipse cx="33" cy="56" rx="5" ry="3" fill="var(--notes-rose)" />
      <ellipse cx="79" cy="55" rx="5" ry="3" fill="var(--notes-rose)" />
    </svg>
  );
}

export default function NotesScrapbook({ locale }: { locale: NoteLocale }) {
  const t = useTranslations('Notes');
  const [filter, setFilter] = useState<NoteFilter>('all');
  const visibleNotes = notesData.filter((note) => filter === 'all' || note.category === filter);
  const dateFormat = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-GB', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

  // The calendar belongs to the latest entry's month, so it stays consistent with the scrapbook.
  const [year, month] = notesData[0].date.split('-').map(Number);
  const monthStart = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const entryDays = new Set(
    notesData
      .filter((note) => note.date.startsWith(`${year}-${String(month).padStart(2, '0')}`))
      .map((note) => Number(note.date.slice(-2)))
  );

  return (
    <div className={styles.page} id="notes-top">
      <div className={styles.pageHeader}>
        <span className={styles.path}>~/notes</span>
        <span className={styles.edition}>{t('edition')}</span>
      </div>

      <div className={styles.desk}>
        <aside className={styles.sidebar}>
          <section className={styles.memo} aria-labelledby="notes-memo-title">
            <span className={styles.tape} aria-hidden="true" />
            <Sparkles size={20} className={styles.memoSpark} aria-hidden="true" />
            <h2 id="notes-memo-title">{t('memoTitle')}</h2>
            <ul>
              {(['memoOne', 'memoTwo', 'memoThree'] as const).map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            <span className={styles.memoSign} aria-hidden="true">
              just a little update :)
            </span>
          </section>

          <section className={styles.calendar} aria-labelledby="notes-calendar-title">
            <h2 id="notes-calendar-title">{t('calendarTitle')}</h2>
            <p className={styles.calendarMonth}>
              {year}
              <span> / </span>
              {String(month).padStart(2, '0')}
            </p>
            <table aria-label={t('calendarLabel', { year, month })}>
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
                      return (
                        <td key={weekday}>
                          {day > 0 && day <= daysInMonth ? (
                            <span
                              className={entryDays.has(day) ? styles.recordedDay : undefined}
                              aria-label={
                                entryDays.has(day) ? t('calendarEntry', { date: `${year}-${month}-${day}` }) : undefined
                              }
                            >
                              {day}
                            </span>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.calendarCaption}>{t('calendarCaption')}</p>
          </section>

          <figure className={styles.postcard}>
            <span className={styles.tape} aria-hidden="true" />
            <Postcard label={t('postcardAlt')} />
            <figcaption>{t('postcardCaption')}</figcaption>
          </figure>

          <section className={styles.pocket}>
            <Flower2 size={29} strokeWidth={1.3} aria-hidden="true" />
            <h2>{t('pocketTitle')}</h2>
            <p>{t('pocketText')}</p>
            <span aria-hidden="true">✳</span>
          </section>
        </aside>

        <div className={styles.main}>
          <header className={styles.cover}>
            <span className={styles.coverTape} aria-hidden="true" />
            <p className={styles.eyebrow}>{t('eyebrow')}</p>
            <h1>{t('heading')}</h1>
            <p className={styles.intro}>{t('intro')}</p>
            <p className={styles.welcome}>{t('welcome')}</p>
            <div className={styles.coverBottom}>
              <p>
                {t('signature')}
                <span> — xiaozhu</span>
              </p>
              <div className={styles.stamp} aria-hidden="true">
                <span>{t('stampTop')}</span>
                <span>{t('stampBottom')}</span>
              </div>
            </div>
            <PigDoodle />
            <span className={styles.cornerMark} aria-hidden="true">
              01 / scrapbook
            </span>
          </header>

          <div className={styles.chapterHeader}>
            <h2>
              <span aria-hidden="true">↳ </span>
              {filter === 'all' ? t('chapter') : t(filter)}
            </h2>
            <p role="status" aria-live="polite" aria-atomic="true">
              {t('entryCount', { count: visibleNotes.length })}
            </p>
          </div>

          <div className={styles.entries} id="notes-entries">
            {visibleNotes.map((note) => {
              const text = note.text[locale];
              const Icon = categoryIcons[note.category];
              const number = String(notesData.indexOf(note) + 1).padStart(2, '0');
              return (
                <article
                  key={note.id}
                  id={`note-${note.id}`}
                  className={styles.entry}
                  data-category={note.category}
                  aria-labelledby={`title-${note.id}`}
                >
                  <span className={styles.entryTape} aria-hidden="true" />
                  <div className={styles.entryMeta}>
                    <time dateTime={note.date}>
                      {dateFormat.format(new Date(`${note.date}T00:00:00Z`))}
                      <span> / {note.date.slice(0, 4)}</span>
                    </time>
                    <span className={styles.category}>
                      <Icon size={13} aria-hidden="true" />
                      {t(note.category)}
                    </span>
                  </div>
                  <h3 id={`title-${note.id}`}>{text.title}</h3>
                  <p className={styles.mood}>
                    <span aria-hidden="true">○ </span>
                    {text.mood}
                  </p>
                  <div className={styles.entryBody}>
                    {text.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {text.aside ? (
                    <p className={styles.entryAside}>
                      <Pencil size={14} aria-hidden="true" />
                      {text.aside}
                    </p>
                  ) : null}
                  <div className={styles.entryFooter}>
                    <span aria-label={t('entryNumber', { number })}>— {number} —</span>
                    <Icon size={21} strokeWidth={1.3} aria-hidden="true" />
                  </div>
                </article>
              );
            })}
          </div>

          <footer className={styles.endNote}>
            <Flower2 size={30} strokeWidth={1.2} aria-hidden="true" />
            <p>{t('endTitle')}</p>
            <span>{t('endText')}</span>
            <a href="#notes-top" aria-label={t('backToTop')} title={t('backToTop')}>
              <ArrowUp size={16} aria-hidden="true" />
            </a>
          </footer>
        </div>

        <nav className={styles.filterRail} aria-label={t('filterLabel')}>
          <div className={styles.filters}>
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                aria-pressed={filter === category}
                aria-controls="notes-entries"
                onClick={() => setFilter(category)}
                className={styles.filter}
                data-selected={filter === category}
              >
                <span className={styles.filterNumber} aria-hidden="true">
                  0{index + 1}
                </span>
                <span>{t(category)}</span>
              </button>
            ))}
            <span className={styles.railFlower} aria-hidden="true">
              <Flower2 size={32} strokeWidth={1.2} />
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
}
