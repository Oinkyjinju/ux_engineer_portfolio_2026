"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { type Project } from "@/data/projects";
import { caseStudies, type CodeFile, type VisualBlock } from "@/data/caseStudies";
import { ProjectThumbnail } from "./ProjectThumbnails";
import { projects } from "@/data/projects";

// ── Per-case unique components (dynamically imported, ssr:false) ──
const RulerLines        = dynamic(() => import("./CaseStudy/RulerLines").then(m => m.RulerLines),                   { ssr: false });
const TokenDepthViz     = dynamic(() => import("./CaseStudy/TokenDepthVisualizer").then(m => m.TokenDepthVisualizer), { ssr: false });
const StatsCounter      = dynamic(() => import("./CaseStudy/StatsCounter").then(m => m.StatsCounter),               { ssr: false });
const GridAssembly      = dynamic(() => import("./CaseStudy/GridAssembly").then(m => m.GridAssembly),               { ssr: false });
const GapLedger         = dynamic(() => import("./CaseStudy/GapLedger").then(m => m.GapLedger),                     { ssr: false });
const WarmVignette      = dynamic(() => import("./CaseStudy/WarmVignette").then(m => m.WarmVignette),               { ssr: false });
const RecoveryFlowchart = dynamic(() => import("./CaseStudy/RecoveryFlowchart").then(m => m.RecoveryFlowchart),     { ssr: false });
const SpecimenGrid      = dynamic(() => import("./CaseStudy/SpecimenGrid").then(m => m.SpecimenGrid),               { ssr: false });
const ScriptWeightStrip = dynamic(() => import("./CaseStudy/ScriptWeightStrip").then(m => m.ScriptWeightStrip),     { ssr: false });
const WeChatPrimer      = dynamic(() => import("./CaseStudy/WeChatPrimer").then(m => m.WeChatPrimer),               { ssr: false });
const BeforeAfterReveal = dynamic(() => import("./CaseStudy/BeforeAfterReveal").then(m => m.BeforeAfterReveal),     { ssr: false });

interface Props { project: Project; }

// Font constants — stable, no need to recreate per render
const mono  = "'JetBrains Mono', monospace";
const serif = "'Gloock', Georgia, serif";
const sans  = "'Red Hat Text', system-ui, sans-serif";

// Hero entrance animation — stagger children on mount.
// Respects prefers-reduced-motion via useReducedMotion() inside the component.
const heroContainer = {
  hidden: {},
  visible: (reduce: boolean) => ({
    transition: reduce ? {} : { staggerChildren: 0.08, delayChildren: 0.05 },
  }),
};
const heroItem = (reduce: boolean) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 10 },
  visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
});

// Phone‑frame mockup — scrollable portrait container with home indicator (no notch)
function PhoneFrame({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div style={{ position: "relative", width: 248, flexShrink: 0 }}>
      {/* Scrollable viewport */}
      <div className="sc-phone-scroll" style={{
        width: 248, height: 480,
        borderRadius: 22, overflow: "hidden", overflowY: "scroll",
        scrollbarWidth: "none",
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.15)",
      }}>
        <Image
          src={src} alt={alt} width={0} height={0} sizes="248px" priority={priority}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
      {/* Home indicator */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
        width: 44, height: 3.5, background: "rgba(0,0,0,0.28)",
        borderRadius: 2, zIndex: 3, pointerEvents: "none",
      }} />
    </div>
  );
}

