
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('sessionToken')?.value;

  // If trying to access admin routes without authentication, redirect to login
  if (pathname.startsWith('/admin')) {
    if (!sessionToken || sessionToken !== 'authenticated') {
      const loginUrl = new URL('/login', request.url);
      // Optionally, you can add a redirect query parameter if needed
      // loginUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If accessing login page while already authenticated, redirect to admin dashboard
  if (pathname === '/login') {
    if (sessionToken === 'authenticated') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - / (public homepage)
     * - /api/auth/login (public login API)
     * - Any other public assets or pages
     *
     * This simplified matcher targets /admin routes and the /login page.
     * Other public pages (like the main portfolio page at '/') are not covered by this
     * matcher and will pass through without middleware checks.
     * The API routes /api/auth/login and /api/auth/logout are handled by their own logic
     * and don't need to be explicitly excluded from requiring auth in the matcher
     * if the middleware only targets /admin and /login.
     */
    '/admin/:path*',
    '/login',
  ],
};
