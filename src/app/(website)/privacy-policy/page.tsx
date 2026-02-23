import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
    title: "Privacy Policy | JS Choice Group",
    description: "Read the Privacy Policy of JS Choice Group Pty Ltd. We are committed to protecting your personal information in accordance with Australian privacy law.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <PageHeader
                title="Privacy Policy"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Privacy Policy" }
                ]}
            />

            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 prose prose-gray max-w-none">
                    <p className="text-sm text-gray-500 mb-10">Last updated: February 2026</p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">1. Introduction</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        JS Choice Group Pty Ltd (ABN 54 644 196 270) (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information in accordance with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">2. Information We Collect</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">We may collect the following types of personal information:</p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-8">
                        <li>Name, date of birth, and contact details (phone, email, address)</li>
                        <li>NDIS participant number and plan details</li>
                        <li>Health and disability-related information necessary to provide NDIS supports</li>
                        <li>Emergency contact information</li>
                        <li>Payment and billing information</li>
                        <li>Information provided through our website contact forms or enquiry tools</li>
                    </ul>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">3. How We Use Your Information</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">We use your personal information to:</p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-8">
                        <li>Provide and manage NDIS support services</li>
                        <li>Communicate with you about your supports and plan</li>
                        <li>Process referrals and service agreements</li>
                        <li>Meet our legal and regulatory obligations under the NDIS framework</li>
                        <li>Improve our services and respond to enquiries</li>
                        <li>Send relevant service information (you may opt out at any time)</li>
                    </ul>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">4. Disclosure of Information</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">We may share your information with:</p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-8">
                        <li>The National Disability Insurance Agency (NDIA) as required</li>
                        <li>Allied health professionals and support workers involved in your care</li>
                        <li>Other service providers with your consent</li>
                        <li>Government authorities where required by law</li>
                    </ul>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        We will not sell, rent, or trade your personal information to third parties for marketing purposes.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">5. Data Security</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        We take reasonable steps to protect your personal information from misuse, interference, loss, and unauthorised access. Our systems use secure data storage and access controls. However, no method of transmission over the internet is 100% secure.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">6. Access and Correction</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        You have the right to access and request correction of your personal information. To make a request, please contact us at <a href="mailto:info@jschoicegroup.com.au" className="text-primary hover:underline">info@jschoicegroup.com.au</a>. We will respond within a reasonable timeframe.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">7. Cookies and Website Analytics</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Our website may use cookies and analytics tools to improve user experience and understand how visitors interact with our site. You can disable cookies through your browser settings; however, this may affect site functionality.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">8. Complaints</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        If you believe we have breached the Australian Privacy Principles, please contact us first at <a href="mailto:info@jschoicegroup.com.au" className="text-primary hover:underline">info@jschoicegroup.com.au</a>. If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.oaic.gov.au</a>.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">9. Contact Us</h2>
                    <p className="text-gray-600 leading-relaxed mb-2">For privacy-related enquiries, please contact:</p>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-gray-600 space-y-1">
                        <p className="font-bold text-[#2D3748]">JS Choice Group Pty Ltd</p>
                        <p>Suite 106, Level 1, C5, 2 Main Street, Point Cook VIC 3030</p>
                        <p>Email: <a href="mailto:info@jschoicegroup.com.au" className="text-primary hover:underline">info@jschoicegroup.com.au</a></p>
                        <p>Phone: <a href="tel:1300572464" className="text-primary hover:underline">1300 572 464</a></p>
                    </div>
                </div>
            </section>
        </main>
    );
}
