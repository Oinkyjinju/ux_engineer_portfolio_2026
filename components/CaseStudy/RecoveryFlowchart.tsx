"use client";
/**
 * RecoveryFlowchart — StoryCorps session recovery flow
 * SVG with 4 nodes connected by animated paths.
 * Paths draw via `pathLength` on scroll-into-view.
 * Shows the before/after: interrupted recording → recovery prompt → story preserved.
 */
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Props { accent?: string; }

const CORAL = "#D4521A";
const mono  = "'JetBrains Mono', monospace";
const sans  = "'Red Hat Text', system-ui, sans-serif";

const NODES = [
  { id: "start",     x: 80,  y: 60,  label: "Active\nCapture",         desc: "Continuous local state synchronization.",           fill: "rgba(212,82,26,0.12)", stroke: CORAL,                   textColor: CORAL },
  { id: "interrupt", x: 280, y: 60,  label: "Unplanned\nInterruption", desc: "Call, crash, or backgrounding event.",              fill: "rgba(212,82,26,0.42)", stroke: CORAL,                   textColor: "#fff" },
  { id: "prompt",   x: 480, y: 60,  label: "Intelligent\nRecovery",   desc: "System detects unsaved state on relaunch.",         fill: "rgba(212,82,26,0.12)", stroke: CORAL,                   textColor: CORAL },
  { id: "saved",    x: 680, y: 60,  label: "Preserved\nNarrative",    desc: "100% data integrity; recording continues.",         fill: "rgba(212,82,26,0.22)", stroke: CORAL,                   textColor: CORAL },
];

const PATHS = [
  { d: "M 160 60 L 200 60", delay: 0.2 },
  { d: "M 360 60 L 400 60", delay: 0.5 },
  { d: "M 560 60 L 600 60", delay: 0.8 },
];

const NODE_W = 160;
const NODE_H = 64;

export function RecoveryFlowchart({ accent = CORAL }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} style={{ marginBottom: 80 }}>
      <p style={{
        fontFamily: mono, fontSize: 11, letterSpacing: "0.1em",
        textTransform: "uppercase", color: accent, marginBottom: 20,
        fontWeight: 400,
      }}>
        Session Recovery Flow
      </p>
      <div style={{ position: "relative" }}>
        {/* BEFORE / AFTER labels */}
        <div style={{ display: "flex", gap: 0, marginBottom: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", width: "50%" }}>
            — Before
          </span>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, width: "50%", textAlign: "right" }}>
            After —
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", marginBottom: 16 }} />

        {/* SVG */}
        <div style={{ overflowX: "auto" }}>
          <svg
            width="780"
            height="150"
            viewBox="0 0 780 150"
            style={{ maxWidth: "100%", display: "block" }}
            aria-label="Session recovery flow: Active Capture → Unplanned Interruption → Intelligent Recovery → Preserved Narrative"
          >
            {/* Arrow marker */}
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill={accent} opacity="0.6" />
              </marker>
            </defs>

            {/* Connector paths */}
            {PATHS.map((path, i) => (
              <motion.path
                key={i}
                d={path.d}
                stroke={accent}
                strokeWidth={1.5}
                fill="none"
                strokeDasharray="4 4"
                markerEnd="url(#arrow)"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: inView ? 1 : 0 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : path.delay, ease: "easeInOut" }}
              />
            ))}

            {/* Nodes */}
            {NODES.map((node, i) => (
              <motion.g
                key={node.id}
                initial={reduce ? {} : { opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : i * 0.15 }}
              >
                <rect
                  x={node.x - NODE_W / 2}
                  y={node.y - NODE_H / 2}
                  width={NODE_W}
                  height={NODE_H}
                  rx={8}
                  fill={node.fill}
                  stroke={node.stroke}
                  strokeWidth={1}
                />
                {node.label.split("\n").map((line, li) => (
                  <text
                    key={li}
                    x={node.x}
                    y={node.y - 8 + li * 20}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={node.textColor}
                    fontSize={12}
                    fontFamily={mono}
                    letterSpacing="0.02em"
                  >
                    {line}
                  </text>
                ))}
                <text
                  x={node.x}
                  y={node.y + NODE_H / 2 + 16}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="var(--text-secondary)"
                  fontSize={9}
                  fontFamily={sans}
                  opacity={0.8}
                >
                  {node.desc}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Caption */}
        <p style={{
          fontFamily: mono, fontSize: 11, letterSpacing: "0.06em",
          color: accent,
          marginTop: 16, marginBottom: 8,
          fontWeight: 400,
        }}>
          Designing for the 5% failure rate.
        </p>
        <p style={{
          fontFamily: sans, fontSize: 13,
          color: "var(--text-secondary)",
          marginTop: 0, lineHeight: 1.6,
          borderLeft: `2px solid ${accent}`,
          paddingLeft: 12,
        }}>
          Mobile recording is inherently volatile&mdash;interrupted by incoming calls, battery depletion, or accidental backgrounding. I architected this recovery logic to treat interruptions as a standard state rather than an error. By implementing a persistent auto-save &ldquo;heartbeat,&rdquo; we reduced data loss to near-zero, transforming a primary source of user churn into a hallmark of platform reliability.
        </p>
      </div>
    </div>
  );
}
