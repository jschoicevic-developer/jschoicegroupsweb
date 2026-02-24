"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Menu, X, ChevronDown,
    HeartHandshake, Brain, Stethoscope,
    ShieldAlert, Users, Car,
    MapPin, Network, Activity,
    FileText, Lightbulb, Home, Wrench, GraduationCap
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
    }, [pathname]);

    useEffect(() => {
        if (!isOpen) {
            setMobileServicesOpen(false);
        }
    }, [isOpen]);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const services = [
        { name: "Assistance With Daily Life", href: "/assistance-with-daily-life", icon: HeartHandshake, desc: "Support for your everyday needs and independence." },
        { name: "Psychosocial Recovery Coach", href: "/psychosocial-recovery-coach", icon: Brain, desc: "Expert guidance for mental health recovery." },
        { name: "Assistance With Nursing Care", href: "/assistance-with-nursing-care", icon: Stethoscope, desc: "Professional nursing care in your home." },
        { name: "Emergency Respite", href: "/emergency-respite", icon: ShieldAlert, desc: "Immediate support when you need it most." },
        { name: "Group / Centre Activities", href: "/group-centre-activities", icon: Users, desc: "Engaging activities in a supportive group setting." },
        { name: "Transportation Assistance", href: "/transportation-assistance", icon: Car, desc: "Safe and reliable transport solutions." },
        { name: "Access To Community Activities", href: "/access-to-community-activities", icon: MapPin, desc: "Participate fully in your community." },
        { name: "Support Coordination", href: "/support-coordination", icon: Network, desc: "Help navigating and managing your NDIS plan." },
        { name: "Allied Health Services", href: "/allied-health-services", icon: Activity, desc: "Therapeutic support for your well-being." },
        { name: "Assist with Employment/Education", href: "/employment-education", icon: GraduationCap, desc: "Support for career and learning goals." },
        { name: "NDIS Access Requests", href: "/ndis-access-requests", icon: FileText, desc: "Assistance with NDIS access and applications." },
        { name: "Innovative Community Participation", href: "/innovative-community-participation-including-volunteer-opportunities", icon: Lightbulb, desc: "Creative ways to engage with society." },
        { name: "NDIS Accommodation", href: "/ndis-accommodation", icon: Home, desc: "Safe and comfortable living arrangements." },
    ];

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about-us" },
        { name: "Blog", href: "/blog" },
        { name: "Resources", href: "/resources" },
        { name: "Contact Us", href: "/contact-us" },
    ];

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full bg-white border-b border-gray-100 sticky top-0 z-[100] shadow-sm"
        >
            <div className="container-8xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 md:h-24">

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2 relative z-50 shrink-0">
                        <Image
                            src="/JCGLogo.png"
                            alt="JS Choice Group"
                            width={135}
                            height={77}
                            className="h-14 md:h-16 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
                        {navLinks.slice(0, 2).map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-[15px] font-medium tracking-wide transition-all duration-200 relative group py-2",
                                    pathname === link.href ? "text-primary" : "text-foreground hover:text-primary"
                                )}
                            >
                                {link.name}
                                <span className={cn(
                                    "absolute bottom-0 left-0 w-0 h-[2px] rounded-full bg-primary transition-all duration-300 group-hover:w-full",
                                    pathname === link.href && "w-full"
                                )} />
                            </Link>
                        ))}

                        {/* Services Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown("services")}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button
                                className={cn(
                                    "flex items-center gap-1.5 text-[15px] font-medium tracking-wide transition-all duration-200 py-2 focus:outline-none",
                                    activeDropdown === "services" || pathname.startsWith("/services") ? "text-primary" : "text-foreground hover:text-primary"
                                )}
                            >
                                Services
                                <ChevronDown className={cn("h-4 w-4 transition-transform duration-300 text-black", activeDropdown === "services" ? "rotate-180" : "")} strokeWidth={2} />
                            </button>

                            <AnimatePresence>
                                {activeDropdown === "services" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 -translate-x-[40%] w-[1100px] pt-4 z-[105]"
                                    >
                                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden text-left p-5 grid grid-cols-3 gap-2">
                                            {services.map((service) => (
                                                <Link
                                                    key={service.name}
                                                    href={service.href}
                                                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent transition-all group/item"
                                                >
                                                    <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors flex items-center justify-center">
                                                        <service.icon size={20} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[13px] font-bold text-foreground group-hover/item:text-primary transition-colors leading-tight">
                                                            {service.name}
                                                        </span>
                                                        <span className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 leading-tight">
                                                            {service.desc}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {navLinks.slice(2).map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-[15px] font-medium tracking-wide transition-all duration-200 relative group py-2",
                                    pathname === link.href ? "text-primary" : "text-foreground hover:text-primary"
                                )}
                            >
                                {link.name}
                                <span className={cn(
                                    "absolute bottom-0 left-0 w-0 h-[2px] rounded-full bg-primary transition-all duration-300 group-hover:w-full",
                                    pathname === link.href && "w-full"
                                )} />
                            </Link>
                        ))}
                    </nav>

                    {/* Right Section: Tools and CTA */}
                    <div className="hidden lg:flex items-center gap-5 xl:gap-8">
                        <Link
                            href="/tools"
                            className="flex items-center justify-center gap-2 text-[15px] font-medium px-6 h-11 rounded-full bg-secondary text-white transition-all duration-300 hover:brightness-110 shadow-sm hover:shadow-md"
                        >
                            <Wrench size={16} strokeWidth={1.5} className="text-black" />
                            <span className="text-black">Tools</span>
                        </Link>

                        <Button
                            asChild
                            className="bg-primary hover:brightness-110 text-white font-semibold rounded-full px-6 h-11 shadow-sm hover:shadow-md transition-all duration-300 text-[15px]"
                        >
                            <Link href="/consultations" className="flex items-center gap-2">
                                <HeartHandshake size={18} strokeWidth={1.5} className="text-black" />
                                <span className="text-black font-semibold">Get Consultations</span>
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2.5 text-foreground hover:bg-gray-100 rounded-xl transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="lg:hidden fixed inset-0 top-[104px] z-[90] bg-white h-[calc(100vh-104px)] overflow-y-auto px-6 py-8"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-xl font-bold text-foreground border-b border-gray-50 pb-4"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Mobile Services */}
                            <div className="border-b border-gray-50 pb-4">
                                <button
                                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                    className="w-full flex items-center justify-between text-xl font-bold text-foreground"
                                >
                                    Services
                                    <ChevronDown className={cn("transition-transform duration-300", mobileServicesOpen ? "rotate-180" : "")} />
                                </button>
                                {mobileServicesOpen && (
                                    <div className="grid grid-cols-1 gap-2 mt-4 pl-2">
                                        {services.map((service) => (
                                            <Link
                                                key={service.name}
                                                href={service.href}
                                                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-sm font-semibold text-foreground"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <service.icon size={16} className="text-primary" />
                                                {service.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-4 mt-4">
                                <Link
                                    href="/tools"
                                    className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-secondary text-white font-semibold text-lg shadow-md hover:brightness-110 transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Wrench size={20} className="text-black" strokeWidth={1.5} />
                                    <span className="text-black font-bold">Tools</span>
                                </Link>
                                <Button
                                    asChild
                                    className="w-full h-12 rounded-xl bg-primary text-white font-semibold text-lg shadow-md hover:brightness-110"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Link href="/consultations" className="flex items-center justify-center gap-2">
                                        <HeartHandshake size={20} className="text-black" strokeWidth={1.5} />
                                        <span className="text-black font-bold">Get Consultations</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-secondary origin-left z-[101]"
                style={{ scaleX }}
            />
        </motion.header>
    );
};

export default Navbar;