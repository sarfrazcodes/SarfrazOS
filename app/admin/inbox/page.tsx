import React from "react";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import EmptyState from "@/components/admin/feedback/EmptyState";
import { Inbox } from "lucide-react";

export default function ContactsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <AdminPageHeader 
        title="Inbox" 
        description="View and manage messages from your website contact form." 
      />
      <EmptyState 
        icon={<Inbox size={48} className="text-zinc-300 dark:text-zinc-700" />}
        title="Inbox Module Coming Soon"
        description="This module is currently under construction and will be connected to Firestore soon."
      />
    </div>
  );
}
