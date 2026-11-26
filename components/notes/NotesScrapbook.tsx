'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Cloud, Flower2, Heart, Leaf, Pencil, Sprout, Sun, Sunset, Wind } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import notesData, { type NoteLocale } from '@/data/notesData';
import NotesCalendar from './NotesCalendar';
import styles from './NotesScrapbook.module.css';

const categories = ['all', 'daily', 'thoughts', 'joys'] as const;
type NoteFilter = (typeof categories)[number];
const categoryIcons = { daily: Leaf, thoughts: Pencil, joys: Heart };
const moodIcons = { sun: Sun, cloud: Cloud, heart: Heart, sprout: Sprout, wind: Wind, sunset: Sunset };

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
      <ellipse cx="33" cy="56" rx="5" ry="3" fill="var(--notes-rose)" />
      <ellipse cx="79" cy="55" rx="5" ry="3" fill="var(--notes-rose)" />
    </svg>
  );
}

function SpinningDisc() {
  return (
    <div className={styles.disc} aria-hidden="true">
      <svg viewBox="0 0 160 160" fill="none" stroke="currentColor">
        <circle cx="80" cy="80" r="77.5" opacity=".37" />
        <circle cx="80" cy="80" r="15" opacity=".3" />
        <circle cx="80" cy="80" r="9" opacity=".42" />
        <path
          d="M19 70a62 62 0 0 1 20-36m-16 39a58 58 0 0 1 17-34m78 86a59 59 0 0 1-31 13"
          strokeLinecap="round"
          opacity=".32"
        />
      </svg>
    </div>
  );
}

export default function NotesScrapbook({ locale }: { locale: NoteLocale }) {
  const t = useTranslations('Notes');
  const [filter, setFilter] = useState<NoteFilter>('all');
  const chapterMarker = useRef<HTMLSpanElement>(null);
  const [isChapterPinned, setIsChapterPinned] = useState(false);
  const [navigationRequest, setNavigationRequest] = useState<{ id: string } | null>(null);
  const [highlightedNote, setHighlightedNote] = useState<string | null>(null);

  useEffect(() => {
    const marker = chapterMarker.current;
    if (!marker) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsChapterPinned(!entry.isIntersecting && entry.boundingClientRect.top < (entry.rootBounds?.top ?? 88));
      },
      { rootMargin: '-88px 0px 0px 0px', threshold: 0 }
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  const selectCalendarNote = (id: string) => {
    setFilter('all');
    setHighlightedNote(null);
    setNavigationRequest({ id });
  };

  useEffect(() => {
    if (!navigationRequest) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Let filtered cards finish expanding before measuring the destination's position.
    const scrollTimer = window.setTimeout(
      () => {
        const article = document.getElementById(`note-${navigationRequest.id}`);
        if (!article) return;
        article.focus({ preventScroll: true });
        article.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
        setHighlightedNote(navigationRequest.id);
      },
      reducedMotion ? 0 : 320
    );
    const highlightTimer = window.setTimeout(() => setHighlightedNote(null), 3500);
    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(highlightTimer);
    };
  }, [navigationRequest]);
  const visibleNotes = notesData.filter((note) => filter === 'all' || note.category === filter);
  const dateFormat = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-GB', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div className={styles.page} id="notes-top">
      <div className={styles.pageHeader}>
        <PageHeader path="~/notes" />
        <span className={styles.edition}>{t('edition')}</span>
      </div>

      <div className={styles.desk}>
        <aside className={styles.sidebar}>
          <section className={styles.memo} aria-labelledby="notes-memo-title">
            <span className={styles.tape} aria-hidden="true" />
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

          <NotesCalendar onSelectNote={selectCalendarNote} />

          <figure className={styles.postcard}>
            <span className={styles.tape} aria-hidden="true" />
            <Postcard label={t('postcardAlt')} />
            <figcaption>{t('postcardCaption')}</figcaption>
          </figure>
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
              <SpinningDisc />
            </div>
            <PigDoodle />
            <span className={styles.cornerMark} aria-hidden="true">
              01 / scrapbook
            </span>
          </header>

          <div className={styles.chapterHeader} data-pinned={isChapterPinned}>
            <span ref={chapterMarker} className={styles.chapterMarker} aria-hidden="true" />
            <nav className={styles.filters} aria-label={t('filterLabel')}>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={filter === category}
                  aria-controls="notes-entries"
                  onClick={() => setFilter(category)}
                  className={styles.filter}
                  data-selected={filter === category}
                >
                  {t(category)}
                </button>
              ))}
            </nav>
            <p role="status" aria-live="polite" aria-atomic="true">
              {t('entryCount', { count: visibleNotes.length })}
            </p>
          </div>

          <div className={styles.entries} id="notes-entries">
            {notesData.map((note, index) => {
              const text = note.text[locale];
              const Icon = categoryIcons[note.category];
              const MoodIcon = moodIcons[note.moodIcon];
              const number = String(index + 1).padStart(2, '0');
              const isVisible = visibleNotes.includes(note);
              return (
                <div key={note.id} className={styles.entrySlot} data-visible={isVisible} aria-hidden={!isVisible}>
                  <div className={styles.entryContent}>
                    <article
                      id={`note-${note.id}`}
                      className={styles.entry}
                      data-category={note.category}
                      data-calendar-selected={highlightedNote === note.id}
                      aria-labelledby={`title-${note.id}`}
                      tabIndex={-1}
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
                        <MoodIcon size={16} strokeWidth={1.5} aria-hidden="true" />
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
                          <span>{text.aside}</span>
                        </p>
                      ) : null}
                      <div className={styles.entryFooter}>
                        <span aria-label={t('entryNumber', { number })}>— {number} —</span>
                        <Icon size={21} strokeWidth={1.3} aria-hidden="true" />
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>

          <footer className={styles.endNote}>
            <Flower2 size={30} strokeWidth={1.2} aria-hidden="true" />
            <p>{t('endTitle')}</p>
            <span>{t('endText')}</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
