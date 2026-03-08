export interface VisualBlock {
  id: string;
  caption: string;
  layout: "before-after" | "wide" | "side-by-side" | "screen-grid";
  label?: string;
  beforeSrc?: string;
  afterSrc?: string;
  imageSrc?: string;
  // side-by-side: second image + its caption
  imageSrc2?: string;
  caption2?: string;
  // screen-grid: ordered list of screen src + label pairs
  screens?: { src: string; label: string }[];
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
  visualBlocksHeader?: string;
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
    seoTitle: "Netflix & Disney+ — Multilingual Design Operations | Jinju Park",
    seoDescription:
      "8 years building the design ops infrastructure for Netflix and Disney+ across 50+ languages, 2 global studios, and every major script system — Latin, CJK, Arabic, Cyrillic, Hebrew.",
    heroIntro:
      "When 'Hospital Playlist' becomes 'Coridoarele Spitalului+' in Romanian, the title treatment has to survive the translation — same visual weight, same brand voice, different script. I built the infrastructure that made that possible at scale, across 50 languages and two studios.",
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
        "Both studios still run localization reviews using the process documentation I wrote — unchanged eight years later",
      ],
    },
    keyDecisions: [
      "Built a language-agnostic QA framework for evaluating title treatments across scripts — criteria based on visual weight, stroke contrast, and spatial rhythm rather than linguistic meaning. This was necessary because no single reviewer could read all 50+ languages.",
      "Established a cross-studio review cadence that worked across LA and London time zones — asynchronous annotation rounds followed by live critique only for unresolved decisions. Eliminated the 'everyone on a call at midnight' problem.",
      "Chose to extend the existing Figma component library for each new script family rather than maintain separate libraries per studio — added initial overhead but prevented fork divergence as the library scaled to 50+ languages.",
    ],
    outcomes: [
      "Multilingual typography system rebuilt from first principles for 6 script families — no script treated as a Latin variant, which is why it still works for languages added after it was built",
      "Both studios still run localization reviews using the process documentation I wrote — unchanged eight years later",
      "Language-agnostic QA framework enabling script review without linguistic knowledge — visual weight and rhythm criteria replacing readability checks",
      "Two global studios operating to a shared design standard across 50+ languages, with zero library forks over 8 years",
    ],
    visualBlocksHeader: "What Got Built",
    visualBlocks: [
      {
        id: "logos",
        layout: "wide",
        imageSrc: "/netflix/hero-logos.png",
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
      "I researched WeChat Mini-Program design guidelines before opening Figma — not because that is the right process in general, but because in this context, designing from Western assumptions first would have meant designing something that works in Figma and fails in WeChat DevTools. The constraint I kept returning to: Chinese aviation professionals would open this inside an app they trust completely. The only acceptable outcome was something that felt like it belonged there.",
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
        label: "About Page",
        beforeSrc: "/iata/about-wireframe.png",
        afterSrc: "/iata/about-final.png",
        caption: "Wireframe to final in one comparison — the bilingual spec annotations that made this handoff work, to a China-based team with no shared working language, are not visible here. But they are why this shipped without QA rework.",
      },
      {
        id: "landing",
        layout: "wide",
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
      "StoryCorps' app experience was fragile. Recording sessions could fail without clear recovery, onboarding created unnecessary friction, and iOS/Android patterns had diverged enough to feel like two different products. With NPR partnership visibility increasing, a recording failure wasn't just a UX problem — it was a public one.",
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
      { value: "4.6★", label: "App Store rating" },
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
