"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Search, Menu, UserCircle, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function TopNav({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  // Create simple breadcrumbs from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  
  return (
    <header className="h-16 bg-white/80 dark:bg-[#0B0B0D]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 sticky top-0 z-40 flex items-center justify-between px-4 lg:px-8">
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 capitalize">
          {pathSegments.map((segment, index) => (
            <React.Fragment key={segment}>
              {index > 0 && <span className="text-zinc-300 dark:text-zinc-700">/</span>}
              <span className={index === pathSegments.length - 1 ? "text-zinc-900 dark:text-white font-bold" : ""}>
                {segment}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        
        {/* Search Placeholder */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm text-zinc-500 w-64">
          <Search size={14} />
          <input 
            type="text" 
            placeholder="Search CMS..." 
            className="bg-transparent border-none outline-none w-full placeholder:text-zinc-400"
          />
          <div className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[10px] font-bold">⌘K</div>
        </div>

        <div className="w-px h-6 bg-black/10 dark:bg-white/10 hidden md:block" />

        <ThemeToggle />

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-emerald flex items-center justify-center text-white shadow-md">
          <UserCircle size={20} />
        </div>
        
        <button 
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 text-zinc-500 transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
        </button>

      </div>

    </header>
  );
}
