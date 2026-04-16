export interface VisualBlock {
  id: string;
  caption: string;
  layout: "before-after" | "wide" | "side-by-side" | "screen-grid" | "pipeline";
  label?: string;
  phoneScroll?: boolean;   // wrap image(s) in scrollable phone mockup frame
  blendMode?: string;      // CSS mix-blend-mode (e.g. "multiply" for white-bg PNGs on dark backgrounds)
  noContainer?: boolean;   // render image with no card background/border (for logo/hero images)
  beforeSrc?: string;
  afterSrc?: string;
  afterScreens?: Array<{ src: string; label: string }>;
  imageSrc?: string;
  // side-by-side: second image + its caption
  imageSrc2?: string;
  caption2?: string;
  // screen-grid: ordered list of screen src + label pairs
  screens?: { src: string; label: string }[];
}

export interface CodeFile {
  label: string;
  code: string;
  language: "css" | "tsx" | "twig" | "php" | "html" | "js";
}

export interface CodeBlock {
  id: string;
  title: string;
  description: string;
  // Single-file (backward compat — used when `files` is absent)
  code?: string;
  language?: "css" | "tsx" | "twig" | "php" | "html" | "js";
  // Multi-file tabs — takes precedence over `code`/`language`
  files?: CodeFile[];
  previewSrc?: string;
  previewHtml?: string;
  liveUrl?: string;
}

export interface CaseStudyData {
  id: string;
  seoTitle?: string;
  seoDescription?: string;
  heroLede?: string;
  heroIntro?: string;
  layout?: "standard" | "narrative";
  processLayout?: "columns" | "stacked" | "thematic";
  keyDecisionsLayout?: "grid" | "stacked";
  leadVisualId?: string;
  leadVisualHeader?: string;
  role: string;
  team?: string;
  snapshot?: {
    company?: string;
    timeline?: string;
    tools?: string;
    discipline?: string;
    productImpact?: string;
    scale?: string;
  };
  challengeQuote?: string;
  challenge: string;
  approach: string;
  approachHeader?: string;
  whatIDid?: string;
  whatIDidHeader?: string;
  process: {
    discover: string[];
    design: string[];
    ship: string[];
    govern?: string[];
  };
  processHeader?: string;
  processTitles?: {
    discover?: string;
    design?: string;
    ship?: string;
    govern?: string;
  };
  keyDecisions?: string[];
  keyDecisionsLabel?: string;
  outcomes?: string[];
  outcomesHeader?: string;
  visualBlocks?: VisualBlock[];
  visualBlocksHeader?: string;
  visualBlocksColumns?: 2;  // render wide blocks in a 2-column grid
  codeBlocks?: CodeBlock[];  // code + preview pairs shown in the case study
  codeBlocksHeader?: string;
  codeBlocksDescription?: string;
  metrics: { value: string; label: string }[];
  metricsHeader?: string;
  tech: string[];
  languagesSection?: {
    header: string;
    description: string;
    groups: {
      title: string;
      focus: string;
      constraints: string;
    }[];
  };
  reflection?: string;
  reflectionHeader?: string;
  ctaText?: string;
  liveSiteUrl?: string;
  phase2Teaser?: string;
  phase2Url?: string;
  specSheet?: { label: string; value: string }[];
}

