import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Text } from "@react-three/drei";
import {
  MathUtils,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
} from "three";

const CARD_W = 3.2;
const CARD_H = 2.0;

interface HolographicIdCardSceneProps {
  username: string;
  role: string;
  available: boolean;
}

export function HolographicIdCardScene({
  username,
  role,
  available,
}: HolographicIdCardSceneProps) {
  const groupRef = useRef<Group>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const dotRef = useRef<Mesh>(null);
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      targetRef.current.x = (py - 0.5) * -0.32;
      targetRef.current.y = (px - 0.5) * 0.5;
    };
    const onLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [gl]);

  useFrame((state) => {
    const g = groupRef.current;
    if (g) {
      g.rotation.x = MathUtils.lerp(g.rotation.x, targetRef.current.x, 0.08);
      g.rotation.y = MathUtils.lerp(g.rotation.y, targetRef.current.y, 0.08);
    }
    const dot = dotRef.current;
    if (dot) {
      const t = state.clock.elapsedTime;
      const pulse = (Math.sin(t * 2.4) + 1) / 2;
      const mat = dot.material as MeshStandardMaterial;
      mat.emissiveIntensity = 0.7 + pulse * 1.4;
    }
  });

  const initials = useMemo(() => {
    const parts = username.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
    }
    return username.slice(0, 2).toUpperCase();
  }, [username]);

  const hashCode = useMemo(() => {
    let h = 0;
    for (let i = 0; i < username.length; i += 1) {
      h = ((h << 5) - h + username.charCodeAt(i)) | 0;
    }
    const hex = Math.abs(h)
      .toString(16)
      .toUpperCase()
      .padStart(6, "0")
      .slice(0, 6);
    return `0x${hex}`;
  }, [username]);

  const left = -CARD_W / 2 + 0.28;

  return (
    <Float
      speed={1.0}
      rotationIntensity={0.06}
      floatIntensity={0.45}
      floatingRange={[-0.05, 0.05]}
    >
      <group ref={groupRef}>
        {/* outer cyan halo */}
        <mesh position={[0, 0, -0.22]} scale={1.2}>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.08} />
        </mesh>
        {/* inner violet halo */}
        <mesh position={[0, 0, -0.14]} scale={1.08}>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
        </mesh>

        {/* main card body */}
        <RoundedBox args={[CARD_W, CARD_H, 0.08]} radius={0.14} smoothness={5}>
          <meshStandardMaterial
            color="#0e0b1f"
            metalness={0.75}
            roughness={0.28}
            emissive="#1a1138"
            emissiveIntensity={0.4}
          />
        </RoundedBox>

        {/* left accent stripe — cyan */}
        <mesh position={[-CARD_W / 2 + 0.08, 0, 0.045]}>
          <planeGeometry args={[0.04, CARD_H - 0.4]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>

        {/* top-left </> chip */}
        <group position={[left + 0.05, CARD_H / 2 - 0.3, 0.05]}>
          <RoundedBox args={[0.42, 0.22, 0.02]} radius={0.05} smoothness={3}>
            <meshStandardMaterial
              color="#8b5cf6"
              metalness={0.4}
              roughness={0.35}
              emissive="#8b5cf6"
              emissiveIntensity={0.55}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.11}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {"</>"}
          </Text>
        </group>

        {/* top-right version chip */}
        <group position={[CARD_W / 2 - 0.38, CARD_H / 2 - 0.3, 0.05]}>
          <RoundedBox args={[0.6, 0.22, 0.02]} radius={0.05} smoothness={3}>
            <meshStandardMaterial
              color="#0e0b1f"
              metalness={0.3}
              roughness={0.5}
              emissive="#22d3ee"
              emissiveIntensity={0.22}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.085}
            color="#22d3ee"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.14}
          >
            v.2026
          </Text>
        </group>

        {/* name */}
        <Text
          position={[left, 0.22, 0.05]}
          fontSize={0.34}
          color="#f4f6ff"
          anchorX="left"
          anchorY="middle"
          letterSpacing={-0.01}
        >
          {username.toUpperCase()}
        </Text>

        {/* role */}
        <Text
          position={[left, -0.18, 0.05]}
          fontSize={0.13}
          color="#c4b5fd"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.18}
        >
          {role.toUpperCase()}
        </Text>

        {/* status row */}
        <group position={[left, -0.6, 0.05]}>
          <mesh ref={dotRef} position={[0.04, 0, 0]}>
            <circleGeometry args={[0.055, 24]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={1.4}
              toneMapped={false}
            />
          </mesh>
          <Text
            position={[0.16, 0, 0]}
            fontSize={0.082}
            color="#a8a4c4"
            anchorX="left"
            anchorY="middle"
            letterSpacing={0.22}
          >
            {available ? "AVAILABLE FOR PROJECTS" : "PORTFOLIO // 2026"}
          </Text>
        </group>

        {/* bottom metadata row */}
        <Text
          position={[left, -CARD_H / 2 + 0.18, 0.05]}
          fontSize={0.075}
          color="#665d8a"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.18}
        >
          {`ID · ${initials}/2026`}
        </Text>
        <Text
          position={[CARD_W / 2 - 0.28, -CARD_H / 2 + 0.18, 0.05]}
          fontSize={0.075}
          color="#665d8a"
          anchorX="right"
          anchorY="middle"
          letterSpacing={0.18}
        >
          {hashCode}
        </Text>
      </group>
    </Float>
  );
}
