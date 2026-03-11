"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, PenSquare } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logoImage from "../../../../public/images/logo.png";
import { createClient } from "@/lib/supabase";

function BloggerLoginContent() {
    const [email, setEmail]           = useState("");
    const [password, setPassword]     = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError]           = useState("");
    const router       = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const supabase = createClient();
            const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

            if (signInError) {
                setError(signInError.message);
                setIsSubmitting(false);
                return;
            }

            if (data.session) {
                const role = data.user?.user_metadata?.role;
                if (role !== 'blogger') {
                    setError("This login is for bloggers only. Please use the Admin login.");
                    await supabase.auth.signOut();
                    setIsSubmitting(false);
                    return;
                }
                const redirectTo = searchParams.get('redirect');
                router.push(redirectTo || '/blogger');
                router.refresh();
            }
        } catch {
            setError("An unexpected error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E8E4F3] via-[#F0EDF7] to-[#E5DFF5] p-4 overflow-hidden relative">

            {/* Back to Site */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 left-6 z-20"
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-gray-600 hover:text-gray-900 hover:bg-white/60 transition-all shadow-sm group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="text-sm font-medium">Back to Site</span>
                </Link>
            </motion.div>

            {/* Animated background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-20"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl mx-auto relative z-10"
            >
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid lg:grid-cols-2">

                    {/* Left Side — Form */}
                    <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">

                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-3 mb-12"
                        >
                            <div className="w-12 h-12 relative flex-shrink-0">
                                <Image quality={80} src={logoImage} alt="JS Choice Logo" className="object-contain" fill sizes="48px" />
                            </div>
                            <span className="text-2xl font-bold text-gray-800 tracking-tight">JS Choice Group</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mb-10"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2.5 rounded-2xl bg-primary/10">
                                    <PenSquare size={22} className="text-primary" />
                                </div>
                                <span className="text-xs font-bold text-primary uppercase tracking-widest">Blogger Portal</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
                                Welcome Back
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Sign in to your blogger account
                            </p>
                        </motion.div>

                        {/* Form */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {/* Error */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
                                >
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <p className="text-sm font-medium">{error}</p>
                                </motion.div>
                            )}

                            {/* Email */}
                            <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="email"
                                    placeholder="Enter your email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-14 pr-5 h-14 bg-[#F5F3FA] border-0 rounded-2xl text-gray-700 placeholder:text-gray-500 focus:bg-[#F0EDF7] focus:ring-2 focus:ring-primary/50 transition-all"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-14 pr-14 h-14 bg-[#F5F3FA] border-0 rounded-2xl text-gray-700 placeholder:text-gray-500 focus:bg-[#F0EDF7] focus:ring-2 focus:ring-primary/50 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* Links */}
                            <div className="flex items-center justify-between px-1">
                                <Link href="/admin/login" className="text-sm text-gray-400 hover:text-primary transition-colors font-medium">
                                    Admin login instead?
                                </Link>
                                <Link href="#" className="text-sm text-gray-400 hover:text-primary transition-colors font-medium">
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit */}
                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-14 rounded-full font-bold text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                                >
                                    {isSubmitting ? (
                                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        "Login to Blogger Portal"
                                    )}
                                </Button>
                            </div>
                        </motion.form>
                    </div>

                    {/* Right Side — Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="hidden lg:flex items-center justify-center p-16 relative overflow-hidden bg-gray-50/50"
                    >
                        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />

                        <motion.div
                            animate={{ y: [-15, 15, -15] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 w-full max-w-lg"
                        >
                            <div className="bg-white/60 backdrop-blur-2xl rounded-[3rem] border border-white/60 shadow-2xl p-10 space-y-6">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <PenSquare size={32} className="text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 mb-2">Blogger Dashboard</h2>
                                    <p className="text-gray-500 font-medium leading-relaxed">
                                        Write, edit, and publish your blog posts. Manage your content and grow your audience.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    {['Write & publish blog posts', 'Manage drafts & published posts', 'Track your content stats', 'Update your profile'].map((feature) => (
                                        <div key={feature} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </motion.div>
        </div>
    );
}

export default function BloggerLoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E8E4F3] via-[#F0EDF7] to-[#E5DFF5]">
                <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <BloggerLoginContent />
        </Suspense>
    );
}
