"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
    Search,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Filter,
    Eye,
    CheckCircle,
    Clock,
    AlertCircle,
    XCircle,
    Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommunicationPanel from "@/components/admin/CommunicationPanel";
import { adminCache } from "@/lib/adminCache";
import { LeadsSkeleton } from "@/components/admin/skeletons";

interface Lead {
    id: string;
    first_name: string;
    last_name: string | null;
    email: string;
    phone: string | null;
    location: string | null;
    message: string | null;
    source: string;
    source_page: string | null;
    status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
    priority: 'low' | 'normal' | 'high';
    created_at: string;
    updated_at: string;
}

function LeadsList() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(!adminCache.has('leads-all'));
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [emailLead, setEmailLead] = useState<Lead | null>(null);
    const [deleteModalLead, setDeleteModalLead] = useState<Lead | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const searchParams = useSearchParams();
    const leadIdParam = searchParams.get('id');

    useEffect(() => {
        fetchLeads(statusFilter);
    }, [statusFilter]);

    // Handle deep linking for lead details
    useEffect(() => {
        if (leadIdParam && leads.length > 0) {
            const lead = leads.find(l => l.id === leadIdParam);
            if (lead) {
                setSelectedLead(lead);
            }
        }
    }, [leadIdParam, leads]);

    const fetchLeads = async (filter: string = statusFilter) => {
        const key = `leads-${filter}`;
        const cached = adminCache.get<Lead[]>(key);

        if (cached && !adminCache.isStale(key)) {
            setLeads(cached);
            setLoading(false);
            return;
        }

        if (cached) {
            // Stale — show cached data, silently revalidate
            setLeads(cached);
            setLoading(false);
        } else {
            setLoading(true);
        }

        try {
            const params = new URLSearchParams({ limit: '100' });
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
            console.error('Error fetching leads:', error);
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
            case 'new':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'contacted':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'qualified':
                return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'converted':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'lost':
                return 'bg-gray-100 text-gray-700 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'new':
                return <AlertCircle size={14} />;
            case 'contacted':
                return <Clock size={14} />;
            case 'qualified':
                return <CheckCircle size={14} />;
            case 'converted':
                return <CheckCircle size={14} />;
            case 'lost':
                return <XCircle size={14} />;
            default:
                return <Clock size={14} />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-700';
            case 'normal':
                return 'bg-blue-100 text-blue-700';
            case 'low':
                return 'bg-gray-100 text-gray-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const handleDeleteLead = async () => {
        if (!deleteModalLead) return;

        try {
            setIsDeleting(true);
            const response = await fetch(`/api/leads/${deleteModalLead.id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                // Invalidate cache so next visit re-fetches fresh data
                adminCache.invalidatePattern('leads-');
                adminCache.invalidate('dashboard');
                setLeads(leads.filter(l => l.id !== deleteModalLead.id));
                setDeleteModalLead(null);
                alert('Lead deleted successfully!');
            } else {
                alert('Failed to delete lead: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error deleting lead:', error);
            alert('Failed to delete lead. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredLeads = leads.filter(lead => {
        const fullName = `${lead.first_name} ${lead.last_name || ''}`.toLowerCase();
        const search = searchQuery.toLowerCase();
        return (
            fullName.includes(search) ||
            (lead.email?.toLowerCase().includes(search) ?? false) ||
            (lead.phone?.toLowerCase().includes(search) ?? false) ||
            (lead.location?.toLowerCase().includes(search) ?? false)
        );
    });

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
                        Lead <span className="text-gradient">Management</span>
                    </h1>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 rounded-2xl"
                >
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Leads</p>
                    <p className="text-3xl font-black text-gray-900">{stats.total}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 rounded-2xl border-l-4 border-blue-500"
                >
                    <p className="text-sm font-medium text-gray-500 mb-1">New</p>
                    <p className="text-3xl font-black text-blue-600">{stats.new}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 rounded-2xl border-l-4 border-yellow-500"
                >
                    <p className="text-sm font-medium text-gray-500 mb-1">Contacted</p>
                    <p className="text-3xl font-black text-yellow-600">{stats.contacted}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6 rounded-2xl border-l-4 border-purple-500"
                >
                    <p className="text-sm font-medium text-gray-500 mb-1">Qualified</p>
                    <p className="text-3xl font-black text-purple-600">{stats.qualified}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-6 rounded-2xl border-l-4 border-green-500"
                >
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
                            placeholder="Search leads by name, email, phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 rounded-xl"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <Button
                            onClick={() => setStatusFilter('all')}
                            variant={statusFilter === 'all' ? 'default' : 'outline'}
                            className="rounded-xl"
                        >
                            All
                        </Button>
                        <Button
                            onClick={() => setStatusFilter('new')}
                            variant={statusFilter === 'new' ? 'default' : 'outline'}
                            className="rounded-xl"
                        >
                            New
                        </Button>
                        <Button
                            onClick={() => setStatusFilter('contacted')}
                            variant={statusFilter === 'contacted' ? 'default' : 'outline'}
                            className="rounded-xl"
                        >
                            Contacted
                        </Button>
                        <Button
                            onClick={() => setStatusFilter('qualified')}
                            variant={statusFilter === 'qualified' ? 'default' : 'outline'}
                            className="rounded-xl"
                        >
                            Qualified
                        </Button>
                    </div>
                </div>
            </div>

            {/* Leads Table */}
            {loading ? (
                <LeadsSkeleton />
            ) : filteredLeads.length === 0 ? (
                <div className="glass-card p-12 rounded-2xl text-center">
                    <p className="text-gray-500 font-medium">No leads found</p>
                </div>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block glass-card rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Lead
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Source
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Priority
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Actions
                                        </th>
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
                                                    <p className="font-bold text-gray-900">
                                                        {lead.first_name} {lead.last_name}
                                                    </p>
                                                    {lead.location && (
                                                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                            <MapPin size={12} />
                                                            {lead.location}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <a
                                                        href={`mailto:${lead.email}`}
                                                        className="text-sm text-gray-700 hover:text-primary flex items-center gap-1"
                                                    >
                                                        <Mail size={12} />
                                                        {lead.email}
                                                    </a>
                                                    {lead.phone && (
                                                        <a
                                                            href={`tel:${lead.phone}`}
                                                            className="text-sm text-gray-700 hover:text-primary flex items-center gap-1"
                                                        >
                                                            <Phone size={12} />
                                                            {lead.phone}
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-700 capitalize">
                                                    {lead.source.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(lead.status)}`}>
                                                    {getStatusIcon(lead.status)}
                                                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getPriorityColor(lead.priority)}`}>
                                                    {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
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
                                                    <button
                                                        onClick={() => setDeleteModalLead(lead)}
                                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                                        title="Delete Lead"
                                                    >
                                                        <Trash2 size={18} className="text-gray-400 group-hover:text-red-600" />
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
                                        <p className="text-sm text-gray-500 mt-1 capitalize">{lead.source.replace('_', ' ')}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedLead(lead)}
                                            className="p-2 bg-gray-50 rounded-xl text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors"
                                        >
                                            <Eye size={20} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteModalLead(lead)}
                                            className="p-2 bg-gray-50 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Mail size={14} className="shrink-0" />
                                            <span className="truncate">{lead.email}</span>
                                        </div>
                                        {lead.phone && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone size={14} className="shrink-0" />
                                                <span>{lead.phone}</span>
                                            </div>
                                        )}
                                        {lead.location && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <MapPin size={14} className="shrink-0" />
                                                <span>{lead.location}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-3 flex flex-col items-end">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(lead.status)}`}>
                                            {getStatusIcon(lead.status)}
                                            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                        </span>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getPriorityColor(lead.priority)}`}>
                                            {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
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

            {/* Lead Detail Modal */}
            {
                selectedLead && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-primary to-secondary p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">
                                            {selectedLead.first_name} {selectedLead.last_name}
                                        </h3>
                                        <p className="text-green-100 text-sm mt-1">Lead Details</p>
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
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 mb-1">Email</p>
                                        <a href={`mailto:${selectedLead.email}`} className="text-primary hover:underline">
                                            {selectedLead.email}
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 mb-1">Phone</p>
                                        <a href={`tel:${selectedLead.phone}`} className="text-primary hover:underline">
                                            {selectedLead.phone || 'N/A'}
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 mb-1">Location</p>
                                        <p className="text-gray-900">{selectedLead.location || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 mb-1">Source</p>
                                        <p className="text-gray-900 capitalize">{selectedLead.source.replace('_', ' ')}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 mb-1">Status</p>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedLead.status)}`}>
                                            {getStatusIcon(selectedLead.status)}
                                            {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 mb-1">Priority</p>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getPriorityColor(selectedLead.priority)}`}>
                                            {selectedLead.priority.charAt(0).toUpperCase() + selectedLead.priority.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                {selectedLead.message && (
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 mb-2">Message</p>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-gray-700 leading-relaxed">{selectedLead.message}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
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
                            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
                                <Button
                                    onClick={() => setSelectedLead(null)}
                                    variant="outline"
                                    className="px-6"
                                >
                                    Close
                                </Button>
                                <Button
                                    onClick={() => {
                                        setEmailLead(selectedLead);
                                        setSelectedLead(null);
                                    }}
                                    className="bg-gradient-to-r from-primary to-secondary text-white px-6"
                                >
                                    Send Email
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )
            }

            {/* Delete Confirmation Modal */}
            {
                deleteModalLead && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-white/20 rounded-full">
                                        <Trash2 size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            Delete Lead
                                        </h3>
                                        <p className="text-red-100 text-sm mt-1">This action cannot be undone</p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6">
                                <p className="text-gray-700 mb-4">
                                    Are you sure you want to delete the lead for{' '}
                                    <span className="font-bold text-gray-900">
                                        {deleteModalLead.first_name} {deleteModalLead.last_name}
                                    </span>
                                    ?
                                </p>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Email:</span> {deleteModalLead.email}
                                    </p>
                                    {deleteModalLead.phone && (
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">Phone:</span> {deleteModalLead.phone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
                                <Button
                                    onClick={() => setDeleteModalLead(null)}
                                    variant="outline"
                                    className="px-6"
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleDeleteLead}
                                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 hover:from-red-600 hover:to-red-700"
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? (
                                        <>
                                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 size={16} className="mr-2" />
                                            Delete Lead
                                        </>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )
            }
            {/* Communication Panel Modal */}
            <AnimatePresence>
                {emailLead && (
                    <CommunicationPanel
                        lead={emailLead}
                        onClose={() => setEmailLead(null)}
                        onSuccess={() => {
                            adminCache.invalidatePattern('leads-');
                            fetchLeads(statusFilter);
                        }}
                    />
                )}
            </AnimatePresence>
        </div >
    );
}

export default function LeadsPage() {
    return (
        <Suspense fallback={<LeadsSkeleton />}>
            <LeadsList />
        </Suspense>
    );
}
