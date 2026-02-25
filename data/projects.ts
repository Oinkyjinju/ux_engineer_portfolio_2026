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
    subtitle: "Scalable Design Engineering",
    tags: ["Design Systems", "PHP/WordPress", "Front-End Dev"],
    year: "2023–present",
    company: "JUST Capital",
    accent: "#145064",
    gradient: "135deg, #0a2c35, #145064",
  },
  {
    id: "netflix-disney",
    title: "Netflix & Disney+",
    subtitle: "Multilingual Design Operations",
    tags: ["Design Ops", "Typography", "Team Leadership"],
    year: "2018–present",
    company: "Wordbank → Unfold",
    accent: "#E50914",
    gradient: "135deg, #136878, #E50914",
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
    subtitle: "Mobile App Redesign",
    tags: ["Mobile Design", "iOS & Android", "Shipped"],
    year: "2021",
    company: "Echobind",
    accent: "#EF553F",
    gradient: "135deg, #7a2010, #EF553F",
  },
];
