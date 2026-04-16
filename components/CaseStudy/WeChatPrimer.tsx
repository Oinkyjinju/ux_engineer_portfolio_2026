"use client";
/**
 * WeChatPrimer — IATA WeChat case study context card
 * Shows key WeChat constraints in a digestible format.
 * Rendered after the approach section to give context before the design work.
 */
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const BLUE = "#003DA5";
const mono = "'JetBrains Mono', monospace";
const sans = "'Red Hat Text', system-ui, sans-serif";

const CONSTRAINTS = [
  { icon: "⊘", label: "No URL bar",        detail: "Navigation is app-internal; no browser history" },
  { icon: "◧", label: "No back button",    detail: "App must handle navigation state explicitly" },
  { icon: "⌧", label: "2MB package limit", detail: "Per-subpackage ceiling enforced by WeChat" },
  { icon: "Aa", label: "System fonts only", detail: "PingFang SC · Heiti SC — no custom typefaces" },
  { icon: "QR", label: "QR-primary UX",    detail: "Entry points are QR codes, not URLs" },
  { icon: "EN/中", label: "Bilingual specs",  detail: "All annotations in English + Simplified Chinese" },
];

export function WeChatPrimer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} style={{ marginBottom: 80 }}>
      <p style={{
        fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
        textTransform: "uppercase", color: BLUE, marginBottom: 8, fontWeight: 400,
      }}>
        WeChat Platform Constraints
      </p>
      <p style={{
        fontFamily: sans, fontSize: 14, color: "var(--text-secondary)",
        marginBottom: 20, maxWidth: 580, lineHeight: 1.6,
      }}>
        Designing for WeChat means designing inside an ecosystem that assumes none of
        what Western mobile design assumes. These constraints were documented and integrated before
        a single screen was built.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 1,
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
        }}
        role="list"
        aria-label="WeChat Mini-Program design constraints"
      >
        {CONSTRAINTS.map((c, i) => (
          <motion.div
            key={c.label}
            role="listitem"
            initial={reduce ? {} : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: reduce ? 0 : i * 0.07 }}
            style={{
              padding: "18px 20px",
              background: "var(--card-bg)",
              borderRight: (i + 1) % 3 === 0 ? "none" : "1px solid var(--border)",
              borderBottom: i < CONSTRAINTS.length - 3 ? "1px solid var(--border)" : "none",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                aria-hidden="true"
                style={{
                  fontFamily: mono, fontSize: 13, color: BLUE,
                  background: `${BLUE}15`, border: `1px solid ${BLUE}30`,
                  borderRadius: 6, padding: "2px 6px",
                  minWidth: 32, textAlign: "center",
                }}
              >
                {c.icon}
              </span>
              <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.05em", color: "var(--text-primary)" }}>
                {c.label}
              </span>
            </div>
            <p style={{
              fontFamily: sans, fontSize: 12, color: "var(--text-secondary)",
              margin: 0, lineHeight: 1.5,
            }}>
              {c.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
