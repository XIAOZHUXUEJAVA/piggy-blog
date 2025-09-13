export async function GET() {
  const {
    SPOTIFY_CLIENT_ID: client_id,
    SPOTIFY_CLIENT_SECRET: client_secret,
    SPOTIFY_REFRESH_TOKEN: refresh_token,
  } = process.env;

  if (!client_id || !client_secret || !refresh_token) {
    return Response.json({ error: 'Missing environment variables' }, { status: 400 });
  }

  try {
    console.log('Testing network connection to Spotify...');

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    // 尝试使用更长的超时时间和不同的配置
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);

      return Response.json(
        {
          error: 'Spotify API error',
          status: response.status,
          statusText: response.statusText,
          details: errorText,
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    return Response.json({
      success: true,
      message: 'Network connection to Spotify is working',
      hasAccessToken: !!data.access_token,
      tokenType: data.token_type,
    });
  } catch (error) {
    console.error('Network test error:', error);

    if (error instanceof Error && error.name === 'AbortError') {
      return Response.json(
        {
          error: 'Request timeout',
          details: 'Connection to Spotify API timed out after 30 seconds',
        },
        { status: 408 }
      );
    }

    return Response.json(
      {
        error: 'Network connection failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        errorName: error instanceof Error ? error.name : typeof error,
      },
      { status: 500 }
    );
  }
}
