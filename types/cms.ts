import { Timestamp } from "firebase/firestore";

// -----------------------------------------------------------------------------
// REUSABLE CORE TYPES
// -----------------------------------------------------------------------------

export interface BaseDocument {
  id: string;
  createdAt: Timestamp | string;
  updatedAt: Timestamp | string;
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  openGraphImage?: string;
  canonicalUrl?: string;
}

export interface Media {
  url: string;
  publicId: string;
  alt?: string;
}

// -----------------------------------------------------------------------------
// API & STATE TYPES
// -----------------------------------------------------------------------------

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  lastVisible: any; // Firestore document snapshot or cursor
  hasMore: boolean;
}

export interface SelectItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface FormState {
  isSubmitting: boolean;
  isDirty: boolean;
  isSubmitSuccessful: boolean;
  errors: Record<string, string>;
}

export interface ValidationError {
  field: string;
  message: string;
}

// -----------------------------------------------------------------------------
// COLLECTION INTERFACES
// -----------------------------------------------------------------------------

export interface Project extends BaseDocument {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  coverImage?: Media;
  gallery?: Media[];
  seo?: SEOData;
}

export interface Blog extends BaseDocument {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: Media;
  tags: string[];
  published: boolean;
  featured: boolean;
  readingTime: number; // in minutes
  seo?: SEOData;
}

export interface Profile extends BaseDocument {
  name: string;
  headline: string;
  bio: string;
  profileImage?: Media;
  resumeUrl?: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
  };
  availability: 'Available' | 'Not Available' | 'Open to Offers';
}

export interface Skill extends BaseDocument {
  category: string; // e.g., 'Frontend', 'Backend', 'Tools'
  name: string;
  icon?: string; // class name or URL
  level: number; // 1-100
  order: number;
}

export interface Education extends BaseDocument {
  institution: string;
  degree: string;
  field: string;
  startDate: string; // YYYY-MM
  endDate?: string; // YYYY-MM or "Present"
  grade?: string;
  description?: string;
}

export interface Certificate extends BaseDocument {
  title: string;
  issuer: string;
  issueDate: string; // YYYY-MM
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: Media;
}

export interface Achievement extends BaseDocument {
  title: string;
  description: string;
  date: string; // YYYY-MM
  icon?: string;
  featured: boolean;
}

export interface Toolbox extends BaseDocument {
  name: string;
  category: string;
  icon?: Media;
  website?: string;
  description: string;
  order: number;
}

export interface Creator extends BaseDocument {
  title: string;
  description: string;
  image?: Media;
  displayOrder: number;
}

export interface Contact extends BaseDocument {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
}

export interface Settings extends BaseDocument {
  siteTitle: string;
  siteDescription: string;
  logo?: Media;
  favicon?: Media;
  seo?: SEOData;
  analytics?: {
    googleAnalyticsId?: string;
  };
  theme?: 'dark' | 'light' | 'system';
}
