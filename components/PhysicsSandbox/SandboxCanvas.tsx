"use client";

// ─── Pure useFrame choreography + pointer drag / throw ─────────────────────────
// No physics engine. Drag objects around; they bounce off viewport edges and
// smoothly return to their choreographed positions on reset.

import { useRef, useMemo, useCallback } from "react";
import type { RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { Billboard, Text, Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { SANDBOX_ITEMS, type SandboxItem } from "./config";

// ─── Types ─────────────────────────────────────────────────────────────────────
type DragMode = "choreo" | "grabbed" | "thrown" | "returning";

// ─── Shared module-level tmp (safe: useFrame callbacks run serially) ───────────
const _cv3 = new THREE.Vector3();

// ─── Pre-computed moon crater positions (spherical → Cartesian + rotation) ────
// Each crater is a flat disc placed just inside the sphere surface (r=0.692),
// oriented so its face points outward (normal = outward radial direction).
const _moonCraters = ((): Array<{
  x: number; y: number; z: number;
  rot: THREE.Euler; size: number; rimSize: number;
}> => {
  const raw = [
    { theta: 0.80,  phi: 1.10, size: 0.110, rimSize: 0.135 },
    { theta: 2.10,  phi: 0.76, size: 0.068, rimSize: 0.088 },
    { theta: -0.90, phi: 1.55, size: 0.128, rimSize: 0.156 },
    { theta: 1.40,  phi: 0.48, size: 0.050, rimSize: 0.065 },
    { theta: -2.40, phi: 1.20, size: 0.092, rimSize: 0.114 },
    { theta: 3.00,  phi: 1.85, size: 0.060, rimSize: 0.078 },
    { theta: 0.20,  phi: 2.10, size: 0.082, rimSize: 0.102 },
    { theta: -1.60, phi: 0.66, size: 0.048, rimSize: 0.062 },
    { theta: 1.90,  phi: 1.42, size: 0.072, rimSize: 0.090 },
  ];
  const up = new THREE.Vector3(0, 0, 1);
  return raw.map(({ theta, phi, size, rimSize }) => {
    const rad = 0.693;
    const x   = rad * Math.sin(phi) * Math.cos(theta);
    const y   = rad * Math.cos(phi);
    const z   = rad * Math.sin(phi) * Math.sin(theta);
    const q   = new THREE.Quaternion().setFromUnitVectors(up, new THREE.Vector3(x, y, z).normalize());
    const rot = new THREE.Euler().setFromQuaternion(q);
    return { x, y, z, rot, size, rimSize };
  });
})();

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Lerp emissive intensity on every non-black emissive material in a group. */
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
      if (mat?.emissive && mat.emissive.r + mat.emissive.g + mat.emissive.b > 0.02)
        mat.emissiveIntensity = cur.v;
    }
  });
}

