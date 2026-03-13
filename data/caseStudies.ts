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
  phase2Teaser?: string;
}

export const caseStudies: Record<string, CaseStudyData> = {
  "just-intelligence": {
    id: "just-intelligence",
    seoTitle: "JUST Intelligence — Corporate Accountability Data Platform | Jinju Park",
    seoDescription:
      "7 years designing and building JUST Capital's flagship data platform — from research sessions with financial analysts to 30+ production React components, serving 3M+ users across institutional investors and the general public.",
    heroIntro:
      "Seven years. One product. Thirty production components — the first and the thirtieth built by the same person, from the same research sessions, with the same abstraction model underneath.\n\nJUST Intelligence is a corporate accountability data platform for institutional investors and financial analysts. The data it surfaces is dense by design — that density is the product. My constraint was not to simplify it. My constraint was to make navigating 240+ weighted indicators feel like the analyst had always known where everything was.",
    role: "Lead Product Designer & Front-End Engineer",
    team: "2 designers · 4 engineers · 1 PM",
    snapshot: {
      timeline: "2017–present",
      tools: "React, TypeScript, D3.js, Figma, Design Tokens, axe-core",
    },
    challenge:
      "JUST Capital's flagship data platform needed to make complex ESG and corporate accountability metrics actionable for institutional investors — without triggering the skepticism financial analysts apply to any metric they didn't model themselves. The data set was 240+ weighted indicators across 1,000+ companies. The users operated in Bloomberg terminals and Excel, with zero tolerance for ambiguity about what a number means or where it came from. The risk wasn't building something generic. The risk was building something technically correct but cognitively unreliable.",
    approach:
      "I embedded with the engineering team from the start — running user research with analysts, translating those sessions directly into Figma components, and then writing the React that shipped them. No handoff document, no translation layer. I owned the spec and the PR. When an analyst session revealed a new data pattern, I was in the codebase the same week.",
    whatIDid:
      "I was the only designer embedded full-time with the engineering team. I owned every visual decision — the design token system, the component library, the data visualization specifications, and the accessibility audit framework. When a component changed in Figma, I updated the CSS custom properties the same day. The design-to-code loop was deliberately tight because the product demanded it.",
    process: {
      discover: [
        "Stakeholder workshops with research analysts and institutional investors across 3 firm types",
        "12 recorded user sessions — dominant themes: search friction, ranking legibility, and comparisons across sectors",
        "Heuristic audit of v1 with 47 annotated issues, prioritized by user impact vs. build cost",
        "Data architecture review to understand query latency and progressive disclosure constraints",
      ],
      design: [
        "Token-based design system: 150+ CSS custom properties synced to Figma variables — one source of truth across design and engineering",
        "Data visualization system built on D3 specs — ranking distributions, composite scores, and sector comparison charts designed from first principles",
        "Component library in Figma and React with matching names, props, and variant structure",
        "Accessibility-first from the first wireframe — axe-core integrated into every PR, not added at QA",
      ],
      ship: [
        "React + TypeScript front-end built alongside the Figma component library — no separate handoff phase",
        "D3.js data visualizations with progressive disclosure: summary → sector → company → indicator",
        "WCAG AA compliance verified with axe-core and VoiceOver across all dashboard features",
        "30+ production components shipped over 7 years, with token-based architecture absorbing two full rebrands",
      ],
    },
    keyDecisions: [
      "Built a token-based design system before anything else — 150+ CSS custom properties organized in three layers: global values, semantic aliases, and component-specific tokens. Every color, spacing, and type decision lived in a token. When two full rebrands came, they touched only the alias layer — not a single component needed rewriting. Nothing gets hardcoded.",
      "The data patterns at JUST — ranking distributions, composite scores, multi-weighted sector comparisons — didn't map to any pre-built chart library. A sorted bar chart of 1,000 companies makes a rank of #3 and #8 look equivalent when the score gap between them is 0.4 points. Chose D3.js to build visualizations from first principles, where proximity and relative distance could be made as legible as the absolute score.",
      "Embedded accessibility into every component spec from the first wireframe rather than treating it as a QA gate. axe-core ran in every PR review. WCAG AA compliance on a complex data platform is a design constraint, not a post-hoc fix — it has to be in the component API from the start.",
    ],
    outcomes: [
      "30+ production components shipped and maintained over 7 years — component library that both design and engineering owned, with zero forks across teams",
      "Token-based system absorbed two full visual rebrands without component rewrites — every brand decision was a token update, not a codebase sweep",
      "3M+ users served across institutional investors, ESG researchers, and the general public",
      "WCAG AA compliance across all dashboard features — accessible data visualization at institutional scale, built in from the first component spec",
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
        id: "scenario-tokens",
        layout: "side-by-side",
        imageSrc: "/just/just-ji-scenario.png",
        caption: "Scenario analysis: adjust metric weights to model hypothetical scoring outcomes. Built for ESG analysts who need to stress-test weighting assumptions before publishing a portfolio thesis.",
        imageSrc2: "/just/just-branding-guidelines.png",
        caption2: "Token architecture: three layers — global values → semantic aliases → component tokens. Two full rebrands changed only the alias layer. The documentation exists because the system had to be legible to engineers who weren't there when it was built.",
      },
    ],
    metrics: [
      { value: "7+",  label: "years in production" },
      { value: "30+", label: "components shipped" },
      { value: "2",   label: "full rebrands, zero component rewrites" },
      { value: "AA",  label: "WCAG compliance, built in from day one" },
    ],
    tech: ["React", "TypeScript", "D3.js", "CSS Custom Properties", "Figma", "Design Tokens", "axe-core"],
    reflection:
      "Seven years on the same product taught me something about design that shorter engagements can't: the cost of bad abstractions compounds. A token system that's slightly wrong in year one becomes a migration project in year three. A component API that doesn't account for edge cases becomes a fork by year two. JUST Intelligence is still in production, still using components I wrote in the first year, because the abstractions were right — not clever, just right.\n\nIt also taught me to treat the design system not as a deliverable but as a decision log — every token is a choice that will either pay for itself or cost you. That's the standard I've kept since.",
    ctaText: "I build products meant to outlast the team that shipped them. If you're working on something where the abstractions need to be right the first time, I want to hear about it.",
    phase2Teaser: "Phase 2 — currently in preparation — documents what seven years of foundation made possible. The work is being documented with the same care that went into building it.",
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
      "The engineering problem wasn't complexity — it was durability.\n\nJUST Capital needed a full marketing site rebuild in 8 weeks, while I was simultaneously running JUST Intelligence Phase 2. The visual design came from an external agency. My job was to turn those delivered assets into a production WordPress site — 35 custom modules, a CSS token system built directly from the brand guidelines, and a CMS architecture sturdy enough that the marketing team could own it permanently. The site serves institutional investors, ESG analysts, and press — the quality standard was non-negotiable.\n\nI had to build something that wouldn't need me the moment it launched. Limited capacity during the crunch became a design constraint: if I couldn't build it cleanly and hand it off confidently, I built something simpler instead.",
    role: "Front-End Engineer",
    team: "1 front-end developer (me) · 1 back-end developer (CTO) · Marketing team (CMO) · 1 external agency (design)",
    snapshot: {
      timeline: "2025 (8 weeks crunch)",
      tools: "PHP, Twig, WordPress, ACF Pro, HTML, CSS, JavaScript (ES6), CSS Custom Properties",
    },
    challenge:
      "JUST Capital's marketing site needed a complete rebuild around a fresh visual identity — delivered by an external agency — while I was simultaneously running JUST Intelligence Phase 2. The engineering constraint was twofold: ship on schedule under real capacity pressure, and build a CMS architecture that the marketing team could own independently from day one.\n\nNo dev-dependency for content updates. No fragile templates requiring engineering support. 35 distinct modules, fully responsive across mobile, tablet, and desktop — all built in 8 weeks.",
    approach:
      "Before writing a line of code, I mapped the agency's delivered designs to a WordPress block architecture. The question wasn't 'how do I build this' — it was 'how do I structure this so marketing never needs to Slack me after launch.'\n\nACF custom blocks gave the marketing team full authoring freedom while keeping markup and output quality under my control. A CSS token system derived directly from the agency's brand guidelines meant any future design update would be a token swap — not a codebase audit. Working in parallel with JUST Intelligence kept my decisions conservative — fewer custom patterns, shorter dependency chains, and zero tolerance for clever abstractions. The stack (PHP/Twig/WordPress) was dictated by JUST Capital's existing infrastructure; the architectural decisions — token systems, component modularity, handoff design — are stack-agnostic.",
    whatIDid:
      "I owned all front-end engineering: HTML structure, CSS styling with a token-based custom property system, PHP/Twig templates, and vanilla JavaScript for interactions. Registered 35 custom WordPress blocks via ACF Pro. Built the full CSS token architecture from the agency's delivered brand guidelines. Coordinated with the CTO on back-end data and config integration. Migrated previous site content into the new module structure. Shipped fully responsive across mobile, tablet, and desktop — reconciled screen by screen against the agency deliverables.",
    process: {
      discover: [
        "Reviewed the agency's delivered brand guidelines and design assets alongside marketing leadership — surfacing where the new identity needed to flex for real content, not just ideal mockup content",
        "Finalized design direction with Marketing (CMO) and the agency: resolved edge cases, confirmed content priorities, and aligned on module hierarchy before building started",
        "Mapped every screen in the delivered designs to a WordPress content model — deciding what editors could control vs. what stayed fixed, and naming CMS fields to match how marketing thinks",
      ],
      design: [
        "Architected the WordPress CMS structure: ACF custom block types for each module, field schemas per block, post type configuration — all reviewed with the CTO before the first template was written",
        "Built all 35 modules in HTML and CSS first — flat, no CMS dependency — to verify visual fidelity against the delivered designs before connecting any back-end logic",
        "CSS token architecture derived directly from the agency's brand guidelines: primitive values → semantic aliases → component tokens, named to match the agency's delivered token conventions",
      ],
      ship: [
        "Coordinated with the CTO to connect each module to live WordPress data and configuration — back-end and front-end integration across all 35 blocks",
        "Migrated previous site content into the new module structure: matched copy, images, and metadata to the corresponding ACF fields, block by block",
        "Final assembly pass to reconcile every module against the agency deliverables — resolving spacing, type, and layout edge cases screen by screen",
        "Handed off to the marketing team with block-level author documentation — the site launched into full CMS autonomy from day one",
      ],
    },
    keyDecisionsLabel: "Key Front-End Decisions",
    keyDecisions: [
      "Chose ACF custom blocks over a page builder (Elementor, Divi). Page builders hand the marketing team a CSS hammer — every field override lives inline, outside any token system, accumulating specificity debt with every page edit. ACF blocks gave the same authoring freedom while I retained complete control over markup and output quality. Marketing got the autonomy they needed; the codebase stayed clean.",
      "Built the CSS token system to match the agency's delivered brand guidelines exactly — then extended it. If the agency's guide called a color 'brand-primary', the CSS variable was --color-brand-primary. No translation layer, no re-naming. Then I added a second tier of component-level tokens beyond what the agency specified — so Twig templates could reach for --btn-bg-primary instead of tracing back through the primitive chain. Simpler callouts in templates, easier future maintenance.",
      "Designed the handoff as the success criterion, not an afterthought. Running JUST Intelligence Phase 2 in parallel meant I had zero capacity to be the marketing team's support system after launch. So the system had to not need me: every block with a plain-English author guide, every optional field with a sensible fallback, every CMS configuration intuitive enough that marketing could author freely from the first day. The handoff wasn't an event — it was the requirement the architecture was built against.",
    ],
    outcomes: [
      "35 custom WordPress modules shipped and in production — marketing team manages all content independently post-launch",
      "Site launched on schedule — 8 weeks, in parallel with JUST Intelligence Phase 2",
      "CSS token system positioned to absorb future brand updates without codebase rewrites",
      "Fully responsive across mobile, tablet, and desktop — all 35 modules",
    ],
    codeBlocksHeader: "The System in Code",
    codeBlocks: [
      {
        id: "hero-section",
        title: "Hero Section",
        description: "Two-column hero: full-bleed dark teal background with large display type and dual CTAs on the left; floating white news panel with live WordPress content on the right. Responsive — stacks vertically at tablet breakpoint.",
        language: "css",
        previewHtml: `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,'Segoe UI',sans-serif;background:#f0ede8;}
.hero{display:grid;grid-template-columns:1fr 460px;min-height:380px;background:#1D4E5C;padding:52px 64px;gap:40px;align-items:center;}
.hero-eyebrow{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:18px;font-family:'Courier New',monospace;}
.hero-title{font-size:44px;line-height:1.06;font-weight:700;color:#fff;margin-bottom:18px;letter-spacing:-.01em;}
.hero-title u{text-decoration:underline;text-decoration-color:#E07820;text-underline-offset:5px;text-decoration-thickness:2px;}
.hero-body{font-size:14px;line-height:1.65;color:rgba(255,255,255,.75);max-width:460px;margin-bottom:28px;}
.ctas{display:flex;gap:12px;}
.btn-p{background:#E07820;color:#fff;border:2px solid #E07820;padding:10px 24px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;}
.btn-o{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.45);padding:10px 24px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;}
.panel{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.22);}
.news-item{padding:14px 18px;border-bottom:1px solid #f0ede8;}
.news-item:last-child{border-bottom:none;}
.tags{display:flex;gap:5px;margin-bottom:7px;flex-wrap:wrap;}
.tf{background:#1D4E5C;color:#fff;font-size:9px;padding:3px 8px;border-radius:100px;font-weight:600;letter-spacing:.04em;}
.to{border:1.5px solid #1D4E5C;color:#1D4E5C;font-size:9px;padding:2px 7px;border-radius:100px;font-weight:500;}
.hl{font-size:13px;line-height:1.4;font-weight:600;color:#111;margin-bottom:0;}
.arr{color:#E07820;float:right;margin-top:-16px;}
.see-all{display:flex;justify-content:flex-end;padding:11px 18px;font-size:12px;color:#1D4E5C;font-weight:600;}
</style></head><body><section class="hero">
<div>
  <div class="hero-eyebrow">JUST Capital</div>
  <h1 class="hero-title">Unlock The Power<br>Of <u>Just</u><br>Intelligence</h1>
  <p class="hero-body">We translate insights from a decade of public polling, performance data, and financial analysis into actionable intelligence leaders can use to drive long-term business success.</p>
  <div class="ctas"><button class="btn-p">Sign In Now</button><button class="btn-o">Learn More</button></div>
</div>
<div class="panel">
  <div class="news-item"><div class="tags"><span class="tf">Just Capital News</span></div><div class="hl">Just Capital Welcomes New Board Member</div><span class="arr">→</span></div>
  <div class="news-item"><div class="tags"><span class="tf">Ethical Leadership</span><span class="to">Responsible AI</span></div><div class="hl">FORTUNE: The Next 3 Years Will Define Capitalism for a Generation</div><span class="arr">→</span></div>
  <div class="news-item"><div class="tags"><span class="tf">Just Announcements</span><span class="to">Just Intelligence</span></div><div class="hl">Just Capital Completes Transformation to Stakeholder Intelligence Platform</div><span class="arr">→</span></div>
  <div class="see-all"><span style="border-bottom:1.5px solid #1D4E5C">See All News →</span></div>
</div>
</section></body></html>`,
        code: `.hero {
  display: grid;
  grid-template-columns: 1fr 460px;
  background: var(--color-brand-dark);
  padding: var(--space-section) var(--space-container);
  gap: var(--space-xl);
  align-items: center;
}

.hero__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.06;
  color: var(--color-text-inverse);
  letter-spacing: -0.01em;
}

.hero__title--accent {
  text-decoration: underline;
  text-decoration-color: var(--color-accent);
  text-underline-offset: 5px;
  text-decoration-thickness: 2px;
}

/* Floating news panel */
.news-panel {
  background: var(--color-surface);
  border-radius: var(--card-radius);
  box-shadow: var(--shadow-elevated);
  overflow: hidden;
}

.news-item {
  padding: 14px 18px;
  border-bottom: 1px solid var(--color-neutral-100);
}

/* Responsive — stack at tablet */
@media (max-width: 960px) {
  .hero { grid-template-columns: 1fr; }
  .news-panel { display: none; }
}`,
      },
      {
        id: "acf-block",
        title: "WordPress Block Registration",
        description: "Custom ACF blocks give the marketing team authoring freedom while keeping markup and CSS under engineering control. Each block registers its own Twig template, field group, and allowed post types — no inline styles, no page builder overhead.",
        language: "php",
        previewHtml: `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Courier New',monospace;background:#f0ede8;padding:18px;font-size:12px;color:#333;}
.editor{background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.07);}
.editor-header{background:#1D4E5C;padding:11px 16px;display:flex;align-items:center;gap:8px;}
.editor-title{color:rgba(255,255,255,.75);font-size:9px;letter-spacing:.1em;text-transform:uppercase;}
.editor-badge{background:rgba(255,255,255,.15);color:#fff;font-size:8px;padding:2px 7px;border-radius:4px;margin-left:auto;letter-spacing:.05em;}
.block-wrap{padding:14px;}
.block-item{border:1.5px dashed #c5c3be;border-radius:8px;overflow:hidden;}
.block-label{background:#f8f7f4;padding:6px 12px;font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:#888;border-bottom:1px solid #e5e3de;}
.fields{padding:10px 12px;display:flex;flex-direction:column;gap:5px;}
.fr{display:flex;gap:8px;align-items:center;}
.fn{font-size:9px;color:#666;width:88px;flex-shrink:0;}
.fi{flex:1;background:#f8f7f4;border:1px solid #ddd;border-radius:4px;padding:3px 7px;font-size:9px;color:#333;font-family:inherit;}
.fi.on{border-color:#1D4E5C;color:#1D4E5C;}
.preview-bar{background:#1D4E5C;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;}
.pval{font-size:24px;font-weight:700;color:#E07820;}
.psub{font-size:10px;color:rgba(255,255,255,.65);margin-top:1px;}
.pfn{font-size:8px;color:rgba(255,255,255,.35);letter-spacing:.06em;}
</style></head><body><div class="editor">
  <div class="editor-header">
    <div class="editor-title">WordPress Block Editor</div>
    <div class="editor-badge">ACF Pro</div>
  </div>
  <div class="block-wrap">
    <div class="block-item">
      <div class="block-label">stat-callout — CMS fields</div>
      <div class="fields">
        <div class="fr"><span class="fn">stat_value</span><input class="fi on" value="800+" readonly></div>
        <div class="fr"><span class="fn">stat_label</span><input class="fi on" value="hardcoded values replaced" readonly></div>
        <div class="fr"><span class="fn">stat_context</span><input class="fi" value="across 3 dev teams, 1 design system" readonly></div>
        <div class="fr"><span class="fn">theme</span><input class="fi on" value="brand-dark" readonly></div>
      </div>
      <div class="preview-bar">
        <div><div class="pval">800+</div><div class="psub">hardcoded values replaced</div></div>
        <div class="pfn">stat-callout.php</div>
      </div>
    </div>
  </div>
</div></body></html>`,
        code: `<?php
/**
 * Register custom ACF blocks — JUST Capital marketing site
 *
 * Each block maps to a PHP template in /template-parts/blocks/.
 * Field groups are defined in ACF local JSON and version-controlled.
 *
 * @package JustCapital
 */
add_action( 'acf/init', 'jc_register_blocks' );

function jc_register_blocks(): void {
  if ( ! function_exists( 'acf_register_block_type' ) ) return;

  $blocks = [
    'hero'         => [ 'icon' => 'cover-image',  'desc' => 'Full-bleed hero with news panel' ],
    'stat-callout' => [ 'icon' => 'chart-bar',    'desc' => 'Large stat with label and context' ],
    'card-grid'    => [ 'icon' => 'grid-view',    'desc' => '1–4 column card layout' ],
    'quote-block'  => [ 'icon' => 'format-quote', 'desc' => 'Pull quote or testimonial' ],
    'newsletter'   => [ 'icon' => 'email',        'desc' => 'Newsletter signup (Mailchimp)' ],
  ];

  foreach ( $blocks as $name => $meta ) {
    acf_register_block_type([
      'name'            => $name,
      'title'           => ucwords( str_replace( '-', ' ', $name ) ),
      'description'     => $meta['desc'],
      'icon'            => $meta['icon'],
      'category'        => 'just-capital',
      'post_types'      => [ 'page', 'post' ],
      'render_template' => "template-parts/blocks/{$name}.php",
      'enqueue_style'   => get_template_directory_uri() . "/assets/css/blocks/{$name}.css",
      'supports'        => [ 'align' => false, 'anchor' => true ],
    ]);
  }
}`,
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
  <div class="section-label">3 · Component tokens</div>
  <div class="alias-row"><span class="tok" style="font-size:7px">--btn-bg-primary</span><span class="arr">→</span><span class="tok gray" style="font-size:7px">--color-accent</span></div>
  <div class="alias-row"><span class="tok" style="font-size:7px">--card-bg</span><span class="arr">→</span><span class="tok gray" style="font-size:7px">--color-surface</span></div>
  <div class="alias-row"><span class="tok" style="font-size:7px">--nav-bg</span><span class="arr">→</span><span class="tok gray" style="font-size:7px">--color-surface</span></div>
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
    ],
    tech: ["PHP", "Twig", "WordPress", "ACF Pro", "HTML", "CSS", "JavaScript (ES6)", "CSS Custom Properties"],
    reflection:
      "Building to someone else's design is its own discipline — and this project made me name it clearly. My job wasn't invention; it was fidelity and durability. Implementation is interpretation: every spacing edge case I resolved, every interaction I filled in where the spec was silent, every CMS field I named so a non-engineer would understand it — those were all decisions about the design intent.\n\nThe 8-week crunch and parallel capacity constraint pushed that further. I couldn't afford to be clever. I had to build systems that explained themselves — simple enough to hand off, tight enough to hold up. That constraint made the codebase better than it would have been with unlimited time.",
    ctaText: "If your team is about to receive a design handoff and needs someone who can build the architecture behind it — not just the UI on top of it — let's talk.",
  },

  "netflix-disney": {
    id: "netflix-disney",
    seoTitle: "Netflix & Disney+ — Multilingual Design Operations | Jinju Park",
    seoDescription:
      "8 years building the design ops infrastructure for Netflix and Disney+ across 50+ languages, 2 global studios, and every major script system — Latin, CJK, Arabic, Cyrillic, Hebrew.",
    heroIntro:
      "When 'Hospital Playlist' becomes 'Coridoarele Spitalului+' in Romanian, the title treatment has to survive the translation — same visual weight, same brand voice, different script. I designed the systems that made that possible at scale — the typography framework, the component library, and the cross-studio review process that both studios still use.",
    role: "Design Ops Lead & UX Designer",
    team: "Cross-studio · LA + London · Wordbank/Unfold",
    snapshot: {
      timeline: "8+ years · ongoing",
      tools: "Figma, cross-studio review framework, multilingual QA",
    },
    challenge:
      "Before a shared standard existed, each studio made localization calls in isolation. A title treatment could clear internal review in LA and fail QA in London — evaluated by someone who couldn't read the script, against criteria that didn't exist. With 50+ languages and launch windows that don't move, that was the problem that needed a system. Latin was the easy part.",
    approach:
      "I built the design ops infrastructure that made multilingual work scalable — typography systems purpose-built for Arabic, Japanese, and Hebrew, a cross-studio review process that worked across time zones, and a Figma component library maintained as a single source of truth across 50+ languages. Each script demanded independent decisions about line-height, container behavior, and optical weight. A font swap was never an option.",
    whatIDid:
      "I owned the design side of the localization pipeline — typography decisions, title treatment QA, cross-studio review processes, and the Figma component library that both studios used. The operational infrastructure that let two studios work to a shared standard was mine to build and maintain.",
    process: {
      discover: [
        "Typography audit across 50+ language families",
        "Studio workflow interviews in LA and London — surfacing the gap where each studio made localization decisions in isolation with no shared framework",
        "RTL, CJK, and Arabic layout requirements research — documented as Figma constraints, not just notes",
        "Brand guideline analysis for both platforms",
      ],
      design: [
        "Multilingual typography system covering Latin, CJK, Arabic, Cyrillic, and Hebrew — each rebuilt from first principles, not adjusted from Latin defaults",
        "RTL layout templates for Arabic and Hebrew, with explicit component variants for directionality",
        "Cross-studio design review process and critique framework — adapted for reviewers who cannot read the script they are evaluating",
        "Platform-specific component specs for Netflix and Disney+ brand alignment",
      ],
      ship: [
        "Design handoff packages structured with script-agnostic annotations and per-language variant frames",
        "I ran QA across all language variants before every launch — title treatment sign-off was mine",
        "I scaled the Figma component library across both studios — managing versioning to prevent fork divergence as the language count grew",
        "Both studios adopted the review process and documentation I built — it became the cross-studio localization standard across LA and London, still in use eight years later",
      ],
    },
    keyDecisions: [
      "Built a language-agnostic QA framework for evaluating title treatments across scripts — criteria based on visual weight, stroke contrast, and spatial rhythm rather than linguistic meaning. This was necessary because no single reviewer could read all 50+ languages.",
      "Established a cross-studio review cadence that worked across LA and London time zones — asynchronous annotation rounds followed by live critique only for unresolved decisions. Eliminated the 'everyone on a call at midnight' problem.",
      "Chose to extend the existing Figma component library for each new script family rather than maintain separate libraries per studio — added initial overhead but prevented fork divergence as the library scaled to 50+ languages.",
    ],
    outcomes: [
      "Multilingual typography system rebuilt from first principles for 6 script families — no script treated as a Latin variant, which is why it still works for languages added after it was built",
      "Cross-studio localization review process adopted across LA and London — still the operating standard eight years later, no successor process written",
      "Language-agnostic QA framework enabling script review without linguistic knowledge — visual weight and rhythm criteria replacing readability checks",
      "Two global studios operating to a shared design standard across 50+ languages, with zero library forks over 8 years",
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
    ],
    metrics: [
      { value: "50+", label: "languages" },
      { value: "2",   label: "global studios" },
      { value: "8+",  label: "years partnership" },
      { value: "6+",  label: "script families" },
    ],
    tech: ["Figma", "Design Ops", "Multilingual Typography", "RTL Component Architecture", "CJK Type Systems", "Cross-studio QA", "Localization Pipeline"],
    reflection:
      "Most of my Netflix and Disney+ work was in languages I don't speak. That turned out to be the discipline: you learn to read visual rhythm, typographic color, and structural balance as abstract qualities — separate from meaning. When you can evaluate a Korean title treatment without reading Korean, you've learned something about typography that monolingual designers rarely encounter.",
    ctaText:
      "I build design systems that other designers can use without the context I had when I built them. If your team is scaling across languages, markets, or studios, let's talk.",
  },

  "iata": {
    id: "iata",
    seoTitle: "IATA WeChat Mini-Program — Cross-Cultural UX Design | Jinju Park",
    seoDescription:
      "I designed IATA's aviation training platform for WeChat — building native Chinese UI patterns from the ground up, with bilingual Figma specs for a China-based engineering team.",
    heroIntro:
      "In WeChat, there is no URL bar, no browser back button, and no expectation that an app will behave the way a Western designer designed it. I built IATA's aviation training platform for an environment that assumes none of what I was trained to assume.",
    role: "UX Designer — WeChat Mini-Program",
    team: "Wordbank → IATA · Cross-functional · China-based dev team",
    snapshot: {
      timeline: "2023",
      tools: "Figma, WeChat DevTools, bilingual spec annotations",
    },
    challenge:
      "IATA needed to deliver aviation training content to Chinese aviation professionals through WeChat — an ecosystem with its own design conventions, technical constraints, and user expectations that are entirely different from Western mobile patterns. Get either wrong — the UI patterns or the spec language — and the product technically ships but practically fails.",
    approach:
      "I researched WeChat Mini-Program design guidelines before opening Figma — designing from Western assumptions first would have meant designing something that works in Figma and fails in WeChat DevTools. The constraint I kept returning to: Chinese aviation professionals would open this inside an app they trust completely. The only acceptable outcome was something that felt like it belonged there.",
    whatIDid:
      "I was the sole designer on this project — responsible for the full design process from WeChat platform research through final Figma handoff, with bilingual spec annotations for the China-based development team. That meant making every platform research decision, every cultural assumption, and every bilingual annotation call without a second opinion.",
    process: {
      discover: [
        "WeChat Mini-Program design guidelines and constraint research — documented as a Figma constraint list before any UI work began",
        "IATA training content audit to understand module structure and Chinese-market course prioritization",
        "Chinese mobile user behavior patterns research — WeChat navigation conventions, QR code flows, long-press menus, and the absence of browser back behavior",
        "WeChat DevTools environment testing for layout constraints, package size limits (WeChat enforces a 2MB ceiling per subpackage), and system font rendering — PingFang SC and Heiti SC only",
      ],
      design: [
        "WeChat-native UI patterns for course navigation — bottom tab bar, flat hierarchy, QR code integration as primary touchpoints",
        "Progress tracking and quiz interface design within WeChat's viewport constraints",
        "Chinese-first typography — Simplified Chinese with system font constraints, since WeChat Mini-Programs restrict custom typefaces to whitelisted CDN fonts",
        "Cross-cultural iconography audit flagging Western aviation icons with ambiguous meanings in Chinese context — for example, the Western clipboard convention for course registration has no equivalent in WeChat's QR-primary interaction model; each flagged icon was replaced with a WeChat-familiar equivalent",
      ],
      ship: [
        "Full design handoff to China-based development team",
        "Figma specs annotated in both English and Simplified Chinese — eliminated an entire category of implementation ambiguity for a team working across a language barrier",
        "QA pass in WeChat DevTools across all course modules — browser DevTools was not sufficient; the WeChat rendering engine behaves differently",
        "Live in WeChat — available to Chinese aviation professionals across China with no external browser dependency",
      ],
    },
    keyDecisions: [
      "Annotated all Figma handoff specs in both English and Mandarin — the development team was China-based and English-only specs would have created ambiguity at every interaction. This doubled annotation time but eliminated design-implementation discrepancies.",
      "Designed with WeChat's native navigation patterns rather than adapting Western patterns to fit — the course category icons, bottom nav behavior, and modal flows all follow WeChat conventions rather than iOS/Android norms. Trade-off: higher initial research cost, near-zero QA rework.",
    ],
    outcomes: [
      "350+ IATA courses previously inaccessible to professionals without a browser or external app — now reachable inside WeChat, where Chinese aviation professionals already spend their working day",
      "Bilingual specs (EN + ZH) delivered with zero design-implementation discrepancies in QA",
      "WeChat-native interaction patterns throughout — no Western navigation patterns adapted to fit",
      "Live in WeChat — available across China with no external browser dependency",
    ],
    visualBlocksHeader: "What It Looks Like",
    visualBlocks: [
      {
        id: "about",
        layout: "before-after",
        phoneScroll: true,
        label: "About Page",
        beforeSrc: "/iata/about-wireframe.png",
        afterSrc: "/iata/about-final.png",
        caption: "Wireframe to final in one comparison — the bilingual spec annotations that made this handoff work, to a China-based team with no shared working language, are not visible here. But they are why this shipped without QA rework.",
      },
      {
        id: "landing",
        layout: "wide",
        phoneScroll: true,
        imageSrc: "/iata/landing-final.png",
        caption: "The landing page had one job: feel like it belonged inside WeChat. IATA branding adapted to Simplified Chinese, bottom tab bar following WeChat's native navigation convention — not Western mobile patterns adjusted to fit.",
      },
      {
        id: "social",
        layout: "side-by-side",
        imageSrc: "/iata/social-original.png",
        caption: "Western layout, Western information hierarchy. The discount leads. The brand is secondary. This works in English.",
        imageSrc2: "/iata/social-localized.png",
        caption2: "The hierarchy changed, not just the language. Chinese market reading patterns required a fundamentally different layout — same campaign, different logic.",
      },
      {
        id: "course",
        layout: "wide",
        phoneScroll: true,
        imageSrc: "/iata/course-final.png",
        caption: "Chinese interface, English course name — because the user needs to recognize the credential. Every element here was a deliberate choice, not a translation default.",
      },
    ],
    metrics: [
      { value: "350+", label: "courses accessible" },
      { value: "40+",  label: "credentials offered" },
      { value: "0",    label: "discrepancies in QA" },
    ],
    tech: ["Figma", "WeChat Mini-Programs", "Cross-cultural UX", "Mobile Design", "Localization"],
    reflection:
      "Designing for WeChat is not translating — it is arriving. The platform has already made hundreds of decisions about how users expect to move through digital space. My job was to understand those decisions before I made any of my own. Two weeks in WeChat DevTools was not research overhead; it was the work.",
    ctaText:
      "I make products feel native in markets and platforms your team has never shipped to. If your product is expanding into a market that plays by different rules, let's talk about what that actually requires.",
  },

  "storycorps": {
    id: "storycorps",
    seoTitle: "StoryCorps Case Study — Cross-Platform UX Redesign | Jinju Park",
    seoDescription:
      "I led UX and visual design for StoryCorps on iOS and Android, reducing onboarding friction and improving recording reliability for real families preserving oral history.",
    heroIntro:
      "A family sits down to record a story they've carried for decades. The app crashes. Without a recovery path, that story is gone. I redesigned StoryCorps' iOS and Android experience so the technology disappears and the conversation stays.",
    role: "Lead Mobile Designer (iOS + Android)",
    team: "Solo designer · 1 director · 2 engineers · NPR stakeholders",
    snapshot: {
      timeline: "6 weeks / 2021",
      tools: "Figma, React Native specs, WCAG AA checks",
    },
    challenge:
      "StoryCorps was about to launch an NPR partnership that would triple their user base — and the recording flow failed silently, with no recovery path. A dropped call meant a lost story. At that scale, that was not a UX problem. It was a reputational one. Onboarding created unnecessary friction, and iOS/Android patterns had diverged enough to feel like two different products.",
    approach:
      "I led UX and visual design for both platforms simultaneously — one shared component system, no separate iOS/Android workstreams. The design constraint I kept returning to: this app is used by grandparents recording family history, not tech-comfortable users. Every interaction had to be forgiving by default. Working directly with Echobind's React Native team meant I was speccing against real implementation constraints, not handing off to a black box.",
    whatIDid:
      "I was the only designer on the project — owning every decision, from information architecture to component specs to handoff annotations, with no other designer in the room.",
    process: {
      discover: [
        "Interviewed storytellers and reviewed App Store feedback to identify top failure points — especially around recording loss and confusing onboarding",
        "Competitor recording app audit: Rev, Otter, Voice Memos",
        "150+ App Store reviews analyzed — dominant theme was lost recordings with no recovery path. The failure happened silently: no error state, no recovery prompt. That shaped every recording-flow decision.",
        "NPR brand alignment sessions to understand new user segment and co-brand requirements",
      ],
      design: [
        "Built a shared cross-platform component system and redesigned friction-heavy flows: onboarding, recording, and submission",
        "Recording interface redesign: persistent session state, visible time counter, one-tap pause — spec called for local draft auto-save on pause, backgrounding, and interruption, with a 'Resume your recording' prompt on next launch",
        "Onboarding reduced from 7 steps to 3 by removing the forced account-creation gate — first recording possible without signing up",
        "NPR brand integration without losing StoryCorps' warmth — two identities, one coherent experience",
      ],
      ship: [
        "Owned launch QA across both platforms — accessibility audit, regression testing across all critical flows, and final sign-off before release to 100k+ active users",
        "React Native component annotations with explicit platform-divergence notes — for example, Android hardware back during recording requires a confirmation dialog the spec defines explicitly; iOS swipe-to-dismiss requires a different interrupt handler. The spec called out these cases by platform.",
        "Accessibility audit against WCAG AA: contrast ratios, touch targets (44px min), screen reader labels — critical for an older user base, verified with axe-core and VoiceOver",
        "Embedded with Echobind's React Native engineers during implementation — adapted specs in real time as platform constraints emerged",
      ],
    },
    keyDecisions: [
      "Removed the account gate before first recording — users could capture a story immediately, then create an account to save it. Trade-off: delayed first-party retention data until post-recording.",
      "Redesigned recording flow with persistent session state, visible timer, and safer interruption handling — prioritized recovery over simplicity, because a lost story is worse than a slightly busier screen.",
      "Unified iOS/Android patterns through one React Native-ready component language — accepted minor platform deviation to ship faster and maintain a single source of truth.",
      "Integrated NPR co-brand elements without redesigning StoryCorps' core visual identity — kept warmth and accessibility over visual refresh.",
    ],
    outcomes: [
      "Onboarding reduced from 7 steps to 3 — users reach first recording without creating an account",
      "App Store rating held at 4.6★ as user volume scaled with the NPR partnership launch",
      "Lost recordings dropped out of the top-reported App Store complaint categories in the quarter after launch — the dominant support issue before the redesign, designed out rather than patched",
      "iOS and Android shipped from a single React Native component library — no platform-specific backlog, no divergence debt from day one",
    ],
    visualBlocksHeader: "What Got Redesigned",
    visualBlocks: [
      {
        id: "flow",
        layout: "screen-grid",
        caption: "The complete recording journey. Eight screens. One shared component language. Designed so a grandparent who has never used a recording app can reach 'Published' without asking for help.",
        screens: [
          { src: "/storycorps/prepare.svg",   label: "Prepare" },
          { src: "/storycorps/questions.svg", label: "Questions" },
          { src: "/storycorps/record.svg",    label: "Record" },
          { src: "/storycorps/photos.svg",    label: "Upload Photo" },
          { src: "/storycorps/metadata.svg",  label: "Review" },
          { src: "/storycorps/preview.svg",   label: "Preview" },
          { src: "/storycorps/published.svg", label: "Published!" },
          { src: "/storycorps/sign-in.svg",   label: "Sign In (optional)" },
        ],
      },
      {
        id: "onboarding",
        layout: "before-after",
        label: "Onboarding",
        caption: "The old flow asked users to create an account before hearing a single word of their own voice. This one doesn't. Three steps to recording, zero friction gates.",
        beforeSrc: "/storycorps/onboarding-before.png",
        afterSrc: "/storycorps/onboarding-after.png",
      },
      {
        id: "recording",
        layout: "before-after",
        label: "Recording Screen",
        caption: "A dropped call used to mean a lost story. Persistent session state means interruption is recoverable — designed that way from the first wireframe, not patched in QA.",
        beforeSrc: "/storycorps/recording-before.png",
        afterSrc: "/storycorps/recording-after.png",
      },
      {
        id: "system-listen",
        layout: "side-by-side",
        caption: "One design system, two platforms. The left shows where iOS and Android share the same token. The divergence points are documented — not assumed.",
        imageSrc: "/storycorps/design-system.png",
        caption2: "The Listen feed — inline playback, language and date filters, and a deliberate two-step deletion to prevent accidental story loss.",
        imageSrc2: "/storycorps/listen-stories.png",
      },
    ],
    metrics: [
      { value: "4.6★", label: "App Store rating maintained at scale — NPR partnership tripled user volume" },
      { value: "3",    label: "onboarding steps (from 7)" },
      { value: "2",    label: "platforms, 1 shared component system" },
    ],
    tech: ["Figma", "iOS", "Android", "React Native specs", "WCAG AA", "Design Systems"],
    reflection:
      "StoryCorps forced a rethinking of what 'done' means. A recording feature is not reliable because it works 95% of the time — it is reliable because it recovers gracefully from the 5%, and that recovery has to be designed, not assumed. Every session-state decision I made was really a question about what happens when things go wrong.",
    ctaText:
      "I design and build — close enough to the code to catch the edge cases, close enough to the user to know which ones matter. Let's work together.",
  },
};
