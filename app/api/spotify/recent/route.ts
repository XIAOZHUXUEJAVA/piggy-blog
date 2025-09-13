import { getSpotifyRecentlyPlayed } from '@/servers/spotify.server';

export async function GET() {
  try {
    const response = await getSpotifyRecentlyPlayed();

    // 检查 response 是否有效
    if (!response || response.status === 204 || response.status > 400) {
      return Response.json({ items: [] });
    }

    let data;
    try {
      data = await response.json();
    } catch (error) {
      // 处理 JSON 解析错误
      return Response.json({ items: [], error: 'Failed to parse response.' });
    }

    // 检查 data 是否有效
    if (!data || !data.items) {
      return Response.json({ items: [] });
    }

    // 格式化最近播放的数据
    const recentTracks = data.items.map((item: any) => ({
      name: item.track.name,
      artist: item.track.artists.map((artist: any) => artist.name).join(', '),
      album: item.track.album.name,
      external_urls: item.track.external_urls,
      played_at: item.played_at,
      album_image: item.track.album.images[0]?.url,
    }));

    return Response.json({ items: recentTracks });
  } catch (error) {
    console.error('Error fetching recently played tracks:', error);

    // 如果是网络连接错误，返回空数组而不是错误
    if (error instanceof Error && (error.message.includes('fetch failed') || error.message.includes('network'))) {
      console.log('Network error detected for recent tracks, returning empty array');
      return Response.json({ items: [], offline: true });
    }

    return Response.json({ items: [], error: 'Internal server error' });
  }
}
