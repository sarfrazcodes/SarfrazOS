import React from "react";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import { Users, Eye, TrendingUp, Briefcase } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <AdminPageHeader 
        title="Dashboard Overview" 
        description="Welcome to SarfrazOS CMS. Here is what is happening today."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Views" value="124.5K" trend="+12.5%" icon={<Eye size={20} />} />
        <StatCard title="Active Projects" value="12" trend="+2" icon={<Briefcase size={20} />} />
        <StatCard title="Blog Readers" value="8.2K" trend="+5.4%" icon={<Users size={20} />} />
        <StatCard title="Profile Engagement" value="94%" trend="+1.2%" icon={<TrendingUp size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Mock) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111113] border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-zinc-500">
          <p className="font-medium">Traffic Analytics Chart goes here</p>
          <p className="text-sm opacity-70">(Integrate with Firebase Analytics)</p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-[#111113] border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-zinc-900 dark:text-white mb-6">Recent Inbox Messages</h3>
          <div className="space-y-4">
            <ActivityItem name="John Doe" action="Sent a project inquiry" time="2h ago" />
            <ActivityItem name="Sarah Smith" action="Sent a collaboration request" time="5h ago" />
            <ActivityItem name="Alex Chen" action="Asked about open source" time="1d ago" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-white dark:bg-[#111113] border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-transform cursor-default">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-300">
          {icon}
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'}`}>
          {trend}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">{title}</h4>
        <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">{value}</div>
      </div>
    </div>
  );
}

function ActivityItem({ name, action, time }: { name: string, action: string, time: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center flex-shrink-0 text-zinc-500 font-bold text-sm">
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-bold text-zinc-900 dark:text-white">{name}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{action}</p>
        <p className="text-[10px] text-zinc-400 mt-1 uppercase font-bold tracking-wider">{time}</p>
      </div>
    </div>
  );
}
