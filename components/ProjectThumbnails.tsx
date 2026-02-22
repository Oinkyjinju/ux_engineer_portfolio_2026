"use client";

import type { Project } from "@/data/projects";

// ── Netflix & Disney+ ─────────────────────────────────────────────────────────
// Concept: "The Multilingual Broadcast" — isometric TV screen + language bubbles + film strip
function NetflixThumbnail() {
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
      background: "linear-gradient(140deg, #080000 0%, #160303 50%, #0b0104 100%)",
      borderRadius: 16,
      position: "relative",
      overflow: "hidden",
      border: "1px solid rgba(220,38,38,0.38)",
      boxShadow: [
        "0 0 0 1px rgba(220,38,38,0.14)",
        "0 24px 70px rgba(220,38,38,0.28)",
        "0 50px 100px rgba(0,0,0,0.65)",
      ].join(", "),
      fontFamily: "system-ui, sans-serif",
    }}>

      {/* Deep red ambient glow */}
      <div style={{
        position: "absolute",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(220,38,38,0.20) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />

      {/* Scan-line overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 8, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)",
      }} />

      {/* Language bubbles */}
      {langs.map((l) => (
        <div key={l.text} style={{
          position: "absolute",
          left: l.left, top: l.top,
          background: "rgba(220,38,38,0.13)",
          border: "1px solid rgba(220,38,38,0.32)",
          borderRadius: 5, padding: "2px 7px",
          fontSize: 9.5, color: "rgba(252,165,165,0.88)",
          transform: `rotate(${l.rot}deg)`,
          backdropFilter: "blur(5px)",
          zIndex: 2, whiteSpace: "nowrap",
          letterSpacing: "0.02em",
        }}>
          {l.text}
        </div>
      ))}

      {/* Central screen — perspective tilt for 3D feel */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: 152, height: 96,
        transform: "translate(-50%,-50%) perspective(500px) rotateX(10deg) rotateY(-6deg)",
        background: "#060000",
        border: "2px solid #DC2626",
        borderRadius: 8,
        boxShadow: [
          "0 0 28px rgba(220,38,38,0.55)",
          "0 0 70px rgba(220,38,38,0.20)",
          "inset 0 0 18px rgba(220,38,38,0.06)",
        ].join(", "),
        zIndex: 4, overflow: "hidden",
      }}>
        {/* Netflix header bar */}
        <div style={{
          height: 21,
          background: "linear-gradient(90deg, #B91C1C, #DC2626)",
          display: "flex", alignItems: "center", padding: "0 8px", gap: 6,
        }}>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 13, fontStyle: "italic", letterSpacing: "-0.03em" }}>N</span>
          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.18)" }} />
          {[1,2,3].map((d) => (
            <div key={d} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.45)" }} />
          ))}
        </div>
        {/* Content cards */}
        <div style={{ padding: "4px 5px", display: "flex", gap: 3 }}>
          {["#2E0000","#180028","#001824"].map((bg, i) => (
            <div key={i} style={{
              flex: 1, height: 40,
              background: bg, borderRadius: 3,
              border: "1px solid rgba(220,38,38,0.14)",
            }} />
          ))}
        </div>
        {/* Text lines */}
        <div style={{ padding: "2px 6px", display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ height: 3, background: "rgba(220,38,38,0.48)", borderRadius: 2, width: "66%" }} />
          <div style={{ height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 2, width: "44%" }} />
        </div>
      </div>

      {/* Stat — bottom left */}
      <div style={{ position: "absolute", bottom: 16, left: 16, zIndex: 6 }}>
        <p style={{ margin: 0, color: "#DC2626", fontSize: 24, fontWeight: 900, lineHeight: 1, fontFamily: "'JetBrains Mono', monospace" }}>
          40+
        </p>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.32)", fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          languages
        </p>
      </div>

      {/* Film strip — right edge */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0,
        width: 22, background: "#040000",
        borderLeft: "1px solid rgba(220,38,38,0.22)",
        display: "flex", flexDirection: "column",
        alignItems: "center", paddingTop: 3, gap: 2,
        zIndex: 5, overflow: "hidden",
      }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} style={{
            width: 13, height: 9, borderRadius: 1.5, flexShrink: 0,
            background: i % 2 === 0 ? "rgba(220,38,38,0.38)" : "rgba(255,255,255,0.05)",
          }} />
        ))}
      </div>

      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1.5, zIndex: 9,
        background: "linear-gradient(90deg, transparent, #DC2626 30%, #DC2626 70%, transparent)",
        opacity: 0.9,
      }} />

      {/* Meta — top right */}
      <div style={{ position: "absolute", top: 12, right: 30, zIndex: 6, textAlign: "right" }}>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.3)", fontSize: 8.5, fontFamily: "monospace" }}>2018–present</p>
        <p style={{ margin: 0, color: "rgba(220,38,38,0.65)", fontSize: 8, letterSpacing: "0.04em" }}>Multilingual Ops</p>
      </div>
    </div>
  );
}

