'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import type { LeadFormData } from '@/types/ndis';

interface LeadCaptureFormProps {
  source: string;
  sourcePage?: string;
  interestedServices?: string[];
  ndisParticipant?: boolean;
  location?: string;
  onSuccess: () => void;
}

export default function LeadCaptureForm({
  source,
  sourcePage,
  interestedServices = [],
  ndisParticipant,
  location,
  onSuccess
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    ndisNumber: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Use the comprehensive /api/leads endpoint which includes:
      // - Email notification to admin
      // - Email confirmation to client
      // - Full CRM integration
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Contact Information
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,

          // Source Tracking
          source: source,
          source_page: sourcePage,

          // NDIS Information
          ndis_participant: ndisParticipant,
          ndis_number: formData.ndisNumber,

          // Service Interest
          interested_services: interestedServices,

          // Location
          location: location,
          state: 'VIC', // Default to VIC, can be made dynamic if needed

          // Communication
          message: formData.message,
          preferred_contact: 'email'
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit form');
      }

      // Success! Email notifications are automatically sent by the API:
      // 1. Admin receives notification with all lead details
      // 2. Client receives confirmation email
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inputClasses = "w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 placeholder:text-gray-400";
  const labelClasses = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1";

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-black text-[#2D3748] mb-2 uppercase tracking-tight">Get Your Matched Services</h2>
        <p className="text-gray-500 font-medium">
          Enter your details below to see personalised service recommendations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className={labelClasses}>
              First Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              required
              className={inputClasses}
              placeholder="John"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className={labelClasses}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={inputClasses}
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            className={inputClasses}
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone Number <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
            className={inputClasses}
            placeholder="04XX XXX XXX"
          />
        </div>

        {/* NDIS Number (if participant) */}
        {ndisParticipant && (
          <div>
            <label htmlFor="ndisNumber" className={labelClasses}>
              NDIS Number (Optional)
            </label>
            <input
              type="text"
              id="ndisNumber"
              value={formData.ndisNumber}
              onChange={(e) => handleChange('ndisNumber', e.target.value)}
              className={inputClasses}
              placeholder="e.g., 123456789"
            />
          </div>
        )}

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClasses}>
            Additional Information (Optional)
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={4}
            className={`${inputClasses} resize-none`}
            placeholder="Tell us more about your specific needs..."
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3 text-red-600 text-sm font-medium">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 flex items-center justify-center gap-3 bg-primary hover:brightness-110 text-[#1A202C] font-black uppercase tracking-wider text-sm rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-4"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              View My Matched Services
            </>
          )}
        </button>

        <p className="text-[10px] text-gray-400 text-center mt-4 font-medium uppercase tracking-wide">
          Your information is secure and will only be used to contact you about services.
        </p>
      </form>
    </div>
  );
}
