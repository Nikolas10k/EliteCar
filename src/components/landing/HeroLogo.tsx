"use client";

import { useEffect, useRef } from "react";
import { EliteLogo } from "@/components/brand/EliteLogo";

/** Logo flutuante com inclinação 3D suave acompanhando o cursor. */
export function HeroLogo() {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const loop = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      el.style.transform = `rotateX(${current.y * -10}deg) rotateY(${current.x * 14}deg)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="[perspective:1000px]">
      <div ref={tiltRef} className="will-change-transform [transform-style:preserve-3d]">
        <div className="animate-float">
          <EliteLogo id="hero-logo" animated className="animate-glow w-[min(560px,82vw)]" />
        </div>
      </div>
    </div>
  );
}
