import ServiceMatcher from '@/components/ndis/ServiceMatcher';
import { ArrowLeft, Shield, Clock, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDIS Services Matcher | JS Choice Group',
  description: 'Find the perfect NDIS services for your needs. Answer a few questions and get matched with personalised support recommendations from JS Choice Group.',
};

export default function ServiceMatcherPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header - Simplified as Layout handles context */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/tools"
            className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-bold uppercase tracking-wider text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>

          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-6 transition-transform duration-300">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#2D3748] mb-6 uppercase tracking-tight">
              Service <span className="text-primary">Matcher</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Answer a few simple questions and we'll instantly match you with the most suitable JS Choice Group services for your unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
              <div className="w-2 h-full absolute top-0 left-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-[#2D3748] text-lg">NDIS Registered</h3>
                <p className="text-sm text-gray-500 font-medium">Fully compliant provider</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
              <div className="w-2 h-full absolute top-0 left-0 bg-[#F1ABAB] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 bg-[#F1ABAB]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#F1ABAB]" />
              </div>
              <div>
                <h3 className="font-bold text-[#2D3748] text-lg">5+ Years Experience</h3>
                <p className="text-sm text-gray-500 font-medium">Trusted by hundreds of families</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
              <div className="w-2 h-full absolute top-0 left-0 bg-[#ABB3F1] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 bg-[#ABB3F1]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-[#ABB3F1]" />
              </div>
              <div>
                <h3 className="font-bold text-[#2D3748] text-lg">Person-Centred</h3>
                <p className="text-sm text-gray-500 font-medium">Your needs come first, always</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Matcher Component */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <ServiceMatcher />
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12">
            <h2 className="text-3xl font-black text-[#2D3748] mb-12 text-center uppercase tracking-tight">
              Why Choice <span className="text-primary">Matters</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20">
                <h3 className="font-bold text-[#2D3748] text-xl flex items-center mb-3">
                  <div className="w-3 h-3 bg-primary rounded-full mr-3 shadow-sm shadow-primary/50" />
                  Neuro-Affirming
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed pl-6">
                  We recognise and embrace neurodiversity, tailoring our approach to suit your unique needs and communication style.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20">
                <h3 className="font-bold text-[#2D3748] text-xl flex items-center mb-3">
                  <div className="w-3 h-3 bg-primary rounded-full mr-3 shadow-sm shadow-primary/50" />
                  Culturally Diverse
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed pl-6">
                  Our staff reflects the rich diversity of the communities we serve across Melbourne, ensuring culturally safe support.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20">
                <h3 className="font-bold text-[#2D3748] text-xl flex items-center mb-3">
                  <div className="w-3 h-3 bg-primary rounded-full mr-3 shadow-sm shadow-primary/50" />
                  Experienced Team
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed pl-6">
                  Qualified professionals with extensive experience in disability support, nursing, and complex care needs.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20">
                <h3 className="font-bold text-[#2D3748] text-xl flex items-center mb-3">
                  <div className="w-3 h-3 bg-primary rounded-full mr-3 shadow-sm shadow-primary/50" />
                  Melbourne Wide
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed pl-6">
                  Proudly serving Point Cook, Werribee, and surrounding western and northern suburbs with local knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-28 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ABB3F1]/10 -skew-x-12 z-0" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F1ABAB]/10 rounded-full blur-3xl z-0" />

        <div className="max-w-4xl mx-auto bg-[#2D3748] rounded-[2.5rem] shadow-2xl p-10 md:p-16 text-white text-center relative z-10 overflow-hidden">
          {/* Inner Card Decor */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary" />

          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase text-white tracking-tight">Have Questions?</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 font-medium max-w-2xl mx-auto">
            Our friendly team is here to help you every step of the way. Get in touch with us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1300572464"
              className="h-16 px-10 flex items-center justify-center bg-primary text-[#1A202C] font-black uppercase tracking-wider text-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Call: 1300 572 464
            </a>
            <a
              href="mailto:info@jschoicegroup.com.au"
              className="h-16 px-10 flex items-center justify-center border-2 border-white/20 text-white font-black uppercase tracking-wider text-sm rounded-full hover:bg-white hover:text-[#1A202C] transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
