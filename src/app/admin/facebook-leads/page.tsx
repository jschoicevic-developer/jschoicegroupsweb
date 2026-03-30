"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import {
    Search,
    Mail,
    Phone,
    Calendar,
    Eye,
    CheckCircle,
    Clock,
    AlertCircle,
    XCircle,
    Trash2,
    Megaphone,
    Send,
    Loader2,
    CheckCircle2,
    X,
    Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { adminCache } from "@/lib/adminCache";
import { LeadsSkeleton } from "@/components/admin/skeletons";

interface FacebookLead {
    id: string;
    full_name: string;
    email: string | null;
    phone: string | null;
    campaign_id: string | null;
    campaign_name: string | null;
    ad_id: string | null;
    ad_name: string | null;
    form_id: string | null;
    form_name: string | null;
    status: "new" | "contacted" | "qualified" | "quoted" | "won" | "lost";
    notes: string | null;
    created_at: string;
    updated_at: string;
}

// ─── helpers ────────────────────────────────────────────────────────────────

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function getStatusColor(status: string) {
    switch (status) {
        case "new":       return "bg-blue-100 text-blue-700 border-blue-200";
        case "contacted": return "bg-yellow-100 text-yellow-700 border-yellow-200";
        case "qualified": return "bg-purple-100 text-purple-700 border-purple-200";
        case "quoted":    return "bg-orange-100 text-orange-700 border-orange-200";
        case "won":       return "bg-green-100 text-green-700 border-green-200";
        case "lost":      return "bg-gray-100 text-gray-700 border-gray-200";
        default:          return "bg-gray-100 text-gray-700 border-gray-200";
    }
}

function getStatusIcon(status: string) {
    switch (status) {
        case "new":       return <AlertCircle size={14} />;
        case "contacted": return <Clock size={14} />;
        case "qualified": return <CheckCircle size={14} />;
        case "quoted":    return <Clock size={14} />;
        case "won":       return <CheckCircle size={14} />;
        case "lost":      return <XCircle size={14} />;
        default:          return <Clock size={14} />;
    }
}

// ─── Email Modal ─────────────────────────────────────────────────────────────

