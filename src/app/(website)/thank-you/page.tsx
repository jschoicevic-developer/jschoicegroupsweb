import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Phone, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Thank You | JS Choice',
    description: 'Thank you for contacting JS Choice - Care and Support.',
};

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col pt-32 pb-20 relative overflow-hidden">
            {/* Background decorators */}
            <div className="absolute top-20 right-[10%] w-[40%] h-[50%] bg-[#ABB3F1]/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-20 left-[10%] w-[40%] h-[50%] bg-[#F1ABAB]/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(171,179,241,0.2)_1px,transparent_1px)] bg-size-[32px_32px] opacity-60 pointer-events-none" />

            <div className="container mx-auto px-4 max-w-4xl text-center grow flex flex-col items-center justify-center relative z-10 py-10">
                <div className="bg-white/80 backdrop-blur-2xl p-8 md:p-16 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white w-full">
                    <div className="w-24 h-24 bg-[#68D391]/15 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(104,211,145,0.4)] relative">
                        <div className="absolute inset-0 rounded-full border-4 border-[#68D391]/30 animate-ping opacity-20" />
                        <CheckCircle className="w-12 h-12 text-[#68D391]" strokeWidth={2.5} />
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[#ABB3F1] font-black uppercase text-xs tracking-widest mb-6">
                        <span className="h-px w-8 bg-[#ABB3F1]/50" />
                        Success
                        <span className="h-px w-8 bg-[#ABB3F1]/50" />
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-[#1A202C] mb-8 tracking-tight uppercase leading-[1.1]">
                        Thank You For <br className="hidden sm:block" />
                        <span className="text-[#ABB3F1]">Reaching Out</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                        We&apos;ve received your message. Our expert team at JS Choice will review your enquiry and get back to you within 24 hours to discuss your NDIS journey.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
                        {[
                            { step: "01", title: "Review", desc: "We review your NDIS goals and specific care needs." },
                            { step: "02", title: "Contact", desc: "Our team will call you within 24 hours." },
                            { step: "03", title: "Connect", desc: "We match you with the right support workers." }
                        ].map((item) => (
                            <div key={item.step} className="bg-white/60 p-6 md:p-8 rounded-[2rem] border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 text-left">
                                <div className="text-[#ABB3F1] font-black text-3xl opacity-50 mb-3">{item.step}</div>
                                <h3 className="text-[#1A202C] font-black uppercase tracking-wide text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-lg mx-auto">
                        <Link href="/" className="w-full">
                            <Button className="w-full h-14 rounded-full bg-[#ABB3F1] hover:bg-[#9CA5E5] text-[#1A202C] font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <Home className="mr-2 h-5 w-5" />
                                Return Home
                            </Button>
                        </Link>
                        <Link href="tel:1300572464" className="w-full">
                            <Button variant="outline" className="w-full h-14 rounded-full bg-white border-2 border-[#1A202C] hover:bg-[#1A202C] text-[#1A202C] hover:text-white font-black text-sm uppercase tracking-widest shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <Phone className="mr-2 h-5 w-5" />
                                Call Us Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
