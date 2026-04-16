"use client";
/**
 * GapLedger — JUST Rebrand "what the agency missed" table
 * Two-column: "Agency Delivered" (dim cross) vs "Engineer Built" (teal check).
 * Stagger row reveal on scroll-into-view. Live counter at bottom.
 */
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

const TEAL = "#1A6678";
const mono  = "'JetBrains Mono', monospace";
const sans  = "'Red Hat Text', system-ui, sans-serif";
const serif = "'Gloock', Georgia, serif";

const ROWS = [
  {
    gap: "Fluid Responsive Architecture",
    agency: "Delivered static desktop comps only",
    built:  "Architected a fluid breakpoint system scaling seamlessly from 320px mobile to 1920px+ ultrawide displays.",
  },
  {
    gap: "Interactive UI States",
    agency: "Static mockups with no interactive feedback.",
    built:  "Programmed all interactive states (Hover, Active, Focus, Disabled) per component to ensure complete keyboard accessibility.",
  },
  {
    gap: "Data Visualisation (D3) Translation",
    agency: "High-level concept pages with no developer specifications.",
    built:  "Bridged the gap between concept and execution by engineering pixel-level layouts and animation specs for the D3 charts.",
  },
];

export function GapLedger() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  // Count up from 0 → 35 when in view
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setCount(35); return; }
    const step = () =>
      setCount((prev) => {
        if (prev >= 35) return 35;
        const next = prev + Math.ceil((35 - prev) / 5);
        if (next >= 35) return 35;
        setTimeout(step, 60);
        return next;
      });
    const t = setTimeout(step, 400);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  return (
    <div ref={ref} style={{ marginBottom: 80 }}>
      {/* Header */}
      <p style={{
        fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
        textTransform: "uppercase", color: TEAL, marginBottom: 16,
        fontWeight: 400,
      }}>
        Design Gaps → Engineered Solutions
      </p>
      <p style={{
        fontFamily: sans, fontSize: 14, color: "var(--text-secondary)",
        marginBottom: 24, maxWidth: 600, lineHeight: 1.6,
      }}>
        The external agency delivered beautiful, static desktop mockups. My role as a front-end architect was to go beyond the canvas—filling the crucial interactive, responsive, and accessible gaps the static design never specified.
      </p>

      {/* Table */}
      <div
        role="table"
        aria-label="Agency vs Engineer comparison"
        style={{
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {/* Header row */}
        <div
          role="row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {["Gap", "The Agency Gap", "The Engineered Solution"].map((h) => (
            <div
              key={h}
              role="columnheader"
              style={{
                padding: "10px 16px",
                fontFamily: mono, fontSize: 9,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--text-secondary)",
                borderRight: h !== "The Engineered Solution" ? "1px solid var(--border)" : undefined,
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {ROWS.map((row, i) => (
          <motion.div
            key={row.gap}
            role="row"
            initial={reduce ? {} : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : i * 0.08 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              borderBottom: i < ROWS.length - 1 ? "1px solid var(--border)" : undefined,
            }}
          >
            {/* Gap */}
            <div
              role="cell"
              style={{
                padding: "14px 16px",
                fontFamily: sans, fontSize: 13,
                color: "var(--text-primary)", lineHeight: 1.5,
                borderRight: "1px solid var(--border)",
              }}
            >
              {row.gap}
            </div>
            {/* Agency */}
            <div
              role="cell"
              style={{
                padding: "14px 16px",
                fontFamily: sans, fontSize: 12,
                color: "var(--text-secondary)", lineHeight: 1.5,
                borderRight: "1px solid var(--border)",
                display: "flex", alignItems: "flex-start", gap: 8,
              }}
            >
              <span aria-hidden="true" style={{ color: "rgba(237,234,227,0.2)", fontSize: 14, marginTop: 1 }}>✗</span>
              {row.agency}
            </div>
            {/* Built */}
            <div
              role="cell"
              style={{
                padding: "14px 16px",
                fontFamily: sans, fontSize: 12,
                color: TEAL, lineHeight: 1.5,
                display: "flex", alignItems: "flex-start", gap: 8,
              }}
            >
              <span aria-hidden="true" style={{ color: TEAL, fontSize: 14, marginTop: 1 }}>✓</span>
              {row.built}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Counter footer */}
      <div style={{
        marginTop: 20,
        display: "flex",
        alignItems: "baseline",
        gap: 8,
      }}>
        <span style={{ fontFamily: serif, fontSize: 32, color: TEAL, lineHeight: 1 }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.12 }}
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </span>
        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
          / 35 WordPress modules built
        </span>
      </div>
    </div>
  );
}
