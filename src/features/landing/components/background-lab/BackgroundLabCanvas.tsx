import { Suspense, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { BackgroundLabScene } from "./BackgroundLabScene";

interface BackgroundLabCanvasProps {
  scrollProgressRef: RefObject<number>;
  pointerRef: RefObject<{ x: number; y: number }>;
  active: boolean;
}

export default function BackgroundLabCanvas({
  scrollProgressRef,
  pointerRef,
  active,
}: BackgroundLabCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      camera={{ position: [0, 2.6, 8.2], fov: 52 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      {/* Slight ambient + violet fill for the horizon plane. */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[0, 8, 4]} intensity={0.5} color="#8b5cf6" />
      <Suspense fallback={null}>
        <BackgroundLabScene
          scrollProgressRef={scrollProgressRef}
          pointerRef={pointerRef}
        />
      </Suspense>
    </Canvas>
  );
}
