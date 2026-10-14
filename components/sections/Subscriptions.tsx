"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { CardMedia } from "./CardMedia";
import { Eyebrow, Emph } from "../ui";
const BronzeCanvas = dynamic(() => import("./BronzeCanvas"), { ssr: false });

const PROBLEMS = [
  ["01", "Charges fail", "Cards decline. Customers churn without ever deciding to.", "/animations/card-fail.lottie"],
  ["02", "Reconciled by hand", "Transfers land in one account and get matched in a spreadsheet.", "/animations/reconciled-coding.riv"],
  ["03", "Slips away", "Revenue you earned quietly leaks out of the gaps.", "/animations/losing.riv"],
];
const clamp = (x: number) => Math.min(1, Math.max(0, x));
const mix = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

function Problems() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-3">
      <h2 className="font-display text-4xl font-semibold md:col-span-3 md:text-6xl">Recurring revenue shouldn&apos;t depend on <Emph>luck</Emph>.</h2>
      {PROBLEMS.map(([n, t, d, m]) => (
        <article key={n} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <CardMedia src={m} />
          <p className="mt-4 font-mono text-xs text-jade-400">{n}</p>
          <h3 className="font-display text-2xl font-semibold">{t}</h3>
          <p className="mt-1 text-white/70">{d}</p>
        </article>
      ))}
    </div>
  );
}
function Engine() {
  return (
    <div className="mx-auto max-w-4xl px-5 text-center">
      <Eyebrow>Subscriptions</Eyebrow>
      <h2 className="font-display text-4xl font-semibold leading-tight md:text-7xl">A billing engine built for <Emph>Nigeria</Emph>.</h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-mid">Plans, invoices, dunning, recovery and entitlements, running on rails your customers actually use.</p>
    </div>
  );
}

export default function Subscriptions() {
  const outer = useRef<HTMLElement>(null), stage = useRef<HTMLDivElement>(null);
  const prob = useRef<HTMLDivElement>(null), canvas = useRef<HTMLDivElement>(null), eng = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(min-width:768px) and (prefers-reduced-motion:no-preference)");
    const on = () => setDesktop(mq.matches);
    on(); mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (!desktop) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = outer.current!.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - innerHeight));
      progress.current = p;
      const bg = clamp((p - 0.44) / 0.2), out = clamp((p - 0.3) / 0.12), sub = clamp((p - 0.64) / 0.32);
      stage.current!.style.backgroundColor = `rgb(${mix(10, 250, bg)},${mix(10, 250, bg)},${mix(10, 250, bg)})`;
      prob.current!.style.opacity = String(1 - out);
      prob.current!.style.transform = `translateX(${-60 * (1 - clamp(p / 0.16))}px)`;
      canvas.current!.style.opacity = String(clamp((p - 0.16) / 0.14));
      eng.current!.style.opacity = String(sub);
      eng.current!.style.transform = `translateY(${(1 - sub) * 40}vh)`;
      eng.current!.style.pointerEvents = sub > 0.5 ? "auto" : "none";
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick(); addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [desktop]);

  if (!desktop) {
    return (
      <section id="subscriptions">
        <div className="bg-ink py-20 text-white"><Problems /></div>
        <div className="py-20"><Engine /></div>
      </section>
    );
  }
  return (
    <section id="subscriptions" ref={outer} className="relative h-[500vh]">
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden bg-ink text-white">
        <div ref={canvas} className="absolute inset-0 opacity-0" aria-hidden><BronzeCanvas progress={progress} /></div>
        <div ref={prob} className="pointer-events-none absolute inset-0 grid place-items-center"><Problems /></div>
        <div ref={eng} className="pointer-events-none absolute inset-0 grid place-items-center text-ink opacity-0"><Engine /></div>
      </div>
    </section>
  );
}
