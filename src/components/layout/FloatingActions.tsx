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
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.677.974-2.93 2.187-2.93 1.03 0 1.528.771 1.528 1.691 0 1.035-.658 2.582-.998 4.019-.283 1.194.599 2.169 1.774 2.169 2.13 0 3.765-2.247 3.765-5.49 0-2.871-2.063-4.878-5.004-4.878-3.414 0-5.421 2.561-5.421 5.207 0 1.033.398 2.143.896 2.748.098.117.111.222.083.344l-.331 1.353c-.053.221-.173.267-.4.159-1.492-.693-2.427-2.878-2.427-4.633 0-3.784 2.749-7.252 7.925-7.252 4.161 0 7.391 2.96 7.391 6.914 0 4.125-2.601 7.447-6.216 7.447-1.214 0-2.355-.63-2.746-1.378l-.744 2.84c-.269 1.018-.999 2.228-1.488 3.015 1.12.333 2.308.514 3.538.514 6.621 0 11.988-5.367 11.988-11.987S18.637 0 12.017 0z" />
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
