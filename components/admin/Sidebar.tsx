"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  UserCircle, 
  FolderGit2, 
  PenTool, 
  Wrench, 
  Video, 
  Code2, 
  GraduationCap, 
  Award, 
  Trophy, 
  Inbox, 
  Settings,
  LogOut
} from "lucide-react";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Profile", href: "/admin/profile", icon: UserCircle },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Blogs", href: "/admin/blogs", icon: PenTool },
  { name: "Toolbox", href: "/admin/toolbox", icon: Wrench },
  { name: "Creator", href: "/admin/creator", icon: Video },
  { name: "Skills", href: "/admin/skills", icon: Code2 },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Certificates", href: "/admin/certificates", icon: Award },
  { name: "Achievements", href: "/admin/achievements", icon: Trophy },
  { name: "Inbox", href: "/admin/inbox", icon: Inbox },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside className="w-64 h-screen bg-white dark:bg-[#0B0B0D] border-r border-black/5 dark:border-white/5 hidden lg:flex flex-col flex-shrink-0 sticky top-0">
      
      <div className="h-16 flex items-center px-6 border-b border-black/5 dark:border-white/5">
        <Link href="/admin" className="text-lg font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
          Sarfraz<span className="text-brand-blue">OS</span>
          <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest ml-2">Admin</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" 
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-black/5 dark:border-white/5">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
}
