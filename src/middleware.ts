/**
 * Authentication Middleware
 * Protects /admin routes - requires authenticated session
 * 
 * IMPORTANT: Single user system - just check if authenticated
 * No role checking needed
 */

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    });
                },
            },
        }
    );

    // Get session
    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Protect /admin routes (except /admin/login)
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Normalize pathname by removing trailing slash for comparison
        const normalizedPath = request.nextUrl.pathname.replace(/\/$/, '');

        // Allow access to login page (with or without trailing slash)
        if (normalizedPath === '/admin/login') {
            // If already logged in, redirect to dashboard
            if (session) {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
            return response;
        }

        // All other /admin routes require authentication
        if (!session) {
            const loginUrl = new URL('/admin/login', request.url);
            // Include search params in redirect for deep linking (e.g. ?id=...)
            const redirectPath = request.nextUrl.pathname + request.nextUrl.search;

            if (normalizedPath !== '/admin/login') {
                loginUrl.searchParams.set('redirect', redirectPath);
            }
            return NextResponse.redirect(loginUrl);
        }
    }

    return response;
}

export const config = {
    matcher: ['/admin/:path*'],
};
