"use client";

import { AuthProvider, useAuth } from "@/components/AuthProvider";
import { auth } from "@/firebase/auth";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Explicit check for missing or invalid Firebase Auth so the user knows exactly why it's failing
  if (!auth || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] dark:bg-[#050505] p-6">
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-6 max-w-md text-center">
          <h2 className="text-red-600 dark:text-red-400 font-bold text-xl mb-2">Missing Firebase Config</h2>
          <p className="text-sm text-red-500 dark:text-red-300 mb-4">
            Next.js cannot find your Firebase API keys. If you just added them to .env.local, <strong>you must restart your development server</strong> for the changes to take effect.
          </p>
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3 text-left font-mono text-xs text-zinc-600 dark:text-zinc-400">
            1. Stop the server (Ctrl + C)<br/>
            2. Run npm run dev<br/>
            3. Refresh this page
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] dark:bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
          <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Loading CMS</p>
        </div>
      </div>
    );
  }

  // If on the login page, render without Sidebar and Topnav
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#050505]">{children}</div>;
  }

  // If no user and not on login, AuthProvider handles the redirect. 
  // We return null to avoid flashing the protected dashboard layout before the redirect happens.
  if (!user) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#050505] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
