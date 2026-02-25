"use client";

// ─── Dynamic import prevents Three.js / Rapier from running on the server ────
// Three.js uses browser APIs (WebGL, canvas) that don't exist in Node.
import dynamic from "next/dynamic";
import { Suspense, useState, useCallback } from "react";
import { type SandboxItem } from "./config";
import CaseStudyOverlay from "./CaseStudyOverlay";

const SandboxCanvas = dynamic(() => import("./SandboxCanvas"), {
  ssr: false,
  loading: () => <SandboxLoader />,
});

// ─── Lightweight fallback while the WASM physics engine loads ────────────────
function SandboxLoader() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: ["#60a5fa", "#34d399", "#f87171", "#a78bfa", "#fb923c"][i],
            animation: `sandboxBounce 1.1s ${i * 0.13}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes sandboxBounce {
          0%, 100% { transform: translateY(0);   opacity: 0.4; }
          50%       { transform: translateY(-18px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Hint text overlay ────────────────────────────────────────────────────────
function Hint({ dark }: { dark: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.28)",
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        zIndex: 10,
      }}
    >
      drag · throw · click to explore
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function PhysicsSandbox({ dark }: { dark: boolean }) {
  const [selected,  setSelected]  = useState<SandboxItem | null>(null);
  const [returnKey, setReturnKey] = useState(0);
  const handleReset = useCallback(() => setReturnKey((k) => k + 1), []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        overflow: "hidden",
      }}
    >
      {/* 3D canvas — SSR disabled */}
      <Suspense fallback={<SandboxLoader />}>
        <SandboxCanvas onSelect={setSelected} dark={dark} returnKey={returnKey} />
      </Suspense>

      {/* Reset positions button */}
      <button
        onClick={handleReset}
        aria-label="Reset object positions"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 14px",
          borderRadius: 99,
          border: dark ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(0,0,0,0.1)",
          background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
          color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.4)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition: "opacity 0.18s",
        }}
      >
        ↺ reset
      </button>

      {/* Interaction hint */}
      <Hint dark={dark} />

      {/* 2D overlay — Framer Motion, always in the DOM for AnimatePresence */}
      <CaseStudyOverlay item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
