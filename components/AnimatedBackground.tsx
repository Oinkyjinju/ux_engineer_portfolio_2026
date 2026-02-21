"use client";

import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

interface BlobConfig {
  x: number;
  y: number;
  r: number;
  color: string;
}

interface Props {
  scrollY: number;
  mouse: { x: number; y: number };
  dark: boolean;
}

export default function AnimatedBackground({ scrollY, mouse, dark }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          hue: Math.random() * 360,
        });
      }
    }

    const draw = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const t = frameRef.current * 0.008;
      const scrollFactor = scrollY * 0.0003;

      const blobs: BlobConfig[] = [
        { x: 0.2 + Math.sin(t * 0.7) * 0.1,    y: 0.3 + Math.cos(t * 0.5) * 0.15,  r: 350, color: dark ? "rgba(37,99,235,0.08)"   : "rgba(37,99,235,0.06)"   },
        { x: 0.75 + Math.cos(t * 0.6) * 0.12,  y: 0.2 + Math.sin(t * 0.8) * 0.1,   r: 300, color: dark ? "rgba(124,58,237,0.07)"  : "rgba(124,58,237,0.05)"  },
        { x: 0.5 + Math.sin(t * 0.4 + 2) * 0.15, y: 0.7 + Math.cos(t * 0.3) * 0.12, r: 400, color: dark ? "rgba(5,150,105,0.06)"  : "rgba(5,150,105,0.04)"   },
        { x: 0.85 + Math.cos(t * 0.5 + 1) * 0.08, y: 0.8 + Math.sin(t * 0.7 + 1) * 0.1, r: 280, color: dark ? "rgba(234,88,12,0.05)" : "rgba(234,88,12,0.04)" },
      ];

      blobs.forEach((b) => {
        const grd = ctx.createRadialGradient(
          b.x * canvas.width, (b.y - scrollFactor) * canvas.height, 0,
          b.x * canvas.width, (b.y - scrollFactor) * canvas.height, b.r
        );
        grd.addColorStop(0, b.color);
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Scrolling grid
      const gridOpacity = dark ? 0.04 : 0.06;
      ctx.strokeStyle = dark ? `rgba(255,255,255,${gridOpacity})` : `rgba(0,0,0,${gridOpacity})`;
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      const offsetY = (scrollY * 0.15) % gridSize;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = -gridSize + offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Mouse spotlight
      if (mouse.x > 0 && mouse.y > 0) {
        const mouseGrd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 250);
        mouseGrd.addColorStop(0, dark ? "rgba(124,58,237,0.12)" : "rgba(124,58,237,0.08)");
        mouseGrd.addColorStop(0.5, dark ? "rgba(37,99,235,0.05)" : "rgba(37,99,235,0.03)");
        mouseGrd.addColorStop(1, "transparent");
        ctx.fillStyle = mouseGrd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Particles + connections
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x += (dx / dist) * 1.5;
          p.y += (dy / dist) * 1.5;
        }

        const hue = (p.hue + frameRef.current * 0.1) % 360;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `hsla(${hue}, 60%, 65%, ${p.opacity})`
          : `hsla(${hue}, 50%, 45%, ${p.opacity * 0.7})`;
        ctx.fill();

        particlesRef.current.forEach((p2) => {
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 120 && d > 0) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = dark
              ? `hsla(${hue}, 40%, 60%, ${0.06 * (1 - d / 120)})`
              : `hsla(${hue}, 30%, 40%, ${0.05 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [dark, scrollY, mouse]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
