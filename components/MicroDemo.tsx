"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// 1. SQUISHY CURSOR
//    Tracks mouse. Morphs to envelop any button/a on hover.
//    mix-blend-mode: difference inverts text beneath it.
// ─────────────────────────────────────────────────────────────────────────────
function Squishy() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Spring-follow the raw mouse for the dot trail
  const sx = useSpring(mx, { stiffness: 500, damping: 32, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 500, damping: 32, mass: 0.4 });

  // Hovered element rect
  const [rect, setRect] = useState<{ x: number; y: number; w: number; h: number; r: number } | null>(null);
  const [active, setActive] = useState(false); // pressed state for scale-down

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("button, a, [data-cursor]") as HTMLElement | null;
      if (!el) { setRect(null); return; }
      const r = el.getBoundingClientRect();
      const br = parseInt(getComputedStyle(el).borderRadius) || 6;
      setRect({ x: r.left - 6, y: r.top - 6, w: r.width + 12, h: r.height + 12, r: br + 4 });
    };

    const onDown = () => setActive(true);
    const onUp   = () => setActive(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, [mx, my]);

  return (
    <>
      {/* Enveloping blob */}
      <motion.div
        animate={rect
          ? { x: rect.x, y: rect.y, width: rect.w, height: rect.h, borderRadius: rect.r, scale: active ? 0.96 : 1, opacity: 1 }
          : { width: 0, height: 0, opacity: 0 }
        }
        transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.6 }}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999,
          background: "#fff", pointerEvents: "none",
          mixBlendMode: "difference",
        }}
      />
      {/* Trailing dot */}
      <motion.div
        style={{
          x: sx, y: sy,
          position: "fixed", top: -5, left: -5,
          width: 10, height: 10, borderRadius: "50%",
          background: "#fff", pointerEvents: "none",
          zIndex: 9998, mixBlendMode: "difference",
          scale: active ? 0.6 : 1,
        }}
        transition={{ scale: { type: "spring", stiffness: 600, damping: 20 } }}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SCRAMBLE TEXT
