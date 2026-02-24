"use client";

// ─── NO physics engine — pure useFrame choreography ──────────────────────────
// Each object is a hand-animated group: position/rotation driven by sine waves
// and time. No Rapier, no colliders, no instability on load.

import { useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text, Environment } from "@react-three/drei";
import * as THREE from "three";
import { SANDBOX_ITEMS, type SandboxItem } from "./config";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Lerp emissive intensity across every non-black emissive material in a group */
function lerpEmissive(
  group: THREE.Group,
  target: number,
  delta: number,
  cur: { v: number },
) {
  cur.v = THREE.MathUtils.lerp(cur.v, target, delta * 7);
  group.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mat = (obj as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (mat?.emissive && mat.emissive.r + mat.emissive.g + mat.emissive.b > 0.02) {
        mat.emissiveIntensity = cur.v;
      }
    }
  });
}

/** Transparent bounding mesh — pointer events only, invisible to the eye */
function HitBox({
  w, h, d,
  onEnter, onLeave, onClick,
}: {
  w: number; h: number; d: number;
  onEnter: () => void;
  onLeave: () => void;
  onClick: (e: { stopPropagation: () => void }) => void;
}) {
  return (
    <mesh onPointerEnter={onEnter} onPointerLeave={onLeave} onClick={onClick}>
      <boxGeometry args={[w, h, d]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

/** Billboard label that always faces the camera */
function Label({
  label, sublabel, dark, y = 1.1,
}: {
  label: string; sublabel: string; dark: boolean; y?: number;
}) {
  const tc = dark ? "#ffffff" : "#0a0a0a";
  const sc = dark ? "#d0d0d0" : "#444444";
  const oc = dark ? "#000000" : "#ffffff";
  return (
    <Billboard>
      <Text
        position={[0, y, 0]}
        fontSize={0.22}
        fontWeight={700}
        color={tc}
        outlineWidth={0.028}
        outlineColor={oc}
        outlineOpacity={0.75}
        anchorX="center"
        anchorY="middle"
        renderOrder={5}
      >
        {label}
      </Text>
      <Text
        position={[0, y - 0.3, 0]}
        fontSize={0.14}
        color={sc}
        outlineWidth={0.022}
        outlineColor={oc}
        outlineOpacity={0.65}
        anchorX="center"
        anchorY="middle"
        renderOrder={5}
      >
        {sublabel}
      </Text>
    </Billboard>
  );
}

// ─── 1. JUST Intelligence — sphere floating at center ─────────────────────────
function JustSphere({
  item, onSelect, dark,
}: { item: SandboxItem; onSelect: (i: SandboxItem) => void; dark: boolean }) {
  const gRef       = useRef<THREE.Group>(null);
  const isHovered  = useRef(false);
  const scaleV     = useRef(1);
  const emissiveV  = useRef({ v: 0 });

  useFrame(({ clock }, delta) => {
    if (!gRef.current) return;
    const t = clock.elapsedTime;
    gRef.current.position.y = 0.3 + Math.sin(t * 0.72) * 0.24;
    gRef.current.rotation.y += delta * 0.28;
    scaleV.current = THREE.MathUtils.lerp(scaleV.current, isHovered.current ? 1.14 : 1, delta * 8);
    gRef.current.scale.setScalar(scaleV.current);
    lerpEmissive(gRef.current, isHovered.current ? 0.22 : 0, delta, emissiveV.current);
  });

  const onEnter = useCallback(() => { isHovered.current = true;  document.body.style.cursor = "pointer"; }, []);
  const onLeave = useCallback(() => { isHovered.current = false; document.body.style.cursor = "auto"; }, []);
  const onClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation(); onSelect(item);
  }, [item, onSelect]);

  return (
    <group ref={gRef} position={[0, 0.3, 0]}>
      <HitBox w={1.7} h={1.7} d={1.7} onEnter={onEnter} onLeave={onLeave} onClick={onClick} />
      <mesh castShadow>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshStandardMaterial
          color={item.color} roughness={0.55} metalness={0.08}
          emissive={item.color} emissiveIntensity={0}
        />
      </mesh>
      <Label label={item.label} sublabel={item.sublabel} dark={dark} y={1.05} />
    </group>
  );
}

// ─── 2. IATA — aircraft orbiting the sphere like a satellite ─────────────────
// The aircraft group position is driven by an ellipse equation every frame.
// group.rotation.z is set to the tangent angle (atan2 of velocity) so the
// nose always points in the direction of travel.
// A separate labelRef group tracks position WITHOUT rotation — so the label
// stays upright regardless of the aircraft's bank angle.
function IataAircraft({
  item, onSelect, dark,
}: { item: SandboxItem; onSelect: (i: SandboxItem) => void; dark: boolean }) {
  const gRef       = useRef<THREE.Group>(null);
  const labelRef   = useRef<THREE.Group>(null);
  const isHovered  = useRef(false);
  const scaleV     = useRef(1);
  const emissiveV  = useRef({ v: 0 });
  const c = item.color;

  // Orbit parameters
  const SPEED = 0.52;   // rad / s  → ~12 s per orbit
  const RX    = 3.8;    // horizontal semi-axis
  const RY    = 2.0;    // vertical semi-axis
  const CX    = 0;      // orbit center X
  const CY    = 0.3;    // orbit center Y

  useFrame(({ clock }, delta) => {
    const t     = clock.elapsedTime;
    const angle = t * SPEED;
    const x = CX + RX * Math.cos(angle);
    const y = CY + RY * Math.sin(angle);
    // Velocity direction → heading angle for nose alignment
    const vx = -RX * Math.sin(angle) * SPEED;
    const vy =  RY * Math.cos(angle) * SPEED;
    const heading = Math.atan2(vy, vx);

    if (gRef.current) {
      gRef.current.position.set(x, y, 0);
      gRef.current.rotation.z = heading;
      scaleV.current = THREE.MathUtils.lerp(scaleV.current, isHovered.current ? 1.14 : 1, delta * 8);
      gRef.current.scale.setScalar(scaleV.current);
      lerpEmissive(gRef.current, isHovered.current ? 0.22 : 0, delta, emissiveV.current);
    }
    // Label tracks position in world space, no rotation inherited
    if (labelRef.current) {
      labelRef.current.position.set(x, y + 1.1, 0);
    }
  });

  const onEnter = useCallback(() => { isHovered.current = true;  document.body.style.cursor = "pointer"; }, []);
  const onLeave = useCallback(() => { isHovered.current = false; document.body.style.cursor = "auto"; }, []);
  const onClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation(); onSelect(item);
  }, [item, onSelect]);

  return (
    <>
      {/* Aircraft group — rotates for heading */}
      <group ref={gRef} position={[CX + RX, CY, 0]}>
        <HitBox w={2.9} h={1.1} d={1.5} onEnter={onEnter} onLeave={onLeave} onClick={onClick} />
        {/* Fuselage */}
        <mesh castShadow>
          <boxGeometry args={[2.4, 0.2, 0.2]} />
          <meshStandardMaterial color={c} roughness={0.5} metalness={0.22} emissive={c} emissiveIntensity={0} />
        </mesh>
        {/* Nose taper */}
        <mesh castShadow position={[1.18, 0, 0]}>
          <boxGeometry args={[0.22, 0.13, 0.13]} />
          <meshStandardMaterial color={c} roughness={0.5} metalness={0.22} emissive={c} emissiveIntensity={0} />
        </mesh>
        {/* Wings — swept back, spread in Z for depth */}
        <mesh castShadow position={[0.08, -0.02, 0]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.8, 0.045, 1.15]} />
          <meshStandardMaterial color={c} roughness={0.48} metalness={0.25} emissive={c} emissiveIntensity={0} />
        </mesh>
        {/* Vertical tail fin */}
        <mesh castShadow position={[-1.0, 0.22, 0]}>
          <boxGeometry args={[0.44, 0.42, 0.042]} />
          <meshStandardMaterial color={c} roughness={0.52} metalness={0.18} emissive={c} emissiveIntensity={0} />
        </mesh>
        {/* Horizontal stabilizer */}
        <mesh castShadow position={[-1.0, 0, 0]}>
          <boxGeometry args={[0.38, 0.038, 0.52]} />
          <meshStandardMaterial color={c} roughness={0.52} metalness={0.18} emissive={c} emissiveIntensity={0} />
        </mesh>
      </group>

      {/* Label anchor — world space, never rotates */}
      <group ref={labelRef} position={[CX + RX, CY + 1.1, 0]}>
        <Label label={item.label} sublabel={item.sublabel} dark={dark} y={0} />
      </group>
    </>
  );
}

