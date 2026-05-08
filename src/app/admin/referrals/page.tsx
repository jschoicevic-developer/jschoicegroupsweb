"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Eye,
    CheckCircle,
    Clock,
    AlertCircle,
    XCircle,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommunicationPanel from "@/components/admin/CommunicationPanel";
import { adminCache } from "@/lib/adminCache";
import { ReferralsSkeleton } from "@/components/admin/skeletons";

interface Lead {
    id: string;
    first_name: string;
    last_name: string | null;
    email: string | null;
    phone: string | null;
    location: string | null;
    message: string | null;
    source: string;
    source_page: string | null;
    source_details: Record<string, any> | string | null;
    ndis_participant: boolean | null;
    ndis_status: string | null;
    ndis_number: string | null;
    interested_services: string[] | null;
    service_matcher_answers: Record<string, any> | null;
    preferred_contact: string | null;
    state: string | null;
    status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
    priority: 'low' | 'normal' | 'high';
    created_at: string;
    updated_at: string;
}

// Human-readable labels for the questionnaire answers
const ANSWER_LABELS: Record<string, string> = {
    // who
    'support-coordinator-client': 'Client of a support coordinator',
    'myself': 'Myself',
    'family': 'Family member',
    'someone-else': 'Someone else',
    // urgency
    'immediate': 'Immediately',
    'week': 'Within a week',
    'month': 'Within a month',
    'research': 'Just researching',
    // service
    'sil-services': 'SIL Services',
    'disability-home-support-services': 'Home Support',
    'support-workers': 'Support Workers',
    'behaviour-support': 'Behaviour Support',
    'plan-management': 'Plan Management',
    'support-coordination': 'Support Coordination',
    'home-care-packages': 'Home Care Packages',
    'personal-care-services': 'Personal Care',
    'respite-care': 'Respite Care',
    'cleaning-services': 'Cleaning',
    'meal-preparation-services': 'Meal Prep',
    'transport-services': 'Transport',
    // funding
    'yes-ndis': 'NDIS',
    'yes-aged-care': 'Aged care (HCP, Support at Home, CHSP)',
    'private': 'Paying privately',
    'dva': 'DVA / veteran',
    'applying': 'Still applying',
    'not-sure': 'Not sure',
    // plan management
    'plan-managed': 'Plan managed',
    'self-managed': 'Self-managed',
    'ndia-managed': 'NDIA managed',
    // aged care program
    'hcp': 'Home Care Package (HCP)',
    'support-at-home': 'Support at Home',
    'chsp': 'CHSP',
    // frequency
    'few-hours': 'A few hours a week',
    'several-days': 'Several days a week',
    'daily': 'Daily',
};

const FIELD_LABELS: Record<string, string> = {
    who: 'Care for',
    urgency: 'Urgency',
    service: 'Service Needed',
    funding: 'Funding',
    plan_management: 'NDIS Plan Management',
    aged_care_program: 'Aged Care Program',
    frequency: 'Frequency',
    // Legacy form fields (older referrals)
    referrerType: 'Referrer Type',
    primaryService: 'Primary Service',
    secondaryService: 'Secondary Service',
    serviceHours: 'Weekly Hours',
    ndisPlanType: 'NDIS Plan Type',
    hasGuardian: 'Has Guardian',
    countryOfBirth: 'Country Of Birth',
    requireInterpreter: 'Interpreter Required',
    culturalConsiderations: 'Cultural Considerations',
    isIndigenous: 'Aboriginal / Torres Strait Islander',
    disabilityConditions: 'Disability / Conditions',
    extraInfo: 'Extra Info',
    consultationTypes: 'Consultation Types',
    contactPerson: 'Contact Person',
    receptionNotes: 'Reception Notes',
    dob: 'Year of Birth',
    gender: 'Gender',
};

const labelize = (key: string) =>
    FIELD_LABELS[key] || key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();

const labelizeValue = (val: unknown): string => {
    if (val === null || val === undefined || val === '') return '-';
    if (Array.isArray(val)) {
        return val.map((v) => ANSWER_LABELS[String(v)] || String(v)).join(', ');
    }
    if (typeof val === 'boolean') return val ? 'Yes' : 'No';
    const s = String(val);
    return ANSWER_LABELS[s] || s;
};

