'use client';

import { Listbox } from '@headlessui/react';
import { Check, Palette as PaletteIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import {
  applyPalette,
  defaultPalette,
  isPalette,
  paletteChangeEvent,
  palettes,
  paletteStorageKey,
  type Palette,
} from '@/utils/palettes';

export default function ThemeSwitcher() {
  const t = useTranslations('Theme');
  const [selected, setSelected] = useState<Palette>(defaultPalette);

  useEffect(() => {
    const sync = () => {
      const palette = document.documentElement.dataset.palette;
      setSelected(isPalette(palette) ? palette : defaultPalette);
    };
    const syncStorage = (event: StorageEvent) => {
      if (event.key === paletteStorageKey || event.key === null) {
        applyPalette(isPalette(event.newValue) ? event.newValue : defaultPalette, false);
      }
    };

    sync();
    window.addEventListener(paletteChangeEvent, sync);
    window.addEventListener('storage', syncStorage);
    return () => {
      window.removeEventListener(paletteChangeEvent, sync);
      window.removeEventListener('storage', syncStorage);
    };
  }, []);

  return (
    <Listbox as="div" className="relative" value={selected} onChange={applyPalette}>
      <Listbox.Button
        className="flex h-9 w-9 items-center justify-center rounded-md text-paper-accent transition-colors hover:bg-paper-inset"
        aria-label={t('choose', { palette: t(selected) })}
        title={t('title')}
      >
        <PaletteIcon className="h-[18px] w-[18px]" aria-hidden="true" />
      </Listbox.Button>
      <Listbox.Options className="paper-popover absolute right-0 z-50 mt-3 max-h-[calc(100dvh-6rem)] w-48 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl p-2 focus:outline-none sm:w-56">
        {palettes.map((palette) => (
          <Listbox.Option key={palette.id} value={palette.id}>
            {({ active, selected: isSelected }) => (
              <span
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                  active ? 'bg-paper-inset text-paper-accent' : 'text-paper-ink'
                }`}
              >
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-full"
                  style={{ backgroundColor: palette.color }}
                  aria-hidden="true"
                />
                <span>{t(palette.id)}</span>
                {isSelected && <Check className="ml-auto h-4 w-4" aria-hidden="true" />}
              </span>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
