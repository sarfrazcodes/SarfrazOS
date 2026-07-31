export interface PhilosophyCard {
  id: string;
  title: string;
  description: string;
}

export const philosophies: PhilosophyCard[] = [
  {
    id: "curiosity",
    title: "Curiosity",
    description: "Every meaningful project begins with a question worth exploring. Curiosity keeps me learning long after the tutorial ends.",
  },
  {
    id: "engineering",
    title: "Engineering",
    description: "Good software isn't about writing more code. It's about building reliable solutions that make someone's work a little easier.",
  },
  {
    id: "growth",
    title: "Growth",
    description: "Every project teaches me something new. Every mistake makes me a better engineer.",
  }
];

export interface TimelineEvent {
  year: string;
  title: string;
}

export const timeline: TimelineEvent[] = [
  { year: "2025", title: "Started B.Tech in Computer Science (AI & ML)" },
  { year: "2025", title: "Learned Python" },
  { year: "2025", title: "Started Data Structures & Algorithms" },
  { year: "2026", title: "Built first AI projects" },
  { year: "2026", title: "Started Open Source Journey" },
  { year: "2026", title: "Building SarfrazCodes" },
  { year: "Present", title: "Continuous Learning" },
];

export const skillCategories = {
  "Programming Languages": ["Python", "TypeScript", "JavaScript", "C++", "Java"],
  "Frameworks": ["Next.js", "React", "Node.js", "Tailwind CSS", "Framer Motion"],
  "AI & ML": ["TensorFlow", "PyTorch", "OpenCV", "Scikit-Learn", "HuggingFace"],
  "Cloud": ["AWS", "Google Cloud", "Vercel", "Firebase"],
  "Developer Tools": ["Git", "Docker", "VS Code", "Linux", "Postman"],
  "Databases": ["PostgreSQL", "MongoDB", "Redis", "Firestore"]
};

export const educationData = {
  institution: "Lovely Professional University",
  degree: "Bachelor of Technology",
  major: "Computer Science (AI & ML)",
  duration: "2025 – 2029",
  cgpa: "9.2", // Mock dynamic field
  coursework: ["Data Structures", "Algorithms", "Machine Learning", "Neural Networks", "Database Systems"]
};

export const certifications = [
  {
    id: "1",
    issuer: "Google",
    date: "Dec 2025",
    credential: "Cloud Digital Leader",
    url: "#"
  },
  {
    id: "2",
    issuer: "DeepLearning.AI",
    date: "Jan 2026",
    credential: "AI for Everyone",
    url: "#"
  },
  {
    id: "3",
    issuer: "HackerRank",
    date: "Feb 2026",
    credential: "Problem Solving (Advanced)",
    url: "#"
  }
];

export const achievements = [
  {
    id: "1",
    title: "AI Hackathon Winner",
    description: "Secured 1st place building a computer vision model for real-time anomaly detection.",
    date: "March 2026"
  },
  {
    id: "2",
    title: "National Web Designing Competition",
    description: "Awarded Best UI/UX for an innovative, accessible web application design.",
    date: "April 2026"
  },
  {
    id: "3",
    title: "Varsity Sports Captain",
    description: "Led the university basketball team to the regional semi-finals.",
    date: "2025"
  }
];

export const interests = [
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Developer Tools",
  "Open Source",
  "UI Engineering",
  "Cloud Computing",
  "Problem Solving"
];
