
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/ui/PageHeader';
import { Home, Phone } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Thank You | JS Choice',
    description: 'Thank you for contacting JS Choice - Care and Support.',
};

export default function ThankYouPage() {
    return (
        <main className="bg-white">
            <PageHeader
                title="Thank You"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Success" }
                ]}
            />

            <section className="py-20 lg:py-32 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
                        We've Received Your <span className="text-primary">Enquiry</span>
                    </h2>

                    <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
                        Thank you for reaching out to JS Choice – Care and Support. A member of our friendly team will review your message and get back to you shortly, usually within 24 hours.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/">
                            <Button size="lg" className="rounded-full px-8 h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg">
                                <Home className="mr-2 h-5 w-5" />
                                Return to Home
                            </Button>
                        </Link>
                        <Link href="tel:0393953746">
                            <Button variant="outline" size="lg" className="rounded-full px-8 h-14 bg-white border-2 border-gray-200 hover:border-primary hover:text-primary font-bold text-lg">
                                <Phone className="mr-2 h-5 w-5" />
                                Call Us Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
