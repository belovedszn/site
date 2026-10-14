"use client";
import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { normalize } from "@/lib/normalize";

const ROAD_TOP = 0.2;
const Z_MIN = -280, Z_MAX = 110;

function Danfo({ dir, still }: { dir: 1 | -1; still: boolean }) {
  const { scene } = useGLTF("/danfo-3d.glb");
  const ref = useRef<THREE.Group>(null);
  const { group, size } = useMemo(() => normalize(scene, 9), [scene]);
  // Align the bus's long axis with the road (z) whatever the GLB's native orientation.
  const yaw = (size.x > size.z ? Math.PI / 2 : 0) + (dir === -1 ? Math.PI : 0);
  const z0 = useRef(dir === 1 ? -60 : -150);
  useFrame((_, dt) => {
    if (!still) { z0.current += dir * 22 * Math.min(dt, 0.05); if (z0.current > Z_MAX) z0.current = Z_MIN; if (z0.current < Z_MIN) z0.current = Z_MAX; }
    ref.current?.position.set(dir * 3.6, ROAD_TOP + size.y / 2, z0.current);
  });
  return (
    <group ref={ref}>
      <mesh rotation-x={-Math.PI / 2} position-y={-size.y / 2 + 0.02}>
        <planeGeometry args={[4.5, 10]} /><meshBasicMaterial color="#000" transparent opacity={0.25} />
      </mesh>
      <group rotation-y={yaw}><primitive object={group} /></group>
    </group>
  );
}

function Bridge() {
  const marks = useMemo(() => Array.from({ length: 40 }, (_, i) => Z_MAX - i * 10), []);
  const lamps = useMemo(() => Array.from({ length: 16 }, (_, i) => Z_MAX - i * 25), []);
  const legX = 10;
  return (
    <group>
      <mesh position={[0, -10, -80]} rotation-x={-Math.PI / 2}><planeGeometry args={[1200, 900]} /><meshStandardMaterial color="#5f8591" /></mesh>
      <mesh position={[0, 0, -85]}><boxGeometry args={[20, 0.4, 420]} /><meshStandardMaterial color="#2b2d2f" /></mesh>
      {marks.map((z) => <mesh key={z} position={[0, ROAD_TOP + 0.02, z]}><boxGeometry args={[0.25, 0.02, 4]} /><meshStandardMaterial color="#f3f3f3" /></mesh>)}
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 9.6, 0.9, -85]}><boxGeometry args={[0.5, 1.4, 420]} /><meshStandardMaterial color="#8b8f92" /></mesh>
          <mesh position={[s * legX, 30, -120]} rotation-z={-s * 0.04}><boxGeometry args={[2.2, 62, 2.2]} /><meshStandardMaterial color="#e9e6df" /></mesh>
        </group>
      ))}
      <mesh position={[0, 58, -120]}><boxGeometry args={[legX * 2 + 2, 2, 2.4]} /><meshStandardMaterial color="#e9e6df" /></mesh>
      {lamps.map((z) => [-1, 1].map((s) => (
        <group key={`${z}${s}`} position={[s * 9.6, 0, z]}>
          <mesh position={[0, 4, 0]}><cylinderGeometry args={[0.1, 0.12, 8]} /><meshStandardMaterial color="#555" /></mesh>
          <mesh position={[0, 8.1, 0]}><sphereGeometry args={[0.35]} /><meshStandardMaterial color="#fff6d6" emissive="#ffe9a8" emissiveIntensity={1.5} /></mesh>
        </group>
      )))}
    </group>
  );
}

export default function BridgeScene({ still = false }: { still?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 2, 135], fov: 40, near: 0.1, far: 800 }} dpr={[1, 1.75]} aria-hidden>
      <color attach="background" args={["#9bb5c4"]} />
      <fog attach="fog" args={["#c9d6dd", 90, 520]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[-30, 80, 50]} intensity={1.6} />
      <Bridge />
      <Suspense fallback={null}><Danfo dir={1} still={still} /><Danfo dir={-1} still={still} /></Suspense>
    </Canvas>
  );
}
useGLTF.preload("/danfo-3d.glb");
