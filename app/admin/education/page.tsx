import React from "react";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import EmptyState from "@/components/admin/feedback/EmptyState";
import { GraduationCap } from "lucide-react";

export default function EducationPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <AdminPageHeader 
        title="Education" 
        description="Manage your educational background and degrees." 
      />
      <EmptyState 
        icon={<GraduationCap size={48} className="text-zinc-300 dark:text-zinc-700" />}
        title="Education Module Coming Soon"
        description="This module is currently under construction and will be connected to Firestore soon."
      />
    </div>
  );
}
