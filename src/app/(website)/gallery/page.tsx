"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, Loader2, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/crm";

export default function GalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/gallery');
            const data = await response.json();
            if (data.success) {
                setItems(data.data);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    const openLightbox = (item: GalleryItem) => {
        setSelectedItem(item);
        setActiveImageIndex(0);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedItem) return;
        setActiveImageIndex((prev) => (prev + 1) % selectedItem.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedItem) return;
        setActiveImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length);
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <PageHeader
                title="Gallery"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Gallery" }
                ]}
            />

            <div className="pt-20">
                <section className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-12 h-12 animate-spin text-primary" />
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading our moments...</p>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-gray-100">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                <Camera size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-[#2D3748] mb-2 font-heading">Our Story in Images</h3>
                            <p className="text-gray-500 max-w-md mx-auto font-medium">
                                We are currently updating our gallery with new moments. Please check back soon to see our latest community activities.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group relative cursor-pointer"
                                    onClick={() => openLightbox(item)}
                                >
                                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-200/50 bg-white">
                                        {item.images && item.images.length > 0 && (
                                            <Image quality={80}
                                                src={item.images[0]}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                        )}

                                        {/* Multi-image indicator badge */}
                                        {item.images && item.images.length > 1 && (
                                            <div className="absolute top-6 right-6 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest z-10">
                                                +{item.images.length - 1} Images
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 space-y-3">
                                                {item.category && (
                                                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                                                        {item.category}
                                                    </span>
                                                )}
                                                <h3 className="text-white text-3xl font-black leading-tight font-heading">
                                                    {item.title}
                                                </h3>
                                                {item.description && (
                                                    <p className="text-white/60 text-sm line-clamp-2 font-medium leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Offset shadow effect for premium feel */}
                                    <div className="absolute -inset-2 bg-primary/5 rounded-[3.5rem] -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* Lightbox Modal with Multi-Image Slider */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-[#0F172A]/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
                        onClick={() => setSelectedItem(null)}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-8 right-8 text-white/40 hover:text-white transition-all bg-white/5 hover:bg-white/10 p-4 rounded-full z-[210] border border-white/5"
                            onClick={() => setSelectedItem(null)}
                        >
                            <X size={28} />
                        </button>

                        <div className="relative w-full max-w-7xl flex flex-col lg:flex-row items-center gap-10" onClick={(e) => e.stopPropagation()}>
                            {/* Main Image Slider */}
                            <div className="relative w-full lg:flex-[1.5] aspect-[3/2] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 group/slider">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeImageIndex}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="relative w-full h-full"
                                    >
                                        <Image quality={80}
                                            src={selectedItem.images[activeImageIndex]}
                                            alt={selectedItem.title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation Arrows inside slider */}
                                {selectedItem.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/30 hover:bg-primary backdrop-blur-xl text-white hover:text-[#1A202C] rounded-full flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 transform -translate-x-4 group-hover/slider:translate-x-0"
                                        >
                                            <ChevronLeft size={32} />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/30 hover:bg-primary backdrop-blur-xl text-white hover:text-[#1A202C] rounded-full flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 transform translate-x-4 group-hover/slider:translate-x-0"
                                        >
                                            <ChevronRight size={32} />
                                        </button>
                                    </>
                                )}

                                {/* Image counter */}
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/40 backdrop-blur-xl rounded-full text-white/80 text-xs font-black tracking-widest border border-white/10">
                                    {activeImageIndex + 1} / {selectedItem.images.length}
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="lg:flex-1 text-left space-y-8 w-full px-4">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        {selectedItem.category && (
                                            <span className="px-4 py-1 bg-primary/20 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {selectedItem.category}
                                            </span>
                                        )}
                                        <div className="h-px flex-1 bg-white/10" />
                                    </div>
                                    <h3 className="text-white text-4xl md:text-6xl font-black font-heading leading-tight italic">
                                        {selectedItem.title}
                                    </h3>
                                    {selectedItem.description && (
                                        <p className="text-white/40 text-lg md:text-xl leading-relaxed font-medium">
                                            {selectedItem.description}
                                        </p>
                                    )}
                                </div>

                                {/* Thumbnail Navigation */}
                                {selectedItem.images.length > 1 && (
                                    <div className="flex flex-wrap gap-4 pt-4">
                                        {selectedItem.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImageIndex(idx)}
                                                className={cn(
                                                    "relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300",
                                                    activeImageIndex === idx
                                                        ? "border-primary scale-110 shadow-lg shadow-primary/20"
                                                        : "border-transparent opacity-40 hover:opacity-80 scale-90"
                                                )}
                                            >
                                                <Image quality={80} src={img} alt="Thumbnail" fill className="object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
