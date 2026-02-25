"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock,  CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
 
const contactInfo = [
    {
        icon: Phone,
        title: "Call Us",
        content: (
            <div className="flex flex-col gap-1.5 pt-1">
                <span className="text-xs text-gray-500 italic mb-1">
                    People forget numbers, so we use &quot;alphabet-style numbers&quot; to help them remember.
                </span>
                <span className="text-lg font-black text-primary mb-1">1300 JS CHOICE</span>
                <a href="tel:1300572464" className="hover:text-primary transition-colors font-bold text-base">1300 572 464 (National)</a>
                <a href="tel:0421622262" className="hover:text-primary transition-colors font-bold text-base">0421 622 262 (Mobile)</a>
            </div>
        )
    },
    {
        icon: Mail,
        title: "Email Us",
        content: (
            <a href="mailto:info@jschoicegroup.com.au" className="hover:text-primary transition-colors">
                info@jschoicegroup.com.au
            </a>
        )
    },
    {
        icon: MapPin,
        title: "Address",
        content: "Suite 106, Level 1, C5, 2 Main Street, Point Cook VIC 3030"
    },
    {
        icon: Mail,
        title: "Mailing Address",
        content: "PO Box 6282 Point Cook 3030 Victoria"
    },
    {
        icon: Clock,
        title: "Business Hours",
        content: "Office – 8 am to 6 pm, Care Services – 24 Hours"
    }
];

const ContactContent = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        location: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [mapStatus, setMapStatus] = useState<"loading" | "loaded" | "fallback">("loading");
    const mapTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => {
        mapTimeoutRef.current = setTimeout(() => {
            setMapStatus((prev) => (prev === "loading" ? "fallback" : prev));
        }, 7000);
        return () => clearTimeout(mapTimeoutRef.current);
    }, []);

    const handleMapLoad = () => {
        clearTimeout(mapTimeoutRef.current);
        setMapStatus("loaded");
    };

    const handleMapError = () => {
        clearTimeout(mapTimeoutRef.current);
        setMapStatus("fallback");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            // Split name into first and last name
            const nameParts = formData.name.trim().split(" ");
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(" ") || "";

            const response = await fetch("/api/leads/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: formData.email,
                    phone: formData.phone,
                    location: formData.location,
                    message: formData.message,
                    source: "contact_form",
                    source_page: "/contact-us",
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    location: "",
                    message: "",
                });

                // Reset success message after 5 seconds
                setTimeout(() => setSuccess(false), 5000);
            } else {
                setError(data.error || "Failed to submit form. Please try again.");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section className="py-20 bg-white min-h-screen">
            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">

                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-[#2D3748] mb-10 uppercase tracking-tight">
                            Contact <span className="text-primary">Information</span>
                        </h2>

                        <div className="space-y-8">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                                        <item.icon size={26} className="text-[#2D3748] group-hover:text-primary transition-colors stroke-[1.5]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-[#2D3748] uppercase tracking-wide mb-1 leading-tight">
                                            {item.title}
                                        </h3>
                                        <div className="text-base font-medium text-gray-600 leading-relaxed">
                                            {item.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-lg"
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-[#2D3748] mb-8 uppercase tracking-tight">
                            Get In Touch <span className="text-secondary">With Us</span>
                        </h2>

                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3"
                            >
                                <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={20} />
                                <div>
                                    <p className="font-bold text-green-900">Thank you for contacting us!</p>
                                    <p className="text-sm text-green-700">We&quot;ll get back to you as soon as possible.</p>
                                </div>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3"
                            >
                                <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                                <p className="text-sm text-red-700">{error}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name *"
                                    required
                                    className="h-14 px-6 rounded-2xl bg-white border-gray-200 focus:border-secondary transition-all text-base"
                                />
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone No *"
                                    type="tel"
                                    required
                                    className="h-14 px-6 rounded-2xl bg-white border-gray-200 focus:border-secondary transition-all text-base"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email *"
                                    type="email"
                                    required
                                    className="h-14 px-6 rounded-2xl bg-white border-gray-200 focus:border-secondary transition-all text-base"
                                />
                                <Input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Location"
                                    className="h-14 px-6 rounded-2xl bg-white border-gray-200 focus:border-secondary transition-all text-base"
                                />
                            </div>

                            <Textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message *"
                                required
                                className="min-h-[160px] p-6 rounded-2xl bg-white border-gray-200 focus:border-secondary transition-all text-base resize-none"
                            />

                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-14 w-full rounded-full bg-secondary hover:brightness-110 text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin">⏳</span>
                                        Sending...
                                    </span>
                                ) : (
                                    "Submit Now"
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>

                {/* Google Maps Embed */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full h-112.5 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white"
                >
                    {mapStatus !== "fallback" && (
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3185.88242143016!2d144.7353927!3d-37.8841432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xabcfe6437b782811%3A0x58ba017b4a222108!2sJs%20Choice%20-%20Care%20and%20Support!5e1!3m2!1sen!2sin!4v1731303057766!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="eager"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="JS Choice Care and Support location map"
                            onLoad={handleMapLoad}
                            onError={handleMapError}
                        />
                    )}

                    {/* Loading shimmer — visible until iframe fires onLoad */}
                    {mapStatus === "loading" && (
                        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center gap-3">
                            <MapPin size={40} className="text-primary/40 animate-pulse" />
                            <span className="text-sm text-gray-400">Loading map…</span>
                        </div>
                    )}

                    {/* Fallback — shown after timeout or onError */}
                    {mapStatus === "fallback" && (
                        <div className="absolute inset-0 bg-linear-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center gap-5 px-8 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <MapPin size={32} className="text-primary" />
                            </div>
                            <div>
                                <p className="font-black text-[#2D3748] text-lg mb-1">JS Choice Care and Support</p>
                                <p className="text-gray-500 text-sm">Suite 106, Level 1, C5, 2 Main Street, Point Cook VIC 3030</p>
                            </div>
                            <a
                                href="https://www.google.com/maps/place/Js+Choice+-+Care+and+Support/@-37.8841432,144.7353927,17z"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold text-sm hover:brightness-110 transition-all duration-300"
                            >
                                <MapPin size={16} />
                                Open in Google Maps
                            </a>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default ContactContent;
