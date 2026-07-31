import { YoutubeVideo, YoutubePlaylist, YoutubeChannelStats } from "@/types";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// -----------------------------------------------------------------------------
// MOCK DATA FALLBACKS
// -----------------------------------------------------------------------------

const MOCK_STATS: YoutubeChannelStats = {
  subscriberCount: "125000",
  videoCount: "42",
  viewCount: "3500000",
  creationDate: "2021-04-15T00:00:00Z"
};

const MOCK_VIDEOS: YoutubeVideo[] = [
  {
    id: "mock1",
    title: "Building a Fullstack Next.js App from Scratch",
    description: "In this tutorial, we dive deep into the Next.js App Router, Server Actions, and Tailwind CSS to build a production-ready application.",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    publishedAt: "2023-11-20T10:00:00Z",
    viewCount: "142500",
    duration: "45:20"
  },
  {
    id: "mock2",
    title: "Advanced Framer Motion Animations",
    description: "Learn how to create cinematic, buttery-smooth scroll animations using Framer Motion and React.",
    thumbnailUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop",
    publishedAt: "2023-10-15T10:00:00Z",
    viewCount: "89300",
    duration: "12:15"
  },
  {
    id: "mock3",
    title: "Why I switched to Neovim (and you should too)",
    description: "A complete guide to configuring Neovim for modern web development. Say goodbye to VS Code.",
    thumbnailUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop",
    publishedAt: "2023-09-02T10:00:00Z",
    viewCount: "210400",
    duration: "22:45"
  },
  {
    id: "mock4",
    title: "System Design: Scaling to 1 Million Users",
    description: "Understanding load balancers, caching, database sharding, and microservices architecture.",
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    publishedAt: "2023-08-10T10:00:00Z",
    viewCount: "345000",
    duration: "35:10"
  },
  {
    id: "mock5",
    title: "Mastering Tailwind CSS Grid & Flexbox",
    description: "Learn how to build complex, responsive layouts easily using modern CSS techniques with Tailwind.",
    thumbnailUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop",
    publishedAt: "2023-07-22T10:00:00Z",
    viewCount: "128000",
    duration: "18:30"
  },
];

const MOCK_PLAYLISTS: YoutubePlaylist[] = [
  {
    id: "pl1",
    title: "Fullstack Web Development",
    description: "Complete guide from frontend to backend.",
    thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    itemCount: 12
  },
  {
    id: "pl2",
    title: "Software Engineering & Career",
    description: "Tips on interviews, resumes, and growth.",
    thumbnailUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    itemCount: 8
  },
  {
    id: "pl3",
    title: "UI/UX Design for Developers",
    description: "Learn to design beautiful, modern interfaces.",
    thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    itemCount: 5
  }
];

// -----------------------------------------------------------------------------
// API FETCHERS
// -----------------------------------------------------------------------------

/**
 * Helper to fetch with caching. Revalidates every 1 hour.
 */
async function fetchYoutube(endpoint: string) {
  if (!API_KEY || !CHANNEL_ID) {
    console.warn("YouTube API Key or Channel ID missing. Using mock data.");
    return null;
  }

  const url = `${BASE_URL}${endpoint}&key=${API_KEY}`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`YouTube API error: ${res.status} ${res.statusText}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch YouTube data:", error);
    return null;
  }
}

export async function getChannelStats(): Promise<YoutubeChannelStats> {
  const data = await fetchYoutube(`/channels?part=statistics,snippet&id=${CHANNEL_ID}`);
  
  if (!data || !data.items || data.items.length === 0) {
    return MOCK_STATS;
  }

  const stats = data.items[0].statistics;
  const snippet = data.items[0].snippet;

  return {
    subscriberCount: stats.subscriberCount || "0",
    videoCount: stats.videoCount || "0",
    viewCount: stats.viewCount || "0",
    creationDate: snippet.publishedAt || new Date().toISOString()
  };
}

export async function getLatestVideos(limit: number = 4): Promise<YoutubeVideo[]> {
  // To get the latest videos reliably, we query the search endpoint for the channel, sorted by date
  const data = await fetchYoutube(`/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${limit}&order=date&type=video`);
  
  if (!data || !data.items || data.items.length === 0) {
    return MOCK_VIDEOS.slice(0, limit);
  }

  // To get view counts, we need a secondary call for the video IDs
  const videoIds = data.items.map((item: any) => item.id.videoId).join(",");
  const statsData = await fetchYoutube(`/videos?part=statistics,contentDetails&id=${videoIds}`);
  
  const statsMap = new Map();
  if (statsData && statsData.items) {
    statsData.items.forEach((item: any) => {
      statsMap.set(item.id, {
        viewCount: item.statistics.viewCount,
        duration: item.contentDetails.duration // ISO 8601 duration (e.g., PT15M33S)
      });
    });
  }

  return data.items.map((item: any) => {
    const videoStats = statsMap.get(item.id.videoId) || { viewCount: "0", duration: "" };
    
    // Parse ISO 8601 duration to MM:SS (Simplified)
    let parsedDuration = "10:00"; // Fallback
    const match = videoStats.duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (match) {
      const h = match[1] ? parseInt(match[1]) : 0;
      const m = match[2] ? parseInt(match[2]) : 0;
      const s = match[3] ? parseInt(match[3]) : 0;
      if (h > 0) {
        parsedDuration = `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      } else {
        parsedDuration = `${m}:${s.toString().padStart(2, '0')}`;
      }
    }

    return {
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      publishedAt: item.snippet.publishedAt,
      viewCount: videoStats.viewCount,
      duration: parsedDuration
    };
  });
}

export async function getPlaylists(limit: number = 6): Promise<YoutubePlaylist[]> {
  const data = await fetchYoutube(`/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=${limit}`);
  
  if (!data || !data.items || data.items.length === 0) {
    return MOCK_PLAYLISTS.slice(0, limit);
  }

  return data.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
    itemCount: item.contentDetails.itemCount
  }));
}
