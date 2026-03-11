"use client";

import BloggerSidebar from "@/components/blogger/BloggerSidebar";
import BloggerHeader from "@/components/blogger/BloggerHeader";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function BloggerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, loading, isAuthenticated } = useAuth();

    const normalizedPath = pathname?.replace(/\/$/, '') ?? '';
    const isLoginPage = normalizedPath === "/blogger/login";

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) {
            router.push('/blogger/login');
            return;
        }
        const role = user?.user_metadata?.role;
        if (role !== 'blogger') {
            router.push('/admin');
        }
    }, [loading, isAuthenticated, user, router]);

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div suppressHydrationWarning className="min-h-screen flex items-center justify-center bg-[#F7FAFC]">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated || user?.user_metadata?.role !== 'blogger') {
        return (
            <div suppressHydrationWarning className="min-h-screen flex items-center justify-center bg-[#F7FAFC]">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div suppressHydrationWarning className="flex min-h-screen bg-[#F7FAFC]">
            <BloggerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {sidebarOpen && (
                <div
                    suppressHydrationWarning
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div suppressHydrationWarning className="flex-1 flex flex-col min-w-0">
                <BloggerHeader onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
