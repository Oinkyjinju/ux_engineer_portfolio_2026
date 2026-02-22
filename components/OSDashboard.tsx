"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Cartridge {
  id: string;
  label: string;
  sub: string;
  color: string;
  year: string;
  tags: string[];
  desc: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CARTRIDGES: Cartridge[] = [
  { id: "just",      label: "JUST INTEL",    sub: "Data Platform",          color: "#60a5fa", year: "2021–", tags: ["UX","Data Viz","React"],       desc: "Corporate accountability platform. Research → design → shipped front-end code." },
  { id: "component", label: "COMP SYS",      sub: "Design Engineering",     color: "#34d399", year: "2023–", tags: ["Systems","PHP","WordPress"],    desc: "30+ production components. Single source of truth for justcapital.com." },
  { id: "netflix",   label: "NFLX/D+",       sub: "Multilingual Design Ops", color: "#f87171", year: "2018–", tags: ["Design Ops","Typography","i18n"], desc: "Type systems for 30+ languages across Netflix and Disney+ global rollouts." },
  { id: "iata",      label: "IATA",          sub: "Cross-Cultural UX",      color: "#a78bfa", year: "2023",  tags: ["WeChat","Mobile","Research"],   desc: "Aviation training redesigned for WeChat. Chinese UX patterns from scratch." },
  { id: "story",     label: "STORYCORPS",    sub: "Mobile Redesign",        color: "#fb923c", year: "2021",  tags: ["iOS","Android","Shipped"],      desc: "End-to-end app redesign. Shipped on iOS and Android, 500k+ users." },
];

// ─── Web Audio click ──────────────────────────────────────────────────────────
function playClick(freq = 900) {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + 0.03);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
    osc.start(); osc.stop(ctx.currentTime + 0.06);
  } catch {}
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(true);
    playClick(checked ? 600 : 900);
    onChange();
    setTimeout(() => setPressed(false), 80);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-between w-full group"
      style={{ transform: pressed ? "translateY(1px)" : "translateY(0)", transition: "transform 60ms" }}
    >
      <span className="font-mono text-xs tracking-widest uppercase text-[#888]">{label}</span>
      <div
        className="relative w-10 h-5 rounded-none border border-[#333] transition-colors duration-150"
        style={{ background: checked ? "#FF4D00" : "#111" }}
      >
        <motion.div
          className="absolute top-0.5 w-4 h-4 bg-[#F5F0E8]"
          animate={{ left: checked ? "calc(100% - 18px)" : "2px" }}
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
        />
      </div>
    </button>
  );
}

// ─── Cartridge chip ───────────────────────────────────────────────────────────
function CartridgeChip({ c, loaded, onDragStart }: { c: Cartridge; loaded: boolean; onDragStart: (id: string) => void }) {
  const [pressing, setPressing] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => { e.dataTransfer.setData("id", c.id); onDragStart(c.id); }}
      onMouseDown={() => setPressing(true)}
      onMouseUp={() => setPressing(false)}
      onMouseLeave={() => setPressing(false)}
      style={{
        transform: pressing ? "translateY(2px) scale(0.98)" : "translateY(0) scale(1)",
        transition: "transform 60ms",
        opacity: loaded ? 0.35 : 1,
        borderColor: loaded ? "#333" : c.color + "60",
        cursor: loaded ? "default" : "grab",
      }}
      className="border bg-[#0D0D0D] p-2.5 select-none"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
        <span className="font-mono text-xs font-bold tracking-widest text-[#F5F0E8]">{c.label}</span>
        <span className="font-mono text-[10px] text-[#555] ml-auto">{c.year}</span>
      </div>
      <p className="font-mono text-[10px] text-[#666] pl-3.5">{c.sub}</p>
    </div>
  );
}

