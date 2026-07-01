import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CodeParticlesProps {
  count?: number;
}

export function CodeParticles({ count = 60 }: CodeParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 1.4 + Math.random() * 1.0;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3 + 0] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = -0.8 + Math.random() * 2.4;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.4 - 0.2;
      speeds[i] = 0.0008 + Math.random() * 0.0018;
    }
    return { positions, speeds };
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#84cc16",
        size: 0.04,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.65,
        toneMapped: false,
        depthWrite: false,
      }),
    [],
  );

  useFrame(() => {
    const geom = pointsRef.current?.geometry;
    if (!geom) return;
    const arr = geom.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const yIdx = i * 3 + 1;
      arr[yIdx] += speeds[i];
      if (arr[yIdx] > 1.6) arr[yIdx] = -0.8;
    }
    geom.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} material={material}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
    </points>
  );
}
