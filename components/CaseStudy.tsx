"use client";

import { useState } from "react";
import { type Project } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { ProjectThumbnail } from "./ProjectThumbnails";
import { projects } from "@/data/projects";

interface Props { project: Project; }

export default function CaseStudy({ project }: Props) {
  const [dark] = useState(true);
  const data = caseStudies[project.id];

  const mono  = "'JetBrains Mono', monospace";
  const serif = "'Instrument Serif', Georgia, serif";
  const sans  = "'Inter', system-ui, sans-serif";

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject  = projects[currentIndex - 1];
  const nextProject  = projects[currentIndex + 1];

  const theme = {
    "--bg":             "#09090E",
    "--text-primary":   "#EDEAE3",
    "--text-secondary": "#7D7A73",
    "--text-tertiary":  "#4A4846",
    "--border":         "rgba(255,255,255,0.07)",
    "--card-bg":        "rgba(255,255,255,0.025)",
    "--accent":         "#F5A623",
    "--accent-muted":   "rgba(245,166,35,0.12)",
    "--code-blue":      "#5B9FFF",
  };

  return (
    <div
      style={{
        ...(theme as React.CSSProperties),
        backgroundColor: "var(--bg)",
        minHeight: "100vh",
        color: "var(--text-primary)",
      }}
    >
      {/* Nav */}
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
          backgroundColor: "rgba(9,9,14,0.88)",
          backdropFilter: "blur(20px) saturate(1.6)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: mono, fontSize: 11, letterSpacing: "0.06em",
            textTransform: "uppercase", color: "var(--text-tertiary)",
            textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"; }}
        >
          ← All work
        </a>

        <a
          href="/"
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 17, fontWeight: 400,
            color: "var(--text-primary)", textDecoration: "none",
          }}
        >
          Jinju Park
        </a>

        <span style={{ fontFamily: mono, fontSize: 11, color: "var(--text-tertiary)", letterSpacing: "0.04em" }}>
          {project.company} · {project.year}
        </span>
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
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(transparent, #09090E)", pointerEvents: "none" }} />

        <div
          style={{
            position: "relative", zIndex: 1,
            maxWidth: 1160, margin: "0 auto",
            padding: "80px clamp(24px, 6vw, 96px) 100px",
          }}
        >
          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: mono, fontSize: 10, letterSpacing: "0.06em",
                  textTransform: "uppercase", padding: "4px 12px",
                  borderRadius: 20, border: `1px solid ${project.accent}55`,
                  color: `${project.accent}cc`, background: `${project.accent}11`,
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
          <p style={{ fontFamily: sans, fontSize: 18, color: "rgba(237,234,227,0.6)", marginBottom: 0 }}>
            {project.subtitle}
          </p>
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
            { label: "Role",     value: data?.role     ?? "" },
            { label: "Team",     value: data?.team     ?? "" },
            { label: "Company",  value: project.company },
            { label: "Timeline", value: project.year },
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

        {/* Thumbnail + Challenge two-col */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "center",
            marginBottom: 100,
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProjectThumbnail project={project} />
          </div>

          <div>
            <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
              The Challenge
            </p>
            <p style={{ fontFamily: serif, fontSize: "clamp(20px, 2.4vw, 26px)", lineHeight: 1.5, color: "var(--text-primary)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              {data?.challenge ?? ""}
            </p>
          </div>
        </div>

        {/* Approach */}
        <div style={{ maxWidth: 760, marginBottom: 100 }}>
          <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
            My Approach
          </p>
          <p style={{ fontFamily: sans, fontSize: 17, lineHeight: 1.75, color: "var(--text-secondary)" }}>
            {data?.approach ?? ""}
          </p>
        </div>

        {/* Process — 3 columns */}
        <div style={{ marginBottom: 100 }}>
          <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 40 }}>
            How It Got Built
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "clamp(24px, 4vw, 56px)" }}>
            {(
              [
                { num: "01", title: "Discover", icon: "◎", items: data?.process.discover ?? [] },
                { num: "02", title: "Design",   icon: "◈", items: data?.process.design   ?? [] },
                { num: "03", title: "Ship",     icon: "◆", items: data?.process.ship     ?? [] },
              ] as const
            ).map((step) => (
              <div key={step.num}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div
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
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
                    {step.num}
                  </span>
                </div>
                <h3 style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)", marginBottom: 16 }}>
                  {step.title}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {step.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: sans, fontSize: 14, color: "var(--text-secondary)",
                        lineHeight: 1.6, padding: "5px 0",
                        display: "flex", alignItems: "flex-start", gap: 8,
                      }}
                    >
                      <span style={{ color: "var(--accent)", fontSize: 10, marginTop: 4, flexShrink: 0 }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Impact metrics */}
        {data?.metrics && data.metrics.length > 0 && (
          <div style={{ marginBottom: 100 }}>
            <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 32 }}>
              Impact
            </p>
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
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech stack */}
        {data?.tech && data.tech.length > 0 && (
          <div style={{ marginBottom: 100 }}>
            <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
              Tech & Tools
            </p>
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
                fontFamily: sans, fontSize: 14, color: "var(--text-secondary)",
                textDecoration: "none", display: "flex", flexDirection: "column", gap: 4,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
            >
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>← Previous</span>
              {prevProject.title}
            </a>
          ) : <span />}

          {nextProject ? (
            <a
              href={`/work/${nextProject.id}`}
              style={{
                fontFamily: sans, fontSize: 14, color: "var(--text-secondary)",
                textDecoration: "none", display: "flex", flexDirection: "column", gap: 4,
                textAlign: "right", transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
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
            Interested in working together?
          </p>
          <a
            href="/#contact"
            style={{
              display: "inline-block",
              fontFamily: sans, fontSize: 14, fontWeight: 500,
              color: "#09090E",
              background: "var(--accent)",
              padding: "12px 28px", borderRadius: 8,
              textDecoration: "none", transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            Get in touch →
          </a>
        </div>
      </div>
    </div>
  );
}
