import { CreatorSocials } from "@/types";

const MOCK_SOCIALS: CreatorSocials = {
  instagramProfile: "https://www.instagram.com/sarfrazcodes/",
  instagramUsername: "@sarfrazcodes",
  instagramAvatar: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
  latestInstagramReel: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop", // Assuming thumbnail image for reel
  linkedinProfile: "https://linkedin.com/in/sarfraz",
  linkedinHeadline: "Software Engineer & AI Architect",
  linkedinAvatar: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
  latestLinkedInPost: "https://www.linkedin.com/posts/sarfraz_latest-post",
  latestLinkedInPostTitle: "Building the next generation of digital experiences.",
  latestLinkedInPostExcerpt: "Today I'm thrilled to share some insights on scaling AI architectures in modern web environments. The key lies in edge computing and intelligent caching..."
};

export async function getCreatorSocials(): Promise<CreatorSocials> {
  // Bypassing Firebase temporarily as requested by the user.
  return MOCK_SOCIALS;
}
