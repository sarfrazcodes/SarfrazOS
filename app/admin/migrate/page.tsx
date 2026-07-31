"use client";

import React, { useState } from "react";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import { Database, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { philosophies, timeline, educationData, certifications, achievements, interests } from "@/data/about";

import { ProjectsRepository } from "@/firebase/repositories/projects.repository";
import { SkillsRepository } from "@/firebase/repositories/skills.repository";
import { ProfileRepository } from "@/firebase/repositories/profile.repository";
import { EducationRepository } from "@/firebase/repositories/education.repository";
import { CertificatesRepository } from "@/firebase/repositories/certificates.repository";
import { AchievementsRepository } from "@/firebase/repositories/achievements.repository";

export default function MigratePage() {
  const [isMigrating, setIsMigrating] = useState(false);
  const [logs, setLogs] = useState<{ message: string; type: 'info' | 'success' | 'error' }[]>([]);

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setLogs(prev => [...prev, { message, type }]);
  };

  const handleMigration = async () => {
    setIsMigrating(true);
    setLogs([]);
    addLog("Starting data migration to Firestore...");

    try {
      // 1. Migrate Projects
      addLog(`Found ${projects.length} projects. Migrating...`);
      for (const p of projects) {
        await ProjectsRepository.create({
          title: p.title,
          slug: p.id,
          shortDescription: p.tagline,
          description: p.description,
          technologies: p.skillIds,
          category: "Software Development",
          status: "published",
          featured: p.featured,
          githubUrl: p.githubUrl,
          liveUrl: p.liveUrl,
          coverImage: { url: p.imageUrl, publicId: "" }
        }, p.id);
      }
      addLog("Projects migrated successfully.", "success");

      // 2. Migrate Skills
      addLog(`Found ${skills.length} skills. Migrating...`);
      let skillOrder = 0;
      for (const s of skills) {
        await SkillsRepository.create({
          name: s.name,
          category: s.category,
          level: 90,
          order: skillOrder++,
        }, s.id);
      }
      addLog("Skills migrated successfully.", "success");

      // 3. Migrate Education
      addLog("Migrating Education data...");
      await EducationRepository.create({
        institution: educationData.institution,
        degree: educationData.degree,
        field: educationData.major,
        startDate: educationData.duration.split(" – ")[0],
        endDate: educationData.duration.split(" – ")[1],
        description: educationData.coursework.join(", ")
      });
      addLog("Education migrated successfully.", "success");

      // 4. Migrate Certifications
      addLog(`Found ${certifications.length} certifications. Migrating...`);
      for (const c of certifications) {
        await CertificatesRepository.create({
          title: c.credential,
          issuer: c.issuer,
          issueDate: c.date,
          credentialUrl: c.url
        }, c.id);
      }
      addLog("Certifications migrated successfully.", "success");

      // 5. Migrate Achievements
      addLog(`Found ${achievements.length} achievements. Migrating...`);
      for (const a of achievements) {
        await AchievementsRepository.create({
          title: a.title,
          description: a.description,
          date: a.date,
          featured: true
        }, a.id);
      }
      addLog("Achievements migrated successfully.", "success");

      // 6. Migrate Profile Base
      addLog("Migrating basic profile settings...");
      await ProfileRepository.create({
        name: "Mohd Sarfraz Saifi",
        headline: "Software Engineering Student • Full-Stack Developer • AI Explorer",
        bio: "Building software that solves real problems.",
        email: "contact@example.com",
        socialLinks: {},
        availability: "Available"
      }, "main_profile");
      addLog("Profile migrated successfully.", "success");

      addLog("All data has been successfully migrated to Firestore!", "success");

    } catch (error: any) {
      console.error("Migration Error:", error);
      addLog(`Migration failed: ${error.message}`, "error");
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <AdminPageHeader 
        title="Data Migration Tool" 
        description="Transfer your static hardcoded data to Firestore in one click." 
      />

      <div className="p-8 bg-white dark:bg-[#111113] border border-black/5 dark:border-white/5 rounded-2xl shadow-sm">
        <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mb-6">
            <Database size={32} />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
            Initialize Database
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
            This tool will read all existing projects, skills, education, and achievements from your local <code className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded">data/*.ts</code> files and write them into your Firestore database.
          </p>
          
          <button
            onClick={handleMigration}
            disabled={isMigrating}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-blue hover:bg-brand-emerald text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-brand-emerald/25 hover:-translate-y-1 disabled:opacity-50 disabled:pointer-events-none w-full"
          >
            {isMigrating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Migrating Data...
              </>
            ) : (
              <>Start Migration</>
            )}
          </button>
        </div>
      </div>

      {logs.length > 0 && (
        <div className="p-6 bg-zinc-50 dark:bg-[#0A0A0A] border border-black/5 dark:border-white/5 rounded-2xl">
          <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-4">Migration Logs</h3>
          <div className="space-y-3 font-mono text-sm">
            {logs.map((log, i) => (
              <div key={i} className="flex items-start gap-3">
                {log.type === 'info' && <span className="text-brand-blue mt-0.5">•</span>}
                {log.type === 'success' && <CheckCircle size={16} className="text-brand-emerald mt-0.5 shrink-0" />}
                {log.type === 'error' && <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />}
                <span className={`
                  ${log.type === 'info' ? 'text-zinc-700 dark:text-zinc-300' : ''}
                  ${log.type === 'success' ? 'text-brand-emerald font-medium' : ''}
                  ${log.type === 'error' ? 'text-red-500 font-bold' : ''}
                `}>
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
