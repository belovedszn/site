"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BridgeSceneBoundary } from "./BridgeSceneBoundary";
import { PrimaryButton, SecondaryButton } from "./ui";

const BridgeScene = dynamic(() => import("./BridgeScene"), { ssr: false });
const VIDEO_ID = process.env.NEXT_PUBLIC_VIDEO_ID; // set to your YouTube video id
const NAV = [["Subscriptions", "#subscriptions"], ["Accounts", "#accounts"], ["Docs", "#developers"], ["Pricing", "#pricing"]];

function webglSupported() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [still, setStill] = useState(false);
  const [video, setVideo] = useState(false);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isStill = new URLSearchParams(location.search).get("still") === "1";
    setStill(reduce || isStill);
    setWebgl(webglSupported());
    if (reduce || isStill) return;
    const ctx = gsap.context(() => {
      gsap.from(".intro", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.15 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!video) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setVideo(false);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [video]);

  const fallback = <img src="/lagos-bridge.png" alt="" aria-hidden className="h-full w-full object-cover" />;

  return (
    <section ref={root} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#9bb5c4] text-white">
      <div className="absolute inset-0 -z-10" aria-hidden>
        {webgl ? <BridgeSceneBoundary fallback={fallback}><BridgeScene still={still} /></BridgeSceneBoundary> : fallback}
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-transparent to-black/40" />

      <header className="intro relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-bold">
          <img src="/plinth-logo.png" alt="" className="h-7 w-7 object-contain" />Plinth
        </a>
        <nav aria-label="Primary" className="hidden gap-8 text-sm font-medium md:flex">
          {NAV.map(([l, h]) => <a key={l} href={h} className="hover:text-jade-100">{l}</a>)}
        </nav>
        <a href="#developers" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-jade-100">Start building</a>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-10">
        <h1 className="intro font-display font-bold uppercase leading-[0.86] tracking-tight text-[clamp(3rem,11vw,10rem)]">
          <span className="block text-left">The base</span>
          <span className="flex flex-col md:flex-row md:justify-between"><span>Your</span><span>Billing</span></span>
          <span className="block text-right">Stands on.</span>
        </h1>
        <p className="intro mt-8 max-w-md text-lg md:ml-auto md:text-right">
          Recurring billing &amp; reconciliation, built for how Nigeria <em className="not-italic underline decoration-jade-400 underline-offset-4">actually</em> pays.
        </p>
        <div className="intro mt-6 flex flex-wrap gap-3 md:justify-end">
          <PrimaryButton href="#developers">Schedule a demo</PrimaryButton>
          <SecondaryButton onClick={() => setVideo(true)}>Watch a video</SecondaryButton>
        </div>
      </div>

      {video && (
        <div role="dialog" aria-modal="true" aria-label="Plinth video" className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-5" onClick={() => setVideo(false)}>
          <div className="relative aspect-video w-full max-w-4xl bg-black" onClick={(e) => e.stopPropagation()}>
            {VIDEO_ID
              ? <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1`} title="Plinth video" allow="autoplay; encrypted-media" allowFullScreen />
              : <p className="grid h-full place-items-center p-6 text-center">Set NEXT_PUBLIC_VIDEO_ID to show your video.</p>}
            <button autoFocus onClick={() => setVideo(false)} aria-label="Close video" className="absolute -top-10 right-0 text-2xl">×</button>
          </div>
        </div>
      )}
    </section>
  );
}
