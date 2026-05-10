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
    title: "Just Intelligence v2",
    subtitle: "Architecting the v2 evolution of the Just Intelligence AI platform. In partnership with backend LLM engineering, I lead the design-to-code infrastructure and the integration of generative features, transforming complex datasets into conversational, intelligence-driven interfaces.",
    tags: ["Product Design", "AI / ML", "Front-End Dev"],
    year: "present",
    company: "AI Platform",
    accent: "#145064",
    gradient: "135deg, #0a2c35, #145064",
  },
  {
    id: "netflix-disney",
    title: "Netflix & Disney+",
    subtitle: "Leading Design Operations for global interfaces and I architect the multilingual frameworks required to maintain visual integrity across 7 key markets, bridging brand standards.",
    tags: ["Design Ops", "Typography", "Team Leadership"],
    year: "2018–present",
    company: "Netflix / Disney+",
    accent: "#E50914",
    gradient: "135deg, #2a0005, #E50914",
  },
  {
    id: "storycorps",
    title: "StoryCorps",
    subtitle: "Sole product designer for the end-to-end mobile ecosystem redesign, partnering with NPR and agency leadership to translate brand vision into functional technical specs. I architected the cross-platform component library for React Native and overhauled the onboarding logic to streamline the user experience, ensuring 1:1 visual parity across iOS and Android.",
    tags: ["Product Design", "Cross-Platform Architecture", "Systems Strategy"],
    year: "2021",
    company: "StoryCorps",
    accent: "#EF553F",
    gradient: "135deg, #7a2010, #EF553F",
  },
  {
    id: "just-rebrand",
    title: "Just Capital Website",
    subtitle: "Engineered a modular, component-based WordPress infrastructure to facilitate high-velocity content publishing. Developed a custom library of 35+ reusable modules, bridging a complex design system into a flexible, performant CMS environment with 1:1 visual fidelity.",
    tags: ["Front-End Dev", "WordPress CMS", "Design Systems", "Performance Optimization"],
    year: "2026",
    company: "CMS Engineering",
    accent: "#E07820",
    gradient: "135deg, #131f2b, #1a3550",
  },
  {
    id: "just-intelligence",
    title: "Just Intelligence",
    subtitle: "Designing and engineering the primary interface for institutional market analysis. Bridging the gap between raw data sets and intuitive, interactive visualization systems.",
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
