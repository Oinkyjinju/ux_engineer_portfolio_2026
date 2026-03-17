"use client";
/**
 * RulerLines — JUST Intelligence hero accent
 * Two amber hairlines that draw left-to-right on mount, sitting behind the hero text.
 * Absolute-positioned, pointer-events none, z-index 0.
 */
import { motion, useReducedMotion } from "framer-motion";

export function RulerLines() {
  const reduce = useReducedMotion();

  const base: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    background: "linear-gradient(90deg, #F5A623 0%, rgba(245,166,35,0.0) 100%)",
    transformOrigin: "0 50%",
  };

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Upper rule — 40% down */}
      <motion.div
        style={{ ...base, top: "38%", opacity: 0.28 }}
        initial={{ scaleX: reduce ? 1 : 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
      {/* Lower rule — 62% down, shorter delay */}
      <motion.div
        style={{ ...base, top: "64%", opacity: 0.18 }}
        initial={{ scaleX: reduce ? 1 : 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      />
      {/* Tick marks along upper rule */}
      {[0, 25, 50, 75, 100].map((pct) => (
        <motion.div
          key={pct}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${pct}%`,
            top: "calc(38% - 6px)",
            width: 1,
            height: 12,
            background: "#F5A623",
            opacity: 0.2,
          }}
          initial={{ scaleY: reduce ? 1 : 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: reduce ? 0 : 0.3 + pct * 0.006 }}
        />
      ))}
    </div>
  );
}
