"use client";
/**
 * ScriptWeightStrip — Netflix/Disney+ hero visual
 * Horizontal marquee-style strip showing the same title in different scripts,
 * fading in from the right. Conveys the multilingual scale visually.
 * Reduced-motion: static, no scroll.
 */
import { motion, useReducedMotion } from "framer-motion";

const RED  = "#E50914";
const mono = "'JetBrains Mono', monospace";
const sans = "'Red Hat Text', system-ui, sans-serif";

// "Stranger Things" in 8 languages across scripts
const TITLE_VARIANTS = [
  "Stranger Things",
  "기묘한 이야기",
  "Stranger Things",
  "أشياء غريبة",
  "Очень странные дела",
  "Coisas Mais Estranhas",
  "דברים מוזרים",
  "奇怪的事情",
];

export function ScriptWeightStrip() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: "12%",
        left: 0,
        right: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        maskImage: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      {reduce ? (
        <div style={{ display: "flex", gap: 40, paddingLeft: 40, opacity: 0.12 }}>
          {TITLE_VARIANTS.map((t, i) => (
            <span
              key={i}
              style={{
                fontFamily: sans,
                fontSize: 13,
                letterSpacing: "0.05em",
                color: "#EDEAE3",
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      ) : (
        <motion.div
          style={{ display: "flex", gap: 48, width: "max-content" }}
          animate={{ x: [0, -900] }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {/* Double the array to create seamless loop */}
          {[...TITLE_VARIANTS, ...TITLE_VARIANTS].map((title, i) => (
            <span
              key={i}
              style={{
                fontFamily: sans,
                fontSize: 13,
                letterSpacing: "0.06em",
                color: i % 7 === 0 ? RED : "#EDEAE3",
                opacity: 0.13,
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
