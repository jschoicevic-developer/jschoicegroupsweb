"use client";

import { motion } from "framer-motion";

const conditions = [
  "Autism (ASD)",
  "ADHD",
  "PDA",
  "PTSD",
  "Schizophrenia",
  "Stroke Recovery",
  "Muscular Dystrophy",
  "Down Syndrome",
  "Physical Disabilities",
  "Mental Health Conditions",
];

const suburbs = [
  "Point Cook",
  "Tarneit",
  "Werribee",
  "Hoppers Crossing",
  "Truganina",
  "Craigieburn",
  "Williams Landing",
  "Laverton",
  "Altona",
  "Footscray",
  "Epping",
  "Geelong",
  "South Morang",
  "Lara",
  "Shepparton",
];

export default function LandingSupport() {
  return (
    <>
      {/* A) Conditions */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A202C] font-heading mb-4">
              We Support Participants Living With
            </h2>
            <p className="text-[#1A202C]/70 text-lg mb-10 leading-relaxed">
              Every person deserves support that understands their unique
              experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {conditions.map((condition) => (
              <span
                key={condition}
                className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-semibold text-foreground"
              >
                {condition}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="#lead-form"
              className="inline-block bg-[#1A202C] text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
            >
              Request a Free Referral
            </a>
          </motion.div>
        </div>
      </section>

      {/* B) Service Areas */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-foreground font-heading mb-4">
              NDIS Support Coordination Across Victoria
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Providing disability support services to participants across
              Melbourne, Geelong, and regional Victoria
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {suburbs.map((suburb) => (
              <span
                key={suburb}
                className="bg-accent px-4 py-2 rounded-xl text-sm font-semibold text-foreground"
              >
                {suburb}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
