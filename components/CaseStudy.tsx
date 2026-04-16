"use client";

import React, { useState, useEffect, useRef } from "react";
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
const sans = "'Red Hat Text', system-ui, sans-serif";

// ── Phase 2 Teaser — extracted to avoid infinite re-render from inline useState ──
function Phase2Briefing({ teaser, url, shouldReduceMotion }: { teaser: string; url: string; shouldReduceMotion: boolean | null }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const teaserParts: { text: string; redact: boolean; delay: number }[] = (() => {
    const redactions = [
      { word: "platform", delay: 0 },
      { word: "rebranded", delay: 70 },
      { word: "real user usage patterns", delay: 140 },
      { word: "fresh stakeholder feedback", delay: 210 },
    ];
    let remaining = teaser;
    const parts: { text: string; redact: boolean; delay: number }[] = [];
    for (const r of redactions) {
      const idx = remaining.toLowerCase().indexOf(r.word.toLowerCase());
      if (idx === -1) continue;
      if (idx > 0) parts.push({ text: remaining.slice(0, idx), redact: false, delay: 0 });
      parts.push({ text: remaining.slice(idx, idx + r.word.length), redact: true, delay: r.delay });
      remaining = remaining.slice(idx + r.word.length);
    }
    if (remaining) parts.push({ text: remaining, redact: false, delay: 0 });
    return parts;
  })();

  return (
    <Link href={url} style={{ textDecoration: "none", display: "block" }}>
      <motion.div
        onMouseEnter={() => setIsRevealed(true)}
        onMouseLeave={() => setIsRevealed(false)}
        onFocus={() => setIsRevealed(true)}
        onBlur={() => setIsRevealed(false)}
        onTouchStart={() => setIsRevealed(true)}
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px 0px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: 760,
          margin: "0 auto 80px",
          padding: "28px 0 28px 24px",
          position: "relative",
          cursor: "pointer",
        }}
      >
        {/* Left accent border — grows on hover */}
        <motion.div
          aria-hidden="true"
          animate={{ scaleY: isRevealed ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: 2,
            background: "var(--accent)",
            transformOrigin: "top",
          }}
        />

        {/* Classification label + version indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span
            style={{
              fontFamily: mono, fontSize: 11, letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: isRevealed ? "var(--accent)" : "var(--text-tertiary)",
              transition: "color 0.3s ease",
            }}
          >
            {isRevealed ? "Declassified" : "Classified"} // Sequel
          </span>
          <span style={{
            fontFamily: mono, fontSize: 11, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--accent)",
            background: "var(--accent-muted)",
            padding: "2px 8px", borderRadius: 2,
          }}>
            v2 Launched
          </span>
        </div>

        {/* Redacted paragraph */}
        <p style={{
          fontFamily: sans, fontSize: 16,
          color: "var(--text-secondary)",
          lineHeight: 1.75, marginBottom: 18,
        }}>
          {teaserParts.map((part, i) => {
            if (!part.redact) return <span key={i}>{part.text}</span>;
            return (
              <span key={i} style={{ position: "relative", display: "inline", cursor: "pointer" }}>
                <span
                  style={{
                    position: "relative", zIndex: 1,
                    opacity: isRevealed ? 1 : 0,
                    transition: `opacity 0.3s ease ${shouldReduceMotion ? 0 : part.delay}ms`,
                  }}
                >
                  {part.text}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "1px -3px",
                    background: "var(--text-primary)",
                    borderRadius: 1,
                    transformOrigin: "left",
                    pointerEvents: "none",
                    opacity: isRevealed ? 0 : 1,
                    transform: isRevealed ? "scaleX(0.97)" : "scaleX(1)",
                    transition: `opacity 0.25s ease ${shouldReduceMotion ? 0 : part.delay}ms, transform 0.25s ease ${shouldReduceMotion ? 0 : part.delay}ms`,
                  }}
                />
              </span>
            );
          })}
        </p>

        {/* CTA line */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: mono, fontSize: 11,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: isRevealed ? "var(--accent)" : "var(--text-tertiary)",
              transition: "color 0.3s ease",
            }}
          >
            {isRevealed ? "Read full briefing" : "Hover to declassify"}
          </span>
          <span
            style={{
              fontFamily: mono, fontSize: 12,
              color: "var(--accent)",
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateX(4px)" : "translateX(0)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            →
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

// ── Approach — scroll-linked word emphasis (extracted to avoid inline useState remount) ──
function ApproachReveal({ approach, approachHeader, shouldReduceMotion, sectionLabelStyle }: { approach: string; approachHeader?: string; shouldReduceMotion: boolean | null; sectionLabelStyle: (mb: number) => React.CSSProperties }) {
  const elRef = useRef<HTMLDivElement>(null);
  const [scrollProg, setScrollProg] = useState(0);
  const approachWords = approach.split(/(\s+)/);

  useEffect(() => {
    if (shouldReduceMotion) { setScrollProg(1); return; }
    const el = elRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh * 0.8 - rect.top) / (vh * 0.55);
      setScrollProg(Math.max(0, Math.min(1, raw)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldReduceMotion]);

  return (
    <div ref={elRef} style={{ maxWidth: 760, margin: "0 auto 80px" }}>
      <h2 style={sectionLabelStyle(20)}>{approachHeader ?? "The Thinking"}</h2>
      <p style={{
        fontFamily: sans,
        fontSize: "clamp(16px, 1.4vw, 18px)",
        lineHeight: 1.8,
        margin: 0,
      }}>
        {approachWords.map((w, i) => {
          const wordProgress = scrollProg * approachWords.length;
          const t = Math.max(0, Math.min(1, wordProgress - i));
          return (
            <span
              key={i}
              style={{
                color: t > 0.5 ? "var(--text-primary)" : "var(--text-tertiary)",
                transition: "color 0.12s ease",
              }}
            >
              {w}
            </span>
          );
        })}
      </p>
    </div>
  );
}

// ── Reflection — typewriter reveal (extracted to avoid inline useState remount) ──

function PipelineVisual({ caption, mono, sans }: { caption: string; mono: string; sans: string }) {
  const TEAL = "#1A6678";
  type PStep = { num: string; title: string; sub: string; highlight?: boolean };
  const steps: PStep[] = [
    { num: "01", title: "Agency Figma",       sub: "High-fidelity layouts + design tokens" },
    { num: "02", title: "Semantic Token Map",  sub: "Primitives to aliases, 1:1 agency naming" },
    { num: "03", title: "Custom PHP Modules",  sub: "35 reusable blocks, HTML + vanilla JS" },
    { num: "04", title: "ACF Schema",          sub: "Field validation, editor-safe content API" },
    { num: "05", title: "WordPress CMS",       sub: "Marketing-owned publishing layer" },
    { num: "06", title: "Live Production",     sub: "justcapital.com, fully responsive", highlight: true },
  ];
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "stretch", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
        {steps.map((step, i) => (
          <div key={step.num} style={{ display: "flex", flex: 1, minWidth: 120, position: "relative" }}>
            <div style={{ flex: 1, padding: "20px 16px", background: step.highlight ? TEAL : "var(--card-bg)", display: "flex", flexDirection: "column", gap: 6, borderRight: i < steps.length - 1 ? "1px solid var(--border)" : "none" }}>
              <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.1em", color: step.highlight ? "rgba(255,255,255,0.5)" : TEAL }}>{step.num}</span>
              <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: step.highlight ? "#fff" : "var(--text-primary)", lineHeight: 1.3 }}>{step.title}</span>
              <span style={{ fontFamily: sans, fontSize: 11, color: step.highlight ? "rgba(255,255,255,0.6)" : "var(--text-tertiary)", lineHeight: 1.5 }}>{step.sub}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)", width: 20, height: 20, borderRadius: "50%", background: "var(--bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: TEAL, fontWeight: 700, zIndex: 2 }}>&#8594;</div>
            )}
          </div>
        ))}
      </div>
      <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", color: "var(--text-tertiary)", marginTop: 10, textAlign: "center" }}>8-week accelerated delivery · zero post-launch engineering tickets</p>
      <p style={{ fontFamily: mono, fontSize: 12, lineHeight: 1.6, color: "var(--text-secondary)", marginTop: 10, letterSpacing: "0.01em" }}>{caption}</p>
    </div>
  );
}

function ReflectionReveal({ reflection, reflectionHeader, shouldReduceMotion, sectionLabelStyle }: { reflection: string; reflectionHeader?: string; shouldReduceMotion: boolean | null; sectionLabelStyle: (mb: number) => React.CSSProperties }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const words = reflection.split(/(\s+)/);

  useEffect(() => {
    if (shouldReduceMotion) { setProgress(1); return; }
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const start = viewH * 0.85;
      const end = viewH * 0.25;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldReduceMotion]);

  const visibleCount = Math.ceil(progress * words.length);

  return (
    <div ref={containerRef} style={{ maxWidth: 760, margin: "0 auto 40px" }}>
      <div style={{ position: "relative" }}>
        <p style={{
          fontFamily: "'Gloock', Georgia, serif",
          fontSize: "clamp(20px, 2.2vw, 28px)",
          lineHeight: 1.45,
          letterSpacing: "-0.015em",
          color: "var(--text-primary)",
          fontWeight: 400,
          margin: 0,
        }}>
          {words.map((word, i) => (
            <span
              key={i}
              style={{
                opacity: i < visibleCount ? 1 : 0.25,
                transition: "opacity 0.15s ease",
              }}
            >
              {word}
            </span>
          ))}
          {progress < 1 && (
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 2,
                height: "0.9em",
                background: "var(--accent)",
                marginLeft: 2,
                verticalAlign: "text-bottom",
                animation: "cursorBlink 1s step-end infinite",
              }}
            />
          )}
        </p>
        <div
          aria-hidden="true"
          style={{
            marginTop: 32,
            height: 1,
            background: "var(--border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute",
            top: 0, left: 0, bottom: 0,
            width: `${progress * 100}%`,
            background: "var(--accent)",
            transition: "width 0.1s linear",
          }} />
        </div>
        <h2 style={{ ...sectionLabelStyle(0), marginTop: 16 }}>{reflectionHeader ?? "Reflection"}</h2>
      </div>
    </div>
  );
}

