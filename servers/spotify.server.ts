import { SPOTIFY_TOKEN_API, SPOTIFY_NOW_PLAYING_API } from '@/constants/index';

import dotenv from 'dotenv';

// 尝试加载 .env.local 文件
const localEnv = dotenv.config({ path: '.env.local' });
if (localEnv.error) {
  // 如果 .env.local 文件不存在，加载 .env 文件
  dotenv.config({ path: '.env' });
}
const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

async function getAccessToken() {
  const response = await fetch(SPOTIFY_TOKEN_API, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    cache: 'no-store',
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token || '',
    }),
  });

  return response.json();
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
  const { access_token } = await getAccessToken();

  const url = new URL(SPOTIFY_NOW_PLAYING_API);
  url.searchParams.append('additional_types', 'track,episode');

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await response;
    console.log('Now Playing Data:', data);

    return data;
  } catch (error) {
    console.error('Failed to fetch Now Playing data:', error);
    return null;
  }
}
