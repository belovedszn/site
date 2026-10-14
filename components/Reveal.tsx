"use client";
import { useEffect, useRef, useState } from "react";
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  const t = `620ms cubic-bezier(0.22,0.72,0.2,1) ${delay}ms`;
  return (
    <div ref={ref} className={className}
      style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(18px)", transition: `opacity ${t}, transform ${t}` }}>
      {children}
    </div>
  );
}
