"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const PhysicsSandbox = dynamic(
  () => import("@/components/PhysicsSandbox"),
  { ssr: false }
);

export default function SandboxPageClient() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    // Sync with portfolio dark mode preference
    const stored = localStorage.getItem("theme");
    setDark(stored === "dark");
  }, []);

  return <PhysicsSandbox dark={dark} />;
}
