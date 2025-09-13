import type { SpotifyNowPlayingData } from '@/types/index';
import { getSpotifyNowPlaying } from '@/servers/spotify.server';

export async function GET() {
  try {
    console.log('Spotify API route called');

    // 检查网络连接问题，如果是 fetch failed 错误，返回默认状态而不是 500 错误
    const response = await getSpotifyNowPlaying();

    // 检查 response 是否有效
    if (!response || response.status === 204 || response.status > 400) {
      console.log('No current playback or error response:', response?.status);
      return Response.json({ isPlaying: false });
    }

    let data;
    try {
      data = await response.json();
    } catch (error) {
      // 处理 JSON 解析错误
      console.error('Failed to parse JSON response:', error);
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

    console.log('Successfully retrieved song data:', songData.title);
    return Response.json(songData);
  } catch (error) {
    console.error('Spotify API route error:', error);

    // 如果是网络连接错误，返回 200 状态码和 isPlaying: false，而不是 500 错误
    if (error instanceof Error && (error.message.includes('fetch failed') || error.message.includes('network'))) {
      console.log('Network error detected, returning offline state');
      return Response.json({
        isPlaying: false,
        offline: true,
        error: 'Network connection issue',
      });
    }

    return Response.json(
      {
        isPlaying: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
