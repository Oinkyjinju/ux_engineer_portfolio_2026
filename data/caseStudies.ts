export interface VisualBlock {
  id: string;
  caption: string;
  layout: "before-after" | "wide";
  label?: string;
  beforeSrc?: string;
  afterSrc?: string;
  imageSrc?: string;
}

export interface CaseStudyData {
  id: string;
  seoTitle?: string;
  seoDescription?: string;
  heroIntro?: string;
  role: string;
  team: string;
  snapshot?: {
    timeline?: string;
    tools?: string;
  };
  challenge: string;
  approach: string;
  whatIDid?: string;
  process: {
    discover: string[];
    design: string[];
    ship: string[];
  };
  keyDecisions?: string[];
  outcomes?: string[];
  visualBlocks?: VisualBlock[];
  metrics: { value: string; label: string }[];
  tech: string[];
  reflection?: string;
  ctaText?: string;
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
      { value: "8+",  label: "years partnership" },
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
        "Live in WeChat — available to Chinese aviation professionals",
      ],
    },
    metrics: [
      { value: "100%", label: "WeChat-native UI patterns" },
      { value: "2",    label: "spec languages (EN + ZH)" },
    ],
    tech: ["Figma", "WeChat Mini-Programs", "Cross-cultural UX", "Mobile Design", "Localization"],
  },

  "storycorps": {
    id: "storycorps",
    seoTitle: "StoryCorps Case Study — Cross-Platform UX Redesign | Jinju Park",
    seoDescription:
      "I led UX and visual design for StoryCorps on iOS and Android, reducing onboarding friction and improving recording reliability for real families preserving oral history.",
    heroIntro:
      "StoryCorps preserves oral history for the Library of Congress. I led UX and visual design across iOS and Android to make recording and sharing stories more reliable, accessible, and easier for first-time users.",
    role: "Lead Mobile Designer (iOS + Android)",
    team: "Solo designer · 1 director · 2 engineers · NPR stakeholders",
    snapshot: {
      timeline: "6 weeks / 2021",
      tools: "Figma, React Native specs, WCAG AA checks",
    },
    challenge:
      "StoryCorps had meaningful mission value, but the app experience was fragile. Recording sessions could fail without clear recovery, onboarding created unnecessary friction, and iOS/Android patterns had diverged enough to feel like two different products. With NPR partnership visibility increasing, the product needed to handle more users without losing trust.",
    approach:
      "I led UX and visual design for both platforms simultaneously — one shared component system, no separate iOS/Android workstreams. The design constraint I kept returning to: this app is used by grandparents recording family history, not tech-early-adopters. Every interaction had to be forgiving by default. Working directly with Echobind's React Native team meant I was speccing against real implementation constraints, not handing off to a black box.",
    whatIDid:
      "I owned end-to-end UX and visual direction across both platforms. My focus was to create one coherent component system, simplify first-time recording, and design forgiving flows for users who are not power users — including older adults and families recording emotionally important conversations.",
    process: {
      discover: [
        "Interviewed storytellers and reviewed App Store feedback to identify top failure points — especially around recording loss and confusing onboarding",
        "Competitor recording app audit: Rev, Otter, Voice Memos",
        "150+ App Store reviews analyzed — dominant theme was lost recordings with no recovery path",
        "NPR brand alignment sessions to understand new user segment and co-brand requirements",
      ],
      design: [
        "Built a shared cross-platform component system and redesigned high-risk flows: onboarding, recording, and submission",
        "Recording interface redesign: persistent session state, visible time counter, one-tap pause — designed so a dropped call doesn't mean a lost story",
        "Onboarding reduced from 7 steps to 3 by removing the forced account-creation gate — first recording possible without signing up",
        "NPR brand integration without losing StoryCorps' warmth — two identities, one coherent experience",
      ],
      ship: [
        "Partnered directly with engineers during implementation and documented platform-specific behavior",
        "React Native component annotations with explicit platform-divergence notes — where iOS and Android behavior differs, the spec said why",
        "Accessibility audit against WCAG AA: contrast ratios, touch targets (44px min), screen reader labels — critical for an older user base",
        "Published to App Store and Google Play",
      ],
    },
    keyDecisions: [
      "Reduced onboarding from 7 steps to 3 and removed forced account gating before first value.",
      "Redesigned recording flow with persistent state, clear status/timer feedback, and safer interruption handling.",
      "Unified iOS/Android interaction patterns through one React Native-ready component language.",
      "Integrated NPR co-brand elements without losing StoryCorps warmth and clarity.",
    ],
    outcomes: [
      "Onboarding steps reduced from 7 → 3",
      "4.6★ App Store rating (iOS)",
      "First recording completion increased (reduction in session abandonment)",
      "Recording-related failure/support complaints reduced after reliability redesign",
      "Single shared component system shipped across iOS and Android",
      "Accessibility compliance to WCAG AA across all critical recording flows",
    ],
    visualBlocks: [
      {
        id: "onboarding",
        layout: "before-after",
        label: "Onboarding",
        caption: "Removed account gate and compressed task to first recording.",
        beforeSrc: "/storycorps/onboarding-before.png",
        afterSrc: "/storycorps/onboarding-after.png",
      },
      {
        id: "recording",
        layout: "before-after",
        label: "Recording Screen",
        caption: "Introduced persistent session visibility and interruption-safe interaction.",
        beforeSrc: "/storycorps/recording-before.png",
        afterSrc: "/storycorps/recording-after.png",
      },
      {
        id: "flow",
        layout: "wide",
        caption: "Question selection → record → edit metadata/photo → preview → publish.",
        imageSrc: "/storycorps/flow-map.png",
      },
      {
        id: "system",
        layout: "wide",
        caption: "Shared components and where iOS/Android intentionally diverge.",
        imageSrc: "/storycorps/design-system.png",
      },
    ],
    metrics: [
      { value: "4.6★", label: "App Store rating" },
      { value: "3",    label: "onboarding steps (from 7)" },
      { value: "2",    label: "platforms, 1 shared component system" },
    ],
    tech: ["Figma", "iOS", "Android", "React Native specs", "WCAG AA", "Design Systems"],
    reflection:
      "Designing for StoryCorps meant designing for emotional stakes, not just task completion. The biggest lesson was that reliability is a UX feature: when users trust the recording flow, they focus on the story, not the interface.",
    ctaText:
      "Interested in how I design and ship production-ready UX across product and engineering? Let's talk.",
  },
};
