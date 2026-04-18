"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Phone,
    ArrowRight,
    MapPin,
    CheckCircle2,
    Mail,
    UserCheck,
    Heart,
    ShieldCheck,
    ThumbsUp,
    Users,
    Home
} from "lucide-react";
import SeamlessNDIS from "@/components/sections/home/SeamlessNDIS";

/**
 * Page Config
 */
const faqs = [
    {
        question: "What is NDIS accommodation?",
        answer: "NDIS accommodation refers to housing options that provide support for individuals with disabilities to live independently or with assistance. It includes Specialist Disability Accommodation (SDA), which offers tailored living spaces designed to meet specific needs, and other types of supported housing."
    },
    {
        question: "How can I find a suitable NDIS accommodation near me?",
        answer: "To find suitable NDIS accommodation near your location, talk to your NDIS planner or support coordinator, who can help identify options based on your needs. You can also search for approved providers offering Specialist Disability Accommodation (SDA) in your area through the NDIS website or local community services."
    },
    {
        question: "Does NDIS accommodation funding cover all living costs?",
        answer: "No, NDIS accommodation funding typically covers the support services needed to assist with daily living activities and any required modifications. However, it does not usually cover regular living expenses like rent, utilities, or groceries."
    },
    {
        question: "Can NDIS accommodation be modified if my needs change over time?",
        answer: "Yes. NDIS accommodation can be modified to suit changing needs. If your functional requirements or goals evolve, your accommodation can be reassessed and adjusted, ensuring it continues to meet your needs."
    },
    {
        question: "Can I live with my family or carers in my NDIS accommodation?",
        answer: "Yes, under certain circumstances, you can live with family or carers in NDIS accommodation. However, your NDIS plan will need to reflect the support arrangements and ensure that the accommodation is suited to your needs and goals."
    },
    {
        question: "What types of accommodation does NDIS offer under accommodation support?",
        answer: "NDIS can fund Short-Term Accommodation (STA), Medium‑Term Accommodation (MTA), and Supported Independent Living (SIL)."
    },
    {
        question: "What is Short-Term Accommodation (STA)?",
        answer: "STA provides a safe, supportive place to stay away from your usual home for a short time, offering accommodation plus personal care, meals, and support services."
    },
    {
        question: "When is STA useful?",
        answer: "STA is useful for respite when caregivers need a break; for trialling independent living or when you need a temporary stay away from home."
    },
    {
        question: "How long can I stay under STA?",
        answer: "Usually STA can be used for up to 14 consecutive days at a time, with around 28 days per year available (depending on plan and funding)."
    },
    {
        question: "What is Medium‑Term Accommodation (MTA)?",
        answer: "MTA provides temporary housing over a longer period, and is useful when waiting for long-term housing or home modifications."
    },
    {
        question: "Who is MTA meant for?",
        answer: "People who need a stable, accessible temporary home before their permanent accommodation is ready or modified appropriately."
    },
    {
        question: "What is Supported Independent Living (SIL)?",
        answer: "SIL provides continuous support for daily tasks (like cooking, personal care) so participants can live independently, either alone or with others, while receiving necessary help."
    },
    {
        question: "Who qualifies for SIL?",
        answer: "Participants with significant or ongoing support needs, including daily living assistance, overnight help, who benefit from having trained support workers to help with everyday tasks."
    },
    {
        question: "Can I get a choice over where and how I live under SIL or other accommodations?",
        answer: "Yes. We emphasise a person‑centred approach, respecting participants’ choices, preferences and decisions when planning accommodation and support."
    },
    {
        question: "What does accommodation funding cover (in STA, MTA, SIL)?",
        answer: "It typically covers safe, accessible housing, accommodation, personal care, daily living support (meals, personal care, tasks), and sometimes social or community‑based activities, depending on the support type."
    }
];

const features = [
    {
        title: "Tailored living solutions",
        description: "Our solutions are person-centric, catering to individual needs and goals.",
        icon: UserCheck
    },
    {
        title: "Quality Assistance by Skilled Caregivers",
        description: "We have experienced and compassionate staff dedicated to providing quality assistance.",
        icon: Users
    },
    {
        title: "Person-Centred Approach That Counts",
        description: "We offer just the right assistance, meeting the specific needs of participants with compassion.",
        icon: Heart
    },
    {
        title: "Safe & Accessible Housing Options",
        description: "Our accommodation facilities are accessible from all quarters with the use of multiple transportation modes.",
        icon: Home
    }
];

