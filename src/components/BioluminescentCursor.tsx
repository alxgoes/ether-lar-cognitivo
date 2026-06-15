import { useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';

// ─── Particle ─────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
  hue: number; // slight hue variation for organic feel
}

// ─── BioluminescentCursor ─────────────────────────────────────────────────
export function BioluminescentCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const dotRef = useRef<HTMLDivElement>(null);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Mouse move: spawn particles
    const onMove = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;
      mouseRef.current = { x: mx, y: my };

      // Move the dot div
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      }

      // Spawn 3-5 particles per move
      const count = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: mx + (Math.random() - 0.5) * 4,
          y: my + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.3, // slight upward drift
          alpha: 0.7 + Math.random() * 0.3,
          radius: 1.5 + Math.random() * 3,
          hue: 210 + Math.random() * 30, // 210–240: blue-cyan range
        });
      }

      // Cap particle pool for perf
      if (particlesRef.current.length > 300) {
        particlesRef.current.splice(0, particlesRef.current.length - 300);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    // RAF loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        // Draw particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `hsla(${p.hue}, 90%, 70%, ${p.alpha})`);
        gradient.addColorStop(0.4, `hsla(${p.hue}, 80%, 55%, ${p.alpha * 0.6})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 70%, 50%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Update physics
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.alpha -= 0.018;
        p.radius *= 0.985;

        // Remove dead particles
        if (p.alpha <= 0 || p.radius < 0.3) {
          particlesRef.current.splice(i, 1);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Canvas overlay — particle trail */}
      <canvas
        ref={canvasRef}
        id="bioluminescent-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9997,
        }}
      />

      {/* Cursor dot — sharp center point */}
      <div
        ref={dotRef}
        id="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#ffffff',
          boxShadow: '0 0 8px rgba(96,165,250,0.9), 0 0 16px rgba(96,165,250,0.4)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
    </>
  );
}

export default BioluminescentCursor;
