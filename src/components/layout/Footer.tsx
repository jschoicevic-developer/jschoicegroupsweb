import Link from "next/link";
import Image from "next/image";
import { CONTACT_DETAILS } from "@/config/contact";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
    const servicesLeft = [
        { name: "Assistance with daily life", href: "https://jschoicegroup.com.au/assistance-with-daily-life" },
        { name: "Emergency respite", href: "https://jschoicegroup.com.au/emergency-respite" },
        { name: "Assistance with nursing care", href: "https://jschoicegroup.com.au/assistance-with-nursing-care" },
        { name: "Transportation Assistance", href: "https://jschoicegroup.com.au/transportation-assistance" },
        { name: "Access To Community Activities", href: "https://jschoicegroup.com.au/access-to-community-activities" },
        { name: "NDIS Accommodation", href: "https://jschoicegroup.com.au/ndis-accommodation" },
    ];

    const servicesRight = [
        { name: "Support Coordination", href: "https://jschoicegroup.com.au/support-coordination" },
        { name: "Psychosocial Recovery Coach", href: "https://jschoicegroup.com.au/psychosocial-recovery-coach" },
        { name: "Allied Health Services", href: "https://jschoicegroup.com.au/allied-health-services" },
        { name: "Assist with Employment/Education", href: "https://jschoicegroup.com.au/employment-education" },
        { name: "NDIS Access Requests", href: "https://jschoicegroup.com.au/ndis-access-requests" },
        { name: "Innovative Community Participation", href: "https://jschoicegroup.com.au/innovative-community-participation-including-volunteer-opportunities" },
    ];

    const socialLinks = [
        {
            name: "Facebook",
            href: "https://www.facebook.com/profile.php?id=100091940106564&mibextid=dGKdO6",
            icon: Facebook
        },
        {
            name: "Pinterest",
            href: "https://www.pinterest.com/jschoice/",
            icon: ({ className }: { className?: string }) => (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={className}
                >
                    <path d="M8 20l4-9" />
                    <path d="M10.7 7.1c.4-1.1 1.3-1.1 2.3-1.1 3 0 5 2.5 5 5 0 3-2 5.5-4.5 5.5-1.5 0-2.5-.5-3.5-1.5" />
                    <circle cx="12" cy="12" r="10" />
                </svg>
            )
        },
        {
            name: "TikTok",
            href: "https://www.tiktok.com/@jschoicegroup",
            icon: ({ className }: { className?: string }) => (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={className}
                >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
            )
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com/jschoicegroup?igsh=MWJ5eDJ1MTVzZWY3cQ%3D%3D&utm_source=qr",
            icon: Instagram
        }
    ];

    return (
        <footer className="bg-[#0F172A] text-white pt-16 overflow-hidden relative">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-[#ABB3F1]/5 rounded-full blur-[100px] z-0" />

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-8">

                    {/* Brand Section (2 Cols) */}
                    <div className="lg:col-span-2 space-y-8">
                        <Link href="https://jschoicegroup.com.au/">
                            <Image quality={80}
                                src="/JCGLogoWhite.png"
                                alt="JS Choice"
                                width={200}
                                height={80}
                                className="h-20 w-auto object-contain"
                            />
                        </Link>

                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg group"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-white/10 relative h-24 w-40">
                            <Image quality={80}
                                src="/images/footer/ndis.webp"
                                alt="NDIS"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                    </div>

                    {/* Services Section (5 Cols) */}
                    <div className="lg:col-span-4">
                        <div className="mb-10 text-xl font-black uppercase tracking-[0.2em] text-[#ABB3F1] flex items-center gap-4">
                            Services
                            <span className="h-px grow bg-white/10" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                            <ul className="space-y-4">
                                {servicesLeft.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.href} className="text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#ABB3F1] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <ul className="space-y-4">
                                {servicesRight.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.href} className="text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#F1ABAB] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Quick Links Section (3 Cols) */}
                    <div className="lg:col-span-3">
                        <div className="mb-10 text-xl font-black uppercase tracking-[0.2em] text-[#6366F1] flex items-center gap-4">
                            Resources
                            <span className="h-px grow bg-white/10" />
                        </div>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/resources" className="text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all" />
                                    Community Resources
                                </Link>
                            </li>
                            <li>
                                <Link href="/career" className="text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all" />
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all" />
                                    Latest Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/about-us" className="text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all" />
                                    About Js Choice
                                </Link>
                            </li>
                            <li>
                                <a href="https://www.ndis.gov.au/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all" />
                                    NDIS Government Website
                                </a>
                            </li>
                            <li>
                                <a href="https://www.ndiscommission.gov.au/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all" />
                                    NDIS Commission
                                </a>
                            </li>
                            <li>
                                <a href="https://www.myagedcare.gov.au/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all" />
                                    My Aged Care
                                </a>
                            </li>
                            <li>
                                <a href="https://www.ndiscommission.gov.au/workforce/online-training-modules" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all" />
                                    Worker Training Modules
                                </a>
                            </li>
                            <li>
                                <a href="https://etrainu.com/ndis-commission-positive-behaviour-support-training" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all" />
                                    Behaviour Support Training
                                </a>
                            </li>
                            <li>
                                <a href="https://www.ndiscommission.gov.au/rules-and-standards/behaviour-support-and-restrictive-practices" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-3 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all" />
                                    Rules and Standards
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section (3 Cols) */}
                    <div className="lg:col-span-3">
                        <div className="mb-10 text-xl font-black uppercase tracking-[0.2em] text-[#F1ABAB] flex items-center gap-4">
                            Contact Us
                            <span className="h-px grow bg-white/10" />
                        </div>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="p-1 shrink-0 relative w-6 h-6 mt-1">
                                    <Image quality={80} src="/images/footer/call.webp" alt="Call" fill className="object-contain" />
                                </div>
                                <div className="flex flex-col gap-1.5 pt-0.5">
                                    <span className="text-xs text-slate-400 italic mb-1 leading-snug">
                                        People forget numbers, so we use "alphabet-style numbers" to help them remember.
                                    </span>
                                    <span className="text-lg font-black text-[#ABB3F1] tracking-wide mb-1">1300 JS CHOICE</span>
                                    <a href="tel:1300572464" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">1300 572 464 (National)</a>
                                    <a href="tel:0421622262" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">0421 622 262 (Mobile)</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 shrink-0 relative w-6 h-6">
                                    <Image quality={80} src="/images/footer/email.webp" alt="Email" fill className="object-contain" />
                                </div>
                                <a href="mailto:info@jschoicegroup.com.au" className="pt-1.5 text-sm font-bold text-gray-400 hover:text-white transition-colors truncate">
                                    info@jschoicegroup.com.au
                                </a>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 shrink-0 relative w-6 h-6">
                                    <Image quality={80} src="/images/footer/location.webp" alt="Loc" fill className="object-contain" />
                                </div>
                                <p className="pt-1 text-xs md:text-sm font-bold text-gray-400 leading-relaxed">
                                    Suite 104, Level 1, C5, 2 Main Street, Point Cook VIC 3030
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 shrink-0 relative w-6 h-6">
                                    <Image quality={80} src="/images/footer/po-box.webp" alt="PO" fill className="object-contain" />
                                </div>
                                <p className="pt-1 text-xs md:text-sm font-bold text-gray-400 leading-relaxed">
                                    PO Box 6282 Point Cook 3030 Victoria
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1 shrink-0 relative w-6 h-6">
                                    <Image quality={80} src="/images/footer/clock.webp" alt="Clock" fill className="object-contain" />
                                </div>
                                <div className="pt-1 text-xs md:text-sm font-black flex flex-col gap-1 text-gray-400">
                                    <span className="group-hover:text-white transition-colors">Office - 8 am to 6 pm</span>
                                    <span className="text-[#F1ABAB]">Care Services - 24 Hours</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Acknowledgement Section */}
                <div className="border-t border-white/5 pt-8 pb-0">
                    <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4">
                        <Image quality={80}
                            src="/images/footer/acknowledgement.webp"
                            alt="Acknowledge"
                            width={300}
                            height={48}
                            className="h-12 w-auto object-contain"
                        />
                        <h3 className="text-lg md:text-xl font-black tracking-[0.2em] text-white uppercase">Acknowledgement of Country</h3>
                        <p className="text-xs md:text-sm text-gray-400 font-bold leading-[1.8] px-4">
                            Js Choice – Care and Support pays tribute to the First Nations across Australia, acknowledging and honoring their lasting bond with the land, sea, culture, and community. We hold in high regard and celebrate the wisdom of Elders from the past, present, and those yet to come, and we extend this reverence to all contemporary First Nations individuals.
                        </p>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="bg-black/40 border-t border-white/5 py-4">
                <div className="max-w-8xl mx-auto px-4 text-center">
                    <p className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-[0.2em] leading-relaxed">
                        Copyright © 2026 JS CHOICE GROUP PTY LTD • Design by <a href="https://cruxlabs.com.au/" target="_blank" rel="noopener noreferrer" className="text-[#ABB3F1] hover:underline">CruxLabs</a>
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-2 text-[10px] font-black text-[#5A67D8] tracking-widest opacity-80 uppercase">
                        <span>ABN : 54 644 196 270</span>
                        <span className="hidden sm:inline opacity-30">|</span>
                        <span>Licence no : 4050118332</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 mt-2 text-[10px] font-black tracking-widest uppercase">
                        <a href="/privacy-policy" className="text-gray-600 hover:text-[#ABB3F1] transition-colors">Privacy Policy</a>
                        <span className="text-gray-700 opacity-30">|</span>
                        <a href="/terms-and-conditions" className="text-gray-600 hover:text-[#ABB3F1] transition-colors">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
