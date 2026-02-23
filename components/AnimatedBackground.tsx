"use client";

import { useRef, useEffect } from "react";

interface Props {
  scrollY: number;
  mouse: { x: number; y: number };
  dark: boolean;
}

// Large aurora orbs — moved via sinusoidal paths, blended with "screen" mode for additive glow
const ORBS = [
  { cx: 0.22, cy: 0.28, r: 0.54, hue: 270, speed: 0.00055, phX: 0.0, phY: 0.0, ampX: 0.22, ampY: 0.18, a: 0.60 }, // violet
  { cx: 0.70, cy: 0.16, r: 0.60, hue: 232, speed: 0.00040, phX: 2.1, phY: 1.5, ampX: 0.18, ampY: 0.22, a: 0.52 }, // blue
  { cx: 0.48, cy: 0.80, r: 0.50, hue: 308, speed: 0.00068, phX: 1.0, phY: 3.1, ampX: 0.26, ampY: 0.14, a: 0.50 }, // magenta
  { cx: 0.84, cy: 0.54, r: 0.40, hue: 196, speed: 0.00048, phX: 3.4, phY: 0.9, ampX: 0.14, ampY: 0.24, a: 0.38 }, // cyan
] as const;

export default function AnimatedBackground({ scrollY, mouse, dark }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Keep refs so the RAF loop reads latest values without restarting
  const stateRef = useRef({ scrollY, mouse, dark });
  useEffect(() => { stateRef.current = { scrollY, mouse, dark }; }, [scrollY, mouse, dark]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;

    let W = 0, H = 0, t = 0;
    let smx = -1, smy = -1; // smoothed mouse
    let raf: number;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
      if (smx < 0) { smx = W / 2; smy = H / 2; }
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      t++;
      const { mouse: m, scrollY: sy, dark } = stateRef.current;
      const sf = sy * 0.0003; // scroll parallax factor

      // Ease mouse toward target — 0.14 = snappier tracking (was 0.05)
      smx += ((m.x > 0 ? m.x : smx) - smx) * 0.14;
      smy += ((m.y > 0 ? m.y : smy) - smy) * 0.14;

      // ── 1. Base coat ───────────────────────────────────────────────────────
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = dark ? "#060910" : "#F4F3EF";
      ctx.fillRect(0, 0, W, H);

      // ── 2. Aurora orbs ─────────────────────────────────────────────────────
      for (const o of ORBS) {
        const ox = (o.cx + Math.sin(t * o.speed + o.phX) * o.ampX) * W;
        const oy = (o.cy + Math.cos(t * o.speed * 1.27 + o.phY) * o.ampY - sf) * H;
        const r  = o.r * Math.min(W, H);

        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);

        if (dark) {
          // Additive screen blend — vivid aurora glow on dark bg
          ctx.globalCompositeOperation = "screen";
          g.addColorStop(0,    `hsla(${o.hue}, 90%, 70%, ${o.a})`);
          g.addColorStop(0.28, `hsla(${o.hue}, 84%, 55%, ${o.a * 0.55})`);
          g.addColorStop(0.6,  `hsla(${o.hue}, 78%, 40%, ${o.a * 0.18})`);
          g.addColorStop(1,    `hsla(${o.hue}, 70%, 22%, 0)`);
        } else {
          // Soft multiply tint on light bg — barely-visible pastel wash
          ctx.globalCompositeOperation = "multiply";
          g.addColorStop(0,    `hsla(${o.hue}, 55%, 72%, ${o.a * 0.18})`);
          g.addColorStop(0.35, `hsla(${o.hue}, 50%, 80%, ${o.a * 0.08})`);
          g.addColorStop(1,    `hsla(${o.hue}, 40%, 90%, 0)`);
        }

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // ── 3. Grid ────────────────────────────────────────────────────────────
      ctx.globalCompositeOperation = "source-over";
      const gs  = 72;
      const off = (sy * 0.12) % gs;

      ctx.strokeStyle = dark
        ? "rgba(140, 160, 255, 0.06)"
        : "rgba(100, 100, 160, 0.07)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= W; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = -gs + off; y < H + gs; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Brighter accent lines every 3rd row
      ctx.strokeStyle = dark
        ? "rgba(170, 140, 255, 0.11)"
        : "rgba(120, 100, 200, 0.08)";
      ctx.lineWidth = 0.8;
      for (let y = (gs * 3) - ((sy * 0.12) % (gs * 3)); y < H + gs * 3; y += gs * 3) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // ── 4. Mouse spotlight ─────────────────────────────────────────────────
      if (dark) {
        // Dark: additive screen glow
        ctx.globalCompositeOperation = "screen";

        const s1 = ctx.createRadialGradient(smx, smy, 0, smx, smy, 330);
        s1.addColorStop(0,   "rgba(150, 90, 255, 0.22)");
        s1.addColorStop(0.4, "rgba(90, 60, 215, 0.10)");
        s1.addColorStop(1,   "rgba(0, 0, 0, 0)");
        ctx.fillStyle = s1;
        ctx.fillRect(0, 0, W, H);

        const s2 = ctx.createRadialGradient(smx, smy, 0, smx, smy, 75);
        s2.addColorStop(0,   "rgba(218, 196, 255, 0.22)");
        s2.addColorStop(0.6, "rgba(160, 110, 255, 0.07)");
        s2.addColorStop(1,   "rgba(0, 0, 0, 0)");
        ctx.fillStyle = s2;
        ctx.fillRect(0, 0, W, H);
      } else {
        // Light: subtle warm sunspot on the bg
        ctx.globalCompositeOperation = "source-over";

        const s1 = ctx.createRadialGradient(smx, smy, 0, smx, smy, 280);
        s1.addColorStop(0,   "rgba(180, 140, 255, 0.10)");
        s1.addColorStop(0.5, "rgba(140, 100, 220, 0.04)");
        s1.addColorStop(1,   "rgba(0, 0, 0, 0)");
        ctx.fillStyle = s1;
        ctx.fillRect(0, 0, W, H);

        const s2 = ctx.createRadialGradient(smx, smy, 0, smx, smy, 60);
        s2.addColorStop(0,   "rgba(160, 120, 255, 0.08)");
        s2.addColorStop(1,   "rgba(0, 0, 0, 0)");
        ctx.fillStyle = s2;
        ctx.fillRect(0, 0, W, H);
      }

      // ── 5. Edge vignette ───────────────────────────────────────────────────
      if (dark) {
        ctx.globalCompositeOperation = "multiply";
        const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.92);
        vig.addColorStop(0, "rgba(255, 255, 255, 1)");
        vig.addColorStop(1, "rgba(8, 6, 20, 0.76)");
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
      } else {
        // Light mode: soft warm edge fade
        ctx.globalCompositeOperation = "source-over";
        const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.88);
        vig.addColorStop(0,   "rgba(0,0,0,0)");
        vig.addColorStop(1,   "rgba(200,195,210,0.14)");
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []); // single RAF loop, never restarts

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />
      {/* Film grain overlay — opacity reduced in light mode via CSS var trick */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
          opacity: 0.055,
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
}
