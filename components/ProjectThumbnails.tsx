"use client";

import type { Project } from "@/data/projects";

// ─── Palette helper — derives a full dark-card color set from any hex accent ──
function ap(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const l = (v: number, add: number) => Math.min(255, v + add);
  const d = (v: number, f: number)   => Math.floor(v * f);
  return {
    hex,
    // Very-dark tinted background
    bg:         `linear-gradient(140deg, rgb(${d(r,.11)},${d(g,.11)},${d(b,.13)}) 0%, rgb(${d(r,.20)},${d(g,.20)},${d(b,.22)}) 60%, rgb(${d(r,.14)},${d(g,.14)},${d(b,.16)}) 100%)`,
    border:     `rgba(${r},${g},${b},0.32)`,
    borderHi:   `rgba(${r},${g},${b},0.55)`,
    shadow:     `0 20px 60px rgba(${r},${g},${b},0.18), 0 40px 80px rgba(0,0,0,0.6)`,
    glow:       `radial-gradient(circle, rgba(${r},${g},${b},0.15) 0%, transparent 70%)`,
    // Text – brightened so it reads on the dark bg
    bright:     `rgba(${l(r,90)},${l(g,90)},${l(b,90)},0.88)`,
    mid:        `rgba(${l(r,90)},${l(g,90)},${l(b,90)},0.55)`,
    dim:        `rgba(${l(r,90)},${l(g,90)},${l(b,90)},0.32)`,
    // Data bars – four variants for visual variety
    bar1:       `rgba(${l(r,90)},${l(g,90)},${l(b,90)},0.85)`,
    bar2:       `rgba(${l(r,70)},${l(g,70)},${l(b,70)},0.70)`,
    bar3:       `rgba(${l(r,110)},${l(g,110)},${l(b,110)},0.60)`,
    bar4:       `rgba(${l(r,50)},${l(g,50)},${l(b,50)},0.75)`,
    // Component item cards
    itemBg:     `rgba(${r},${g},${b},0.09)`,
    itemBorder: `rgba(${r},${g},${b},0.20)`,
    // Top accent rule
    topLine:    `linear-gradient(90deg, transparent, ${hex} 30%, ${hex} 70%, transparent)`,
  };
}

