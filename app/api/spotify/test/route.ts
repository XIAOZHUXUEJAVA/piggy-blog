export async function GET() {
  const {
    SPOTIFY_CLIENT_ID: client_id,
    SPOTIFY_CLIENT_SECRET: client_secret,
    SPOTIFY_REFRESH_TOKEN: refresh_token,
  } = process.env;

  console.log('Environment check:');
  console.log('CLIENT_ID exists:', !!client_id, 'length:', client_id?.length);
  console.log('CLIENT_SECRET exists:', !!client_secret, 'length:', client_secret?.length);
  console.log('REFRESH_TOKEN exists:', !!refresh_token, 'length:', refresh_token?.length);

  if (!client_id || !client_secret || !refresh_token) {
    return Response.json(
      {
        error: 'Missing environment variables',
        details: {
          hasClientId: !!client_id,
          hasClientSecret: !!client_secret,
          hasRefreshToken: !!refresh_token,
        },
      },
      { status: 400 }
    );
  }

  try {
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return Response.json(
        {
          error: 'Failed to get access token',
          status: response.status,
          details: errorText,
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: 'Spotify API configuration is working',
    });
  } catch (error) {
    console.error('Detailed error:', error);
    return Response.json(
      {
        error: 'Test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        errorType: error instanceof Error ? error.constructor.name : typeof error,
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
