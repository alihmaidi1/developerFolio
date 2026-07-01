import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HologramPlatformProps {
  position?: [number, number, number];
}

export function HologramPlatform({
  position = [0, -1.05, 0],
}: HologramPlatformProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const baseMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#84cc16",
        emissive: "#84cc16",
        emissiveIntensity: 1.4,
        transparent: true,
        opacity: 0.85,
        toneMapped: false,
      }),
    [],
  );

  const softMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#84cc16",
        transparent: true,
        opacity: 0.18,
        toneMapped: false,
        side: THREE.DoubleSide,
      }),
    [],
  );

  const discMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#84cc16",
        transparent: true,
        opacity: 0.06,
        toneMapped: false,
        side: THREE.DoubleSide,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.25;
    }
  });

  return (
    <group position={position}>
      {/* Bright thin ring */}
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        material={baseMaterial}
      >
        <torusGeometry args={[0.95, 0.008, 8, 96]} />
      </mesh>

      {/* Secondary thin ring */}
      <mesh
        ref={ring2Ref}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
        material={baseMaterial}
      >
        <torusGeometry args={[1.1, 0.005, 8, 96]} />
      </mesh>

      {/* Soft halo disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={softMaterial}>
        <ringGeometry args={[0.96, 1.15, 80]} />
      </mesh>

      {/* Inner faint floor disc */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.001, 0]}
        material={discMaterial}
      >
        <circleGeometry args={[0.92, 64]} />
      </mesh>
    </group>
  );
}