/** Transparent bounding mesh — captures pointer events, invisible. */
function HitBox({
  w, h, d,
  onPointerDown, onPointerEnter, onPointerLeave,
}: {
  w: number; h: number; d: number;
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  return (
    <mesh onPointerDown={onPointerDown} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <boxGeometry args={[w, h, d]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

/** Camera-facing label pair: title + subtitle. */
function Label({ label, sublabel, dark, y = 1.1 }: {
  label: string; sublabel: string; dark: boolean; y?: number;
}) {
  const tc = dark ? "#ffffff" : "#0a0a0a";
  const sc = dark ? "#d0d0d0" : "#444444";
  const oc = dark ? "#000000" : "#ffffff";
  return (
    <Billboard>
      <Text position={[0, y, 0]} fontSize={0.22} fontWeight={700} color={tc}
        outlineWidth={0.028} outlineColor={oc} outlineOpacity={0.75}
        anchorX="center" anchorY="middle" renderOrder={5}>
        {label}
      </Text>
      <Text position={[0, y - 0.3, 0]} fontSize={0.14} color={sc}
        outlineWidth={0.022} outlineColor={oc} outlineOpacity={0.65}
        anchorX="center" anchorY="middle" renderOrder={5}>
        {sublabel}
      </Text>
    </Billboard>
  );
}

// ─── useDraggable hook ────────────────────────────────────────────────────────
/**
 * Provides drag / throw / return state for a 3D object.
 * Objects are constrained to the visible viewport (z = 0 plane).
 * A tap (< 0.2 world-unit travel) triggers onTap instead of a drag.
 */
function useDraggable(returnKey: number) {
  const { camera, gl, size } = useThree();

  const mode       = useRef<DragMode>("choreo");
  const pos        = useRef(new THREE.Vector3());
  const vel        = useRef(new THREE.Vector3());
  const grabOffset = useRef(new THREE.Vector3());
  const prevWorld  = useRef(new THREE.Vector3());
  const prevTime   = useRef(0);
  const prevRKey   = useRef(returnKey);
  const grabStart  = useRef(new THREE.Vector3());

  /** Viewport half-extents at z = 0, with a small inset. */
  const bounds = useMemo(() => {
    const cam    = camera as THREE.PerspectiveCamera;
    const halfH  = Math.tan(((cam.fov * Math.PI) / 180) / 2) * cam.position.z - 0.85;
    const halfW  = halfH * (size.width / size.height) - 0.85;
    return { minX: -halfW, maxX: halfW, minY: -halfH, maxY: halfH };
  }, [camera, size]);

  /** Unproject screen coordinate → world position on z = 0 plane. */
  const worldAt = useCallback((clientX: number, clientY: number): THREE.Vector3 => {
    const rect = gl.domElement.getBoundingClientRect();
    const ndc  = new THREE.Vector2(
      ((clientX - rect.left) / rect.width)  * 2 - 1,
      -((clientY - rect.top)  / rect.height) * 2 + 1,
    );
    const rc  = new THREE.Raycaster();
    rc.setFromCamera(ndc, camera);
    const out = new THREE.Vector3();
    rc.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), out);
    return out;
  }, [camera, gl]);

  /**
   * Returns a pointerDown handler bound to the given group ref.
   * onTap is called on a quick click (no drag travel).
   */
  const makeHandlers = useCallback((
    gRef: RefObject<THREE.Group | null>,
    onTap: () => void,
  ) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!gRef.current) return;

    const w         = worldAt(e.clientX, e.clientY);
    mode.current    = "grabbed";
    vel.current.set(0, 0, 0);
    grabOffset.current.subVectors(gRef.current.position, w);
    grabStart.current.copy(w);
    prevWorld.current.copy(w);
    prevTime.current = performance.now();
    document.body.style.cursor = "grabbing";

    const onMove = (ev: PointerEvent) => {
      if (mode.current !== "grabbed") return;
      const ww  = worldAt(ev.clientX, ev.clientY);
      const now = performance.now();
      const dt  = (now - prevTime.current) / 1000;
      if (dt > 0.008) {
        vel.current.subVectors(ww, prevWorld.current).divideScalar(dt);
        if (vel.current.length() > 16) vel.current.setLength(16);
        prevWorld.current.copy(ww);
        prevTime.current = now;
      }
      pos.current.addVectors(ww, grabOffset.current);
      pos.current.x = THREE.MathUtils.clamp(pos.current.x, bounds.minX, bounds.maxX);
      pos.current.y = THREE.MathUtils.clamp(pos.current.y, bounds.minY, bounds.maxY);
      pos.current.z = 0;
    };

    const onUp = (ev: PointerEvent) => {
      const end   = worldAt(ev.clientX, ev.clientY);
      const moved = end.distanceTo(grabStart.current);
      if (moved < 0.2)              { onTap(); mode.current = "returning"; }
      else if (vel.current.length() > 0.9) { mode.current = "thrown";    }
      else                          { mode.current = "returning"; }
      document.body.style.cursor = "auto";
      gl.domElement.removeEventListener("pointermove", onMove);
      gl.domElement.removeEventListener("pointerup",   onUp);
    };

    gl.domElement.addEventListener("pointermove", onMove);
    gl.domElement.addEventListener("pointerup",   onUp);
  }, [worldAt, bounds, gl]);

  /** Call every frame — detects returnKey change and sets mode = "returning". */
  const checkReturn = useCallback((rk: number) => {
    if (rk !== prevRKey.current) {
      prevRKey.current = rk;
      mode.current = "returning";
      vel.current.set(0, 0, 0);
    }
  }, []);

  /** Advance thrown-object position for one frame with damping + bounce. */
  const stepThrown = useCallback((delta: number) => {
    if (mode.current !== "thrown") return;
    vel.current.multiplyScalar(Math.max(0, 1 - delta * 2.2));
    pos.current.addScaledVector(vel.current, delta);
    if (pos.current.x < bounds.minX || pos.current.x > bounds.maxX) {
      vel.current.x *= -0.55;
      pos.current.x  = THREE.MathUtils.clamp(pos.current.x, bounds.minX, bounds.maxX);
    }
    if (pos.current.y < bounds.minY || pos.current.y > bounds.maxY) {
      vel.current.y *= -0.55;
      pos.current.y  = THREE.MathUtils.clamp(pos.current.y, bounds.minY, bounds.maxY);
    }
    if (vel.current.length() < 0.1) mode.current = "returning";
  }, [bounds]);

  return { mode, pos, makeHandlers, checkReturn, stepThrown } as const;
}