// ── JUST Intelligence ─────────────────────────────────────────────────────────
// Concept: "Accountability Data Platform" — data grid with glowing metrics
function JustIntelligenceThumbnail({ project }: { project: Project }) {
  const rows = [
    { label: "ESG Score",  val: "87.4", bar: 0.87, col: "#60a5fa" },
    { label: "Workers",    val: "94.1", bar: 0.94, col: "#34d399" },
    { label: "Community",  val: "72.8", bar: 0.73, col: "#a78bfa" },
    { label: "Gov.",       val: "88.5", bar: 0.89, col: "#60a5fa" },
  ];

  return (
    <div style={{
      width: 340, height: 218,
      background: "linear-gradient(140deg, #020a1a 0%, #061228 60%, #040d1e 100%)",
      borderRadius: 16, position: "relative", overflow: "hidden",
      border: "1px solid rgba(96,165,250,0.28)",
      boxShadow: "0 20px 60px rgba(96,165,250,0.18), 0 40px 80px rgba(0,0,0,0.6)",
      fontFamily: "monospace",
    }}>
      {/* Glow */}
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,0.14) 0%, transparent 70%)", top: "40%", left: "40%", transform: "translate(-50%,-50%)" }} />

      {/* Header */}
      <div style={{ padding: "14px 16px 8px", borderBottom: "1px solid rgba(96,165,250,0.14)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 9, color: "rgba(96,165,250,0.8)", letterSpacing: "0.16em", textTransform: "uppercase" }}>JUST Intelligence</span>
          <span style={{ fontSize: 8, color: "rgba(255,255,255,0.25)" }}>Q4 2024</span>
        </div>
        <div style={{ marginTop: 4, fontSize: 18, fontWeight: 700, color: "#60a5fa", lineHeight: 1 }}>
          S&P 500 <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>/ 500 cos.</span>
        </div>
      </div>

      {/* Data rows */}
      <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map((r) => (
          <div key={r.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 8.5, color: "rgba(255,255,255,0.45)" }}>{r.label}</span>
              <span style={{ fontSize: 8.5, color: r.col, fontWeight: 600 }}>{r.val}</span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${r.bar * 100}%`, background: r.col, borderRadius: 2, opacity: 0.8 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Corner dot pattern */}
      <div style={{ position: "absolute", bottom: 12, right: 14, opacity: 0.18 }}>
        {[0,1,2].map((row) => (
          <div key={row} style={{ display: "flex", gap: 5, marginBottom: 5 }}>
            {[0,1,2,3].map((col) => (
              <div key={col} style={{ width: 3, height: 3, borderRadius: "50%", background: "#60a5fa" }} />
            ))}
          </div>
        ))}
      </div>

      {/* Top accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: "linear-gradient(90deg, transparent, #60a5fa 30%, #60a5fa 70%, transparent)" }} />
    </div>
  );
}

// ── Component System ──────────────────────────────────────────────────────────
// Concept: "Scalable Design Engineering" — grid of component cards
function ComponentSystemThumbnail({ project }: { project: Project }) {
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
      background: "linear-gradient(140deg, #021008 0%, #041a0a 60%, #031208 100%)",
      borderRadius: 16, position: "relative", overflow: "hidden",
      border: "1px solid rgba(52,211,153,0.28)",
      boxShadow: "0 20px 60px rgba(52,211,153,0.16), 0 40px 80px rgba(0,0,0,0.6)",
      fontFamily: "monospace",
    }}>
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

      {/* Title */}
      <div style={{ padding: "14px 16px 10px" }}>
        <span style={{ fontSize: 9, color: "rgba(52,211,153,0.8)", letterSpacing: "0.16em", textTransform: "uppercase" }}>Design System</span>
        <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginTop: 3 }}>
          30+ Components <span style={{ color: "rgba(52,211,153,0.6)", fontSize: 10 }}>/ production</span>
        </div>
      </div>

      {/* Component grid */}
      <div style={{ padding: "0 14px", display: "flex", flexWrap: "wrap", gap: 6 }}>
        {components.map((c) => (
          <div key={c.name} style={{
            flex: `0 0 calc(${c.w === 2 ? "50%" : "25%"} - 6px)`,
            background: "rgba(52,211,153,0.07)",
            border: "1px solid rgba(52,211,153,0.22)",
            borderRadius: 6, padding: "7px 8px",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <span style={{ fontSize: 11, color: "rgba(52,211,153,0.7)" }}>{c.icon}</span>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)" }}>{c.name}</span>
          </div>
        ))}
      </div>

      {/* PHP badge */}
      <div style={{ position: "absolute", bottom: 14, right: 16, display: "flex", gap: 5 }}>
        {["PHP", "WP", "CSS"].map((t) => (
          <span key={t} style={{ padding: "2px 6px", borderRadius: 10, background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.2)", fontSize: 8, color: "rgba(52,211,153,0.75)" }}>{t}</span>
        ))}
      </div>

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: "linear-gradient(90deg, transparent, #34d399 30%, #34d399 70%, transparent)" }} />
    </div>
  );
}

// ── IATA Training ─────────────────────────────────────────────────────────────
// Concept: "Cross-Cultural UX · WeChat" — mobile phone with chat bubbles
function IATAThumbnail({ project }: { project: Project }) {
  const messages = [
    { text: "航空训练课程", from: "left",  lang: "ZH" },
    { text: "Aviation Training", from: "right", lang: "EN" },
    { text: "Formation IATA", from: "left",  lang: "FR" },
    { text: "WeChat flow ✓", from: "right", lang: "UX" },
  ];

  return (
    <div style={{
      width: 340, height: 218,
      background: "linear-gradient(140deg, #0a0218 0%, #120428 60%, #080116 100%)",
      borderRadius: 16, position: "relative", overflow: "hidden",
      border: "1px solid rgba(167,139,250,0.28)",
      boxShadow: "0 20px 60px rgba(167,139,250,0.18), 0 40px 80px rgba(0,0,0,0.6)",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 70%)", top: "50%", left: "40%", transform: "translate(-50%,-50%)" }} />

      {/* Meta */}
      <div style={{ padding: "14px 16px 6px" }}>
        <span style={{ fontSize: 9, color: "rgba(167,139,250,0.8)", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "monospace" }}>IATA Training · WeChat</span>
      </div>

      {/* Phone outline */}
      <div style={{
        position: "absolute",
        left: "50%", top: "50%",
        width: 88, height: 148,
        transform: "translate(-50%, -46%) perspective(400px) rotateY(8deg)",
        background: "#0a0015",
        border: "2px solid rgba(167,139,250,0.5)",
        borderRadius: 16,
        boxShadow: "0 0 24px rgba(167,139,250,0.35), inset 0 0 12px rgba(167,139,250,0.04)",
        overflow: "hidden",
        zIndex: 2,
      }}>
        {/* Status bar */}
        <div style={{ height: 14, background: "rgba(167,139,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 18, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2 }} />
        </div>
        {/* Chat bubbles */}
        <div style={{ padding: "6px 5px", display: "flex", flexDirection: "column", gap: 4 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: msg.from === "right" ? "flex-end" : "flex-start",
            }}>
              <div style={{
                padding: "3px 6px", borderRadius: 8,
                background: msg.from === "right" ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.1)",
                fontSize: 6.5, color: "rgba(255,255,255,0.8)",
                maxWidth: "80%",
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ position: "absolute", bottom: 14, left: 16, fontFamily: "monospace" }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#a78bfa", lineHeight: 1 }}>WeChat</div>
        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>CROSS-CULTURAL UX</div>
      </div>

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: "linear-gradient(90deg, transparent, #a78bfa 30%, #a78bfa 70%, transparent)" }} />
    </div>
  );
}

// ── StoryCorps ────────────────────────────────────────────────────────────────
// Concept: "Mobile App Redesign" — audio waveform + recording dot
function StoryCorpsThumbnail({ project }: { project: Project }) {
  // Simulate a waveform with varying heights
  const bars = [18, 32, 45, 28, 55, 40, 62, 35, 48, 30, 58, 42, 36, 52, 24, 44, 60, 38, 50, 26, 48, 34, 56, 40, 30, 50, 44, 22, 46, 38];

  return (
    <div style={{
      width: 340, height: 218,
      background: "linear-gradient(140deg, #0f0600 0%, #1c0900 60%, #100500 100%)",
      borderRadius: 16, position: "relative", overflow: "hidden",
      border: "1px solid rgba(251,146,60,0.28)",
      boxShadow: "0 20px 60px rgba(251,146,60,0.18), 0 40px 80px rgba(0,0,0,0.6)",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,146,60,0.14) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

      {/* Header */}
      <div style={{ padding: "14px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontSize: 9, color: "rgba(251,146,60,0.8)", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "monospace" }}>StoryCorps</span>
          <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>App Redesign</div>
        </div>
        {/* Recording indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fb923c", boxShadow: "0 0 8px rgba(251,146,60,0.8)" }} />
          <span style={{ fontSize: 8, color: "rgba(251,146,60,0.7)", fontFamily: "monospace" }}>REC</span>
        </div>
      </div>

      {/* Waveform */}
      <div style={{
        margin: "4px 16px",
        height: 70,
        background: "rgba(251,146,60,0.05)",
        borderRadius: 8,
        border: "1px solid rgba(251,146,60,0.12)",
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
        gap: 2,
        overflow: "hidden",
      }}>
        {bars.map((h, i) => (
          <div key={i} style={{
            flex: "0 0 auto",
            width: 3,
            height: h * 0.9,
            background: `rgba(251,146,60,${0.3 + (h / 62) * 0.6})`,
            borderRadius: 1.5,
          }} />
        ))}
      </div>

      {/* Bottom */}
      <div style={{ position: "absolute", bottom: 14, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ fontFamily: "monospace" }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#fb923c", lineHeight: 1 }}>iOS &</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#fb923c", lineHeight: 1 }}>Android</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>Shipped</div>
          <div style={{ fontSize: 8, color: "rgba(251,146,60,0.6)" }}>Echobind · 2021</div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: "linear-gradient(90deg, transparent, #fb923c 30%, #fb923c 70%, transparent)" }} />
    </div>
  );
}

// ── Thumbnail router ──────────────────────────────────────────────────────────

export function ProjectThumbnail({ project }: { project: Project }) {
  switch (project.id) {
    case "netflix-disney":   return <NetflixThumbnail />;
    case "just-intelligence": return <JustIntelligenceThumbnail project={project} />;
    case "just-wordpress":   return <ComponentSystemThumbnail project={project} />;
    case "iata":             return <IATAThumbnail project={project} />;
    case "storycorps":       return <StoryCorpsThumbnail project={project} />;
    default:                 return null;
  }
}
