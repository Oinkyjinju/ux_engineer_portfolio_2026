// ─────────────────────────────────────────────
// PHYSICS TUNING — tweak these to change feel
// ─────────────────────────────────────────────
export const PHYSICS = {
  /** World gravity — lighter than real so objects float and drift */
  gravity: [0, -4, 0] as [number, number, number],

  /** Bounciness 0–1 — fairly bouncy so objects rebound off floor energetically */
  restitution: 0.65,

  /** Surface friction 0–1 */
  friction: 0.4,

  /** Low air drag — objects stay in motion longer between nudges */
  linearDamping: 0.2,

  /** Rotation drag — allows satisfying tumbling */
  angularDamping: 0.18,

  /** Normal speed multiplier */
  timeScaleNormal: 1,

  /** Bullet-time speed on hover — 0.08 = ~8% speed */
  timeScaleSlow: 0.08,

  /** Base physics tick: 1/60 s, multiplied by timeScale */
  baseTick: 1 / 60,
} as const;

// ─────────────────────────────────────────────
// OBJECT SHAPES
// ─────────────────────────────────────────────
export type ObjectShape = "roundedBox" | "sphere" | "capsule" | "torus" | "octahedron" | "tv" | "aircraft" | "phone" | "code";

// ─────────────────────────────────────────────
// PROJECT DATA
// ─────────────────────────────────────────────
export interface SandboxItem {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  shape: ObjectShape;

  /** Starting position [x, y, z] — drop from high Y */
  initialPosition: [number, number, number];

  /** Slight initial nudge so objects don't stack perfectly */
  initialLinvel: [number, number, number];

  // Case study detail panel
  title: string;
  description: string;
  tags: string[];
  year: string;
  company: string;
}

export const SANDBOX_ITEMS: SandboxItem[] = [
  {
    id: "just-intelligence",
    label: "JUST",
    sublabel: "Intelligence",
    color: "#145064",           // JUST Capital teal
    shape: "sphere",
    initialPosition: [-2.5, 9, 0],
    initialLinvel: [1.8, 5, 0],
    title: "JUST Intelligence",
    description: "Corporate Accountability Data Platform",
    tags: ["Product Design", "Data Visualization", "Front-End Dev"],
    year: "2021–present",
    company: "JUST Capital",
  },
  {
    id: "just-wordpress",
    label: "Component",
    sublabel: "System",
    color: "#145064",           // JUST Capital teal
    shape: "code",
    initialPosition: [-0.6, 11, 0],
    initialLinvel: [-2.0, 3, 0],
    title: "Component System",
    description: "Scalable Design Engineering",
    tags: ["Design Systems", "PHP/WordPress", "Front-End Dev"],
    year: "2023–present",
    company: "JUST Capital",
  },
  {
    id: "netflix-disney",
    label: "Netflix &",
    sublabel: "Disney+",
    color: "#E50914",           // Netflix red
    shape: "tv",
    initialPosition: [0.5, 10, 0],
    initialLinvel: [0.8, 6, 0],
    title: "Netflix & Disney+",
    description: "Multilingual Design Operations",
    tags: ["Design Ops", "Typography", "Team Leadership"],
    year: "2018–present",
    company: "Wordbank → Unfold",
  },
  {
    id: "iata",
    label: "IATA",
    sublabel: "Training",
    color: "#004E81",           // Wordbank / IATA navy
    shape: "aircraft",
    initialPosition: [1.8, 12, 0],
    initialLinvel: [-2.5, 4, 0],
    title: "IATA Training",
    description: "Cross-Cultural UX · WeChat",
    tags: ["Cross-Cultural UX", "Mobile Design", "Growth"],
    year: "2023",
    company: "Wordbank → IATA",
  },
  {
    id: "storycorps",
    label: "Story",
    sublabel: "Corps",
    color: "#EF553F",           // StoryCorps coral
    shape: "phone",
    initialPosition: [3.0, 10, 0],
    initialLinvel: [-1.5, 5, 0],
    title: "StoryCorps",
    description: "Mobile App Redesign",
    tags: ["Mobile Design", "iOS & Android", "Shipped"],
    year: "2021",
    company: "Echobind",
  },
];
