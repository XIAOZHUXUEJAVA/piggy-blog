import type { SpotifyNowPlayingData } from '@/types/index';
import { getSpotifyNowPlaying } from '@/servers/spotify.server';

export async function GET() {
  const response = await getSpotifyNowPlaying();

  // 检查 response 是否有效
  if (!response || response.status === 204 || response.status > 400) {
    return Response.json({ isPlaying: false });
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    // 处理 JSON 解析错误
    return Response.json({ isPlaying: false, error: 'Failed to parse response.' });
  }

  // 检查 data 是否有效
  if (!data || data.currently_playing_type === 'episode') {
    return Response.json({
      isPlaying: true,
      title: data?.item?.name || 'Unknown',
      songUrl: data?.item?.external_urls?.spotify || '',
    });
  }

  const songData: SpotifyNowPlayingData = {
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: data.item.artists.map((art: { name: string }) => art.name).join(', '),
    album: data.item.album.name,
    albumImageUrl: data.item.album.images[0]?.url,
    songUrl: data.item.external_urls.spotify,
  };

  return Response.json(songData);
}
