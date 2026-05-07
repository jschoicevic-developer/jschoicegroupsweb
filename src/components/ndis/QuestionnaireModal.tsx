'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  X, ArrowLeft, Phone, CheckCircle, Shield, HelpCircle,
  Clock, Calendar, Search, Home, User, Users,
  Brain, Briefcase, HeartPulse, Stethoscope, Accessibility,
  Sparkles, UtensilsCrossed, Truck, DollarSign, Loader2
} from 'lucide-react';

type StepId = 'who' | 'urgency' | 'service' | 'funding' | 'plan_management' | 'aged_care_program' | 'frequency' | 'contact';

interface Answers {
  who: string;
  urgency: string;
  service: string;
  funding: string;
  planManagement: string;
  agedCareProgram: string;
  frequency: string;
}

function buildSequence(funding: string): StepId[] {
  const base: StepId[] = ['who', 'urgency', 'service', 'funding'];
  if (funding === 'yes-ndis') base.push('plan_management');
  else if (funding === 'yes-aged-care') base.push('aged_care_program');
  base.push('frequency', 'contact');
  return base;
}

const STEPS: Record<
  Exclude<StepId, 'contact'>,
  { question: string; cols: 1 | 2; options: { value: string; label: string; icon: React.ElementType }[] }
> = {
  who: {
    question: 'Who is the care for?',
    cols: 1,
    options: [
      { value: 'support-coordinator-client', label: 'Client of a support coordinator', icon: Users },
      { value: 'myself', label: 'Myself', icon: User },
      { value: 'family', label: 'Family member', icon: Users },
      { value: 'someone-else', label: 'Someone else', icon: HelpCircle },
    ],
  },
  urgency: {
    question: 'How quickly do you need to find care?',
    cols: 1,
    options: [
      { value: 'immediate', label: 'Immediately', icon: Clock },
      { value: 'week', label: 'Within a week', icon: Calendar },
      { value: 'month', label: 'Within a month', icon: Calendar },
      { value: 'research', label: 'Just researching', icon: Search },
    ],
  },
  service: {
    question: 'What type of service do you need?',
    cols: 2,
    options: [
      { value: 'sil-services', label: 'SIL Services', icon: Home },
      { value: 'disability-home-support-services', label: 'Home Support', icon: Home },
      { value: 'support-workers', label: 'Support Workers', icon: User },
      { value: 'behaviour-support', label: 'Behaviour Support', icon: Brain },
      { value: 'plan-management', label: 'Plan Management', icon: Briefcase },
      { value: 'support-coordination', label: 'Support Coordination', icon: Users },
      { value: 'home-care-packages', label: 'Home Care Packages', icon: HeartPulse },
      { value: 'personal-care-services', label: 'Personal Care', icon: Stethoscope },
      { value: 'respite-care', label: 'Respite Care', icon: Accessibility },
      { value: 'cleaning-services', label: 'Cleaning', icon: Sparkles },
      { value: 'meal-preparation-services', label: 'Meal Prep', icon: UtensilsCrossed },
      { value: 'transport-services', label: 'Transport', icon: Truck },
    ],
  },
  funding: {
    question: 'How is their care funded?',
    cols: 1,
    options: [
      { value: 'yes-ndis', label: 'NDIS', icon: CheckCircle },
      { value: 'yes-aged-care', label: 'Aged care (HCP, Support at Home, CHSP)', icon: Home },
      { value: 'private', label: 'Paying privately', icon: DollarSign },
      { value: 'dva', label: 'DVA / veteran', icon: Shield },
      { value: 'applying', label: 'Still applying', icon: Clock },
      { value: 'not-sure', label: 'Not sure', icon: HelpCircle },
    ],
  },
  plan_management: {
    question: 'How is the plan managed?',
    cols: 1,
    options: [
      { value: 'plan-managed', label: 'Plan managed', icon: Briefcase },
      { value: 'self-managed', label: 'Self-managed', icon: User },
      { value: 'ndia-managed', label: 'NDIA managed', icon: Home },
      { value: 'not-sure', label: 'Not sure', icon: HelpCircle },
    ],
  },
  aged_care_program: {
    question: 'Which aged-care program?',
    cols: 1,
    options: [
      { value: 'hcp', label: 'Home Care Package (HCP)', icon: Briefcase },
      { value: 'support-at-home', label: 'Support at Home', icon: Home },
      { value: 'chsp', label: 'CHSP', icon: Home },
      { value: 'not-sure', label: 'Not sure', icon: HelpCircle },
    ],
  },
  frequency: {
    question: 'How often is support needed?',
    cols: 1,
    options: [
      { value: 'few-hours', label: 'A few hours a week', icon: Clock },
      { value: 'several-days', label: 'Several days a week', icon: Calendar },
      { value: 'daily', label: 'Daily', icon: Calendar },
      { value: 'not-sure', label: 'Not sure yet', icon: HelpCircle },
    ],
  },
};

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isValidPhone(v: string) {
  return /^[\d\s+\-().]{7,}$/.test(v.trim());
}