//    Wraps any string. On scroll-into-view, hacker-scrambles into final text.
//    Fast chars resolve left-to-right based on elapsed frames.
// ─────────────────────────────────────────────────────────────────────────────
const CHARS = "!<>-_\\/[]{}—=+*^?#~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function ScrambleText({ text, tag: Tag = "span", className = "" }: {
  text: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [out, setOut] = useState(text.replace(/[^\s]/g, () => CHARS[Math.floor(Math.random() * CHARS.length)]));
  const [triggered, setTriggered] = useState(false);

  // Intersection observer — fires once when 30% visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTriggered(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Scramble-to-resolve animation
  useEffect(() => {
    if (!triggered) return;
    let frame = 0;
    const total = 28; // ~1.1 s at 40 ms intervals
    const id = setInterval(() => {
      setOut(text.split("").map((ch, i) => {
        if (ch === " ") return " ";
        if (frame >= (i / text.length) * total) return ch; // reveal left→right
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(""));
      if (++frame > total + 4) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [triggered, text]);

  // @ts-expect-error – dynamic tag
  return <Tag ref={ref} className={className}>{out}</Tag>;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. NEEDY TAB
//    Page Visibility API: changes title + emoji favicon when user leaves.
//    Emoji favicon is drawn on a <canvas> — no external file needed.
// ─────────────────────────────────────────────────────────────────────────────
function useNeedyTab(normalTitle: string) {
  useEffect(() => {
    // Capture current favicon href
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    const originalHref = link?.href ?? "";

    const emojiFavicon = (emoji: string) => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d")!;
      ctx.font = "52px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(emoji, 32, 36);
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = c.toDataURL();
    };

    const handler = () => {
      if (document.hidden) {
        document.title = "Come back, I miss you 😢";
        emojiFavicon("😢");
      } else {
        document.title = normalTitle;
        if (link && originalHref) link.href = originalHref;
      }
    };

    document.addEventListener("visibilitychange", handler);
    return () => {
      document.removeEventListener("visibilitychange", handler);
      document.title = normalTitle;
    };
  }, [normalTitle]);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. X-RAY / "UNDER THE HOOD" TOGGLE
//    Injects a <style> tag revealing component structure via outlines + labels.
//    Uses data-component attributes for named labels.
//    CSS is injected once; toggling a body class activates it.
// ─────────────────────────────────────────────────────────────────────────────
const XRAY_CSS = `
  .xray div, .xray section, .xray article, .xray main,
  .xray header, .xray footer, .xray nav, .xray aside {
    outline: 1px dashed rgba(255, 48, 48, 0.45) !important;
    position: relative !important;
  }
  .xray [data-component]::before {
    content: attr(data-component);
    position: absolute !important;
    top: 0 !important; left: 0 !important;
    font: bold 9px/1.4 'JetBrains Mono', monospace !important;
    background: rgba(220, 38, 38, 0.88) !important;
    color: #fff !important;
    padding: 1px 5px !important;
    z-index: 99999 !important;
    pointer-events: none !important;
    border-radius: 0 0 3px 0 !important;
    white-space: nowrap !important;
    letter-spacing: 0.04em !important;
  }
`;

function useXRay() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    // Inject stylesheet once
    if (document.getElementById("xray-css")) return;
    const s = document.createElement("style");
    s.id = "xray-css";
    s.textContent = XRAY_CSS;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("xray", on);
    return () => document.body.classList.remove("xray");
  }, [on]);

  return [on, setOn] as const;
}

// ─────────────────────────────────────────────────────────────────────────────
// DEMO PAGE
// ─────────────────────────────────────────────────────────────────────────────
const FEATURE_CARDS = [
  { n: "01", title: "Squishy Cursor",         color: "#a78bfa", desc: "Move your mouse and hover the buttons below. The cursor morphs and inverts with mix-blend-mode: difference." },
  { n: "02", title: "Scramble Text",          color: "#34d399", desc: "Scroll down to trigger the text scramble. Characters resolve left-to-right like a slow decrypt." },
  { n: "03", title: "Needy Tab",              color: "#f87171", desc: "Switch to a different browser tab. Come back. You'll be missed." },
  { n: "04", title: "Under the Hood",         color: "#fb923c", desc: "Toggle the X-Ray mode to reveal the component tree with outlines and labels." },
];

export default function MicroDemo() {
  const [xray, setXRay] = useXRay();
  useNeedyTab("micro-interactions — Jinju Park");

  return (
    <div
      data-component="MicroDemo"
      style={{ cursor: "none", fontFamily: "'JetBrains Mono', monospace" }}
      className="min-h-screen bg-[#06060A] text-[#F0EEE9] selection:bg-violet-500/30"
    >
      {/* Custom cursor — rendered at root so it's above everything */}
      <Squishy />

      {/* ── HEADER ── */}
      <header data-component="Header" className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/[0.06] bg-[#06060A]/80 backdrop-blur-xl">
        <a href="/" className="text-xs tracking-[0.2em] text-white/40 hover:text-white transition-colors">
          ← JINJU.PARK
        </a>
        <span className="text-[10px] tracking-[0.25em] text-white/20">MICRO-INTERACTIONS LAB</span>

        {/* X-Ray toggle */}
        <button
          onClick={() => setXRay(v => !v)}
          className="text-[10px] tracking-widest border px-3 py-1.5 transition-all"
          style={{
            borderColor: xray ? "#fb923c" : "rgba(255,255,255,0.1)",
            color:       xray ? "#fb923c" : "rgba(255,255,255,0.4)",
            background:  xray ? "rgba(251,146,60,0.08)" : "transparent",
          }}
        >
          {xray ? "● X-RAY ON" : "○ X-RAY OFF"}
        </button>
      </header>

      {/* ── HERO ── */}
      <section data-component="Hero" className="px-8 pt-24 pb-20 max-w-4xl mx-auto">
        <p className="text-[10px] tracking-[0.25em] text-white/30 mb-6">FOUR MICRO-INTERACTIONS</p>
        <h1 className="text-6xl font-black leading-none tracking-tighter mb-8 text-white">
          The Details<br />
          <span className="text-white/20">are the Design.</span>
        </h1>
        <p className="text-sm text-white/40 max-w-md leading-relaxed">
          Each interaction below is modular, copy-pasteable, and production-ready.
          No extra libraries — Framer Motion + Web APIs only.
        </p>
      </section>

      {/* ── FEATURE GRID ── */}
      <main data-component="FeatureGrid" className="px-8 max-w-4xl mx-auto pb-32 space-y-24">

        {/* ── 01: SQUISHY CURSOR DEMO ── */}
        <section data-component="CursorDemo" className="space-y-6">
          <div className="flex items-baseline gap-4">
            <span className="text-[10px] tracking-widest text-violet-400/60">01</span>
            <ScrambleText text="SQUISHY CURSOR" tag="h2" className="text-2xl font-black tracking-tight text-violet-400" />
          </div>
          <p className="text-sm text-white/40 leading-relaxed max-w-lg">
            Hover the elements below. The cursor envelops them with a spring animation.
            <code className="ml-1 text-violet-300/60 text-xs">mix-blend-mode: difference</code> inverts text beneath.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Primary CTA", "Secondary", "Link style", "Danger"].map((label, i) => (
              <button
                key={label}
                className="px-5 py-2.5 text-sm font-bold tracking-wider transition-colors"
                style={{
                  border: `1px solid ${["#a78bfa","#34d399","#60a5fa","#f87171"][i]}40`,
                  color: ["#a78bfa","#34d399","#60a5fa","#f87171"][i],
                  background: `${["#a78bfa","#34d399","#60a5fa","#f87171"][i]}0D`,
                }}
              >
                {label}
              </button>
            ))}
            <a href="#" className="px-5 py-2.5 text-sm text-white/60 border border-white/10 hover:text-white transition-colors">
              Anchor tag
            </a>
          </div>
        </section>

        {/* ── 02: SCRAMBLE TEXT DEMO ── */}
        <section data-component="ScrambleDemo" className="space-y-6">
          <div className="flex items-baseline gap-4">
            <span className="text-[10px] tracking-widest text-emerald-400/60">02</span>
            <ScrambleText text="SCRAMBLE TEXT" tag="h2" className="text-2xl font-black tracking-tight text-emerald-400" />
          </div>
          <p className="text-sm text-white/40 max-w-lg leading-relaxed">
            Each block below scrambles in when scrolled into view. Characters resolve left-to-right over ~1s.
          </p>
          <div className="space-y-3 border-l-2 border-emerald-400/20 pl-6">
            {[
              "Award-winning UX Engineer with 4+ years shipping production code.",
              "Research → wireframes → design → React → shipped.",
              "I speak fluent Figma, TypeScript, PHP, and seven human languages.",
              "Currently: sole designer & front-end dev at JUST Capital.",
            ].map((line, i) => (
              <ScrambleText
                key={i}
                text={line}
                tag="p"
                className="text-base text-white/70 leading-relaxed font-mono"
              />
            ))}
          </div>
        </section>

        {/* ── 03: NEEDY TAB DEMO ── */}
        <section data-component="NeedyDemo" className="space-y-6">
          <div className="flex items-baseline gap-4">
            <span className="text-[10px] tracking-widest text-red-400/60">03</span>
            <ScrambleText text="NEEDY TAB" tag="h2" className="text-2xl font-black tracking-tight text-red-400" />
          </div>
          <p className="text-sm text-white/40 max-w-lg leading-relaxed">
            Switch to another tab right now. Check the tab title and favicon. Come back.
          </p>
          <div
            data-cursor
            className="inline-flex items-center gap-3 border border-red-400/20 bg-red-400/5 px-5 py-3 text-sm text-red-300"
          >
            <span className="text-lg">😢</span>
            <span className="tracking-wider">SWITCH TABS TO TRIGGER</span>
            <span className="text-red-400/40">↗</span>
          </div>
          <div className="font-mono text-xs text-white/20 space-y-1">
            <p>Hidden: <code className="text-red-300">title = "Come back, I miss you 😢"</code></p>
            <p>Visible: <code className="text-white/40">title = "micro-interactions — Jinju Park"</code></p>
            <p>Favicon drawn with <code className="text-white/40">canvas.toDataURL()</code> — no file needed.</p>
          </div>
        </section>

        {/* ── 04: X-RAY DEMO ── */}
        <section data-component="XRayDemo" className="space-y-6">
          <div className="flex items-baseline gap-4">
            <span className="text-[10px] tracking-widest text-orange-400/60">04</span>
            <ScrambleText text="UNDER THE HOOD" tag="h2" className="text-2xl font-black tracking-tight text-orange-400" />
          </div>
          <p className="text-sm text-white/40 max-w-lg leading-relaxed">
            Toggle X-RAY in the header. Every div/section gets a red outline. Named components
            show <code className="text-orange-300/60 text-xs">data-component</code> labels.
          </p>

          {/* Mock component tree to make x-ray interesting */}
          <div data-component="MockCard" className="border border-white/[0.06] p-5 space-y-3">
            <div data-component="CardHeader" className="flex justify-between items-center">
              <span className="text-sm font-bold text-white/60">ProjectCard</span>
              <span data-component="StatusBadge" className="text-[10px] text-orange-400 border border-orange-400/30 px-2 py-0.5">
                ACTIVE
              </span>
            </div>
            <div data-component="CardBody" className="space-y-2">
              <div data-component="TagList" className="flex gap-2">
                {["React", "TypeScript", "Framer"].map(t => (
                  <span key={t} className="text-[10px] text-white/40 border border-white/10 px-2 py-0.5">{t}</span>
                ))}
              </div>
              <p className="text-xs text-white/30">Turn X-Ray on to see the component boundaries above.</p>
            </div>
          </div>

          <button
            onClick={() => setXRay(v => !v)}
            className="px-5 py-2.5 text-sm font-bold tracking-wider border transition-all"
            style={{
              borderColor: xray ? "#fb923c" : "rgba(255,255,255,0.1)",
              color:       xray ? "#fb923c" : "rgba(255,255,255,0.4)",
              background:  xray ? "rgba(251,146,60,0.08)" : "transparent",
            }}
          >
            {xray ? "DEACTIVATE X-RAY ✕" : "ACTIVATE X-RAY →"}
          </button>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer data-component="Footer" className="border-t border-white/[0.06] px-8 py-6 flex justify-between items-center max-w-4xl mx-auto">
        <span className="text-[10px] text-white/20 tracking-widest">ALL FEATURES ARE MODULAR & COPY-PASTEABLE</span>
        <a href="/" className="text-[10px] text-white/20 hover:text-white transition-colors tracking-widest">← BACK</a>
      </footer>
    </div>
  );
}
