
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// !!! VERY IMPORTANT SECURITY WARNING !!!
// DO NOT USE HARDCODED CREDENTIALS IN A PRODUCTION ENVIRONMENT.
// This is for demonstration purposes ONLY.
// In a real application:
// 1. Store hashed passwords securely (e.g., in a database).
// 2. Use environment variables for username and any sensitive configurations.
// 3. Implement proper password hashing and comparison (e.g., using bcrypt).
const ADMIN_EMAIL = 'naumanmehdi.dev@gmail.com';
const ADMIN_PASSWORD = 'amazon123'; // THIS IS EXTREMELY INSECURE

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Successful login
      const cookieStore = cookies();
      cookieStore.set('sessionToken', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'lax',
      });
      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } else {
      // Invalid credentials
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}
