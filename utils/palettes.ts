export const palettes = [
  { id: 'green-soft', color: '#667d6d' },
  { id: 'green-vivid', color: '#4f855f' },
  { id: 'rose-soft', color: '#95696d' },
  { id: 'pink-soft', color: '#9c6a83' },
  { id: 'purple-soft', color: '#7b6fa8' },
  { id: 'blue-soft', color: '#637da3' },
  { id: 'orange-soft', color: '#987451' },
  { id: 'brown-soft', color: '#81705f' },
] as const;

export type Palette = (typeof palettes)[number]['id'];
export const defaultPalette: Palette = 'green-soft';
export const paletteStorageKey = 'piggy-palette';
export const paletteChangeEvent = 'piggy:palette-change';

export function isPalette(value: unknown): value is Palette {
  return palettes.some((palette) => palette.id === value);
}

export function applyPalette(palette: Palette, persist = true) {
  document.documentElement.dataset.palette = palette;
  if (persist) {
    try {
      localStorage.setItem(paletteStorageKey, palette);
    } catch {
      // The selection still works when browser storage is unavailable.
    }
  }
  window.dispatchEvent(new Event(paletteChangeEvent));
}

// Runs before the body paints; the allowlist also rejects stale saved values.
export const paletteInitScript = `(() => {
  try {
    const palette = localStorage.getItem(${JSON.stringify(paletteStorageKey)});
    if (${JSON.stringify(palettes.map(({ id }) => id))}.includes(palette)) {
      document.documentElement.dataset.palette = palette;
    }
  } catch {}
})();`;
