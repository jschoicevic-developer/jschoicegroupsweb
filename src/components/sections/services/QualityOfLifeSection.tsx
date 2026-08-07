"use client";

import SectionHeader from "./SectionHeader";
import ChecklistAccordion from "./ChecklistAccordion";
import type { ChecklistItem, CollageImage, SectionHeadingProps } from "@/types/service-sections";
import QualityOfLifeCollage from "./QualityOfLifeCollage";
import { cn } from "@/lib/utils";

interface QualityOfLifeSectionProps {
    heading: SectionHeadingProps;
    items: ChecklistItem[];
    images: CollageImage[];
    overlayIcons?: { heartHand?: string; heartHouse?: string };
    imagePosition?: "left" | "right";
}

const QualityOfLifeSection = ({
    heading,
    items,
    images,
    overlayIcons,
    imagePosition = "right",
}: QualityOfLifeSectionProps) => {
    const textOrder = imagePosition === "right" ? "order-2 lg:order-1" : "order-2 lg:order-2";
    const imageOrder = imagePosition === "right" ? "order-1 lg:order-2" : "order-1 lg:order-1";

    return (
        <section className="py-16 lg:py-24 bg-white">
            {/* Figma frame 16:591 content width 1267px — tighter than container-8xl (1450) */}
            <div className="container-8xl max-w-[1267px] flex flex-col gap-10 lg:gap-[50px]">
                <SectionHeader {...heading} align="left" />

                <div
                    className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.13fr)_minmax(0,1fr)] 2xl:grid-cols-[612px_541px] lg:items-center"
                    style={{ columnGap: "55px" }}
                >
                    <ChecklistAccordion
                        items={items}
                        defaultOpenIndex={0}
                        className={cn("w-full min-w-0", textOrder)}
                    />

                    <QualityOfLifeCollage
                        images={images}
                        overlayIcons={overlayIcons}
                        className={cn("w-full min-w-0", imageOrder)}
                    />
                </div>
            </div>
        </section>
    );
};

export default QualityOfLifeSection;
