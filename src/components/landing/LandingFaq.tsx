"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is NDIS Support Coordination?",
    answer:
      "Support Coordination helps you understand and use your NDIS plan effectively. Your support coordinator connects you with the right providers, helps resolve issues, and ensures you're getting the most from your funding. At JS Choice Group, our experienced NDIS support coordinators in Melbourne guide you through every step — from plan activation to provider connections — so you never feel lost in the system. We also offer Specialist Support Coordination for participants with more complex needs.",
  },
  {
    question: "How do I get a referral to JS Choice?",
    answer:
      "It's simple. Fill out the referral form on this page with your name, phone, and email — it takes less than 60 seconds. Our team will contact you within 24 hours to discuss your needs and start the process. You can also call us directly at 1300 572 464. Whether you're referring yourself or a loved one, we'll handle the rest.",
  },
  {
    question: "Do you provide NDIS support in my area?",
    answer:
      "Yes! JS Choice Group provides NDIS disability support services across Melbourne and regional Victoria, including Point Cook, Tarneit, Werribee, Hoppers Crossing, Truganina, Craigieburn, Williams Landing, Laverton, Altona, Footscray, Epping, Geelong, South Morang, Lara, and Shepparton. If you're not sure whether we cover your area, get in touch and we'll confirm.",
  },
  {
    question: "Can I change my NDIS support coordinator?",
    answer:
      "Absolutely. You have the right to change your support coordinator at any time — it's your choice, and it's built into the NDIS. If your current provider isn't meeting your needs, we can help make the switch smooth and stress-free. Many of our participants came to JS Choice after feeling unheard elsewhere, and they tell us the difference is night and day.",
  },
  {
    question: "What does Assistance with Daily Life include?",
    answer:
      "Assistance with Daily Life covers support for everyday activities such as personal care (bathing, grooming, dressing), meal preparation, household tasks, medication management, and community access. At JS Choice, our NDIS personal care assistance in Melbourne is tailored to your routine — we work around your life, not the other way around. Our team provides compassionate, respectful support that prioritises your independence and dignity.",
  },
];

export default function LandingFaq() {
  return (
    <section className="py-16 sm:py-24 px-4 bg-[#F7FAFC]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-foreground font-heading mb-4">
            Common Questions About NDIS Support in Melbourne
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 overflow-hidden"
            >
              <AccordionTrigger className="text-left font-bold text-foreground text-base sm:text-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <p className="mb-4">{faq.answer}</p>
                <a
                  href="#lead-form"
                  className="inline-block text-primary font-semibold hover:underline"
                >
                  Request a free referral today →
                </a>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
