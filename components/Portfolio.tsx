"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";
import HeroSection        from "./HeroSection";
import AboutSection       from "./AboutSection";
import WorkStage          from "./WorkStage";
import ProcessSection     from "./ProcessSection";
import ContactSection     from "./ContactSection";
import PearlLogo          from "./PearlLogo";

const LAB_ITEMS = [
  {
    title: "Physics Sandbox",
    tech: "Three.js · React",
    desc: "This portfolio itself. Particle systems, amber cursor glow, and deterministic motion baked into the landing page.",
    rdNote: "Exploring deterministic physics engines for branded, high-performance UI motion.",
    href: "/",
  },
  {
    title: "Micro-Interactions",
    tech: "Framer Motion · Web APIs",
    desc: "Linear-style industrial minimalism meets developer-centric brutalism. Four production-ready interactions in one playground.",
    rdNote: "Testing Framer Motion spring configs that feel premium at 60fps on low-end devices.",
    href: "/micro",
  },
  {
    title: "Graph Demo",
    tech: "D3.js · Next.js",
    desc: "Force-directed node graph you can drag. Every item is physically connected, and moving one ripples through the network.",
    rdNote: "Experimenting with WebGL-accelerated force layouts for high-density ESG data viz.",
    href: "/graph",
  },
  {
    title: "OS Dashboard",
    tech: "React · CSS",
    desc: "Game-engine UI meets tactile skeuomorphism and command-line aesthetics. Draggable windows, terminal panels, retro chrome.",
    rdNote: "Prototyping windowed UI patterns for multi-panel analyst dashboards.",
    href: "/os",
  },
  {
    title: "Betjeman & Barton",
    tech: "HTML · CSS · JS",
    desc: "Luxury tea house e-commerce. Cursor-follow previews, dropdown nav, product hover overlays.",
    rdNote: "Cursor-driven interaction models for high-end e-commerce. No framework dependencies.",
    href: "/betjeman",
  },
];

