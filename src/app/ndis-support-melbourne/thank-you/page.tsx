"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";

function ThankYouContent() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") ?? "there";
  const email = searchParams.get("email") ?? "";
  const phone = searchParams.get("phone") ?? "";
  const service = searchParams.get("service") ?? "";

  const prefillParams = new URLSearchParams();
  if (name !== "there") prefillParams.set("name", name);
  if (email) prefillParams.set("email", email);
  if (phone) prefillParams.set("phone", phone);
  if (service) prefillParams.set("service", service);
  prefillParams.set("prefill", "true");

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="flex items-center justify-center py-4 px-6">
          <Image
            src="/JCGLogo.png"
            alt="JS Choice Group"
            width={160}
            height={54}
            className="h-12 w-auto"
          />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full flex flex-col items-center text-center gap-6">
          {/* Success icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-black font-heading">
            Thank You, {name}!
          </h1>

          {/* Subtext */}
          <p className="text-gray-600">
            Your referral request has been received. Our team will be in touch
            within 24 hours.
          </p>

          {/* Phone CTA card */}
          <div className="bg-white rounded-2xl p-6 shadow-md border w-full flex flex-col items-center gap-4">
            <p className="text-gray-700 font-medium">
              Need to speak with someone sooner?
            </p>
            <a
              href="tel:1300572464"
              className="inline-flex items-center gap-2 bg-[#1A202C] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#2D3748] transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call 1300 572 464
            </a>
          </div>

          {/* Optional referral card */}
          <div className="bg-accent/50 rounded-2xl p-6 w-full flex flex-col items-center gap-4">
            <p className="text-gray-700">
              Want to speed things up? Complete your full referral details to
              help us get started sooner.
            </p>
            <Link
              href={`/referral?${prefillParams.toString()}`}
              className="inline-flex items-center gap-2 text-[#1A202C] font-semibold hover:underline"
            >
              Complete Full Referral Details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-400">
        © 2026 JS Choice Group Pty Ltd | ABN: 54 644 196 270
      </footer>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