// ── Netflix & Disney+ ─────────────────────────────────────────────────────────
function NetflixThumbnail({ project }: { project: Project }) {
  const p = ap(project.accent);
  const langs = [
    { text: "한국어",   left: "7%",  top: "7%",  rot: -8 },
    { text: "Español",  left: "54%", top: "4%",  rot:  4 },
    { text: "Français", left: "72%", top: "60%", rot: -5 },
    { text: "日本語",   left: "9%",  top: "58%", rot:  6 },
    { text: "عربي",     left: "40%", top: "74%", rot: -4 },
    { text: "Deutsch",  left: "78%", top: "26%", rot:  7 },
  ];

  return (
    <div style={{
      width: 348, height: 228,
      background: p.bg,
      borderRadius: 16, position: "relative", overflow: "hidden",
      border: `1px solid ${p.borderHi}`,
      boxShadow: `0 0 0 1px ${p.border}, ${p.shadow}`,
      fontFamily: "system-ui, sans-serif",
    }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: p.glow, top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />

      {/* Scan-line overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 8, pointerEvents: "none", background: "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.10) 3px, rgba(0,0,0,0.10) 4px)" }} />

      {/* Language bubbles */}
      {langs.map((l) => (
        <div key={l.text} style={{
          position: "absolute", left: l.left, top: l.top,
          background: p.itemBg, border: `1px solid ${p.border}`,
          borderRadius: 5, padding: "2px 7px",
          fontSize: 9.5, color: p.bright,
          transform: `rotate(${l.rot}deg)`,
          backdropFilter: "blur(5px)", zIndex: 2, whiteSpace: "nowrap", letterSpacing: "0.02em",
        }}>
          {l.text}
        </div>
      ))}

      {/* Central screen — perspective tilt */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 152, height: 96,
        transform: "translate(-50%,-50%) perspective(500px) rotateX(10deg) rotateY(-6deg)",
        background: `rgb(${Math.floor(parseInt(project.accent.slice(1,3),16)*0.06)},${Math.floor(parseInt(project.accent.slice(3,5),16)*0.04)},${Math.floor(parseInt(project.accent.slice(5,7),16)*0.04)})`,
        border: `2px solid ${project.accent}`,
        borderRadius: 8,
        boxShadow: `0 0 28px ${project.accent}88, 0 0 70px ${project.accent}33, inset 0 0 18px ${project.accent}0a`,
        zIndex: 4, overflow: "hidden",
      }}>
        {/* Header bar */}
        <div style={{ height: 21, background: `linear-gradient(90deg, ${project.accent}cc, ${project.accent})`, display: "flex", alignItems: "center", padding: "0 8px", gap: 6 }}>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 13, fontStyle: "italic", letterSpacing: "-0.03em" }}>N</span>
          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.18)" }} />
          {[1,2,3].map((d) => <div key={d} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.45)" }} />)}
        </div>
        {/* Content placeholders */}
        <div style={{ padding: "4px 5px", display: "flex", gap: 3 }}>
          {[p.bar1, p.bar2, p.bar3].map((bg, i) => (
            <div key={i} style={{ flex: 1, height: 40, background: bg.replace(/0\.\d+\)$/, "0.12)"), borderRadius: 3, border: `1px solid ${p.border}` }} />
          ))}
        </div>
        {/* Progress lines */}
        <div style={{ padding: "2px 6px", display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ height: 3, background: p.bar1, borderRadius: 2, width: "66%" }} />
          <div style={{ height: 2, background: p.dim, borderRadius: 2, width: "44%" }} />
        </div>
      </div>

      {/* Stat */}
      <div style={{ position: "absolute", bottom: 16, left: 16, zIndex: 6 }}>
        <p style={{ margin: 0, color: project.accent, fontSize: 24, fontWeight: 900, lineHeight: 1, fontFamily: "'JetBrains Mono', monospace" }}>40+</p>
        <p style={{ margin: 0, color: p.dim, fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase" }}>languages</p>
      </div>

      {/* Film strip */}
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 22, background: `rgb(${Math.floor(parseInt(project.accent.slice(1,3),16)*0.04)},0,0)`, borderLeft: `1px solid ${p.border}`, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 3, gap: 2, zIndex: 5, overflow: "hidden" }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} style={{ width: 13, height: 9, borderRadius: 1.5, flexShrink: 0, background: i % 2 === 0 ? p.border : "rgba(255,255,255,0.04)" }} />
        ))}
      </div>

      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, zIndex: 9, background: p.topLine, opacity: 0.9 }} />

      {/* Meta */}
      <div style={{ position: "absolute", top: 12, right: 30, zIndex: 6, textAlign: "right" }}>
        <p style={{ margin: 0, color: p.dim, fontSize: 8.5, fontFamily: "monospace" }}>2018–present</p>
        <p style={{ margin: 0, color: p.mid, fontSize: 8, letterSpacing: "0.04em" }}>Multilingual Ops</p>
      </div>
    </div>
  );
}

