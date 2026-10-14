"use client";
import { Suspense, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { normalize } from "@/lib/normalize";

type V3 = [number, number, number];
type Cfg = { src: string; name: string; desc: string; base: V3; scale: number; rot0: V3; move: V3; rotDelta: number; aside: V3 };
// Art direction lives here, not in JSX. Descriptions are placeholders: verify before publishing.
export const MODELS: Cfg[] = [
  { src: "benin-bronze-2-3d", name: "Benin Bronze Mask", desc: "Cast Benin bronze", base: [-3.6, 1.2, 0], scale: 1, rot0: [0, 0.4, 0], move: [0, 0.3, 0], rotDelta: 2.2, aside: [-6, 3, 1] },
  { src: "benin-bronze-3-3d", name: "Benin Bronze Head", desc: "Cast Benin bronze", base: [-1.2, 1.5, -0.5], scale: 0.9, rot0: [0, -0.3, 0], move: [0, 0.5, 0], rotDelta: -2.6, aside: [-2, 6, 0] },
  { src: "igbo-ukwu-castings-3d", name: "Igbo-Ukwu Casting", desc: "Igbo-Ukwu cast bronze", base: [1.4, 1.3, 0], scale: 1, rot0: [0.1, 0.8, 0], move: [0, 0.2, 0], rotDelta: 3, aside: [2, 6, 1] },
  { src: "nok-terracottas-3d", name: "Nok Terracotta", desc: "Nok terracotta", base: [3.7, 1.1, 0], scale: 1, rot0: [0, -0.6, 0], move: [0, 0.4, 0], rotDelta: -2, aside: [6, 3, 0] },
  { src: "ife-bronze-head-3d", name: "Ife Bronze Head", desc: "Ife bronze head", base: [-3.7, -1.2, 0], scale: 1, rot0: [0, 0.5, 0], move: [0, -0.3, 0], rotDelta: 2, aside: [-6, -3, 1] },
  { src: "benin-bronze-4-3d", name: "Benin Leopard Mask", desc: "Cast Benin bronze", base: [-1.3, -1.4, 0.3], scale: 0.95, rot0: [0, -0.2, 0], move: [0, -0.5, 0], rotDelta: -2.4, aside: [-2, -6, 0] },
  { src: "benin-leopard-3d", name: "Benin Bronze Leopard", desc: "Cast Benin bronze leopard", base: [1.3, -1.3, 0.3], scale: 1, rot0: [0, 0.9, 0], move: [0, -0.2, 0], rotDelta: 2.8, aside: [2, -6, 1] },
  { src: "nok-terracottas-1-3d", name: "Nok Terracotta Head", desc: "Nok terracotta head", base: [3.6, -1.2, 0], scale: 0.9, rot0: [0, -0.9, 0], move: [0, -0.4, 0], rotDelta: -2.2, aside: [6, -3, 0] },
];
const clamp = (x: number) => Math.min(1, Math.max(0, x));
const ease = (t: number) => t * t * (3 - 2 * t);

function Piece({ cfg, progress }: { cfg: Cfg; progress: MutableRefObject<number> }) {
  const url = `/models/${cfg.src}.glb`;
  const { scene } = useGLTF(url);
  const { group } = useMemo(() => normalize(scene, 2.2), [scene]);
  const g = useRef<THREE.Group>(null);
  const rotY = useRef(cfg.rot0[1]);
  const hov = useRef(false);
  const drag = useRef<number | null>(null);
  const s = useRef(0);
  const [tip, setTip] = useState(false);
  useFrame((_, dt) => {
    const p = progress.current, o = g.current!;
    const fade = clamp((p - 0.16) / 0.14), part = ease(clamp((p - 0.42) / 0.26));
    o.position.set(cfg.base[0] + cfg.move[0] * p + cfg.aside[0] * part, cfg.base[1] + cfg.move[1] * p + cfg.aside[1] * part, cfg.base[2] + cfg.aside[2] * part);
    s.current += (cfg.scale * ease(fade) * (hov.current ? 1.08 : 1) - s.current) * Math.min(1, dt * 8);
    o.scale.setScalar(Math.max(s.current, 0.0001));
    if (hov.current && drag.current === null) rotY.current += dt * 0.6;
    o.rotation.set(cfg.rot0[0], rotY.current + cfg.rotDelta * part, cfg.rot0[2]);
    o.visible = fade > 0.01 && part < 0.995;
  });
  return (
    <group ref={g}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); hov.current = true; setTip(true); document.body.style.cursor = "grab"; }}
      onPointerOut={() => { hov.current = false; setTip(false); document.body.style.cursor = ""; }}
      onPointerDown={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); (e.target as Element).setPointerCapture?.(e.pointerId); drag.current = e.clientX; }}
      onPointerMove={(e: ThreeEvent<PointerEvent>) => { if (drag.current !== null) { rotY.current += (e.clientX - drag.current) * 0.01; drag.current = e.clientX; } }}
      onPointerUp={() => { drag.current = null; }}>
      <primitive object={group} />
      {tip && <Html center position={[0, 1.5, 0]} style={{ pointerEvents: "none" }}>
        <div className="whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-xs text-white shadow"><b>{cfg.name}</b><br />{cfg.desc}</div>
      </Html>}
    </group>
  );
}

export default function BronzeCanvas({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 32, near: 0.1, far: 100 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} color="#ffd9a0" position={[0, 2, 6]} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={2} color="#a8c8ff" position={[-6, 0, 2]} scale={[3, 6, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={2} color="#ffb070" position={[6, -3, 3]} scale={[4, 3, 1]} rotation-y={-Math.PI / 2} />
      </Environment>
      <Suspense fallback={null}>{MODELS.map((m) => <Piece key={m.src} cfg={m} progress={progress} />)}</Suspense>
      <ContactShadows position={[0, -3, 0]} opacity={0.35} scale={14} blur={2.5} far={4} />
    </Canvas>
  );
}
