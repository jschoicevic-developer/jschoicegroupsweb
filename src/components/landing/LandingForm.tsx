"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, ChevronDown } from "lucide-react";

interface LandingFormProps {
  source?: string;
  sourcePage?: string;
  defaultService?: string;
  redirectPath?: string;
}

export default function LandingForm({
  source = "google_ads_landing",
  sourcePage = "/ndis-support-melbourne",
  defaultService = "",
  redirectPath = "/ndis-support-melbourne/thank-you",
}: LandingFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    email: "",
    service: defaultService,
    message: "",
  });
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      first_name: formData.firstName,
      email: formData.email,
      phone: formData.phone,
      source,
      source_page: sourcePage,
      interested_services: [formData.service],
      state: "VIC",
      message: formData.message || null,
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

      // GTM dataLayer event (kept for GTM-based analytics if configured)
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "lead_form_submit",
          source,
          service: formData.service,
        });

        // Google Ads conversion tracking — fire the conversion directly via gtag
        // Conversion action: "Google ads Conversion" (id 7518404120)
        // Google Ads ID: AW-17860915820  |  Label: 6_5ECJj8hoEcEOzk38RC
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
        name: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
      });
      router.push(`${redirectPath}?${params.toString()}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-14 px-5 bg-gray-50 border border-gray-200 rounded-2xl text-base font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400";

  return (
    <div
      id="lead-form"
      className="bg-white rounded-[2rem] shadow-2xl p-6 sm:p-8"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-[#1A202C] leading-tight">
          Get Your Free NDIS Referral
        </h2>
        <p className="text-sm text-gray-500 mt-1">Takes less than 60 seconds</p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* First Name */}
        <input
          type="text"
          name="firstName"
          required
          placeholder="Your first name *"
          value={formData.firstName}
          onChange={handleChange}
          className={inputClass}
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          required
          placeholder="Phone number *"
          value={formData.phone}
          onChange={handleChange}
          className={inputClass}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          required
          placeholder="Email address *"
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
        />

        {/* Service Select */}
        <div className="relative">
          <select
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className={`${inputClass} appearance-none pr-12 cursor-pointer`}
            style={{ colorScheme: "normal" }}
          >
            <option value="" disabled>
              Service Needed *
            </option>
            <optgroup label="Core Support">
              <option value="Support Coordination">Support Coordination</option>
              <option value="Assistance with Daily Life">Assistance with Daily Life</option>
              <option value="Respite / Short Term Accommodation">Respite / Short Term Accommodation</option>
              <option value="Community Nursing Care">Community Nursing Care</option>
            </optgroup>
            <optgroup label="Community & Lifestyle">
              <option value="Community Participation & Activities">Community Participation & Activities</option>
              <option value="Group / Centre Activities">Group / Centre Activities</option>
              <option value="NDIS Transport">NDIS Transport</option>
            </optgroup>
            <optgroup label="Specialist Services">
              <option value="Psychosocial Recovery Coaching">Psychosocial Recovery Coaching</option>
              <option value="Allied Health Services">Allied Health Services</option>
              <option value="Employment & Education Support">Employment & Education Support</option>
            </optgroup>
            <optgroup label="NDIS Help">
              <option value="NDIS Access Request Help">NDIS Access Request Help</option>
              <option value="NDIS Accommodation">NDIS Accommodation</option>
              <option value="Client & Family Advocacy">Client & Family Advocacy</option>
            </optgroup>
            <option value="Other / Not Sure">Other / Not Sure</option>
          </select>
          <ChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* Optional Message Toggle */}
        <div>
          {!showMessage ? (
            <button
              type="button"
              onClick={() => setShowMessage(true)}
              className="text-sm text-primary font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Add a message (optional)
            </button>
          ) : (
            <textarea
              name="message"
              placeholder="Your message (optional)"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-base font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400 resize-none"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="relative overflow-hidden w-full h-14 bg-primary text-[#1A202C] font-black uppercase tracking-wider text-sm rounded-full shadow-lg hover:shadow-xl hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100 mt-1"
        >
          <span className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_0.5px,transparent_0.5px)] bg-[length:4px_4px] pointer-events-none" />
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              Submitting...
            </span>
          ) : (
            "Get My Free Referral"
          )}
        </button>

        {/* Privacy Note */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-1">
          <Lock size={12} />
          <span>Your details are safe. We never share your information.</span>
        </div>
      </form>
    </div>
  );
}
