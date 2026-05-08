
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, X, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Lead {
    id: string;
    first_name: string;
    last_name: string | null;
    email: string | null;
}

interface CommunicationPanelProps {
    lead: Lead;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function CommunicationPanel({ lead, onClose, onSuccess }: CommunicationPanelProps) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSend = async () => {
        if (!subject || !message) {
            setError("Subject and message are required");
            return;
        }

        try {
            setIsSending(true);
            setError(null);

            const response = await fetch(`/api/leads/${lead.id}/email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subject,
                    message,
                    created_by_name: "Admin", // In a real app, this would come from the auth session
                }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSent(true);
                if (onSuccess) onSuccess();
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setError(result.error || "Failed to send email");
            }
        } catch (err) {
            console.error("Error sending email:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-6 p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Send Message</h3>
                            <p className="text-white/80 text-sm">To: {lead.first_name} {lead.last_name} ({lead.email})</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-8">
                    {isSent ? (
                        <div className="py-12 text-center space-y-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"
                            >
                                <CheckCircle2 size={40} />
                            </motion.div>
                            <h4 className="text-2xl font-bold text-gray-900">Email Sent!</h4>
                            <p className="text-gray-500">Your message has been delivered successfully.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                                <Input
                                    placeholder="Enquiry regarding your JS Choice application"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="h-12 rounded-2xl border-gray-200 focus:ring-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                                <Textarea
                                    placeholder="Write your message here..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="min-h-[200px] rounded-2xl border-gray-200 focus:ring-primary/20 p-4 resize-none"
                                />
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <div className="flex gap-4 pt-2">
                                <Button
                                    onClick={onClose}
                                    variant="outline"
                                    className="flex-1 h-12 rounded-2xl border-gray-200"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSend}
                                    disabled={isSending || !subject || !message}
                                    className="flex-[2] h-12 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
                                >
                                    {isSending ? (
                                        <>
                                            <Loader2 size={18} className="mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} className="mr-2" />
                                            Send Email
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
