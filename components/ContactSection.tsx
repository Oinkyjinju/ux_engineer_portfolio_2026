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
        padding: "100px clamp(24px, 5vw, 64px) 80px",
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
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: 20,
            }}
          >
            The right role is one where design and engineering share a wall.
          </h2>
          <div style={{ marginBottom: 44 }} />
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          {/* Availability — subtle mono line */}
          <p
            style={{
              fontFamily: mono,
              fontSize: 12,
              letterSpacing: "0.04em",
              color: "var(--text-secondary)",
              marginBottom: 32,
              marginTop: 0,
            }}
          >
            <span style={{ color: "var(--accent)" }}>→</span>&nbsp;&nbsp;Available for Senior &amp; Staff IC roles
          </p>

          {/* Email copy button */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              className="contact-email-btn"
              onClick={handleCopy}
              aria-label={copied ? "Email copied" : "Copy email to clipboard"}
              style={{
                fontFamily: mono,
                fontSize: 12,
                letterSpacing: "0.02em",
                color: copied ? (dark ? "#09090E" : "#F8F7F2") : "var(--text-primary)",
                background: copied ? "var(--accent)" : "var(--card-bg)",
                border: `1px solid ${copied ? "var(--accent)" : "var(--border)"}`,
                borderRadius: 6,
                padding: "7px 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.25s ease",
              }}
            >
              {EMAIL}
              {copied && (
                <span style={{ fontSize: 11, opacity: 0.85 }}>✓</span>
              )}
            </button>

            <div style={{ display: "flex", gap: 10 }}>
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
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    padding: "7px 12px",
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