export const caseStudies: Record<string, CaseStudyData> = {
  "just-intelligence": {
    id: "just-intelligence",
    seoTitle: "Just Intelligence: Corporate Accountability Data Platform | Jinju Park",
    seoDescription:
      "7 years designing and building Just Capital's flagship data platform, from research sessions with financial analysts to 30+ production React components, serving 3M+ users across institutional investors and the general public.",
    heroIntro:
      "Just Intelligence bridges the gap between raw datasets and interactive visualizations. Tracking the Russell 1000 across 240+ weighted indicators, the platform is engineered specifically for financial analysts and institutional researchers.\n\nAs Lead Product Designer and Front-End Engineer, I architected the design token infrastructure, React component library, and custom D3.js visualization system. At this scale, longevity is the ultimate metric. By building every component from a strict abstraction model and rigorously decoupling the logic from the visual layer, the platform survived two corporate rebrands without a single codebase rewrite. That isn't luck\u2014that is architecture.",
    role: "Lead Product Designer & Front-End Engineer",
    snapshot: {
      company: "Just Capital",
      timeline: "2025\u20132026",
      tools: "TypeScript, D3.js, Figma, HTML, PHP, CSS",
    },
    specSheet: [],
    challengeQuote: "Engineering for Institutional Rigor",
    approachHeader: "The Philosophy",
    challenge:
      "The primary challenge was balancing immense data density with the high standard of accuracy required in institutional finance. Professional analysts require total transparency to reconcile platform metrics with their own internal models, while general users need an intuitive entry point into complex corporate performance data. With 240+ weighted indicators across the Russell 1000, the architectural goal was to deliver mathematical precision for expert audit and visual clarity for public consumption.",
    approach:
      "I embedded with the engineering team to ensure the interface could scale across various levels of data literacy. By operating as the direct link between user research and the UI layer, I eliminated the typical friction of design handoff. I translated research insights directly into Figma components and then implemented them into the production code. This created a \"zero-gap\" environment where every component was built with a deep understanding of the underlying data architecture, ensuring the design remained a faithful representation of production reality.",
    processTitles: {
      discover: "Mapping Data Utility",
      design: "Foundational Architecture",
      ship: "Fidelity and Hierarchy",
    },
    process: {
      discover: [
        "The Trust Gap: User sessions revealed a core tension. While users trusted the data methodology, they struggled to navigate the high-density environment at the speed required for professional analysis.",
        "Persona-Driven Prioritization: I evaluated specific persona requirements to determine how different users extract value from the data. I prioritized features and tools based on these distinct user goals, ensuring the interface served the most critical tasks for each group.",
        "Technical Constraints: Latency limitations ruled out real-time filtering of the full dataset. This turned progressive disclosure into a strict architectural requirement to maintain performance.",
        "User Segmentation: I identified three distinct user groups: Asset Managers, Market Researchers, and Corporates. These groups had different entry points, which required a modular Information Architecture that could adapt to varying data needs.",
      ],
      design: [
        "Token Infrastructure: I engineered a CSS variable system that mirrored Figma variables 1:1. This established a unified visual language between the design files and the production code from the start.",
        "D3 Visualization: I used D3.js logic to visually simplify complex data tables. By adding visual cues and patterns to the rows and columns, I enabled users to scan the Russell 1K and identify key trends much faster than reading raw text.",
        "Abstraction Model: I built every UI component from a centralized abstraction model. This ensured that the layout remained consistent and easy to manage as the scale of the data increased.",
      ],
      ship: [
        "Integrated Workflow: I developed the UI layer and CSS alongside the engineering team. This proximity allowed for a zero-handoff environment where research insights were moved into production within the same deployment cycle.",
        "Information Hierarchy: I implemented a five-level drill-down structure to manage the 240+ indicators. This allows users to navigate logically from a high level Overview, to Stakeholder groups, then down to specific Issues, Metrics, and finally individual Data Points.",
        "Design Fidelity: I ensured that every interaction in the final product maintained 1:1 parity with the design intent. This resulted in a high-fidelity interface that remained a faithful representation of the underlying data.",
      ],
    },
    keyDecisions: [
      "Research before UI — The first month of the project was dedicated to user research and defining the specific tools needed. By prioritizing persona requirements before building, I ensured the tools we created were actually useful for the audience.",
      "Custom Scannability over Defaults — Standard table libraries couldn't handle the Russell 1000 dataset efficiently. I collaborated with the CTO to build custom D3 logic that focused on visual scanning. We prioritized showing patterns and gaps in the data so users could retrieve information much faster than reading raw text.",
      "User Flow over Technical Complexity — To handle back-end latency, I advocated for a progressive disclosure model. Instead of trying to show everything at once, I designed the flow to reveal data in logical layers. This kept the platform fast and ensured a stable experience for the user.",
    ],
    keyDecisionsLabel: "Key Tradeoffs",
    outcomes: [],
    visualBlocksHeader: "What Got Built",
    visualBlocks: [
      {
        id: "hero",
        layout: "wide",
        imageSrc: "/just/just-ji-hero.png",
        caption: "The Scenario Analysis tool moves beyond static data by allowing users to modify specific indicator weights and observe the direct impact on final company scores. By simulating different performance scenarios, researchers can conduct hypothesis-based analysis grounded in adjustable and valid datasets.",
      },
      {
        id: "explorer-results",
        layout: "wide",
        imageSrc: "/just/just-ji-explorer.png",
        caption: "The View Scenario Result page provides a focused analysis by highlighting only the specific stakeholders, issues, and metrics affected by ranking adjustments. By isolating these variables from the broader dataset, the interface allows users to concentrate on the direct outcomes of their modifications. The page also explicitly displays the value changes made relative to the original data, ensuring transparency in how custom inputs influence both overall and industry-level rankings.",
      },
      {
        id: "ranking",
        layout: "wide",
        imageSrc: "/just/just-ji-ranking.png",
        caption: "The Performance Explorer consolidates overall and industry rankings into a horizontal view, allowing for simultaneous comparison of current and previous year data across every stakeholder. By displaying ranking weights and year-over-year shifts in a single layout, the interface enables users to evaluate performance trends without the need for multiple navigation steps. High-contrast color indicators are applied to categorize rankings into tiers, providing a visual shorthand that helps users quickly identify their standing and navigate the complexities of the stakeholder landscape.",
      },
    ],
    metrics: [
      { value: "Market Launch",    label: "Delivered 6 tools within the first production platform for institutional investors." },
      { value: "Scalable Core",    label: "Durable CSS infrastructure that handled massive data growth without requiring rewrites." },
      { value: "1:1 Fidelity",     label: "1:1 parity between Figma and code to ensure the visual precision required by analysts." },
      { value: "Data Speed",       label: "Simplified dense datasets into a scannable tool using D3 and a 5-level hierarchy." },
    ],
    tech: [],
    reflection:
      "Designing Just Intelligence proved that professional UX is about mastering data density, not avoiding it. When analysts navigate hundreds of metrics, the interface must prioritize mental speed and structural clarity. I learned that the real value of a design is measured by how quickly it helps a user reach a decision. A successful tool does more than look clean; it turns complex data into actionable confidence.",
    ctaText: "I build products designed to last. If you need a foundation that works right the first time, let's talk.",
    phase2Teaser: "Phase 2: redesigned the platform as Just Capital rebranded, introducing new features driven by real user usage patterns and fresh stakeholder feedback to improve the analyst experience end-to-end.",
    phase2Url: "/work/just-intelligence-v2",
  },

  "just-intelligence-v2": {
    id: "just-intelligence-v2",
    seoTitle: "JUST Intelligence v2 — Platform Redesign & AI Features | Jinju Park",
    seoDescription:
      "Redesigned JUST Capital's flagship data platform with AI-powered search, live stakeholder treemaps, and peer comparison tools — driven by real user usage patterns and a full visual rebrand.",
    heroIntro:
      "Led the UX strategy and front-end development for the Just Intelligence v2 ecosystem. In collaboration with backend engineering, I translated complex LLM outputs into intuitive, conversational interfaces and engineered the supporting data-to-code infrastructure. My work focused on auditing divergent user flows to transform the platform from a static data source into a high-utility decision tool. By rebuilding the UI around real-world analyst behaviors, I replaced manual CSV-heavy workflows with native peer-benchmarking and scenario-modeling features that drive daily strategic engagement. I also sole-engineered the entire front-end codebase, from component architecture to production deployment.",
    role: "Lead Product Designer & Sole Front-End Engineer",
    snapshot: {
      company: "Just Capital",
      timeline: "2025–2026",
      tools: "TypeScript, JavaScript, D3, PHP, HTML, CSS Custom Properties, Figma, Design Tokens",
    },
    specSheet: [],
    whatIDid:
      "I owned the full front-end refactor from V1\u2019s rigid styling to a scalable, semantic CSS token structure \u2014 the architectural foundation the upcoming rebrand required. From there, I extrapolated the parent company\u2019s marketing brand into a specialized visual language built for dense data interfaces, then carried that system through to production: implementing disclosure workflows surfaced by user feedback, refining micro-interactions across the UI, and redesigning the conversational UX for the AI search interface ahead of its live release.",
    challengeQuote: "Focusing on the V2 evolution, the new CSS architecture, and integrating V1 feedback.",
    challenge:
      "Following a successful initial launch, Phase 2 required maturing the platform from an early-stage product into a scalable enterprise system. The functional challenge involved integrating critical user feedback from the V1 launch, adding new workflows like a \u201Cdisclose now\u201D feature, and refining micro-interactions across the UI.\n\nThe technical challenge was rooted in technical debt. Phase 1 was built without a semantic design system because the framework boundaries were still being defined during early research and development. The V2 mandate required entirely refactoring the front-end CSS architecture into a strict semantic token structure to ensure future scalability and support a massive upcoming visual overhaul.",
    approach:
      "The core strategic hurdle was the rebrand. The new corporate branding was designed exclusively for the parent company\u2019s marketing presence, not for a dense, data-heavy intelligence platform. I led the effort to extrapolate and upgrade these brand guidelines, creating a specialized visual language that supported complex data visualization without losing the core brand identity.\n\nBecause the underlying information architecture was already validated in Phase 1, my focus was on UX strategy with the front-end execution and CSS migration. I updated the entire front-end to utilize the new semantic token structure and refined the UX for the conversational AI search interface, establishing a highly polished design foundation prepared for future live deployment.",
    processLayout: "thematic",
    processHeader: "The Execution",
    processTitles: {
      discover: "System Architecture & Tokens",
      design: "Brand Extrapolation",
      ship: "Closing Product Gaps",
    },
    process: {
      discover: [
        "Refactored the rigid V1 front-end into a strict semantic CSS token system, establishing the technical foundation required for scalable, enterprise-level theming.",
      ],
      design: [
        "Translated the parent company\u2019s high-level marketing guidelines into an accessible, high-density visual language optimized for complex data visualization and D3 components.",
      ],
      ship: [
        "Upgraded the AI search interface and engineered new, highly-requested features. This directly addressed the biggest friction points reported by users after the initial launch, keeping them inside the platform instead of forcing them to work externally.",
      ],
    },
    keyDecisions: [
      "Technical Debt vs. Velocity — Transitioning to a semantic CSS token system required a massive front-end refactor. The tradeoff was deciding between a complete \u201Cstop-the-world\u201D rewrite of the legacy codebase or an incremental adoption. I chose an incremental approach, wrapping legacy components in the new token architecture where possible. This created temporary technical debt in the styling layer, but it allowed us to ship the new corporate rebrand and new features without halting product momentum.",
      "Modernization vs. Workflow Continuity — Upgrading a platform used daily by enterprise analysts means battling ingrained habits. When redesigning the core workflows, the tradeoff was deciding how aggressively to modernize the UX without breaking the users\u2019 established muscle memory. We intentionally retained several legacy layout patterns and information hierarchies, even if they were not the most \u201Cmodern\u201D design choices, to ensure a seamless transition for active users relying on the platform for daily modeling.",
    ],
    keyDecisionsLabel: "Key Tradeoffs",
    outcomes: [],
    visualBlocksHeader: "v1 → v2",
    visualBlocks: [
      {
        id: "ai-ask",
        layout: "wide",
        imageSrc: "/just/ji-ai-ask.png",
        caption: "AI Ask Me Anything — prompt cards scaffold common queries. 4-min manual workflows → 30-second lookups. Every response cites its source data.",
      },
      {
        id: "stakeholder-before-after",
        layout: "before-after",
        beforeSrc: "/just/just-ji-stk-old.png",
        afterSrc: "/just/ji-stakeholder-performance.png",
        caption: "v1: raw ranks in a flat table. v2: quintile-coded pillar cards, expandable bar charts benchmarked against industry average and top performer, live index return. Scan-and-export → at-a-glance diagnostic.",
      },
      {
        id: "treemap-before-after",
        layout: "before-after",
        beforeSrc: "/just/just-ji-treemap-old.svg",
        afterSrc: "/just/ji-performance-explorer-treemap.png",
        caption: "Engineered a dynamic hierarchy locator. This solves navigation friction by keeping general users oriented across all 5 drill-down levels.",
      },
      {
        id: "performance-highlights",
        layout: "before-after",
        beforeSrc: "/just/just-ji-highlight-old.svg",
        afterSrc: "/just/ji-performance-highlights.png",
        caption: "V1: Required navigating away to a hidden page just to view performance summaries. V2: Eliminated this friction. Users now see a brief, immediate summary of their top and worst 5 metrics alongside total industry size without a single click.",
      },
      {
        id: "explorer-before-after",
        layout: "before-after",
        beforeSrc: "/just/just-ji-stk-dpcard-old.svg",
        afterSrc: "/just/ji-explorer-dpcard.png",
        caption: "V1: A dense research view containing legacy tables and charts but lacking actionable next steps. V2: Applied a complete visual overhaul to the existing charts and tables to improve legibility. The core challenge was integrating new workflows like the \u201CPeer Comparison\u201D and \u201CDisclose Now\u201D buttons into this highly constrained space. I engineered a harmonious layout that balances the dense data with these new primary actions without causing visual clutter.",
      },
      {
        id: "peer-comparison",
        layout: "before-after",
        beforeSrc: "/just/just-ji-pc-dp-old.png",
        afterSrc: "/just/just-ji-pc-dp.png",
        caption: "V1: Legacy peer benchmarking relying on constrained views and tooltips. V2: Upgraded to a highly legible, structured format. The critical UX enhancement is the new direct path to Scenario Analysis. Users can now compare against peers and immediately run predictive models in a single, continuous research flow.",
      },
      {
        id: "scenario-before-after",
        layout: "before-after",
        beforeSrc: "/just/just-ji-scenario-old.png",
        afterSrc: "/just/ji-scenario-analysis-create_new.png",
        caption: "Workflow Unification: V1: Scenario creation and results were fragmented across multiple separate pages, creating a disjointed user loop. V2: Unified the modeling workflow into a single dynamic workspace. By anchoring the layout with distinct \u201CCreate\u201D and \u201CFind\u201D cards, I consolidated multiple legacy views into interchangeable modules on a single screen. During scenario creation, company data is intentionally restricted to just core rankings to eliminate visual noise and keep the user entirely focused on their inputs.",
      },
    ],
    codeBlocksHeader: "The System in Code",
    codeBlocksDescription: "The token architecture that powered the V2 migration. A single semantic layer that connected brand identity, data visualization, and accessibility compliance — so every component spoke the same language from day one.",
    codeBlocks: [
      {
        id: "css-token-system",
        title: "CSS Custom Properties Architecture",
        description: "The three-layer token system: global definitions, component application, and accessibility compliance — all governed by a single source of truth.",
        code: `/* 1. Global Token System (The Architecture) */
:root {
  /* Brand Typography with System Fallbacks */
  --font-primary: 'Nexa', system-ui, sans-serif;

  /* Core Brand & Accessible Surfaces */
  --surface-primary-dark: #00426a;
  --action-primary-blue: #006298;

  /* Semantic Data Scale (Performance Quintiles) */
  --data-tier-top-5: #93C47D;
  --data-tier-bottom-5: #E95858;
}

/* 2. Component Application (The Execution) */
.data-table-cell[data-rank="top-5"] {
  /* Enterprise best practice: providing a hardcoded fallback */
  background-color: var(--data-tier-top-5, #93C47D);
  color: var(--surface-primary-dark);
}

.company-switch-dropdown {
  background-color: var(--surface-primary-dark);
  font-family: var(--font-primary);
}

/* 3. Accessibility (Proving WCAG AA Compliance) */
.company-switch-dropdown:focus-visible {
  outline: 2px solid var(--data-tier-top-5);
  outline-offset: 2px;
}`,
        language: "css",
      },
    ],
    metrics: [],
    tech: [],
    reflectionHeader: "Bridging the Gap Between Canvas and Code",
    reflection:
      "Phase 2 was a masterclass in full-stack design. It validated that the most effective way to ship enterprise-grade UI is to own the pipeline from the initial wireframes straight through to the front-end CSS. Speaking the language of both user experience and technical architecture allowed me to seamlessly integrate complex workflows while maintaining absolute control over the final visual fidelity.",
    ctaText: "If you're transforming a product that people already depend on — I've architected that transition without breaking the trust that took years to build.",
  },

  "just-wordpress": {
    id: "just-wordpress",
    role: "Design Systems Engineer",
    team: "1 designer · 3 dev teams · 1 content team",
    specSheet: [
      { label: "Primary Stack", value: "PHP · Twig · CSS Custom Properties · Figma Tokens" },
      { label: "Accessibility", value: "WCAG 2.1 AA baseline across all components" },
      { label: "Engineering Impact", value: "100% design-to-code parity · 800+ hardcoded values replaced" },
      { label: "Scale", value: "30+ components · 3 dev teams onboarded" },
    ],
    challenge:
      "5+ years of accumulated front-end debt. No component system. No design tokens. No shared language between design and engineering. Three separate teams building the same patterns three different ways — a force multiplier in reverse.",
    approach:
      "I architected a headless design system that served as the single source of truth across teams — a PHP component library backed by a Figma token pipeline. The goal: make the right thing the easy thing for every developer who touches the codebase. Design-to-code parity, not design-to-code aspiration.",
    process: {
      discover: [
        "Full UI audit: 200+ screen states catalogued — mapped every pattern, variant, and inconsistency across the codebase",
        "Developer interviews to identify highest-friction handoff points — where design intent broke down in implementation",
        "Token extraction from legacy CSS — 800+ hardcoded values catalogued with naming convention mapping",
        "Figma library gap analysis: what existed, what was missing, what was wrong",
      ],
      design: [
        "30+ Figma components with documented variants, states, and responsive behavior — the spec that became the contract",
        "Two-layer token architecture: semantic tokens over primitives. The abstraction layer that later absorbed a full rebrand as a token swap",
        "Migration mapping from legacy markup to component API — incremental adoption path, not a rewrite mandate",
        "Developer-first documentation: onboarding written for engineers, not designers",
      ],
      ship: [
        "PHP component library with Twig templating — bridging Figma tokens to a legacy WordPress CMS",
        "CSS custom property system replacing 800+ hardcoded values with a single source of truth",
        "Three development teams onboarded within first quarter — deployment velocity increase measurable by Q2",
        "Component changelog maintained in lockstep with Figma updates — design-to-code parity enforced, not assumed",
      ],
    },
    metrics: [
      { value: "30+", label: "components" },
      { value: "3",   label: "dev teams" },
      { value: "200+", label: "patterns audited" },
      { value: "800+", label: "hardcoded values replaced" },
    ],
    codeBlocksHeader: "The System in Code",
    codeBlocks: [
      {
        id: "tokens",
        title: "Design Token Architecture",
        description: "Semantic tokens layered over primitives — the two-layer system that let a full rebrand ship as a token swap, not a codebase sweep. 800+ hardcoded values replaced with a single source of truth.",
        language: "css",
        previewHtml: `<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'JetBrains Mono', 'Courier New', monospace; background: #f8f7f2; padding: 20px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .swatch { border-radius: 8px; overflow: hidden; border: 1px solid rgba(0,0,0,0.08); }
  .color { height: 52px; }
  .label { padding: 8px 10px; background: white; }
  .name { font-size: 10px; color: #555; letter-spacing: 0.04em; text-transform: uppercase; }
  .hex { font-size: 11px; color: #888; margin-top: 2px; }
  .section { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #aaa; margin: 16px 0 8px; }
</style>
</head>
<body>
  <div class="section">Primitive</div>
  <div class="grid">
    <div class="swatch"><div class="color" style="background:#0c3545"></div><div class="label"><div class="name">teal-900</div><div class="hex">#0c3545</div></div></div>
    <div class="swatch"><div class="color" style="background:#145064"></div><div class="label"><div class="name">teal-700</div><div class="hex">#145064</div></div></div>
    <div class="swatch"><div class="color" style="background:#1a6678"></div><div class="label"><div class="name">teal-500</div><div class="hex">#1a6678</div></div></div>
    <div class="swatch"><div class="color" style="background:#f8f7f2; border: 1px solid #e5e5e0;"></div><div class="label"><div class="name">neutral-100</div><div class="hex">#f8f7f2</div></div></div>
  </div>
  <div class="section">Semantic</div>
  <div class="grid">
    <div class="swatch"><div class="color" style="background:#145064"></div><div class="label"><div class="name">--color-brand</div><div class="hex">→ teal-700</div></div></div>
    <div class="swatch"><div class="color" style="background:#0f0f0f"></div><div class="label"><div class="name">--color-text</div><div class="hex">→ neutral-900</div></div></div>
  </div>
</body>
</html>`,
        code: `/* ─── Primitive layer ─── */
:root {
  --color-teal-900: #0c3545;
  --color-teal-700: #145064;
  --color-teal-500: #1a6678;
  --color-neutral-100: #f8f7f2;
  --color-neutral-900: #0f0f0f;

  /* ─── Semantic layer ─── */
  --color-brand:         var(--color-teal-700);
  --color-brand-subtle:  var(--color-teal-900);
  --color-text:          var(--color-neutral-900);
  --color-surface:       var(--color-neutral-100);

  /* ─── Component tokens ─── */
  --button-bg:           var(--color-brand);
  --button-text:         var(--color-surface);
  --button-bg-hover:     var(--color-teal-900);
}`,
      },
      {
        id: "quote-block",
        title: "Quote Block Component",
        description: "One Twig template handles pull quotes, testimonials, and stat callouts — the variant prop does the visual work, the data structure stays consistent across all three.",
        language: "twig",
        previewHtml: `<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Georgia, serif; background: #f8f7f2; padding: 32px 28px; display: flex; flex-direction: column; gap: 20px; }
  .c-quote { padding: 20px 24px; border-radius: 8px; }
  .c-quote--standard { background: white; border-left: 3px solid #145064; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
  .c-quote--stat { background: #145064; color: white; text-align: center; border-radius: 10px; padding: 24px; }
  .c-quote__text { font-size: 15px; line-height: 1.65; color: #1a1a1a; font-style: italic; }
  .c-quote--stat .c-quote__text { font-size: 32px; font-weight: bold; color: white; font-style: normal; }
  .c-quote__cite { display: block; margin-top: 12px; font-size: 12px; font-family: 'Courier New', monospace; color: #888; font-style: normal; letter-spacing: 0.04em; }
  .c-quote--stat .c-quote__cite { color: rgba(255,255,255,0.65); margin-top: 8px; }
  .c-quote__role { display: block; font-size: 11px; color: #aaa; margin-top: 2px; }
  .c-quote--stat .c-quote__role { color: rgba(255,255,255,0.45); }
  .label { font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #bbb; margin-bottom: 6px; }
</style>
</head>
<body>
  <div>
    <div class="label">variant: standard</div>
    <blockquote class="c-quote c-quote--standard">
      <p class="c-quote__text">"The data doesn't lie — corporations that invest in their workers outperform those that don't."</p>
      <cite class="c-quote__cite">Martin Whittaker<span class="c-quote__role">CEO, Just Capital</span></cite>
    </blockquote>
  </div>
  <div>
    <div class="label">variant: stat</div>
    <blockquote class="c-quote c-quote--stat">
      <p class="c-quote__text">800+</p>
      <cite class="c-quote__cite">hardcoded values replaced<span class="c-quote__role">across 3 dev teams, 1 design system</span></cite>
    </blockquote>
  </div>
</body>
</html>`,
        code: `{# ─── quote.twig ─── #}
<blockquote
  class="c-quote c-quote--{{ variant | default('standard') }}"
  data-component="quote"
>
  <p class="c-quote__text">{{ text }}</p>

  {% if author %}
    <cite class="c-quote__cite">
      {{ author }}
      {% if role %}
        <span class="c-quote__role">{{ role }}</span>
      {% endif %}
    </cite>
  {% endif %}
</blockquote>`,
      },
      {
        id: "layout-module",
        title: "Layout Module System",
        description: "Composable page sections built from shared layout primitives. Three development teams, one layout vocabulary — the module API was the contract that kept them from building the same thing three ways.",
        language: "php",
        previewHtml: `<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Courier New', monospace; background: #f8f7f2; padding: 20px; }
  .page { border: 1.5px solid #c5c3be; border-radius: 8px; overflow: hidden; }
  .zone { padding: 10px 14px; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #888; border-bottom: 1px solid #e0ded9; }
  .zone:last-child { border-bottom: none; }
  .header { background: #145064; color: rgba(255,255,255,0.7); }
  .split { display: grid; grid-template-columns: 1fr 1fr; }
  .split .zone { border-right: 1px solid #e0ded9; }
  .split .zone:last-child { border-right: none; }
  .footer { background: #f0ede8; color: #aaa; }
  .prop { margin-top: 16px; }
  .prop-label { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #bbb; margin-bottom: 6px; }
  .prop-row { display: flex; gap: 6px; flex-wrap: wrap; }
  .tag { background: white; border: 1px solid #ddd; border-radius: 4px; padding: 3px 8px; font-size: 10px; color: #555; }
  .tag.active { background: #145064; color: white; border-color: #145064; }
</style>
</head>
<body>
  <div class="page">
    <div class="zone header">site-header</div>
    <div class="split">
      <div class="zone">content — primary</div>
      <div class="zone">content — secondary</div>
    </div>
    <div class="zone footer">site-footer</div>
  </div>
  <div class="prop">
    <div class="prop-label">$variant</div>
    <div class="prop-row">
      <span class="tag">full</span>
      <span class="tag active">split</span>
      <span class="tag">inset</span>
    </div>
  </div>
  <div class="prop">
    <div class="prop-label">$theme</div>
    <div class="prop-row">
      <span class="tag active">light</span>
      <span class="tag">dark</span>
      <span class="tag">brand</span>
    </div>
  </div>
</body>
</html>`,
        code: `<?php
/**
 * Layout Module — flexible section builder
 *
 * @param string $variant  'full' | 'split' | 'inset'
 * @param string $theme    'light' | 'dark' | 'brand'
 * @param array  $slots    Content slot data
 */
function render_layout_module( array $args ): void {
  $variant = $args['variant'] ?? 'full';
  $theme   = $args['theme']   ?? 'light';

  get_template_part(
    'template-parts/modules/layout',
    $variant,
    [ 'theme' => $theme, ...$args ]
  );
}`,
      },

      /* ── WordPress Snippets ───────────────────────────────────────────── */
      {
        id: "3col-overview",
        title: "Three-Column Overview Box",
        description: "Branded dark-blue section with a full-width intro column on the left and two image+text columns on the right, separated by a vertical rule. Fully responsive via media queries — stacks to single column on mobile.",
        files: [
          { label: "CSS", language: "css" as const, code: `.int-box-background {
  display: flex; flex-direction: column;
  background-color: #1D356C;
  border-radius: 30px; padding: 8% 5%;
}
.threebox { display: flex; justify-content: space-between; }
.overview-box { width: 40%; display: flex; flex-direction: column; }
.line { width: 2px; height: 300px; margin: 0 7%; background: #d9d9d9; }
.btn-solid {
  background: #f47321; border: 3px solid #f47321;
  color: #fff; padding: 10px 25px;
}
.btn-solid:hover { background: #fff; color: #f47321; }

/* Mobile — stack to single column */
@media (max-width: 768px) {
  .threebox { flex-direction: column; }
  .overview-box { width: 100%; }
  .line { width: 300px; height: 2px; margin: 5% 0; }
}` },
          { label: "HTML", language: "html" as const, code: `<div class="int-box-background">
  <h1 style="color:#fff; font-size:30pt; margin-bottom:4%;">
    DISCOVER OUR INITIATIVES
  </h1>
  <div class="threebox">
    <div class="intro-box">
      <p style="color:#fff;">Since our founding, we've helped organizations
        enhance their impact. Initiatives like the
        <a style="color:#F47321;" href="#">Global Outreach Initiative</a>
        create opportunities for businesses to thrive.
      </p>
      <div style="margin:50px 0 0;">
        <a class="btn-solid" href="#">LEARN MORE</a>
      </div>
    </div>
    <div style="display:flex;">
      <div class="overview-box">
        <img src="img/program-a.jpg" width="200" alt="Global Outreach">
        <p style="color:#f47321;"><b>Global Outreach Program</b></p>
        <p style="color:#fff;">Fostering global connections and business growth.</p>
      </div>
      <div class="line"></div>
      <div class="overview-box">
        <img src="img/program-b.jpg" width="200" alt="Sustainability">
        <p style="color:#f47321;"><b>Sustainability Focus</b></p>
        <p style="color:#fff;">Leading sustainable practices across industries.</p>
      </div>
    </div>
  </div>
</div>` },
        ],
        language: "html",
        code: `<style>
.int-box-background {
  display: flex; flex-direction: column;
  background-color: #1D356C;
  border-radius: 30px; padding: 8% 5%;
}
.threebox { display: flex; justify-content: space-between; }
.overview-box { width: 40%; display: flex; flex-direction: column; }
.line { width: 2px; height: 300px; margin: 0 7%; background: #d9d9d9; }
.btn-solid {
  background: #f47321; border: 3px solid #f47321;
  color: #fff; padding: 10px 25px;
}
.btn-solid:hover { background: #fff; color: #f47321; }

/* Mobile — stack to column */
@media (max-width: 768px) {
  .threebox { flex-direction: column; }
  .overview-box { width: 100%; }
  .line { width: 300px; height: 2px; margin: 5% 0; }
}
</style>

<div class="int-box-background">
  <h1 style="color:#fff; font-size:30pt; margin-bottom:4%;">
    DISCOVER OUR INITIATIVES
  </h1>
  <div class="threebox">
    <div class="intro-box">
      <p style="color:#fff;">Since our founding, we've helped organizations
        enhance their impact through the
        <a style="color:#F47321;" href="#">Global Outreach Initiative</a>.
      </p>
      <div style="margin:50px 0 0;">
        <a class="btn-solid" href="#">LEARN MORE</a>
      </div>
    </div>
    <div style="display:flex;">
      <div class="overview-box">
        <img src="img/program-a.jpg" width="200" alt="Global Outreach">
        <p style="color:#f47321;"><b>Global Outreach Program</b></p>
        <p style="color:#fff;">Fostering global connections and business growth.</p>
      </div>
      <div class="line"></div>
      <div class="overview-box">
        <img src="img/program-b.jpg" width="200" alt="Sustainability">
        <p style="color:#f47321;"><b>Sustainability Focus</b></p>
        <p style="color:#fff;">Leading sustainable practices across industries.</p>
      </div>
    </div>
  </div>
</div>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#f0ede8;padding:16px;}
.box{background:#1D356C;border-radius:16px;padding:24px 20px;display:flex;flex-direction:column;gap:16px;}
.title{color:#fff;font-size:17px;font-weight:700;letter-spacing:.03em;}
.row{display:flex;gap:12px;align-items:flex-start;}
.intro{flex:1.4;color:#d8e0f0;font-size:12px;line-height:1.6;}
.link{color:#f47321;}
.btn{display:inline-block;margin-top:10px;background:#f47321;border:2px solid #f47321;color:#fff;padding:6px 14px;font-size:11px;font-weight:700;letter-spacing:.06em;}
.divider{width:2px;min-height:100px;background:#5a6e9c;flex-shrink:0;}
.col{flex:1;display:flex;flex-direction:column;gap:5px;}
.thumb{width:100%;height:52px;background:#2a4a8c;border-radius:4px;}
.label{color:#f47321;font-size:10px;font-weight:700;}
.desc{color:#b0c0d8;font-size:10px;line-height:1.4;}
</style></head><body>
<div class="box">
  <div class="title">DISCOVER OUR INITIATIVES</div>
  <div class="row">
    <div class="intro">
      Since our founding, we've helped organizations enhance their impact through the <span class="link">Global Outreach Initiative</span>.
      <div><span class="btn">LEARN MORE</span></div>
    </div>
    <div class="divider"></div>
    <div class="col"><div class="thumb"></div><div class="label">Global Outreach Program</div><div class="desc">Fostering global connections and business growth.</div></div>
    <div class="divider"></div>
    <div class="col"><div class="thumb"></div><div class="label">Sustainability Focus</div><div class="desc">Leading sustainable practices across industries.</div></div>
  </div>
</div>
</body></html>`,
      },

      {
        id: "css-callout-tabs",
        title: "CSS Category Tabs",
        description: "Pure CSS tabbed interface using hidden radio inputs — zero JavaScript. Tabs activate on :checked state; selected tab gets branded background color. Five content categories displayed in separate tab panels.",
        files: [
          { label: "CSS", language: "css" as const, code: `.tabs2 {
  padding: 1% 3% 3%;
  background-color: #E5E5E5;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3%;
}
.tabs2 label {
  order: 1;
  display: flex; justify-content: center; align-items: center;
  padding: .6875rem 1.25rem .8125rem;
  cursor: pointer;
  margin: 2.5%;
  font-size: 1.5rem;
  background-color: #fff;
  border: 3px solid #006298;
  transition: background ease 0.3s;
}
.tabs2 .tab2 {
  order: 9; flex-grow: 1; width: 85%;
  display: none; background: #fff;
}
.tabs2 label:hover,
.tabs2 input[type="radio"]:checked + label {
  background: #006298; color: #fff;
}
.tabs2 input[type="radio"] { display: none; }
.tabs2 input[type="radio"]:checked + label + .tab2 {
  display: block; padding: 2%;
}` },
          { label: "HTML", language: "html" as const, code: `<div class="tabs2">
  <input id="Art" checked name="tabs2" type="radio">
  <label for="Art">Art &amp; Design</label>
  <div class="tab2">
    Lorem ipsum dolor sit amet...
    <a style="color:#E6510F;" href="#">Read more</a>
  </div>

  <input id="Technology" name="tabs2" type="radio">
  <label for="Technology">Technology Innovations</label>
  <div class="tab2">Ut enim ad minim veniam...</div>

  <input id="Travel" name="tabs2" type="radio">
  <label for="Travel">Travel Destinations</label>
  <div class="tab2">Duis aute irure dolor...</div>
</div>` },
        ],
        language: "html",
        code: `<style>
.tabs2 {
  padding: 1% 3% 3%;
  background-color: #E5E5E5;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3%;
}
.tabs2 label {
  order: 1;
  display: flex; justify-content: center; align-items: center;
  padding: .6875rem 1.25rem .8125rem;
  cursor: pointer;
  margin: 2.5%;
  font-size: 1.5rem;
  background-color: #fff;
  border: 3px solid #006298;
  transition: background ease 0.3s;
}
.tabs2 .tab2 {
  order: 9; flex-grow: 1; width: 85%;
  display: none; background: #fff;
}
.tabs2 label:hover,
.tabs2 input[type="radio"]:checked + label {
  background: #006298; color: #fff;
}
.tabs2 input[type="radio"] { display: none; }
.tabs2 input[type="radio"]:checked + label + .tab2 {
  display: block; padding: 2%;
}
</style>

<div class="tabs2">
  <input id="Art" checked name="tabs2" type="radio">
  <label for="Art">Art & Design</label>
  <div class="tab2">
    Lorem ipsum dolor sit amet...
    <a style="color:#E6510F;" href="#">Read more</a>
  </div>

  <input id="Technology" name="tabs2" type="radio">
  <label for="Technology">Technology Innovations</label>
  <div class="tab2">Ut enim ad minim veniam...</div>

  <input id="Travel" name="tabs2" type="radio">
  <label for="Travel">Travel Destinations</label>
  <div class="tab2">Duis aute irure dolor...</div>
</div>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#f8f7f2;padding:12px;}
.tabs2{background:#E5E5E5;display:flex;flex-wrap:wrap;justify-content:center;padding:10px 10px 14px;gap:8px;}
.tabs2 label{display:flex;justify-content:center;align-items:center;padding:8px 14px;cursor:pointer;font-size:13px;background:#fff;border:2px solid #006298;order:1;font-weight:500;}
.tabs2 input[type="radio"]{display:none;}
.tabs2 input[type="radio"]:checked+label{background:#006298;color:#fff;}
.tabs2 .tab2{order:9;flex-grow:1;width:85%;display:none;background:#fff;font-size:12px;line-height:1.6;color:#333;}
.tabs2 input[type="radio"]:checked+label+.tab2{display:block;padding:12px 14px;}
a{color:#E6510F;}
</style></head><body>
<div class="tabs2">
  <input id="p1" checked name="t" type="radio"><label for="p1">Art &amp; Design</label>
  <div class="tab2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <a href="#">Lorem ipsum</a> dolor sit amet.</div>
  <input id="p2" name="t" type="radio"><label for="p2">Technology</label>
  <div class="tab2">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. <a href="#">Lorem ipsum</a> dolor sit amet.</div>
  <input id="p3" name="t" type="radio"><label for="p3">Travel</label>
  <div class="tab2">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</div>
  <input id="p4" name="t" type="radio"><label for="p4">Culinary</label>
  <div class="tab2">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div>
  <input id="p5" name="t" type="radio"><label for="p5">Literature</label>
  <div class="tab2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</div>
</div>
</body></html>`,
      },

      {
        id: "az-tab-organizer",
        title: "A–Z Tab Organizer",
        description: "Pure CSS alphabetical tab navigator using radio inputs — no JavaScript. Each tab reveals a multi-column name list. Used for donor/member rosters where long lists need organized navigation without page reload.",
        files: [
          { label: "CSS", language: "css" as const, code: `.columns {
  columns: 3 5px;
  column-gap: 1em;
}
.tabs {
  display: flex; flex-wrap: wrap; justify-content: center;
}
.tabs label {
  order: 1;
  display: flex; justify-content: center; align-items: center;
  padding: 1rem 2.3rem;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 3px solid #006298;
  font-weight: bold;
  transition: background ease 0.3s;
}
.tabs .tab {
  order: 9; flex-grow: 1;
  display: none; background: #fff;
  padding: 2% 2% 2% 4%;
}
.tabs input[type="radio"] { display: none; }
.tabs input[type="radio"]:checked + label {
  background: #006298; color: #fff;
}
.tabs input[type="radio"]:checked + label + .tab { display: block; }` },
          { label: "HTML", language: "html" as const, code: `<div class="tabs">
  <input id="tabone" checked name="tabs" type="radio">
  <label for="tabone">A–D</label>
  <div class="tab columns">
    <p>
      Anonymous (9)<br>Elliot Abrams<br>Mira Adams<br>
      <span style="color:#e6510f">*</span>Lila Carson<br>
      Isaac Carter<br>Susan Chandler...
    </p>
  </div>

  <input id="tabtwo" name="tabs" type="radio">
  <label for="tabtwo">E–H</label>
  <div class="tab columns">
    <p>Amy Edwards<br>Noah Ellis<br>Hannah Emerson...</p>
  </div>
  <!-- Additional A–Z tabs... -->
</div>` },
        ],
        language: "html",
        code: `<style>
.columns {
  columns: 3 5px;
  column-gap: 1em;
}
.tabs {
  display: flex; flex-wrap: wrap; justify-content: center;
}
.tabs label {
  order: 1;
  display: flex; justify-content: center; align-items: center;
  padding: 1rem 2.3rem;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 3px solid #006298;
  font-weight: bold;
  transition: background ease 0.3s;
}
.tabs .tab {
  order: 9; flex-grow: 1;
  display: none; background: #fff;
  padding: 2% 2% 2% 4%;
}
.tabs input[type="radio"] { display: none; }
.tabs input[type="radio"]:checked + label {
  background: #006298; color: #fff;
}
.tabs input[type="radio"]:checked + label + .tab { display: block; }
</style>

<div class="tabs">
  <input id="tabone" checked name="tabs" type="radio">
  <label for="tabone">A–D</label>
  <div class="tab columns">
    <p>
      Anonymous (9)<br>Elliot Abrams<br>Mira Adams<br>
      <span style="color:#e6510f">*</span>Lila Carson<br>
      Isaac Carter<br>Susan Chandler...
    </p>
  </div>

  <input id="tabtwo" name="tabs" type="radio">
  <label for="tabtwo">E–H</label>
  <div class="tab columns">
    <p>Amy Edwards<br>Noah Ellis<br>Hannah Emerson...</p>
  </div>
  <!-- Additional A–Z tabs... -->
</div>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#f8f7f2;padding:12px;}
.tabs{display:flex;flex-wrap:wrap;justify-content:center;}
.tabs label{order:1;display:flex;justify-content:center;align-items:center;padding:8px 14px;margin-top:2px;cursor:pointer;background:#fff;border-bottom:3px solid #006298;font-weight:bold;font-size:12px;transition:background .3s;}
.tabs input[type="radio"]{display:none;}
.tabs input[type="radio"]:checked+label{background:#006298;color:#fff;}
.tabs .tab{order:9;flex-grow:1;display:none;background:#fff;padding:14px 14px 14px 20px;}
.tabs input[type="radio"]:checked+label+.tab{display:block;}
.cols{columns:3;column-gap:12px;font-size:11px;line-height:1.8;color:#333;}
.star{color:#e6510f;}
</style></head><body>
<div class="tabs">
  <input id="t1" checked name="t" type="radio"><label for="t1">A–D</label>
  <div class="tab"><div class="cols">Anonymous (9)<br>Elliot Abrams<br>Mira Adams<br>Luis Alarcon<br>Jake Anderson<br>Nina Angelos<br><span class="star">*</span>Lila Carson<br>Isaac Carter<br>Susan Chandler<br>Ava Charles<br>Mia Chen<br>James Clayton<br>Omar Collins<br><span class="star">*</span>Fiona Connolly<br>Caleb Dixon<br>Emma Donovan<br>Hazel Dunn</div></div>
  <input id="t2" name="t" type="radio"><label for="t2">E–H</label>
  <div class="tab"><div class="cols">Amy Edwards<br>Noah Ellis<br>Hannah Emerson<br>Logan Fisher<br>Brooke Fox<br>Eli Freeman<br>Connor Garrison<br>Leo Gibson<br>Emma Gomez<br>Liam Gray<br>Henry Hale<br>Ava Harris<br>Alyssa Henderson<br>Brandon Hill<br>Isaac Hughes</div></div>
  <input id="t3" name="t" type="radio"><label for="t3">I–L</label>
  <div class="tab"><div class="cols">Henry Ivers<br>Emma Jacobs<br>Lily Jameson<br>Mason Johnson<br><span class="star">*</span>Olivia King<br>Sarah Lane<br>Daniel Larson<br>Ella Lawrence<br>Liam Lee<br>Ava Lewis<br>Owen Lincoln<br>Lucas Lloyd</div></div>
  <input id="t4" name="t" type="radio"><label for="t4">M–P</label>
  <div class="tab"><div class="cols">Maya Mitchell<br>Logan Morris<br>Ella Murray<br><span class="star">*</span>Luke Myers<br>Stella Nelson<br>Isabella Olson<br>Connor Parker<br>Henry Perez<br>Ava Peterson</div></div>
</div>
</body></html>`,
      },

      {
        id: "grid-icon-cards",
        title: "Grid Box with Icon Cards",
        description: "Responsive 3-column card grid with SVG icons. On hover, cards invert to dark navy (#01426A) and icons flip to white via CSS filter — no JavaScript, no additional assets. Collapses to 2-col on tablet and full-width on mobile.",
        files: [
          { label: "CSS", language: "css" as const, code: `.container-key {
  width: 100%; background: #F0F0F1;
  display: flex; flex-wrap: wrap; justify-content: center;
}
.card {
  float: left; position: relative;
  text-align: left; padding: 2%;
  transition: all 0.25s;
}
.card img { width: 70px; margin: 0 0 -8% 0; }
.card:hover {
  box-shadow: 0 12px 16px rgba(0,0,0,.2);
  background: #01426A; color: #fff;
}
.card:hover img {
  /* Inline SVG inverts to white on dark bg */
  filter: brightness(0) invert(1);
}

@media (min-width: 991px) { .card { width: 29%; margin: 2%; } }
@media (max-width: 767px) { .card { width: 40%; padding: 5%; } }` },
          { label: "HTML", language: "html" as const, code: `<div class="container-key">
  <div class="card">
    <img src="icon-analytics.svg" alt="Analytics">
    <h4>Explore real-time analytics and industry trends.</h4>
    <p>Track performance metrics across all sectors.</p>
  </div>
  <div class="card">
    <img src="icon-report.svg" alt="Report">
    <h4>Download a comprehensive growth report.</h4>
    <p>Exportable data in CSV and PDF formats.</p>
  </div>
  <div class="card">
    <img src="icon-webinar.svg" alt="Webinar">
    <h4>Join exclusive thought leadership webinars.</h4>
    <p>Monthly sessions with industry leaders.</p>
  </div>
</div>` },
        ],
        language: "html",
        code: `<style>
.container-key {
  width: 100%; background: #F0F0F1;
  display: flex; flex-wrap: wrap; justify-content: center;
}
.card {
  float: left; position: relative;
  text-align: left; padding: 2%;
  transition: all 0.25s;
}
.card img { width: 70px; margin: 0 0 -8% 0; }
.card:hover {
  box-shadow: 0 12px 16px rgba(0,0,0,.2);
  background: #01426A; color: #fff;
}
.card:hover img {
  /* Inline SVG inverts to white on dark bg */
  filter: brightness(0) invert(1);
}

@media (min-width: 991px) { .card { width: 29%; margin: 2%; } }
@media (max-width: 767px) { .card { width: 40%; padding: 5%; } }
</style>

<div class="container-key">
  <div class="card">
    <img src="icon-analytics.svg" alt="Analytics">
    <h4>Explore real-time analytics and industry trends.</h4>
    <p>Track performance metrics across all sectors.</p>
  </div>
  <div class="card">
    <img src="icon-report.svg" alt="Report">
    <h4>Download a comprehensive growth report.</h4>
    <p>Exportable data in CSV and PDF formats.</p>
  </div>
  <div class="card">
    <img src="icon-webinar.svg" alt="Webinar">
    <h4>Join exclusive thought leadership webinars.</h4>
    <p>Monthly sessions with industry leaders.</p>
  </div>
</div>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#f8f7f2;padding:12px;}
.grid{background:#F0F0F1;display:flex;flex-wrap:wrap;justify-content:center;padding:8px;}
.card{width:29%;margin:2%;padding:16px;transition:all .25s;cursor:pointer;position:relative;}
.card:hover{box-shadow:0 8px 16px rgba(0,0,0,.18);background:#01426A;color:#fff;}
.icon{width:40px;height:40px;margin-bottom:10px;background:#01426A;border-radius:4px;display:flex;align-items:center;justify-content:center;}
.card:hover .icon{background:#fff;}
.dot{width:8px;height:8px;background:#fff;border-radius:50%;}
.card:hover .dot{background:#01426A;}
h4{font-size:12px;font-weight:700;line-height:1.3;margin-bottom:6px;color:inherit;}
p{font-size:11px;line-height:1.5;color:inherit;opacity:.7;}
</style></head><body>
<div class="grid">
  <div class="card"><div class="icon"><div class="dot"></div></div><h4>Explore real-time analytics and industry trends.</h4><p>Track performance metrics across all sectors.</p></div>
  <div class="card"><div class="icon"><div class="dot"></div></div><h4>Download a comprehensive growth report.</h4><p>Exportable data in CSV and PDF formats.</p></div>
  <div class="card"><div class="icon"><div class="dot"></div></div><h4>Join exclusive thought leadership webinars.</h4><p>Monthly sessions with industry leaders.</p></div>
  <div class="card"><div class="icon"><div class="dot"></div></div><h4>Access member-only research publications.</h4><p>Curated insights delivered quarterly.</p></div>
</div>
</body></html>`,
      },

      {
        id: "grid-cta",
        title: "Feature Grid + CTA",
        description: "Dark-blue feature listing module with inline SVG icons and a paired CTA block. White card boxes sit inside the branded container; the CTA column has a JOIN NOW button and a text-link Log In — designed for membership conversion pages.",
        files: [
          { label: "CSS", language: "css" as const, code: `.box-background {
  display: flex; flex-direction: column;
  background-color: #1D356C;
  border-radius: 30px; padding: 5% 5% 3%;
}
.listing-box {
  display: flex; flex-wrap: wrap; justify-content: space-between;
}
.box {
  width: 47%; background: #fff;
  border-radius: 15px; padding: 20px; margin: 10px;
  display: flex; align-items: flex-start; gap: 12px;
}
.box-btn {
  width: 37%; display: flex;
  flex-direction: row; align-items: center;
  justify-content: space-around;
}
.btn-solid {
  background: #f47321; border: 3px solid #f47321;
  color: #fff; padding: 8px 20px; font-size: 1.25rem;
}
.btn-solid:hover { background: #fff; color: #f47321; }
.btn-mute { color: #f47321; text-decoration: underline; }
.btn-mute:hover { color: #fff; }` },
          { label: "HTML", language: "html" as const, code: `<section>
  <div class="box-background">
    <h1 style="color:#fff; font-size:30pt; margin-bottom:3.5%;">
      DISCOVER THE GLOBAL NETWORK HUB
    </h1>
    <section class="listing-box">
      <div class="box">
        <svg width="28" ...><!-- Analytics icon --></svg>
        <p>Explore real-time analytics and industry trends.</p>
      </div>
      <div class="box">
        <svg width="30" ...><!-- Report icon --></svg>
        <p>Download a comprehensive report of network growth.</p>
      </div>
      <div class="box">
        <svg width="35" ...><!-- Webinar icon --></svg>
        <p>Participate in exclusive thought leadership webinars.</p>
      </div>
      <div class="box-btn">
        <a class="btn-solid" href="/register">JOIN NOW</a>
        <a class="btn-mute" href="/login">Log In</a>
      </div>
    </section>
  </div>
</section>` },
        ],
        language: "html",
        code: `<style>
.box-background {
  display: flex; flex-direction: column;
  background-color: #1D356C;
  border-radius: 30px; padding: 5% 5% 3%;
}
.listing-box {
  display: flex; flex-wrap: wrap; justify-content: space-between;
}
.box {
  width: 47%; background: #fff;
  border-radius: 15px; padding: 20px; margin: 10px;
  display: flex; align-items: flex-start; gap: 12px;
}
.box-btn {
  width: 37%; display: flex;
  flex-direction: row; align-items: center;
  justify-content: space-around;
}
.btn-solid {
  background: #f47321; border: 3px solid #f47321;
  color: #fff; padding: 8px 20px; font-size: 1.25rem;
}
.btn-solid:hover { background: #fff; color: #f47321; }
.btn-mute { color: #f47321; text-decoration: underline; }
.btn-mute:hover { color: #fff; }
</style>

<section>
  <div class="box-background">
    <h1 style="color:#fff; font-size:30pt; margin-bottom:3.5%;">
      DISCOVER THE GLOBAL NETWORK HUB
    </h1>
    <section class="listing-box">
      <div class="box">
        <svg width="28" ...><!-- Analytics icon --></svg>
        <p>Explore real-time analytics and industry trends.</p>
      </div>
      <div class="box">
        <svg width="30" ...><!-- Report icon --></svg>
        <p>Download a comprehensive report of network growth.</p>
      </div>
      <div class="box">
        <svg width="35" ...><!-- Webinar icon --></svg>
        <p>Participate in exclusive thought leadership webinars.</p>
      </div>
      <div class="box-btn">
        <a class="btn-solid" href="/register">JOIN NOW</a>
        <a class="btn-mute" href="/login">Log In</a>
      </div>
    </section>
  </div>
</section>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#f0ede8;padding:14px;}
.outer{background:#1D356C;border-radius:18px;padding:22px 20px;}
.title{color:#fff;font-size:16px;font-weight:700;letter-spacing:.03em;margin-bottom:14px;}
.grid{display:flex;flex-wrap:wrap;gap:10px;}
.box{width:calc(40% - 5px);background:#fff;border-radius:10px;padding:14px;display:flex;gap:10px;align-items:flex-start;}
.ico{width:28px;height:28px;background:#1D356C;border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;}
.dot{width:6px;height:6px;background:#fff;border-radius:50%;}
.box p{font-size:11px;line-height:1.5;color:#111;font-weight:500;}
.cta-col{width:calc(20% - 5px);display:flex;flex-direction:column;gap:10px;align-items:center;justify-content:center;padding:8px;}
.btn{background:#f47321;border:2px solid #f47321;color:#fff;padding:8px 14px;font-size:11px;font-weight:700;text-align:center;letter-spacing:.05em;white-space:nowrap;}
.mute{color:#f47321;font-size:11px;text-decoration:underline;}
</style></head><body>
<div class="outer">
  <div class="title">DISCOVER THE GLOBAL NETWORK HUB</div>
  <div class="grid">
    <div class="box"><div class="ico"><div class="dot"></div></div><p>Explore real-time analytics and industry trends.</p></div>
    <div class="box"><div class="ico"><div class="dot"></div></div><p>Download a comprehensive report of your network's growth.</p></div>
    <div class="box"><div class="ico"><div class="dot"></div></div><p>Participate in exclusive thought leadership webinars.</p></div>
    <div class="cta-col"><span class="btn">JOIN NOW</span><span class="mute">Log In</span></div>
  </div>
</div>
</body></html>`,
      },

      {
        id: "link-separator",
        title: "Link Separator Row",
        description: "Horizontal resource strip with vertical pipe dividers between orange links on a light gray pill background. Used for 'Additional Resources' sections — compact, scannable, zero visual hierarchy competition with surrounding content.",
        files: [
          { label: "CSS", language: "css" as const, code: `.resource-section {
  padding: 0 7.5%;
  display: flex; flex-direction: column; align-items: center;
}
.gray-background {
  background-color: #F5F5F5;
  width: 100%; display: flex;
  justify-content: center; align-items: center;
  flex-direction: column;
  border-radius: 20px; padding: 3%;
  box-shadow: 0px 4px 10px 0px rgba(0,0,0,.1);
}
.resource-column {
  width: 100%; display: flex;
  justify-content: center; align-items: center;
}
.resource-divider {
  width: 2px; height: 40px;
  background: #DFDFDF; margin: 0 35px;
}
.font-a { font-size: 16px; text-align: center; }` },
          { label: "HTML", language: "html" as const, code: `<section class="resource-section">
  <div class="gray-background">
    <h1 style="font-size:25px;">
      <b>ADDITIONAL RESOURCES FOR COMPANIES</b>
    </h1>
    <div class="resource-column">
      <a class="font-a" style="color:#F47321;" href="#">
        Lorem Ipsum Dolor Sit Amet
      </a>
      <div class="resource-divider"></div>
      <a class="font-a" style="color:#F47321;" href="#">
        Consectetur Adipiscing Elit
      </a>
      <div class="resource-divider"></div>
      <a class="font-a" style="color:#F47321;" href="#">
        Sed Do Eiusmod Tempor Incididunt
      </a>
    </div>
  </div>
</section>` },
        ],
        language: "html",
        code: `<style>
.resource-section {
  padding: 0 7.5%;
  display: flex; flex-direction: column; align-items: center;
}
.gray-background {
  background-color: #F5F5F5;
  width: 100%; display: flex;
  justify-content: center; align-items: center;
  flex-direction: column;
  border-radius: 20px; padding: 3%;
  box-shadow: 0px 4px 10px 0px rgba(0,0,0,.1);
}
.resource-column {
  width: 100%; display: flex;
  justify-content: center; align-items: center;
}
.resource-divider {
  width: 2px; height: 40px;
  background: #DFDFDF; margin: 0 35px;
}
.font-a { font-size: 16px; text-align: center; }
</style>

<section class="resource-section">
  <div class="gray-background">
    <h1 style="font-size:25px;">
      <b>ADDITIONAL RESOURCES FOR COMPANIES</b>
    </h1>
    <div class="resource-column">
      <a class="font-a" style="color:#F47321;" href="#">
        Lorem Ipsum Dolor Sit Amet
      </a>
      <div class="resource-divider"></div>
      <a class="font-a" style="color:#F47321;" href="#">
        Consectetur Adipiscing Elit
      </a>
      <div class="resource-divider"></div>
      <a class="font-a" style="color:#F47321;" href="#">
        Sed Do Eiusmod Tempor Incididunt
      </a>
    </div>
  </div>
</section>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#f8f7f2;padding:24px 16px;}
.pill{background:#F5F5F5;border-radius:14px;padding:20px 24px;box-shadow:0 4px 10px rgba(0,0,0,.08);display:flex;flex-direction:column;align-items:center;gap:14px;}
.heading{font-size:13px;font-weight:700;text-align:center;color:#111;letter-spacing:.04em;}
.row{display:flex;align-items:center;justify-content:center;}
a{color:#F47321;font-size:13px;text-decoration:none;}
a:hover{text-decoration:underline;}
.divider{width:2px;height:36px;background:#DFDFDF;margin:0 24px;}
</style></head><body>
<div class="pill">
  <div class="heading">ADDITIONAL RESOURCES FOR COMPANIES</div>
  <div class="row">
    <a href="#">Lorem Ipsum Dolor Sit Amet</a>
    <div class="divider"></div>
    <a href="#">Consectetur Adipiscing Elit</a>
    <div class="divider"></div>
    <a href="#">Sed Do Eiusmod Tempor Incididunt</a>
  </div>
</div>
</body></html>`,
      },

      {
        id: "get-involved-form",
        title: "Get Involved + Mailchimp Toggle",
        description: "Two-panel membership section: an icon-list 'Get Involved' column on the left, and a 'Let's get connected' CTA panel on the right. A JOIN button triggers JS to reveal a hidden Mailchimp signup form — toggled with jQuery show/hide.",
        files: [
          { label: "CSS", language: "css" as const, code: `.container-getinvolved {
  background: #01426A; padding: 4% 5%;
  display: flex; flex-direction: column; align-items: center;
}
.container-get {
  display: flex; gap: 5%; width: 100%;
}
.left { flex: 1.6; display: flex; flex-direction: column; gap: 20px; }
.listing { display: flex; align-items: flex-start; gap: 14px; color: #fff; }
.icon { width: 32px; height: 32px; flex-shrink: 0; }
.right {
  flex: 1; background: #F0F0F1;
  border-radius: 8px; padding: 5%; text-align: center;
}
.joinbutton {
  background: #f47321; border: 3px solid #f47321;
  color: #fff; padding: 10px 24px;
  font-size: 1.1rem; font-weight: 700; cursor: pointer;
}
.joinbutton:hover { background: #fff; color: #f47321; }
.signup { padding: 4% 5%; background: #fff; margin-top: 2%; }` },
          { label: "HTML", language: "html" as const, code: `<!-- Get Involved section — left: icon listing, right: CTA -->
<div class="container-getinvolved">
  <h2 style="color:#fff; font-size:40px; margin-bottom:7%;">Get Involved</h2>
  <div class="container-get">

    <!-- Icon bullet listing -->
    <div class="left">
      <div class="listing">
        <svg class="icon" ...><!-- Calendar icon --></svg>
        <p>Attend our quarterly events (approx 1 hour each).</p>
      </div>
      <div class="listing">
        <svg class="icon" ...><!-- Network icon --></svg>
        <p>Network with other members of the community.</p>
      </div>
      <div class="listing">
        <svg class="icon" ...><!-- Ambassador icon --></svg>
        <p>Act as an ambassador spreading awareness.</p>
      </div>
    </div>

    <!-- Right CTA panel -->
    <div class="right">
      <h2 style="margin-bottom:4%;">Let's get connected</h2>
      <button id="signup-show" class="joinbutton">JOIN NOW</button>
    </div>
  </div>
</div>

<!-- Hidden Mailchimp form — toggled by JS -->
<div class="signup" id="signup-release" style="display:none;">
  <div id="mc_embed_signup">
    <form action="https://list-manage.com/subscribe/post?..." method="post">
      <!-- Mailchimp fields: name, email, address, job title... -->
    </form>
  </div>
  <div class="closeform">
    <h2 id="signup-close">Close the form</h2>
  </div>
</div>` },
          { label: "JS", language: "js" as const, code: `$(document).ready(function() {
  // Show Mailchimp form on JOIN click
  $("#signup-show").on("click", function() {
    $("#signup-release").show();
  });
  // Hide on close
  $("#signup-close").on("click", function() {
    $("#signup-release").hide();
  });
});` },
        ],
        language: "html",
        code: `<!-- Get Involved section — left: icon listing, right: CTA -->
<div class="container-getinvolved">
  <h2 style="color:#fff; font-size:40px; margin-bottom:7%;">Get Involved</h2>
  <div class="container-get">

    <!-- Icon bullet listing -->
    <div class="left">
      <div class="listing">
        <svg class="icon" ...><!-- Calendar icon --></svg>
        <p>Attend our quarterly events (approx 1 hour each).</p>
      </div>
      <div class="listing">
        <svg class="icon" ...><!-- Network icon --></svg>
        <p>Network with other members of the community.</p>
      </div>
      <div class="listing">
        <svg class="icon" ...><!-- Ambassador icon --></svg>
        <p>Act as an ambassador spreading awareness.</p>
      </div>
    </div>

    <!-- Right CTA panel -->
    <div class="right">
      <h2 style="margin-bottom:4%;">Let's get connected</h2>
      <button id="signup-show" class="joinbutton">JOIN NOW</button>
    </div>
  </div>
</div>

<!-- Hidden Mailchimp form — toggled by JS -->
<div class="signup" id="signup-release" style="display:none;">
  <div id="mc_embed_signup">
    <form action="https://list-manage.com/subscribe/post?..." method="post">
      <!-- Mailchimp fields: name, email, address, job title... -->
    </form>
  </div>
  <div class="closeform">
    <h2 id="signup-close">Close the form</h2>
  </div>
</div>

<script>
$(document).ready(function() {
  // Show Mailchimp form on JOIN click
  $("#signup-show").on("click", function() {
    $("#signup-release").show();
  });
  // Hide on close
  $("#signup-close").on("click", function() {
    $("#signup-release").hide();
  });
});
</script>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#f0ede8;padding:0;}
.outer{background:#01426A;padding:24px 20px;display:flex;flex-direction:column;align-items:center;gap:16px;}
.title{color:#fff;font-size:18px;font-weight:700;}
.row{display:flex;gap:16px;width:100%;align-items:flex-start;}
.left{flex:1.6;display:flex;flex-direction:column;gap:12px;}
.listing{display:flex;align-items:flex-start;gap:10px;color:#fff;}
.ico{width:28px;height:28px;background:rgba(255,255,255,.18);border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;}
.dot{width:6px;height:6px;background:#fff;border-radius:50%;}
p{font-size:11px;line-height:1.5;color:#c5ddf0;margin:0;}
.right{flex:1;background:#F0F0F1;border-radius:8px;padding:16px;text-align:center;display:flex;flex-direction:column;gap:10px;align-items:center;}
.right h3{font-size:13px;font-weight:700;color:#111;}
.btn{background:#f47321;border:2px solid #f47321;color:#fff;padding:8px 18px;font-size:12px;font-weight:700;letter-spacing:.05em;cursor:pointer;}
.link{color:#f47321;font-size:11px;}
</style></head><body>
<div class="outer">
  <div class="title">Get Involved</div>
  <div class="row">
    <div class="left">
      <div class="listing"><div class="ico"><div class="dot"></div></div><p>Attend our quarterly events (approx 1 hour each).</p></div>
      <div class="listing"><div class="ico"><div class="dot"></div></div><p>Network with other members of the community.</p></div>
      <div class="listing"><div class="ico"><div class="dot"></div></div><p>Act as an ambassador spreading awareness and engagement.</p></div>
      <div class="listing"><div class="ico"><div class="dot"></div></div><p><span style="color:#F1B49B">Support us</span> philanthropically and share why the economy should work for all.</p></div>
    </div>
    <div class="right">
      <h3>Let's get connected</h3>
      <button class="btn">JOIN NOW</button>
      <span class="link">Already a member? Log In</span>
    </div>
  </div>
</div>
</body></html>`,
      },

      {
        id: "testimonial-carousel",
        title: "Testimonial Carousel",
        description: "Slick.js carousel for alternating dark/light testimonial slides — dark blue (#006298) and white cards with floated portrait images, a decorative overline-character dot-nav, and auto-advance at 13.5s. Loaded via CDN with jQuery.",
        files: [
          { label: "CSS", language: "css" as const, code: `.carousel { margin-top: 2%; }
.slick-slide {
  margin: 16px 26px;
  background-color: #006298;
  box-shadow: 0 0 13px #ccc;
}
/* Custom dot nav using overline characters */
.slick-dots li button:before {
  content: '▔▔';
  font-size: 25px;
  color: #006298;
}
.slick-dots li.slick-active button:before { opacity: 1; }
.keytext-headD { font-size: 1.6rem; font-weight: bold; color: #fff; }
.keytext-SubheadD { font-size: 1.2rem; color: #ececec; }
.keytext-bodyD { font-size: 1.05rem; color: #fff; padding: 3%; }
.keytext-line { width: 65%; margin: 2% 0; border-bottom: 3px solid #addeee; }` },
          { label: "HTML", language: "html" as const, code: `<!-- External dependencies via CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css">

<div class="carousel">
  <!-- Slide 1: Dark -->
  <div class="BGD" style="background:#006298;">
    <img style="float:right;" width="180" src="headshot.jpg" alt="John Doe">
    <div class="keytext-bodyD">
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit.
         <a style="color:#F1B49B;" href="#">Example Initiative</a>
         has provided incredible insights."</p>
    </div>
    <div class="keytext-line"></div>
    <div class="keytext-headD">Advancing Community Impact</div>
    <div class="keytext-SubheadD">John Doe, CEO, Global Impact Corp</div>
  </div>

  <!-- Slide 2: Light -->
  <div class="BGL" style="background:#fff;">
    <img style="float:right;" width="200" src="headshot2.jpg" alt="Jane Smith">
    <div style="font-size:1.05rem; padding:3%; color:#000;">
      <p>"Thanks to the <a style="color:#e6510f;" href="#">Financial Wellness Program</a>
         — a game-changer."</p>
    </div>
    <div class="keytext-line"></div>
    <div style="font-size:1.6rem; font-weight:bold; color:#006298;">Employee Financial Wellness</div>
    <div style="font-size:1.2rem; color:#01426A;">Jane Smith, Employee, Innovate Corp</div>
  </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>` },
          { label: "JS", language: "js" as const, code: `$('.carousel').slick({
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 13500,
});` },
        ],
        language: "html",
        code: `<!-- External dependencies via CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css">

<style>
.carousel { margin-top: 2%; }
.slick-slide {
  margin: 16px 26px;
  background-color: #006298;
  box-shadow: 0 0 13px #ccc;
}
/* Custom dot nav using overline characters */
.slick-dots li button:before {
  content: '▔▔';
  font-size: 25px;
  color: #006298;
}
.slick-dots li.slick-active button:before { opacity: 1; }
.keytext-headD { font-size: 1.6rem; font-weight: bold; color: #fff; }
.keytext-SubheadD { font-size: 1.2rem; color: #ececec; }
.keytext-bodyD { font-size: 1.05rem; color: #fff; padding: 3%; }
.keytext-line { width: 65%; margin: 2% 0; border-bottom: 3px solid #addeee; }
</style>

<div class="carousel">
  <!-- Slide 1: Dark -->
  <div class="BGD" style="background:#006298;">
    <img style="float:right;" width="180" src="headshot.jpg" alt="John Doe">
    <div class="keytext-bodyD">
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit.
         <a style="color:#F1B49B;" href="#">Example Initiative</a>
         has provided incredible insights."</p>
    </div>
    <div class="keytext-line"></div>
    <div class="keytext-headD">Advancing Community Impact</div>
    <div class="keytext-SubheadD">John Doe, CEO, Global Impact Corp</div>
  </div>

  <!-- Slide 2: Light -->
  <div class="BGL" style="background:#fff;">
    <img style="float:right;" width="200" src="headshot2.jpg" alt="Jane Smith">
    <div style="font-size:1.05rem; padding:3%; color:#000;">
      <p>"Thanks to the <a style="color:#e6510f;" href="#">Financial Wellness Program</a>
         — a game-changer."</p>
    </div>
    <div class="keytext-line"></div>
    <div style="font-size:1.6rem; font-weight:bold; color:#006298;">Employee Financial Wellness</div>
    <div style="font-size:1.2rem; color:#01426A;">Jane Smith, Employee, Innovate Corp</div>
  </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
<script>
$('.carousel').slick({
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 13500,
});
</script>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#f0ede8;padding:16px;}
.slide{background:#006298;padding:20px;box-shadow:0 4px 13px rgba(0,0,0,.15);display:flex;flex-direction:column;gap:10px;}
.portrait{float:right;width:64px;height:64px;border-radius:4px;background:#004f7a;margin-left:12px;}
.body-text{font-size:12px;color:#fff;line-height:1.6;}
.link{color:#F1B49B;}
.divider{width:60%;height:2px;background:#addeee;}
.head{font-size:14px;font-weight:700;color:#fff;}
.sub{font-size:12px;color:#ececec;}
.dots{display:flex;gap:8px;margin-top:12px;justify-content:center;}
.dot{font-size:18px;color:#006298;opacity:.4;}
.dot.active{opacity:1;}
</style></head><body>
<div class="slide">
  <div><div class="portrait" style="float:right;"></div>
  <div class="body-text">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. <span class="link">Example Initiative</span> has provided incredible insights for driving change in our community efforts."</div></div>
  <div class="divider"></div>
  <div class="head">Advancing Community Impact</div>
  <div class="sub">John Doe, CEO, Global Impact Corp</div>
</div>
<div class="dots">
  <span class="dot active">▔▔</span>
  <span class="dot">▔▔</span>
</div>
</body></html>`,
      },

      /* ── Mission & Impact PHP Modules ────────────────────────────────── */
      {
        id: "data-badge",
        title: "Data Badge Grid",
        description: "PHP template that renders a configurable grid of dark-blue badge cards. Grid size (2–4 cols) is set via $grid_size — Bootstrap col widths are calculated dynamically. Optional border-radius variant and orange underline color for highlighted values.",
        files: [
          { label: "PHP", language: "php" as const, code: `<?php
// Configurable grid — default 4 columns
if (!isset($grid_size) || empty($grid_size)) {
    $grid_size = 4;
}
$col_size = 12 / $grid_size; // Bootstrap column width

if (isset($data) && !empty($data)):
    include_css("data-badge", "/.../data-badge.css");
?>
<div class="data-badge-grid row">
    <?php foreach ($data as $badge): ?>
        <div class="col-lg-<?php echo $col_size; ?> col-md-6 col-7
            <?php if (!empty($border_radius) && $border_radius !== 'no')
                echo ' border_radius'; ?>">

            <?php if (!empty($badge['title'])): ?>
                <h3><?php echo esc_html($badge['title']); ?></h3>
            <?php endif; ?>

            <div class="description">
                <?php echo $badge['description']; ?>
            </div>
        </div>
    <?php endforeach; ?>
</div>
<?php endif; ?>` },
          { label: "CSS", language: "css" as const, code: `/* data-badge.css */
.data-badge-grid [class*="col-"] {
  background: #1D356C;
  color: #fff;
  padding: 24px 20px;
  margin: 10px 0;
  text-align: center;
}
.data-badge-grid h3 {
  font-size: 2rem; font-weight: 700;
  margin-bottom: 8px;
}
.data-badge-grid .description {
  font-size: 0.95rem; line-height: 1.5;
}
.data-badge-grid .border_radius { border-radius: 12px; }

/* Orange underline for key values */
.data-badge-grid u {
  color: #F47321; text-decoration: none; font-weight: 700;
}` },
        ],
        language: "php",
        code: `<?php
// Configurable grid — default 4 columns
if (!isset($grid_size) || empty($grid_size)) {
    $grid_size = 4;
}
$col_size = 12 / $grid_size; // Bootstrap column width

if (isset($data) && !empty($data)):
    include_css("data-badge", "/.../data-badge.css");
?>
<div class="data-badge-grid row">
    <?php foreach ($data as $badge): ?>
        <div class="col-lg-<?php echo $col_size; ?> col-md-6 col-7
            <?php if (!empty($border_radius) && $border_radius !== 'no')
                echo ' border_radius'; ?>">

            <?php if (!empty($badge['title'])): ?>
                <h3><?php echo esc_html($badge['title']); ?></h3>
            <?php endif; ?>

            <div class="description">
                <?php echo $badge['description']; ?>
            </div>
        </div>
    <?php endforeach; ?>
</div>
<?php endif; ?>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#f8f7f2;padding:14px;}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
.badge{background:#1D356C;color:#fff;padding:16px 14px;border-radius:8px;}
.badge h3{font-size:22px;font-weight:700;margin-bottom:6px;}
.badge p{font-size:11px;line-height:1.5;color:#c5d0e8;}
.badge u{color:#F47321;font-weight:bold;}
.badge:hover{box-shadow:0 5px 15px rgba(0,0,0,.25);background:#142a5a;}
</style></head><body>
<div class="grid">
  <div class="badge"><h3>1,000+</h3><p>Companies measured across <u>240+ indicators</u> annually.</p></div>
  <div class="badge"><h3>3M+</h3><p>Users served across institutional and public audiences.</p></div>
  <div class="badge"><h3>$9T</h3><p>Market cap represented by JUST-ranked companies.</p></div>
  <div class="badge"><h3>7 yrs</h3><p>Continuous platform development and <u>two rebrands</u> absorbed.</p></div>
</div>
</body></html>`,
      },

      {
        id: "image-header",
        title: "Image Header Module",
        description: "PHP template for a hero header with overlapping left/right background images and a frosted glass overlay effect via background-blend-mode. Title, left image, and right image are all configurable props — unused slots render clean markup.",
        files: [
          { label: "PHP", language: "php" as const, code: `<?php
/**
 * image-header module
 *
 * @param string $title        Header title text
 * @param string $left_image   URL for left background image
 * @param string $right_image  URL for right background image
 */
include_css("image-header", "/.../header.css");
?>
<article class="image-header">

    <?php if (!empty($left_image)): ?>
        <div class="left-image"
             style="background-image: url(<?php echo esc_url($left_image); ?>)">
            <div class="overlay"></div>
        </div>
    <?php endif; ?>

    <h1><?php echo esc_html($title); ?></h1>

    <?php if (!empty($right_image)): ?>
        <div class="right-image"
             style="background-image: url(<?php echo esc_url($right_image); ?>)">
            <div class="overlay"></div>
        </div>
    <?php endif; ?>

</article>` },
          { label: "CSS", language: "css" as const, code: `/* header.css */
.image-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 200px;
  overflow: hidden;
}
.image-header h1 {
  position: absolute; left: 50%; transform: translateX(-50%);
  text-align: center; z-index: 10;
  font-size: 2rem; color: #111;
  width: 50%;
}
.left-image, .right-image {
  width: 35%; height: 250px;
  background-size: cover; background-position: center;
  position: relative;
}
.left-image { margin-left: -20px; }
.right-image { margin-right: -20px; }
.overlay {
  position: absolute; inset: 0;
  background-color: rgba(255,255,255,0.45);
  background-blend-mode: overlay;
}` },
        ],
        language: "php",
        code: `<?php
/**
 * image-header module
 *
 * @param string $title        Header title text
 * @param string $left_image   URL for left background image
 * @param string $right_image  URL for right background image
 */
include_css("image-header", "/.../header.css");
?>
<article class="image-header">

    <?php if (!empty($left_image)): ?>
        <div class="left-image"
             style="background-image: url(<?php echo esc_url($left_image); ?>)">
            <div class="overlay"></div>
        </div>
    <?php endif; ?>

    <h1><?php echo esc_html($title); ?></h1>

    <?php if (!empty($right_image)): ?>
        <div class="right-image"
             style="background-image: url(<?php echo esc_url($right_image); ?>)">
            <div class="overlay"></div>
        </div>
    <?php endif; ?>

</article>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#f8f7f2;padding:14px;}
.header{position:relative;display:flex;align-items:center;justify-content:space-between;height:140px;overflow:hidden;border-radius:10px;}
.left-img{width:200px;height:200px;background:#0F7CBB;position:absolute;left:-20px;top:-30px;z-index:0;border-radius:8px;opacity:.8;}
.left-overlay{position:absolute;left:-10px;top:-20px;width:200px;height:200px;background:rgba(255,255,255,.45);border-radius:8px;z-index:1;}
.right-img{width:300px;height:160px;background:#1D356C;position:absolute;right:-20px;top:-10px;z-index:0;border-radius:8px;opacity:.75;}
.right-overlay{position:absolute;right:-10px;top:0px;width:300px;height:160px;background:rgba(255,255,255,.45);border-radius:8px;z-index:1;}
.title{position:absolute;left:50%;transform:translateX(-50%);text-align:center;z-index:10;font-size:16px;font-weight:700;color:#111;line-height:1.3;width:50%;}
.blue{color:#0F7CBB;}
</style></head><body>
<div class="header">
  <div class="left-img"></div>
  <div class="left-overlay"></div>
  <div class="title">Empower Your Community:<br><span class="blue">Join the Movement</span> for Change</div>
  <div class="right-img"></div>
  <div class="right-overlay"></div>
</div>
</body></html>`,
      },

      {
        id: "simple-quote",
        title: "Simple Quote Block",
        description: "PHP testimonial template with headshot, company logo, decorative quote marks, and attribution. Three responsive breakpoints: desktop flex layout, tablet centered with left margin, mobile full-width stack. Accepts $bk_color for headshot background variants.",
        files: [
          { label: "PHP", language: "php" as const, code: `<?php if (isset($quote_text) && !empty($quote_text)): ?>
    <?php include_css("simple-quote", "/.../simple-quote.css"); ?>

    <blockquote class="simple-quote">

        <!-- Headshot block -->
        <div class="headshot-block
            <?php echo !empty($bk_color) ? esc_attr($bk_color) : ''; ?>">

            <?php if (!empty($headshot_img)): ?>
                <img src="<?php echo esc_url($headshot_img); ?>"
                     alt="<?php echo esc_attr($quote_name); ?>">
            <?php endif; ?>

            <?php if (!empty($company_logo)): ?>
                <div class="logo-wrap">
                    <img src="<?php echo esc_url($company_logo); ?>"
                         alt="Company logo">
                </div>
            <?php endif; ?>
        </div>

        <!-- Quote content -->
        <div class="quote-block">
            <img class="quote-mark open" src="##" alt="">
            <p><?php echo $quote_text; ?></p>
            <img class="quote-mark close" src="##" alt="">

            <?php if (!empty($quote_name)): ?>
                <cite><?php echo esc_html($quote_name); ?></cite>
            <?php endif; ?>

            <?php if (!empty($quote_affiliation)): ?>
                <span class="affiliation">
                    <?php echo esc_html($quote_affiliation); ?>
                </span>
            <?php endif; ?>
        </div>

    </blockquote>
<?php endif; ?>` },
          { label: "CSS", language: "css" as const, code: `/* simple-quote.css */
.simple-quote {
  display: flex; gap: 24px; align-items: flex-start;
  padding: 3% 5%;
}
.headshot-block {
  width: 20%; display: flex;
  flex-direction: column; align-items: center; gap: 12px;
}
.headshot-block img { border-radius: 50%; max-width: 100px; }
.logo-wrap img { max-width: 120px; object-fit: contain; }
.quote-block {
  flex: 1; padding-left: 24px;
  border-left: 3px solid #1D356C;
}
.quote-mark { width: 30px; opacity: 0.5; }
.quote-block p {
  font-size: 1.05rem; line-height: 1.7; font-style: italic;
}
cite {
  display: block; margin-top: 16px;
  font-size: 1rem; font-weight: 700;
  color: #1D356C; font-style: normal;
}
.affiliation { color: #76BD42; font-size: 0.9rem; }

/* Responsive */
@media (max-width: 991px) {
  .simple-quote { justify-content: center; }
  .headshot-block { margin-left: 3%; }
}
@media (max-width: 767px) {
  .simple-quote { flex-direction: column; }
  .headshot-block { width: 100%; flex-direction: row; }
}` },
        ],
        language: "php",
        code: `<?php if (isset($quote_text) && !empty($quote_text)): ?>
    <?php include_css("simple-quote", "/.../simple-quote.css"); ?>

    <blockquote class="simple-quote">

        <!-- Headshot block -->
        <div class="headshot-block
            <?php echo !empty($bk_color) ? esc_attr($bk_color) : ''; ?>">

            <?php if (!empty($headshot_img)): ?>
                <img src="<?php echo esc_url($headshot_img); ?>"
                     alt="<?php echo esc_attr($quote_name); ?>">
            <?php endif; ?>

            <?php if (!empty($company_logo)): ?>
                <div class="logo-wrap">
                    <img src="<?php echo esc_url($company_logo); ?>"
                         alt="Company logo">
                </div>
            <?php endif; ?>
        </div>

        <!-- Quote content -->
        <div class="quote-block">
            <img class="quote-mark open" src="##" alt="">
            <p><?php echo $quote_text; ?></p>
            <img class="quote-mark close" src="##" alt="">

            <?php if (!empty($quote_name)): ?>
                <cite><?php echo esc_html($quote_name); ?></cite>
            <?php endif; ?>

            <?php if (!empty($quote_affiliation)): ?>
                <span class="affiliation">
                    <?php echo esc_html($quote_affiliation); ?>
                </span>
            <?php endif; ?>
        </div>

    </blockquote>
<?php endif; ?>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#f8f7f2;padding:16px;}
.quote{display:flex;gap:20px;align-items:flex-start;}
.headshot-block{width:22%;display:flex;flex-direction:column;align-items:center;gap:10px;}
.headshot{width:70px;height:70px;border-radius:50%;background:#0F7CB8;display:flex;align-items:center;justify-content:center;}
.initials{color:#fff;font-size:18px;font-weight:700;}
.logo{width:80px;height:28px;background:#1D356C;border-radius:3px;display:flex;align-items:center;justify-content:center;}
.logo-text{color:#fff;font-size:8px;font-weight:700;letter-spacing:.06em;}
.quote-block{flex:1;border-left:3px solid #1D356C;padding-left:16px;}
.open-mark{font-size:32px;color:#1D356C;line-height:1;margin-bottom:4px;}
p{font-size:13px;line-height:1.7;color:#222;font-style:italic;}
cite{display:block;margin-top:12px;font-size:13px;font-weight:700;color:#1D356C;font-style:normal;}
.affiliation{font-size:11px;color:#76BD42;}
</style></head><body>
<blockquote class="quote">
  <div class="headshot-block">
    <div class="headshot"><div class="initials">MW</div></div>
    <div class="logo"><div class="logo-text">JUST CAPITAL</div></div>
  </div>
  <div class="quote-block">
    <div class="open-mark">"</div>
    <p>The data doesn't lie — corporations that invest in their workers outperform those that don't, and the evidence only grows stronger every year.</p>
    <cite>Martin Whittaker</cite>
    <span class="affiliation">CEO, Just Capital</span>
  </div>
</blockquote>
</body></html>`,
      },

      {
        id: "multiple-quotes",
        title: "Multiple Quotes",
        description: "PHP loop that renders alternating left/right quote cards. Odd cards align left, even cards use flex-end to push content right. Each card accepts a background-image URL — the quote floats over the photo. Font Awesome icons for open/close quote marks.",
        files: [
          { label: "PHP", language: "php" as const, code: `<?php
if (!isset($border_radius) || empty($border_radius)) {
    $border_radius = 'yes';
}

if (isset($quotes) && !empty($quotes)):
    include_css("multiple-quotes", "/.../multiple-quotes.css");
?>
<div class="multiple-quotes">
    <?php foreach ($quotes as $key => $quote_obj): ?>
        <div class="card
            <?php if ($border_radius !== 'no') echo ' border_radius'; ?>"
            style="<?php if (array_key_exists('image', $quote_obj)):
                ?>background-image: url(<?php echo $quote_obj['image']; ?>);<?php
            endif; ?>">

            <div class="quote">
                <i class="fa fa-quote-left" aria-hidden="true"></i>
                <?php echo $quote_obj['text']; ?>
                <i class="fa fa-quote-right" aria-hidden="true"></i>
            </div>

            <?php if (array_key_exists('author', $quote_obj)): ?>
                <div class="author"><?php echo $quote_obj['author']; ?></div>
            <?php endif; ?>

            <?php if (array_key_exists('affiliation', $quote_obj)): ?>
                <div class="affiliation">
                    <?php echo $quote_obj['affiliation']; ?>
                </div>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
</div>` },
          { label: "CSS", language: "css" as const, code: `/* multiple-quotes.css */
.multiple-quotes { display: flex; flex-direction: column; gap: 0; }
.card {
  background-size: cover; background-position: center;
  padding: 4% 5%; color: #fff;
}
.card:nth-child(odd) {
  display: flex; flex-direction: column; align-items: flex-start;
}
.card:nth-child(even) {
  display: flex; flex-direction: column; align-items: flex-end;
}
.quote {
  width: 73%; font-size: 1.05rem;
  line-height: 1.6; padding-bottom: 2%;
}
.author { font-size: 1.1rem; font-weight: 700; }
.affiliation { font-size: 1rem; opacity: 0.8; }
.border_radius { border-radius: 20px; margin: 10px; }` },
        ],
        language: "php",
        code: `<?php
if (!isset($border_radius) || empty($border_radius)) {
    $border_radius = 'yes';
}

if (isset($quotes) && !empty($quotes)):
    include_css("multiple-quotes", "/.../multiple-quotes.css");
?>
<div class="multiple-quotes">
    <?php foreach ($quotes as $key => $quote_obj): ?>
        <div class="card
            <?php if ($border_radius !== 'no') echo ' border_radius'; ?>"
            style="<?php if (array_key_exists('image', $quote_obj)):
                ?>background-image: url(<?php echo $quote_obj['image']; ?>);<?php
            endif; ?>">

            <div class="quote">
                <i class="fa fa-quote-left" aria-hidden="true"></i>
                <?php echo $quote_obj['text']; ?>
                <i class="fa fa-quote-right" aria-hidden="true"></i>
            </div>

            <?php if (array_key_exists('author', $quote_obj)): ?>
                <div class="author"><?php echo $quote_obj['author']; ?></div>
            <?php endif; ?>

            <?php if (array_key_exists('affiliation', $quote_obj)): ?>
                <div class="affiliation">
                    <?php echo $quote_obj['affiliation']; ?>
                </div>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
</div>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#0a1628;padding:14px;display:flex;flex-direction:column;gap:8px;}
.card{background-size:cover;background-position:center;padding:22px;border-radius:16px;color:#fff;}
.card:nth-child(odd){text-align:left;background:linear-gradient(135deg,#1D356C 0%,#0f2040 100%);}
.card:nth-child(even){text-align:right;display:flex;align-items:flex-end;flex-direction:column;background:linear-gradient(135deg,#0F7CB8 0%,#0a5a8a 100%);}
.quote-text{width:73%;font-size:13px;line-height:1.6;padding-bottom:14px;font-style:italic;}
.card:nth-child(even) .quote-text{margin-left:auto;}
.author{font-size:14px;font-weight:700;font-family:sans-serif;}
.affil{font-size:13px;opacity:.75;margin-top:-2px;}
.mark{opacity:.5;font-size:16px;}
</style></head><body>
<div class="card"><div class="quote-text"><span class="mark">" </span>The most important business decision you can make is how you treat the people who make your business run.<span class="mark"> "</span></div><div class="author">Sarah Chen</div><div class="affil">CFO, Meridian Group</div></div>
<div class="card"><div class="quote-text"><span class="mark">" </span>JUST Capital gave us the framework to turn our values into measurable commitments — and hold ourselves accountable.<span class="mark"> "</span></div><div class="author">Marcus Williams</div><div class="affil">Head of ESG, Atlas Capital</div></div>
</body></html>`,
      },

      {
        id: "listing-cards",
        title: "Listing Cards",
        description: "PHP template that renders staggered alternating-width cards — odd cards span 60% width, even cards are pushed 40% right, creating a cascade layout. Alignment (left/right cascade) and corner style are both configurable. Responsive collapses to full-width stacks.",
        files: [
          { label: "PHP", language: "php" as const, code: `<?php
if (!isset($align) || empty($align)) { $align = "left"; }
if (!isset($id) || empty($id)) { $id = 'glide' . rand(); }
if (!isset($border_radius) || empty($border_radius)) {
    $border_radius = 'no';
}
?>
<?php if (isset($cards) && !empty($cards)): ?>
<?php include_css("listing-cards", "/.../listing-cards.css"); ?>

<!-- Dynamic layout: cascade direction set per instance via inline style -->
<style>
    @media (min-width: 769px) {
        #<?php echo $id; ?> .card:nth-child(even) {
            <?php echo $align === "left"
                ? "margin-left: 40%;"
                : "width: 60%;"; ?>
        }
        #<?php echo $id; ?> .card:nth-child(odd) {
            <?php echo $align === "left"
                ? "width: 60%;"
                : "margin-left: 40%;"; ?>
        }
    }
</style>

<div class="listing-cards" id="<?php echo $id; ?>">
    <?php foreach ($cards as $index => $card_obj): ?>
        <div class="card
            <?php if ($border_radius !== 'no') echo ' border_radius'; ?>">

            <?php if (!empty($card_obj['copy'])): ?>
                <div class="copy"><?php echo $card_obj['copy']; ?></div>
            <?php endif; ?>

            <?php if (!empty($card_obj['sub_copy'])): ?>
                <div class="sub_copy">
                    <?php echo $card_obj['sub_copy']; ?>
                </div>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
</div>
<?php endif; ?>` },
          { label: "CSS", language: "css" as const, code: `/* listing-cards.css */
.listing-cards { display: flex; flex-direction: column; gap: 0; }
.card {
  background: #1D356C; color: #fff;
  padding: 4% 5%; margin: 10px 0;
}
.card.border_radius { border-radius: 12px; }
.copy {
  font-size: 1.1rem; font-weight: 600;
  line-height: 1.4; margin-bottom: 8px;
}
.sub_copy { font-size: 0.95rem; line-height: 1.5; color: #c5d0e8; }

/* Responsive */
@media (max-width: 768px) {
  .card { width: 100% !important; margin-left: 0 !important; }
}` },
        ],
        language: "php",
        code: `<?php
if (!isset($align) || empty($align)) { $align = "left"; }
if (!isset($id) || empty($id)) { $id = 'glide' . rand(); }
if (!isset($border_radius) || empty($border_radius)) {
    $border_radius = 'no';
}
?>
<?php if (isset($cards) && !empty($cards)): ?>
<?php include_css("listing-cards", "/.../listing-cards.css"); ?>

<!-- Dynamic layout: cascade direction set per instance via inline style -->
<style>
    @media (min-width: 769px) {
        #<?php echo $id; ?> .card:nth-child(even) {
            <?php echo $align === "left"
                ? "margin-left: 40%;"
                : "width: 60%;"; ?>
        }
        #<?php echo $id; ?> .card:nth-child(odd) {
            <?php echo $align === "left"
                ? "width: 60%;"
                : "margin-left: 40%;"; ?>
        }
    }
</style>

<div class="listing-cards" id="<?php echo $id; ?>">
    <?php foreach ($cards as $index => $card_obj): ?>
        <div class="card
            <?php if ($border_radius !== 'no') echo ' border_radius'; ?>">

            <?php if (!empty($card_obj['copy'])): ?>
                <div class="copy"><?php echo $card_obj['copy']; ?></div>
            <?php endif; ?>

            <?php if (!empty($card_obj['sub_copy'])): ?>
                <div class="sub_copy">
                    <?php echo $card_obj['sub_copy']; ?>
                </div>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
</div>
<?php endif; ?>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#f8f7f2;padding:14px;display:flex;flex-direction:column;gap:0;}
.card{background:#1D356C;color:#fff;padding:18px 20px;margin:10px 0;}
.card:nth-child(odd){width:60%;}
.card:nth-child(even){width:60%;margin-left:40%;}
.copy{font-size:14px;font-weight:600;line-height:1.4;margin-bottom:6px;}
.sub{font-size:12px;line-height:1.5;color:#c5d0e8;}
</style></head><body>
<div class="card"><div class="copy">Corporations that pay fair wages see 3× lower turnover.</div><div class="sub">Workforce investment data across 1,000+ companies, 2023.</div></div>
<div class="card"><div class="copy">WCAG AA compliance is a design constraint, not a QA gate.</div><div class="sub">Built into every component spec from the first wireframe.</div></div>
<div class="card"><div class="copy">One token system. Two full rebrands. Zero component rewrites.</div><div class="sub">150+ CSS custom properties synced to Figma variables.</div></div>
</body></html>`,
      },

      {
        id: "partner-logos",
        title: "Partner Logos",
        description: "PHP template that loops through a $logos array and renders each as an img element inside a flex container. Label, image dimensions, and the logo source array are all configurable. Responsive via CSS: 15% width on desktop, scaling to 25–28% on mobile.",
        files: [
          { label: "PHP", language: "php" as const, code: `<?php if (isset($label) && !empty($label)): ?>
    <?php include_css("partner-logos", "/.../partner-logos.css"); ?>

    <div class="partner_logos">
        <h3><?php echo esc_html($label); ?></h3>

        <div class="logo_container">
            <?php if (isset($logos) && !empty($logos)): ?>
                <?php foreach ($logos as $index => $logo_src): ?>
                    <img src="<?php echo esc_url($logo_src); ?>"
                        <?php if (!empty($image_width)): ?>
                            width="<?php echo esc_attr($image_width); ?>"
                        <?php endif; ?>
                        <?php if (!empty($image_height)): ?>
                            height="<?php echo esc_attr($image_height); ?>"
                        <?php endif; ?>
                        alt="Partner logo"
                    />
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>
<?php endif; ?>` },
          { label: "CSS", language: "css" as const, code: `/* partner-logos.css */
.partner_logos { padding: 3% 5%; }
.partner_logos h3 {
  font-size: 1.2rem; text-transform: uppercase;
  letter-spacing: 0.06em; padding-bottom: 12px;
  border-bottom: 2px solid #ddd; margin-bottom: 20px;
}
.logo_container {
  display: flex; flex-wrap: wrap;
  align-items: center; gap: 0;
}
.logo_container img {
  width: 15%; margin-right: 40px; margin-bottom: 10px;
  object-fit: contain; height: auto;
}

/* Responsive */
@media (max-width: 991px) { .logo_container img { width: 25%; } }
@media (max-width: 767px) { .logo_container img { width: 28%; } }` },
        ],
        language: "php",
        code: `<?php if (isset($label) && !empty($label)): ?>
    <?php include_css("partner-logos", "/.../partner-logos.css"); ?>

    <div class="partner_logos">
        <h3><?php echo esc_html($label); ?></h3>

        <div class="logo_container">
            <?php if (isset($logos) && !empty($logos)): ?>
                <?php foreach ($logos as $index => $logo_src): ?>
                    <img src="<?php echo esc_url($logo_src); ?>"
                        <?php if (!empty($image_width)): ?>
                            width="<?php echo esc_attr($image_width); ?>"
                        <?php endif; ?>
                        <?php if (!empty($image_height)): ?>
                            height="<?php echo esc_attr($image_height); ?>"
                        <?php endif; ?>
                        alt="Partner logo"
                    />
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>
<?php endif; ?>`,
        previewHtml: `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,sans-serif;background:#f8f7f2;padding:20px;}
.partner_logos{display:flex;flex-direction:column;gap:14px;}
h3{font-size:16px;text-transform:uppercase;letter-spacing:.06em;color:#111;padding-bottom:10px;border-bottom:2px solid #ddd;}
.logo_container{display:flex;flex-wrap:wrap;align-items:center;gap:0;}
.logo{width:15%;margin-right:40px;margin-bottom:10px;height:40px;background:#e8e5e0;border-radius:4px;display:flex;align-items:center;justify-content:center;object-fit:contain;}
.logo-text{font-size:9px;color:#888;font-weight:700;letter-spacing:.08em;text-transform:uppercase;text-align:center;}
</style></head><body>
<div class="partner_logos">
  <h3>Our Partners</h3>
  <div class="logo_container">
    <div class="logo"><div class="logo-text">FORD FOUND.</div></div>
    <div class="logo"><div class="logo-text">BLOOMBERG</div></div>
    <div class="logo"><div class="logo-text">JPMorgan</div></div>
    <div class="logo"><div class="logo-text">WALMART</div></div>
    <div class="logo"><div class="logo-text">APPLE</div></div>
    <div class="logo"><div class="logo-text">AMAZON</div></div>
  </div>
</div>
</body></html>`,
      },
    ],
    tech: ["PHP", "Twig", "WordPress", "CSS Custom Properties", "Sass", "Figma", "Design Tokens"],
  },

  "just-rebrand": {
    id: "just-rebrand",
    seoTitle: "JUST Capital Website — WordPress Front-End Engineering | Jinju Park",
    seoDescription:
      "Built 35 custom WordPress blocks from an agency rebrand — full front-end engineering in PHP, HTML, CSS, and JavaScript, shipped in 8 weeks while simultaneously leading JUST Intelligence Phase 2.",
    heroIntro:
      "While simultaneously leading Phase 2 of JUST Intelligence, I engineered the front-end infrastructure for JUST Capital's massive marketing site rebuild in just 8 weeks. An external agency delivered the visual design, and my role was to bridge that system into a flexible, high-velocity WordPress CMS environment.",
    layout: "narrative",
    processLayout: "stacked",
    keyDecisionsLayout: "stacked",
    leadVisualId: "just-rebrand-home",
    leadVisualHeader: "Shipped Output",
    role: "Lead Front-End Engineer",
    team: "Solo Front-End Engineer, partnering directly with the CTO, CMO, and an External Design Agency",
    snapshot: {
      company: "Just Capital",
      timeline: "8 Weeks (Accelerated Timeline)",
      tools: "WordPress, Custom PHP, HTML5, ACF Pro, JavaScript, Semantic CSS",
      discipline: "Front-End Architecture & CMS Development",
    },
    specSheet: [],
    challenge:
      "The external agency delivered a beautiful, highly complex visual system. The true challenge wasn't just executing the code. It was translating that massive Figma file into a flexible, production-ready WordPress infrastructure in exactly 8 weeks. The business required a system that achieved 1:1 visual fidelity on the front-end, while remaining simple enough on the backend that the marketing team could build and publish custom pages without ever touching a line of code.",
    challengeQuote: "Translating Static Design into a Living CMS",
    approach:
      "Instead of hard-coding static templates, I approached the build as an enterprise UI kit. Every section of the site was engineered as an independent, reusable block. By combining semantic CSS variables with dynamic PHP logic, I decoupled the visual design from the content.\n\nIf the CMO wanted to spin up a new campaign landing page, they didn't need a developer. They simply opened WordPress, selected the modules they needed, filled in the ACF text fields, and the front-end architecture automatically handled the spacing, typography, and responsive breakpoints.",
    processHeader: "The 8-Week Architecture Pipeline",
    whatIDid:
      "Front-End Architecture: Engineered the global design system into a scalable, token-based CSS architecture.\n\nComponent Library Development: Programmed 35+ reusable UI modules using custom PHP, HTML5, and Vanilla JS.\n\nCMS Integration: Architected the backend authoring experience by mapping complex ACF Pro data fields directly to the front-end templates, enabling true \"lego-block\" page building for the marketing team.\n\nTechnical Liaison: Partnered directly with the CTO and CMO to ensure the technical infrastructure mapped to their aggressive marketing roadmap.",
    whatIDidHeader: "Core Responsibilities",
    process: {
      discover: [
        "I deconstructed the agency's Figma files into a strict system inventory, identifying the component and token families required for the build. Before writing a line of code, I mapped every layout to the WordPress content model and partnered with the CTO and Marketing team to lock in hard constraints: absolute editor autonomy, strict accessibility baselines, and zero post-launch dev dependency.",
      ],
      design: [
        "To eliminate translation layers, I built a CSS token architecture that mapped 1:1 with the agency's naming conventions. I then engineered strict ACF (Advanced Custom Fields) schemas for all 35 modules. By defining validation rules, default states, and editor constraints at the schema level, I guaranteed the UI would never break, regardless of what content the marketing team inputted.",
      ],
      ship: [
        "I programmed the 35 reusable UI modules using custom PHP, HTML, and vanilla JS, wiring the front-end architecture directly to the live CMS data. Performance and WCAG AA accessibility guardrails were baked directly into the build process, ensuring responsive fidelity across all modules as legacy content was migrated.",
      ],
      govern: [
        "The project concluded with a complete transfer of ownership. To guarantee true autonomy, I authored a comprehensive internal documentation guide for the marketing team, detailing the specific use cases, constraints, and authoring rules for all 35 modules. By pairing bulletproof code with clear operational playbooks, I empowered them to manage the CMS independently from day one, resulting in exactly zero post-launch engineering tickets.",
      ],
    },
    processTitles: {
      discover: "Scope & Deconstruction",
      design: "Systems Architecture",
      ship: "Component Build",
      govern: "Documentation & Handoff",
    },
    keyDecisionsLabel: "Key Architectural Decisions",
    keyDecisions: [
      "ACF Architecture over Page Builders — Visual builders like Elementor hand marketing teams a \"CSS hammer.\" Every manual override lives inline, accumulating massive specificity debt. By architecting strict ACF schemas instead, I provided the exact same authoring freedom while retaining centralized control over the HTML markup. Absolute autonomy for marketing; strict architectural integrity for engineering.",
      "1:1 Semantic Token Mapping — To eliminate the translation layer between design and development, I mapped the CSS token system directly to the agency's naming conventions (brand-primary became --color-brand-primary). I then extended the architecture by engineering component-level semantic tokens (e.g., --btn-bg-primary). This decoupled UI components from the global palette, making future theme maintenance effortless.",
      "Engineering \"Defensive\" Defaults — Because I was simultaneously leading Phase 2 of JUST Intelligence, I had zero capacity for post-launch support. Therefore, the handoff wasn't just an event. It was the core requirement the entire architecture was built against. I engineered the CMS defensively, programming sensible fallback defaults on every single optional field to guarantee the UI would never break, even if the content team missed a step.",
    ],
    outcomesHeader: "The Business Impact",
    outcomes: [
      "Marketing Autonomy Achieved\nThe system handoff was a complete success. The marketing team now manages all content independently from day one, resulting in exactly zero engineering support tickets post-launch.",
      "Future-Proofed Architecture\nBuilt for longevity, not just a launch date. The global CSS token system ensures that any future brand updates or re-theming will only require simple token swaps, completely avoiding expensive and risky codebase rewrites.",
      "Uncompromised Visual Fidelity\nTranslated the agency's complex static deliverables into a fully fluid, responsive system (scaling seamlessly from mobile to desktop) while achieving 100% design-to-code parity.",
    ],
    visualBlocksHeader: "System Architecture & QA Proof",
    visualBlocks: [
      {
        id: "just-rebrand-home",
        layout: "wide",
        imageSrc: "/just-rebrand/justcapital-home.png",
        caption: "Live site output (justcapital.com) built from the 35-module WordPress system.",
      },
      {
        id: "just-rebrand-architecture",
        layout: "pipeline",
        caption: "",
      },
    ],
    codeBlocks: [],
    metricsHeader: "The Outcomes",
    metrics: [
      { value: "35",       label: "Custom WordPress Modules Engineered" },
      { value: "8 Weeks",  label: "Accelerated Delivery Timeline" },
      { value: "0",        label: "Open Visual QA Tickets at Launch" },
      { value: "3x",       label: "Parallel Engineering Tracks Managed" },
      { value: "WCAG AA",  label: "Accessibility Baseline Engineered" },
    ],
    tech: [],
    reflection:
      "My job wasn't invention; it was fidelity and durability.\n\nImplementation is interpretation. Every spacing edge case I resolved, every interactive state I programmed where the static design was silent, and every CMS field I named so a non-technical team could understand it\u2014those were all decisions actively protecting the original design intent.\n\nThe accelerated 8-week timeline and parallel engineering tracks pushed that philosophy even further. I couldn't afford to be 'clever'; I had to build systems that explained themselves. The architecture had to be simple enough to hand off, yet sturdy enough to hold up. Ultimately, those strict constraints forced me to engineer a significantly better, more resilient codebase than I would have with unlimited time.",
    ctaText: "If your team is about to receive a design handoff and needs someone who can build the architecture behind it — not just the UI on top of it — let's talk.",
    liveSiteUrl: "https://justcapital.com",
  },

  "netflix-disney": {
    id: "netflix-disney",
    seoTitle: "Netflix & Disney+ — Multilingual Design Operations | Jinju Park",
    seoDescription:
      "8 years building the design ops infrastructure for Netflix and Disney+ across 50+ languages, 2 global studios, and every major script system — Latin, CJK, Arabic, Cyrillic, Hebrew.",
    heroIntro:
      "I lead Design Operations for global interfaces across 7 key markets. Now I continue this work via one of Creative Agency as a freelancer, bridging brand standards with technical execution.\n\nI established the systems that allowed two global studios to maintain visual consistency\u2014including a unified typography framework, a shared component library, and a specialized QA process that has remained in production for over eight years. By moving away from fragmented workflows, I ensured that every interface maintains brand integrity across all supported regions.",
    role: "Lead Design Technologist & DesignOps Architect",
    snapshot: {
      company: "Netflix / Disney+",
      timeline: "8+ Years \u00b7 Ongoing Freelance",
      tools: "Figma, Adobe CC, Cinema 4D, Custom QA Framework",
    },
    team: "Partners",
    specSheet: [],
    challenge:
      "Two global studios operated in isolation, making localization decisions without a unified framework. A title treatment could clear review at one studio and fail at the other\u2014evaluated against criteria that were never built for that specific market. With fixed launch windows and significant density variance across 7 global languages, the lack of a shared system created a critical bottleneck for visual integrity.",
    approach: "",
    process: {
      discover: [
        "Market Audit: Audited the visual and spatial requirements for 7 key markets to understand exactly how different languages changed the layout of title treatments.",
        "Workflow Analysis: Identified a major operational gap: two studios were trying to localize assets without shared QA criteria or a consistent review framework.",
        "Guideline Mapping: Analyzed brand rules for both platforms to map exactly where the original language guidelines conflicted with the reality of localized text.",
      ],
      design: [
        "Typography Systems: Established clear design systems for Latin and CJK scripts to ensure title treatments kept their original visual impact, regardless of the language length or density.",
        "Comprehensive QA Logic: Developed a visual evaluation framework that went beyond just aesthetics. It included strict standards for file structuring, layer organization, and overall asset quality.",
        "Global Standards: Created the shared Adobe and Cinema 4D asset structures and review standards used to train 21 overseas designers.",
      ],
      ship: [
        "Framework Launch: Delivered handoff packages with clear annotations and standardized production files for all regional variants.",
        "Asset Consistency: Maintained strict quality control over shared Adobe and Cinema 4D working files, preventing asset divergence between the two studios over 8 years.",
        "Operating Standard: The review and QA process became the official cross-studio standard for the 7 markets I managed, and it remains the operating framework today.",
      ],
    },
    keyDecisions: [
      "Visual-First QA \u2014 Evaluation criteria centered on visual balance and strict file structuring rather than linguistic review. This allowed for high-fidelity quality control without assuming the reviewer could read the specific language.",
      "Standardized Asset Pipeline \u2014 Instead of letting studios build their own files from scratch, I enforced a single, standardized structure for all Adobe and Cinema 4D files. This prevented the studios from drifting apart visually as the project scaled.",
      "Strategic Training \u2014 Instead of acting as a bottleneck by reviewing every single asset myself, I trained 21 designers on the core system. This shifted the pipeline from manual QA to a scalable production model.",
    ],
    outcomes: [],
    visualBlocksHeader: "The Framework",
    visualBlocksColumns: 2,
    visualBlocks: [
      {
        id: "logos",
        layout: "wide",
        imageSrc: "/netflix/hero-logos.png",
        noContainer: true,
        caption: "Two global studios. One shared design standard. The foundation that has defined eight years of multilingual design operations.",
      },
      {
        id: "diecisiete",
        layout: "wide",
        imageSrc: "/netflix/tt-diecisiete-ko.png",
        caption: "Adapting Diecisiete required precise calibration across three iterations. A direct translation of optical weight failed to capture the film's tone. The final asset was engineered to find the exact expressive equivalent, balancing the original Spanish intent with native Korean typographic standards.",
      },
      {
        id: "context",
        layout: "wide",
        imageSrc: "/netflix/context-poster.jpg",
        caption: "The Korean localization of Diecisiete integrated into its final production art. The typographic framework must perform within a shipped composition, not just as an isolated asset.",
      },
      {
        id: "runway",
        layout: "wide",
        imageSrc: "/netflix/tt-smile-runway-en.png",
        caption: "The original English typography relied on distinct, rounded letterforms. Translating that structural softness into Hangul required precise calibration\u2014preserving the geometric roundness of the brand identity without compromising the structural integrity and legibility of the Hangul characters.",
      },
      {
        id: "naruto",
        layout: "wide",
        imageSrc: "/netflix/tt-naruto-jp.png",
        caption: "This asset required a reverse adaptation. Although the property originates in Japan, the design mandate was to inherit the English brand architecture. The primary logotype was retained in English by request, while the Kanji and Katakana subtitles were engineered to mirror its exact brushstrokes and serif styling. The technical challenge was matching the stroke contrast and visual density of the English asset without compromising the structural rules of the Japanese script.",
      },
      {
        id: "hospital",
        layout: "wide",
        imageSrc: "/netflix/tt-hospital-playlist-ro.png",
        caption: "Although the original IP is ko, this localization was anchored to the en studio asset. Because English and Romanian share the same Latin script architecture, inheriting the English visual logic was the most structurally sound choice.",
      },
      {
        id: "history",
        layout: "wide",
        imageSrc: "/netflix/tt-history101-ko.png",
        caption: "Adapting the ja visual identity into en required translating an expressive aesthetic across structurally incompatible scripts. A direct typographic translation left the Latin letterforms feeling visually empty, failing to deliver the expressive weight of the original. By engineering custom typographic curves into the primary capitals (S, D, R), the title achieved the necessary optical volume and kinetic presence without forcing unnatural structural similarities onto the English characters.",
      },
      {
        id: "moscraciun",
        layout: "wide",
        imageSrc: "/netflix/tt-mos-craciun-en.png",
        caption: "Localization in reverse \u2014 Romanian original, English adaptation. The dimensional embossing and circular lock-up of the original could not be re-lettered; they had to be re-engineered at the new string length. The English version is shorter. That asymmetry is harder to solve than it appears.",
      },
      {
        id: "captainunderpants",
        layout: "wide",
        imageSrc: "/netflix/tt-captain-underpants-ro.png",
        caption: "Animated content, illustrated letterforms \u2014 the rules are different. When the type is drawn, not set, a font swap is not an option. The Romanian string is significantly longer. Both constraints had to be solved while keeping the cartoonish structural weight that defines the brand: the oversized caps, the stacked hierarchy, the chaos-as-system.",
      },
      {
        id: "brews",
        layout: "wide",
        imageSrc: "/netflix/tt-brews-ro.png",
        caption: "Distressed, textural type \u2014 the worn letterforms are the brand identity. The Romanian localization had to preserve that weathered quality while fitting a different string length into the same visual space.",
      },
    ],
    metrics: [
      { value: "7",   label: "markets" },
      { value: "2",   label: "global studios" },
      { value: "8+",  label: "years partnership" },
      { value: "2",   label: "script systems" },
    ],
    tech: [],
    languagesSection: {
      header: "Languages Worked On",
      description: "Localization across 7 markets and 2 script systems. Because Latin defaults do not transfer, each market required independent typographic architecture and a first-principles rebuild.",
      groups: [
        {
          title: "Latin Script (5 Markets)\nFrench (fr), Canadian French (fr-CA), Danish (da), Norwegian Bokm\u00E5l (nb), Romanian (ro)",
          focus: "Established a unified Latin baseline optimized for optical margin alignment and variable title card widths.",
          constraints: "Engineered precise diacritic clearance for regional characters (\u00E9, \u00E0, \u00E2, \u00F8, \u0103, \u0219).",
        },
        {
          title: "Japanese (ja)",
          focus: "Orchestrated mixed-script composition to achieve visual balance between Katakana and Kanji characters.",
          constraints: "Recalibrated vertical rhythm (adjusting line-height to 1.9 vs. the Latin 1.4) and renegotiated title card height contracts with engineering.",
        },
        {
          title: "Korean (ko)",
          focus: "Architected layouts around the Hangul grid, enforcing square character frames and custom word-spacing overrides where standard Latin kerning pairs fail.",
          constraints: "Implemented strict minimum height requirements for title cards on a per-component basis.",
        },
      ],
    },
    reflection:
      "Most of my localization work was in languages I do not speak. That became the discipline: evaluating visual rhythm, typographic color, and structural balance as abstract architectural qualities rather than linguistic meaning. When you can govern a Korean title treatment without reading Korean, you have built a framework that scales beyond any individual's knowledge.",
    ctaText: "",
  },

  "iata": {
    id: "iata",
    seoTitle: "IATA WeChat Mini-Program — Cross-Cultural UX Design | Jinju Park",
    seoDescription:
      "I designed IATA's aviation training platform for WeChat — building native Chinese UI patterns from the ground up, with bilingual Figma specs for a China-based engineering team.",
    heroIntro:
      "No URL bar. No browser back button. No assumption that Western interaction patterns apply.\n\nI architected IATA's aviation training platform for WeChat — an ecosystem where the design conventions, technical constraints, and user expectations are fundamentally different from anything in the Western mobile playbook. 350+ courses, a China-based engineering team, and bilingual specs that had to eliminate ambiguity across a language barrier.",
    role: "Lead UX Designer — Cross-Platform & Localization",
    team: "Wordbank → IATA · Cross-functional · China-based dev team",
    snapshot: {
      timeline: "2023",
      tools: "Figma, WeChat DevTools, bilingual spec annotations",
    },
    specSheet: [
      { label: "Primary Stack", value: "Figma · WeChat DevTools · Bilingual (EN/ZH) specs" },
      { label: "Accessibility", value: "WeChat-native interaction patterns · PingFang SC/Heiti SC" },
      { label: "Engineering Impact", value: "Zero QA rework across cross-continental handoff" },
      { label: "Scale", value: "350+ courses · China-based dev team · WeChat ecosystem" },
    ],
    challenge:
      "Delivering aviation training to Chinese professionals through WeChat — an ecosystem with its own design conventions, technical constraints, and user expectations entirely different from Western mobile. Two failure modes: wrong UI patterns (product feels foreign), wrong spec language (implementation diverges from intent). Either one means the product ships but practically fails.",
    approach:
      "Platform research before pixels. I spent two weeks in WeChat DevTools before opening Figma — designing from Western assumptions would have produced something that works in Figma and fails in production. The architectural constraint: Chinese aviation professionals open this inside an app they trust completely. The only acceptable outcome was something that felt native.",
    whatIDid:
      "Sole designer — owned the full pipeline from WeChat platform research through bilingual Figma handoff. Every platform decision, every cultural assumption, every bilingual annotation made without a second opinion. The design-to-implementation bridge for a cross-continental, cross-lingual engineering workflow.",
    process: {
      discover: [
        "WeChat Mini-Program guidelines documented as Figma constraints before any UI work — platform-first, not design-first",
        "IATA content audit: module structure, Chinese-market course prioritization, credential recognition requirements",
        "Chinese mobile behavior research: WeChat navigation conventions, QR code flows, long-press menus, absence of browser back",
        "WeChat DevTools environment testing: layout constraints, 2MB subpackage ceiling, system font rendering (PingFang SC / Heiti SC only)",
      ],
      design: [
        "WeChat-native navigation: bottom tab bar, flat hierarchy, QR code integration — not Western patterns adapted to fit",
        "Progress tracking and quiz interfaces engineered within WeChat's viewport and interaction constraints",
        "Chinese-first typography with system font constraints — WeChat restricts custom typefaces to whitelisted CDN fonts",
        "Cross-cultural iconography audit: Western icons with ambiguous Chinese meanings flagged and replaced with WeChat-familiar equivalents",
      ],
      ship: [
        "Bilingual Figma specs (EN + ZH) — eliminated implementation ambiguity across a cross-continental language barrier",
        "QA in WeChat DevTools, not browser DevTools — the rendering engine behaves differently and browser testing is insufficient",
        "Full handoff to China-based engineering team with zero design-implementation discrepancies in QA",
        "Live in WeChat — 350+ courses accessible to Chinese aviation professionals with no external browser dependency",
      ],
    },
    keyDecisions: [
      "Bilingual specs over English-only — doubled annotation time, eliminated an entire category of implementation ambiguity. The ROI was zero QA rework across a cross-continental handoff.",
      "WeChat-native patterns over adapted Western patterns — higher research cost upfront, near-zero rework downstream. Course icons, bottom nav, modal flows all follow WeChat conventions, not iOS/Android norms.",
    ],
    outcomes: [
      "350+ IATA courses now accessible inside WeChat — previously required a browser or external app. Delivered to where Chinese aviation professionals already spend their working day.",
      "Zero design-implementation discrepancies in QA — bilingual specs eliminated the ambiguity that typically plagues cross-continental handoffs",
      "WeChat-native interaction patterns throughout — no Western patterns adapted to fit, no user confusion",
      "Live in WeChat across China — no external browser dependency, no app install friction",
    ],
    visualBlocksHeader: "What Got Designed",
    visualBlocks: [
      {
        id: "social",
        layout: "side-by-side",
        label: "Campaign Localization",
        imageSrc: "/iata/social-original.png",
        caption: "Western original — discount-led hierarchy, English reading patterns. The brand is secondary to the offer.",
        imageSrc2: "/iata/social-localized.png",
        caption2: "Chinese localization — the hierarchy changed, not just the language. Chinese market reading patterns required a fundamentally different visual logic, not a translation.",
      },
      {
        id: "landing",
        layout: "wide",
        phoneScroll: true,
        label: "Landing Page",
        imageSrc: "/iata/landing-final.png",
        caption: "The landing page had one job: feel like it belonged inside WeChat. IATA branding adapted to Simplified Chinese, bottom tab bar following WeChat's native navigation convention — not Western mobile patterns adjusted to fit.",
      },
      {
        id: "course",
        layout: "wide",
        phoneScroll: true,
        label: "Course Detail",
        imageSrc: "/iata/course-final.png",
        caption: "Chinese interface, English course name — because the user needs to recognize the credential. Every element here was a deliberate choice, not a translation default.",
      },
      {
        id: "about",
        layout: "before-after",
        phoneScroll: true,
        label: "About Page",
        beforeSrc: "/iata/about-wireframe.png",
        afterSrc: "/iata/about-final.png",
        caption: "Wireframe to final — the bilingual spec annotations that made this handoff work are not visible here. But they are why this shipped to a China-based team, across a language barrier, without QA rework.",
      },
    ],
    metrics: [
      { value: "350+", label: "IATA courses now accessible inside WeChat — previously required a browser or external app" },
      { value: "0",    label: "design-to-implementation discrepancies in QA — bilingual specs eliminated ambiguity" },
      { value: "2",    label: "weeks in WeChat DevTools before opening Figma — platform research, not overhead" },
    ],
    tech: ["Figma", "WeChat Mini-Programs", "Cross-cultural UX", "Mobile Design", "Localization"],
    reflection:
      "Designing for WeChat isn't translating — it's arriving. The platform has already made hundreds of decisions about how users move through digital space. My job was to understand those architectural decisions before making any of my own. Two weeks in WeChat DevTools wasn't research overhead — it was the work that made zero QA rework possible.",
    ctaText:
      "I architect products that feel native in markets your team has never shipped to. If you're expanding into a platform that plays by different rules, I know what that actually requires.",
  },

  "storycorps": {
    id: "storycorps",
    seoTitle: "StoryCorps Case Study — Cross-Platform UX Redesign | Jinju Park",
    seoDescription:
      "I led UX and visual design for StoryCorps on iOS and Android, reducing onboarding friction and improving recording reliability for real families preserving oral history.",
    heroIntro:
      "Sole UX/UI Designer for a national mobile ecosystem redesign in partnership with NPR. The project was catalyzed by a critical architectural failure: the recording flow lacked a robust recovery path, resulting in data loss for a digital archive. I overhauled the end-to-end recording experience to implement zero-loss session recovery and collapsed a 7-step onboarding friction point into a streamlined, high-conversion flow. By architecting for \"forgiveness by design,\" I delivered a stable, accessible experience that maintained a 4.6\u2605 App Store rating through the surge of a national launch.",
    role: "Sole UX/UI Designer",
    team: "1 Design Director \u00B7 NPR Stakeholders",
    snapshot: {
      company: "StoryCorps",
      timeline: "6 weeks / 2021",
      tools: "Figma \u00B7 WCAG 2.1 AA Audits",
      productImpact: "7 \u2192 3 step onboarding",
      scale: "National NPR Partnership \u00B7 2 Platforms \u00B7 1 Shared Design System",
    },
    specSheet: [],
    challengeQuote: "From Functional Utility to Human-Centric Product.",
    challenge:
      "The existing application functioned as a technical utility without an established UX framework. This lack of design infrastructure resulted in a high-friction onboarding process and a recording flow that offered no protection against common mobile interruptions. With a national NPR partnership approaching, the challenge was to architect a cohesive user experience from the ground up\u2014one that could withstand a massive surge in volume while ensuring the technology remained invisible to the user.",
    approachHeader: "Architecting Forgiveness.",
    approach:
      "As the sole designer, I established the first formal UX standards for the platform. The strategy was \"Reliability as a Core Brand Value.\" Since the app serves a wide demographic, including non-power users, the interface needed to be \"forgiving\" by default. I prioritized the engineering of a persistent session state, ensuring that backgrounding or accidental closures\u2014which previously resulted in total data loss\u2014became non-events for the user.",
    process: {
      discover: [
        "Audit & Sentiment: Analyzed 150+ App Store reviews. Confirmed that \"silent failures\" and data loss were the primary drivers of user churn and negative sentiment.",
        "Friction Mapping: Visualized the gap between user intent and action, identifying that the original 7-step onboarding was the single largest barrier to session starts.",
        "NPR Brand Alignment: Defined the visual hierarchy for how the StoryCorps and NPR identities coexist, ensuring brand credibility for a national audience.",
      ],
      design: [
        "Recovery-First Architecture: Established session resilience as the core UX requirement\u2014incorporating local auto-saving and backgrounding logic into the initial wireframes.",
        "Strategic Friction Removal: Relocated the account gate to the post-recording phase, allowing users to experience the product's value before being asked for data.",
        "Unified Design Language: Standardized a single source of truth for both platforms, providing explicit documentation for interrupt handling and state changes.",
      ],
      ship: [
        "Cross-Functional Collaboration: Partnered directly with the engineering team to adapt design logic in real-time as platform-specific constraints surfaced.",
        "Inclusive Design Standards: Executed a full accessibility audit (WCAG 2.1 AA), enforcing 44px touch targets and optimized screen-reader paths for an older demographic.",
        "Final Quality Assurance: Owned the visual and functional sign-off for both platforms, ensuring the experience remained stable through the national launch.",
      ],
    },
    keyDecisions: [
      "Removed the Account Gate — Users record their stories immediately and create an account only when they are ready to save.\n\nThe Trade-off: Delayed user retention data in exchange for immediate product value.\n\nThe ROI: Eliminated the highest-friction drop-off point in the funnel and prioritized the \"intent-to-record\" moment.",
      "Persistent Session State over Minimalist UI — Prioritized visual reassurance and recovery paths over a simplified recording screen.\n\nThe Trade-off: A slightly denser interface in exchange for absolute session resilience.\n\nThe ROI: A lost story is a total loss of trust; architectural resilience was chosen over aesthetic minimalism to ensure data integrity for every user.",
      "Unified Design System over Platform-Native UI — Standardized a single source of truth for both iOS and Android rather than maintaining two divergent sets of native components.\n\nThe Trade-off: Accepted minor platform deviations to ensure deployment velocity.\n\nThe ROI: Created a scalable, language-agnostic framework that allowed for a 1:1 consistent experience across a fragmented device landscape.",
    ],
    outcomes: [],
    visualBlocksHeader: "What Got Redesigned",
    visualBlocks: [
      {
        id: "onboarding",
        layout: "before-after",
        label: "Onboarding/Register",
        caption: "The old flow asked users to create an account before hearing a single word of their own voice. This one doesn't. Three steps to recording, zero friction gates.",
        beforeSrc: "/storycorps/onboarding-before.png",
        afterSrc: "/storycorps/onboarding-after.png",
        afterScreens: [
          { src: "/storycorps/onboarding-01-signin.png", label: "Sign In" },
          { src: "/storycorps/onboarding-02-signup.png", label: "Create Account" },
          { src: "/storycorps/onboarding-03-interests.png", label: "Pick Interests" },
          { src: "/storycorps/onboarding-04-profile.png", label: "Finish Profile" },
          { src: "/storycorps/onboarding-05-email.png", label: "Check Email" },
          { src: "/storycorps/onboarding-06-home.png", label: "Home" },
        ],
      },
      {
        id: "recording",
        layout: "before-after",
        label: "Recording Screen",
        caption: "A dropped call used to mean a lost story. The redesign solved this by transforming a fragile audio utility into a resilient, guided multimedia archive. By integrating question preparation and photo prompts directly into a persistent, auto-saving session, the architecture protects the entire storytelling process. Interruptions are now recoverable by default\u2014ensuring the focus stays on the narrative, not the technology.",
        beforeSrc: "/storycorps/recording-before.png",
        afterSrc: "/storycorps/recording-after.png",
        afterScreens: [
          { src: "/storycorps/recording-01-prepare.png", label: "Prepare" },
          { src: "/storycorps/recording-02-questions.png", label: "Questions" },
          { src: "/storycorps/recording-03-record.png", label: "Record" },
          { src: "/storycorps/recording-04-photos.png", label: "Photos" },
          { src: "/storycorps/recording-05-imageselect.png", label: "Select Images" },
          { src: "/storycorps/recording-06-description.png", label: "Description" },
          { src: "/storycorps/recording-07-privacy.png", label: "Privacy" },
          { src: "/storycorps/recording-08-preview.png", label: "Preview" },
          { src: "/storycorps/recording-09-published.png", label: "Published!" },
        ],
      },
      {
        id: "listen-feed",
        layout: "screen-grid",
        caption: "The original app treated content discovery as a secondary feature. I redesigned the Listen Feed into a dynamic, social-style interface to surface community-shared recordings. By integrating inline playback, synchronized transcripts, and a comprehensive filtering architecture (indexing by date, keyword, community, location, and language), the platform evolved from a personal recording utility into a highly discoverable public archive.",
        screens: [
          { src: "/storycorps/feed-01-player.png", label: "Listen Feed" },
          { src: "/storycorps/feed-02-transcript.png", label: "Read Transcript" },
          { src: "/storycorps/feed-03-filter.png", label: "Filter Stories" },
        ],
      },
      {
        id: "profile",
        layout: "screen-grid",
        caption: "Interview counts, collections, saved questions — a personal archive that grows with every conversation recorded.",
        screens: [
          { src: "/storycorps/profile-01-myprofile.png", label: "My Profile" },
          { src: "/storycorps/profile-02-questions.png", label: "My Questions" },
          { src: "/storycorps/profile-03-collections.png", label: "Collections" },
        ],
      },
    ],
    metrics: [
      { value: "4.6\u2605", label: "iOS App Store rating held through NPR launch, user volume tripled" },
      { value: "3",    label: "onboarding steps (from 7)" },
      { value: "2",    label: "platforms, 1 shared component system" },
    ],
    tech: [],
    reflection: "",
    ctaText: "",
  },
};
