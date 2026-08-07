"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import IconSlot from "./IconSlot";
import type { CollageImage } from "@/types/service-sections";
import { cn } from "@/lib/utils";

interface QualityOfLifeCollageProps {
    images: CollageImage[];
    overlayIcons?: { heartHand?: string; heartHouse?: string };
    className?: string;
}

/**
 * Collage — Figma LeftCollageSection 16:733 (541×541).
 * - 3 images: overlapping collage layout
 * - 1 image: single rounded hero photo (when page only supplies one asset)
 * Icons sit on root (not inside overflow-hidden images).
 */
const QualityOfLifeCollage = ({ images, overlayIcons, className }: QualityOfLifeCollageProps) => {
    const [img1, img2, img3] = images;
    const isSingle = images.length === 1 && !!img1;

    return (
        <div className={cn("relative w-full aspect-square max-w-[541px] mx-auto lg:max-w-none lg:mx-0", className)}>
            {/* Decorative bg: purple top-right */}
            <div className="absolute top-[6.7%] right-[6.7%] w-[32%] h-[42.7%] rounded-[29px] bg-[#e8e7ff] z-0 hidden sm:block" />
            {/* Decorative bg: pink bottom-center */}
            <div className="absolute bottom-0 left-[25%] right-[30.5%] h-[42.7%] rounded-[29px] bg-[#ffe9ec] z-0 hidden sm:block" />

            {isSingle ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-[4%] rounded-[36px] overflow-hidden shadow-[0px_9px_13.5px_-2.7px_rgba(0,0,0,0.1)] border-[6px] border-white z-10"
                >
                    <Image src={img1.src} alt={img1.alt} fill className="object-cover" quality={80} />
                </motion.div>
            ) : (
                <>
                    {/* img1 — top-left portrait */}
                    {img1 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="absolute left-0 top-0 w-[60%] aspect-[3/4] rounded-[36px] overflow-hidden shadow-[0px_9px_13.5px_-2.7px_rgba(0,0,0,0.1)] border-[6px] border-white z-10"
                        >
                            <Image src={img1.src} alt={img1.alt} fill className="object-cover" quality={80} />
                        </motion.div>
                    ) : null}

                    {/* img2 — middle-right square */}
                    {img2 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="absolute left-[55%] right-0 top-[25%] bottom-[30%] rounded-[36px] overflow-hidden shadow-[0px_9px_13.5px_-2.7px_rgba(0,0,0,0.1)] border-[7px] border-white z-20"
                        >
                            <Image src={img2.src} alt={img2.alt} fill className="object-cover" quality={80} />
                        </motion.div>
                    ) : null}

                    {/* img3 — bottom-left landscape */}
                    {img3 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="absolute left-[5%] right-[40%] bottom-0 aspect-[5/4] rounded-[36px] overflow-hidden shadow-[0px_9px_13.5px_-2.7px_rgba(0,0,0,0.1)] border-[7px] border-white z-10"
                        >
                            <Image src={img3.src} alt={img3.alt} fill className="object-cover" quality={80} />
                        </motion.div>
                    ) : null}
                </>
            )}

            {/* heartHand — top-left */}
            {overlayIcons?.heartHand ? (
                <div className="absolute top-[-22px] left-[-22px] w-[58px] h-[58px] rounded-full bg-[#f0eeff] border-[3.6px] border-white flex items-center justify-center shadow-[0px_3.6px_5.4px_-0.9px_rgba(0,0,0,0.1)] z-30">
                    <IconSlot icon={overlayIcons.heartHand} size={28} alt="" />
                </div>
            ) : null}

            {/* heartHouse — bottom-right of collage */}
            {overlayIcons?.heartHouse ? (
                <div
                    className="absolute w-[72px] h-[72px] rounded-full bg-[#ffe9ec] border-[3.6px] border-white flex items-center justify-center shadow-[0px_3.6px_5.4px_-0.9px_rgba(0,0,0,0.1)] z-30"
                    style={{
                        bottom: "-22px",
                        right: isSingle ? "-12px" : "calc(40% - 22px)",
                    }}
                >
                    <IconSlot icon={overlayIcons.heartHouse} size={36} alt="" />
                </div>
            ) : null}
        </div>
    );
};

export default QualityOfLifeCollage;
