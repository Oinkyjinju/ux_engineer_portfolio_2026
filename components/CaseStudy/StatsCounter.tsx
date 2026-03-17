"use client";
/**
 * StatsCounter — JUST Intelligence animated metrics
 * Replaces the static metrics grid for just-intelligence case study.
 * Numbers animate from 0 → target when scrolled into view.
 */
import { useRef, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const AMBER = "#F5A623";
const mono  = "'JetBrains Mono', monospace";
const serif = "'Gloock', Georgia, serif";
const sans  = "'Red Hat Text', system-ui, sans-serif";

interface Metric { value: string; label: string; }

interface Props { metrics: Metric[]; }

function AnimatedValue({ raw, inView, reduce }: { raw: string; inView: boolean; reduce: boolean }) {
  const [displayed, setDisplayed] = useState("0");

  // Parse: leading integer, suffix (e.g. "95%" → num=95, suffix="%")
  const match = raw.match(/^([<>~])?(\d+(?:\.\d+)?)(.*)$/);

  useEffect(() => {
    if (!inView) return;
    if (!match) { setDisplayed(raw); return; }

    const prefix = match[1] ?? "";
    const target = parseFloat(match[2]);
    const suffix = match[3];

    if (reduce) {
      setDisplayed(raw);
      return;
    }

    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Expo ease-out
      const eased = 1 - Math.pow(2, -10 * progress);
      const current = target * eased;
      const formatted = Number.isInteger(target)
        ? Math.round(current).toString()
        : current.toFixed(1);
      setDisplayed(prefix + formatted + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, raw, reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{displayed}</>;
}

export function StatsCounter({ metrics }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduce = useReducedMotion() ?? false;

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 0,
        borderTop: "1px solid var(--border)",
      }}
      role="list"
      aria-label="Project outcomes"
    >
      {metrics.map((m, i) => (
        <div
          key={m.label}
          role="listitem"
          style={{
            padding: "32px 28px",
            borderRight: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ambient glow on active */}
          {inView && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(ellipse at 50% 60%, rgba(245,166,35,0.08) 0%, transparent 70%)`,
                pointerEvents: "none",
                animation: `fadeIn 0.6s ease ${i * 0.15}s both`,
              }}
            />
          )}
          <div
            style={{
              fontFamily: serif,
              fontSize: "clamp(40px, 4vw, 56px)",
              lineHeight: 1,
              color: AMBER,
              marginBottom: 10,
              position: "relative",
            }}
          >
            <AnimatedValue raw={m.value} inView={inView} reduce={reduce} />
          </div>
          <div
            style={{
              fontFamily: mono,
              fontSize: 10,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              position: "relative",
            }}
          >
            {m.label}
          </div>
        </div>
      ))}
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}
