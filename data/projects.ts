export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  year: string;
  company: string;
  accent: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "just-intelligence",
    title: "JUST Intelligence",
    subtitle: "Corporate Accountability Data Platform",
    tags: ["Product Design", "Data Visualization", "Front-End Dev"],
    year: "2021–present",
    company: "JUST Capital",
    accent: "#60a5fa",
    gradient: "135deg, #1e3a5f, #2563EB",
  },
  {
    id: "just-wordpress",
    title: "Component System",
    subtitle: "Scalable Design Engineering",
    tags: ["Design Systems", "PHP/WordPress", "Front-End Dev"],
    year: "2023–present",
    company: "JUST Capital",
    accent: "#34d399",
    gradient: "135deg, #064e3b, #059669",
  },
  {
    id: "netflix-disney",
    title: "Netflix & Disney+",
    subtitle: "Multilingual Design Operations",
    tags: ["Design Ops", "Typography", "Team Leadership"],
    year: "2018–present",
    company: "Wordbank → Unfold",
    accent: "#f87171",
    gradient: "135deg, #7f1d1d, #DC2626",
  },
  {
    id: "iata",
    title: "IATA Training",
    subtitle: "Cross-Cultural UX · WeChat",
    tags: ["Cross-Cultural UX", "Mobile Design", "Growth"],
    year: "2023",
    company: "Wordbank → IATA",
    accent: "#a78bfa",
    gradient: "135deg, #4c1d95, #7C3AED",
  },
  {
    id: "storycorps",
    title: "StoryCorps",
    subtitle: "Mobile App Redesign",
    tags: ["Mobile Design", "iOS & Android", "Shipped"],
    year: "2021",
    company: "Echobind",
    accent: "#fb923c",
    gradient: "135deg, #9a3412, #EA580C",
  },
];
