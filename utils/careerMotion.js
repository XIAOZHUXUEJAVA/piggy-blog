/** Progressive enhancement: server-rendered career content stays readable without JavaScript. */
export function attachCareerMotion(root) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const rows = Array.from(root.querySelectorAll('[data-career-row]'));
  const bars = Array.from(root.querySelectorAll('[data-career-bar]'));
  const animations = new Set();
  const counterFrames = new Set();
  let observer;
  let frame = 0;

  const play = (element, keyframes, options) => {
    if (!element.animate) return;
    const animation = element.animate(keyframes, options);
    animations.add(animation);
    animation.onfinish = () => animations.delete(animation);
  };

  const count = (element) => {
    const value = Number(element.dataset.careerCount);
    if (!Number.isFinite(value) || element.dataset.counted) return;
    element.dataset.counted = 'true';
    const started = performance.now();
    let handle = 0;
    const tick = (time) => {
      counterFrames.delete(handle);
      const progress = Math.min(1, (time - started) / 850);
      element.textContent = String(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) {
        handle = requestAnimationFrame(tick);
        counterFrames.add(handle);
      }
    };
    handle = requestAnimationFrame(tick);
    counterFrames.add(handle);
  };

  const reveal = (element) => {
    if (element.dataset.revealed) return;
    element.dataset.revealed = 'true';
    if (preference.matches) return;
    const delay = Number(element.dataset.careerDelay || 0);
    play(
      element,
      [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 650, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' }
    );

    element.querySelectorAll('[data-career-count]').forEach(count);
    element.querySelectorAll('[data-career-bar]').forEach((bar, index) => {
      play(
        bar,
        [
          { opacity: 0, transform: 'scaleX(0)' },
          { opacity: 1, transform: 'scaleX(1)' },
        ],
        {
          duration: 800,
          delay: 90 * index + 100,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'backwards',
        }
      );
    });
  };

  const update = () => {
    frame = 0;
    // Read all geometry before writing styles, once per animation frame.
    const readingLine = window.innerHeight * 0.72;
    const geometry = rows.map((row) => ({ row, rect: row.getBoundingClientRect() }));
    let active;
    for (const { row, rect } of geometry) {
      const progress = Math.max(0, Math.min(1, (readingLine - rect.top - 12) / Math.max(1, rect.height - 12)));
      row.style.setProperty('--draw-progress', preference.matches ? '1' : String(progress));
      row.style.setProperty(
        '--draw-distance',
        preference.matches ? '99999px' : `${Math.max(0, readingLine - rect.top)}px`
      );
      row.toggleAttribute('data-node-reached', rect.top + 12 <= readingLine);
      if (row.dataset.careerEntry && rect.top <= window.innerHeight * 0.45) active = row.dataset.careerEntry;
    }
    if (!active) active = rows.find((row) => row.dataset.careerEntry)?.dataset.careerEntry;
    for (const row of rows) row.toggleAttribute('data-career-active', row.dataset.careerEntry === active);
    for (const bar of bars) {
      const selected = bar.hash === `#${active}`;
      bar.toggleAttribute('data-career-active', selected);
      if (selected) bar.setAttribute('aria-current', 'step');
      else bar.removeAttribute('aria-current');
    }
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const configure = () => {
    observer?.disconnect();
    for (const animation of animations) animation.cancel();
    animations.clear();
    for (const handle of counterFrames) cancelAnimationFrame(handle);
    counterFrames.clear();
    root.querySelectorAll('[data-career-count]').forEach((element) => {
      element.textContent = element.dataset.careerCount;
    });

    const targets = root.querySelectorAll('[data-career-reveal]');
    if (preference.matches || !('IntersectionObserver' in window)) {
      delete root.dataset.motionReady;
      targets.forEach((element) => {
        element.dataset.revealed = 'true';
      });
    } else {
      root.dataset.motionReady = 'true';
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            if (entry.isIntersecting) {
              reveal(entry.target);
              observer.unobserve(entry.target);
            }
        },
        { rootMargin: '0px 0px -7% 0px', threshold: 0 }
      );
      targets.forEach((element) => {
        // Restored scroll positions and deep links must not leave earlier content hidden.
        if (element.getBoundingClientRect().bottom < 0) element.dataset.revealed = 'true';
        else observer.observe(element);
      });
    }
    update();
  };

  const click = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link = event.target instanceof Element ? event.target.closest('[data-career-bar]') : null;
    const target = link && rows.find((row) => `#${row.id}` === link.hash);
    if (!target) return;
    event.preventDefault();
    // Reveal before jumping, so even a long jump never lands on an invisible chapter.
    target.querySelectorAll('[data-career-reveal]').forEach(reveal);
    window.history.pushState(null, '', link.hash);
    target.scrollIntoView({ behavior: preference.matches ? 'instant' : 'smooth', block: 'start' });
    target.focus({ preventScroll: true });
    schedule();
  };

  configure();
  // Start narrow timelines at the recent chapters instead of mostly empty early tracks.
  const rulerScroll = root.querySelector('[data-career-ruler-scroll]');
  if (rulerScroll) rulerScroll.scrollLeft = rulerScroll.scrollWidth - rulerScroll.clientWidth;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('hashchange', schedule);
  preference.addEventListener('change', configure);
  root.addEventListener('click', click);
  const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(schedule) : null;
  resizeObserver?.observe(root);

  return () => {
    observer?.disconnect();
    resizeObserver?.disconnect();
    cancelAnimationFrame(frame);
    for (const handle of counterFrames) cancelAnimationFrame(handle);
    for (const animation of animations) animation.cancel();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    window.removeEventListener('hashchange', schedule);
    preference.removeEventListener('change', configure);
    root.removeEventListener('click', click);
    delete root.dataset.motionReady;
    rows.forEach((row) => {
      row.style.removeProperty('--draw-progress');
      row.style.removeProperty('--draw-distance');
    });
  };
}
