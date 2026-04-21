/**
 * One-time Facebook Token Refresh Endpoint
 *
 * Hit this route once with your short-lived User Access Token to get
 * the never-expiring Page Access Token, then save it to your .env.
 *
 * Usage:
 *   GET /api/refresh-fb-token?token=YOUR_SHORT_LIVED_USER_TOKEN
 *
 * How to get a short-lived User Token:
 *   1. Go to https://developers.facebook.com/tools/explorer/
 *   2. Select your App and your Page
 *   3. Add permissions: pages_show_list, pages_read_engagement, leads_retrieval
 *   4. Click "Generate Access Token" — copy the token
 *   5. Paste it as the ?token= param when calling this route
 *
 * After you get the page token from the response:
 *   • Copy the access_token value
 *   • Set FACEBOOK_PAGE_ACCESS_TOKEN=<value> in your .env
 *   • Redeploy / restart your server
 *
 * Security: this route checks for REFRESH_SECRET in the query string.
 *   Set FACEBOOK_REFRESH_SECRET=any-random-string in your .env
 *   and pass ?secret=<value> alongside ?token=
 *   Leave FACEBOOK_REFRESH_SECRET unset to skip the check (not recommended in prod).
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPageTokenFromShortLived } from '@/lib/facebook-token';

export async function GET(request: NextRequest) {
    // ── Optional secret guard ────────────────────────────────────────────────
    const refreshSecret = process.env.FACEBOOK_REFRESH_SECRET;
    if (refreshSecret) {
        const providedSecret = request.nextUrl.searchParams.get('secret');
        if (providedSecret !== refreshSecret) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized — wrong or missing ?secret=' },
                { status: 401 }
            );
        }
    }

    // ── Validate token param ─────────────────────────────────────────────────
    const shortLivedToken = request.nextUrl.searchParams.get('token');
    if (!shortLivedToken) {
        return NextResponse.json(
            {
                success: false,
                error: 'Missing ?token= query parameter.',
                hint: 'Pass your short-lived User Access Token from https://developers.facebook.com/tools/explorer/',
            },
            { status: 400 }
        );
    }

    // ── Run token exchange ───────────────────────────────────────────────────
    try {
        const pages = await getPageTokenFromShortLived(shortLivedToken);

        if (pages.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'No pages found for this user token.',
                hint: 'Make sure the token has pages_show_list and leads_retrieval permissions.',
            }, { status: 404 });
        }

        // Build a clean response — one entry per page
        const result = pages.map((page) => ({
            page_name:         page.name,
            page_id:           page.id,
            page_access_token: page.access_token,
            env_line:          `FACEBOOK_PAGE_ACCESS_TOKEN=${page.access_token}`,
        }));

        // Also log to server console so it appears in your deployment logs
        console.log('\n🎉 Token refresh complete. Copy the env_line into your .env:\n');
        result.forEach((r) => console.log(`  ${r.env_line}\n`));

        return NextResponse.json({
            success: true,
            message: 'Copy the env_line value into your .env as FACEBOOK_PAGE_ACCESS_TOKEN, then redeploy.',
            pages: result,
        });

    } catch (err: any) {
        console.error('Token refresh error:', err);
        return NextResponse.json(
            {
                success: false,
                error: err?.message ?? 'Unknown error during token exchange.',
                hint: 'Make sure FACEBOOK_APP_ID and FACEBOOK_APP_SECRET are set in .env, and that the token is valid and not already expired.',
            },
            { status: 500 }
        );
    }
}