// ── MagneticCTA — extracted to avoid inline useState remount ──
function MagneticCTA({ ctaText, shouldReduceMotion, dark, projectId }: { ctaText?: string; shouldReduceMotion: boolean | null; dark: boolean; projectId: string }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current || shouldReduceMotion) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setBtnOffset({ x: (e.clientX - centerX) * 0.25, y: (e.clientY - centerY) * 0.25 });
  };
  const handleMouseLeave = () => { setBtnOffset({ x: 0, y: 0 }); setIsHovered(false); };
  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ textAlign: "center", padding: ctaText === "" ? "40px 0 120px" : "100px 0 120px", position: "relative" }}>
      {ctaText !== "" && <motion.div aria-hidden="true" initial={shouldReduceMotion ? {} : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} style={{ width: 60, height: 1, background: "var(--border)", margin: "0 auto 48px", transformOrigin: "center" }} />}
      {(ctaText !== "") && (
        <motion.p initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ fontFamily: "'Gloock', Georgia, serif", fontSize: "clamp(24px, 3.5vw, 40px)", color: "var(--text-primary)", marginBottom: 32, fontWeight: 400, letterSpacing: "-0.01em" }}>
          {ctaText ?? "Looking for a freelance UX/UI designer for your next project?"}
        </motion.p>
      )}
      <motion.div animate={{ x: btnOffset.x, y: btnOffset.y }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }} style={{ display: "inline-block" }}>
        <Link ref={btnRef} href="/#contact" onMouseEnter={() => setIsHovered(true)} style={{
          display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase",
          color: isHovered ? (dark ? "#09090E" : "#ffffff") : "var(--text-primary)",
          background: isHovered ? "var(--accent)" : "transparent",
          padding: "14px 32px", border: `1px solid ${isHovered ? "var(--accent)" : "var(--border)"}`, borderRadius: 0, textDecoration: "none",
          transform: isHovered ? "scale(1.04)" : "scale(1)",
          boxShadow: isHovered ? `0 4px 24px ${projectId === "netflix-disney" ? "rgba(229,9,20,0.3)" : projectId === "storycorps" ? "rgba(181,68,26,0.3)" : "rgba(0,0,0,0.15)"}` : "none",
          transition: "background 0.3s, color 0.3s, border-color 0.3s, transform 0.25s ease, box-shadow 0.3s",
        }}
          onFocus={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 2px var(--bg), 0 0 0 4px var(--accent)"; }}
          onBlur={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
        >
          <span>Start a conversation</span>
          <motion.span animate={{ x: isHovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>→</motion.span>
        </Link>
      </motion.div>
    </div>
  );
}

// ── LiveBanner — extracted to avoid inline useState remount ──
function LiveBanner({ url }: { url: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ marginTop: 24, marginBottom: 40 }}>
      <motion.a href={url} target="_blank" rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        animate={{ scale: hovered ? 1.015 : 1, boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.18)" : "0 2px 8px rgba(0,0,0,0.06)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", background: "var(--accent)", padding: "18px 28px", textDecoration: "none", borderRadius: 8, overflow: "hidden", position: "relative" }}
      >
        <span style={{ position: "relative", zIndex: 1 }}>View Live Site</span>
        <motion.span animate={{ x: hovered ? 6 : 0, y: hovered ? -4 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} style={{ fontSize: 18, position: "relative", zIndex: 1 }}>↗</motion.span>
        <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.12) 100%)", pointerEvents: "none" }} />
      </motion.a>
    </div>
  );
}

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
  fontFamily: mono, fontSize: 12, letterSpacing: "0.12em",
  textTransform: "uppercase", color: "var(--accent)",
  marginTop: 0, marginBottom, fontWeight: 500,
});
// Secondary section label — logistical/process sections (Tech & Tools, How It Got Built)
// Uses text-secondary (not text-tertiary) to remain readable at ~5.5:1 contrast on dark bg
// Distinguishable from primary accent labels by color (gray vs. amber) not by opacity
const sectionLabelSecondaryStyle = (marginBottom: number): React.CSSProperties => ({
  fontFamily: mono, fontSize: 12, letterSpacing: "0.12em",
  textTransform: "uppercase", color: "var(--text-secondary)",
  marginTop: 0, marginBottom, fontWeight: 500,
});

/* ═══════════════════════════════════════════════════════════════════════════
   ProcessTimeline — scroll-linked vertical timeline with animated connecting
   line and progressive step reveals. Each step is a full-width ROW anchored
   to a vertical line on the left.
   ═══════════════════════════════════════════════════════════════════════════ */
interface TimelineStep {
  key: string;
  title: string;
  icon: string;
  items: string[];
}