const NdisAccommodationGeelong = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="NDIS Accommodation Geelong"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "NDIS Accommodation Geelong" }
                ]}
            />

            {/* Intro Section */}
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
                                <Image quality={80}
                                    src="/images/geelong/ndis-accommodation-geelong-1.webp"
                                    alt="NDIS Accommodation Geelong"
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
                                    <MapPin className="w-5 h-5" />
                                    Geelong
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    NDIS Accommodation in Geelong <span className="text-primary block mt-2">for Independent Living</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    As an NDIS support provider, we at Js Choice – Care and Support are committed to providing safe and secured NDIS accommodation to individuals with disabilities in Geelong. As an experienced NDIS accommodation provider in Geelong, we understand the importance of ensuring that each participant’s housing needs are met with respect and care.
                                </p>
                                <p>
                                    We offer a range of accommodation options that promote independence and provide a safe, supportive environment. Our goal is to empower participants by offering housing that aligns with their needs, goals, and aspirations.
                                </p>

                                <h3 className="text-2xl font-bold text-[#2D3748] mt-6">What is NDIS Accommodation?</h3>
                                <p>
                                    NDIS accommodation encompasses a variety of living arrangements designed to meet the unique needs of people with disabilities. These options aim to provide participants with safe, accessible housing that allows them to live as independently as possible while receiving the necessary support.
                                </p>
                                <p>
                                    We at <strong>Js Choice – Care and Support</strong> offer a variety of disability-friendly accommodation choices, each tailored to support the individual needs of the participants. Whether you’re looking for a short-term stay or a long-term living solution, we provide NDIS accommodation support in Geelong that helps individuals thrive in a safe and secure environment.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA 1 */}
            <section className="py-20 bg-[#2D3748] text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-primary/5 -skew-x-12 pointer-events-none" />
                <div className="container-8xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">
                            The Right Housing Support <span className="text-primary">for NDIS Participants in Geelong</span>
                        </h2>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-10">
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
                                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-2 border-primary/20 text-primary hover:bg-white/10 text-lg font-bold transition-all hover:-translate-y-1">
                                    Free Referral
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* STA Section */}
            <section className="py-20 bg-white relative">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative h-[500px] w-full">
                                <Image quality={80}
                                    src="/images/geelong/ndis-accommodation-geelong-2.webp"
                                    alt="NDIS Short Term Accommodation Geelong"
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
                            className="space-y-8"
                        >
                            <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                NDIS Short Term <span className="text-secondary">Accommodation in Geelong</span>
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Our NDIS short term accommodation in Geelong offers flexible, short-term housing solutions that cater to a variety of needs. This is perfect for participants who require a temporary stay, such as those who need respite care, have upcoming hospital stays, or are transitioning between different housing arrangements.
                                </p>
                                <p>
                                    Our STA providers in Geelong assist NDIS participants in getting a safe, comfortable, and accessible living space that caters to their bespoke support needs.
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold text-[#2D3748]">What Does NDIS Short Term Accommodation in Geelong Include?</h3>
                            <p className="text-lg text-gray-600">We provide a range of services designed to ensure participants feel at home, including:</p>
                            <ul className="space-y-3">
                                {[
                                    "Comfortable, private living spaces",
                                    "Assistance with daily tasks like personal care, meal preparation, and housekeeping",
                                    "24/7 support from trained staff",
                                    "Social and recreational activities to encourage community participation",
                                    "Access to emergency and medical support when needed"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                                        <span className="text-gray-700 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA 2 STA */}
            <section className="py-16 bg-primary/10">
                <div className="container-8xl text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#2D3748] mb-8">
                        Get The NDIS Short-Term Accommodation That Suits Your Lifestyle — Enquire Today!
                    </h3>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <Button size="lg" className="px-8 rounded-full bg-[#2D3748] hover:bg-[#1A202C] text-white">
                            <Phone className="mr-2 h-5 w-5" /> Call Now
                        </Button>
                        <Link href="/contact-us">
                            <Button size="lg" className="px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C]">
                                Get in Touch
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* MTA Section */}
            <section className="py-20 bg-gray-50 relative">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="lg:order-2">
                            <div className="relative h-[500px] w-full">
                                <Image quality={80}
                                    src="/images/geelong/ndis-accommodation-geelong-3.webp"
                                    alt="NDIS Medium Term Accommodation"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl object-cover"
                                />
                            </div>
                        </div>
                        <div className="lg:order-1 space-y-8">
                            <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                NDIS Medium-term <span className="text-primary">Accommodation in Geelong</span>
                            </h2>
                            <div className="text-lg text-gray-600 leading-relaxed space-y-6">
                                <p>
                                    For those who require a longer stay but not necessarily permanent housing, our NDIS medium-term accommodation in Geelong offers an ideal solution. This option is often used for individuals who need time to transition from one living arrangement to another or those who need additional support as they regain independence.
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold text-[#2D3748]">What Does NDIS Medium-Term Accommodation in Geelong Entail?</h3>
                            <p className="text-lg text-gray-600">Our medium-term accommodations offer:</p>

                            <ul className="space-y-3">
                                {[
                                    "Fully furnished, accessible housing options",
                                    "Support with personal care, household tasks, and daily routines",
                                    "Access to allied health services, such as physiotherapy, occupational therapy, and mental health support",
                                    "A nurturing environment where participants can focus on their personal goals and aspirations",
                                    "Safe and secure living spaces designed with quality disability housing options"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                        <span className="text-gray-700 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                The beauty of our medium-term accommodation is its flexibility. It allows participants to take the time they need to adjust to a new living arrangement, while still receiving ongoing support. Whether you are transitioning from hospital care or looking for a more permanent solution, we are here to support you every step of the way.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA 3 MTA */}
            <section className="py-16 bg-white">
                <div className="container-8xl text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#2D3748] mb-8">
                        Live your life with the safest Medium-Term Accommodation in Geelong — Get Started Today!
                    </h3>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <Button size="lg" className="px-8 rounded-full bg-[#2D3748] hover:bg-[#1A202C] text-white">
                            <Phone className="mr-2 h-5 w-5" /> Call Now
                        </Button>
                        <Link href="/contact-us">
                            <Button size="lg" className="px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C]">
                                Get in Touch
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* SIL Section */}
            <section className="py-20 bg-gray-50 relative">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="">
                            <div className="relative h-[500px] w-full">
                                <Image quality={80}
                                    src="/images/geelong/ndis-accommodation-geelong-4.webp"
                                    alt="NDIS Supported Independent Living"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                Focused Assistance With NDIS <span className="text-secondary">Supported Independent Living in Geelong</span>
                            </h2>
                            <div className="text-lg text-gray-600 leading-relaxed space-y-6">
                                <p>
                                    Our assistance with NDIS supported independent living in Geelong is a long-term accommodation option for individuals who wish to live independently, but with the support they need to thrive. This service focuses on providing tailored living solutions for participants, helping them maintain their independence while receiving assistance with daily living activities.
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold text-[#2D3748]">What Does Our NDIS Supported Independent Living Assistance Cover?</h3>
                            <p className="text-lg text-gray-600">Our assistance with supported independent living arrangements in Geelong include:</p>

                            <ul className="space-y-3">
                                {[
                                    "Accessible housing options that cater to the specific needs of each participant",
                                    "24/7 support from qualified disability support workers",
                                    "Assistance with personal care, mobility, meal preparation, and household management",
                                    "Social and community participation support",
                                    "Ongoing training and skill development to promote independence"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                                        <span className="text-gray-700 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                At Js Choice – Care and Support, we recognise the importance of SIL. Our specialist NDIS SIL providers in Geelong ensure that individuals have the opportunity to live with dignity, autonomy, and the right level of care.
                                <br /><br />
                                Our NDIS housing options in Geelong are designed to offer flexibility, security, and comfort.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA 4 SIL */}
            <section className="py-20 lg:py-32 bg-[#2D3748] text-white relative overflow-hidden">
                <div className="container-8xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">
                            Experience autonomy with our NDIS Supported Independent Living <span className="text-primary">— Connect with Us Today!</span>
                        </h2>
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-10">
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
                                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-2 border-primary/20 text-primary hover:bg-white/10 text-lg font-bold transition-all hover:-translate-y-1">
                                    Free Referral
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features / Why Choose Us Grid */}
            <section className="py-20 bg-white">
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-[#2D3748] mb-4">
                            What Sets Us Apart As An NDIS Accommodation Provider?
                        </h2>
                        <p className="text-lg text-gray-600">
                            Choosing Js Choice – Care and Support means opting for a provider that values the well-being, comfort, and independence of every participant. Here’s why we stand out:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gray-50 border border-gray-100 p-8 rounded-2xl hover:shadow-lg transition-all text-center group">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-[#2D3748] mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="container-8xl max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-[#2D3748]">
                            Frequently Asked Questions <span className="text-secondary">on NDIS Providers in Geelong</span>
                        </h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-xl px-4 bg-white overflow-hidden">
                                <AccordionTrigger className="text-left text-lg font-bold text-[#2D3748] hover:text-secondary hover:no-underline py-4">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            <SeamlessNDIS />
        </main>
    );
};

export default NdisAccommodationGeelong;
