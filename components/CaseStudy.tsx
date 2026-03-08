"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { type Project } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { ProjectThumbnail } from "./ProjectThumbnails";
import { projects } from "@/data/projects";

interface Props { project: Project; }

// Font constants — stable, no need to recreate per render
const mono  = "'JetBrains Mono', monospace";
const serif = "'Gloock', Georgia, serif";
const sans  = "'Red Hat Text', system-ui, sans-serif";

// Shared section-label style — applied to <h2> so heading hierarchy is preserved
const sectionLabelStyle = (marginBottom: number): React.CSSProperties => ({
  fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
  textTransform: "uppercase", color: "var(--accent)",
  marginTop: 0, marginBottom, fontWeight: 400,
});

export default function CaseStudy({ project }: Props) {
  // Initialize to false — read localStorage in useEffect to avoid SSR hydration mismatch
  const [dark, setDark]         = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const data = caseStudies[project.id];

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject  = projects[currentIndex - 1];
  const nextProject  = projects[currentIndex + 1];

  // Read localStorage only on client — prevents SSR/client hydration mismatch
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
        // Thumbnails keep their full dramatic shadow in dark mode
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
        // Remove the heavy dark shadow behind thumbnails in light mode
        "--thumbnail-shadow": "0 2px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
      };

  // Guard — unknown slug: render a minimal not-found state after all hooks
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
      {/* Nav — mirrors Portfolio.tsx */}
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
              borderRadius: 20, padding: "8px 14px", cursor: "pointer",
              fontFamily: mono, fontSize: 10, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "var(--text-secondary)",
              transition: "border-color 0.2s", minHeight: 36,
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

      {/* Hero */}
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

      {/* Content */}
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
        <div style={{ maxWidth: 760, marginBottom: 100 }}>
          <h2 style={sectionLabelStyle(20)}>My Approach</h2>
          <p style={{ fontFamily: sans, fontSize: 17, lineHeight: 1.75, color: "var(--text-secondary)" }}>
            {data.approach}
          </p>
        </div>

        {/* What I Was Responsible For */}
        {data.whatIDid && (
          <div style={{ maxWidth: 760, marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(20)}>What I Was Responsible For</h2>
            <p style={{ fontFamily: sans, fontSize: 17, lineHeight: 1.75, color: "var(--text-secondary)" }}>
              {data.whatIDid}
            </p>
          </div>
        )}

        {/* ── KEY DESIGN DECISIONS — moved above Process so judgment shows before evidence ── */}
        {data.keyDecisions && data.keyDecisions.length > 0 && (
          <div style={{ maxWidth: 760, marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(32)}>Key Design Decisions</h2>
            {/* ul + role="list" — custom display numbers provide ordinal context visually */}
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }} role="list">
              {data.keyDecisions.map((decision, i) => (
                <li
                  key={decision}
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
                {/* role="list" preserves semantics when list-style is removed (Safari/VoiceOver) */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }} role="list">
                  {step.items.map((item) => (
                    <li
                      key={item}
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

        {/* Visual Blocks — before/after pairs, flow maps, design system strips */}
        {data.visualBlocks && data.visualBlocks.length > 0 && (
          <div style={{ marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(40)}>What Got Redesigned</h2>
            {data.visualBlocks.map((block) => (
              <div key={block.id} style={{ marginBottom: 72 }}>
                {block.layout === "before-after" ? (
                  <>
                    {block.label && (
                      <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 16 }}>
                        {block.label}
                      </p>
                    )}
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start", marginBottom: 12 }}>
                      {/* Before — fixed portrait phone frame (9/16) */}
                      <div style={{ flexShrink: 0 }}>
                        <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 8 }}>
                          Before
                        </p>
                        <div
                          style={{
                            width: 200, aspectRatio: "9/16",
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
                              style={{ objectFit: "cover" }}
                            />
                          ) : (
                            <span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", textAlign: "center", padding: "0 16px", opacity: 0.5 }}>
                              Before screenshot
                            </span>
                          )}
                        </div>
                      </div>

                      {/* After — capped width to keep comparison balanced */}
                      <div style={{ flex: 1, minWidth: 200, maxWidth: 400 }}>
                        <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
                          After
                        </p>
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
                              sizes="(max-width: 768px) 100vw, 400px"
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
                    {/* Caption */}
                    <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", borderLeft: "2px solid var(--accent)", paddingLeft: 12 }}>
                      {block.caption}
                    </p>
                  </>
                ) : block.layout === "screen-grid" ? (
                  /* Hi-fi screen grid — renders each SVG/PNG in a phone-frame cell */
                  <>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 16,
                      marginBottom: 12,
                    }}>
                      {(block.screens ?? []).map((screen, idx) => (
                        <div key={screen.src} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                          {/* Step number — decorative, screen label below provides the text */}
                          <span aria-hidden="true" style={{
                            fontFamily: mono, fontSize: 9, letterSpacing: "0.08em",
                            textTransform: "uppercase", color: "var(--accent)",
                          }}>
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          {/* Phone frame */}
                          <div style={{
                            width: "100%",
                            background: "var(--card-bg)",
                            border: "1px solid var(--border)",
                            borderRadius: 20,
                            overflow: "hidden",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                          }}>
                            {/* SVGs: use plain img — no Next.js optimization needed for vectors */}
                            <img
                              src={screen.src}
                              alt={`${screen.label} screen`}
                              style={{ width: "100%", height: "auto", display: "block" }}
                            />
                          </div>
                          {/* Screen label — text-secondary for legibility in both light and dark */}
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
                  /* Two images side-by-side — each at 50% width, stacks on mobile */
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    {/* Left image */}
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
                            sizes="(max-width: 768px) 100vw, 50vw"
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

                    {/* Right image */}
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
                            sizes="(max-width: 768px) 100vw, 50vw"
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
                  /* Wide / full-bleed image */
                  <>
                    <div
                      style={{
                        width: "100%",
                        background: "var(--card-bg)",
                        border: `1px ${block.imageSrc ? "solid" : "dashed"} var(--border)`,
                        borderRadius: 12, overflow: "hidden",
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
                          sizes="(max-width: 1160px) 100vw, 1160px"
                          style={{ width: "100%", height: "auto", display: "block" }}
                        />
                      ) : (
                        <span style={{ fontFamily: mono, fontSize: 9, color: "var(--text-secondary)", textAlign: "center", padding: "0 20px", opacity: 0.5 }}>
                          Image
                        </span>
                      )}
                    </div>
                    <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", borderLeft: "2px solid var(--accent)", paddingLeft: 12 }}>
                      {block.caption}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Results (metrics) */}
        {data.metrics && data.metrics.length > 0 && (
          <div style={{ marginBottom: 100 }}>
            <h2 style={sectionLabelStyle(32)}>Results</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {data.metrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    padding: "20px 28px",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    background: "var(--card-bg)",
                    minWidth: 110,
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
              {data.outcomes.map((outcome) => (
                <li
                  key={outcome}
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

        {/* Tech stack */}
        {data.tech && data.tech.length > 0 && (
          <div style={{ marginBottom: 100 }}>
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

        {/* Reflection */}
        {data.reflection && (
          <div style={{ maxWidth: 760, marginBottom: 100 }}>
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

        {/* Prev / Next nav */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid var(--border)",
            paddingTop: 40,
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
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)" }}>← Previous</span>
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
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)" }}>Next →</span>
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
              (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)";
              (e.currentTarget as HTMLElement).style.outlineOffset = "3px";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLElement).style.outline = "none";
            }}
          >
            Get in touch →
          </a>
        </div>
      </div>
    </div>
  );
}
