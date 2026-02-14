'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, MapPin, Heart, Users, CheckCircle } from 'lucide-react';
import LeadCaptureForm from './LeadCaptureForm';
import type { ServiceMatcherAnswers, JsChoiceService } from '@/types/ndis';
import { MELBOURNE_AREAS } from '@/types/ndis';

const supportTypeOptions = [
  { id: 'daily-life', label: 'Daily Life Assistance', categories: [1, 15] },
  { id: 'nursing', label: 'Nursing Care', categories: [1, 12] },
  { id: 'transport', label: 'Transportation', categories: [2] },
  { id: 'community', label: 'Community Activities', categories: [4, 9] },
  { id: 'coordination', label: 'Support Coordination', categories: [7] },
  { id: 'allied-health', label: 'Allied Health', categories: [12, 15] },
  { id: 'accommodation', label: 'Accommodation', categories: [1, 8] },
  { id: 'advocacy', label: 'Advocacy Services', categories: [14] }
];

export default function ServiceMatcher() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<ServiceMatcherAnswers>({
    supportTypes: [],
    isNdisParticipant: false,
    melbourneArea: ''
  });
  const [showResults, setShowResults] = useState(false);
  const [matchedServices, setMatchedServices] = useState<JsChoiceService[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);

  const totalSteps = 4; // 3 questions + 1 form

  const toggleSupportType = (typeId: string) => {
    setAnswers(prev => ({
      ...prev,
      supportTypes: prev.supportTypes.includes(typeId)
        ? prev.supportTypes.filter(id => id !== typeId)
        : [...prev.supportTypes, typeId]
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFormSuccess = async () => {
    // Fetch matched services
    setLoadingServices(true);
    try {
      // Get category numbers from selected support types
      const categoryNumbers = answers.supportTypes.flatMap(typeId => {
        const option = supportTypeOptions.find(o => o.id === typeId);
        return option ? option.categories : [];
      });

      const uniqueCategories = [...new Set(categoryNumbers)];

      const response = await fetch(`/api/ndis/services?categories=${uniqueCategories.join(',')}`);
      const data = await response.json();

      setMatchedServices(data.services || []);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoadingServices(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return answers.supportTypes.length > 0;
      case 2:
        return true; // Yes/No always selected
      case 3:
        return answers.melbourneArea !== '';
      default:
        return true;
    }
  };

  if (showResults) {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-8">
        {/* Success Message */}
        <div className="relative bg-[#2D3748] rounded-[2.5rem] p-12 text-center shadow-2xl border border-gray-100 overflow-hidden text-white">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ABB3F1]/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F1ABAB]/10 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="relative z-10">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/20 animate-in fade-in zoom-in duration-500">
              <CheckCircle className="w-10 h-10 text-[#1A202C]" strokeWidth={3} />
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase text-white">
              Thank You!
            </h2>

            <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full" />

            <p className="text-xl text-gray-300 max-w-lg mx-auto leading-relaxed font-medium">
              We've received your information and our team will be in touch shortly to discuss your support needs.
            </p>
          </div>
        </div>

        {/* Matched Services */}
        <div className="bg-white rounded-[2rem] shadow-lg p-10 border border-gray-100">
          <h3 className="text-2xl font-black text-[#2D3748] mb-8 uppercase tracking-wide">Your Matched Services</h3>

          {matchedServices.length === 0 ? (
            <p className="text-gray-500 text-center py-12 font-medium">
              Loading your matched services...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedServices.map((service) => (
                <div
                  key={service.id}
                  className="p-8 bg-gray-50 border border-gray-200 rounded-[2rem] hover:border-primary hover:bg-white hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-4 text-primary font-bold text-xs uppercase tracking-wider">
                    <Check className="w-4 h-4" />
                    Recommended
                  </div>
                  <h4 className="text-xl font-bold text-[#2D3748] mb-3 group-hover:text-primary transition-colors">{service.name}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.short_description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-10 px-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Step {step} of {totalSteps}</span>
          <span className="text-xs font-bold text-primary">{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Cards */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden">

        {/* Step 1: Support Types */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#2D3748] uppercase tracking-tight mb-2">What support do you need?</h2>
                <p className="text-gray-500 font-medium text-lg">Select all that apply to get the best match</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supportTypeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleSupportType(option.id)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 border-2 group relative overflow-hidden ${answers.supportTypes.includes(option.id)
                    ? 'border-primary bg-primary/5 shadow-md scale-[1.02]'
                    : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200'
                    }`}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <span className={`font-bold transition-colors ${answers.supportTypes.includes(option.id) ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                      {option.label}
                    </span>
                    {answers.supportTypes.includes(option.id) ? (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-[#1A202C]" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-primary/50 transition-colors" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: NDIS Participant */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#2D3748] uppercase tracking-tight mb-2">Are you an NDIS participant?</h2>
                <p className="text-gray-500 font-medium text-lg">This helps us provide relevant pricing information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setAnswers(prev => ({ ...prev, isNdisParticipant: true }))}
                className={`p-8 rounded-[2rem] text-left transition-all duration-300 border-2 ${answers.isNdisParticipant
                  ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]'
                  : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200'
                  }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#2D3748] uppercase tracking-wide">Yes</span>
                  {answers.isNdisParticipant && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#1A202C]" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <p className="text-gray-500 font-medium">I have an active NDIS plan</p>
              </button>

              <button
                onClick={() => setAnswers(prev => ({ ...prev, isNdisParticipant: false }))}
                className={`p-8 rounded-[2rem] text-left transition-all duration-300 border-2 ${!answers.isNdisParticipant
                  ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]'
                  : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200'
                  }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#2D3748] uppercase tracking-wide">No</span>
                  {!answers.isNdisParticipant && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#1A202C]" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <p className="text-gray-500 font-medium">I'm exploring NDIS services</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Melbourne Area */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#2D3748] uppercase tracking-tight mb-2">Which area are you in?</h2>
                <p className="text-gray-500 font-medium text-lg">Select your Melbourne area</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {MELBOURNE_AREAS.map((area) => (
                <button
                  key={area.name}
                  onClick={() => setAnswers(prev => ({ ...prev, melbourneArea: area.name }))}
                  className={`w-full p-5 rounded-2xl text-left transition-all duration-300 border-2 group ${answers.melbourneArea === area.name
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200'
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-exrabold text-lg text-[#2D3748]">{area.name}</span>
                    {answers.melbourneArea === area.name ? (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-[#1A202C]" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-primary/50 transition-colors" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">{area.suburbs.join(', ')}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Lead Capture Form */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <LeadCaptureForm
              source="Service Matcher"
              sourcePage="/tools/service-matcher"
              interestedServices={answers.supportTypes}
              ndisParticipant={answers.isNdisParticipant}
              location={answers.melbourneArea}
              onSuccess={handleFormSuccess}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex gap-4 mt-10 pt-8 border-t border-gray-100">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-8 py-4 border-2 border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary text-[#1A202C] font-black uppercase tracking-wider text-sm rounded-xl hover:shadow-xl hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {step === 3 ? 'Continue to Details' : 'Next Step'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
