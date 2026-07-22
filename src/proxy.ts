/**
 * Authentication Proxy (Next.js 16)
 * Protects /admin routes (super admin) and /blogger routes (bloggers).
 * Roles are stored in Supabase user_metadata.role
 */

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

function redirectAuthCallbackIfNeeded(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

    if (pathname.startsWith('/auth/callback')) {
        return null;
    }

    const code = searchParams.get('code');
    const tokenHash = searchParams.get('token_hash');
    const type = searchParams.get('type');

    if (!code && !(tokenHash && type)) {
        return null;
    }

    const url = request.nextUrl.clone();
    url.pathname = '/auth/callback';

    if (!url.searchParams.has('next')) {
        url.searchParams.set('next', '/auth/reset-password');
    }
    if (!url.searchParams.has('portal')) {
        url.searchParams.set('portal', searchParams.get('portal') ?? 'admin');
    }

    return NextResponse.redirect(url);
}

export async function proxy(request: NextRequest) {
    const authRedirect = redirectAuthCallbackIfNeeded(request);
    if (authRedirect) {
        return authRedirect;
    }

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
    matcher: ['/', '/admin/:path*', '/blogger/:path*', '/auth/:path*'],
};
