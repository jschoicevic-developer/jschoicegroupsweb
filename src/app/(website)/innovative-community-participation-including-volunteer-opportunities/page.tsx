"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
    Phone,
    ArrowRight,
    Leaf,
    Dumbbell,
    Palette,
    HeartHandshake,
    Lightbulb,
    Tractor,
    Sprout,
    Brain
} from "lucide-react";

/**
 * Enhanced Data Content
 */
const whatMakesItInnovative = [
    {
        title: "Functional Regulation",
        description: "Learning to manage anxiety in new environments.",
        icon: Brain
    },
    {
        title: "Social Nuances",
        description: "Understanding communication cues in a safe, mentored setting.",
        icon: Users
    },
    {
        title: "Employability",
        description: "Building the soft skills needed for volunteering or work.",
        icon: Lightbulb
    }
];

const innovativePathways = [
    {
        category: "Work Readiness & Volunteering",
        description: "Bridge the gap between home and the workplace. We assist participants in discovering their strengths and preparing for the world.",
        points: [
            "Employment Counselling: Mock interviews, resume building, and grooming for the workplace.",
            "Local Volunteering: We partner with Melbourne charities and businesses to provide supported volunteering roles."
        ],
        icon: HeartHandshake
    },
    {
        category: "The \"Community Garden\" Project",
        description: "Horticultural Therapy & Teamwork. This is more than just gardening; it's about ownership.",
        points: [
            "Skills Learned: Responsibility, patience, teamwork, and sustainability.",
            "Outcome: A tangible connection to nature and fresh produce to take home."
        ],
        icon: Sprout
    },
    {
        category: "Creative Arts & Digital Media",
        description: "Expression without limits. Move beyond traditional crafts. We collaborate with local artists to offer mentorship in modern mediums.",
        points: [
            "Workshops: Digital art, music production, photography, and performance art.",
            "Exhibitions: We showcase participant work in community exhibitions, celebrating achievements and building self-esteem."
        ],
        icon: Palette
    },
    {
        category: "Adaptive Sports & Movement",
        description: "Inclusive fitness for every body. Developed by allied health workers, our sports activities use modified equipment and rules.",
        points: [
            "Activities: From wheelchair basketball to sensory-friendly yoga.",
            "Goal: Improving physical health, motor skills, and team spirit."
        ],
        icon: Dumbbell
    }
];

const benefits = [
    {
        title: "Pathway to Employment",
        description: "We focus on the \"soft skills\" (punctuality, communication, teamwork) that employers look for."
    },
    {
        title: "Enhanced Social Networks",
        description: "By connecting with people over shared passions (like art or tech) rather than just shared diagnoses, you build deeper, more meaningful friendships."
    },
    {
        title: "Improved Mental Health",
        description: "Having a purpose, whether it's keeping a plant alive or finishing an art piece, drastically reduces feelings of isolation."
    },
    {
        title: "Resilience",
        description: "We encourage participants to try new things and \"fail safely,\" building the resilience needed to tackle real-world challenges."
    }
];

const whyChooseUs = [
    {
        title: "Neuro-Affirming Design",
        description: "We understand that \"innovation\" looks different for everyone. Our programmes are sensory-friendly and flexible. If you need to step out, that's okay."
    },
    {
        title: "Mentorship Model",
        description: "Our support workers act as mentors and coaches, not just supervisors."
    },
    {
        title: "Community Integration",
        description: "We don't hide away. Our programmes take place in the heart of the Melbourne community, fostering true inclusion."
    }
];

import { Users } from "lucide-react";

