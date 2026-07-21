"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase";
import {
    authPath,
    getLoginUrl,
    parsePortal,
} from "@/lib/auth/portal";

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const portal = parsePortal(searchParams.get("portal"));

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [checkingSession, setCheckingSession] = useState(true);
    const [hasRecoverySession, setHasRecoverySession] = useState(false);

    useEffect(() => {
        const supabase = createClient();

        const verifySession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setHasRecoverySession(true);
                setCheckingSession(false);
                return;
            }
            router.replace(authPath("/auth/forgot-password", portal));
        };

        verifySession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "PASSWORD_RECOVERY" && session) {
                setHasRecoverySession(true);
                setCheckingSession(false);
            }
        });

        return () => subscription.unsubscribe();
    }, [router, portal]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);

        try {
            const supabase = createClient();
            const { error: updateError } = await supabase.auth.updateUser({ password });

            if (updateError) {
                setError(updateError.message);
                setIsSubmitting(false);
                return;
            }

            await supabase.auth.signOut();

            const loginUrl = `${getLoginUrl(portal)}?reset=success`;
            router.push(loginUrl);
            router.refresh();
        } catch {
            setError("An unexpected error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (checkingSession || !hasRecoverySession) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E8E4F3] via-[#F0EDF7] to-[#E5DFF5]">
                <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <AuthShell
            title="Set New Password"
            subtitle="Choose a strong password for your account."
            backHref={authPath("/auth/forgot-password", portal)}
            error={error}
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-14 pr-14 h-14 bg-[#F5F3FA] border-0 rounded-2xl text-gray-700 placeholder:text-gray-500 focus:bg-[#F0EDF7] focus:ring-2 focus:ring-primary/50 transition-all"
                        required
                        minLength={6}
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-14 pr-14 h-14 bg-[#F5F3FA] border-0 rounded-2xl text-gray-700 placeholder:text-gray-500 focus:bg-[#F0EDF7] focus:ring-2 focus:ring-primary/50 transition-all"
                        required
                        minLength={6}
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-full btn-primary font-bold text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                    {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        "Update Password"
                    )}
                </Button>
            </form>
        </AuthShell>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E8E4F3] via-[#F0EDF7] to-[#E5DFF5]">
                    <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            }
        >
            <ResetPasswordContent />
        </Suspense>
    );
}
