"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { generateCloudinarySignature } from "@/lib/actions/cloudinary";

interface CloudinaryUploaderProps {
  onUploadSuccess: (url: string, publicId: string) => void;
  defaultImage?: string;
}

export default function CloudinaryUploader({ onUploadSuccess, defaultImage }: CloudinaryUploaderProps) {
  const [image, setImage] = useState<string | null>(defaultImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      // 1. Get Signature from Server Action
      const { timestamp, signature } = await generateCloudinarySignature();

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

      if (!cloudName || !apiKey) {
        throw new Error("Missing Cloudinary Client Environment Variables");
      }

      // 2. Prepare FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      // 3. Upload to Cloudinary API
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Upload failed");
      }

      // 4. Update UI & Notify Parent
      setImage(data.secure_url);
      onUploadSuccess(data.secure_url, data.public_id);

    } catch (err: any) {
      console.error("Cloudinary Upload Error:", err);
      setError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
      />

      {image ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-black/10 dark:border-white/10 group">
          <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <button 
              type="button"
              onClick={() => setImage(null)}
              className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-xl"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`w-full aspect-video rounded-xl border-2 border-dashed border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 hover:border-brand-blue transition-colors group ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center text-brand-blue">
              <Loader2 size={32} className="animate-spin mb-4" />
              <span className="text-sm font-bold">Uploading to Cloudinary...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-zinc-500 dark:text-zinc-400 group-hover:text-brand-blue transition-colors text-center px-4">
              <UploadCloud size={32} className="mb-4" />
              <span className="text-sm font-bold">Click to select image</span>
              <span className="text-xs mt-2 opacity-70">JPG, PNG, WebP up to 5MB</span>
              {error && <span className="text-xs text-red-500 mt-4 font-medium">{error}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