// ─── Drive group position based on current drag mode ─────────────────────────
function drivePos(
  gRef: RefObject<THREE.Group | null>,
  drag: ReturnType<typeof useDraggable>,
  cx: number, cy: number,
  delta: number,
) {
  _cv3.set(cx, cy, 0);
  switch (drag.mode.current) {
    case "choreo":
      gRef.current!.position.copy(_cv3);
      drag.pos.current.copy(_cv3);
      break;
    case "grabbed":
      gRef.current!.position.copy(drag.pos.current).setZ(0);
      break;
    case "thrown":
      drag.stepThrown(delta);
      gRef.current!.position.copy(drag.pos.current).setZ(0);
      break;
    case "returning":
      drag.pos.current.lerp(_cv3, delta * 4.5);
      gRef.current!.position.copy(drag.pos.current).setZ(0);
      if (drag.pos.current.distanceTo(_cv3) < 0.07) {
        drag.pos.current.copy(_cv3);
        drag.mode.current = "choreo";
      }
      break;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. JUST Intelligence — moon with inner glow
// ═══════════════════════════════════════════════════════════════════════════════
function JustSphere({ item, onSelect, dark, returnKey }: {
  item: SandboxItem; onSelect: (i: SandboxItem) => void;
  dark: boolean; returnKey: number;
}) {
  const gRef      = useRef<THREE.Group>(null);
  const isHovered = useRef(false);
  const scaleV    = useRef(1);
  const emV       = useRef(0.36);   // base emissive — always glowing
  const drag      = useDraggable(returnKey);

  const handleDown = useMemo(
    () => drag.makeHandlers(gRef, () => onSelect(item)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drag.makeHandlers],
  );
  const onEnter = useCallback(() => {
    isHovered.current = true;
    if (drag.mode.current !== "grabbed") document.body.style.cursor = "grab";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onLeave = useCallback(() => {
    isHovered.current = false;
    if (drag.mode.current !== "grabbed") document.body.style.cursor = "auto";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }, delta) => {
    if (!gRef.current) return;
    drag.checkReturn(returnKey);
    const t  = clock.elapsedTime;
    const cx = 0;
    const cy = 0.3 + Math.sin(t * 0.72) * 0.24;
    drivePos(gRef, drag, cx, cy, delta);
    gRef.current.rotation.y += delta * 0.28;
    scaleV.current = THREE.MathUtils.lerp(scaleV.current, isHovered.current ? 1.14 : 1, delta * 8);
    gRef.current.scale.setScalar(scaleV.current);
    // Moon always glows; brighter on hover
    emV.current = THREE.MathUtils.lerp(emV.current, isHovered.current ? 0.65 : 0.36, delta * 5);
    gRef.current.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mat = (obj as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat?.emissive && mat.emissive.r + mat.emissive.g + mat.emissive.b > 0.02)
          mat.emissiveIntensity = emV.current;
      }
    });
  });

  return (
    <group ref={gRef} position={[0, 0.3, 0]}>
      <HitBox w={1.7} h={1.7} d={1.7}
        onPointerDown={handleDown} onPointerEnter={onEnter} onPointerLeave={onLeave} />

      {/* ── Inner glow core — teal brand colour, visible through craters ── */}
      <mesh>
        <sphereGeometry args={[0.65, 20, 16]} />
        <meshStandardMaterial
          color={item.color} emissive={item.color}
          emissiveIntensity={1.2} roughness={1} metalness={0}
          side={THREE.BackSide}
        />
      </mesh>

      {/* ── Lunar surface — warm grey, very rough ── */}
      <mesh castShadow>
        <sphereGeometry args={[0.72, 64, 40]} />
        <meshStandardMaterial
          color="#cec9bc"
          roughness={0.94} metalness={0.0}
          emissive={item.color} emissiveIntensity={0.18}
        />
      </mesh>

      {/* ── Craters — dark discs on surface, slightly recessed ── */}
      {_moonCraters.map(({ x, y, z, rot, size, rimSize }, i) => (
        <group key={i}>
          {/* Crater floor (darker) */}
          <mesh position={[x, y, z]} rotation={rot}>
            <circleGeometry args={[size, 18]} />
            <meshStandardMaterial color="#7a7468" roughness={0.98} metalness={0} />
          </mesh>
          {/* Crater rim (lighter ring) */}
          <mesh position={[x * 1.001, y * 1.001, z * 1.001]} rotation={rot}>
            <ringGeometry args={[size, rimSize, 18]} />
            <meshStandardMaterial color="#dbd6ca" roughness={0.96} metalness={0} />
          </mesh>
        </group>
      ))}

      {/* ── Atmospheric halo — soft teal glow around the moon ── */}
      <mesh>
        <sphereGeometry args={[0.80, 22, 18]} />
        <meshStandardMaterial
          color={item.color} transparent opacity={0.07}
          roughness={1} metalness={0}
          emissive={item.color} emissiveIntensity={0.9}
          side={THREE.BackSide}
        />
      </mesh>

      <Label label={item.label} sublabel={item.sublabel} dark={dark} y={1.05} />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. IATA — chubby cartoon airplane on elliptical orbit
// ═══════════════════════════════════════════════════════════════════════════════
function IataAircraft({ item, onSelect, dark, returnKey }: {
  item: SandboxItem; onSelect: (i: SandboxItem) => void;
  dark: boolean; returnKey: number;
}) {
  const gRef      = useRef<THREE.Group>(null);
  const labelRef  = useRef<THREE.Group>(null);
  const isHovered = useRef(false);
  const scaleV    = useRef(1);
  const emV       = useRef({ v: 0 });
  const drag      = useDraggable(returnKey);

  // Modern livery — light sky-blue body with pale-yellow accents
  const c   = "#C4E0F4";     // pale sky blue — fuselage / wings / tail
  const cA  = "#9BCAEB";     // slightly deeper blue — nacelle / winglets
  const cY  = "#FFF4C2";     // pale warm yellow — cockpit glass
  const cW  = "#FFFACC";     // pale yellow — windows
  const emC = item.color;    // #004E81 — used only for emissive glow on hover

  const SPEED = 0.52, RX = 3.8, RY = 2.0, CX = 0, CY = 0.3;

  const handleDown = useMemo(
    () => drag.makeHandlers(gRef, () => onSelect(item)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drag.makeHandlers],
  );
  const onEnter = useCallback(() => {
    isHovered.current = true;
    if (drag.mode.current !== "grabbed") document.body.style.cursor = "grab";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onLeave = useCallback(() => {
    isHovered.current = false;
    if (drag.mode.current !== "grabbed") document.body.style.cursor = "auto";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }, delta) => {
    if (!gRef.current) return;
    drag.checkReturn(returnKey);
    const angle   = clock.elapsedTime * SPEED;
    const cx      = CX + RX * Math.cos(angle);
    const cy      = CY + RY * Math.sin(angle);
    const heading = Math.atan2(RY * Math.cos(angle) * SPEED, -RX * Math.sin(angle) * SPEED);

    drivePos(gRef, drag, cx, cy, delta);

    // Nose follows orbit direction only in choreography
    if (drag.mode.current === "choreo") {
      gRef.current.rotation.z = heading;
    } else {
      gRef.current.rotation.z = THREE.MathUtils.lerp(gRef.current.rotation.z, 0, delta * 2);
    }

    scaleV.current = THREE.MathUtils.lerp(scaleV.current, isHovered.current ? 1.12 : 1, delta * 8);
    gRef.current.scale.setScalar(scaleV.current);
    lerpEmissive(gRef.current, isHovered.current ? 0.22 : 0, delta, emV.current);

    // Label tracks world position, never inherits rotation
    if (labelRef.current)
      labelRef.current.position.set(gRef.current.position.x, gRef.current.position.y + 1.25, 0);
  });

  // Body panels: smooth light blue, emissive teal glow on hover
  const matProps  = { color: c,  roughness: 0.28 as number, metalness: 0.08 as number, emissive: emC, emissiveIntensity: 0 as number };
  // Accent panels: slightly deeper blue (nacelle, winglets)
  const matAccent = { color: cA, roughness: 0.30 as number, metalness: 0.10 as number, emissive: emC, emissiveIntensity: 0 as number };

  return (
    <>
      <group ref={gRef} position={[CX + RX, CY, 0]}>
        <HitBox w={2.9} h={1.2} d={1.6}
          onPointerDown={handleDown} onPointerEnter={onEnter} onPointerLeave={onLeave} />

        {/* ── Fuselage: scaled sphere for chubby blobby look ── */}
        <mesh castShadow scale={[1.82, 0.84, 0.8]}>
          <sphereGeometry args={[0.55, 40, 28]} />
          <meshStandardMaterial {...matProps} />
        </mesh>

        {/* Cockpit windshield — pale yellow glass bulge at nose top */}
        <mesh position={[0.72, 0.26, 0]} scale={[0.52, 0.38, 0.82]}>
          <sphereGeometry args={[0.3, 18, 14]} />
          <meshStandardMaterial color={cY} roughness={0.06} metalness={0.45} transparent opacity={0.9} />
        </mesh>

        {/* Wings — low-mounted, slightly swept */}
        <mesh castShadow position={[0.1, -0.18, 0]} rotation={[0, 0.16, 0.04]}>
          <boxGeometry args={[0.78, 0.062, 1.55]} />
          <meshStandardMaterial {...matProps} />
        </mesh>

        {/* Winglets — accent blue */}
        <mesh castShadow position={[0.02, 0.07, 0.76]}>
          <boxGeometry args={[0.24, 0.22, 0.05]} />
          <meshStandardMaterial {...matAccent} />
        </mesh>
        <mesh castShadow position={[0.02, 0.07, -0.76]}>
          <boxGeometry args={[0.24, 0.22, 0.05]} />
          <meshStandardMaterial {...matAccent} />
        </mesh>

        {/* Vertical tail */}
        <mesh castShadow position={[-0.85, 0.32, 0]}>
          <boxGeometry args={[0.52, 0.5, 0.052]} />
          <meshStandardMaterial {...matProps} />
        </mesh>
        {/* Horizontal stabilizer */}
        <mesh castShadow position={[-0.84, 0.04, 0]}>
          <boxGeometry args={[0.38, 0.058, 0.58]} />
          <meshStandardMaterial {...matProps} />
        </mesh>

        {/* Engine nacelle — accent blue */}
        <mesh castShadow position={[0.14, -0.31, 0.46]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.115, 0.1, 0.44, 14]} />
          <meshStandardMaterial {...matAccent} />
        </mesh>
        {/* Engine intake (dark circle at front) */}
        <mesh position={[0.37, -0.31, 0.46]} rotation={[0, -Math.PI / 2, 0]}>
          <circleGeometry args={[0.082, 12]} />
          <meshStandardMaterial color="#0a0a14" roughness={0.9} metalness={0.1} />
        </mesh>

        {/* Windows — pale yellow, rounded look */}
        {([0.55, 0.3, 0.05, -0.2] as number[]).map((wx, i) => (
          <mesh key={i} position={[wx, 0.27, 0.41]}>
            <boxGeometry args={[0.13, 0.1, 0.018]} />
            <meshStandardMaterial color={cW} roughness={0.06} metalness={0.4} />
          </mesh>
        ))}
      </group>

      {/* World-space label anchor — never rotates with the aircraft */}
      <group ref={labelRef} position={[CX + RX, CY + 1.25, 0]}>
        <Label label={item.label} sublabel={item.sublabel} dark={dark} y={0} />
      </group>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. StoryCorps — bubbly phone + retro broadcast microphone
// ═══════════════════════════════════════════════════════════════════════════════
function StorycorpsPhone({ item, onSelect, dark, returnKey }: {
  item: SandboxItem; onSelect: (i: SandboxItem) => void;
  dark: boolean; returnKey: number;
}) {
  const gRef      = useRef<THREE.Group>(null);
  const isHovered = useRef(false);
  const scaleV    = useRef(1);
  const emV       = useRef({ v: 0 });
  const drag      = useDraggable(returnKey);
  const c         = item.color; // #EF553F coral

  const handleDown = useMemo(
    () => drag.makeHandlers(gRef, () => onSelect(item)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drag.makeHandlers],
  );
  const onEnter = useCallback(() => {
    isHovered.current = true;
    if (drag.mode.current !== "grabbed") document.body.style.cursor = "grab";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onLeave = useCallback(() => {
    isHovered.current = false;
    if (drag.mode.current !== "grabbed") document.body.style.cursor = "auto";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }, delta) => {
    if (!gRef.current) return;
    drag.checkReturn(returnKey);
    const t  = clock.elapsedTime;
    const cx = 4.1 + Math.sin(t * 0.44 + 0.9) * 0.11;
    const cy = 2.7 + Math.sin(t * 0.81 + 1.2) * 0.2;
    drivePos(gRef, drag, cx, cy, delta);
    gRef.current.rotation.y += delta * 0.2;
    gRef.current.rotation.z  = Math.sin(t * 0.38) * 0.06;
    scaleV.current = THREE.MathUtils.lerp(scaleV.current, isHovered.current ? 1.14 : 1, delta * 8);
    gRef.current.scale.setScalar(scaleV.current);
    lerpEmissive(gRef.current, isHovered.current ? 0.22 : 0, delta, emV.current);
  });

  const matC  = { color: c, roughness: 0.5 as number, metalness: 0.08 as number,
    emissive: c, emissiveIntensity: 0 as number };

  return (
    <group ref={gRef} position={[4.1, 2.7, 0]}>
      <HitBox w={1.65} h={1.95} d={0.62}
        onPointerDown={handleDown} onPointerEnter={onEnter} onPointerLeave={onLeave} />

      {/* ── Bubbly phone body (RoundedBox) ── */}
      <RoundedBox args={[0.74, 1.52, 0.13]} radius={0.1} smoothness={6} castShadow>
        <meshStandardMaterial {...matC} />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0.04, 0.072]}>
        <boxGeometry args={[0.6, 1.17, 0.008]} />
        <meshStandardMaterial color="#050510" roughness={0.04} metalness={0.55} />
      </mesh>
      {/* Home indicator */}
      <mesh position={[0, -0.62, 0.075]}>
        <boxGeometry args={[0.22, 0.03, 0.004]} />
        <meshStandardMaterial color="#e0d4de" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Camera pill */}
      <mesh position={[0, 0.64, 0.075]}>
        <boxGeometry args={[0.11, 0.036, 0.004]} />
        <meshStandardMaterial color="#0a0a18" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* ── Retro broadcast microphone ── */}
      <group position={[0.62, -0.06, 0]}>
        {/* Capsule head */}
        <mesh position={[0, 0.36, 0]} castShadow>
          <sphereGeometry args={[0.17, 14, 12]} />
          <meshStandardMaterial {...matC} />
        </mesh>
        {/* Grille rings (torus cross) */}
        <mesh position={[0, 0.36, 0]}>
          <torusGeometry args={[0.12, 0.012, 6, 20]} />
          <meshStandardMaterial color="#cc4030" roughness={0.5} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.36, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.12, 0.012, 6, 20]} />
          <meshStandardMaterial color="#cc4030" roughness={0.5} metalness={0.1} />
        </mesh>
        {/* Handle */}
        <mesh castShadow>
          <cylinderGeometry args={[0.062, 0.078, 0.52, 10]} />
          <meshStandardMaterial {...matC} />
        </mesh>
        {/* Base ring */}
        <mesh castShadow position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 0.06, 12]} />
          <meshStandardMaterial {...matC} />
        </mesh>
      </group>

      <Label label={item.label} sublabel={item.sublabel} dark={dark} y={1.12} />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Netflix — retro chunky CRT television
