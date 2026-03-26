"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit, Trash2, Image as ImageIcon, Loader2, X, Camera } from "lucide-react";
import { adminCache } from "@/lib/adminCache";
import { GallerySkeleton } from "@/components/admin/skeletons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/crm";

const GALLERY_KEY = 'gallery';

export default function GalleryAdminPage() {
    const [items, setItems] = useState<GalleryItem[]>(adminCache.get<GalleryItem[]>(GALLERY_KEY) ?? []);
    const [loading, setLoading] = useState(!adminCache.has(GALLERY_KEY));
    const [searchQuery, setSearchQuery] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // UI States
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);

    // Form States
    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        images: string[];
        category: string;
        display_order: number;
    }>({
        title: "",
        description: "",
        images: [],
        category: "",
        display_order: 0
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!adminCache.has(GALLERY_KEY) || adminCache.isStale(GALLERY_KEY)) {
            fetchGallery();
        }
    }, []);

    const fetchGallery = async () => {
        if (!adminCache.has(GALLERY_KEY)) setLoading(true);
        try {
            const response = await fetch('/api/gallery');
            const data = await response.json();
            if (data.success) {
                adminCache.set(GALLERY_KEY, data.data);
                setItems(data.data);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: GalleryItem) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            description: item.description || "",
            images: item.images || [],
            category: item.category || "",
            display_order: item.display_order
        });
        setShowModal(true);
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setFormData({
            title: "",
            description: "",
            images: [],
            category: "",
            display_order: items.length > 0 ? Math.max(...items.map(i => i.display_order)) + 1 : 0
        });
        setShowModal(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // Calculate how many more images can be added
        const remainingSlots = 5 - formData.images.length;
        if (remainingSlots <= 0) {
            alert("Maximum 5 images per card allowed.");
            return;
        }

        const filesToUpload = Array.from(files).slice(0, remainingSlots);

        try {
            setUploading(true);
            const uploadedUrls: string[] = [];

            for (const file of filesToUpload) {
                const body = new FormData();
                body.append('file', file);

                const response = await fetch('/api/gallery/upload', {
                    method: 'POST',
                    body
                });
                const data = await response.json();

                if (data.url) {
                    uploadedUrls.push(data.url);
                }
            }

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...uploadedUrls]
            }));

        } catch (error) {
            console.error('Upload error:', error);
            alert('Internal server error during upload');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            const url = editingItem ? `/api/gallery/${editingItem.id}` : '/api/gallery';
            const method = editingItem ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                adminCache.invalidate(GALLERY_KEY, 'dashboard');
                setShowModal(false);
                fetchGallery();
            } else {
                alert(data.error || 'Failed to save');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('Internal server error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteClick = (item: GalleryItem) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            const response = await fetch(`/api/gallery/${itemToDelete.id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                adminCache.invalidate(GALLERY_KEY, 'dashboard');
                setItems(items.filter(i => i.id !== itemToDelete.id));
                setShowDeleteModal(false);
                setItemToDelete(null);
            } else {
                alert(data.error || 'Delete failed');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Internal server error');
        }
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-heading">
                        Gallery <span className="text-gradient">Manager</span>
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                        Manage your gallery cards each with up to 5 images.
                    </p>
                </div>

                <Button
                    onClick={handleAddNew}
                    className="gap-2 bg-gradient-to-r from-primary to-secondary text-[#1A202C] hover:opacity-90 shadow-lg shadow-primary/20 transition-all rounded-xl h-12 px-6 font-bold"
                >
                    <Plus size={20} />
                    Create New Card
                </Button>
            </div>

            {/* Filters */}
            <div className="glass-card p-6 rounded-[2rem]">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        placeholder="Search by title or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 rounded-xl border-gray-200"
                    />
                </div>
            </div>

            {/* Gallery Grid */}
            {loading ? (
                <GallerySkeleton />
            ) : filteredItems.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                    <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No cards found</h3>
                    <p className="text-gray-500 mb-6">Start building your gallery by creating your first card with images.</p>
                    <Button onClick={handleAddNew} className="gap-2">
                        <Plus size={20} /> Create Card
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-card rounded-2xl overflow-hidden group border border-gray-100/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                {item.images && item.images.length > 0 ? (
                                    <>
                                        <Image quality={80}
                                            src={item.images[0]}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {item.images.length > 1 && (
                                            <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg z-10">
                                                +{item.images.length - 1} Images
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <ImageIcon size={40} className="text-gray-300" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-lg"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(item)}
                                        className="w-10 h-10 rounded-full bg-white text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                {item.category && (
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-black uppercase rounded-full tracking-wider shadow-sm z-10">
                                        {item.category}
                                    </span>
                                )}
                            </div>
                            <div className="p-5 space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                                    <span className="text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded">
                                        #{item.display_order}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed h-10">
                                    {item.description || "No description provided."}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900">
                                        {editingItem ? 'Edit Gallery Card' : 'Create Gallery Card'}
                                    </h2>
                                    <p className="text-gray-500 text-sm font-medium">Add up to 5 images per card</p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Multi-Image Section */}
                                    <div className="md:col-span-2 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-black text-gray-700 uppercase tracking-widest">Images ({formData.images.length}/5)</label>
                                            {formData.images.length < 5 && (
                                                <label className="cursor-pointer bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-black shadow-sm hover:bg-primary hover:text-[#1A202C] transition-all">
                                                    + Add Images
                                                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} disabled={uploading} />
                                                </label>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                            {formData.images.map((url, idx) => (
                                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 group">
                                                    <Image quality={80} src={url} alt={`Image ${idx + 1}`} fill className="object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(idx)}
                                                        className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            ))}

                                            {formData.images.length === 0 && !uploading && (
                                                <div className="col-span-full py-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400">
                                                    <ImageIcon size={32} className="mb-2" />
                                                    <p className="text-sm font-bold">No images uploaded</p>
                                                </div>
                                            )}

                                            {uploading && (
                                                <div className="aspect-square bg-gray-50 border-2 border-dashed border-primary/20 rounded-xl flex items-center justify-center">
                                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Basic Info */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest">Title</label>
                                        <Input
                                            required
                                            placeholder="Image Title"
                                            value={formData.title}
                                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                            className="h-12 rounded-xl"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest">Category</label>
                                        <Input
                                            placeholder="e.g. Community, Events, Team"
                                            value={formData.category}
                                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                            className="h-12 rounded-xl"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest">Description</label>
                                        <textarea
                                            placeholder="Brief description about these moments..."
                                            value={formData.description}
                                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                            className="w-full h-24 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none font-medium text-gray-600"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest">Display Order</label>
                                        <Input
                                            type="number"
                                            value={formData.display_order}
                                            onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                                            className="h-12 rounded-xl"
                                        />
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Lower numbers appear first</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6 border-t border-gray-100">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowModal(false)}
                                        className="h-14 flex-1 rounded-xl text-gray-600 font-bold"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSaving || uploading || formData.images.length === 0}
                                        className="h-14 flex-[2] rounded-xl bg-gradient-to-r from-primary to-secondary text-[#1A202C] font-black shadow-lg shadow-primary/20 hover:brightness-105 disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                                Processing...
                                            </>
                                        ) : (
                                            editingItem ? 'Update Card' : 'Create Card'
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
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden"
                        >
                            <div className="p-8 text-center bg-red-50/50">
                                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Trash2 size={40} className="text-red-600" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">Are you sure?</h3>
                                <p className="text-gray-500 font-medium">
                                    You are about to delete <span className="text-red-600 font-bold">"{itemToDelete?.title}"</span>. This action is irreversible.
                                </p>
                            </div>

                            <div className="p-6 flex gap-3">
                                <Button
                                    onClick={() => setShowDeleteModal(false)}
                                    variant="outline"
                                    className="h-14 flex-1 rounded-xl font-bold"
                                >
                                    No, Keep it
                                </Button>
                                <Button
                                    onClick={confirmDelete}
                                    className="h-14 flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black shadow-lg shadow-red-200"
                                >
                                    Yes, Delete
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
