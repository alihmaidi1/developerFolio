import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float } from "@react-three/drei";
import { AvatarModel } from "./AvatarModel";
import { HologramPlatform } from "./HologramPlatform";
import { CodeParticles } from "./CodeParticles";
import { useResponsiveScenePreset } from "./useResponsiveScenePreset";

interface LandingCanvasProps {
  reducedMotion: boolean;
}

export function LandingCanvas({ reducedMotion }: LandingCanvasProps) {
  const preset = useResponsiveScenePreset();

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: preset.cameraPosition, fov: preset.cameraFov }}
      style={{ background: "transparent" }}
    >
      {/* Dark studio lighting with lime rim */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 4]} intensity={0.6} color="#ffffff" />
      <directionalLight position={[-4, 2, -2]} intensity={1.4} color="#84cc16" />
      <pointLight position={[0, -0.8, 2]} intensity={0.4} color="#a3e635" />

      <Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={0.3} />

        {reducedMotion ? (
          <AvatarModel
            scale={preset.modelScale}
            position={preset.modelPosition}
          />
        ) : (
          <Float
            speed={1.2}
            rotationIntensity={0.18}
            floatIntensity={0.35}
            floatingRange={[-0.04, 0.04]}
          >
            <AvatarModel
              scale={preset.modelScale}
              position={preset.modelPosition}
            />
          </Float>
        )}

        <HologramPlatform position={[0, preset.modelPosition[1] + 0.05, 0]} />

        <ContactShadows
          position={[0, preset.modelPosition[1] + 0.02, 0]}
          opacity={0.35}
          scale={3.5}
          blur={2.4}
          far={1.5}
          color="#000000"
        />

        {!reducedMotion && <CodeParticles count={40} />}
      </Suspense>
    </Canvas>
  );
}
