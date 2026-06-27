import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { HolographicIdCardScene } from "./HolographicIdCardScene";

interface HeroIdCardCanvasProps {
  username: string;
  role: string;
  available: boolean;
  active: boolean;
}

/**
 * R3F canvas hosting the holographic developer ID card.
 * Kept lazy so three.js stays out of the initial bundle.
 */
export default function HeroIdCardCanvas({
  username,
  role,
  available,
  active,
}: HeroIdCardCanvasProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "demand"}
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.0} />
      <directionalLight position={[-4, 1, 2]} intensity={0.5} color="#8b5cf6" />
      <directionalLight
        position={[2, -3, 1]}
        intensity={0.45}
        color="#22d3ee"
      />

      <Suspense fallback={null}>
        <HolographicIdCardScene
          username={username}
          role={role}
          available={available}
        />
      </Suspense>
    </Canvas>
  );
}
