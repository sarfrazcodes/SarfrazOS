import React from "react";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import EmptyState from "@/components/admin/feedback/EmptyState";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <AdminPageHeader 
        title="Site Settings" 
        description="Manage global website settings, SEO, and configurations." 
      />
      <EmptyState 
        icon={<Settings size={48} className="text-zinc-300 dark:text-zinc-700" />}
        title="Settings Module Coming Soon"
        description="This module is currently under construction and will be connected to Firestore soon."
      />
    </div>
  );
}
