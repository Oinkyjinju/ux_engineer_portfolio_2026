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
    accent: "#145064",
    gradient: "135deg, #0a2c35, #145064",
  },
  {
    id: "just-wordpress",
    title: "Component System",
    subtitle: "Design System · Figma to PHP",
    tags: ["Design Systems", "Design Engineering", "Front-End Dev"],
    year: "2023–present",
    company: "JUST Capital",
    accent: "#1A6678",
    gradient: "135deg, #0c3545, #1A6678",
  },
  {
    id: "just-rebrand",
    title: "JUST Capital Website",
    subtitle: "Brand Rebrand · Agency Design → WordPress",
    tags: ["Front-End Dev", "WordPress CMS", "Design Systems"],
    year: "2023",
    company: "JUST Capital",
    accent: "#E07820",
    gradient: "135deg, #131f2b, #1a3550",
  },
  {
    id: "netflix-disney",
    title: "Netflix & Disney+",
    subtitle: "Multilingual Design Operations",
    tags: ["Design Ops", "Typography", "Team Leadership"],
    year: "2018–present",
    company: "Wordbank → Unfold",
    accent: "#E50914",
    gradient: "135deg, #2a0005, #E50914",
  },
  {
    id: "iata",
    title: "IATA Training",
    subtitle: "Cross-Cultural UX · WeChat",
    tags: ["Cross-Cultural UX", "Mobile Design", "Growth"],
    year: "2023",
    company: "Wordbank → IATA",
    accent: "#004E81",
    gradient: "135deg, #002847, #004E81",
  },
  {
    id: "storycorps",
    title: "StoryCorps",
    subtitle: "iOS & Android Redesign · NPR Partnership",
    tags: ["Mobile Design", "iOS & Android", "React Native"],
    year: "2021",
    company: "Echobind",
    accent: "#EF553F",
    gradient: "135deg, #7a2010, #EF553F",
  },
];
