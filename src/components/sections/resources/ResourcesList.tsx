"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, ShieldCheck, HeartPulse, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CONTACT_DETAILS } from "@/config/contact";

const resources = [
    {
        title: "NDIS Government Website",
        description: "The official National Disability Insurance Scheme (NDIS) website providing comprehensive information for participants and providers.",
        url: "https://www.ndis.gov.au/",
        icon: Globe,
        color: "bg-blue-500/10",
        textColor: "text-blue-600"
    },
    {
        title: "NDIS Commission",
        description: "The NDIS Quality and Safeguards Commission is an independent agency established to improve the quality and safety of NDIS supports and services.",
        url: "https://www.ndiscommission.gov.au/",
        icon: ShieldCheck,
        color: "bg-purple-500/10",
        textColor: "text-purple-600"
    },
    {
        title: "My Aged Care",
        description: "The starting point to access Australian Government-funded aged care services and information on how to get the support you need.",
        url: "https://www.myagedcare.gov.au/",
        icon: HeartPulse,
        color: "bg-rose-500/10",
        textColor: "text-rose-600"
    },
    {
        title: "Worker Mandatory Training Modules",
        description: "Official NDIS Workforce training modules to ensure quality, safety, and compliance in support delivery.",
        url: "https://www.ndiscommission.gov.au/workforce/online-training-modules",
        icon: GraduationCap,
        color: "bg-orange-500/10",
        textColor: "text-orange-600"
    }
];

const ResourcesList = () => {
    return (
        <section className="py-24 bg-gray-50/50 min-h-[60vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-[#2D3748]"
                    >
                        Essential <span className="text-primary">Resources</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 text-lg"
                    >
                        Quick access to important government portals and regulatory bodies to help you navigate your care journey.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resources.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col"
                        >
                            <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                <item.icon size={32} className={item.textColor} />
                            </div>

                            <h3 className="text-2xl font-bold text-[#2D3748] mb-4 group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                                {item.description}
                            </p>

                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-between w-full p-4 rounded-xl bg-gray-50 text-[#2D3748] font-bold hover:bg-primary hover:text-[#1A202C] transition-all group/btn"
                            >
                                <span>Visit Website</span>
                                <ExternalLink size={18} className="opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info Box */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 bg-[#2D3748] rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent" />
                    <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                        <h3 className="text-2xl md:text-4xl text-primary font-black">Need Help Navigating?</h3>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            If you're finding these portals difficult to use or need clarification on any documentation, our team is here to help you every step of the way.
                        </p>
                        <div className="pt-4 flex flex-wrap justify-center gap-4">
                            <Button asChild size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] font-black shadow-lg shadow-primary/20">
                                <a href={`tel:${CONTACT_DETAILS.national.tel}`}>Call {CONTACT_DETAILS.national.display}</a>
                            </Button>
                            <Button variant="outline" asChild size="lg" className="h-14 px-8 rounded-full border-2 border-white/20 text-white hover:bg-white hover:text-[#2D3748] font-black bg-transparent transition-all">
                                <Link href="/contact-us">Send a Message</Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ResourcesList;
