"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase";
import {
    authPath,
    getSiteUrl,
    parsePortal,
    RESET_EMAIL_KEY,
} from "@/lib/auth/portal";

const RESEND_COOLDOWN_SEC = 60;

function VerifyOtpContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const portal = parsePortal(searchParams.get("portal"));

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState("");
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        const storedEmail = sessionStorage.getItem(RESET_EMAIL_KEY);
        if (!storedEmail) {
            router.replace(authPath("/auth/forgot-password", portal));
            return;
        }
        setEmail(storedEmail);
    }, [router, portal]);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => {
            setCooldown((prev) => Math.max(0, prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        setError("");

        try {
            const supabase = createClient();
            const { error: verifyError } = await supabase.auth.verifyOtp({
                email,
                token: otp.trim(),
                type: "recovery",
            });

            if (verifyError) {
                setError(verifyError.message);
                setIsSubmitting(false);
                return;
            }

            router.push(authPath("/auth/reset-password", portal));
        } catch {
            setError("An unexpected error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        if (!email || cooldown > 0) return;

        setIsResending(true);
        setError("");

        try {
            const supabase = createClient();
            const siteUrl = getSiteUrl();
            const redirectTo = `${siteUrl}/auth/callback?next=${encodeURIComponent(`/auth/reset-password?portal=${portal}`)}&portal=${portal}`;

            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo,
            });

            if (resetError) {
                setError(resetError.message);
            } else {
                setCooldown(RESEND_COOLDOWN_SEC);
            }
        } catch {
            setError("Failed to resend code. Please try again.");
        } finally {
            setIsResending(false);
        }
    };

    if (!email) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E8E4F3] via-[#F0EDF7] to-[#E5DFF5]">
                <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <AuthShell
            title="Verify Code"
            subtitle={`Enter the 6-digit code sent to ${email}`}
            backHref={authPath("/auth/forgot-password", portal)}
            backLabel="Change email"
            error={error}
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="pl-14 pr-5 h-14 bg-[#F5F3FA] border-0 rounded-2xl text-gray-700 placeholder:text-gray-500 focus:bg-[#F0EDF7] focus:ring-2 focus:ring-primary/50 transition-all tracking-[0.3em] text-center font-mono text-lg"
                        required
                        autoComplete="one-time-code"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting || otp.length < 6}
                    className="w-full h-14 rounded-full btn-primary font-bold text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                    {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        "Verify Code"
                    )}
                </Button>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={isResending || cooldown > 0}
                        className="text-sm text-gray-400 hover:text-primary transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {cooldown > 0
                            ? `Resend code in ${cooldown}s`
                            : isResending
                              ? "Sending..."
                              : "Resend verification code"}
                    </button>
                </div>
            </form>
        </AuthShell>
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
            <VerifyOtpContent />
        </Suspense>
    );
}