// ── JUST Intelligence ─────────────────────────────────────────────────────────
function JustIntelligenceThumbnail({ project }: { project: Project }) {
  const p = ap(project.accent);
  const rows = [
    { label: "ESG Score",  val: "87.4", bar: 0.87, col: p.bar1 },
    { label: "Workers",    val: "94.1", bar: 0.94, col: p.bar2 },
    { label: "Community",  val: "72.8", bar: 0.73, col: p.bar3 },
    { label: "Gov.",       val: "88.5", bar: 0.89, col: p.bar4 },
  ];

  return (
    <div style={{
      width: 340, height: 218,
      background: p.bg,
      borderRadius: 16, position: "relative", overflow: "hidden",
      border: `1px solid ${p.borderHi}`,
      boxShadow: p.shadow,
      fontFamily: "monospace",
    }}>
      {/* Glow */}
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: p.glow, top: "40%", left: "40%", transform: "translate(-50%,-50%)" }} />

      {/* Header */}
      <div style={{ padding: "14px 16px 8px", borderBottom: `1px solid ${p.itemBorder}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 9, color: p.bright, letterSpacing: "0.16em", textTransform: "uppercase" }}>JUST Intelligence</span>
          <span style={{ fontSize: 8, color: p.dim }}>Q4 2024</span>
        </div>
        <div style={{ marginTop: 4, fontSize: 18, fontWeight: 700, color: p.bright, lineHeight: 1 }}>
          S&P 500 <span style={{ fontSize: 11, color: p.mid, fontWeight: 400 }}>/ 500 cos.</span>
        </div>
      </div>

      {/* Data rows */}
      <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map((r) => (
          <div key={r.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 8.5, color: p.mid }}>{r.label}</span>
              <span style={{ fontSize: 8.5, color: r.col, fontWeight: 600 }}>{r.val}</span>
            </div>
            <div style={{ height: 3, background: p.itemBg, borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${r.bar * 100}%`, background: r.col, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Dot pattern */}
      <div style={{ position: "absolute", bottom: 12, right: 14, opacity: 0.22 }}>
        {[0,1,2].map((row) => (
          <div key={row} style={{ display: "flex", gap: 5, marginBottom: 5 }}>
            {[0,1,2,3].map((col) => (
              <div key={col} style={{ width: 3, height: 3, borderRadius: "50%", background: p.bright }} />
            ))}
          </div>
        ))}
      </div>

      {/* Top accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: p.topLine }} />
    </div>
  );
}

// ── Component System ──────────────────────────────────────────────────────────
function ComponentSystemThumbnail({ project }: { project: Project }) {
  const p = ap(project.accent);
  const components = [
    { name: "Button",  w: 2, icon: "□" },
    { name: "Card",    w: 1, icon: "▤" },
    { name: "Badge",   w: 1, icon: "◉" },
    { name: "Input",   w: 2, icon: "▭" },
    { name: "Nav",     w: 1, icon: "≡" },
    { name: "Modal",   w: 1, icon: "⊡" },
  ];

  return (
    <div style={{
      width: 340, height: 218,
      background: p.bg,
      borderRadius: 16, position: "relative", overflow: "hidden",
      border: `1px solid ${p.borderHi}`,
      boxShadow: p.shadow,
      fontFamily: "monospace",
    }}>
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: p.glow, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

      {/* Title */}
      <div style={{ padding: "14px 16px 10px" }}>
        <span style={{ fontSize: 9, color: p.bright, letterSpacing: "0.16em", textTransform: "uppercase" }}>Design System</span>
        <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginTop: 3 }}>
          30+ Components <span style={{ color: p.mid, fontSize: 10 }}>/ production</span>
        </div>
      </div>

      {/* Component grid */}
      <div style={{ padding: "0 14px", display: "flex", flexWrap: "wrap", gap: 6 }}>
        {components.map((c) => (
          <div key={c.name} style={{
            flex: `0 0 calc(${c.w === 2 ? "50%" : "25%"} - 6px)`,
            background: p.itemBg, border: `1px solid ${p.itemBorder}`,
            borderRadius: 6, padding: "7px 8px",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <span style={{ fontSize: 11, color: p.bright }}>{c.icon}</span>
            <span style={{ fontSize: 8, color: p.mid }}>{c.name}</span>
          </div>
        ))}
      </div>

      {/* Tech badges */}
      <div style={{ position: "absolute", bottom: 14, right: 16, display: "flex", gap: 5 }}>
        {["PHP", "WP", "CSS"].map((t) => (
          <span key={t} style={{ padding: "2px 6px", borderRadius: 10, background: p.itemBg, border: `1px solid ${p.itemBorder}`, fontSize: 8, color: p.bright }}>{t}</span>
        ))}
      </div>

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: p.topLine }} />
    </div>
  );
}

