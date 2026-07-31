"use client";

import React, { useState } from "react";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import AdminFormCard from "@/components/admin/ui/AdminFormCard";
import TextField from "@/components/admin/inputs/TextField";
import Textarea from "@/components/admin/inputs/Textarea";
import NumberField from "@/components/admin/inputs/NumberField";
import Select from "@/components/admin/inputs/Select";
import ToggleSwitch from "@/components/admin/inputs/ToggleSwitch";
import SlugGenerator from "@/components/admin/inputs/SlugGenerator";
import LoadingButton from "@/components/admin/inputs/LoadingButton";
import CloudinaryUploader from "@/components/admin/ui/CloudinaryUploader";
import FormSection from "@/components/admin/forms/FormSection";
import StatusBadge from "@/components/admin/feedback/StatusBadge";
import EmptyState from "@/components/admin/feedback/EmptyState";
import ConfirmationDialog from "@/components/admin/dialogs/ConfirmationDialog";

export default function CMSPlaygroundPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");

  const handleSimulateSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <AdminPageHeader 
        title="CMS Engine Playground" 
        description="Verify all the generic reusable components that will power the CMS."
        action={
          <LoadingButton onClick={() => setIsDialogOpen(true)} variant="danger">
            Test Delete Dialog
          </LoadingButton>
        }
      />

      <div className="flex flex-col gap-8">
        
        {/* Form Architecture Test */}
        <AdminFormCard>
          <FormSection 
            title="Basic Information" 
            description="Testing the TextField, Textarea, and auto-syncing SlugGenerator."
          >
            <TextField 
              label="Article Title" 
              placeholder="e.g. Building SarfrazOS" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
            />
            
            <SlugGenerator 
              label="URL Slug" 
              sourceText={title}
              helperText="Auto-generated from title, but can be manually overridden."
            />
            
            <Textarea 
              label="Excerpt" 
              placeholder="A short summary of the article..." 
            />
          </FormSection>

          <FormSection 
            title="Media & Metadata" 
            description="Testing Cloudinary UI wrapper and Select inputs."
          >
            <div className="mb-4">
              <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100 block mb-1.5">
                Cover Image
              </label>
              <CloudinaryUploader onUploadSuccess={(url) => console.log("Uploaded:", url)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select 
                label="Category"
                options={[
                  { label: "Engineering", value: "engineering" },
                  { label: "Design", value: "design" },
                  { label: "Life", value: "life" },
                ]}
                placeholder="Select a category"
              />
              <NumberField 
                label="Reading Time (mins)" 
                placeholder="e.g. 5"
              />
            </div>

            <ToggleSwitch 
              label="Featured Article" 
              description="Display this prominently on the home page."
            />
          </FormSection>

          <div className="pt-8 flex justify-end gap-3">
            <LoadingButton variant="ghost">Cancel</LoadingButton>
            <LoadingButton isLoading={isSubmitting} onClick={handleSimulateSubmit}>
              Save Document
            </LoadingButton>
          </div>
        </AdminFormCard>

        {/* Feedback Components Test */}
        <AdminFormCard>
          <FormSection title="Feedback States" description="Testing Badges and Empty States">
            <div className="flex gap-4 mb-8">
              <StatusBadge status="draft" />
              <StatusBadge status="published" />
              <StatusBadge status="archived" />
            </div>

            <EmptyState 
              title="No Projects Found"
              description="You haven't created any projects yet. Click the button below to get started."
              action={<LoadingButton>Create First Project</LoadingButton>}
            />
          </FormSection>
        </AdminFormCard>
      </div>

      <ConfirmationDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => {
          setIsDialogOpen(false);
          alert("Deleted!");
        }}
        title="Delete Document"
        description="Are you absolutely sure you want to delete this document? This action cannot be undone and will permanently remove the data from our servers."
        isDestructive
        confirmText="Delete Permanently"
      />
    </div>
  );
}
