import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { getLocationPageData } from "@/data/location-pages-content";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";

// Image Mapping
const SERVICE_IMAGES = {
    aha: "/images/allied-health/img32.webp",
    sc: "/images/support-coordination/support-1.webp",
    accom: "/images/accommodation/sil.webp",
    provider: "/images/support-coordination/bg-1.webp"
};

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const data = getLocationPageData(params.slug);

    if (!data) {
        return {
            title: "Page Not Found | JS Choice",
            description: "The page you are looking for does not exist."
        };
    }

    return {
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            type: "website",
        }
    };
}

export default function DynamicLocationPage({ params }: PageProps) {
    const data = getLocationPageData(params.slug);

    if (!data) {
        notFound();
    }

    const heroImage = SERVICE_IMAGES[data.serviceType] || "/images/support-coordination/bg-1.webp";

    return (
        <div className="bg-white">
            {/* 1. Page Header */}
            <div className="bg-gray-900 pt-20">
                <PageHeader
                    title={data.heroTitle}
                    breadcrumb={[
                        { label: "Home", href: "/" },
                        { label: "Services", href: "/" },
                        { label: data.location }
                    ]}
                />
            </div>

            {/* 2. Hero Content Section */}
            <section className="py-16 lg:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Text Content */}
                        <div className="space-y-6">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-wider">
                                {data.serviceType === 'sc' ? 'Support Coordination' :
                                    data.serviceType === 'aha' ? 'Allied Health' :
                                        data.serviceType === 'accom' ? 'Accommodation' : 'NDIS Provider'}
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                                {data.heroSubtitle}
                            </h2>

                            <p className="text-lg text-gray-600 leading-relaxed">
                                {data.description}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href="/referral">
                                    <Button className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                                        Get a Free Referral
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-secondary/10 rounded-[2rem] transform rotate-3 z-0" />
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl z-10 aspect-[4/3]">
                                <Image quality={80}
                                    src={heroImage}
                                    alt={data.heroTitle}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>

                            {/* Floating Quote Card */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs border border-gray-100 hidden md:block">
                                <p className="text-gray-800 font-bold italic text-sm">
                                    "Your journey to independence starts with the right support."
                                </p>
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs">JS</div>
                                    <span className="text-xs font-bold text-gray-500 uppercase">JS Choice Team</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Detailed Content Sections */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="space-y-16">
                        {data.content.map((section, index) => (
                            <div key={index} className="scroll-mt-24">
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-secondary rounded-full block" />
                                    {section.title}
                                </h3>

                                <div className="prose prose-lg text-gray-600 max-w-none">
                                    {section.body && (
                                        <p className="whitespace-pre-line mb-6 leading-relaxed">
                                            {section.body}
                                        </p>
                                    )}

                                    {section.list && (
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                                            {section.list.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-primary/20 transition-colors">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                                                    <span className="text-gray-700 font-medium">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CTA Section */}
            <section className="py-20 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-10" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                        Ready to Get Started with NDIS Support in {data.location}?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Contact us today to discuss your needs and how we can support your journey towards independence.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/referral">
                            <Button className="w-full sm:w-auto h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg shadow-primary/25">
                                Get a Free Referral <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="tel:0393953746">
                            <Button variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full border-2 border-white/20 text-white hover:bg-white hover:text-gray-900 font-bold text-lg bg-transparent">
                                Call 1300 572 464
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
