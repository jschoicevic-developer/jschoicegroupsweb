/**
 * Authentication Proxy (Next.js 16)
 * Protects /admin routes (super admin) and /blogger routes (bloggers).
 * Roles are stored in Supabase user_metadata.role
 */

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: { headers: request.headers },
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
                    request.cookies.set({ name, value, ...options });
                    response = NextResponse.next({ request: { headers: request.headers } });
                    response.cookies.set({ name, value, ...options });
                },
                remove(name: string, options) {
                    request.cookies.set({ name, value: '', ...options });
                    response = NextResponse.next({ request: { headers: request.headers } });
                    response.cookies.set({ name, value: '', ...options });
                },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();
    const normalizedPath = request.nextUrl.pathname.replace(/\/$/, '');
    const role = session?.user?.user_metadata?.role;

    // ── /admin/login ─────────────────────────────────────────────────────────
    if (normalizedPath === '/admin/login') {
        if (session) {
            // Already logged in — redirect based on role
            if (role === 'blogger') return NextResponse.redirect(new URL('/blogger', request.url));
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return response;
    }

    // ── /blogger/login ────────────────────────────────────────────────────────
    if (normalizedPath === '/blogger/login') {
        if (session) {
            if (role === 'blogger') return NextResponse.redirect(new URL('/blogger', request.url));
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return response;
    }

    // ── /admin/* — requires authenticated non-blogger session ─────────────────
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!session) {
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('redirect', request.nextUrl.pathname + request.nextUrl.search);
            return NextResponse.redirect(loginUrl);
        }
        // Bloggers should not access admin panel
        if (role === 'blogger') {
            return NextResponse.redirect(new URL('/blogger', request.url));
        }
        return response;
    }

    // ── /blogger/* — requires authenticated blogger session ───────────────────
    if (request.nextUrl.pathname.startsWith('/blogger')) {
        if (!session) {
            const loginUrl = new URL('/blogger/login', request.url);
            loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
        // Non-bloggers should not access blogger panel
        if (role !== 'blogger') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return response;
    }

    return response;
}

export const config = {
    matcher: ['/admin/:path*', '/blogger/:path*'],
};
