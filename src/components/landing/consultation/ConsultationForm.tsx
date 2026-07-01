"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, ChevronDown } from "lucide-react";

export default function ConsultationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    supportFor: "",
    suburb: "",
    supportNeeded: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const nameParts = formData.fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      first_name: firstName,
      last_name: lastName || null,
      email: formData.email,
      phone: formData.phone,
      location: formData.suburb,
      message: formData.supportNeeded || null,
      source: "ndis_provider_melbourne",
      source_page: "/ndis-provider-melbourne",
      interested_services: formData.supportFor ? [formData.supportFor] : [],
      state: "VIC",
      preferred_contact: "phone",
      utm_source: searchParams.get("utm_source"),
      utm_medium: searchParams.get("utm_medium"),
      utm_campaign: searchParams.get("utm_campaign"),
      utm_content: searchParams.get("utm_content"),
      utm_term: searchParams.get("utm_term"),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Something went wrong. Please try again.");
      }

      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "lead_form_submit",
          source: "ndis_provider_melbourne",
        });
        if (typeof (window as any).gtag === "function") {
          (window as any).gtag("event", "conversion", {
            send_to: "AW-17860915820/6_5ECJj8hoEcEOzk38RC",
            value: 1.0,
            currency: "AUD",
            transaction_id: `${Date.now()}`,
          });
        }
      }

      const params = new URLSearchParams({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });
      router.push(`/ndis-support-melbourne/thank-you?${params.toString()}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400";

  return (
    <div
      id="lead-form"
      className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-primary/20"
    >
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg sm:text-xl font-black text-[#1A202C] leading-tight">
          Request Your Free NDIS Consultation
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Takes under 60 seconds. A care coordinator will call you back
        </p>
      </div>

      <div className="h-px bg-gray-100 mb-5" />

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="Jane Smith"
            value={formData.fullName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Phone + Email side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="04xx xxx xxx"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="jane@email.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Who is this support for */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">
            Who is this support for? <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="supportFor"
              required
              value={formData.supportFor}
              onChange={handleChange}
              className={`${inputClass} appearance-none pr-10 cursor-pointer`}
              style={{ colorScheme: "normal" }}
            >
              <option value="" disabled>
                Select one
              </option>
              <option value="Myself">Myself</option>
              <option value="My child">My child</option>
              <option value="A family member">A family member</option>
              <option value="Someone I support">Someone I support</option>
              <option value="Not sure">Not sure</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Suburb */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">
            Suburb <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="suburb"
            required
            placeholder="e.g. Point Cook, Tarneit, Werribee"
            value={formData.suburb}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* What support are you after */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">
            What support are you after?
          </label>
          <textarea
            name="supportNeeded"
            placeholder="e.g. daily living support, transport, allied health..."
            value={formData.supportNeeded}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="relative overflow-hidden w-full h-12 bg-primary text-[#1A202C] font-black uppercase tracking-wider text-sm rounded-full shadow-lg hover:shadow-xl hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
        >
          <span className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_0.5px,transparent_0.5px)] bg-[length:4px_4px] pointer-events-none" />
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Submitting...
            </span>
          ) : (
            "Get My Free Callback →"
          )}
        </button>

        {/* Privacy note */}
        <div className="flex items-start gap-1.5 text-xs text-gray-400 mt-1">
          <Lock size={11} className="mt-0.5 shrink-0" />
          <span>
            By submitting, you agree to be contacted by JS Choice regarding NDIS support services. We never share your details with third parties.
          </span>
        </div>
      </form>
    </div>
  );
}
