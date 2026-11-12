/** Enhance server-rendered content; pause every scene while it is out of view. */
export function attachSceneMotion(root) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = Array.from(root.querySelectorAll('[data-about-scene]'));
  const visible = new Set();
  const animations = new Set();
  const targets = root.querySelectorAll('[data-about-reveal]');

  const sync = () => {
    for (const scene of scenes) {
      const paused = scene.hasAttribute('data-paused');
      scene.toggleAttribute(
        'data-scene-running',
        visible.has(scene) &&
          !paused &&
          !scene.hasAttribute('data-about-revealing') &&
          !root.hasAttribute('data-about-scrolling') &&
          !document.hidden &&
          !preference.matches
      );
      const button = scene.querySelector('[data-scene-toggle]');
      button?.setAttribute('aria-pressed', String(paused));
    }
  };
  const reveal = (element) => {
    if (element.hasAttribute('data-about-revealed')) return;
    element.setAttribute('data-about-revealed', '');
    if (preference.matches || !element.animate) return;
    const isCard = element.hasAttribute('data-about-scene');
    const columns = window.innerWidth < 700 ? 1 : 2;
    const column = Number(element.dataset.aboutRevealOrder || 0) % columns;
    const previousWillChange = element.style.willChange;
    element.style.willChange = 'transform, opacity';
    element.setAttribute('data-about-revealing', '');
    const animation = element.animate(
      [
        { opacity: 0, transform: 'translateY(32px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration: isCard ? 1500 : 1200,
        delay: isCard ? 280 + column * 200 : 80,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        fill: 'backwards',
      }
    );
    animations.add(animation);
    const finish = () => {
      animations.delete(animation);
      element.style.willChange = previousWillChange;
      element.removeAttribute('data-about-revealing');
      sync();
    };
    animation.onfinish = finish;
    animation.oncancel = finish;
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
  const scrollObserver = new MutationObserver(sync);
  scrollObserver.observe(root, { attributes: true, attributeFilter: ['data-about-scrolling'] });
  root.addEventListener('click', toggle);
  document.addEventListener('visibilitychange', sync);
  preference.addEventListener('change', configure);
  return () => {
    observer?.disconnect();
    scrollObserver.disconnect();
    for (const animation of animations) animation.cancel();
    root.removeEventListener('click', toggle);
    document.removeEventListener('visibilitychange', sync);
    preference.removeEventListener('change', configure);
    root.removeAttribute('data-about-ready');
    scenes.forEach((scene) => scene.removeAttribute('data-scene-running'));
  };
}