// ─── 3. StoryCorps — phone floating top-right ─────────────────────────────────
function StorycorpsPhone({
  item, onSelect, dark,
}: { item: SandboxItem; onSelect: (i: SandboxItem) => void; dark: boolean }) {
  const gRef      = useRef<THREE.Group>(null);
  const isHovered = useRef(false);
  const scaleV    = useRef(1);
  const emissiveV = useRef({ v: 0 });
  const c = item.color;

  useFrame(({ clock }, delta) => {
    if (!gRef.current) return;
    const t = clock.elapsedTime;
    gRef.current.position.x = 4.1 + Math.sin(t * 0.44 + 0.9) * 0.11;
    gRef.current.position.y = 2.7 + Math.sin(t * 0.81 + 1.2) * 0.2;
    gRef.current.rotation.y += delta * 0.2;
    gRef.current.rotation.z = Math.sin(t * 0.38) * 0.06;
    scaleV.current = THREE.MathUtils.lerp(scaleV.current, isHovered.current ? 1.14 : 1, delta * 8);
    gRef.current.scale.setScalar(scaleV.current);
    lerpEmissive(gRef.current, isHovered.current ? 0.22 : 0, delta, emissiveV.current);
  });

  const onEnter = useCallback(() => { isHovered.current = true;  document.body.style.cursor = "pointer"; }, []);
  const onLeave = useCallback(() => { isHovered.current = false; document.body.style.cursor = "auto"; }, []);
  const onClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation(); onSelect(item);
  }, [item, onSelect]);

  return (
    <group ref={gRef} position={[4.1, 2.7, 0]}>
      <HitBox w={0.95} h={1.75} d={0.4} onEnter={onEnter} onLeave={onLeave} onClick={onClick} />
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[0.72, 1.48, 0.09]} />
        <meshStandardMaterial color={c} roughness={0.52} metalness={0.1} emissive={c} emissiveIntensity={0} />
      </mesh>
      {/* Screen glass */}
      <mesh position={[0, 0.04, 0.051]}>
        <boxGeometry args={[0.6, 1.15, 0.01]} />
        <meshStandardMaterial color="#050510" roughness={0.04} metalness={0.55} emissive="#000000" emissiveIntensity={0} />
      </mesh>
      {/* Home indicator */}
      <mesh position={[0, -0.6, 0.053]}>
        <boxGeometry args={[0.22, 0.032, 0.005]} />
        <meshStandardMaterial color="#e0d8e4" roughness={0.35} metalness={0.1} emissive="#000000" emissiveIntensity={0} />
      </mesh>
      {/* Front camera */}
      <mesh position={[0, 0.62, 0.053]}>
        <boxGeometry args={[0.11, 0.038, 0.005]} />
        <meshStandardMaterial color="#0a0a18" roughness={0.2} metalness={0.3} emissive="#000000" emissiveIntensity={0} />
      </mesh>
      <Label label={item.label} sublabel={item.sublabel} dark={dark} y={1.08} />
    </group>
  );
}

