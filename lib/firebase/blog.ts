import { Blog, BlogCategory } from "@/types";

const MOCK_CATEGORIES: BlogCategory[] = [
  { id: "c1", title: "AI & ML", icon: "Brain", count: 12 },
  { id: "c2", title: "Projects", icon: "Code", count: 8 },
  { id: "c3", title: "Career", icon: "Briefcase", count: 5 },
  { id: "c4", title: "Open Source", icon: "GitMerge", count: 15 },
  { id: "c5", title: "Life", icon: "Coffee", count: 3 }
];

const MOCK_BLOGS: Blog[] = [
  {
    id: "blog-1",
    slug: "building-sarfrazos",
    title: "Building SarfrazOS: Why I Decided to Create My Own Engineering Platform",
    category: "Projects",
    readingTime: "8 min read",
    excerpt: "Every developer eventually reaches a point where a traditional portfolio no longer reflects who they are. This article explores the motivation, design philosophy and engineering decisions behind building SarfrazOS from scratch.",
    content: `
## Moving Beyond a Simple Portfolio

Every developer eventually reaches a point where a traditional portfolio no longer reflects who they are. You learn new technologies, build complex systems, and suddenly, a single-page HTML template feels like an incredibly small box for your entire career.

I wanted something that felt less like a resume and more like a **digital engineering journal**—a place where my thoughts, tutorials, and side projects could live together seamlessly.

## Personal Branding Matters

In today's landscape, writing code is only half the battle. Being able to communicate your ideas, teach others, and document your journey is just as critical. That's why I prioritized building a platform that makes me *want* to write and share.

## The Vision & Inspiration

I was heavily inspired by the premium aesthetics of Apple, Linear, and Stripe. I didn't want it to look like a standard blog template; I wanted it to feel like a high-end application.

Key design principles:
- **Cinematic Typography:** Using large, bold fonts to guide the reader.
- **Glassmorphism:** Elegant, frosted glass UI elements.
- **Micro-interactions:** Magnetic buttons, tilt effects, and smooth scroll animations.

## The Technology Stack

To achieve this, I chose a modern, highly performant stack:
- **Next.js (App Router):** For server-side rendering, exceptional SEO, and fast routing.
- **Firebase:** For real-time database capabilities (Firestore) and media storage without the overhead of maintaining a custom backend.
- **Framer Motion:** To handle all the complex physics-based UI animations.
- **Tailwind CSS:** For rapid, utility-first styling.

By avoiding a custom Express backend, I drastically reduced deployment complexity and maintenance overhead, allowing me to focus entirely on the user experience.

## What's Next?

This is just the foundation. Moving forward, I plan to integrate dedicated AI Tools, expand the Creator Hub, and build more interactive engineering experiences directly into the platform.
`,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    author: {
      name: "Sarfraz",
      avatar: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
    },
    tags: ["Next.js", "Firebase", "Design", "Engineering"],
    views: 14500,
    likes: 1204,
    comments: 42,
    status: "published",
    publishedAt: "2023-11-20T10:00:00Z",
    createdAt: "2023-11-18T10:00:00Z",
    updatedAt: "2023-11-20T10:00:00Z",
    seo: {
      metaTitle: "Building SarfrazOS | SarfrazCodes",
      metaDescription: "Why I decided to build my own engineering platform from scratch.",
      keywords: ["Next.js", "Portfolio", "Engineering"]
    }
  },
  {
    id: "blog-2",
    slug: "my-first-year-in-computer-science",
    title: "My First Year in Computer Science: Lessons Beyond the Classroom",
    category: "Career",
    readingTime: "6 min read",
    excerpt: "The first year of engineering teaches far more than programming. This article reflects on learning, consistency, challenges and building real-world skills alongside academics.",
    content: `
## The Transition into University

Starting university is a massive shift. You go from a highly structured high school environment to one where you are entirely responsible for your own learning. The biggest shock wasn't the difficulty of the subjects, but rather the realization that the classroom only covers the very basics.

## Learning Python and DS & A

Like many, I started with Python. It's incredibly forgiving and perfect for learning the logic of programming without fighting syntax. However, the real challenge began when we transitioned into Data Structures & Algorithms. 

Understanding Big O notation, trees, graphs, and dynamic programming completely rewired how I approach problem-solving.

## Exploring AI, ML, and Open Source

Once I had a solid foundation, I started branching out. I took a deep dive into AI and Machine Learning—understanding the math behind neural networks was mind-blowing. 

Simultaneously, I discovered the Open Source community. Making my first pull request to a large repository was terrifying, but incredibly rewarding.

## Building Real Projects

Academics are important, but building real-world projects is where the true learning happens. I started applying what I learned to build web applications, APIs, and eventually, this very platform, SarfrazOS.

## Key Lessons Learned

1. **Consistency beats intensity:** Coding for 1 hour every day is better than coding for 10 hours once a week.
2. **Don't just watch tutorials:** Build things that break, then learn how to fix them.
3. **Imposter syndrome is normal:** Everyone feels like they don't know what they're doing at some point.

## Advice for New Students

Focus on building a strong foundation, don't rush into complex frameworks, and remember that growth comes from consistent effort rather than perfection.
`,
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Sarfraz",
      avatar: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
    },
    tags: ["University", "Career", "Learning", "Advice"],
    views: 8900,
    likes: 856,
    comments: 24,
    status: "published",
    publishedAt: "2023-09-02T10:00:00Z",
    createdAt: "2023-09-01T10:00:00Z",
    updatedAt: "2023-09-02T10:00:00Z",
    seo: {
      metaTitle: "First Year in CS | SarfrazCodes",
      metaDescription: "Lessons learned during my first year in computer science.",
      keywords: ["College", "CS", "Career"]
    }
  }
];

export async function getCategories(): Promise<BlogCategory[]> {
  // Temporary mock implementation until Admin Portal is built
  return MOCK_CATEGORIES;
}

export async function getFeaturedBlog(): Promise<Blog> {
  // Return the highest viewed or specifically featured blog
  return MOCK_BLOGS[0];
}

export async function getLatestBlogs(): Promise<Blog[]> {
  // Returns all published blogs, sorted by date (mocked here)
  return MOCK_BLOGS;
}

export async function getTrendingBlogs(): Promise<Blog[]> {
  // Returns top blogs by views (mocked here)
  return [...MOCK_BLOGS].sort((a, b) => (b.views || 0) - (a.views || 0));
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blog = MOCK_BLOGS.find(b => b.slug === slug);
  return blog || null;
}
