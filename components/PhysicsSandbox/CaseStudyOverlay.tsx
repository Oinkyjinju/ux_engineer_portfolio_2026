"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type SandboxItem } from "./config";

interface Props {
  item: SandboxItem | null;
  onClose: () => void;
}

// ─── Spring presets ───────────────────────────────────────────────────────────
const SPRING = { type: "spring", damping: 28, stiffness: 320 } as const;
const EASE   = { duration: 0.22, ease: [0.16, 1, 0.3, 1] } as const;

export default function CaseStudyOverlay({ item, onClose }: Props) {
  return (
    <AnimatePresence>
      {item && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={EASE}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 300,
              background: "rgba(4, 4, 10, 0.80)",
              backdropFilter: "blur(22px) saturate(1.3)",
              WebkitBackdropFilter: "blur(22px) saturate(1.3)",
            }}
          />

          {/* ── Card ── */}
          <motion.div
            key={`card-${item.id}`}
            initial={{ opacity: 0, y: 32, scale: 0.94 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{  opacity: 0, y: 16,  scale: 0.96 }}
            transition={SPRING}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 301,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                pointerEvents: "all",
                width: "min(640px, 92vw)",
                background: "rgba(16, 14, 26, 0.72)",
                border: `1px solid ${item.color}35`,
                borderRadius: 28,
                padding: "clamp(32px, 5vw, 52px)",
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.04),
                  0 32px 80px rgba(0,0,0,0.55),
                  0 0 60px ${item.color}18
                `,
                backdropFilter: "blur(40px)",
                position: "relative",
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 16,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                }}
              >
                ✕
              </button>

              {/* Accent dot + company */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ ...SPRING, delay: 0.1 }}
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: item.color,
                    boxShadow: `0 0 14px ${item.color}`,
                    flexShrink: 0,
                  }}
                />
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...EASE, delay: 0.08 }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.company}
                </motion.span>
              </div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING, delay: 0.07 }}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(26px, 4vw, 40px)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "#F0EEE9",
                  marginBottom: 10,
                  lineHeight: 1.1,
                }}
              >
                {item.title}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...EASE, delay: 0.12 }}
                style={{
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  fontSize: 16,
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 28,
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ ...EASE, delay: 0.15 }}
                style={{
                  height: 1,
                  background: `linear-gradient(90deg, ${item.color}50, transparent)`,
                  marginBottom: 24,
                }}
              />

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...EASE, delay: 0.18 }}
                style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}
              >
                {item.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...SPRING, delay: 0.2 + i * 0.05 }}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: item.color,
                      border: `1px solid ${item.color}35`,
                      borderRadius: 20,
                      padding: "4px 12px",
                      background: `${item.color}0d`,
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Year */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...EASE, delay: 0.28 }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.05em",
                }}
              >
                {item.year}
              </motion.p>

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING, delay: 0.3 }}
                style={{
                  marginTop: 28,
                  padding: "12px 28px",
                  borderRadius: 40,
                  border: `1px solid ${item.color}50`,
                  background: `linear-gradient(135deg, ${item.color}20, ${item.color}08)`,
                  color: item.color,
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `${item.color}30`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${item.color}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${item.color}20, ${item.color}08)`;
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                View Case Study →
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
