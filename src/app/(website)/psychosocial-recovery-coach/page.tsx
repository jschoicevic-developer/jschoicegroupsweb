"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import TalkToUsButton from "@/components/ui/TalkToUsButton";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import ServiceCTA from "@/components/ui/ServiceCTA";
import ServiceFormSection from "@/components/ui/ServiceFormSection";
import JsonLd from "@/components/schema/JsonLd";
import WhoCanBenefitSection from "@/components/sections/services/WhoCanBenefitSection";
import DailyLivingTasksSection from "@/components/sections/services/DailyLivingTasksSection";
import ServiceBenefitsSection from "@/components/sections/services/ServiceBenefitsSection";
import SupportProcessSection from "@/components/sections/services/SupportProcessSection";
import QualityOfLifeSection from "@/components/sections/services/QualityOfLifeSection";
import AreasWeServeSection from "@/components/sections/services/AreasWeServeSection";
import ServiceFaqSection from "@/components/sections/services/ServiceFaqSection";
import {
    whoCanBenefitHeading,
    whoCanBenefitItems,
    recoverySupportHeading,
    recoverySupportImage,
    recoverySupportItems,
    serviceBenefitsHeading,
    serviceBenefitsBackground,
    serviceBenefitsItems,
    supportProcessHeading,
    supportProcessSteps,
    supportProcessCta,
    qualityOfLifeHeading,
    qualityOfLifeItems,
    qualityOfLifeImages,
    qualityOfLifeOverlayIcons,
    areasWeServeDescription,
    serviceFaqHeading,
    serviceFaqItems,
} from "@/data/psychosocial-recovery-sections";

const whatDoesCoachDo = [
    {
        title: "Build a Recovery Plan",
        description:
            "We spend time getting to know you, your triggers, your strengths, and your aspirations, to create a plan that reflects your version of recovery.",
    },
    {
        title: "Navigate the System",
        description:
            "We help you understand the NDIS, coordinate with clinical mental health services, and link you to community supports that align with your goals.",
    },
    {
        title: "Build Capacity & Resilience",
        description:
            "We coach you to do them yourself. We help you develop the skills to manage daily challenges and complex systems independently.",
    },
    {
        title: "Provide Crisis Planning",
        description:
            "We help you identify early warning signs and create a plan for when things get tough, ensuring you have the right support network in place.",
    },
];

const choosingRightCoach = [
    {
        title: "A Good Listener:",
        description: "Someone who listens to understand, not just to reply.",
    },
    {
        title: "Flexibility:",
        description: "Support delivered at times and locations that suit your mental health needs.",
    },
    {
        title: "Cultural Safety:",
        description: "A team that respects your background and values.",
    },
    {
        title: "Neuro-Affirming Care:",
        description: "We respect neurodivergence and adapt our coaching style to how your brain works.",
    },
];

const serviceSchemas = [
    {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://www.jschoicegroup.com.au/psychosocial-recovery-coach/#service",
        name: "Psychosocial Recovery Coach",
        serviceType: "NDIS Psychosocial Recovery Coaching",
        url: "https://www.jschoicegroup.com.au/psychosocial-recovery-coach",
        description:
            "JS Choice - Care and Support provides NDIS Psychosocial Recovery Coaching in Melbourne, empowering participants with psychosocial disabilities to build resilience, achieve recovery goals, strengthen independence, and navigate mental health challenges through personalised, recovery-focused support.",
        provider: { "@id": "https://www.jschoicegroup.com.au/#organization" },
        areaServed: { "@type": "State", name: "Victoria", addressCountry: "AU" },
        audience: {
            "@type": "PeopleAudience",
            audienceType: "NDIS Participants with Psychosocial Disabilities",
        },
        category: "Mental Health & Disability Support Services",
        availableChannel: {
            "@type": "ServiceChannel",
            serviceUrl: "https://www.jschoicegroup.com.au/psychosocial-recovery-coach",
            servicePhone: { "@type": "ContactPoint", telephone: "+61 1300 572 464" },
        },
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "AUD",
            availability: "https://schema.org/InStock",
            description: "Free consultation available for eligible NDIS participants.",
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Psychosocial Recovery Coaching Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Recovery Planning" } },
                {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Mental Health Capacity Building" },
                },
                {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "NDIS Goal Planning & Support" },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Coordination with Mental Health & Community Supports",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Resilience & Independent Living Coaching",
                    },
                },
            ],
        },
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://jschoicegroup.com.au" },
            {
                "@type": "ListItem",
                position: 2,
                name: "Psychosocial Recovery Coaching",
                item: "https://jschoicegroup.com.au/psychosocial-recovery-coach",
            },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: serviceFaqItems.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    },
];

