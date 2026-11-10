/** Tie the terminal's perspective to document scroll without intercepting wheel/touch input. */
function attachTerminalScroll(root, preference) {
  const stage = root.querySelector('[data-terminal-stage]');
  const surface = stage?.querySelector('[data-terminal-surface]');
  if (!stage || !surface) return () => {};

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
    surface.style.setProperty('--terminal-tilt', `${(progress * (compact ? 5.5 : 12)).toFixed(4)}deg`);
    surface.style.setProperty('--terminal-scale', (1 - progress * (compact ? 0.022 : 0.045)).toFixed(6));
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
    surface.style.removeProperty('--terminal-tilt');
    surface.style.removeProperty('--terminal-scale');
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

/** Enhance server-rendered content; pause every scene while it is out of view. */
export function attachAboutMotion(root) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const detachTerminalScroll = attachTerminalScroll(root, preference);
  const scenes = Array.from(root.querySelectorAll('[data-about-scene]'));
  const visible = new Set();
  const animations = new Set();
  const targets = root.querySelectorAll('[data-about-reveal]');

  const sync = () => {
    for (const scene of scenes) {
      const paused = scene.hasAttribute('data-paused');
      scene.toggleAttribute(
        'data-scene-running',
        visible.has(scene) && !paused && !document.hidden && !preference.matches
      );
      const button = scene.querySelector('[data-scene-toggle]');
      button?.setAttribute('aria-pressed', String(paused));
    }
  };
  const reveal = (element) => {
    if (element.hasAttribute('data-about-revealed')) return;
    element.setAttribute('data-about-revealed', '');
    if (preference.matches || !element.animate) return;
    const animation = element.animate(
      [
        { opacity: 0, transform: 'translateY(24px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 850, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
    animations.add(animation);
    animation.onfinish = () => animations.delete(animation);
  };
  const observer =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.target.hasAttribute('data-about-scene')) {
                if (entry.isIntersecting) visible.add(entry.target);
                else visible.delete(entry.target);
              }
              if (entry.isIntersecting && entry.target.hasAttribute('data-about-reveal')) reveal(entry.target);
            }
            sync();
          },
          { threshold: 0.08 }
        )
      : null;

  const configure = () => {
    if (preference.matches) {
      for (const animation of animations) animation.cancel();
      animations.clear();
      targets.forEach((element) => element.setAttribute('data-about-revealed', ''));
    }
    sync();
  };
  const toggle = (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-scene-toggle]') : null;
    const scene = button?.closest('[data-about-scene]');
    if (!scene) return;
    scene.toggleAttribute('data-paused');
    sync();
  };

  root.setAttribute('data-about-ready', '');
  if (observer) {
    new Set([...targets, ...scenes]).forEach((element) => {
      if (element.getBoundingClientRect().bottom < 0) element.setAttribute('data-about-revealed', '');
      observer.observe(element);
    });
  } else {
    targets.forEach((element) => element.setAttribute('data-about-revealed', ''));
    scenes.forEach((scene) => visible.add(scene));
  }
  configure();
  root.addEventListener('click', toggle);
  document.addEventListener('visibilitychange', sync);
  preference.addEventListener('change', configure);
  return () => {
    detachTerminalScroll();
    observer?.disconnect();
    for (const animation of animations) animation.cancel();
    root.removeEventListener('click', toggle);
    document.removeEventListener('visibilitychange', sync);
    preference.removeEventListener('change', configure);
    root.removeAttribute('data-about-ready');
    scenes.forEach((scene) => scene.removeAttribute('data-scene-running'));
  };
}
