# Shared Agent Memory

> Cross-agent memory. Read by ALL agents at the start of every conversation.
> Write here when a decision, blocker, or insight is relevant to more than one agent.

---

## How to add an entry

```
## [YYYY-MM-DD] — [agent-name] → [category]: [title]
[2-4 sentences capturing the decision, blocker, or insight and why it matters]
```

**Categories**: `decision` | `blocker` | `milestone` | `context` | `handoff` | `warning`

---

## Entries

## [2026-03-15] — chief-hiring-intelligence-analyst → warning: Two WordPress case studies risk CMS specialist positioning
Jinju is targeting Stripe, Linear, Vercel, Figma — none of which hire for PHP/WordPress. Two adjacent WordPress case studies (`just-wordpress`, `just-rebrand`) risk signaling CMS specialist rather than systems engineer. Critical fixes required: (1) `just-wordpress` is structurally incomplete — no heroIntro, no decisions, no outcomes — must be written or removed before portfolio goes live. (2) Both entries need framing that explicitly signals stack-agnostic systems thinking: the token architecture, component API design, and handoff-as-constraint are the transferable proof points, not the CMS. (3) Portfolio order should be restructured so the two WordPress entries are not adjacent — break them with a non-JUST project. (4) Project card subtitles should lead with architectural outcomes, not the CMS/PHP tech stack. Copywriter and positioning agent must align on this framing before any copy is finalized for either entry.

## [2026-03-15] — chief-hiring-intelligence-analyst → decision: just-rebrand is the stronger of the two JUST WordPress projects
`just-rebrand` has complete case study copy, strong constraint navigation narrative (agency gaps, 8-week timeline, parallel workload), specific outcomes (35 modules, LCP 1s, a11y 98/100, full marketing autonomy post-launch), and explicit decision rationale. `just-wordpress` has strong raw material (800+ tokens replaced, 2-layer token system, 3 dev teams onboarded) but is structurally incomplete. For any hiring manager scan, `just-rebrand` is the entry to lead with between the two. The D3 index/concept page story (Jinju + CTO designed a solution when agency failed to understand the requirement) must be added to `just-rebrand` — it is the strongest intelligence signal in either case study and is currently absent.

## [2026-03-09] — studio-orchestrator → handoff: Component System live iframe previews
Implemented directly (no agent delegation) — task was fully spec'd with exact HTML payloads and diff. Added `previewHtml?: string` to `CodeBlock` interface in `data/caseStudies.ts`; replaced all three `previewSrc` static image references in `just-wordpress` codeBlocks with self-contained `previewHtml` HTML strings; updated `components/CaseStudy.tsx` to render `<iframe srcDoc>` when `previewHtml` is set, falling back to `<Image>` when only `previewSrc` is present. The `previewSrc` field remains available on the interface for other case studies.
