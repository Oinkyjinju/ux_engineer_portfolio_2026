"use client";
/**
 * WarmVignette — StoryCorps hero background
 * A radial warm-glow that breathes in over 1.4s on mount.
 * Absolutely positioned, pointer-events none.
 */
import { motion, useReducedMotion } from "framer-motion";

interface Props { accent?: string; }

const CORAL = "#D4521A";

export function WarmVignette({ accent = CORAL }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: reduce ? 0.22 : 0 }}
      animate={{ opacity: 0.22 }}
      transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        background: `radial-gradient(ellipse 80% 60% at 30% 50%, ${accent}55 0%, ${accent}11 45%, transparent 70%)`,
      }}
    />
  );
}
