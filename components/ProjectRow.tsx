"use client";

import { useState } from "react";
import { type Project } from "@/data/projects";
import ScrollReveal from "./ScrollReveal";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectRow({ project, index }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={index * 0.08}>
      <a
        href={`#${project.id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          textDecoration: "none",
          color: "inherit",
          padding: "28px 0",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Hover sweep */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg, transparent, ${project.accent}08, transparent)`,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-100%)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            position: "relative",
            zIndex: 1,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 400px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: project.accent,
                  boxShadow: hovered ? `0 0 12px ${project.accent}80` : "none",
                  transition: "box-shadow 0.3s ease",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text-tertiary)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {project.company}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 3vw, 30px)",
                fontWeight: 500,
                margin: "0 0 3px",
                letterSpacing: "-0.02em",
                color: hovered ? project.accent : "var(--text-primary)",
                transition: "color 0.3s ease",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--text-secondary)",
                margin: 0,
              }}
            >
              {project.subtitle}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: hovered ? project.accent : "var(--text-tertiary)",
                    border: `1px solid ${hovered ? project.accent + "40" : "var(--border)"}`,
                    borderRadius: 20,
                    padding: "2px 8px",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text-tertiary)",
                whiteSpace: "nowrap",
              }}
            >
              {project.year}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 20,
                color: project.accent,
                opacity: hovered ? 1 : 0.2,
                transform: hovered ? "translateX(4px)" : "translateX(0)",
                transition: "all 0.3s ease",
              }}
            >
              →
            </span>
          </div>
        </div>
      </a>
    </ScrollReveal>
  );
}
