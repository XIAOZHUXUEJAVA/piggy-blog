export const backgroundStorageKey = 'piggy-paper-background';
export const backgroundChangeEvent = 'piggy:paper-background-change';

export function isBackgroundEnabled() {
  return document.documentElement.dataset.paperBackground !== 'off';
}

export function applyBackground(enabled: boolean, persist = true) {
  const value = enabled ? 'on' : 'off';
  document.documentElement.dataset.paperBackground = value;
  if (persist) {
    try {
      localStorage.setItem(backgroundStorageKey, value);
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }
  window.dispatchEvent(new Event(backgroundChangeEvent));
}

// Restore the saved preference before the background can paint.
export const backgroundInitScript = `(() => {
  try {
    if (localStorage.getItem(${JSON.stringify(backgroundStorageKey)}) === 'off') {
      document.documentElement.dataset.paperBackground = 'off';
    }
  } catch {}
})();`;
