"use client";

import { Wrench, Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * FloatingActions Component
 * 
 * A professional, unified side-dock for quick access.
 * Merged design ("Thek aur Professional") - sleek, continuous sidebar strip.
 */

const PinterestIcon = (props: any) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M8 20l4-9" />
        <path d="M10.7 7.1c.4-1.1 1.3-1.1 2.3-1.1 3 0 5 2.5 5 5 0 3-2 5.5-4.5 5.5-1.5 0-2.5-.5-3.5-1.5" />
        <circle cx="12" cy="12" r="10" />
    </svg>
);

const TiktokIcon = (props: any) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const actions = [
    {
        icon: Wrench,
        href: "/tools",
        label: "Tools",
        aria: "Business Tools",
        color: "text-[#F2A7A0]"
    },
    {
        icon: Facebook,
        href: "https://www.facebook.com/profile.php?id=100091940106564&mibextid=dGKdO6",
        label: "Facebook",
        aria: "Facebook",
        color: "text-[#1877F2]"
    },
    {
        icon: PinterestIcon,
        href: "https://www.pinterest.com/jschoice/",
        label: "Pinterest",
        aria: "Pinterest",
        color: "text-[#E60023]"
    },
    {
        icon: TiktokIcon,
        href: "https://www.tiktok.com/@jschoicegroup",
        label: "TikTok",
        aria: "TikTok",
        color: "text-[#010101]"
    },
    {
        icon: Instagram,
        href: "https://www.instagram.com/jschoicegroup?igsh=MWJ5eDJ1MTVzZWY3cQ%3D%3D&utm_source=qr",
        label: "Instagram",
        aria: "Instagram",
        color: "text-[#E1306C]"
    }
];

const FloatingActions = () => {
    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] flex flex-col gap-4">
            {actions.map((action, index) => (
                <Link
                    key={index}
                    href={action.href}
                    target={action.label !== "Tools" ? "_blank" : undefined}
                    aria-label={action.aria}
                    className={cn(
                        "group relative flex items-center justify-center w-12 h-12",
                        "bg-white rounded-full shadow-lg border border-gray-100",
                        "transition-transform duration-300 hover:scale-125 hover:shadow-xl"
                    )}
                >
                    {/* Tooltip */}
                    <span className="absolute right-full mr-4 px-3 py-1.5 bg-[#1F2937] text-white text-[12px] font-bold rounded opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                        {action.label}
                        <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#1F2937] rotate-45" />
                    </span>

                    {/* Icon */}
                    <action.icon
                        size={22}
                        strokeWidth={2}
                        className={cn("transition-colors duration-300", action.color)}
                    />
                </Link>
            ))}
        </div>
    );
};

export default FloatingActions;