// Shared class strings
const inputBase =
  'w-full h-11 text-base bg-white border-2 border-primary/60 rounded-lg px-3 outline-none transition-colors duration-200 ' +
  'hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  source?: string;
  sourcePage?: string;
  /** When true, renders inline (no fixed overlay) — for use on dedicated pages */
  inline?: boolean;
}

export default function QuestionnaireModal({
  isOpen,
  onClose,
  onSuccess,
  source = 'questionnaire',
  sourcePage,
  inline = false,
}: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    who: '', urgency: '', service: '', funding: '',
    planManagement: '', agedCareProgram: '', frequency: '',
  });
  const [name, setName] = useState('');
  const [reach, setReach] = useState('');
  const [contactError, setContactError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sequence = buildSequence(answers.funding);
  const totalSteps = sequence.length;
  const currentStep = sequence[stepIndex];
  const progress = Math.round(((stepIndex + 1) / totalSteps) * 100);

  const answerKey: Record<StepId, keyof Answers | null> = {
    who: 'who', urgency: 'urgency', service: 'service', funding: 'funding',
    plan_management: 'planManagement', aged_care_program: 'agedCareProgram',
    frequency: 'frequency', contact: null,
  };

  const currentValue = currentStep !== 'contact'
    ? answers[answerKey[currentStep] as keyof Answers]
    : '';

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setStepIndex(0);
      setAnswers({ who: '', urgency: '', service: '', funding: '', planManagement: '', agedCareProgram: '', frequency: '' });
      setName(''); setReach(''); setContactError(''); setSuccess(false);
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (inline) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose, inline]);

  useEffect(() => {
    if (inline) return;
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, inline]);

  if (!isOpen) return null;

  function selectOption(stepId: StepId, value: string) {
    const key = answerKey[stepId] as keyof Answers;
    if (!key) return;
    const newAnswers = { ...answers, [key]: value };
    if (stepId === 'funding') { newAnswers.planManagement = ''; newAnswers.agedCareProgram = ''; }
    setAnswers(newAnswers);
    const newSeq = buildSequence(newAnswers.funding);
    const next = stepIndex + 1;
    if (next < newSeq.length) setTimeout(() => setStepIndex(next), 280);
  }

  function goBack() {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  }

  const reachValid = isValidEmail(reach) || isValidPhone(reach);
  const contactReady = name.trim().length > 0 && reachValid;

  async function handleSubmit() {
    if (!contactReady) { setContactError('Please enter a valid email address or phone number.'); return; }
    setContactError('');
    setLoading(true);
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || null;
    const email = isValidEmail(reach) ? reach.trim() : null;
    const phone = !email && isValidPhone(reach) ? reach.trim() : null;
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName, last_name: lastName, email, phone,
          source, source_page: sourcePage,
          ndis_participant: answers.funding === 'yes-ndis',
          ndis_status: answers.planManagement || null,
          interested_services: answers.service ? [answers.service] : [],
          service_matcher_answers: {
            who: answers.who, urgency: answers.urgency, service: answers.service,
            funding: answers.funding,
            plan_management: answers.planManagement || null,
            aged_care_program: answers.agedCareProgram || null,
            frequency: answers.frequency,
          },
          source_details: answers.who,
          preferred_contact: email ? 'email' : 'phone',
          state: 'VIC',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Submission failed');
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setContactError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // ─── Inner content (shared between modal and inline) ────────────────────────

  const questionContent = !success && currentStep !== 'contact' && (
    <div className="w-full max-w-md mx-auto">
      <h2
        id={`questionnaire-step-${stepIndex}-heading`}
        className="text-xl sm:text-2xl font-semibold text-[#2D3748] text-center mb-6 leading-tight"
      >
        {STEPS[currentStep].question}
      </h2>
      <div
        className={`grid gap-2.5 ${STEPS[currentStep].cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}
        role="radiogroup"
        aria-labelledby={`questionnaire-step-${stepIndex}-heading`}
      >
        {STEPS[currentStep].options.map((opt) => {
          const Icon = opt.icon;
          const selected = currentValue === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => selectOption(currentStep, opt.value)}
              className={`flex items-center gap-3 border-2 rounded-lg px-4 py-3 text-left transition-colors duration-200 cursor-pointer group ${
                selected
                  ? 'bg-primary/5 border-primary'
                  : 'bg-white border-primary/60 hover:bg-primary/5 hover:border-primary'
              }`}
            >
              <div
                className={`shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200 ${
                  selected
                    ? 'bg-primary/15 text-primary'
                    : 'bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-[#2D3748] leading-tight">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const contactContent = !success && currentStep === 'contact' && (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-5">
        <p className="text-xs uppercase tracking-wider text-primary/80 font-semibold mb-2">Last step</p>
        <h2 className="text-xl sm:text-2xl font-semibold text-[#2D3748] mb-2">
          Where should we send your matches?
        </h2>
      </div>

      <div className="flex items-start gap-2 bg-primary/5 border border-primary/30 rounded-lg px-3 py-2 mb-4">
        <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-[#2D3748]/80 leading-relaxed">
          Your details go only to providers matching your needs. We never share or sell your details for marketing.
        </p>
      </div>

      <fieldset className="space-y-3">
        <legend className="sr-only">Your contact details</legend>
        <label htmlFor="contact-name" className="sr-only">Your name</label>
        <input
          id="contact-name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby="contact-error"
          autoComplete="name"
          className={inputBase}
        />
        <label htmlFor="contact-reach" className="sr-only">Email or phone number</label>
        <input
          id="contact-reach"
          type="text"
          placeholder="Email or phone number"
          value={reach}
          onChange={(e) => setReach(e.target.value)}
          aria-describedby="contact-error"
          autoComplete="email"
          className={inputBase}
        />
      </fieldset>

      {contactError && (
        <p id="contact-error" className="text-xs text-red-600 mt-2" role="alert">
          {contactError}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!contactReady || loading}
        className={`w-full rounded-full mt-4 h-12 text-base font-bold transition-all duration-200 ${
          contactReady && !loading
            ? 'bg-primary text-[#1A202C] hover:brightness-105'
            : 'bg-gray-200 text-white/70 cursor-not-allowed'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </span>
        ) : (
          'Find me a provider'
        )}
      </button>

      <ul className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[11px] text-gray-500 mt-3">
        {['Free, no obligation', 'Used by 2,456+ families', 'Encrypted & secure'].map((t) => (
          <li key={t} className="inline-flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-green-500" />
            {t}
          </li>
        ))}
      </ul>

      <p className="text-[11px] text-gray-400 mt-3 text-center">
        By continuing, you agree to our{' '}
        <a href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</a>.
      </p>
      <p className="text-xs text-gray-500 mt-4 text-center">
        Prefer to talk?{' '}
        <a href="tel:1300572464" className="text-primary font-medium hover:underline">
          Call 1300 572 464
        </a>
      </p>
    </div>
  );

  const successContent = success && (
    <div className="w-full text-center flex flex-col items-center justify-center flex-1 py-16">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-6 h-6 text-green-500" />
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold text-[#2D3748] mb-2">We'll be in touch</h2>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        Providers in your area will reach out shortly. Prefer to speak to someone now?
      </p>
      <a
        href="tel:1300572464"
        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary/60 rounded-md text-[#2D3748] font-medium hover:bg-primary/5 hover:border-primary transition-colors duration-200"
      >
        <Phone className="w-4 h-4" />
        Call 1300 572 464
      </a>
      <p className="text-xs text-gray-400 mt-3">Free call</p>
    </div>
  );

  const navBar = !success && (
    <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200 bg-white/80 shrink-0">
      <button
        onClick={goBack}
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
        style={{ visibility: stepIndex === 0 ? 'hidden' : 'visible' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
      <a
        href="tel:1300572464"
        className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors"
      >
        <Phone className="w-3 h-3" />
        Prefer to call?{' '}
        <span className="font-medium text-gray-600">1300 572 464</span>
      </a>
    </div>
  );

  // ─── Inline mode (for dedicated referral page) ───────────────────────────────
  if (inline) {
    return (
      <div className="flex flex-col min-h-[600px]">
        <h2 className="sr-only">Get matched with care providers</h2>

        {/* Progress bar */}
        <div className="h-1 bg-gray-200 shrink-0">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 w-full max-w-2xl mx-auto flex flex-col px-6 sm:px-8 pt-12 pb-8 overflow-y-auto">
          {questionContent}
          {contactContent}
          {successContent}
        </div>

        {navBar}
      </div>
    );
  }

  // ─── Modal overlay mode ──────────────────────────────────────────────────────
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="questionnaire-heading"
      className="fixed inset-0 z-[100] flex items-start justify-start"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} aria-hidden="true" />

      {/* Modal box */}
      <div className="relative z-10 w-screen h-screen flex flex-col bg-white overflow-hidden">
        <h2 id="questionnaire-heading" className="sr-only">Get matched with care providers</h2>

        {/* Progress bar */}
        <div className="h-1 bg-gray-200 shrink-0">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 sm:right-6 top-4 sm:top-6 z-20 h-10 w-10 inline-flex items-center justify-center rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="relative z-10 flex-1 w-full max-w-2xl mx-auto flex flex-col px-6 sm:px-8 pt-12 sm:pt-20 pb-32 overflow-y-auto">
          {questionContent}
          {contactContent}
          {successContent}
        </div>

        {/* Bottom nav */}
        <div className="relative z-10 shrink-0 border-t border-gray-200 bg-white/80">
          {navBar}
        </div>
      </div>
    </div>
  );
}
