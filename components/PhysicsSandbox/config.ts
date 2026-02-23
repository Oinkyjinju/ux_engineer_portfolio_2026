// ─────────────────────────────────────────────
// PHYSICS TUNING — tweak these to change feel
// ─────────────────────────────────────────────
export const PHYSICS = {
  /** World gravity vector — increase Y magnitude for faster drops */
  gravity: [0, -14, 0] as [number, number, number],

  /** Bounciness 0–1. 0 = dead stop, 1 = super bouncy */
  restitution: 0.45,

  /** Surface friction 0–1 */
  friction: 0.6,

  /** Velocity drag — higher = objects slow down faster in air */
  linearDamping: 0.4,

  /** Rotation drag */
  angularDamping: 0.35,

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
    initialPosition: [-2.2, 9, 0.1],
    initialLinvel: [0.3, 0, 0],
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
    initialPosition: [-0.8, 11, -0.2],
    initialLinvel: [-0.5, 0, 0],
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
    initialPosition: [0.4, 10, 0.3],
    initialLinvel: [0.2, 0, 0],
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
    initialPosition: [1.6, 12, -0.1],
    initialLinvel: [-0.3, 0, 0],
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
    initialPosition: [2.8, 10, 0.2],
    initialLinvel: [-0.4, 0, 0],
    title: "StoryCorps",
    description: "Mobile App Redesign",
    tags: ["Mobile Design", "iOS & Android", "Shipped"],
    year: "2021",
    company: "Echobind",
  },
];
