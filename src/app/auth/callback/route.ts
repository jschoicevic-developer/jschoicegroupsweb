import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { parsePortal } from "@/lib/auth/portal";
import type { EmailOtpType } from "@supabase/supabase-js";

function buildRedirectTarget(next: string, portal: ReturnType<typeof parsePortal>) {
    if (next.startsWith("/")) {
        return `${next}${next.includes("?") ? "&" : "?"}portal=${portal}`;
    }
    return `/auth/reset-password?portal=${portal}`;
}

function createSupabaseWithCookies(cookieStore: Awaited<ReturnType<typeof cookies>>) {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options) {
                    cookieStore.set({ name, value, ...options });
                },
                remove(name: string, options) {
                    cookieStore.set({ name, value: "", ...options });
                },
            },
        }
    );
}

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = searchParams.get("next") ?? "/auth/reset-password";
    const portal = parsePortal(searchParams.get("portal"));

    const redirectTarget = buildRedirectTarget(next, portal);
    const loginPath = portal === "blogger" ? "/blogger/login" : "/admin/login";
    const errorRedirect = `${origin}${loginPath}?error=auth_callback_error`;

    const cookieStore = await cookies();
    const supabase = createSupabaseWithCookies(cookieStore);

    if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type,
        });

        if (!error) {
            return NextResponse.redirect(`${origin}${redirectTarget}`);
        }
    }

    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(`${origin}${redirectTarget}`);
        }
    }

    return NextResponse.redirect(errorRedirect);
}
