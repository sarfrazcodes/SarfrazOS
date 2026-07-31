"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What technologies do you primarily work with?",
    answer: "I specialize in modern web technologies including Next.js (App Router), React, TypeScript, and Tailwind CSS on the frontend. For backend architectures, I frequently use Node.js, Firebase, Supabase, and integrate various AI endpoints like OpenAI and Anthropic."
  },
  {
    question: "Are you open to internships or full-time roles?",
    answer: "Yes! I am actively looking for opportunities where I can contribute to challenging engineering problems, learn from experienced teams, and help build scalable products."
  },
  {
    question: "Can we collaborate on Open Source projects?",
    answer: "Absolutely. I am a huge advocate for open source. If you have a project that needs contributors or if you want to collaborate on a new idea, drop me a message with the repository link."
  },
  {
    question: "Are you available for freelance work?",
    answer: "I take on select freelance projects depending on my current bandwidth. I prioritize projects that are design-heavy, require complex frontend architectures, or involve AI integrations."
  },
  {
    question: "How quickly do you usually respond?",
    answer: "I check my messages daily and aim to respond to all inquiries within 24 to 48 hours. For urgent matters, reaching out via LinkedIn might yield a faster response."
  }
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-24 z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
        
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium">
            Everything you need to know before we start talking.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-black/5 dark:shadow-none"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? "text-brand-blue" : "text-zinc-900 dark:text-white group-hover:text-brand-blue"}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${openIndex === index ? "border-brand-blue text-brand-blue bg-brand-blue/10 rotate-180" : "border-black/10 dark:border-white/20 text-zinc-500 dark:text-white/50 group-hover:border-brand-blue group-hover:text-brand-blue"}`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
