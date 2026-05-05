"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
    Phone,
    ArrowRight,
    GraduationCap,
    Briefcase,
    BookOpen,
    Target,
    Compass,
    Rocket,
    CheckCircle2,
    Search,
    Users
} from "lucide-react";
import ServiceCTA from "@/components/ui/ServiceCTA";
import ServiceFormSection from "@/components/ui/ServiceFormSection";


/**
 * Employment & Education Services Data
 */
const employmentEducationServices = [
    {
        title: "Career Goal Planning",
        description: "We help you identify your strengths, interests, and career aspirations. Our team works with you to create a clear roadmap toward your dream job.",
        icon: Target
    },
    {
        title: "Skill Development",
        description: "Access training and workshops to build essential workplace skills. From communication and teamwork to technical skills, we've got you covered.",
        icon: Rocket
    },
    {
        title: "Job Search Assistance",
        description: "From resume writing to interview preparation, we provide end-to-end support to help you stand out to employers and land the right role.",
        icon: Search
    },
    {
        title: "Education Support",
        description: "Whether you're looking to complete a certificate or enroll in university, we help you navigate enrollment and access the support you need to succeed.",
        icon: BookOpen
    },
    {
        title: "Workplace Transition",
        description: "Moving into a new job can be challenging. We provide ongoing support during your initial weeks to ensure a smooth and successful transition.",
        icon: Compass
    },
    {
        title: "Community Volunteering",
        description: "Gain valuable experience and build your resume through meaningful volunteer opportunities within the local community.",
        icon: Users
    }
];

const whyEducationImportant = [
    {
        title: "Independence",
        description: "Financial stability and professional growth lead to a more independent and choice-driven life.",
        icon: Briefcase
    },
    {
        title: "Confidence",
        description: "Learning new skills and achieving career milestones builds immense self-esteem and pride.",
        icon: CheckCircle2
    },
    {
        title: "Social Inclusion",
        description: "Workplaces and classrooms provide vital opportunities for networking and building lasting friendships.",
        icon: GraduationCap
    }
];

const EmploymentEducationPage = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="Assist with Employment/Education"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Employment & Education" }
                ]}
            />

            {/* Hero Section */}
            <section className="py-10 lg:py-14 overflow-hidden">
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
                                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1484&auto=format&fit=crop"
                                    alt="Employment and Education Support"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
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
                                    <GraduationCap className="w-5 h-5" />
                                    Empowerment Through Learning
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    Unlock Your Potential, <span className="text-primary block mt-2">Build Your Future.</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    At Js Choice – Care and Support, we believe that disability should never be a barrier to professional success or educational achievement. Our mission is to empower you with the tools, skills, and confidence to pursue your career goals and lifelong learning.
                                </p>
                                <p>
                                    Whether you're looking for your first job, returning to work, or wanting to study, our dedicated specialists work closely with you. We tailor our support to your unique strengths, ensuring you have every opportunity to thrive in the workplace and the classroom.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button size="lg" className="h-14 px-8 rounded-full bg-[#2D3748] hover:bg-black text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Talk to a Specialist
                                </Button>
                                <Link href="/referral">
                                    <Button size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                        Free Referral <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How We Support Your Journey */}
            <section className="py-10 bg-white relative">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gray-50 skew-x-12 -z-10" />
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-8 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-[#2D3748]">
                            How We Support <span className="text-secondary">Your Journey</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            We provide comprehensive assistance tailored to your specific employment and education goals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {employmentEducationServices.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all group"
                            >
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <service.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-[#2D3748] mb-3 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Is Career & Growth Important? */}
            <section className="py-10 lg:py-14 bg-[#2D3748] text-white overflow-hidden">
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-8 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white">
                            Why Focus on <span className="text-primary">Growth?</span>
                        </h2>
                        <p className="text-gray-300 text-lg">
                            Pursuing employment and education offers:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {whyEducationImportant.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all text-center group"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Are You Ready? */}
            <section className="py-10 bg-white">
                <div className="container-8xl">
                    <div className="bg-gray-50 rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-black text-[#2D3748]">
                                Are You <span className="text-secondary">Ready to Start?</span>
                            </h2>
                            <p className="text-lg text-gray-600 font-medium">
                                We're here to help if you're ready to:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-gray-600">
                                    <div className="bg-secondary/10 p-1 rounded-full text-secondary mt-1"><ArrowRight size={16} /></div>
                                    <span>Explore new career paths suited to your interests.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-600">
                                    <div className="bg-secondary/10 p-1 rounded-full text-secondary mt-1"><ArrowRight size={16} /></div>
                                    <span>Build the confidence to enter or re-enter the workforce.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-600">
                                    <div className="bg-secondary/10 p-1 rounded-full text-secondary mt-1"><ArrowRight size={16} /></div>
                                    <span>Enroll in courses or training to enhance your skills.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-600">
                                    <div className="bg-secondary/10 p-1 rounded-full text-secondary mt-1"><ArrowRight size={16} /></div>
                                    <span>Access specialized equipment or support for your studies.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 w-full relative h-[400px] rounded-[2.5rem] overflow-hidden">
                            <Image quality={80}
                                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop"
                                alt="Get ready for success"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 lg:py-14 bg-gray-50 relative overflow-hidden">
                <div className="container-8xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#2D3748] rounded-[3rem] p-10 md:p-16 text-center shadow-2xl overflow-hidden max-w-5xl mx-auto text-white"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">
                            Your Future <span className="text-primary">Starts Today</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Don't let anything hold you back from your professional and educational dreams. Let's work together to make them a reality.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="h-16 px-8 rounded-full bg-white hover:bg-gray-100 text-[#2D3748] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <Phone className="mr-2 h-5 w-5" />
                                Talk to an Expert
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
              sourcePage="/employment-education"
              defaultService="Employment & Education Support"
            />

        </main>
    );
};

export default EmploymentEducationPage;
