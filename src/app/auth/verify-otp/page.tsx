"use client";

/**
 * OTP verification step — DISABLED (magic-link reset only for now).
 * Users reset via the "Reset password" link in the email → /auth/callback → /auth/reset-password
 */

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authPath, parsePortal } from "@/lib/auth/portal";

function VerifyOtpRedirect() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const portal = parsePortal(searchParams.get("portal"));

    useEffect(() => {
        router.replace(authPath("/auth/forgot-password", portal));
    }, [router, portal]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E8E4F3] via-[#F0EDF7] to-[#E5DFF5]">
            <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E8E4F3] via-[#F0EDF7] to-[#E5DFF5]">
                    <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            }
        >
            <VerifyOtpRedirect />
        </Suspense>
    );
}

/*
 * --- Previous OTP implementation (kept for future use) ---
 *
 * import { KeyRound } from "lucide-react";
 * import AuthShell from "@/components/auth/AuthShell";
 * import { createClient } from "@/lib/supabase";
 * import { getSiteUrl, RESET_EMAIL_KEY } from "@/lib/auth/portal";
 *
 * Flow: forgot-password stored email in sessionStorage → user entered 6-digit code
 * → supabase.auth.verifyOtp({ email, token, type: "recovery" }) → /auth/reset-password
 */
