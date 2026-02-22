"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/data/projects";

// ── Graph data ────────────────────────────────────────────────────────────────

const SKILL_IDS = Array.from(new Set(projects.flatMap((p) => p.tags)));

type NodeType = "project" | "skill";

interface GNode {
  id: string;
  type: NodeType;
  label: string;
  accent: string;
  project?: Project;
}

const NODES: GNode[] = [
  ...projects.map((p) => ({
    id: p.id,
    type: "project" as NodeType,
    label: p.title,
    accent: p.accent,
    project: p,
  })),
  ...SKILL_IDS.map((s) => ({
    id: `skill::${s}`,
    type: "skill" as NodeType,
    label: s,
    accent: "#475569",
  })),
];

interface GEdge { si: number; ti: number }

const EDGES: GEdge[] = projects.flatMap((p) =>
  p.tags.map((tag) => ({
    si: NODES.findIndex((n) => n.id === p.id),
    ti: NODES.findIndex((n) => n.id === `skill::${tag}`),
  }))
).filter((e) => e.si >= 0 && e.ti >= 0);

// Precompute skill → connected project indices for O(1) lookup
const SKILL_TO_PROJECTS = new Map<number, Set<number>>();
EDGES.forEach(({ si, ti }) => {
  if (!SKILL_TO_PROJECTS.has(ti)) SKILL_TO_PROJECTS.set(ti, new Set());
  SKILL_TO_PROJECTS.get(ti)!.add(si);
});

// ── Physics constants ─────────────────────────────────────────────────────────

const REPEL    = 4800;
const SPRING_K = 0.032;
const REST_LEN = 160;
const GRAVITY  = 0.026;
const DAMPING  = 0.87;
const VMAX     = 9;
const PAD      = 70;

interface PhysNode { x: number; y: number; vx: number; vy: number; pinned: boolean }

function initPhysics(w: number, h: number): PhysNode[] {
  const cx = w / 2, cy = h / 2;
  const projs  = NODES.filter((n) => n.type === "project");
  const skills = NODES.filter((n) => n.type === "skill");

  return NODES.map((node) => {
    if (node.type === "project") {
      const i = projs.indexOf(node);
      const angle = (i / projs.length) * Math.PI * 2 - Math.PI / 2;
      const r = Math.min(w, h) * 0.17;
      return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, vx: 0, vy: 0, pinned: false };
    } else {
      const i = skills.indexOf(node);
      const angle = (i / skills.length) * Math.PI * 2;
      const r = Math.min(w, h) * 0.36;
      return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, vx: 0, vy: 0, pinned: false };
    }
  });
}

// ── Main component ────────────────────────────────────────────────────────────

