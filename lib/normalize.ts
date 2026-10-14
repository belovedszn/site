import * as THREE from "three";
/** Clone a GLB scene, clone its materials, centre it and scale its longest side to `target`. */
export function normalize(src: THREE.Object3D, target: number) {
  const c = src.clone(true);
  c.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) m.material = Array.isArray(m.material) ? m.material.map((x) => x.clone()) : m.material.clone();
  });
  const box = new THREE.Box3().setFromObject(c);
  const size = box.getSize(new THREE.Vector3());
  c.position.sub(box.getCenter(new THREE.Vector3()));
  const k = target / Math.max(size.x, size.y, size.z);
  const group = new THREE.Group();
  group.add(c);
  group.scale.setScalar(k);
  return { group, size: size.multiplyScalar(k) };
}
