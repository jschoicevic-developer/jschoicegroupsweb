"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    title: "Assistance with Daily Life",
    description:
      "Build independence at home. We support you with household tasks, personal care, and daily routines, ensuring you feel comfortable and in control of your environment.",
    icon: "/images/home/service-icon-1.webp",
  },
  {
    title: "Transport Assistance",
    description:
      "Connect and create. Join our engaging group sessions designed to improve mental well-being, foster friendships, and build new skills in a safe, supportive space.",
    icon: "/images/home/service-icon-6.webp",
  },
  {
    title: "Allied Health Services",
    description:
      "Holistic therapy support. We work alongside your therapists to implement exercise and therapy programs that help you manage or recover from your condition.",
    icon: "/images/home/service-icon-7.webp",
  },
  {
    title: "Psychosocial Recovery Coaching",
    description:
      "Reclaiming your path. Our specialised coaches work with you to manage mental health challenges, build resilience, and design a life of hope and autonomy.",
    icon: "/images/home/service-icon-8.webp",
  },
  {
    title: "Social & Community Participation",
    description:
      "Build independence at home. We support you with household tasks, personal care, and daily routines, ensuring you feel comfortable and in control of your environment.",
    icon: "/images/home/service-icon-5.webp",
  },
  {
    title: "Group & Centre Activities",
    description:
      "Get out and about! We help you access community resources, attend events, and develop social connections to reduce isolation and build confidence.",
    icon: "/images/home/service-icon-2.webp",
  },
  {
    title: "Emergency Respite",
    description:
      "Freedom to move. Whether it's medical appointments, shopping, or social visits, our team ensures you get from A to B safely with reliable transport support.",
    icon: "/images/home/service-icon-3.webp",
  },
  {
    title: "Community Nursing Care",
    description:
      "Professional clinical care in your home. Our qualified nurses assist with medication, wound care, and health monitoring to help you manage complex conditions.",
    icon: "/images/home/service-icon-4.webp",
  },
];

const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const ConsultationServices = () => {
  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Image
          quality={80}
          src="/services-bg-img.webp"
          alt="Services Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/50" />
        <div className="absolute top-20 right-[-10%] w-[40%] h-[60%] bg-[radial-gradient(#ABB3F1_2px,transparent_2px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-20 left-[-5%] w-[30%] h-[40%] bg-[radial-gradient(#ABB3F1_2px,transparent_2px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      </div>

      <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-tight uppercase tracking-tighter mb-4">
              Trusted NDIS Support Services{" "}
              <span className="text-[var(--primary)]">In Melbourne</span>
            </h2>
            <div className="h-1 w-24 bg-[var(--primary)] mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-700 font-bold leading-relaxed max-w-3xl mx-auto">
              We offer comprehensive care designed for your independence.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col items-center bg-white p-10 rounded-[2.5rem] text-center transition-all duration-500 hover:-translate-y-2 border border-blue-50/50 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 80 Q 50 10 90 80 T 170 80' stroke='%23000' fill='transparent' stroke-width='2'/%3E%3Cpath d='M10 120 Q 50 50 90 120 T 170 120' stroke='%23000' fill='transparent' stroke-width='2'/%3E%3Cpath d='M10 160 Q 50 90 90 160 T 170 160' stroke='%23000' fill='transparent' stroke-width='2'/%3E%3C/svg%3E")`,
                  backgroundSize: "150px 150px",
                }}
              />
              <div className="absolute inset-2 border border-red-500/10 rounded-[2rem] pointer-events-none" />

              {/* Icon */}
              <div className="relative w-32 h-32 mb-8 group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-full border border-gray-100 shadow-md flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-2 border-2 border-[var(--primary)]/10 rounded-full" />
                  <div className="relative w-20 h-20 z-10 p-2">
                    <Image
                      quality={80}
                      src={service.icon}
                      alt={service.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-black text-[#5D6AC4] mb-4 transition-colors leading-tight min-h-[60px] flex items-center justify-center uppercase tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 font-bold leading-relaxed mb-10 flex-grow line-clamp-4">
                {service.description}
              </p>

              {/* CTA — scrolls to form */}
              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center h-12 px-10 rounded-full bg-[#ABB3F1] text-black text-xs font-black uppercase tracking-widest hover:bg-[#9DA5E2] hover:shadow-lg transition-all"
              >
                Get in Touch
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultationServices;
