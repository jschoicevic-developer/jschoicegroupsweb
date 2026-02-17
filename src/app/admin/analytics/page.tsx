"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Download,
    RefreshCw,
    TrendingUp,
    Users,
    FileText,
    PieChart as PieChartIcon,
    BarChart as BarChartIcon,
    ArrowUpRight,
    ArrowDownRight,
    Loader2,
    Image as ImageIcon
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend
} from 'recharts';
import { createClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { cn } from '@/lib/utils';

// Colors for charts
const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

type TimeRange = '7d' | '30d' | '90d' | 'all';

interface ChartDataPoint {
    name: string;
    leads: number;
    referrals: number;
    total: number;
}

export default function AnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState<TimeRange>('30d');
    const [rawData, setRawData] = useState<any[]>([]);
    const [galleryCount, setGalleryCount] = useState(0);

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    const fetchAnalyticsData = async () => {
        setLoading(true);
        const supabase = createClient();

        try {
            // Fetch all leads data for client-side processing
            // In a larger app, this should be done via SQL aggregation or RPC
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: true });

            const { count: galleryTotal } = await supabase.from('gallery_items').select('*', { count: 'exact', head: true });
            setGalleryCount(galleryTotal || 0);

            if (error) throw error;
            setRawData(data || []);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const processData = useMemo(() => {
        if (!rawData.length) return {
            chartData: [],
            sourcesData: [],
            statusData: [],
            stats: { total: 0, growth: 0, conversion: 0 }
        };

        const now = new Date();
        const cutoff = new Date();

        // precise cutoff based on timeRange
        if (timeRange === '7d') cutoff.setDate(now.getDate() - 7);
        if (timeRange === '30d') cutoff.setDate(now.getDate() - 30);
        if (timeRange === '90d') cutoff.setDate(now.getDate() - 90);
        if (timeRange === 'all') cutoff.setFullYear(2020); // Arbitrary old date

        const filteredData = rawData.filter(item => new Date(item.created_at) >= cutoff);

        // 1. Time Series Data (Group by Day)
        const dailyMap = new Map<string, { leads: number, referrals: number }>();

        // Initialize days
        const tempDate = new Date(cutoff);
        while (tempDate <= now) {
            const dayKey = tempDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
            if (!dailyMap.has(dayKey)) dailyMap.set(dayKey, { leads: 0, referrals: 0 });
            tempDate.setDate(tempDate.getDate() + 1);
        }

        filteredData.forEach(item => {
            const date = new Date(item.created_at);
            const key = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

            if (dailyMap.has(key)) {
                const entry = dailyMap.get(key)!;
                if (item.source === 'referral') {
                    entry.referrals++;
                } else {
                    entry.leads++;
                }
            } else if (timeRange === 'all') {
                // For 'all', we might have dates outside our initialized range if we used a fixed cutoff
                // But generally we should be fine. If 'all', we might want to group by Month instead.
                // For simplicity, sticking to day/week logic or allowing dynamic keys for 'all'
                if (!dailyMap.has(key)) dailyMap.set(key, { leads: 0, referrals: 0 });
                const entry = dailyMap.get(key)!;
                if (item.source === 'referral') entry.referrals++;
                else entry.leads++;
            }
        });

        const chartData = Array.from(dailyMap.entries()).map(([name, counts]) => ({
            name,
            leads: counts.leads,
            referrals: counts.referrals,
            total: counts.leads + counts.referrals
        }));

        // 2. Sources Breakdown
        const sourcesMap = new Map<string, number>();
        filteredData.forEach(item => {
            const source = item.source === 'referral' ? 'Referral' :
                item.source === 'contact_form' ? 'Contact Form' :
                    item.source === 'service_matcher' ? 'Service Matcher' :
                        'Other';
            sourcesMap.set(source, (sourcesMap.get(source) || 0) + 1);
        });

        const sourcesData = Array.from(sourcesMap.entries())
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);

        // 3. Status Breakdown
        const statusMap = new Map<string, number>();
        filteredData.forEach(item => {
            const status = item.status.charAt(0).toUpperCase() + item.status.slice(1);
            statusMap.set(status, (statusMap.get(status) || 0) + 1);
        });

        const statusData = Array.from(statusMap.entries())
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);

        // 4. Headline Stats
        const total = filteredData.length;
        const prevCutoff = new Date(cutoff);
        if (timeRange === '7d') prevCutoff.setDate(cutoff.getDate() - 7);
        if (timeRange === '30d') prevCutoff.setDate(cutoff.getDate() - 30);

        const prevData = rawData.filter(item => {
            const d = new Date(item.created_at);
            return d >= prevCutoff && d < cutoff;
        });

        const growth = prevData.length ? ((total - prevData.length) / prevData.length) * 100 : 0;

        const converted = filteredData.filter(i => i.status === 'converted' || i.status === 'qualified').length;
        const conversionRate = total ? (converted / total) * 100 : 0;

        return { chartData, sourcesData, statusData, stats: { total, growth, conversion: conversionRate } };
    }, [rawData, timeRange]);

    const { chartData, sourcesData, statusData, stats } = processData;

    return (
        <div className="space-y-6 sm:space-y-8 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">
                        Analytics <span className="text-primary">& Reports</span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">
                        Detailed insights into your leads and referral performance.
                    </p>
                </div>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                    <Select value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
                        <SelectTrigger className="w-[140px] bg-white rounded-xl">
                            <Calendar className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="30d">Last 30 Days</SelectItem>
                            <SelectItem value="90d">Last 3 Months</SelectItem>
                            <SelectItem value="all">All Time</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        variant="outline"
                        className="rounded-xl gap-2 bg-white"
                        onClick={fetchAnalyticsData}
                        disabled={loading}
                    >
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                        <span className="hidden sm:inline">Refresh</span>
                    </Button>

                    <Button className="rounded-xl gap-2 bg-gradient-to-r from-primary to-secondary">
                        <Download size={16} />
                        <span className="hidden sm:inline">Export</span>
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <Users size={24} />
                        </div>
                        <div className={cn(
                            "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                            stats.growth >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        )}>
                            {stats.growth >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            {Math.abs(stats.growth).toFixed(1)}%
                        </div>
                    </div>
                    <div className="text-3xl font-black text-gray-900">{stats.total}</div>
                    <div className="text-sm font-medium text-gray-500 mt-1">Total Leads & Referrals</div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                            <ImageIcon size={24} />
                        </div>
                        <div className="bg-orange-50 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">
                            Active
                        </div>
                    </div>
                    <div className="text-3xl font-black text-gray-900">{galleryCount}</div>
                    <div className="text-sm font-medium text-gray-500 mt-1">Gallery Items</div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                            <FileText size={24} />
                        </div>
                        <div className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                            Active
                        </div>
                    </div>
                    <div className="text-3xl font-black text-gray-900">{chartData.length}</div>
                    <div className="text-sm font-medium text-gray-500 mt-1">Days with Activity</div>
                </div>
            </div>

            {/* Main Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Growth Chart */}
                <div className="lg:col-span-2 glass-card p-6 rounded-[2rem]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <TrendingUp size={20} className="text-primary" />
                            Growth Overview
                        </h3>
                    </div>
                    <div className="h-[350px] w-full">
                        {loading ? (
                            <div className="h-full w-full flex items-center justify-center">
                                <Loader2 className="animate-spin text-primary" size={32} />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorReferrals" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        dy={10}
                                        minTickGap={30}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend iconType="circle" />
                                    <Area
                                        type="monotone"
                                        dataKey="leads"
                                        name="Direct Leads"
                                        stroke="#3b82f6"
                                        fillOpacity={1}
                                        fill="url(#colorLeads)"
                                        strokeWidth={3}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="referrals"
                                        name="Referrals"
                                        stroke="#8b5cf6"
                                        fillOpacity={1}
                                        fill="url(#colorReferrals)"
                                        strokeWidth={3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Sources Pie Chart */}
                <div className="glass-card p-6 rounded-[2rem]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <PieChartIcon size={20} className="text-secondary" />
                            Traffic Sources
                        </h3>
                    </div>
                    <div className="h-[350px] w-full relative">
                        {loading ? (
                            <div className="h-full w-full flex items-center justify-center">
                                <Loader2 className="animate-spin text-primary" size={32} />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sourcesData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {sourcesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Legend
                                        layout="horizontal"
                                        verticalAlign="bottom"
                                        align="center"
                                        wrapperStyle={{ paddingTop: "20px" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                        {sourcesData.length === 0 && !loading && (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                No data available
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Status Breakdown Bar Chart */}
            <div className="glass-card p-6 rounded-[2rem]">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <BarChartIcon size={20} className="text-green-600" />
                        Lead Status Distribution
                    </h3>
                </div>
                <div className="h-[300px] w-full">
                    {loading ? (
                        <div className="h-full w-full flex items-center justify-center">
                            <Loader2 className="animate-spin text-primary" size={32} />
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statusData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    width={100}
                                    tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
}
