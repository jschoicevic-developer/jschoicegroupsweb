"use client";

import { motion } from "framer-motion";
import {
  Network,
  HeartHandshake,
  Car,
  Activity,
  Brain,
  MapPin,
  Users,
  ShieldAlert,
  Stethoscope,
  GraduationCap,
  FileText,
  Lightbulb,
  Home,
  Baby,
  CheckCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Core Services
// ---------------------------------------------------------------------------

const coreServices = [
  {
    icon: Network,
    iconBg: "bg-primary",
    title: "Support Coordination",
    quote: '"I finally felt like someone was on my side."',
    description:
      "Our Support Coordinators work alongside you to understand your NDIS plan, connect you with the right providers, and help you get the most out of your funding — so you can focus on living your life.",
    includes:
      "Includes: Plan implementation, provider sourcing, crisis support & plan reviews.",
  },
  {
    icon: HeartHandshake,
    iconBg: "bg-secondary",
    title: "Assistance with Daily Life",
    quote: '"Mum can stay at home and still get the help she needs."',
    description:
      "We provide compassionate, practical support with everyday tasks — from personal care and meal preparation to household assistance — enabling participants to live independently in their own homes.",
    includes:
      "Includes: Personal care, meal prep, household tasks & community access.",
  },
];

// ---------------------------------------------------------------------------
// All 14 Services
// ---------------------------------------------------------------------------

const allServices = [
  { icon: Network, name: "Support Coordination" },
  { icon: HeartHandshake, name: "Assistance with Daily Life" },
  { icon: Car, name: "Transport Assistance" },
  { icon: Activity, name: "Allied Health Services" },
  { icon: Brain, name: "Psychosocial Recovery Coaching" },
  { icon: MapPin, name: "Social & Community Participation" },
  { icon: Users, name: "Group / Centre Activities" },
  { icon: ShieldAlert, name: "Emergency Respite" },
  { icon: Stethoscope, name: "Community Nursing Care" },
  { icon: GraduationCap, name: "Employment / Education" },
  { icon: FileText, name: "NDIS Access Requests Help" },
  { icon: Lightbulb, name: "Innovative Community Participation" },
  { icon: Home, name: "Specialised Disability Accommodation" },
  { icon: Baby, name: "Early Childhood Supports" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function scrollToForm() {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LandingServices() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Section A: Core Services                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-foreground font-heading mb-4">
              NDIS Support Services That Put You First
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We deliver person-centred support that genuinely listens, adapts
              and advocates — because every participant deserves more than just
              a service.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${service.iconBg} mb-6`}
                  >
                    <Icon className="w-7 h-7 text-foreground" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-foreground font-heading mb-3">
                    {service.title}
                  </h3>

                  {/* Quote */}
                  <p className="text-primary font-semibold italic text-lg mb-4">
                    {service.quote}
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>

                  {/* Includes */}
                  <p className="text-sm font-bold text-muted-foreground mb-6">
                    {service.includes}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-1 bg-primary text-foreground px-6 py-2.5 rounded-full font-black text-sm hover:brightness-110 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Request a Free Referral →
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section B: All 14 Services Grid                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 lg:py-24 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-foreground font-heading mb-4">
              Comprehensive NDIS Support Services in Melbourne
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              As a registered NDIS provider, JS Choice Group is approved to
              deliver all of the following disability support services across
              Victoria.
            </p>
          </motion.div>

          {/* Pills grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {allServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.name}
                  className="bg-white px-4 py-3.5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm font-semibold text-foreground leading-snug">
                    {service.name}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
