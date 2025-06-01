
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    // Clear the session cookie
    cookieStore.set('sessionToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: -1, // Expire the cookie immediately
      sameSite: 'lax',
    });
    
    // Redirect to login page
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url, { status: 302 });

  } catch (error) {
    console.error('Logout error:', error);
    const url = new URL('/login?error=logout_failed', request.url);
    return NextResponse.redirect(url, { status: 302 });
  }
}
