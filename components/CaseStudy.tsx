"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { type Project } from "@/data/projects";
import { caseStudies, type CodeBlock } from "@/data/caseStudies";
import { ProjectThumbnail } from "./ProjectThumbnails";
import { projects } from "@/data/projects";

interface Props { project: Project; }

// Font constants — stable, no need to recreate per render
const mono  = "'JetBrains Mono', monospace";
const serif = "'Gloock', Georgia, serif";
const sans  = "'Red Hat Text', system-ui, sans-serif";

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
function CodeHighlight({ code, language }: { code: string; language: string }) {
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

// Shared section-label style
const sectionLabelStyle = (marginBottom: number): React.CSSProperties => ({
  fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
  textTransform: "uppercase", color: "var(--accent)",
  marginTop: 0, marginBottom, fontWeight: 400,
});

export default function CaseStudy({ project }: Props) {
  const [dark, setDark]         = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const data = caseStudies[project.id];

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject  = projects[currentIndex - 1];
  const nextProject  = projects[currentIndex + 1];

  useEffect(() => {
    setDark(localStorage.getItem("theme") === "dark");
  }, []);

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
        <a
          href="/"
          style={{
            fontFamily: serif, fontSize: 17, fontWeight: 400,
            color: "var(--text-primary)", textDecoration: "none", letterSpacing: "-0.01em",
          }}
        >
          Jinju Park
        </a>

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
        {/* Bottom fade */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
          background: `linear-gradient(transparent, var(--bg))`, pointerEvents: "none",
        }} />

        <div
          style={{
            position: "relative", zIndex: 1,
            maxWidth: 1160, margin: "0 auto",
            padding: "80px clamp(24px, 6vw, 96px) 100px",
          }}
        >
          <a
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
          </a>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
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
          </div>

          <h1
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
          </h1>
          <p style={{ fontFamily: sans, fontSize: 18, color: "rgba(237,234,227,0.6)", marginBottom: data.heroIntro ? 20 : 0 }}>
            {project.subtitle}
          </p>
          {data.heroIntro && (
            <p style={{ fontFamily: sans, fontSize: 16, lineHeight: 1.75, color: "rgba(237,234,227,0.55)", maxWidth: 600, marginBottom: 0, marginTop: 4 }}>
              {data.heroIntro}
            </p>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 6vw, 96px)" }}>

        {/* Meta strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 1,
            borderBottom: "1px solid var(--border)",
            marginBottom: 80,
          }}
        >
          {[
            { label: "Role",     value: data.role     ?? "" },
            { label: "Team",     value: data.team     ?? "" },
            { label: "Company",  value: project.company },
            { label: "Timeline", value: data.snapshot?.timeline ?? project.year },
            ...(data.snapshot?.tools ? [{ label: "Tools", value: data.snapshot.tools }] : []),
          ].map((item) => (
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

        {/* Thumbnail + Challenge */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
            <p style={{ fontFamily: serif, fontSize: "clamp(20px, 2.4vw, 26px)", lineHeight: 1.5, color: "var(--text-primary)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              {data.challenge}
            </p>
          </div>
        </div>

        {/* Approach */}
        <div style={{ maxWidth: 760, marginBottom: 80 }}>
          <h2 style={sectionLabelStyle(20)}>My Approach</h2>
          <p style={{ fontFamily: sans, fontSize: 17, lineHeight: 1.75, color: "var(--text-secondary)" }}>
            {data.approach}
          </p>
        </div>

        {/* What I Was Responsible For */}
        {data.whatIDid && (
          <div style={{ maxWidth: 760, marginBottom: 80 }}>
            <h2 style={sectionLabelStyle(20)}>What I Was Responsible For</h2>
            <p style={{ fontFamily: sans, fontSize: 17, lineHeight: 1.75, color: "var(--text-secondary)" }}>
              {data.whatIDid}
            </p>
          </div>
        )}

        {/* ── Reflection — moved up so it frames the decisions before the reader dives in ── */}
        {data.reflection && (
          <div style={{ maxWidth: 760, marginBottom: 80 }}>
            <h2 style={sectionLabelStyle(20)}>Reflection</h2>
            <p style={{
              fontFamily: serif,
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.65,
              color: "var(--text-primary)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              borderLeft: "3px solid var(--accent)",
              paddingLeft: 24,
              margin: 0,
            }}>
              {data.reflection}
            </p>
          </div>
        )}

        {/* ── Tech & Tools — moved up alongside reflection for project context ── */}
        {data.tech && data.tech.length > 0 && (
          <div style={{ marginBottom: 80 }}>
            <h2 style={sectionLabelStyle(20)}>Tech &amp; Tools</h2>
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
          <div style={{ maxWidth: 760, marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(32)}>Key Design Decisions</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }} role="list">
              {data.keyDecisions.map((decision, i) => (
                <li
                  key={`decision-${i}`}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 20,
                    padding: "20px 0", borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span aria-hidden="true" style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", color: "var(--accent)", flexShrink: 0, marginTop: 2 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p style={{ fontFamily: sans, fontSize: 16, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>
                    {decision}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Process — 3 columns */}
        <div style={{ marginBottom: 100 }}>
          <h2 style={sectionLabelStyle(40)}>How It Got Built</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "clamp(24px, 4vw, 56px)" }}>
            {(
              [
                { num: "01", title: "Discover", icon: "◎", items: data.process?.discover ?? [] },
                { num: "02", title: "Design",   icon: "◈", items: data.process?.design   ?? [] },
                { num: "03", title: "Ship",     icon: "◆", items: data.process?.ship     ?? [] },
              ] as const
            ).map((step) => (
              <div key={step.num}>
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
                    {step.num}
                  </span>
                </div>
                <h3 style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)", marginBottom: 16, marginTop: 0 }}>
                  {step.title}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }} role="list">
                  {step.items.map((item, itemIdx) => (
                    <li
                      key={`${step.num}-item-${itemIdx}`}
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
        </div>

        {/* Visual Blocks */}
        {data.visualBlocks && data.visualBlocks.length > 0 && (
          <div style={{ marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(40)}>{data.visualBlocksHeader ?? "What Got Redesigned"}</h2>

            {/* 2-column grid wrapper for Netflix-style layouts */}
            <div className={data.visualBlocksColumns === 2 ? "sc-vblocks-2col" : undefined}>
              {data.visualBlocks.map((block, blockIndex) => (
                <div
                  key={block.id}
                  className={data.visualBlocksColumns === 2 && block.noContainer ? "sc-full-span" : undefined}
                  style={{ marginBottom: data.visualBlocksColumns === 2 ? 0 : 72 }}
                >

                  {/* ── before-after ── */}
                  {block.layout === "before-after" ? (
                    <>
                      {block.label && (
                        <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 16 }}>
                          {block.label}
                        </p>
                      )}
                      {block.phoneScroll ? (
                        /* Phone‑mockup side-by-side */
                        <div className="sc-phone-frames">
                          <div>
                            <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 8 }}>Before</p>
                            {block.beforeSrc
                              ? <PhoneFrame src={block.beforeSrc} alt={`${block.label ?? "Before"} — Before`} priority={blockIndex === 0} />
                              : <div style={{ width: 248, height: 480, borderRadius: 22, border: "1px dashed var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", opacity: 0.5 }}>Before</span></div>
                            }
                          </div>
                          <div>
                            <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>After</p>
                            {block.afterSrc
                              ? <PhoneFrame src={block.afterSrc} alt={`${block.label ?? "After"} — After`} />
                              : <div style={{ width: 248, height: 480, borderRadius: 22, border: "1px dashed var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", opacity: 0.5 }}>After</span></div>
                            }
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start", marginBottom: 12 }}>
                          {/* Before — fixed portrait frame */}
                          <div className="sc-before-panel" style={{ flexShrink: 0 }}>
                            <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 8 }}>Before</p>
                            <div
                              className="sc-before-panel-inner"
                              style={{
                                width: 240, aspectRatio: "9/16",
                                position: "relative",
                                background: "var(--card-bg)",
                                border: `1px ${block.beforeSrc ? "solid" : "dashed"} var(--border)`,
                                borderRadius: 12, overflow: "hidden",
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}
                            >
                              {block.beforeSrc ? (
                                <Image
                                  src={block.beforeSrc}
                                  alt={`${block.label ?? block.caption} — Before`}
                                  fill
                                  sizes="(max-width: 600px) 240px, 240px"
                                  priority={blockIndex === 0}
                                  style={{ objectFit: "cover" }}
                                />
                              ) : (
                                <span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", textAlign: "center", padding: "0 16px", opacity: 0.5 }}>
                                  Before screenshot
                                </span>
                              )}
                            </div>
                          </div>

                          {/* After — uncapped so composite images breathe */}
                          <div style={{ flex: 1, minWidth: 280 }}>
                            <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>After</p>
                            <div
                              style={{
                                background: "var(--card-bg)",
                                border: `1px ${block.afterSrc ? "solid" : "dashed"} var(--border)`,
                                borderRadius: 12, overflow: "hidden",
                                ...(block.afterSrc ? {} : { display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }),
                              }}
                            >
                              {block.afterSrc ? (
                                <Image
                                  src={block.afterSrc}
                                  alt={`${block.label ?? block.caption} — After`}
                                  width={0}
                                  height={0}
                                  sizes="(max-width: 768px) calc(100vw - 48px), 700px"
                                  priority={blockIndex === 0}
                                  style={{ width: "100%", height: "auto", display: "block" }}
                                />
                              ) : (
                                <span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", textAlign: "center", padding: "0 16px", opacity: 0.5 }}>
                                  After screenshot
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", borderLeft: "2px solid var(--accent)", paddingLeft: 12 }}>
                        {block.caption}
                      </p>
                    </>

                  ) : block.layout === "screen-grid" ? (
                    /* Hi-fi screen grid — full height, no forced aspect ratio */
                    <>
                      <div className="sc-screen-grid">
                        {(block.screens ?? []).map((screen, idx) => (
                          <div key={screen.src} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                            <span aria-hidden="true" style={{
                              fontFamily: mono, fontSize: 9, letterSpacing: "0.08em",
                              textTransform: "uppercase", color: "var(--accent)",
                            }}>
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            {/* Phone frame — natural height, no forced crop */}
                            <div style={{
                              width: "100%",
                              background: "var(--card-bg)",
                              border: "1px solid var(--border)",
                              borderRadius: 20,
                              overflow: "hidden",
                              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                            }}>
                              <img
                                src={screen.src}
                                alt={`${screen.label} screen`}
                                loading={idx === 0 ? "eager" : "lazy"}
                                style={{ width: "100%", height: "auto", display: "block" }}
                              />
                            </div>
                            <span style={{
                              fontFamily: mono, fontSize: 9, letterSpacing: "0.06em",
                              textTransform: "uppercase", color: "var(--text-secondary)",
                              textAlign: "center",
                            }}>
                              {screen.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", borderLeft: "2px solid var(--accent)", paddingLeft: 12 }}>
                        {block.caption}
                      </p>
                    </>

                  ) : block.layout === "side-by-side" ? (
                    /* Two images side-by-side */
                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                      <div style={{ flex: 1, minWidth: 240 }}>
                        <div style={{
                          background: "var(--card-bg)",
                          border: `1px ${block.imageSrc ? "solid" : "dashed"} var(--border)`,
                          borderRadius: 12, overflow: "hidden", marginBottom: 10,
                          ...(block.imageSrc ? {} : { display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "4/3" }),
                        }}>
                          {block.imageSrc ? (
                            <Image
                              src={block.imageSrc}
                              alt={block.caption}
                              width={0}
                              height={0}
                              sizes="(max-width: 768px) calc(100vw - 48px), 530px"
                              style={{ width: "100%", height: "auto", display: "block" }}
                            />
                          ) : (
                            <span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", opacity: 0.5 }}>Image</span>
                          )}
                        </div>
                        <p style={{ fontFamily: sans, fontSize: 13, color: "var(--text-secondary)", borderLeft: "2px solid var(--accent)", paddingLeft: 10, margin: 0 }}>
                          {block.caption}
                        </p>
                      </div>

                      {block.imageSrc2 && (
                        <div style={{ flex: 1, minWidth: 240 }}>
                          <div style={{
                            background: "var(--card-bg)",
                            border: "1px solid var(--border)",
                            borderRadius: 12, overflow: "hidden", marginBottom: 10,
                          }}>
                            <Image
                              src={block.imageSrc2}
                              alt={block.caption2 ?? block.caption}
                              width={0}
                              height={0}
                              sizes="(max-width: 768px) calc(100vw - 48px), 530px"
                              style={{ width: "100%", height: "auto", display: "block" }}
                            />
                          </div>
                          {block.caption2 && (
                            <p style={{ fontFamily: sans, fontSize: 13, color: "var(--text-secondary)", borderLeft: "2px solid var(--accent)", paddingLeft: 10, margin: 0 }}>
                              {block.caption2}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                  ) : (
                    /* Wide / full-bleed image — or centered phone mockup when phoneScroll */
                    <>
                      {block.phoneScroll && block.imageSrc ? (
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                          <PhoneFrame src={block.imageSrc} alt={block.caption} priority={blockIndex === 0} />
                        </div>
                      ) : (
                        /* noContainer = no card chrome; otherwise standard card */
                        <div
                          style={{
                            width: "100%",
                            ...(block.noContainer ? {} : {
                              background: "var(--card-bg)",
                              border: `1px ${block.imageSrc ? "solid" : "dashed"} var(--border)`,
                              borderRadius: 12, overflow: "hidden",
                            }),
                            marginBottom: 12,
                            ...(block.imageSrc ? {} : { display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "16/9" }),
                          }}
                        >
                          {block.imageSrc ? (
                            <Image
                              src={block.imageSrc}
                              alt={block.caption}
                              width={0}
                              height={0}
                              sizes={data.visualBlocksColumns === 2
                                ? "(max-width: 700px) 100vw, (max-width: 1160px) 50vw, 560px"
                                : "(max-width: 1160px) 100vw, 1160px"
                              }
                              priority={blockIndex === 0}
                              style={{
                                width: "100%", height: "auto",
                                display: "block",
                                borderRadius: block.noContainer ? 12 : 0,
                                ...(block.blendMode ? { mixBlendMode: block.blendMode as React.CSSProperties["mixBlendMode"] } : {}),
                              }}
                            />
                          ) : (
                            <span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", textAlign: "center", padding: "0 20px", opacity: 0.5 }}>
                              Image
                            </span>
                          )}
                        </div>
                      )}
                      <p style={{
                        fontFamily: sans, fontSize: 14, color: "var(--text-secondary)",
                        borderLeft: "2px solid var(--accent)", paddingLeft: 12,
                        ...(data.visualBlocksColumns === 2 ? { marginBottom: 20 } : {}),
                      }}>
                        {block.caption}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results — single row, equal-height cards */}
        {data.metrics && data.metrics.length > 0 && (
          <div style={{ marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(32)}>Results</h2>
            <div style={{ display: "flex", gap: 12 }}>
              {data.metrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    flex: 1,
                    padding: "20px 28px",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    background: "var(--card-bg)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: serif, fontSize: 32, lineHeight: 1, color: "var(--accent)", marginBottom: 6 }}>
                    {m.value}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What Changed (outcomes) */}
        {data.outcomes && data.outcomes.length > 0 && (
          <div style={{ maxWidth: 760, marginBottom: 100 }}>
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
                  {/* Code + preview side by side */}
                  <div style={{ display: "grid", gridTemplateColumns: block.previewSrc ? "1fr 1fr" : "1fr", gap: 16 }}>
                    {/* Code panel */}
                    <div style={{
                      background: dark ? "#0d1117" : "#1e1e2e",
                      borderRadius: 12, overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}>
                      {/* Language tag */}
                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 16px",
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                        background: "rgba(255,255,255,0.03)",
                      }}>
                        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                          {block.language}
                        </span>
                        <div style={{ display: "flex", gap: 6 }}>
                          {["#ff5f57","#febc2e","#28c840"].map((c) => (
                            <span key={c} aria-hidden="true" style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
                          ))}
                        </div>
                      </div>
                      {/* Code */}
                      <pre style={{
                        fontFamily: mono, fontSize: 12, lineHeight: 1.7,
                        color: "#cdd6f4", padding: "20px 20px",
                        margin: 0, overflowX: "auto", whiteSpace: "pre",
                      }}>
                        <CodeHighlight code={block.code} language={block.language} />
                      </pre>
                    </div>
                    {/* Preview panel */}
                    {block.previewSrc && (
                      <div style={{
                        borderRadius: 12, overflow: "hidden",
                        border: "1px solid var(--border)",
                        background: "var(--card-bg)",
                        display: "flex", alignItems: "stretch",
                      }}>
                        <Image
                          src={block.previewSrc}
                          alt={`${block.title} preview`}
                          width={0} height={0}
                          sizes="(max-width: 1160px) 100vw, 560px"
                          style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── All Projects — jump to any case study ── */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 40,
            marginBottom: 40,
          }}
        >
          <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 16 }}>
            All Projects
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", rowGap: 8 }}>
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
        </div>

        {/* Prev / Next */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 24,
            marginBottom: 80,
            gap: 16,
          }}
        >
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

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "64px 0 96px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <p style={{ fontFamily: serif, fontSize: "clamp(24px, 3.5vw, 40px)", color: "var(--text-primary)", marginBottom: 24, fontWeight: 400, letterSpacing: "-0.01em" }}>
            {data.ctaText ?? "Interested in working together?"}
          </p>
          <a
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
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
