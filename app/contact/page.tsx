import React from "react";
import ContactBackground from "@/components/contact/ContactBackground";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import CollaborationCards from "@/components/contact/CollaborationCards";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata = {
  title: 'Contact & Collaboration | SarfrazCodes',
  description: 'Let us build something meaningful together. Reach out for projects, freelance work, open source collaboration, or speaking engagements.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] overflow-x-hidden relative selection:bg-brand-blue/30 selection:text-white dark:selection:text-white">
      
      {/* 
        The Animated Aurora Background sits behind everything.
        It is rendered outside the static flow so it smoothly runs at 60fps 
        without being affected by layout shifts.
      */}
      <ContactBackground />
      
      {/* 1. Spline Hero */}
      <ContactHero />
      
      {/* 2. Glass Contact Cards */}
      <ContactInfo />
      
      {/* 3. Secure Contact Form (Server Actions to Firestore) */}
      <ContactForm />
      
      {/* 4. Collaboration Opportunities */}
      <CollaborationCards />
      
      {/* 5. FAQ Accordion */}
      <ContactFAQ />
      
      {/* 6. Massive CTA to close out the site */}
      <ContactCTA />

    </main>
  );
}