// ─── Widget shell ─────────────────────────────────────────────────────────────
function Widget({ title, badge, children, className = "" }: { title: string; badge?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-[#222] bg-[#080808] flex flex-col ${className}`}>
      {/* Widget header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1A1A1A]">
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#FF4D00]">{title}</span>
        {badge && <span className="font-mono text-[9px] tracking-widest text-[#444] border border-[#222] px-1.5 py-0.5">{badge}</span>}
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────
export default function OSDashboard() {
  const [loadedId, setLoadedId]     = useState<string | null>(null);
  const [dragOver, setDragOver]     = useState(false);
  const [highContrast, setHC]       = useState(false);
  const [fontSize, setFontSize]     = useState(16);
  const [reduceMotion, setRM]       = useState(false);
  const [time, setTime]             = useState("");
  const tickRef                     = useRef(0);

  // Clock
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Pulse bar animation
  useEffect(() => {
    const id = setInterval(() => tickRef.current++, 1200);
    return () => clearInterval(id);
  }, []);

  // Apply CSS variables to root
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--os-font-size", `${fontSize}px`);
    r.style.setProperty("--os-bg",        highContrast ? "#000000" : "#080808");
    r.style.setProperty("--os-fg",        highContrast ? "#FFFFFF" : "#F5F0E8");
    r.style.setProperty("--os-accent",    highContrast ? "#FF6600" : "#FF4D00");
    r.style.setProperty("--os-border",    highContrast ? "#FF4D00" : "#222222");
  }, [highContrast, fontSize, reduceMotion]);

  const loaded = CARTRIDGES.find(c => c.id === loadedId) ?? null;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    if (id) { setLoadedId(id); playClick(1100); }
    setDragOver(false);
  };

  const eject = () => { setLoadedId(null); playClick(500); };

  return (
    <div
      className="min-h-screen bg-[#080808] text-[#F5F0E8] flex flex-col"
      style={{
        fontSize: "var(--os-font-size, 16px)",
        background: "var(--os-bg, #080808)",
        color: "var(--os-fg, #F5F0E8)",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* ── HEADER BAR ── */}
      <header
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: "var(--os-border, #222)" }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-black tracking-[0.3em] text-[#FF4D00]">JINJU.OS</span>
          <span className="font-mono text-[9px] text-[#333] tracking-widest">v1.0.0</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-[#444] tabular-nums">{time}</span>
          <div className="w-px h-3 bg-[#222]" />
          <span className="font-mono text-[9px] text-[#444] tracking-widest">
            {loadedId ? `SLOT: ${loaded?.label}` : "SLOT: EMPTY"}
          </span>
        </div>
      </header>

      {/* ── GRID ── */}
      <main className="flex-1 grid p-3 gap-3" style={{
        gridTemplateColumns: "220px 1fr 200px",
        gridTemplateRows: "1fr 72px",
      }}>

        {/* LIBRARY */}
        <Widget title="LIBRARY" badge={`${CARTRIDGES.length} CARTS`} className="row-span-1">
          <div className="p-2 flex flex-col gap-1.5 overflow-y-auto h-full">
            <p className="font-mono text-[9px] text-[#333] tracking-widest mb-1 px-1">DRAG → READER TO LOAD</p>
            {CARTRIDGES.map(c => (
              <CartridgeChip
                key={c.id}
                c={c}
                loaded={c.id === loadedId}
                onDragStart={() => {}}
              />
            ))}
          </div>
        </Widget>

        {/* READER */}
        <Widget title="READER" badge={loaded ? "LOADED" : "STANDBY"}>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className="h-full flex flex-col items-center justify-center relative p-6 transition-colors duration-150"
            style={{ background: dragOver ? "#FF4D0010" : "transparent", border: dragOver ? "1px dashed #FF4D00" : "1px dashed transparent" }}
          >
            <AnimatePresence mode="wait">
              {loaded ? (
                <motion.div
                  key={loaded.id}
                  initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-lg"
                >
                  {/* Loaded cartridge */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2" style={{ background: loaded.color }} />
                        <span className="font-mono text-xs tracking-widest text-[#555]">{loaded.year}</span>
                      </div>
                      <h2 className="font-mono text-2xl font-black tracking-tight leading-none" style={{ color: loaded.color }}>
                        {loaded.label}
                      </h2>
                      <p className="font-mono text-xs text-[#666] mt-1 tracking-widest">{loaded.sub}</p>
                    </div>
                    <button
                      onClick={eject}
                      className="font-mono text-[9px] tracking-widest border border-[#333] px-2 py-1 text-[#555] hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors"
                    >
                      EJECT ⏏
                    </button>
                  </div>

                  <div className="border-t border-[#1A1A1A] pt-4 mb-4">
                    <p className="font-mono text-sm text-[#888] leading-relaxed">{loaded.desc}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {loaded.tags.map(t => (
                      <span key={t} className="font-mono text-[10px] tracking-widest px-2 py-0.5 border"
                        style={{ borderColor: loaded.color + "40", color: loaded.color, background: loaded.color + "0D" }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Fake progress scanner line */}
                  <motion.div
                    className="mt-5 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${loaded.color}, transparent)` }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={reduceMotion ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center select-none"
                >
                  <div className="font-mono text-6xl text-[#1A1A1A] font-black mb-3">▭</div>
                  <p className="font-mono text-[10px] tracking-[0.25em] text-[#333]">DROP CARTRIDGE HERE</p>
                  <p className="font-mono text-[9px] tracking-widest text-[#2A2A2A] mt-1">SLOT READY</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Widget>

        {/* SETTINGS */}
        <Widget title="SETTINGS" badge="SYS">
          <div className="p-3 flex flex-col gap-4">
            <Toggle label="HIGH CONTRAST" checked={highContrast} onChange={() => { setHC(p => !p); }} />
            <Toggle label="REDUCE MOTION" checked={reduceMotion} onChange={() => { setRM(p => !p); }} />

            {/* Font size slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="font-mono text-[10px] tracking-widest text-[#888] uppercase">Font Size</span>
                <span className="font-mono text-[10px] text-[#FF4D00] tabular-nums">{fontSize}px</span>
              </div>
              <input
                type="range" min={12} max={22} step={1} value={fontSize}
                onChange={(e) => { setFontSize(+e.target.value); playClick(700 + +e.target.value * 10); }}
                className="w-full accent-[#FF4D00] h-0.5 bg-[#222] appearance-none cursor-pointer"
              />
              <div className="flex justify-between">
                <span className="font-mono text-[9px] text-[#333]">12</span>
                <span className="font-mono text-[9px] text-[#333]">22</span>
              </div>
            </div>

            {/* Status readout */}
            <div className="border-t border-[#1A1A1A] pt-3 flex flex-col gap-1.5">
              {[
                ["CONTRAST", highContrast ? "HIGH" : "STD"],
                ["MOTION",   reduceMotion ? "OFF"  : "ON"],
                ["FONT",     `${fontSize}PX`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="font-mono text-[9px] text-[#333] tracking-widest">{k}</span>
                  <span className="font-mono text-[9px] text-[#FF4D00]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Widget>

        {/* SYSTEM BAR */}
        <div
          className="col-span-3 border border-[#1A1A1A] bg-[#050505] flex items-center px-4 gap-6"
        >
          {[
            { label: "PROJECTS", val: CARTRIDGES.length, max: 8 },
            { label: "SKILLS",   val: 6,                 max: 8 },
            { label: "YEARS",    val: 4,                 max: 8 },
          ].map(({ label, val, max }) => (
            <div key={label} className="flex items-center gap-3 flex-1">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#444] w-16 flex-shrink-0">{label}</span>
              <div className="flex gap-0.5 flex-1">
                {Array.from({ length: max }).map((_, i) => (
                  <div
                    key={i}
                    className="h-2 flex-1 transition-colors duration-300"
                    style={{ background: i < val ? "#FF4D00" : "#1A1A1A" }}
                  />
                ))}
              </div>
              <span className="font-mono text-[9px] text-[#FF4D00] tabular-nums w-6 text-right">{val}</span>
            </div>
          ))}
          <div className="w-px h-4 bg-[#1A1A1A]" />
          <span className="font-mono text-[9px] text-[#2A2A2A] tracking-widest">
            {loadedId ? `● READING ${loaded?.label}` : "○ IDLE"}
          </span>
        </div>
      </main>
    </div>
  );
}
