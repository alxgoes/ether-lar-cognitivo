import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

// ─── Configuration Constants ───────────────────────────────────────────────
const isMobileDevice = () => typeof window !== 'undefined' && window.innerWidth <= 768;
const NODE_COUNT = isMobileDevice() ? 60 : 180;
const CONNECTION_DISTANCE = 130;
const INTERACTION_RADIUS = 250;
const ATTRACTION_STRENGTH = 0.015;
const DRIFT_SPEED = 0.15;

// ─── Types ────────────────────────────────────────────────────────────────
interface NodeData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  baseOpacity: number;
  pulseOffset: number;
}

// ─── Neural Mesh Component ────────────────────────────────────────────────
interface NeuralMeshProps {
  mouseNX: number;
  mouseNY: number;
  scrollOffset: number;
}

function NeuralMesh({ mouseNX, mouseNY, scrollOffset }: NeuralMeshProps) {
  const { camera, size } = useThree();

  // Initialize node data
  const nodes = useMemo<NodeData[]>(() => {
    return Array.from({ length: NODE_COUNT }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * size.width,
        (Math.random() - 0.5) * size.height,
        (Math.random() - 0.5) * 80
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * DRIFT_SPEED,
        (Math.random() - 0.5) * DRIFT_SPEED,
        0
      ),
      baseOpacity: 0.08 + Math.random() * 0.25,
      pulseOffset: Math.random() * Math.PI * 2,
    }));
  }, [size.width, size.height]);

  // Points geometry (nodes)
  const pointsRef = useRef<THREE.Points>(null!);
  const pointsPositions = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  const pointsOpacities = useMemo(() => new Float32Array(NODE_COUNT), []);

  // Lines geometry (connections)
  const linesRef = useRef<THREE.LineSegments>(null!);

  // Points material
  const pointsMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 2.5,
        color: new THREE.Color('#ffffff'),
        transparent: true,
        vertexColors: false,
        sizeAttenuation: false,
      }),
    []
  );

  // Lines material
  const linesMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#ffffff'),
        transparent: true,
        opacity: 0.12,
      }),
    []
  );

  // Mouse world position ref for repulsion
  const mouseWorldRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const hw = size.width / 2;
    const hh = size.height / 2;

    // Update mouse world position
    mouseWorldRef.current.set(mouseNX * hw, mouseNY * hh, 0);

    // ── Camera parallax from scroll ──
    const targetCamRotY = scrollOffset * 0.00015;
    camera.rotation.y += (targetCamRotY - camera.rotation.y) * 0.05;

    // ── Subtle camera drift ──
    camera.position.x += (mouseNX * 8 - camera.position.x) * 0.02;
    camera.position.y += (mouseNY * 5 - camera.position.y) * 0.02;

    // ── Compute line segments (connections) ──
    const linePositions: number[] = [];

    // ── Update each node ──
    for (let i = 0; i < NODE_COUNT; i++) {
      const node = nodes[i];
      const p = node.position;

      // Drift movement
      p.x += node.velocity.x;
      p.y += node.velocity.y;

      // Boundary bounce
      if (p.x > hw || p.x < -hw) node.velocity.x *= -1;
      if (p.y > hh || p.y < -hh) node.velocity.y *= -1;
      p.x = Math.max(-hw, Math.min(hw, p.x));
      p.y = Math.max(-hh, Math.min(hh, p.y));

      // Subtle mouse dodge (repulsion)
      const dx = p.x - mouseWorldRef.current.x;
      const dy = p.y - mouseWorldRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < INTERACTION_RADIUS && dist > 0.1) {
        const force = (1 - dist / INTERACTION_RADIUS) * 0.006;
        p.x += (dx / dist) * force * 120;
        p.y += (dy / dist) * force * 120;
        
        // Boost node opacity near mouse
        pointsOpacities[i] += force * 1.5;
      }

      // Write to points buffer
      pointsPositions[i * 3] = p.x;
      pointsPositions[i * 3 + 1] = p.y;
      pointsPositions[i * 3 + 2] = p.z;

      // Pulsing opacity
      const pulse = Math.sin(t * 0.8 + node.pulseOffset) * 0.15;
      pointsOpacities[i] = Math.max(0.04, node.baseOpacity + pulse);
    }

    // ── Build connections ──
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodes[i].position.x - nodes[j].position.x;
        const dy = nodes[i].position.y - nodes[j].position.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
          linePositions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );
        }
      }
    }

    // ── Apply opacity from mouse proximity ──
    const avgOpacity = pointsOpacities.reduce((a, b) => a + b, 0) / NODE_COUNT;
    pointsMaterial.opacity = avgOpacity;

    // ── Update geometry buffers ──
    if (pointsRef.current) {
      const geo = pointsRef.current.geometry as THREE.BufferGeometry;
      const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
      posAttr.array = pointsPositions;
      posAttr.needsUpdate = true;
    }

    if (linesRef.current) {
      const geo = linesRef.current.geometry as THREE.BufferGeometry;
      const arr = new Float32Array(linePositions);
      geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    }

    // ── Dynamic line opacity based on mouse movement ──
    linesMaterial.opacity = 0.15;
  });

  // Initial geometry
  const initialPointsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(NODE_COUNT * 3), 3));
    return geo;
  }, []);

  const initialLinesGeo = useMemo(() => {
    return new THREE.BufferGeometry();
  }, []);

  return (
    <>
      <points ref={pointsRef} geometry={initialPointsGeo} material={pointsMaterial} />
      <lineSegments ref={linesRef} geometry={initialLinesGeo} material={linesMaterial} />
    </>
  );
}

// ─── Public Component ─────────────────────────────────────────────────────
interface NeuralCanvasProps {
  scrollOffset: number;
}

export function NeuralCanvas({ scrollOffset }: NeuralCanvasProps) {
  const mouse = useMousePosition();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 100] }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <NeuralMesh
          mouseNX={mouse.nx}
          mouseNY={mouse.ny}
          scrollOffset={scrollOffset}
        />
      </Canvas>
    </div>
  );
}

export default NeuralCanvas;
