import React from "react";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import EmptyState from "@/components/admin/feedback/EmptyState";
import { Wrench } from "lucide-react";

export default function ToolboxPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <AdminPageHeader 
        title="Toolbox" 
        description="Manage the software, hardware, and tools you use daily." 
      />
      <EmptyState 
        icon={<Wrench size={48} className="text-zinc-300 dark:text-zinc-700" />}
        title="Toolbox Module Coming Soon"
        description="This module is currently under construction and will be connected to Firestore soon."
      />
    </div>
  );
}
