import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { parsePortal } from "@/lib/auth/portal";

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/auth/reset-password";
    const portal = parsePortal(searchParams.get("portal"));

    const redirectTarget = next.startsWith("/")
        ? `${next}${next.includes("?") ? "&" : "?"}portal=${portal}`
        : `/auth/reset-password?portal=${portal}`;

    if (code) {
        const cookieStore = await cookies();
        const supabase = createServerClient(
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

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(`${origin}${redirectTarget}`);
        }
    }

    const loginPath = portal === "blogger" ? "/blogger/login" : "/admin/login";
    return NextResponse.redirect(`${origin}${loginPath}?error=auth_callback_error`);
}