const InnovativeCommunityParticipation = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="Innovative Community Participation"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Innovative Community Participation" }
                ]}
            />

            {/* Hero Section */}
            <section className="py-20 lg:py-28 overflow-hidden">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-2 lg:order-1 relative group"
                        >
                            <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4 rounded-[2.5rem] -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
                            <div className="relative h-[500px] w-full">
                                <Image
                                    src="/images/innovative/innovative-1.webp"
                                    alt="Innovative Community Participation"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl object-cover"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2 space-y-8"
                        >
                            <div className="space-y-4">
                                <span className="text-secondary font-black uppercase tracking-widest text-sm flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5" />
                                    Build Skills & Confidence
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    Redefining What's Possible: <span className="text-primary block mt-2">Build Skills, Confidence & Connections</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Standard community access is about getting out of the house. Innovative Community Participation is about building the skills you need to thrive once you are there.
                                </p>
                                <p>
                                    At Js Choice – Care and Support, we look beyond traditional day programmes. We use creative, technology-driven, and nature-based activities to help NDIS participants in Melbourne develop resilience, emotional regulation, and work readiness skills.
                                </p>
                                <p>
                                    Whether you want to become an artist, prepare for a job, or simply navigate social situations with more confidence, our innovative programmes are the stepping stone to a bigger life.
                                </p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Button size="lg" className="h-14 px-8 rounded-full bg-[#2D3748] hover:bg-black text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Talk to Us
                                </Button>
                                <Link href="/referral">
                                    <Button size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                        Referral <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What Makes It "Innovative"? */}
            <section className="py-20 bg-white relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 -z-10" />
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-10"
                        >
                            <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                What Makes It <span className="text-secondary">"Innovative"?</span>
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Unlike standard recreational activities, this support item focuses on Capacity Building. We don't just "do" activities; we use them as tools to teach:
                            </p>

                            <div className="grid gap-6">
                                {whatMakesItInnovative.map((item, index) => (
                                    <div key={index} className="flex gap-4 group">
                                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors flex-shrink-0">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#2D3748] mb-1 group-hover:text-secondary transition-colors">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative h-[500px] w-full">
                                <Image
                                    src="/images/innovative/innovative-2.webp"
                                    alt="Innovative Approach"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl border-8 border-white object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Innovative Pathways (Programs) */}
            <section className="py-20 lg:py-28 bg-[#2D3748] text-white relative overflow-hidden">
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white">
                            Our Innovative <span className="text-primary">Pathways</span>
                        </h2>
                        <p className="text-gray-300 text-lg">
                            We offer a diverse spectrum of programmes designed to push boundaries and reimagine participation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {innovativePathways.map((pathway, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <pathway.icon size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">{pathway.category}</h3>
                                </div>
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    {pathway.description}
                                </p>
                                <ul className="space-y-3">
                                    {pathway.points.map((point, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm text-gray-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits of Innovative Participation */}
            <section className="py-20 bg-white relative">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-10">
                            <h2 className="text-3xl md:text-5xl font-black text-[#2D3748]">
                                The Benefits of <span className="text-secondary">Innovative Participation</span>
                            </h2>
                            <p className="text-lg text-gray-600">
                                Why choose this programme over a standard group outing?
                            </p>
                            <div className="grid gap-6">
                                {benefits.map((item, index) => (
                                    <div key={index} className="flex gap-4 group">
                                        <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                                            <ArrowRight size={16} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#2D3748] mb-1 group-hover:text-secondary transition-colors">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-xl">
                            <Image
                                src="/images/innovative/innovative-3.webp"
                                alt="Benefits"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose JS Choice */}
            <section className="py-20 bg-gray-50">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-xl">
                            <Image
                                src="/images/innovative/innovative-1.webp"
                                alt="Why Choose JS Choice"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-black text-[#2D3748]">
                                Why Choose <span className="text-primary">JS Choice?</span>
                            </h2>
                            <ul className="space-y-6">
                                {whyChooseUs.map((item, index) => (
                                    <li key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                        <h3 className="font-bold text-[#2D3748] text-lg mb-2">{item.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="container-8xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#2D3748] rounded-[3rem] p-10 md:p-16 text-center shadow-2xl overflow-hidden max-w-5xl mx-auto text-white"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">
                            Everyone Deserves a <span className="text-primary">Life of Choice!</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            You have unique talents waiting to be discovered. Let's find the programme that sparks your passion.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="h-16 px-8 rounded-full bg-white hover:bg-gray-100 text-[#2D3748] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <Phone className="mr-2 h-5 w-5" />
                                Call Now
                            </Button>
                            <Link href="/contact-us">
                                <Button size="lg" className="h-16 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/referral">
                                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-2 border-white/20 text-primary hover:bg-white/10 text-lg font-bold transition-all hover:-translate-y-1">
                                    Referral
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default InnovativeCommunityParticipation;
