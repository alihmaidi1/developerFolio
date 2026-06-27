import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  MathUtils,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type Points,
} from "three";

const PARTICLE_COUNT = 800;
const FIELD_RADIUS = 28;
const FIELD_HEIGHT = 16;
const PARTICLE_DRIFT = 0.4; // world units per second

/**
 * Pre-baked random particle positions + per-particle drift speeds. Computed
 * once at module load — `Math.random()` would trip react-hooks/purity if
 * called during render.
 */
const dustData = (() => {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const speeds = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * FIELD_RADIUS;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.random() * FIELD_HEIGHT - FIELD_HEIGHT / 2;
    positions[i * 3 + 2] = Math.sin(angle) * radius - 4;
    speeds[i] = 0.6 + Math.random() * 0.9;
  }
  return { positions, speeds };
})();

interface LabShape {
  shape: "ico" | "octa" | "torus" | "box";
  pos: [number, number, number];
  scale: number;
  color: string;
  spin: [number, number];
}

const LAB_SHAPES: LabShape[] = [
  {
    shape: "ico",
    pos: [-5.2, 1.4, -8],
    scale: 0.55,
    color: "#22d3ee",
    spin: [0.12, 0.18],
  },
  {
    shape: "octa",
    pos: [5.8, -0.7, -11],
    scale: 0.8,
    color: "#8b5cf6",
    spin: [0.08, 0.22],
  },
  {
    shape: "torus",
    pos: [3.5, 2.8, -6.5],
    scale: 0.42,
    color: "#22d3ee",
    spin: [0.14, 0.1],
  },
  {
    shape: "box",
    pos: [-3.8, -1.4, -9.5],
    scale: 0.65,
    color: "#8b5cf6",
    spin: [0.16, 0.12],
  },
];

interface LabLight {
  pos: [number, number, number];
  color: string;
  phase: number;
}

const LAB_LIGHTS: LabLight[] = [
  { pos: [-7.5, 4.5, -10], color: "#22d3ee", phase: 0 },
  { pos: [6.5, 5.2, -12], color: "#8b5cf6", phase: 1.4 },
  { pos: [0.5, -2.8, -8], color: "#22d3ee", phase: 2.8 },
];

interface BackgroundLabSceneProps {
  scrollProgressRef: RefObject<number>;
  pointerRef: RefObject<{ x: number; y: number }>;
}

