import useSWR from 'swr';

import { fetcher } from '@/utils/index';

import type { SpotifyNowPlayingData } from '@/types/index';

export default function useNowPlaying() {
  const { data } = useSWR<SpotifyNowPlayingData>('/api/spotify', fetcher);
  console.log('data', data);

  return data || { isPlaying: false };
}