// ─── 4. Netflix — TV floating at the bottom ───────────────────────────────────
function NetflixTV({
  item, onSelect, dark,
}: { item: SandboxItem; onSelect: (i: SandboxItem) => void; dark: boolean }) {
  const gRef      = useRef<THREE.Group>(null);
  const isHovered = useRef(false);
  const scaleV    = useRef(1);
  const emissiveV = useRef({ v: 0 });
  const c = item.color;

  useFrame(({ clock }, delta) => {
    if (!gRef.current) return;
    const t = clock.elapsedTime;
    gRef.current.position.x = Math.sin(t * 0.37 + 0.5) * 0.18;
    gRef.current.position.y = -3.0 + Math.sin(t * 0.64 + 2.1) * 0.18;
    gRef.current.rotation.y += delta * 0.14;
    scaleV.current = THREE.MathUtils.lerp(scaleV.current, isHovered.current ? 1.14 : 1, delta * 8);
    gRef.current.scale.setScalar(scaleV.current);
    lerpEmissive(gRef.current, isHovered.current ? 0.22 : 0, delta, emissiveV.current);
  });

  const onEnter = useCallback(() => { isHovered.current = true;  document.body.style.cursor = "pointer"; }, []);
  const onLeave = useCallback(() => { isHovered.current = false; document.body.style.cursor = "auto"; }, []);
  const onClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation(); onSelect(item);
  }, [item, onSelect]);

  return (
    <group ref={gRef} position={[0, -3.0, 0]}>
      <HitBox w={1.95} h={1.75} d={0.5} onEnter={onEnter} onLeave={onLeave} onClick={onClick} />
      {/* Bezel */}
      <mesh castShadow>
        <boxGeometry args={[1.72, 1.15, 0.11]} />
        <meshStandardMaterial color={c} roughness={0.42} metalness={0.18} emissive={c} emissiveIntensity={0} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.03, 0.062]}>
        <boxGeometry args={[1.5, 0.93, 0.01]} />
        <meshStandardMaterial color="#050510" roughness={0.04} metalness={0.7} emissive="#000000" emissiveIntensity={0} />
      </mesh>
      {/* Stand neck */}
      <mesh castShadow position={[0, -0.74, 0]}>
        <boxGeometry args={[0.11, 0.34, 0.09]} />
        <meshStandardMaterial color={c} roughness={0.5} metalness={0.12} emissive={c} emissiveIntensity={0} />
      </mesh>
      {/* Base */}
      <mesh castShadow position={[0, -0.93, 0]}>
        <boxGeometry args={[0.68, 0.07, 0.26]} />
        <meshStandardMaterial color={c} roughness={0.5} metalness={0.12} emissive={c} emissiveIntensity={0} />
      </mesh>
      <Label label={item.label} sublabel={item.sublabel} dark={dark} y={0.84} />
    </group>
  );
}