// ═══════════════════════════════════════════════════════════════════════════════
function NetflixTV({ item, onSelect, dark, returnKey }: {
  item: SandboxItem; onSelect: (i: SandboxItem) => void;
  dark: boolean; returnKey: number;
}) {
  const gRef      = useRef<THREE.Group>(null);
  const isHovered = useRef(false);
  const scaleV    = useRef(1);
  const emV       = useRef({ v: 0 });
  const drag      = useDraggable(returnKey);
  const c         = item.color; // #E50914 Netflix red

  const handleDown = useMemo(
    () => drag.makeHandlers(gRef, () => onSelect(item)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drag.makeHandlers],
  );
  const onEnter = useCallback(() => {
    isHovered.current = true;
    if (drag.mode.current !== "grabbed") document.body.style.cursor = "grab";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onLeave = useCallback(() => {
    isHovered.current = false;
    if (drag.mode.current !== "grabbed") document.body.style.cursor = "auto";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }, delta) => {
    if (!gRef.current) return;
    drag.checkReturn(returnKey);
    const t  = clock.elapsedTime;
    const cx = Math.sin(t * 0.37 + 0.5) * 0.18;
    const cy = -3.0 + Math.sin(t * 0.64 + 2.1) * 0.18;
    drivePos(gRef, drag, cx, cy, delta);
    gRef.current.rotation.y += delta * 0.14;
    scaleV.current = THREE.MathUtils.lerp(scaleV.current, isHovered.current ? 1.12 : 1, delta * 8);
    gRef.current.scale.setScalar(scaleV.current);
    lerpEmissive(gRef.current, isHovered.current ? 0.22 : 0, delta, emV.current);
  });

  const matR = { color: c, roughness: 0.44 as number, metalness: 0.06 as number,
    emissive: c, emissiveIntensity: 0 as number };

  return (
    <group ref={gRef} position={[0, -3.0, 0]}>
      <HitBox w={2.2} h={2.5} d={1.15}
        onPointerDown={handleDown} onPointerEnter={onEnter} onPointerLeave={onLeave} />

      {/* ── Main body: chunky retro rounded box ── */}
      <RoundedBox args={[1.64, 1.34, 0.96]} radius={0.26} smoothness={8} castShadow>
        <meshStandardMaterial {...matR} />
      </RoundedBox>

      {/* Screen bezel (dark inset) */}
      <mesh position={[-0.18, 0.05, 0.49]}>
        <boxGeometry args={[0.88, 0.78, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.08} />
      </mesh>
      {/* Screen glass — slight green-grey tint like a CRT */}
      <mesh position={[-0.18, 0.05, 0.52]}>
        <boxGeometry args={[0.74, 0.64, 0.008]} />
        <meshStandardMaterial color="#687870" roughness={0.05} metalness={0.55} />
      </mesh>

      {/* Right control panel */}
      <mesh position={[0.54, 0.05, 0.49]}>
        <boxGeometry args={[0.3, 0.78, 0.036]} />
        <meshStandardMaterial color="#1e1e1e" roughness={0.55} metalness={0.1} />
      </mesh>
      {/* Knob 1 */}
      <mesh position={[0.54, 0.23, 0.535]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.082, 0.082, 0.075, 14]} />
        <meshStandardMaterial {...matR} />
      </mesh>
      {/* Knob 2 */}
      <mesh position={[0.54, -0.05, 0.535]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.082, 0.082, 0.075, 14]} />
        <meshStandardMaterial {...matR} />
      </mesh>
      {/* Speaker grille strip */}
      <mesh position={[0.54, -0.28, 0.505]}>
        <boxGeometry args={[0.22, 0.13, 0.022]} />
        <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.08} />
      </mesh>

      {/* Antennas — V shape from top center */}
      <mesh position={[-0.1, 0.75, 0]} rotation={[0, 0, -0.42]}>
        <cylinderGeometry args={[0.016, 0.01, 1.0, 6]} />
        <meshStandardMaterial color="#cccccc" roughness={0.45} metalness={0.65} />
      </mesh>
      <mesh position={[0.18, 0.75, 0]} rotation={[0, 0, 0.42]}>
        <cylinderGeometry args={[0.016, 0.01, 1.0, 6]} />
        <meshStandardMaterial color="#cccccc" roughness={0.45} metalness={0.65} />
      </mesh>

      {/* Stand neck */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 0.2, 12]} />
        <meshStandardMaterial {...matR} />
      </mesh>
      {/* Rounded pedestal base */}
      <mesh position={[0, -0.96, 0]}>
        <cylinderGeometry args={[0.52, 0.58, 0.13, 26]} />
        <meshStandardMaterial {...matR} />
      </mesh>

      <Label label={item.label} sublabel={item.sublabel} dark={dark} y={1.42} />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Component System — gyroscope atom (unchanged)
