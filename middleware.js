// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. Fetch the secure credential token from your environment configuration variables
  const SYSTEM_PASSWORD = process.env.POS_PASSWORD;

  // Edge Case Protection: If no password is set on the hosting server, throw a 500 alert to avoid opening a back door
  if (!SYSTEM_PASSWORD) {
    return new NextResponse(
      JSON.stringify({ error: "Security Configuration Mismatch: Server protection passcode missing." }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  // 2. Extract the browser standard Authorization header credentials
  const authHeader = request.headers.get('authorization');

  if (authHeader) {
    try {
      // Basic authentication tokens are sent as 'Basic base64encoded_string'
      const authValue = authHeader.split(' ')[1];
      // Decode the string (it contains username:password format)
      const decodedValue = atob(authValue);
      const [username, password] = decodedValue.split(':');

      // Edge Case Protection: Validate the password securely. Username can be anything (e.g. "admin")
      if (password === SYSTEM_PASSWORD) {
        return NextResponse.next(); // Clear access granted!
      }
    } catch (error) {
      // Malformed auth attempts are safely rejected
      console.error("Malicious or broken authentication format intercepted.");
    }
  }

  // 3. If unauthorized or wrong password, trigger standard secure browser login box
  return new NextResponse('Milestone Gems Lab POS Secure Access Required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Gemstone POS Portal", charset="UTF-8"',
    },
  });
}

// 🔐 CRITICAL EDGE CASE MATCHING RULE: 
// This configuration structure intercepts every route, data asset chunk, layout, 
// and server side operation, blocking attackers from crawling directory endpoints.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

