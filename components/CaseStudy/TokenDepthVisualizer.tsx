"use client";
/**
 * TokenDepthVisualizer — JUST Intelligence design token architecture
 * Shows Global → Semantic → Component token hierarchy with staggered slide-in.
 * Used after the Key Decisions section to illustrate the token system.
 */
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const AMBER = "#F5A623";
const mono  = "'JetBrains Mono', monospace";
const sans  = "'Red Hat Text', system-ui, sans-serif";

const LAYERS = [
  {
    tier: "01",
    label: "Global Tokens",
    desc: "Raw values — colours, type scales, spacing",
    tokens: ["color.neutral.900: #09090E", "font.size.xl: 1.25rem", "space.6: 1.5rem"],
    color: "rgba(245,166,35,0.22)",
    border: "rgba(245,166,35,0.4)",
  },
  {
    tier: "02",
    label: "Semantic Tokens",
    desc: "Purpose-mapped aliases consumed by components",
    tokens: ["color.text.primary → neutral.900", "color.accent → amber.500", "space.layout.gap → space.6"],
    color: "rgba(245,166,35,0.10)",
    border: "rgba(245,166,35,0.22)",
  },
  {
    tier: "03",
    label: "Component Tokens",
    desc: "Scoped overrides per component variant",
    tokens: ["btn.bg.default → accent", "card.border → border.subtle", "nav.height → 56px"],
    color: "rgba(245,166,35,0.04)",
    border: "rgba(245,166,35,0.12)",
  },
];

export function TokenDepthVisualizer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      style={{ marginBottom: 80 }}
      aria-label="Design token architecture: three-tier hierarchy"
    >
      {/* Header */}
      <p style={{
        fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
        textTransform: "uppercase", color: AMBER, marginBottom: 24,
        marginTop: 0, fontWeight: 400,
      }}>
        Token Architecture
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {LAYERS.map((layer, i) => (
          <motion.div
            key={layer.tier}
            initial={reduce ? {} : { opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : i * 0.12 }}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 0,
              position: "relative",
            }}
          >
            {/* Tier marker */}
            <div style={{
              width: 48,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 20,
            }}>
              <span style={{
                fontFamily: mono, fontSize: 10,
                color: AMBER, opacity: 0.7, letterSpacing: "0.06em",
              }}>{layer.tier}</span>
              {/* Connector line */}
              {i < LAYERS.length - 1 && (
                <div style={{
                  flex: 1, width: 1,
                  background: `linear-gradient(${AMBER}, transparent)`,
                  opacity: 0.3, marginTop: 8,
                }} />
              )}
            </div>

            {/* Content card */}
            <div style={{
              flex: 1,
              background: layer.color,
              border: `1px solid ${layer.border}`,
              borderRadius: 12,
              padding: "16px 20px",
              marginBottom: 8,
              marginLeft: 8,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 4 }}>
                <h3 style={{
                  fontFamily: mono, fontSize: 12, letterSpacing: "0.06em",
                  textTransform: "uppercase", color: "var(--text-primary)",
                  margin: 0, fontWeight: 600,
                }}>{layer.label}</h3>
                <span style={{ fontFamily: sans, fontSize: 12, color: "var(--text-secondary)" }}>
                  {layer.desc}
                </span>
              </div>
              {/* Token pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {layer.tokens.map((token) => (
                  <code
                    key={token}
                    style={{
                      fontFamily: mono, fontSize: 10,
                      padding: "3px 8px",
                      background: "rgba(245,166,35,0.08)",
                      border: "1px solid rgba(245,166,35,0.15)",
                      borderRadius: 4,
                      color: "rgba(237,234,227,0.75)",
                      letterSpacing: "0.02em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {token}
                  </code>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