// ── Syntax highlight helper ────────────────────────────────────────────────
// Lightweight, zero-dependency token colorizer for CSS/PHP/Twig/TSX snippets.
// language is part of the API surface but this tokenizer applies the same
// rules to all languages (CSS/PHP/HTML/TSX/JS) — no per-language branching.
function CodeHighlight({ code }: { code: string; language: string }) {
  const rules: { re: RegExp; color: string }[] = [
    { re: /(\/\*[\s\S]*?\*\/)/g,                        color: "#6c7086" }, // block comments
    { re: /(\/\/[^\n]*|(?<![{])#[^\n{][^\n]*)/g,        color: "#6c7086" }, // line comments
    { re: /("[^"]*"|'[^']*'|`[^`]*`)/g,                 color: "#a6e3a1" }, // strings
    { re: /\b(var|const|let|function|return|if|else|for|class|extends|import|export|default|from|async|await|new|this|true|false|null|undefined)\b/g, color: "#cba6f7" },
    { re: /(--[\w-]+)/g,                                color: "#89dceb" }, // css vars
    { re: /(@[\w-]+)/g,                                 color: "#f38ba8" }, // css at-rules
    { re: /\b(string|array|void|int|bool|float)\b/g,    color: "#fab387" }, // php types
    { re: /(\$[\w]+)/g,                                 color: "#fab387" }, // php/twig vars
    { re: /(\{%[\s\S]*?%\}|\{\{[\s\S]*?\}\})/g,        color: "#f9e2af" }, // twig tags
    { re: /\b(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|s|ms)?)\b/g, color: "#fab387" },
    { re: /([:;,{}[\]()>])/g,                           color: "#9399b2" }, // punctuation
    { re: /([\w-]+)(?=\s*[:(])/g,                       color: "#89b4fa" }, // property / fn names
  ];
  const tokens: { text: string; color?: string }[] = [];
  let rem = code;
  while (rem.length > 0) {
    let best: { idx: number; len: number; color: string } | null = null;
    for (const { re, color } of rules) {
      re.lastIndex = 0;
      const m = re.exec(rem);
      if (m && (best === null || m.index < best.idx)) best = { idx: m.index, len: m[0].length, color };
    }
    if (!best) { tokens.push({ text: rem }); break; }
    if (best.idx > 0) tokens.push({ text: rem.slice(0, best.idx) });
    tokens.push({ text: rem.slice(best.idx, best.idx + best.len), color: best.color });
    rem = rem.slice(best.idx + best.len);
  }
  return <>{tokens.map((t, i) => t.color ? <span key={i} style={{ color: t.color }}>{t.text}</span> : <span key={i}>{t.text}</span>)}</>;
}

// Primary section label — design-thinking sections (Challenge, Approach, Decisions, Reflection, Results)
const sectionLabelStyle = (marginBottom: number): React.CSSProperties => ({
  fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
  textTransform: "uppercase", color: "var(--accent)",
  marginTop: 0, marginBottom, fontWeight: 400,
});
// Secondary section label — logistical/process sections (Tech & Tools, How It Got Built)
// Uses text-secondary (not text-tertiary) to remain readable at ~4.7:1 contrast on dark bg
// Distinguishable from primary accent labels by color (gray vs. amber) not by opacity
const sectionLabelSecondaryStyle = (marginBottom: number): React.CSSProperties => ({
  fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
  textTransform: "uppercase", color: "var(--text-secondary)",
  marginTop: 0, marginBottom, fontWeight: 400,
});

export default function CaseStudy({ project }: Props) {
  const [dark, setDark]             = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });
  const [scrolled, setScrolled]     = useState(false);
  // tracks which file tab is active per code block (keyed by block.id)
  const [activeFileTabs, setActiveFileTabs] = useState<Record<string, number>>({});
  const shouldReduceMotion = useReducedMotion() ?? false;
  const data = caseStudies[project.id];

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject  = projects[currentIndex - 1];
  const nextProject  = projects[currentIndex + 1];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggle = () => {
    const newDark = !dark;
    localStorage.setItem("theme", newDark ? "dark" : "light");
    setDark(newDark);
  };

  const theme = dark
    ? {
        "--bg":               "#09090E",
        "--text-primary":     "#EDEAE3",
        "--text-secondary":   "#7D7A73",
        "--text-tertiary":    "#4A4846",
        "--border":           "rgba(255,255,255,0.07)",
        "--card-bg":          "rgba(255,255,255,0.025)",
        "--accent":           "#F5A623",
        "--accent-muted":     "rgba(245,166,35,0.12)",
        "--nav-bg-scrolled":  "rgba(9,9,14,0.82)",
      }
    : {
        "--bg":               "#F8F7F2",
        "--text-primary":     "#0E0D0A",
        "--text-secondary":   "#5A5855",
        "--text-tertiary":    "#8E8C89",
        "--border":           "rgba(0,0,0,0.09)",
        "--card-bg":          "rgba(0,0,0,0.03)",
        "--accent":           "#2563EB",
        "--accent-muted":     "rgba(37,99,235,0.1)",
        "--nav-bg-scrolled":  "rgba(248,247,242,0.82)",
        "--thumbnail-shadow": "0 2px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
      };

  if (!data) {
    return (
      <div style={{
        fontFamily: mono, fontSize: 14, color: "#EDEAE3",
        backgroundColor: "#09090E", minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        Case study not found.
      </div>
    );
  }

  const layout = data.layout ?? "standard";
  const isNarrative = layout === "narrative";
  const processLayout = data.processLayout ?? (isNarrative ? "stacked" : "columns");
  const keyDecisionsLayout = data.keyDecisionsLayout ?? (isNarrative ? "stacked" : "grid");
  const visualBlocks = data.visualBlocks ?? [];
  const leadVisual = data.leadVisualId ? visualBlocks.find((block) => block.id === data.leadVisualId) : undefined;
  const visualBlocksMain = isNarrative && leadVisual
    ? visualBlocks.filter((block) => block.id !== leadVisual.id)
    : visualBlocks;

  const renderVisualBlock = (
    block: VisualBlock,
    options?: { twoCol?: boolean; priority?: boolean; index?: number },
  ) => {
    const isTwoCol  = options?.twoCol ?? data.visualBlocksColumns === 2;
    const priority  = options?.priority ?? false;
    const blockIdx  = options?.index ?? 0;

    // Shared image clip — no card chrome, shadow gives depth
    const imgClip: React.CSSProperties = {
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 2px 20px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.07)",
    };

    // Minimal caption — no accent bar, just clean mono text
    const Caption = ({ text, secondary = false }: { text: string; secondary?: boolean }) => (
      <p style={{
        fontFamily: mono,
        fontSize: secondary ? 11 : 12,
        lineHeight: 1.6,
        color: "var(--text-secondary)",
        marginTop: 12,
        marginBottom: 0,
        letterSpacing: "0.01em",
      }}>
        {text}
      </p>
    );

    // Scroll-reveal — stagger by block index (capped so it never feels slow)
    const revealDelay = shouldReduceMotion ? 0 : Math.min(blockIdx * 0.04, 0.16);
    const revealProps = {
      initial:    shouldReduceMotion ? {} : { opacity: 0, y: 22 },
      whileInView:{ opacity: 1, y: 0 },
      viewport:   { once: true, margin: "-80px 0px" } as const,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: revealDelay },
    };

    return (
      <motion.div
        key={block.id}
        className={isTwoCol && block.noContainer ? "sc-full-span" : undefined}
        style={{ marginBottom: isTwoCol ? 0 : 80 }}
        {...revealProps}
      >
        {/* Block label (e.g. "About Page") */}
        {block.label && (
          <p style={{
            fontFamily: mono, fontSize: 10, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--text-secondary)",
            marginBottom: 14, marginTop: 0,
          }}>
            {block.label}
          </p>
        )}

        {/* ── before-after ── */}
        {block.layout === "before-after" ? (
          <>
            {block.phoneScroll ? (
              /* Scrollable phone mockups */
              <div className="sc-phone-frames">
                <div>
                  <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 10 }}>Before</p>
                  {block.beforeSrc
                    ? <PhoneFrame src={block.beforeSrc} alt={`${block.label ?? "Before"} — Before`} priority={priority} />
                    : <div style={{ width: 248, height: 480, borderRadius: 22, border: "1px dashed var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", opacity: 0.4 }}>Before</span></div>
                  }
                </div>
                <div>
                  <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>After</p>
                  {block.afterSrc
                    ? <PhoneFrame src={block.afterSrc} alt={`${block.label ?? "After"} — After`} />
                    : <div style={{ width: 248, height: 480, borderRadius: 22, border: "1px dashed var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", opacity: 0.4 }}>After</span></div>
                  }
                </div>
              </div>
            ) : (
              /* Desktop before/after — wider before panel, no card boxes */
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-start" }}>
                {/* Before */}
                <div className="sc-before-panel" style={{ flexShrink: 0, width: 280 }}>
                  <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 10 }}>Before</p>
                  <div style={{ ...imgClip, position: "relative", aspectRatio: block.beforeSrc ? undefined : "9/16", minHeight: block.beforeSrc ? undefined : 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {block.beforeSrc ? (
                      <Image src={block.beforeSrc} alt={`${block.label ?? block.caption} — Before`}
                        fill sizes="(max-width: 600px) 280px, 280px" priority={priority} style={{ objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", opacity: 0.4 }}>Before</span>
                    )}
                  </div>
                </div>
                {/* After */}
                <div style={{ flex: 1, minWidth: 280 }}>
                  <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>After</p>
                  <div style={{ ...imgClip, ...(block.afterSrc ? {} : { minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }) }}>
                    {block.afterSrc ? (
                      <Image src={block.afterSrc} alt={`${block.label ?? block.caption} — After`}
                        width={0} height={0} sizes="(max-width: 768px) calc(100vw - 48px), 700px"
                        priority={priority} style={{ width: "100%", height: "auto", display: "block" }} />
                    ) : (
                      <span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", opacity: 0.4 }}>After</span>
                    )}
                  </div>
                </div>
              </div>
            )}
            <Caption text={block.caption} />
          </>

        ) : block.layout === "screen-grid" ? (
          /* Phone screen grid — staggered labels, no card border */
          <>
            <div className="sc-screen-grid">
              {(block.screens ?? []).map((screen, idx) => (
                <motion.div
                  key={screen.src}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: shouldReduceMotion ? 0 : idx * 0.06 }}
                >
                  <span aria-hidden="true" style={{
                    fontFamily: mono, fontSize: 10, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "var(--accent)", opacity: 0.7,
                  }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div style={{ ...imgClip, width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)" }}>
                    <Image src={screen.src} alt={`${screen.label} screen`}
                      width={0} height={0}
                      sizes="(max-width: 768px) 100vw, 240px"
                      priority={priority && idx === 0}
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                  <span style={{
                    fontFamily: mono, fontSize: 10, letterSpacing: "0.06em",
                    textTransform: "uppercase", color: "var(--text-secondary)",
                    textAlign: "center", lineHeight: 1.4,
                  }}>
                    {screen.label}
                  </span>
                </motion.div>
              ))}
            </div>
            <Caption text={block.caption} />
          </>

        ) : block.layout === "side-by-side" ? (
          /* Two images — no card chrome, shadow + shared bottom caption row */
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={imgClip}>
                {block.imageSrc ? (
                  <Image src={block.imageSrc} alt={block.caption}
                    width={0} height={0}
                    sizes="(max-width: 768px) calc(100vw - 48px), 530px"
                    priority={priority}
                    style={{ width: "100%", height: "auto", display: "block" }} />
                ) : (
                  <div style={{ aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--card-bg)" }}>
                    <span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", opacity: 0.4 }}>Image</span>
                  </div>
                )}
              </div>
              <Caption text={block.caption} secondary />
            </div>

            {block.imageSrc2 && (
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={imgClip}>
                  <Image src={block.imageSrc2} alt={block.caption2 ?? block.caption}
                    width={0} height={0}
                    sizes="(max-width: 768px) calc(100vw - 48px), 530px"
                    style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                {block.caption2 && <Caption text={block.caption2} secondary />}
              </div>
            )}
          </div>

        ) : (
          /* Wide / full-bleed — or phone mockup */
          <>
            {block.phoneScroll && block.imageSrc ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <PhoneFrame src={block.imageSrc} alt={block.caption} priority={priority} />
              </div>
            ) : (
              <div style={{
                width: "100%",
                ...imgClip,
                // noContainer: let logos/hero images sit on page bg without shadow box
                ...(block.noContainer ? { boxShadow: "none", borderRadius: 12 } : {}),
                ...(block.imageSrc ? {} : { aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--card-bg)" }),
              }}>
                {block.imageSrc ? (
                  <Image
                    src={block.imageSrc}
                    alt={block.caption}
                    width={0}
                    height={0}
                    sizes={isTwoCol
                      ? "(max-width: 700px) 100vw, (max-width: 1160px) 50vw, 560px"
                      : "(max-width: 1160px) 100vw, 1160px"
                    }
                    priority={priority}
                    style={{
                      width: "100%", height: "auto", display: "block",
                      borderRadius: block.noContainer ? 12 : 0,
                      ...(block.blendMode ? { mixBlendMode: block.blendMode as React.CSSProperties["mixBlendMode"] } : {}),
                    }}
                  />
                ) : (
                  <span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", opacity: 0.4 }}>Image</span>
                )}
              </div>
            )}
            <Caption text={block.caption} />
          </>
        )}
      </motion.div>
    );
  };

  const metaItems = [
    { label: "Role",     value: data.role ?? "" },
    { label: "Team",     value: data.team ?? "" },
    { label: "Company",  value: project.company },
    { label: "Timeline", value: data.snapshot?.timeline ?? project.year },
    ...(data.snapshot?.tools ? [{ label: "Tools", value: data.snapshot.tools }] : []),
  ];

  return (
    <>
    {/* Responsive overrides */}
    <style dangerouslySetInnerHTML={{ __html: `
      .sc-screen-grid { display: grid; gap: 16px; margin-bottom: 12px; grid-template-columns: repeat(2, 1fr); }
      @media (min-width: 640px) { .sc-screen-grid { grid-template-columns: repeat(4, 1fr); } }
      .sc-before-panel { flex-shrink: 0; }
      @media (max-width: 600px) { .sc-before-panel { flex-shrink: 1; flex: 1; min-width: 0; } .sc-before-panel-inner { width: 100% !important; max-width: 240px; margin: 0 auto; } }
      .sc-phone-scroll::-webkit-scrollbar { display: none; }
      .sc-phone-frames { display: flex; gap: 40px; flex-wrap: wrap; align-items: flex-start; margin-bottom: 12px; }
      @media (max-width: 580px) { .sc-phone-frames { justify-content: center; } }
      .sc-vblocks-2col { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
      @media (max-width: 700px) { .sc-vblocks-2col { grid-template-columns: 1fr; } }
      .sc-vblocks-2col .sc-full-span { grid-column: 1 / -1; }
      .sc-meta-row { display: flex; justify-content: space-between; gap: 16px; }
      @media (max-width: 640px) { .sc-meta-row { flex-direction: column; align-items: flex-start; } }
      .sc-metric-row { display: flex; justify-content: space-between; gap: 16px; align-items: baseline; }
      @media (max-width: 640px) { .sc-metric-row { flex-direction: column; align-items: flex-start; } }
    ` }} />
    <div
      suppressHydrationWarning
      style={{
        ...(theme as React.CSSProperties),
        backgroundColor: "var(--bg)",
        minHeight: "100vh",
        color: "var(--text-primary)",
        transition: "background-color 0.4s ease",
      }}
    >
      {/* ── Nav — matches Portfolio.tsx exactly ── */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(24px, 5vw, 64px)",
          height: 60,
          backgroundColor: scrolled
            ? "var(--nav-bg-scrolled)"
            : (dark ? "rgba(9,9,14,0.72)" : "rgba(248,247,242,0.72)"),
          backdropFilter: "blur(20px) saturate(1.6)",
          borderBottom: "1px solid var(--border)",
          transition: "background-color 0.35s ease, border-color 0.35s ease",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: serif, fontSize: 17, fontWeight: 400,
            color: "var(--text-primary)", textDecoration: "none", letterSpacing: "-0.01em",
          }}
        >
          Jinju Park
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 28, height: "100%" }}>
          {(["Work", "Lab", "About", "Contact"] as const).map((label) => (
            <a
              key={label}
              href={`/#${label.toLowerCase()}`}
              style={{
                fontFamily: mono, fontSize: 11, letterSpacing: "0.07em",
                textTransform: "uppercase", color: "var(--text-secondary)",
                textDecoration: "none", transition: "color 0.2s",
                display: "flex", alignItems: "center", height: "100%",
                padding: "0 4px", borderRadius: 2,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)";
                (e.currentTarget as HTMLElement).style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                (e.currentTarget as HTMLElement).style.outline = "none";
              }}
            >
              {label}
            </a>
          ))}

          <button
            onClick={handleToggle}
            aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "var(--card-bg)", border: "1px solid var(--border)",
              borderRadius: 20, padding: "5px 13px", cursor: "pointer",
              fontFamily: mono, fontSize: 10, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "var(--text-secondary)",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            onFocus={(e) => {
              (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)";
              (e.currentTarget as HTMLElement).style.outlineOffset = "2px";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLElement).style.outline = "none";
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 10, height: 10, borderRadius: "50%",
                background: dark
                  ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                  : "linear-gradient(135deg, #1e1b4b, #4338ca)",
                transition: "background 0.4s ease",
              }}
            />
            {dark ? "light" : "dark"}
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div
        style={{
          paddingTop: 60,
          background: `linear-gradient(${project.gradient})`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        {/* ── Per-case hero background accents ── */}
        {project.id === "just-intelligence" && <RulerLines />}
        {project.id === "just-rebrand"       && <GridAssembly accent="#1A6678" />}
        {project.id === "storycorps"          && <WarmVignette accent="#D4521A" />}
        {project.id === "netflix-disney"      && <ScriptWeightStrip />}
        {/* Bottom fade */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
          background: `linear-gradient(transparent, var(--bg))`, pointerEvents: "none",
        }} />

        <motion.div
          variants={heroContainer}
          custom={shouldReduceMotion}
          initial="hidden"
          animate="visible"
          style={{
            position: "relative", zIndex: 1,
            maxWidth: 1160, margin: "0 auto",
            padding: "80px clamp(24px, 6vw, 96px) 100px",
          }}
        >
          <motion.div variants={heroItem(shouldReduceMotion)}>
            <Link
              href="/#work"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: mono, fontSize: 11, letterSpacing: "0.06em",
                textTransform: "uppercase", color: "rgba(237,234,227,0.5)",
                textDecoration: "none", marginBottom: 24,
                transition: "color 0.2s", borderRadius: 2,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(237,234,227,0.9)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(237,234,227,0.5)"; }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(237,234,227,0.9)";
                (e.currentTarget as HTMLElement).style.outline = "2px solid rgba(237,234,227,0.5)";
                (e.currentTarget as HTMLElement).style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(237,234,227,0.5)";
                (e.currentTarget as HTMLElement).style.outline = "none";
              }}
            >
              ← All work
            </Link>
          </motion.div>

          <motion.div variants={heroItem(shouldReduceMotion)} style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: mono, fontSize: 10, letterSpacing: "0.06em",
                  textTransform: "uppercase", padding: "4px 12px",
                  borderRadius: 20, border: "1px solid rgba(237,234,227,0.3)",
                  color: "rgba(237,234,227,0.85)", background: "rgba(0,0,0,0.22)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={heroItem(shouldReduceMotion)}
            style={{
              fontFamily: serif,
              fontSize: "clamp(48px, 7vw, 96px)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#EDEAE3",
              marginBottom: 12,
            }}
          >
            {project.title}
          </motion.h1>
          <motion.p variants={heroItem(shouldReduceMotion)} style={{ fontFamily: sans, fontSize: 18, color: "rgba(237,234,227,0.6)", marginBottom: (data.heroLede || data.heroIntro) ? 28 : 0 }}>
            {project.subtitle}
          </motion.p>
          {/* heroLede — punchy 1-sentence opener, display-weight Gloock at near-full opacity */}
          {data.heroLede && (
            <motion.p
              variants={heroItem(shouldReduceMotion)}
              style={{
                fontFamily: serif,
                fontSize: "clamp(20px, 2.2vw, 28px)",
                fontWeight: 400,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                color: "rgba(237,234,227,0.92)",
                maxWidth: 680,
                marginBottom: data.heroIntro ? 16 : 0,
                marginTop: 0,
              }}
            >
              {data.heroLede}
            </motion.p>
          )}
          {/* heroIntro — supporting paragraphs, smaller + reduced opacity */}
          {data.heroIntro && (
            <motion.p variants={heroItem(shouldReduceMotion)} style={{ fontFamily: sans, fontSize: 15, lineHeight: 1.75, color: "rgba(237,234,227,0.62)", maxWidth: 600, marginBottom: 0, marginTop: 0 }}>
              {data.heroIntro}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 6vw, 96px)" }}>

        {/* Meta strip */}
        {isNarrative ? (
          <div style={{ maxWidth: 760, margin: "0 auto 80px" }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card-bg)", overflow: "hidden" }}>
              <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--border)" }}>
                <p style={sectionLabelSecondaryStyle(4)}>Project Snapshot</p>
              </div>
              {metaItems.map((item, idx) => (
                <div
                  key={item.label}
                  className="sc-meta-row"
                  style={{
                    padding: "14px 22px",
                    borderTop: idx === 0 ? "none" : "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>
                    {item.label}
                  </span>
                  <span style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 520 }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 1,
              borderBottom: "1px solid var(--border)",
              marginBottom: 80,
            }}
          >
            {metaItems.map((item) => (
              <div key={item.label} style={{ padding: "28px 0 28px", borderRight: "1px solid var(--border)" }}>
                <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {isNarrative && leadVisual && (
          <div style={{ marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(20)}>{data.leadVisualHeader ?? "Shipped Output"}</h2>
            {renderVisualBlock(leadVisual, { twoCol: false, priority: true })}
          </div>
        )}

        {/* Thumbnail + Challenge */}
        {isNarrative ? (
          <div style={{ maxWidth: 760, margin: "0 auto 100px" }}>
            <h2 style={sectionLabelStyle(20)}>The Challenge</h2>
            <p style={{ fontFamily: serif, fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.7, color: "var(--text-primary)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              {data.challenge}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px, 6vw, 96px)",
              alignItems: "center",
              marginBottom: 100,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
              <ProjectThumbnail project={project} />
            </div>

            <div>
              <h2 style={sectionLabelStyle(20)}>The Challenge</h2>
              <p style={{ fontFamily: serif, fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65, color: "var(--text-primary)", fontWeight: 400, letterSpacing: "-0.01em" }}>
                {data.challenge}
              </p>
            </div>
          </div>
        )}

        {/* Approach */}
        <div style={{ maxWidth: 760, margin: "0 auto 80px" }}>
          <h2 style={sectionLabelStyle(20)}>My Approach</h2>
          <p style={{ fontFamily: sans, fontSize: 17, lineHeight: 1.75, color: "var(--text-secondary)" }}>
            {data.approach}
          </p>
        </div>

        {/* What I Was Responsible For */}
        {data.whatIDid && (
          <div style={{ maxWidth: 760, margin: "0 auto 80px" }}>
            <h2 style={sectionLabelStyle(20)}>What I Was Responsible For</h2>
            <p style={{ fontFamily: sans, fontSize: 17, lineHeight: 1.75, color: "var(--text-secondary)" }}>
              {data.whatIDid}
            </p>
          </div>
        )}

        {/* ── Per-case supplement after whatIDid ── */}
        {project.id === "just-rebrand" && (
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <GapLedger />
          </div>
        )}
        {project.id === "iata" && (
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <WeChatPrimer />
          </div>
        )}

        {/* Process — staged system narrative */}
        <div style={{ marginBottom: 100 }}>
          <h2 style={sectionLabelSecondaryStyle(40)}>How It Got Built</h2>
          {(() => {
            const titles = data.processTitles ?? {};
            const steps = [
              { key: "discover", title: titles.discover ?? "Discover", icon: "◎", items: data.process?.discover ?? [] },
              { key: "design",   title: titles.design   ?? "Design",   icon: "◈", items: data.process?.design   ?? [] },
              { key: "ship",     title: titles.ship     ?? "Ship",     icon: "◆", items: data.process?.ship     ?? [] },
              ...(data.process?.govern && data.process.govern.length > 0
                ? [{ key: "govern", title: titles.govern ?? "Govern", icon: "◐", items: data.process.govern }]
                : []),
            ];
            const useStacked = processLayout === "stacked";

            return (
              <>
                {!useStacked && steps.length > 3 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
                    {steps.map((step, idx) => (
                      <div
                        key={`process-chip-${step.key}`}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "6px 14px",
                          border: "1px solid var(--border)",
                          borderRadius: 999,
                          background: "var(--card-bg)",
                        }}
                      >
                        <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.08em", color: "var(--accent)" }}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
                          {step.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {useStacked ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 760, margin: "0 auto" }}>
                    {steps.map((step, idx) => (
                      <div
                        key={step.key}
                        style={{
                          border: "1px solid var(--border)",
                          borderRadius: 16,
                          padding: "20px 22px",
                          background: "var(--card-bg)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                          <div
                            aria-hidden="true"
                            style={{
                              width: 32, height: 32, borderRadius: "50%",
                              border: "1px solid var(--accent)",
                              background: "var(--accent-muted)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontFamily: serif, fontSize: 14, color: "var(--accent)",
                            }}
                          >
                            {step.icon}
                          </div>
                          <span aria-hidden="true" style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h3 style={{ fontFamily: serif, fontSize: 22, fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)", margin: 0 }}>
                            {step.title}
                          </h3>
                        </div>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }} role="list">
                          {step.items.map((item, itemIdx) => (
                            <li
                              key={`${step.key}-item-${itemIdx}`}
                              style={{
                                fontFamily: sans, fontSize: 14, color: "var(--text-secondary)",
                                lineHeight: 1.7, padding: "6px 0",
                                display: "flex", alignItems: "flex-start", gap: 8,
                              }}
                            >
                              <span aria-hidden="true" style={{ color: "var(--accent)", fontSize: 10, marginTop: 5, flexShrink: 0 }}>▸</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "clamp(20px, 3vw, 48px)" }}>
                    {steps.map((step, idx) => (
                      <div key={step.key}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                          <div
                            aria-hidden="true"
                            style={{
                              width: 36, height: 36, borderRadius: "50%",
                              border: "1px solid var(--accent)",
                              background: "var(--accent-muted)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontFamily: serif, fontSize: 16, color: "var(--accent)",
                            }}
                          >
                            {step.icon}
                          </div>
                          <span aria-hidden="true" style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)", marginBottom: 16, marginTop: 0 }}>
                          {step.title}
                        </h3>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }} role="list">
                          {step.items.map((item, itemIdx) => (
                            <li
                              key={`${step.key}-item-${itemIdx}`}
                              style={{
                                fontFamily: sans, fontSize: 14, color: "var(--text-secondary)",
                                lineHeight: 1.6, padding: "5px 0",
                                display: "flex", alignItems: "flex-start", gap: 8,
                              }}
                            >
                              <span aria-hidden="true" style={{ color: "var(--accent)", fontSize: 10, marginTop: 4, flexShrink: 0 }}>▸</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>

        {/* ── Tech & Tools — after Process so tools are contextualised by the decisions that used them ── */}
        {data.tech && data.tech.length > 0 && (
          <div style={{ marginBottom: 80 }}>
            <h2 style={sectionLabelSecondaryStyle(20)}>Tech &amp; Tools</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: mono, fontSize: 11, letterSpacing: "0.04em",
                    padding: "6px 14px",
                    border: "1px solid var(--border)", borderRadius: 20,
                    color: "var(--text-secondary)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Design Decisions */}
        {data.keyDecisions && data.keyDecisions.length > 0 && (
          <div style={{ marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(32)}>{data.keyDecisionsLabel ?? "Key Design Decisions"}</h2>
            <div
              style={{
                ...(keyDecisionsLayout === "stacked"
                  ? { display: "flex", flexDirection: "column", gap: 16, maxWidth: 760, margin: "0 auto" }
                  : {
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                      gap: 0,
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      overflow: "hidden",
                    }),
              }}
              role="list"
            >
              {data.keyDecisions.map((decision, i) => (
                <div
                  key={`decision-${i}`}
                  role="listitem"
                  style={{
                    padding: keyDecisionsLayout === "stacked" ? "22px 24px" : "32px 28px",
                    background: "var(--card-bg)",
                    border: keyDecisionsLayout === "stacked" ? "1px solid var(--border)" : undefined,
                    borderRadius: keyDecisionsLayout === "stacked" ? 12 : 0,
                    borderRight: keyDecisionsLayout === "stacked" ? undefined : "1px solid var(--border)",
                    borderBottom: keyDecisionsLayout === "stacked" ? undefined : "1px solid var(--border)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      display: "block",
                      fontFamily: mono, fontSize: 11, letterSpacing: "0.08em",
                      color: "var(--accent)", marginBottom: 12,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p style={{ fontFamily: sans, fontSize: 15, lineHeight: 1.65, color: "var(--text-primary)", margin: 0 }}>
                    {decision}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Per-case supplement after keyDecisions ── */}
        {project.id === "just-intelligence" && (
          <TokenDepthViz />
        )}
        {project.id === "storycorps" && (
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <RecoveryFlowchart accent="#D4521A" />
          </div>
        )}
        {project.id === "netflix-disney" && (
          <SpecimenGrid />
        )}
        {project.id === "iata" && (
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <BeforeAfterReveal />
          </div>
        )}

        {/* Visual Blocks */}
        {visualBlocksMain.length > 0 && (
          <div style={{ marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(40)}>{data.visualBlocksHeader ?? "What Got Redesigned"}</h2>

            {/* 2-column grid wrapper for Netflix-style layouts */}
            <div className={data.visualBlocksColumns === 2 ? "sc-vblocks-2col" : undefined}>
              {visualBlocksMain.map((block, blockIndex) =>
                renderVisualBlock(block, { priority: !leadVisual && blockIndex === 0, index: blockIndex })
              )}
            </div>
          </div>
        )}

        {/* Results — single row, equal-height cards */}
        {data.metrics && data.metrics.length > 0 && (
          <div style={{ marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(32)}>Results</h2>
            {/* just-intelligence: animated stats counter */}
            {project.id === "just-intelligence" ? (
              <StatsCounter metrics={data.metrics} />
            ) : isNarrative ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 760, margin: "0 auto" }}>
                {data.metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      padding: "16px 20px",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      background: "var(--card-bg)",
                    }}
                  >
                    <div className="sc-metric-row">
                      <div style={{ fontFamily: serif, fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.1, color: "var(--accent)" }}>
                        {m.value}
                      </div>
                      <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
                        {m.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Standard layout: no card chrome — numbers sit exposed on the page bg.
                 Card borders were competing with the numbers for visual weight; the grid
                 holds them in position, accent color + Gloock provide all the structure needed. */
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0, borderTop: "1px solid var(--border)" }}>
                {data.metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      padding: "32px 28px",
                      borderRight: "1px solid var(--border)",
                      borderBottom: "1px solid var(--border)",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontFamily: serif, fontSize: "clamp(40px, 4vw, 56px)", lineHeight: 1, color: "var(--accent)", marginBottom: 10 }}>
                      {m.value}
                    </div>
                    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* What Changed (outcomes) */}
        {data.outcomes && data.outcomes.length > 0 && (
          <div style={{ maxWidth: 760, margin: "0 auto 100px" }}>
            <h2 style={sectionLabelStyle(24)}>What Changed</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }} role="list">
              {data.outcomes.map((outcome, i) => (
                <li
                  key={`outcome-${i}`}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "12px 0", borderBottom: "1px solid var(--border)",
                    fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6,
                  }}
                >
                  <span aria-hidden="true" style={{ color: "var(--accent)", fontSize: 10, marginTop: 4, flexShrink: 0 }}>▸</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Code Blocks — code + preview pairs ── */}
        {data.codeBlocks && data.codeBlocks.length > 0 && (
          <div style={{ marginBottom: 80 }}>
            <p style={sectionLabelStyle(32)}>{data.codeBlocksHeader ?? "In Code"}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {data.codeBlocks.map((block) => (
                <div key={block.id}>
                  {/* Title + description */}
                  <p style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.06em", color: "var(--text-primary)", marginBottom: 6, fontWeight: 500 }}>
                    {block.title}
                  </p>
                  <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20, maxWidth: 640 }}>
                    {block.description}
                  </p>
                  {/* Code + preview layout */}
                  {(() => {
                    const hasPreview = Boolean(block.previewHtml || block.previewSrc);
                    const hasCode    = Boolean((block.files && block.files.length > 0) || block.code);
                    const stackPanels = isNarrative && hasPreview;
                    const codePanel = hasCode ? (() => {
                      // Normalise to a files array — single-file blocks get one entry
                      const files: CodeFile[] = block.files && block.files.length > 0
                        ? block.files
                        : [{ label: (block.language ?? "code").toUpperCase(), code: block.code ?? "", language: block.language ?? "html" }];
                      const activeIdx  = activeFileTabs[block.id] ?? 0;
                      const activeFile = files[Math.min(activeIdx, files.length - 1)];
                      return (
                        <div style={{
                          background: dark ? "#0d1117" : "#1e1e2e",
                          borderRadius: 12, overflow: "hidden",
                          border: "1px solid rgba(255,255,255,0.07)",
                          display: "flex", flexDirection: "column",
                          height: 500,
                        }}>
                          {/* Tab bar */}
                          <div style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                            background: "rgba(255,255,255,0.03)",
                            flexShrink: 0,
                          }}>
                            {/* File tabs */}
                            <div style={{ display: "flex" }}>
                              {files.map((f, i) => {
                                const isActive = i === activeIdx;
                                return (
                                  <button
                                    key={f.label}
                                    onClick={() => setActiveFileTabs(prev => ({ ...prev, [block.id]: i }))}
                                    style={{
                                      fontFamily: mono, fontSize: 10, letterSpacing: "0.08em",
                                      textTransform: "uppercase",
                                      padding: "10px 16px",
                                      background: "transparent", border: "none",
                                      borderBottom: isActive ? "2px solid #F5A623" : "2px solid transparent",
                                      color: isActive ? "#cdd6f4" : "rgba(255,255,255,0.3)",
                                      cursor: "pointer",
                                      transition: "color 0.15s",
                                    }}
                                  >
                                    {f.label}
                                  </button>
                                );
                              })}
                            </div>
                            {/* Traffic lights */}
                            <div style={{ display: "flex", gap: 6, padding: "0 16px" }}>
                              {["#ff5f57","#febc2e","#28c840"].map((c) => (
                                <span key={c} aria-hidden="true" style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
                              ))}
                            </div>
                          </div>
                          {/* Active file code */}
                          <pre style={{
                            fontFamily: mono, fontSize: 12, lineHeight: 1.7,
                            color: "#cdd6f4", padding: "20px",
                            margin: 0, overflowX: "auto", overflowY: "auto", whiteSpace: "pre",
                            flex: 1, minHeight: 0,
                          }}>
                            <CodeHighlight code={activeFile.code} language={activeFile.language} />
                          </pre>
                        </div>
                      );
                    })() : null;

                    const previewPanel = hasPreview ? (
                      <div style={{
                        borderRadius: 12, overflow: "hidden",
                        border: "1px solid var(--border)",
                        background: "var(--card-bg)",
                        display: "flex", alignItems: "stretch",
                        height: 500,
                      }}>
                        {block.previewHtml ? (
                          <iframe
                            srcDoc={block.previewHtml}
                            title={`${block.title} preview`}
                            style={{ width: "100%", border: "none", display: "block", height: "100%" }}
                            sandbox="allow-same-origin"
                          />
                        ) : block.previewSrc ? (
                          <Image
                            src={block.previewSrc}
                            alt={`${block.title} preview`}
                            width={0} height={0}
                            sizes="(max-width: 1160px) 100vw, 560px"
                            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                          />
                        ) : null}
                      </div>
                    ) : null;

                    const liveLink = block.liveUrl ? (
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                        <a
                          href={block.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            fontFamily: mono,
                            fontSize: 10,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--text-tertiary)",
                            textDecoration: "none",
                            padding: "5px 12px",
                            border: "1px solid var(--border)",
                            borderRadius: 6,
                          }}
                        >
                          View Live ↗
                        </a>
                      </div>
                    ) : null;

                    // Preview-only block (no code) → full-width preview panel
                    if (!hasCode) {
                      return <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>{previewPanel}{liveLink}</div>;
                    }

                    return (
                      <>
                        <div
                          style={{
                            ...(stackPanels
                              ? { display: "flex", flexDirection: "column", gap: 16 }
                              : { display: "grid", gridTemplateColumns: hasPreview ? "1fr 1fr" : "1fr", gap: 16 }),
                          }}
                        >
                          {stackPanels ? previewPanel : codePanel}
                          {stackPanels ? codePanel : previewPanel}
                        </div>
                        {liveLink}
                      </>
                    );
                  })()}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Reflection — after code evidence so it reads as earned wisdom ── */}
        {data.reflection && (
          <div style={{ maxWidth: 960, margin: "0 auto 100px" }}>
            <h2 style={sectionLabelStyle(20)}>Reflection</h2>
            <blockquote style={{
              fontFamily: serif,
              fontSize: "clamp(18px, 1.7vw, 24px)",
              lineHeight: 1.6,
              color: "var(--text-primary)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              borderLeft: "4px solid var(--accent)",
              padding: "32px 36px",
              background: "var(--accent-muted)",
              borderRadius: 8,
              margin: 0,
            }}>
              {data.reflection}
            </blockquote>
          </div>
        )}

        {/* Phase 2 teaser */}
        {data.phase2Teaser && (
          <div style={{ marginBottom: 80 }}>
            {/* Divider with Phase 1 label */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-tertiary)", whiteSpace: "nowrap" }}>
                Phase 1 — Complete
              </span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>
            {/* Phase 2 card */}
            <div style={{
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "32px 36px",
              background: "var(--card-bg)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
                Phase 2 — In Preparation
              </span>
              <p style={{ fontFamily: serif, fontSize: "clamp(17px, 2vw, 20px)", color: "var(--text-secondary)", lineHeight: 1.65, fontWeight: 400, margin: 0, maxWidth: 640 }}>
                {data.phase2Teaser}
              </p>
            </div>
          </div>
        )}

        {/* CTA — peak-end: the emotional high point before the reader navigates away */}
        <div
          style={{
            textAlign: "center",
            padding: "64px 0 80px",
          }}
        >
          <p style={{ fontFamily: serif, fontSize: "clamp(24px, 3.5vw, 40px)", color: "var(--text-primary)", marginBottom: 24, fontWeight: 400, letterSpacing: "-0.01em" }}>
            {data.ctaText ?? "Interested in working together?"}
          </p>
          <Link
            href="/#contact"
            style={{
              display: "inline-block",
              fontFamily: sans, fontSize: 14, fontWeight: 500,
              color: dark ? "#09090E" : "#ffffff",
              background: "var(--accent)",
              padding: "12px 28px", borderRadius: 8,
              textDecoration: "none",
              transition: "opacity 0.2s, transform 0.2s",
              transform: "translateY(0)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.85";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 2px var(--bg), 0 0 0 4px var(--text-primary)";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "";
            }}
          >
            Get in touch →
          </Link>
        </div>

        {/* ── Footer nav — after the CTA so navigation doesn't compete with the peak moment ── */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 64 }}>
          <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 16 }}>
            All Projects
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", rowGap: 8, marginBottom: 32 }}>
            {projects.map((p, i) => (
              <span key={p.id} style={{ display: "inline-flex", alignItems: "center" }}>
                {i > 0 && (
                  <span aria-hidden="true" style={{ color: "var(--border)", padding: "0 14px", userSelect: "none", fontSize: 11 }}>
                    /
                  </span>
                )}
                <a
                  href={`/work/${p.id}`}
                  aria-current={p.id === project.id ? "page" : undefined}
                  style={{
                    fontFamily: mono, fontSize: 11, letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: p.id === project.id ? "var(--text-primary)" : "var(--text-tertiary)",
                    fontWeight: p.id === project.id ? 500 : 400,
                    textDecoration: "none",
                    borderBottom: `1px solid ${p.id === project.id ? "var(--text-primary)" : "transparent"}`,
                    paddingBottom: 2,
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (p.id !== project.id) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                      (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--text-tertiary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (p.id !== project.id) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
                      (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
                    }
                  }}
                >
                  {p.title}
                </a>
              </span>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            {prevProject ? (
              <a
                href={`/work/${prevProject.id}`}
                style={{
                  fontFamily: sans, fontSize: 16, color: "var(--text-secondary)",
                  textDecoration: "none", display: "flex", flexDirection: "column", gap: 4,
                  transition: "color 0.2s", borderRadius: 2,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)";
                  (e.currentTarget as HTMLElement).style.outlineOffset = "4px";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.outline = "none";
                }}
              >
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>← Previous</span>
                {prevProject.title}
              </a>
            ) : <span />}
            {nextProject ? (
              <a
                href={`/work/${nextProject.id}`}
                style={{
                  fontFamily: sans, fontSize: 16, color: "var(--text-secondary)",
                  textDecoration: "none", display: "flex", flexDirection: "column", gap: 4,
                  textAlign: "right", transition: "color 0.2s", borderRadius: 2,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)";
                  (e.currentTarget as HTMLElement).style.outlineOffset = "4px";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.outline = "none";
                }}
              >
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>Next →</span>
                {nextProject.title}
              </a>
            ) : <span />}
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
