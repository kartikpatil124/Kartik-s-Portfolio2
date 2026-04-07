export type ProjectFilter = "all" | "react" | "node" | "cpp";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  detail: string;
}

export interface SkillMeter {
  label: string;
  value: number;
}

export interface PortfolioProject {
  title: string;
  summary: string;
  detail: string;
  stack: string[];
  filters: ProjectFilter[];
  liveUrl: string;
  githubUrl: string;
  accent: string;
  eyebrow: string;
  image?: {
    src: string;
    alt: string;
  };
  spanClass: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const heroStats: StatItem[] = [
  {
    value: "5+",
    label: "Projects deployed",
    detail: "Client-facing builds shipped from concept to launch.",
  },
  {
    value: "C / C++",
    label: "DSA focus",
    detail: "Comfortable breaking problems down into clean logic.",
  },
  {
    value: "2026",
    label: "Growth mode",
    detail: "Master's in Full Stack Development currently in progress.",
  },
];

export const skillTags = [
  "HTML",
  "CSS",
  "Bootstrap",
  "JavaScript",
  "ReactJS",
  "Node.JS",
  "C",
  "C++",
];

export const skillMeters: SkillMeter[] = [
  { label: "React", value: 85 },
  { label: "Node", value: 80 },
  { label: "JavaScript", value: 88 },
  { label: "C / C++", value: 82 },
];

export const filterOptions: { label: string; value: ProjectFilter }[] = [
  { label: "All", value: "all" },
  { label: "React", value: "react" },
  { label: "Node", value: "node" },
  { label: "C++", value: "cpp" },
];

export const projects: PortfolioProject[] = [
  {
    title: "Kalpavriksha QuickStart",
    summary:
      "A finance-first landing experience built to present training, trust, and conversion in one fast-scanning flow.",
    detail:
      "Structured for bold messaging, immediate CTA visibility, and a clean information ladder for new visitors.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive UI"],
    filters: [],
    liveUrl: "https://kalpavriks.netlify.app/",
    githubUrl: "https://github.com/kartikpatil124",
    accent: "from-cyan-400/70 via-sky-500/35 to-indigo-500/20",
    eyebrow: "Launch-ready marketing build",
    image: {
      src: "/img/Screenshot 2025-08-24 125255.png",
      alt: "Kalpavriksha QuickStart homepage preview",
    },
    spanClass: "xl:col-span-4",
  },
  {
    title: "QuickStart",
    summary:
      "A crisp product-style web experience focused on strong hierarchy, clear calls to action, and modern responsive polish.",
    detail:
      "Designed to feel fast and confident on every screen size while keeping the content lightweight and approachable.",
    stack: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    filters: [],
    liveUrl: "https://quicks-webage.netlify.app/",
    githubUrl: "https://github.com/kartikpatil124",
    accent: "from-lime-300/65 via-emerald-400/30 to-teal-500/20",
    eyebrow: "Responsive product showcase",
    spanClass: "xl:col-span-2",
  },
  {
    title: "Ajay's Cafe",
    summary:
      "A warm hospitality website that brings menu storytelling, brand mood, and local-business trust into one clean layout.",
    detail:
      "Built around visual comfort, quick contact paths, and an inviting brand tone that feels right for a cafe business.",
    stack: ["HTML", "CSS", "JavaScript", "Brand Design"],
    filters: [],
    liveUrl: "https://ajays-webpage.netlify.app/",
    githubUrl: "https://github.com/kartikpatil124",
    accent: "from-amber-300/70 via-orange-400/30 to-rose-500/15",
    eyebrow: "Hospitality brand website",
    spanClass: "xl:col-span-6",
  },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/kartikpatil124" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kartik-patil-21389924a/" },
  { label: "Twitter", href: "https://twitter.com/" },
];
