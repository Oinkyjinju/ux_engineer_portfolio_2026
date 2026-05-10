"use client";
/**
 * SpecimenGrid — Netflix & Disney+ multilingual typography showcase
 * Shows the exact languages Jinju worked on: Latin (fr, fr-CA, da, nb, ro)
 * and East Asian (ja, ko). Each entry shows a title sample + typographic note.
 * Stagger reveal on scroll-into-view.
 */
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const RED   = "#E50914";
const mono  = "'JetBrains Mono', monospace";
const sans  = "'Red Hat Text', system-ui, sans-serif";
const serif = "'Gloock', Georgia, serif";

// The exact language markets Jinju worked on
const SCRIPTS = [
  {
    family: "Latin",
    note:   "5 markets",
    sample: "Stranger Things",
    // Title card in each market language (kept in English by Netflix in these markets)
    languages: [
      { code: "fr",    name: "French",           sample: "Stranger Things" },
      { code: "fr-CA", name: "Canadian French",  sample: "Stranger Things" },
      { code: "da",    name: "Danish",           sample: "Stranger Things" },
      { code: "nb",    name: "Norwegian Bokmål", sample: "Stranger Things" },
      { code: "ro",    name: "Romanian",         sample: "Stranger Things" },
    ],
    typNote: "Established a unified Latin baseline optimized for optical margin alignment and variable title card widths. Engineered precise diacritic clearance for regional characters (é, à, â, ø, ă, ș).",
    color: RED,
    fontSize: 22,
    fontFamily: serif,
  },
  {
    family: "Japanese",
    note:   "ja",
    sample: "ストレンジャー・シングス",
    languages: [
      { code: "ja", name: "Japanese", sample: "ストレンジャー・シングス" },
    ],
    typNote: "Orchestrated mixed-script composition to achieve visual balance between Katakana and Kanji characters. Recalibrated vertical rhythm (adjusting line-height to 1.9 vs. the Latin 1.4) and renegotiated title card height contracts with engineering.",
    color: "#E50914",
    fontSize: 20,
    fontFamily: "system-ui, sans-serif",
  },
  {
    family: "Korean",
    note:   "ko",
    sample: "기묘한 이야기",
    languages: [
      { code: "ko", name: "Korean", sample: "기묘한 이야기" },
    ],
    typNote: "Architected layouts around the Hangul grid, enforcing square character frames and custom word-spacing overrides where standard Latin kerning pairs fail. Implemented strict minimum height requirements for title cards on a per-component basis.",
    color: "#E50914",
    fontSize: 20,
    fontFamily: "system-ui, sans-serif",
  },
];

export function SpecimenGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} style={{ marginBottom: 80 }}>
      {/* Header */}
      <p style={{
        fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
        textTransform: "uppercase", color: RED, marginBottom: 8, fontWeight: 400,
      }}>
        Languages Worked On
      </p>
      <p style={{
        fontFamily: sans, fontSize: 14, color: "var(--text-secondary)",
        marginBottom: 24, maxWidth: 600, lineHeight: 1.6,
      }}>
        Localization across 7 markets and 2 script systems. Because Latin defaults do not transfer, each market required independent typographic architecture and a first-principles rebuild.
      </p>

      {/* Cards */}
      <div
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
        role="list"
        aria-label="Markets and scripts covered"
      >
        {SCRIPTS.map((s, i) => (
          <motion.div
            key={s.family}
            role="listitem"
            initial={reduce ? {} : { opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : i * 0.12 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 20,
              padding: "20px 24px",
              background: "var(--card-bg)",
              border: `1px solid var(--border)`,
              borderLeft: `3px solid ${s.color}`,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            {/* Left: label + sample + typographic note */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{
                  fontFamily: mono, fontSize: 9, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: s.color,
                }}>
                  {s.family}
                </span>
                <span style={{
                  fontFamily: mono, fontSize: 9,
                  color: "var(--text-secondary)",
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 3,
                  padding: "1px 6px",
                }}>
                  {s.note}
                </span>
              </div>

              {/* Sample text */}
              <p style={{
                fontFamily: s.fontFamily,
                fontSize: s.fontSize,
                lineHeight: s.family === "Latin" ? 1.25 : 1.5,
                color: "var(--text-primary)",
                margin: "0 0 10px 0",
              }}>
                {s.sample}
              </p>

              {/* Typographic note */}
              <p style={{
                fontFamily: mono, fontSize: 10,
                color: "var(--text-secondary)",
                margin: 0,
                lineHeight: 1.6,
                maxWidth: 520,
              }}>
                {s.typNote}
              </p>
            </div>

            {/* Right: language code chips */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
              {s.languages.map((lang) => (
                <div key={lang.code} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{
                    fontFamily: mono, fontSize: 10,
                    color: s.color,
                    background: `${s.color}10`,
                    border: `1px solid ${s.color}30`,
                    borderRadius: 4,
                    padding: "2px 7px",
                    whiteSpace: "nowrap",
                  }}>
                    {lang.code}
                  </span>
                  <span style={{
                    fontFamily: sans, fontSize: 11,
                    color: "var(--text-secondary)",
                    whiteSpace: "nowrap",
                  }}>
                    {lang.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total summary */}
      <div style={{
        marginTop: 16,
        display: "flex", alignItems: "center", gap: 16,
        padding: "12px 16px",
        background: `${RED}08`,
        border: `1px solid ${RED}20`,
        borderRadius: 8,
      }}>
        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: RED }}>
          Total
        </span>
        <span style={{ fontFamily: mono, fontSize: 11, color: "var(--text-secondary)" }}>
          7 markets · 2 script systems · fr · fr-CA · da · nb · ro · ja · ko
        </span>
      </div>
    </div>
  );
}
