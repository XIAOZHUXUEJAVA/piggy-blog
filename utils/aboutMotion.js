import { attachSceneMotion } from './sceneMotion';

/** Keep supported browsers' scroll-driven transforms off the JavaScript frame loop. */
function attachNativeTerminalScroll(root, stage, preference) {
  let frame = 0;
  const render = () => {
    frame = 0;
    const top = stage.getBoundingClientRect().top + window.scrollY;
    const start = Math.max(0, top - window.innerHeight * 0.8);
    const distance = Math.max(window.innerHeight * 0.6, top + stage.offsetHeight * 0.45 - start);
    stage.style.setProperty('--terminal-scroll-start', `${start}px`);
    stage.style.setProperty('--terminal-scroll-end', `${start + distance}px`);
    stage.setAttribute('data-terminal-motion', '');
    stage.setAttribute('data-terminal-native', '');
  };
  const measure = () => {
    if (!frame && !preference.matches) frame = window.requestAnimationFrame(render);
  };
  const reset = () => {
    stage.removeAttribute('data-terminal-motion');
    stage.removeAttribute('data-terminal-native');
    stage.style.removeProperty('--terminal-scroll-start');
    stage.style.removeProperty('--terminal-scroll-end');
  };
  const configure = () => {
    window.cancelAnimationFrame(frame);
    frame = 0;
    if (preference.matches) reset();
    else measure();
  };
  const resize = 'ResizeObserver' in window ? new ResizeObserver(measure) : null;
  resize?.observe(root);
  resize?.observe(stage);
  const visibility =
    'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => stage.toggleAttribute('data-terminal-visible', entry.isIntersecting))
      : null;
  visibility?.observe(stage);
  window.addEventListener('resize', measure);
  preference.addEventListener('change', configure);
  configure();

  return () => {
    window.cancelAnimationFrame(frame);
    resize?.disconnect();
    visibility?.disconnect();
    window.removeEventListener('resize', measure);
    preference.removeEventListener('change', configure);
    stage.removeAttribute('data-terminal-visible');
    reset();
  };
}

/** Tie the terminal's perspective to document scroll without intercepting wheel/touch input. */
function attachTerminalScroll(root, preference) {
  const stage = root.querySelector('[data-terminal-stage]');
  const surface = stage?.querySelector('[data-terminal-surface]');
  if (!stage || !surface) return () => {};
  if (CSS.supports('animation-timeline', 'scroll(root block)') && CSS.supports('animation-range', '0px 100px')) {
    return attachNativeTerminalScroll(root, stage, preference);
  }

  let frame = 0;
  let previousTime = 0;
  let progress = 0;
  let start = 0;
  let distance = 1;
  let compact = false;
  let needsMeasure = true;
  let snap = true;
  const clamp = (value) => Math.max(0, Math.min(1, value));
  const stop = () => {
    window.cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
  };
  const render = (time) => {
    frame = 0;
    if (needsMeasure) {
      // Measure the untransformed stage so perspective never feeds back into scroll progress.
      const rect = stage.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      start = Math.max(0, top - window.innerHeight * 0.8);
      distance = Math.max(window.innerHeight * 0.6, top + rect.height * 0.45 - start);
      compact = window.innerWidth < 640;
      needsMeasure = false;
    }
    const target = clamp((window.scrollY - start) / distance);
    const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
    progress = snap ? target : progress + (target - progress) * (1 - Math.exp(-elapsed / 70));
    snap = false;
    const settled = Math.abs(target - progress) < 0.0001;
    if (settled) progress = target;

    stage.setAttribute('data-terminal-motion', '');
    stage.toggleAttribute('data-terminal-visible', window.scrollY > start && progress < 1);
    surface.style.transform = `perspective(1600px) rotateX(${(progress * (compact ? 5.5 : 12)).toFixed(4)}deg) scale(${(1 - progress * (compact ? 0.022 : 0.045)).toFixed(6)})`;
    previousTime = settled ? 0 : time;
    if (!settled) frame = window.requestAnimationFrame(render);
  };
  const schedule = () => {
    if (!frame && !preference.matches && !document.hidden) frame = window.requestAnimationFrame(render);
  };
  const measure = () => {
    needsMeasure = true;
    schedule();
  };
  const reset = () => {
    stage.removeAttribute('data-terminal-motion');
    stage.removeAttribute('data-terminal-visible');
    surface.style.removeProperty('transform');
  };
  const configure = () => {
    stop();
    if (preference.matches) reset();
    else {
      snap = true;
      measure();
    }
  };
  const visibility = () => {
    if (document.hidden) stop();
    else configure();
  };
  const resize = 'ResizeObserver' in window ? new ResizeObserver(measure) : null;
  resize?.observe(root);
  resize?.observe(stage);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure);
  document.addEventListener('visibilitychange', visibility);
  preference.addEventListener('change', configure);
  configure();

  return () => {
    stop();
    resize?.disconnect();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', measure);
    document.removeEventListener('visibilitychange', visibility);
    preference.removeEventListener('change', configure);
    reset();
  };
}

/** Ease into the expanded content, yielding immediately to manual navigation. */
export function scrollToAboutExplore(section) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const start = window.scrollY;
  const margin = parseFloat(window.getComputedStyle(section).scrollMarginTop) || 0;
  const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const destination = Math.max(0, Math.min(maximum, start + section.getBoundingClientRect().top - margin));
  const distance = destination - start;
  const focus = () => section.querySelector('#about-explore-title')?.focus({ preventScroll: true });

  if (preference.matches || Math.abs(distance) < 1) {
    window.scrollTo({ top: destination, behavior: 'instant' });
    focus();
    return () => {};
  }

  const root = section.closest('[data-about-ready]');
  let active = true;
  let timeout = 0;
  const cleanup = () => {
    active = false;
    window.clearTimeout(timeout);
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    window.removeEventListener('pointerdown', stop);
    window.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    document.removeEventListener('scrollend', finish);
    preference.removeEventListener('change', onPreferenceChange);
    root?.removeAttribute('data-about-scrolling');
  };
  const stop = () => {
    if (!active) return;
    window.scrollTo({ top: window.scrollY, behavior: 'instant' });
    cleanup();
  };
  const finish = () => {
    if (!active) return;
    cleanup();
    focus();
  };
  const onKeyDown = (event) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Tab', 'Escape'].includes(event.key)) stop();
  };
  const onVisibilityChange = () => {
    if (document.hidden) stop();
  };
  const onPreferenceChange = () => {
    if (!preference.matches) return;
    stop();
    window.scrollTo({ top: destination, behavior: 'instant' });
    focus();
  };
  root?.setAttribute('data-about-scrolling', '');
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchstart', stop, { passive: true });
  window.addEventListener('pointerdown', stop, { passive: true });
  window.addEventListener('keydown', onKeyDown);
  document.addEventListener('visibilitychange', onVisibilityChange);
  document.addEventListener('scrollend', finish);
  preference.addEventListener('change', onPreferenceChange);
  // The browser can scroll on its compositor thread, even while content is being rasterized.
  window.scrollTo({ top: destination, behavior: 'smooth' });
  timeout = window.setTimeout(finish, 2200);
  return stop;
}

/** Combine the terminal scroll effect with the shared scene playback controller. */
export function attachAboutMotion(root) {
  const detachTerminalScroll = attachTerminalScroll(root, window.matchMedia('(prefers-reduced-motion: reduce)'));
  const detachScenes = attachSceneMotion(root);
  return () => {
    detachTerminalScroll();
    detachScenes();
  };
}
