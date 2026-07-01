"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const areas = [
  "Point Cook",
  "Tarneit",
  "Shepparton",
  "Werribee",
  "Hoppers Crossing",
  "Truganina",
  "Craigieburn",
  "Williams Landing",
  "Laverton",
  "Altona",
  "Altona North",
  "Altona Meadows",
  "South Morang",
  "Footscray",
  "Lara",
  "Epping",
  "Geelong",
];

const ConsultationAreasServed = () => {
  return (
    <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
      {/* Background ornaments */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#ABB3F1]/5 rounded-full blur-[100px] z-0" />
      <div className="absolute bottom-10 right-0 w-1/3 h-full bg-[#F1ABAB]/5 -skew-x-12 translate-x-1/4 z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ABB3F1_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(circle_at_0%_0%,white,transparent_60%)] opacity-20 z-0 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(#F1ABAB_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(circle_at_100%_100%,white,transparent_60%)] opacity-20 z-0 pointer-events-none" />
      <div className="absolute top-[40%] left-[-2rem] w-32 h-32 border-[8px] border-[#ABB3F1]/5 rounded-full z-0" />

      <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-[1.1] tracking-tighter mb-6">
              Areas We <span className="text-[#F1ABAB]">Serve</span> Across Melbourne
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
              Based in Point Cook,{" "}
              <span className="text-[#2D3748] font-bold">
                Js Choice – Care and Support
              </span>{" "}
              proudly supports participants across Melbourne&apos;s Western and Northern
              suburbs, as well as regional outreach where possible.
            </p>
          </motion.div>
        </div>

        {/* Location cards — non-clickable */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {areas.map((area, index) => (
            <div
              key={index}
              className="group relative overflow-hidden p-6 rounded-2xl bg-white border border-primary/90 shadow-sm flex items-center justify-center text-center w-[calc(50%-8px)] md:w-[calc(25%-18px)]"
            >
              <div className="absolute inset-0 bg-[#ABB3F1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-base md:text-lg font-bold text-[#2D3748]">
                  {area}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationAreasServed;
