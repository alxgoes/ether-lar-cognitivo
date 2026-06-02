import { useState, useEffect, useRef, useCallback } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  /** Normalized -1 to 1 relative to viewport center */
  nx: number;
  ny: number;
}

/**
 * Tracks mouse position in both pixel and normalized (-1..1) coordinates.
 * Uses requestAnimationFrame for smooth, non-blocking updates.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    nx: 0,
    ny: 0,
  });

  const rafRef = useRef<number | null>(null);
  const rawRef = useRef({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    rawRef.current = { x: e.clientX, y: e.clientY };
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      const { x, y } = rawRef.current;
      setPosition({
        x,
        y,
        nx: (x / window.innerWidth) * 2 - 1,
        ny: -((y / window.innerHeight) * 2 - 1),
      });
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [onMouseMove]);

  return position;
}
