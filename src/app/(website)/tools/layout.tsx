"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Search, Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const TOOLS = [
  {
    name: 'NDIS Price Guide',
    href: '/tools/ndis-price-guide',
    icon: Search,
    description: 'Search support item prices',
  },
  {
    name: 'Budget Calculator',
    href: '/tools/ndis-budget-calculator',
    icon: Calculator,
    description: 'Calculate your NDIS budget',
  },
  {
    name: 'Service Matcher',
    href: '/tools/service-matcher',
    icon: Users,
    description: 'Find right services for you',
  }
];

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isToolActive = (toolHref: string) => {
    return pathname === toolHref || pathname.startsWith(toolHref + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Custom Tools Header with Embedded Navigation */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[#2D3748] overflow-hidden">
        {/* Background Image/Overlay - Matching PageHeader */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#2D3748]/90 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"
            style={{ backgroundImage: "url('/banner-frame-img.webp')" }}
          />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ABB3F1]/20 to-transparent z-10" />
        </div>

        <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">
                NDIS Tools
              </h2>
              <nav className="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-gray-300 mb-8">
                <Link href="/" className="hover:text-white hover:underline transition-colors">Home</Link>
                <ChevronRight size={14} className="text-[#ABB3F1]" />
                <span className="text-[#ABB3F1] font-bold">Tools</span>
              </nav>
            </motion.div>
          </div>

          {/* Integrated Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isActive = isToolActive(tool.href);

              return (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className={`
                                        group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm md:text-base transition-all duration-300
                                        ${isActive
                      ? 'bg-primary text-[#1A202C] shadow-xl scale-105 ring-4 ring-[#2D3748] ring-offset-2 ring-offset-primary/50'
                      : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105 backdrop-blur-sm border border-white/10'
                    }
                                    `}
                >
                  <div className={`
                                        p-2 rounded-lg transition-colors duration-300
                                        ${isActive ? 'bg-[#1A202C]/10' : 'bg-white/10 group-hover:bg-white/20'}
                                    `}>
                    <Icon size={20} className={isActive ? 'text-[#1A202C]' : 'text-[#ABB3F1]'} />
                  </div>
                  <span>{tool.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Page Content */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
