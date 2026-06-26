import { useState } from "react";

type Capability = "ready" | "fallback";

/**
 * Decides whether the WebGL/R3F hero is safe to mount.
 * Falls back to CSS-3D for: reduced-motion, no WebGL2, low-power devices,
 * and explicit override via `?no3d=1`.
 *
 * Lazy-evaluated on first render — no effect-driven state churn.
 */
function detectCapability(): Capability {
  if (typeof window === "undefined") {
    return "fallback";
  }

  const force = new URLSearchParams(window.location.search).get("no3d");
  if (force === "1") {
    return "fallback";
  }

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReduced) {
    return "fallback";
  }

  // Hardware concurrency check — bail on very low-power devices.
  const cores = navigator.hardwareConcurrency || 4;
  if (cores < 4) {
    return "fallback";
  }

  // Save-data hint from CT or mobile networks.
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (connection?.saveData) {
    return "fallback";
  }

  // WebGL2 test.
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl) {
      return "fallback";
    }
  } catch {
    return "fallback";
  }

  return "ready";
}

export function useWebGLCapability(): Capability {
  // Lazy initial state runs once, on first render — no effect required.
  const [capability] = useState<Capability>(() => detectCapability());
  return capability;
}
