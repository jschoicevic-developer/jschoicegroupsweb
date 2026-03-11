"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Mail, Users2, X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Blogger {
    id: string;
    email: string;
    name: string;
    bio: string;
    created_at: string;
    totalPosts?: number;
}

interface BloggerFormData {
    email: string;
    password: string;
    name: string;
    bio: string;
}

const emptyForm: BloggerFormData = {
    email: "",
    password: "",
    name: "",
    bio: "",
};

export default function BloggersAdminPage() {
    const [bloggers, setBloggers] = useState<Blogger[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBlogger, setSelectedBlogger] = useState<Blogger | null>(null);
    const [formData, setFormData] = useState<BloggerFormData>(emptyForm);
    const [formLoading, setFormLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        fetchBloggers();
    }, []);

    const fetchBloggers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/bloggers');
            const data = await response.json();
            if (data.success) {
                setBloggers(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching bloggers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddBlogger = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");
        setFormLoading(true);

        try {
            const response = await fetch('/api/bloggers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                await fetchBloggers();
                setShowAddModal(false);
                setFormData(emptyForm);
            } else {
                setFormError(data.error || 'Failed to create blogger');
            }
        } catch (error) {
            console.error('Error creating blogger:', error);
            setFormError('An error occurred. Please try again.');
        } finally {
            setFormLoading(false);
        }
    };

    const handleEditBlogger = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBlogger) return;
        setFormError("");
        setFormLoading(true);

        try {
            const response = await fetch(`/api/bloggers/${selectedBlogger.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    bio: formData.bio,
                }),
            });

            const data = await response.json();

            if (data.success) {
                await fetchBloggers();
                setShowEditModal(false);
                setSelectedBlogger(null);
                setFormData(emptyForm);
            } else {
                setFormError(data.error || 'Failed to update blogger');
            }
        } catch (error) {
            console.error('Error updating blogger:', error);
            setFormError('An error occurred. Please try again.');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteBlogger = async () => {
        if (!selectedBlogger) return;
        setFormLoading(true);

        try {
            const response = await fetch(`/api/bloggers/${selectedBlogger.id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setBloggers(bloggers.filter(b => b.id !== selectedBlogger.id));
                setShowDeleteModal(false);
                setSelectedBlogger(null);
            } else {
                alert(data.error || 'Failed to delete blogger');
            }
        } catch (error) {
            console.error('Error deleting blogger:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setFormLoading(false);
        }
    };

    const openEditModal = (blogger: Blogger) => {
        setSelectedBlogger(blogger);
        setFormData({
            email: blogger.email,
            password: "",
            name: blogger.name,
            bio: blogger.bio,
        });
        setFormError("");
        setShowEditModal(true);
    };

    const openDeleteModal = (blogger: Blogger) => {
        setSelectedBlogger(blogger);
        setShowDeleteModal(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-heading">
                        Blogger <span className="text-primary">Manager</span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">Manage blogger accounts and permissions</p>
                </div>
                <Button
                    onClick={() => { setFormData(emptyForm); setFormError(""); setShowAddModal(true); }}
                    className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                    <Plus size={20} />
                    Add New Blogger
                </Button>
            </div>

            {/* Stats */}
            <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Users2 size={28} className="text-primary" />
                </div>
                <div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Bloggers</div>
                    <div className="text-3xl font-black text-gray-900">{bloggers.length}</div>
                </div>
            </div>

            {/* Bloggers Table */}
            <div className="glass-card rounded-[2rem] overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : bloggers.length === 0 ? (
                    <div className="text-center py-20">
                        <Users2 size={48} className="text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No bloggers yet</h3>
                        <p className="text-gray-500 mb-6">Add your first blogger to get started</p>
                        <Button
                            onClick={() => { setFormData(emptyForm); setFormError(""); setShowAddModal(true); }}
                            className="gap-2 bg-gradient-to-r from-primary to-secondary"
                        >
                            <Plus size={20} />
                            Add Blogger
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Blogger</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Bio</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {bloggers.map((blogger, index) => (
                                        <motion.tr
                                            key={blogger.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                                        <span className="font-bold text-sm text-primary">
                                                            {blogger.name.substring(0, 2).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <span className="font-bold text-gray-900">{blogger.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Mail size={14} className="text-gray-400" />
                                                    {blogger.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-500 line-clamp-1">
                                                    {blogger.bio || '-'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600">{formatDate(blogger.created_at)}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(blogger)}
                                                        className="p-2 hover:bg-primary/5 rounded-lg transition-colors group"
                                                        title="Edit Blogger"
                                                    >
                                                        <Edit size={18} className="text-gray-400 group-hover:text-primary" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(blogger)}
                                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                                        title="Delete Blogger"
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

                        {/* Mobile Cards */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {bloggers.map((blogger, index) => (
                                <motion.div
                                    key={blogger.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="p-4 space-y-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="font-bold text-primary">
                                                {blogger.name.substring(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{blogger.name}</p>
                                            <p className="text-sm text-gray-500">{blogger.email}</p>
                                        </div>
                                    </div>
                                    {blogger.bio && <p className="text-sm text-gray-500">{blogger.bio}</p>}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-400">Joined {formatDate(blogger.created_at)}</span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditModal(blogger)}
                                                className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg"
                                            >
                                                <Edit size={14} /> Edit
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(blogger)}
                                                className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg"
                                            >
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Add Blogger Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-primary to-secondary p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Add New Blogger</h3>
                                    <p className="text-white/80 text-sm">Create a new blogger account</p>
                                </div>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X size={20} className="text-white" />
                                </button>
                            </div>

                            <form onSubmit={handleAddBlogger} className="p-6 space-y-4">
                                {formError && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                        {formError}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Blogger's full name"
                                        className="h-12"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="blogger@example.com"
                                        className="h-12"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Password *</label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            placeholder="Minimum 6 characters"
                                            className="h-12 pr-12"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                                    <Textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        placeholder="Brief bio (optional)"
                                        rows={3}
                                        className="resize-none"
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={formLoading}
                                        className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                                    >
                                        {formLoading ? (
                                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            "Create Blogger"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Edit Blogger Modal */}
            <AnimatePresence>
                {showEditModal && selectedBlogger && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-primary to-secondary p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Edit Blogger</h3>
                                    <p className="text-white/80 text-sm">{selectedBlogger.email}</p>
                                </div>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X size={20} className="text-white" />
                                </button>
                            </div>

                            <form onSubmit={handleEditBlogger} className="p-6 space-y-4">
                                {formError && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                        {formError}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Blogger's full name"
                                        className="h-12"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                    <Input
                                        value={formData.email}
                                        disabled
                                        className="h-12 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                                    <Textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        placeholder="Brief bio (optional)"
                                        rows={3}
                                        className="resize-none"
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowEditModal(false)}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={formLoading}
                                        className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                                    >
                                        {formLoading ? (
                                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && selectedBlogger && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                        <Trash2 size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Delete Blogger</h3>
                                        <p className="text-red-100 text-sm">This action cannot be undone</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-700 mb-4">Are you sure you want to delete this blogger account?</p>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="font-bold text-gray-900">{selectedBlogger.name}</p>
                                    <p className="text-sm text-gray-500">{selectedBlogger.email}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
                                <Button
                                    onClick={() => { setShowDeleteModal(false); setSelectedBlogger(null); }}
                                    variant="outline"
                                    className="px-6"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleDeleteBlogger}
                                    disabled={formLoading}
                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6"
                                >
                                    {formLoading ? (
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        "Delete Blogger"
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
