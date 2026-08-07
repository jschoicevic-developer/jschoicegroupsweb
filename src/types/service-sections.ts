import type { ReactNode } from "react";

/**
 * An icon slot for reusable service section components.
 * - `string` -> local asset path (SVG/WebP), rendered via next/image at exact dimensions.
 * - `ReactNode` -> pass a fully custom element (e.g. an already-rendered <Image />).
 */
export type SectionIcon = string | ReactNode;

export interface SectionHeadingProps {
    /** Base heading text (not highlighted). */
    title: string;
    /** Portion of the heading rendered in the accent color. */
    titleHighlight?: string;
    /** Tailwind text color class applied to `titleHighlight`. Defaults to text-secondary. */
    highlightClassName?: string;
    /** Explicit hex/rgb accent color for `titleHighlight` (overrides global h2 color). */
    highlightColor?: string;
    /** Max width of the header block. Defaults by alignment (829px center, 893px left). */
    headerMaxWidth?: number;
    /** Title text color for dark-background sections. */
    titleColor?: string;
    /** Subtitle text color override (e.g. white on dark sections). */
    subtitleColor?: string;
    /** Keep the subtitle on one line from tablet widths when space allows. */
    subtitleSingleLine?: boolean;
    /** Optional supporting copy under the heading. */
    subtitle?: string;
    /** Heading + subtitle alignment. Defaults to "center". */
    align?: "left" | "center";
    /** When true, titleHighlight renders inline on the same line as title. */
    highlightInline?: boolean;
    /** Subtitle text alignment. Defaults to match `align`. */
    subtitleAlign?: "left" | "center";
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface IconCardItem {
    title: string;
    description: string;
    icon?: SectionIcon;
}

export interface ChecklistItem {
    title: string;
    description?: string;
    icon?: SectionIcon;
}

export interface ProcessStepItem {
    title: string;
    description: string;
    icon?: SectionIcon;
}

export interface ProcessCtaProps {
    title: string;
    description: string;
    icon?: SectionIcon;
    primaryLabel: string;
    primaryHref: string;
    primaryIcon?: SectionIcon;
    secondaryLabel: string;
    secondaryHref: string;
    secondaryIcon?: SectionIcon;
}

export interface CollageImage {
    src: string;
    alt: string;
}
