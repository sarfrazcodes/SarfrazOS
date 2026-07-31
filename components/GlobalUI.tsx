"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Desktop from "@/components/Desktop";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function GlobalUI() {
  const pathname = usePathname();
  
  // Hide the public UI on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <Desktop />
    </>
  );
}
