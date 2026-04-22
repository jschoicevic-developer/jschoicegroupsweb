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
    Palette,
    Users,
    Heart,
    Target,
    TrendingUp,
    MessageCircle,
    UserCheck,
    Bus,
    CheckCircle2
} from "lucide-react";
import ServiceCTA from "@/components/ui/ServiceCTA";
import ServiceFormSection from "@/components/ui/ServiceFormSection";


const activityCategories = [
    {
        title: "Life Skills & Independence",
        description: "Learn practical skills in a supportive group setting where making mistakes is part of the learning process.",
        items: ["Cooking Classes", "Budgeting Workshops", "Travel Training"],
        icon: UserCheck
    },
    {
        title: "Creative Expression & Wellbeing",
        description: "Express yourself without words. These sessions are great for mindfulness and reducing anxiety.",
        items: ["Arts & Crafts", "Music & Movement", "Gardening"],
        icon: Palette
    },
    {
        title: "Social Outings & Community Access",
        description: "We organise supported trips to explore Melbourne, helping you navigate public spaces with confidence.",
        items: ["Recreation", "Nature", "Community Events"],
        icon: Bus
    }
];

const whyChooseUs = [
    {
        title: "Neuro-Affirming & Anxiety-Friendly",
        description: "We respect your social battery. We create low-sensory options and understand that 'parallel play' (being together without forced interaction) is a valid form of socializing. You participate as much or as little as you like."
    },
    {
        title: "Small Groups",
        description: "We keep our participant-to-staff ratios low to ensure everyone gets attention and the environment remains calm and safe."
    },
    {
        title: "Culturally Inclusive",
        description: "Our groups celebrate diversity. We welcome participants from all backgrounds and ensure our activities are respectful of different traditions."
    },
    {
        title: "Door-to-Door Transport",
        description: "Don't worry about how to get to us. We can arrange transport assistance to pick you up and drop you home safely."
    }
];

const whatToExpect = [
    {
        title: "Personalised Goals",
        description: "We don't just slot you into a programme. We ask what you want to achieve, whether that's making one new friend or learning to cook a specific dish.",
        icon: Target
    },
    {
        title: "Skill Development",
        description: "You will notice your confidence growing as you master new tasks.",
        icon: TrendingUp
    },
    {
        title: "Meaningful Connection",
        description: "Meet people with shared interests and similar lived experiences.",
        icon: Users
    },
    {
        title: "Feedback Loop",
        description: "We regularly check in with you to ensure you are enjoying the activities and adjust them if your interests change.",
        icon: MessageCircle
    }
];

const GroupCentreActivities = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="Group / Centre Activities"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Group / Centre Activities" }
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
                                    src="/images/group-activities/group-1.webp"
                                    alt="Group Activities"
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
                                    Connect, Create, and <span className="text-primary block mt-2">Belong in a Safe Space</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p className="font-bold text-[#2D3748]">
                                    Socializing doesn't have to be stressful.
                                </p>
                                <p>
                                    At JS Choice – Care and Support, we provide structured, engaging, and culturally safe group activities across Melbourne designed to help you build friendships and learn new skills at your own pace.
                                </p>
                                <p>
                                    We believe that community participation looks different for everyone. Whether you love hands-on creative projects, want to master cooking, or simply enjoy being around others in a low-pressure environment, our programmes are designed to foster independence and combat social isolation.
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

            {/* Capacity Building Text Section */}
            <section className="py-16 bg-white text-center">
                <div className="container-8xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto space-y-6"
                    >
                        <h2 className="text-3xl lg:text-4xl font-black text-[#2D3748]">
                            More Than Just "Activities" — <span className="text-secondary">It's Capacity Building</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our group programmes are not just about passing time; they are about Capacity Building. We use fun, engaging activities as a vehicle to teach vital life skills that you can use at home and in the community.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Activity Categories */}
            <section className="py-20 bg-gray-50">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activityCategories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:border-primary/20 group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <category.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#2D3748] mb-4">{category.title}</h3>
                                <p className="text-gray-600 mb-6">{category.description}</p>
                                <ul className="space-y-3">
                                    {category.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-secondary" />
                                            <span className="font-medium text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 lg:py-28 relative overflow-hidden bg-white">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-10"
                        >
                            <h2 className="text-4xl font-black text-[#2D3748]">
                                Why Choose Our <span className="text-secondary">Group Programmes?</span>
                            </h2>
                            <p className="text-lg text-gray-600">
                                We know that joining a new group can be daunting. Here is how we make it easier:
                            </p>
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

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-secondary/20 rounded-full blur-2xl opacity-50" />
                            <div className="relative h-[500px] w-full">
                                <Image quality={80}
                                    src="/images/group-activities/group-2.webp"
                                    alt="Why Choose Us"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl border-8 border-white object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What to Expect */}
            <section className="py-20 lg:py-28 overflow-hidden bg-[#2D3748] text-white">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-2 lg:order-1 relative"
                        >
                            <div className="relative h-[500px] w-full">
                                <Image quality={80}
                                    src="/images/group-activities/group-3.webp"
                                    alt="What to Expect"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl border-8 border-white/10 object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2 space-y-10"
                        >
                            <h2 className="text-4xl lg:text-5xl font-black text-white">
                                What You Can <span className="text-primary">Expect</span>
                            </h2>
                            <p className="text-gray-300 text-lg">
                                When you join the JS Choice community, you are joining a family.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {whatToExpect.map((item, index) => (
                                    <div key={index} className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                                        <item.icon className="w-8 h-8 text-primary mb-3" />
                                        <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
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
                        className="bg-white rounded-[3rem] p-10 md:p-16 text-center shadow-2xl border border-gray-100 max-w-5xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-[#2D3748] mb-6 leading-tight">
                            Try Before <span className="text-secondary">You Commit!</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                            We understand that you might want to see the space and meet the team before signing up. That is why we offer a <strong>No-Obligation Meet & Greet</strong>.
                        </p>
                        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
                            Come visit our centre, meet our friendly support workers, and see if the vibe is right for you. Ready to start your journey of growth and discovery?
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="h-16 px-8 rounded-full bg-[#2D3748] hover:bg-black text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <Phone className="mr-2 h-5 w-5" />
                                Call: 1300 572 464
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
              sourcePage="/group-centre-activities"
              defaultService="Group / Centre Activities"
            />

        </main>
    );
};
export default GroupCentreActivities;
