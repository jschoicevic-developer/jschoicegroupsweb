"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import TalkToUsButton from "@/components/ui/TalkToUsButton";
import Link from "next/link";
import Image from "next/image";
import {
    Phone,
    ArrowRight,
    Leaf,
    Users,
    ShieldCheck,
    Heart,
    Search,
    Map,
    Globe,
    Dumbbell,
    BookOpen,
    HeartHandshake,
    Ticket,
    ShoppingBag,
    CheckCircle2,
    Users2
} from "lucide-react";
import ServiceCTA from "@/components/ui/ServiceCTA";
import ServiceFormSection from "@/components/ui/ServiceFormSection";


const howWeSupport = [
    {
        title: "Discover Your Interests",
        description: "We help you find local activities that align with your passions, from art and sports to technology and nature.",
        icon: Search
    },
    {
        title: "Build Confidence",
        description: "We accompany you every step of the way, providing a safety net until you feel ready to engage independently.",
        icon: ShieldCheck
    },
    {
        title: "Navigate Logistics",
        description: "We assist with planning the outing, reading timetables, managing money, and interacting with the public.",
        icon: Map
    },
    {
        title: "Cultural Connection",
        description: "For our culturally diverse participants, we actively support you to attend cultural festivals, religious services, or community gatherings that help you stay connected to your heritage.",
        icon: Globe
    }
];

const activities = [
    {
        title: "Recreation & Health",
        description: "Going to the gym, swimming pool, or joining a local sports team.",
        icon: Dumbbell
    },
    {
        title: "Education",
        description: "Attending TAFE, libraries, or community workshops to learn new skills.",
        icon: BookOpen
    },
    {
        title: "Volunteering",
        description: "Finding meaningful volunteer work to build your resume and give back.",
        icon: HeartHandshake
    },
    {
        title: "Entertainment",
        description: "Going to the movies, concerts, museums, or art galleries.",
        icon: Ticket
    },
    {
        title: "Daily Life",
        description: "Visiting the bank, post office, or shopping centres to manage your life admin.",
        icon: ShoppingBag
    }
];

const neuroAffirming = [
    {
        title: "Sensory Planning",
        description: "We can help plan outings during quieter times or identify \"safe spaces\" at venues."
    },
    {
        title: "Exit Strategies",
        description: "We always have a plan B. If you feel overwhelmed, our support workers advocate for you and ensure we can leave immediately and safely."
    },
    {
        title: "No Pressure",
        description: "We believe in \"low-demand\" socialising. If you want to go to a park and simply observe without interacting, that is a valid form of participation. We support your version of social inclusion."
    }
];

const benefits = [
    {
        title: "Reduced Isolation",
        description: "Meaningful connection combats loneliness and improves mental health.",
        icon: Users2
    },
    {
        title: "Skill Development",
        description: "Real world practice of communication, budgeting, and travel skills.",
        icon: Leaf
    },
    {
        title: "Emotional Resilience",
        description: "Successfully navigating the community builds self-esteem and adaptability.",
        icon: Heart
    },
    {
        title: "Breaking Stereotypes",
        description: "Your participation helps foster a more inclusive society where people of all abilities are visible and valued.",
        icon: Globe
    }
];

const whyChooseUs = [
    {
        title: "Matched Support Workers",
        description: "We try to match you with a worker who shares your interests. If you love footy, we'll try to send a worker who loves footy too!"
    },
    {
        title: "Local Knowledge",
        description: "Based in Point Cook, we know the local area, the best inclusive venues, and the hidden gems in Melbourne's west and north."
    },
    {
        title: "Reliable & Safe",
        description: "Our team is trained, screened, and committed to your safety while out in public."
    }
];

