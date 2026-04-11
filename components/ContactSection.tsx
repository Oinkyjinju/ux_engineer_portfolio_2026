"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface Props { dark: boolean; }

export default function ContactSection({ dark }: Props) {
  const [copied, setCopied] = useState(false);
  const EMAIL = "jinju@jinjupark-design.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback: open mailto
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const mono  = "'JetBrains Mono', monospace";
  const serif = "'Gloock', Georgia, serif";
  const sans  = "'Red Hat Text', system-ui, sans-serif";

  return (
    <section
      id="contact"
      style={{
        padding: "100px clamp(24px, 6vw, 96px) 80px",
        maxWidth: 1160,
        margin: "0 auto",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 80,
        }}
      >
        <ScrollReveal>
          <p
            style={{
              fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "var(--accent)", marginBottom: 32,
            }}
          >
            Contact
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h2
            style={{
              fontFamily: serif,
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: 20,
              maxWidth: 680,
            }}
          >
            The right role is one where
            <br />
            design and engineering share a wall.
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--text-secondary)",
              marginBottom: 20,
              maxWidth: 560,
            }}
          >
            I&apos;m looking for Senior or Staff IC opportunities where I can lead the
            intersection of design systems, front-end architecture, and product strategy.
            My ideal environment is a product-led team building high-density tools where
            the interface is the primary technical challenge.
          </p>
          <p
            style={{
              fontFamily: sans,
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--text-secondary)",
              marginBottom: 40,
              maxWidth: 560,
            }}
          >
            Beyond full-time engineering, I am available for part-time UX/UI design
            projects and strategic design system consulting.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          {/* Availability badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: "7px 14px",
              marginBottom: 36,
              background: "var(--card-bg)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#28CA41",
                display: "inline-block",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: mono, fontSize: 11, letterSpacing: "0.06em",
                textTransform: "uppercase", color: "var(--text-secondary)",
              }}
            >
              Available for senior roles &amp; consulting
            </span>
          </div>

          {/* Email copy button */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              className="contact-email-btn"
              onClick={handleCopy}
              style={{
                fontFamily: mono,
                fontSize: 14,
                letterSpacing: "0.02em",
                color: copied ? (dark ? "#09090E" : "#F8F7F2") : "var(--text-primary)",
                background: copied ? "var(--accent)" : "var(--card-bg)",
                border: `1px solid ${copied ? "var(--accent)" : "var(--border)"}`,
                borderRadius: 8,
                padding: "12px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                transition: "all 0.25s ease",
              }}
            >
              {EMAIL}
              <span style={{ fontSize: 12, opacity: 0.7 }}>
                {copied ? "✓ copied" : "↗ copy"}
              </span>
            </button>

            <div style={{ display: "flex", gap: 12 }}>
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/jinjuparkoinky/" },
                { label: "GitHub",   href: "https://github.com/Oinkyjinju/ux_engineer_portfolio_2026" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: sans,
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "12px 18px",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--text-primary)";
                    el.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--text-secondary)";
                    el.style.borderColor = "var(--border)";
                  }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
