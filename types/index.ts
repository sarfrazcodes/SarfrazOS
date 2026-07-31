import { Timestamp } from 'firebase/firestore';

// -----------------------------------------------------------------------------
// CORE & SHARED
// -----------------------------------------------------------------------------

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  openGraphImage?: string;
  canonicalUrl?: string;
}

export interface User {
  uid: string;
  email: string;
  role: 'admin' | 'user';
}

export interface SiteSettings {
  id: 'global'; // Singleton document
  siteName: string;
  tagline: string;
  contactEmail: string;
  maintenanceMode: boolean;
}

// -----------------------------------------------------------------------------
// SKILLS & PORTFOLIO ENTITIES
// -----------------------------------------------------------------------------

export interface Skill {
  id: string; // Document ID
  name: string;
  iconUrl?: string; // Stored in Firebase Storage
  category: string; // e.g., 'frontend', 'backend', 'tools'
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string; // Markdown or Rich Text
  coverImage: string; // URL from Media Library
  skillIds: string[]; // Relational reference to Skills
  liveUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
  order: number;
  seo: SEOData;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface BlogCategory {
  id: string;
  title: string;
  icon?: string;
  count?: number;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or Rich Text
  coverImage: string; // Used in lists
  featuredImage?: string; // Used in hero
  galleryImages?: string[];
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags?: string[];
  readingTime: string; // e.g. "8 min read"
  views?: number;
  likes?: number;
  comments?: number;
  skillIds?: string[];
  status: 'draft' | 'published' | 'archived';
  seo: SEOData;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// -----------------------------------------------------------------------------
// EXPERIENCE, EDUCATION & CERTIFICATES
// -----------------------------------------------------------------------------

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: Timestamp;
  endDate?: Timestamp | null; // null if present
  isCurrent: boolean;
  description: string;
  skillIds?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: Timestamp;
  endDate?: Timestamp | null;
  description?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: Timestamp;
  url?: string;
  imageUrl?: string;
  skillIds?: string[];
}

// -----------------------------------------------------------------------------
// COMMUNICATIONS & SOCIAL
// -----------------------------------------------------------------------------

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  budget?: string;
  category: string;
  status: 'unread' | 'read' | 'archived';
  replySent: boolean;
  createdAt: string | Timestamp;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconUrl: string;
  isActive: boolean;
}

// -----------------------------------------------------------------------------
// YOUTUBE CREATOR
// -----------------------------------------------------------------------------

export interface YoutubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  viewCount: string;
  duration?: string; // Optional because getting duration requires a second API call
}

export interface YoutubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  itemCount: number;
}

export interface YoutubeChannelStats {
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
  creationDate: string;
}

export interface CreatorSocials {
  instagramProfile: string;
  instagramUsername: string;
  instagramAvatar: string;
  latestInstagramReel: string;
  linkedinProfile: string;
  linkedinHeadline: string;
  linkedinAvatar: string;
  latestLinkedInPost: string;
  latestLinkedInPostTitle: string;
  latestLinkedInPostExcerpt: string;
}
