import { useEffect, useRef } from "react";

/**
 * Animated abstract gold lines — a flowing wireframe ribbon
 * inspired by reference. Lightweight 2D canvas (no WebGL deps).
 */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const LINES = 90;
    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      // soft radial glow
      const grad = ctx.createRadialGradient(w * 0.3, h * 0.5, 0, w * 0.3, h * 0.5, w * 0.6);
      grad.addColorStop(0, "rgba(212, 168, 83, 0.10)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.32;
      const cy = h * 0.52;
      const radius = Math.min(w, h) * 0.42;

      for (let i = 0; i < LINES; i++) {
        const p = i / LINES;
        const angle = p * Math.PI * 2 + t * 0.05;
        const wobble = Math.sin(t * 0.6 + p * Math.PI * 4) * 0.25;
        const r1 = radius * (0.55 + wobble * 0.2);
        const r2 = radius * (1.0 + Math.cos(t * 0.4 + p * Math.PI * 6) * 0.15);

        const x1 = cx + Math.cos(angle) * r1;
        const y1 = cy + Math.sin(angle) * r1 * 0.85;
        const x2 = cx + Math.cos(angle + Math.PI * 0.55 + wobble) * r2;
        const y2 = cy + Math.sin(angle + Math.PI * 0.55 + wobble) * r2 * 0.85;

        const alpha = 0.06 + 0.18 * Math.abs(Math.sin(p * Math.PI + t * 0.3));
        ctx.strokeStyle = `rgba(212, 168, 83, ${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
