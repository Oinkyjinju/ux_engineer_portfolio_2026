# CLAUDE.md — Project Context for All Agents

> Auto-loaded by Claude Code at the start of every conversation.
> All agents must read this file silently before taking action.

---

## 🗂 Project Identity

| Field | Value |
|-------|-------|
| **Project** | UX Engineer Portfolio 2026 |
| **Owner** | Jinju Park — Senior UX Engineer |
| **Purpose** | Personal portfolio showcasing product design, design systems, and front-end engineering |
| **URL** | Deployed on Vercel (production) |
| **Status** | Active development |

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React (Server + Client Components) | 19.2.3 |
| Language | TypeScript (strict mode) | 5 |
| Styling | Tailwind CSS v4 | 4 |
| 3D Rendering | Three.js + React Three Fiber | 0.183 / 9.5 |
| Physics | React Three Rapier (WASM) | 2.2.0 |
| 3D Helpers | React Three Drei | 10.7.7 |
| Animation | Framer Motion | 12.34.3 |
| Linting | ESLint 9 (Next.js + TypeScript preset) | 9 |
| Deployment | Vercel | — |

**PostCSS**: Uses `@tailwindcss/postcss` plugin (v4 syntax — no `tailwind.config.js`).

---

## 📁 Folder Structure

```
/
├── app/                    # Next.js App Router — file-based routing
│   ├── layout.tsx          # Root layout: fonts (Gloock, Red Hat Text, JetBrains Mono) via next/font/google
│   ├── page.tsx            # Home page — renders <Portfolio />
│   ├── globals.css         # Tailwind @import, global resets
│   ├── micro/page.tsx      # Route /micro — <MicroDemo />
│   ├── graph/page.tsx      # Route /graph — <GraphDemo />
│   └── os/page.tsx         # Route /os — <OSDashboard />
│
├── components/             # All React components
│   ├── Portfolio.tsx       # Main portfolio shell (client component, dark mode)
│   ├── PhysicsSandbox/     # Three.js physics demo (dynamic import, SSR: false)
│   │   ├── index.tsx
│   │   ├── SandboxCanvas.tsx
│   │   ├── PhysicsObject.tsx
│   │   ├── CaseStudyOverlay.tsx
│   │   └── config.ts
│   ├── AnimatedBackground.tsx
│   ├── ScrollReveal.tsx
│   ├── ProjectRow.tsx
│   ├── ProjectThumbnails.tsx
│   ├── GraphDemo.tsx
│   ├── MicroDemo.tsx
│   ├── OSDashboard.tsx
│   └── Button.tsx
│
├── data/
│   └── projects.ts         # Project data — Project interface + sample projects
│
├── hooks/
│   ├── useMousePosition.ts # Cursor tracking
│   └── useScrollY.ts       # Scroll position tracking
│
├── public/                 # Static assets
│
└── .claude/
    ├── launch.json         # Dev server: npm run dev → port 3000
    ├── memory/             # Per-agent project memory (19 files)
    └── commands/
        └── dev.md
```

---

## ✅ Established Conventions

### Component Conventions
- **"use client"** directive required for: anything using hooks, event handlers, Framer Motion, Three.js
- **Dynamic imports** (`next/dynamic` with `ssr: false`) required for: Three.js, Rapier WASM, heavy client libraries
- Components go in `/components/` — folder per complex component (like `PhysicsSandbox/`)
- Pages only render a single top-level component — keep pages thin

### TypeScript Conventions
- Strict mode is ON — no implicit `any`, no non-null assertions without good reason
- Interface-first: define types in the same file or in `/types/` if shared
- Path alias `@/*` maps to project root — use `@/components/...`, `@/hooks/...`

### Styling Conventions
- **Tailwind CSS v4** — utility classes only, no `tailwind.config.js`, no `@apply` except in globals.css
- Dark mode: portfolio uses dark background (`#0a0a0a` or similar), respect existing dark theme
- Responsive: mobile-first with Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- Fonts: `'Gloock'` (display/serif), `'Red Hat Text'` (body/UI), `'JetBrains Mono'` (code/data) — loaded via `next/font/google` in layout.tsx (self-hosted, non-blocking)

