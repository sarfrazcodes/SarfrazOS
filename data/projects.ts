export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  detailedImplementation: string;
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  skillIds: string[]; // Maps to skills.ts
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "sarfrazos",
    title: "SarfrazCodes",
    tagline: "The Operating System Portfolio",
    description: "A highly interactive, OS-themed personal portfolio built with Next.js and Spline 3D.",
    detailedImplementation: "SarfrazCodes was built using Next.js App Router for optimal performance. I integrated @splinetool/react-spline for the 3D Hero section, meticulously manipulating CSS blending modes to create a native Dark Mode. Framer Motion handles the butter-smooth scroll animations, and Tailwind CSS provides the structural utility classes for the heavily frosted glassmorphism effects.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", // Placeholder tech image
    liveUrl: "#",
    githubUrl: "#",
    skillIds: ["react", "tailwind", "threejs", "typescript"],
    featured: true,
  },
  {
    id: "ai-agent-hub",
    title: "Nexus AI Hub",
    tagline: "Autonomous Agent Orchestrator",
    description: "A centralized dashboard for deploying, monitoring, and interacting with specialized AI agents capable of writing code, analyzing data, and automating web tasks.",
    detailedImplementation: "Nexus utilizes Node.js microservices to stream LLM responses in real-time via Server-Sent Events (SSE). The frontend leverages React Server Components to minimize client bundle size, while PostgreSQL handles the complex vector storage required for the AI's long-term memory retrieval.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200", // Placeholder abstract AI image
    liveUrl: "#",
    githubUrl: "#",
    skillIds: ["ai", "react", "node", "database", "typescript"],
    featured: true,
  },
  {
    id: "e-commerce-platform",
    title: "Velocity Commerce",
    tagline: "High-Performance E-commerce Engine",
    description: "A headless e-commerce solution delivering sub-second page loads, integrated global state management, and an admin dashboard for inventory tracking.",
    detailedImplementation: "Built using Next.js with statically generated product pages that revalidate in the background (ISR). The cart state is managed locally and synced aggressively with a MongoDB backend to ensure a seamless checkout experience.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200", // Placeholder ecommerce image
    githubUrl: "#",
    skillIds: ["react", "node", "database", "tailwind"],
    featured: false,
  }
];
