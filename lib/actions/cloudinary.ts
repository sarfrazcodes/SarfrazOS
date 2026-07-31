"use server";

import crypto from "crypto";

export async function generateCloudinarySignature() {
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!secret) {
    throw new Error("Missing CLOUDINARY_API_SECRET in environment variables");
  }

  const timestamp = Math.round(new Date().getTime() / 1000).toString();

  // Cloudinary signature requires parameters to be sorted alphabetically.
  // We only sign the timestamp for basic signed uploads.
  const strToSign = `timestamp=${timestamp}${secret}`;
  
  const signature = crypto.createHash("sha1").update(strToSign).digest("hex");

  return { timestamp, signature };
}
