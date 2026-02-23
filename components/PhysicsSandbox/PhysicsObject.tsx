"use client";

import { useRef, useState, useCallback } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import {
  RigidBody,
  BallCollider,
  CuboidCollider,
  CapsuleCollider,
  CylinderCollider,
  type RapierRigidBody,
} from "@react-three/rapier";
import * as THREE from "three";
import { type SandboxItem, PHYSICS, type ObjectShape } from "./config";

// ─── Invisible bounding mesh — used for pointer events on all shapes ──────────
// transparent + depthWrite:false so it doesn't occlude the visual meshes,
// but IS included in raycasting (Three.js raycasts opacity=0 meshes).
function EventBounds({ shape }: { shape: ObjectShape }) {
  switch (shape) {
    case "sphere":     return <sphereGeometry args={[0.82, 8, 8]} />;
    case "roundedBox": return <boxGeometry args={[1.4, 1.4, 1.4]} />;
    case "capsule":    return <boxGeometry args={[1.1, 1.8, 1.1]} />;
    case "torus":      return <boxGeometry args={[1.8, 1.8, 0.65]} />;
    case "octahedron": return <boxGeometry args={[1.75, 1.75, 1.75]} />;
    case "tv":         return <boxGeometry args={[1.85, 1.65, 0.45]} />;
    case "aircraft":   return <boxGeometry args={[2.7, 0.95, 1.3]} />;
    case "phone":      return <boxGeometry args={[0.85, 1.65, 0.3]} />;
    case "code":       return <boxGeometry args={[1.6, 1.3, 0.3]} />;
    default:           return <boxGeometry args={[1.5, 1.5, 1.5]} />;
  }
}

// ─── Rapier collider per shape ────────────────────────────────────────────────
function ShapeCollider({ shape }: { shape: ObjectShape }) {
  switch (shape) {
    case "sphere":     return <BallCollider args={[0.72]} />;
    case "roundedBox": return <CuboidCollider args={[0.625, 0.625, 0.625]} />;
    case "capsule":    return <CapsuleCollider args={[0.375, 0.48]} />;
    case "torus":      return <CylinderCollider args={[0.28, 0.86]} />;
    case "octahedron": return <BallCollider args={[0.72]} />;
    // Compound shapes — approximate bounding cuboid
    case "tv":         return <CuboidCollider args={[0.85, 0.6, 0.07]} />;
    case "aircraft":   return <CuboidCollider args={[1.2, 0.12, 0.12]} />;
    case "phone":      return <CuboidCollider args={[0.36, 0.74, 0.05]} />;
    case "code":       return <CuboidCollider args={[0.725, 0.575, 0.055]} />;
    default:           return <BallCollider args={[0.70]} />;
  }
}