export default function GraphDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef       = useRef<SVGSVGElement>(null);
  const physRef      = useRef<PhysNode[]>([]);
  const nodeElsRef   = useRef<(SVGGElement | null)[]>(Array(NODES.length).fill(null));
  const edgeElsRef   = useRef<(SVGLineElement | null)[]>(Array(EDGES.length).fill(null));
  const hoveredRef   = useRef<number | null>(null); // index into NODES (skill only)
  const mouseRef     = useRef({ x: 0, y: 0 });
  const dragRef      = useRef<{ idx: number } | null>(null);
  const sizeRef      = useRef({ w: 1280, h: 800 });

  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // ── Init + simulation loop ──
  useEffect(() => {
    const el = containerRef.current!;
    const w  = el.offsetWidth  || window.innerWidth;
    const h  = el.offsetHeight || window.innerHeight;
    sizeRef.current = { w, h };
    physRef.current = initPhysics(w, h);

    let raf: number;

    function tick() {
      const phys   = physRef.current;
      const { w, h } = sizeRef.current;
      const cx = w / 2, cy = h / 2;
      const n      = phys.length;
      const hov    = hoveredRef.current;

      // Allocate force buffers
      const fx = new Float32Array(n);
      const fy = new Float32Array(n);

      // Center gravity
      for (let i = 0; i < n; i++) {
        if (phys[i].pinned) continue;
        fx[i] += (cx - phys[i].x) * GRAVITY;
        fy[i] += (cy - phys[i].y) * GRAVITY;
      }

      // Pairwise repulsion (Barnes-Hut not needed at n≤20)
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const dx  = phys[j].x - phys[i].x;
          const dy  = phys[j].y - phys[i].y;
          const d2  = dx * dx + dy * dy + 0.01;
          const inv = 1 / Math.sqrt(d2);
          const f   = REPEL / d2;
          if (!phys[i].pinned) { fx[i] -= dx * inv * f; fy[i] -= dy * inv * f; }
          if (!phys[j].pinned) { fx[j] += dx * inv * f; fy[j] += dy * inv * f; }
        }
      }

      // Spring forces along edges
      for (const { si, ti } of EDGES) {
        const dx   = phys[ti].x - phys[si].x;
        const dy   = phys[ti].y - phys[si].y;
        const d    = Math.sqrt(dx * dx + dy * dy) + 0.01;
        // Pull connected projects closer when their skill is hovered
        const rest = (hov !== null && ti === hov) ? REST_LEN * 0.44 : REST_LEN;
        const f    = SPRING_K * (d - rest);
        const nx   = (dx / d) * f;
        const ny   = (dy / d) * f;
        if (!phys[si].pinned) { fx[si] += nx; fy[si] += ny; }
        if (!phys[ti].pinned) { fx[ti] -= nx; fy[ti] -= ny; }
      }

      // Integrate velocities + positions
      for (let i = 0; i < n; i++) {
        if (phys[i].pinned) {
          if (dragRef.current?.idx === i) {
            phys[i].x = mouseRef.current.x;
            phys[i].y = mouseRef.current.y;
          }
          continue;
        }
        phys[i].vx = Math.max(-VMAX, Math.min(VMAX, (phys[i].vx + fx[i]) * DAMPING));
        phys[i].vy = Math.max(-VMAX, Math.min(VMAX, (phys[i].vy + fy[i]) * DAMPING));
        phys[i].x += phys[i].vx;
        phys[i].y += phys[i].vy;
        // Soft boundary bounce
        if (phys[i].x < PAD)     { phys[i].x = PAD;     phys[i].vx *= -0.3; }
        if (phys[i].x > w - PAD) { phys[i].x = w - PAD; phys[i].vx *= -0.3; }
        if (phys[i].y < PAD)     { phys[i].y = PAD;     phys[i].vy *= -0.3; }
        if (phys[i].y > h - PAD) { phys[i].y = h - PAD; phys[i].vy *= -0.3; }
      }

      // ── DOM writes ──
      // Edges
      for (let i = 0; i < EDGES.length; i++) {
        const el = edgeElsRef.current[i];
        if (!el) continue;
        const { si, ti } = EDGES[i];
        el.setAttribute("x1", String(Math.round(phys[si].x)));
        el.setAttribute("y1", String(Math.round(phys[si].y)));
        el.setAttribute("x2", String(Math.round(phys[ti].x)));
        el.setAttribute("y2", String(Math.round(phys[ti].y)));

        if (hov !== null) {
          const active = ti === hov;
          el.style.opacity      = active ? "0.85" : "0.03";
          el.style.stroke       = active ? "#7c3aed" : "#1e293b";
          el.style.strokeWidth  = active ? "1.5"    : "1";
          el.style.filter       = active ? "url(#edge-glow)" : "none";
        } else {
          el.style.opacity     = "0.22";
          el.style.stroke      = "#334155";
          el.style.strokeWidth = "1";
          el.style.filter      = "none";
        }
      }

      // Nodes
      for (let i = 0; i < NODES.length; i++) {
        const el = nodeElsRef.current[i];
        if (!el) continue;
        el.setAttribute("transform", `translate(${Math.round(phys[i].x)},${Math.round(phys[i].y)})`);

        if (hov !== null) {
          const isHov  = i === hov;
          const isCon  = SKILL_TO_PROJECTS.get(hov)?.has(i) ?? false;
          el.style.opacity = (isHov || isCon) ? "1" : "0.1";
          el.style.transition = "opacity 0.18s";
        } else {
          el.style.opacity = "1";
          el.style.transition = "opacity 0.25s";
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    const onResize = () => {
      sizeRef.current = { w: el.offsetWidth, h: el.offsetHeight };
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ── Global mouse tracking (drag + coordinate conversion) ──
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onUp = () => {
      if (dragRef.current) {
        physRef.current[dragRef.current.idx].pinned = false;
        dragRef.current = null;
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw", height: "100vh",
        background: "#070b12",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
      }}
    >
      {/* Radial vignette overlay */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          background: "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 40%, #070b1280 100%)",
        }}
      />

      {/* Header */}
      <header
        style={{
          position: "absolute", top: 28, left: 32, zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <p style={{ color: "#2d3f56", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", margin: 0 }}>
          Semantic Knowledge Graph
        </p>
        <h1 style={{ color: "#e2e8f0", fontSize: 28, fontWeight: 700, margin: "4px 0 4px", lineHeight: 1 }}>
          Jinju Park
        </h1>
        <p style={{ color: "#334155", fontSize: 12, margin: 0 }}>
          Hover a skill · Click a project
        </p>
      </header>

      {/* Legend */}
      <div
        style={{
          position: "absolute", bottom: 28, left: 32, zIndex: 10,
          pointerEvents: "none", display: "flex", gap: 20, alignItems: "center",
        }}
      >
        <LegendDot shape="circle" label="Skill" color="#334155" />
        <LegendDot shape="rect"   label="Project" color="#7c3aed" />
      </div>

      {/* Node count badge */}
      <div
        style={{
          position: "absolute", bottom: 28, right: 32, zIndex: 10,
          pointerEvents: "none",
          color: "#1e293b", fontSize: 11, fontFamily: "monospace",
        }}
      >
        {NODES.length} nodes · {EDGES.length} edges
      </div>

      {/* ── SVG Graph ── */}
      <svg
        ref={svgRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <filter id="edge-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="project-glow" x="-40%" y="-100%" width="180%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Edges layer */}
        <g>
          {EDGES.map((_, i) => (
            <line
              key={i}
              ref={(el) => { edgeElsRef.current[i] = el; }}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Nodes layer */}
        <g>
          {NODES.map((node, ni) => (
            <g
              key={node.id}
              ref={(el) => { nodeElsRef.current[ni] = el; }}
              style={{ cursor: "grab", willChange: "transform" }}
              onMouseDown={(e) => {
                e.stopPropagation();
                physRef.current[ni].pinned = true;
                physRef.current[ni].vx = 0;
                physRef.current[ni].vy = 0;
                dragRef.current = { idx: ni };
              }}
              onMouseEnter={() => {
                if (node.type === "skill") hoveredRef.current = ni;
              }}
              onMouseLeave={() => {
                if (node.type === "skill") hoveredRef.current = null;
              }}
              onClick={(e) => {
                if (node.type === "project" && node.project) {
                  e.stopPropagation();
                  setActiveProject((prev) =>
                    prev?.id === node.project!.id ? null : node.project!
                  );
                }
              }}
            >
              {node.type === "skill"
                ? <SkillNodeShape label={node.label} />
                : <ProjectNodeShape label={node.label} accent={node.accent} company={node.project?.company ?? ""} />
              }
            </g>
          ))}
        </g>
      </svg>

      {/* ── Side panel ── */}
      <AnimatePresence>
        {activeProject && (
          <SidePanel
            key={activeProject.id}
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── SVG node shapes ───────────────────────────────────────────────────────────

function SkillNodeShape({ label }: { label: string }) {
  // Truncate long labels inside the circle
  const short = label.length > 14 ? label.slice(0, 13) + "…" : label;
  const words = short.split(" ");

  return (
    <>
      {/* Outer pulse ring */}
      <circle r={30} fill="none" stroke="#1e293b" strokeWidth={1} opacity={0.6} />
      {/* Main circle */}
      <circle r={25} fill="#0b1220" stroke="#1e293b" strokeWidth={1.5} />
      {/* Inner dot */}
      <circle r={2.5} fill="#334155" />
      {/* Label — up to 2 lines */}
      {words.length === 1 ? (
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#4b6480"
          fontSize={9}
          fontFamily="'JetBrains Mono', monospace"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {words[0]}
        </text>
      ) : (
        <>
          <text
            textAnchor="middle" y={-5}
            fill="#4b6480"
            fontSize={9}
            fontFamily="'JetBrains Mono', monospace"
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            {words.slice(0, Math.ceil(words.length / 2)).join(" ")}
          </text>
          <text
            textAnchor="middle" y={6}
            fill="#4b6480"
            fontSize={9}
            fontFamily="'JetBrains Mono', monospace"
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            {words.slice(Math.ceil(words.length / 2)).join(" ")}
          </text>
        </>
      )}
    </>
  );
}

function ProjectNodeShape({ label, accent, company }: { label: string; accent: string; company: string }) {
  const W = 112, H = 44, RX = 9;
  return (
    <>
      {/* Glow halo */}
      <rect
        x={-W / 2 - 2} y={-H / 2 - 2} width={W + 4} height={H + 4} rx={RX + 2}
        fill="none" stroke={accent} strokeWidth={1} opacity={0.25}
        filter="url(#project-glow)"
      />
      {/* Background rect */}
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={RX} fill="#0b1220" />
      {/* Accent border */}
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={RX} fill="none" stroke={accent} strokeWidth={1.5} />
      {/* Title */}
      <text
        textAnchor="middle" y={-5}
        fill={accent} fontSize={11} fontWeight={700}
        fontFamily="'Source Sans 3', system-ui, sans-serif"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {label}
      </text>
      {/* Company */}
      <text
        textAnchor="middle" y={9}
        fill="#2d3f56" fontSize={8.5}
        fontFamily="'JetBrains Mono', monospace"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {company}
      </text>
    </>
  );
}

// ── Legend dot ────────────────────────────────────────────────────────────────

function LegendDot({ shape, label, color }: { shape: "circle" | "rect"; label: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {shape === "circle" ? (
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#0b1220", border: `1.5px solid ${color}` }} />
      ) : (
        <div style={{ width: 13, height: 8, borderRadius: 2, background: "#0b1220", border: `1.5px solid ${color}` }} />
      )}
      <span style={{ color: "#2d3f56", fontSize: 11 }}>{label}</span>
    </div>
  );
}

// ── Side panel ────────────────────────────────────────────────────────────────

function SidePanel({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.aside
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 44 }}
      style={{
        position: "absolute",
        top: 0, right: 0,
        width: 356,
        height: "100%",
        background: "linear-gradient(165deg, #0e1a2e 0%, #070b12 100%)",
        borderLeft: "1px solid #131e2e",
        zIndex: 30,
        overflowY: "auto",
        padding: "36px 28px",
        boxSizing: "border-box",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 18, right: 18,
          background: "none", border: "none", cursor: "pointer",
          color: "#334155", fontSize: 22, lineHeight: 1, padding: 4,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.color = "#94a3b8")}
        onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.color = "#334155")}
      >
        ×
      </button>

      {/* Accent bar */}
      <div style={{ width: 28, height: 2.5, borderRadius: 2, background: project.accent, marginBottom: 22 }} />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}>
        {/* Meta */}
        <p style={{ color: "#334155", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 8px" }}>
          {project.year} · {project.company}
        </p>

        {/* Title */}
        <h2 style={{ color: "#e2e8f0", fontSize: 20, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.3 }}>
          {project.title}
        </h2>

        {/* Subtitle */}
        <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 24px", lineHeight: 1.65 }}>
          {project.subtitle}
        </p>

        {/* Tag chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "3px 10px", borderRadius: 20,
                fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
                background: "#0b1220",
                color: project.accent,
                border: `1px solid ${project.accent}3a`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Skills section */}
        <p style={{ color: "#1e293b", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 12px" }}>
          — Connected skills
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 28 }}>
          {project.tags.map((tag, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.055, type: "spring", stiffness: 340, damping: 30 }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "7px 12px", borderRadius: 7,
                background: "#0b1220", border: "1px solid #131e2e",
              }}
            >
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: project.accent, flexShrink: 0 }} />
              <span style={{ color: "#64748b", fontSize: 12 }}>{tag}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.015, background: `${project.accent}10` }}
          whileTap={{ scale: 0.975 }}
          style={{
            width: "100%", padding: "11px 0",
            background: "transparent",
            border: `1px solid ${project.accent}80`,
            borderRadius: 8,
            color: project.accent,
            fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          View Case Study →
        </motion.button>
      </motion.div>
    </motion.aside>
  );
}