export function BackgroundLabScene({
  scrollProgressRef,
  pointerRef,
}: BackgroundLabSceneProps) {
  const groupRef = useRef<Group>(null);
  const dustRef = useRef<Points>(null);
  const shapeRefs = useRef<Array<Mesh | null>>([]);
  const lightRefs = useRef<Array<Mesh | null>>([]);
  const beamRefs = useRef<Array<Mesh | null>>([]);

  const dustGeometry = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute(
      "position",
      new Float32BufferAttribute(dustData.positions.slice(), 3),
    );
    return g;
  }, []);

  const smoothed = useRef({ x: 0, y: 0, scroll: 0 });

  useFrame((state, delta) => {
    const p = pointerRef.current ?? { x: 0, y: 0 };
    const scroll = scrollProgressRef.current ?? 0;

    smoothed.current.x = MathUtils.lerp(smoothed.current.x, p.x, 0.05);
    smoothed.current.y = MathUtils.lerp(smoothed.current.y, p.y, 0.05);
    smoothed.current.scroll = MathUtils.lerp(
      smoothed.current.scroll,
      scroll,
      0.05,
    );

    const g = groupRef.current;
    if (g) {
      g.rotation.x = smoothed.current.y * 0.06;
      g.rotation.y = smoothed.current.x * 0.08;
      g.position.y = smoothed.current.scroll * -6;
    }

    state.camera.position.y = 2.6 - smoothed.current.scroll * 1.4;

    // Dust drift.
    const dust = dustRef.current;
    if (dust) {
      const attr = dust.geometry.getAttribute("position");
      const arr = attr.array as Float32Array;
      const half = FIELD_HEIGHT / 2;
      const step = delta * PARTICLE_DRIFT;
      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const idx = i * 3 + 1;
        const y = arr[idx]! + step * dustData.speeds[i]!;
        arr[idx] = y > half ? -half : y;
      }
      attr.needsUpdate = true;
    }

    // Floating lab shapes — independent rotations per shape.
    const shapes = shapeRefs.current;
    for (let i = 0; i < shapes.length; i += 1) {
      const mesh = shapes[i];
      const conf = LAB_SHAPES[i];
      if (!mesh || !conf) continue;
      mesh.rotation.x += delta * conf.spin[0];
      mesh.rotation.y += delta * conf.spin[1];
    }

    // Pulsing lab lights — emissive sphere opacity driven by sin.
    const t = state.clock.elapsedTime;
    const lights = lightRefs.current;
    for (let i = 0; i < lights.length; i += 1) {
      const mesh = lights[i];
      const conf = LAB_LIGHTS[i];
      if (!mesh || !conf) continue;
      const pulse = (Math.sin(t * 1.4 + conf.phase) + 1) / 2; // 0..1
      const mat = mesh.material as MeshBasicMaterial;
      mat.opacity = 0.35 + pulse * 0.55;
      const scale = 1 + pulse * 0.25;
      mesh.scale.setScalar(scale);
    }

    // Beams — gentle breathing of the volumetric cones.
    const beams = beamRefs.current;
    for (let i = 0; i < beams.length; i += 1) {
      const beam = beams[i];
      if (!beam) continue;
      const breathe = (Math.sin(t * 0.6 + i * 1.7) + 1) / 2;
      const mat = beam.material as MeshBasicMaterial;
      mat.opacity = 0.04 + breathe * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Perspective grid floor. */}
      <gridHelper
        args={[80, 80, new Color("#22d3ee"), new Color("#2a1a55")]}
        position={[0, -3.4, 0]}
      >
        <meshBasicMaterial
          attach="material"
          transparent
          opacity={0.38}
          depthWrite={false}
        />
      </gridHelper>

      {/* Horizon planes. */}
      <mesh position={[0, 1.4, -22]}>
        <planeGeometry args={[80, 14]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, -3.3, -22]}>
        <planeGeometry args={[80, 0.6]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>

      {/* Volumetric light beams — open-ended cones angled toward the floor. */}
      <mesh
        ref={(el) => {
          beamRefs.current[0] = el;
        }}
        position={[-9.5, 6, -10]}
        rotation={[Math.PI + 0.15, 0, 0.18]}
      >
        <coneGeometry args={[3.4, 18, 32, 1, true]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.06}
          depthWrite={false}
          side={DoubleSide}
        />
      </mesh>
      <mesh
        ref={(el) => {
          beamRefs.current[1] = el;
        }}
        position={[10.5, 7, -12]}
        rotation={[Math.PI - 0.12, 0, -0.22]}
      >
        <coneGeometry args={[3.8, 20, 32, 1, true]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.05}
          depthWrite={false}
          side={DoubleSide}
        />
      </mesh>

      {/* Floating wireframe "lab equipment". */}
      {LAB_SHAPES.map((conf, i) => (
        <mesh
          key={`shape-${i}`}
          ref={(el) => {
            shapeRefs.current[i] = el;
          }}
          position={conf.pos}
          scale={conf.scale}
        >
          {conf.shape === "ico" && <icosahedronGeometry args={[1, 0]} />}
          {conf.shape === "octa" && <octahedronGeometry args={[1, 0]} />}
          {conf.shape === "torus" && (
            <torusKnotGeometry args={[0.6, 0.18, 64, 16]} />
          )}
          {conf.shape === "box" && <boxGeometry args={[1, 1, 1]} />}
          <meshBasicMaterial
            color={conf.color}
            wireframe
            transparent
            opacity={0.42}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Pulsing lab signal lights — small emissive spheres. */}
      {LAB_LIGHTS.map((conf, i) => (
        <mesh
          key={`light-${i}`}
          ref={(el) => {
            lightRefs.current[i] = el;
          }}
          position={conf.pos}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial
            color={conf.color}
            transparent
            opacity={0.6}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Dust particles. */}
      <points ref={dustRef} geometry={dustGeometry} position={[0, 0, 0]}>
        <pointsMaterial
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.5}
          color="#c4b5fd"
          depthWrite={false}
        />
      </points>
    </group>
  );
}
