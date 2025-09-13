export async function GET() {
  const {
    SPOTIFY_CLIENT_ID: client_id,
    SPOTIFY_CLIENT_SECRET: client_secret,
    SPOTIFY_REFRESH_TOKEN: refresh_token,
  } = process.env;

  console.log('=== Environment Variables Test ===');
  console.log('CLIENT_ID exists:', !!client_id);
  console.log('CLIENT_ID length:', client_id?.length);
  console.log('CLIENT_ID first 10 chars:', client_id?.substring(0, 10));

  console.log('CLIENT_SECRET exists:', !!client_secret);
  console.log('CLIENT_SECRET length:', client_secret?.length);
  console.log('CLIENT_SECRET first 10 chars:', client_secret?.substring(0, 10));

  console.log('REFRESH_TOKEN exists:', !!refresh_token);
  console.log('REFRESH_TOKEN length:', refresh_token?.length);
  console.log('REFRESH_TOKEN first 10 chars:', refresh_token?.substring(0, 10));

  return Response.json({
    environmentCheck: {
      hasClientId: !!client_id,
      hasClientSecret: !!client_secret,
      hasRefreshToken: !!refresh_token,
      clientIdLength: client_id?.length || 0,
      clientSecretLength: client_secret?.length || 0,
      refreshTokenLength: refresh_token?.length || 0,
    },
    message: 'Environment variables loaded successfully',
  });
}
