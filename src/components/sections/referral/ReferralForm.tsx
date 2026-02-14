"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CheckCircle2 } from "lucide-react";

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

const ReferralForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Required field validation (basic)
        if (!formData.firstName || !formData.email || !formData.phone) {
            setError("Please fill in all required fields (Name, Email, Phone).");
            setLoading(false);
            return;
        }

        try {
            const body = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                location: formData.address, // Use address as location
                ndis_number: formData.ndisNumber, // Populate dedicated column if available
                source: "referral",
                source_page: "/referral",
                message: `Referral Submission from ${formData.firstName} ${formData.lastName}`,
                // Map all extended details to source_details JSON
                source_details: {
                    ...formData,
                    // Remove redundant fields that are already top-level
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
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
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
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Referral Received!</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Thank you for submitting a referral. Our team has received your details and will be in touch shortly to discuss the next steps.
                    </p>
                    <Button onClick={() => setSuccess(false)} className="w-full h-12 text-lg rounded-xl">
                        Submit Another Referral
                    </Button>
                </motion.div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="space-y-10">

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl font-medium animate-pulse">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Section 1: Ready To Get Started? */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-lg border border-gray-100">
                        <div className="mb-8 border-b border-gray-100 pb-4">
                            <h2 className="text-2xl md:text-3xl font-black text-[#2D3748] uppercase tracking-wide">
                                Ready To <span className="text-primary">Get Started?</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">I am completing this for</Label>
                                <Select value={formData.referrerType} onValueChange={(val) => handleChange('referrerType', val)}>
                                    <SelectTrigger className="h-14 bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Please Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="myself">Myself as the participant</SelectItem>
                                        <SelectItem value="client">Someone I am referring to Js Choice Group</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Participant Details */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-lg border border-gray-100">
                        <div className="mb-8 border-b border-gray-100 pb-4">
                            <h2 className="text-2xl md:text-3xl font-black text-[#2D3748] uppercase tracking-wide">
                                Participant <span className="text-secondary">Details</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">First Name *</Label>
                                <Input required className="h-14 bg-gray-50 border-gray-200" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Last Name *</Label>
                                <Input required className="h-14 bg-gray-50 border-gray-200" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Date of Birth</Label>
                                <Input type="date" className="h-14 bg-gray-50 border-gray-200" value={formData.dob} onChange={(e) => handleChange('dob', e.target.value)} />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Gender</Label>
                                <Select value={formData.gender} onValueChange={(val) => handleChange('gender', val)}>
                                    <SelectTrigger className="h-14 bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Please Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Home Address</Label>
                                <Input className="h-14 bg-gray-50 border-gray-200" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Participant Phone Number *</Label>
                                <Input required type="tel" className="h-14 bg-gray-50 border-gray-200" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Participant Email Address *</Label>
                                <Input required type="email" className="h-14 bg-gray-50 border-gray-200" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Participant NDIS Number</Label>
                                <Input className="h-14 bg-gray-50 border-gray-200" value={formData.ndisNumber} onChange={(e) => handleChange('ndisNumber', e.target.value)} />
                            </div>
                            <div className="space-y-3 col-span-full md:col-span-1">
                                <Label className="text-base font-bold text-gray-700 block mb-3">Does The Participant Have A Legal Guardian / Nominee?</Label>
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
                    </div>

                    {/* Section 3: Cultural Details */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-lg border border-gray-100">
                        <div className="mb-8 border-b border-gray-100 pb-4">
                            <h2 className="text-2xl md:text-3xl font-black text-[#2D3748] uppercase tracking-wide">
                                Cultural <span className="text-primary">Details</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Participant Country Of Birth</Label>
                                <Input className="h-14 bg-gray-50 border-gray-200" value={formData.countryOfBirth} onChange={(e) => handleChange('countryOfBirth', e.target.value)} />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Does The Participant Require An Interpreter?</Label>
                                <Select value={formData.requireInterpreter} onValueChange={(val) => handleChange('requireInterpreter', val)}>
                                    <SelectTrigger className="h-14 bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Please Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Relevant Culture Or Religious Considerations (If Any)?</Label>
                                <Input className="h-14 bg-gray-50 border-gray-200" value={formData.culturalConsiderations} onChange={(e) => handleChange('culturalConsiderations', e.target.value)} />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Does The Listed Participant Identify As An Aboriginal Or Torres Strait Islander?</Label>
                                <Select value={formData.isIndigenous} onValueChange={(val) => handleChange('isIndigenous', val)}>
                                    <SelectTrigger className="h-14 bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Please Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Services Request */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-lg border border-gray-100">
                        <div className="mb-8 border-b border-gray-100 pb-4">
                            <h2 className="text-2xl md:text-3xl font-black text-[#2D3748] uppercase tracking-wide">
                                Services <span className="text-secondary">Request</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Type Of Primary Service Required:</Label>
                                <Select value={formData.primaryService} onValueChange={(val) => handleChange('primaryService', val)}>
                                    <SelectTrigger className="h-14 bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Please Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily-life">Assistance with daily life</SelectItem>
                                        <SelectItem value="accommodation">Finding an accommodation/tenancy</SelectItem>
                                        <SelectItem value="respite">Emergency respite</SelectItem>
                                        <SelectItem value="nursing">Assistance with nursing care</SelectItem>
                                        <SelectItem value="transport">Support for transportation</SelectItem>
                                        <SelectItem value="community">Access to community activities</SelectItem>
                                        <SelectItem value="innovative">Innovative community</SelectItem>
                                        <SelectItem value="coordination">Support coordination and psychological recovery coaching</SelectItem>
                                        <SelectItem value="access">NDIS access requests</SelectItem>
                                        <SelectItem value="allied">Allied health assistant or Habit coach</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Number Of Hours Requested For Service:</Label>
                                <Input className="h-14 bg-gray-50 border-gray-200" value={formData.serviceHours} onChange={(e) => handleChange('serviceHours', e.target.value)} />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Type Of Secondary Service Required:</Label>
                                <Select value={formData.secondaryService} onValueChange={(val) => handleChange('secondaryService', val)}>
                                    <SelectTrigger className="h-14 bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Please Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily-life">Assistance with daily life</SelectItem>
                                        <SelectItem value="accommodation">Finding an accommodation/tenancy</SelectItem>
                                        <SelectItem value="respite">Emergency respite</SelectItem>
                                        <SelectItem value="nursing">Assistance with nursing care</SelectItem>
                                        <SelectItem value="transport">Support for transportation</SelectItem>
                                        <SelectItem value="community">Access to community activities</SelectItem>
                                        <SelectItem value="innovative">Innovative community</SelectItem>
                                        <SelectItem value="coordination">Support coordination and psychological recovery coaching</SelectItem>
                                        <SelectItem value="access">NDIS access requests</SelectItem>
                                        <SelectItem value="allied">Allied health assistant or Habit coach</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Additional Service Required:</Label>
                                <Select value={formData.additionalService} onValueChange={(val) => handleChange('additionalService', val)}>
                                    <SelectTrigger className="h-14 bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Please Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily-life">Assistance with daily life</SelectItem>
                                        <SelectItem value="accommodation">Finding an accommodation/tenancy</SelectItem>
                                        <SelectItem value="respite">Emergency respite</SelectItem>
                                        <SelectItem value="nursing">Assistance with nursing care</SelectItem>
                                        <SelectItem value="transport">Support for transportation</SelectItem>
                                        <SelectItem value="community">Access to community activities</SelectItem>
                                        <SelectItem value="innovative">Innovative community</SelectItem>
                                        <SelectItem value="coordination">Support coordination and psychological recovery coaching</SelectItem>
                                        <SelectItem value="access">NDIS access requests</SelectItem>
                                        <SelectItem value="allied">Allied health assistant or Habit coach</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3 col-span-full md:col-span-1">
                                <Label className="text-base font-bold text-gray-700">Participant's Relevant Conditions / Disability (Please List):</Label>
                                <Textarea className="min-h-[120px] bg-gray-50 border-gray-200" value={formData.disabilityConditions} onChange={(e) => handleChange('disabilityConditions', e.target.value)} />
                            </div>
                            <div className="space-y-3 col-span-full md:col-span-1">
                                <Label className="text-base font-bold text-gray-700">Extra Information That May Assist With Preparation For Initial Appointment:</Label>
                                <Textarea className="min-h-[120px] bg-gray-50 border-gray-200" value={formData.extraInfo} onChange={(e) => handleChange('extraInfo', e.target.value)} />
                            </div>
                            <div className="space-y-3 col-span-full md:col-span-1">
                                <Label className="text-base font-bold text-gray-700">Special Assessments Or Therapies Required:</Label>
                                <Textarea className="min-h-[120px] bg-gray-50 border-gray-200" value={formData.specialAssessments} onChange={(e) => handleChange('specialAssessments', e.target.value)} />
                            </div>
                            <div className="space-y-3 col-span-full md:col-span-1">
                                <Label className="text-base font-bold text-gray-700">Notes For Practitioners (Additional Relevant Details):</Label>
                                <Textarea className="min-h-[120px] bg-gray-50 border-gray-200" value={formData.practitionerNotes} onChange={(e) => handleChange('practitionerNotes', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Booking Details */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-lg border border-gray-100">
                        <div className="mb-8 border-b border-gray-100 pb-4">
                            <h2 className="text-2xl md:text-3xl font-black text-[#2D3748] uppercase tracking-wide">
                                Booking <span className="text-primary">Details</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <Label className="text-base font-bold text-gray-700 block">Preferred Consultation Type(s):</Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {["In Clinic", "In Home Service", "Telehealth", "Community"].map((type) => (
                                        <div key={type} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={type}
                                                checked={formData.consultationTypes.includes(type)}
                                                onCheckedChange={(checked) => handleCheckboxChange(type, checked === true)}
                                            />
                                            <Label htmlFor={type} className="font-medium">{type}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Who Should We Contact To Make An Appointment?</Label>
                                <Select value={formData.contactPerson} onValueChange={(val) => handleChange('contactPerson', val)}>
                                    <SelectTrigger className="h-14 bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Please Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="participant">Participant/ Nominee</SelectItem>
                                        <SelectItem value="coordinator">Support Coordinator</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3 col-span-full">
                                <Label className="text-base font-bold text-gray-700">Notes For Reception Staff (If Applicable):</Label>
                                <Textarea className="min-h-[120px] bg-gray-50 border-gray-200" value={formData.receptionNotes} onChange={(e) => handleChange('receptionNotes', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Section 6: NDIS Information */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-lg border border-gray-100">
                        <div className="mb-8 border-b border-gray-100 pb-4">
                            <h2 className="text-2xl md:text-3xl font-black text-[#2D3748] uppercase tracking-wide">
                                NDIS <span className="text-secondary">Information</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-3">
                                <Label className="text-base font-bold text-gray-700">Participant’s NDIS Plan Type</Label>
                                <Select value={formData.ndisPlanType} onValueChange={(val) => handleChange('ndisPlanType', val)}>
                                    <SelectTrigger className="h-14 bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Please Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ndia">NDIA Managed</SelectItem>
                                        <SelectItem value="plan">Plan Managed</SelectItem>
                                        <SelectItem value="self">Self/ Nominee-Managed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 text-center">
                        <Button
                            disabled={loading}
                            type="submit"
                            className="h-16 px-16 rounded-full bg-primary hover:brightness-110 text-[#1A202C] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" /> Submitting...
                                </>
                            ) : (
                                "Submit Referral"
                            )}
                        </Button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default ReferralForm;
