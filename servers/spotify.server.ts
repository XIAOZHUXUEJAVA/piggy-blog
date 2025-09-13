import { SPOTIFY_TOKEN_API, SPOTIFY_NOW_PLAYING_API, SPOTIFY_RECENTLY_PLAYED_API } from '@/constants/index';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

async function getAccessToken() {
  console.log('Getting access token...');
  console.log('Client ID exists:', !!client_id);
  console.log('Client Secret exists:', !!client_secret);
  console.log('Refresh Token exists:', !!refresh_token);

  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Missing Spotify credentials in environment variables');
  }

  const response = await fetch(SPOTIFY_TOKEN_API, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    cache: 'no-store',
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Token request failed:', response.status, errorText);
    throw new Error(`Failed to get access token: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  console.log('Access token obtained successfully');
  return data;
}

// export async function getSpotifyNowPlaying() {
//   const { access_token } = await getAccessToken();

//   const url = new URL(SPOTIFY_NOW_PLAYING_API);

//   url.searchParams.append('additional_types', 'track,episode');

//   return fetch(url.toString(), {
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   });
// }
export async function getSpotifyNowPlaying() {
  try {
    const { access_token } = await getAccessToken();

    if (!access_token) {
      throw new Error('No access token received');
    }

    const url = new URL(SPOTIFY_NOW_PLAYING_API);
    url.searchParams.append('additional_types', 'track,episode');

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log('Now Playing Response Status:', response.status);
    return response;
  } catch (error) {
    console.error('Failed to fetch Now Playing data:', error);
    throw error;
  }
}

export async function getSpotifyRecentlyPlayed() {
  try {
    const { access_token } = await getAccessToken();

    if (!access_token) {
      throw new Error('No access token received');
    }

    const url = new URL(SPOTIFY_RECENTLY_PLAYED_API);
    url.searchParams.append('limit', '10'); // 获取最近10首歌

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log('Recently Played Response Status:', response.status);
    return response;
  } catch (error) {
    console.error('Failed to fetch Recently Played data:', error);
    throw error;
  }
}