function EmailModal({ lead, onClose, onSuccess }: { lead: FacebookLead; onClose: () => void; onSuccess?: () => void }) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSend = async () => {
        if (!subject || !message) { setError("Subject and message are required"); return; }
        try {
            setIsSending(true);
            setError(null);
            const response = await fetch(`/api/facebook-leads/${lead.id}/email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, message }),
            });
            const result = await response.json();
            if (result.success) {
                setIsSent(true);
                if (onSuccess) onSuccess();
                setTimeout(onClose, 2000);
            } else {
                setError(result.error || "Failed to send email");
            }
        } catch {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
            >
                <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white relative">
                    <button onClick={onClose} className="absolute right-6 top-6 p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md"><Mail size={24} /></div>
                        <div>
                            <h3 className="text-xl font-bold">Send Message</h3>
                            <p className="text-white/80 text-sm">To: {lead.full_name}{lead.email ? ` (${lead.email})` : ""}</p>
                        </div>
                    </div>
                </div>
                <div className="p-8">
                    {isSent ? (
                        <div className="py-12 text-center space-y-4">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 size={40} />
                            </motion.div>
                            <h4 className="text-2xl font-bold text-gray-900">Email Sent!</h4>
                            <p className="text-gray-500">Your message has been delivered successfully.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                                <Input placeholder="Enter subject..." value={subject} onChange={(e) => setSubject(e.target.value)} className="h-12 rounded-2xl border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                                <Textarea placeholder="Write your message here..." value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[180px] rounded-2xl border-gray-200 p-4 resize-none" />
                            </div>
                            {error && (
                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium">
                                    {error}
                                </motion.div>
                            )}
                            <div className="flex gap-4 pt-2">
                                <Button onClick={onClose} variant="outline" className="flex-1 h-12 rounded-2xl border-gray-200">Cancel</Button>
                                <Button onClick={handleSend} disabled={isSending || !subject || !message} className="flex-[2] h-12 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/20">
                                    {isSending ? <><Loader2 size={18} className="mr-2 animate-spin" />Sending...</> : <><Send size={18} className="mr-2" />Send Email</>}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

// ─── Main List Component ─────────────────────────────────────────────────────

function FacebookLeadsList() {
    const [leads, setLeads] = useState<FacebookLead[]>([]);
    const [loading, setLoading] = useState(!adminCache.has("fb-leads-all"));
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [campaignFilter, setCampaignFilter] = useState("all");
    const [selectedLead, setSelectedLead] = useState<FacebookLead | null>(null);
    const [emailLead, setEmailLead] = useState<FacebookLead | null>(null);
    const [deleteModalLead, setDeleteModalLead] = useState<FacebookLead | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchLeads = useCallback(async (filter: string = statusFilter) => {
        const key = `fb-leads-${filter}`;
        const cached = adminCache.get<FacebookLead[]>(key);
        if (cached && !adminCache.isStale(key)) { setLeads(cached); setLoading(false); return; }
        if (cached) { setLeads(cached); setLoading(false); } else { setLoading(true); }

        try {
            const params = new URLSearchParams({ limit: "200" });
            if (filter !== "all") params.append("status", filter);
            const response = await fetch(`/api/facebook-leads?${params}`);
            const result = await response.json();
            if (result.success) { adminCache.set(key, result.data || []); setLeads(result.data || []); }
            else if (!cached) setLeads([]);
        } catch (err) {
            console.error("Error fetching facebook leads:", err);
            if (!cached) setLeads([]);
        } finally {
            setLoading(false);
        }
    }, [statusFilter]);

    useEffect(() => { fetchLeads(statusFilter); }, [statusFilter]);

    const handleDelete = async () => {
        if (!deleteModalLead) return;
        try {
            setIsDeleting(true);
            const response = await fetch(`/api/facebook-leads/${deleteModalLead.id}`, { method: "DELETE" });
            const data = await response.json();
            if (data.success) {
                adminCache.invalidatePattern("fb-leads-");
                setLeads(leads.filter((l) => l.id !== deleteModalLead.id));
                setDeleteModalLead(null);
                alert("Lead deleted successfully!");
            } else {
                alert("Failed to delete lead: " + (data.error || "Unknown error"));
            }
        } catch {
            alert("Failed to delete lead. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    // All unique campaign names for the campaign filter dropdown
    const campaigns = Array.from(new Set(leads.map((l) => l.campaign_name).filter(Boolean))) as string[];

    const filteredLeads = leads.filter((lead) => {
        const search = searchQuery.toLowerCase();
        const matchesSearch =
            lead.full_name.toLowerCase().includes(search) ||
            lead.email?.toLowerCase().includes(search) ||
            lead.phone?.toLowerCase().includes(search) ||
            lead.campaign_name?.toLowerCase().includes(search);
        const matchesCampaign = campaignFilter === "all" || lead.campaign_name === campaignFilter;
        return matchesSearch && matchesCampaign;
    });

    const stats = {
        total:     leads.length,
        new:       leads.filter((l) => l.status === "new").length,
        contacted: leads.filter((l) => l.status === "contacted").length,
        qualified: leads.filter((l) => l.status === "qualified").length,
        quoted:    leads.filter((l) => l.status === "quoted").length,
        won:       leads.filter((l) => l.status === "won").length,
        lost:      leads.filter((l) => l.status === "lost").length,
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">
                        Facebook <span className="text-gradient">Leads</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Leads captured from Facebook & Instagram ad campaigns</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
                {[
                    { label: "Total",     value: stats.total,     color: "",                              textColor: "text-gray-900"   },
                    { label: "New",       value: stats.new,       color: "border-l-4 border-blue-500",    textColor: "text-blue-600"   },
                    { label: "Contacted", value: stats.contacted, color: "border-l-4 border-yellow-500",  textColor: "text-yellow-600" },
                    { label: "Qualified", value: stats.qualified, color: "border-l-4 border-purple-500",  textColor: "text-purple-600" },
                    { label: "Quoted",    value: stats.quoted,    color: "border-l-4 border-orange-500",  textColor: "text-orange-600" },
                    { label: "Won",       value: stats.won,       color: "border-l-4 border-green-500",   textColor: "text-green-600"  },
                    { label: "Lost",      value: stats.lost,      color: "border-l-4 border-gray-400",    textColor: "text-gray-600"   },
                ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className={`glass-card p-6 rounded-2xl ${stat.color}`}>
                        <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                        <p className={`text-3xl font-black ${stat.textColor}`}>{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="glass-card p-4 sm:p-6 rounded-2xl">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                            placeholder="Search by name, email, phone, campaign..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 rounded-xl"
                        />
                    </div>

                    {/* Campaign filter */}
                    {campaigns.length > 0 && (
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-gray-400 shrink-0" />
                            <select
                                value={campaignFilter}
                                onChange={(e) => setCampaignFilter(e.target.value)}
                                className="h-12 px-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All Campaigns</option>
                                {campaigns.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Status filter buttons */}
                    <div className="flex gap-2 flex-wrap">
                        {["all", "new", "contacted", "qualified", "quoted", "won", "lost"].map((s) => (
                            <Button key={s} onClick={() => setStatusFilter(s)} variant={statusFilter === s ? "default" : "outline"} className="rounded-xl capitalize">
                                {s === "all" ? "All" : s}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table / Empty State */}
            {loading ? (
                <LeadsSkeleton />
            ) : filteredLeads.length === 0 ? (
                <div className="glass-card p-12 rounded-2xl text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Megaphone size={32} className="text-blue-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No Facebook leads found</p>
                    <p className="text-sm text-gray-400 mt-1">Leads from your ad campaigns will appear here</p>
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block glass-card rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px]">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        {["Name", "Contact", "Campaign", "Status", "Date", "Action"].map((h) => (
                                            <th key={h} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredLeads.map((lead, index) => (
                                        <motion.tr
                                            key={lead.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.04 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            {/* Name */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#1877F2] to-[#0d5cc7] flex items-center justify-center shrink-0">
                                                        <span className="text-white font-bold text-sm">
                                                            {lead.full_name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <p className="font-bold text-gray-900">{lead.full_name}</p>
                                                </div>
                                            </td>

                                            {/* Contact */}
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    {lead.email ? (
                                                        <a href={`mailto:${lead.email}`} className="text-sm text-gray-700 hover:text-primary flex items-center gap-1">
                                                            <Mail size={12} />{lead.email}
                                                        </a>
                                                    ) : <span className="text-sm text-gray-400">No email</span>}
                                                    {lead.phone && (
                                                        <a href={`tel:${lead.phone}`} className="text-sm text-gray-700 hover:text-primary flex items-center gap-1">
                                                            <Phone size={12} />{lead.phone}
                                                        </a>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Campaign */}
                                            <td className="px-6 py-4">
                                                {lead.campaign_name ? (
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800">{lead.campaign_name}</p>
                                                        {lead.ad_name && <p className="text-xs text-gray-400 mt-0.5">{lead.ad_name}</p>}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">—</span>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(lead.status)}`}>
                                                    {getStatusIcon(lead.status)}
                                                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                                </span>
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Calendar size={12} />{formatDate(lead.created_at)}
                                                </span>
                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setSelectedLead(lead)}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-sm font-semibold transition-colors"
                                                >
                                                    <Eye size={15} />View
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {filteredLeads.map((lead, index) => (
                            <motion.div
                                key={lead.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-card p-5 rounded-2xl space-y-4"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#1877F2] to-[#0d5cc7] flex items-center justify-center shrink-0">
                                            <span className="text-white font-bold">{lead.full_name.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{lead.full_name}</p>
                                            {lead.campaign_name && <p className="text-xs text-gray-500 mt-0.5">{lead.campaign_name}</p>}
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedLead(lead)} className="p-2 bg-primary/10 rounded-xl text-primary hover:bg-primary/20 transition-colors">
                                        <Eye size={18} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="space-y-1.5">
                                        {lead.email && <div className="flex items-center gap-2 text-gray-600"><Mail size={13} /><span className="truncate">{lead.email}</span></div>}
                                        {lead.phone && <div className="flex items-center gap-2 text-gray-600"><Phone size={13} /><span>{lead.phone}</span></div>}
                                        <div className="flex items-center gap-2 text-gray-400"><Calendar size={13} /><span className="text-xs">{formatDate(lead.created_at)}</span></div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(lead.status)}`}>
                                            {getStatusIcon(lead.status)}{lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}

            {/* ── View / Detail Modal ── */}
            <AnimatePresence>
                {selectedLead && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-[#1877F2] to-[#0d5cc7] p-6 shrink-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                            <span className="text-white text-xl font-bold">{selectedLead.full_name.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">{selectedLead.full_name}</h3>
                                            <p className="text-blue-100 text-sm mt-0.5">Facebook Lead Details</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedLead(null)} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"><X size={20} /></button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6 overflow-y-auto">
                                {/* Contact Info */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contact Information</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-bold text-gray-500 mb-1">Email</p>
                                            {selectedLead.email
                                                ? <a href={`mailto:${selectedLead.email}`} className="text-primary hover:underline text-sm">{selectedLead.email}</a>
                                                : <span className="text-gray-400 text-sm">Not provided</span>}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-500 mb-1">Phone</p>
                                            {selectedLead.phone
                                                ? <a href={`tel:${selectedLead.phone}`} className="text-primary hover:underline text-sm">{selectedLead.phone}</a>
                                                : <span className="text-gray-400 text-sm">Not provided</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Status</h4>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold border ${getStatusColor(selectedLead.status)}`}>
                                        {getStatusIcon(selectedLead.status)}
                                        {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                                    </span>
                                </div>

                                {/* Campaign Info */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Campaign Details</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-bold text-gray-500 mb-1">Campaign</p>
                                            <p className="text-gray-900 text-sm">{selectedLead.campaign_name || "—"}</p>
                                            {selectedLead.campaign_id && <p className="text-xs text-gray-400 mt-0.5">ID: {selectedLead.campaign_id}</p>}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-500 mb-1">Ad</p>
                                            <p className="text-gray-900 text-sm">{selectedLead.ad_name || "—"}</p>
                                            {selectedLead.ad_id && <p className="text-xs text-gray-400 mt-0.5">ID: {selectedLead.ad_id}</p>}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-500 mb-1">Lead Form</p>
                                            <p className="text-gray-900 text-sm">{selectedLead.form_name || "—"}</p>
                                            {selectedLead.form_id && <p className="text-xs text-gray-400 mt-0.5">ID: {selectedLead.form_id}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Notes */}
                                {selectedLead.notes && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Notes</h4>
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-gray-700 text-sm leading-relaxed">{selectedLead.notes}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Timestamps */}
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 mb-1">Created</p>
                                        <p className="text-sm text-gray-700">{formatDate(selectedLead.created_at)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 mb-1">Last Updated</p>
                                        <p className="text-sm text-gray-700">{formatDate(selectedLead.updated_at)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-between shrink-0">
                                <Button
                                    onClick={() => { setDeleteModalLead(selectedLead); setSelectedLead(null); }}
                                    className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 gap-1.5"
                                >
                                    <Trash2 size={15} />Delete
                                </Button>
                                <div className="flex gap-3">
                                    <Button onClick={() => setSelectedLead(null)} variant="outline">Close</Button>
                                    {selectedLead.email && (
                                        <Button
                                            onClick={() => { setEmailLead(selectedLead); setSelectedLead(null); }}
                                            className="bg-gradient-to-r from-primary to-secondary text-white gap-1.5"
                                        >
                                            <Mail size={15} />Send Email
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── Delete Confirmation Modal ── */}
            <AnimatePresence>
                {deleteModalLead && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-white/20 rounded-full"><Trash2 size={24} className="text-white" /></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Delete Lead</h3>
                                        <p className="text-red-100 text-sm mt-1">This action cannot be undone</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-700 mb-4">
                                    Are you sure you want to delete the lead for{" "}
                                    <span className="font-bold text-gray-900">{deleteModalLead.full_name}</span>?
                                </p>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-1.5">
                                    {deleteModalLead.email && <p className="text-sm text-gray-600"><span className="font-semibold">Email:</span> {deleteModalLead.email}</p>}
                                    {deleteModalLead.campaign_name && <p className="text-sm text-gray-600"><span className="font-semibold">Campaign:</span> {deleteModalLead.campaign_name}</p>}
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
                                <Button onClick={() => setDeleteModalLead(null)} variant="outline" disabled={isDeleting}>Cancel</Button>
                                <Button onClick={handleDelete} disabled={isDeleting} className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700">
                                    {isDeleting ? <><div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />Deleting...</> : <><Trash2 size={16} className="mr-2" />Delete Lead</>}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── Email Modal ── */}
            <AnimatePresence>
                {emailLead && (
                    <EmailModal
                        lead={emailLead}
                        onClose={() => setEmailLead(null)}
                        onSuccess={() => {
                            adminCache.invalidatePattern("fb-leads-");
                            fetchLeads(statusFilter);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FacebookLeadsPage() {
    return (
        <Suspense fallback={<LeadsSkeleton />}>
            <FacebookLeadsList />
        </Suspense>
    );
}