const FOOTER_LINKS = [
  { label: "Email",    href: "#contact" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jinjuparkoinky/" },
  { label: "GitHub",   href: "https://github.com/Oinkyjinju/ux_engineer_portfolio_2026" },
];

interface RippleState { x: number; y: number; newDark: boolean }

export default function Portfolio() {
  // Lazy initializer reads localStorage synchronously — avoids flash of wrong theme
  const [dark, setDark]         = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });
  const [ripple, setRipple]     = useState<RippleState | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newDark = !dark;
    localStorage.setItem("theme", newDark ? "dark" : "light");
    setRipple({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, newDark });
  };

  const theme = dark
    ? {
        "--bg":             "#09090E",
        "--text-primary":   "#EDEAE3",
        "--text-secondary": "#7D7A73",
        "--text-tertiary":  "#4A4846",
        "--border":         "rgba(255,255,255,0.07)",
        "--card-bg":        "rgba(255,255,255,0.025)",
        "--accent":         "#F5A623",
        "--accent-muted":   "rgba(245,166,35,0.12)",
        "--code-blue":      "#5B9FFF",
        "--font-display":   "'Gloock', Georgia, serif",
        "--font-body":      "'Red Hat Text', system-ui, sans-serif",
        "--font-mono":      "'JetBrains Mono', monospace",
      }
    : {
        "--bg":             "#F8F7F2",
        "--text-primary":   "#0E0D0A",
        "--text-secondary": "#5A5855",
        "--text-tertiary":  "#8E8C89",
        "--border":         "rgba(0,0,0,0.09)",
        "--card-bg":        "rgba(0,0,0,0.03)",
        "--accent":         "#2563EB",
        "--accent-muted":   "rgba(37,99,235,0.1)",
        "--code-blue":      "#4F46E5",
        "--thumbnail-shadow": "0 0 0 0 transparent",
        "--font-display":   "'Gloock', Georgia, serif",
        "--font-body":      "'Red Hat Text', system-ui, sans-serif",
        "--font-mono":      "'JetBrains Mono', monospace",
      };

  const mono  = "'JetBrains Mono', monospace";
  const sans  = "'Red Hat Text', system-ui, sans-serif";
  const serif = "'Gloock', Georgia, serif";

  return (
    <div
      style={{
        ...(theme as React.CSSProperties),
        backgroundColor: "var(--bg)",
        minHeight: "100vh",
        transition: "background-color 0.4s ease",
        position: "relative",
      }}
    >
      {/* Skip navigation — WCAG 2.4.1 */}
      <a href="#work" className="skip-nav">Skip to content</a>

      <AnimatedBackground dark={dark} />

      {/* Ripple mode-switch overlay */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            key={ripple.newDark ? "to-dark" : "to-light"}
            initial={{ clipPath: `circle(0px at ${ripple.x}px ${ripple.y}px)` }}
            animate={{ clipPath: `circle(200vmax at ${ripple.x}px ${ripple.y}px)` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => { setDark(ripple.newDark); setRipple(null); }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              backgroundColor: ripple.newDark ? "#09090E" : "#F8F7F2",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 clamp(24px, 5vw, 64px)",
          height: 60,
          backgroundColor: scrolled
            ? (dark ? "rgba(9,9,14,0.82)" : "rgba(248,247,242,0.82)")
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.6)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "background-color 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex", alignItems: "center", gap: 10,
            textDecoration: "none",
          }}
        >
          <PearlLogo dark={dark} size={26} />
          <span style={{ fontFamily: serif, fontSize: 17, fontWeight: 400, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
            Jinju Park
          </span>
        </Link>

        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {["Work", "Lab", "About", "Contact"].map((label) => {
            const navLinkColor = dark ? "#7A7873" : "var(--text-tertiary)";
            return (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                style={{
                  fontFamily: mono, fontSize: 11, letterSpacing: "0.07em",
                  textTransform: "uppercase", color: navLinkColor,
                  textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = navLinkColor; }}
              >
                {label}
              </a>
            );
          })}

          <button
            onClick={handleToggle}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "var(--card-bg)", border: "1px solid var(--border)",
              borderRadius: 20, padding: "5px 13px", cursor: "pointer",
              fontFamily: mono, fontSize: 10, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "var(--text-tertiary)",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          >
            <span
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

      {/* Sections — ordered for hiring narrative: Hook → Proof → Range → Know me → Method → CTA */}
      <HeroSection    dark={dark} />
      <WorkStage      dark={dark} />

      {/* Lab */}
      <section
        id="lab"
        style={{
          padding: "80px clamp(24px, 6vw, 96px)",
          maxWidth: 1160, margin: "0 auto",
          position: "relative", zIndex: 2,
        }}
      >
        <p
          style={{
            fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--accent)", marginBottom: 16,
          }}
        >
          The Interaction Laboratory
        </p>
        <p
          className="lab-intro"
          style={{
            fontFamily: sans, fontSize: 15, color: "var(--text-secondary)",
            marginBottom: 36, maxWidth: 720,
          }}
        >
          High-fidelity chaos and experimental interaction. My personal playground for what production won&apos;t let me do, yet.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {LAB_ITEMS.map((item) => (
            <a
              key={item.title}
              href={item.href}
              style={{
                textDecoration: "none", display: "block",
                border: "1px solid var(--border)", borderRadius: 14,
                padding: "22px 24px", background: "var(--card-bg)",
                backdropFilter: "blur(12px)", transition: "border-color 0.25s, transform 0.25s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--accent)"; el.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)"; el.style.transform = "translateY(0)";
              }}
            >
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: 10 }}>
                {item.tech}
              </span>
              <h3 style={{ fontFamily: serif, fontSize: 20, fontWeight: 400, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.01em" }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: sans, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55, margin: 0 }}>
                {item.desc}
              </p>
              {item.rdNote && (
                <p style={{
                  fontFamily: mono, fontSize: 10, letterSpacing: "0.04em",
                  color: "var(--text-tertiary)", lineHeight: 1.5,
                  marginTop: 12, paddingTop: 10,
                  borderTop: "1px solid var(--border)",
                  fontStyle: "italic", opacity: 0.7,
                }}>
                  {item.rdNote}
                </p>
              )}
            </a>
          ))}
        </div>
      </section>

      <AboutSection   dark={dark} />
      <ProcessSection dark={dark} />
      <ContactSection dark={dark} />

      {/* Footer */}
      <footer
        style={{
          padding: "28px clamp(24px, 6vw, 96px)",
          borderTop: "1px solid var(--border)",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 12,
          position: "relative", zIndex: 2,
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          {FOOTER_LINKS.map((link) => (
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
  );
}
