export interface VisualBlock {
  id: string;
  caption: string;
  layout: "before-after" | "wide" | "side-by-side" | "screen-grid";
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
  processLayout?: "columns" | "stacked";
  keyDecisionsLayout?: "grid" | "stacked";
  leadVisualId?: string;
  leadVisualHeader?: string;
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
    govern?: string[];
  };
  processTitles?: {
    discover?: string;
    design?: string;
    ship?: string;
    govern?: string;
  };
  keyDecisions?: string[];
  keyDecisionsLabel?: string;
  outcomes?: string[];
  visualBlocks?: VisualBlock[];
  visualBlocksHeader?: string;
  visualBlocksColumns?: 2;  // render wide blocks in a 2-column grid
  codeBlocks?: CodeBlock[];  // code + preview pairs shown in the case study
  codeBlocksHeader?: string;
  metrics: { value: string; label: string }[];
  tech: string[];
  reflection?: string;
  ctaText?: string;
  liveSiteUrl?: string;
  phase2Teaser?: string;
  phase2Url?: string;
  specSheet?: { label: string; value: string }[];
}

export const caseStudies: Record<string, CaseStudyData> = {
  "just-intelligence": {
    id: "just-intelligence",
    seoTitle: "JUST Intelligence — Corporate Accountability Data Platform | Jinju Park",
    seoDescription:
      "7 years designing and building JUST Capital's flagship data platform — from research sessions with financial analysts to 30+ production React components, serving 3M+ users across institutional investors and the general public.",
    heroIntro:
      "240+ weighted indicators. 1,000 public companies. Users who live in Bloomberg terminals.\n\nI've been the lead product designer and front-end engineer on this platform for seven years — architecting the information architecture, the D3 visualization system, the React component library, and the design token infrastructure. The first component and the thirtieth were built from the same abstraction model. Both survived two full rebrands without a rewrite. That's not luck — that's architecture.",
    role: "Lead Product Designer & Front-End Engineer",
    team: "2 designers · 4 engineers · 1 PM",
    snapshot: {
      timeline: "2017–present",
      tools: "React, TypeScript, D3, Figma, Design Tokens, axe-core",
    },
    specSheet: [
      { label: "Primary Stack", value: "React · TypeScript · D3 · CSS Custom Properties" },
      { label: "Accessibility", value: "WCAG 2.1 AA · axe-core in every PR" },
      { label: "Engineering Impact", value: "0 component rewrites across 2 full rebrands" },
      { label: "Scale", value: "3M+ users · 7 years in production" },
    ],
    challenge:
      "The constraint wasn't data complexity — it was cognitive trust. Financial analysts apply deep skepticism to any metric they didn't model themselves. If a visualization implies a ranking gap that doesn't exist in the underlying data, trust is lost permanently. 240+ weighted indicators across 1,000+ companies, consumed by users who benchmark everything against Bloomberg. Making density navigable while maintaining data integrity — that was the architectural problem.",
    approach:
      "I embedded with engineering from day one — running user research, translating sessions directly into Figma components, then writing the React that shipped them. No handoff document. No translation layer. I owned the spec and the PR. When an analyst session surfaced a new pattern, I was in the codebase the same week. Zero gap between design intent and production reality.",
    whatIDid:
      "Sole designer embedded full-time with engineering. Owned every visual decision — the token system, the component library, D3 visualization specs, and the accessibility audit framework. When Figma changed, CSS custom properties changed the same day. Design-to-code parity enforced by proximity, not process.",
    process: {
      discover: [
        "12 user sessions surfaced the core tension: analysts trusted the methodology but couldn't navigate density fast enough — time-to-comparison was 4x Bloomberg tolerance",
        "47 annotated heuristic issues, prioritized by impact vs. cost. Top finding: ranking view made #3 and #8 look equivalent — ordinal position without score distance",
        "Query latency constraints ruled out real-time filtering on full dataset — progressive disclosure became an architectural requirement",
        "3 firm types (asset managers, ESG researchers, corporates) with fundamentally different entry points — modular IA or nothing",
      ],
      design: [
        "Token architecture first: 150+ CSS custom properties in three layers (global → semantic → component). The decision that made two future rebrands possible without rewrites",
        "D3 visualization system from first principles — every chart encodes score distance, not ordinal rank. A 0.4-point gap between #3 and #8 is the analyst's decision input",
        "1:1 Figma-to-React component library — matching names, props, and variant structure. Zero translation layer between design intent and shipped code",
        "WCAG AA from wireframe: axe-core in every PR, keyboard navigation through 1,000-row datasets, contrast ratios on data-dense tables",
      ],
      ship: [
        "React + TypeScript front-end built alongside Figma — no handoff phase. Analyst session to codebase in the same week",
        "D3 progressive disclosure: Overall → Stakeholder → Issue → Metric → Datapoint. Five levels, each reducing cognitive load by ~80%",
        "AI-powered search with source citations — natural language queries grounded in proprietary data so analysts verify before trusting",
        "30+ components maintained 7 years — token architecture absorbed two rebrands by changing only the alias layer",
      ],
    },
    keyDecisions: [
      "Tokens before features — first month on infrastructure, not UI. 150+ CSS custom properties in three layers. Two rebrands later: only the alias layer changed. Zero component rewrites. The compound ROI of right abstractions, validated over seven years.",
      "Distance over rank — no pre-built chart library encoded what analysts actually needed: score proximity, not ordinal position. Built every D3 visualization from scratch. The treemap encodes weight as area and performance as color — two dimensions, one view.",
      "Accessibility as architecture — axe-core in every PR from day one. On a platform where analysts keyboard-navigate 1,000-row tables, WCAG AA isn't a compliance checkbox — it's a component API requirement.",
    ],
    keyDecisionsLabel: "Key Tradeoffs",
    outcomes: [
      "30+ components, 7 years, zero forks — a component library that both design and engineering owned from the same source of truth",
      "Two full rebrands absorbed by token alias swaps — zero component rewrites. Architectural resilience validated at production scale.",
      "3M+ users across institutional investors, ESG researchers, and the general public",
      "WCAG AA compliance at institutional scale — accessible data visualization engineered from the first wireframe, not retrofitted",
    ],
    visualBlocksHeader: "What Got Built",
    visualBlocks: [
      {
        id: "hero",
        layout: "wide",
        imageSrc: "/just/just-ji-hero.png",
        caption: "The hierarchy problem: 240+ weighted indicators needed to collapse into a single company score without destroying analyst trust in the number. Every visual layer is a decision about what to surface immediately and what to earn with a click.",
      },
      {
        id: "explorer-results",
        layout: "side-by-side",
        imageSrc: "/just/just-ji-explorer.png",
        caption: "Company Explorer — the entry point for analysts who know what they're looking for. Filter logic built to match how analysts actually query: sector first, then metric weight, then score band.",
        imageSrc2: "/just/just-ji-results.png",
        caption2: "Search results ranked by JUST Score with inline metric previews. The scan pattern was designed for analysts running 20+ company comparisons per session — the critical data visible without opening a single company.",
      },
      {
        id: "ranking",
        layout: "wide",
        imageSrc: "/just/just-ji-ranking.png",
        caption: "A sorted list of 1,000 companies makes rank #3 and rank #8 look equivalent. What matters is the score gap between them. The distribution model shows where a company sits relative to its peers — not just its ordinal position.",
      },
      {
        id: "scenario",
        layout: "wide",
        imageSrc: "/just/just-ji-scenario-old.png",
        caption: "Scenario Analysis — adjust metric weights to model hypothetical scoring outcomes. Built for ESG analysts who need to stress-test weighting assumptions before publishing a portfolio thesis.",
      },
    ],
    metrics: [
      { value: "3M+", label: "users served — institutional investors, ESG researchers, and public" },
      { value: "7+",  label: "years in production with zero component forks across 3 teams" },
      { value: "0",   label: "component rewrites during 2 full visual rebrands" },
      { value: "4x",  label: "faster time-to-comparison vs. analyst benchmark (user sessions)" },
    ],
    tech: ["React", "TypeScript", "D3", "CSS Custom Properties", "Figma", "Design Tokens", "axe-core"],
    reflection:
      "Seven years on one product taught me what shorter engagements can't: bad abstractions compound. A token system that's slightly wrong in year one becomes a migration project in year three. A component API that skips edge cases forks by year two. These components are still in production because the abstractions were right — not clever, just right.",
    ctaText: "I architect products meant to outlast the team that shipped them. If your abstractions need to be right the first time, I want to hear about it.",
    phase2Teaser: "Phase 2 — redesigned the platform as JUST Capital rebranded, introducing new features driven by real user usage patterns and fresh stakeholder feedback to improve the analyst experience end-to-end.",
    phase2Url: "/work/just-intelligence-v2",
  },

  "just-intelligence-v2": {
    id: "just-intelligence-v2",
    seoTitle: "JUST Intelligence v2 — Platform Redesign & AI Features | Jinju Park",
    seoDescription:
      "Redesigned JUST Capital's flagship data platform with AI-powered search, live stakeholder treemaps, and peer comparison tools — driven by real user usage patterns and a full visual rebrand.",
    heroIntro:
      "40% of analyst sessions ended in a CSV export. The platform was a data source — not a decision tool.\n\nI architected the transformation from a once-a-year audit portal into a daily decision-support utility for S&P 500 analysts. 12 user sessions, full workflow audit, and a redesign built around the patterns analysts were already improvising outside the system. Same dataset. Same 240+ weighted indicators. Entirely different behavioral relationship between user and platform.",
    role: "Lead Product Designer & Front-End Engineer",
    team: "2 designers · 4 engineers · 1 PM",
    snapshot: {
      timeline: "2026",
      tools: "React, TypeScript, D3, Figma, OpenAI API, Design Tokens",
    },
    specSheet: [
      { label: "Primary Stack", value: "React · TypeScript · D3 · OpenAI API" },
      { label: "Accessibility", value: "WCAG 2.1 AA · axe-core · keyboard nav across 5 treemap levels" },
      { label: "Engineering Impact", value: "~50% CSV export reduction · <30s time-to-insight" },
      { label: "Scale", value: "S&P 500 analysts · 240+ weighted indicators · 1,000 companies" },
    ],
    whatIDid:
      "Owned product design and front-end engineering. Ran 12 user sessions. Designed the information architecture in Figma. Specced the D3 treemap. Shipped the AI search interface. Led the rebrand migration — remapping every token and component while keeping the platform live for analysts throughout.",
    challenge:
      "Three problems, one constraint. Analysts exported to Excel for comparisons the platform should have handled. Search was keyword-only on a relational dataset built for structured queries. And a full rebrand meant changing the visual language without breaking seven years of muscle memory.\n\nThe constraint: managing LLM integration (unstructured output, latency, unpredictable formatting) inside a high-fidelity D3 environment — with no migration window. Every change shipped incrementally, backward-compatible with active analyst workflows.",
    approach:
      "I spearheaded the product strategy through research and shipping simultaneously. Identified the highest-friction workflows, redesigned the IA in Figma, and engineered the React front-end. Used UX testing data to balance stakeholder feature requests with the technical reality of LLM streaming. Guiding principle: evolution, not reset.",
    process: {
      discover: [
        "40% of sessions ended in CSV export — the platform was a data source, not a decision tool",
        "12 user sessions across institutional analysts, ESG researchers, and corporate clients. Universal top request: peer comparison without leaving the platform",
        "Rebrand audit mapped every component and token. Separated safe visual changes from those that would break analyst mental models",
      ],
      design: [
        "AI Ask Me Anything — natural language search with source citations. Every answer links back to underlying data so analysts verify before trusting",
        "D3 treemap — area encodes weight, color encodes performance band. Five drill-down levels replaced v1's flat composite score",
        "Peer Comparison — side-by-side across 6+ companies. Deprioritized collaborative annotation (analyst workflows are solo; it would add complexity without matching usage)",
        "Custom keyboard navigation across five treemap levels — axe-core compliant focus management at every depth",
      ],
      ship: [
        "Rebrand shipped with zero analyst downtime — token alias layer absorbed the entire visual change",
        "AI search: 4+ min manual filtering → under 30 seconds",
        "CSV exports dropped ~50% in the first quarter post-launch",
        "One treemap replaced three separate table views",
      ],
    },
    keyDecisions: [
      "AI as accelerator, not replacement — Every AI answer includes source citations. Analysts who don't trust it can ignore it entirely. The feature earns trust through transparency, not by being mandatory.",
      "Treemap over table — v1 showed 1,000 companies in a sorted list. v2 encodes weight as area, performance as color — two dimensions at a glance. One visualization replaced three table views.",
      "Evolution over revolution — Ran redesigned views past 6 power users before shipping. Could they complete standard workflows without guidance? Same IA, same navigation. What changed: density of insight per view.",
    ],
    keyDecisionsLabel: "Key Tradeoffs",
    outcomes: [
      "~50% drop in CSV exports QoQ — analysts stopped exporting because the platform finally handled comparisons natively. Behavioral transformation from data source to decision tool.",
      "AI search: 4+ min manual filtering → <30s time-to-insight. 8-week post-launch data confirmed the shift from keyword lookup to natural language exploration.",
      "Zero analyst downtime during full rebrand — token architecture absorbed the entire visual change as designed. Architectural resilience validated.",
      "Peer comparison: #2 most-used feature within 6 weeks of launch — the workflow analysts were improvising in Excel, now native to the platform.",
    ],
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
        caption: "v1: single-dimension drill-down, no performance encoding. v2: area = weight, color = quintile band. Two variables, one visualization. Five zoom levels from Overall → Datapoint.",
      },
      {
        id: "performance-highlights",
        layout: "before-after",
        beforeSrc: "/just/just-ji-highlight-old.svg",
        afterSrc: "/just/ji-performance-highlights.png",
        caption: "The scan layer before drilling. Highest and lowest metrics surface with rank, tie count, and universe size — 78 dimensions, zero filter clicks.",
      },
      {
        id: "explorer-before-after",
        layout: "before-after",
        beforeSrc: "/just/just-ji-stk-dpcard-old.svg",
        afterSrc: "/just/ji-explorer-dpcard.png",
        caption: "v1: static value, no peer context. v2: distribution donut charts, YoY comparison, methodology links, disclosure prompt. Dead-end data point → self-contained research view.",
      },
      {
        id: "peer-comparison",
        layout: "before-after",
        beforeSrc: "/just/just-ji-pc-dp-old.png",
        afterSrc: "/just/just-ji-pc-dp.png",
        caption: "v1: two companies, tooltip values. v2: 6+ companies in a structured table with search, industry tags, and direct link to Scenario Analysis — the feature behind the 50% CSV export drop.",
      },
      {
        id: "scenario-before-after",
        layout: "before-after",
        beforeSrc: "/just/just-ji-scenario-old.png",
        afterSrc: "/just/ji-scenario-analysis-create_new.png",
        caption: "v1: scenario creation buried in results, no entry point. v2: Create and Find as distinct cards, structured sidebar, inline industry stats. What-if modeling as a first-class workflow.",
      },
    ],
    codeBlocksHeader: "The System in Code",
    codeBlocks: [
      {
        id: "stakeholder-scorecard",
        title: "Stakeholder Scorecard — Quintile Ranking with Universe Toggle",
        description: "Five stakeholder categories ranked against full universe or industry peers via radio toggle. Dynamic quintile thresholds. Expandable bar charts with universe avg and top performer. Live Index Concept return color-coded by sign. Business case studies filtered by stakeholder slug, gated behind entitlement checks.",
        language: "php",
        liveUrl: "https://justcapital.com",
        previewHtml: `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
html,body{height:auto;overflow:hidden;}
body{font-family:-apple-system,'Helvetica Neue','Segoe UI',sans-serif;background:#fff;padding:16px 20px;color:#111;font-size:12px;}
.sc-wrap{max-width:680px;margin:0 auto;}
.sc-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;}
.sc-updated{display:inline-flex;align-items:center;gap:5px;font-size:8px;color:#E07820;font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px;}
.sc-updated .dot{width:6px;height:6px;border-radius:50%;background:#E07820;}
.sc-title{font-size:22px;font-weight:900;letter-spacing:-.01em;color:#111;text-transform:uppercase;}
.sc-legend{display:flex;gap:10px;margin-bottom:6px;flex-wrap:wrap;}
.sc-legend-item{display:flex;align-items:center;gap:4px;font-size:8px;color:#555;}
.sc-legend-dot{width:8px;height:8px;border-radius:50%;}
.sc-legend-dot.t5{background:#15803d;}.sc-legend-dot.t25{background:#86efac;}.sc-legend-dot.m50{background:#d1d5db;border:1px solid #9ca3af;}.sc-legend-dot.b25{background:#fbbf24;}.sc-legend-dot.b5{background:#dc2626;}
.sc-toggle{display:flex;background:#f0f0f0;border-radius:20px;overflow:hidden;font-size:9px;font-weight:600;}
.sc-toggle span{padding:6px 16px;cursor:default;color:#888;transition:all .2s;}
.sc-toggle span.active{background:#1D4E5C;color:#fff;border-radius:20px;}
.sc-count{font-size:10px;color:#555;margin-bottom:14px;text-align:center;}
.sc-count strong{color:#1D4E5C;font-weight:700;}
.sc-count a{color:#1D4E5C;text-decoration:underline;}
.sc-cards{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:20px;}
.sc-card{background:#fff;border-radius:10px;padding:12px 10px;border:1px solid #e5e7eb;display:flex;flex-direction:column;gap:6px;cursor:default;position:relative;}
.sc-card.top{border-color:#15803d;border-width:1.5px;}
.sc-card-badge{position:absolute;top:-8px;left:50%;transform:translateX(-50%);font-size:6px;font-weight:700;padding:2px 8px;border-radius:8px;white-space:nowrap;letter-spacing:.03em;background:#dcfce7;color:#15803d;}
.sc-card-name{font-size:10px;font-weight:700;color:#111;line-height:1.3;}
.sc-card-weight{font-size:8px;color:#888;display:flex;justify-content:space-between;align-items:center;}
.sc-card-weight strong{color:#1D4E5C;font-size:9px;}
.sc-card hr{border:none;border-top:1px solid #e5e7eb;margin:0;}
.sc-card-perf{display:flex;justify-content:space-between;align-items:center;}
.sc-card-perf-label{font-size:7px;color:#888;}
.sc-card-perf-val{font-size:8px;font-weight:700;padding:3px 8px;border-radius:10px;letter-spacing:.02em;}
.sc-card-perf-val.t5{background:#dcfce7;color:#15803d;}
.sc-card-perf-val.t25{background:#f0fdf4;color:#16a34a;}
.sc-card-perf-val.m50{background:#f3f4f6;color:#6b7280;}
.sc-detail{background:#fff;border-radius:12px;padding:16px;border:1px solid #e5e7eb;margin-bottom:14px;display:grid;grid-template-columns:1.2fr 1fr;gap:16px;}
.sc-detail-left{border-right:1px solid #e5e7eb;padding-right:16px;}
.sc-detail-right{}
.sc-perf-note{font-size:6.5px;color:#999;line-height:1.4;margin-bottom:10px;font-style:italic;}
.sc-legend-bar{display:flex;gap:12px;margin-bottom:10px;}
.sc-legend-bar-item{display:flex;align-items:center;gap:4px;font-size:7px;color:#555;}
.sc-legend-bar-item .swatch{width:12px;height:3px;border-radius:2px;}
.sc-bar-wrap{margin-bottom:4px;}
.sc-bar-track{height:110px;background:#f3f4f6;border-radius:4px;position:relative;display:flex;align-items:flex-end;padding:0 20px;}
.sc-bar-col{display:flex;flex-direction:column;align-items:center;flex:1;}
.sc-bar-rect{width:60px;border-radius:3px 3px 0 0;}
.sc-bar-val{font-size:9px;font-weight:700;color:#1D4E5C;margin-bottom:3px;}
.sc-bar-label-x{font-size:6px;color:#999;margin-top:4px;}
.sc-bar-axis{display:flex;justify-content:space-between;font-size:6px;color:#aaa;margin-bottom:4px;}
.sc-live{display:flex;align-items:center;gap:5px;font-size:8px;color:#22c55e;font-weight:600;margin-bottom:8px;}
.sc-live .dot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.sc-workers-q{font-size:11px;font-weight:700;color:#111;margin-bottom:4px;}
.sc-workers-q span{font-size:10px;font-weight:400;color:#555;}
.sc-index-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
.sc-index-label{font-size:8px;color:#555;}
.sc-index-val{font-size:11px;font-weight:700;color:#15803d;}
.sc-explore{font-size:8px;color:#1D4E5C;font-weight:600;text-decoration:none;}
.sc-bcs-title{font-size:10px;font-weight:700;color:#111;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid #e5e7eb;}
.sc-bcs-item{margin-bottom:6px;}
.sc-bcs-source{font-size:7px;color:#1D4E5C;font-weight:600;}
.sc-bcs-desc{font-size:7.5px;color:#555;line-height:1.3;}
.sc-cta-row{display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:10px;border-top:1px solid #e5e7eb;}
.sc-cta-btn{background:#1D4E5C;color:#fff;padding:8px 18px;border-radius:6px;font-size:8px;font-weight:600;text-decoration:none;letter-spacing:.04em;text-transform:uppercase;}
.sc-cta-link{font-size:8px;color:#1D4E5C;font-weight:600;text-decoration:none;}
.sc-bottom-cta{display:flex;justify-content:center;margin-top:14px;}
.sc-bottom-cta a{background:#1D4E5C;color:#fff;padding:8px 20px;border-radius:6px;font-size:9px;font-weight:600;text-decoration:none;letter-spacing:.04em;text-transform:uppercase;}
</style></head><body>
<div class="sc-wrap">
  <div class="sc-header">
    <div>
      <div class="sc-updated"><span class="dot"></span> Updated Mar 3rd, 2026</div>
      <div class="sc-title">Stakeholder Performance</div>
      <div class="sc-legend">
        <div class="sc-legend-item"><span class="sc-legend-dot t5"></span>Top 5%</div>
        <div class="sc-legend-item"><span class="sc-legend-dot t25"></span>Top 25%</div>
        <div class="sc-legend-item"><span class="sc-legend-dot m50"></span>Middle 50%</div>
        <div class="sc-legend-item"><span class="sc-legend-dot b25"></span>Bottom 25%</div>
        <div class="sc-legend-item"><span class="sc-legend-dot b5"></span>Bottom 5%</div>
      </div>
    </div>
    <div class="sc-toggle"><span>All Companies</span><span class="active">Industry</span></div>
  </div>
  <div class="sc-count"><strong>132</strong> Companies in <a>Technology</a> Industry</div>
  <div class="sc-cards">
    <div class="sc-card"><div class="sc-card-name">Workers</div><div class="sc-card-weight">weight&ensp;<strong>40.26%</strong></div><hr><div class="sc-card-perf"><span class="sc-card-perf-label">Overall Performance</span><span class="sc-card-perf-val m50">Mid 50%</span></div></div>
    <div class="sc-card top"><div class="sc-card-badge">Top-performing Stakeholder</div><div class="sc-card-name">Customers</div><div class="sc-card-weight">weight&ensp;<strong>25.88%</strong></div><hr><div class="sc-card-perf"><span class="sc-card-perf-label">Overall Performance</span><span class="sc-card-perf-val t5">Top 5%</span></div></div>
    <div class="sc-card"><div class="sc-card-name">Shareholders &amp; Governance</div><div class="sc-card-weight">weight&ensp;<strong>13.63%</strong></div><hr><div class="sc-card-perf"><span class="sc-card-perf-label">Overall Performance</span><span class="sc-card-perf-val t25">Top 25%</span></div></div>
    <div class="sc-card"><div class="sc-card-name">Communities</div><div class="sc-card-weight">weight&ensp;<strong>12.27%</strong></div><hr><div class="sc-card-perf"><span class="sc-card-perf-label">Overall Performance</span><span class="sc-card-perf-val t25">Top 25%</span></div></div>
    <div class="sc-card top"><div class="sc-card-badge">Top-performing Stakeholder</div><div class="sc-card-name">Environment</div><div class="sc-card-weight">weight&ensp;<strong>7.97%</strong></div><hr><div class="sc-card-perf"><span class="sc-card-perf-label">Overall Performance</span><span class="sc-card-perf-val t5">Top 5%</span></div></div>
  </div>
  <div class="sc-detail">
    <div class="sc-detail-left">
      <div class="sc-perf-note">* Performance Scores range from 0 to 100, with 100 representing the leading company(s). Scores reflect proportional performance relative to the leader (e.g., 80 = 80% of leader performance).</div>
      <div class="sc-legend-bar">
        <div class="sc-legend-bar-item"><span class="swatch" style="background:#c8d5da"></span>Your Company Performance</div>
        <div class="sc-legend-bar-item"><span class="swatch" style="background:#E07820"></span>Industry Avg</div>
        <div class="sc-legend-bar-item"><span class="swatch" style="background:#15803d"></span>Highest Industry Performer</div>
      </div>
      <div class="sc-bar-track">
        <div style="display:flex;align-items:flex-end;gap:20px;width:100%;justify-content:center;padding-bottom:6px;">
          <div class="sc-bar-col"><span class="sc-bar-val">44</span><div class="sc-bar-rect" style="height:48px;background:#c8d5da;width:50px;"></div></div>
          <div class="sc-bar-col"><span class="sc-bar-val" style="color:#E07820">50</span><div class="sc-bar-rect" style="height:55px;background:#E07820;width:8px;"></div></div>
          <div class="sc-bar-col"><span class="sc-bar-val" style="color:#15803d">89</span><div class="sc-bar-rect" style="height:97px;background:#15803d;width:8px;"></div></div>
        </div>
      </div>
    </div>
    <div class="sc-detail-right">
      <div class="sc-live"><span class="dot"></span> LIVE DATA</div>
      <div class="sc-workers-q"><strong>Workers:</strong> <span>Why performance matter?</span> <span style="float:right;font-size:10px;cursor:default;">&#9660;</span></div>
      <div class="sc-index-row">
        <span class="sc-index-label">Leaders outperformed Russell 1000 EQ by</span>
        <span class="sc-index-val">30.05%</span>
        <a class="sc-explore" href="#">Explore &rarr;</a>
      </div>
      <div class="sc-bcs-title">Business Case Studies: Workers</div>
      <div class="sc-bcs-item"><div class="sc-bcs-source">JUST Capital</div><div class="sc-bcs-desc">Living wage leaders show higher ROA; underpayment raises financing risk</div></div>
      <div class="sc-bcs-item"><div class="sc-bcs-source">ResearchGate</div><div class="sc-bcs-desc">Living Wages as a Strategic Lever: How Fair Compensation Strengthens Business Performance</div></div>
      <div class="sc-bcs-item"><div class="sc-bcs-source">Business Fights Poverty, University of Cambridge Institute for Sustainability Leadership, Shift</div><div class="sc-bcs-desc">Leaders see living wages as an opportunity instead of a challenge</div></div>
      <div class="sc-bcs-item"><div class="sc-bcs-source">Organisation for Economic Co-operation and Development</div><div class="sc-bcs-desc">Training Subsidies Boost Firm Productivity and Growth</div></div>
    </div>
  </div>
  <div class="sc-cta-row">
    <a class="sc-cta-btn" href="#">Compare Data Against Peers</a>
    <a class="sc-cta-link" href="#">More Business Case Studies &rarr;</a>
  </div>
  <div class="sc-bottom-cta"><a href="#">View Underlying Metrics</a></div>
</div>
</body></html>`,
        code: `<?php
/**
 * stakeholder_scorecard.php — JUST Capital (JUST Intelligence)
 * Production source from justcapital.com
 *
 * Company performance across 5 stakeholder categories,
 * ranked against full universe or industry peers via radio toggle.
 *
 * Key patterns:
 * - Dynamic quintile thresholds (top/bottom 5% get special wrappers)
 * - Universe toggle (overall vs. industry) with namespaced radio groups
 * - Bar chart with company score, universe avg, and max — all server-rendered
 * - Index Concept returns color-coded by sign (green/red)
 * - Business case studies filtered by stakeholder slug
 * - Entitlement gating with blur fallback for non-paid users
 */

// ── Universe types — drives the overall/industry toggle ─────────
$universe_types = [
    'overall'  => ['size' => $this->current_universe_count,
                   'label' => 'Overall',
                   'label_description' => 'the JUST Capital Universe'],
    'industry' => ['size' => $this->current_industry_count,
                   'label' => 'Industry',
                   'label_description' => $this->company_obj['industry_name']],
];
?>

<div class="skteholder_container">
  <div class="header">
    <div class="header_left">
      <div class="sub_title">
        <div class="status_pill">
          <span class="status_dot"></span>
          Updated <?php echo date("M jS, Y",
            $this->last_updated_timestamp); ?>
        </div>
        Stakeholder Performance
      </div>
      <div class="performance_legend">
        <span class="dot top_5"></span> Top 5%
        <span class="dot top_25"></span> Top 25%
        <span class="dot mid_50"></span> Middle 50%
        <span class="dot bottom_25"></span> Bottom 25%
        <span class="dot bottom_5"></span> Bottom 5%
      </div>
    </div>

    <?php // ── Universe toggle — radio group ──────────────────── ?>
    <div class="toggle_container">
      <div class="switch-toggle">
        <input type="radio" name="universeStakeholder"
          id="toggle-overall"
          onclick="com.justcapital.ji_home
            .switch_universe('overall');">
        <label for="toggle-overall">All Companies</label>
        <input type="radio" name="universeStakeholder"
          id="toggle-industry" checked
          onclick="com.justcapital.ji_home
            .switch_universe('industry');">
        <label for="toggle-industry">Industry</label>
        <span class="slider"></span>
      </div>
    </div>
  </div>

  <?php // ── Stakeholder cards — one per category ─────────────── ?>
  <?php foreach ($universe_types as $universe_key => $universe_obj): ?>
    <div class="<?= $universe_key ?>_tog_content
                 stakeholder_cards_container">

      <?php foreach ($this->taxonomy_tree_obj['children']
                     as $skey => $stakeholder_obj): ?>
        <?php
          // ── Dynamic quintile threshold ──────────────────────
          $rank_type  = $universe_key . "_rank";
          $rank       = $this->current_ranks
                          [$stakeholder_obj['perm_id']][$rank_type];
          $count      = $universe_obj['size'];
          $is_top     = $rank <= (5/100) * $count;
          $is_bottom  = $rank >= (95/100) * $count;
          $perf_label = ucwords(
            get_range_based_text($rank, $count));
          $class_name = get_range_based_class_name($rank, $count);
        ?>

        <?php if ($is_top): ?>
          <div class="top_perform">
            <div class="top_perform_label">
              Top-performing Stakeholder</div>
        <?php elseif ($is_bottom): ?>
          <div class="bottom_perform">
            <div class="bottom_perform_label">
              Bottom-performing Stakeholder</div>
        <?php endif; ?>

          <div class="stakeholder_card"
               onclick="com.justcapital.ji_home
                 .show_stakeholder_details(
                   '<?= $stakeholder_obj['slug'] ?>',
                   '<?= $universe_key ?>')">
            <div class="stakeholder_name">
              <?= $stakeholder_obj['name'] ?></div>
            <div class="stakeholder_weight">weight
              <span class="weight_value">
                <?= round($this->current_ranks
                  [$stakeholder_obj['perm_id']]['weight'], 2) ?>%
              </span>
            </div>
            <hr>
            <div class="quintile">
              <span class="performance">Overall Performance</span>
              <div class="temp <?= $class_name ?>">
                <?= $perf_label ?>%</div>
            </div>
          </div>

        <?php if ($is_top || $is_bottom): ?>
          </div>
        <?php endif; ?>
      <?php endforeach; ?>
    </div>
  <?php endforeach; ?>

  <?php // ── Expanded detail: bar chart + index concept ──────── ?>
  <?php foreach ($this->taxonomy_tree_obj['children']
                 as $skey => $stakeholder_obj): ?>
    <?php foreach ($universe_types
                   as $universe_key => $universe_obj): ?>
      <?php
        $company_score = round($this->current_scores
          [$stakeholder_obj['perm_id']]['value']);
        $uni_avg = round($this->current_scores
          [$stakeholder_obj['perm_id']][$universe_key.'_mean']);
        $uni_max = round($this->current_scores
          [$stakeholder_obj['perm_id']][$universe_key.'_max']);
        $index_return = round($this->index_concept_returns
          [$stakeholder_obj['slug']], 2);
      ?>

      <div class="<?= $universe_key ?>_tog_content
                   stakeholder_tog_content">
        <div class="graph_container">
          <?php // ── Bar chart — widths are server-rendered ──── ?>
          <div class="bar_chart"
               style="width: <?= $company_score ?>%">
            <span class="company_socre">
              <?= $company_score ?></span>
          </div>
          <div class="chart_marker_container">
            <div class="chart_marker" id="industry_avg"
                 style="left: <?= $uni_avg ?>%"></div>
            <div class="chart_marker" id="industry_best"
                 style="left: <?= $uni_max ?>%"></div>
          </div>
        </div>

        <?php // ── Index Concept return — color by sign ──────── ?>
        <div class="index_concept">
          <div class="live_pill">
            <span class="live_dot"></span> Live Data
          </div>
          <div class="data_box_container">
            <div class="russell_wrap">
              <span>Leaders
                <?php print_if($index_return >= 0,
                  'outperformed', 'underperformed'); ?>
                Russell 1000 EQ by</span>
              <span class="index_data" style="
                background: <?php print_if($index_return >= 0,
                  '#eef9e9', '#f4cccc'); ?>;
                color: var(<?php print_if($index_return >= 0,
                  '--color-top-5', '--color-bottom-5'); ?>);">
                <?= $index_return ?>%
              </span>
            </div>
          </div>
        </div>

        <?php // ── Business case studies — gated by entitlement ── ?>
        <div class="business_case">
          <div class="sub_title">Business Case Studies:
            <span><?= $stakeholder_obj['name'] ?></span></div>
          <ul>
            <?php $counter = 0; ?>
            <?php foreach ($this->content_library
                           as $cl_obj): ?>
              <?php if ($counter < 4
                && $cl_obj['stakeholder_slug']
                   == $stakeholder_obj['slug']): ?>
                <li class="article_container">
                  <span id="category"
                    class="<?php print_if(
                      !has_paid_entitlements(),
                      'blur_info', ''); ?>">
                    <?php if (!has_paid_entitlements()):
                      echo str_repeat("X",
                        strlen($cl_obj['source']));
                    else:
                      echo $cl_obj['source'];
                    endif; ?>
                  </span>
                  <a href="/ji/business_case_studies?redir=
                    <?= $cl_obj['id'] ?>"
                     class="article_title" target="_blank">
                    <?= $cl_obj['headline'] ?>
                  </a>
                </li>
                <?php $counter++; ?>
              <?php endif; ?>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
    <?php endforeach; ?>
  <?php endforeach; ?>
</div>`,
      },
    ],
    metrics: [
      { value: "~50%", label: "drop in CSV exports quarter-over-quarter" },
      { value: "<30s", label: "AI search time vs. 4+ min manual filtering" },
      { value: "0", label: "days of analyst downtime during full rebrand" },
      { value: "#2", label: "most-used feature within 6 weeks of launch" },
    ],
    tech: ["React", "TypeScript", "D3", "OpenAI API", "CSS Custom Properties", "Figma", "Design Tokens", "axe-core"],
    reflection:
      "The hardest part of a Phase 2 isn't building new features — it's governing what stays. Seven years of muscle memory is architectural capital, not technical debt. Every v2 decision ran through one filter: does this accelerate the analyst without forcing them to relearn? Nothing was replaced. The gaps were filled. That restraint was the strategy.",
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
      <cite class="c-quote__cite">Martin Whittaker<span class="c-quote__role">CEO, JUST Capital</span></cite>
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
    <span class="affiliation">CEO, JUST Capital</span>
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
      "35 custom modules. 8 weeks. Zero post-launch dev dependency.\n\nI engineered JUST Capital's full marketing site rebuild while simultaneously leading JUST Intelligence Phase 2. Agency delivered the visual design; I architected the production WordPress system — token-based CSS, modular PHP/Twig components, and a CMS architecture sturdy enough that the marketing team owned it completely from day one. The constraint wasn't complexity. It was building something that wouldn't need me the moment it launched.",
    layout: "narrative",
    processLayout: "stacked",
    keyDecisionsLayout: "stacked",
    leadVisualId: "just-rebrand-home",
    leadVisualHeader: "Shipped Output",
    role: "Front-End Engineer",
    team: "1 front-end developer (me) · 1 back-end developer (CTO) · Marketing team (CMO) · 1 external agency (design)",
    snapshot: {
      timeline: "2026 (8 weeks crunch)",
      tools: "PHP, Twig, WordPress, ACF Pro, HTML, CSS, JavaScript (ES6), CSS Custom Properties",
    },
    specSheet: [
      { label: "Primary Stack", value: "PHP · Twig · WordPress · ACF Pro · CSS Custom Properties" },
      { label: "Accessibility", value: "WCAG 2.1 AA · responsive across all 35 modules" },
      { label: "Engineering Impact", value: "Zero engineering tickets post-launch · 8-week delivery" },
      { label: "Scale", value: "35 custom modules · CMS autonomy for marketing from day one" },
    ],
    challenge:
      "Full marketing site rebuild around an agency-delivered visual identity — in parallel with JUST Intelligence Phase 2. Twofold constraint: ship 35 modules in 8 weeks under real capacity pressure, and architect a CMS that marketing owns independently from launch day. Zero dev-dependency for content updates. Zero fragile templates requiring engineering support.",
    approach:
      "Mapped agency designs to WordPress block architecture before writing code. The question wasn't 'how do I build this' — it was 'how do I structure this so marketing never needs engineering after launch.'\n\nACF custom blocks: full authoring freedom for marketing, complete markup control for engineering. Token system derived directly from brand guidelines — future design updates as token swaps, not codebase audits. Parallel capacity with JI Phase 2 enforced conservative decisions: fewer custom patterns, shorter dependency chains, zero clever abstractions.",
    whatIDid:
      "Owned all front-end engineering: HTML, CSS token system, PHP/Twig templates, and vanilla JS. Registered 35 custom WordPress blocks via ACF Pro. Architected the CSS token system from agency brand guidelines. Coordinated with CTO on back-end integration. Migrated legacy content. Shipped fully responsive — reconciled screen by screen against agency deliverables.",
    process: {
      discover: [
        "Deconstructed agency Figma into system inventory: component families, token families, and content patterns that must survive real CMS usage",
        "Engineering constraints locked with Marketing + CTO: editor autonomy, performance targets, accessibility baseline, zero post-launch dev dependency",
        "Every layout mapped to WordPress content model — editor controls vs. fixed structure, field names aligned to marketing vocabulary",
        "Legacy content audit: migration risk, image ratios, and edge cases that would break modules",
        "Release QA scope defined upfront — breakpoints, CMS safety, accessibility — so build decisions validated early",
      ],
      design: [
        "Token architecture: primitives → semantic aliases → component tokens, matching agency naming 1:1 to eliminate translation layers",
        "ACF schemas per module: field types, defaults, validation, CMS safety constraints preventing layout breakage",
        "Module API contracts (props, variants, responsive behavior) authored before templating — design-to-code parity by contract",
        "Performance and accessibility guardrails: every module had to satisfy both at build time, not QA time",
        "Marketing handoff artifacts: authoring rules, fallback behavior, and content constraints per module",
      ],
      ship: [
        "35 Twig/PHP modules integrated with ACF fields — front-end output wired to live CMS data",
        "Legacy content migrated and validated page-by-page against module constraints and token usage",
        "Release QA: responsive fidelity, WCAG AA, CMS safety, cross-browser — all 35 modules",
        "Marketing handoff completed — full CMS autonomy from day one. Zero engineering tickets post-launch.",
      ],
      govern: [
        "Post-launch maintenance architecture: token updates, module versioning, schema change rules",
        "Performance budget targets and monitoring ownership established",
        "Ongoing QA checklist for new pages and module variants",
        "Escalation paths documented — marketing resolves edge cases without engineering intervention",
      ],
    },
    processTitles: {
      discover: "Scope",
      design: "Architect",
      ship: "Build",
      govern: "Govern",
    },
    keyDecisionsLabel: "Key Front-End Decisions",
    keyDecisions: [
      "ACF blocks over page builders — Elementor/Divi hand marketing a CSS hammer: every override lives inline, outside the token system, accumulating specificity debt per edit. ACF gave the same authoring freedom while I retained complete markup control. Autonomy for marketing, architectural integrity for engineering.",
      "Token system matched agency naming 1:1, then extended — agency's 'brand-primary' became --color-brand-primary. Zero translation layer. Then added component-level tokens (--btn-bg-primary) so templates reach for semantic values, not primitive chains. Simpler callouts, easier maintenance.",
      "Handoff as success criterion — parallel JI Phase 2 meant zero capacity for post-launch support. The system had to not need me: plain-English authoring guides, sensible defaults on every optional field, CMS configuration intuitive enough for marketing from day one. The handoff wasn't an event — it was the requirement the architecture was built against.",
    ],
    outcomes: [
      "35 modules in production — marketing team manages all content independently, zero engineering tickets post-launch",
      "Shipped on schedule: 8 weeks, in parallel with JUST Intelligence Phase 2",
      "Token architecture positioned for future brand updates as token swaps, not codebase rewrites",
      "Fully responsive across mobile, tablet, desktop — all 35 modules, 100% design-to-code parity against agency deliverables",
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
        layout: "wide",
        imageSrc: "/just-rebrand/system-architecture.svg",
        caption: "Architecture summary: agency Figma → token map → Twig/PHP modules → ACF schema → WordPress CMS → live site.",
      },
      {
        id: "just-rebrand-qa",
        layout: "wide",
        imageSrc: "/just-rebrand/release-qa-checklist.svg",
        caption: "Release QA checklist template covering accessibility, responsive fidelity, CMS safety, and cross-browser checks.",
      },
      {
        id: "just-rebrand-performance",
        layout: "wide",
        imageSrc: "/just-rebrand/performance-budget.svg",
        caption: "Performance budget targets for launch readiness [unverified].",
      },
    ],
    codeBlocksHeader: "The System in Code",
    codeBlocks: [
      {
        id: "homepage-hero",
        title: "Homepage Hero — Variadic CTA Builder",
        description: "The hero accepts an unlimited number of CTAs without a code change — editors add numbered ACF fields in WordPress and the loop picks them up automatically. Logo carousel speed is physics-derived: (170px × logo count) ÷ 50px·s⁻¹, keeping scroll velocity constant regardless of how many logos the CMS holds. The news panel queries WordPress via JSON-configured args stored in ACF, so editors can override taxonomy rules without a deploy.",
        language: "php",
        previewHtml: `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,'Segoe UI',sans-serif;background:#f0ede8;padding:16px;font-size:12px;color:#333;}
.grid{display:grid;grid-template-columns:1fr 48px 1fr;gap:10px;align-items:center;}
.panel{background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.07);}
.ph{background:#1D4E5C;padding:7px 11px;font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.7);}
.fields{padding:8px 10px;display:flex;flex-direction:column;gap:5px;}
.fr{display:flex;gap:5px;align-items:center;}
.num{width:14px;height:14px;background:#1D4E5C;color:#fff;border-radius:3px;font-size:7px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.fname{font-size:7.5px;color:#888;width:82px;flex-shrink:0;font-family:monospace;}
.fval{flex:1;background:#f8f7f4;border:1px solid #ddd;border-radius:3px;padding:2px 5px;font-size:7.5px;color:#333;}
.arrow-col{display:flex;flex-direction:column;align-items:center;gap:3px;}
.al{font-size:7px;color:#888;text-align:center;font-family:monospace;line-height:1.4;}
.ai{font-size:18px;color:#1D4E5C;}
.out{padding:10px 11px;}
.btns{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:8px;}
.bp{background:#E07820;color:#fff;border:none;padding:6px 14px;border-radius:100px;font-size:9px;font-weight:600;}
.bo{background:transparent;color:#1D4E5C;border:2px solid #1D4E5C;padding:5px 13px;border-radius:100px;font-size:9px;font-weight:600;}
.formula{background:#f0f7f9;border-radius:5px;padding:5px 8px;}
.fl{font-size:7px;color:#aaa;letter-spacing:.06em;text-transform:uppercase;margin-bottom:3px;}
.fc{font-family:monospace;font-size:8px;color:#1D4E5C;}
</style></head><body>
<div class="grid">
  <div class="panel">
    <div class="ph">ACF Fields → WordPress CMS</div>
    <div class="fields">
      <div class="fr"><span class="num">1</span><span class="fname">main_cta_text_1</span><input class="fval" value="Sign In Now" readonly></div>
      <div class="fr"><span class="num">1</span><span class="fname">main_cta_class_1</span><input class="fval" value="btn-primary" readonly></div>
      <div class="fr"><span class="num">2</span><span class="fname">main_cta_text_2</span><input class="fval" value="Learn More" readonly></div>
      <div class="fr"><span class="num">2</span><span class="fname">main_cta_class_2</span><input class="fval" value="btn-outline" readonly></div>
      <div class="fr"><span class="num" style="background:#ddd;color:#aaa">…</span><span class="fname" style="color:#ccc">main_cta_*_N</span><input class="fval" style="color:#ccc" value="no deploy needed" readonly></div>
    </div>
  </div>
  <div class="arrow-col">
    <div class="al">for i=1<br>to 99</div>
    <div class="ai">→</div>
  </div>
  <div class="panel">
    <div class="ph">Rendered Output</div>
    <div class="out">
      <div class="btns">
        <button class="bp">Sign In Now</button>
        <button class="bo">Learn More</button>
      </div>
      <div class="formula">
        <div class="fl">Carousel Duration</div>
        <div class="fc">(170 × 8 logos) ÷ 50 = 27.2s</div>
      </div>
    </div>
  </div>
</div>
</body></html>`,
        code: `<?php
/**
 * homepage_hero.php — JUST Capital
 *
 * Pattern 1 — Variadic CTA builder
 * Reads numbered ACF fields (main_cta_text_1, main_cta_link_1 … up to _99)
 * so editors can add CTAs from the WordPress CMS without a code change.
 *
 * Pattern 2 — Physics-aware logo carousel
 * Duration scales with logo count so visual scroll speed stays
 * constant regardless of how many logos live in the CMS.
 * Formula: (170px × count) ÷ 50px·s⁻¹ = seconds to traverse full strip.
 *
 * Pattern 3 — JSON-configured WP_Query
 * Query args are stored in an ACF field so taxonomy overrides
 * (e.g. exclude 'Polling' category) don't require a deploy.
 */

// ── Variadic CTA builder ─────────────────────────────────────────
$main_ctas             = [];
$main_ctas_field_types = ['main_cta_text', 'main_cta_link', 'main_cta_class', 'is_new_tab'];

for ($i = 1; $i <= 99; $i++) {
    $item = [];
    foreach ($main_ctas_field_types as $field_type) {
        $key = $field_type . '_' . $i;
        if (isset($$key)) {
            $item[$field_type] = $$key;
        }
    }
    if (!empty($item)) {
        $main_ctas[] = $item;
    } else {
        break; // stop at first empty numbered group
    }
}

// ── Physics-aware carousel duration ─────────────────────────────
$carousel_duration = (170 * count($logos)) / 50;
?>

<div class="logo-carousel"
     style="animation-duration: <?= $carousel_duration ?>s;">

    <?php // Logos rendered twice — second copy creates the seamless wrap ?>
    <?php foreach ($logos as $logo): ?>
        <img src="<?= esc_url($logo['url']) ?>"
             alt="<?= esc_attr($logo['alt']) ?>" loading="lazy">
    <?php endforeach; ?>
    <?php foreach ($logos as $logo): ?>
        <img src="<?= esc_url($logo['url']) ?>"
             alt="<?= esc_attr($logo['alt']) ?>" loading="lazy">
    <?php endforeach; ?>

</div>

<?php
// ── JSON-configured WP_Query ─────────────────────────────────────
// Stored in ACF so editors can change taxonomy rules without a deploy.
// Default: exclude 'Polling' posts from the hero news panel.
$wp_query_args = json_decode('{
    "post_type":      "post",
    "posts_per_page": 5,
    "tax_query": [{
        "taxonomy": "post_tag",
        "field":    "slug",
        "terms":    ["Polling"],
        "operator": "NOT IN"
    }]
}', true);

$news_query = new WP_Query($wp_query_args);`,
      },
      {
        id: "rankings-module",
        title: "Rankings Module — URL State & Multi-Instance Safety",
        description: "Filter state lives in the URL — every selection is shareable and survives a page reload. JSON data is cache-busted by a git revision token injected at deploy time, so the CDN always serves fresh rankings without a manual cache purge. uniqid() scopes every DOM selector and event listener to its instance, making the module safe to embed multiple times on one page. On mobile (≤768px), the entire ranking row becomes a tap target; on desktop, only the arrow link is.",
        liveUrl: "https://justcapital.com/rankings/",
        previewHtml: `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,'Helvetica Neue',sans-serif;background:#fff;padding:20px 22px;}
h1{font-size:22px;font-weight:800;margin-bottom:18px;letter-spacing:-.02em;color:#111;}
.rows{display:flex;flex-direction:column;gap:6px;}
.row{display:flex;align-items:center;gap:8px;padding:5px 8px 5px 5px;background:#f4f4f4;border-radius:50px;}
.rk{background:#1D4E5C;color:#fff;font-size:10px;font-weight:700;padding:5px 10px;border-radius:50px;white-space:nowrap;flex-shrink:0;text-align:center;}
.ph{width:32px;height:32px;border-radius:50%;background:#e2ecef;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#1D4E5C;flex-shrink:0;letter-spacing:0;}
.nm{flex:1;font-size:11px;font-weight:700;color:#111;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.in{font-size:9.5px;color:#777;white-space:nowrap;padding:0 4px;flex-shrink:0;}
.seals{display:flex;gap:3px;flex-shrink:0;}
.ar{width:28px;height:28px;background:#E07820;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
</style></head><body>
<svg style="display:none"><symbol id="s" viewBox="0 0 25 25"><circle cx="12.5" cy="12.5" r="12.5" fill="#1a3a6b"/><circle cx="12.5" cy="12.5" r="9" fill="#fff"/><text x="12.5" y="9.5" font-size="2.8" text-anchor="middle" fill="#1a3a6b" font-weight="700" font-family="sans-serif">AMERICA'S MOST</text><text x="12.5" y="15" font-size="5.5" text-anchor="middle" fill="#1a3a6b" font-weight="900" font-family="sans-serif">JUST</text><text x="12.5" y="19" font-size="2.8" text-anchor="middle" fill="#1a3a6b" font-weight="700" font-family="sans-serif">COMPANIES</text></symbol>
<symbol id="arr" viewBox="0 0 12 12"><line x1="1.5" y1="6" x2="10" y2="6" stroke="white" stroke-width="1.6" stroke-linecap="round"/><polyline points="6.5,2.5 10,6 6.5,9.5" fill="none" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol></svg>
<h1>2025 Rankings</h1>
<div class="rows">
  <div class="row"><span class="rk">1st</span><div class="ph">HE</div><span class="nm">Hewlett Packard Enterprise Company</span><span class="in">Computer Services</span><div class="seals"><svg width="25" height="25"><use href="#s"/></svg><svg width="25" height="25"><use href="#s"/></svg></div><div class="ar"><svg width="12" height="12"><use href="#arr"/></svg></div></div>
  <div class="row"><span class="rk">2nd</span><div class="ph">HP</div><span class="nm">HP Inc</span><span class="in">Technology Hardware</span><div class="seals"><svg width="25" height="25"><use href="#s"/></svg><svg width="25" height="25"><use href="#s"/></svg></div><div class="ar"><svg width="12" height="12"><use href="#arr"/></svg></div></div>
  <div class="row"><span class="rk">3rd</span><div class="ph">BA</div><span class="nm">Bank of America Corporation</span><span class="in">Banks</span><div class="seals"><svg width="25" height="25"><use href="#s"/></svg><svg width="25" height="25"><use href="#s"/></svg></div><div class="ar"><svg width="12" height="12"><use href="#arr"/></svg></div></div>
  <div class="row"><span class="rk">4th</span><div class="ph">UP</div><span class="nm">Union Pacific Corp</span><span class="in">Transportation</span><div class="seals"><svg width="25" height="25"><use href="#s"/></svg><svg width="25" height="25"><use href="#s"/></svg></div><div class="ar"><svg width="12" height="12"><use href="#arr"/></svg></div></div>
  <div class="row"><span class="rk">5th</span><div class="ph">AC</div><span class="nm">Accenture plc</span><span class="in">Commercial Support Services</span><div class="seals"><svg width="25" height="25"><use href="#s"/></svg><svg width="25" height="25"><use href="#s"/></svg></div><div class="ar"><svg width="12" height="12"><use href="#arr"/></svg></div></div>
  <div class="row"><span class="rk">6th</span><div class="ph">TR</div><span class="nm">Trane Technologies</span><span class="in">Building Materials &amp; Construction</span><div class="seals"><svg width="25" height="25"><use href="#s"/></svg><svg width="25" height="25"><use href="#s"/></svg></div><div class="ar"><svg width="12" height="12"><use href="#arr"/></svg></div></div>
  <div class="row"><span class="rk">7th</span><div class="ph">EV</div><span class="nm">Eversource Energy</span><span class="in">Utilities</span><div class="seals"><svg width="25" height="25"><use href="#s"/></svg><svg width="25" height="25"><use href="#s"/></svg></div><div class="ar"><svg width="12" height="12"><use href="#arr"/></svg></div></div>
</div>
</body></html>`,
      },
      {
        id: "featured-listing",
        title: "Featured Listing — Carousel Module with uniqid() Scoping",
        description: "A content module combining a featured hero report card with a Materialize CSS carousel of smaller cards. Each instance gets a unique DOM scope via PHP uniqid() — preventing selector collisions when the module appears multiple times on one page. The featured card pulls its background image from ACF, while the carousel loops through numbered post_url fields (1–99) with automatic break on empty. Tag pills use :first-child accent styling. Responsive: desktop carousel with arrow/dot navigation → mobile horizontal scroll.",
        language: "php",
        liveUrl: "https://justcapital.com",
        previewHtml: `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,'Helvetica Neue','Segoe UI',sans-serif;background:#fff;padding:20px;color:#111;}
.fl-wrap{max-width:520px;margin:0 auto;}
.fl-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px;}
.fl-title{font-size:18px;font-weight:800;letter-spacing:-.02em;color:#111;}
.fl-link{font-size:10px;font-weight:600;color:#1D4E5C;text-decoration:none;letter-spacing:.03em;}
.fl-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.fl-hero{grid-column:1/-1;border-radius:10px;overflow:hidden;position:relative;background:#1D4E5C;min-height:160px;display:flex;flex-direction:column;justify-content:flex-end;padding:16px;}
.fl-hero-bg{position:absolute;inset:0;background:linear-gradient(135deg,#1D4E5C 0%,#0e3340 100%);opacity:.85;}
.fl-hero-content{position:relative;z-index:1;}
.fl-hero-tags{display:flex;gap:5px;margin-bottom:8px;}
.fl-tag{padding:3px 9px;border-radius:100px;font-size:7.5px;font-weight:600;letter-spacing:.03em;}
.fl-tag:first-child{background:#E07820;color:#fff;}
.fl-tag:not(:first-child){background:rgba(255,255,255,.15);color:rgba(255,255,255,.85);}
.fl-hero-title{font-size:13px;font-weight:700;color:#fff;line-height:1.4;margin-bottom:4px;}
.fl-hero-date{font-size:8px;color:rgba(255,255,255,.6);}
.fl-card{background:#f8f7f2;border-radius:8px;overflow:hidden;border:1px solid #ede9e2;}
.fl-card-img{width:100%;height:72px;background:linear-gradient(135deg,#e2ecef,#cce8e4);display:flex;align-items:center;justify-content:center;}
.fl-card-img span{font-size:8px;color:#1D4E5C;font-weight:600;opacity:.5;}
.fl-card-body{padding:9px 10px;}
.fl-card-tags{display:flex;gap:4px;margin-bottom:5px;flex-wrap:wrap;}
.fl-card-tag{padding:2px 7px;border-radius:100px;font-size:6.5px;font-weight:600;}
.fl-card-tag:first-child{background:#E07820;color:#fff;}
.fl-card-tag:not(:first-child){background:#e2ecef;color:#1D4E5C;}
.fl-card-title{font-size:9.5px;font-weight:600;color:#111;line-height:1.4;margin-bottom:3px;}
.fl-card-date{font-size:7px;color:#999;}
.fl-nav{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:14px;}
.fl-arrow{width:24px;height:24px;border-radius:50%;background:#1D4E5C;color:#fff;border:none;font-size:10px;display:flex;align-items:center;justify-content:center;cursor:default;}
.fl-dots{display:flex;gap:4px;}
.fl-dot{width:6px;height:6px;border-radius:50%;background:#ddd;}
.fl-dot.active{background:#1D4E5C;}
.fl-scope{margin-top:14px;background:#f0f7f9;border-radius:6px;padding:7px 10px;display:flex;align-items:center;gap:8px;}
.fl-scope-label{font-size:7px;color:#888;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;}
.fl-scope-code{font-family:'Courier New',monospace;font-size:7.5px;color:#1D4E5C;}
</style></head><body>
<div class="fl-wrap">
  <div class="fl-header">
    <span class="fl-title">Featured Reports</span>
    <span class="fl-link">View All →</span>
  </div>
  <div class="fl-grid">
    <div class="fl-hero">
      <div class="fl-hero-bg"></div>
      <div class="fl-hero-content">
        <div class="fl-hero-tags"><span class="fl-tag">Rankings</span><span class="fl-tag">ESG Data</span></div>
        <div class="fl-hero-title">2025 Rankings: America's Most JUST Companies</div>
        <div class="fl-hero-date">January 14, 2025</div>
      </div>
    </div>
    <div class="fl-card">
      <div class="fl-card-img"><span>Report Cover</span></div>
      <div class="fl-card-body">
        <div class="fl-card-tags"><span class="fl-card-tag">Workers</span><span class="fl-card-tag">Research</span></div>
        <div class="fl-card-title">Corporate Workforce Investment Tracker</div>
        <div class="fl-card-date">Dec 12, 2024</div>
      </div>
    </div>
    <div class="fl-card">
      <div class="fl-card-img"><span>Report Cover</span></div>
      <div class="fl-card-body">
        <div class="fl-card-tags"><span class="fl-card-tag">Climate</span><span class="fl-card-tag">Policy</span></div>
        <div class="fl-card-title">Climate & Communities Brief</div>
        <div class="fl-card-date">Nov 5, 2024</div>
      </div>
    </div>
  </div>
  <div class="fl-nav">
    <button class="fl-arrow">‹</button>
    <div class="fl-dots"><div class="fl-dot active"></div><div class="fl-dot"></div><div class="fl-dot"></div></div>
    <button class="fl-arrow">›</button>
  </div>
  <div class="fl-scope">
    <span class="fl-scope-label">DOM Scoping</span>
    <span class="fl-scope-code">uniqid() → #carousel-6627a3f1e… — prevents multi-instance collisions</span>
  </div>
</div>
</body></html>`,
        code: `<?php
/**
 * featured_listing.php — JUST Capital
 * Production source from justcapital.com
 *
 * Featured content carousel: hero report card + Materialize carousel
 * of smaller cards. uniqid() scopes every DOM selector to prevent
 * collisions when the module appears multiple times on a single page.
 *
 * ACF fields loop through post_url_1 → post_url_99, breaking on
 * first empty — editors add content without code changes.
 */

// ── Collect post URLs from numbered ACF fields ──────────────────
$post_urls = array();
for ($i = 1; $i <= 99; $i++) {
    $var_name = 'post_url_' . $i;
    if (!empty($$var_name)) {
        $post_urls[] = $$var_name;
    } else {
        break;
    }
}

// ── uniqid() scoping — each instance gets unique DOM selectors ──
$uid = uniqid();
?>

<?php if (!empty($post_urls)): ?>
<div class="content-with-image featured-listing" id="fl-<?= $uid ?>">
  <div class="row">
    <div class="col s12">
      <div class="section-header-flex">
        <h2><?= $header ?></h2>
        <?php if (!empty($view_all_link)): ?>
          <a href="<?= $view_all_link ?>" class="cta-link">
            <?= $view_all_text ?? 'View All' ?>
          </a>
        <?php endif; ?>
      </div>
    </div>
  </div>

  <?php
  // ── Featured hero card (first post) ─────────────────────────
  $featured_post = get_post(url_to_postid($post_urls[0]));
  $featured_img  = get_the_post_thumbnail_url($featured_post->ID, 'large');
  $featured_tags = get_the_terms($featured_post->ID, 'post_tag');
  ?>

  <div class="row">
    <div class="col s12 m6 featured-card"
         style="background-image: url('<?= esc_url($featured_img) ?>');">
      <div class="featured-card-content">
        <?php if ($featured_tags): ?>
          <div class="tag-pills">
            <?php foreach ($featured_tags as $tag): ?>
              <span class="tag-pill"><?= esc_html($tag->name) ?></span>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>
        <h3><a href="<?= esc_url($post_urls[0]) ?>">
          <?= esc_html($featured_post->post_title) ?>
        </a></h3>
        <span class="date">
          <?= get_the_date('F j, Y', $featured_post->ID) ?>
        </span>
      </div>
    </div>

    <?php
    // ── Carousel of remaining cards ───────────────────────────
    $carousel_posts = array_slice($post_urls, 1);
    ?>

    <div class="col s12 m6">
      <div class="carousel carousel-slider" id="carousel-<?= $uid ?>">
        <?php foreach (array_chunk($carousel_posts, 2) as $chunk): ?>
          <div class="carousel-item">
            <?php foreach ($chunk as $url):
              $post = get_post(url_to_postid($url));
              $thumb = get_the_post_thumbnail_url($post->ID, 'medium');
              $tags  = get_the_terms($post->ID, 'post_tag');
            ?>
              <div class="listing-card">
                <div class="card-image"
                     style="background-image: url('<?= esc_url($thumb) ?>');">
                </div>
                <div class="card-content">
                  <?php if ($tags): ?>
                    <div class="tag-pills">
                      <?php foreach ($tags as $tag): ?>
                        <span class="tag-pill">
                          <?= esc_html($tag->name) ?>
                        </span>
                      <?php endforeach; ?>
                    </div>
                  <?php endif; ?>
                  <h4><a href="<?= esc_url($url) ?>">
                    <?= esc_html($post->post_title) ?>
                  </a></h4>
                  <span class="date">
                    <?= get_the_date('F j, Y', $post->ID) ?>
                  </span>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
        <?php endforeach; ?>
      </div>

      <?php // ── Carousel controls — scoped to this instance ────── ?>
      <div class="carousel-controls" id="controls-<?= $uid ?>">
        <button class="prev" onclick="
          document.querySelector('#carousel-<?= $uid ?>')
            .M_Carousel.prev()">‹</button>
        <div class="carousel-dots" id="dots-<?= $uid ?>"></div>
        <button class="next" onclick="
          document.querySelector('#carousel-<?= $uid ?>')
            .M_Carousel.next()">›</button>
      </div>
    </div>
  </div>
</div>
<?php endif; ?>

<style>
/* ── Featured Listing — justcapital.com production CSS ────────── */
.featured-listing .section-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.featured-listing .section-header-flex h2 {
  font-size: var(--type-h2);
  font-weight: 800;
  color: var(--color-primary-black);
}
.featured-listing .cta-link {
  font-size: var(--type-label-title);
  font-weight: 600;
  color: var(--color-primary-justblue);
  text-decoration: none;
}

/* ── Featured hero card ──────────────────────────────────────── */
.featured-card {
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  position: relative;
  overflow: hidden;
}
.featured-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,.65) 0%,
    rgba(0,0,0,.1) 60%,
    transparent 100%
  );
}
.featured-card-content {
  position: relative;
  z-index: 1;
}

/* ── Tag pills — :first-child accent pattern ─────────────────── */
.tag-pills {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.tag-pill {
  padding: 4px 12px;
  border-radius: 100px;
  font-size: var(--type-p-sm);
  font-weight: 600;
  letter-spacing: .03em;
}
.tag-pill:first-child {
  background: var(--color-secondary-saffron-orange);
  color: var(--color-primary-white);
}
.tag-pill:not(:first-child) {
  background: rgba(255,255,255,.15);
  color: rgba(255,255,255,.85);
}

/* ── Listing cards ───────────────────────────────────────────── */
.listing-card {
  background: var(--color-primary-white);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ede9e2;
}
.listing-card .card-image {
  height: 120px;
  background-size: cover;
  background-position: center;
}
.listing-card .card-content {
  padding: 12px 14px;
}
.listing-card h4 a {
  font-size: var(--type-card-title-sm);
  font-weight: 600;
  color: var(--color-primary-black);
  text-decoration: none;
}
.listing-card h4 a:hover {
  text-decoration: underline;
}
.listing-card .date {
  font-size: var(--type-p-sm);
  color: #999;
}

/* ── Carousel controls ───────────────────────────────────────── */
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}
.carousel-controls button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary-justblue);
  color: var(--color-primary-white);
  border: none;
  font-size: 14px;
  cursor: pointer;
}
.carousel-dots .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
  display: inline-block;
  margin: 0 3px;
}
.carousel-dots .dot.active {
  background: var(--color-primary-justblue);
}

/* ── Responsive ──────────────────────────────────────────────── */
@media only screen and (max-width: 992px) {
  .featured-card { min-height: 260px; }
}
@media only screen and (max-width: 600px) {
  .featured-card { min-height: 200px; padding: 16px; }
  .carousel-slider { overflow-x: auto; display: flex; gap: 12px; }
  .carousel-controls { display: none; }
}
</style>`,
      },
      {
        id: "d3-performance-chart",
        title: "Investment Performance Chart — D3 Focus + Context",
        description: "Built in collaboration with the CTO (back-end data pipeline) and an ex-D3 engineering manager (chart architecture). Jinju's contributions: the PHP/ACF layer that server-renders all chart data into data-* attributes — zero client-side XHR on page load — the CSS responsive viewBox wrapper, and WordPress integration. The chart is a D3 v4 focus + context pattern: the top panel shows a zoomable detail view, the bottom shows the full time range with a draggable brush. Brush and zoom are bidirectionally synced with loop-prevention guards, and a binary bisect tooltip snaps to the nearest data point in O(log n) time.",
        liveUrl: "https://justcapital.com/just-capital-index-series/",
        previewHtml: `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,'Helvetica Neue',sans-serif;background:#cce8e4;padding:14px;color:#111;}
.rtitle{font-size:13px;font-weight:700;text-align:center;margin-bottom:10px;}
table{width:100%;border-collapse:collapse;border-radius:6px;overflow:hidden;margin-bottom:12px;}
thead th{background:#1D4E5C;color:#fff;padding:7px 10px;font-size:9px;font-weight:600;text-align:center;border-right:1px solid rgba(255,255,255,.2);}
thead th:last-child{border-right:none;}
tbody td{background:#cce8e4;padding:7px 10px;font-size:11px;text-align:center;border-right:1px solid rgba(0,0,0,.08);}
tbody td:last-child{border-right:none;}
.card{background:#fff;border-radius:8px;padding:12px 14px;}
.ctitle{font-size:13px;font-weight:700;text-align:center;margin-bottom:7px;}
.legend{display:flex;gap:16px;justify-content:center;margin-bottom:8px;}
.leg{display:flex;align-items:center;gap:5px;font-size:8px;}
.lline{width:20px;height:2.5px;border-radius:2px;}
</style></head><body>
<div class="rtitle">Cumulative Returns since Dec 31 2021</div>
<table>
  <thead><tr><th>As Of</th><th>Workforce Advancement Leaders</th><th>Russell 1000 Equal Weighted Index</th></tr></thead>
  <tbody><tr><td>03-13-2026</td><td>45.66%</td><td>25.88%</td></tr></tbody>
</table>
<div class="card">
  <div class="ctitle">Performance</div>
  <div class="legend">
    <div class="leg"><div class="lline" style="background:#2563eb"></div><span style="color:#2563eb">Workforce Advancement Leaders</span></div>
    <div class="leg"><div class="lline" style="background:#ea580c"></div><span style="color:#ea580c">Russell 1000 Equal Weighted Index</span></div>
  </div>
  <svg viewBox="0 0 360 185" style="width:100%;height:auto;">
    <text x="10" y="100" font-size="8" fill="#999" transform="rotate(-90,10,100)" text-anchor="middle" font-family="sans-serif">Returns</text>
    <text x="39" y="13" font-size="7.5" fill="#bbb" text-anchor="end" font-family="sans-serif">50%</text>
    <text x="39" y="37" font-size="7.5" fill="#bbb" text-anchor="end" font-family="sans-serif">40%</text>
    <text x="39" y="61" font-size="7.5" fill="#bbb" text-anchor="end" font-family="sans-serif">30%</text>
    <text x="39" y="85" font-size="7.5" fill="#bbb" text-anchor="end" font-family="sans-serif">20%</text>
    <text x="39" y="109" font-size="7.5" fill="#bbb" text-anchor="end" font-family="sans-serif">10%</text>
    <text x="39" y="133" font-size="7.5" fill="#bbb" text-anchor="end" font-family="sans-serif">0%</text>
    <text x="39" y="157" font-size="7.5" fill="#bbb" text-anchor="end" font-family="sans-serif">-10%</text>
    <text x="39" y="181" font-size="7.5" fill="#bbb" text-anchor="end" font-family="sans-serif">-20%</text>
    <line x1="42" y1="9" x2="356" y2="9" stroke="#e5e7eb" stroke-width="1"/>
    <line x1="42" y1="33" x2="356" y2="33" stroke="#e5e7eb" stroke-width="1"/>
    <line x1="42" y1="57" x2="356" y2="57" stroke="#e5e7eb" stroke-width="1"/>
    <line x1="42" y1="81" x2="356" y2="81" stroke="#e5e7eb" stroke-width="1"/>
    <line x1="42" y1="105" x2="356" y2="105" stroke="#e5e7eb" stroke-width="1"/>
    <line x1="42" y1="129" x2="356" y2="129" stroke="#e5e7eb" stroke-width="1"/>
    <line x1="42" y1="153" x2="356" y2="153" stroke="#e5e7eb" stroke-width="1"/>
    <line x1="42" y1="177" x2="356" y2="177" stroke="#e5e7eb" stroke-width="1"/>
    <line x1="42" y1="129" x2="356" y2="129" stroke="#999" stroke-width="0.8"/>
    <polyline fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      points="50,129 76,138 103,153 129,177 155,160 182,143 208,118 234,93 261,81 287,57 313,41 339,26 356,19"/>
    <polyline fill="none" stroke="#ea580c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      points="50,129 76,135 103,150 129,177 155,168 182,150 208,129 234,118 261,110 287,93 313,87 339,77 356,67"/>
  </svg>
</div>
</body></html>`,
      },
      {
        id: "design-tokens",
        title: "CSS Token Architecture",
        description: "Token naming matched the agency's Figma variables exactly — no translation layer between design and code. Primitive values at the root, semantic aliases map meaning to primitives, component tokens consume semantic aliases. A brand update touches only the primitive layer.",
        language: "css",
        previewHtml: `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Courier New',monospace;background:#f0ede8;padding:18px;font-size:11px;}
.section-label{font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:#aaa;margin-bottom:8px;}
.group{margin-bottom:16px;}
.swatch-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:4px;}
.swatch-row{background:#fff;border-radius:6px;overflow:hidden;border:1px solid #e5e3de;display:flex;}
.sw{width:34px;flex-shrink:0;}
.si{padding:5px 9px;flex:1;}
.sn{font-size:8px;color:#444;letter-spacing:.03em;}
.sv{font-size:8px;color:#888;margin-top:1px;}
.alias-row{display:flex;align-items:center;gap:6px;margin-bottom:5px;}
.tok{background:#fff;border:1.5px solid #1D4E5C;color:#1D4E5C;border-radius:4px;padding:3px 7px;font-size:8px;letter-spacing:.03em;}
.tok.gray{border-color:#bbb;color:#888;}
.arr{color:#bbb;font-size:10px;}
</style></head><body>
<div class="group">
  <div class="section-label">1 · Primitives</div>
  <div class="swatch-grid">
    <div class="swatch-row"><div class="sw" style="background:#1D4E5C"></div><div class="si"><div class="sn">--color-teal-800</div><div class="sv">#1D4E5C</div></div></div>
    <div class="swatch-row"><div class="sw" style="background:#E07820"></div><div class="si"><div class="sn">--color-amber-600</div><div class="sv">#E07820</div></div></div>
    <div class="swatch-row"><div class="sw" style="background:#f8f7f2;border-right:1px solid #e5e3de"></div><div class="si"><div class="sn">--color-neutral-50</div><div class="sv">#f8f7f2</div></div></div>
    <div class="swatch-row"><div class="sw" style="background:#111"></div><div class="si"><div class="sn">--color-neutral-950</div><div class="sv">#111111</div></div></div>
  </div>
</div>
<div class="group">
  <div class="section-label">2 · Semantic aliases</div>
  <div class="alias-row"><span class="tok">--color-brand</span><span class="arr">→</span><span class="tok gray">--color-teal-800</span></div>
  <div class="alias-row"><span class="tok">--color-accent</span><span class="arr">→</span><span class="tok gray">--color-amber-600</span></div>
  <div class="alias-row"><span class="tok">--color-surface</span><span class="arr">→</span><span class="tok gray">--color-neutral-50</span></div>
</div>
<div class="group">
  <div class="section-label">3 · Component tokens — rendered</div>
  <div style="display:flex;flex-direction:column;gap:7px;">
    <div style="display:flex;align-items:center;gap:10px;">
      <button style="background:#E07820;color:#fff;border:none;padding:6px 16px;border-radius:100px;font-size:9px;font-weight:600;font-family:sans-serif;cursor:default;flex-shrink:0;">Sign In Now</button>
      <span style="font-family:monospace;font-size:7.5px;color:#1D4E5C;letter-spacing:.03em;">--btn-bg-primary</span>
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="background:#f8f7f2;border:1px solid #ede9e2;border-radius:6px;padding:5px 12px;font-size:8px;color:#888;font-family:sans-serif;flex-shrink:0;white-space:nowrap;">Content card surface</div>
      <span style="font-family:monospace;font-size:7.5px;color:#1D4E5C;letter-spacing:.03em;">--card-bg</span>
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="background:#f8f7f2;border:1px solid #ede9e2;border-radius:4px;padding:4px 10px;font-size:8px;font-weight:600;font-family:sans-serif;display:flex;gap:10px;color:#333;flex-shrink:0;white-space:nowrap;"><span>JUST Capital</span><span>Rankings</span><span>Reports</span></div>
      <span style="font-family:monospace;font-size:7.5px;color:#1D4E5C;letter-spacing:.03em;">--nav-bg</span>
    </div>
  </div>
</div>
</body></html>`,
        code: `/* ─── 1. Primitives ─────────────────────────────────────────── */
:root {
  --color-teal-900: #0e3340;
  --color-teal-800: #1D4E5C;
  --color-teal-600: #2a7a8c;

  --color-amber-600: #E07820;
  --color-amber-400: #F4A340;

  --color-neutral-50:  #f8f7f2;
  --color-neutral-100: #ede9e2;
  --color-neutral-950: #111111;

  /* ─── 2. Semantic aliases (names match agency Figma tokens) ─── */
  --color-brand:        var(--color-teal-800);
  --color-brand-dark:   var(--color-teal-900);
  --color-accent:       var(--color-amber-600);
  --color-surface:      var(--color-neutral-50);
  --color-text:         var(--color-neutral-950);
  --color-text-inverse: #ffffff;

  /* ─── 3. Component tokens ──────────────────────────────────── */
  --btn-bg-primary:       var(--color-accent);
  --btn-bg-primary-hover: var(--color-amber-400);
  --btn-text-primary:     var(--color-text-inverse);
  --card-bg:              var(--color-surface);
  --card-radius:          16px;
  --nav-bg:               var(--color-surface);

  /* ─── Spacing scale ─────────────────────────────────────────── */
  --space-xs:        8px;
  --space-sm:        12px;
  --space-md:        20px;
  --space-lg:        32px;
  --space-xl:        48px;
  --space-section:   64px;
  --space-container: 80px;

  --shadow-elevated: 0 8px 32px rgba(0, 0, 0, 0.18);
}`,
      },
    ],
    metrics: [
      { value: "35",   label: "custom WordPress modules registered" },
      { value: "3×",   label: "projects in parallel — shipped on schedule" },
      { value: "8 wks", label: "delivery crunch from kickoff to launch" },
      { value: "0",    label: "open visual QA tickets at launch" },
      { value: "<2.5s", label: "LCP target [unverified]" },
      { value: "AA",    label: "accessibility baseline [unverified]" },
    ],
    tech: ["PHP", "Twig", "WordPress", "ACF Pro", "HTML", "CSS", "JavaScript (ES6)", "CSS Custom Properties"],
    reflection:
      "My job wasn't invention; it was fidelity and durability. Implementation is interpretation: every spacing edge case I resolved, every interaction I filled in where the spec was silent, every CMS field I named so a non-engineer would understand it — those were all decisions about the design intent.\n\nThe 8-week crunch and parallel capacity constraint pushed that further. I couldn't afford to be clever. I had to build systems that explained themselves — simple enough to hand off, tight enough to hold up. That constraint made the codebase better than it would have been with unlimited time.",
    ctaText: "If your team is about to receive a design handoff and needs someone who can build the architecture behind it — not just the UI on top of it — let's talk.",
    liveSiteUrl: "https://justcapital.com",
  },

  "netflix-disney": {
    id: "netflix-disney",
    seoTitle: "Netflix & Disney+ — Multilingual Design Operations | Jinju Park",
    seoDescription:
      "8 years building the design ops infrastructure for Netflix and Disney+ across 50+ languages, 2 global studios, and every major script system — Latin, CJK, Arabic, Cyrillic, Hebrew.",
    heroIntro:
      "50+ languages. Two global studios. Zero shared standards when I started.\n\nI engineered the design ops infrastructure that made multilingual scalability possible — the typography framework, the cross-studio component library, and the QA process that both studios still operate on eight years later. Every script family rebuilt from first principles, not adjusted from Latin defaults.",
    role: "Lead Design Technologist & DesignOps Architect",
    team: "Cross-studio · Wordbank → Unfold",
    snapshot: {
      timeline: "8+ years · ongoing",
      tools: "Adobe CC (Photoshop, Illustrator), Cinema 4D, Figma, cross-studio QA framework",
    },
    specSheet: [
      { label: "Primary Stack", value: "Figma · Adobe CC · Cinema 4D · Cross-studio QA framework" },
      { label: "Accessibility", value: "Language-agnostic QA across 6 script families" },
      { label: "Engineering Impact", value: "Zero library forks over 8 years · 100% brand parity" },
      { label: "Scale", value: "50+ languages · 2 global studios · 25+ concurrent projects" },
    ],
    challenge:
      "Two studios making localization decisions in isolation. A title treatment could clear QA at one studio and fail at the other — evaluated by someone who couldn't read the script, against criteria that didn't exist. Text expansion, directional logic, and character density variance across 50+ languages — with launch windows that don't move.",
    approach:
      "I architected the design ops infrastructure from scratch — token-based typography systems for Arabic, Japanese, and Hebrew, a cross-studio review process that scaled across time zones, and a Figma component library as the single source of truth. Each script demanded independent decisions about line-height, container behavior, and optical weight. A font swap was never an option.",
    whatIDid:
      "Owned the design infrastructure of the localization pipeline — typography systems, title treatment QA, cross-studio review processes, and the shared Figma library. The operational architecture that let two studios converge on a shared standard was mine to build and maintain.",
    process: {
      discover: [
        "Typography audit across 50+ language families — cataloguing text expansion ratios, character density, and directional requirements per script",
        "Cross-studio workflow analysis — surfaced the architectural gap: no shared framework, no shared criteria, no shared vocabulary",
        "RTL, CJK, and Arabic layout research documented as Figma constraints with explicit component variants",
        "Brand guideline analysis for both platforms — mapping where visual identity rules conflicted with script requirements",
      ],
      design: [
        "Token-based typography system across 6 script families (Latin, CJK, Arabic, Cyrillic, Hebrew, Devanagari) — dynamically scaled by language-specific character density",
        "RTL layout architecture for Arabic and Hebrew with explicit directional component variants",
        "Language-agnostic QA framework — evaluation criteria based on visual weight, stroke contrast, and spatial rhythm rather than linguistic meaning",
        "Cross-studio review cadence: async annotation rounds, live critique only for unresolved decisions",
      ],
      ship: [
        "Handoff packages with script-agnostic annotations and per-language variant frames",
        "Owned title treatment QA and sign-off across all language variants before every launch",
        "Scaled the Figma component library across both studios — zero library forks over 8 years",
        "Review process became the cross-studio localization standard, still the operating framework eight years later",
      ],
    },
    keyDecisions: [
      "Language-agnostic QA over linguistic review — criteria based on visual weight, stroke contrast, and spatial rhythm. No single reviewer reads 50+ languages; the framework had to work without that assumption.",
      "Async-first review cadence across time zones — annotation rounds async, live critique reserved for unresolved decisions. Eliminated the coordination tax.",
      "Single library, not per-studio forks — extending one Figma component library per script family added overhead upfront but prevented divergence as the system scaled. Zero forks over 8 years validated the architectural bet.",
    ],
    outcomes: [
      "Typography system rebuilt from first principles across 6 script families — architected for extensibility, which is why it still works for languages added years after it was built",
      "Cross-studio localization standard still the operating framework eight years later — no successor process has been needed",
      "Language-agnostic QA enabled script review without linguistic knowledge — a force multiplier for a team that couldn't hire native readers for every language",
      "Two global studios, 50+ languages, zero library forks — architectural resilience at scale",
    ],
    visualBlocksHeader: "What Got Built",
    visualBlocksColumns: 2,
    visualBlocks: [
      {
        id: "logos",
        layout: "wide",
        imageSrc: "/netflix/hero-logos.png",
        noContainer: true,
        caption: "Two global studios, one shared design standard — the brief that defined 8 years of multilingual design operations.",
      },
      {
        id: "runway",
        layout: "wide",
        imageSrc: "/netflix/tt-smile-runway-en.png",
        caption: "The Japanese original was calligraphic — hand-gestural, kinetic. English has no equivalent script category. The adaptation required finding the expressive equivalent of brushstroke energy in a Latin typeface. That is not a font decision. It is a design decision.",
      },
      {
        id: "diecisiete",
        layout: "wide",
        imageSrc: "/netflix/tt-diecisiete-ko.png",
        caption: "Diecisiete (Spanish) → 열일곱 (Korean) — three iterations before approval. V1 direct-translated the weight; V2 referenced an existing Korean title; V3 found the right expressive equivalent. Design thinking made visible.",
      },
      {
        id: "naruto",
        layout: "wide",
        imageSrc: "/netflix/tt-naruto-jp.png",
        caption: "English to Japanese. The katakana subtitle was not a translation decision — it was a weight-matching decision. Stroke contrast, visual density, spatial rhythm: these had to read as the same title, not a translation of it.",
      },
      {
        id: "hospital",
        layout: "wide",
        imageSrc: "/netflix/tt-hospital-playlist-ro.png",
        caption: "The stencil cuts into the original Korean title design — that treatment is the brand. In Romanian, the string is 40% longer. Both constraints had to be solved simultaneously, not sequentially.",
      },
      {
        id: "history",
        layout: "wide",
        imageSrc: "/netflix/tt-history101-ko.png",
        caption: "The same localization, two contexts. Dark and light backgrounds impose different optical weight requirements — what reads as balanced against a black background often appears too heavy on white. Both had to clear QA.",
      },
      {
        id: "moscraciun",
        layout: "wide",
        imageSrc: "/netflix/tt-mos-craciun-en.png",
        caption: "Localization in reverse — Romanian original, English adaptation. The dimensional embossing and circular lock-up of the original could not be re-lettered; they had to be re-engineered at the new string length. The English version is shorter. That asymmetry is harder to solve than it appears.",
      },
      {
        id: "captainunderpants",
        layout: "wide",
        imageSrc: "/netflix/tt-captain-underpants-ro.png",
        caption: "Animated content, illustrated letterforms — the rules are different. When the type is drawn, not set, a font swap is not an option. The Romanian string is significantly longer. Both constraints had to be solved while keeping the cartoonish structural weight that defines the brand: the oversized caps, the stacked hierarchy, the chaos-as-system.",
      },
      {
        id: "brews",
        layout: "wide",
        imageSrc: "/netflix/tt-brews-ro.png",
        caption: "Distressed, textural type — the worn letterforms are the brand identity. The Romanian localization had to preserve that weathered quality while fitting a different string length into the same visual space.",
      },
      {
        id: "context",
        layout: "wide",
        imageSrc: "/netflix/context-poster.jpg",
        caption: "Title treatment in context — the Korean localization of Diecisiete in its final poster composition. The work isn't a type specimen; it's a shipped product.",
      },
    ],
    metrics: [
      { value: "50+", label: "languages" },
      { value: "2",   label: "global studios" },
      { value: "8+",  label: "years partnership" },
      { value: "6+",  label: "script families" },
    ],
    tech: ["Adobe Photoshop", "Adobe Illustrator", "Cinema 4D", "Figma", "Multilingual Typography", "RTL Component Architecture", "CJK Type Systems", "Cross-studio QA"],
    reflection:
      "Most of my Netflix and Disney+ work was in languages I don't speak. That became the discipline: evaluating visual rhythm, typographic color, and structural balance as abstract qualities — separate from meaning. When you can govern a Korean title treatment without reading Korean, you've built a system that scales beyond any individual's linguistic knowledge.",
    ctaText:
      "I architect design infrastructure that scales beyond the person who built it. If your team is governing quality across languages, markets, or studios — let's talk.",
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
      "The app crashed mid-recording. No recovery path. A family's story — gone.\n\nI led the mobile UX engineering for a national digital archive, redesigning the iOS and Android experience so the technology disappears and the conversation stays. Solo designer, two platforms, one shared component system — shipped in 6 weeks ahead of an NPR partnership that tripled the user base.",
    role: "Lead Mobile Designer (iOS + Android)",
    team: "Solo designer · 1 director · 2 engineers · NPR stakeholders",
    snapshot: {
      timeline: "6 weeks / 2021",
      tools: "Figma, React Native specs, WCAG AA checks",
    },
    specSheet: [
      { label: "Primary Stack", value: "Figma · React Native · VoiceOver · TalkBack" },
      { label: "Accessibility", value: "WCAG 2.1 AA · 44px touch targets · screen reader optimized" },
      { label: "Engineering Impact", value: "7 → 3 step onboarding · 4.6★ rating held through 3x scale" },
      { label: "Scale", value: "100k+ users · 2 platforms · 1 shared component system" },
    ],
    challenge:
      "An NPR partnership was about to triple the user base — and the recording flow failed silently. No recovery path. A dropped call meant a lost story. At that scale, that was a reputational risk, not a UX bug. Onboarding was 7 steps deep, and iOS/Android had diverged into two different products.",
    approach:
      "Solo designer owning every decision from IA to component specs. I engineered UX and visual design for both platforms through one shared React Native component system, speccing against real implementation constraints in real time. The architectural constraint: this app is used by grandparents, not power users. Every interaction had to be forgiving by default.",
    process: {
      discover: [
        "150+ App Store reviews analyzed — lost recordings with no recovery path was the dominant complaint. That finding shaped every architectural decision",
        "Storyteller interviews surfaced the friction gap: 'I want to record my grandmother' → actually pressing record was too many steps apart",
        "Competitor audit (Rev, Otter, Voice Memos): session recovery was table stakes everywhere except StoryCorps",
        "NPR brand alignment: defined how two identities coexist without confusing a new user segment",
      ],
      design: [
        "Engineered session recovery first — local draft auto-save on pause, backgrounding, and interruption. Non-negotiable architectural decision",
        "Removed the account gate before first recording — users capture immediately, create account to save. Trade-off: delayed retention data",
        "Standardized iOS and Android through one React Native component system — annotated every platform divergence with explicit interrupt handlers",
        "NPR co-brand integration without redesigning core identity — accessibility and warmth over visual refresh",
      ],
      ship: [
        "Embedded with React Native engineers — adapted specs in real time as platform constraints emerged",
        "WCAG AA compliance: contrast ratios, 44px touch targets, VoiceOver/TalkBack labels — critical for an older user base",
        "Owned launch QA and final sign-off across both platforms before release to 100k+ users",
        "Post-launch: tracked App Store reviews to validate session recovery held under real conditions",
      ],
    },
    keyDecisions: [
      "Removed the account gate — users record immediately, create account to save. Trade-off: delayed retention data. ROI: eliminated the highest-friction drop-off point in the funnel.",
      "Persistent session state over simplified recording — prioritized recovery over simplicity. A lost story is worse than a busier screen. Architectural resilience over aesthetic minimalism.",
      "Single React Native component system over platform-native — accepted minor platform deviation for deployment velocity and a single source of truth across iOS and Android.",
    ],
    outcomes: [
      "Onboarding: 7 steps → 3. Users reach first recording without creating an account",
      "4.6★ App Store rating held through NPR launch — user volume tripled, rating didn't drop",
      "Lost recordings eliminated as top App Store complaint — the dominant issue before redesign, architected out rather than patched",
      "Single component library shipped both platforms — zero divergence debt from day one",
    ],
    visualBlocksHeader: "What Got Redesigned",
    visualBlocks: [
      {
        id: "onboarding",
        layout: "before-after",
        label: "Onboarding",
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
        caption: "A dropped call used to mean a lost story. Persistent session state means interruption is recoverable — designed that way from the first wireframe, not patched in QA.",
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
        caption: "Discovery was an afterthought in v1. Inline playback, full transcripts, and filters by language, location, and community made the Listen feed the second reason people opened the app.",
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
      { value: "4.6★", label: "iOS App Store rating held through NPR launch — user volume tripled, rating didn't drop" },
      { value: "3",    label: "onboarding steps (from 7)" },
      { value: "2",    label: "platforms, 1 shared component system" },
    ],
    tech: ["Figma", "iOS", "Android", "React Native specs", "WCAG AA", "Design Systems"],
    reflection:
      "StoryCorps redefined what 'done' means for me. Reliability isn't the 95% that works — it's architecting the recovery path for the 5% that doesn't. Every session-state decision was really a question about what happens when things go wrong, and that recovery had to be engineered, not assumed.",
    ctaText:
      "I architect and ship — close enough to the code to catch edge cases, close enough to the user to know which ones matter. If your next product needs both, let's talk.",
  },
};