export default function ReferralsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(!adminCache.has('referrals-all'));
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [emailLead, setEmailLead] = useState<Lead | null>(null);

    useEffect(() => {
        fetchReferrals(statusFilter);
    }, [statusFilter]);

    const fetchReferrals = async (filter: string = statusFilter) => {
        const key = `referrals-${filter}`;
        const cached = adminCache.get<Lead[]>(key);

        if (cached && !adminCache.isStale(key)) {
            setLeads(cached);
            setLoading(false);
            return;
        }

        if (cached) {
            setLeads(cached);
            setLoading(false);
        } else {
            setLoading(true);
        }

        try {
            const params = new URLSearchParams({ limit: '100', source: 'referral' });
            if (filter !== 'all') params.append('status', filter);

            const response = await fetch(`/api/leads?${params}`);
            const result = await response.json();

            if (result.success) {
                adminCache.set(key, result.data || []);
                setLeads(result.data || []);
            } else {
                if (!cached) setLeads([]);
            }
        } catch (error) {
            console.error('Error fetching referrals:', error);
            if (!cached) setLeads([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'contacted': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'qualified': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'converted': return 'bg-green-100 text-green-700 border-green-200';
            case 'lost': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'new': return <AlertCircle size={14} />;
            case 'contacted': return <Clock size={14} />;
            case 'qualified': return <CheckCircle size={14} />;
            case 'converted': return <CheckCircle size={14} />;
            case 'lost': return <XCircle size={14} />;
            default: return <Clock size={14} />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-700';
            case 'normal': return 'bg-blue-100 text-blue-700';
            case 'low': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const filteredLeads = leads.filter(lead => {
        const fullName = `${lead.first_name} ${lead.last_name || ''}`.toLowerCase();
        const search = searchQuery.toLowerCase();
        return (
            fullName.includes(search) ||
            (lead.email?.toLowerCase().includes(search) ?? false) ||
            (lead.phone?.toLowerCase().includes(search) ?? false)
        );
    });

    // Helper to get the "who is the care for" value, handling both new (object) and legacy (string) source_details
    const getWhoFor = (lead: Lead): string | null => {
        const sd = lead.source_details;
        if (typeof sd === 'string') return sd || null;
        if (sd && typeof sd === 'object') {
            return (sd.who as string) || (sd.referrerType as string) || null;
        }
        return null;
    };

    // Helper to get the primary service for the table preview
    const getPrimaryService = (lead: Lead): string | null => {
        if (lead.interested_services?.length) return lead.interested_services[0];
        const sd = lead.source_details;
        if (sd && typeof sd === 'object') {
            return (sd.service as string) || (sd.primaryService as string) || null;
        }
        return null;
    };

    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
        converted: leads.filter(l => l.status === 'converted').length,
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">
                        Referral <span className="text-gradient">Management</span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm sm:text-base">Manage and track all incoming referrals.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Referrals</p>
                    <p className="text-3xl font-black text-gray-900">{stats.total}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-gray-500 mb-1">New</p>
                    <p className="text-3xl font-black text-blue-600">{stats.new}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl border-l-4 border-yellow-500">
                    <p className="text-sm font-medium text-gray-500 mb-1">Contacted</p>
                    <p className="text-3xl font-black text-yellow-600">{stats.contacted}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 rounded-2xl border-l-4 border-purple-500">
                    <p className="text-sm font-medium text-gray-500 mb-1">Qualified</p>
                    <p className="text-3xl font-black text-purple-600">{stats.qualified}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 rounded-2xl border-l-4 border-green-500">
                    <p className="text-sm font-medium text-gray-500 mb-1">Converted</p>
                    <p className="text-3xl font-black text-green-600">{stats.converted}</p>
                </motion.div>
            </div>

            {/* Filters */}
            <div className="glass-card p-4 sm:p-6 rounded-2xl">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                            placeholder="Search referrals..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 rounded-xl"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {['all', 'new', 'contacted', 'qualified'].map(status => (
                            <Button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                variant={statusFilter === status ? 'default' : 'outline'}
                                className="rounded-xl capitalize"
                            >
                                {status}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Referrals Table */}
            {loading ? (
                <ReferralsSkeleton />
            ) : filteredLeads.length === 0 ? (
                <div className="glass-card p-12 rounded-2xl text-center">
                    <p className="text-gray-500 font-medium">No referrals found</p>
                </div>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block glass-card rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Referring For</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredLeads.map((lead, index) => (
                                        <motion.tr
                                            key={lead.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-bold text-gray-900">{lead.first_name} {lead.last_name}</p>
                                                    {getWhoFor(lead) && (
                                                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                            {labelizeValue(getWhoFor(lead))}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    {lead.email && (
                                                        <a href={`mailto:${lead.email}`} className="text-sm text-gray-700 hover:text-primary flex items-center gap-1">
                                                            <Mail size={12} /> {lead.email}
                                                        </a>
                                                    )}
                                                    {lead.phone && (
                                                        <a href={`tel:${lead.phone}`} className="text-sm text-gray-700 hover:text-primary flex items-center gap-1">
                                                            <Phone size={12} /> {lead.phone}
                                                        </a>
                                                    )}
                                                    {!lead.email && !lead.phone && (
                                                        <span className="text-xs text-gray-400">No contact</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {getPrimaryService(lead) ? labelizeValue(getPrimaryService(lead)) : 'General'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(lead.status)}`}>
                                                    {getStatusIcon(lead.status)}
                                                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {formatDate(lead.created_at)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => setSelectedLead(lead)}
                                                        className="p-2 hover:bg-primary/5 rounded-lg transition-colors group"
                                                        title="View Details"
                                                    >
                                                        <Eye size={18} className="text-gray-400 group-hover:text-primary" />
                                                    </button>
                                                    <button
                                                        onClick={() => setEmailLead(lead)}
                                                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                                                        title="Send Email"
                                                    >
                                                        <Mail size={18} className="text-gray-400 group-hover:text-blue-600" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Card View */}
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
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg">
                                            {lead.first_name} {lead.last_name}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {getWhoFor(lead) && (
                                                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                    {labelizeValue(getWhoFor(lead))}
                                                </span>
                                            )}
                                            <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-0.5 rounded">
                                                {getPrimaryService(lead) ? labelizeValue(getPrimaryService(lead)) : 'General'}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedLead(lead)}
                                        className="p-2 bg-gray-50 rounded-xl text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors"
                                    >
                                        <Eye size={20} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-2">
                                        {lead.email && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail size={14} className="shrink-0" />
                                                <span className="truncate">{lead.email}</span>
                                            </div>
                                        )}
                                        {lead.phone && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone size={14} className="shrink-0" />
                                                <span>{lead.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-3 flex flex-col items-end">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(lead.status)}`}>
                                            {getStatusIcon(lead.status)}
                                            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                        </span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Calendar size={12} />
                                            {formatDate(lead.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}

            {/* Referral Detail Modal */}
            {selectedLead && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-primary to-secondary p-6 shrink-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">
                                        {selectedLead.first_name} {selectedLead.last_name}
                                    </h3>
                                    <p className="text-green-100 text-sm mt-1">Referral Details</p>
                                </div>
                                <button
                                    onClick={() => setSelectedLead(null)}
                                    className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto">
                            {/* Core Info */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <p className="text-sm font-bold text-gray-500 mb-1">Email</p>
                                    {selectedLead.email ? (
                                        <a href={`mailto:${selectedLead.email}`} className="text-primary hover:underline break-all">
                                            {selectedLead.email}
                                        </a>
                                    ) : (
                                        <p className="text-gray-400">N/A</p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 mb-1">Phone</p>
                                    {selectedLead.phone ? (
                                        <a href={`tel:${selectedLead.phone}`} className="text-primary hover:underline">
                                            {selectedLead.phone}
                                        </a>
                                    ) : (
                                        <p className="text-gray-400">N/A</p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 mb-1">Status</p>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedLead.status)}`}>
                                        {getStatusIcon(selectedLead.status)}
                                        {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 mb-1">Date</p>
                                    <p className="text-gray-900">{formatDate(selectedLead.created_at)}</p>
                                </div>
                                {selectedLead.preferred_contact && (
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 mb-1">Preferred Contact</p>
                                        <p className="text-gray-900 capitalize">{selectedLead.preferred_contact}</p>
                                    </div>
                                )}
                                {selectedLead.state && (
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 mb-1">State</p>
                                        <p className="text-gray-900">{selectedLead.state}</p>
                                    </div>
                                )}
                            </div>

                            {/* Questionnaire Answers (new form: from service_matcher_answers; legacy: from source_details object) */}
                            {(() => {
                                const sd = selectedLead.source_details;
                                const sma = selectedLead.service_matcher_answers;
                                const sdObj = sd && typeof sd === 'object' ? sd : null;

                                // Merge questionnaire-related fields, preferring service_matcher_answers when present
                                const merged: Record<string, any> = { ...(sdObj || {}), ...(sma || {}) };

                                // If only a string source_details (legacy "who" string), capture it
                                if (!sdObj && typeof sd === 'string' && sd) {
                                    merged.who = merged.who || sd;
                                }

                                // Skip empty/redundant entries
                                const entries = Object.entries(merged).filter(
                                    ([, v]) => v !== null && v !== undefined && v !== ''
                                );

                                if (entries.length === 0) return null;

                                return (
                                    <div className="border-t border-gray-100 pt-6">
                                        <h4 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
                                            <FileText size={20} className="text-primary" />
                                            Referral Answers
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                            {entries.map(([key, value]) => (
                                                <div key={key} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                                        {labelize(key)}
                                                    </p>
                                                    <p className="text-sm font-medium text-gray-900 leading-relaxed break-words">
                                                        {labelizeValue(value)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* NDIS Info */}
                            {(selectedLead.ndis_participant !== null ||
                                selectedLead.ndis_status ||
                                selectedLead.ndis_number) && (
                                <div className="border-t border-gray-100 pt-6 mt-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-4">NDIS Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                        {selectedLead.ndis_participant !== null && (
                                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                                    NDIS Participant
                                                </p>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {selectedLead.ndis_participant ? 'Yes' : 'No'}
                                                </p>
                                            </div>
                                        )}
                                        {selectedLead.ndis_status && (
                                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                                    Plan Management
                                                </p>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {labelizeValue(selectedLead.ndis_status)}
                                                </p>
                                            </div>
                                        )}
                                        {selectedLead.ndis_number && (
                                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                                    NDIS Number
                                                </p>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {selectedLead.ndis_number}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Interested Services */}
                            {selectedLead.interested_services && selectedLead.interested_services.length > 0 && (
                                <div className="border-t border-gray-100 pt-6 mt-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-4">Interested Services</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedLead.interested_services.map((s) => (
                                            <span key={s} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-sm font-medium border border-primary/20">
                                                {labelizeValue(s)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Message if any */}
                            {selectedLead.message && !selectedLead.message.startsWith("Referral Submission") && (
                                <div className="mt-6">
                                    <p className="text-sm font-bold text-gray-500 mb-2">Additional Message</p>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700 leading-relaxed">{selectedLead.message}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end shrink-0 border-t border-gray-100">
                            <Button onClick={() => setSelectedLead(null)} variant="outline" className="px-6 rounded-xl">
                                Close
                            </Button>
                            <Button
                                onClick={() => {
                                    setEmailLead(selectedLead);
                                    setSelectedLead(null);
                                }}
                                className="px-6 rounded-xl"
                            >
                                Send Email
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
            {/* Communication Panel Modal */}
            <AnimatePresence>
                {emailLead && (
                    <CommunicationPanel
                        lead={emailLead}
                        onClose={() => setEmailLead(null)}
                        onSuccess={() => {
                            adminCache.invalidatePattern('referrals-');
                            fetchReferrals(statusFilter);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
