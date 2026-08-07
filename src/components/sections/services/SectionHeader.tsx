"use client";

import { motion } from "framer-motion";
import type { SectionHeadingProps } from "@/types/service-sections";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends SectionHeadingProps {
    className?: string;
}

/** Maps theme utility classes to CSS values for reliable accent rendering inside h2. */
const HIGHLIGHT_CLASS_COLORS: Record<string, string> = {
    "text-primary": "var(--primary)",
    "text-secondary": "var(--secondary)",
    "text-white": "#ffffff",
    "text-heading-lavender": "#9f9ae5",
    "text-heading-coral": "#ff7e7e",
    "text-heading-periwinkle": "#a5b4fc",
};

const SectionHeader = ({
    title,
    titleHighlight,
    highlightClassName = "text-secondary",
    highlightColor,
    subtitle,
    align = "center",
    highlightInline = true,
    subtitleAlign,
    headerMaxWidth,
    titleColor = "#2d3648",
    subtitleColor,
    subtitleSingleLine = false,
    className,
}: SectionHeaderProps) => {
    const isCenter = align === "center";
    const resolvedSubtitleAlign = subtitleAlign ?? align;
    const resolvedHighlightColor =
        highlightColor ?? HIGHLIGHT_CLASS_COLORS[highlightClassName];

    const defaultMaxWidth = isCenter ? 829 : 893;
    const maxWidth = headerMaxWidth ?? defaultMaxWidth;

    const highlightSpan = titleHighlight ? (
        <span
            className={cn("section-heading-accent", highlightClassName)}
            style={resolvedHighlightColor ? { color: resolvedHighlightColor } : undefined}
        >
            {titleHighlight}
        </span>
    ) : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn(
                "flex flex-col w-full",
                isCenter ? "gap-4 mx-auto text-center" : "gap-3 text-left",
                className
            )}
            style={{ maxWidth }}
        >
            <h2
                className={cn(
                    "font-black tracking-tight",
                    "text-3xl md:text-4xl lg:text-[46px]",
                    isCenter ? "lg:leading-[48px]" : "lg:leading-[56px]",
                    highlightInline && isCenter && "lg:whitespace-nowrap"
                )}
            >
                <span style={{ color: titleColor }}>{title}</span>
                {highlightSpan ? (
                    highlightInline ? (
                        <>
                            {" "}
                            {highlightSpan}
                        </>
                    ) : (
                        <span className="block mt-1">{highlightSpan}</span>
                    )
                ) : null}
            </h2>
            {subtitle ? (
                <p
                    className={cn(
                        "text-base leading-[25px]",
                        !subtitleColor && "text-[#7b807f]",
                        resolvedSubtitleAlign === "center"
                            ? "text-center mx-auto max-w-[618px]"
                            : "text-left max-w-[660px]",
                        subtitleSingleLine &&
                            "md:max-w-none md:whitespace-nowrap md:text-[clamp(11px,1.2vw,16px)]"
                    )}
                    style={subtitleColor ? { color: subtitleColor } : undefined}
                >
                    {subtitle}
                </p>
            ) : null}
        </motion.div>
    );
};

export default SectionHeader;
