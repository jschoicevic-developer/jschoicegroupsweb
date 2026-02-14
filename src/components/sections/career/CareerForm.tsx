"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

const CareerForm = () => {
    return (
        <section className="py-20 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-gray-100"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-[#2D3748] mb-4 uppercase tracking-tight">
                            Apply For <span className="text-primary">a Position</span>
                        </h2>
                        <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div className="space-y-2">
                                <Input
                                    placeholder="First Name"
                                    className="h-14 px-6 rounded-2xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary transition-all text-base font-medium placeholder:text-gray-400"
                                />
                            </div>

                            {/* Last Name */}
                            <div className="space-y-2">
                                <Input
                                    placeholder="Last Name"
                                    className="h-14 px-6 rounded-2xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary transition-all text-base font-medium placeholder:text-gray-400"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <Input
                                    placeholder="Phone"
                                    type="tel"
                                    className="h-14 px-6 rounded-2xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary transition-all text-base font-medium placeholder:text-gray-400"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    className="h-14 px-6 rounded-2xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary transition-all text-base font-medium placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Application For */}
                        <div className="space-y-2">
                            <Input
                                placeholder="Application For"
                                className="h-14 px-6 rounded-2xl bg-gray-50 border-gray-200 focus:bg-white focus:border-primary transition-all text-base font-medium placeholder:text-gray-400"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            {/* File Upload */}
                            <div className="space-y-3">
                                <Label className="text-base font-black text-[#2D3748] uppercase tracking-wide">Upload Your CV</Label>
                                <div className="relative group cursor-pointer">
                                    <Input
                                        type="file"
                                        accept=".doc,.docx,.pdf"
                                        className="h-14 pt-3 pl-4 pr-12 rounded-2xl bg-gray-50 border-gray-200 file:bg-primary/10 file:text-primary file:border-0 file:rounded-lg file:mr-4 file:px-4 file:font-semibold text-sm text-gray-400 cursor-pointer"
                                    />
                                    <Upload className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-primary transition-colors" size={20} />
                                </div>
                            </div>

                            {/* Gender Select */}
                            <div className="space-y-3">
                                <Label className="text-base font-black text-[#2D3748] uppercase tracking-wide">Select Gender</Label>
                                <Select>
                                    <SelectTrigger className="h-14 px-6 rounded-2xl bg-gray-50 border-gray-200 focus:ring-primary focus:border-primary font-medium text-gray-600">
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-8 text-center">
                            <Button className="h-16 px-12 rounded-full bg-primary hover:brightness-110 text-[#1A202C] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full md:w-auto">
                                Submit Now
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default CareerForm;
