import Image from "next/image";
import type { SectionIcon } from "@/types/service-sections";
import { cn } from "@/lib/utils";

interface IconSlotProps {
    icon?: SectionIcon;
    /** Glyph size in px (width & height). Defaults to 32. */
    size?: number;
    alt?: string;
    className?: string;
}

/**
 * Renders a section icon at an exact pixel size:
 * - string path -> next/image (SVG/WebP asset, pixel-perfect, no cropping)
 * - ReactNode -> passthrough
 * - undefined -> soft placeholder dot so layout doesn't shift while content rolls out
 */
const IconSlot = ({ icon, size = 32, alt = "", className }: IconSlotProps) => {
    if (!icon) {
        return (
            <div
                style={{ width: size, height: size }}
                className={cn("rounded-full bg-primary/20", className)}
            />
        );
    }

    if (typeof icon === "string") {
        return (
            <div style={{ width: size, height: size }} className={cn("relative shrink-0", className)}>
                <Image src={icon} alt={alt} fill className="object-contain" />
            </div>
        );
    }

    return <>{icon}</>;
};

export default IconSlot;
