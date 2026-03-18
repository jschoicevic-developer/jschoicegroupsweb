import React from "react";
import { cn } from "@/lib/utils";

function Sk({ className, style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <div className={cn("relative overflow-hidden rounded-lg bg-gray-200", className)} style={style}>
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-6 sm:space-y-8 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <Sk className="h-8 w-64" />
                <Sk className="h-4 w-48" />
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <Sk className="h-12 w-12 rounded-2xl" />
                        <Sk className="h-3 w-24" />
                        <Sk className="h-9 w-16" />
                        <Sk className="h-3 w-20" />
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                {/* Recent Activities */}
                <div className="xl:col-span-2 space-y-4">
                    <Sk className="h-6 w-40" />
                    <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="p-4 sm:p-6 border-b border-gray-50 last:border-0 flex items-center gap-4">
                                <Sk className="h-12 w-12 rounded-2xl shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <Sk className="h-4 w-48" />
                                    <Sk className="h-3 w-32" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chart */}
                <div className="space-y-4">
                    <Sk className="h-6 w-40" />
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm h-[400px] flex flex-col gap-4">
                        <Sk className="h-10 w-32" />
                        <Sk className="flex-1 rounded-xl" />
                        <Sk className="h-10 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function LeadsSkeleton() {
    return (
        <div className="space-y-6 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                    <Sk className="h-8 w-40" />
                    <Sk className="h-4 w-56" />
                </div>
            </div>

            {/* Filter bar */}
            <div className="flex flex-wrap gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Sk key={i} className="h-9 w-24 rounded-full" />
                ))}
                <div className="ml-auto">
                    <Sk className="h-9 w-64 rounded-lg" />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                {/* Table header */}
                <div className="p-4 sm:p-6 border-b border-gray-100 flex gap-4">
                    {[120, 80, 100, 80, 60].map((w, i) => (
                        <Sk key={i} className="h-3 rounded" style={{ width: w }} />
                    ))}
                </div>
                {/* Table rows */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="p-4 sm:p-6 border-b border-gray-50 last:border-0 flex items-center gap-4">
                        <Sk className="h-10 w-10 rounded-xl shrink-0" />
                        <div className="flex-1 min-w-0 space-y-2">
                            <Sk className="h-4 w-40" />
                            <Sk className="h-3 w-32" />
                        </div>
                        <Sk className="h-6 w-20 rounded-full" />
                        <Sk className="h-3 w-24 hidden sm:block" />
                        <Sk className="h-8 w-8 rounded-lg ml-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ReferralsSkeleton() {
    return <LeadsSkeleton />;
}

export function AnalyticsSkeleton() {
    return (
        <div className="space-y-6 sm:space-y-8 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                    <Sk className="h-8 w-48" />
                    <Sk className="h-4 w-64" />
                </div>
                <div className="flex gap-3">
                    <Sk className="h-9 w-36 rounded-lg" />
                    <Sk className="h-9 w-9 rounded-lg" />
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
                        <Sk className="h-10 w-10 rounded-xl" />
                        <Sk className="h-8 w-20" />
                        <Sk className="h-3 w-24" />
                        <Sk className="h-3 w-16" />
                    </div>
                ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                    <Sk className="h-6 w-40" />
                    <Sk className="h-64 w-full rounded-xl" />
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                    <Sk className="h-6 w-32" />
                    <Sk className="h-64 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
}

export function BlogSkeleton() {
    return (
        <div className="space-y-6 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                    <Sk className="h-8 w-40" />
                    <Sk className="h-4 w-48" />
                </div>
                <Sk className="h-10 w-36 rounded-xl" />
            </div>

            {/* Filter bar */}
            <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Sk key={i} className="h-9 w-24 rounded-full" />
                ))}
                <div className="ml-auto">
                    <Sk className="h-9 w-56 rounded-lg" />
                </div>
            </div>

            {/* Post cards */}
            <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex items-start gap-4">
                        <Sk className="h-16 w-16 rounded-xl shrink-0" />
                        <div className="flex-1 space-y-2">
                            <Sk className="h-5 w-3/4" />
                            <Sk className="h-3 w-1/2" />
                            <div className="flex gap-2 mt-3">
                                <Sk className="h-5 w-16 rounded-full" />
                                <Sk className="h-5 w-20 rounded-full" />
                            </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <Sk className="h-8 w-8 rounded-lg" />
                            <Sk className="h-8 w-8 rounded-lg" />
                            <Sk className="h-8 w-8 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function GallerySkeleton() {
    return (
        <div className="space-y-6 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                    <Sk className="h-8 w-40" />
                    <Sk className="h-4 w-48" />
                </div>
                <Sk className="h-10 w-36 rounded-xl" />
            </div>

            {/* Search */}
            <Sk className="h-10 w-full sm:w-72 rounded-lg" />

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <Sk className="h-48 w-full rounded-none" />
                        <div className="p-4 space-y-2">
                            <Sk className="h-4 w-3/4" />
                            <Sk className="h-3 w-1/2" />
                            <div className="flex gap-2 mt-3">
                                <Sk className="h-8 flex-1 rounded-lg" />
                                <Sk className="h-8 w-8 rounded-lg" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
