/**
 * Facebook Token Exchange Utilities
 *
 * Flow:
 *  1. Short-lived User Token (valid ~1 h, from Graph Explorer or Facebook Login)
 *       ↓  exchangeForLongLivedToken()
 *  2. Long-Lived User Token (valid 60 days)
 *       ↓  fetchPageAccessToken()
 *  3. Never-expiring Page Access Token  ← save this to FACEBOOK_PAGE_ACCESS_TOKEN
 *
 * References:
 *   https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived/
 *   https://developers.facebook.com/docs/pages/access-tokens/
 */

const GRAPH_BASE = 'https://graph.facebook.com/v19.0';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LongLivedTokenResult {
    access_token: string;
    token_type: string;
    expires_in?: number;         // seconds; ~60 days
}

export interface PageAccount {
    id: string;
    name: string;
    access_token: string;        // never-expiring page token
    category: string;
    tasks: string[];
}

export interface PageAccountsResult {
    data: PageAccount[];
}

export interface TokenExchangeError {
    error: {
        message: string;
        type: string;
        code: number;
    };
}

// ─── Step 1 — Exchange short-lived → long-lived user token ───────────────────

export async function exchangeForLongLivedToken(
    shortLivedUserToken: string
): Promise<LongLivedTokenResult> {
    const appId     = process.env.FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;

    if (!appId || !appSecret) {
        throw new Error(
            'FACEBOOK_APP_ID and FACEBOOK_APP_SECRET must be set in .env'
        );
    }

    const url = new URL(`${GRAPH_BASE}/oauth/access_token`);
    url.searchParams.set('grant_type',        'fb_exchange_token');
    url.searchParams.set('client_id',         appId);
    url.searchParams.set('client_secret',     appSecret);
    url.searchParams.set('fb_exchange_token', shortLivedUserToken);

    const res = await fetch(url.toString());
    const json = await res.json();

    if (!res.ok || json.error) {
        const err = (json as TokenExchangeError).error;
        throw new Error(
            `Token exchange failed [${err?.code}]: ${err?.message ?? res.statusText}`
        );
    }

    const result = json as LongLivedTokenResult;
    const expiresInDays = result.expires_in
        ? Math.round(result.expires_in / 86400)
        : 60;

    console.log(`✅ Long-lived user token obtained (expires in ~${expiresInDays} days)`);
    return result;
}

// ─── Step 2 — Fetch never-expiring Page Access Token ─────────────────────────

export async function fetchPageAccessTokens(
    longLivedUserToken: string
): Promise<PageAccount[]> {
    const url = new URL(`${GRAPH_BASE}/me/accounts`);
    url.searchParams.set('access_token', longLivedUserToken);
    url.searchParams.set('fields',       'id,name,access_token,category,tasks');

    const res = await fetch(url.toString());
    const json = await res.json();

    if (!res.ok || json.error) {
        const err = (json as TokenExchangeError).error;
        throw new Error(
            `Fetching /me/accounts failed [${err?.code}]: ${err?.message ?? res.statusText}`
        );
    }

    const result = json as PageAccountsResult;
    const pages  = result.data ?? [];

    if (pages.length === 0) {
        console.warn('⚠️  No pages found for this user token.');
        return [];
    }

    console.log(`\n📄 Found ${pages.length} page(s):\n`);
    pages.forEach((page, i) => {
        console.log(`  [${i + 1}] Page name  : ${page.name}`);
        console.log(`       Page ID    : ${page.id}`);
        console.log(`       Page token : ${page.access_token}`);
        console.log(
            `       ➜ Add to .env → FACEBOOK_PAGE_ACCESS_TOKEN=${page.access_token}\n`
        );
    });

    return pages;
}

// ─── Combined helper — do both steps in one call ──────────────────────────────

export async function getPageTokenFromShortLived(
    shortLivedUserToken: string
): Promise<PageAccount[]> {
    console.log('🔄 Step 1 — Exchanging short-lived token for long-lived token...');
    const { access_token: longLivedToken } =
        await exchangeForLongLivedToken(shortLivedUserToken);

    console.log('🔄 Step 2 — Fetching Page Access Tokens from /me/accounts...');
    const pages = await fetchPageAccessTokens(longLivedToken);

    return pages;
}