function ProcessTimeline({ steps, reduce, thematic = false }: { steps: TimelineStep[]; reduce: boolean; thematic?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(0);

  // Track which steps have scrolled into view
  useEffect(() => {
    if (reduce) { setActiveCount(steps.length); return; }
    const nodes = sectionRef.current?.querySelectorAll("[data-timeline-step]");
    if (!nodes) return;

    const observers: IntersectionObserver[] = [];
    let maxSeen = 0;

    nodes.forEach((node, idx) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && idx + 1 > maxSeen) {
            maxSeen = idx + 1;
            setActiveCount(maxSeen);
          }
        },
        { rootMargin: "-20% 0px -20% 0px", threshold: 0.1 }
      );
      obs.observe(node);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [steps.length, reduce]);

  const lineProgress = steps.length > 1
    ? Math.min(1, activeCount / steps.length)
    : activeCount > 0 ? 1 : 0;

  return (
    <div ref={sectionRef} className="cs-timeline" style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
      {/* ── Vertical connecting line ── */}
      <div
        aria-hidden="true"
        className="cs-timeline-track"
        style={{
          position: "absolute",
          left: 15,
          top: 8,
          bottom: 8,
          width: 2,
          zIndex: 0,
        }}
      >
        {/* Background track */}
        <div style={{ position: "absolute", inset: 0, background: "var(--border)", borderRadius: 1, opacity: 0.5 }} />
        {/* Animated progress fill */}
        <motion.div
          animate={{ scaleY: lineProgress }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            background: "var(--accent)",
            borderRadius: 1,
            transformOrigin: "top",
          }}
        />
      </div>

      {/* ── Step rows ── */}
      {steps.map((step, idx) => {
        const isActive = idx < activeCount;
        return (
          <div
            key={step.key}
            data-timeline-step
            className="cs-timeline-step"
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "32px 1fr",
              gap: 24,
              paddingBottom: idx < steps.length - 1 ? 56 : 0,
            }}
          >
            {/* Node dot */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 2, position: "relative", zIndex: 1 }}>
              <motion.div
                animate={{
                  background: isActive ? "var(--accent)" : "rgba(0,0,0,0)",
                  borderColor: isActive ? "var(--accent)" : "var(--border)",
                  scale: isActive ? 1 : 0.8,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: "2px solid var(--border)",
                  background: "rgba(0,0,0,0)",
                  flexShrink: 0,
                }}
              />
              {/* Pulse ring on activation */}
              {isActive && !reduce && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    top: 2,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    border: "1px solid var(--accent)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>

            {/* Content */}
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              animate={isActive ? { opacity: 1, y: 0 } : reduce ? {} : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              {/* Step header: number (or thematic marker) + title */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
                {!thematic && (
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: isActive ? "var(--accent)" : "var(--text-tertiary)",
                      transition: "color 0.4s",
                      flexShrink: 0,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: serif,
                    fontSize: "clamp(20px, 2vw, 26px)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    color: "var(--text-primary)",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
              </div>

              {/* Bullet list */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }} role="list">
                {step.items.map((item, itemIdx) => (
                  <motion.li
                    key={`${step.key}-${itemIdx}`}
                    initial={reduce ? {} : { opacity: 0, x: -8 }}
                    animate={isActive ? { opacity: 1, x: 0 } : reduce ? {} : { opacity: 0, x: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.15 + itemIdx * 0.04 }}
                    style={{
                      fontFamily: sans,
                      fontSize: "clamp(15px, 1.2vw, 17px)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.8,
                      padding: "6px 0",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 1,
                        background: isActive ? "var(--accent)" : "var(--text-tertiary)",
                        marginTop: 8,
                        flexShrink: 0,
                        transition: "background 0.4s",
                      }}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>

              {/* Separator line between steps */}
              {idx < steps.length - 1 && (
                <div
                  style={{
                    marginTop: 32,
                    height: 1,
                    background: "var(--border)",
                    opacity: 0.5,
                  }}
                />
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export default function CaseStudy({ project }: Props) {
  const [dark, setDark]             = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });
  const [scrolled, setScrolled]     = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("");
  // tracks which file tab is active per code block (keyed by block.id)
  const [activeFileTabs, setActiveFileTabs] = useState<Record<string, number>>({});
  const shouldReduceMotion = useReducedMotion() ?? false;
  const metaSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const data = caseStudies[project.id];

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject  = projects[currentIndex - 1];
  const nextProject  = projects[currentIndex + 1];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Show sidebar when meta section scrolls out of view, hide near footer
      if (metaSectionRef.current) {
        const metaBottom = metaSectionRef.current.getBoundingClientRect().bottom;
        const footerTop = footerRef.current?.getBoundingClientRect().top ?? Infinity;
        setShowSidebar(metaBottom < 0 && footerTop > 400);

        // Calculate scroll progress between meta section and footer
        const metaTopAbs = metaSectionRef.current.getBoundingClientRect().top + window.scrollY;
        const footerTopAbs = (footerRef.current?.getBoundingClientRect().top ?? Infinity) + window.scrollY;
        const totalRange = footerTopAbs - metaTopAbs;
        if (totalRange > 0) {
          const progress = Math.min(1, Math.max(0, (window.scrollY - metaTopAbs) / totalRange));
          setScrollProgress(progress);
        }
      }

      // Detect current section from h2 headings
      if (contentRef.current) {
        const headings = contentRef.current.querySelectorAll("h2");
        let active = "";
        headings.forEach((h) => {
          const rect = h.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.4) {
            active = h.textContent ?? "";
          }
        });
        setCurrentSection(active);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggle = () => {
    const newDark = !dark;
    localStorage.setItem("theme", newDark ? "dark" : "light");
    setDark(newDark);
  };

  // Convert hex to rgba for muted variant
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };
  const accentColor = project.accent;

  const theme = dark
    ? {
        "--bg":               "#09090E",
        "--text-primary":     "#EDEAE3",
        "--text-secondary":   "#908D86",
        "--text-tertiary":    "#706E6B",
        "--border":           "rgba(255,255,255,0.07)",
        "--card-bg":          "rgba(255,255,255,0.025)",
        "--accent":           accentColor,
        "--accent-muted":     hexToRgba(accentColor, 0.12),
        "--nav-bg-scrolled":  "rgba(9,9,14,0.82)",
      }
    : {
        "--bg":               "#F8F7F2",
        "--text-primary":     "#0E0D0A",
        "--text-secondary":   "#5A5855",
        "--text-tertiary":    "#706E6B",
        "--border":           "rgba(0,0,0,0.09)",
        "--card-bg":          "rgba(0,0,0,0.03)",
        "--accent":           accentColor,
        "--accent-muted":     hexToRgba(accentColor, 0.1),
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
  // processLayout no longer used — timeline replaces both stacked/columns variants
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
            fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--text-secondary)",
            marginBottom: 14, marginTop: 0,
          }}>
            {block.label}
          </p>
        )}

        {/* ── pipeline ── */}
        {block.layout === "pipeline" && <PipelineVisual caption={block.caption} mono={mono} sans={sans} />}

        {/* ── before-after / screen-grid / side-by-side / wide ── */}
        {block.layout !== "pipeline" && (block.layout === "before-after" ? (
          <>
            {block.phoneScroll ? (
              /* Scrollable phone mockups */
              <div className="sc-phone-frames">
                <div>
                  <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 10 }}>{block.beforeLabel ?? "Before"}</p>
                  {block.beforeSrc
                    ? <PhoneFrame src={block.beforeSrc} alt={`${block.label ?? "Before"} — Before`} priority={priority} />
                    : <div style={{ width: 248, height: 480, borderRadius: 22, border: "1px dashed var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: mono, fontSize: 11, color: "var(--text-secondary)", opacity: 0.4 }}>Before</span></div>
                  }
                </div>
                <div>
                  <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>{block.afterLabel ?? "After"}</p>
                  {block.afterSrc
                    ? <PhoneFrame src={block.afterSrc} alt={`${block.label ?? "After"} — After`} />
                    : <div style={{ width: 248, height: 480, borderRadius: 22, border: "1px dashed var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: mono, fontSize: 11, color: "var(--text-secondary)", opacity: 0.4 }}>After</span></div>
                  }
                </div>
              </div>
            ) : (
              /* Desktop before/after — stacked labels, full-width images */
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {/* Before */}
                <div>
                  <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 10 }}>{block.beforeLabel ?? "Before"}</p>
                  <div style={{ ...imgClip, ...(block.beforeSrc ? {} : { minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }) }}>
                    {block.beforeSrc ? (
                      <Image src={block.beforeSrc} alt={`${block.label ?? block.caption} — Before`}
                        width={0} height={0} sizes="(max-width: 768px) calc(100vw - 48px), 700px"
                        priority={priority} style={{ width: "100%", height: "auto", display: "block" }} />
                    ) : (
                      <span style={{ fontFamily: mono, fontSize: 11, color: "var(--text-secondary)", opacity: 0.4 }}>Before</span>
                    )}
                  </div>
                </div>
                {/* After */}
                <div>
                  <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>{block.afterLabel ?? "After"}</p>
                  <div style={{ ...imgClip, ...(block.afterSrc ? {} : { minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }) }}>
                    {block.afterSrc ? (
                      <Image src={block.afterSrc} alt={`${block.label ?? block.caption} — After`}
                        width={0} height={0} sizes="(max-width: 768px) calc(100vw - 48px), 700px"
                        priority={priority} style={{ width: "100%", height: "auto", display: "block" }} />
                    ) : (
                      <span style={{ fontFamily: mono, fontSize: 11, color: "var(--text-secondary)", opacity: 0.4 }}>After</span>
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
                    fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
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
                    fontFamily: mono, fontSize: 11, letterSpacing: "0.06em",
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
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
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
                    <span style={{ fontFamily: mono, fontSize: 11, color: "var(--text-secondary)", opacity: 0.4 }}>Image</span>
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
                  <span style={{ fontFamily: mono, fontSize: 11, color: "var(--text-secondary)", opacity: 0.4 }}>Image</span>
                )}
              </div>
            )}
            <Caption text={block.caption} />
          </>
        ))}
      </motion.div>
    );
  };



  const metaItems = [
    { label: "Role",     value: data.role ?? "" },
    ...(data.snapshot?.discipline ? [{ label: "Discipline", value: data.snapshot.discipline }] : []),
    ...(data.team ? [{ label: "Team", value: data.team }] : []),
    { label: "Company",  value: data.snapshot?.company ?? project.company },
    { label: "Timeline", value: data.snapshot?.timeline ?? project.year },
    ...(data.snapshot?.tools ? [{ label: "Tools", value: data.snapshot.tools }] : []),
    ...(data.snapshot?.productImpact ? [{ label: "Product Impact", value: data.snapshot.productImpact }] : []),
    ...(data.snapshot?.scale ? [{ label: "Scale", value: data.snapshot.scale }] : []),
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
      .sc-phone-frames { display: flex; gap: 40px; flex-wrap: wrap; align-items: flex-start; justify-content: center; margin-bottom: 12px; }
      @media (max-width: 580px) { .sc-phone-frames { justify-content: center; } }
      .sc-vblocks-2col { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
      @media (max-width: 700px) { .sc-vblocks-2col { grid-template-columns: 1fr; } }
      .sc-vblocks-2col .sc-full-span { grid-column: 1 / -1; }
      .sc-meta-row { display: flex; justify-content: space-between; gap: 16px; }
      @media (max-width: 640px) { .sc-meta-row { flex-direction: column; align-items: flex-start; } }
      .sc-metric-row { display: flex; justify-content: space-between; gap: 16px; align-items: baseline; }
      @media (max-width: 640px) { .sc-metric-row { flex-direction: column; align-items: flex-start; } }
      @media (max-width: 640px) { .sc-disconnect-grid { grid-template-columns: 1fr !important; } .sc-disconnect-grid > div { border-right: none !important; border-bottom: 1px solid var(--border); } .sc-disconnect-grid > div:last-child { border-bottom: none; } }
      @media (max-width: 580px) { .sc-scale-grid { grid-template-columns: repeat(2, 1fr) !important; } }

      /* ── Reading Companion Strip ── */
      .sc-sidebar-strip {
        position: fixed;
        left: clamp(12px, 2vw, 24px);
        top: 50%;
        transform: translateY(-50%);
        z-index: 90;
        width: 44px;
        height: 140px;
        border-radius: 22px;
        background: var(--bg);
        border: 1px solid var(--border);
        backdrop-filter: blur(16px);
        box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        overflow: hidden;
        transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, border-radius 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: pointer;
      }
      .sc-sidebar-strip[data-visible="false"] {
        opacity: 0;
        pointer-events: none;
        transform: translateY(-50%) translateX(-20px);
      }
      .sc-sidebar-strip[data-visible="true"] {
        opacity: 1;
        transform: translateY(-50%) translateX(0);
      }
      .sc-sidebar-strip[data-expanded="true"] {
        width: 210px;
        height: auto;
        border-radius: 14px;
      }
      .sc-strip-progress {
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        background: var(--accent);
        border-radius: 0 2px 2px 0;
        transition: none;
        z-index: 2;
      }
      .sc-strip-collapsed {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 0;
        gap: 8px;
        height: 100%;
        justify-content: center;
        transition: opacity 0.2s ease;
      }
      .sc-sidebar-strip[data-expanded="true"] .sc-strip-collapsed {
        opacity: 0;
        pointer-events: none;
        position: absolute;
      }
      .sc-strip-expanded {
        opacity: 0;
        pointer-events: none;
        padding: 16px 16px 16px 20px;
        transition: opacity 0.3s ease 0.1s;
        min-width: 210px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .sc-sidebar-strip[data-expanded="true"] .sc-strip-expanded {
        opacity: 1;
        pointer-events: auto;
        position: relative;
      }
      .sc-strip-section-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--text-tertiary);
        transition: background 0.3s ease, transform 0.3s ease;
      }
      .sc-strip-section-dot[data-active="true"] {
        background: var(--accent);
        transform: scale(1.4);
      }
      @media (max-width: 1440px) { .sc-sidebar-strip { display: none !important; } }

      /* ── StoryCorps journey strip + recording responsive ── */
      .sc-journey-strip::-webkit-scrollbar { display: none; }
      .sc-journey-strip { -ms-overflow-style: none; scrollbar-width: none; }
      @media (max-width: 560px) {
        .sc-storycorps-recording { grid-template-columns: 1fr !important; gap: 16px !important; }
        .sc-storycorps-recording > span { transform: rotate(90deg); }
      }
      @media (max-width: 640px) {
        .sc-metrics-grid { grid-template-columns: 1fr !important; }
        .sc-metrics-grid > div { border-right: none !important; border-bottom: 1px solid var(--border); }
        .sc-metrics-grid > div:last-child { border-bottom: none; }
      }



      /* ── Netflix specimens + trirow responsive ── */
      @media (max-width: 700px) {
        .sc-netflix-specimens { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 560px) {
        .sc-netflix-trirow { grid-template-columns: 1fr !important; }
      }

      /* ── Netflix & Disney+ — accent + typography overrides (theme-agnostic) ── */
      .cs-netflix-page {
        --accent: #E50914 !important;
        --accent-muted: rgba(229,9,20,0.12) !important;
      }
      /* Netflix section headings — override ALL h2s to large editorial serif */
      .cs-netflix-page h2 {
        font-family: 'Gloock', Georgia, serif !important;
        font-size: clamp(24px, 3vw, 38px) !important;
        font-weight: 400 !important;
        letter-spacing: -0.015em !important;
        text-transform: none !important;
        color: var(--text-primary) !important;
        line-height: 1.2 !important;
      }
      .cs-netflix-page h2::before {
        content: '';
        display: block;
        width: 24px;
        height: 2px;
        background: #E50914;
        margin-bottom: 14px;
      }
      /* Netflix meta strip — accent color for labels */
      .cs-netflix-page .sc-meta-row span:first-child { color: #E50914 !important; }
      /* Netflix trirow — 3-up at larger, 1-col on small */
    ` }} />
    <div
      suppressHydrationWarning
      className={project.id === "netflix-disney" ? "cs-netflix-page" : undefined}
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

        <div className="cs-nav-links" style={{ display: "flex", alignItems: "center", gap: 28, height: "100%" }}>
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
              fontFamily: mono, fontSize: 11, letterSpacing: "0.06em",
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

      {/* ── Reading Companion Strip ── */}
      {(() => {
        const sectionNames = ["Challenge", "Process", "Design", "Outcome"];
        const truncatedSection = currentSection.length > 18
          ? currentSection.slice(0, 18) + "…"
          : currentSection;
        return (
          <div
            className="sc-sidebar-strip"
            data-visible={showSidebar ? "true" : "false"}
            data-expanded={sidebarHovered ? "true" : "false"}
            aria-hidden={!showSidebar}
            aria-label="Project information"
            role="complementary"
            onMouseEnter={() => {
              if (sidebarLeaveTimer.current) clearTimeout(sidebarLeaveTimer.current);
              setSidebarHovered(true);
            }}
            onMouseLeave={() => {
              sidebarLeaveTimer.current = setTimeout(() => setSidebarHovered(false), 120);
            }}
          >
            {/* Progress bar — always visible as left accent line */}
            <div
              className="sc-strip-progress"
              style={{ height: `${scrollProgress * 100}%` }}
            />

            {/* Collapsed state: initial circle + section dots */}
            <div className="sc-strip-collapsed">
              {/* Project initial */}
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: "var(--accent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: serif, fontSize: 13, fontWeight: 400,
                color: "#fff", lineHeight: 1,
                flexShrink: 0,
              }}>
                {project.title.charAt(0)}
              </div>

              {/* Section indicator dots */}
              {sectionNames.map((name) => (
                <div
                  key={name}
                  className="sc-strip-section-dot"
                  data-active={currentSection.toLowerCase().includes(name.toLowerCase()) ? "true" : "false"}
                  title={name}
                />
              ))}

              {/* Scroll percentage */}
              <p style={{
                fontFamily: mono, fontSize: 8, color: "var(--text-tertiary)",
                lineHeight: 1, margin: 0, letterSpacing: "0.02em",
              }}>
                {Math.round(scrollProgress * 100)}%
              </p>
            </div>

            {/* Expanded state: full metadata card */}
            <div className="sc-strip-expanded">
              <p style={{
                fontFamily: serif,
                fontSize: 15,
                fontWeight: 400,
                lineHeight: 1.2,
                color: "var(--text-primary)",
                marginBottom: 2,
              }}>
                {project.title}
              </p>
              <p style={{
                fontFamily: sans,
                fontSize: 11,
                color: "var(--text-tertiary)",
                lineHeight: 1.4,
                marginBottom: 12,
                paddingBottom: 10,
                borderBottom: "1px solid var(--border)",
              }}>
                {project.subtitle}
              </p>

              {metaItems.slice(0, 4).map((item) => (
                <div key={item.label} style={{ marginBottom: 8 }}>
                  <p style={{
                    fontFamily: mono, fontSize: 9, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "var(--accent)",
                    marginBottom: 1, lineHeight: 1,
                  }}>
                    {item.label}
                  </p>
                  <p style={{
                    fontFamily: sans, fontSize: 11,
                    color: "var(--text-secondary)", lineHeight: 1.35,
                  }}>
                    {item.value}
                  </p>
                </div>
              ))}

              {/* Current section indicator */}
              {currentSection && (
                <div style={{
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: "1px solid var(--border)",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--accent)", flexShrink: 0,
                  }} />
                  <p style={{
                    fontFamily: mono, fontSize: 9, letterSpacing: "0.06em",
                    color: "var(--text-tertiary)", lineHeight: 1, margin: 0,
                  }}>
                    {truncatedSection}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })()}

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
        {project.id === "storycorps"          && <WarmVignette accent="#B5441A" />}
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
                textTransform: "uppercase", color: "rgba(237,234,227,0.72)",
                textDecoration: "none", marginBottom: 24,
                transition: "color 0.2s", borderRadius: 2,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(237,234,227,0.9)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(237,234,227,0.72)"; }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(237,234,227,0.9)";
                (e.currentTarget as HTMLElement).style.outline = "2px solid rgba(237,234,227,0.72)";
                (e.currentTarget as HTMLElement).style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(237,234,227,0.72)";
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
                  fontFamily: mono, fontSize: 10, letterSpacing: "0.12em",
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
              marginBottom: 24,
            }}
          >
            {project.title}
          </motion.h1>
          {!data.heroIntro && (
            <motion.p variants={heroItem(shouldReduceMotion)} style={{ fontFamily: sans, fontSize: 18, color: "rgba(237,234,227,0.78)", marginBottom: (data.heroLede || data.heroIntro) ? 28 : 0 }}>
              {project.subtitle}
            </motion.p>
          )}
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
                marginBottom: data.heroIntro ? 16 : 0,
                marginTop: 0,
              }}
            >
              {data.heroLede}
            </motion.p>
          )}
          {/* heroIntro — supporting paragraphs, smaller + reduced opacity */}
          {data.heroIntro && (
            <motion.p variants={heroItem(shouldReduceMotion)} style={{ fontFamily: sans, fontSize: 16, lineHeight: 1.75, color: "rgba(237,234,227,0.78)", marginBottom: 0, marginTop: 0 }}>
              {data.heroIntro}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div ref={contentRef} style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 6vw, 96px)" }}>

        {/* Meta strip */}
        <div ref={metaSectionRef} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 1,
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            marginBottom: 80,
          }}
        >
          {metaItems.map((item) => (
            <div key={item.label} style={{ padding: "28px 24px", borderRight: "1px solid var(--border)" }}>
              <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
                {item.label}
              </p>
              <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Director's Spec Sheet */}
        {data.specSheet && data.specSheet.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 0,
              marginBottom: 80,
              marginTop: -48,
              background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            {data.specSheet.map((spec, i) => (
              <div
                key={spec.label}
                style={{
                  padding: "20px 24px",
                  borderRight: i < data.specSheet!.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <p style={{
                  fontFamily: mono,
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                  marginBottom: 6,
                }}>
                  {spec.label}
                </p>
                <p style={{
                  fontFamily: mono,
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  color: "var(--text-primary)",
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}>
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {isNarrative && leadVisual && (
          <div style={{ marginBottom: 100 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <h2 style={sectionLabelStyle(20)}>{data.leadVisualHeader ?? "Shipped Output"}</h2>
              {data.liveSiteUrl && (() => {
                const LiveLinkTop = () => {
                  const [hovered, setHovered] = useState(false);
                  return (
                    <a
                      href={data.liveSiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: mono, fontSize: 14, letterSpacing: "0.06em", color: "var(--accent)", textDecoration: "none", paddingBottom: 4, position: "relative" }}
                    >
                      <span>View Live Site</span>
                      <motion.span
                        animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        style={{ fontSize: 16 }}
                      >
                        ↗
                      </motion.span>
                      <motion.span
                        animate={{ scaleX: hovered ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "var(--accent)", transformOrigin: "left" }}
                      />
                    </a>
                  );
                };
                return <LiveLinkTop />;
              })()}
            </div>
            {renderVisualBlock(leadVisual, { twoCol: false, priority: true })}
          </div>
        )}

        {/* ── Phase 2 teaser — "The Redacted Briefing" ── */}
        {data.phase2Teaser && data.phase2Url && (
          <Phase2Briefing teaser={data.phase2Teaser} url={data.phase2Url} shouldReduceMotion={shouldReduceMotion} />
        )}

        {/* ── Challenge ── */}
        {(() => {
          const challengeText = data.challenge;
          const isNetflix = project.id === "netflix-disney";
          const pullQuote = data.challengeQuote
            ? data.challengeQuote
            : (() => {
                const end = challengeText.search(/(?<=[.!?])\s/);
                return end > 0 ? challengeText.slice(0, end + 1) : challengeText;
              })();
          const remainingText = data.challengeQuote
            ? challengeText
            : (() => {
                const end = challengeText.search(/(?<=[.!?])\s/);
                return end > 0 ? challengeText.slice(end + 1).trim() : "";
              })();

          // Netflix & Disney+ — "The Disconnect" two-column layout
          if (isNetflix) {
            return (
              <div style={{ maxWidth: 760, margin: "0 auto 100px" }}>
                <h2 style={sectionLabelStyle(28)}>The Disconnect</h2>

                {/* Three-step disconnect — showing the process gap */}
                <div
                  className="sc-disconnect-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 0,
                    alignItems: "start",
                    marginBottom: 32,
                    borderTop: "1px solid var(--border)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {[
                    { step: "01", label: "Primary Approval", detail: "One studio approves designs based on brand guidelines written specifically for the original source language." },
                    { step: "02", label: "Secondary Review", detail: "A second studio evaluates the same localized script against undefined criteria, often in languages the reviewer cannot read." },
                    { step: "03", label: "QA Fragmentation", detail: "No shared standard for \u201Ccorrectness\u201D across regions, leading to inconsistent quality and avoidable rework." },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.step}
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px 0px" }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: shouldReduceMotion ? 0 : idx * 0.1 }}
                      style={{
                        padding: "28px 20px",
                        borderRight: idx < 2 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      <span style={{
                        fontFamily: mono, fontSize: 10, letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: idx === 2 ? "#E50914" : "var(--text-tertiary)",
                        display: "block", marginBottom: 10,
                      }}>
                        {item.step}
                      </span>
                      <p style={{
                        fontFamily: serif, fontSize: 17, lineHeight: 1.4,
                        color: "var(--text-primary)", margin: "0 0 8px",
                      }}>
                        {item.label}
                      </p>
                      <p style={{
                        fontFamily: sans, fontSize: 13, lineHeight: 1.55,
                        color: "var(--text-tertiary)", margin: 0,
                      }}>
                        {item.detail}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Full challenge text below */}
                <motion.p
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px 0px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  style={{
                    fontFamily: sans, fontSize: 16, lineHeight: 1.75,
                    color: "var(--text-secondary)", margin: 0,
                  }}
                >
                  {challengeText}
                </motion.p>
              </div>
            );
          }

          // Default — pull-quote treatment
          return (
            <div style={{ maxWidth: 760, margin: "0 auto 100px" }}>
              <div>
                {/* Section label */}
                <h2 style={sectionLabelStyle(28)}>The Challenge</h2>

                {/* Pull quote — first sentence */}
                <motion.blockquote
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px 0px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  style={{
                    fontFamily: serif,
                    fontSize: "clamp(22px, 2.4vw, 32px)",
                    fontWeight: 400,
                    lineHeight: 1.35,
                    letterSpacing: "-0.015em",
                    color: "var(--text-primary)",
                    margin: 0,
                    marginBottom: remainingText ? 28 : 0,
                    padding: 0,
                    borderLeft: "3px solid var(--accent)",
                    paddingLeft: 24,
                  }}
                >
                  {pullQuote}
                </motion.blockquote>

                {/* Supporting context */}
                {remainingText && (
                  <motion.p
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px 0px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    style={{
                      fontFamily: sans,
                      fontSize: 16,
                      lineHeight: 1.75,
                      color: "var(--text-secondary)",
                      margin: 0,
                    }}
                  >
                    {remainingText}
                  </motion.p>
                )}
              </div>
            </div>
          );
        })()}

        {/* ── Languages Worked On (Netflix) — moved after challenge for context ── */}
        {project.id === "netflix-disney" && (
          <SpecimenGrid />
        )}

        {/* Approach — scroll-linked word emphasis */}
        {data.approach && <ApproachReveal approach={data.approach} approachHeader={data.approachHeader} shouldReduceMotion={shouldReduceMotion} sectionLabelStyle={sectionLabelStyle} />}

        {/* What I Was Responsible For */}
        {data.whatIDid && (
          <div style={{ maxWidth: 760, margin: "0 auto 80px" }}>
            <h2 style={sectionLabelStyle(20)}>{data.whatIDidHeader ?? "What I Was Responsible For"}</h2>
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

        {/* ── Process — scroll-linked vertical timeline ── */}
        <div style={{ marginBottom: 100 }}>
          <h2 style={sectionLabelStyle(40)}>{data.processHeader ?? "How It Got Built"}</h2>
          <ProcessTimeline
            thematic={data.processLayout === "thematic"}
            steps={[
              { key: "discover", title: (data.processTitles?.discover ?? "Discover"), icon: "◎", items: data.process?.discover ?? [] },
              { key: "design",   title: (data.processTitles?.design   ?? "Design"),   icon: "◈", items: data.process?.design   ?? [] },
              { key: "ship",     title: (data.processTitles?.ship     ?? "Ship"),     icon: "◆", items: data.process?.ship     ?? [] },
              ...(data.process?.govern && data.process.govern.length > 0
                ? [{ key: "govern", title: (data.processTitles?.govern ?? "Govern"), icon: "◐", items: data.process.govern }]
                : []),
            ]}
            reduce={shouldReduceMotion}
          />
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
                    fontFamily: mono, fontSize: 10, letterSpacing: "0.12em",
                    textTransform: "uppercase",
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

        {/* Key Design Decisions — interactive accordion with large numbers */}
        {data.keyDecisions && data.keyDecisions.length > 0 && (() => {
          const DecisionsAccordion = () => {
            const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
            const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

            return (
              <div style={{ marginBottom: 100, maxWidth: 760, margin: "0 auto 100px" }}>
                <h2 style={sectionLabelStyle(32)}>{data.keyDecisionsLabel ?? "Key Design Decisions"}</h2>
                <div>
                  {data.keyDecisions!.map((decision, i) => {
                    const dashIdx = decision.indexOf(" — ");
                    const decisionTitle = dashIdx > 0 ? decision.slice(0, dashIdx) : decision;
                    const decisionBody = dashIdx > 0 ? decision.slice(dashIdx + 3) : "";
                    const isOpen = expandedIdx === i;
                    const isHoveredItem = hoveredIdx === i;
                    const panelId = `decision-panel-${i}`;
                    const triggerId = `decision-trigger-${i}`;
                    return (
                      <div
                        key={`decision-${i}`}
                        onMouseEnter={() => setHoveredIdx(i)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        style={{
                          borderBottom: "1px solid var(--border)",
                          position: "relative",
                          overflow: "hidden",
                          transition: "background 0.25s ease",
                          background: isHoveredItem && !isOpen ? "rgba(237,234,227,0.03)" : "transparent",
                        }}
                      >
                        {/* Hover/active highlight — CSS transition to avoid scroll-triggered re-animation */}
                        <div
                          aria-hidden="true"
                          style={{
                            position: "absolute", inset: 0,
                            background: "var(--accent)",
                            pointerEvents: "none",
                            opacity: isOpen ? 0.025 : 0,
                            transition: "opacity 0.25s ease",
                          }}
                        />

                        {/* Header row: large number + first few words as preview */}
                        <button
                          id={triggerId}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setExpandedIdx(isOpen ? null : i)}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 20,
                            padding: "24px 16px 24px 0",
                            position: "relative",
                            zIndex: 1,
                            width: "100%",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          {/* Large number — CSS transition (not Framer animate) to prevent scroll-triggered color flash */}
                          <span
                            style={{
                              fontFamily: serif,
                              fontSize: 36,
                              lineHeight: 1,
                              fontWeight: 400,
                              flexShrink: 0,
                              width: 48,
                              textAlign: "right",
                              color: isOpen ? "var(--accent)" : isHoveredItem ? "var(--accent)" : "var(--text-tertiary)",
                              transition: "color 0.2s ease",
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          {/* Preview text — title only */}
                          <span style={{ flex: 1, minWidth: 0 }}>
                            <span
                              style={{
                                fontFamily: sans,
                                fontSize: 16,
                                lineHeight: 1.7,
                                display: "block",
                                color: isOpen ? "var(--text-primary)" : isHoveredItem ? "var(--text-primary)" : "var(--text-secondary)",
                                transition: "color 0.2s ease",
                                ...(isOpen || decisionBody ? {} : {
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }),
                              }}
                            >
                              {decisionTitle}
                            </span>
                          </span>

                          {/* Expand indicator */}
                          <motion.span
                            aria-hidden="true"
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{
                              fontFamily: mono,
                              fontSize: 18,
                              color: "var(--text-secondary)",
                              flexShrink: 0,
                              lineHeight: 1,
                              marginTop: 6,
                            }}
                          >
                            +
                          </motion.span>
                        </button>

                        {/* Expanded content */}
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={triggerId}
                          initial={false}
                          animate={{
                            height: isOpen ? "auto" : 0,
                            opacity: isOpen ? 1 : 0,
                          }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div style={{
                            paddingLeft: 68,
                            paddingBottom: 28,
                            paddingRight: 32,
                          }}>
                            <p style={{
                              fontFamily: sans,
                              fontSize: 16,
                              lineHeight: 1.75,
                              color: "var(--text-primary)",
                              margin: 0,
                            }}>
                              {decisionBody || decision}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          };
          return <DecisionsAccordion />;
        })()}

        {/* ── Per-case supplement after keyDecisions ── */}
        {/* TokenDepthViz removed for just-intelligence */}
        {project.id === "storycorps" && (
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <RecoveryFlowchart accent="#B5441A" />
          </div>
        )}

        {/* Visual Blocks */}
        {visualBlocksMain.length > 0 && project.id === "netflix-disney" ? (
          /* ── Netflix: editorial image layout — 3-act narrative structure ── */
          <div style={{ marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(40)}>{data.visualBlocksHeader ?? "What Got Built"}</h2>

            {/* ─── ACT 1: THE BRIEF — logos, restrained ─── */}
            {(() => {
              const logos = visualBlocksMain.find(b => b.id === "logos");
              if (!logos?.imageSrc) return null;
              return (
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ maxWidth: 480, margin: "0 auto 60px", textAlign: "center" }}
                >
                  <div style={{
                    borderRadius: 8, overflow: "hidden",
                  }}>
                    <Image
                      src={logos.imageSrc}
                      alt={logos.caption}
                      width={0} height={0}
                      sizes="480px"
                      priority
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                  <p style={{
                    fontFamily: mono, fontSize: 13, lineHeight: 1.65,
                    color: "var(--text-secondary)", margin: "16px 0 0", textAlign: "left",
                  }}>
                    {logos.caption}
                  </p>
                </motion.div>
              );
            })()}

            {/* ─── ACT 2: THE CRAFT — paired + solo images ─── */}

            {/* Group A: Design Iteration — Diecisiete + Context Poster (paired) */}
            {(() => {
              const diecisiete = visualBlocksMain.find(b => b.id === "diecisiete");
              const poster = visualBlocksMain.find(b => b.id === "context");
              if (!diecisiete?.imageSrc) return null;
              return (
                <div style={{ marginBottom: 48 }}>
                  <p style={{
                    fontFamily: mono, fontSize: 10, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#E50914", marginBottom: 16,
                  }}>
                    From Iteration to Shipped Product
                  </p>
                  <div className="sc-netflix-specimens" style={{
                    display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20,
                  }}>
                    {/* Diecisiete — design iteration */}
                    <motion.div
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px 0px" }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        background: "rgba(237,234,227,0.03)",
                        border: "1px solid rgba(237,234,227,0.08)",
                        borderRadius: 10, overflow: "hidden",
                        display: "flex", flexDirection: "column",
                      }}
                    >
                      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
                        <Image
                          src={diecisiete.imageSrc}
                          alt={diecisiete.caption}
                          width={0} height={0}
                          sizes="(max-width: 700px) 100vw, 330px"
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                        />
                      </div>
                      <div style={{ padding: "14px 16px", flexShrink: 0 }}>
                        <span style={{
                          fontFamily: mono, fontSize: 11, letterSpacing: "0.12em",
                          textTransform: "uppercase", color: "#E50914",
                          background: "rgba(229,9,20,0.1)",
                          border: "1px solid rgba(229,9,20,0.2)",
                          borderRadius: 3, padding: "2px 7px",
                          display: "inline-block", marginBottom: 10,
                        }}>
                          ES → KO
                        </span>
                        <p style={{
                          fontFamily: mono, fontSize: 13, lineHeight: 1.65,
                          color: "var(--text-secondary)", margin: 0,
                        }}>
                          {diecisiete.caption}
                        </p>
                      </div>
                    </motion.div>

                    {/* Context poster — shipped product */}
                    {poster?.imageSrc && (
                      <motion.div
                        initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px 0px" }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          borderRadius: 10, overflow: "hidden",
                          display: "flex", flexDirection: "column",
                        }}
                      >
                        <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
                          <Image
                            src={poster.imageSrc}
                            alt={poster.caption}
                            width={0} height={0}
                            sizes="(max-width: 700px) 100vw, 330px"
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                          />
                        </div>
                        <p style={{
                          fontFamily: serif, fontSize: 14, lineHeight: 1.6,
                          color: "var(--text-secondary)", margin: "12px 0 0",
                          fontStyle: "italic", flexShrink: 0,
                        }}>
                          {poster.caption}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Group B: Script Translation — Runway + Naruto (2-up) */}
            {(() => {
              const pairs: Array<{ id: string; tag: string }> = [
                { id: "runway", tag: "EN → KO" },
                { id: "naruto", tag: "EN → JA" },
              ];
              return (
                <div style={{ marginBottom: 48 }}>
                  <p style={{
                    fontFamily: mono, fontSize: 10, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#E50914", marginBottom: 16,
                  }}>
                    Script Translation as Design Decision
                  </p>
                  <div className="sc-netflix-specimens" style={{
                    display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20,
                  }}>
                    {pairs.map(({ id, tag }) => {
                      const block = visualBlocksMain.find(b => b.id === id);
                      if (!block?.imageSrc) return null;
                      return (
                        <motion.div
                          key={id}
                          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-60px 0px" }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            background: "var(--card-bg)",
                            border: "1px solid var(--border)",
                            borderRadius: 10, overflow: "hidden",
                          }}
                        >
                          <Image
                            src={block.imageSrc}
                            alt={block.caption}
                            width={0} height={0}
                            sizes="(max-width: 700px) 100vw, 330px"
                            style={{ width: "100%", height: "auto", display: "block" }}
                          />
                          <div style={{ padding: "14px 16px" }}>
                            <span style={{
                              fontFamily: mono, fontSize: 11, letterSpacing: "0.12em",
                              textTransform: "uppercase", color: "#E50914",
                              background: "rgba(229,9,20,0.1)",
                              border: "1px solid rgba(229,9,20,0.2)",
                              borderRadius: 3, padding: "2px 7px",
                              display: "inline-block", marginBottom: 10,
                            }}>
                              {tag}
                            </span>
                            <p style={{
                              fontFamily: mono, fontSize: 13, lineHeight: 1.65,
                              color: "var(--text-secondary)", margin: 0,
                            }}>
                              {block.caption}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Group C: String Length + Brand Constraints — Hospital + History (2-up) */}
            {(() => {
              const pairs: Array<{ id: string; tag: string }> = [
                { id: "hospital", tag: "KO → EN → RO" },
                { id: "history", tag: "JA → EN" },
              ];
              return (
                <div style={{ marginBottom: 60 }}>
                  <p style={{
                    fontFamily: mono, fontSize: 10, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#E50914", marginBottom: 16,
                  }}>
                    String Length &amp; Brand Constraints
                  </p>
                  <div className="sc-netflix-specimens" style={{
                    display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20,
                  }}>
                    {pairs.map(({ id, tag }) => {
                      const block = visualBlocksMain.find(b => b.id === id);
                      if (!block?.imageSrc) return null;
                      return (
                        <motion.div
                          key={id}
                          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-60px 0px" }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            background: "var(--card-bg)",
                            border: "1px solid var(--border)",
                            borderRadius: 10, overflow: "hidden",
                          }}
                        >
                          <Image
                            src={block.imageSrc}
                            alt={block.caption}
                            width={0} height={0}
                            sizes="(max-width: 700px) 100vw, 330px"
                            style={{ width: "100%", height: "auto", display: "block" }}
                          />
                          <div style={{ padding: "14px 16px" }}>
                            <span style={{
                              fontFamily: mono, fontSize: 11, letterSpacing: "0.12em",
                              textTransform: "uppercase", color: "#E50914",
                              background: "rgba(229,9,20,0.1)",
                              border: "1px solid rgba(229,9,20,0.2)",
                              borderRadius: 3, padding: "2px 7px",
                              display: "inline-block", marginBottom: 10,
                            }}>
                              {tag}
                            </span>
                            <p style={{
                              fontFamily: mono, fontSize: 13, lineHeight: 1.65,
                              color: "var(--text-secondary)", margin: 0,
                            }}>
                              {block.caption}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* ─── ACT 3: THE RANGE — 3-up compact contact sheet ─── */}
            {(() => {
              const triIds = ["moscraciun", "captainunderpants", "brews"];
              const triLabels: Record<string, string> = {
                moscraciun: "RO → EN",
                captainunderpants: "EN → RO",
                brews: "EN → RO",
              };
              const triBlocks = triIds
                .map(id => visualBlocksMain.find(b => b.id === id))
                .filter((b): b is VisualBlock => !!b && !!b.imageSrc);
              if (triBlocks.length === 0) return null;
              return (
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ marginBottom: 48 }}
                >
                  <p style={{
                    fontFamily: mono, fontSize: 10, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#E50914", marginBottom: 16,
                  }}>
                    Illustrated &amp; Dimensional Letterforms
                  </p>
                  <div className="sc-netflix-trirow" style={{
                    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
                  }}>
                    {triBlocks.map((block) => (
                      <div
                        key={block.id}
                        style={{
                          borderRadius: 8, overflow: "hidden",
                          border: "1px solid var(--border)",
                          background: "var(--card-bg)",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={block.imageSrc!}
                          alt={block.caption}
                          width={0} height={0}
                          sizes="(max-width: 560px) 100vw, (max-width: 700px) 33vw, 213px"
                          style={{
                            width: "100%", height: "auto",
                            display: "block",
                          }}
                        />
                        {/* Script label overlay */}
                        <span style={{
                          position: "absolute", bottom: 8, left: 8,
                          fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
                          color: "#E50914",
                          background: "var(--card-bg)",
                          border: "1px solid rgba(229,9,20,0.3)",
                          borderRadius: 3, padding: "2px 6px",
                        }}>
                          {triLabels[block.id] ?? ""}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Shared group caption */}
                  <p style={{
                    fontFamily: mono, fontSize: 13, lineHeight: 1.65,
                    color: "var(--text-secondary)", margin: "16px 0 0",
                  }}>
                    When title treatments rely on 3D extrusion, custom textures, or complex embossing, localization becomes an exercise in technical reconstruction rather than cultural adaptation. Because these letterforms are illustrated and engineered rather than typeset, a simple font swap is impossible. Each adaptation requires rebuilding the entire dimensional layer stack from the ground up, re-engineering the brand&apos;s tactile identity to accommodate entirely different string lengths without compromising visual fidelity.
                  </p>
                </motion.div>
              );
            })()}

            {/* Context poster now paired with diecisiete above */}
          </div>
        ) : visualBlocksMain.length > 0 && project.id === "storycorps" ? (
          /* ── StoryCorps: warm mobile app walkthrough layout ── */
          <div style={{ marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(40)}>{data.visualBlocksHeader ?? "What Got Redesigned"}</h2>

            {/* ─── 1. Onboarding Before/After ─── */}
            {(() => {
              const block = visualBlocksMain.find(b => b.id === "onboarding");
              if (!block) return null;
              return (
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ marginBottom: 56 }}
                >
                  <p style={{
                    fontFamily: mono, fontSize: 10, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#B5441A", marginBottom: 20,
                  }}>
                    {block.label ?? "Onboarding"} — Before &amp; After
                  </p>

                  {/* Before: muted, smaller phone */}
                  {block.beforeSrc && (
                    <div style={{ marginBottom: 24 }}>
                      <p style={{
                        fontFamily: mono, fontSize: 11, letterSpacing: "0.12em",
                        textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 8,
                      }}>Before</p>
                      <div style={{
                        maxWidth: 220, margin: "0 auto",
                        filter: "saturate(0.4) opacity(0.8)",
                      }}>
                        <PhoneFrame src={block.beforeSrc} alt="Onboarding — Before" />
                      </div>
                    </div>
                  )}

                  {/* After: filmstrip of individual screens */}
                  {(block as any).afterScreens && (
                    <div>
                      <p style={{
                        fontFamily: mono, fontSize: 11, letterSpacing: "0.12em",
                        textTransform: "uppercase", color: "#B5441A", marginBottom: 8,
                      }}>After — Redesigned Flow</p>
                      <div
                        className="sc-journey-strip"
                        tabIndex={0}
                        role="region"
                        aria-label="Onboarding redesigned flow screens"
                        style={{
                          display: "flex", gap: 16,
                          overflowX: "auto", overflowY: "visible",
                          scrollSnapType: "x mandatory",
                          padding: "16px 16px 16px 16px",
                          margin: "-16px -16px -16px -16px",
                          maskImage: "linear-gradient(90deg, black 0%, black 90%, transparent 100%)",
                          WebkitMaskImage: "linear-gradient(90deg, black 0%, black 90%, transparent 100%)",
                        }}
                      >
                        {((block as any).afterScreens as Array<{ src: string; label: string }>).map((screen, idx) => (
                          <motion.div
                            key={screen.src}
                            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.08, zIndex: 10 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                              flex: "0 0 auto",
                              width: 180,
                              scrollSnapAlign: "start",
                              textAlign: "center",
                              position: "relative",
                              zIndex: 1,
                              cursor: "pointer",
                            }}
                          >
                            <p style={{
                              fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
                              textTransform: "uppercase", color: "#B5441A",
                              marginBottom: 6,
                            }}>
                              {String(idx + 1).padStart(2, "0")}
                            </p>
                            <PhoneFrame src={screen.src} alt={screen.label} />
                            <p style={{
                              fontFamily: mono, fontSize: 10, letterSpacing: "0.08em",
                              textTransform: "uppercase", color: "var(--text-secondary)",
                              marginTop: 6, marginBottom: 0,
                            }}>
                              {screen.label}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p style={{
                    fontFamily: mono, fontSize: 13, lineHeight: 1.65,
                    color: "var(--text-secondary)", margin: "16px 0 0",
                  }}>
                    {block.caption}
                  </p>
                </motion.div>
              );
            })()}

            {/* ─── 2. Recording Before/After ─── */}
            {(() => {
              const block = visualBlocksMain.find(b => b.id === "recording");
              if (!block) return null;
              return (
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ marginBottom: 56 }}
                >
                  <p style={{
                    fontFamily: mono, fontSize: 10, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#B5441A", marginBottom: 20,
                  }}>
                    {block.label ?? "Recording Screen"} — Before &amp; After
                  </p>

                  {/* Before: muted, smaller */}
                  {block.beforeSrc && (
                    <div style={{ marginBottom: 24 }}>
                      <p style={{
                        fontFamily: mono, fontSize: 11, letterSpacing: "0.12em",
                        textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 8,
                      }}>Before</p>
                      <div style={{
                        maxWidth: 220, margin: "0 auto",
                        filter: "saturate(0.4) opacity(0.8)",
                      }}>
                        <PhoneFrame src={block.beforeSrc} alt="Recording — Before" />
                      </div>
                    </div>
                  )}

                  {/* After: filmstrip of recording process */}
                  {(block as any).afterScreens && (
                    <div>
                      <p style={{
                        fontFamily: mono, fontSize: 11, letterSpacing: "0.12em",
                        textTransform: "uppercase", color: "#B5441A", marginBottom: 8,
                      }}>After — Complete Recording Process</p>
                      <div
                        className="sc-journey-strip"
                        tabIndex={0}
                        role="region"
                        aria-label="Recording process screens"
                        style={{
                          display: "flex", gap: 16,
                          overflowX: "auto", overflowY: "visible",
                          scrollSnapType: "x mandatory",
                          padding: "16px 16px 16px 16px",
                          margin: "-16px -16px -16px -16px",
                          maskImage: "linear-gradient(90deg, black 0%, black 90%, transparent 100%)",
                          WebkitMaskImage: "linear-gradient(90deg, black 0%, black 90%, transparent 100%)",
                        }}
                      >
                        {((block as any).afterScreens as Array<{ src: string; label: string }>).map((screen, idx) => (
                          <motion.div
                            key={screen.src}
                            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.08, zIndex: 10 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                              flex: "0 0 auto",
                              width: 180,
                              scrollSnapAlign: "start",
                              textAlign: "center",
                              position: "relative",
                              zIndex: 1,
                              cursor: "pointer",
                            }}
                          >
                            <p style={{
                              fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
                              textTransform: "uppercase", color: "#B5441A",
                              marginBottom: 6,
                            }}>
                              {String(idx + 1).padStart(2, "0")}
                            </p>
                            <PhoneFrame src={screen.src} alt={screen.label} />
                            <p style={{
                              fontFamily: mono, fontSize: 10, letterSpacing: "0.08em",
                              textTransform: "uppercase", color: "var(--text-secondary)",
                              marginTop: 6, marginBottom: 0,
                            }}>
                              {screen.label}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p style={{
                    fontFamily: mono, fontSize: 13, lineHeight: 1.65,
                    color: "var(--text-secondary)", margin: "16px 0 0",
                  }}>
                    {block.caption}
                  </p>
                </motion.div>
              );
            })()}

            {/* ─── 3. Listen Feed — phone filmstrip ─── */}
            {(() => {
              const block = visualBlocksMain.find(b => b.id === "listen-feed");
              if (!block?.screens) return null;
              const screens = block.screens as Array<{ src: string; label: string }>;
              return (
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ marginBottom: 56 }}
                >
                  <p style={{
                    fontFamily: mono, fontSize: 10, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#B5441A", marginBottom: 20,
                  }}>
                    Listen Feed
                  </p>

                  <div style={{
                    display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap",
                  }}>
                    {screens.map((screen, idx) => (
                      <motion.div
                        key={screen.src}
                        initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.08, zIndex: 10 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          flex: "0 0 auto",
                          width: 200,
                          textAlign: "center",
                          position: "relative",
                          zIndex: 1,
                          cursor: "pointer",
                        }}
                      >
                        <PhoneFrame src={screen.src} alt={screen.label} />
                        <p style={{
                          fontFamily: mono, fontSize: 10, letterSpacing: "0.08em",
                          textTransform: "uppercase", color: "var(--text-secondary)",
                          marginTop: 8, marginBottom: 0,
                        }}>
                          {screen.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <p style={{
                    fontFamily: mono, fontSize: 13, lineHeight: 1.65,
                    color: "var(--text-secondary)", margin: "16px 0 0",
                  }}>
                    {block.caption}
                  </p>
                </motion.div>
              );
            })()}

            {/* ─── 5. Profile — phone filmstrip ─── */}
            {(() => {
              const block = visualBlocksMain.find(b => b.id === "profile");
              if (!block?.screens) return null;
              const screens = block.screens as Array<{ src: string; label: string }>;
              return (
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p style={{
                    fontFamily: mono, fontSize: 10, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#B5441A", marginBottom: 20,
                  }}>
                    User Profile
                  </p>

                  <div style={{
                    display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap",
                  }}>
                    {screens.map((screen, idx) => (
                      <motion.div
                        key={screen.src}
                        initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.08, zIndex: 10 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          flex: "0 0 auto",
                          width: 200,
                          textAlign: "center",
                          position: "relative",
                          zIndex: 1,
                          cursor: "pointer",
                        }}
                      >
                        <PhoneFrame src={screen.src} alt={screen.label} />
                        <p style={{
                          fontFamily: mono, fontSize: 10, letterSpacing: "0.08em",
                          textTransform: "uppercase", color: "var(--text-secondary)",
                          marginTop: 8, marginBottom: 0,
                        }}>
                          {screen.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <p style={{
                    fontFamily: mono, fontSize: 13, lineHeight: 1.65,
                    color: "var(--text-secondary)", margin: "16px 0 0",
                  }}>
                    {block.caption}
                  </p>
                </motion.div>
              );
            })()}
          </div>
        ) : visualBlocksMain.length > 0 ? (
          <div style={{ marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(40)}>{data.visualBlocksHeader ?? "What Got Redesigned"}</h2>

            {/* 2-column grid wrapper for Netflix-style layouts */}
            <div className={data.visualBlocksColumns === 2 ? "sc-vblocks-2col" : undefined}>
              {visualBlocksMain.map((block, blockIndex) =>
                renderVisualBlock(block, { priority: !leadVisual && blockIndex === 0, index: blockIndex })
              )}
            </div>
          </div>
        ) : null}

        {/* Results — staggered scroll-reveal with large typography */}
        {data.metrics && data.metrics.length > 0 && (
          <div style={{ marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(32)}>
              {data.metricsHeader ?? (project.id === "netflix-disney" ? "The Scale" : "What Shipped")}
            </h2>
            {/* netflix-disney: centered 4-column dramatic grid */}
            {project.id === "netflix-disney" ? (
              <div
                className="sc-scale-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 0,
                  maxWidth: 760,
                  margin: "0 auto",
                  borderTop: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                }}>
                {data.metrics.map((m, idx) => (
                  <motion.div
                    key={m.label}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px 0px" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: shouldReduceMotion ? 0 : idx * 0.08,
                    }}
                    style={{
                      textAlign: "center",
                      padding: "40px 12px",
                      borderRight: idx < data.metrics!.length - 1 ? "1px solid var(--border)" : "none",
                    }}>
                    <span style={{
                      fontFamily: serif,
                      fontSize: "clamp(40px, 5vw, 64px)",
                      lineHeight: 1,
                      color: "#E50914",
                      fontWeight: 400,
                      display: "block",
                      marginBottom: 12,
                    }}>
                      {m.value}
                    </span>
                    <span style={{
                      fontFamily: mono,
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-tertiary)",
                      lineHeight: 1.4,
                    }}>
                      {m.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : project.id === "just-intelligence" ? (
              <StatsCounter metrics={data.metrics} />
            ) : (
              <div className="sc-metrics-grid" style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(data.metrics.length, data.metrics.length <= 4 ? 4 : 3)}, 1fr)`,
                gap: 0,
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
              }}>
                {data.metrics.map((m, idx) => {
                  const cols = Math.min(data.metrics!.length, data.metrics!.length <= 4 ? 4 : 3);
                  const isLastRow = idx >= data.metrics!.length - (data.metrics!.length % cols || cols);
                  const isRowEnd = (idx + 1) % cols === 0 || idx === data.metrics!.length - 1;
                  return (
                    <motion.div
                      key={m.label}
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px 0px" }}
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                        delay: shouldReduceMotion ? 0 : idx * 0.08,
                      }}
                      style={{
                        textAlign: "center",
                        padding: "36px 16px",
                        borderRight: isRowEnd ? "none" : "1px solid var(--border)",
                        borderBottom: isLastRow ? "none" : "1px solid var(--border)",
                      }}
                    >
                      <span style={{
                        fontFamily: serif,
                        fontSize: "clamp(36px, 5vw, 56px)",
                        lineHeight: 1,
                        color: "var(--accent)",
                        fontWeight: 400,
                        display: "block",
                        marginBottom: 12,
                      }}>
                        {m.value}
                      </span>
                      <span style={{
                        fontFamily: mono,
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                      }}>
                        {m.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* What Changed (outcomes) — staggered scroll reveal */}
        {data.outcomes && data.outcomes.length > 0 && (
          <div style={{ maxWidth: 760, margin: "0 auto 100px" }}>
            <h2 style={sectionLabelStyle(24)}>
              {data.outcomesHeader ?? (project.id === "netflix-disney" ? "What Standardized" : "What Changed")}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }} role="list">
              {data.outcomes.map((outcome, i) => {
                const parts = outcome.split("\n");
                const hasTitle = parts.length > 1;
                return (
                  <motion.li
                    key={`outcome-${i}`}
                    initial={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px 0px" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: shouldReduceMotion ? 0 : i * 0.06,
                    }}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 14,
                      padding: "16px 0", borderBottom: "1px solid var(--border)",
                      fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7,
                    }}
                  >
                    {/* Accent dash marker */}
                    <span
                      aria-hidden="true"
                      style={{
                        width: 16, height: 1,
                        background: "var(--accent)",
                        marginTop: 12,
                        flexShrink: 0,
                      }}
                    />
                    {hasTitle ? (
                      <div>
                        <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: 4 }}>
                          {parts[0]}
                        </strong>
                        {parts.slice(1).join("\n")}
                      </div>
                    ) : outcome}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        )}

        {/* ── Code Blocks — code + preview pairs ── */}
        {data.codeBlocks && data.codeBlocks.length > 0 && (
          <div style={{ marginBottom: 80 }}>
            <p style={sectionLabelStyle(32)}>{data.codeBlocksHeader ?? "In Code"}</p>
            <p style={{ fontFamily: sans, fontSize: data.codeBlocksDescription ? 16 : 13, color: data.codeBlocksDescription ? "var(--text-secondary)" : "var(--text-tertiary)", lineHeight: data.codeBlocksDescription ? 1.75 : 1.5, marginBottom: 32, maxWidth: data.codeBlocksDescription ? 760 : 640, opacity: data.codeBlocksDescription ? 1 : 0.7 }}>
              {data.codeBlocksDescription ?? "Previews are simplified reproductions — not pixel-perfect mirrors of the live product. They illustrate how complex data problems were reduced to clear interface patterns and how the underlying code was structured."}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {data.codeBlocks.map((block) => (
                <div key={block.id}>
                  {/* Title + description */}
                  <p style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.06em", color: "var(--text-primary)", marginBottom: 6, fontWeight: 500 }}>
                    {block.title}
                  </p>
                  <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
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
                        <div className="cs-code-panel" style={{
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
                                      fontFamily: mono, fontSize: 11, letterSpacing: "0.08em",
                                      textTransform: "uppercase",
                                      padding: "10px 16px",
                                      background: "transparent", border: "none",
                                      borderBottom: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                                      color: isActive ? "#cdd6f4" : "rgba(255,255,255,0.3)",
                                      cursor: "pointer",
                                      transition: "color 0.15s",
                                    }}
                                    onFocus={(e) => {
                                      (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)";
                                      (e.currentTarget as HTMLElement).style.outlineOffset = "-2px";
                                    }}
                                    onBlur={(e) => {
                                      (e.currentTarget as HTMLElement).style.outline = "none";
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
                        ...(block.previewHtml ? { height: "fit-content" } : {}),
                      }}>
                        {block.previewHtml ? (
                          <iframe
                            srcDoc={block.previewHtml}
                            title={`${block.title} preview`}
                            style={{ width: "100%", border: "none", display: "block", minHeight: 360 }}
                            sandbox="allow-same-origin allow-scripts"
                            ref={(iframe) => {
                              if (!iframe) return;
                              const resize = () => {
                                try {
                                  const body = iframe.contentDocument?.body;
                                  if (body) {
                                    const h = body.offsetHeight;
                                    if (h && h > 50) iframe.style.height = `${h}px`;
                                  }
                                } catch { /* cross-origin fallback */ }
                              };
                              iframe.addEventListener("load", () => {
                                resize();
                                setTimeout(resize, 200);
                                setTimeout(resize, 600);
                              });
                              setTimeout(resize, 100);
                              setTimeout(resize, 500);
                              setTimeout(resize, 1000);
                            }}
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
                            fontSize: 11,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--text-secondary)",
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
                          className={stackPanels ? undefined : "cs-code-layout"}
                          style={{ display: "flex", flexDirection: "column", gap: 16 }}
                        >
                          {previewPanel}
                          {codePanel}
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

        {/* ── Footer ref for sidebar visibility ── */}
        <div ref={footerRef} />

        {/* ── Reflection ── */}
        {data.reflection && (() => {
          // Netflix & Disney+ — editorial centered quote, no typewriter
          if (project.id === "netflix-disney") {
            return (
              <div style={{ margin: "0 auto 0", textAlign: "center", maxWidth: 900, padding: "0 24px" }}>
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Thin rule */}
                  <div aria-hidden="true" style={{
                    width: 40, height: 1, background: "#E50914",
                    margin: "0 auto 12px",
                  }} />
                  <span style={{
                    fontFamily: mono, fontSize: 10, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "var(--text-tertiary)",
                    display: "inline-block", marginBottom: 32,
                  }}>
                    Reflection
                  </span>
                  <p style={{
                    fontFamily: serif,
                    fontSize: "clamp(22px, 2.8vw, 36px)",
                    lineHeight: 1.4,
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary)",
                    fontWeight: 400,
                    margin: 0,
                    fontStyle: "italic",
                  }}>
                    {data.reflection}
                  </p>
                </motion.div>
              </div>
            );
          }

          // Default — typewriter reveal
          return <ReflectionReveal reflection={data.reflection!} reflectionHeader={data.reflectionHeader} shouldReduceMotion={shouldReduceMotion} sectionLabelStyle={sectionLabelStyle} />;
        })()}

        {/* Phase 2 teaser moved to top of content, before Challenge */}

        {/* CTA — magnetic cursor-reactive ending */}
        <MagneticCTA
          ctaText={data.ctaText}
          shouldReduceMotion={shouldReduceMotion}
          dark={dark}
          projectId={project.id}
        />

        {data.liveSiteUrl && <LiveBanner url={data.liveSiteUrl} />}

        {/* ── Footer nav — after the CTA so navigation doesn't compete with the peak moment ── */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 40, paddingBottom: 80 }}>
          <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 16 }}>
            All Projects
          </p>
          <div className="cs-footer-projects" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", rowGap: 8, marginBottom: 32 }}>
            {projects.map((p, i) => (
              <span key={p.id} style={{ display: "inline-flex", alignItems: "center" }}>
                {i > 0 && (
                  <span className="cs-project-sep" aria-hidden="true" style={{ color: "var(--border)", padding: "0 14px", userSelect: "none", fontSize: 11 }}>
                    /
                  </span>
                )}
                <Link
                  href={`/work/${p.id}`}
                  aria-current={p.id === project.id ? "page" : undefined}
                  style={{
                    fontFamily: mono, fontSize: 11, letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: p.id === project.id ? "var(--text-primary)" : "var(--text-secondary)",
                    fontWeight: p.id === project.id ? 500 : 400,
                    textDecoration: "none",
                    borderBottom: `1px solid ${p.id === project.id ? "var(--text-primary)" : "transparent"}`,
                    paddingBottom: 2,
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (p.id !== project.id) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                      (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--text-secondary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (p.id !== project.id) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                      (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
                    }
                  }}
                >
                  {p.title}
                </Link>
              </span>
            ))}
          </div>
          <div className="cs-footer-nav" style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            {prevProject ? (
              <Link
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
                <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)" }}>← Previous</span>
                {prevProject.title}
              </Link>
            ) : <span />}
            {nextProject ? (
              <Link
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
                <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)" }}>Next →</span>
                {nextProject.title}
              </Link>
            ) : <span />}
          </div>
        </div>

      </div>

      {/* ── Site footer ── */}
      <footer
        style={{
          padding: "32px clamp(24px, 6vw, 96px) 40px",
          borderTop: "1px solid var(--border)",
          background: "var(--bg)",
          color: "var(--text-secondary)",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 12,
          position: "relative", zIndex: 2,
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Email",    href: "/contact" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/jinjuparkoinky/" },
            { label: "GitHub",   href: "https://github.com/Oinkyjinju/ux_engineer_portfolio_2026" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: mono, fontSize: 11, letterSpacing: "0.05em",
                textTransform: "uppercase", color: "var(--text-secondary)",
                textDecoration: "none", transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-secondary)"; }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <span style={{ fontFamily: mono, fontSize: 11, color: "var(--text-secondary)", letterSpacing: "0.04em" }}>
          Jinju Park © 2026
        </span>
      </footer>
    </div>
    </>
  );
}