// ── IATA Training ─────────────────────────────────────────────────────────────
function IATAThumbnail({ project }: { project: Project }) {
  const p = ap(project.accent);
  const messages = [
    { text: "航空训练课程", from: "left",  lang: "ZH" },
    { text: "Aviation Training", from: "right", lang: "EN" },
    { text: "Formation IATA", from: "left",  lang: "FR" },
    { text: "WeChat flow ✓", from: "right", lang: "UX" },
  ];

  return (
    <div style={{
      width: 340, height: 218,
      background: p.bg,
      borderRadius: 16, position: "relative", overflow: "hidden",
      border: `1px solid ${p.borderHi}`,
      boxShadow: p.shadow,
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: p.glow, top: "50%", left: "40%", transform: "translate(-50%,-50%)" }} />

      {/* Meta */}
      <div style={{ padding: "14px 16px 6px" }}>
        <span style={{ fontSize: 9, color: p.bright, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "monospace" }}>IATA Training · WeChat</span>
      </div>

      {/* Phone outline */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: 88, height: 148,
        transform: "translate(-50%, -46%) perspective(400px) rotateY(8deg)",
        background: `rgb(0,${Math.floor(parseInt(project.accent.slice(3,5),16)*0.05)},${Math.floor(parseInt(project.accent.slice(5,7),16)*0.08)})`,
        border: `2px solid ${p.borderHi}`,
        borderRadius: 16,
        boxShadow: `0 0 24px ${project.accent}55, inset 0 0 12px ${project.accent}08`,
        overflow: "hidden", zIndex: 2,
      }}>
        {/* Status bar */}
        <div style={{ height: 14, background: p.itemBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 18, height: 4, background: p.dim, borderRadius: 2 }} />
        </div>
        {/* Chat bubbles */}
        <div style={{ padding: "6px 5px", display: "flex", flexDirection: "column", gap: 4 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.from === "right" ? "flex-end" : "flex-start" }}>
              <div style={{
                padding: "3px 6px", borderRadius: 8,
                background: msg.from === "right" ? p.itemBorder : "rgba(255,255,255,0.08)",
                fontSize: 6.5, color: "rgba(255,255,255,0.8)", maxWidth: "80%",
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ position: "absolute", bottom: 14, left: 16, fontFamily: "monospace" }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: p.bright, lineHeight: 1 }}>WeChat</div>
        <div style={{ fontSize: 8, color: p.dim, letterSpacing: "0.1em" }}>CROSS-CULTURAL UX</div>
      </div>

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: p.topLine }} />
    </div>
  );
}

// ── StoryCorps ────────────────────────────────────────────────────────────────
function StoryCorpsThumbnail({ project }: { project: Project }) {
  const p = ap(project.accent);
  const bars = [18, 32, 45, 28, 55, 40, 62, 35, 48, 30, 58, 42, 36, 52, 24, 44, 60, 38, 50, 26, 48, 34, 56, 40, 30, 50, 44, 22, 46, 38];

  return (
    <div style={{
      width: 340, height: 218,
      background: p.bg,
      borderRadius: 16, position: "relative", overflow: "hidden",
      border: `1px solid ${p.borderHi}`,
      boxShadow: p.shadow,
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: p.glow, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

      {/* Header */}
      <div style={{ padding: "14px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontSize: 9, color: p.bright, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "monospace" }}>StoryCorps</span>
          <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>App Redesign</div>
        </div>
        {/* Recording indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: project.accent, boxShadow: `0 0 8px ${project.accent}cc` }} />
          <span style={{ fontSize: 8, color: p.mid, fontFamily: "monospace" }}>REC</span>
        </div>
      </div>

      {/* Waveform */}
      <div style={{
        margin: "4px 16px", height: 70, background: p.itemBg,
        borderRadius: 8, border: `1px solid ${p.itemBorder}`,
        display: "flex", alignItems: "center", padding: "0 10px", gap: 2, overflow: "hidden",
      }}>
        {bars.map((h, i) => (
          <div key={i} style={{
            flex: "0 0 auto", width: 3, height: h * 0.9,
            background: p.bar1.replace(/0\.\d+\)$/, `${(0.3 + (h / 62) * 0.6).toFixed(2)})`),
            borderRadius: 1.5,
          }} />
        ))}
      </div>

      {/* Bottom */}
      <div style={{ position: "absolute", bottom: 14, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ fontFamily: "monospace" }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: p.bright, lineHeight: 1 }}>iOS &</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: p.bright, lineHeight: 1 }}>Android</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 8, color: p.dim, fontFamily: "monospace" }}>Shipped</div>
          <div style={{ fontSize: 8, color: p.mid }}>Echobind · 2021</div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: p.topLine }} />
    </div>
  );
}

// ── Thumbnail router ──────────────────────────────────────────────────────────
export function ProjectThumbnail({ project }: { project: Project }) {
  switch (project.id) {
    case "netflix-disney":    return <NetflixThumbnail project={project} />;
    case "just-intelligence": return <JustIntelligenceThumbnail project={project} />;
    case "just-wordpress":    return <ComponentSystemThumbnail project={project} />;
    case "iata":              return <IATAThumbnail project={project} />;
    case "storycorps":        return <StoryCorpsThumbnail project={project} />;
    default:                  return null;
  }
}
