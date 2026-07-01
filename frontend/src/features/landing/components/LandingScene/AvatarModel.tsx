import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface AvatarModelProps {
  scale?: number;
  position?: [number, number, number];
}

/**
 * Stylized procedural developer avatar built from primitive geometry.
 * Idle breathing + slight mouse-follow head rotation.
 */
export function AvatarModel({ scale = 1, position = [0, 0, 0] }: AvatarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Memoize materials so they aren't recreated each frame
  const materials = useMemo(() => {
    const skin = new THREE.MeshStandardMaterial({
      color: "#d6c2a8",
      roughness: 0.7,
      metalness: 0.05,
    });
    const hoodie = new THREE.MeshStandardMaterial({
      color: "#1a1a1a",
      roughness: 0.85,
      metalness: 0.1,
    });
    const hoodieAccent = new THREE.MeshStandardMaterial({
      color: "#84cc16",
      emissive: "#84cc16",
      emissiveIntensity: 0.35,
      roughness: 0.5,
      metalness: 0.15,
    });
    const visor = new THREE.MeshPhysicalMaterial({
      color: "#0a0a0a",
      roughness: 0.15,
      metalness: 0.4,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      emissive: "#84cc16",
      emissiveIntensity: 0.08,
    });
    const headphone = new THREE.MeshStandardMaterial({
      color: "#262626",
      roughness: 0.35,
      metalness: 0.6,
    });
    const headphoneAccent = new THREE.MeshStandardMaterial({
      color: "#84cc16",
      emissive: "#84cc16",
      emissiveIntensity: 1.2,
      roughness: 0.3,
      metalness: 0.4,
    });

    return { skin, hoodie, hoodieAccent, visor, headphone, headphoneAccent };
  }, []);

  // Dispose materials on unmount
  useMemo(
    () => () => {
      Object.values(materials).forEach((m) => m.dispose());
    },
    [materials],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.9) * 0.04;
    }
    if (bodyRef.current) {
      bodyRef.current.scale.y = 1 + Math.sin(t * 1.3) * 0.012;
    }
    if (headRef.current) {
      const targetX = pointer.y * 0.18;
      const targetY = pointer.x * 0.35;
      headRef.current.rotation.x +=
        (targetX - headRef.current.rotation.x) * 0.05;
      headRef.current.rotation.y +=
        (targetY - headRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Body / hoodie */}
      <group ref={bodyRef} position={[0, 0.4, 0]}>
        {/* Torso */}
        <mesh
          position={[0, 0.05, 0]}
          castShadow
          receiveShadow
          material={materials.hoodie}
        >
          <capsuleGeometry args={[0.42, 0.7, 8, 16]} />
        </mesh>

        {/* Shoulders (subtle width) */}
        <mesh position={[0, 0.38, 0]} material={materials.hoodie}>
          <sphereGeometry args={[0.5, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* Hoodie zipper / accent strip */}
        <mesh position={[0, 0.1, 0.41]} material={materials.hoodieAccent}>
          <boxGeometry args={[0.04, 0.6, 0.02]} />
        </mesh>

        {/* Arms (compact, neutral pose) */}
        <mesh
          position={[-0.5, 0.0, 0]}
          rotation={[0, 0, 0.15]}
          material={materials.hoodie}
        >
          <capsuleGeometry args={[0.13, 0.55, 6, 12]} />
        </mesh>
        <mesh
          position={[0.5, 0.0, 0]}
          rotation={[0, 0, -0.15]}
          material={materials.hoodie}
        >
          <capsuleGeometry args={[0.13, 0.55, 6, 12]} />
        </mesh>
      </group>

      {/* Head group (rotates with mouse) */}
      <group ref={headRef} position={[0, 1.18, 0]}>
        {/* Neck */}
        <mesh position={[0, -0.18, 0]} material={materials.skin}>
          <cylinderGeometry args={[0.13, 0.14, 0.16, 12]} />
        </mesh>

        {/* Hoodie collar */}
        <mesh position={[0, -0.22, 0]} material={materials.hoodie}>
          <cylinderGeometry args={[0.22, 0.18, 0.14, 16]} />
        </mesh>

        {/* Head */}
        <mesh castShadow material={materials.skin}>
          <sphereGeometry args={[0.32, 32, 32]} />
        </mesh>

        {/* Hoodie hood (back cap) */}
        <mesh position={[0, 0.05, -0.05]} material={materials.hoodie}>
          <sphereGeometry
            args={[0.38, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.62]}
          />
        </mesh>

        {/* Visor */}
        <mesh position={[0, 0.04, 0.27]} material={materials.visor}>
          <boxGeometry args={[0.5, 0.12, 0.08]} />
        </mesh>
        {/* Visor inner glow line */}
        <mesh position={[0, 0.04, 0.315]}>
          <boxGeometry args={[0.42, 0.015, 0.005]} />
          <meshBasicMaterial color="#a3e635" toneMapped={false} />
        </mesh>

        {/* Headphones — cups */}
        <mesh
          position={[-0.34, 0.04, 0]}
          rotation={[0, Math.PI / 2, 0]}
          material={materials.headphone}
        >
          <cylinderGeometry args={[0.11, 0.11, 0.08, 16]} />
        </mesh>
        <mesh
          position={[0.34, 0.04, 0]}
          rotation={[0, Math.PI / 2, 0]}
          material={materials.headphone}
        >
          <cylinderGeometry args={[0.11, 0.11, 0.08, 16]} />
        </mesh>

        {/* Headphones — accent rings */}
        <mesh
          position={[-0.38, 0.04, 0]}
          rotation={[0, Math.PI / 2, 0]}
          material={materials.headphoneAccent}
        >
          <torusGeometry args={[0.06, 0.008, 8, 24]} />
        </mesh>
        <mesh
          position={[0.38, 0.04, 0]}
          rotation={[0, Math.PI / 2, 0]}
          material={materials.headphoneAccent}
        >
          <torusGeometry args={[0.06, 0.008, 8, 24]} />
        </mesh>

        {/* Headphones — band */}
        <mesh
          position={[0, 0.28, 0]}
          rotation={[0, 0, 0]}
          material={materials.headphone}
        >
          <torusGeometry args={[0.32, 0.018, 8, 24, Math.PI]} />
        </mesh>
      </group>
    </group>
  );
}
