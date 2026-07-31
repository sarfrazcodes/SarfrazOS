"use client";

import React, { useRef, useState } from "react";
import { useAdmin } from "@/app/providers/AdminProvider";
import { ImagePlus, Loader2 } from "lucide-react";
import { generateCloudinarySignature } from "@/lib/actions/cloudinary";
import { cn } from "@/lib/utils";

interface EditableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onSave: (url: string, publicId: string) => Promise<void>;
  containerClassName?: string;
}

export default function EditableImage({ 
  src, 
  alt, 
  onSave, 
  className, 
  containerClassName,
  ...props 
}: EditableImageProps) {
  const { isAdmin } = useAdmin();
  const [isUploading, setIsUploading] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const { timestamp, signature } = await generateCloudinarySignature();
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

      if (!cloudName || !apiKey) {
        throw new Error("Missing Cloudinary credentials in .env.local");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Upload failed");
      }

      // Optimistically update UI
      setCurrentSrc(data.secure_url);
      
      // Save to Firestore
      await onSave(data.secure_url, data.public_id);

    } catch (err: any) {
      console.error("Cloudinary Upload Error:", err);
      alert(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (!isAdmin) {
    return <img src={currentSrc} alt={alt} className={className} {...props} />;
  }

  return (
    <div className={cn("relative group overflow-hidden", containerClassName, className)}>
      <img src={currentSrc} alt={alt} className="w-full h-full object-cover" {...props} />
      
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-10 cursor-pointer" onClick={() => !isUploading && fileInputRef.current?.click()}>
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
        {isUploading ? (
          <div className="flex flex-col items-center text-white">
            <Loader2 size={32} className="animate-spin mb-2" />
            <span className="text-xs font-bold">Uploading...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-brand-blue rounded-full text-white backdrop-blur-md transition-colors shadow-xl">
            <ImagePlus size={18} />
            <span className="text-sm font-bold">Replace Image</span>
          </div>
        )}
      </div>
    </div>
  );
}
