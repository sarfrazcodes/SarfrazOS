"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { ContactsRepository } from "@/firebase/repositories/contacts.repository";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    
    try {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const subject = formData.get("subject") as string;
      const messageContent = formData.get("message") as string;
      
      if (!name || !email || !subject || !messageContent) {
        setStatus("error");
        setErrorMessage("Missing required fields.");
        return;
      }

      await ContactsRepository.create({
        name,
        email,
        subject,
        message: messageContent,
        status: "unread",
      });
      
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <section className="relative w-full py-24 z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full rounded-[3rem] overflow-hidden bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-2xl shadow-black/5 dark:shadow-none p-8 md:p-16"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-emerald/5 pointer-events-none" />

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <SuccessState key="success" />
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="relative z-10 flex flex-col gap-8"
              >
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">Send a Message</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium">Fill out the form below and I'll get back to you shortly.</p>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-medium text-sm">
                    <AlertCircle size={18} />
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" name="name" required className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="Your Name" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" name="email" required className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="your.name@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Company (Optional)</label>
                    <input type="text" name="company" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="Acme Inc." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Category</label>
                    <div className="relative">
                      <select name="category" required className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-blue transition-colors appearance-none">
                        <option value="Project" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Project / Freelance</option>
                        <option value="Internship" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Internship / Full-time</option>
                        <option value="Collaboration" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Collaboration</option>
                        <option value="Open Source" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Open Source</option>
                        <option value="Speaking" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Speaking</option>
                        <option value="Other" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Other</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">▼</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Subject</label>
                  <input type="text" name="subject" required className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="How can we help you?" />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Message</label>
                  </div>
                  <textarea name="message" required rows={5} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-blue transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative w-full py-5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-black/10 dark:shadow-white/10"
                >
                  {status === "submitting" ? (
                    <div className="w-6 h-6 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-10 flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-24 h-24 mb-8 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 flex items-center justify-center">
        <CheckCircle2 size={48} className="text-brand-emerald" />
      </div>
      <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">Message Sent!</h3>
      <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-md font-medium leading-relaxed mb-8">
        Your message has safely reached SarfrazOS. I'll review it and get back to you as soon as possible.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="px-8 py-4 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-zinc-900 dark:text-white font-bold hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
      >
        Send Another Message
      </button>
    </motion.div>
  );
}
