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
    id: "just-intelligence-v2",
    title: "JUST Intelligence v2",
    subtitle: "Platform Redesign · AI Features · Rebrand",
    tags: ["Product Design", "AI / ML", "Front-End Dev"],
    year: "present",
    company: "AI Platform",
    accent: "#145064",
    gradient: "135deg, #0a2c35, #145064",
  },
  {
    id: "netflix-disney",
    title: "Netflix & Disney+",
    subtitle: "Multilingual Design Operations",
    tags: ["Design Ops", "Typography", "Team Leadership"],
    year: "2018–present",
    company: "Netflix / Disney+",
    accent: "#E50914",
    gradient: "135deg, #2a0005, #E50914",
  },
  {
    id: "just-rebrand",
    title: "JUST Capital Website",
    subtitle: "Front-End Engineering · WordPress CMS · 35 Custom Modules",
    tags: ["Front-End Dev", "WordPress CMS", "Design Systems"],
    year: "2026",
    company: "CMS Engineering",
    accent: "#E07820",
    gradient: "135deg, #131f2b, #1a3550",
  },
  {
    id: "storycorps",
    title: "StoryCorps",
    subtitle: "iOS & Android Redesign · NPR Partnership",
    tags: ["Mobile Design", "iOS & Android", "React Native"],
    year: "2021",
    company: "StoryCorps",
    accent: "#EF553F",
    gradient: "135deg, #7a2010, #EF553F",
  },
  {
    id: "just-intelligence",
    title: "JUST Intelligence",
    subtitle: "Corporate Accountability Data Platform",
    tags: ["Product Design", "Data Visualization", "Front-End Dev"],
    year: "2025",
    company: "Data Platform",
    accent: "#145064",
    gradient: "135deg, #0a2c35, #145064",
  },
  {
    id: "iata",
    title: "IATA Training",
    subtitle: "Cross-Cultural UX · WeChat",
    tags: ["Cross-Cultural UX", "Mobile Design", "Growth"],
    year: "2023",
    company: "IATA",
    accent: "#004E81",
    gradient: "135deg, #002847, #004E81",
  },
];
