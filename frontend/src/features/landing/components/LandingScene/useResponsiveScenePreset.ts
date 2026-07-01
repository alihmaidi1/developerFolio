import { useEffect, useState } from "react";

export interface ScenePreset {
  cameraPosition: [number, number, number];
  cameraFov: number;
  modelScale: number;
  modelPosition: [number, number, number];
}

const PRESETS: Record<"desktop" | "tablet" | "mobile", ScenePreset> = {
  desktop: {
    cameraPosition: [0, 0.2, 4.2],
    cameraFov: 38,
    modelScale: 1,
    modelPosition: [0, -1.1, 0],
  },
  tablet: {
    cameraPosition: [0, 0.2, 4.6],
    cameraFov: 40,
    modelScale: 0.95,
    modelPosition: [0, -1.05, 0],
  },
  mobile: {
    cameraPosition: [0, 0.1, 5.0],
    cameraFov: 44,
    modelScale: 0.85,
    modelPosition: [0, -1.0, 0],
  },
};

function resolveTier(width: number): "desktop" | "tablet" | "mobile" {
  if (width >= 1024) return "desktop";
  if (width >= 640) return "tablet";
  return "mobile";
}

export function useResponsiveScenePreset(): ScenePreset {
  const [preset, setPreset] = useState<ScenePreset>(() => {
    if (typeof window === "undefined") return PRESETS.desktop;
    return PRESETS[resolveTier(window.innerWidth)];
  });

  useEffect(() => {
    let raf = 0;
    const handle = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setPreset(PRESETS[resolveTier(window.innerWidth)]);
      });
    };
    window.addEventListener("resize", handle);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handle);
    };
  }, []);

  return preset;
}