const PsychosocialRecoveryCoach = () => {
    return (
        <main className="bg-gray-50/50">
            <JsonLd data={serviceSchemas} />
            <PageHeader
                title="NDIS Recovery Coach – Psychosocial Recovery Coaching Melbourne"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Psychosocial Recovery Coach" },
                ]}
            />

            {/* Hero Section */}
            <section className="py-10 lg:py-14 bg-white overflow-hidden">
                <div className="container-8xl px-4 md:px-6 lg:px-8 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[400px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
                        >
                            <Image
                                quality={80}
                                src="/images/recovery-coach/coach-1.webp"
                                alt="Psychosocial Recovery Coach"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl lg:text-5xl font-black text-[#2D3748] leading-[1.2]">
                                NDIS Recovery Coach — Reclaiming Your Path to{" "}
                                <span className="text-[#ABB3F1]">Wellness & Independence</span>
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                                <p>
                                    Recovery is a personal journey, not a destination. At JS Choice – Care and
                                    Support, our NDIS recovery coach team provides psychosocial disability support
                                    through trauma-informed, neuro-affirming mental health recovery coaching,
                                    designed to help you build a life full of hope, resilience, and autonomy.
                                </p>
                                <p>
                                    Whether you are navigating Schizophrenia, PTSD, Anxiety, BPD, or other
                                    psychosocial disabilities, our coaches work with you to take control of your
                                    NDIS plan and, more importantly, your life.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link href="/referral">
                                    <Button className="h-14 px-10 rounded-full bg-[#ABB3F1] hover:bg-[#9CA5E5] text-[#1A202C] font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                                        Free Referral
                                    </Button>
                                </Link>
                                <TalkToUsButton />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What Does a Recovery Coach Do? */}
            <section className="py-10 lg:py-14 relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ABB3F1]/10 -skew-x-12 -z-10" />
                <div className="container-8xl px-4 md:px-6 lg:px-8 mx-auto">
                    <div className="text-center max-w-4xl mx-auto mb-8 space-y-6">
                        <h2 className="text-3xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                            What Does a Recovery <span className="text-[#F1ABAB]">Coach Do?</span>
                        </h2>
                        <div className="space-y-4 text-xl text-gray-600 font-medium">
                            <p>
                                An NDIS recovery coach is more than just a support worker; they are a specialist
                                guide delivering mental health recovery coaching. Our goal is to move beyond
                                &quot;managing symptoms&quot; to building a meaningful life.
                            </p>
                            <p className="text-[#2D3748] font-bold">
                                We work collaboratively with you, your family, and your clinical team to:
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whatDoesCoachDo.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col"
                            >
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
            <section className="py-10 lg:py-14 bg-white overflow-hidden border-t border-gray-100">
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
                                    We understand that sometimes, textbook knowledge isn&apos;t enough. That is why
                                    JS Choice offers access to Lived Experience Recovery Coaches.
                                </p>
                                <p>
                                    A Lived Experience Coach is a professional who has navigated their own journey of
                                    mental ill-health and recovery. They bring a unique level of empathy, hope, and
                                    understanding to their work. They know that recovery is messy and non-linear, and
                                    they use their own experiences to validate yours and show that a fulfilling life
                                    is possible.
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
                                quality={80}
                                src="/images/recovery-coach/coach-3.webp"
                                alt="Lived Experience Coach"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <WhoCanBenefitSection heading={whoCanBenefitHeading} items={whoCanBenefitItems} />

            <DailyLivingTasksSection
                heading={recoverySupportHeading}
                imageSrc={recoverySupportImage.src}
                imageAlt={recoverySupportImage.alt}
                tasks={recoverySupportItems}
            />

            <ServiceBenefitsSection
                heading={serviceBenefitsHeading}
                backgroundImage={serviceBenefitsBackground}
                items={serviceBenefitsItems}
            />

            <SupportProcessSection
                heading={supportProcessHeading}
                steps={supportProcessSteps}
                cta={supportProcessCta}
            />

            <QualityOfLifeSection
                heading={qualityOfLifeHeading}
                items={qualityOfLifeItems}
                images={qualityOfLifeImages}
                overlayIcons={qualityOfLifeOverlayIcons}
            />

            {/* Choosing the Right Coach */}
            <section className="py-10 lg:py-14 bg-white overflow-hidden">
                <div className="container-8xl px-4 md:px-6 lg:px-8 mx-auto">
                    <div className="max-w-5xl mx-auto space-y-12">
                        <div className="text-center space-y-6">
                            <h2 className="text-3xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                Choosing the <span className="text-[#ABB3F1]">Right Coach</span>
                            </h2>
                            <p className="text-xl text-gray-600 font-medium">
                                Finding a Recovery Coach is personal. You need someone you can trust. When you speak
                                with JS Choice, you can expect:
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {choosingRightCoach.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-6 items-start p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-[#ABB3F1]/30 transition-colors"
                                >
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

            <AreasWeServeSection description={areasWeServeDescription} />

            <ServiceFaqSection heading={serviceFaqHeading} items={serviceFaqItems} />

            {/* CTA Section */}
            <section className="py-10 lg:py-14 bg-[#F8FAFC] relative overflow-hidden">
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
                            You don&apos;t have to navigate your mental health journey alone. Let&apos;s work
                            together to build a future defined by your strengths, not your diagnosis.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Button
                                asChild
                                size="lg"
                                className="h-16 px-10 rounded-full bg-[#2D3748] hover:bg-black text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
                            >
                                <a href="tel:1300572464">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Call Now
                                </a>
                            </Button>
                            <Link href="/contact-us">
                                <Button
                                    size="lg"
                                    className="h-16 px-10 rounded-full bg-[#ABB3F1] hover:bg-[#9CA5E5] text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
                                >
                                    Get a Free Referral <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <ServiceCTA />

            <ServiceFormSection
                source="service_page"
                sourcePage="/psychosocial-recovery-coach"
                defaultService="Psychosocial Recovery Coaching"
            />
        </main>
    );
};

export default PsychosocialRecoveryCoach;
