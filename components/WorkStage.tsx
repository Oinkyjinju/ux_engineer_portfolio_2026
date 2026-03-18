"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { projects } from "@/data/projects";
import { ProjectThumbnail } from "./ProjectThumbnails";

const METRICS: Record<string, { value: string; label: string }[]> = {
  "just-intelligence": [
    { value: "7+",  label: "years in production" },
    { value: "3M+", label: "users reached" },
    { value: "30+", label: "components shipped" },
  ],
  "just-wordpress": [
    { value: "30+",  label: "Figma components" },
    { value: "800+", label: "hardcoded values replaced" },
    { value: "3",    label: "dev teams onboarded" },
  ],
  "netflix-disney": [
    { value: "50+", label: "languages" },
    { value: "2",   label: "global studios" },
    { value: "8+",  label: "years" },
  ],
  iata: [
    { value: "100%", label: "WeChat-native patterns" },
    { value: "2",    label: "spec languages" },
  ],
  storycorps: [
    { value: "4.6★", label: "App Store rating" },
    { value: "3",    label: "onboarding steps (from 7)" },
    { value: "2",    label: "platforms shipped" },
  ],
};

// Count-up — fires once when `run` becomes true
function useCountUp(target: string, run: boolean) {
  const [display, setDisplay] = useState("—");
  const started = useRef(false);

  useEffect(() => {
    if (!run || started.current) return;
    // Skip count-up for decimals (e.g. "4.6★") — display as-is
    if (/\d+\.\d+/.test(target)) { setDisplay(target); return; }
    const num = parseInt(target.replace(/\D/g, ""), 10);
    if (isNaN(num)) { setDisplay(target); return; }
    started.current = true;
    const suffix = target.replace(/[0-9]/g, "");
    let cur = 0;
    const interval = setInterval(() => {
      cur = Math.min(cur + Math.ceil(num / 28), num);
      setDisplay(`${cur}${suffix}`);
      if (cur >= num) clearInterval(interval);
    }, 36);
    return () => clearInterval(interval);
  }, [run, target]);

  return display;
}

function Metric({ value, label, run }: { value: string; label: string; run: boolean }) {
  const display = useCountUp(value, run);
  return (
    <div
      style={{
        textAlign: "center",
        padding: "14px 20px",
        border: "1px solid var(--border)",
        borderRadius: 10,
        background: "var(--card-bg)",
        minWidth: 90,
      }}
    >
      <div style={{ fontFamily: "'Gloock', Georgia, serif", fontSize: 26, lineHeight: 1, color: "var(--accent)", marginBottom: 4 }}>
        {display}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
        {label}
      </div>
    </div>
  );
}

interface ItemProps {
  project: (typeof projects)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function WorkAccordionItem({ project, index, isOpen, onToggle }: ItemProps) {
  const num     = String(index + 1).padStart(2, "0");
  const metrics = METRICS[project.id] ?? [];
  const mono    = "'JetBrains Mono', monospace";
  const serif   = "'Gloock', Georgia, serif";
  const sans    = "'Red Hat Text', system-ui, sans-serif";

  const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
  const DUR  = "480ms";

  const [isHovered, setIsHovered] = useState(false);
  const active = isOpen || isHovered;

  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>

      {/* Header row — always visible */}
      <div
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 0",
          cursor: "pointer",
          gap: 20,
          userSelect: "none",
          position: "relative",
        }}
      >
        {/* Accent left bar — slides in on hover/open */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: -24,
            top: "50%",
            transform: "translateY(-50%)",
            width: 2,
            height: active ? "60%" : "0%",
            background: "var(--accent)",
            borderRadius: 1,
            transition: `height 0.28s ${EASE}`,
            pointerEvents: "none",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1, minWidth: 0 }}>
          <span
            style={{
              fontFamily: mono, fontSize: 11, letterSpacing: "0.08em",
              color: active ? "var(--accent)" : "var(--text-tertiary)",
              transition: "color 0.3s",
              flexShrink: 0,
            }}
          >
            {num}
          </span>
          <h3
            style={{
              fontFamily: serif,
              fontSize: "clamp(20px, 2.8vw, 32px)",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              color: active ? "var(--text-primary)" : "var(--text-secondary)",
              transition: "color 0.3s",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {project.title}
          </h3>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          <span style={{ fontFamily: mono, fontSize: 11, color: "var(--text-tertiary)" }}>
            {project.company}
          </span>
          <span style={{ fontFamily: mono, fontSize: 11, color: "var(--text-tertiary)" }}>
            {project.year}
          </span>
          <span
            style={{
              fontFamily: mono, fontSize: 18, color: "var(--accent)",
              display: "inline-block", lineHeight: 1,
              opacity: isOpen ? 1 : 0.45,
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition: `transform ${DUR} ${EASE}, opacity 0.3s`,
            }}
          >
            +
          </span>
        </div>
      </div>

      {/* CSS grid height reveal — 0fr → 1fr, no bounce */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: `grid-template-rows ${DUR} ${EASE}`,
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              paddingBottom: 52,
              position: "relative",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(10px)",
              transition: isOpen
                ? `opacity 0.35s ${EASE} 0.18s, transform 0.35s ${EASE} 0.18s`
                : `opacity 0.18s ${EASE}, transform 0.18s ${EASE}`,
            }}
          >
            {/* Ghost watermark number */}
            <div
              aria-hidden
              style={{
                position: "absolute", top: -20, left: -8,
                fontFamily: serif,
                fontSize: "clamp(100px, 16vw, 200px)",
                fontWeight: 400,
                color: "var(--text-primary)",
                opacity: 0.03,
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
                zIndex: 0,
              }}
            >
              {num}
            </div>

            <div
              className="accordion-content-grid"
              style={{ position: "relative", zIndex: 1 }}
            >
              {/* Left — details */}
              <div>
                <p style={{ fontFamily: sans, fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)", marginBottom: 20 }}>
                  {project.subtitle}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: mono, fontSize: 10, letterSpacing: "0.05em",
                        border: "1px solid var(--border)", borderRadius: 20,
                        padding: "3px 10px", color: "var(--text-tertiary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
                  {metrics.map((m) => (
                    <Metric key={m.label} value={m.value} label={m.label} run={isOpen} />
                  ))}
                </div>

                <a
                  href={`/work/${project.id}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontFamily: sans, fontSize: 14, fontWeight: 500,
                    color: "var(--accent)", textDecoration: "none",
                    borderBottom: "1px solid var(--accent)",
                    paddingBottom: 2, transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  View Case Study →
                </a>
              </div>

              {/* Right — rich project thumbnail */}
              <div style={{ display: "flex", justifyContent: "flex-end", overflow: "hidden" }}>
                <ProjectThumbnail project={project} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

interface Props { dark: boolean; }

export default function WorkStage({ dark }: Props) {
  const [openId, setOpenId] = useState<string>(projects[0].id);
  const mono = "'JetBrains Mono', monospace";

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? "" : id));

  return (
    <section
      id="work"
      style={{
        padding: "80px clamp(24px, 6vw, 96px)",
        maxWidth: 1160, margin: "0 auto",
        position: "relative", zIndex: 2,
      }}
    >
      <ScrollReveal>
        <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 48 }}>
          Selected Work
        </p>
      </ScrollReveal>

      {projects.map((project, i) => (
        <WorkAccordionItem
          key={project.id}
          project={project}
          index={i}
          isOpen={openId === project.id}
          onToggle={() => toggle(project.id)}
        />
      ))}
    </section>
  );
}
