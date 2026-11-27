'use client';

import { createContext, useContext } from 'react';

export interface ArchiveFilterValue {
  activeMonth: string | null;
  toggleMonth: (month: string) => void;
}

export const ArchiveFilterContext = createContext<ArchiveFilterValue | null>(null);

export function useArchiveFilter() {
  const context = useContext(ArchiveFilterContext);
  if (!context) throw new Error('Archive filter components need ArchiveFilterContext');
  return context;
}
