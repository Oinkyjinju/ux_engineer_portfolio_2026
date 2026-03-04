"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const TICKER_SKILLS = [
  "React", "·", "Next.js", "·", "TypeScript", "·", "Figma", "·",
  "Design Systems", "·", "CSS / Sass", "·", "PHP · WordPress", "·",
  "Three.js", "·", "Motion Design", "·", "Accessibility", "·",
  "Cross-cultural UX", "·", "UX Research", "·", "Prototyping", "·",
  "Team Leadership", "·",
];

interface Props { dark: boolean; }

export default function HeroSection({ dark }: Props) {
  const heroRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  // Spring-based amber glow follows cursor
  const rawX  = useMotionValue(-500);
  const rawY  = useMotionValue(-500);
  const glowX = useSpring(rawX, { stiffness: 160, damping: 26, mass: 0.5 });
  const glowY = useSpring(rawY, { stiffness: 160, damping: 26, mass: 0.5 });

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let W = 0, H = 0, raf: number;
    let particles: P[] = [];

    function init() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width  = W;
      canvas!.height = H;
      particles = Array.from({ length: 45 }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r:  Math.random() * 1.8 + 0.6,
        a:  Math.random() * 0.09 + 0.025,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const rgb = dark ? "245,166,35" : "160,100,0";
      const { x: mx, y: my } = mousePosRef.current;
      const REPEL = 110;

      for (const p of particles) {
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL && dist > 0) {
          const f = ((REPEL - dist) / REPEL) * 1.4;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }
        p.vx = p.vx * 0.93 + (Math.random() - 0.5) * 0.025;
        p.vy = p.vy * 0.93 + (Math.random() - 0.5) * 0.025;
        p.vx = Math.max(-2.2, Math.min(2.2, p.vx));
        p.vy = Math.max(-2.2, Math.min(2.2, p.vy));
        p.x  = (p.x + p.vx + W) % W;
        p.y  = (p.y + p.vy + H) % H;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener("resize", init);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", init); };
  }, [dark]);

  // Mouse tracking
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e: MouseEvent) => {
      const rect      = hero.getBoundingClientRect();
      const relX      = e.clientX - rect.left;
      const relY      = e.clientY - rect.top;
      mousePosRef.current = { x: relX, y: relY };
      rawX.set(relX);
      rawY.set(relY);
    };
    const onLeave = () => { rawX.set(-500); rawY.set(-500); };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY]);

  const accent = dark ? "rgba(245,166,35,0.09)" : "rgba(196,131,10,0.07)";

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 2,
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Amber cursor glow */}
      <motion.div
        style={{
          position: "absolute",
          width: 640,
          height: 640,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent} 0%, transparent 68%)`,
          pointerEvents: "none",
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 clamp(24px, 6vw, 96px)",
          paddingTop: 100,
          paddingBottom: 140,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 28,
            }}
          >
            Jinju Park
          </p>

          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(72px, 11vw, 158px)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            Senior<br />UX Engineer.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: 32, maxWidth: 520 }}
        >
          {/* Dual-role callout — makes the "UX Engineer" title explicit at a glance */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid var(--border)",
              borderRadius: 20,
              overflow: "hidden",
              marginBottom: 24,
            }}
          >
            <span style={{ padding: "5px 14px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", borderRight: "1px solid var(--border)" }}>
              Design
            </span>
            <span style={{ padding: "4px 10px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--text-tertiary)" }}>
              ←&nbsp;&nbsp;→
            </span>
            <span style={{ padding: "5px 14px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--code-blue)", borderLeft: "1px solid var(--border)" }}>
              Engineering
            </span>
          </div>

          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "clamp(17px, 2vw, 20px)",
              fontWeight: 300,
              lineHeight: 1.55,
              color: "var(--text-secondary)",
            }}
          >
            I design with code.
            <br />
            I code with design.
            <br />
            <span style={{ fontSize: "clamp(14px, 1.6vw, 16px)", color: "var(--text-tertiary)" }}>
              7 years shipping at JUST Capital, Netflix, and IATA.
            </span>
          </p>

          <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
            <a
              href="#work"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: dark ? "#09090E" : "#F8F7F2",
                background: "var(--accent)",
                padding: "11px 24px",
                borderRadius: 8,
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              See my work
            </a>
            <a
              href="#about"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 400,
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
                padding: "11px 24px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--text-primary)";
                el.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--text-secondary)";
                el.style.borderColor = "var(--border)";
              }}
            >
              About me
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scrolling ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden",
          zIndex: 1,
        }}
        onMouseEnter={(e) => {
          const inner = e.currentTarget.querySelector(".ticker-inner") as HTMLElement;
          if (inner) inner.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          const inner = e.currentTarget.querySelector(".ticker-inner") as HTMLElement;
          if (inner) inner.style.animationPlayState = "running";
        }}
      >
        <div
          className="ticker-inner"
          style={{
            display: "flex",
            width: "max-content",
            animation: "ticker-scroll 40s linear infinite",
            padding: "12px 0",
          }}
        >
          {[...TICKER_SKILLS, ...TICKER_SKILLS].map((skill, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: skill === "·" ? "var(--accent)" : "var(--text-tertiary)",
                padding: "0 16px",
                whiteSpace: "nowrap",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
