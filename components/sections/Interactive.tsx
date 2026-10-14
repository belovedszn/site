"use client";
import { useEffect, useRef, useState } from "react";

export function FaqList({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map(([q, a], i) => {
        const o = open === i;
        return (
          <div key={q}>
            <h3><button aria-expanded={o} aria-controls={`faq-${i}`} onClick={() => setOpen(o ? null : i)}
              className="flex w-full items-center justify-between py-5 text-left font-display text-xl font-semibold">
              {q}<span aria-hidden className={`transition-transform ${o ? "rotate-45" : ""}`}>+</span></button></h3>
            <div id={`faq-${i}`} role="region" className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${o ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <p className="overflow-hidden text-mid"><span className="block pb-5">{a}</span></p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const CODE = `GET /v1/customers/cus_123/entitlements

{
  "customer": "cus_123",
  "plan": "growth",
  "active": true
}`;
export function CodePanel() {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(CODE); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* fail silently */ } };
  return (
    <div className="overflow-hidden rounded-2xl bg-ink-900 text-white shadow-xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <i className="h-3 w-3 rounded-full bg-red-400" /><i className="h-3 w-3 rounded-full bg-yellow-400" /><i className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-3 font-mono text-xs text-white/60">entitlements.http</span>
        <button onClick={copy} className="ml-auto rounded border border-white/20 px-2 py-1 font-mono text-xs hover:bg-white/10">{copied ? "Copied" : "Copy"}</button>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">{CODE}</pre>
      <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3 font-mono text-xs"><i className="h-2 w-2 rounded-full bg-jade" />200 OK <span className="text-white/40">(illustrative)</span></div>
    </div>
  );
}

const ROWS = [["Transfer ₦25,000 · A. Bello", "INV-1042"], ["Transfer ₦8,500 · Sunrise Ltd", "INV-1043"], ["Transfer ₦60,000 · K. Obi", "INV-1044"]];
export function ReconcileVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setStep(ROWS.length); return; }
    let t: ReturnType<typeof setInterval>;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      t = setInterval(() => setStep((s) => { if (s >= ROWS.length) { clearInterval(t); return s; } return s + 1; }), 900);
    }, { threshold: 0.3 });
    io.observe(ref.current!);
    return () => { io.disconnect(); clearInterval(t); };
  }, []);
  return (
    <div ref={ref} className="space-y-3 rounded-2xl border border-ink/10 bg-white p-5" aria-label="Reconciliation example">
      {ROWS.map(([pay, inv], i) => {
        const done = step > i;
        return (
          <div key={inv} className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors duration-500"
            style={{ borderColor: done ? "#0FA37F" : "#e5e5e5", background: done ? "#DCF1EA" : "#fff" }}>
            <span>{pay}</span><span className="font-mono text-xs">{done ? `✓ ${inv}` : "matching…"}</span>
          </div>
        );
      })}
    </div>
  );
}
