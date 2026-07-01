import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100091940106564&mibextid=dGKdO6",
    icon: Facebook,
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/jschoice/",
    icon: ({ className }: { className?: string }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M8 20l4-9" />
        <path d="M10.7 7.1c.4-1.1 1.3-1.1 2.3-1.1 3 0 5 2.5 5 5 0 3-2 5.5-4.5 5.5-1.5 0-2.5-.5-3.5-1.5" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@jschoicegroup",
    icon: ({ className }: { className?: string }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/jschoicegroup?igsh=MWJ5eDJ1MTVzZWY3cQ%3D%3D&utm_source=qr",
    icon: Instagram,
  },
];

const ConsultationFooter = () => {
  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-0 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-[#ABB3F1]/5 rounded-full blur-[100px] z-0" />

      <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">

          {/* Left: Brand */}
          <div className="space-y-8">
            <Link href="https://jschoicegroup.com.au/">
              <Image
                quality={80}
                src="/JCGLogoWhite.png"
                alt="JS Choice"
                width={200}
                height={80}
                className="h-20 w-auto object-contain"
              />
            </Link>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>

            {/* NDIS logo */}
            <div className="pt-4 border-t border-white/10 relative h-24 w-40">
              <Image
                quality={80}
                src="/images/footer/ndis.webp"
                alt="NDIS Registered Provider"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Right: Contact Us */}
          <div>
            <div className="mb-10 text-xl font-black uppercase tracking-[0.2em] text-[#F1ABAB] flex items-center gap-4">
              Contact Us
              <span className="h-px grow bg-white/10" />
            </div>
            <ul className="space-y-6">
              {/* Phone — plain links, no branding text */}
              <li className="flex items-start gap-4">
                <div className="p-1 shrink-0 relative w-6 h-6 mt-1">
                  <Image
                    quality={80}
                    src="/images/footer/call.webp"
                    alt="Call"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-1.5 pt-0.5">
                  <a
                    href="tel:1300572464"
                    className="text-sm font-bold text-gray-300 hover:text-white transition-colors"
                  >
                    1300 572 464 (National)
                  </a>
                  <a
                    href="tel:0421622262"
                    className="text-sm font-bold text-gray-300 hover:text-white transition-colors"
                  >
                    0421 622 262 (Mobile)
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-4">
                <div className="p-1 shrink-0 relative w-6 h-6">
                  <Image
                    quality={80}
                    src="/images/footer/email.webp"
                    alt="Email"
                    fill
                    className="object-contain"
                  />
                </div>
                <a
                  href="mailto:info@jschoicegroup.com.au"
                  className="pt-1.5 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                >
                  info@jschoicegroup.com.au
                </a>
              </li>

              {/* Address */}
              <li className="flex items-start gap-4">
                <div className="p-1 shrink-0 relative w-6 h-6">
                  <Image
                    quality={80}
                    src="/images/footer/location.webp"
                    alt="Location"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="pt-1 text-xs md:text-sm font-bold text-gray-400 leading-relaxed">
                  Suite 104, Level 1, C5, 2 Main Street, Point Cook VIC 3030
                </p>
              </li>

              {/* PO Box */}
              <li className="flex items-start gap-4">
                <div className="p-1 shrink-0 relative w-6 h-6">
                  <Image
                    quality={80}
                    src="/images/footer/po-box.webp"
                    alt="PO Box"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="pt-1 text-xs md:text-sm font-bold text-gray-400 leading-relaxed">
                  PO Box 6282 Point Cook 3030 Victoria
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar — single line only */}
      <div className="bg-black/40 border-t border-white/5 py-4 mt-4">
        <div className="max-w-8xl mx-auto px-4 text-center">
          <p className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-[0.2em]">
            Copyright &copy; 2026 JS Choice Care Group Private Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ConsultationFooter;
