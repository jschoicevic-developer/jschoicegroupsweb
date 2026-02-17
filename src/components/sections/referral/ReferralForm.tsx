"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Define form data structure
interface FormData {
    referrerType: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    address: string;
    phone: string;
    email: string;
    ndisNumber: string;
    hasGuardian: string;
    countryOfBirth: string;
    requireInterpreter: string;
    culturalConsiderations: string;
    isIndigenous: string;
    primaryService: string;
    serviceHours: string;
    secondaryService: string;
    additionalService: string;
    disabilityConditions: string;
    extraInfo: string;
    specialAssessments: string;
    practitionerNotes: string;
    consultationTypes: string[];
    contactPerson: string;
    receptionNotes: string;
    ndisPlanType: string;
}

const steps = [
    { id: 1, title: "Getting Started", description: "Referrer Information" },
    { id: 2, title: "Participant", description: "Personal Details" },
    { id: 3, title: "Cultural", description: "Background & Needs" },
    { id: 4, title: "Services", description: "Requested Support" },
    { id: 5, title: "Booking", description: "Preferences" },
    { id: 6, title: "NDIS Info", description: "Plan Details" },
    { id: 7, title: "Review", description: "Summary & Submit" }
];

// --- Sub-components for each step ---

const Step1GettingStarted = ({ formData, handleChange }: { formData: FormData, handleChange: (f: keyof FormData, v: string) => void }) => (
    <div className="space-y-6">
        <div className="space-y-3">
            <Label className="text-lg font-bold text-gray-700">I am completing this for</Label>
            <RadioGroup
                value={formData.referrerType}
                onValueChange={(val) => handleChange('referrerType', val)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div className={`flex items-center space-x-3 border-2 rounded-2xl p-6 cursor-pointer transition-all hover:border-primary/50 ${formData.referrerType === 'myself' ? 'border-primary bg-primary/5' : 'border-gray-100'}`}>
                    <RadioGroupItem value="myself" id="myself" />
                    <Label htmlFor="myself" className="font-bold cursor-pointer text-lg">Myself (Participant)</Label>
                </div>
                <div className={`flex items-center space-x-3 border-2 rounded-2xl p-6 cursor-pointer transition-all hover:border-primary/50 ${formData.referrerType === 'client' ? 'border-primary bg-primary/5' : 'border-gray-100'}`}>
                    <RadioGroupItem value="client" id="client" />
                    <Label htmlFor="client" className="font-bold cursor-pointer text-lg">Someone else (Client)</Label>
                </div>
            </RadioGroup>
        </div>
    </div>
);

const Step2ParticipantDetails = ({ formData, handleChange }: { formData: FormData, handleChange: (f: keyof FormData, v: string) => void }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">First Name *</Label>
            <Input required className="h-14 bg-gray-50 border-gray-200 rounded-xl focus:ring-primary" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
        </div>
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">Last Name *</Label>
            <Input required className="h-14 bg-gray-50 border-gray-200 rounded-xl focus:ring-primary" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
        </div>
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">Year of Birth</Label>
            <Select value={formData.dob} onValueChange={(val) => handleChange('dob', val)}>
                <SelectTrigger className="h-14 bg-gray-50 border-gray-200 rounded-xl">
                    <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                    {Array.from({ length: 110 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">Gender</Label>
            <Select value={formData.gender} onValueChange={(val) => handleChange('gender', val)}>
                <SelectTrigger className="h-14 bg-gray-50 border-gray-200 rounded-xl">
                    <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-3 col-span-full">
            <Label className="font-bold text-gray-700">Home Address</Label>
            <Input className="h-14 bg-gray-50 border-gray-200 rounded-xl" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} />
        </div>
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">Phone Number *</Label>
            <Input required type="tel" className="h-14 bg-gray-50 border-gray-200 rounded-xl" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
        </div>
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">Email Address *</Label>
            <Input required type="email" className="h-14 bg-gray-50 border-gray-200 rounded-xl" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
        </div>
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">NDIS Number</Label>
            <Input className="h-14 bg-gray-50 border-gray-200 rounded-xl" value={formData.ndisNumber} onChange={(e) => handleChange('ndisNumber', e.target.value)} />
        </div>
        <div className="space-y-3 col-span-full">
            <Label className="font-bold text-gray-700 mb-2 block">Is there a Legal Guardian / Nominee?</Label>
            <RadioGroup value={formData.hasGuardian} onValueChange={(val) => handleChange('hasGuardian', val)} className="flex gap-6">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="guardian-yes" />
                    <Label htmlFor="guardian-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="guardian-no" />
                    <Label htmlFor="guardian-no">No</Label>
                </div>
            </RadioGroup>
        </div>
    </div>
);

const Step3CulturalDetails = ({ formData, handleChange }: { formData: FormData, handleChange: (f: keyof FormData, v: string) => void }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">Country Of Birth</Label>
            <Input className="h-14 bg-gray-50 border-gray-200 rounded-xl" value={formData.countryOfBirth} onChange={(e) => handleChange('countryOfBirth', e.target.value)} />
        </div>
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">Interpreter Required?</Label>
            <Select value={formData.requireInterpreter} onValueChange={(val) => handleChange('requireInterpreter', val)}>
                <SelectTrigger className="h-14 bg-gray-50 border-gray-200 rounded-xl">
                    <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-3 col-span-full">
            <Label className="font-bold text-gray-700">Cultural / Religious Considerations</Label>
            <Input className="h-14 bg-gray-50 border-gray-200 rounded-xl" value={formData.culturalConsiderations} onChange={(e) => handleChange('culturalConsiderations', e.target.value)} />
        </div>
        <div className="space-y-3 col-span-full">
            <Label className="font-bold text-gray-700 mb-2 block">Identifies as Aboriginal or Torres Strait Islander?</Label>
            <RadioGroup value={formData.isIndigenous} onValueChange={(val) => handleChange('isIndigenous', val)} className="flex gap-6">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="indigenous-yes" />
                    <Label htmlFor="indigenous-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="indigenous-no" />
                    <Label htmlFor="indigenous-no">No</Label>
                </div>
            </RadioGroup>
        </div>
    </div>
);

const Step4ServicesRequest = ({ formData, handleChange }: { formData: FormData, handleChange: (f: keyof FormData, v: string) => void }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">Primary Service Required</Label>
            <Select value={formData.primaryService} onValueChange={(val) => handleChange('primaryService', val)}>
                <SelectTrigger className="h-14 bg-gray-50 border-gray-200 rounded-xl">
                    <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="daily-life">Assistance with daily life</SelectItem>
                    <SelectItem value="accommodation">Finding an accommodation/tenancy</SelectItem>
                    <SelectItem value="respite">Emergency respite</SelectItem>
                    <SelectItem value="nursing">Assistance with nursing care</SelectItem>
                    <SelectItem value="transport">Support for transportation</SelectItem>
                    <SelectItem value="community">Access to community activities</SelectItem>
                    <SelectItem value="innovative">Innovative community</SelectItem>
                    <SelectItem value="coordination">Support coordination</SelectItem>
                    <SelectItem value="access">NDIS access requests</SelectItem>
                    <SelectItem value="allied">Allied health assistant</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">Weekly Hours Requested</Label>
            <Input className="h-14 bg-gray-50 border-gray-200 rounded-xl" value={formData.serviceHours} onChange={(e) => handleChange('serviceHours', e.target.value)} />
        </div>
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">Secondary Service (Optional)</Label>
            <Select value={formData.secondaryService} onValueChange={(val) => handleChange('secondaryService', val)}>
                <SelectTrigger className="h-14 bg-gray-50 border-gray-200 rounded-xl">
                    <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="daily-life">Assistance with daily life</SelectItem>
                    <SelectItem value="accommodation">Finding an accommodation/tenancy</SelectItem>
                    <SelectItem value="respite">Emergency respite</SelectItem>
                    <SelectItem value="nursing">Assistance with nursing care</SelectItem>
                    <SelectItem value="transport">Support for transportation</SelectItem>
                    <SelectItem value="community">Access to community activities</SelectItem>
                    <SelectItem value="innovative">Innovative community</SelectItem>
                    <SelectItem value="coordination">Support coordination</SelectItem>
                    <SelectItem value="access">NDIS access requests</SelectItem>
                    <SelectItem value="allied">Allied health assistant</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-3 col-span-full">
            <Label className="font-bold text-gray-700">Relevant Conditions / Disability</Label>
            <Textarea className="min-h-[100px] bg-gray-50 border-gray-200 rounded-xl" value={formData.disabilityConditions} onChange={(e) => handleChange('disabilityConditions', e.target.value)} placeholder="Please list relevant conditions..." />
        </div>
        <div className="space-y-3 col-span-full">
            <Label className="font-bold text-gray-700">Extra Information for Initial Appointment</Label>
            <Textarea className="min-h-[100px] bg-gray-50 border-gray-200 rounded-xl" value={formData.extraInfo} onChange={(e) => handleChange('extraInfo', e.target.value)} />
        </div>
    </div>
);

const Step5BookingDetails = ({ formData, handleChange, handleCheckboxChange }: { formData: FormData, handleChange: (f: keyof FormData, v: string) => void, handleCheckboxChange: (v: string, c: boolean) => void }) => (
    <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
            <Label className="font-bold text-gray-700 block text-lg">Preferred Consultation Type(s)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["In Clinic", "In Home Service", "Telehealth", "Community"].map((type) => (
                    <div key={type} className={`flex items-center space-x-3 border-2 rounded-xl p-4 transition-all ${formData.consultationTypes.includes(type) ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}>
                        <Checkbox
                            id={type}
                            checked={formData.consultationTypes.includes(type)}
                            onCheckedChange={(checked) => handleCheckboxChange(type, checked === true)}
                        />
                        <Label htmlFor={type} className="font-medium cursor-pointer grow text-gray-700">{type}</Label>
                    </div>
                ))}
            </div>
        </div>
        <div className="space-y-3 mt-4">
            <Label className="font-bold text-gray-700">Who Should We Contact To Make An Appointment?</Label>
            <Select value={formData.contactPerson} onValueChange={(val) => handleChange('contactPerson', val)}>
                <SelectTrigger className="h-14 bg-gray-50 border-gray-200 rounded-xl">
                    <SelectValue placeholder="Select Contact Person" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="participant">Participant/ Nominee</SelectItem>
                    <SelectItem value="coordinator">Support Coordinator</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">Notes For Reception Staff</Label>
            <Textarea className="min-h-[120px] bg-gray-50 border-gray-200 rounded-xl" value={formData.receptionNotes} onChange={(e) => handleChange('receptionNotes', e.target.value)} />
        </div>
    </div>
);

const Step6NDISInfo = ({ formData, handleChange }: { formData: FormData, handleChange: (f: keyof FormData, v: string) => void }) => (
    <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3">
            <Label className="font-bold text-gray-700">Participant’s NDIS Plan Type</Label>
            <Select value={formData.ndisPlanType} onValueChange={(val) => handleChange('ndisPlanType', val)}>
                <SelectTrigger className="h-14 bg-gray-50 border-gray-200 rounded-xl">
                    <SelectValue placeholder="Select Plan Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ndia">NDIA Managed</SelectItem>
                    <SelectItem value="plan">Plan Managed</SelectItem>
                    <SelectItem value="self">Self/ Nominee-Managed</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
);

const Step7Review = ({ formData }: { formData: FormData }) => (
    <div className="space-y-6">
        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50 mt-4 space-y-3">
            <h4 className="font-bold text-blue-900 text-lg flex items-center gap-2">
                Review Your Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div className="bg-white/50 p-3 rounded-lg">
                    <span className="font-bold block text-blue-900/70 text-xs uppercase tracking-wider">Referrer</span>
                    {formData.referrerType === 'myself' ? 'Participant (Myself)' : 'Someone else (Client)'}
                </div>
                <div className="bg-white/50 p-3 rounded-lg">
                    <span className="font-bold block text-blue-900/70 text-xs uppercase tracking-wider">Name</span>
                    {formData.firstName} {formData.lastName}
                </div>
                <div className="bg-white/50 p-3 rounded-lg">
                    <span className="font-bold block text-blue-900/70 text-xs uppercase tracking-wider">Contact</span>
                    {formData.phone} <br /> {formData.email}
                </div>
                <div className="bg-white/50 p-3 rounded-lg">
                    <span className="font-bold block text-blue-900/70 text-xs uppercase tracking-wider">Primary Service</span>
                    {formData.primaryService || 'Not selected'}
                </div>
                <div className="bg-white/50 p-3 rounded-lg">
                    <span className="font-bold block text-blue-900/70 text-xs uppercase tracking-wider">Year of Birth</span>
                    {formData.dob || 'Not provided'}
                </div>
                <div className="bg-white/50 p-3 rounded-lg">
                    <span className="font-bold block text-blue-900/70 text-xs uppercase tracking-wider">NDIS Plan Type</span>
                    {formData.ndisPlanType || 'Not selected'}
                </div>
            </div>
            <p className="text-xs text-blue-600/80 mt-2 pt-2 border-t border-blue-200/50">
                By submitting this form, you agree to our privacy policy and consent to be contacted regarding this referral.
            </p>
        </div>
    </div>
);

const ReferralForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formTopRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<FormData>({
        referrerType: "",
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        address: "",
        phone: "",
        email: "",
        ndisNumber: "",
        hasGuardian: "no",
        countryOfBirth: "",
        requireInterpreter: "",
        culturalConsiderations: "",
        isIndigenous: "",
        primaryService: "",
        serviceHours: "",
        secondaryService: "",
        additionalService: "",
        disabilityConditions: "",
        extraInfo: "",
        specialAssessments: "",
        practitionerNotes: "",
        consultationTypes: [],
        contactPerson: "",
        receptionNotes: "",
        ndisPlanType: "",
    });

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (value: string, checked: boolean) => {
        setFormData(prev => {
            if (checked) {
                return { ...prev, consultationTypes: [...prev.consultationTypes, value] };
            } else {
                return { ...prev, consultationTypes: prev.consultationTypes.filter(t => t !== value) };
            }
        });
    };

    const validateStep = (step: number) => {
        setError(null);
        switch (step) {
            case 1:
                if (!formData.referrerType) return "Please select who you are completing this form for.";
                break;
            case 2:
                if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
                    return "Please fill in all required fields (Name, Email, Phone).";
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    return "Please enter a valid email address.";
                }
                const phoneRegex = /^\+?[\d\s-]{8,}$/;
                if (!phoneRegex.test(formData.phone)) {
                    return "Please enter a valid phone number (at least 8 digits).";
                }
                break;
            case 4:
                if (!formData.primaryService) return "Please select a Primary Service.";
                break;
            // Add more specific validation for other steps if needed
        }
        return null;
    };

    const nextStep = () => {
        const errorMsg = validateStep(currentStep);
        if (errorMsg) {
            setError(errorMsg);
            formTopRef.current?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        setCurrentStep(prev => Math.min(prev + 1, steps.length));
        formTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const prevStep = () => {
        setError(null);
        setCurrentStep(prev => Math.max(prev - 1, 1));
        formTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent accidental submission if not on the final step
        if (currentStep !== steps.length) return;

        setLoading(true);
        setError(null);

        try {
            const body = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                location: formData.address,
                ndis_number: formData.ndisNumber,
                source: "referral",
                source_page: "/consultations",
                message: `Consultations Submission from ${formData.firstName} ${formData.lastName} (${formData.referrerType})`,
                source_details: {
                    ...formData,
                    // Remove redundant fields that are already top-level columns
                    firstName: undefined,
                    lastName: undefined,
                    email: undefined,
                    phone: undefined,
                    address: undefined,
                    ndisNumber: undefined
                }
            };

            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit referral');
            }

            setSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Reset Form
    const resetForm = () => {
        setSuccess(false);
        setCurrentStep(1);
        setFormData({
            referrerType: "",
            firstName: "",
            lastName: "",
            dob: "",
            gender: "",
            address: "",
            phone: "",
            email: "",
            ndisNumber: "",
            hasGuardian: "no",
            countryOfBirth: "",
            requireInterpreter: "",
            culturalConsiderations: "",
            isIndigenous: "",
            primaryService: "",
            serviceHours: "",
            secondaryService: "",
            additionalService: "",
            disabilityConditions: "",
            extraInfo: "",
            specialAssessments: "",
            practitionerNotes: "",
            consultationTypes: [],
            contactPerson: "",
            receptionNotes: "",
            ndisPlanType: "",
        });
    };

    if (success) {
        return (
            <section className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg w-full"
                >
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Consultations Received!</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Thank you for submitting a referral. Our team has received your details and will be in touch shortly to discuss the next steps.
                    </p>
                    <Button onClick={resetForm} className="w-full h-12 text-lg rounded-xl">
                        Submit Another Referral
                    </Button>
                </motion.div>
            </section>
        );
    }

    const progressValue = (currentStep / steps.length) * 100;

    return (
        <section className="py-12 md:py-20 bg-gray-50/50 min-h-screen">
            <div ref={formTopRef} className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">

                {/* Progress Bar */}
                <div className="mb-8 md:mb-12">
                    <Progress value={progressValue} className="h-3 bg-gray-200 rounded-full" indicatorClassName="bg-primary transition-all duration-500 ease-out rounded-full" />
                </div>

                <div className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative min-h-[500px]">

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl font-medium mb-8 flex items-center gap-3"
                        >
                            <span>⚠️</span> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                {/* HEADER FOR STEP */}
                                <div className="space-y-2 mb-8">
                                    <h2 className="text-3xl md:text-4xl font-black text-[#2D3748]">
                                        {steps[currentStep - 1].title}
                                    </h2>
                                    <p className="text-lg text-gray-500 font-medium">
                                        {steps[currentStep - 1].description}
                                    </p>
                                </div>

                                {currentStep === 1 && <Step1GettingStarted formData={formData} handleChange={handleChange} />}
                                {currentStep === 2 && <Step2ParticipantDetails formData={formData} handleChange={handleChange} />}
                                {currentStep === 3 && <Step3CulturalDetails formData={formData} handleChange={handleChange} />}
                                {currentStep === 4 && <Step4ServicesRequest formData={formData} handleChange={handleChange} />}
                                {currentStep === 5 && <Step5BookingDetails formData={formData} handleChange={handleChange} handleCheckboxChange={handleCheckboxChange} />}
                                {currentStep === 6 && <Step6NDISInfo formData={formData} handleChange={handleChange} />}
                                {currentStep === 7 && <Step7Review formData={formData} />}

                            </motion.div>
                        </AnimatePresence>

                        {/* NAVIGATION BUTTONS */}
                        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                disabled={currentStep === 1 || loading}
                                className="h-12 px-6 rounded-xl border-2 text-gray-600 font-bold hover:bg-gray-50"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                            </Button>

                            {currentStep < steps.length ? (
                                <Button
                                    key="next-btn"
                                    type="button"
                                    onClick={nextStep}
                                    className="h-12 px-8 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                >
                                    Next Step <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button
                                    key="submit-btn"
                                    disabled={loading}
                                    type="submit"
                                    className="h-14 px-10 rounded-xl bg-primary hover:brightness-110 text-[#1A202C] font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 min-w-[200px]"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin mr-2" /> Processing
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ReferralForm;
