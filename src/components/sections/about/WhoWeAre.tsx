"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const WhoWeAre = () => {
    return (
        <section className="py-20 lg:py-32 bg-white overflow-hidden">
            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-left lg:text-justify">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Text Column (Left - 7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 flex flex-col space-y-8 text-left lg:text-justify"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-[1.1] tracking-tight uppercase">
                            Who We <span className="text-[#ABB3F1]">Are</span>
                        </h2>

                        <div className="space-y-6 text-lg text-gray-600 font-medium leading-relaxed">
                            <p>
                                Welcome to <span className="font-bold text-[#5A67D8]">Js Choice Care and Support!</span> Your trusted registered NDIS provider. We are so thrilled that you have taken your precious time to know us.
                            </p>
                            <p>
                                We have extensive experience working with individuals across various conditions, including Autism Spectrum Disorders, Attention deficit hyperactivity disorder (ADHD), Down Syndrome, Schizophrenia, Post-traumatic stress disorder (PTSD), Pathological Demand Avoidance (PDA), Stroke, Muscular dystrophy etc.
                            </p>
                            <p>
                                We are based in Point Cook, Melbourne. Over the past years we have been working with participants all over Melbourne. We aim to connect with our wider NDIS community with our neuro-affirming approach and be one of the best care and support provider for our NDIS participants. Let’s collaborate to empower yourselves and your family, ensuring every step is taken with care, expertise, and heartfelt dedication.
                            </p>
                        </div>
                    </motion.div>

                    {/* Image Column (Right - 5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-10 border-white z-10 w-full aspect-[4/3]">
                            <Image
                                src="/images/about/about-img.webp"
                                alt="Who We Are - Js Choice"
                                fill
                                className="object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-10 -right-10 w-32 h-32 bg-[#F1ABAB]/20 rounded-full blur-2xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ABB3F1]/20 rounded-full blur-2xl -z-10" />
                    </motion.div>

                </div>
            </div>

            {/* SPACER */}
            <div className="h-24 lg:h-32" />

            {/* DIRECTOR PROFILE SECTION */}
            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-left lg:text-justify">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Image Column (Left - 5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 relative order-1"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-10 border-white z-10 w-full aspect-3/4">
                            <Image
                                src="/JanImage.jpeg"
                                alt="Jan Fardowsi - Director"
                                fill
                                className="object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ABB3F1]/20 rounded-full blur-2xl -z-10" />
                        <div className="absolute bottom-10 -right-10 w-32 h-32 bg-[#F1ABAB]/20 rounded-full blur-2xl -z-10" />
                    </motion.div>

                    {/* Text Column (Right - 7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 flex flex-col space-y-6 order-2"
                    >
                        <div>
                            <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-[#2D3748] leading-tight uppercase mb-2">
                                Jan Fardowsi
                            </h2>
                            <p className="text-xl md:text-2xl font-bold text-[#5A67D8]">
                                Director | Js Choice Group Pty Ltd
                            </p>
                        </div>

                        <div className="space-y-4 text-base md:text-lg text-gray-600 font-medium leading-relaxed">
                            <p>
                                Jan, is the founder and Director of Js Choice Group Pty Ltd, registered NDIS provider based in Point Cook, Melbourne. Her vision for the organisation is to deliver ethical, culturally responsive and participant-centred disability support services that truly empower individuals and families.
                            </p>
                            <p>
                                Leading a team of experienced and qualified staff members, Jan oversees strategic direction, governance compliance, workforce leadership and service quality. She is adept at navigating the complexities of the NDIS environment, ensuring robust safeguarding practices transparent systems and high care standards. Her values-driven leadership style is rooted in respect, honesty, accountability and continuous improvement.
                            </p>
                            <p>
                                Jan’s work is deeply informed by her lived experience as a mother of children with special needs. This personal journey has shaped her compassionate strengths-based and advocacy-focused approach to disability services. She is passionate about ensuring families feel heard supported and empowered within the NDIS system.
                            </p>
                            <p>
                                Jan also brings significant experience in the women’s rights sector, having worked in support roles assisting women affected by domestic and family violence. As a survivor of domestic violence herself, she has a profound understanding of trauma, resilience and empowerment. This lived experience strengthens her trauma-informed leadership approach and her commitment to protecting and uplifting vulnerable individuals.
                            </p>
                            <p>
                                Beyond her professional leadership Jan is pursuing postgraduate studies in strategic management. This further enhances her expertise in leadership human resource management and organisational development. Through dedication resilience and purpose-driven leadership she continues to grow Js Choice Group Pty Ltd Trading as Js Choice – Care and Support as a trusted provider committed to advocacy, integrity and meaningful impact.
                            </p>
                            <p>
                                In her personal life, Jan finds solace in gardening, cooking, reading, and listening to music. As a devoted mother of young adult children with special needs, she dedicates much of her personal time to supporting their growth and independence. She remains committed to guiding them toward fulfilling future careers, providing consistent encouragement, advocacy, and practical support to help them thrive.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
