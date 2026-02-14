"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Toggle Button */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-6 right-6 z-[9990]"
            >
                <div className="relative group">
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#F1ABAB] rotate-90' : 'bg-[#5A67D8] hover:scale-110'} text-white overflow-hidden`}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}

                        {/* Shimmer Effect */}
                        {!isOpen && (
                            <div className="absolute inset-0 bg-white/20 skew-x-12 translate-x-[-150%] group-hover:animate-shine" />
                        )}
                    </Button>

                    {/* Pulse Rings */}
                    {!isOpen && (
                        <>
                            <span className="absolute inset-0 rounded-full border border-[#5A67D8] animate-ping opacity-75" />
                            <span className="absolute -inset-1 rounded-full border border-[#5A67D8]/50 animate-pulse delay-75" />
                        </>
                    )}
                </div>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-24 right-6 w-[90vw] max-w-[380px] h-[550px] bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[9998] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#5A67D8] to-[#9FA8DA] p-4 flex items-center gap-3 relative overflow-hidden">
                            <div className="relative z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="relative z-10 text-white">
                                <h3 className="font-bold text-lg leading-none">JS Assistant</h3>
                                <p className="text-xs text-white/80 mt-1 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                    Online Now
                                </p>
                            </div>
                            {/* Decorative Particles */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#F1ABAB]/30 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
                        </div>

                        {/* Chat Area */}
                        <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50 relative">
                            {/* Welcome Message */}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex gap-3 max-w-[85%]"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5A67D8] to-[#9FA8DA] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                                    JS
                                </div>
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-sm text-gray-700">
                                    Hello! 👋 Welcome to JS Choice Group. How can we verify or assist you today?
                                </div>
                            </motion.div>

                            {/* Floating Particles in Background */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            y: [0, -20, 0],
                                            x: [0, Math.random() * 10 - 5, 0],
                                            opacity: [0.3, 0.6, 0.3],
                                        }}
                                        transition={{
                                            duration: 3 + Math.random() * 2,
                                            repeat: Infinity,
                                            delay: Math.random(),
                                        }}
                                        className="absolute w-2 h-2 rounded-full bg-[#5A67D8]/10"
                                        style={{
                                            top: `${Math.random() * 80 + 10}%`,
                                            left: `${Math.random() * 80 + 10}%`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/80 border-t border-gray-100 backdrop-blur-sm">
                            <div className="flex gap-2 relative">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="w-full pl-4 pr-12 py-3 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A67D8]/50 transition-all border border-transparent focus:bg-white"
                                />
                                <button className="absolute right-1 top-1 w-10 h-10 bg-[#5A67D8] rounded-full flex items-center justify-center text-white hover:bg-[#4C51BF] transition-colors shadow-md">
                                    <Send className="w-4 h-4 ml-0.5" />
                                </button>
                            </div>
                            <div className="mt-2 flex justify-center">
                                <span className="text-[10px] text-gray-400">Powered by JS Choice AI</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
