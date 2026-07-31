"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Code, Briefcase, MapPin, Check, Copy } from "lucide-react";

export default function ContactInfo() {
  const [copied, setCopied] = useState(false);
  const email = "sarfrazcodes@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cards: Array<{
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    link?: string;
    onClick?: () => void;
    isAction?: boolean;
    actionIcon?: React.ReactNode;
  }> = [
    {
      id: "email",
      title: "Email",
      description: email,
      icon: <Mail size={24} />,
      link: `mailto:${email}`
    },
    {
      id: "github",
      title: "GitHub",
      description: "github.com/sarfrazcodes",
      icon: <Code size={24} />,
      link: "https://github.com/sarfrazcodes"
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      description: "linkedin.com/in/sarfrazcodes",
      icon: <Briefcase size={24} />,
      link: "https://linkedin.com/in/sarfrazcodes"
    },
    {
      id: "location",
      title: "Location",
      description: "Phagwara, Punjab, India",
      icon: <MapPin size={24} />,
    }
  ];

  return (
    <section className="relative w-full py-24 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            
            const CardWrapper = card.link ? "a" : card.onClick ? "button" : "div";
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                {/* @ts-ignore - dynamic tag wrapper */}
                <CardWrapper
                  href={card.link}
                  target={card.link ? "_blank" : undefined}
                  rel={card.link ? "noreferrer" : undefined}
                  onClick={card.onClick}
                  className="group relative flex flex-col items-center justify-center p-8 w-full h-full text-center rounded-[2rem] bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer shadow-xl shadow-black/5 dark:shadow-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-emerald/5 dark:from-brand-blue/10 dark:to-brand-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white mb-6 group-hover:scale-110 group-hover:bg-brand-blue/10 dark:group-hover:bg-brand-blue/20 transition-all duration-500">
                    {card.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{card.title}</h3>
                  
                  <div className="flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400 font-medium group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    <span>{card.description}</span>
                    {card.isAction && (
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {card.actionIcon}
                      </span>
                    )}
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
