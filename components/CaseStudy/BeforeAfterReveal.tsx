"use client";
/**
 * BeforeAfterReveal — IATA design evolution
 * Shows before/after comparison text panels with a draggable divider.
 * For cases where we don't have actual before/after images, uses design-spec style text cards.
 */
import { useRef, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const BLUE = "#003DA5";
const mono = "'JetBrains Mono', monospace";
const sans = "'Red Hat Text', system-ui, sans-serif";

const COMPARISONS = [
  {
    dimension: "Navigation",
    before: { label: "Western assumption", content: "Browser back button handles navigation. URL bar shows location. Breadcrumbs are supplemental." },
    after:  { label: "WeChat-native",      content: "App-managed nav stack. Bottom tab bar as primary wayfinding. QR codes as entry points — no URL expectation." },
  },
  {
    dimension: "Typography",
    before: { label: "Western default",    content: "Custom brand typeface via web font. Latin-optimized line-height (1.4–1.6). Variable font weights." },
    after:  { label: "WeChat constraint",  content: "PingFang SC / Heiti SC only. CJK-adjusted line-height (1.7–1.8). System weight tokens only." },
  },
  {
    dimension: "Spec Language",
    before: { label: "English-only",       content: "Figma annotations in English. Dev team interprets. Ambiguity in cultural/UI term translation." },
    after:  { label: "Bilingual EN + ZH",  content: "Every annotation duplicated in Simplified Chinese. Zero design-to-implementation discrepancies in QA." },
  },
];

export function BeforeAfterReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = useCallback((dim: string) => {
    setExpanded((prev) => (prev === dim ? null : dim));
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: 80 }}>
      <p style={{
        fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
        textTransform: "uppercase", color: BLUE, marginBottom: 8, fontWeight: 400,
      }}>
        Design Decisions: Before → After
      </p>
      <p style={{
        fontFamily: sans, fontSize: 14, color: "var(--text-secondary)",
        marginBottom: 24, maxWidth: 580, lineHeight: 1.6,
      }}>
        Three dimensions where designing from WeChat-native first — rather than
        adapting Western defaults — fundamentally changed the design.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
        {COMPARISONS.map((c, i) => {
          const isOpen = expanded === c.dimension;

          return (
            <motion.div
              key={c.dimension}
              initial={reduce ? {} : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : i * 0.1 }}
              style={{
                borderBottom: i < COMPARISONS.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              {/* Header — always visible */}
              <button
                onClick={() => toggle(c.dimension)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  background: "var(--card-bg)",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: 12,
                }}
              >
                <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.06em", color: "var(--text-primary)", textTransform: "uppercase" }}>
                  {c.dimension}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: mono, fontSize: 10, color: "var(--text-secondary)" }}>
                    {c.before.label}
                  </span>
                  <span style={{ color: BLUE, fontSize: 12 }}>→</span>
                  <span style={{ fontFamily: mono, fontSize: 10, color: BLUE }}>
                    {c.after.label}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      marginLeft: 8, color: "var(--text-secondary)", fontSize: 10,
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.25s ease",
                      display: "inline-block",
                    }}
                  >
                    ▾
                  </span>
                </div>
              </button>

              {/* Expanded detail */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 0,
                  padding: "0 0 0 0",
                }}>
                  {/* Before */}
                  <div style={{
                    padding: "16px 20px",
                    borderRight: "1px solid var(--border)",
                    borderTop: "1px solid var(--border)",
                    background: "rgba(255,255,255,0.01)",
                  }}>
                    <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", margin: "0 0 8px" }}>Before</p>
                    <p style={{ fontFamily: sans, fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                      {c.before.content}
                    </p>
                  </div>
                  {/* After */}
                  <div style={{
                    padding: "16px 20px",
                    borderTop: "1px solid var(--border)",
                    background: `${BLUE}06`,
                  }}>
                    <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: BLUE, margin: "0 0 8px" }}>After</p>
                    <p style={{ fontFamily: sans, fontSize: 13, color: "var(--text-primary)", margin: 0, lineHeight: 1.6 }}>
                      {c.after.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
