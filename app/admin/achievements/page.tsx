import React from "react";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import EmptyState from "@/components/admin/feedback/EmptyState";
import { Trophy } from "lucide-react";

export default function AchievementsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <AdminPageHeader 
        title="Achievements" 
        description="Highlight your notable achievements and awards." 
      />
      <EmptyState 
        icon={<Trophy size={48} className="text-zinc-300 dark:text-zinc-700" />}
        title="Achievements Module Coming Soon"
        description="This module is currently under construction and will be connected to Firestore soon."
      />
    </div>
  );
}
