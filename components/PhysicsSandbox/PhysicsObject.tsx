"use client";

import { useRef, useState, useCallback, useEffect } from "react";
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

// ─── Geometry per shape ───────────────────────────────────────────────────────
function ShapeGeometry({ shape }: { shape: ObjectShape }) {
  switch (shape) {
    case "sphere":
      return <sphereGeometry args={[0.72, 32, 32]} />;
    case "capsule":
      return <capsuleGeometry args={[0.48, 0.75, 8, 24]} />;
    case "torus":
      return <torusGeometry args={[0.58, 0.28, 16, 48]} />;
    case "octahedron":
      return <octahedronGeometry args={[0.82, 0]} />;
    case "roundedBox":
    default:
      return <boxGeometry args={[1.25, 1.25, 1.25]} />;
  }
}

// ─── Explicit collider per shape — more reliable than auto-detection ──────────
// colliders={false} on RigidBody + explicit child collider = guaranteed physics
function ShapeCollider({ shape }: { shape: ObjectShape }) {
  switch (shape) {
    // Perfect ball collider — exact fit for sphere mesh (r=0.72)
    case "sphere":     return <BallCollider args={[0.72]} />;
    // Axis-aligned box — exact fit for boxGeometry 1.25³  (half-extents = 0.625)
    case "roundedBox": return <CuboidCollider args={[0.625, 0.625, 0.625]} />;
    // Capsule: halfHeight = cylinderLength/2 = 0.375, radius = 0.48
    case "capsule":    return <CapsuleCollider args={[0.375, 0.48]} />;
    // Torus: approximate as a wide-flat cylinder (halfH = tube radius, r = outer radius)
    case "torus":      return <CylinderCollider args={[0.28, 0.86]} />;
    // Octahedron: circumscribed ball gives great collision response
    case "octahedron": return <BallCollider args={[0.72]} />;
    default:           return <BallCollider args={[0.70]} />;
  }
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  item: SandboxItem;
  onHoverChange: (active: boolean) => void;
  onSelect: (item: SandboxItem) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PhysicsObject({ item, onHoverChange, onSelect }: Props) {
  const rigidRef = useRef<RapierRigidBody>(null);
  const meshRef  = useRef<THREE.Mesh>(null);
  const matRef   = useRef<THREE.MeshStandardMaterial>(null);

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

  // ── Per-frame: scale & emissive lerp, drag movement ──────────────────────────
  useFrame((_, delta) => {
    // Animate scale
    scaleTarget.current = hovered || isDragging.current ? 1.14 : 1;
    scaleCurrent.current = THREE.MathUtils.lerp(scaleCurrent.current, scaleTarget.current, delta * 9);
    meshRef.current?.scale.setScalar(scaleCurrent.current);

    // Animate emissive glow
    const emissiveTarget = hovered ? 0.3 : 0;
    emissiveCurrent.current = THREE.MathUtils.lerp(emissiveCurrent.current, emissiveTarget, delta * 8);
    if (matRef.current) matRef.current.emissiveIntensity = emissiveCurrent.current;

    // Drag movement — project NDC onto drag plane each frame
    if (isDragging.current && rigidRef.current) {
      raycaster.setFromCamera(pointerNDC.current, camera);
      const hit = new THREE.Vector3();
      raycaster.ray.intersectPlane(dragPlane.current, hit);

      // Compute throw velocity (world units / second)
      dragVelocity.current
        .subVectors(hit, prevDragPos.current)
        .divideScalar(Math.max(delta, 0.001));
      prevDragPos.current.copy(hit);

      rigidRef.current.setNextKinematicTranslation(hit);
    }
  });

  // ── Global pointermove/up listeners (attached when drag starts) ───────────────
  useEffect(() => {
    const canvas = gl.domElement;

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerNDC.current.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
    };

    const onUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.cursor = "auto";

      // Switch back to dynamic and throw
      rigidRef.current?.setBodyType(0, true); // 0 = Dynamic
      rigidRef.current?.setLinvel(
        { x: dragVelocity.current.x * 0.4, y: dragVelocity.current.y * 0.4, z: 0 },
        true
      );
      rigidRef.current?.setAngvel(
        { x: dragVelocity.current.y * 0.3, y: -dragVelocity.current.x * 0.3, z: 0 },
        true
      );

      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
    };

    // Store cleanup refs so pointerdown can re-add them
    (canvas as any).__sandboxMove = onMove;
    (canvas as any).__sandboxUp   = onUp;

    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
    };
  }, [gl]);

  // ── Pointer handlers on the mesh ─────────────────────────────────────────────
  const handlePointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (!rigidRef.current) return;

      isDragging.current = true;
      document.body.style.cursor = "grabbing";

      // Fix drag plane at object's current Z depth
      const pos = rigidRef.current.translation();
      dragPlane.current.constant = -pos.z;
      prevDragPos.current.set(pos.x, pos.y, pos.z);
      dragVelocity.current.set(0, 0, 0);

      // Seed NDC from event
      const rect = gl.domElement.getBoundingClientRect();
      pointerNDC.current.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      // Switch to kinematic so we drive position directly
      rigidRef.current.setBodyType(2, true); // 2 = KinematicPositionBased

      // Attach global listeners
      const canvas = gl.domElement;
      canvas.addEventListener("pointermove", (canvas as any).__sandboxMove);
      canvas.addEventListener("pointerup",   (canvas as any).__sandboxUp);
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
      // Only fire click if not dragging (short tap vs. drag)
      if (dragVelocity.current.length() < 0.5) onSelect(item);
    },
    [item, onSelect]
  );

  return (
    <RigidBody
      ref={rigidRef}
      colliders={false}          // ← disable auto-detection; explicit collider below
      position={item.initialPosition}
      linearVelocity={item.initialLinvel}
      restitution={PHYSICS.restitution}
      friction={PHYSICS.friction}
      linearDamping={PHYSICS.linearDamping}
      angularDamping={PHYSICS.angularDamping}
    >
      {/* ── Explicit collider — correct shape, correct size, guaranteed stable ── */}
      <ShapeCollider shape={item.shape} />

      {/* ── 3D mesh ── */}
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <ShapeGeometry shape={item.shape} />
        <meshStandardMaterial
          ref={matRef}
          color={item.color}
          roughness={0.78}
          metalness={0.04}
          emissive={item.color}
          emissiveIntensity={0}
        />
      </mesh>

      {/* ── Text labels ── */}
      <Text
        position={[0, 0.17, 0.7]}
        fontSize={0.21}
        fontWeight={700}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        renderOrder={1}
      >
        {item.label}
      </Text>
      <Text
        position={[0, -0.1, 0.7]}
        fontSize={0.13}
        color="#b8b8b8"
        anchorX="center"
        anchorY="middle"
        renderOrder={1}
      >
        {item.sublabel}
      </Text>
    </RigidBody>
  );
}