const AccessToCommunityActivities = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="Access To Community Activities"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Access To Community Activities" }
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
                            <div className="relative w-full h-[500px]">
                                <Image quality={80}
                                    src="/images/community/img25.webp"
                                    alt="Community Participation"
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
                                    <Users className="w-5 h-5" />
                                    Community & Connection
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    Your Community, <span className="text-primary block mt-2">Your Way</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    At JS Choice – Care and Support, we believe that being part of the community is a fundamental human right. It is about more than just "getting out of the house"; it is about belonging, finding purpose, and connecting with the vibrant culture Melbourne has to offer.
                                </p>
                                <p>
                                    We provide specialised Community Participation Support designed to help you engage with the world on your own terms. Whether you want to join a local club, volunteer, attend cultural events, or simply enjoy a coffee at a local cafe, our support workers are here to make it happen safely and seamlessly.
                                </p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Link href="/referral">
                                    <Button size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                        Free Referral <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <TalkToUsButton />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How We Support Your Participation */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-[#2D3748]">
                            How We Support <span className="text-secondary">Your Participation</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Navigating the community can be daunting. Our role is to remove the barriers that stop you from participating. We provide one-on-one support to help you:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {howWeSupport.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:shadow-lg transition-all group flex gap-6 items-start"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors flex-shrink-0">
                                    <item.icon size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-[#2D3748] mb-3">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What Activities Can We Assist With? */}
            <section className="py-20 lg:py-28 bg-[#2D3748] text-white">
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white">
                            What Activities Can <span className="text-primary">We Assist With?</span>
                        </h2>
                        <p className="text-gray-300 text-lg">
                            The choice is yours. We support you to access a wide range of mainstream and community-based activities in Melbourne's Western and Northern suburbs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                        {activities.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-all text-center group"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <activity.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{activity.title}</h3>
                                <p className="text-gray-300">{activity.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Neuro-Affirming Approach */}
            <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-10 order-2 lg:order-1"
                        >
                            <h2 className="text-4xl font-black text-[#2D3748]">
                                A Neuro-Affirming <span className="text-secondary">Approach to Socialising</span>
                            </h2>
                            <p className="text-lg text-gray-600">
                                We understand that for neurodivergent individuals (such as those with Autism or ADHD), community access can sometimes cause sensory overload or anxiety. We do things differently:
                            </p>
                            <div className="grid gap-8">
                                {neuroAffirming.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0">
                                            <CheckCircle2 className="w-6 h-6 text-secondary" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#2D3748] mb-2">{item.title}</h3>
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
                            className="order-1 lg:order-2 relative"
                        >
                            <div className="relative w-full h-[500px]">
                                <Image quality={80}
                                    src="/images/community/img26.webp"
                                    alt="Neuro-Affirming Approach"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl border-8 border-gray-50 object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-gray-50">
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-[#2D3748]">
                            The Benefits of <span className="text-primary">Community Participation</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Why is this support so important for your NDIS plan?
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-5 hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <benefit.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#2D3748] mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 lg:py-28 relative bg-white">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="relative w-full h-[500px]">
                                <Image quality={80}
                                    src="/images/community/img27.webp"
                                    alt="Why Choose JS Choice"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl border-8 border-gray-50 object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-10 order-1 lg:order-2"
                        >
                            <h2 className="text-4xl font-black text-[#2D3748]">
                                Why Choose <span className="text-secondary">JS Choice?</span>
                            </h2>
                            <div className="grid gap-8">
                                {whyChooseUs.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0">
                                            <CheckCircle2 className="w-6 h-6 text-secondary" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#2D3748] mb-2">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
                <div className="container-8xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#2D3748] rounded-[3rem] p-10 md:p-16 text-center shadow-2xl max-w-5xl mx-auto text-white"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">
                            Let's Explore <span className="text-primary">Melbourne Together</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Don't let anxiety or logistical barriers keep you inside. Let's build a plan to get you connected.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Button asChild size="lg" className="h-16 px-8 rounded-full bg-white hover:bg-gray-100 text-[#2D3748] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <a href="tel:1300572464">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Call Now
                                </a>
                            </Button>
                            <Link href="/referral">
                                <Button size="lg" className="h-16 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
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
                sourcePage="/access-to-community-activities"
                defaultService="Community Participation & Activities"
            />

        </main>
    );
};

export default AccessToCommunityActivities;
