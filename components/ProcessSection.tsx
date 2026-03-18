"use client";

import { useRef, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    items: [
      "Interview users and engineers in the same week",
      "Heuristic audits with annotated Figma files",
      "Competitive teardowns that inform design tokens",
      "Alignment docs developers actually read",
    ],
    icon: "◎",
  },
  {
    num: "02",
    title: "Design",
    items: [
      "Components designed to be coded, not described",
      "Figma tokens synced 1:1 with CSS variables",
      "Motion specs with working browser prototypes",
      "Design reviews I run in the browser, not slides",
    ],
    icon: "◈",
  },
  {
    num: "03",
    title: "Ship",
    items: [
      "I write the PR — not just the redlines",
      "axe-core + VoiceOver, not just Lighthouse",
      "Bundle size awareness from day one",
      "I stay in the codebase after launch",
    ],
    icon: "◆",
  },
] as const;

interface Props { dark: boolean; }

export default function ProcessSection({ dark }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef  = useRef(false);

  const [visible,    setVisible]    = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Connector line: 0 → 50 → 100% based on active step
  const lineProgress = (activeStep / (STEPS.length - 1)) * 100;

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (pausedRef.current) return;
      setActiveStep((p) => (p + 1) % STEPS.length);
    }, 3800);
  }

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(startTimer, 800);
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStepClick = (i: number) => {
    pausedRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveStep(i);
    // Resume auto-play after 5s idle
    setTimeout(() => {
      pausedRef.current = false;
      startTimer();
    }, 5000);
  };

  const mono  = "'JetBrains Mono', monospace";
  const serif = "'Gloock', Georgia, serif";
  const sans  = "'Red Hat Text', system-ui, sans-serif";
  const EASE  = "cubic-bezier(0.4, 0, 0.2, 1)";

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        padding: "80px clamp(24px, 6vw, 96px) 100px",
        maxWidth: 1160,
        margin: "0 auto",
        position: "relative",
        zIndex: 2,
      }}
    >
      <ScrollReveal>
        <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 56 }}>
          How I Work
        </p>
      </ScrollReveal>

      <div className="process-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "clamp(24px, 4vw, 56px)" }}>

        {/* Connector track + fill — div width is CSS-transitionable */}
        <div
          className="process-connector"
          aria-hidden
          style={{
            position: "absolute",
            top: 21,
            left: "calc((100% - clamp(48px, 8vw, 112px)) / 6)",
            right: "calc((100% - clamp(48px, 8vw, 112px)) / 6)",
            height: 1,
            background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0, left: 0,
              height: "100%",
              width: `${lineProgress}%`,
              background: "var(--accent)",
              transition: `width 0.6s ${EASE}`,
            }}
          />
        </div>

        {STEPS.map((step, i) => {
          const isActive = activeStep === i;
          const isPast   = activeStep > i;
          const lit      = isActive || isPast;

          return (
            <div
              key={step.num}
              style={{
                position: "relative",
                zIndex: 1,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}
            >
              {/* Clickable dot + number — centered in column so connector line aligns */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <button
                  onClick={() => handleStepClick(i)}
                  aria-label={`Activate step: ${step.title}`}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    background: "none", border: "none", padding: 0, cursor: "pointer",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          inset: -6,
                          borderRadius: "50%",
                          border: "1.5px solid var(--accent)",
                          animation: "pulse-ring 1.8s ease-in-out infinite",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                    <div
                      style={{
                        width: 44, height: 44, borderRadius: "50%",
                        border: `1px solid ${lit ? "var(--accent)" : "var(--border)"}`,
                        background: lit ? "var(--accent-muted)" : "var(--card-bg)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: serif, fontSize: 20,
                        color: lit ? "var(--accent)" : "var(--text-tertiary)",
                        transition: `all 0.4s ${EASE}`,
                        transform: isActive ? "scale(1.12)" : "scale(1)",
                      }}
                    >
                      {step.icon}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: mono, fontSize: 10, letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: lit ? "var(--accent)" : "var(--text-tertiary)",
                      transition: "color 0.4s",
                    }}
                  >
                    {step.num}
                  </span>
                </button>
              </div>

              <h3
                style={{
                  fontFamily: serif,
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 400, letterSpacing: "-0.01em",
                  color: isActive
                    ? "var(--text-primary)"
                    : lit ? "var(--text-secondary)" : "var(--text-tertiary)",
                  marginBottom: 16,
                  transition: "color 0.4s",
                }}
              >
                {step.title}
              </h3>

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {step.items.map((item, j) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: sans, fontSize: 14,
                      color: isActive ? "var(--text-secondary)" : "var(--text-tertiary)",
                      lineHeight: 1.6, padding: "4px 0",
                      display: "flex", alignItems: "center", gap: 8,
                      opacity: isActive ? 1 : lit ? 0.5 : 0.28,
                      transform: `translateX(${isActive ? 0 : -5}px)`,
                      transition: `opacity 0.45s ${EASE} ${j * 0.06}s, transform 0.45s ${EASE} ${j * 0.06}s, color 0.4s`,
                    }}
                  >
                    <span style={{ color: lit ? "var(--accent)" : "var(--text-tertiary)", fontSize: 10, transition: "color 0.4s", flexShrink: 0 }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Pill-dot step indicator */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 48 }}>
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => handleStepClick(i)}
            aria-label={`Go to step ${i + 1}`}
            style={{
              width: activeStep === i ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: activeStep === i
                ? "var(--accent)"
                : dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: `width 0.4s ${EASE}, background 0.4s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
