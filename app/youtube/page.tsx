import React, { Suspense } from "react";
import CreatorHero from "@/components/creator/CreatorHero";
import FeaturedVideo from "@/components/creator/FeaturedVideo";
import LatestUploads from "@/components/creator/LatestUploads";
import CreatorPlaylists from "@/components/creator/CreatorPlaylists";
import CreatorStats from "@/components/creator/CreatorStats";
import ContentPhilosophy from "@/components/creator/ContentPhilosophy";
import CreatorCTA from "@/components/creator/CreatorCTA";
import { FeaturedVideoSkeleton, LatestUploadsSkeleton, PlaylistsSkeleton } from "@/components/creator/VideoSkeleton";
import { getLatestVideos, getPlaylists, getChannelStats } from "@/lib/youtube";
import { getCreatorSocials } from "@/lib/firebase/creator";

// SEO Metadata
export const metadata = {
  title: 'Creator Hub | SarfrazCodes',
  description: 'Building knowledge that scales. Videos, tutorials, and technical content by Sarfraz.',
};

// Wrapper Components for Suspense
async function FeaturedVideoWrapper() {
  const videos = await getLatestVideos(1);
  return <FeaturedVideo video={videos[0]} />;
}

async function LatestUploadsWrapper() {
  const [videos, socials] = await Promise.all([
    getLatestVideos(5), // Fetch 5 videos instead of 7 (4 to display + 1 featured)
    getCreatorSocials()
  ]);
  
  // Skip the first one since it's the featured video
  return <LatestUploads videos={videos.slice(1, 5)} socials={socials} />;
}

async function PlaylistsWrapper() {
  const playlists = await getPlaylists(3);
  return <CreatorPlaylists playlists={playlists} />;
}

async function StatsWrapper() {
  const stats = await getChannelStats();
  return <CreatorStats stats={stats} />;
}

export default function CreatorPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#050505] overflow-x-hidden relative">
      <CreatorHero />
      
      <Suspense fallback={<FeaturedVideoSkeleton />}>
        <FeaturedVideoWrapper />
      </Suspense>

      <Suspense fallback={<LatestUploadsSkeleton />}>
        <LatestUploadsWrapper />
      </Suspense>

      <Suspense fallback={<PlaylistsSkeleton />}>
        <PlaylistsWrapper />
      </Suspense>

      {/* Stats usually loads very fast and occupies little vertical space initially, but we can still suspend it */}
      <Suspense fallback={<div className="w-full py-24 bg-[#F8FAFC] dark:bg-[#050505]" />}>
        <StatsWrapper />
      </Suspense>

      <ContentPhilosophy />
      
      <CreatorCTA />
    </main>
  );
}
