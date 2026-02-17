"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
    Phone,
    ArrowRight,
    CheckCircle2,
    Brain,
    Users,
    FileText,
    HelpCircle,
    ExternalLink,
    ChevronDown
} from "lucide-react";

const whatDoesCoachDo = [
    {
        title: "Build a Recovery Plan",
        description: "We spend time getting to know you, your triggers, your strengths, and your aspirations, to create a plan that reflects your version of recovery."
    },
    {
        title: "Navigate the System",
        description: "We help you understand the NDIS, coordinate with clinical mental health services, and link you to community supports that align with your goals."
    },
    {
        title: "Build Capacity & Resilience",
        description: "We coach you to do them yourself. We help you develop the skills to manage daily challenges and complex systems independently."
    },
    {
        title: "Provide Crisis Planning",
        description: "We help you identify early warning signs and create a plan for when things get tough, ensuring you have the right support network in place."
    }
];

const choosingRightCoach = [
    {
        title: "A Good Listener:",
        description: "Someone who listens to understand, not just to reply."
    },
    {
        title: "Flexibility:",
        description: "Support delivered at times and locations that suit your mental health needs."
    },
    {
        title: "Cultural Safety:",
        description: "A team that respects your background and values."
    },
    {
        title: "Neuro-Affirming Care:",
        description: "We respect neurodivergence and adapt our coaching style to how your brain works."
    }
];

const faqs = [
    {
        question: "Who Can Access Recovery Coach Funding?",
        answer: "Recovery Coaching is generally funded in NDIS plans for participants with a primary or secondary diagnosis related to psychosocial disability. If you feel you need this support, we can help you prepare the evidence needed for your next plan review."
    },
    {
        question: "I Already Have A Support Coordinator. Do I Need A Recovery Coach?",
        answer: (
            <div className="space-y-4">
                <p>While both roles help you manage your plan, a Recovery Coach has specific mental health expertise.</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Support Coordinators focus on connecting you to broader services (housing, therapy, cleaning).</li>
                    <li>Recovery Coaches focus specifically on the complex relationship between your mental health and your daily life.</li>
                    <li>Can I have both? Generally, the NDIS recommends choosing one to maximize your budget. However, in complex situations, you may be funded for both. We can help you decide which is best for you.</li>
                </ul>
            </div>
        )
    },
    {
        question: "What Qualifications Do Your Coaches Have?",
        answer: "Quality and safety are our priorities. Our Recovery Coaches hold a minimum of a Certificate IV in Mental Health or Mental Health Peer Work, combined with at least two years of experience in the sector. We ensure our team engages in ongoing training to stay up to date with best practices in trauma-informed care."
    }
];

