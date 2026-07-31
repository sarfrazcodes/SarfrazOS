import React from "react";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import EmptyState from "@/components/admin/feedback/EmptyState";
import { Award } from "lucide-react";

export default function CertificatesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <AdminPageHeader 
        title="Certificates" 
        description="Showcase your professional certifications." 
      />
      <EmptyState 
        icon={<Award size={48} className="text-zinc-300 dark:text-zinc-700" />}
        title="Certificates Module Coming Soon"
        description="This module is currently under construction and will be connected to Firestore soon."
      />
    </div>
  );
}