// ─── Visual meshes per shape ──────────────────────────────────────────────────
// Each compound shape is a group of meshes sharing the project accent color.
// Screen/glass insets use a fixed near-black color.
// emissive is set on each mesh; the useFrame traverse animates emissiveIntensity
// only on meshes whose emissive is non-black (skips screens, home bar, etc.).
function ShapeVisual({ shape, color }: { shape: ObjectShape; color: string }) {
  const c = color; // shorthand

  switch (shape) {

    // ── Sphere ──────────────────────────────────────────────────────────────
    case "sphere":
      return (
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.72, 32, 32]} />
          <meshStandardMaterial color={c} roughness={0.72} metalness={0.06} emissive={c} emissiveIntensity={0} />
        </mesh>
      );

    // ── Rounded Box ─────────────────────────────────────────────────────────
    case "roundedBox":
      return (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.25, 1.25, 1.25]} />
          <meshStandardMaterial color={c} roughness={0.78} metalness={0.04} emissive={c} emissiveIntensity={0} />
        </mesh>
      );

    // ── Capsule ─────────────────────────────────────────────────────────────
    case "capsule":
      return (
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.48, 0.75, 8, 24]} />
          <meshStandardMaterial color={c} roughness={0.78} metalness={0.04} emissive={c} emissiveIntensity={0} />
        </mesh>
      );

    // ── Torus ───────────────────────────────────────────────────────────────
    case "torus":
      return (
        <mesh castShadow receiveShadow>
          <torusGeometry args={[0.58, 0.28, 16, 48]} />
          <meshStandardMaterial color={c} roughness={0.78} metalness={0.04} emissive={c} emissiveIntensity={0} />
        </mesh>
      );

    // ── Octahedron ──────────────────────────────────────────────────────────
    case "octahedron":
      return (
        <mesh castShadow receiveShadow>
          <octahedronGeometry args={[0.82, 0]} />
          <meshStandardMaterial color={c} roughness={0.78} metalness={0.04} emissive={c} emissiveIntensity={0} />
        </mesh>
      );

    // ── TV (Netflix) — flat display with stand ───────────────────────────────
    case "tv":
      return (
        <>
          {/* Outer bezel/body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.72, 1.15, 0.11]} />
            <meshStandardMaterial color={c} roughness={0.42} metalness={0.18} emissive={c} emissiveIntensity={0} />
          </mesh>
          {/* Screen glass — near-black inset */}
          <mesh receiveShadow position={[0, 0.03, 0.062]}>
            <boxGeometry args={[1.5, 0.93, 0.01]} />
            <meshStandardMaterial color="#050510" roughness={0.04} metalness={0.7} emissive="#000000" emissiveIntensity={0} />
          </mesh>
          {/* Thin stand neck */}
          <mesh castShadow position={[0, -0.74, 0]}>
            <boxGeometry args={[0.11, 0.34, 0.09]} />
            <meshStandardMaterial color={c} roughness={0.5} metalness={0.12} emissive={c} emissiveIntensity={0} />
          </mesh>
          {/* Base */}
          <mesh castShadow receiveShadow position={[0, -0.93, 0]}>
            <boxGeometry args={[0.68, 0.07, 0.26]} />
            <meshStandardMaterial color={c} roughness={0.5} metalness={0.12} emissive={c} emissiveIntensity={0} />
          </mesh>
        </>
      );

    // ── Aircraft (IATA) — side-profile plane: fuselage + swept wings + tail ──
    case "aircraft":
      return (
        <>
          {/* Fuselage */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.4, 0.2, 0.2]} />
            <meshStandardMaterial color={c} roughness={0.5} metalness={0.22} emissive={c} emissiveIntensity={0} />
          </mesh>
          {/* Nose taper — slightly smaller box at +X tip */}
          <mesh castShadow position={[1.18, 0, 0]}>
            <boxGeometry args={[0.22, 0.13, 0.13]} />
            <meshStandardMaterial color={c} roughness={0.5} metalness={0.22} emissive={c} emissiveIntensity={0} />
          </mesh>
          {/* Main wings — swept back slightly, spread in Z */}
          <mesh castShadow receiveShadow position={[0.08, -0.02, 0]} rotation={[0, 0.2, 0]}>
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
        </>
      );

    // ── Phone (StoryCorps) — upright smartphone ──────────────────────────────
    case "phone":
      return (
        <>
          {/* Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.72, 1.48, 0.09]} />
            <meshStandardMaterial color={c} roughness={0.52} metalness={0.1} emissive={c} emissiveIntensity={0} />
          </mesh>
          {/* Screen glass */}
          <mesh position={[0, 0.04, 0.051]}>
            <boxGeometry args={[0.6, 1.15, 0.01]} />
            <meshStandardMaterial color="#050510" roughness={0.04} metalness={0.55} emissive="#000000" emissiveIntensity={0} />
          </mesh>
          {/* Home indicator bar */}
          <mesh position={[0, -0.6, 0.053]}>
            <boxGeometry args={[0.22, 0.032, 0.005]} />
            <meshStandardMaterial color="#e0d8e4" roughness={0.35} metalness={0.1} emissive="#000000" emissiveIntensity={0} />
          </mesh>
          {/* Front camera pill */}
          <mesh position={[0, 0.62, 0.053]}>
            <boxGeometry args={[0.11, 0.038, 0.005]} />
            <meshStandardMaterial color="#0a0a18" roughness={0.2} metalness={0.3} emissive="#000000" emissiveIntensity={0} />
          </mesh>
        </>
      );

    // ── Code card (Component System) — terminal window with code lines ────────
    case "code": {
      // Accent line colors derived from the teal base
      const lineA = "#1aa8cc";  // bright teal line
      const lineB = "#0e8eaa";  // mid teal
      const lineC = "#0bbfab";  // teal-green accent
      return (
        <>
          {/* Card body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.45, 1.15, 0.1]} />
            <meshStandardMaterial color={c} roughness={0.68} metalness={0.05} emissive={c} emissiveIntensity={0} />
          </mesh>
          {/* Title bar strip */}
          <mesh position={[0, 0.475, 0.057]}>
            <boxGeometry args={[1.42, 0.17, 0.005]} />
            <meshStandardMaterial color="#0d3a49" roughness={0.6} metalness={0.05} emissive="#0d3a49" emissiveIntensity={0} />
          </mesh>
          {/* Traffic light dots */}
          <mesh position={[-0.55, 0.475, 0.063]}>
            <sphereGeometry args={[0.042, 12, 12]} />
            <meshStandardMaterial color="#e74c3c" roughness={0.4} metalness={0.1} emissive="#e74c3c" emissiveIntensity={0} />
          </mesh>
          <mesh position={[-0.44, 0.475, 0.063]}>
            <sphereGeometry args={[0.042, 12, 12]} />
            <meshStandardMaterial color="#f1c40f" roughness={0.4} metalness={0.1} emissive="#f1c40f" emissiveIntensity={0} />
          </mesh>
          <mesh position={[-0.33, 0.475, 0.063]}>
            <sphereGeometry args={[0.042, 12, 12]} />
            <meshStandardMaterial color="#2ecc71" roughness={0.4} metalness={0.1} emissive="#2ecc71" emissiveIntensity={0} />
          </mesh>
          {/* Code lines */}
          <mesh position={[-0.13, 0.24, 0.057]}>
            <boxGeometry args={[0.88, 0.052, 0.005]} />
            <meshStandardMaterial color={lineA} roughness={0.5} metalness={0.05} emissive={lineA} emissiveIntensity={0} />
          </mesh>
          <mesh position={[-0.03, 0.1, 0.057]}>
            <boxGeometry args={[0.64, 0.052, 0.005]} />
            <meshStandardMaterial color={lineB} roughness={0.5} metalness={0.05} emissive={lineB} emissiveIntensity={0} />
          </mesh>
          <mesh position={[-0.07, -0.05, 0.057]}>
            <boxGeometry args={[0.96, 0.052, 0.005]} />
            <meshStandardMaterial color={lineA} roughness={0.5} metalness={0.05} emissive={lineA} emissiveIntensity={0} />
          </mesh>
          <mesh position={[-0.27, -0.2, 0.057]}>
            <boxGeometry args={[0.44, 0.052, 0.005]} />
            <meshStandardMaterial color={lineC} roughness={0.5} metalness={0.05} emissive={lineC} emissiveIntensity={0} />
          </mesh>
          <mesh position={[-0.09, -0.35, 0.057]}>
            <boxGeometry args={[0.74, 0.052, 0.005]} />
            <meshStandardMaterial color={lineB} roughness={0.5} metalness={0.05} emissive={lineB} emissiveIntensity={0} />
          </mesh>
        </>
      );
    }

    default:
      return (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.25, 1.25, 1.25]} />
          <meshStandardMaterial color={c} roughness={0.78} metalness={0.04} emissive={c} emissiveIntensity={0} />
        </mesh>
      );
  }
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  item: SandboxItem;
  onHoverChange: (active: boolean) => void;
  onSelect: (item: SandboxItem) => void;
  dark: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PhysicsObject({ item, onHoverChange, onSelect, dark }: Props) {
  const rigidRef = useRef<RapierRigidBody>(null);
  const groupRef = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState(false);

  // ── Drag state (all refs so they never trigger re-renders) ──────────────────
  const isDragging      = useRef(false);
  const dragPlane       = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const pointerNDC      = useRef(new THREE.Vector2());
  const prevDragPos     = useRef(new THREE.Vector3());
  const dragVelocity    = useRef(new THREE.Vector3());
  const scaleTarget     = useRef(1);
  const scaleCurrent    = useRef(1);
  const emissiveCurrent = useRef(0);

  const { camera, gl, raycaster } = useThree();

  // ── Per-frame: scale + emissive lerp + drag ───────────────────────────────
  useFrame((_, delta) => {
    const grp = groupRef.current;
    if (!grp) return;

    // Scale animation
    scaleTarget.current = hovered || isDragging.current ? 1.14 : 1;
    scaleCurrent.current = THREE.MathUtils.lerp(scaleCurrent.current, scaleTarget.current, delta * 9);
    grp.scale.setScalar(scaleCurrent.current);

    // Emissive glow — traverse group, animate only non-black emissive materials
    const emissiveTarget = hovered ? 0.3 : 0;
    emissiveCurrent.current = THREE.MathUtils.lerp(emissiveCurrent.current, emissiveTarget, delta * 8);
    grp.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mat = (obj as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat?.emissive && (mat.emissive.r + mat.emissive.g + mat.emissive.b) > 0.02) {
          mat.emissiveIntensity = emissiveCurrent.current;
        }
      }
    });

    // Drag movement — project NDC onto drag plane
    if (isDragging.current && rigidRef.current) {
      raycaster.setFromCamera(pointerNDC.current, camera);
      const hit = new THREE.Vector3();
      raycaster.ray.intersectPlane(dragPlane.current, hit);

      dragVelocity.current
        .subVectors(hit, prevDragPos.current)
        .divideScalar(Math.max(delta, 0.001));
      prevDragPos.current.copy(hit);

      rigidRef.current.setNextKinematicTranslation(hit);
    }
  });

  // ── Pointer handlers ─────────────────────────────────────────────────────────
  // onMove / onUp are inline closures so each drag captures THIS instance's refs
  const handlePointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (!rigidRef.current) return;

      isDragging.current = true;
      document.body.style.cursor = "grabbing";

      const pos = rigidRef.current.translation();
      dragPlane.current.constant = -pos.z;
      prevDragPos.current.set(pos.x, pos.y, pos.z);
      dragVelocity.current.set(0, 0, 0);

      const canvas = gl.domElement;
      const rect = canvas.getBoundingClientRect();
      pointerNDC.current.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      rigidRef.current.setBodyType(2, true); // KinematicPositionBased

      const onMove = (ev: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        pointerNDC.current.set(
          ((ev.clientX - r.left) / r.width) * 2 - 1,
          -((ev.clientY - r.top) / r.height) * 2 + 1
        );
      };
      const onUp = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        document.body.style.cursor = "auto";

        rigidRef.current?.setBodyType(0, true); // Dynamic
        rigidRef.current?.setLinvel(
          { x: dragVelocity.current.x * 0.4, y: dragVelocity.current.y * 0.4, z: 0 },
          true
        );
        rigidRef.current?.setAngvel(
          { x: dragVelocity.current.y * 0.3, y: -dragVelocity.current.x * 0.3, z: 0 },
          true
        );
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerup",   onUp);
      };

      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerup",   onUp);
    },
    [gl]
  );

  const handlePointerEnter = useCallback(() => {
    if (isDragging.current) return;
    setHovered(true);
    onHoverChange(true);
    document.body.style.cursor = "grab";
  }, [onHoverChange]);

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    onHoverChange(false);
    if (!isDragging.current) document.body.style.cursor = "auto";
  }, [onHoverChange]);

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (dragVelocity.current.length() < 0.5) onSelect(item);
    },
    [item, onSelect]
  );

  // ── Text colors adapt to dark/light mode ─────────────────────────────────────
  const labelColor    = dark ? "#ffffff" : "#111111";
  const sublabelColor = dark ? "#b8b8b8" : "#555555";

  return (
    <RigidBody
      ref={rigidRef}
      colliders={false}
      position={item.initialPosition}
      linearVelocity={item.initialLinvel}
      restitution={PHYSICS.restitution}
      friction={PHYSICS.friction}
      linearDamping={PHYSICS.linearDamping}
      angularDamping={PHYSICS.angularDamping}
    >
      {/* ── Physics collider ── */}
      <ShapeCollider shape={item.shape} />

      {/* ── Scene group — scaled by useFrame ── */}
      <group ref={groupRef}>

        {/* ── Transparent bounding mesh — sole owner of pointer events ── */}
        <mesh
          onPointerDown={handlePointerDown}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
        >
          <EventBounds shape={item.shape} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* ── Visual meshes (no events) ── */}
        <ShapeVisual shape={item.shape} color={item.color} />

        {/* ── Text labels ── */}
        <Text
          position={[0, 0.17, 0.85]}
          fontSize={0.21}
          fontWeight={700}
          color={labelColor}
          anchorX="center"
          anchorY="middle"
          renderOrder={1}
        >
          {item.label}
        </Text>
        <Text
          position={[0, -0.1, 0.85]}
          fontSize={0.13}
          color={sublabelColor}
          anchorX="center"
          anchorY="middle"
          renderOrder={1}
        >
          {item.sublabel}
        </Text>
      </group>
    </RigidBody>
  );
}
