import { Code2, Database, Layout, Server, Sparkles, Workflow, Box, Globe, Cpu } from "lucide-react";

export type SkillCategory = "Frontend" | "Backend" | "AI & Architecture" | "Tools";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon: any; // Lucide icon component
  description: string;
  color: string;
}

export const skills: Skill[] = [
  // Frontend
  {
    id: "react",
    name: "React & Next.js",
    category: "Frontend",
    icon: Globe,
    description: "Building scalable, server-rendered applications and dynamic user interfaces with bleeding-edge React features.",
    color: "#61DAFB",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    icon: Layout,
    description: "Crafting pixel-perfect, highly responsive, and meticulously animated designs using utility-first CSS architecture.",
    color: "#38B2AC",
  },
  {
    id: "threejs",
    name: "Three.js & Spline",
    category: "Frontend",
    icon: Box,
    description: "Engineering immersive 3D web experiences and seamlessly integrating WebGL canvases into React ecosystems.",
    color: "#000000",
  },

  // Backend
  {
    id: "node",
    name: "Node.js & Express",
    category: "Backend",
    icon: Server,
    description: "Architecting robust, high-performance RESTful APIs and microservices capable of handling massive concurrency.",
    color: "#339933",
  },
  {
    id: "database",
    name: "PostgreSQL & MongoDB",
    category: "Backend",
    icon: Database,
    description: "Designing optimized database schemas, writing complex aggregations, and ensuring data integrity at scale.",
    color: "#336791",
  },

  // AI & Architecture
  {
    id: "ai",
    name: "LLM Integration",
    category: "AI & Architecture",
    icon: Sparkles,
    description: "Orchestrating complex AI agent workflows, integrating OpenAI APIs, and building context-aware generative applications.",
    color: "#FF9900",
  },
  {
    id: "architecture",
    name: "System Architecture",
    category: "AI & Architecture",
    icon: Workflow,
    description: "Designing cloud-native systems, planning scalable component hierarchies, and optimizing full-stack data flow.",
    color: "#8C8C8C",
  },

  // Tools
  {
    id: "typescript",
    name: "TypeScript",
    category: "Tools",
    icon: Code2,
    description: "Enforcing strict end-to-end type safety, significantly reducing runtime errors and improving developer velocity.",
    color: "#3178C6",
  },
  {
    id: "docker",
    name: "Docker & CI/CD",
    category: "Tools",
    icon: Cpu,
    description: "Containerizing applications for consistent deployment environments and automating testing pipelines.",
    color: "#2496ED",
  }
];
