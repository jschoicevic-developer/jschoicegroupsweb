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
                            target="_blank" rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors"
                            aria-label="Facebook"
                        >
                            <Facebook size={18} strokeWidth={2} />
                        </Link>
                        <Link
                            href="https://www.pinterest.com/jschoice/"
                            target="_blank" rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors py-1 px-0.5"
                            aria-label="Pinterest"
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                className="transition-transform duration-300"
                            >
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.677.974-2.93 2.187-2.93 1.03 0 1.528.771 1.528 1.691 0 1.035-.658 2.582-.998 4.019-.283 1.194.599 2.169 1.774 2.169 2.13 0 3.765-2.247 3.765-5.49 0-2.871-2.063-4.878-5.004-4.878-3.414 0-5.421 2.561-5.421 5.207 0 1.033.398 2.143.896 2.748.098.117.111.222.083.344l-.331 1.353c-.053.221-.173.267-.4.159-1.492-.693-2.427-2.878-2.427-4.633 0-3.784 2.749-7.252 7.925-7.252 4.161 0 7.391 2.96 7.391 6.914 0 4.125-2.601 7.447-6.216 7.447-1.214 0-2.355-.63-2.746-1.378l-.744 2.84c-.269 1.018-.999 2.228-1.488 3.015 1.12.333 2.308.514 3.538.514 6.621 0 11.988-5.367 11.988-11.987S18.637 0 12.017 0z" />
                            </svg>
                        </Link>
                        <Link
                            href="https://www.instagram.com/jschoicegroup?igsh=MWJ5eDJ1MTVzZWY3cQ%3D%3D&utm_source=qr"
                            target="_blank" rel="noopener noreferrer"
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
