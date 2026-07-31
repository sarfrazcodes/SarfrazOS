import React from "react";

export function FeaturedVideoSkeleton() {
  return (
    <div className="w-full py-24 bg-[#F8FAFC] dark:bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="mb-12">
          <div className="w-24 h-4 bg-black/5 dark:bg-white/5 rounded-full animate-pulse mb-4" />
          <div className="w-64 h-12 bg-black/10 dark:bg-white/10 rounded-lg animate-pulse" />
        </div>
        <div className="w-full h-[400px] lg:h-[500px] rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse" />
      </div>
    </div>
  );
}

export function LatestUploadsSkeleton() {
  return (
    <div className="w-full py-24 bg-[#F8FAFC] dark:bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="mb-12">
          <div className="w-24 h-4 bg-black/5 dark:bg-white/5 rounded-full animate-pulse mb-4" />
          <div className="w-64 h-12 bg-black/10 dark:bg-white/10 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col rounded-3xl overflow-hidden border border-black/5 dark:border-white/5">
              <div className="w-full aspect-video bg-black/5 dark:bg-white/5 animate-pulse" />
              <div className="p-6 bg-white dark:bg-[#111111]">
                <div className="w-full h-6 bg-black/5 dark:bg-white/5 rounded animate-pulse mb-2" />
                <div className="w-3/4 h-6 bg-black/5 dark:bg-white/5 rounded animate-pulse mb-8" />
                <div className="w-1/2 h-4 bg-black/5 dark:bg-white/5 rounded animate-pulse mt-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PlaylistsSkeleton() {
  return (
    <div className="w-full py-24 bg-white dark:bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="mb-12">
          <div className="w-24 h-4 bg-black/5 dark:bg-white/5 rounded-full animate-pulse mb-4" />
          <div className="w-48 h-12 bg-black/10 dark:bg-white/10 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full rounded-3xl overflow-hidden border border-black/5 dark:border-white/5">
              <div className="w-full aspect-[21/9] bg-black/5 dark:bg-white/5 animate-pulse" />
              <div className="p-6 bg-[#F8FAFC] dark:bg-[#111111]">
                <div className="w-3/4 h-6 bg-black/5 dark:bg-white/5 rounded animate-pulse mb-2" />
                <div className="w-full h-4 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
