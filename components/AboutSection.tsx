"use client";

import { useState, useRef, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";

const SKILL_CLUSTERS = {
  Design: [
    "Figma", "Design Systems", "Interaction Design",
    "UX Research", "Prototyping", "UX Interview", "Design Tokens",
  ],
  Code: [
    "React", "Next.js", "TypeScript", "CSS / Sass",
    "PHP / WordPress", "D3",
  ],
  Process: [
    "Design Ops", "Cross-cultural UX", "Team Leadership",
    "Accessibility", "Figma Tokens",
  ],
} as const;

type Tab = keyof typeof SKILL_CLUSTERS;

interface Props { dark: boolean; }

export default function AboutSection({ dark }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Design");
  const [visibleSkills, setVisibleSkills] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const observed   = useRef(false);

  // Animate skills in when tab changes
  useEffect(() => {
    setVisibleSkills([]);
    const skills = SKILL_CLUSTERS[activeTab];
    skills.forEach((s, i) => {
      setTimeout(() => setVisibleSkills((prev) => [...prev, s]), i * 60);
    });
  }, [activeTab]);

  // Trigger initial skill animation on scroll-enter
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true;
          setVisibleSkills([]);
          SKILL_CLUSTERS[activeTab].forEach((s, i) => {
            setTimeout(() => setVisibleSkills((prev) => [...prev, s]), i * 60);
          });
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mono     = "'JetBrains Mono', monospace";
  const serif    = "'Gloock', Georgia, serif";
  const sans     = "'Red Hat Text', system-ui, sans-serif";

  const CODE_TOKENS = [
    { kind: "comment", text: "// about.tsx" },
    { kind: "keyword", text: "const" },
    { kind: "var",     text: " Jinju" },
    { kind: "punct",   text: " = {" },
    { kind: "key",     text: '  role:',     val: ' "Design Engineer",' },
    { kind: "key",     text: '  location:', val: ' "New Jersey / NYC",' },
    { kind: "key",     text: '  focus:',    val: ' [' },
    { kind: "str",     text: '    "Design Systems Architecture",' },
    { kind: "str",     text: '    "Data Visualization (D3)",' },
    { kind: "str",     text: '    "Dense Data → Clear Systems",' },
    { kind: "str",     text: '    "Cross-cultural UX at Scale"' },
    { kind: "key",     text: '  ],' },
    { kind: "key",     text: '  shipped:',  val: ' true' },
    { kind: "punct",   text: "};" },
  ];

  const tokenColor = (kind: string) => {
    if (dark) {
      if (kind === "comment") return "#606070";
      if (kind === "keyword") return "#5B9FFF";
      if (kind === "var")     return "#F5A623";
      if (kind === "key")     return "#EDEAE3";
      if (kind === "str")     return "#7CCEA8";
      if (kind === "val")     return "#7CCEA8";
      return "#EDEAE3";
    } else {
      if (kind === "comment") return "#9090A0";
      if (kind === "keyword") return "#1D6FE8";
      if (kind === "var")     return "#C4830A";
      if (kind === "key")     return "#0E0D0A";
      if (kind === "str")     return "#1A8059";
      if (kind === "val")     return "#1A8059";
      return "#0E0D0A";
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "100px clamp(24px, 6vw, 96px)",
        maxWidth: 1160,
        margin: "0 auto",
        position: "relative",
        zIndex: 2,
      }}
    >
      <ScrollReveal>
        <p
          style={{
            fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--accent)", marginBottom: 56,
          }}
        >
          About
        </p>
      </ScrollReveal>

      <div
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "start",
        }}
      >
        {/* Left — prose */}
        <ScrollReveal>
          <div>
            <h2
              style={{
                fontFamily: serif,
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                color: "var(--text-primary)",
                marginBottom: 24,
              }}
            >
              Complexity is the baseline.
              <br />
              Clarity is the achievement.
            </h2>
            <p
              style={{
                fontFamily: sans, fontSize: 16, lineHeight: 1.7,
                color: "var(--text-secondary)", marginBottom: 20,
              }}
            >
              Most design engineers lean one way — stronger in Figma or stronger in code.
              My seven years have been split evenly across both, which is why I ship systems
              end-to-end instead of handing them off halfway. Design systems, data visualization,
              OTT localization in 7 languages, and mobile apps.
            </p>
            <p
              style={{
                fontFamily: sans, fontSize: 16, lineHeight: 1.7,
                color: "var(--text-secondary)", marginBottom: 36,
              }}
            >
              Off-hours: movie and coffee lover. Also: Instagram storytelling, Etsy product
              concepts, logo designs, and hunting for new learnings every day. Based in
              New Jersey, shipping in NYC.
            </p>

            {/* Scale strip — proof behind the pull quote */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 0,
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                marginBottom: 44,
              }}
            >
              {[
                { value: "7+", label: "Years Senior" },
                { value: "1,000+", label: "Data-Point Viz" },
                { value: "50+", label: "Languages Shipped" },
              ].map((m, i) => (
                <div
                  key={m.label}
                  style={{
                    padding: "20px 0",
                    borderRight: i < 2 ? "1px solid var(--border)" : "none",
                    paddingLeft: i === 0 ? 0 : 20,
                  }}
                >
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 24,
                      fontWeight: 600,
                      color: "var(--accent)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 9,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Skill tabs */}
            <div>
              <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
                {(Object.keys(SKILL_CLUSTERS) as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      fontFamily: mono,
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "6px 14px",
                      borderRadius: 20,
                      border: `1px solid ${activeTab === tab ? "var(--accent)" : "var(--border)"}`,
                      background: activeTab === tab ? "var(--accent-muted)" : "transparent",
                      color: activeTab === tab ? "var(--accent)" : "var(--text-tertiary)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  minHeight: 80,
                }}
              >
                {SKILL_CLUSTERS[activeTab].map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: sans,
                      fontSize: 13,
                      padding: "5px 13px",
                      borderRadius: 6,
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                      background: "var(--card-bg)",
                      display: "inline-flex",
                      alignItems: "center",
                      height: 34,
                      opacity: visibleSkills.includes(skill) ? 1 : 0,
                      transform: visibleSkills.includes(skill) ? "translateY(0)" : "translateY(8px)",
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right — decorative code card */}
        <ScrollReveal delay={0.12}>
          <div
            style={{
              borderRadius: 16,
              border: "1px solid var(--border)",
              background: dark ? "rgba(10,10,18,0.85)" : "rgba(255,255,255,0.9)",
              backdropFilter: "blur(20px)",
              padding: "28px 32px",
              boxShadow: dark
                ? "0 0 0 1px rgba(245,166,35,0.06), 0 32px 64px rgba(0,0,0,0.5)"
                : "0 0 0 1px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.1)",
            }}
          >
            {/* Window chrome */}
            <div style={{ display: "flex", gap: 7, marginBottom: 20 }}>
              {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
              ))}
            </div>

            {/* Code tokens */}
            <div style={{ fontFamily: mono, fontSize: 13, lineHeight: 1.85 }}>
              {CODE_TOKENS.map((token, i) => (
                <div key={i}>
                  {token.kind === "key" && token.val ? (
                    <span>
                      <span style={{ color: tokenColor("key") }}>{token.text}</span>
                      <span style={{ color: tokenColor("val") }}>{token.val}</span>
                    </span>
                  ) : (
                    <span style={{ color: tokenColor(token.kind) }}>{token.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
