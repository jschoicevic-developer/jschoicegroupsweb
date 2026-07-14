"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, ChevronDown } from "lucide-react";
import TurnstileWidget, { type TurnstileWidgetHandle } from "@/components/ui/TurnstileWidget";
const AustraliaFlagIcon = () => (
  <svg
    viewBox="0 0 20 14"
    className="w-[22px] h-[15px] rounded-[2px] shrink-0 border border-black/10"
    aria-hidden="true"
  >
    <rect width="20" height="14" fill="#012169" />
    <rect width="10" height="7" fill="#012169" />
    <path d="M0 3.5H10M5 0V7" stroke="#fff" strokeWidth="1.4" />
    <path d="M0 3.5H10M5 0V7" stroke="#C8102E" strokeWidth="0.7" />
    <path d="M0 0L10 7M10 0L0 7" stroke="#fff" strokeWidth="0.9" />
    <path d="M0 0L10 7M10 0L0 7" stroke="#C8102E" strokeWidth="0.45" />
    <circle cx="5" cy="9.8" r="1.1" fill="#fff" />
    <circle cx="13.2" cy="3.8" r="0.75" fill="#fff" />
    <circle cx="16.2" cy="6.2" r="0.75" fill="#fff" />
    <circle cx="15.2" cy="9.4" r="0.75" fill="#fff" />
    <circle cx="12.2" cy="10.4" r="0.55" fill="#fff" />
    <circle cx="17.2" cy="11.4" r="0.45" fill="#fff" />
  </svg>
);

export default function ConsultationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    postcode: "",
    email: "",
    supportFor: "",
    suburb: "",
    supportNeeded: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken("");
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken("");
    setError("Security verification failed to load. Please refresh the page and try again.");
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "postcode") {
      setFormData((prev) => ({ ...prev, postcode: value.replace(/\D/g, "").slice(0, 4) }));
      return;
    }
    if (name === "phone") {
      let digits = value.replace(/\D/g, "");
      if (digits.startsWith("61")) digits = digits.slice(2);
      if (digits.startsWith("0")) digits = digits.slice(1);
      setFormData((prev) => ({ ...prev, phone: digits.slice(0, 9) }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatPhoneDisplay = (digits: string) => {
    if (!digits) return "";
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  };

  const getFullAustralianPhone = (digits: string) => `0${digits}`;

  const isValidAustralianPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    if (digits.startsWith("61")) {
      return /^61[2-478]\d{8}$/.test(digits);
    }
    return /^0[2-478]\d{8}$/.test(digits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (turnstileEnabled && !turnstileToken) {
      setError("Please complete the security verification before submitting.");
      setLoading(false);
      return;
    }

    if (!isValidAustralianPhone(getFullAustralianPhone(formData.phone))) {
      setError("Please enter a valid Australian phone number (e.g. 04xx xxx xxx).");
      setLoading(false);
      return;
    }

    if (!/^\d{4}$/.test(formData.postcode)) {
      setError("Please enter a valid 4-digit Australian postcode.");
      setLoading(false);
      return;
    }

    const nameParts = formData.fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      first_name: firstName,
      last_name: lastName || null,
      email: formData.email,
      phone: getFullAustralianPhone(formData.phone),
      location: `${formData.suburb}, ${formData.postcode}`,
      message: formData.supportNeeded || null,
      source_details: { postcode: formData.postcode, suburb: formData.suburb },
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
      turnstile_token: turnstileToken || undefined,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        turnstileRef.current?.reset();
        setTurnstileToken("");
        throw new Error(data?.error || data?.message || "Something went wrong. Please try again.");
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
        phone: getFullAustralianPhone(formData.phone),
      });
      router.push(`/ndis-support-melbourne/thank-you?${params.toString()}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      turnstileRef.current?.reset();
      setTurnstileToken("");
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

        {/* Phone + Postcode side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex h-12 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <div className="flex items-center gap-1.5 px-2.5 border-r border-gray-200 bg-gray-100/80 shrink-0">
                <AustraliaFlagIcon />
                <span className="text-sm font-bold text-gray-600">+61</span>
              </div>
              <input
                type="tel"
                name="phone"
                required
                inputMode="numeric"
                placeholder="4xx xxx xxx"
                value={formatPhoneDisplay(formData.phone)}
                onChange={handleChange}
                className="flex-1 min-w-0 h-full px-3 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              Postcode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="postcode"
              required
              inputMode="numeric"
              pattern="\d{4}"
              maxLength={4}
              placeholder="e.g. 3030"
              value={formData.postcode}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Email */}
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

        {/* Turnstile */}
        <TurnstileWidget
          ref={turnstileRef}
          onVerify={handleTurnstileVerify}
          onExpire={handleTurnstileExpire}
          onError={handleTurnstileError}
          className="min-h-[65px]"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || (turnstileEnabled && !turnstileToken)}
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
