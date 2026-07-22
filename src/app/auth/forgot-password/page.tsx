"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { User, Mail } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase";
import {
    getDashboardUrl,
    getLoginUrl,
    getSiteUrl,
    parsePortal,
} from "@/lib/auth/portal";

function ForgotPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const portal = parsePortal(searchParams.get("portal"));

    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const role = session.user.user_metadata?.role;
                router.replace(getDashboardUrl(role, portal));
            }
        };
        checkSession();
    }, [router, portal]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSuccess(false);

        try {
            const supabase = createClient();
            const siteUrl = getSiteUrl();
            const redirectTo = `${siteUrl}/auth/callback?next=${encodeURIComponent(`/auth/reset-password?portal=${portal}`)}&portal=${portal}`;

            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
                redirectTo,
            });

            if (resetError) {
                const isRateLimited =
                    resetError.message.toLowerCase().includes("rate limit") ||
                    resetError.message.includes("over_email_send_rate_limit");

                setError(
                    isRateLimited
                        ? "Too many reset emails were sent recently. Check your inbox (and spam) for an earlier link, or wait about an hour before trying again."
                        : resetError.message
                );
                setIsSubmitting(false);
                return;
            }

            // Magic-link flow only (OTP verify step disabled for now)
            setSuccess(true);
            setIsSubmitting(false);
        } catch {
            setError("An unexpected error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <AuthShell
                title="Check Your Email"
                subtitle={`If an account exists for ${email}, we sent a password reset link.`}
                backHref={getLoginUrl(portal)}
            >
                <div className="space-y-6">
                    <div className="flex items-start gap-3 p-4 bg-[#F5F3FA] rounded-2xl text-gray-700">
                        <Mail className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                        <p className="text-sm leading-relaxed">
                            Open the email and click <strong>Reset password</strong>. That link will take you to a page where you can choose a new password.
                        </p>
                    </div>
                    <Link href={getLoginUrl(portal)}>
                        <Button
                            type="button"
                            className="w-full h-14 rounded-full btn-primary font-bold text-base"
                        >
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </AuthShell>
        );
    }

    return (
        <AuthShell
            title="Forgot Password"
            subtitle="Enter your email and we'll send a reset link."
            backHref={getLoginUrl(portal)}
            error={error}
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        type="email"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-14 pr-5 h-14 bg-[#F5F3FA] border-0 rounded-2xl text-gray-700 placeholder:text-gray-500 focus:bg-[#F0EDF7] focus:ring-2 focus:ring-primary/50 transition-all"
                        required
                        autoComplete="email"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-full btn-primary font-bold text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                    {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        "Send Reset Link"
                    )}
                </Button>
            </form>
        </AuthShell>
    );
}

export default function ForgotPasswordPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E8E4F3] via-[#F0EDF7] to-[#E5DFF5]">
                    <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            }
        >
            <ForgotPasswordContent />
        </Suspense>
    );
}
