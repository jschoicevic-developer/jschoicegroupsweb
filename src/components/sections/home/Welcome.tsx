"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Welcome = () => {
    return (
        <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
            {/* Dotted Pattern Background - Left Side */}
            <div className="absolute top-0 left-0 h-full w-1/2 bg-[radial-gradient(#E2E8F0_2px,transparent_2px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] opacity-60 -z-10 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left Column: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="order-1"
                    >
                        <h2
                            className="text-5xl lg:text-7xl font-bold mb-8 uppercase tracking-wide"
                            style={{
                                WebkitTextStroke: "2px #5A67D8",
                                color: "transparent",
                                textShadow: "4px 4px 0px rgba(90,103,216,0.1)"
                            }}
                        >
                            Welcome
                        </h2>

                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                            NDIS Service Providers in Melbourne <br className="hidden lg:block" />
                            <span className="text-[#5A67D8]">
                                Navigating the NDIS can be complex, but you don’t have to do it alone.
                            </span>
                        </h3>

                        <div className="space-y-6 text-gray-700 leading-relaxed text-lg font-medium text-justify">
                            <p>
                                Based in Point Cook, Js Choice is a registered NDIS provider committed to enhancing the well-being of participants across Melbourne’s Western and Northern suburbs.
                            </p>
                            <p>
                                Our focus is simple, enhancing everyday wellbeing through personalised, respectful, and participant-led support. Whether you need help at home, in the community, or with specialist services, our team is here to support you in reaching your goals.
                            </p>
                        </div>

                        <div className="mt-10">
                            <a href="/services" className="flex items-center justify-center w-fit h-14 px-10 bg-[#ABB3F1] hover:bg-[#9FA8DA] text-[#1E1E2F] rounded-full font-extrabold text-sm lg:text-base tracking-wider uppercase shadow-[0_10px_20px_-5px_rgba(171,179,241,0.6)] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                Read More
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="order-2 flex gap-6 items-center justify-center lg:justify-end"
                    >
                        {/* Smaller Image (Left) */}
                        <div className="w-1/2 h-[350px] relative rounded-[2rem] overflow-hidden shadow-xl mt-12 transform hover:rotate-1 transition-transform duration-500 border-4 border-white">
                            <Image
                                src="/images/home/welcome-1.webp"
                                alt="Support worker helping"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Large Image (Right) */}
                        <div className="w-1/2 h-[450px] relative rounded-[2rem] overflow-hidden shadow-2xl transform -hover:rotate-1 transition-transform duration-500 border-4 border-white">
                            <Image
                                src="/1.webp"
                                alt="Carer assisting participant"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Welcome;
