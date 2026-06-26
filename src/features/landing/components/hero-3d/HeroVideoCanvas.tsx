import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useVideoTexture } from "@react-three/drei";
import { MathUtils, type Mesh, type Group } from "three";

interface HeroVideoCanvasProps {
  videoSrc: string;
  active: boolean;
}

/**
 * Real-time 3D hero card with the intro video as a VideoTexture.
 * Performance guardrails:
 *  - frameloop="demand" + invalidate on pointer move / float frames.
 *  - dpr clamped to [1, 2].
 *  - Pauses (and stops invalidating) when `active === false`.
 */
export default function HeroVideoCanvas({
  videoSrc,
  active,
}: HeroVideoCanvasProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "demand"}
      camera={{ position: [0, 0, 4.4], fov: 38 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 4, 5]} intensity={1.15} />
      <directionalLight
        position={[-4, 1, 2]}
        intensity={0.45}
        color="#8b5cf6"
      />
      <directionalLight
        position={[2, -3, 1]}
        intensity={0.35}
        color="#22d3ee"
      />

      <Suspense fallback={null}>
        <VideoCard videoSrc={videoSrc} active={active} />
      </Suspense>
    </Canvas>
  );
}

function VideoCard({
  videoSrc,
  active,
}: {
  videoSrc: string;
  active: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const { invalidate, gl } = useThree();

  // VideoTexture from drei wraps a video element with autoplay/muted/loop/playsInline.
  const texture = useVideoTexture(videoSrc, {
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
    crossOrigin: "anonymous",
  });

  // Pointer-driven parallax tilt — listens on the canvas only.
  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      targetRef.current.x = (py - 0.5) * -0.35;
      targetRef.current.y = (px - 0.5) * 0.5;
      invalidate();
    };
    const onLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
      invalidate();
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [gl, invalidate]);

  // Pause/play the underlying video element when active toggles.
  useEffect(() => {
    const video = texture.image as HTMLVideoElement | undefined;
    if (!video) return;
    if (active) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active, texture]);

  // Smooth lerp toward the target tilt; cheap on idle thanks to demand frameloop.
  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.x = MathUtils.lerp(
      group.rotation.x,
      targetRef.current.x,
      0.08,
    );
    group.rotation.y = MathUtils.lerp(
      group.rotation.y,
      targetRef.current.y,
      0.08,
    );
  });

  return (
    <Float
      speed={1.1}
      rotationIntensity={0.12}
      floatIntensity={0.6}
      floatingRange={[-0.04, 0.04]}
    >
      <group ref={groupRef}>
        <mesh ref={meshRef}>
          {/* Portrait 9:13-ish plane to match the source video aspect */}
          <planeGeometry args={[1.9, 2.56]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.35}
            metalness={0.18}
            toneMapped={false}
          />
        </mesh>

        {/* Subtle backplate halo */}
        <mesh position={[0, 0, -0.06]} scale={1.06}>
          <planeGeometry args={[1.9, 2.56]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.12} />
        </mesh>
      </group>
    </Float>
  );
}
