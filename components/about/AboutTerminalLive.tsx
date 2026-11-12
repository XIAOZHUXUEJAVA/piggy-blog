'use client';

import { useContext, useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Clock3 } from 'lucide-react';
import { lifeClock } from '@/utils/lifeClock';
import { AboutExploreContext } from './AboutMotion';
import styles from './AboutPage.module.css';

const clockFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Shanghai',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

export function TerminalCommand() {
  const t = useTranslations('AboutProfile');
  const revealExplore = useContext(AboutExploreContext);
  const hintId = useId();
  const [command, setCommand] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [caret, setCaret] = useState({ position: 0, scrollLeft: 0, selected: false });

  const syncCaret = (input: HTMLInputElement) => {
    setCaret({
      position: input.selectionStart ?? input.value.length,
      scrollLeft: input.scrollLeft,
      selected: input.selectionStart !== input.selectionEnd,
    });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = command.trim();
    if (!value) return;
    if (value === 'ls') {
      setFeedback('');
      revealExplore?.();
    } else {
      setFeedback(t('terminalUnknown', { command: value }));
    }
  };

  return (
    <div>
      <form className={styles.prompt} onSubmit={submit}>
        <span className={styles.promptPrefix} aria-hidden="true">
          <span className={styles.user}>piggy</span>
          <span className={styles.at}>@</span>
          <span className={styles.host}>blog</span>
          <span className={styles.path}>~/about</span>
          <span className={styles.dollar}>$</span>
        </span>
        <span className={styles.commandField}>
          <input
            className={styles.commandInput}
            aria-label={t('terminalLabel')}
            aria-describedby={feedback === '' ? undefined : hintId}
            aria-controls="about-explore"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            value={command}
            onChange={(event) => {
              setCommand(event.target.value);
              syncCaret(event.currentTarget);
            }}
            onSelect={(event) => syncCaret(event.currentTarget)}
            onScroll={(event) => syncCaret(event.currentTarget)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && event.nativeEvent.isComposing) event.preventDefault();
            }}
          />
          {!caret.selected && (
            <span
              className={styles.caret}
              aria-hidden="true"
              style={{ left: `calc(${caret.position}ch - ${caret.scrollLeft}px)` }}
            />
          )}
        </span>
      </form>
      {feedback !== '' && (
        <p id={hintId} className={styles.terminalHint} role="status">
          {feedback ?? t('terminalHint')}
        </p>
      )}
    </div>
  );
}

export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const interval = window.setInterval(update, 15_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className={styles.localTime}>
      <span className={styles.liveDot} aria-hidden="true" />
      <time dateTime={now?.toISOString()}>{now ? clockFormat.format(now) : '--:--'}</time>
      <span className={styles.timezone}>UTC+8</span>
    </span>
  );
}

export function LifeClock() {
  const t = useTranslations('AboutStudio.scene');
  const root = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const scene = root.current?.closest('[data-about-scene]');
    if (!scene) return;

    let interval: number | undefined;
    const update = () => setNow(new Date());
    const sync = () => {
      if (!scene.hasAttribute('data-scene-running')) {
        window.clearInterval(interval);
        interval = undefined;
      } else if (interval === undefined) {
        update();
        interval = window.setInterval(update, 1000);
      }
    };
    const observer = new MutationObserver(sync);
    observer.observe(scene, { attributes: true, attributeFilter: ['data-scene-running'] });
    update();
    sync();
    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, []);

  const clock = now ? lifeClock(now) : null;
  const time = clock?.time ?? '--:--:--';

  return (
    <div ref={root} className={styles.focusWidget}>
      <div className={styles.clockHeading}>
        <span>
          <Clock3 size={12} /> {t('focus')}
        </span>
        <span className={styles.clockTimezone}>UTC+8</span>
      </div>
      <strong className={styles.liveClock}>
        <time dateTime={now?.toISOString()}>
          {time.slice(0, 5)}
          <span className={styles.clockSeconds}>:{time.slice(6)}</span>
        </time>
      </strong>
      <div className={styles.clockFooter}>
        <small>
          <i /> {clock ? t(clock.isWeekend ? 'resting' : 'working') : '…'}
        </small>
        <span className={styles.clockTicks} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}
