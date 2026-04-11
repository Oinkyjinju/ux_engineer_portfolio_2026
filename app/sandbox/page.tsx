import type { Metadata } from "next";
import SandboxPageClient from "./SandboxPageClient";

export const metadata: Metadata = {
  title: "Physics Sandbox — Jinju Park",
  description:
    "Draggable 3D objects with deterministic choreography. Built with Three.js and React Three Fiber.",
};

export default function SandboxPage() {
  return <SandboxPageClient />;
}
