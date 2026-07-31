import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AdminProvider } from "@/app/providers/AdminProvider";
import GlobalUI from "@/components/GlobalUI";
import ScrollOptimizer from "@/components/ScrollOptimizer";
import ThemeTransition from "@/components/ThemeTransition";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SarfrazCodes - Software Engineer & Architect",
  description: "Personal OS and portfolio of Sarfraz, Software Engineer and AI Architect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`min-h-full flex flex-col bg-[#DCE8F5] dark:bg-[#050505] text-zinc-900 dark:text-[#F5F5F5] selection:bg-brand-blue selection:text-white font-sans ${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <AdminProvider>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white font-bold rounded-br-lg top-0 left-0 transition-opacity">
              Skip to main content
            </a>
            <ScrollOptimizer />
            <ThemeTransition />
            <GlobalUI />
            {children}
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
