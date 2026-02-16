"use client";

import Link from 'next/link';
import { Calculator, Search, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const tools = [
  {
    title: 'NDIS Price Guide',
    description: 'Search and compare NDIS support item prices across all Australian regions. Get detailed pricing information and claim requirements.',
    icon: Search,
    href: '/tools/ndis-price-guide',
    color: 'text-primary',
    iconColor: 'bg-primary',
    features: ['Search by name or code', 'Regional price comparison', 'Detailed claim rules']
  },
  {
    title: 'Budget Calculator',
    description: 'Estimate your annual NDIS support costs. Add items, set frequency, and get a detailed budget breakdown you can download or print.',
    icon: Calculator,
    href: '/tools/ndis-budget-calculator',
    color: 'text-secondary',
    iconColor: 'bg-secondary',
    features: ['Calculate annual costs', 'Add multiple support items', 'Download summary']
  },
  {
    title: 'Service Matcher',
    description: 'Answer a few quick questions and we\'ll match you with the right JS Choice services for your needs. Get personalised recommendations.',
    icon: Users,
    href: '/tools/service-matcher',
    color: 'text-primary',
    iconColor: 'bg-primary',
    features: ['Quick questionnaire', 'Personalised matching', 'Free consultation']
  }
];

export default function ToolsPage() {
  return (
    <div className="w-full bg-white">
      {/* Tools Grid */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={tool.href}
                    className="group h-full block"
                  >
                    <div className="h-full bg-white rounded-[2rem] border border-gray-100 p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                      {/* Icon */}
                      <div className={`w-20 h-20 ${tool.iconColor} rounded-2xl flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-10 h-10 text-[#1A202C]" />
                      </div>

                      {/* Content */}
                      <h2 className="text-2xl md:text-3xl font-black text-[#2D3748] mb-4 group-hover:text-primary transition-colors uppercase tracking-tight">
                        {tool.title}
                      </h2>
                      <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                        {tool.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-4 mb-8 flex-grow">
                        {tool.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-base font-medium text-gray-700">
                            <div className="w-2 h-2 bg-secondary rounded-full mr-4 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="mt-auto">
                        <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm group-hover:gap-4 transition-all duration-300">
                          Get Started <ArrowRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ABB3F1]/10 -skew-x-12 z-0" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F1ABAB]/10 rounded-full blur-3xl z-0" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-[#F1ABAB]/20 px-4 py-2 rounded-full mb-6">
              <span className="text-secondary font-bold uppercase tracking-wider text-xs">Support for You</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#2D3748] mb-6 uppercase tracking-tight">
              Need Help <span className="text-primary">Getting Started?</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
              Our team is here to help you navigate your NDIS journey. Contact us for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:130057246423"
                className="h-14 px-10 rounded-full bg-primary hover:brightness-110 text-[#1A202C] font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                Call: 130057246423
              </a>
              <Link
                href="/contact-us"
                className="h-14 px-10 rounded-full bg-white text-[#2D3748] border-2 border-gray-100 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:border-primary hover:text-primary hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                Send Message
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