// ─── 5. Component System — atomic ring system, top-left ───────────────────────
// Six small module cubes orbit a central nucleus on a torus track.
// The outer group bobs and slow-rotates; the inner orbit ring spins independently.
// A second tilted ring adds depth — evoking an interconnected design system.
function ComponentSystem({
  item, onSelect, dark,
}: { item: SandboxItem; onSelect: (i: SandboxItem) => void; dark: boolean }) {
  const gRef      = useRef<THREE.Group>(null);
  const orbitRef  = useRef<THREE.Group>(null);
  const isHovered = useRef(false);
  const scaleV    = useRef(1);
  const emissiveV = useRef({ v: 0 });
  const c = item.color;
  const R = 0.88; // orbit radius

  useFrame(({ clock }, delta) => {
    if (!gRef.current || !orbitRef.current) return;
    const t = clock.elapsedTime;
    // Outer group floats and tilts gently
    gRef.current.position.y = 2.6 + Math.sin(t * 0.66 + 0.5) * 0.18;
    gRef.current.rotation.y += delta * 0.18;
    gRef.current.rotation.x = Math.sin(t * 0.28) * 0.08;
    // Inner ring spins on two axes — gives gyroscope feel
    orbitRef.current.rotation.z += delta * 0.44;
    orbitRef.current.rotation.x += delta * 0.21;
    scaleV.current = THREE.MathUtils.lerp(scaleV.current, isHovered.current ? 1.14 : 1, delta * 8);
    gRef.current.scale.setScalar(scaleV.current);
    lerpEmissive(gRef.current, isHovered.current ? 0.22 : 0, delta, emissiveV.current);
  });

  const onEnter = useCallback(() => { isHovered.current = true;  document.body.style.cursor = "pointer"; }, []);
  const onLeave = useCallback(() => { isHovered.current = false; document.body.style.cursor = "auto"; }, []);
  const onClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation(); onSelect(item);
  }, [item, onSelect]);

  const cubes = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2;
    return { x: Math.cos(a) * R, y: Math.sin(a) * R };
  });

  return (
    <group ref={gRef} position={[-4.2, 2.6, 0]}>
      <HitBox w={2.3} h={2.3} d={2.3} onEnter={onEnter} onLeave={onLeave} onClick={onClick} />

      {/* Nucleus sphere */}
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={c} roughness={0.45} metalness={0.2} emissive={c} emissiveIntensity={0.12} />
      </mesh>

      {/* Primary orbit ring + 6 module cubes */}
      <group ref={orbitRef}>
        <mesh>
          <torusGeometry args={[R, 0.022, 8, 64]} />
          <meshStandardMaterial color={c} roughness={0.4} metalness={0.4} transparent opacity={0.5} emissive={c} emissiveIntensity={0} />
        </mesh>
        {cubes.map(({ x, y }, i) => (
          <mesh key={i} position={[x, y, 0]}>
            <boxGeometry args={[0.27, 0.27, 0.27]} />
            <meshStandardMaterial color={c} roughness={0.6} metalness={0.1} emissive={c} emissiveIntensity={0} />
          </mesh>
        ))}
      </group>

      {/* Second ring — tilted 72° for gyroscope depth */}
      <group rotation={[Math.PI * 0.4, 0, 0]}>
        <mesh>
          <torusGeometry args={[R * 0.72, 0.016, 8, 64]} />
          <meshStandardMaterial color={c} roughness={0.4} metalness={0.4} transparent opacity={0.3} emissive={c} emissiveIntensity={0} />
        </mesh>
      </group>

      <Label label={item.label} sublabel={item.sublabel} dark={dark} y={1.35} />
    </group>
  );
}

