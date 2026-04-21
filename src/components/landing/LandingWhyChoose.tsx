"use client";

import { motion } from "framer-motion";
import { DollarSign, Globe, Sparkles, Clock } from "lucide-react";

const cards = [
  {
    icon: DollarSign,
    title: "We Fight for Your Funding",
    copy: "Tired of providers who don't understand your plan? We help you maximise every dollar of your NDIS funding so nothing goes to waste.",
  },
  {
    icon: Globe,
    title: "Culturally Inclusive Care",
    copy: "We celebrate diversity. Our team understands different cultural backgrounds and tailors support so you feel truly seen and respected.",
  },
  {
    icon: Sparkles,
    title: "Neuro-Affirming Approach",
    copy: 'ASD, ADHD, PDA — we don\'t try to "fix" anyone. We work WITH how your mind works, not against it. Your strengths matter here.',
  },
  {
    icon: Clock,
    title: "24/7 Care When You Need It",
    copy: "Life doesn't stop at 5pm. Our care services run around the clock because you deserve support whenever you need it most.",
  },
];

export default function LandingWhyChoose() {
  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-foreground font-heading mb-4">
            Why Melbourne Families Choose JS Choice
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            We don&apos;t just provide services — we provide peace of mind for
            participants and the people who love them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#F7FAFC] rounded-2xl p-6 sm:p-8"
              >
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-black text-foreground font-heading mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {card.copy}
                </p>
                <a
                  href="#lead-form"
                  className="text-primary font-semibold hover:underline"
                >
                  Get your free referral →
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