const PsychosocialRecoveryCoach = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="Psychosocial Recovery Coach"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Psychosocial Recovery Coach" }
                ]}
            />

            {/* Hero Section */}
            <section className="py-16 lg:py-24 bg-white overflow-hidden">
                <div className="container-8xl px-4 md:px-6 lg:px-8 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[400px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
                        >
                            <Image
                                src="/images/recovery-coach/coach-1.webp" // Using a generic placeholder for now
                                alt="Psychosocial Recovery Coach"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Right: Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl lg:text-5xl font-black text-[#2D3748] leading-[1.2]">
                                Reclaiming Your Path to <span className="text-[#ABB3F1]">Wellness & Independence</span>
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                                <p>
                                    Recovery is a personal journey, not a destination. At JS Choice – Care and Support, our Psychosocial Recovery Coaches are here to walk that path beside you. We provide trauma-informed, neuro-affirming support designed to help you manage mental health challenges and build a life full of hope, resilience, and autonomy.
                                </p>
                                <p>
                                    Whether you are navigating Schizophrenia, PTSD, Anxiety, BPD, or other psychosocial disabilities, our coaches work with you to take control of your NDIS plan and, more importantly, your life.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link href="/referral">
                                    <Button className="h-14 px-10 rounded-full bg-[#ABB3F1] hover:bg-[#9CA5E5] text-[#1A202C] font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                                        Referral
                                    </Button>
                                </Link>
                                <Link href="tel:1300572464">
                                    <Button variant="outline" className="h-14 px-10 rounded-full border-2 border-[#ABB3F1] text-[#2D3748] hover:bg-gray-50 font-black text-sm uppercase tracking-widest w-full sm:w-auto flex flex-col items-start leading-tight py-1 gap-0">
                                        <span className="text-[10px] text-gray-500">Talk to Us</span>
                                        <span className="text-lg">1300572464</span>
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What Does a Recovery Coach Do? */}
            <section className="py-20 lg:py-28 relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ABB3F1]/10 -skew-x-12 -z-10" />
                <div className="container-8xl px-4 md:px-6 lg:px-8 mx-auto">
                    <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
                        <h2 className="text-3xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                            What Does a Recovery <span className="text-[#F1ABAB]">Coach Do?</span>
                        </h2>
                        <div className="space-y-4 text-xl text-gray-600 font-medium">
                            <p>
                                A Recovery Coach is more than just a support worker; they are a specialist guide with mental health knowledge. Our goal is to move beyond "managing symptoms" to building a meaningful life.
                            </p>
                            <p className="text-[#2D3748] font-bold">
                                We work collaboratively with you, your family, and your clinical team to:
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whatDoesCoachDo.map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                                <h3 className="text-xl font-black text-[#2D3748] mb-4 text-center border-b-2 border-[#ABB3F1]/30 pb-4 h-16 flex items-center justify-center">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-center font-medium leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lived Experience */}
            <section className="py-20 lg:py-28 bg-white overflow-hidden border-t border-gray-100">
                <div className="container-8xl px-4 md:px-6 lg:px-8 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                Lived Experience: The <span className="text-[#ABB3F1]">JS Choice Difference</span>
                            </h2>
                            <div className="text-lg text-gray-600 font-medium space-y-6 leading-relaxed">
                                <p>
                                    We understand that sometimes, textbook knowledge isn't enough. That is why JS Choice offers access to Lived Experience Recovery Coaches.
                                </p>
                                <p>
                                    A Lived Experience Coach is a professional who has navigated their own journey of mental ill-health and recovery. They bring a unique level of empathy, hope, and understanding to their work. They know that recovery is messy and non-linear, and they use their own experiences to validate yours and show that a fulfilling life is possible.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[400px] lg:h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-gray-50 bg-gray-200"
                        >
                            <Image
                                src="/images/recovery-coach/coach-3.webp"
                                alt="Lived Experience Coach"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 lg:py-28 bg-gray-50 relative">
                <div className="container-8xl px-4 md:px-6 lg:px-8 mx-auto">
                    <h2 className="text-3xl lg:text-5xl font-black text-[#2D3748] mb-16 text-center">
                        Frequently Asked <span className="text-[#F1ABAB]">Questions</span>
                    </h2>

                    <div className="space-y-4 max-w-4xl mx-auto">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                    className={`w-full text-left p-6 md:p-8 rounded-[2.5rem] transition-all duration-500 flex items-center justify-between gap-6 border-2 ${activeIndex === index
                                        ? "bg-[#ABB3F1]/5 border-[#ABB3F1] shadow-xl"
                                        : "bg-white border-gray-100 hover:border-[#ABB3F1]/30 shadow-sm hover:shadow-md"
                                        }`}
                                >
                                    <span className={`text-lg md:text-xl font-black leading-tight transition-colors duration-300 ${activeIndex === index ? "text-[#2D3748]" : "text-[#2D3748]/70"
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeIndex === index
                                        ? "bg-[#ABB3F1] text-white rotate-180 shadow-lg shadow-[#ABB3F1]/30"
                                        : "bg-gray-50 text-[#ABB3F1] border border-gray-200"
                                        }`}>
                                        <ChevronDown size={24} strokeWidth={3} />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-8 md:p-10 pt-4 text-gray-600 text-lg leading-relaxed font-medium">
                                                <div className="h-px w-full bg-[#ABB3F1]/20 mb-6" />
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Choosing the Right Coach */}
            <section className="py-20 lg:py-28 bg-white overflow-hidden">
                <div className="container-8xl px-4 md:px-6 lg:px-8 mx-auto">
                    <div className="max-w-5xl mx-auto space-y-12">
                        <div className="text-center space-y-6">
                            <h2 className="text-3xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                Choosing the <span className="text-[#ABB3F1]">Right Coach</span>
                            </h2>
                            <p className="text-xl text-gray-600 font-medium">
                                Finding a Recovery Coach is personal. You need someone you can trust. When you speak with JS Choice, you can expect:
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {choosingRightCoach.map((item, index) => (
                                <div key={index} className="flex gap-6 items-start p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-[#ABB3F1]/30 transition-colors">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D3748] text-white flex items-center justify-center font-black text-lg">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-[#2D3748] mb-2">{item.title}</h3>
                                        <p className="text-gray-600 font-medium">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-32 bg-[#F8FAFC] relative overflow-hidden">
                <div className="container-8xl px-4 md:px-6 lg:px-8 mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-[3rem] p-10 md:p-16 text-center shadow-xl border border-gray-100 max-w-5xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-[#2D3748] mb-6">
                            Take the <span className="text-[#ABB3F1]">Next Step</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
                            You don't have to navigate your mental health journey alone. Let's work together to build a future defined by your strengths, not your diagnosis.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="h-16 px-10 rounded-full bg-[#2D3748] hover:bg-black text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all w-full md:w-auto">
                                <Phone className="mr-2 h-5 w-5" />
                                Call Now
                            </Button>
                            <Link href="/contact-us">
                                <Button size="lg" className="h-16 px-10 rounded-full bg-[#ABB3F1] hover:bg-[#9CA5E5] text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all w-full md:w-auto">
                                    Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/referral">
                                <Button variant="outline" size="lg" className="h-16 px-10 rounded-full border-2 border-[#2D3748] text-[#2D3748] hover:bg-gray-50 text-lg font-bold shadow-sm hover:shadow-md transition-all w-full md:w-auto">
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

export default PsychosocialRecoveryCoach;