// ─── Main canvas — no Rapier, no Physics wrapper ──────────────────────────────
interface Props {
  onSelect: (item: SandboxItem) => void;
  dark: boolean;
}

export default function SandboxCanvas({ onSelect, dark }: Props) {
  const byId = (id: string) => SANDBOX_ITEMS.find((i) => i.id === id)!;

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 45, position: [0, 0, 14], near: 0.1, far: 100 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* ── Lighting ── */}
      <ambientLight intensity={0.55} color="#f0f4ff" />
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.5}
        color="#fff6e8"
      />
      <pointLight position={[-8, 5, 8]} intensity={0.55} color="#a8c8ff" />
      <pointLight position={[2, -6, -5]} intensity={0.4} color="#ffccaa" />
      <Environment preset="city" environmentIntensity={0.25} />

      {/* ── Floating objects ── */}
      <JustSphere
        item={byId("just-intelligence")}
        onSelect={onSelect}
        dark={dark}
      />
      <IataAircraft
        item={byId("iata")}
        onSelect={onSelect}
        dark={dark}
      />
      <StorycorpsPhone
        item={byId("storycorps")}
        onSelect={onSelect}
        dark={dark}
      />
      <NetflixTV
        item={byId("netflix-disney")}
        onSelect={onSelect}
        dark={dark}
      />
      <ComponentSystem
        item={byId("just-wordpress")}
        onSelect={onSelect}
        dark={dark}
      />
    </Canvas>
  );
}
