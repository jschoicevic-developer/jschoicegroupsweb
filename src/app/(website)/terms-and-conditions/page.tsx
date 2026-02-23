import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
    title: "Terms & Conditions | JS Choice Group",
    description: "Read the Terms and Conditions of JS Choice Group Pty Ltd. Understand your rights and obligations when using our NDIS services and website.",
};

export default function TermsAndConditionsPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <PageHeader
                title="Terms & Conditions"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Terms & Conditions" }
                ]}
            />

            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 prose prose-gray max-w-none">
                    <p className="text-sm text-gray-500 mb-10">Last updated: February 2026</p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">1. About These Terms</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        These Terms and Conditions govern your use of the JS Choice Group Pty Ltd (ABN 54 644 196 270) website located at jschoicegroup.com.au and the services we provide. By accessing our website or engaging our services, you agree to these terms. If you do not agree, please do not use our website or services.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">2. Our Services</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        JS Choice Group Pty Ltd is a registered NDIS provider delivering disability support services in Victoria, Australia. Our services are subject to the NDIS Act 2013, NDIS Practice Standards, and the NDIS Code of Conduct. Service delivery is governed by individual Service Agreements entered into with each participant or their nominee.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">3. Website Use</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">When using our website, you agree to:</p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-8">
                        <li>Use the website only for lawful purposes</li>
                        <li>Not attempt to gain unauthorised access to any part of the website or its systems</li>
                        <li>Not transmit any harmful, offensive, or disruptive content</li>
                        <li>Not reproduce or redistribute our content without prior written permission</li>
                    </ul>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">4. NDIS Tools and Calculators</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        The NDIS tools available on our website (including the Budget Calculator, Price Guide, and Service Matcher) are provided for general informational purposes only. Results are estimates based on current NDIS pricing data and should not be relied upon as financial or planning advice. Always consult your NDIS planner or support coordinator for personalised guidance.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">5. Intellectual Property</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        All content on this website, including text, images, logos, and tools, is the property of JS Choice Group Pty Ltd or its content suppliers and is protected by Australian copyright law. You may not copy, reproduce, or distribute any content without our express written consent.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">6. Disclaimer of Warranties</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Our website and its content are provided &quot;as is&quot; without any warranty of any kind. We do not warrant that the website will be uninterrupted, error-free, or free of viruses. To the maximum extent permitted by law, we disclaim all implied warranties in relation to the website and its content.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">7. Limitation of Liability</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        To the fullest extent permitted by law, JS Choice Group Pty Ltd shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services. Our liability is limited to the amount paid for the specific service giving rise to the claim.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">8. Third-Party Links</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Our website may contain links to third-party websites. These links are provided for your convenience. We do not endorse or take responsibility for the content, privacy practices, or accuracy of any third-party websites.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">9. Changes to These Terms</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page with an updated date. Continued use of the website after changes are posted constitutes your acceptance of the updated terms.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">10. Governing Law</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        These Terms are governed by the laws of Victoria, Australia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Victoria.
                    </p>

                    <h2 className="text-2xl font-black text-[#2D3748] uppercase tracking-tight mb-4">11. Contact Us</h2>
                    <p className="text-gray-600 leading-relaxed mb-2">For enquiries about these Terms and Conditions, please contact:</p>
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
