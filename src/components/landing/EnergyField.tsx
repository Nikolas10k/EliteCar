"use client";

import { useEffect, useRef } from "react";

type Filament = { angle: number; length: number; speed: number; phase: number; bend: number; width: number };
type Spark = { angle: number; dist: number; speed: number; size: number; life: number };

/**
 * Núcleo de energia vermelho com filamentos e faíscas, desenhado em canvas.
 * Pausa fora da tela e renderiza um quadro estático com prefers-reduced-motion.
 */
export function EnergyField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const filaments: Filament[] = Array.from({ length: 110 }, () => ({
      angle: Math.random() * Math.PI * 2,
      length: 0.25 + Math.random() * 0.75,
      speed: 0.2 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      bend: (Math.random() - 0.5) * 0.6,
      width: 0.4 + Math.random() * 1.1,
    }));

    const newSpark = (): Spark => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 40,
      speed: 0.3 + Math.random() * 1.4,
      size: 0.6 + Math.random() * 1.8,
      life: 0,
    });
    const sparks: Spark[] = Array.from({ length: 160 }, () => {
      const s = newSpark();
      s.dist = Math.random() * 500;
      s.life = Math.random();
      return s;
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      const time = t / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      const cx = width / 2 + pointer.x * 30;
      const cy = height / 2 + pointer.y * 20;
      const radius = Math.min(width, height) * 0.48;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      // Halo amplo
      const pulse = 1 + Math.sin(time * 1.6) * 0.06;
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.1 * pulse);
      halo.addColorStop(0, "rgba(255,70,50,0.38)");
      halo.addColorStop(0.25, "rgba(225,6,0,0.18)");
      halo.addColorStop(0.6, "rgba(140,4,0,0.06)");
      halo.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);

      // Filamentos de energia
      for (const f of filaments) {
        const flicker = 0.55 + 0.45 * Math.sin(time * f.speed * 2 + f.phase);
        const len = radius * f.length * (0.75 + 0.25 * Math.sin(time * f.speed + f.phase));
        const ang = f.angle + Math.sin(time * 0.3 + f.phase) * 0.05;
        const ex = cx + Math.cos(ang) * len;
        const ey = cy + Math.sin(ang) * len;
        const mx = cx + Math.cos(ang + f.bend) * len * 0.55;
        const my = cy + Math.sin(ang + f.bend) * len * 0.55;

        const grad = ctx.createLinearGradient(cx, cy, ex, ey);
        grad.addColorStop(0, `rgba(255,220,210,${0.5 * flicker})`);
        grad.addColorStop(0.3, `rgba(255,50,35,${0.35 * flicker})`);
        grad.addColorStop(1, "rgba(225,6,0,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = f.width;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(mx, my, ex, ey);
        ctx.stroke();
      }

      // Faíscas que escapam do núcleo
      for (const s of sparks) {
        if (!reduced) {
          s.dist += s.speed;
          s.life += 0.004 * s.speed;
        }
        if (s.life >= 1 || s.dist > radius * 1.3) Object.assign(s, newSpark());
        const alpha = Math.sin(s.life * Math.PI) * 0.9;
        const x = cx + Math.cos(s.angle) * s.dist;
        const y = cy + Math.sin(s.angle) * s.dist;
        ctx.fillStyle = `rgba(255,${90 + s.size * 40},${70 + s.size * 30},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Núcleo incandescente
      const coreR = radius * 0.16 * (1 + Math.sin(time * 3.1) * 0.08);
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      core.addColorStop(0, "rgba(255,255,255,0.95)");
      core.addColorStop(0.25, "rgba(255,190,175,0.7)");
      core.addColorStop(0.6, "rgba(255,40,25,0.35)");
      core.addColorStop(1, "rgba(225,6,0,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    };

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      if (visible && !running) {
        running = true;
        raf = requestAnimationFrame(draw);
      } else if (!visible) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });

    resize();
    raf = requestAnimationFrame(draw);
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
