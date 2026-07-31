import React from "react";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import EmptyState from "@/components/admin/feedback/EmptyState";
import { Video } from "lucide-react";

export default function CreatorPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <AdminPageHeader 
        title="Creator Content" 
        description="Manage your YouTube videos and content creator presence." 
      />
      <EmptyState 
        icon={<Video size={48} className="text-zinc-300 dark:text-zinc-700" />}
        title="Creator Module Coming Soon"
        description="This module is currently under construction and will be connected to Firestore soon."
      />
    </div>
  );
}
