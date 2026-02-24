"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, Facebook, Instagram, Headset, Clock } from "lucide-react";
import { CONTACT_DETAILS } from "@/config/contact";

const Topbar = () => {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-secondary text-foreground py-2 relative z-110 border-b border-foreground/10 shadow-sm"
        >
            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex flex-row justify-between items-center gap-4 md:gap-0 font-semibold text-[13px] tracking-tight">

                    {/* LEFT SECTION: Contact Info & Hours */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8">
                        {/* Phone */}
                        <div className="flex items-center gap-2 group">
                            <a href={`tel:${CONTACT_DETAILS.alphabetical.tel}`} className="text-foreground/80 group-hover:text-foreground transition-colors" aria-label={`Call ${CONTACT_DETAILS.alphabetical.display}`}>
                                <Phone size={15} strokeWidth={2} />
                            </a>
                            <div className="hidden md:flex items-center gap-2 text-[#1F2937]">
                                <a href={`tel:${CONTACT_DETAILS.alphabetical.tel}`} className="hover:text-foreground/70 transition-colors font-bold tracking-wide">{CONTACT_DETAILS.alphabetical.display}</a>
                            </div>
                        </div>

                        {/* Email */}
                        <a href="mailto:info@jschoicegroup.com.au" className="flex items-center gap-2 group transition-colors">
                            <Mail size={15} strokeWidth={2} className="text-foreground/80 group-hover:text-foreground transition-colors" />
                            <span className="hidden lg:block group-hover:text-foreground/70">info@jschoicegroup.com.au</span>
                        </a>

                        {/* Office Hours */}
                        <div className="hidden xl:flex items-center gap-2">
                            <Clock size={15} strokeWidth={2} className="text-foreground/80" />
                            <span>Office: 8am - 6pm</span>
                        </div>

                        {/* Support */}
                        <div className="flex items-center gap-2">
                            <Headset size={15} strokeWidth={2} className="text-foreground/80" />
                            <span className="hidden md:block">Services Support: 24 Hours</span>
                        </div>
                    </div>

                    {/* RIGHT SECTION: Social Icons */}
                    <div className="flex items-center gap-4 text-foreground/80">
                        <Link
                            href="https://www.facebook.com/profile.php?id=100091940106564&mibextid=dGKdO6"
                            target="_blank"
                            className="hover:text-foreground transition-colors"
                            aria-label="Facebook"
                        >
                            <Facebook size={18} strokeWidth={2} />
                        </Link>
                        <Link
                            href="https://www.instagram.com/jschoicegroup?igsh=MWJ5eDJ1MTVzZWY3cQ%3D%3D&utm_source=qr"
                            target="_blank"
                            className="hover:text-foreground transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={18} strokeWidth={2} />
                        </Link>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default Topbar;