### File Naming
- React components: PascalCase (`MyComponent.tsx`)
- Hooks: camelCase with `use` prefix (`useScrollY.ts`)
- Data/config files: camelCase (`projects.ts`, `config.ts`)
- Pages: Next.js convention (`page.tsx`, `layout.tsx`)

### Import Order
1. React / Next.js core
2. Third-party libraries (three.js, framer-motion, etc.)
3. Local components (`@/components/...`)
4. Local hooks (`@/hooks/...`)
5. Local data/types (`@/data/...`)
6. Styles (if any)

---

## 🎨 Design Direction

- **Aesthetic**: Dark, minimal, cinematic — portfolio should feel like a director's reel, not a resume
- **Motion philosophy**: Motion has meaning. Animations reveal, emphasize, or guide — never decorate
- **Typography hierarchy**: Gloock (headings/display) → Red Hat Text (body/UI) → JetBrains Mono (code/data)
- **Color system**: Dark background (#0a0a0a range), accent colors per project (gradients tied to project identity)
- **Interactive demos**: Physics Sandbox, Graph Demo, OS Dashboard, Micro interactions — these are portfolio pieces themselves

---

## 📦 Projects Showcased

| Project | Domain | Role |
|---------|--------|------|
| JUST Intelligence | AI/Legal Tech | Product Design |
| Netflix & Disney+ | Streaming | UX / Design Systems |
| IATA | Aviation | Enterprise UX |
| StoryCorps | Non-profit Media | Product + Front-end |
| Component System | Design Systems | Design Engineering |

---

## 🚀 Dev Workflow

```bash
# Start dev server
npm run dev          # → http://localhost:3000

# Build for production
npm run build

# Lint
npm run lint
```

**Important**: PhysicsSandbox and Three.js components will throw SSR errors if rendered without `ssr: false` in `next/dynamic`. Always use dynamic imports for these.

---

## 🧠 Agent Guidance

### For Engineering Agents
- This is a **portfolio site** — visual polish and performance matter equally
- Three.js/R3F patterns: use `useFrame` for animations, `<Canvas>` for scene root, `<Physics>` wrapper for Rapier
- Framer Motion patterns: prefer `motion.div` with `variants` for reusable animations, use `useInView` for scroll triggers
- When adding new routes: create `app/[route]/page.tsx` — keep it thin, component goes in `/components/`
- Bundle size matters — always check if a new dependency is worth it

### For Design Agents
- The portfolio owner is a **UX Engineer** — bridging design and code is core to the identity
- Every design decision should be implementable by the front-end
- Interactive demos are first-class portfolio pieces — treat them as products, not toys
- Dark mode is the primary mode — do not design for light mode unless asked

### For Product Agents
- Single owner/audience: Jinju Park creating this for hiring managers and collaborators
- Success metric: does it get Jinju hired at a top-tier product company?
- Content is real work — respect the case studies and project descriptions

### For All Agents
- When in doubt about visual direction, optimize for "cinematic and precise" over "playful and decorative"
- Existing component patterns should be followed — don't introduce new patterns without noting it
- Performance budget: keep Lighthouse score > 90 on desktop

---

## 🔖 Decisions Log

> Major decisions made about this project. Do not re-litigate these.

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03 | Next.js App Router (not Pages) | Future-proof, server components, better performance |
| 2026-03 | Tailwind CSS v4 | Latest version, no config file needed |
| 2026-03 | React Three Fiber over vanilla Three.js | Better React integration, Drei helpers |
| 2026-03 | Framer Motion for animations | Best-in-class React animation library |
| 2026-03 | All global Claude agents in `~/.claude/agents/` | Universal — works across all projects |
| 2026-03 | Memory files in `.claude/memory/` (project-scoped) | Memories stay with the project |
