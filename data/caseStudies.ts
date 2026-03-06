export interface CaseStudyData {
  id: string;
  role: string;
  team: string;
  challenge: string;
  approach: string;
  process: {
    discover: string[];
    design: string[];
    ship: string[];
  };
  metrics: { value: string; label: string }[];
  tech: string[];
}

export const caseStudies: Record<string, CaseStudyData> = {
  "just-intelligence": {
    id: "just-intelligence",
    role: "Lead Product Designer & Front-End Engineer",
    team: "2 designers · 4 engineers · 1 PM",
    challenge:
      "JUST Capital's flagship data platform needed to make complex ESG and corporate accountability metrics legible to institutional investors — without dumbing down the data or building a dashboard that felt like every other dashboard.",
    approach:
      "I embedded with the engineering team from the start. That meant running user research with analysts, translating those sessions directly into Figma components, and then writing the React that shipped them. No handoff document. No translation layer. I owned the spec and the PR.",
    process: {
      discover: [
        "Stakeholder workshops with research analysts and institutional investors",
        "Session recordings with 12 power users across 3 firm types",
        "Heuristic audit of v1 with 47 annotated issues",
        "Data architecture review to understand query limits",
      ],
      design: [
        "Token-based design system: 150+ variables synced to CSS custom properties",
        "Interactive data visualization system built on D3 specs",
        "Component library in Figma and React — same names, same structure",
        "Accessibility-first from the first wireframe, not the last QA pass",
      ],
      ship: [
        "React + TypeScript front-end, built alongside Figma components",
        "D3.js data visualizations with progressive disclosure patterns",
        "WCAG AA compliance verified with axe-core and VoiceOver",
        "30+ production components shipped over 7 years of iteration",
      ],
    },
    metrics: [
      { value: "7+",  label: "years shipped" },
      { value: "3M+", label: "users reached" },
      { value: "30+", label: "components" },
      { value: "0",   label: "handoff docs needed" },
    ],
    tech: ["React", "TypeScript", "D3.js", "CSS Custom Properties", "Figma", "Design Tokens", "axe-core"],
  },

  "just-wordpress": {
    id: "just-wordpress",
    role: "Design Systems Engineer",
    team: "1 designer · 3 dev teams · 1 content team",
    challenge:
      "JUST Capital's marketing site carried 5+ years of accumulated front-end debt — no component system, no design tokens, no shared language between designers and developers. Three separate teams were building the same patterns three different ways.",
    approach:
      "I audited the entire site, catalogued every UI pattern, and then built a PHP component library backed by a Figma token system. The goal wasn't to rebuild everything at once — it was to create a foundation that made the right thing the easy thing for every developer who touched the codebase.",
    process: {
      discover: [
        "Full UI audit: 200+ screen states catalogued and categorized",
        "Developer interviews to understand where friction was highest",
        "Token extraction from legacy CSS — naming conventions mapped",
        "Figma library gap analysis against existing components",
      ],
      design: [
        "30+ Figma components with documented variants and states",
        "Design token system: semantic tokens layered over primitives",
        "Migration mapping from legacy markup to new component API",
        "Onboarding documentation written for developers, not designers",
      ],
      ship: [
        "PHP component library with Twig templating",
        "CSS custom property system replacing 800+ hardcoded values",
        "Three development teams onboarded within first quarter",
        "Component changelog maintained alongside Figma updates",
      ],
    },
    metrics: [
      { value: "30+", label: "components" },
      { value: "3",   label: "dev teams" },
      { value: "200+", label: "patterns audited" },
      { value: "800+", label: "hardcoded values replaced" },
    ],
    tech: ["PHP", "Twig", "WordPress", "CSS Custom Properties", "Sass", "Figma", "Design Tokens"],
  },

  "netflix-disney": {
    id: "netflix-disney",
    role: "UX Designer & Design Ops Lead",
    team: "Cross-studio · LA + London · Wordbank/Unfold",
    challenge:
      "Maintaining design consistency and typographic quality across 50+ languages for Netflix and Disney+ — while meeting launch deadlines across multiple time zones, writing systems, and cultural contexts. Latin was the easy part.",
    approach:
      "I built the design ops infrastructure that made multilingual work scalable. Typography systems that actually worked in Arabic, Japanese, and Hebrew. Design review processes that worked across studios. Tools that caught layout breaks before QA did.",
    process: {
      discover: [
        "Typography audit across 50+ language families",
        "Studio workflow interviews in LA and London",
        "RTL, CJK, and Devanagari layout requirements research",
        "Brand guideline analysis for both platforms",
      ],
      design: [
        "Multilingual typography system covering Latin, CJK, Arabic, Cyrillic, and Devanagari",
        "RTL layout templates for Arabic and Hebrew",
        "Cross-studio design review process and critique framework",
        "Platform-specific component specs for Netflix and Disney+ brand alignment",
      ],
      ship: [
        "Design handoff packages optimized for localization teams",
        "QA across language variants before every launch",
        "Figma component library scaled across two studios",
        "Studio-to-studio process documentation still in use",
      ],
    },
    metrics: [
      { value: "50+", label: "languages" },
      { value: "2",   label: "global studios" },
      { value: "8+",  label: "year partnership" },
    ],
    tech: ["Figma", "Design Ops", "Typography Systems", "RTL layouts", "CJK layouts", "Localization QA"],
  },

  "iata": {
    id: "iata",
    role: "UX Designer — WeChat Mini-Program",
    team: "Wordbank → IATA · Cross-functional · China-based dev team",
    challenge:
      "IATA needed to deliver aviation training content to Chinese aviation professionals through WeChat — an ecosystem with its own design conventions, technical constraints, and user expectations that are entirely different from Western mobile patterns.",
    approach:
      "I researched WeChat Mini-Program design guidelines deeply before touching Figma. I designed the course delivery interface with Chinese workflows in mind — not a translation of a Western product, but something that felt native to the platform and the audience.",
    process: {
      discover: [
        "WeChat Mini-Program design guidelines and constraint research",
        "IATA training content audit to understand module structure",
        "Chinese mobile user behavior patterns research",
        "WeChat DevTools environment testing for layout constraints",
      ],
      design: [
        "WeChat-native UI patterns for course navigation",
        "Progress tracking and quiz interface design",
        "Chinese-first typography with simplified and traditional variants",
        "Cross-cultural iconography review to avoid misinterpretation",
      ],
      ship: [
        "Full design handoff to China-based development team",
        "Figma specs annotated in English and Mandarin",
        "QA pass in WeChat DevTools across all course modules",
        "Launched 2023",
      ],
    },
    metrics: [
      { value: "WeChat", label: "native platform" },
      { value: "2",      label: "languages in specs (EN + ZH)" },
      { value: "2023",   label: "launched" },
    ],
    tech: ["Figma", "WeChat Mini-Programs", "Cross-cultural UX", "Mobile Design", "Localization"],
  },

  "storycorps": {
    id: "storycorps",
    role: "Lead Mobile Designer — iOS & Android",
    team: "Echobind studio · NPR partnership",
    challenge:
      "StoryCorps' recording app needed a full redesign to serve its growing NPR partnership. The existing app felt dated, the recording experience was fragile, and iOS and Android had diverged into two different products.",
    approach:
      "I led UX and visual design for both platforms simultaneously, designing a shared component system that maintained StoryCorps' warmth and humanity while modernizing the interaction patterns. Working directly with Echobind's engineering team meant I could spec for React Native constraints from the start.",
    process: {
      discover: [
        "User interviews with storytellers of varying technical backgrounds",
        "Competitor recording app audit: Rev, Otter, Voice Memos",
        "App store reviews analysis: 150+ reviews categorized",
        "NPR brand alignment sessions",
      ],
      design: [
        "Cross-platform component system designed for React Native",
        "Recording interface redesign: simpler, more forgiving",
        "Onboarding flow reduced from 7 steps to 3",
        "NPR brand integration without losing StoryCorps identity",
      ],
      ship: [
        "iOS and Android design handoff with platform-specific specs",
        "React Native component annotations for the dev team",
        "Accessibility audit: contrast ratios, touch targets, screen reader labels",
        "Launched on iOS and Android, 2021",
      ],
    },
    metrics: [
      { value: "3",    label: "onboarding steps (down from 7)" },
      { value: "150+", label: "app store reviews analyzed" },
      { value: "2",    label: "platforms shipped (iOS + Android)" },
      { value: "2021", label: "launched" },
    ],
    tech: ["Figma", "iOS", "Android", "React Native specs", "Accessibility", "Design Systems"],
  },
};
