"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const participants = [
    {
        src: "/images/home/participant-community-event.webp",
        alt: "JS Choice participant and support worker at a community event",
    },
    {
        src: "/images/home/participant-office.webp",
        alt: "JS Choice participant holding a JS Choice Group sign",
    },
    {
        src: "/images/home/participant-playground.webp",
        alt: "JS Choice participant using outdoor exercise equipment",
    },
    {
        src: "/images/home/participant-transport.webp",
        alt: "JS Choice participant and support worker travelling together",
    },
];

const OurParticipants = () => {
    return (
        <section className="relative py-24 bg-white overflow-hidden">
            <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#ABB3F1]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[5%] w-64 h-64 bg-[#F1ABAB]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center gap-2 text-[#ABB3F1] font-black uppercase text-xs tracking-[0.2em] mb-4">
                            <span className="h-px w-8 bg-[#ABB3F1]" />
                            In the Community
                            <span className="h-px w-8 bg-[#ABB3F1]" />
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-tight uppercase tracking-tighter">
                            Our <span className="text-[#F1ABAB]">Participants</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {participants.map((photo, index) => (
                        <motion.figure
                            key={photo.src}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border-4 border-white shadow-xl"
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover"
                                quality={80}
                            />
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurParticipants;
