"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    // Fallback: If Firebase auth hangs, forcefully stop loading after 3 seconds
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.warn("Firebase Auth timed out. Forcing load to finish.");
        setLoading(false);
      }
    }, 3000);

    const unsubscribe = onAuthStateChanged(
      auth, 
      (currentUser) => {
        clearTimeout(timeoutId);
        setUser(currentUser);
        setLoading(false);
        
        // Simple client-side protection
        if (pathname.startsWith("/admin") && !pathname.includes("/admin/login") && !currentUser) {
          router.push("/admin/login");
        }
      },
      (error) => {
        clearTimeout(timeoutId);
        console.error("Firebase Auth Error:", error);
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
