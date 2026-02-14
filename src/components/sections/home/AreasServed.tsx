"use client";

import { motion } from "framer-motion";
import { MapPin, ChevronRight, Compass } from "lucide-react";
import Link from "next/link";

const areas = [
    { name: "Point Cook", slug: "/ndis-providers-point-cook" },
    { name: "Tarneit", slug: "/ndis-providers-tarneit" },
    { name: "Shepparton", slug: "/ndis-providers-shepparton" },
    { name: "Werribee", slug: "/ndis-providers-werribee" },
    { name: "Hoppers Crossing", slug: "/ndis-providers-hoppers-crossing" },
    { name: "Truganina", slug: "/ndis-providers-truganina" },
    { name: "Craigieburn", slug: "/ndis-providers-craigieburn" },
    { name: "Williams Landing", slug: "/ndis-providers-williams-landing" },
    { name: "Laverton", slug: "/ndis-providers-laverton" },
    { name: "Altona", slug: "/ndis-providers-altona" },
    { name: "Altona North", slug: "/ndis-providers-altona-north" },
    { name: "Altona Meadows", slug: "/ndis-providers-altona-meadows" },
    { name: "South Morang", slug: "/ndis-providers-south-morang" },
    { name: "Footscray", slug: "/ndis-providers-footscray" },
    { name: "Lara", slug: "/ndis-providers-lara" },
    { name: "Epping", slug: "/ndis-providers-epping" },
    { name: "Geelong", slug: "/ndis-accommodation-geelong" }
];

const AreasServed = () => {
    return (
        <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
            {/* UI Background Ornaments & Accents */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#ABB3F1]/5 rounded-full blur-[100px] z-0" />
            <div className="absolute bottom-10 right-0 w-1/3 h-full bg-[#F1ABAB]/5 -skew-x-12 translate-x-1/4 z-0" />

            {/* Radial Dot Pattern (Expert Style: Location Glow) */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ABB3F1_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(circle_at_0%_0%,white,transparent_60%)] opacity-20 z-0 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(#F1ABAB_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(circle_at_100%_100%,white,transparent_60%)] opacity-20 z-0 pointer-events-none" />

            {/* Abstract UI Decorations */}
            <div className="absolute top-[40%] left-[-2rem] w-32 h-32 border-[8px] border-[#ABB3F1]/5 rounded-full z-0" />

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                {/* Centered Header & Description */}
                <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-[1.1] tracking-tighter mb-6">
                            Areas We <span className="text-[#F1ABAB]">Serve</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                            Based in Point Cook, <span className="text-[#2D3748] font-bold">Js Choice – Care and Support</span> proudly supports participants across Melbourne's Western and Northern suburbs, as well as regional outreach where possible.
                        </p>
                    </motion.div>
                </div>

                {/* 4-Column Grid of Locations */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 md:gap-6"
                >
                    {areas.map((area, index) => (
                        <Link
                            key={index}
                            href={area.slug}
                            target={area.slug !== "#" ? "_blank" : undefined}
                            rel={area.slug !== "#" ? "noopener noreferrer" : undefined}
                            className="group relative overflow-hidden p-6 rounded-2xl bg-white border border-primary/90 hover:border-primary shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center text-center w-[calc(50%-8px)] md:w-[calc(25%-18px)]"
                        >
                            <div className="absolute inset-0 bg-[#ABB3F1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10 flex items-center justify-center gap-2">
                                <MapPin className="w-5 h-5 text-primary group-hover:text-[#5A67D8] transition-colors" />
                                <span className="text-base md:text-lg font-bold text-[#2D3748] group-hover:text-[#5A67D8] transition-colors">
                                    {area.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AreasServed;
