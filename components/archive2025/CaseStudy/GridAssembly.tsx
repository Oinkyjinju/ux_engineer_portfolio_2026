"use client";
/**
 * GridAssembly — JUST Rebrand hero background
 * 16×8 grid of tiny cells that appear in a diagonal wave on mount.
 * Accent-colored border cells, mostly transparent. Pure CSS fallback for reduced-motion.
 */
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  accent?: string;
}

const COLS = 20;
const ROWS = 8;
const TEAL = "#1A6678";

export function GridAssembly({ accent = TEAL }: Props) {
  const reduce = useReducedMotion();

  // Cells that get the accent highlight (diagonal-ish pattern)
  const highlighted = new Set([
    3, 7, 14, 22, 38, 55, 72, 91, 103, 117, 131, 142, 155,
  ]);

  if (reduce) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `repeating-linear-gradient(90deg, ${accent}22 0px, ${accent}22 1px, transparent 1px, transparent calc(100% / ${COLS})), repeating-linear-gradient(0deg, ${accent}22 0px, ${accent}22 1px, transparent 1px, transparent calc(100% / ${ROWS}))`,
          zIndex: 0,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const delay = (col + row) * 0.018;
        const isHighlit = highlighted.has(i);

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHighlit ? 0.55 : 0.12 }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            style={{
              border: `1px solid ${accent}`,
              background: isHighlit ? `${accent}18` : "transparent",
            }}
          />
        );
      })}
    </div>
  );
}
