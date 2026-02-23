"use client";

import { useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { Physics, RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PhysicsObject from "./PhysicsObject";
import { PHYSICS, SANDBOX_ITEMS, type SandboxItem } from "./config";

// ─── Invisible floor + walls — objects land and bounce off these ──────────────
// type="fixed" → infinite mass, never moves
// colliders="cuboid" → single flat box collider, fast to compute
function FloorBody() {
  return (
    <>
      {/* Floor */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, -4.6, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[40, 0.2, 10]} />
          <meshStandardMaterial visible={false} />
        </mesh>
      </RigidBody>
      {/* Ceiling — objects bounce back down if thrown hard upward */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, 7, 0]}>
        <mesh><boxGeometry args={[40, 0.2, 10]} /><meshStandardMaterial visible={false} /></mesh>
      </RigidBody>
      {/* Left wall */}
      <RigidBody type="fixed" colliders="cuboid" position={[-7, 0, 0]}>
        <mesh><boxGeometry args={[0.2, 24, 10]} /><meshStandardMaterial visible={false} /></mesh>
      </RigidBody>
      {/* Right wall */}
      <RigidBody type="fixed" colliders="cuboid" position={[7, 0, 0]}>
        <mesh><boxGeometry args={[0.2, 24, 10]} /><meshStandardMaterial visible={false} /></mesh>
      </RigidBody>
    </>
  );
}

// ─── Bullet-time controller — lives inside <Physics> so it can reach the world
function TimeScaleController({ scale }: { scale: number }) {
  const { world } = useRapier();
  const scaleRef = useRef(scale);

  // Keep ref in sync without triggering re-renders in the physics loop
  scaleRef.current = scale;

  useFrame(() => {
    // Rapier world.timestep is the fixed-step size in seconds.
    // Multiplying by timeScale creates smooth slow-motion or speed-up.
    // Clamp to avoid instability at extreme values.
    world.timestep = THREE.MathUtils.clamp(
      PHYSICS.baseTick * scaleRef.current,
      0.001,   // minimum: ~1/1000 s (very slow motion)
      0.05     // maximum: ~1/20 s (safe upper bound)
    );
  });

  return null;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  onSelect: (item: SandboxItem) => void;
  dark: boolean;
}

// ─── Main canvas ──────────────────────────────────────────────────────────────
export default function SandboxCanvas({ onSelect, dark }: Props) {
  const [timeScale, setTimeScale] = useState<number>(PHYSICS.timeScaleNormal);

  // Track how many objects are currently hovered
  // (needed so un-hovering one doesn't cancel another's slow-mo)
  const hoverCount = useRef(0);

  const handleHoverChange = useCallback((active: boolean) => {
    hoverCount.current += active ? 1 : -1;
    hoverCount.current = Math.max(0, hoverCount.current);
    setTimeScale(hoverCount.current > 0 ? PHYSICS.timeScaleSlow : PHYSICS.timeScaleNormal);
  }, []);

  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{
        // Perspective camera — depth makes clay objects feel tactile
        fov: 45,
        position: [0, 0, 14],
        near: 0.1,
        far: 100,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* ── LIGHTING — Apple-esque: warm key + cool fill + rim ── */}

      {/* Soft base fill — tweak intensity for overall brightness */}
      <ambientLight intensity={0.55} color="#f0f4ff" />

      {/* Key light: warm, from top-right, casts shadows */}
      <directionalLight
        castShadow
        position={[6, 10, 6]}
        intensity={1.5}
        color="#fff6e8"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.001}
      />

      {/* Fill light: cool blue from the left — lifts shadow side */}
      <pointLight position={[-8, 5, 8]} intensity={0.55} color="#a8c8ff" />

      {/* Rim/back light: warm accent from below-behind */}
      <pointLight position={[2, -6, -5]} intensity={0.4} color="#ffccaa" />

      {/* HDRI for subtle material reflections on the clay surfaces */}
      {/* Change "city" to "sunset" / "dawn" / "forest" for different moods */}
      <Environment preset="city" environmentIntensity={0.25} />

      {/* Subtle soft shadow on the floor plane */}
      <ContactShadows
        position={[0, -4.5, 0]}
        opacity={0.4}
        scale={22}
        blur={3}
        far={9}
        color="#1a0a3a"
      />

      {/* ── PHYSICS WORLD ── */}
      <Physics
        gravity={PHYSICS.gravity}
        /* timeStep is now controlled per-frame by TimeScaleController below */
        timeStep={PHYSICS.baseTick}
      >
        {/* Bullet-time controller — adjusts world.timestep every frame */}
        <TimeScaleController scale={timeScale} />

        {/* Invisible floor collider */}
        {/* type="fixed" → infinite mass, never moves */}
        {/* colliders="cuboid" → simple flat box */}
        <FloorBody />

        {/* Project objects */}
        {SANDBOX_ITEMS.map((item) => (
          <PhysicsObject
            key={item.id}
            item={item}
            onHoverChange={handleHoverChange}
            onSelect={onSelect}
            dark={dark}
          />
        ))}
      </Physics>
    </Canvas>
  );
}
