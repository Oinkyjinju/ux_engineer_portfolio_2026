"use client";

import { useState, useEffect } from "react";
import AnimatedBackground from "./AnimatedBackground";
import ScrollReveal from "./ScrollReveal";
import ProjectRow from "./ProjectRow";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useScrollY } from "@/hooks/useScrollY";
import { projects } from "@/data/projects";

const labItems = [
  { title: "Betjeman & Barton",  tech: "HTML · CSS · JS",    desc: "Responsive redesign. Vanilla code, no frameworks.", c: "#b45309" },
  { title: "Front-End Modules",  tech: "PHP · WordPress",    desc: "30+ production components powering justcapital.com.", c: "#047857" },
  { title: "This Portfolio",     tech: "Next.js · React",    desc: "Built from scratch. You're looking at it.", c: "#3730a3" },
];

const skills = [
  { label: "Figma",       c: "#a259ff" },
  { label: "HTML/CSS",    c: "#e44d26" },
  { label: "JavaScript",  c: "#f7df1e" },
  { label: "PHP",         c: "#777bb4" },
  { label: "React",       c: "#61dafb" },
  { label: "7 Languages", c: "#059669" },
];

const footerLinks = [
  { label: "Email",    href: "mailto:oinkyjinju@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jinjuparkoinky" },
  { label: "GitHub",   href: "https://github.com/Oinkyjinju" },
];

const heroWords = ["I design", " products ", "and", " build them."] as const;

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const mouse = useMousePosition();
  const scrollY = useScrollY();

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 300);
  }, []);

  const theme = {
    ...(dark
      ? {
          "--bg": "#06060A",
          "--text-primary": "#F0EEE9",
          "--text-secondary": "#9B9A97",
          "--text-tertiary": "#5E5D5A",
          "--border": "rgba(255,255,255,0.06)",
          "--card-bg": "rgba(255,255,255,0.02)",
        }
      : {
          "--bg": "#F5F4F0",
          "--text-primary": "#18181A",
          "--text-secondary": "#5C5B58",
          "--text-tertiary": "#8E8D8A",
          "--border": "rgba(0,0,0,0.08)",
          "--card-bg": "rgba(0,0,0,0.02)",
        }),
    "--font-display": "'Playfair Display', Georgia, serif",
    "--font-body":    "'Source Sans 3', system-ui, sans-serif",
    "--font-mono":    "'JetBrains Mono', monospace",
  } as React.CSSProperties;

  return (
    <div
      style={{
        ...theme,
        backgroundColor: "var(--bg)",
        minHeight: "100vh",
        transition: "background-color 0.5s ease",
        position: "relative",
      }}
    >
      <AnimatedBackground scrollY={scrollY} mouse={mouse} dark={dark} />

      {/* ── NAV ── */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px clamp(20px, 5vw, 64px)",
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          backgroundColor: dark ? "rgba(6,6,10,0.7)" : "rgba(245,244,240,0.7)",
          backdropFilter: "blur(24px) saturate(1.4)",
          borderBottom: "1px solid var(--border)",
          transition: "background-color 0.5s ease",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 500,
            color: "var(--text-primary)",
            textDecoration: "none",
          }}
        >
          Jinju Park
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {["Work", "Lab", "About", "Contact"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-secondary)"; }}
            >
              {label}
            </a>
          ))}

          <button
            onClick={() => setDark(!dark)}
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              borderRadius: 24,
              padding: "5px 12px",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.3s ease",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: 12, height: 12,
                borderRadius: "50%",
                background: dark
                  ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                  : "linear-gradient(135deg, #1e1b4b, #312e81)",
                transition: "all 0.4s ease",
              }}
            />
            {dark ? "light" : "dark"}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          padding: "clamp(140px, 20vh, 220px) clamp(20px, 5vw, 64px) clamp(80px, 12vh, 140px)",
          maxWidth: 1060,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.8s ease" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--text-tertiary)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 24,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.6s ease 0.3s",
            }}
          >
            Senior UX Engineer
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 7vw, 78px)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              maxWidth: 780,
              marginBottom: 28,
            }}
          >
            {heroWords.map((word, i) => (
              <span
                key={i}
                style={{
                  display: "inline",
                  opacity: heroVisible ? 1 : 0,
                  transition: `opacity 0.6s ease ${0.4 + i * 0.15}s`,
                  ...(word === "and"
                    ? {
                        fontStyle: "italic",
                        background: "linear-gradient(135deg, #7C3AED, #2563EB, #059669)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundSize: "200% 200%",
                      }
                    : {}),
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.8vw, 19px)",
              fontWeight: 300,
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              maxWidth: 560,
              marginBottom: 36,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(15px)",
              transition: "all 0.7s ease 0.9s",
            }}
          >
            4+ years as sole designer at JUST Capital, where I expanded into owning
            the front-end codebase. Research → design → production code, one person.
          </p>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.7s ease 1.1s",
            }}
          >
            {skills.map((s) => (
              <span
                key={s.label}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: dark ? s.c : "var(--text-secondary)",
                  border: `1px solid ${s.c}25`,
                  borderRadius: 20,
                  padding: "4px 12px",
                  background: `${s.c}08`,
                  backdropFilter: "blur(4px)",
                }}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section
        id="work"
        style={{
          padding: "0 clamp(20px, 5vw, 64px) 80px",
          maxWidth: 1060,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <ScrollReveal>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              paddingBottom: 12,
              borderBottom: "1px solid var(--border)",
              marginBottom: 0,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 400,
                color: "var(--text-tertiary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Selected Work
            </h2>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-tertiary)" }}>
              {projects.length} projects
            </span>
          </div>
        </ScrollReveal>

        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </section>

      {/* ── LAB ── */}
      <section
        id="lab"
        style={{
          padding: "60px clamp(20px, 5vw, 64px)",
          maxWidth: 1060,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <ScrollReveal>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 400,
              color: "var(--text-tertiary)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Lab
          </h2>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {labItems.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 20,
                  background: "var(--card-bg)",
                  backdropFilter: "blur(12px)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${item.c}40`;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: item.c }}>
                  {item.tech}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 17,
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    margin: "6px 0 4px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: "36px clamp(20px, 5vw, 64px)",
          borderTop: "1px solid var(--border)",
          maxWidth: 1060,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text-tertiary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-tertiary)"; }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-tertiary)" }}>
          Built with Next.js · © 2026
        </span>
      </footer>
    </div>
  );
}