// ═══════════════════════════════════════════════════════════════════════════════
function ComponentSystem({ item, onSelect, dark, returnKey }: {
  item: SandboxItem; onSelect: (i: SandboxItem) => void;
  dark: boolean; returnKey: number;
}) {
  const gRef      = useRef<THREE.Group>(null);
  const orbitRef  = useRef<THREE.Group>(null);
  const isHovered = useRef(false);
  const scaleV    = useRef(1);
  const emV       = useRef({ v: 0 });
  const drag      = useDraggable(returnKey);
  const c         = item.color;
  const R         = 0.88;

  const handleDown = useMemo(
    () => drag.makeHandlers(gRef, () => onSelect(item)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drag.makeHandlers],
  );
  const onEnter = useCallback(() => {
    isHovered.current = true;
    if (drag.mode.current !== "grabbed") document.body.style.cursor = "grab";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onLeave = useCallback(() => {
    isHovered.current = false;
    if (drag.mode.current !== "grabbed") document.body.style.cursor = "auto";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }, delta) => {
    if (!gRef.current || !orbitRef.current) return;
    drag.checkReturn(returnKey);
    const t  = clock.elapsedTime;
    const cx = -4.2;
    const cy = 2.6 + Math.sin(t * 0.66 + 0.5) * 0.18;
    drivePos(gRef, drag, cx, cy, delta);
    gRef.current.rotation.y  += delta * 0.18;
    gRef.current.rotation.x   = Math.sin(t * 0.28) * 0.08;
    orbitRef.current.rotation.z += delta * 0.44;
    orbitRef.current.rotation.x += delta * 0.21;
    scaleV.current = THREE.MathUtils.lerp(scaleV.current, isHovered.current ? 1.14 : 1, delta * 8);
    gRef.current.scale.setScalar(scaleV.current);
    lerpEmissive(gRef.current, isHovered.current ? 0.22 : 0, delta, emV.current);
  });

  const cubes = Array.from({ length: 6 }, (_, i) => ({
    x: Math.cos((i / 6) * Math.PI * 2) * R,
    y: Math.sin((i / 6) * Math.PI * 2) * R,
  }));

  return (
    <group ref={gRef} position={[-4.2, 2.6, 0]}>
      <HitBox w={2.3} h={2.3} d={2.3}
        onPointerDown={handleDown} onPointerEnter={onEnter} onPointerLeave={onLeave} />
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={c} roughness={0.45} metalness={0.2} emissive={c} emissiveIntensity={0.12} />
      </mesh>
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

// ═══════════════════════════════════════════════════════════════════════════════
// Main canvas
// ═══════════════════════════════════════════════════════════════════════════════
interface Props {
  onSelect: (item: SandboxItem) => void;
  dark: boolean;
  returnKey: number;
}

export default function SandboxCanvas({ onSelect, dark, returnKey }: Props) {
  const byId = (id: string) => SANDBOX_ITEMS.find((i) => i.id === id)!;

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 45, position: [0, 0, 14], near: 0.1, far: 100 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.55} color="#f0f4ff" />
      <directionalLight position={[6, 10, 6]} intensity={1.5} color="#fff6e8" />
      <pointLight position={[-8, 5, 8]} intensity={0.55} color="#a8c8ff" />
      <pointLight position={[2, -6, -5]} intensity={0.4} color="#ffccaa" />
      <Environment preset="city" environmentIntensity={0.25} />

      <JustSphere      item={byId("just-intelligence")} onSelect={onSelect} dark={dark} returnKey={returnKey} />
      <IataAircraft    item={byId("iata")}              onSelect={onSelect} dark={dark} returnKey={returnKey} />
      <StorycorpsPhone item={byId("storycorps")}        onSelect={onSelect} dark={dark} returnKey={returnKey} />
      <NetflixTV       item={byId("netflix-disney")}    onSelect={onSelect} dark={dark} returnKey={returnKey} />
      <ComponentSystem item={byId("just-wordpress")}    onSelect={onSelect} dark={dark} returnKey={returnKey} />
    </Canvas>
  );
}
